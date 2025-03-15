document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const header = document.querySelector('.site-header');
  const darkModeBtn = document.getElementById('darkModeBtn');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const body = document.body;
  
  // Check for saved dark mode preference
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  }
  
  // Toggle dark mode
  darkModeBtn.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      body.classList.toggle('mobile-menu-open');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (body.classList.contains('mobile-menu-open') && 
        !e.target.closest('nav') && 
        !e.target.closest('.mobile-menu-btn')) {
      body.classList.remove('mobile-menu-open');
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        body.classList.remove('mobile-menu-open');
        
        // Scroll to element
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.padding = 'var(--spacing-md) 0';
      header.style.boxShadow = 'var(--shadow-sm)';
    }
  });
  
  // Create animation for materi items
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slide-up 0.5s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.materi-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.animationDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
  
  // Function to enable dark mode
  function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    
    // Update dark mode button icon
    if (darkModeBtn) {
      darkModeBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zM12 17a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zM20 12a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM6 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM17.657 5.343a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM7.757 15.243a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 0 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0zM17.657 18.657a1 1 0 0 1-1.414 0l-1.414-1.414a1 1 0 0 1 1.414-1.414l1.414 1.414a1 1 0 0 1 0 1.414zM7.757 8.757a1 1 0 0 1-1.414 0L4.929 7.343a1 1 0 0 1 1.414-1.414L7.757 7.343a1 1 0 0 1 0 1.414z" fill="currentColor"/>
          <path d="M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="currentColor"/>
        </svg>
      `;
    }
  }
  
  // Function to disable dark mode
  function disableDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', null);
    
    // Update dark mode button icon
    if (darkModeBtn) {
      darkModeBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3.22a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3.97A.75.75 0 0112 3.22zm5.657 2.343a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zM12 6a6 6 0 100 12 6 6 0 000-12zm0 10.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm-5.657-1.343a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06zm-1.06-6.364a.75.75 0 010 1.06L4.222 9.97a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm1.06-3.536a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L6.343 4.06a.75.75 0 010-1.06zM12 19.03a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" fill="currentColor"/>
        </svg>
      `;
    }
  }
  
  // Add active class to current nav link
  const currentPage = window.location.pathname;
  document.querySelectorAll('.nav-list li a').forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Check if it's the home page
    if (currentPage.endsWith('/index.html') || currentPage.endsWith('/') && linkHref === 'index.html') {
      link.classList.add('active');
    }
    // Check if it's a subpage
    else if (currentPage.includes(linkHref) && linkHref !== 'index.html') {
      link.classList.add('active');
    }
  });
});