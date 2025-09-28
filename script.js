// Minimal Flat Design Script

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Copy Code Function
    const codeDisplay = document.querySelector('.code-display');
    if (codeDisplay) {
        codeDisplay.style.cursor = 'pointer';
        codeDisplay.addEventListener('click', function() {
            const code = 'KOREA1234';
            navigator.clipboard.writeText(code).then(() => {
                // Show notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                notification.textContent = '코드가 복사되었습니다!';
                notification.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #51CF66;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        });
    }
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animations to elements
    const animatedElements = document.querySelectorAll('.info-card, .process-card, .feature-item, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -20px);
            }
        }
        
        .nav-menu.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            gap: 20px;
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        .navbar {
            transition: box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Process Steps Interactive
    const processSteps = document.querySelectorAll('.process-step');
    const previewImgs = document.querySelectorAll('.preview-img');
    const dots = document.querySelectorAll('.dot');
    
    if (processSteps.length > 0) {
        processSteps.forEach(step => {
            step.addEventListener('click', function() {
                const stepNum = this.dataset.step;
                
                // Update active step
                processSteps.forEach(s => s.classList.remove('active'));
                this.classList.add('active');
                
                // Update preview image
                previewImgs.forEach(img => {
                    img.classList.remove('active');
                    if (img.dataset.step === stepNum) {
                        img.classList.add('active');
                    }
                });
                
                // Update dots
                dots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.step === stepNum) {
                        dot.classList.add('active');
                    }
                });
            });
        });
        
        // Dots click handler
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const stepNum = this.dataset.step;
                const correspondingStep = document.querySelector(`.process-step[data-step="${stepNum}"]`);
                if (correspondingStep) {
                    correspondingStep.click();
                }
            });
        });
        
        // Auto-play through steps
        let currentStep = 1;
        setInterval(() => {
            currentStep = currentStep >= 5 ? 1 : currentStep + 1;
            const nextStep = document.querySelector(`.process-step[data-step="${currentStep}"]`);
            if (nextStep) {
                nextStep.click();
            }
        }, 4000);
    }
    
    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = stat.textContent;
                
                // Extract number from text
                if (target.includes('$')) {
                    animateValue(stat, 0, 500, 2000, '$');
                } else if (target.includes('%')) {
                    animateValue(stat, 0, 100, 2000, '%');
                } else if (target.includes('+')) {
                    animateValue(stat, 0, 3000, 2000, '+');
                }
                
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateValue(obj, start, end, duration, suffix) {
        const startTimestamp = Date.now();
        const step = () => {
            const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (suffix === '$') {
                obj.textContent = '$' + value;
            } else if (suffix === '%') {
                obj.textContent = value + '%';
            } else if (suffix === '+') {
                obj.textContent = value.toLocaleString() + '+';
            } else {
                obj.textContent = value;
            }
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }
    
});