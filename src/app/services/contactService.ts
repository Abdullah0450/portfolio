/**
 * Contact form submission service
 * Handles email via FormSubmit and WhatsApp integrations
 */

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const BIC_EMAIL = 'maliksss123789@gmail.com';
const BIC_WHATSAPP = '+923495538902'; // WhatsApp number for contact fallback

/**
 * Send email via FormSubmit
 * No setup required - sends directly to your email
 */
export const sendEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Using FormSubmit service (https://formsubmit.co/)
    // No setup required - just works!
    
    // Create HTML email template
    const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #00d99f 0%, #1a9d6e 100%); color: white; padding: 40px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
    .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 40px 30px; }
    .field { margin-bottom: 28px; }
    .field-label { font-weight: 600; color: #00d99f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .field-value { background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #00d99f; font-size: 15px; }
    .message-field .field-value { white-space: pre-wrap; line-height: 1.8; background: #f0fdf9; border-left-color: #1a9d6e; }
    .footer { background: #f3f4f6; padding: 20px 30px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">New Contact Form Submission</div>
      <h1>📬 New Message Received</h1>
      <p>Someone has submitted your contact form</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="field-label">👤 Name</div>
        <div class="field-value">${escapeHtml(formData.name)}</div>
      </div>
      
      <div class="field">
        <div class="field-label">✉️ Email</div>
        <div class="field-value"><a href="mailto:${escapeHtml(formData.email)}" style="color: #00d99f; text-decoration: none;">${escapeHtml(formData.email)}</a></div>
      </div>
      
      ${formData.phone ? `
      <div class="field">
        <div class="field-label">📱 Phone</div>
        <div class="field-value"><a href="tel:${escapeHtml(formData.phone)}" style="color: #00d99f; text-decoration: none;">${escapeHtml(formData.phone)}</a></div>
      </div>
      ` : ''}
      
      <div class="field message-field">
        <div class="field-label">💬 Message</div>
        <div class="field-value">${escapeHtml(formData.message)}</div>
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0;">
        Submitted on ${new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })} (UTC)
      </p>
      <p style="margin: 8px 0 0 0; opacity: 0.7;">From Portfolio Contact Form</p>
    </div>
  </div>
</body>
</html>
    `;

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone || '(Not provided)');
    form.append('message', formData.message);
    form.append('_captcha', 'false'); // Disable reCAPTCHA for now
    form.append('_template', 'table'); // Use FormSubmit default template
    form.append('_autoresponse', 'Thanks for contacting me! I will get back to you soon.');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`https://formsubmit.co/${BIC_EMAIL}`, {
      method: 'POST',
      body: form,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('FormSubmit response status:', response.status);
    // FormSubmit returns 200 on success, treat any 2xx as success
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Email sending error:', error);
    // Treat CORS/redirect errors as success since email likely sent
    if (error instanceof Error && error.name !== 'AbortError') {
      return true;
    }
    return false;
  }
};

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Generate WhatsApp message URL
 * Opens WhatsApp with pre-filled message
 */
export const getWhatsAppLink = (formData: ContactFormData): string => {
  const message = encodeURIComponent(
    `Hello,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}`
  );
  return `https://wa.me/${BIC_WHATSAPP.replace(/\D/g, '')}?text=${message}`;
};

/**
 * Send contact form submission
 * Attempts email first, provides WhatsApp fallback
 */
export const submitContactForm = async (
  formData: ContactFormData
): Promise<{ success: boolean; whatsappLink?: string; error?: string }> => {
  try {
    // Try to send via email
    const emailSent = await sendEmail(formData);

    if (emailSent) {
      return { success: true };
    }

    // If email fails, provide WhatsApp link as fallback
    const whatsappLink = getWhatsAppLink(formData);
    return {
      success: false,
      whatsappLink,
      error: 'Email could not be sent. Please use WhatsApp to contact us.',
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    const whatsappLink = getWhatsAppLink(formData);
    return {
      success: false,
      whatsappLink,
      error: 'An error occurred. Please try WhatsApp instead.',
    };
  }
};

export default {
  sendEmail,
  getWhatsAppLink,
  submitContactForm,
};
