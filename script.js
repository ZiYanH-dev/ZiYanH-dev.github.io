// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Greeting based on time of day
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = '你好!';
        if (hour >= 5 && hour < 12) greeting = '早上好!';
        else if (hour >= 12 && hour < 14) greeting = '中午好!';
        else if (hour >= 14 && hour < 18) greeting = '下午好!';
        else if (hour >= 18 && hour < 22) greeting = '晚上好!';
        else greeting = '夜深了，还不睡吗?';
        greetingEl.textContent = greeting;
    }

    // 2. Random quote (local, no API needed)
    const quoteTextEl = document.getElementById('quote-text');
    const quoteAuthorEl = document.getElementById('quote-author');

    const quotes = [
        { q: '代码是写给人看的，顺便能在机器上运行。', a: 'Donald Knuth' },
        { q: 'Stay hungry, stay foolish.', a: 'Steve Jobs' },
        { q: 'Talk is cheap. Show me the code.', a: 'Linus Torvalds' },
        { q: '程序员的三大美德: 懒惰、急躁和傲慢。', a: 'Larry Wall' },
        { q: 'Simple is better than complex.', a: 'The Zen of Python' },
        { q: 'First, solve the problem. Then, write the code.', a: 'John Johnson' },
        { q: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', a: 'Martin Fowler' },
        { q: 'Debugging is twice as hard as writing the code in the first place.', a: 'Brian Kernighan' },
        { q: 'Code is like humor. When you have to explain it, it\'s bad.', a: 'Cory House' },
        { q: 'The best error message is the one that never shows up.', a: 'Thomas Fuchs' }
    ];

    if (quoteTextEl && quoteAuthorEl) {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        quoteTextEl.textContent = `"${random.q}"`;
        quoteAuthorEl.textContent = `— ${random.a}`;
    }

    // 3. Typing Effect
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(el => {
        const texts = JSON.parse(el.dataset.typed || '["Text"]');
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                el.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                el.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before next word
            }

            setTimeout(type, typingSpeed);
        }

        type();
    });

    // 2. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 3. Create Floating Particles (additional visual effect)
    const body = document.body;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: -${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add particle animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    body.appendChild(particlesContainer);

    // 4. Add Theme Toggle Button
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle';
    themeBtn.innerHTML = '🌙';
    themeBtn.title = '切换主题';
    body.appendChild(themeBtn);

    let isDark = false;
    themeBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.classList.toggle('dark');
        themeBtn.innerHTML = isDark ? '☀️' : '🌙';
    });

    // 5. Add hover sound effect (optional - commented out)
    // Uncomment if you want click sounds
    /*
    const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp6agHFkYXKEkp6agHFkYXKEkpqZgG9iYXWEkpmYf2xiYnaDkZiYf2xiYneDkJeYf2xkYnaCj5aYf2xkYneBj5WYf2xkYneBj5WYf2xkYneCj5WYf2xkYneBj5WYf2xkYneBj5WYf2xkYneBj5WYf2xkYneBj5WYf2xkYneBj5WYf2xkYn');
    */

    // 6. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 7. Add stagger animation to skill tags
    const skillTags = document.querySelectorAll('.tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        tag.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 100 + index * 50);
    });

    // 8. Add parallax effect to background shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    console.log('🎉 Personal page loaded successfully!');
});