const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

admin.initializeApp();

/**
 * Cloud Function to send an email using Nodemailer.
 * Triggered by an HTTP POST request from the contact form.
 */
exports.sendEmail = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(405).send({ message: "Only POST requests are allowed" });
        }

        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send({ message: "Missing required fields: name, email, or message" });
        }

        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "divyanshchourey699@gmail.com",
                    pass: "sthq vgiy rzbw kghq"
                }
            });

            let info = await transporter.sendMail({
                from: `"Contact Form" <${email}>`, // Show the sender's email
                to: "divyanshchourey699@gmail.com", // Your designated email
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `
            });

            console.log("Email sent:", info.response);
            return res.status(200).send({ message: "Email sent successfully", response: info.response });
        } catch (error) {
            console.error("Error sending email:", error);
            return res.status(500).send({ message: "Error sending email", error: error.toString() });
        }
    });
});
