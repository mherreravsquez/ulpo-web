document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.bio-tab');
    const bioTexts = document.querySelectorAll('.bio-text');
    const contactTexts = document.querySelectorAll('.contact-text');
    const footerTexts = document.querySelectorAll('.footer-text');

    tabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const lang = tab.dataset.lang;

            // Tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Bio (main page)
            bioTexts.forEach(text => text.classList.remove('active'));
            document
                .querySelector(`.bio-text[data-lang="${lang}"]`)
                .classList.add('active');

            // Contact
            contactTexts.forEach(text => text.classList.remove('active'));
            document
                .querySelector(`.contact-text[data-lang="${lang}"]`)
                .classList.add('active');

            // Footer
            footerTexts.forEach(text => text.classList.remove('active'));
            document
                .querySelector(`.footer-text[data-lang="${lang}"]`)
                .classList.add('active');
            
            
        });

    });

});

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('about-modal');
    const trigger = document.getElementById('about-us-trigger');

    if (!modal || !trigger) return;

    function getActiveLang() {
        const activeTab = document.querySelector('.bio-tab.active');
        return activeTab ? activeTab.dataset.lang : 'es';
    }

    function openModal() {
        const lang = getActiveLang();

        modal.querySelectorAll('.about-modal-copy').forEach(p => {
            p.classList.toggle('active', p.dataset.lang === lang);
        });

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('modal-open'); // <-- nuevo
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('modal-open'); // <-- nuevo
        document.body.classList.remove('modal-open');
    }

    trigger.addEventListener('click', openModal);

    modal.querySelectorAll('[data-modal-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {

    // Agrega un objeto por cada juego/cartucho nuevo, mismo formato
    const cartridges = [
        {
            title: 'Dana Prequel',
            cartridgeImg: 'assets/game/cartridge-dana.png',
            fallbackImg: 'assets/game/fallbackvid.png',
            gameSrc: './games/DanaPrequel/index.html'
        },
        {
            title: 'Juego2',
            cartridgeImg: 'assets/game/cartridge-2.png',
            fallbackImg: 'assets/game/fallbackvid.png',
            gameSrc: 'https://mherreravsquez.github.io/'
        }
        
        // { title: 'Juego 2', cartridgeImg: '...', fallbackImg: '...', gameSrc: '...' },
    ];

    let currentIndex = 0;

    const cartridge = document.querySelector('.game-cartridge');
    const cartridgeImg = document.getElementById('game-cartridge-img');
    const fallbackImg = document.getElementById('game-fallback');
    const gameIframe = document.getElementById('game-iframe');
    const prevBtn = document.querySelector('.game-nav-prev');
    const nextBtn = document.querySelector('.game-nav-next');

    function renderCartridge() {
        const data = cartridges[currentIndex];
        cartridgeImg.src = data.cartridgeImg;
        cartridgeImg.alt = data.title;
        fallbackImg.src = data.fallbackImg;
        fallbackImg.alt = data.title;
    }

    function resetScreen() {
        cartridge.classList.remove('inserted');
        prevBtn.classList.remove('tucked');   
        nextBtn.classList.remove('tucked');
        gameIframe.style.display = 'none';
        gameIframe.src = 'about:blank';
        fallbackImg.style.display = 'block';
    }

    function changeCartridge(direction) {
        // si había un juego insertado, lo "expulsa" antes de cambiar de cartucho
        if (cartridge.classList.contains('inserted')) {
            resetScreen();
        }

        currentIndex = (currentIndex + direction + cartridges.length) % cartridges.length;
        renderCartridge();
    }

    prevBtn.addEventListener('click', () => changeCartridge(-1));
    nextBtn.addEventListener('click', () => changeCartridge(1));

    cartridge.addEventListener('click', () => {
        if (cartridge.classList.contains('inserted')) {
            resetScreen();
        return;}
        
        cartridge.classList.add('inserted');
        prevBtn.classList.add('tucked');  
        nextBtn.classList.add('tucked');
        
        const data = cartridges[currentIndex];

        setTimeout(() => {
            fallbackImg.style.display = 'none';
            gameIframe.style.display = 'block';
            gameIframe.src = data.gameSrc;
        }, 500);
    });

    renderCartridge();
});

document.addEventListener('DOMContentLoaded', () => {
    let manualOverride = null; 

    function getTimePeriod(hour) {
        if (hour >= 6 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 19) return 'afternoon';
        return 'night';
    }

    function applyTimeTheme() {
        const period = manualOverride ?? getTimePeriod(new Date().getHours());

        document.body.classList.remove('time-morning', 'time-afternoon', 'time-night');
        document.body.classList.add(`time-${period}`);
    }

    applyTimeTheme();
    setInterval(applyTimeTheme, 5 * 60 * 1000);

    // --- Panel de debug ---
    const debugButtons = document.querySelectorAll('.theme-debug-btn');

    function updateActiveButton() {
        debugButtons.forEach(btn => {
            const isActive =
                (manualOverride === null && btn.dataset.theme === 'auto') ||
                (btn.dataset.theme === manualOverride);
            btn.classList.toggle('active', isActive);
        });
    }

    debugButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            manualOverride = btn.dataset.theme === 'auto' ? null : btn.dataset.theme;
            applyTimeTheme();
            updateActiveButton();
        });
    });

    updateActiveButton();
});

document.addEventListener("DOMContentLoaded", () => {

    const sections = [...document.querySelectorAll("main > section"), document.querySelector("footer")];

    const cartridge = document.querySelector(".game-cartridge");
    const prevBtn = document.querySelector(".game-nav-prev");
    const nextBtn = document.querySelector(".game-nav-next");
    const fallbackImg = document.getElementById("game-fallback");
    const gameIframe = document.getElementById("game-iframe");
    
    let current = 0;
    let locked = false;

    function resetGame() {

        cartridge.classList.remove("inserted");

        prevBtn.classList.remove("tucked");
        nextBtn.classList.remove("tucked");

        gameIframe.style.display = "none";
        gameIframe.src = "about:blank";

        fallbackImg.style.display = "block";
    }

    function goToSection(index) {

        index = Math.max(0, Math.min(index, sections.length - 1));

        const leavingGame =
            current === 2 &&
            index !== 2 &&
            cartridge.classList.contains("inserted");

        current = index;

        sections[current].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        locked = true;

        setTimeout(() => {

            // El scroll ya terminó
            if (leavingGame) {
                resetGame();
            }

            locked = false;

        }, 800);
    }

    window.addEventListener("wheel", (e) => {

        if (locked) return;
        if (document.body.classList.contains('modal-open')) return; // <-- nuevo
        if (window.innerWidth <= 768) return;

        if (e.deltaY > 0) {
            goToSection(current + 1);
        } else {
            goToSection(current - 1);
        }

    }, { passive: true });window.addEventListener("wheel", (e) => {

        if (locked) return;
        if (document.body.classList.contains('modal-open')) return; // <-- nuevo
        if (window.innerWidth <= 768) return;

        if (e.deltaY > 0) {
            goToSection(current + 1);
        } else {
            goToSection(current - 1);
        }

    }, { passive: true });

});