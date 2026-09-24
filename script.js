document.getElementById('year').textContent = new Date().getFullYear();

const slider = document.querySelector('.slider');
const panels = Array.from(document.querySelectorAll('.panel'));
const navButtons = Array.from(document.querySelectorAll('.nav-links button'));
const dots = Array.from(document.querySelectorAll('.dot'));
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

let current = 0;

function goTo(index){
  index = Math.max(0, Math.min(panels.length - 1, index));
  panels[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
}

function updateActive(){
  const scrollLeft = slider.scrollLeft;
  const width = slider.clientWidth;
  const index = Math.round(scrollLeft / width);
  current = Math.max(0, Math.min(panels.length - 1, index));

  navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.index == current));
  dots.forEach(dot => dot.classList.toggle('active', dot.dataset.index == current));
  arrowLeft.disabled = current === 0;
  arrowRight.disabled = current === panels.length - 1;
}

// Nav bar buttons
navButtons.forEach(btn => {
  btn.addEventListener('click', () => goTo(Number(btn.dataset.index)));
});

// Dot indicators
dots.forEach(dot => {
  dot.addEventListener('click', () => goTo(Number(dot.dataset.index)));
});

// Arrow buttons
arrowLeft.addEventListener('click', () => goTo(current - 1));
arrowRight.addEventListener('click', () => goTo(current + 1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

// Keep dots/nav in sync while scrolling (including touch swipe)
let scrollTimeout;
slider.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActive, 80);
});

updateActive();
