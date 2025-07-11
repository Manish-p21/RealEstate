import React, { useState, useEffect } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTimes, FaStar, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ContactUs = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone number must be 10 digits";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFormErrors({});
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 2000);
  };

  // Handle newsletter submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError("Email is invalid");
      return;
    }
    setNewsletterError("");
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setNewsletterSuccess(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSuccess(false), 3000);
    }, 2000);
  };

  // Toggle FAQ
  const toggleFaq = (index) => {
    setIsFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Embedded CSS with animations
  const styles = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
    .animate-slideUp { animation: slideUp 0.9s ease-out; }
    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
      background: #f9fafb;
    }
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: white;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .card:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-4px);
    }
    .btn-primary {
      background: linear-gradient(135deg, #1f2937, #4b5563);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-primary:hover {
      background: linear-gradient(135deg, #374151, #6b7280);
      transform: translateY(-1px);
    }
    .btn-primary:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }
    .input-field {
      border: 1px solid #d1d5db;
      border-radius: 8px;
      padding: 0.75rem;
      width: 100%;
      transition: border-color 0.3s ease;
    }
    .input-field:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    .error-text {
      color: #dc2626;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
    .faq-item {
      border-bottom: 1px solid #e5e7eb;
      padding: 1rem 0;
      cursor: pointer;
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }
    .faq-answer.open {
      max-height: 200px;
    }
    .map-container {
      border-radius: 12px;
      overflow: hidden;
      height: 400px;
    }
    .swiper-btn {
      background: linear-gradient(135deg, #1f2937, #4b5563);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .swiper-btn:hover {
      background: linear-gradient(135deg, #374151, #6b7280);
    }
    .team-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      border: 2px solid #e5e7eb;
    }
    .social-icon {
      font-size: 1.5rem;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .social-icon:hover {
      transform: scale(1.2);
    }
    .service-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }
    .blog-img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
    }
    @media (max-width: 640px) {
      .contact-container {
        padding: 0.5rem;
      }
      .px-80 {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .mt-20 {
        margin-top: 4rem;
      }
      .pb-20 {
        padding-bottom: 4rem;
      }
      .text-4xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      .text-3xl {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      .text-2xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      .grid-cols-3, .grid-cols-2 {
        grid-template-columns: 1fr;
      }
      .gap-6 {
        gap: 1rem;
      }
      .gap-12 {
        gap: 2rem;
      }
      .max-w-2xl {
        max-width: 100%;
      }
      .max-w-md {
        max-width: 100%;
      }
      .p-8 {
        padding: 1.5rem;
      }
      .p-6 {
        padding: 1rem;
      }
      .py-12 {
        padding-top: 2rem;
        padding-bottom: 2rem;
      }
      .mb-12 {
        margin-bottom: 2rem;
      }
      .mb-8 {
        margin-bottom: 1.5rem;
      }
      .mb-6 {
        margin-bottom: 1rem;
      }
      .map-container {
        height: 250px;
      }
      .service-img {
        height: 120px;
      }
      .blog-img {
        height: 100px;
      }
      .team-img {
        width: 60px;
        height: 60px;
      }
      .btn-primary {
        padding: 0.5rem 1rem;
      }
      .input-field {
        padding: 0.5rem;
      }
      .swiper-slide {
        width: 100% !important;
      }
      .flex.gap-488 {
        flex-direction: column;
        gap: 1rem;
      }
      .btn-primary.w-full {
        width: 100%;
      }
    }
    @media (min-width: 641px) and (max-width: 1024px) {
      .contact-container {
        padding: 1rem;
      }
      .px-80 {
        padding-left: 2rem;
        padding-right: 2rem;
      }
      .mt-20 {
        margin-top: 5rem;
      }
      .pb-20 {
        padding-bottom: 5rem;
      }
      .text-4xl {
        font-size: 2.25rem;
        line-height: 2.5rem;
      }
      .text-3xl {
        font-size: 1.875rem;
        line-height: 2.25rem;
      }
      .text-2xl {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      .grid-cols-3 {
        grid-template-columns: 1fr 1fr;
      }
      .grid-cols-2 {
        grid-template-columns: 1fr;
      }
      .gap-6 {
        gap: 1.5rem;
      }
      .gap-12 {
        gap: 2.5rem;
      }
      .max-w-2xl {
        max-width: 90%;
      }
      .max-w-md {
        max-width: 80%;
      }
      .p-8 {
        padding: 2rem;
      }
      .p-6 {
        padding: 1.5rem;
      }
      .py-12 {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
      }
      .mb-12 {
        margin-bottom: 2.5rem;
      }
      .mb-8 {
        margin-bottom: 2rem;
      }
      .mb-6 {
        margin-bottom: 1.5rem;
      }
      .map-container {
        height: 350px;
      }
      .service-img {
        height: 150px;
      }
      .blog-img {
        height: 120px;
      }
      .team-img {
        width: 80px;
        height: 80px;
      }
      .btn-primary {
        padding: 0.6rem 1.2rem;
      }
      .input-field {
        padding: 0.6rem;
      }
      .swiper-slide {
        width: 50% !important;
      }
      .flex.gap-4 {
        flex-direction: row;
        gap: 1.5rem;
      }
    }
  `;

  // FAQ data
  const faqs = [
    { question: "How can I contact support?", answer: "You can reach us via email, phone, or by filling out the contact form above." },
    { question: "What are your business hours?", answer: "We are available 24/7 to assist you with any inquiries." },
    { question: "How long does it take to get a response?", answer: "We typically respond within 24 hours, but urgent queries are prioritized." },
    { question: "Can I visit your office?", answer: "Yes, our office is open for visits. Please schedule an appointment via the contact form." },
  ];

  // Testimonial data with verified Unsplash images
  const testimonials = [
    { name: "Anita Sharma", location: "Mumbai", text: "The team was incredibly responsive and helped us with all our queries!", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" },
    { name: "Vikram Patel", location: "Delhi", text: "Excellent customer service. They made the process seamless.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=TABLET-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" },
    { name: "Priya Nair", location: "Bangalore", text: "Highly professional and quick to respond. Highly recommend!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" },
  ];

  // Team data with verified Unsplash images
  const team = [
    { name: "Rahul Kapoor", role: "Customer Success Manager", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" },
    { name: "Sneha Gupta", role: "Support Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" },
    { name: "Isha Mehra", role: "Technical Advisor", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  // Social media data
  const socialMedia = [
    { name: "Twitter", icon: <FaTwitter />, link: "https://twitter.com/xai", color: "hover:text-blue-400" },
    { name: "Facebook", icon: <FaFacebook />, link: "https://facebook.com/xai", color: "hover:text-blue-600" },
    { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com/xai", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com/company/xai", color: "hover:text-blue-700" },
  ];

  // Services data with verified Unsplash images
  const services = [
    { title: "AI Consulting", description: "Expert guidance on integrating AI into your business.", img: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Technical Support", description: "24/7 support for all your technical needs.", img: "https://images.unsplash.com/photo-1553775282-20af80779df7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Training Programs", description: "Customized AI training for your team.", img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=200&q=80" },
  ];

  // Blog posts data with verified Unsplash images
  const blogPosts = [
    { title: "The Future of AI in Business", excerpt: "Explore how AI is transforming industries.", img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "#" },
    { title: "Top 5 AI Trends in 2025", excerpt: "Stay ahead with the latest AI innovations.", img: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "#" },
    { title: "How to Implement AI Safely", excerpt: "Best practices for secure AI adoption.", img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link: "#" },
  ];

  return (
    <div className="bg-white mt-20 pb-20 px-80 w-full ">
      {/* Embedded Styles */}
      <style>{styles}</style>

      {/* Hero Section */}
      <div className="text-center mb-12 mt-16">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We're here to help you with any questions or concerns. Reach out to us via the form below, call us, or visit our office.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <FaPhone />, title: "Call Us", value: "+91 99999 99999", action: "tel:+9180088 00808" },
          { icon: <FaEnvelope />, title: "Email Us", value: "brand@gmail.com", action: "mailto:brand@gmail.com" },
          { icon: <FaMapMarkerAlt />, title: "Visit Us", value: "1234, Tower, Mumbai, India" },
        ].map((item, index) => (
          <div key={index} className="card p-6 text-center animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="text-3xl text-gray-900 mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            {item.action ? (
              <a href={item.action} className="text-gray-600 hover:text-blue-600 transition-colors">
                {item.value}
              </a>
            ) : (
              <p className="text-gray-600">{item.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Our Services Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-slideUp">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="card p-6 animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
              <img src={service.img} alt={service.title} className="service-img mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Form */}
        <div className="card p-8 text-black animate-slideUp">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>
          {submitSuccess && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 animate-fadeIn">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`input-field ${formErrors.name ? "border-red-500" : ""}`}
                placeholder="Enter your name"
              />
              {formErrors.name && <p className="error-text">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`input-field ${formErrors.email ? "border-red-500" : ""}`}
                placeholder="Enter your email"
              />
              {formErrors.email && <p className="error-text">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`input-field ${formErrors.phone ? "border-red-500" : ""}`}
                placeholder="Enter your phone number"
              />
              {formErrors.phone && <p className="error-text">{formErrors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className={`input-field ${formErrors.message ? "border-red-500" : ""}`}
                placeholder="Enter your message"
              ></textarea>
              {formErrors.message && <p className="error-text">{formErrors.message}</p>}
            </div>
            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="map-container animate-slideUp">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627997975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card p-8 mb-12 animate-slideUp">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              <span className="text-gray-600">{isFaqOpen[index] ? "−" : "+"}</span>
            </div>
            <div className={`faq-answer ${isFaqOpen[index] ? "open" : ""}`}>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-slideUp">
          What Our Customers Say
        </h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg border border-gray-200 h-full animate-fadeIn">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Recent Blog Posts Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-slideUp">
          Recent Blog Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="card p-6 animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
              <img src={post.img} alt={post.title} className="blog-img mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a href={post.link} className="text-blue-600 hover:underline">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 animate-slideUp">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="card p-6 text-center animate-slideUp" style={{ animationDelay: `${index * 0.2}s` }}>
              <img src={member.img} alt={member.name} className="team-img mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Section */}
      <div className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 animate-slideUp">
          Connect With Us
        </h2>
        <div className="flex justify-center gap-6">
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-icon text-gray-600 ${social.color}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="py-12 px-6">
        <div className="card p-8 text-center animate-slideUp">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Stay updated with the latest news, AI insights, and exclusive offers.
          </p>
          {newsletterSuccess && (
            <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 animate-fadeIn">
              Thank you for subscribing!
            </div>
          )}
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className={`input-field ${newsletterError ? "border-red-500" : ""}`}
                  placeholder="Enter your email"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {newsletterError && <p className="error-text text-left">{newsletterError}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-12 px-6 rounded-lg text-center animate-slideUp">
        <h2 className="text-3xl font-semibold text-white mb-4">Need Immediate Assistance?</h2>
        <p className="text-gray-300 max-w-lg mx-auto mb-6 text-sm">
          Our support team is available 24/7 to help you with any questions or concerns.
        </p>
        <a href="tel:+911234567890" className="btn-primary px-8 py-3">
          Call Us Now
        </a>
      </div>
    </div>
  );
};

export default ContactUs;