document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.bio-tab');
    const bioTexts = document.querySelectorAll('.bio-text');
    const contactTexts = document.querySelectorAll('.contact-text');

    tabs.forEach(tab => {

        tab.addEventListener('click', () => {

            const lang = tab.dataset.lang;

            // Tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Bio
            bioTexts.forEach(text => text.classList.remove('active'));
            document
                .querySelector(`.bio-text[data-lang="${lang}"]`)
                .classList.add('active');

            // Contact
            contactTexts.forEach(text => text.classList.remove('active'));
            document
                .querySelector(`.contact-text[data-lang="${lang}"]`)
                .classList.add('active');

        });

    });

});

document.addEventListener('DOMContentLoaded', () => {
    const cartridge = document.querySelector('.game-cartridge');

    cartridge.addEventListener('click', () => {
        if (cartridge.classList.contains('inserted')) return;
        cartridge.classList.add('inserted');

        setTimeout(() => {
            // juego
        }, 500);
    });
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

    let current = 0;
    let locked = false;

    function goToSection(index) {

        index = Math.max(0, Math.min(index, sections.length - 1));

        current = index;

        sections[current].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        locked = true;

        setTimeout(() => {
            locked = false;
        }, 800);
    }

    window.addEventListener("wheel", (e) => {

        if (locked) return;

        if (e.deltaY > 0) {
            goToSection(current + 1);
        } else {
            goToSection(current - 1);
        }

    }, { passive: true });

});