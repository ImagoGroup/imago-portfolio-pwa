
// App JS for Imago Portfolio PWA
document.addEventListener('DOMContentLoaded', ()=>{
  // sidebar toggle
  const sidebar = document.getElementById('sidebar');
  const btn = document.getElementById('categoriesBtn');
  const closeBtn = document.getElementById('closeSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if(btn) btn.addEventListener('click', ()=> sidebar && sidebar.setAttribute('aria-hidden','false'));
  if(closeBtn) closeBtn.addEventListener('click', ()=> sidebar && sidebar.setAttribute('aria-hidden','true'));
  if(backdrop) backdrop.addEventListener('click', ()=> sidebar && sidebar.setAttribute('aria-hidden','true'));

  // category card hover swaps (data-image2)
  document.querySelectorAll('.category-card').forEach(card=>{
    const img = card.querySelector('img');
    const img1 = card.dataset.image1;
    const img2 = card.dataset.image2;
    card.addEventListener('mouseenter', ()=>{ if(img2) img.src = img2; });
    card.addEventListener('mouseleave', ()=>{ img.src = img1; });
  });

  // register service worker
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js').catch(err=>console.warn('sw failed',err));
  }

  // automatic install prompt once
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    if(!localStorage.getItem('imago_install_shown')){
      setTimeout(()=>{
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(()=>{ localStorage.setItem('imago_install_shown','1'); deferredPrompt = null; });
      }, 800);
    }
  });
});

// carousel helper
function initCarousel(id){
  const el = document.getElementById(id);
  if(!el) return;
  const imgs = Array.from(el.querySelectorAll('img'));
  let idx = 0;
  function show(i){ imgs.forEach((im,j)=> im.style.display = j===i ? 'block' : 'none'); }
  show(0);
  const prev = el.querySelector('.prev');
  const next = el.querySelector('.next');
  if(prev) prev.addEventListener('click', ()=>{ idx = (idx-1+imgs.length)%imgs.length; show(idx); });
  if(next) next.addEventListener('click', ()=>{ idx = (idx+1)%imgs.length; show(idx); });
}
window.initCarousel = initCarousel;
