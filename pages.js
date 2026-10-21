const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('[data-icon]').forEach(el=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','icon');svg.setAttribute('viewBox','0 0 256 256');svg.setAttribute('aria-hidden','true');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href',`assets/icons/sprite.svg#${el.dataset.icon}`);svg.append(use);el.replaceWith(svg);});
const menu=$('.mobile-toggle'),nav=$('#navigation');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const current=location.pathname.split('/').pop();$$('nav a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page');});
addEventListener('scroll',()=>$('.site-header').classList.toggle('scrolled',scrollY>20),{passive:true});
