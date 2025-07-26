import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const sendVerificationCode = async (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Il tuo codice di verifica VIDA-S',
    text: `Il tuo codice di verifica è: ${code}`,
  }

  await transporter.sendMail(mailOptions)
}
