export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - BecBillDESK</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🔐 Verify Your BecBillDESK Account</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up with <strong>BecBillDESK</strong>! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #10b981;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 24 hours for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br><strong>BecBillDESK Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BecBillDESK</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🎉 Welcome to BecBillDESK!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello <strong>{name}</strong>,</p>
    <p>Welcome to <strong>BecBillDESK</strong> - Redefining the world's largest shared payment system!</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #10b981; color: white; width: 80px; height: 80px; line-height: 80px; border-radius: 50%; display: inline-block; font-size: 40px;">
        ✓
      </div>
    </div>
    <p>Your email has been successfully verified and your account is now active.</p>
    <p>You can now enjoy all the features of BecBillDESK:</p>
    <ul style="line-height: 2;">
      <li>✅ Fast and secure fee payments</li>
      <li>✅ Real-time transaction tracking</li>
      <li>✅ Digital receipt management</li>
      <li>✅ 24/7 customer support</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{dashboardURL}" style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Go to Dashboard</a>
    </div>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p>Best regards,<br><strong>BecBillDESK Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful - BecBillDESK</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🔒 Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset for your <strong>BecBillDESK</strong> account.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #10b981; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
      <li>Never share your password with anyone</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br><strong>BecBillDESK Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - BecBillDESK</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">🔑 Password Reset Request</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password for your <strong>BecBillDESK</strong> account. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #10b981; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #10b981;">{resetURL}</p>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>If you continue to have problems, please contact our support team.</p>
    <p>Best regards,<br><strong>BecBillDESK Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;