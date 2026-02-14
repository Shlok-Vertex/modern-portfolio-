// ============================================
// script.js · CRYSTAL DYNAMIC · FULLY RESPONSIVE
// SMOOTH SCROLL · DOMAIN EXPANSION REMOVED
// ============================================

'use strict';

// ---------- PRELOADER WITH BEAM ----------
window.addEventListener('load', function() {
  const canvas = document.getElementById('beam-canvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let startTime = Date.now();

  function drawBeam() {
    ctx.clearRect(0, 0, w, h);
    let t = (Date.now() - startTime) / 700;
    let radius = Math.min(w, h) * (t * 0.7);
    let alpha = Math.max(0, 1 - t * 0.4);
    
    ctx.beginPath();
    ctx.arc(w/2, h/2, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(157, 123, 217, ${alpha * 0.2})`;
    ctx.shadowColor = '#9d7bd9';
    ctx.shadowBlur = 60;
    ctx.fill();
    
    if (t < 2) {
      requestAnimationFrame(drawBeam);
    } else {
      document.getElementById('preloader').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('preloader').style.visibility = 'hidden';
        document.getElementById('main-content').classList.remove('hidden');
        initCrystalBackground();
      }, 600);
    }
  }
  drawBeam();
});

// ---------- DYNAMIC CRYSTAL BACKGROUND (RESPONSIVE) ----------
function initCrystalBackground() {
  const canvas = document.getElementById('crystal-bg-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  
  const colors = [
    'rgba(157, 123, 217, 0.4)',
    'rgba(100, 194, 194, 0.4)',
    'rgba(95, 158, 240, 0.4)',
    'rgba(232, 180, 180, 0.3)',
    'rgba(180, 140, 220, 0.4)'
  ];
  
  let crystals = [];
  const crystalCount = Math.floor(window.innerWidth < 768 ? 40 : 80);
  
  for (let i = 0; i < crystalCount; i++) {
    crystals.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * (window.innerWidth < 768 ? 20 : 25) + (window.innerWidth < 768 ? 5 : 8),
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.003,
      color: colors[Math.floor(Math.random() * colors.length)],
      points: Math.floor(Math.random() * 3) + 4,
      phase: Math.random() * 100,
      pulseSpeed: 0.002 + Math.random() * 0.003
    });
  }
  
  function drawCrystal(crystal) {
    ctx.save();
    ctx.translate(crystal.x, crystal.y);
    ctx.rotate(crystal.rotation);
    
    let pulse = 1 + Math.sin(Date.now() * crystal.pulseSpeed + crystal.phase) * 0.15;
    let currentSize = crystal.size * pulse;
    
    ctx.beginPath();
    
    for (let i = 0; i < crystal.points; i++) {
      let angle = (i * 2 * Math.PI) / crystal.points - Math.PI / 2;
      let x = Math.cos(angle) * currentSize;
      let y = Math.sin(angle) * currentSize;
      
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    
    ctx.closePath();
    
    let gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
    gradient.addColorStop(0, crystal.color.replace('0.4', '0.7'));
    gradient.addColorStop(1, crystal.color.replace('0.4', '0.1'));
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = crystal.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    
    ctx.restore();
  }
  
  function animateCrystals() {
    ctx.clearRect(0, 0, w, h);
    
    crystals.forEach(crystal => {
      crystal.x += crystal.speedX;
      crystal.y += crystal.speedY;
      crystal.rotation += crystal.rotationSpeed;
      
      if (crystal.x < -50) crystal.x = w + 50;
      if (crystal.x > w + 50) crystal.x = -50;
      if (crystal.y < -50) crystal.y = h + 50;
      if (crystal.y > h + 50) crystal.y = -50;
      
      drawCrystal(crystal);
    });
    
    requestAnimationFrame(animateCrystals);
  }
  
  animateCrystals();
  
  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });
}

// ---------- TYPING EFFECT ----------
const typedElement = document.querySelector('.typed');
const phrases = ['CRYSTAL SORCERER', 'INFINITY WEAVER', 'DOMAIN MASTER', 'ETERNAL MAGE'];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  if (!typedElement) return;
  
  let current = phrases[i];
  
  if (isDeleting) {
    typedElement.textContent = current.substring(0, j - 1);
    j--;
  } else {
    typedElement.textContent = current.substring(0, j + 1);
    j++;
  }
  
  if (!isDeleting && j === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    setTimeout(typeEffect, 400);
  } else {
    setTimeout(typeEffect, isDeleting ? 80 : 150);
  }
}
setTimeout(typeEffect, 600);

// ---------- CRYSTAL SKILLS DATA ----------
const crystalSkills = [
  'HTML', 'CSS', 'JAVASCRIPT', 'PYTHON',
  'JAVA', 'PHP', 'MYSQL', 'NODE JS',
  'REACT JS', 'FIGMA', 'AI', 'WEB DEVELOPMENT','C/C++'
];

// ---------- FLOATING CRYSTAL SKILLS (RESPONSIVE) ----------
function initFloatingCrystalSkills() {
  const container = document.getElementById('floatingSkills');
  if (!container) return;
  
  container.innerHTML = '';
  
  const isMobile = window.innerWidth < 768;
  const radius = isMobile ? 160 : 260;
  const fontSize = isMobile ? '0.7rem' : '0.9rem';
  
  crystalSkills.forEach((skill, index) => {
    const skillEl = document.createElement('div');
    skillEl.className = 'skill-crystal-item';
    skillEl.textContent = skill;
    skillEl.setAttribute('data-skill', skill.toLowerCase());
    skillEl.style.fontSize = fontSize;
    
    const angle = (index / crystalSkills.length) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    skillEl.style.left = `calc(50% + ${x}px)`;
    skillEl.style.top = `calc(50% + ${y}px)`;
    skillEl.style.transform = 'translate(-50%, -50%)';
    skillEl.style.animation = `floatCrystalSkill ${5 + (index % 4)}s infinite alternate ease-in-out`;
    skillEl.style.animationDelay = `${index * 0.15}s`;
    
    container.appendChild(skillEl);
  });
}

// ---------- SKILL FILTER ----------
function initCrystalSkillFilter() {
  const searchInput = document.getElementById('skillSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const skills = document.querySelectorAll('.skill-crystal-item');
    
    skills.forEach(skill => {
      const skillName = skill.textContent.toLowerCase();
      skill.style.display = skillName.includes(query) || query === '' ? 'flex' : 'none';
    });
  });
}

// ---------- PROJECTS DATA ----------
const crystalProjects = [
  {
    title: 'Eternal Crystal Grimoire',
    desc: 'A digital spellbook infused with ancient crystal mana, featuring infinite pages and sacred geometry animations.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop&auto=format&q=80',
    live: '#',
    github: '#'
  },
  {
    title: 'Void Crystal Terminal',
    desc: 'Command-line interface forged from pure void crystals, designed for ethereal data manipulation.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format&q=80',
    live: '#',
    github: '#'
  },
  {
    title: 'Infinity Crystal Maze',
    desc: 'Endless procedurally generated maze crafted with sacred crystal patterns and infinite pathways.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=400&fit=crop&auto=format&q=80',
    live: '#',
    github: '#'
  },
  {
    title: 'Crystal Forge Sanctum',
    desc: 'Sacred tool for crafting digital crystals, weaving mana, and enchanting virtual artifacts.',
    image: 'https://images.unsplash.com/photo-1518709766631-a6c7f7854bc3?w=600&h=400&fit=crop&auto=format&q=80',
    live: '#',
    github: '#'
  }
];

// ---------- RENDER CRYSTAL PROJECTS ----------
function renderCrystalProjects(filter = '') {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const filtered = crystalProjects.filter(project => 
    project.title.toLowerCase().includes(filter.toLowerCase()) ||
    project.desc.toLowerCase().includes(filter.toLowerCase())
  );
  
  filtered.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <div class="card-buttons">
        <button class="btn outline-btn modal-trigger" data-index="${index}">VIEW CRYSTAL</button>
        <a href="${project.github}" class="btn primary-btn">SHARD</a>
      </div>
    `;
    grid.appendChild(card);
  });
  
  attachCrystalModalTriggers();
}

// ---------- PROJECT FILTER ----------
function initCrystalProjectFilter() {
  const searchInput = document.getElementById('projectSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function(e) {
    renderCrystalProjects(e.target.value);
  });
}

// ---------- MODAL ----------
function attachCrystalModalTriggers() {
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLive = document.getElementById('modalLive');
  const modalGit = document.getElementById('modalGit');
  const closeModal = document.querySelector('.close-modal');
  
  document.querySelectorAll('.modal-trigger').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const index = parseInt(e.currentTarget.dataset.index);
      const project = crystalProjects[index];
      
      modalImg.src = project.image;
      modalTitle.textContent = project.title;
      modalDesc.textContent = project.desc;
      modalLive.href = project.live;
      modalGit.href = project.github;
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });
  
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// ---------- CRYSTAL EDUCATION TREE ----------
function renderCrystalEducationTree() {
  const container = document.getElementById('educationTree');
  if (!container) return;
  
  const educationData = [
    { year: '2023-26', title: 'Diploma in Computer Science', institution: 'Satyam International Institute of Technology' },
    { year: '2023', title: 'Matriculation', institution: 'Guru Govind Singh Boys High School' }
  ];
  
  let html = '<div class="crystal-tree">';
  educationData.forEach((edu, index) => {
    html += `
      <div class="tree-crystal-node">
        <span>⟡ ${edu.year} ⟡</span>
        <h4>${edu.title}</h4>
        <p>${edu.institution}</p>
      </div>
    `;
    if (index < educationData.length - 1) {
      html += '<div class="tree-connector-crystal"></div>';
    }
  });
  html += '</div>';
  
  container.innerHTML = html;
}

