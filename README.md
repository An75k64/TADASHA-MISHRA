# TADASHA-SHARMA

## Contact / Correspondence email

The form posts to `POST /api/contact` and sends the message to:

- `CONTACT_TO` (defaults to `tadashamishraofficial@gmail.com`)

### Configure email sending (recommended)

Set `RESEND_API_KEY` (and optionally `EMAIL_FROM`) in your `.env.local` or in your hosting provider’s environment.

### Configure email sending (SMTP fallback)

If you’re running locally, you can also set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc. Note: many hosts (including Vercel) block outbound SMTP; in that case use an email API (Resend).
