// Scroll progress bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  
    // Header shrink toggle
    const header = document.getElementById('header');
    if(scrollTop > 80) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });
  
  // Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const primaryNav = document.getElementById('primary-nav');
  const mobileNavLinks = mobileNav.querySelectorAll('a');
  
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    mobileNav.classList.toggle('open');
    mobileNav.setAttribute('aria-hidden', expanded);
  
    // Set tab index states for links for accessibility
    mobileNavLinks.forEach(link => {
      link.tabIndex = expanded ? -1 : 0;
    });
  });
  
  // Close mobile nav on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', false);
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', true);
      mobileNavLinks.forEach(l => l.tabIndex = -1);
    });
  });
  
  
  // Intersection Observer for reveal animations
  document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    const aboutSection = document.getElementById('about');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const contactSection = document.getElementById('contact');
  
    const observerOptions = { threshold: 0.3 };
  
    // Features, Pricing cards, About, Contact reveal
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    features.forEach(el => revealObserver.observe(el));
    pricingCards.forEach(el => revealObserver.observe(el));
    revealObserver.observe(aboutSection);
    revealObserver.observe(contactSection);
  
    // FAQ toggle logic
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      question.addEventListener('click', () => {
        const expanded = question.getAttribute('aria-expanded') === 'true';
        question.setAttribute('aria-expanded', !expanded);
        answer.classList.toggle('open', !expanded);
        if(!expanded) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
      });
      question.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  });
  
  // Testimonial Carousel
  document.addEventListener('DOMContentLoaded', () => {
    const testimonialList = document.getElementById('testimonial-list');
    const testimonials = testimonialList.children;
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentIndex = 0;
  
    function updateCarousel() {
      const offset = -currentIndex * (testimonials[0].offsetWidth + 18);
      testimonialList.style.transform = `translateX(${offset}px)`;
      Array.from(testimonials).forEach((t, i) => {
        t.classList.toggle('visible', i === currentIndex);
      });
    }
  
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateCarousel();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateCarousel();
    });
  
    // Initialize
    updateCarousel();
  
    // Keyboard navigation support
    prevBtn.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevBtn.click(); } });
    nextBtn.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextBtn.click(); } });
  
  });
  
  // Contact Form Validation and Submission (dummy)
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const nameError = form.querySelector('#name-error');
    const emailError = form.querySelector('#email-error');
    const messageError = form.querySelector('#message-error');
    const formMessage = document.getElementById('form-message');
  
    let valid = true;
  
    // Reset errors
    [nameError, emailError, messageError].forEach(el => el.textContent = '');
    formMessage.textContent = '';
    formMessage.classList.remove('error');
  
    if(name === '') {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }
    if(email === '') {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if(!/^\S+@\S+\.\S+$/.test(email)) {
      emailError.textContent = 'Please enter a valid email.';
      valid = false;
    }
    if(message === '') {
      messageError.textContent = 'Please enter your message.';
      valid = false;
    }
  
    if(!valid) {
      formMessage.textContent = 'Please fix errors above and try again.';
      formMessage.classList.add('error');
      return;
    }
  
    // Simulate submission delay
    formMessage.textContent = 'Sending...';
    formMessage.classList.remove('error');
  
    setTimeout(() => {
      formMessage.textContent = 'Message sent successfully! Thank you.';
      form.reset();
    }, 1400);
  });
  