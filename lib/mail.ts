import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendContactNotification({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  const to = process.env.NOTIFICATION_EMAIL || "01aditimukherjee@gmail.com"

  await resend.emails.send({
    from: `Portfolio <onboarding@resend.dev>`,
    to,
    subject: `New message from ${name} via portfolio`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  })
}
