if(new URLSearchParams(location.search).has('capture'))document.documentElement.classList.add('capture');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function icons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','icon');svg.setAttribute('viewBox','0 0 256 256');svg.setAttribute('aria-hidden','true');const use=document.createElementNS('http://www.w3.org/2000/svg','use');use.setAttribute('href',`assets/icons/sprite.svg#${el.dataset.icon}`);svg.append(use);el.replaceWith(svg);});}
const modules=[
['Credential Desk','Provider dossier/document intake and missing-item queue.','folder-open','First pilot focus','Collect a provider dossier and make missing documents visible to the assigned specialist.',['Inputs: synthetic provider, document, consent, expiry.','Output: missing-item queue with owner and dated next action.','Permission gate: provider consent and bounded data rights.'],'Dossier intake',[['Documents received','4 / 5 illustrative'],['Consent document','Missing'],['Owner / due date','Reviewer A / 21 Oct']]],
['Credential Review','License/sanction/board source-check orchestration with timestamped evidence.','file-magnifying-glass','Proposed module','Coordinate source checks while keeping attribution, freshness, and uncertainty visible.',['Inputs: source reference, access route, timestamp, verifier.','Output: dated evidence and reviewer exceptions.','Permission gate: lawful source access; abstain when unavailable.'],'Source-check queue',[['State license','Recorded / 19 Oct'],['Board verification','Stale / 12 Aug'],['Sanction source','Awaiting human check']]],
['Credential Proof','Expiry and recredentialing calendar.','calendar','Proposed module','Put renewal obligations beside the evidence that created them.',['Inputs: document expiry, review cadence, source date.','Output: assigned renewal queue and recredentialing calendar.','Permission gate: reviewer-approved cadence and state-specific rules.'],'Renewal horizon',[['State license','31 Dec 2026'],['Time from demo anchor','72 days'],['Recheck owner','Reviewer A']]],
['Credential Signal','Payer enrollment/PECOS status tracker with human submission.','signature','Proposed module','Track a payer enrollment task separately from credentialing and privileging.',['Inputs: payer task, human-recorded portal observation, authority.','Output: dated manual status and next submission owner.','Permission gate: consent, authorized human submission, portal terms.'],'Enrollment task',[['Payer example','Synthetic payer A'],['Current state','Blocked / consent'],['External submission','Unsent']]],
['Credential Report','Network-directory discrepancy and audit export.','export','Proposed module','Make differences between a dossier and directory reviewable before any correction.',['Inputs: bounded directory extract and dated dossier values.','Output: discrepancy queue and source-attributed audit export.','Permission gate: export/data rights and human review.'],'Directory discrepancy',[['Dossier practice site','Example site A'],['Directory practice site','Example site B'],['Next action','Assign human review']]]
];
$('#module-list').innerHTML=modules.map((m,i)=>`<details class="module" id="module-${i+1}" ${i===0?'open':''}><summary><span>0${i+1}</span><h3>${m[0]}</h3><p>${m[1]}</p><i data-icon="plus"></i></summary><div class="module-detail"><div><span class="cf-badge ${i===0?'success':''}">${m[3]}</span><p>${m[4]}</p><ul>${m[5].map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="module-specimen"><div class="specimen-top"><span><i data-icon="${m[2]}"></i> ${m[6]}</span><span class="eyebrow">Demo / Synthetic</span></div>${m[7].map(r=>`<div class="specimen-row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}${i===4?'<a class="text-link" href="assets/sample-audit-export.csv" download>Download synthetic audit CSV <i data-icon="arrow-right"></i></a>':''}</div></div></details>`).join('');
const cases={blocked:{id:'SYN-029',owner:'Reviewer A',credential:'Review needed',enrollment:'Blocked',next:'Obtain consent',consent:'Consent missing',detail:'Human submission remains blocked. No portal connection is implied.',explanation:'The dated license observation is recorded; board evidence is stale. Missing consent blocks enrollment. The system abstains and keeps a human owner visible.',rows:[['State license','19 Oct 2026','Reviewer A','Recorded','success','SYN-LIC-029','Manual source observation. No live licensing-board query. Last checked 19 Oct 2026, 14:00 UTC.'],['Board verification','12 Aug 2026','Reviewer B','Stale','warning','SYN-BRD-029','Evidence is stale in this scenario. Reviewer B must establish a permitted recheck route.'],['Provider consent','Not supplied','Reviewer A','Missing','error','SYN-CNS-029','Consent gate is closed. Do not submit or access a restricted source on this record.']]},review:{id:'SYN-031',owner:'Reviewer A',credential:'Review needed',enrollment:'On hold',next:'Resolve source conflict',consent:'Synthetic consent recorded',detail:'Two fictional board records disagree. Abstain until the assigned reviewer reconciles the source.',explanation:'A conflicting board observation is not automatically resolved. Reviewer A owns the exception; submission remains unsent until human review.',rows:[['State license','19 Oct 2026','Reviewer A','Recorded','success','SYN-LIC-031','Dated manual observation in a fictional source record; no portal query.'],['Board verification','20 Oct 2026','Reviewer B','Conflict','warning','SYN-BRD-031','Two synthetic evidence references disagree. Candidate status is rejected as uncertain; human review required.'],['Provider consent','18 Oct 2026','Reviewer A','Recorded','success','SYN-CNS-031','Consent is recorded only within this synthetic scenario. No real authorization is granted.']]},clean:{id:'SYN-030',owner:'Reviewer B',credential:'Ready for review',enrollment:'Human submission pending',next:'Review and hand off',consent:'Synthetic consent recorded',detail:'Evidence is assembled for a human review. No payer decision or portal confirmation is implied.',explanation:'The synthetic dossier has no open missing-item exception. A human reviewer still makes the next decision; enrollment is not approved and no submission has been sent.',rows:[['State license','19 Oct 2026','Reviewer B','Recorded','success','SYN-LIC-030','Dated manual observation; fictional evidence, no source connection.'],['Board verification','19 Oct 2026','Reviewer B','Recorded','success','SYN-BRD-030','Freshness is illustrative. A specialist remains accountable for source standards.'],['Provider consent','18 Oct 2026','Reviewer B','Recorded','success','SYN-CNS-030','Fictional consent reference for demonstrating a clean handoff.']]}};
let currentCase='blocked';
function showEvidence(i){const r=cases[currentCase].rows[i];$('#evidence-detail').innerHTML=`<i data-icon="file-text"></i><div><strong>${r[0]} / ${r[5]}</strong><p>${r[6]}</p><p>Source type: synthetic reference · Verifier: ${r[2]} · Access: manual example</p></div>`;icons($('#evidence-detail'));}
function selectCase(k){currentCase=k;const c=cases[k];$('.passport-filing>span:first-child').textContent=c.id.replace('SYN-','CF / ');$$('[data-case]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.case===k));b.tabIndex=b.dataset.case===k?0:-1;});$('#case-panel').setAttribute('aria-labelledby',`case-${k}`);$('#provider-title').textContent=`${c.id} / Fictional provider`;$('#record-meta').textContent=`${c.owner} · 20 Oct 2026 · 09:15 UTC`;$('#credential-state').textContent=c.credential;$('#enrollment-state').textContent=c.enrollment;$('#enrollment-state').className=k==='clean'?'muted':'error-text';$('#next-action').textContent=c.next;$('#next-owner').textContent=c.owner;$('#next-detail').textContent=c.detail;$('#consent-state').textContent=c.consent;$('#consent-state').className=`cf-badge ${k==='blocked'?'error':'success'}`;$('#case-explanation').textContent=c.explanation;$('#evidence-rows').innerHTML=c.rows.map((r,i)=>`<tr><td><button data-evidence="${i}">${r[0]}</button></td><td>${r[1]}</td><td>${r[2]}</td><td><span class="cf-badge ${r[4]}">${r[3]}</span></td></tr>`).join('');showEvidence(0);}
selectCase('blocked');
$$('[data-case]').forEach(b=>{b.addEventListener('click',()=>selectCase(b.dataset.case));b.addEventListener('keydown',e=>{const tabs=$$('[data-case]'),i=tabs.indexOf(b);let next;if(e.key==='ArrowRight')next=(i+1)%3;if(e.key==='ArrowLeft')next=(i+2)%3;if(e.key==='Home')next=0;if(e.key==='End')next=2;if(next!==undefined){e.preventDefault();tabs[next].focus();selectCase(tabs[next].dataset.case);}});});
$('#evidence-rows').addEventListener('click',e=>{const b=e.target.closest('[data-evidence]');if(b)showEvidence(Number(b.dataset.evidence));});
$('#handoff-toggle').addEventListener('click',()=>{const open=$('#handoff-replay').hidden;$('#handoff-replay').hidden=!open;$('#handoff-toggle').setAttribute('aria-expanded',String(open));});
let records=[];fetch('assets/synthetic-records.json').then(r=>r.json()).then(data=>{records=data.records;renderQueue();}).catch(()=>{$('#queue-count').textContent='Sample queue unavailable. The three scenarios above remain available.';});
function renderQueue(){const type=$('#queue-filter').value;const list=records.filter(r=>type==='all'||r.kind===type);$('#queue-count').textContent=`${list.length} of ${records.length} synthetic records`;$('#queue-rows').innerHTML=list.map(r=>`<tr><td>${r.id}</td><td>${r.owner}</td><td>${r.next}</td><td>${r.state}</td></tr>`).join('');}
$('#queue-filter').addEventListener('change',renderQueue);
const nav=$('#navigation'),menu=$('.mobile-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}});
$$('[data-dialog]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.dialog).showModal()));$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
// Scroll positions drive every frame; no wheel interception or one-way animation.
const media=matchMedia('(prefers-reduced-motion: reduce)');
let reduced=media.matches, motionFrame=0, lastFrame=0, renderedScroll=scrollY;
const clamp=n=>Math.max(0,Math.min(1,n));
const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
const sequence=$('.hero-sequence'), art=$('.hero-art'), heroObject=$('.hero-object');
const preview=$('.hero-passport-preview'), ticket=$('.ticket-owner'), notes=$('.art-notes');
const passportMount=$('.passport-mount'), cinemaTrack=$('.cinema-track span');
const ambientOne=$('.ambient-one'), ambientTwo=$('.ambient-two');
let geometry={};
function measureMotion(){
 const absolute=el=>el.getBoundingClientRect().top+scrollY;
 geometry={start:absolute(sequence)-$('.site-header').offsetHeight,
 travel:Math.max(1,sequence.offsetHeight-$('.hero').offsetHeight),
 artTop:absolute(art),passportTop:absolute(passportMount),
 sceneTop:absolute($('#mechanism')),sceneHeight:$('#mechanism').offsetHeight};
 scheduleMotion(true);
}
function paintMotion(y){
 const mobile=innerWidth<=800||innerHeight<=700;
 const p=reduced?0:clamp((y-geometry.start)/geometry.travel);
 const gather=smooth((p-.18)/.68), reveal=smooth((p-.35)/.48);
 const mobileP=clamp((y+innerHeight-geometry.artTop)/(innerHeight+art.offsetHeight));
 const motion=reduced?0:mobile?mobileP:p;
 heroObject.style.transform=mobile?`translate3d(0,${(motion-.2)*-24}px,0) scale(${1-motion*.025})`:`translate3d(${gather*-22}px,${gather*32}px,0) rotate(${gather*-5}deg) scale(${1-gather*.2})`;
 heroObject.style.opacity=mobile||reduced?'1':String(1-smooth((p-.62)/.25));
 preview.style.opacity=mobile||reduced||reveal===0?'0':'1';
 preview.style.clipPath=`inset(${(1-reveal)*100}% -20px -30px -20px)`;
 preview.style.transform=`translate3d(0,${(1-reveal)*80}px,0) rotate(${(1-reveal)*7}deg) scale(${.86+reveal*.14})`;
 notes.style.transform=`translate3d(${mobile?0:gather*-32}px,${reduced?0:motion*-24}px,0)`;
 notes.style.opacity=mobile||reduced?'1':String(1-smooth((p-.12)/.35));
 ticket.style.transform=`translate3d(${mobile?0:gather*65}px,${reduced?0:motion*-36}px,0) rotate(${mobile?0:gather*3}deg)`;
 ticket.style.opacity=mobile||reduced?'1':String(1-smooth((p-.2)/.4));
 cinemaTrack.style.transform=`scaleX(${reduced?0:p})`;
 const label=mobile||reduced||p<.35?'The suspended record':p<.72?'Evidence finds its owner':'One accountable passport';
 if($('#cinema-label').textContent!==label)$('#cinema-label').textContent=label;
 const entry=reduced?1:smooth((y+innerHeight-geometry.passportTop)/Math.min(innerHeight*.65,520));
 passportMount.style.transform=`perspective(1800px) translate3d(0,${(1-entry)*(mobile?18:55)}px,0) rotateX(${mobile?0:(1-entry)*5}deg) scale(${1-(1-entry)*(mobile?.008:.025)})`;
 ambientOne.style.transform=`translate3d(0,${reduced?0:-Math.min(y,2400)*.025}px,0) rotate(-16deg)`;
 ambientTwo.style.transform=`translate3d(0,${reduced?0:Math.min(y,2400)*.018}px,0) rotate(14deg)`;
 let sceneProgress=clamp((y+84-geometry.sceneTop)/Math.max(1,geometry.sceneHeight-innerHeight+84));
 if(reduced)sceneProgress=.55;
 else if(mobile)sceneProgress=clamp((y+innerHeight*.65-geometry.sceneTop)/geometry.sceneHeight);
 $('.layer-scene').style.setProperty('--spread',String(1-sceneProgress*.78));
 const step=Math.min(2,Math.floor(sceneProgress*3));
 $$('[data-step]').forEach((el,i)=>el.classList.toggle('active',i===step));
 $('#scene-caption').textContent=['The dossier / awaiting review','Source + timestamp + verifier','The next action / human-owned'][step];
 $('.site-header').classList.toggle('scrolled',y>20);
}
function tickMotion(time){
 motionFrame=0;if(document.hidden)return;
 const dt=Math.min(64,time-(lastFrame||time-16));lastFrame=time;
 // Time-based damping is independent of display refresh rate and settles in both directions.
 const delta=scrollY-renderedScroll;
 renderedScroll=reduced||Math.abs(delta)>innerHeight*1.5?scrollY:renderedScroll+delta*(1-Math.exp(-dt/65));
 if(Math.abs(scrollY-renderedScroll)<.15)renderedScroll=scrollY;
 paintMotion(renderedScroll);
 if(renderedScroll!==scrollY)motionFrame=requestAnimationFrame(tickMotion);
}
function scheduleMotion(snap=false){
 if(snap===true)renderedScroll=scrollY;
 if(!motionFrame)motionFrame=requestAnimationFrame(tickMotion);
}
function applyReduced(){
 document.body.dataset.reduced=String(reduced);
 $('#motion-toggle').setAttribute('aria-pressed',String(reduced));
 $('#motion-toggle span').textContent=reduced?'Motion reduced':'Reduce motion';
 measureMotion();
}
$('#motion-toggle').addEventListener('click',()=>{reduced=!reduced;applyReduced();});
media.addEventListener('change',()=>{reduced=media.matches;applyReduced();});
addEventListener('scroll',()=>scheduleMotion(),{passive:true});
addEventListener('resize',measureMotion);
document.addEventListener('visibilitychange',()=>{lastFrame=0;scheduleMotion(true);});
// Observe content expansion so form errors, tabs, and open queues cannot stale the scroll geometry.
new ResizeObserver(measureMotion).observe($('#main'));
addEventListener('load',measureMotion);document.fonts.ready.then(measureMotion);applyReduced();
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.05});$$('.section-head,.friction-grid,.audience-grid,.governance-list').forEach(el=>{el.classList.add('reveal-ready');observer.observe(el);});
function openHash(){const id=location.hash.slice(1);if(!id)return;const target=document.getElementById(id);if(target?.matches('details'))target.open=true;target?.scrollIntoView({behavior:'instant',block:'start'});}addEventListener('hashchange',()=>{const t=document.getElementById(location.hash.slice(1));if(t?.matches('details'))t.open=true;});document.fonts.ready.then(()=>requestAnimationFrame(openHash));icons();
