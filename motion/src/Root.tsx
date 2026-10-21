import {Composition,Folder} from 'remotion';
import {WovenIntro} from './WovenIntro';
import {Landscape} from './scenes/Landscape';
import {Weave} from './scenes/Weave';
import {Surface} from './scenes/Surface';
export const RemotionRoot=()=> <>
 <Composition id="WovenIntro" component={WovenIntro} durationInFrames={420} fps={30} width={1440} height={900} defaultProps={{}}/>
 <Composition id="WovenIntroMobile" component={WovenIntro} durationInFrames={420} fps={30} width={390} height={844} defaultProps={{}}/>
 <Folder name="Scenes">
 <Composition id="Landscape" component={Landscape} durationInFrames={210} fps={30} width={1440} height={900} defaultProps={{}}/>
 <Composition id="Weave" component={Weave} durationInFrames={180} fps={30} width={1440} height={900} defaultProps={{}}/>
 <Composition id="HeroSurface" component={Surface} durationInFrames={120} fps={30} width={1440} height={900} defaultProps={{}}/>
 </Folder>
 </>;
