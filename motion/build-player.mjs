import {build} from 'esbuild';
import {cp,mkdir} from 'node:fs/promises';
await mkdir('../assets/intro',{recursive:true});
await cp('public/film','../assets/intro',{recursive:true});
await build({entryPoints:['src/website.tsx'],bundle:true,minify:true,format:'iife',target:['safari16','chrome110'],outfile:'../intro-player.js',define:{'process.env.NODE_ENV':'"production"'}});
