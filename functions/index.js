const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { onRequest } = require("firebase-functions/v2/https");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://striga-digital.web.app"],
    methods: "POST,OPTIONS",
  })
);
app.use(express.json());

const adminEmail = process.env.GMAIL_EMAIL || "leo.striga@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminEmail,
    pass: process.env.GMAIL_PASSWORD || "qlpy syrx deye jvdz",
  },
});

app.post("/sendContactEmail", async (req, res) => {
  const { name, email, message, lang = "hr" } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Croatian user template
  const hrTemplate = `
    <body style="background-color:#fff; margin:0; padding:0; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff">
        <tr>
          <td align="center" valign="top">
            <table width="100%" style="max-width:480px; margin: 0 auto; border:1.5px solid #534e7d; border-radius:16px; overflow:hidden;">
              <tr>
                <td style="padding:32px 24px 16px 24px; text-align:center;">
                  <h1 style="font-size: 2.5em; color: #222; margin: 0 0 16px 0; font-weight:400;">Štriga Digital</h1>
                  <hr style="border:1px solid #534e7d; margin:16px 0;">
                </td>
              </tr>
              <tr>
                <td style="padding:0 24px 32px 24px;">
                  <p style="font-size:1.1em; color:#534e7d; margin:0 0 12px 0;"><b>Pozdrav ${name},</b></p>
                  <p style="font-size:1em; color:#555; margin:0 0 18px 0;">Hvala Vam što ste nas kontaktirali! Primili smo Vaš upit i uskoro ćemo Vam se javiti.</p>
                  <p style="font-size:1em; color:#333; margin:0 0 8px 0;"><strong>Sažetak vašeg upita:</strong></p>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fa;border-radius:8px;">
                    <tr>
                      <td style="padding:10px 14px;">
                        <div style="font-size:1em; color:#222; margin-bottom:6px;"><strong>Ime i Prezime:</strong> <span style="color:#000;">${name}</span></div>
                        <div style="font-size:1em; color:#222; margin-bottom:6px;"><strong>Email:</strong> <span style="color:#000;">${email}</span></div>
                        <div style="font-size:1em; color:#222;"><strong>Poruka:</strong><br><span style="color:#000;">${message}</span></div>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:1em; color:#555; margin:18px 0 0 0;">Ako imate dodatnih pitanja, slobodno nas kontaktirajte.</p>
                  <hr style="border:1px solid #534e7d; margin:24px 0 12px 0;">
                  <p style="font-size:1em; color:#534e7d; margin:0 0 2px 0; padding-bottom:0;"><strong>Srdačno,<br>Štriga Digital tim</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `;

  // English user template
  const enTemplate = `
    <body style="background-color:#fff; margin:0; padding:0; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff">
        <tr>
          <td align="center" valign="top">
            <table width="100%" style="max-width:480px; margin: 0 auto; border:1.5px solid #534e7d; border-radius:16px; overflow:hidden;">
              <tr>
                <td style="padding:32px 24px 16px 24px; text-align:center;">
                  <h1 style="font-size: 2.5em; color: #222; margin: 0 0 16px 0; font-weight:400;">Štriga Digital</h1>
                  <hr style="border:1px solid #534e7d; margin:16px 0;">
                </td>
              </tr>
              <tr>
                <td style="padding:0 24px 32px 24px;">
                  <p style="font-size:1.1em; color:#534e7d; margin:0 0 12px 0;"><b>Hello ${name},</b></p>
                  <p style="font-size:1em; color:#555; margin:0 0 18px 0;">Thank you for contacting us! We've received your message and will respond shortly.</p>
                  <p style="font-size:1em; color:#333; margin:0 0 8px 0;"><strong>Your message summary:</strong></p>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fa;border-radius:8px;">
                    <tr>
                      <td style="padding:10px 14px;">
                        <div style="font-size:1em; color:#222; margin-bottom:6px;"><strong>Name:</strong> <span style="color:#000;">${name}</span></div>
                        <div style="font-size:1em; color:#222; margin-bottom:6px;"><strong>Email:</strong> <span style="color:#000;">${email}</span></div>
                        <div style="font-size:1em; color:#222;"><strong>Message:</strong><br><span style="color:#000;">${message}</span></div>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:1em; color:#555; margin:18px 0 0 0;">If you have additional questions, feel free to contact us.</p>
                  <hr style="border:1px solid #534e7d; margin:24px 0 12px 0;">
                  <p style="font-size:1em; color:#534e7d; margin:0 0 2px 0; padding-bottom:0;"><strong>Best regards,<br>Štriga Digital Team</strong></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `;

  // Admin notification template (Croatian)
  const adminHrTemplate = `
    <body style="background-color:#fff; margin:0; padding:0; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff">
        <tr>
          <td align="center" valign="top">
            <table width="100%" style="max-width:480px; margin: 0 auto; border:1.5px solid #534e7d; border-radius:16px; overflow:hidden;">
              <tr>
                <td style="padding:32px 24px 16px 24px; text-align:center;">
                  <h1 style="font-size: 2.5em; color: #222; margin: 0 0 16px 0; font-weight:400;">Štriga Digital</h1>
                  <hr style="border:1px solid #534e7d; margin:16px 0;">
                </td>
              </tr>
              <tr>
                <td style="padding:0 24px 32px 24px;">
                  <p style="font-size:1.1em; color:#534e7d; margin:0 0 12px 0;"><b>Novi upit od korisnika:</b></p>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f6f8fa;border-radius:8px;">
                    <tr>
                      <td style="padding:10px 14px;">
                        <div style="font-size:1em; color:#222; margin-bottom:6px;"><strong>Ime i Prezime:</strong> <span style="color:#000;">${name}</span></div>
                        <div style="font-size:1em; color:#222; margin-bottom:6px;"><strong>Email:</strong> <span style="color:#000;">${email}</span></div>
                        <div style="font-size:1em; color:#222;"><strong>Poruka:</strong><br><span style="color:#000;">${message}</span></div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `;

  try {
    // Send user confirmation (language-based)
    await transporter.sendMail({
      from: `Striga Digital <${adminEmail}>`,
      to: email,
      subject:
        lang === "en"
          ? "Thank you for contacting Štriga Digital!"
          : "Hvala na kontaktu - Štriga Digital",
      html: lang === "en" ? enTemplate : hrTemplate,
    });

    // Send admin notification (Croatian)
    await transporter.sendMail({
      from: `Contact Form <${adminEmail}>`,
      to: adminEmail,
      subject: `Novi upit od ${name}`,
      html: adminHrTemplate,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: error.message });
  }
});

exports.api = onRequest(app);
