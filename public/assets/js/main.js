// ==========================================
// TIKIZIA GAMES
// MAIN JAVASCRIPT
// ==========================================


// Automatic copyright year
const yearElement =
  document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}


// ==========================================
// SIMPLE SCROLL REVEAL
// ==========================================

const elementsToReveal =
  document.querySelectorAll(
    ".game-card, .value-item, .about-content, .statement-big"
  );

elementsToReveal.forEach((element) => {
  element.classList.add("reveal");
});


const observer =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.15
    }
  );


elementsToReveal.forEach((element) => {

  observer.observe(element);

});