/**
 * Animation utilities for Cosm Reloaded
 * Provides functions for scroll animations, particle effects and interactive UI elements
 */

// Reveal elements on scroll functionality




export const initParticleSystem = () => {
  const canvas = document.querySelector('.hero-particles') as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Adjust canvas size on resize
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const isMobile = window.innerWidth < 700;
  const particleCount = isMobile ? 16 : 40;
  const particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 4,
    speedX: (Math.random() - 0.5) * 1.5,
    speedY: (Math.random() - 0.5) * 1.5,
    opacity: Math.random() * 0.4 + 0.2,
    opacityDirection: Math.random() > 0.5 ? 1 : -1,
  }));

  let animationFrameId: number;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      // Move
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      // Opacity pulse
      p.opacity += 0.005 * p.opacityDirection;
      if (p.opacity >= 0.7 || p.opacity <= 0.2) p.opacityDirection *= -1;
      // Draw
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(255, 127, 80)';
      ctx.shadowColor = 'rgb(255, 188, 93)';
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.shadowBlur = 1.2;
    });
    ctx.globalAlpha = 1; // Reset global alpha
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();

  // Cleanup
  return () => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationFrameId);
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
  let typingTimeout: ReturnType<typeof setTimeout> | undefined;
  
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

export const init3DCardEffect = () => {
  const heroSection = document.querySelector('body');
  const heroGlow = document.querySelector('.hero-glow');
  
  if (heroSection && heroGlow) {
    heroSection.addEventListener('mousemove', (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      (heroGlow as HTMLElement).style.left = `${x}px`;
      (heroGlow as HTMLElement).style.top = `${y}px`;
    });
  }
};

export default {
  
  initParticleSystem,
  initLogoAnimation,
  initTypingAnimation,
  init3DCardEffect
  
};