/**
 * Animation utilities for Cosm Reloaded
 * Provides functions for scroll animations, particle effects and interactive UI elements
 */

// Reveal elements on scroll functionality
export const initRevealOnScroll = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll(
    '.reveal-on-scroll, .reveal-on-scroll-left, .reveal-on-scroll-right'
  );
  
  revealElements.forEach((el) => {
    observer.observe(el);
  });
};

// Magnetic effect for buttons
export const initMagneticButtons = () => {
  const buttons = document.querySelectorAll('.magnetic-btn');
  
  buttons.forEach((button) => {
    button.addEventListener('mousemove', (e) => {
      const rect = (button as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 10; // Adjust intensity of the effect
      
      (button as HTMLElement).style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      (button as HTMLElement).style.transform = 'translate(0, 0)';
    });
  });
};

// 3D Card effect
export const init3DCardEffect = () => {
  const cards = document.querySelectorAll('.card-3d-effect');
  
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;
      
      const rotateX = posY * -0.05;
      const rotateY = posX * 0.05;
      
      (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
};

// Improved neonic grid background to cover the entire home page
export const initNeonicGrid = () => {
  const gridContainer = document.querySelector('.hero-grid');
  if (!gridContainer) return;
  
  gridContainer.innerHTML = '';
  
  // Create grid cells
  const cellSize = 40; // Size of each grid cell
  const containerWidth = window.innerWidth * 1.2; // Larger than screen width to ensure full coverage
  const containerHeight = window.innerHeight * 1.2; // Larger than screen height to ensure full coverage
  
  const columns = Math.ceil(containerWidth / cellSize);
  const rows = Math.ceil(containerHeight / cellSize);
  
  // Create a grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      
      // Position
      cell.style.left = `${x * cellSize}px`;
      cell.style.top = `${y * cellSize}px`;
      
      // Removed animation delay that was causing grid lights
      
      gridContainer.appendChild(cell);
    }
  }
  
  // Add glow effect that follows mouse
  const heroSection = document.querySelector('body');
  const heroGlow = document.querySelector('.hero-glow');
  
  if (heroSection && heroGlow) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      (heroGlow as HTMLElement).style.left = `${x}px`;
      (heroGlow as HTMLElement).style.top = `${y}px`;
    });
  }

  // Handle window resize to ensure grid always covers the screen
  window.addEventListener('resize', () => {
    if (gridContainer) {
      initNeonicGrid(); // Re-initialize grid on resize
    }
  });
};

// Enhanced particle system
export const initParticleSystem = () => {
  interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    element: HTMLElement;
    opacity: number;
    opacityDirection: number;
  }

  const particlesContainer = document.querySelector('.hero-particles');
  if (!particlesContainer) return;
  
  particlesContainer.innerHTML = '';
  
  const particleCount = 30;
  const particles: Particle[] = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particlesContainer.appendChild(particle);
    
    // Random particle properties
    const size = Math.random() * 5 + 1;
    const opacity = Math.random() * 0.5 + 0.2;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity.toString();
    
    // Create particle object with properties
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight, // Use full window height
      size,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      element: particle,
      opacity,
      opacityDirection: Math.random() > 0.5 ? 1 : -1
    });
  }
  
  // Animation loop
  let animationFrameId: number;
  
  const animate = () => {
    particles.forEach((p) => {
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce on edges
      if (p.x < 0 || p.x > window.innerWidth) p.speedX *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.speedY *= -1;
      
      // Pulsate opacity
      p.opacity += 0.005 * p.opacityDirection;
      if (p.opacity >= 0.7 || p.opacity <= 0.2) {
        p.opacityDirection *= -1;
      }
      
      // Update DOM element position
      p.element.style.left = `${p.x}px`;
      p.element.style.top = `${p.y}px`;
      p.element.style.opacity = p.opacity.toString();
    });
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  animate();
  
  // Clean up animation when component unmounts
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
};

// Logo animation effect
export const initLogoAnimation = () => {
  const logoContainer = document.querySelector('.logo-container');
  if (!logoContainer) return;
  
  const logo = logoContainer.querySelector('img');
  if (!logo) return;
  
  // Add hover animation
  logoContainer.addEventListener('mouseover', () => {
    logo.classList.add('logo-hover-effect');
  });
  
  logoContainer.addEventListener('mouseout', () => {
    logo.classList.remove('logo-hover-effect');
    void logo.offsetWidth; // Force reflow to restart animation
    logo.classList.add('logo-pulse-effect');
    
    setTimeout(() => {
      logo.classList.remove('logo-pulse-effect');
    }, 1000);
  });
  
  // Add click animation
  logoContainer.addEventListener('click', () => {
    logo.classList.add('logo-click-effect');
    
    setTimeout(() => {
      logo.classList.remove('logo-click-effect');
    }, 500);
  });
  
  // Initial animation
  setTimeout(() => {
    logo.classList.add('logo-intro-effect');
    
    setTimeout(() => {
      logo.classList.remove('logo-intro-effect');
    }, 1500);
  }, 500);
};

