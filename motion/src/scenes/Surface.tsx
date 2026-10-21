import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {FilmAssets,imagePath} from './Landscape';
export const Surface=({assetBase,background,backgroundPosition='0px 0px'}:FilmAssets)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{backgroundColor:'#435033',backgroundImage:background||`linear-gradient(#26392366,#26392366),url("${imagePath(assetBase,'olive-bookcloth.webp')}")`,backgroundSize:'auto,620px',backgroundPosition,scale:interpolate(f,[0,1.5*fps],[1.08,1],{extrapolateRight:'clamp'}),transformOrigin:'0 0'}}/>;
};
