/* Shared disclosure navigation: native links, touch and keyboard accessible. */
(()=>{
 const nav=document.querySelector('#navigation');
 if(!nav)return;
 const menus=[...nav.querySelectorAll('.nav-dropdown')];
 const close=(except)=>menus.forEach(m=>{if(m!==except)m.open=false;});
 menus.forEach(m=>{
  const summary=m.querySelector('summary');
  m.addEventListener('toggle',()=>{summary.setAttribute('aria-expanded',String(m.open));if(m.open)close(m);});
  summary.setAttribute('aria-expanded','false');
  summary.addEventListener('click',()=>{if(!m.open)close(m);});
 });
 document.addEventListener('click',e=>{if(!nav.contains(e.target))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=menus.find(m=>m.open);if(active){close();const mobile=document.querySelector('.mobile-toggle');if(getComputedStyle(mobile).display!=='none')mobile.focus();else active.querySelector('summary').focus();}}});
 // Leave links visible until their native navigation completes.
 // Click/tap disclosures stay open while the pointer travels to a link.
 // No hover timers or focusout handlers may hide a pending click target.
 const current=location.pathname.split('/').pop()||'index.html';
 nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current)a.setAttribute('aria-current','page');});
 // Reuse the approved symbol library for editorial cards that had only text.
 const svg=(name)=>`<svg class="icon card-symbol" viewBox="0 0 256 256" aria-hidden="true"><use href="assets/icons/sprite.svg#${name}"></use></svg>`;
 const sets=[['.module-directory article',['folder-open','file-magnifying-glass','calendar-check','list-checks','export']],['.friction-grid article',['files','clock','link-break']],['.audience-grid article',['buildings','users','file-magnifying-glass']],['.story-steps article',['file-arrow-up','file-magnifying-glass','hand']],['.editorial-columns>div',['files','shield-check']],['.usecase-row',['buildings','users','file-magnifying-glass']],['.detail-grid article',['files','list-checks','shield-check']]];
 sets.forEach(([selector,names])=>document.querySelectorAll(selector).forEach((card,i)=>{const h=card.querySelector('h2,h3');if(h&&!h.querySelector('svg')&&!card.querySelector(':scope > .icon'))h.insertAdjacentHTML('afterbegin',svg(names[i%names.length]));}));
 document.querySelectorAll('.module-detail-page dt').forEach((el,i)=>el.insertAdjacentHTML('afterbegin',svg(['files','list-checks','shield-check','export'][i%4])));
 document.querySelectorAll('.module summary h3').forEach((el,i)=>el.insertAdjacentHTML('afterbegin',svg(['folder-open','file-magnifying-glass','calendar-check','list-checks','export'][i%5])));
})();