// Typing animation for hero headings (fixed to avoid double cursor)
export const initTypingAnimation = (elementId: string, textArray: string[], typingSpeed = 100, backspaceSpeed = 50, delayBetween = 2000) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout: number | undefined;
  
  // Clear element content to start fresh
  element.textContent = '';
  element.classList.add('typing-text');
  
  const type = () => {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
      // Deleting text
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingTimeout = setTimeout(type, delayBetween);
      } else {
        typingTimeout = setTimeout(type, backspaceSpeed);
      }
    } else {
      // Typing text
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        isDeleting = true;
        typingTimeout = setTimeout(type, delayBetween);
      } else {
        typingTimeout = setTimeout(type, typingSpeed);
      }
    }
  };
  
  // Start typing animation
  type();
  
  // Return cleanup function
  return () => {
    if (typingTimeout) clearTimeout(typingTimeout);
  };
};

// Enhanced horizontal card layout
export const initHorizontalCards = () => {
  const cards = document.querySelectorAll('.scroll-card');
  
  cards.forEach(card => {
    const cardIcon = card.querySelector('.card-icon');
    const cardTitle = card.querySelector('h3');
    const cardDesc = card.querySelector('p');
    
    if (cardIcon && cardTitle && cardDesc) {
      // Check if the card header already exists to avoid creating duplicate elements
      if (!card.querySelector('.card-header')) {
        // Create a new flex container for icon and title
        const headerContainer = document.createElement('div');
        headerContainer.classList.add('card-header');
        headerContainer.style.display = 'flex';
        headerContainer.style.alignItems = 'center';
        headerContainer.style.gap = '1rem';
        headerContainer.style.marginBottom = '0.75rem';
        
        // Move the icon and title to this container
        card.insertBefore(headerContainer, cardIcon);
        headerContainer.appendChild(cardIcon);
        headerContainer.appendChild(cardTitle);
      }
      
      // Add hover effect
      card.addEventListener('mouseenter', () => {
        (cardIcon as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        (cardIcon as HTMLElement).style.transform = 'scale(1) rotate(0)';
      });
    }
  });
};

// Initialize parallax effect
export const initParallaxEffect = () => {
  const parallaxLayers = document.querySelectorAll('[data-parallax]');
  
  const handleParallax = () => {
    const scrollTop = window.scrollY;
    
    parallaxLayers.forEach((layer) => {
      if ((layer as HTMLElement).dataset.parallax) {
        const speed = parseFloat((layer as HTMLElement).dataset.parallax || '0.1');
        const offset = scrollTop * speed;
        (layer as HTMLElement).style.transform = `translateY(${offset}px)`;
      }
    });
  };
  
  window.addEventListener('scroll', handleParallax);
  
  // Initial call
  handleParallax();
  
  // Clean up listener
  return () => {
    window.removeEventListener('scroll', handleParallax);
  };
};

// Initialize nav highlight on scroll
export const initNavHighlight = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0,
  };
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (id && (link as HTMLAnchorElement).hash === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    navObserver.observe(section);
  });
  
  // Clean up observer
  return () => {
    sections.forEach(section => {
      navObserver.unobserve(section);
    });
  };
};

// Initialize all animation systems
export const initAllAnimations = () => {
  document.addEventListener('DOMContentLoaded', () => {
    // Get the tab state
    const activeTab = document.querySelector('.nav-link.active')?.textContent?.toLowerCase() || 'home';
    
    // Initialize base animations
    initRevealOnScroll();
    initMagneticButtons();
    init3DCardEffect();
    initParallaxEffect();
    initNavHighlight();
    
    // Initialize home-specific animations if we're on the home tab
    if (activeTab === 'home' || document.querySelector('.hero-background')) {
      initNeonicGrid();
      initParticleSystem();
      initLogoAnimation();
      initHorizontalCards();
      
      // Add typing animation
      const heroTyping = document.getElementById('hero-typing');
      if (heroTyping) {
        initTypingAnimation('hero-typing', [
          'We are Cosm Reloaded.',
          'We design great experiences.',
          'We build the future.',
        ]);
      }
    }
  });
};

export default {
  initRevealOnScroll,
  initMagneticButtons,
  init3DCardEffect,
  initNeonicGrid,
  initParticleSystem,
  initLogoAnimation,
  initHorizontalCards,
  initTypingAnimation,
  initParallaxEffect,
  initNavHighlight,
  initAllAnimations,
};