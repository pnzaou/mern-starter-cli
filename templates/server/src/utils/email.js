const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: html,
    });

    console.log('Email envoyé:', data);
    return data;
  } catch (error) {
    console.error('Erreur envoi email:', error);
    throw error;
  }
};