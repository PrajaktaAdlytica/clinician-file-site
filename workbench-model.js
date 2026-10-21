// Pure, synthetic-only state. No persistence, messages, portal calls, or approvals.
export const OWNERS=['Reviewer A','Reviewer B','Reviewer C'];
export function createRecord(seed){
 const missingConsent=['SYN-029','SYN-036'].includes(seed.id), unavailable=seed.id==='SYN-033';
 const boardState=seed.id==='SYN-031'?'Conflict':seed.id==='SYN-037'?'Missing':['SYN-029','SYN-034'].includes(seed.id)?'Stale':'Recorded';
 const source=(type,label,status,checked,owner,detail)=>({type,label,status,checked,owner,reference:`SYN-${type}-${seed.id.slice(4)}`,detail});
 return {...seed,consent:!missingConsent,submission:'Unsent',expiry:'2026-12-31',handoff:false,
 sources:[source('LIC','State license',unavailable?'Unavailable':'Recorded',unavailable?null:'2026-10-19T14:00:00Z',seed.owner,unavailable?'A permitted source-access route has not been established. Abstain; do not infer a license result.':'Fictional manual source observation. This is not a licensing-board query or a validated license determination.'),source('BRD','Board verification',boardState,boardState==='Missing'?null:boardState==='Stale'?'2026-08-12T11:30:00Z':'2026-10-20T08:30:00Z','Reviewer B',boardState==='Conflict'?'Two fictional references disagree. A candidate result was rejected as uncertain. A specialist must reconcile the source.':boardState==='Missing'?'Required board evidence is absent from this sample dossier. No underlying document exists.':boardState==='Stale'?'This observation is stale under the illustrative review window. A permitted recheck is required.':'Fictional board-source evidence is assembled for human review. No live source or approval is implied.'),source('CNS','Provider consent',missingConsent?'Missing':'Recorded',missingConsent?null:'2026-10-18T10:00:00Z',seed.owner,missingConsent?'Consent was not supplied. Dependent access and submission steps remain blocked.':'A fictional consent reference is present in this scenario only. It grants no real-world authorization.')],
 events:[{at:'2026-10-20T09:00:00Z',actor:seed.owner,action:'Dossier opened',detail:'Synthetic intake; no imported records.'},{at:'2026-10-20T09:15:00Z',actor:seed.owner,action:'Exception review',detail:seed.next+'; external submission unsent.'}],undo:[]};
}
export function exceptions(r){return r.sources.filter(s=>s.status!=='Recorded');}
export function canHandoff(r){return r.consent&&exceptions(r).length===0;}
export function credentialing(r){return r.kind==='blocked'?(r.state==='Abstained'?'Abstained':'Review needed'):r.state;}
export function enrollment(r){return r.kind==='blocked'?'Blocked':r.kind==='review'?'On hold':'Human submission pending';}
export function applyAction(r,{type,owner,note}){
 if(!OWNERS.includes(owner))throw Error('Choose a fictional reviewer.');
 if(!note||note.trim().length<12)throw Error('Add a review reason of at least 12 characters.');
 if(!['assign','hold','handoff','replay'].includes(type))throw Error('Unknown review action.');
 if(type==='handoff'&&!canHandoff(r))throw Error('Resolve consent and source exceptions before a human handoff.');
 if(type==='replay'&&!['SYN-029','SYN-036'].includes(r.id))throw Error('This replay applies only to the missing-consent examples.');
 if(type==='replay'&&r.consent)throw Error('This example already has consent.');
 const before=structuredClone(r);before.undo=[];
 const out=structuredClone(r);out.undo.push(before);out.owner=owner;
 const last=Date.parse(out.events.at(-1).at),at=new Date(Math.max(last+60000,Date.parse(type==='replay'?'2026-10-21T10:00:00Z':'2026-10-20T09:16:00Z'))).toISOString();
 if(type==='replay'){
  out.consent=true;out.sources=out.sources.map(s=>s.status==='Missing'||s.status==='Stale'?{...s,status:'Recorded',checked:at,owner,detail:'Synthetic replay: reviewer recorded a fictional consent or refreshed evidence reference. No external source was contacted.'}:s);
  out.kind='clean';out.state='Ready for review';out.next='Human handoff';out.handoff=false;
 }else if(type==='handoff'){out.state='Handoff recorded';out.next='Authorized human submission';out.handoff=true;}
 else if(type==='hold'){out.state=out.kind==='blocked'?out.state:'Review needed';out.kind=out.kind==='blocked'?'blocked':'review';out.next='Review hold';out.handoff=false;}
 const title={assign:'Owner reassigned',hold:'Review hold recorded',handoff:'Human handoff recorded',replay:'Synthetic consent and source replay'}[type];
 out.events.push({at,actor:owner,action:title,detail:note.trim()+' External submission remains unsent.'});
 return out;
}
export function undoAction(r){
 if(!r.undo.length)return r;
 const previous=structuredClone(r.undo.at(-1));previous.undo=structuredClone(r.undo.slice(0,-1));
 previous.events=[...r.events,{at:new Date(Date.parse(r.events.at(-1).at)+60000).toISOString(),actor:r.owner,action:'Local action reversed',detail:'Prior record state restored. Earlier events retained for traceability; external submission unsent.'}];
 return previous;
}
export function csvCell(value){const s=String(value??'');return '"'+(/^[=+@\-\t\r]/.test(s)?"'"+s:s).replaceAll('"','""')+'"';}
export function auditCSV(records){const rows=[['DEMO — SYNTHETIC DATA / no live source connection'],['Record','Credentialing','Enrollment','Owner','Open exceptions','Submission','Event UTC','Actor','Action','Reason']];records.forEach(r=>r.events.forEach(e=>rows.push([r.id,credentialing(r),enrollment(r),r.owner,exceptions(r).length,r.submission,e.at,e.actor,e.action,e.detail])));return rows.map(row=>row.map(csvCell).join(',')).join('\r\n');}
