import { Resend } from "resend";

export async function sendCodeEmail(params: { to: string; code: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY / RESEND_FROM_EMAIL não configuradas.");
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: params.to,
    subject: "Seu código de acesso",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Pagamento confirmado!</h2>
        <p>Aqui está o seu código de acesso:</p>
        <p style="font-size: 22px; font-weight: bold; letter-spacing: 2px; background: #f4f4f4; padding: 12px 16px; border-radius: 8px; text-align: center;">
          ${params.code}
        </p>
        <p>Guarde este código com cuidado.</p>
      </div>
    `,
  });

  if (error) throw error;
}
