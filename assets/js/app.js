(()=>{
 const menu=document.getElementById('menuToggle'), nav=document.getElementById('primaryNav');
 menu?.addEventListener('click',()=>{const on=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(on));});
 document.querySelectorAll('.navigation a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
 document.querySelectorAll('[data-slider]').forEach(slider=>{const track=slider.querySelector('.slider-track');slider.querySelector('.prev')?.addEventListener('click',()=>track.scrollBy({left:-track.clientWidth*.72,behavior:'smooth'}));slider.querySelector('.next')?.addEventListener('click',()=>track.scrollBy({left:track.clientWidth*.72,behavior:'smooth'}));});
})();