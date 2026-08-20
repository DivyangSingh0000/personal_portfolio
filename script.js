/* ==========================================================================
   PORTFOLIO SCRIPTS & INTERACTIONS - DIVYANG SINGH SOMVANSHI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavbar();
  initMobileDrawer();
  initTypingEffect();
  initSkillsFilter();
  initContactForm();
  initModals();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Scroll Progress Bar & Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / totalHeight) * 100;
    
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }

    updateActiveNavLink();
  });
}

/* --------------------------------------------------------------------------
   2. Active Nav Link on Scroll (ScrollSpy)
   -------------------------------------------------------------------------- */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
  const scrollY = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 120;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function initNavbar() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        closeMobileDrawer();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const drawer = document.getElementById('mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileDrawer);
  }

  if (overlay) {
    overlay.addEventListener('click', closeMobileDrawer);
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = 'auto';
}

/* --------------------------------------------------------------------------
   4. Dynamic Role Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typedSpan = document.getElementById('role-typed');
  if (!typedSpan) return;

  const roles = [
    "AI / ML Engineer",
    "Generative AI Specialist",
    "RAG & LLM Architect",
    "Data Analytics Engineer",
    "FastAPI & Python Developer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   5. Technical Skills Category Filter
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabButtons = document.querySelectorAll('.skills-tab-btn');
  const categoryCards = document.querySelectorAll('.skill-category-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      categoryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form Validation & Submission Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Message Validation
    if (messageInput.value.trim().length < 5) {
      showError(messageInput, 'Message should be at least 5 characters long');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (isValid) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      setTimeout(() => {
        if (successBanner) {
          successBanner.classList.add('show');
        }
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Message Sent!</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;

        showToast('Thank you! Your message has been prepared.');

        // Revert button text after 3s
        setTimeout(() => {
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          `;
        }, 3000);
      }, 900);
    }
  });

  function showError(input, message) {
    const errorEl = input.parentElement.querySelector('.form-feedback');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('active');
    }
    input.style.borderColor = '#ef4444';
  }

  function clearError(input) {
    const errorEl = input.parentElement.querySelector('.form-feedback');
    if (errorEl) {
      errorEl.classList.remove('active');
    }
    input.style.borderColor = '';
  }
}

/* --------------------------------------------------------------------------
   7. Modals (Resume & Project Details)
   -------------------------------------------------------------------------- */
const projectData = {
  'rag-paper': {
    title: 'AI Research Paper Analysis Tool',
    timeline: 'Feb 2026 – Mar 2026',
    role: 'Lead AI/ML Engineer',
    stack: ['Python', 'NLP', 'LLM', 'LangChain', 'PyTorch', 'FastAPI', 'FAISS', 'Sentence Transformers'],
    summary: 'Engineered an enterprise-grade Retrieval-Augmented Generation (RAG) system capable of parsing, indexing, and performing semantic question-answering over 150+ complex academic research papers with sub-2s query latency.',
    achievements: [
      'Engineered a RAG pipeline using FAISS vector database and Sentence Transformers, achieving approximately 92% semantic similarity retrieval accuracy across 150+ research papers.',
      'Built an end-to-end AI/ML data pipeline (PDF parsing, chunking, indexing, embedding, LLM-based Q&A) using LangChain, Hugging Face Transformers, and PyTorch.',
      'Deployed via a modular FastAPI backend (RESTful APIs) handling 10+ concurrent queries with sub-2s latency, reducing manual review time by ~60%.',
      'Integrated an LLM-based agentic summarization workflow to auto-generate structured research summaries, cutting document comprehension time from 45 minutes to under 5 minutes per paper.'
    ],
    github: 'https://github.com/DivyangSingh0000/'
  },
  'study-chat': {
    title: 'Smart Study Chat App',
    timeline: 'Jun 2025 – Jul 2025',
    role: 'Full-Stack GenAI Developer',
    stack: ['Python', 'Streamlit', 'OpenAI API', 'LangChain', 'FAISS', 'Hugging Face'],
    summary: 'Developed a multi-PDF AI question-answering application designed for students and researchers to upload multiple study documents and receive context-accurate explanations with precise page citations.',
    achievements: [
      'Developed a multi-PDF AI question-answering application using Python, LangChain agents, and OpenAI API deployed on Streamlit Cloud supporting 20+ concurrent document uploads.',
      'Implemented semantic similarity search via FAISS and Sentence Transformers, achieving >85% context-match accuracy across 1500+ test queries on diverse, real-world messy data.',
      'Optimized the chunking and tokenization pipeline, reducing response latency from 4.0s down to 1.2s.',
      'Integrated Hugging Face embedding models and iterated via a user feedback loop to improve contextual understanding, raising answer relevance scores by ~30% over baseline keyword search.'
    ],
    github: 'https://github.com/DivyangSingh0000/'
  },
  'stock-tracker': {
    title: 'Stock Market Portfolio Tracker',
    timeline: 'May 2025 – Jun 2025',
    role: 'Data Science & ML Developer',
    stack: ['Python', 'Pandas', 'SQL', 'Scikit-learn', 'Matplotlib', 'VADER', 'BeautifulSoup'],
    summary: 'Built a predictive portfolio analytics platform combining algorithmic data structures, machine learning regression models, and natural language sentiment analysis of real-time financial news.',
    achievements: [
      'Built a portfolio analytics platform in Python using core data structures & algorithms, Pandas, and SQL to track and visualize performance of 15+ stocks with real-time trend dashboards.',
      'Implemented Linear Regression and Random Forest models for stock price trend prediction, achieving a Mean Absolute Error (MAE) of 3.2% on 6-month backtested data.',
      'Engineered technical indicators (RSI, MACD, Bollinger bands) improving signal accuracy by ~22%.',
      'Integrated news sentiment analysis (VADER + BeautifulSoup) to incorporate real-time market signals, improving portfolio decision accuracy by ~18% in back-tests.'
    ],
    github: 'https://github.com/DivyangSingh0000/'
  }
};

function initModals() {
  // Resume Modal Triggers
  const openResumeButtons = document.querySelectorAll('.open-resume-modal');
  const resumeModal = document.getElementById('resume-modal');

  openResumeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Project Details Modal Triggers
  const projectDetailsButtons = document.querySelectorAll('.open-project-details');
  const projectModal = document.getElementById('project-modal');

  projectDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (!data) return;

      document.getElementById('modal-proj-title').textContent = data.title;
      document.getElementById('modal-proj-meta').textContent = `${data.role} • ${data.timeline}`;
      document.getElementById('modal-proj-summary').textContent = data.summary;
      
      const tagsContainer = document.getElementById('modal-proj-tags');
      tagsContainer.innerHTML = data.stack.map(tag => `<span class="tag tag-highlight">${tag}</span>`).join('');

      const bulletsContainer = document.getElementById('modal-proj-bullets');
      bulletsContainer.innerHTML = data.achievements.map(bullet => `<li>${bullet}</li>`).join('');

      const githubLink = document.getElementById('modal-proj-github');
      if (githubLink) githubLink.setAttribute('href', data.github);

      if (projectModal) {
        projectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modals
  document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(closer => {
    closer.addEventListener('click', function(e) {
      if (e.target === this) {
        document.querySelectorAll('.modal-backdrop').forEach(modal => modal.classList.remove('open'));
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Print Resume Trigger
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy Email Helper
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('singhdivyang308@gmail.com').then(() => {
        showToast('Email copied to clipboard!');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   9. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
