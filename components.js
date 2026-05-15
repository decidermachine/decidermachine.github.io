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

// Footer Component
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
          <h4>Legal</h4>
          <ul>
            <li><a href="#" id="privacyLink">Privacy Policy</a></li>
            <li><a href="#" id="termsLink">Terms of Service</a></li>
            <li><a href="#" id="contactLink">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Decider Machine. All rights reserved. | Your #1 Online Decision Maker</p>
        <div class="footer-links">
          <a href="#" id="privacyLinkBottom">Privacy</a>
          <a href="#" id="termsLinkBottom">Terms</a>
          <a href="#" id="contactLinkBottom">Contact</a>
        </div>
      </div>
    </div>
  </footer>
`;

// Modal for Legal Pages
const modalHTML = `
  <div id="legalModal" class="legal-modal" style="display: none;">
    <div class="modal-overlay"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h2 id="modalTitle">Privacy Policy</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body" id="modalBody">
        <!-- Content will be injected here -->
      </div>
    </div>
  </div>
`;

// Modal Styles
const modalStyles = `
  <style>
    .legal-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: modalFadeIn 0.3s ease;
    }
    
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
    }
    
    .modal-container {
      position: relative;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      width: 90%;
      max-width: 700px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      animation: modalSlideUp 0.3s ease;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    }
    
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes modalSlideUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px;
      border-bottom: 1px solid var(--card-border);
    }
    
    .modal-header h2 {
      font-family: var(--font-display);
      font-size: 1.4rem;
      color: var(--white);
      margin: 0;
    }
    
    .modal-close {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 2rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      transition: color 0.2s;
    }
    
    .modal-close:hover {
      color: var(--primary);
    }
    
    .modal-body {
      padding: 24px;
      overflow-y: auto;
      color: var(--text-muted);
      line-height: 1.7;
      font-size: 0.95rem;
    }
    
    .modal-body h3 {
      color: var(--white);
      font-family: var(--font-display);
      font-size: 1.1rem;
      margin: 20px 0 10px 0;
    }
    
    .modal-body h3:first-child {
      margin-top: 0;
    }
    
    .modal-body p {
      margin-bottom: 12px;
    }
    
    .modal-body strong {
      color: var(--text);
    }
    
    .modal-body ul {
      margin: 10px 0 10px 20px;
    }
    
    .modal-body li {
      margin-bottom: 6px;
    }
    
    @media (max-width: 600px) {
      .modal-container {
        width: 95%;
        max-height: 90vh;
      }
      .modal-header {
        padding: 16px 20px;
      }
      .modal-body {
        padding: 20px;
      }
    }
  </style>
`;

// Privacy Policy Content
const privacyContent = `
  <h3>Privacy Policy</h3>
  <p>Last updated: December 2024</p>
  
  <p>Welcome to <strong>Decider Machine</strong> ("we", "our", "us"). We are committed to protecting your privacy and providing a safe online experience. This Privacy Policy explains how we handle information when you use our website <strong>decidermachine.online</strong>.</p>
  
  <h3>1. Information We Collect</h3>
  <p><strong>We do NOT collect any personal information.</strong> Decider Machine is designed to be completely anonymous. We do not require registration, email addresses, or any personal data to use our decision-making tools.</p>
  <p>All data you enter (such as wheel options, list items, questions) stays entirely on your device. We do not store, process, or transmit this information to our servers.</p>
  
  <h3>2. Local Storage</h3>
  <p>Our website may use your browser's local storage to remember your preferences or recent selections. This data never leaves your device and can be cleared at any time by clearing your browser data.</p>
  
  <h3>3. Cookies</h3>
  <p>Decider Machine uses only essential cookies that are necessary for the website to function properly. We do not use tracking cookies, advertising cookies, or third-party analytics cookies.</p>
  
  <h3>4. Third-Party Services</h3>
  <p>We do not integrate with any third-party services that collect user data. No Google Analytics, no Facebook Pixel, no advertising networks.</p>
  
  <h3>5. Children's Privacy</h3>
  <p>Our service is suitable for all ages. Since we collect no personal information, there is no risk of children's data being compromised.</p>
  
  <h3>6. Changes to This Policy</h3>
  <p>We may update this Privacy Policy occasionally. Any changes will be posted on this page with an updated revision date.</p>
  
  <h3>7. Contact Us</h3>
  <p>If you have any questions about this Privacy Policy, please contact us at: <strong>privacy@decidermachine.online</strong></p>
  
  <p style="margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--card-border);"><strong>In short:</strong> Your decisions are your own. We don't track, store, or share anything. Period.</p>
