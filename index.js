

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Define your custom moon icon (Silver/Azure SVG)
const moonIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="azure" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunEmoji = '☀️';

// 1. Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Use innerHTML to support the SVG icon
    themeIcon.innerHTML = newTheme === 'light' ? sunEmoji : moonIcon;
    
    localStorage.setItem('theme', newTheme);
});

// Load saved theme on startup
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.innerHTML = savedTheme === 'light' ? sunEmoji : moonIcon;
}

// smooth trigger effect
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  {
    threshold: 0.15, // 15% visible to trigger
    rootMargin: '0px 0px -40px 0px' // offset from bottom
  }
);

// Observe all elements with .reveal class
document.querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));

// star random moving effect
(function () {
  const COUNT = 180, MAX_RADIUS = 1.2, MIN_RADIUS = 0.25, MAX_SPEED = 0.38;
  const canvas = document.getElementById('starfield-canvas');
  const ctx = canvas.getContext('2d');
  Object.assign(canvas.style, {
    position:'fixed', top:'0', left:'0', width:'100vw', height:'100vh',
    zIndex:'-1', display:'block', pointerEvents:'none'
  });
  let W, H, stars=[], raf;
  function rand(a,b){return Math.random()*(b-a)+a;}
  function isDark(){ return !document.body.classList.contains('light'); }
  function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
  function createStars(){
    stars=[];
    for(let i=0;i<COUNT;i++){
      const a=rand(0,Math.PI*2), sp=rand(0.05,MAX_SPEED);
      stars.push({x:rand(0,W),y:rand(0,H),r:rand(MIN_RADIUS,MAX_RADIUS),
        dx:Math.cos(a)*sp,dy:Math.sin(a)*sp,o:rand(0.18,0.75),ot:rand(0,Math.PI*2),os:rand(0.003,0.012)});
    }
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    const dark=isDark(), r=dark?255:15, g=dark?255:15, b=dark?255:35;
    for(const s of stars){
      s.x=(s.x+s.dx+W)%W; s.y=(s.y+s.dy+H)%H; s.ot+=s.os;
      const op=s.o*(0.7+0.3*Math.sin(s.ot));
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${r},${g},${b},${op.toFixed(3)})`; ctx.fill();
    }
    raf=requestAnimationFrame(draw);
  }
  resize(); createStars(); draw();
  window.addEventListener('resize',()=>{cancelAnimationFrame(raf);resize();createStars();draw();});
})();


