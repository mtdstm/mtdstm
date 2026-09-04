import { NextRequest, NextResponse } from "next/server";
import { claimCode } from "@/lib/supabase";
import { sendCodeEmail } from "@/lib/email";

/**
 * Webhook da Cakto: chamado quando algo acontece com uma compra.
 * A gente só age no evento "purchase_approved" (pagamento confirmado).
 *
 * Formato real do payload (confirmado com exemplo da Cakto):
 * {
 *   "secret": "...",              // comparado com CAKTO_WEBHOOK_SECRET
 *   "event": "purchase_approved",
 *   "data": {
 *     "id": "...",                // id do pedido
 *     "customer": { "email": "...", ... },
 *     ...
 *   }
 * }
 */
export async function POST(req: NextRequest) {
  const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;
  if (!expectedSecret) {
    console.error("CAKTO_WEBHOOK_SECRET não configurada.");
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (body.secret !== expectedSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (body.event !== "purchase_approved") {
    // Ignora outros eventos (pix gerado, recusada, reembolso, chargeback, etc).
    return NextResponse.json({ ok: true, ignored: true });
  }

  const data = body.data ?? {};
  const buyerEmail: string | undefined = data.customer?.email;
  const orderId: string | undefined = data.id;

  if (!buyerEmail) {
    console.error("Webhook Cakto sem email do comprador:", JSON.stringify(body));
    return NextResponse.json({ error: "missing buyer email" }, { status: 400 });
  }

  try {
    const code = await claimCode({ buyerEmail, orderId: orderId ?? "unknown" });

    if (!code) {
      console.error("Estoque de códigos zerado. Pedido:", orderId, buyerEmail);
      // Retorna 200 pra Cakto não ficar retentando — o alerta já foi logado.
      // TODO: disparar um alerta pra você (email próprio) quando isso acontecer.
      return NextResponse.json({ ok: true, outOfStock: true });
    }

    await sendCodeEmail({ to: buyerEmail, code });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erro processando webhook Cakto:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
