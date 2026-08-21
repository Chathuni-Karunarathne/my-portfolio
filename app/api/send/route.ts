import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: "All fields are required" }, { status: 400 });
        }

        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["chathunik27@gmail.com"],
            replyTo: email,
            subject: `New Portfolio Message from ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2>New Portfolio Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 8px;">${message}</p>
                </div>
            `,
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}