`;

// Terms of Service Content
const termsContent = `
  <h3>Terms of Service</h3>
  <p>Last updated: December 2024</p>
  
  <h3>1. Acceptance of Terms</h3>
  <p>By accessing and using <strong>Decider Machine</strong> (decidermachine.online), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our website.</p>
  
  <h3>2. Service Description</h3>
  <p>Decider Machine provides free online decision-making tools including but not limited to: spin wheels, yes/no oracle, dice rollers, coin flips, list pickers, number generators, card pickers, and magic 8 ball functionality. All tools are provided "as is" for entertainment and decision-assistance purposes.</p>
  
  <h3>3. No Guarantee of Results</h3>
  <p>While our tools use random number generation algorithms, we do not guarantee any specific outcome. Decisions made using Decider Machine are ultimately your own responsibility. We are not liable for any actions taken based on results from our tools.</p>
  
  <h3>4. User Responsibilities</h3>
  <p>You agree to use Decider Machine only for lawful purposes. You will not:<br>
  - Use the service to make decisions involving illegal activities<br>
  - Attempt to reverse-engineer or manipulate our random number generation<br>
  - Use automated scripts or bots to access our services<br>
  - Violate any applicable laws or regulations</p>
  
  <h3>5. Intellectual Property</h3>
  <p>All content, design, graphics, and code on Decider Machine are owned by us and protected by copyright laws. You may not copy, reproduce, or distribute our code or design without permission.</p>
  
  <h3>6. Disclaimer of Warranties</h3>
  <p>Decider Machine is provided "as is" without any warranties, expressed or implied. We do not warrant that the service will be uninterrupted, error-free, or completely random (though we strive for true randomness).</p>
  
  <h3>7. Limitation of Liability</h3>
  <p>In no event shall Decider Machine be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use our service.</p>
  
  <h3>8. Changes to Terms</h3>
  <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
  
  <h3>9. Governing Law</h3>
  <p>These terms shall be governed by and construed in accordance with the laws applicable to our jurisdiction.</p>
  
  <h3>10. Contact Information</h3>
  <p>For questions about these Terms, please contact: <strong>legal@decidermachine.online</strong></p>
`;

// Contact Content
const contactContent = `
  <h3>Contact Us</h3>
  <p>Have questions, suggestions, or feedback about Decider Machine? We'd love to hear from you!</p>
  
  <h3>📧 Email</h3>
  <p>For general inquiries: <strong>hello@decidermachine.online</strong></p>
  <p>For privacy concerns: <strong>privacy@decidermachine.online</strong></p>
  <p>For business/partnerships: <strong>business@decidermachine.online</strong></p>
  
  <h3>💡 Feedback & Suggestions</h3>
  <p>We're always looking to improve Decider Machine! If you have ideas for new decision-making tools or features, please email us with "SUGGESTION" in the subject line.</p>
  
  <h3>🐛 Report a Bug</h3>
  <p>Found something not working correctly? Let us know at <strong>bugs@decidermachine.online</strong> and include details about your browser and device.</p>
  
  <h3>🌐 Social Media</h3>
  <p>Follow us for updates and decision-making tips:</p>
  <ul>
    <li>Twitter/X: <strong>@decidermachine</strong></li>
    <li>Instagram: <strong>@decidermachine</strong></li>
  </ul>
  
  <h3>⏱️ Response Time</h3>
  <p>We typically respond to inquiries within 2-3 business days. Thank you for your patience!</p>
  
  <div style="background: rgba(255,77,109,0.1); border-radius: 12px; padding: 16px; margin-top: 20px;">
    <p style="margin: 0;"><strong>❤️ Made with passion for decision-makers everywhere.</strong><br>We appreciate every user who trusts Decider Machine to help with their choices.</p>
  </div>
`;

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
  
  // Inject modal and styles
  const modalDiv = document.createElement('div');
  modalDiv.id = 'legalModalRoot';
  document.body.appendChild(modalDiv);
  
  const styleDiv = document.createElement('div');
  styleDiv.innerHTML = modalStyles;
  document.head.appendChild(styleDiv.firstElementChild);
  
  const modalRoot = document.getElementById('legalModalRoot');
  if (modalRoot) {
    modalRoot.innerHTML = modalHTML;
  }
  
  // Initialize modal functionality
  initModal();
}

// Modal functionality
function initModal() {
  const modal = document.getElementById('legalModal');
  const overlay = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal) return;
  
  // Function to open modal with specific content
  window.openModal = function(type) {
    if (type === 'privacy') {
      if (modalTitle) modalTitle.textContent = 'Privacy Policy';
      if (modalBody) modalBody.innerHTML = privacyContent;
    } else if (type === 'terms') {
      if (modalTitle) modalTitle.textContent = 'Terms of Service';
      if (modalBody) modalBody.innerHTML = termsContent;
    } else if (type === 'contact') {
      if (modalTitle) modalTitle.textContent = 'Contact Us';
      if (modalBody) modalBody.innerHTML = contactContent;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  
  // Function to close modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  // Event listeners
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });
  
  // Set up footer link listeners (after they're in DOM)
  setTimeout(() => {
    const privacyLinks = document.querySelectorAll('#privacyLink, #privacyLinkBottom');
    const termsLinks = document.querySelectorAll('#termsLink, #termsLinkBottom');
    const contactLinks = document.querySelectorAll('#contactLink, #contactLinkBottom');
    
    privacyLinks.forEach(link => {
      if (link) link.addEventListener('click', (e) => {
        e.preventDefault();
        window.openModal('privacy');
      });
    });
    
    termsLinks.forEach(link => {
      if (link) link.addEventListener('click', (e) => {
        e.preventDefault();
        window.openModal('terms');
      });
    });
    
    contactLinks.forEach(link => {
      if (link) link.addEventListener('click', (e) => {
        e.preventDefault();
        window.openModal('contact');
      });
    });
  }, 100);
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
  // This is handled in app.js but we'll add a backup
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
