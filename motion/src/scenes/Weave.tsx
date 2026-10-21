import {AbsoluteFill, CanvasImage, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FilmAssets,imagePath} from './Landscape';
export const Weave=({assetBase}:FilmAssets)=>{
 const f=useCurrentFrame();const {fps,width,height}=useVideoConfig();
 return <AbsoluteFill style={{overflow:'hidden',backgroundColor:'#39402c'}}>
 <CanvasImage src={imagePath(assetBase,'detail.png')} premountFor={fps} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'53% 50%',scale:interpolate(f,[0,7*fps],[1.3,1.02],{extrapolateRight:'clamp'}),translate:`${interpolate(f,[0,7*fps],[width*.025,-width*.01])}px ${interpolate(f,[0,7*fps],[-height*.028,height*.004])}px`,rotate:`${interpolate(f,[0,7*fps],[-1.8,0])}deg`}}/>
 </AbsoluteFill>;
};
