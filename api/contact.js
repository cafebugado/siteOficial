import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: subject ? `[Contato] ${subject}` : `[Contato] Mensagem de ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject || '—'}\n\nMensagem:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Erro ao enviar mensagem. Tente novamente.' });
  }
}
