export const verifyCodeTemplate = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Email verification code</title>
  <style>
    body{margin:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;color:#0f172a}
    .container{max-width:600px;margin:40px auto;padding:20px}
    .card{background:#fff;border-radius:8px;padding:24px;text-align:center;box-shadow:0 2px 8px rgba(15,23,42,0.06)}
    .brand{font-weight:700;font-size:20px;margin-bottom:12px;color:red}
    .msg{font-size:16px;margin:10px 0 18px}
    .code{display:inline-block;padding:14px 18px;border-radius:8px;background:#f1f5f9;font-size:24px;letter-spacing:6px;font-weight:700}
    .note{font-size:13px;color:#64748b;margin-top:18px}
    @media (max-width:480px){.container{margin:20px;padding:12px}.code{font-size:20px;padding:12px 14px}}
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="brand">Simupay</div>
      <div class="msg">Hi there, use the code below to verify your email:</div>
      <div class="code">{CODE}</div>
      <p style="font-size: 16px; margin-top: 20px;">Copy the above token and paste it on the verification page.</p>
      <div class="note">This code expires in 5 minutes. If you didn't request this, please ignore.</div>
    </div>
  </div>
</body>
</html>
`

export const welcomeEmailTemplate = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Welcome to simupay</title>
  <style>
    body{margin:0;background:#f6f8fb;font-family:Inter, Arial, Helvetica, sans-serif;color:#0f172a}
    .wrap{max-width:600px;margin:36px auto;padding:16px}
    .card{background:#ffffff;border-radius:10px;padding:28px;box-shadow:0 6px 18px rgba(15,23,42,0.06)}
    .logo{font-weight:700;font-size:20px;margin-bottom:8px;color:red;text-align:center}
    .headline{font-size:18px;font-weight:700;margin:12px 0}
    .lead{font-size:15px;line-height:1.5;margin:8px 0 18px;color:#334155}
    .cta{display:inline-block;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600}
    .cta-primary{background:#2563eb;color:#fff}
    .secondary{margin-top:16px;font-size:13px;color:#64748b}
    .footer{margin-top:20px;font-size:12px;color:#94a3b8;text-align:center}
    @media (max-width:480px){.wrap{margin:18px 12px}.card{padding:20px}.headline{font-size:16px}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="logo">Simupay</div>
      <div class="headline">Hi, {USER_NAME}!</div>
      <div class='lead'>We're excited to have you on board! Thank you for signing up.</div>
      <div class="lead">Thanks for joining Simupay — we’re excited to have you. Get started by visiting your dashboard where you can set up your profile, explore features, and connect with the community.</div>
      <div class="secondary">Welcome again, and we look forward to working with you! </div>
      <div class="footer">If you have any questions, feel free to reach out to our support team. We're here to help!</div>
    </div>
  </div>
</body>
</html>

`
