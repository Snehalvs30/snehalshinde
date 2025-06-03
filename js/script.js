// Elements
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const tabBtns = document.querySelectorAll('.tab-btn');
const expTabs = document.querySelectorAll('.experience-tab');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const yearElement = document.getElementById('current-year');

// Set current year in footer
yearElement.textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Update active navigation link based on scroll position
  const sections = document.querySelectorAll('section');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
  
  // Animate elements when they come into view
  animateOnScroll();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    
    // Smooth scroll to section
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Project filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.classList.add('visible');
        }, 100);
      } else {
        card.classList.remove('visible');
        card.style.display = 'none';
      }
    });
  });
});

// Experience tabs
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons and tabs
    tabBtns.forEach(b => b.classList.remove('active'));
    expTabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Show corresponding tab
    const targetTab = document.getElementById(btn.getAttribute('data-target'));
    targetTab.classList.add('active');
  });
});

// // Contact form submission
// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   // Get form data
//   const formData = new FormData(contactForm);
//   const formValues = Object.fromEntries(formData.entries());
  
//   // Simple form validation
//   if (!formValues.name || !formValues.email || !formValues.message) {
//     showToast('Please fill all fields');
//     return;
//   }
  
//   // Simulate form submission
//   showToast('Message sent successfully!');
//   contactForm.reset();
// });

// // Show toast notification
// function showToast(message) {
//   const toastMessage = document.querySelector('.toast-message');
//   toastMessage.textContent = message;
  
//   toast.classList.add('show');
  
//   setTimeout(() => {
//     toast.classList.remove('show');
//   }, 3000);
// }
// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData.entries());
  
  // Simple form validation
  if (!formValues.name || !formValues.email || !formValues.message) {
    showToast('Please fill all fields');
    return;
  }
  
  // Show loading toast
  showToast('Sending message...');
  
  // Prepare template parameters
  const templateParams = {
    from_name: formValues.name,
    from_email: formValues.email,
    message: formValues.message,
    to_email: 'shinde.sne@northeastern.edu'
  };
  
  // Send email using EmailJS
  emailjs.send('service_id', 'template_id', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      showToast('Message sent successfully!');
      contactForm.reset();
    }, function(error) {
      console.log('FAILED...', error);
      showToast('Failed to send message. Please try again.');
    });
});
// Animate elements when they come into view
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in');
  
  animatedElements.forEach(elem => {
    const elementTop = elem.getBoundingClientRect().top;
    const elementBottom = elem.getBoundingClientRect().bottom;
    
    // If element is in viewport
    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      elem.classList.add('visible');
    }
  });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Set active tab for experience section
  tabBtns[0].classList.add('active');
  expTabs[0].classList.add('active');
  
  // Initialize animations
  animateOnScroll();
});
