import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { defineString, defineSecret } from "firebase-functions/params";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// ─── Params — replaces deprecated functions.config() ─────────────────────────
// These are set via: firebase functions:secrets:set EMAIL_USER (etc.)
// OR via a .env.local file in the functions directory
const EMAIL_USER = defineString("EMAIL_USER", { description: "Gmail address to send from" });
const EMAIL_PASS = defineSecret("EMAIL_PASS");  // Stored as a Google Cloud Secret
const ADMIN_EMAIL = defineString("ADMIN_EMAIL", { default: "krishnamaurya2204@gmail.com", description: "Admin recipient email" });

// ─── Transporter factory (called at runtime so params are resolved) ───────────
const makeTransporter = (pass: string) =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER.value(),
      pass,
    },
  });

// ─── onNewLead — triggers on every new document in 'leads' ───────────────────
export const onNewLead = functions
  .region("us-central1")
  .runWith({ secrets: ["EMAIL_PASS"] })
  .firestore.document("leads/{leadId}")
  .onCreate(async (
    snap: functions.firestore.QueryDocumentSnapshot,
    context: functions.EventContext,
  ) => {
    const lead = snap.data() as Record<string, unknown> & {
      name: string; businessName: string; businessType: string;
      phone: string; email: string; budget: string; message?: string;
      createdAt?: { toDate: () => Date };
    };
    const leadId = context.params["leadId"] as string;

    const emailUser = EMAIL_USER.value();
    const emailPass = EMAIL_PASS.value();
    const adminEmail = ADMIN_EMAIL.value();

    const submittedAt = lead.createdAt
      ? lead.createdAt.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const mailOptions = {
      from: `Scalvicon Alerts <${emailUser}>`,
      to: adminEmail,
      subject: `🚀 New Lead: ${lead.name} — ${lead.businessType}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#0d161f;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <div style="background:linear-gradient(135deg,#1a2a3a,#0d161f);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:28px 32px;margin-bottom:20px;text-align:center;">
      <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
        Scalvi<span style="color:#00e5a0;">con</span>
      </div>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:6px;margin-bottom:0;">
        New lead received — ${submittedAt} IST
      </p>
    </div>

    <div style="background:#1a2a3a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:28px 32px;margin-bottom:16px;">
      <h2 style="color:#00e5a0;font-size:18px;margin-top:0;margin-bottom:20px;">Contact Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;width:30%;">Name</td><td style="color:#fff;font-size:14px;font-weight:600;padding:6px 0;">${lead.name}</td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Business</td><td style="color:#fff;font-size:14px;padding:6px 0;">${lead.businessName}</td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Type</td><td style="color:#fff;font-size:14px;padding:6px 0;">${lead.businessType}</td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Phone</td><td style="font-size:14px;padding:6px 0;"><a href="tel:+91${lead.phone}" style="color:#00e5a0;text-decoration:none;">+91 ${lead.phone}</a></td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Email</td><td style="font-size:14px;padding:6px 0;"><a href="mailto:${lead.email}" style="color:#00e5a0;text-decoration:none;">${lead.email}</a></td></tr>
        <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">Budget</td><td style="color:#fff;font-size:14px;padding:6px 0;">${lead.budget}</td></tr>
      </table>
    </div>

    ${lead.message ? `
    <div style="background:#1a2a3a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px 32px;margin-bottom:16px;">
      <h3 style="color:rgba(255,255,255,0.6);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;margin-top:0;margin-bottom:12px;">Message</h3>
      <p style="color:#fff;font-size:14px;line-height:1.6;margin:0;">${lead.message}</p>
    </div>` : ""}

    <div style="text-align:center;margin:24px 0;">
      <a href="https://scalvicon-9bf2f.web.app/admin" style="display:inline-block;background:#00e5a0;color:#0d161f;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin:6px;">Open Admin Panel</a>
      <a href="https://wa.me/${lead.phone}?text=${encodeURIComponent(`Hi ${lead.name}! This is Scalvicon team. We received your inquiry for ${lead.businessType} website. Are you available for a quick call?`)}" style="display:inline-block;background:#25d366;color:#fff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin:6px;">WhatsApp Lead</a>
    </div>

    <p style="text-align:center;color:rgba(255,255,255,0.25);font-size:11px;margin-top:24px;">
      Scalvicon · Lead ID: ${leadId} · This is an automated alert
    </p>
  </div>
</body>
</html>`,
    };

    try {
      await makeTransporter(emailPass).sendMail(mailOptions);
      console.log(`✅ Email sent for lead ${leadId} (${lead.name})`);
    } catch (err) {
      console.error(`❌ Failed to send email for lead ${leadId}:`, err);
    }

    return null;
  });
