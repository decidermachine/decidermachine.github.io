// ============================
// DECIDER MACHINE - COMPONENTS
// decidermachine.online
// ============================

// Header Component
const headerHTML = `
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo">
        <span class="logo-emoji">⚡</span>
        Decider<span>Machine</span>
      </a>
      
      <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#tools">Tools</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#tips">Tips</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#tools" class="nav-cta">🎲 Start Deciding</a></li>
        </ul>
      </nav>
    </div>
    
    <div class="mobile-nav" id="mobileNav">
      <a href="/">🏠 Home</a>
      <a href="#tools">🛠️ Tools</a>
      <a href="#how-it-works">⚡ How It Works</a>
      <a href="#use-cases">💡 Use Cases</a>
      <a href="#features">✨ Features</a>
      <a href="#tips">🧠 Tips</a>
      <a href="#faq">❓ FAQ</a>
      <a href="#tools" class="nav-cta" style="margin-top: 8px;">🎲 Start Deciding</a>
    </div>
  </header>
`;

// Footer Component - Removed Privacy, Terms, Contact and replaced with additional resource links
const footerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="logo">
            <span class="logo-emoji">⚡</span>
            Decider<span>Machine</span>
          </a>
          <p>The ultimate online decision maker tool. Make any choice in seconds — free, fast & fun!</p>
        </div>
        
        <div class="footer-col">
          <h4>Tools</h4>
          <ul>
            <li><a href="#tools" data-tool="wheel">🎡 Spin Wheel</a></li>
            <li><a href="#tools" data-tool="yesno">✨ Yes/No Oracle</a></li>
            <li><a href="#tools" data-tool="dice">🎲 Dice Roller</a></li>
            <li><a href="#tools" data-tool="coin">🪙 Coin Flip</a></li>
            <li><a href="#tools" data-tool="list">📋 List Picker</a></li>
            <li><a href="#tools" data-tool="number">🔢 Number Generator</a></li>
            <li><a href="#tools" data-tool="cards">🃏 Card Picker</a></li>
            <li><a href="#tools" data-tool="magic8">🎱 Magic 8 Ball</a></li>
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#use-cases">Use Cases</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#tips">Decision Tips</a></li>
            <li><a href="#faq">FAQ</a></li>            
          </ul>
        </div>
        
        <div class="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact</a></li>      
            
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Decider Machine. All rights reserved. | Your #1 Online Decision Maker</p>
        <div class="footer-links">
          <a href="privacy">Privacy Policy</a>
          <a href="terms">Terms of Use</a>
        </div>
      </div>
    </div>
  </footer>
`;

// Modal functionality has been removed since legal pages are no longer needed
// Keeping only essential component injection

// Function to inject header and footer
function injectComponents() {
  // Inject header
  const headerRoot = document.getElementById('header-root');
  if (headerRoot) {
    headerRoot.innerHTML = headerHTML;
  } else {
    // Fallback: insert at beginning of body
    const body = document.body;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = headerHTML;
    body.insertBefore(tempDiv.firstElementChild, body.firstChild);
  }
  
  // Inject footer
  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) {
    footerRoot.innerHTML = footerHTML;
  } else {
    // Fallback: append to body
    const body = document.body;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = footerHTML;
    body.appendChild(tempDiv.firstElementChild);
  }
}

// Function to set up tool navigation from footer
function initFooterToolNav() {
  // Handle footer tool links
  document.addEventListener('click', (e) => {
    const toolLink = e.target.closest('[data-tool]');
    if (toolLink && toolLink.dataset.tool) {
      e.preventDefault();
      const toolId = toolLink.dataset.tool;
      
      // Switch to tools section
      const toolsSection = document.getElementById('tools');
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Activate the correct tab
      setTimeout(() => {
        const tabBtn = document.querySelector(`.tab-btn[data-tool="${toolId}"]`);
        if (tabBtn) {
          tabBtn.click();
        }
      }, 500);
    }
  });
}

// Function to set up mobile menu toggle
function initMobileMenuToggle() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (hamburger && mobileNav) {
    // Remove any existing listeners to avoid duplicates
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    newHamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('open');
    });
    
    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }
}

// Update active navigation link based on scroll
function initActiveNavHighlight() {
  const sections = ['home', 'tools', 'how-it-works', 'use-cases', 'features', 'tips', 'faq'];
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          current = section;
          break;
        }
      }
    }
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Add active link styles
const activeLinkStyles = `
  <style>
    .nav-links a.active {
      color: var(--white);
      background: rgba(255,77,109,0.2);
    }
    .mobile-nav a.active {
      color: var(--primary);
      background: rgba(255,77,109,0.1);
    }
  </style>
`;

// Initialize all component functionality
function initComponents() {
  // Add active link styles
  const styleDiv = document.createElement('div');
  styleDiv.innerHTML = activeLinkStyles;
  document.head.appendChild(styleDiv.firstElementChild);
  
  // Inject header and footer
  injectComponents();
  
  // Initialize features after DOM is ready
  setTimeout(() => {
    initFooterToolNav();
    initMobileMenuToggle();
    initActiveNavHighlight();
    
    // Handle scroll for header background
    const header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  }, 100);
}

// Run initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}
