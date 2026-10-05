// Shadow bars
// Desktop: hover intent
// Touch/mobile: tap to toggle

document.querySelectorAll('.shadow-bar').forEach(bar => {
    let timer = null;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // ─────────────────────────────
    // DESKTOP / MOUSE
    // ─────────────────────────────
    if (canHover) {

        bar.addEventListener('mouseenter', () => {
            timer = setTimeout(() => {
                bar.classList.add('active');
            }, 60);
        });

        bar.addEventListener('mouseleave', () => {
            clearTimeout(timer);

            // Preserve your instant-collapse behaviour
            bar.style.transition = 'none';
            bar.classList.remove('active');

            // Force reflow
            bar.offsetHeight;

            // Restore CSS transitions
            bar.style.transition = '';
        });
    }

    // ─────────────────────────────
    // TOUCH / MOBILE
    // ─────────────────────────────
    else {

        const handle = bar.querySelector('.bar-handle');

        if (!handle) return;

        handle.addEventListener('click', event => {
            event.stopPropagation();

            const wasOpen = bar.classList.contains('active');

            // Close any other open bar first
            document.querySelectorAll('.shadow-bar.active').forEach(openBar => {
                if (openBar !== bar) {
                    openBar.classList.remove('active');
                }
            });

            // Toggle the selected bar
            if (wasOpen) {
                bar.classList.remove('active');
            } else {
                bar.classList.add('active');
            }
        });

        // Tapping inside an open bar shouldn't close it
        bar.addEventListener('click', event => {
            event.stopPropagation();
        });
    }
});


// ─────────────────────────────
// MOBILE: tap outside to close
// ─────────────────────────────

document.addEventListener('click', () => {

    const canHover = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    ).matches;

    if (!canHover) {
        document.querySelectorAll('.shadow-bar.active').forEach(bar => {
            bar.classList.remove('active');
        });
    }
});
``