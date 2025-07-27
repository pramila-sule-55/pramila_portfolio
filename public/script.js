// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
  });

  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  
  fadeElements.forEach(element => {
    appearOnScroll.observe(element);
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Initialize skill bars after they appear
  const skillBars = document.querySelectorAll('.skill-bar .progress div');
  
  const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.parentElement.previousElementSibling.textContent;
        const percentage = {
          'HTML': '90%',
          'CSS': '85%',
          'JavaScript': '80%',
          'Node.js': '75%',
          'MongoDB': '70%',
          'React': '65%'
        }[width];
        
        if (percentage) {
          entry.target.style.width = percentage;
        }
        skillBarObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
  });
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
});


    function playVideo() {
        const video = document.getElementById('demoVideo');
        const placeholder = document.querySelector('.video-placeholder');

        placeholder.style.display = 'none';   // Hide play icon and text
        video.style.display = 'block';        // Show the video
        video.play();                         // Play video
    }


    
  // Import Firebase core and Realtime Database
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

  // Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyB0dFxccwsg7TqqxlmckgyS6MWpIHOKAVg",
    authDomain: "portfoliocontactform-3464c.firebaseapp.com",
    databaseURL: "https://portfoliocontactform-3464c-default-rtdb.firebaseio.com",
    projectId: "portfoliocontactform-3464c",
    storageBucket: "portfoliocontactform-3464c.appspot.com",
    messagingSenderId: "338733918049",
    appId: "1:338733918049:web:0b08caa8aec596b2098720",
    measurementId: "G-SRB8CWR8P1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);  // ✅ This enables database access

  // Handle form submission
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("contact").value;
    const message = document.getElementById("message").value;

    // Create a new entry in database
    const newMessageRef = push(ref(db, "contactMessages"));
    set(newMessageRef, {
      name: name,
      email: email,
      phone: phone,
      message: message
    })
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
  });

  


