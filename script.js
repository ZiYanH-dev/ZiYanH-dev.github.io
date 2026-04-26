// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Language toggle functionality
    let currentLang = 'zh';

    // Typing animation state - shared between language switch and animation
    const typingData = {
        zh: ['软件开发工程师', '后端开发者', 'AI 爱好者'],
        en: ['Software Engineer', 'Backend Developer', 'AI Enthusiast']
    };

    function setLanguage(lang) {
        currentLang = lang;

        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const translations = el.dataset.i18n.split('|');
            el.textContent = translations[lang === 'zh' ? 0 : 1];
        });

        // Update title
        const title = document.querySelector('title');
        if (title && title.dataset.i18nTitle) {
            const titleTranslations = title.dataset.i18nTitle.split('|');
            title.textContent = titleTranslations[lang === 'zh' ? 0 : 1];
        }

        // Update greeting
        const greetingEl = document.getElementById('greeting');
        if (greetingEl) {
            const hour = new Date().getHours();
            let greeting;
            if (lang === 'en') {
                if (hour >= 5 && hour < 12) greeting = 'Good Morning!';
                else if (hour >= 12 && hour < 14) greeting = 'Good Noon!';
                else if (hour >= 14 && hour < 18) greeting = 'Good Afternoon!';
                else if (hour >= 18 && hour < 22) greeting = 'Good Evening!';
                else greeting = 'Late night, aren\'t you sleepy?';
            } else {
                if (hour >= 5 && hour < 12) greeting = '早上好!';
                else if (hour >= 12 && hour < 14) greeting = '中午好!';
                else if (hour >= 14 && hour < 18) greeting = '下午好!';
                else if (hour >= 18 && hour < 22) greeting = '晚上好!';
                else greeting = '夜深了，还不睡吗?';
            }
            greetingEl.textContent = greeting;
        }
    }

    // Language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'zh' ? 'en' : 'zh');
        });
    }

    // Initialize language on page load
    setLanguage('zh');

    // Random quote (local, no API needed)
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

    // 3. Typing Effect with language support
    let typingInterval = null;
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let currentTexts = typingData.zh;

    function startTypingAnimation(el) {
        if (typingInterval) clearTimeout(typingInterval);

        function type() {
            const currentText = currentTexts[currentTextIndex];

            if (isDeleting) {
                el.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                el.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                typingInterval = setTimeout(type, 2000);
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % currentTexts.length;
                typingInterval = setTimeout(type, 500);
            } else {
                typingInterval = setTimeout(type, isDeleting ? 50 : 100);
            }
        }
        type();
    }

    // Start typing animation
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(el => startTypingAnimation(el));

    // Add language switch to setLanguage function
    const originalSetLanguage = setLanguage;
    setLanguage = function(lang) {
        originalSetLanguage(lang);

        // Update typing animation with new language
        currentTexts = typingData[lang];
        currentTextIndex = 0;
        currentCharIndex = 0;
        isDeleting = false;

        const typingEl = document.querySelector('.typing-text');
        if (typingEl) {
            startTypingAnimation(typingEl);
        }
    };

    // 4. Scroll Reveal Animation
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

    // 5. Create Floating Particles (additional visual effect)
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

    // 6. Add Theme Toggle Button
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

    // 7. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 8. Add stagger animation to skill tags
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

    // 9. Add parallax effect to background shapes
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