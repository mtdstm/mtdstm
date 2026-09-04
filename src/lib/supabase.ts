import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para uso exclusivo no servidor (API routes/webhooks).
 * Usa a service role key, que ignora RLS — NUNCA importe este arquivo
 * em código que roda no navegador.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configuradas.");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

/** Pega um código não usado do estoque e marca como usado. Retorna null se acabou o estoque. */
export async function claimCode(params: { buyerEmail: string; orderId: string }) {
  const supabase = getSupabaseAdmin();

  const { data: candidate, error: selectError } = await supabase
    .from("codes")
    .select("id, code")
    .eq("used", false)
    .limit(1)
    .maybeSingle();

  if (selectError) throw selectError;
  if (!candidate) return null; // estoque zerado

  const { data: claimed, error: updateError } = await supabase
    .from("codes")
    .update({
      used: true,
      used_at: new Date().toISOString(),
      buyer_email: params.buyerEmail,
      order_id: params.orderId,
    })
    .eq("id", candidate.id)
    .eq("used", false) // evita corrida: só atualiza se ainda não foi pego por outra requisição
    .select("code")
    .maybeSingle();

  if (updateError) throw updateError;
  // Se claimed vier null, outra requisição pegou esse código no meio do caminho.
  return claimed?.code ?? null;
}
