const disciplines = document.querySelectorAll('.discipline-slice');


function openDiscipline(target) {

    if (!target) return;

    disciplines.forEach(item => {
        item.classList.remove('active');
    });

    target.classList.add('active');
}


/* ─────────────────────────────────────────
   PANEL CLICKS
   ───────────────────────────────────────── */

disciplines.forEach(discipline => {

    const trigger = discipline.querySelector('.discipline-trigger');

    trigger.addEventListener('click', () => {

        openDiscipline(discipline);

        /*
           Keep URL synced with the selected discipline.
           Doesn't reload the page.
        */
        history.replaceState(
            null,
            '',
            `#${discipline.id}`
        );

    });

});


/* ─────────────────────────────────────────
   DEEP LINK ON PAGE LOAD
   ───────────────────────────────────────── */

const requestedDiscipline =
    window.location.hash.replace('#', '');

if (requestedDiscipline) {

    const target =
        document.getElementById(requestedDiscipline);

    if (
        target &&
        target.classList.contains('discipline-slice')
    ) {
        openDiscipline(target);
    }
}


/* ─────────────────────────────────────────
   HANDLE HASH CHANGES
   ───────────────────────────────────────── */

window.addEventListener('hashchange', () => {

    const id =
        window.location.hash.replace('#', '');

    const target =
        document.getElementById(id);

    if (
        target &&
        target.classList.contains('discipline-slice')
    ) {
        openDiscipline(target);
    }

});