// ---------- CERTIFICATES ----------
function renderCrystalCertificates() {
  const container = document.getElementById('certGrid');
  if (!container) return;
  
  const certsData = [
    { title: 'Introduction to Cloud Computing', issuer: 'Arcane Crystal Institute', image: 'images/certificates/cloud.png' },
    { title: 'Deepseek for Beginners', issuer: 'Jujutsu Crystal High', image: 'images/certificates/shlok-deepseek.jpeg' },
    { title: 'Technology Job Simulation', issuer: 'Eternal Crystal Realm', image: 'images/certificates/shlok-deloitte.jpeg' },
    { title: 'Introduction to Generative AI Studio', issuer: 'Void Crystal Academy', image: 'images/certificates/shlok-google.jpeg' },
    { title: 'Introduction to Prompt Engineering with Github Copilot', issuer: 'Prism Crystal School', image: 'images/certificates/shlok-microsoft.png' }
  ];
  
  certsData.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.innerHTML = `
      <img src="${cert.image}" alt="${cert.title}" loading="lazy">
      <h4>${cert.title}</h4>
      <p>${cert.issuer}</p>
    `;
    
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
      setTimeout(() => this.classList.remove('expanded'), 2500);
    });
    
    container.appendChild(card);
  });
}

// ---------- CONTACT FORM ----------
function initCrystalContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const text = `Hello Crystal Sorcerer, I am ${name} (${email}).%0A%0A${message}%0A%0A⟡ Crystal Signal Sent ⟡`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(text)}`, '_blank');
  });
}

// ---------- SMOOTH SCROLL (ENHANCED) ----------
function initCrystalSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      if (id === '#') return;
      
      const el = document.querySelector(id);
      if (el) {
        const navHeight = document.querySelector('.sticky-nav')?.offsetHeight || 80;
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        const navLinks = document.getElementById('navLinks');
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
        }
      }
    });
  });
}

// ---------- SCROLL REVEAL ----------
function initCrystalScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 120;
      
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);
}

// ---------- MOBILE TOGGLE ----------
function initCrystalMobileToggle() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (toggle && navLinks) {
    toggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
    
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }
}

// ---------- RESPONSIVE SKILLS REINIT ----------
function initResponsiveSkills() {
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initFloatingCrystalSkills();
    }, 250);
  });
}

// ---------- ADD FLOAT ANIMATION ----------
function addCrystalFloatAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatCrystalSkill {
      0% { transform: translate(-50%, -50%) translateY(0px); }
      100% { transform: translate(-50%, -50%) translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
}

// ---------- INITIALIZE ALL ----------
function initCrystalPortfolio() {
  initFloatingCrystalSkills();
  initCrystalSkillFilter();
  renderCrystalProjects();
  initCrystalProjectFilter();
  renderCrystalEducationTree();
  renderCrystalCertificates();
  initCrystalContactForm();
  initCrystalSmoothScroll();
  initCrystalScrollReveal();
  initCrystalMobileToggle();
  initResponsiveSkills();
  addCrystalFloatAnimation();
}

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', initCrystalPortfolio);