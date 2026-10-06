// ═══════════════════════════════════════════
// INPUT TYPE
// ═══════════════════════════════════════════

const canHover = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
).matches;


// ═══════════════════════════════════════════
// SHADOW BARS
//
// Desktop:
//   Hover with short intent delay
//
// Touch:
//   Tap handle to toggle
//   Only one bar open at a time
// ═══════════════════════════════════════════

document.querySelectorAll('.shadow-bar').forEach(bar => {

    let timer = null;


    // ───────────────────────────────────────
    // DESKTOP
    // ───────────────────────────────────────

    if (canHover) {

        bar.addEventListener('mouseenter', () => {

            timer = setTimeout(() => {

                bar.classList.add('active');

            }, 60);

        });


        bar.addEventListener('mouseleave', () => {

            clearTimeout(timer);

            // Instant collapse
            bar.style.transition = 'none';

            bar.classList.remove('active');

            // Force browser reflow
            void bar.offsetHeight;

            // Give transition control back to CSS
            bar.style.transition = '';

        });

    }


    // ───────────────────────────────────────
    // TOUCH
    // ───────────────────────────────────────

    else {

        const handle =
            bar.querySelector('.bar-handle');

        if (!handle) {
            return;
        }


        handle.addEventListener('click', event => {

            event.stopPropagation();

            const wasOpen =
                bar.classList.contains('active');


            // Close other bars
            document
                .querySelectorAll('.shadow-bar.active')
                .forEach(openBar => {

                    if (openBar !== bar) {

                        openBar.classList.remove('active');

                    }

                });


            // Toggle selected bar
            if (wasOpen) {

                bar.classList.remove('active');

            } else {

                bar.classList.add('active');

            }

        });


        // Interaction inside an open panel should
        // not trigger the outside-click close.
        bar.addEventListener('click', event => {

            event.stopPropagation();

        });

    }

});


// ═══════════════════════════════════════════
// MOBILE SHADOW BAR OUTSIDE CLICK
// ═══════════════════════════════════════════

if (!canHover) {

    document.addEventListener('click', () => {

        document
            .querySelectorAll('.shadow-bar.active')
            .forEach(bar => {

                bar.classList.remove('active');

            });

    });

}


// ═══════════════════════════════════════════
// IDENTITY SEALS
//
// Desktop:
//   CSS hover displays tooltip
//   Keyboard focus displays tooltip
//   Mouse click does not pin tooltip
//
// Touch:
//   Tap toggles tooltip
//   Only one tooltip open at a time
// ═══════════════════════════════════════════

const seals =
    document.querySelectorAll('.identity-seal');


// ─────────────────────────────────────────
// DESKTOP SEALS
// ─────────────────────────────────────────

if (canHover) {

    seals.forEach(seal => {

        // Desktop should never have a manually
        // pinned aria-expanded tooltip.
        seal.setAttribute(
            'aria-expanded',
            'false'
        );


        seal.addEventListener('click', event => {

            /*
               Clicking with a mouse should not
               create a persistent tooltip state.
            */
            event.preventDefault();

            seal.setAttribute(
                'aria-expanded',
                'false'
            );

            /*
               Remove mouse-created button focus.
               Keyboard focus still works normally
               when navigating with Tab.
            */
            seal.blur();

        });

    });

}


// ─────────────────────────────────────────
// TOUCH SEALS
// ─────────────────────────────────────────

else {

    seals.forEach(seal => {

        seal.addEventListener('click', event => {

            event.stopPropagation();

            const isOpen =
                seal.getAttribute('aria-expanded') === 'true';


            // Close every seal first
            seals.forEach(otherSeal => {

                otherSeal.setAttribute(
                    'aria-expanded',
                    'false'
                );

            });


            // Open selected seal unless this was
            // the seal already being toggled closed.
            if (!isOpen) {

                seal.setAttribute(
                    'aria-expanded',
                    'true'
                );

            }

        });

    });


    // Tap outside seals to close
    document.addEventListener('click', () => {

        seals.forEach(seal => {

            seal.setAttribute(
                'aria-expanded',
                'false'
            );

        });

    });

}