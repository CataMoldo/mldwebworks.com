import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, note } = await req.json();
  await resend.emails.send({
    from: 'MLD Webworks <onboarding@resend.dev>', // Verifică domeniul în Resend
    to: to,
    subject: 'Update proiect MLD Webworks',
    html: `<p>Salut! Proiectul tău a fost actualizat:</p><p>${note}</p>`
  });
  return Response.json({ success: true });
}