// Smooth Scroll for Navigation
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Modal Popup for Hero Section CTA Button
  const ctaButton = document.querySelector('.cta');
  ctaButton.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.padding = '20px';
    modal.style.background = 'white';
    modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
      <h3>Welcome!</h3>
      <p>Thank you for clicking the Get Started button. Explore our services and feel free to reach out!</p>
      <button id="closeModal" style="background: #ff6347; color: white; border: none; padding: 10px; border-radius: 5px;">Close</button>
    `;
    document.body.appendChild(modal);
  
    document.getElementById('closeModal').addEventListener('click', () => {
      modal.remove();
    });
  });
  
  // Toggle FAQs
  document.querySelectorAll('.faq-item h3').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      question.classList.toggle('expanded');
    });
  });
  
  // Form Validation
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
  
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    alert('Form submitted successfully!');
    form.reset();
  });
  
  // Testimonials Slider with Controls
  let currentSlide = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
  }
  showTestimonial(currentSlide);
  
  const nextButton = document.createElement('button');
  const prevButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.style.width = "100px"
  nextButton.style.height = "30px"
  nextButton.style.backgroundColor = " #ff4500";
  nextButton.style.color = "white";
  nextButton.style.border = "1px solid transparent";
  nextButton.style.borderRadius = "5px";
  nextButton.style.position = "relative";
  nextButton.style.top = "30px" 
  prevButton.textContent = 'Previous';
  prevButton.style.width = "100px";
  prevButton.style.height = "30px";
  prevButton.style.backgroundColor = " #ff4500";
  prevButton.style.color = "white";
  prevButton.style.border = "1px solid transparent";
  prevButton.style.borderRadius = "5px";
  prevButton.style.position = "relative";
  prevButton.style.top = "30px" 
  document.querySelector('.testimonials-container').append(prevButton, nextButton);
  
  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showTestimonial(currentSlide);
  });
  
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentSlide);
  });
  
  // Auto Slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showTestimonial(currentSlide);
  }, 3000);
  
  // Back-to-Top Button
  const backToTopButton = document.createElement('button');
  backToTopButton.textContent = '⬆ Top';
  backToTopButton.style.position = 'fixed';
  backToTopButton.style.bottom = '20px';
  backToTopButton.style.right = '20px';
  backToTopButton.style.padding = '10px';
  backToTopButton.style.background = '#ff6347';
  backToTopButton.style.color = 'white';
  backToTopButton.style.border = 'none';
  backToTopButton.style.borderRadius = '5px';
  backToTopButton.style.cursor = 'pointer';
  backToTopButton.style.display = 'none';
  document.body.appendChild(backToTopButton);
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  
  // Highlight Active Section in Navigation
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav ul li a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 50) {
        current = section.getAttribute('id');
      }
    });
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Dynamic Footer Year
  const yearElement = document.querySelector('.year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Lazy Loading Images
  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => observer.observe(img));
  
  // Dark Mode Toggle
  const darkModeToggle = document.createElement('button');
  darkModeToggle.textContent = '🌙 Dark Mode';
  darkModeToggle.style.position = 'fixed';
  darkModeToggle.style.top = '20px';
  darkModeToggle.style.right = '20px';
  darkModeToggle.style.padding = '10px';
  darkModeToggle.style.background = '#444';
  darkModeToggle.style.color = 'white';
  darkModeToggle.style.border = 'none';
  darkModeToggle.style.borderRadius = '5px';
  darkModeToggle.style.cursor = 'pointer';
  document.body.appendChild(darkModeToggle);
  
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      darkModeToggle.textContent = '☀ Light Mode';
    } else {
      darkModeToggle.textContent = '🌙 Dark Mode';
    }
  });