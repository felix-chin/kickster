var clubLogos = document.querySelector('.club-logos-wrapper');
var clubSelected = '';

clubLogos.addEventListener('click', onLogoClick);

function onLogoClick(event) {
  var element = event.target;
  if(!element.hasAttribute('data-club')) {
    return;
  }
  clubSelected = element.getAttribute('data-club');
}
