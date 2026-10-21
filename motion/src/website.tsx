import {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player,PlayerRef} from '@remotion/player';
import {WovenIntro} from './WovenIntro';

const host=document.createElement('div');host.id='cf-intro';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const motionDisabled=()=>reduced.matches||document.body.dataset.reduced==='true';
let root:ReturnType<typeof createRoot>|undefined;
let previousFocus:HTMLElement|null=null;
let cleanup: (()=>void)|undefined;
let watchdog:ReturnType<typeof setTimeout>;
const App=()=>{
 const player=useRef<PlayerRef>(null);
 const [playing,setPlaying]=useState(true);
 const [frame,setFrame]=useState(0);
 const [size,setSize]=useState({width:innerWidth,height:innerHeight});
 const ended=useRef(false);
 const hero=document.querySelector('.hero-sequence') as HTMLElement;
 const surface=getComputedStyle(hero);
 const finish=(skip=false)=>{
  if(ended.current)return;ended.current=true;player.current?.pause();clearTimeout(watchdog);
  host.dataset.state='ending';document.documentElement.classList.remove('intro-pending');
  if(!skip){document.documentElement.style.setProperty('--intro-film','0');document.documentElement.style.setProperty('--intro-art','1');document.documentElement.style.setProperty('--intro-copy','1');document.documentElement.style.setProperty('--intro-detail','1');}
  document.documentElement.classList.add('intro-revealing');
  if(skip){host.classList.add('intro-skipped');document.documentElement.classList.add('intro-skipping');}
  window.setTimeout(()=>{
   cleanup?.();root?.unmount();host.remove();
   document.documentElement.classList.remove('intro-revealing','intro-playing','intro-skipping');
   try{sessionStorage.setItem('cf-intro-seen','1');}catch{/* Storage is optional. */}
   const focusTarget=previousFocus?.isConnected?previousFocus:document.querySelector('.hero h1') as HTMLElement;
   if(focusTarget){if(focusTarget.matches('h1'))focusTarget.setAttribute('tabindex','-1');focusTarget.focus({preventScroll:true});}
  },reduced.matches?0:900);
 };
 useEffect(()=>{
  const p=player.current;if(!p)return;
  p.seekTo(0);p.play();
  const onFrame=({detail}:{detail:{frame:number}})=>{
   setFrame(detail.frame);
   // One frame clock owns both the film and the live hero. No second fade at ended.
   const smooth=(from:number,to:number)=>{const x=Math.max(0,Math.min(1,(detail.frame-from)/(to-from)));return x*x*(3-2*x);};
   const style=document.documentElement.style;
   style.setProperty('--intro-film',String(1-smooth(324,418)));
   style.setProperty('--intro-art',String(smooth(338,408)));
   style.setProperty('--intro-copy',String(smooth(350,418)));
   style.setProperty('--intro-detail',String(smooth(372,419)));
   style.setProperty('--intro-controls',String(1-smooth(315,350)));
  };
  const onEnded=()=>finish();
  const onPlay=()=>setPlaying(true);const onPause=()=>setPlaying(false);
  p.addEventListener('frameupdate',onFrame);p.addEventListener('ended',onEnded);
  p.addEventListener('play',onPlay);p.addEventListener('pause',onPause);
  const onResize=()=>setSize({width:innerWidth,height:innerHeight});
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')finish(true);if(e.key==='Tab'){const buttons=[...host.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons[buttons.length-1]?.focus();}else if(!e.shiftKey&&document.activeElement===buttons[buttons.length-1]){e.preventDefault();buttons[0]?.focus();}}};
  const onReduced=()=>{if(reduced.matches)finish(true);};
  window.addEventListener('resize',onResize);document.addEventListener('keydown',onKey);reduced.addEventListener('change',onReduced);
  host.querySelector('button')?.focus({preventScroll:true});
  return()=>{p.removeEventListener('frameupdate',onFrame);p.removeEventListener('ended',onEnded);p.removeEventListener('play',onPlay);p.removeEventListener('pause',onPause);window.removeEventListener('resize',onResize);document.removeEventListener('keydown',onKey);reduced.removeEventListener('change',onReduced);};
 },[]);
 return <div className="intro-screen" role="dialog" aria-modal="true" aria-label="A Record, Woven — ClinicianFile introduction">
  <Player ref={player} component={WovenIntro} inputProps={{assetBase:'assets/intro',background:surface.backgroundImage,backgroundPosition:`0px ${Math.round(hero.getBoundingClientRect().top)}px`}} initialFrame={0} durationInFrames={420} fps={30} compositionWidth={size.width} compositionHeight={size.height} style={{width:'100%',height:'100%'}} autoPlay initiallyMuted controls={false} loop={false} clickToPlay={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false} errorFallback={()=>{queueMicrotask(()=>finish(true));return <div/>;}}/>
  <div className="intro-controls"><span className="intro-name">A RECORD, WOVEN</span><div><button type="button" onClick={()=>playing?player.current?.pause():player.current?.play()}>{playing?'Pause':'Play'}</button><button type="button" onClick={()=>finish(true)}>Skip intro <span aria-hidden="true">→</span></button></div></div>
  <div className="intro-progress" aria-hidden="true" style={{scale:`${frame/419} 1`}}/>
 </div>;
};
function start(){
 if(document.getElementById('cf-intro')||motionDisabled())return;
 previousFocus=document.activeElement instanceof HTMLElement&&document.activeElement!==document.body?document.activeElement:null;
 window.scrollTo({top:0,behavior:'instant'});
 const css=document.documentElement.style;
 css.setProperty('--intro-film','1');css.setProperty('--intro-art','0');css.setProperty('--intro-copy','0');css.setProperty('--intro-detail','0');css.setProperty('--intro-controls','1');
 css.setProperty('--intro-cloth-origin',`${Math.round((document.querySelector('.hero-sequence') as HTMLElement).getBoundingClientRect().top)}px`);
 document.documentElement.classList.add('intro-pending','intro-playing');
 document.body.prepend(host);host.dataset.state='playing';host.classList.remove('intro-skipped');
 const inertEls=[...document.body.children].filter(el=>el!==host&&!['SCRIPT','LINK','STYLE'].includes(el.tagName)).map(el=>({el:el as HTMLElement,was:el.hasAttribute('inert')}));
 inertEls.forEach(({el})=>el.inert=true);
 cleanup=()=>{inertEls.forEach(({el,was})=>el.inert=was);};
 root=createRoot(host);root.render(<App/>);
 // A player or asset failure must never trap visitors behind the intro.
 watchdog=setTimeout(()=>{if(host.dataset.state==='playing'&&!host.querySelector('button')){cleanup?.();root?.unmount();host.remove();document.documentElement.classList.remove('intro-pending','intro-playing');}},10000);
}
const replay=document.createElement('button');replay.className='quiet-control intro-replay';replay.textContent='Replay intro';replay.type='button';replay.addEventListener('click',start);const motion=document.querySelector('#motion-toggle');const actions=document.createElement('div');actions.className='intro-actions';if(motion){motion.replaceWith(actions);actions.append(motion,replay);}else{document.querySelector('.hero-foot')?.append(replay);}replay.hidden=motionDisabled();
reduced.addEventListener('change',()=>{replay.hidden=motionDisabled();});
motion?.addEventListener('click',()=>{replay.hidden=motionDisabled();});
if(document.documentElement.classList.contains('intro-pending'))start();
