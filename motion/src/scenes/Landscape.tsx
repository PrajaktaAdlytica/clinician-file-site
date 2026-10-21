import {AbsoluteFill, CanvasImage, interpolate, useCurrentFrame, useVideoConfig, staticFile} from 'remotion';
export type FilmAssets = {assetBase?: string; background?: string; backgroundPosition?: string;};
export const imagePath = (base: string|undefined, name: string) => base ? `${base}/${name}` : staticFile(`film/${name}`);
export const Landscape = ({assetBase}:FilmAssets) => {
 const frame=useCurrentFrame();const {fps,width,height}=useVideoConfig();const mobile=height>width;
 return <AbsoluteFill style={{overflow:'hidden',backgroundColor:'#33392a'}}>
  <CanvasImage src={imagePath(assetBase,'landscape.png')} premountFor={fps} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:mobile?'52% 50%':'50% 50%',scale:interpolate(frame,[0,7*fps],[1.2,1.04],{extrapolateRight:'clamp'}),translate:`${interpolate(frame,[0,7*fps],[-width*.022,width*.008])}px ${interpolate(frame,[0,7*fps],[height*.025,-height*.005])}px`,filter:`brightness(${interpolate(frame,[0,2*fps,7*fps],[.82,1,1.02],{extrapolateRight:'clamp'})})`}}/>
 </AbsoluteFill>;
};
