import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParallax } from 'react-scroll-parallax';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 4000);
            } else {
                setError(data.error || 'Something went wrong.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='ai-contact-form'>
            <div className='ai-contact-form-group'>
                <input
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='ai-contact-input'
                />
            </div>
            <div className='ai-contact-form-group'>
                <input
                    type='email'
                    name='email'
                    placeholder='Your Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='ai-contact-input'
                />
            </div>
            <div className='ai-contact-form-group'>
                <textarea
                    name='message'
                    placeholder='Your Message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className='ai-contact-input ai-contact-textarea'
                />
            </div>
            <button type='submit' disabled={loading} className={`ai-button ai-contact-submit-btn ${submitted ? 'ai-submitted' : ''}`}>
                {loading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>
            {error && <div className='ai-contact-error'>{error}</div>}
        </form>
    );
};

const Contact = ({ data: {
    label,
    heading,
    description,
    button,
    phone,
    email,
    designAndBuiltBy,
    copyright,
} }) => {

    const { ref } = useParallax({
        easing: 'easeIn',
        translateX: [-50, 0]
    });
    return (
        <div className='ai-contact'>
            <div
                ref={ref}
                className='ai-contact-zebra-img'
                style={{
                    backgroundImage: `url(${'/assets/arrow-sample.svg'})`,
                }}>
            </div>
            <div className='ai-contact-box'>
                <div className='container flex-center flex-column'>
                    <div className='ai-contact-box-width'>
                        <div className='ai-contact-label'>{label}</div>
                        <div className='ai-contact-title'>{heading}</div>
                        <div className='ai-contact-text'>{description}</div>
                        {phone && <div className='ai-contact-info'>📞 {phone}</div>}
                        {email && <div className='ai-contact-info'>✉️ {email}</div>}
                        <ContactForm />
                        <div className='ai-contact-button'>
                            <button onClick={button?.onClick} className='ai-button'>
                                {button?.label}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className='ai-footer'>
                <div className='ai-footer-content'>
                    <div className='ai-footer-name'>{designAndBuiltBy}</div>
                    <div className='ai-footer-copyright'>{copyright}</div>
                </div>
            </footer>
        </div>
    )
}

Contact.propTypes = {}

export default Contact