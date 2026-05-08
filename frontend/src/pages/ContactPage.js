import { useState } from 'react';

export default function ContactPage() {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim()) {
      alert('Please enter a message before sending.');
      return;
    }
    setSent(true);
    setMessage('');
    alert('Message sent successfully!');
  };

  return (
    <div className="page-shell">
      <div className="page-panel">
        <div className="section-header">
          <div>
            <p className="breadcrumbs">Home / Contact</p>
            <h1>Contact Us</h1>
          </div>
        </div>
        <div className="contact-panel">
          <div className="contact-card">
            <h2>Need help?</h2>
            <p>Reach out for questions, order updates, or styling advice.</p>
            <p>
              Email: support@shoply.com
              <br />
              Phone: +1 234-567-890
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Your Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={8}
                placeholder="Tell us how we can help."
              />
            </label>
            <button className="button button-primary" type="submit">
              Send Message
            </button>
            {sent && <p className="summary-note">Thank you — we will reply shortly.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
