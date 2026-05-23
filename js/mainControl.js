
// Hover intent — prevents bars triggering on accidental mouse-through
document.querySelectorAll('.shadow-bar').forEach(bar => {
    let timer = null;

    bar.addEventListener('mouseenter', () => {
        timer = setTimeout(() => bar.classList.add('active'), 180);
    });

    bar.addEventListener('mouseleave', () => {
        clearTimeout(timer);
        // Instant collapse — kill transition, remove class, restore
        bar.style.transition = 'none';
        bar.classList.remove('active');
        bar.offsetHeight; // force reflow
        bar.style.transition = '';
    });
});
