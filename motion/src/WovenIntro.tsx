import {AbsoluteFill,Sequence,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {TransitionSeries,linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {Landscape,FilmAssets} from './scenes/Landscape';
import {Weave} from './scenes/Weave';
import {Surface} from './scenes/Surface';
export const WovenIntro=(props:FilmAssets)=>{
 const {fps,width,height}=useVideoConfig();const f=useCurrentFrame();const mobile=height>width;
 return <AbsoluteFill style={{background:'#435033'}}>
 <TransitionSeries>
  <TransitionSeries.Sequence name="The woven landscape" durationInFrames={7*fps} premountFor={fps}><Landscape {...props}/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:1.5*fps})}/>
  <TransitionSeries.Sequence name="Follow the unfinished thread" durationInFrames={6*fps} premountFor={fps}><Weave {...props}/></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({durationInFrames:1.5*fps})}/>
  <TransitionSeries.Sequence name="The hero surface" durationInFrames={4*fps} premountFor={fps}><Surface {...props}/></TransitionSeries.Sequence>
 </TransitionSeries>
 <Sequence name="Individual sources" from={1*fps} durationInFrames={4.5*fps} premountFor={fps}><Caption text="Individual sources." mobile={mobile}/></Sequence>
 <Sequence name="One accountable record" from={7*fps} durationInFrames={3.5*fps} premountFor={fps}><Caption text="One accountable record." mobile={mobile}/></Sequence>
 <AbsoluteFill style={{pointerEvents:'none',opacity:interpolate(f,[0,12*fps,13*fps],[1,1,0],{extrapolateRight:'clamp'}),boxShadow:'inset 0 -90px 100px -80px #17231588'}}/>
 </AbsoluteFill>;
};
const Caption=({text,mobile}:{text:string;mobile:boolean})=>{
 const f=useCurrentFrame();const {fps,width}=useVideoConfig();
 return <AbsoluteFill style={{justifyContent:'flex-end',alignItems:'center',paddingBottom:mobile?'20%':'14%',pointerEvents:'none'}}>
 <span style={{fontFamily:'"Source Serif", Georgia, serif',fontWeight:400,fontSize:mobile?26:Math.min(38,width*.03),letterSpacing:'-.02em',color:'#faf8ef',textShadow:'0 2px 20px #172315cc',opacity:interpolate(f,[0,.9*fps,2.5*fps,3.5*fps],[0,1,1,0],{extrapolateRight:'clamp'}),translate:`0 ${interpolate(f,[0,1.4*fps],[10,0],{extrapolateRight:'clamp'})}px`}}>{text}</span>
 </AbsoluteFill>;
};
