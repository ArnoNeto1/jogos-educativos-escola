var e=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);function t(e){let t=Object.values(e).filter(e=>typeof e==`number`);return Object.entries(e).filter(([e,n])=>t.indexOf(+e)===-1).map(([e,t])=>t)}function n(e,t=`|`){return e.map(e=>ie(e)).join(t)}function r(e,t){return typeof t==`bigint`?t.toString():t}function i(e){return{get value(){{let t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function a(e){return e==null}function o(e){let t=+!!e.startsWith(`^`),n=e.endsWith(`$`)?e.length-1:e.length;return e.slice(t,n)}function s(e,t){let n=e/t,r=Math.round(n),i=4*2**-52*Math.max(Math.abs(n),1);return Math.abs(n-r)<i?0:n-r}function c(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function l(...e){let t={};for(let n of e){let e=Object.getOwnPropertyDescriptors(n);Object.assign(t,e)}return Object.defineProperties({},t)}function u(e){return JSON.stringify(e)}function d(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,``).replace(/[\s_-]+/g,`-`).replace(/^-+|-+$/g,``)}const f=`captureStackTrace`in Error?Error.captureStackTrace:(...e)=>{};function p(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}const m=i(()=>{if(y.jitless||typeof navigator<`u`&&navigator?.userAgent?.includes(`Cloudflare`))return!1;try{return Function(``),!0}catch{return!1}});function h(e){if(p(e)===!1)return!1;let t=e.constructor;if(t===void 0||typeof t!=`function`)return!0;let n=t.prototype;return p(n)!==!1&&Object.prototype.hasOwnProperty.call(n,`isPrototypeOf`)!==!1}function ee(e){return h(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}const te=new Set([`string`,`number`,`symbol`]);function ne(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function re(e,t,n){let r=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(r._zod.parent=e),r}function g(e){let t=e;if(!t)return{};if(typeof t==`string`)return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error==`string`?{...t,error:()=>t.error}:t}function ie(e){return typeof e==`bigint`?e.toString()+`n`:typeof e==`string`?`"${e}"`:`${e}`}function ae(e){return Object.keys(e).filter(t=>e[t]._zod.optin!==void 0&&e[t]._zod.optout===`optional`)}const oe={safeint:[-(2**53-1),2**53-1],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function se(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.pick() cannot be used on object schemas containing refinements`);return re(e,l(e._zod.def,{get shape(){let e={};for(let r of Reflect.ownKeys(t)){if(!Object.prototype.hasOwnProperty.call(n.shape,r))throw Error(`Unrecognized key: "${String(r)}"`);t[r]&&c(e,r,n.shape[r])}return c(this,`shape`,e),e},checks:[]}))}function ce(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.omit() cannot be used on object schemas containing refinements`);return re(e,l(e._zod.def,{get shape(){let r={...e._zod.def.shape};for(let e of Reflect.ownKeys(t)){if(!Object.prototype.hasOwnProperty.call(n.shape,e))throw Error(`Unrecognized key: "${String(e)}"`);t[e]&&delete r[e]}return c(this,`shape`,r),r},checks:[]}))}function le(e,t){if(!h(t))throw Error(`Invalid input to extend: expected a plain object`);let n=e._zod.def.checks;if(n&&n.length>0){let n=e._zod.def.shape;for(let e of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(n,e)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return re(e,l(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return c(this,`shape`,n),n}}))}function ue(e,t){if(!h(t))throw Error(`Invalid input to safeExtend: expected a plain object`);return re(e,l(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return c(this,`shape`,n),n}}))}function de(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);return re(e,l(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t._zod.def.shape};return c(this,`shape`,n),n},get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]}))}function fe(e,t,n,r=`partial`){let i=t._zod.def.checks;if(i&&i.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);return re(t,l(t._zod.def,{get shape(){let r=t._zod.def.shape,i={...r};if(n)for(let t of Reflect.ownKeys(n)){if(!Object.prototype.hasOwnProperty.call(r,t))throw Error(`Unrecognized key: "${String(t)}"`);n[t]&&(i[t]=e?new e({type:`optional`,innerType:r[t]}):r[t])}else for(let t of Reflect.ownKeys(r))i[t]=e?new e({type:`optional`,innerType:r[t]}):r[t];return c(this,`shape`,i),i},checks:[]}))}function pe(e,t,n){return re(t,l(t._zod.def,{get shape(){let r=t._zod.def.shape,i={...r};if(n)for(let t of Reflect.ownKeys(n)){if(!Object.prototype.hasOwnProperty.call(i,t))throw Error(`Unrecognized key: "${String(t)}"`);n[t]&&(i[t]=new e({type:`nonoptional`,innerType:r[t]}))}else for(let t of Reflect.ownKeys(r))i[t]=new e({type:`nonoptional`,innerType:r[t]});return c(this,`shape`,i),i}}))}function me(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function he(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function ge(e,t){return t.map(t=>{var n;return(n=t).path??(n.path=[]),t.path.unshift(e),t})}function _e(e){return typeof e==`string`?e:e?.message}function ve(e,t,n){var r;for(let i=t;i<e.length;i++)(r=e[i]).schema??(r.schema=n)}function ye(e,t,n){var r;let i=e.inst?._zod?.traits;i?.has(`$ZodType`)&&(i.has(`$ZodCheck`)?(r=e).schema??(r.schema=e.inst):e.schema=e.inst);let a=e.schema===e.inst?void 0:e.schema?._zod.def?.error,o=e.message?e.message:_e(e.inst?._zod.def?.error?.(e))??_e(a?.(e))??_e(t?.error?.(e))??_e(n.customError?.(e))??_e(n.localeError?.(e))??`Invalid input`,{inst:s,schema:c,continue:l,input:u,...d}=e;return d.path??=[],d.message=o,t?.reportInput&&(d.input=u),d}const be=/[\uD800-\uDBFF]/;function xe(e){let t=e.length;if(!be.test(e))return t;let n=t;for(let r=0;r<t-1;r++)(e.charCodeAt(r)&64512)==55296&&(e.charCodeAt(r+1)&64512)==56320&&(n--,r++);return n}function Se(e){return Array.isArray(e)?`array`:typeof e==`string`?`string`:`unknown`}function Ce(e){let t=typeof e;switch(t){case`number`:return Number.isNaN(e)?`nan`:`number`;case`object`:{if(e===null)return`null`;if(Array.isArray(e))return`array`;let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&`constructor`in t&&t.constructor)return t.constructor.name}}return t}function we(...e){let[t,n,r]=e;return typeof t==`string`?{message:t,code:`custom`,input:n,inst:r}:{...t}}function Te(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);r.get?Object.defineProperty(e,n,{...r,enumerable:!1}):Oe(e,n,r.value)}}function Ee(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function De(e,t,n){return Ee(e,t,n,!1)}function Oe(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:Ee(this,t,n.bind(this))},set(e){Ee(this,t,e)}})}function ke(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}let Ae,je=!1;const Me={configurable:!0,get(){je=!0}};function _(e,t,n){let r=Object.getPrototypeOf(e._zod);if(t in r&&Ae!==e._zod){Ae=void 0;return}Ae=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,Me);let e=je;je=!1;try{let r=n(this);return je?delete this[t]:Object.defineProperty(this,t,{configurable:!0,writable:!0,value:r}),je||=e,r}catch(n){throw delete this[t],je||=e,n}},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}})}function Ne(e,t,n,r){let i=ke(e,t);i&&Object.defineProperty(i,t,{configurable:!0,get(){let e={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,e),e.value=n(this),Object.defineProperty(this,t,e),e.value},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:e})}})}function Pe(e){let t=()=>e;return t[`~constantCatch`]=!0,t}var Fe;const Ie={value:void 0,enumerable:!1};let Le=`captureStackTrace`in Error?Error:null;function Re(e){let t=Le;if(t){let n=t.stackTraceLimit;if(typeof n==`number`){try{t.stackTraceLimit=0}catch{return Le=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function v(e,t,n,r){let i={};function a(e){this.def=e,this.constr=d,this.traits=new Set}a.prototype=i;let o=n,s=o&&new WeakSet;function c(n,r){if(!n._zod){Ie.value=new a(r);try{Object.defineProperty(n,"_zod",Ie)}finally{Ie.value=void 0}}if(n._zod.traits.has(e))return;if(n._zod.traits.add(e),t(n,r),s){let e=Object.getPrototypeOf(n),t=n._zod.constr.prototype,r=e;for(;r&&r!==t;)r=Object.getPrototypeOf(r);let i=r??e;s.has(i)||(s.add(i),Te(i,o))}let i=d.prototype;for(let e in i)Object.prototype.hasOwnProperty.call(i,e)&&(e in n||(n[e]=i[e].bind(n)))}let l=r?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function d(e){let t=r?.Parent?Re(u):this;c(t,e);let n=t._zod.deferred;if(n){for(let e of n)e();t._zod.deferred=void 0}let i=globalThis.__zod_globalConfig?.postProcessor;return i&&i(t),t}return Object.defineProperty(d,"init",{value:c}),Object.defineProperty(d,Symbol.hasInstance,{value:t=>r?.Parent&&t instanceof r.Parent?!0:t?._zod?.traits?.has(e)}),Object.defineProperty(d,"name",{value:e}),d}var ze=class extends Error{constructor(){super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`)}},Be=class extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`),this.name=`ZodEncodeError`}};(Fe=globalThis).__zod_globalConfig??(Fe.__zod_globalConfig={});const y=globalThis.__zod_globalConfig;function Ve(e){return e&&Object.assign(y,e),y}var He=class{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1,e(this),--this.indent}write(e){if(typeof e==`function`){e(this,{execution:`sync`}),e(this,{execution:`async`});return}let t=e.split(`
`).filter(e=>e),n=Math.min(...t.map(e=>e.length-e.trimStart().length)),r=t.map(e=>e.slice(n)).map(e=>` `.repeat(this.indent*2)+e);for(let e of r)this.content.push(e)}compile(){let e=Function,t=this?.content??[``];return new e(...Object.keys(this.closed),`return function (${this.args.join(`, `)}) {\n${t.join(`
`)}\n};`)(...Object.values(this.closed))}},Ue=class extends Error{constructor(){super(`Cannot parse a reference cycle that closes through a transform`),this.name=`ZodCyclicError`}};const We=`~memo`,Ge=[];function Ke(e){return e.map(e=>e.path?{...e,path:e.path.slice()}:{...e})}const qe=new WeakMap;function Je(e,t){let n=qe.get(e);if(n!==void 0)return n;if(t.has(e))return!0;t.add(e);let r=!1,i=e=>{!r&&e?._zod&&Je(e,t)&&(r=!0)},a=e._zod.def;switch(a.type){case`object`:for(let e of Reflect.ownKeys(a.shape))i(a.shape[e]);i(a.catchall);break;case`array`:i(a.element);break;case`tuple`:for(let e of a.items)i(e);i(a.rest);break;case`record`:case`map`:i(a.keyType),i(a.valueType);break;case`set`:i(a.valueType);break;case`union`:for(let e of a.options)i(e);break;case`intersection`:i(a.left),i(a.right);break;case`optional`:case`nullable`:case`default`:case`prefault`:case`catch`:case`readonly`:case`nonoptional`:case`promise`:case`success`:i(a.innerType);break;case`pipe`:i(a.in),i(a.out);break;case`function`:i(a.input),i(a.output);break;case`lazy`:i(e._zod.innerType);break;case`template_literal`:case`string`:case`number`:case`int`:case`boolean`:case`bigint`:case`symbol`:case`undefined`:case`null`:case`void`:case`never`:case`any`:case`unknown`:case`date`:case`nan`:case`enum`:case`literal`:case`file`:case`transform`:case`custom`:break;default:for(let e in a){let t=Object.getOwnPropertyDescriptor(a,e);if(!t||t.get)continue;let n=t.value;if(!(!n||typeof n!=`object`)){if(n._zod)i(n);else if(Array.isArray(n))for(let e of n)i(e)}}}return t.delete(e),qe.set(e,r),r}function Ye(e){return Je(e,new Set)}function Xe(e,t){let n=e.buckets.get(t);return n||(n=new Map,e.buckets.set(t,n)),n}let Ze;const Qe=[],$e={alloc(e,t,n){let r=Ze;if(!r)return n;Ze=void 0;let i={value:n,issues:null};return r.set(t.value,i),Qe.push(i),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,n=(e,n)=>{if(n.direction!==`backward`&&tt(n,e.value))throw new Ue;return t(e,n)};e._zod.parse=n,e._zod.run===t&&(e._zod.run=n)})},attach(e){var t;let n,r,i;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,a=(o,s)=>{if(n===void 0&&(n=Je(e,new Set),!n))return e._zod.parse=t,e._zod.run===a&&(e._zod.run=t),t(o,s);let c=o.value;if(typeof c!=`object`||!c)return t(o,s);let l=s[We];l||(l={buckets:new Map,backEdges:void 0},s[We]=l);let u;r===s?u=i:(u=Xe(l,e),r=s,i=u);let d=u.get(c);if(d)return o.value=d.value,d.issues?d.issues.length&&o.issues.push(...Ke(d.issues)):(o.memo=!0,l.backEdges??(l.backEdges=new Set),l.backEdges.add(d.value)),o;Ze=u;let f=Qe.length,p=t(o,s);Ze=void 0;let m=Qe.length>f?Qe.pop():void 0;return p instanceof Promise?p.then(e=>(m&&(m.issues=e.issues.length?Ke(e.issues):Ge),e)):(m&&(m.issues=p.issues.length?Ke(p.issues):Ge),p)};e._zod.parse=a,e._zod.run===t&&(e._zod.run=a)})}};function et(){return $e}function tt(e,t){let n=e[We]?.backEdges;return n!==void 0&&typeof t==`object`&&!!t&&n.has(t)}const nt=/^[cC][0-9a-z]{6,}$/,rt=/^[0-9a-z]+$/,it=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,at=/^[0-9a-vA-V]{20}$/,ot=/^[A-Za-z0-9]{27}$/,st=/^[a-zA-Z0-9_-]{21}$/;function ct(e){return RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}const lt=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,ut=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,dt=e=>e?RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,ft=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;function pt(){return RegExp(`^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`,`u`)}const mt=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,ht=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,gt=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,_t=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,vt=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,yt=/^[A-Za-z0-9_-]*$/,bt=/^https?$/,xt=/^\+[1-9]\d{6,14}$/,St=/^\d(?:[ -]?\d){11,18}$/,Ct=`(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;function wt(e){return RegExp(`^${e}$`)}const Tt=wt(Ct);function Et(e){let t=`(?:[01]\\d|2[0-3]):[0-5]\\d`;return typeof e.precision==`number`?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${t}:[0-5]\\d(?:\\.\\d+)?`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Dt(e){return RegExp(`^${Et(e)}$`)}function Ot(e){let t=[`Z`];e.offset&&t.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);let n=`${Et({precision:e.precision,seconds:!0})}(?:${t.join(`|`)})`,r=e.local?`${n}|${Et({precision:e.precision})}`:n;return RegExp(`^${Ct}T(?:${r})$`)}const kt=e=>{let t=e?`[\\s\\S]{${e?.minimum??0},${e?.maximum??``}}`:`[\\s\\S]*`;return RegExp(`^${t}$`)},At=/^-?\d+$/,jt=/^-?\d+(?:\.\d+)?$/,Mt=/^(?:true|false)$/i,Nt=/^null$/i,Pt=/^[^A-Z]*$/,Ft=/^[^a-z]*$/,b=v(`$ZodCheck`,(e,t)=>{var n;e._zod??={},e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),It=e=>{let t=e.value;return!a(t)&&t.length!==void 0},Lt={number:`number`,bigint:`bigint`,object:`date`},Rt=v(`$ZodCheckLessThan`,(e,t)=>{b.init(e,t);let n=Lt[typeof t.value];e._zod.onattach.push(e=>{let n=e._zod.bag,r=(t.inclusive?n.maximum:n.exclusiveMaximum)??1/0;t.value<r&&(t.inclusive?n.maximum=t.value:n.exclusiveMaximum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:Lt[typeof r.value]??n,code:`too_big`,maximum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),zt=v(`$ZodCheckGreaterThan`,(e,t)=>{b.init(e,t);let n=Lt[typeof t.value];e._zod.onattach.push(e=>{let n=e._zod.bag,r=(t.inclusive?n.minimum:n.exclusiveMinimum)??-1/0;t.value>r&&(t.inclusive?n.minimum=t.value:n.exclusiveMinimum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:Lt[typeof r.value]??n,code:`too_small`,minimum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Bt=v(`$ZodCheckMultipleOf`,(e,t)=>{b.init(e,t),e._zod.onattach.push(e=>{var n;(n=e._zod.bag).multipleOf??(n.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw Error(`Cannot mix number and bigint in multiple_of check.`);(typeof n.value==`bigint`?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):s(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:`not_multiple_of`,divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Vt=v(`$ZodCheckNumberFormat`,(e,t)=>{b.init(e,t),t.format=t.format||`float64`;let n=t.format?.includes(`int`),r=n?`int`:`number`,[i,a]=oe[t.format];e._zod.onattach.push(e=>{let r=e._zod.bag;r.format=t.format,r.minimum=i,r.maximum=a,n&&(r.pattern=At)}),e._zod.check=o=>{let s=o.value;if(n){if(!Number.isInteger(s)){o.issues.push({expected:r,format:t.format,code:`invalid_type`,continue:!1,input:s,inst:e});return}if(!Number.isSafeInteger(s)){s>0?o.issues.push({input:s,code:`too_big`,maximum:2**53-1,note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort}):o.issues.push({input:s,code:`too_small`,minimum:-(2**53-1),note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}s<i&&o.issues.push({origin:`number`,input:s,code:`too_small`,minimum:i,inclusive:!0,inst:e,continue:!t.abort}),s>a&&o.issues.push({origin:`number`,input:s,code:`too_big`,maximum:a,inclusive:!0,inst:e,continue:!t.abort})}}),Ht=v(`$ZodCheckMaxLength`,(e,t)=>{var n;b.init(e,t),(n=e._zod.def).when??(n.when=It),e._zod.onattach.push(e=>{let n=e._zod.bag.maximum??1/0;t.maximum<n&&(e._zod.bag.maximum=t.maximum)}),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>t.maximum?xe(r):i)<=t.maximum)return;let a=Se(r);n.issues.push({origin:a,code:`too_big`,maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Ut=v(`$ZodCheckMinLength`,(e,t)=>{var n;b.init(e,t),(n=e._zod.def).when??(n.when=It),e._zod.onattach.push(e=>{let n=e._zod.bag.minimum??-1/0;t.minimum>n&&(e._zod.bag.minimum=t.minimum)}),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>=t.minimum&&i<t.minimum*2?xe(r):i)>=t.minimum)return;let a=Se(r);n.issues.push({origin:a,code:`too_small`,minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Wt=v(`$ZodCheckLengthEquals`,(e,t)=>{var n;b.init(e,t),(n=e._zod.def).when??(n.when=It),e._zod.onattach.push(e=>{let n=e._zod.bag;n.minimum=t.length,n.maximum=t.length,n.length=t.length}),e._zod.check=n=>{let r=n.value,i=r.length,a=typeof r==`string`&&i>=t.length&&i<=t.length*2?xe(r):i;if(a===t.length)return;let o=Se(r),s=a>t.length;n.issues.push({origin:o,...s?{code:`too_big`,maximum:t.length}:{code:`too_small`,minimum:t.length},inclusive:!0,exact:!0,input:n.value,inst:e,continue:!t.abort})}}),Gt=v(`$ZodCheckStringFormat`,(e,t)=>{var n,r;b.init(e,t),e._zod.onattach.push(e=>{let n=e._zod.bag;n.format=t.format,t.pattern&&(n.patterns??=new Set,n.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:`string`,code:`invalid_format`,format:t.format,input:n.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(r=e._zod).check??(r.check=()=>{})}),Kt=v(`$ZodCheckRegex`,(e,t)=>{Gt.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:`string`,code:`invalid_format`,format:`regex`,input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),qt=v(`$ZodCheckLowerCase`,(e,t)=>{t.pattern??=Pt,Gt.init(e,t)}),Jt=v(`$ZodCheckUpperCase`,(e,t)=>{t.pattern??=Ft,Gt.init(e,t)}),Yt=v(`$ZodCheckIncludes`,(e,t)=>{b.init(e,t);let n=ne(t.includes),r=new RegExp(typeof t.position==`number`?`^.{${t.position},}${n}`:n);t.pattern=r,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(r)}),e._zod.check=n=>{n.value.includes(t.includes,t.position)||n.issues.push({origin:`string`,code:`invalid_format`,format:`includes`,includes:t.includes,input:n.value,inst:e,continue:!t.abort})}}),Xt=v(`$ZodCheckStartsWith`,(e,t)=>{b.init(e,t);let n=RegExp(`^${ne(t.prefix)}.*`);t.pattern??=n,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(n)}),e._zod.check=n=>{n.value.startsWith(t.prefix)||n.issues.push({origin:`string`,code:`invalid_format`,format:`starts_with`,prefix:t.prefix,input:n.value,inst:e,continue:!t.abort})}}),Zt=v(`$ZodCheckEndsWith`,(e,t)=>{b.init(e,t);let n=RegExp(`.*${ne(t.suffix)}$`);t.pattern??=n,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(n)}),e._zod.check=n=>{n.value.endsWith(t.suffix)||n.issues.push({origin:`string`,code:`invalid_format`,format:`ends_with`,suffix:t.suffix,input:n.value,inst:e,continue:!t.abort})}}),Qt=v(`$ZodCheckOverwrite`,(e,t)=>{b.init(e,t),e._zod.check=e=>{e.value=t.tx(e.value)}});function $t(){let e=this._zod;return e.message??=JSON.stringify(e.def,r,2),e.message}function en(e){this._zod.message=e}const tn={get:$t,set:en,enumerable:!0,configurable:!0},nn={value:void 0,enumerable:!1},rn={value:void 0,enumerable:!1},an=new WeakSet([Object.prototype,Error.prototype]),on=(e,t)=>{e.name=`$ZodError`,nn.value=e._zod,Object.defineProperty(e,"_zod",nn),rn.value=t,Object.defineProperty(e,"issues",rn),nn.value=void 0,rn.value=void 0,Object.defineProperty(e,"message",tn);let n=Object.getPrototypeOf(e);an.has(n)||(an.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let e=()=>this.message;return Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0})}}))},sn=v(`$ZodError`,on),cn=v(`$ZodError`,on,void 0,{Parent:Error});function ln(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)||(t===`__proto__`?Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0}):e[t]=n()),e[t]}function un(e,t=e=>e.message){let n={},r=[];for(let i of e.issues)i.path.length>0?ln(n,i.path[0],()=>[]).push(t(i)):r.push(t(i));return{formErrors:r,fieldErrors:n}}function dn(e,t=e=>e.message){let n={_errors:[]},r=(e,i=[])=>{for(let a of e.issues)if(a.code===`invalid_union`&&a.errors.length)a.errors.map(e=>r({issues:e},[...i,...a.path]));else if(a.code===`invalid_key`)r({issues:a.issues},[...i,...a.path]);else if(a.code===`invalid_element`)r({issues:a.issues},[...i,...a.path]);else{let e=[...i,...a.path];if(e.length===0)n._errors.push(t(a));else{let r=n,i=0;for(;i<e.length;){let n=e[i],o=i===e.length-1;if(n===`_errors`){o&&r._errors.push(t(a)),i++;continue}Object.prototype.hasOwnProperty.call(r,n)||Object.defineProperty(r,n,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let s=r[n];o&&s._errors.push(t(a)),r=s,i++}}}};return r(e),n}function fn(e,t){return{callee:t?.callee??e,Err:t?.Err}}const pn=e=>{let t=(n,r,i,a)=>{let o=i?{...i,async:!1}:{async:!1},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise)throw new ze;if(s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>ye(e,o,Ve())));throw f(n,a?.callee??t),n}return s.value};return t},mn=e=>{let t=async(n,r,i,a)=>{let o=i?{...i,async:!0}:{async:!0},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise&&(s=await s),s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>ye(e,o,Ve())));throw f(n,a?.callee??t),n}return s.value};return t},hn=e=>(t,n,r)=>{let i=r?{...r,async:!1}:{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new ze;return a.issues.length?{success:!1,error:new(e??sn)(a.issues.map(e=>ye(e,i,Ve())))}:{success:!0,data:a.value}},gn=hn(cn),_n=e=>async(t,n,r)=>{let i=r?{...r,async:!0}:{async:!0},a=t._zod.run({value:n,issues:[]},i);return a instanceof Promise&&(a=await a),a.issues.length?{success:!1,error:new e(a.issues.map(e=>ye(e,i,Ve())))}:{success:!0,data:a.value}},vn=_n(cn),yn=e=>{let t=pn(e),n=(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return t(e,r,o,fn(n,a))};return n},bn=e=>{let t=pn(e),n=(e,r,i,a)=>t(e,r,i,fn(n,a));return n},xn=e=>{let t=mn(e),n=async(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return await t(e,r,o,fn(n,a))};return n},Sn=e=>{let t=mn(e),n=async(e,r,i,a)=>await t(e,r,i,fn(n,a));return n},Cn=e=>(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return hn(e)(t,n,i)},wn=e=>(t,n,r)=>hn(e)(t,n,r),Tn=e=>async(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return _n(e)(t,n,i)},En=e=>async(t,n,r)=>_n(e)(t,n,r),Dn={major:4,minor:5,patch:4},x=v(`$ZodType`,(e,t)=>{var n;e??={},e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=Dn;let r=e._zod.def.checks,i=e._zod.traits.has(`$ZodCheck`)?[e,...r??[]]:r?.length?[...r]:[];for(let t of i)for(let n of t._zod.onattach)n(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(t,n,r)=>{if(t.memo)return t;let i=me(t),a;for(let o of n){if(o._zod.def.when){if(he(t)||!o._zod.def.when(t))continue}else if(i)continue;let n=t.issues.length,s=o._zod.check(t);if(s instanceof Promise&&r?.async===!1)throw new ze;if(a||s instanceof Promise)a=(a??Promise.resolve()).then(async()=>{await s,t.issues.length!==n&&(ve(t.issues,n,e),i||=me(t,n))});else{if(t.issues.length===n)continue;ve(t.issues,n,e),i||=me(t,n)}}return a?a.then(()=>t):t},n=(n,r,a)=>{if(me(n))return n.aborted=!0,n;let o=t(r,i,a);if(o instanceof Promise){if(a.async===!1)throw new ze;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(r,a)=>{if(a.skipChecks)return e._zod.parse(r,a);if(a.direction===`backward`){let t=e._zod.parse({value:r.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>n(e,r,a)):n(t,r,a)}let o=e._zod.parse(r,a);if(o instanceof Promise){if(a.async===!1)throw new ze;return o.then(e=>t(e,i,a))}return t(o,i,a)}}},{get"~standard"(){return De(this,`~standard`,kn(this))},set"~standard"(e){Ee(this,`~standard`,e)}}),On=e=>e.success?{value:e.data}:{issues:e.error?.issues};function kn(e){return{validate:t=>{try{return On(gn(e,t))}catch{return vn(e,t).then(On)}},vendor:`zod`,version:1}}const An=v(`$ZodString`,(e,t)=>{x.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??kt(e._zod.bag),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value==`string`||n.issues.push({expected:`string`,code:`invalid_type`,input:n.value,inst:e}),n}}),S=v(`$ZodStringFormat`,(e,t)=>{Gt.init(e,t),An.init(e,t)}),jn=v(`$ZodGUID`,(e,t)=>{t.pattern??=ut,S.init(e,t)}),Mn=v(`$ZodUUID`,(e,t)=>{if(t.version){let e={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(e===void 0)throw Error(`Invalid UUID version: "${t.version}"`);t.pattern??=dt(e)}else t.pattern??=dt();S.init(e,t)}),Nn=v(`$ZodEmail`,(e,t)=>{t.pattern??=ft,S.init(e,t)});function Pn(e,t){if(!t.normalize&&t.protocol?.source===bt.source&&!/^https?:\/\//i.test(e))return 1;try{return new URL(e)}catch{return 2}}const Fn=/[\t\n\r]/g;function In(e){return e.replace(Fn,``)}function Ln(e,t){return t.lastIndex=0,t.test(e.hostname)}function Rn(e,t){return t.lastIndex=0,t.test(e.protocol.endsWith(`:`)?e.protocol.slice(0,-1):e.protocol)}const zn=v(`$ZodURL`,(e,t)=>{S.init(e,t),e._zod.check=n=>{try{let r=n.value.trim(),i=Pn(r,t);if(i===1){n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid URL format`,input:n.value,inst:e,continue:!t.abort});return}if(i===2){n.issues.push({code:`invalid_format`,format:`url`,input:n.value,inst:e,continue:!t.abort});return}t.hostname&&!Ln(i,t.hostname)&&n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid hostname`,pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort}),t.protocol&&!Rn(i,t.protocol)&&n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid protocol`,pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort}),n.value=t.normalize?i.href:In(r);return}catch{n.issues.push({code:`invalid_format`,format:`url`,input:n.value,inst:e,continue:!t.abort})}}}),Bn=v(`$ZodEmoji`,(e,t)=>{t.pattern??=pt(),S.init(e,t)}),Vn=v(`$ZodNanoID`,(e,t)=>{if(t.length!==void 0&&(!Number.isInteger(t.length)||t.length<1))throw Error(`Invalid nanoid length: ${t.length}`);t.pattern??=t.length===void 0?st:ct(t.length),S.init(e,t)}),Hn=v(`$ZodCUID`,(e,t)=>{t.pattern??=nt,S.init(e,t)}),Un=v(`$ZodCUID2`,(e,t)=>{t.pattern??=rt,S.init(e,t)}),Wn=v(`$ZodULID`,(e,t)=>{t.pattern??=it,S.init(e,t)}),Gn=v(`$ZodXID`,(e,t)=>{t.pattern??=at,S.init(e,t)}),Kn=v(`$ZodKSUID`,(e,t)=>{t.pattern??=ot,S.init(e,t)}),qn=v(`$ZodISODateTime`,(e,t)=>{t.pattern??=Ot(t),S.init(e,t),(t.local||t.precision===-1)&&(e._zod.bag.laxFormat=!0,e._zod.onattach.push(e=>{e._zod.bag.laxFormat=!0}))}),Jn=v(`$ZodISODate`,(e,t)=>{t.pattern??=Tt,S.init(e,t)}),Yn=v(`$ZodISOTime`,(e,t)=>{t.pattern??=Dt(t),S.init(e,t)}),Xn=v(`$ZodISODuration`,(e,t)=>{t.pattern??=lt,S.init(e,t)}),Zn=v(`$ZodIPv4`,(e,t)=>{t.pattern??=mt,S.init(e,t),e._zod.bag.format=`ipv4`}),Qn=/^[0-9a-fA-F:.]+$/;function $n(e){if(!Qn.test(e))return!1;try{return new URL(`http://[${e}]`),!0}catch{return!1}}const er=v(`$ZodIPv6`,(e,t)=>{t.pattern??=ht,S.init(e,t),e._zod.bag.format=`ipv6`,e._zod.check=n=>{$n(n.value)||n.issues.push({code:`invalid_format`,format:`ipv6`,input:n.value,inst:e,continue:!t.abort})}}),tr=v(`$ZodCIDRv4`,(e,t)=>{t.pattern??=gt,S.init(e,t)});function nr(e){let t=e.split(`/`);if(t.length!==2)return!1;let[n,r]=t;if(!r)return!1;let i=Number(r);return`${i}`!==r||i<0||i>128?!1:$n(n)}const rr=v(`$ZodCIDRv6`,(e,t)=>{t.pattern??=_t,S.init(e,t),e._zod.check=n=>{nr(n.value)||n.issues.push({code:`invalid_format`,format:`cidrv6`,input:n.value,inst:e,continue:!t.abort})}});function ir(e){if(e===``)return!0;if(/\s/.test(e)||e.length%4!=0)return!1;try{return atob(e),!0}catch{return!1}}const ar=v(`$ZodBase64`,(e,t)=>{t.pattern??=vt,S.init(e,t),e._zod.bag.contentEncoding=`base64`,e._zod.check=n=>{ir(n.value)||n.issues.push({code:`invalid_format`,format:`base64`,input:n.value,inst:e,continue:!t.abort})}});function or(e){if(!yt.test(e))return!1;let t=e.replace(/[-_]/g,e=>e===`-`?`+`:`/`);return ir(t.padEnd(Math.ceil(t.length/4)*4,`=`))}const sr=v(`$ZodBase64URL`,(e,t)=>{t.pattern??=yt,S.init(e,t),e._zod.bag.contentEncoding=`base64url`,e._zod.check=n=>{or(n.value)||n.issues.push({code:`invalid_format`,format:`base64url`,input:n.value,inst:e,continue:!t.abort})}}),cr=v(`$ZodE164`,(e,t)=>{t.pattern??=xt,S.init(e,t)}),lr=/[- ]/g;function ur(e){let t=e.length,n=1,r=0;for(;t;){let i=+e[--t];n^=1,r+=n?[0,2,4,6,8,1,3,5,7,9][i]:i}return r%10==0}function dr(e){return St.test(e)?ur(e.replace(lr,``)):!1}function fr(e,t=null){try{let n=e.split(`.`);if(n.length!==3)return!1;let[r]=n;if(!r)return!1;let i=JSON.parse(atob(r));return!(`typ`in i&&i?.typ!==`JWT`||!i.alg||t&&(!(`alg`in i)||i.alg!==t))}catch{return!1}}const pr=v(`$ZodJWT`,(e,t)=>{S.init(e,t),e._zod.check=n=>{fr(n.value,t.alg)||n.issues.push({code:`invalid_format`,format:`jwt`,input:n.value,inst:e,continue:!t.abort})}}),mr=v(`$ZodNumber`,(e,t)=>{x.init(e,t),e._zod.pattern=e._zod.bag.pattern??jt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}let i=n.value;if(typeof i==`number`&&!Number.isNaN(i)&&Number.isFinite(i))return n;let a=typeof i==`number`?Number.isNaN(i)?`NaN`:Number.isFinite(i)?void 0:String(i):void 0;return n.issues.push({expected:`number`,code:`invalid_type`,input:i,inst:e,...a?{received:a}:{}}),n}}),hr=v(`$ZodNumberFormat`,(e,t)=>{Vt.init(e,t),mr.init(e,t)}),gr=v(`$ZodBoolean`,(e,t)=>{x.init(e,t),e._zod.pattern=Mt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=!!n.value}catch{}let i=n.value;return typeof i==`boolean`||n.issues.push({expected:`boolean`,code:`invalid_type`,input:i,inst:e}),n}}),_r=v(`$ZodNull`,(e,t)=>{x.init(e,t),e._zod.pattern=Nt,e._zod.values=new Set([null]),e._zod.parse=(t,n)=>{let r=t.value;return r===null||t.issues.push({expected:`null`,code:`invalid_type`,input:r,inst:e}),t}}),vr=v(`$ZodUnknown`,(e,t)=>{x.init(e,t),e._zod.parse=e=>e}),yr=v(`$ZodNever`,(e,t)=>{x.init(e,t),e._zod.parse=(t,n)=>(t.issues.push({expected:`never`,code:`invalid_type`,input:t.value,inst:e}),t)});function br(e,t,n){e.issues.length&&t.issues.push(...ge(n,e.issues)),t.value[n]=e.value}const xr=v(`$ZodArray`,(e,t)=>{x.init(e,t);let n=y.memoizer;n?.attach(e),e._zod.parse=(r,i)=>{let a=r.value;if(!Array.isArray(a))return r.issues.push({expected:`array`,code:`invalid_type`,input:a,inst:e}),r;r.value=n?n.alloc(e,r,Array(a.length),i):Array(a.length);let o=[];for(let e=0;e<a.length;e++){let n=a[e],s=t.element._zod.run({value:n,issues:[]},i);s instanceof Promise?o.push(s.then(t=>br(t,r,e))):br(s,r,e)}return o.length?Promise.all(o).then(()=>r):r}});function Sr(e,t,n,r,i,a){let o=n in r,s=a===`optional`;if(!(!o&&s&&i===`optional`)){if(e.issues.length){if(i!==void 0&&s&&!o)return;t.issues.push(...ge(n,e.issues))}if(!o&&i===void 0){e.issues.length||t.issues.push({code:`invalid_type`,expected:`nonoptional`,input:void 0,path:[n]});return}e.value===void 0?o&&(t.value[n]=void 0):t.value[n]=e.value}}const Cr=[];function wr(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:Cr,i=r.length?[...t,...r]:t;for(let t of i)if(!e.shape?.[t]?._zod?.traits?.has(`$ZodType`))throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);let a=ae(e.shape);return{...e,allKeys:i,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(a)}}function Tr(e,t,n,r,i,a){let o=[],s=i.keySet,c=i.catchall._zod,l=c.def.type,u=c.optin,d=c.optout;for(let i in t){if(s.has(i))continue;if(i===`__proto__`){l===`never`&&o.push(i);continue}if(l===`never`){o.push(i);continue}let a=c.run({value:t[i],issues:[]},r);a instanceof Promise?e.push(a.then(e=>Sr(e,n,i,t,u,d))):Sr(a,n,i,t,u,d)}return o.length&&n.issues.push({code:`unrecognized_keys`,keys:o,input:t,inst:a,continue:!0}),e.length?Promise.all(e).then(()=>n):n}const Er=new WeakMap,Dr=v(`$ZodObject`,(e,t)=>{if(x.init(e,t),!Object.getOwnPropertyDescriptor(t,`shape`)?.get){let e=t.shape;Er.set(t,e),Object.defineProperty(t,"shape",{get:()=>{let n={...e};return Object.defineProperty(t,"shape",{value:n}),Er.set(t,n),n}})}let n=i(()=>wr(t));_(e,`propValues`,e=>{let t=e.def.shape,n={};for(let e in t){let r=t[e]._zod;if(r.values){Object.prototype.hasOwnProperty.call(n,e)||c(n,e,new Set);for(let t of r.values)n[e].add(t);r.optin!==void 0&&n[e].add(void 0)}}return n});let r=p,a=t.catchall,o,s=y.memoizer;s?.attach(e),e._zod.parse=(t,i)=>{o??=n.value;let c=t.value;if(!r(c))return t.issues.push({expected:`object`,code:`invalid_type`,input:c,inst:e}),t;t.value=s?s.alloc(e,t,{},i):{};let l=[],u=o.shape;for(let e of o.allKeys){if(e===`__proto__`)continue;let n=u[e],r=n._zod.optin,a=n._zod.optout,o=n._zod.run({value:c[e],issues:[]},i);o instanceof Promise?l.push(o.then(n=>Sr(n,t,e,c,r,a))):Sr(o,t,e,c,r,a)}return a?Tr(l,c,t,i,n.value,e):l.length?Promise.all(l).then(()=>t):t}}),Or=v(`$ZodObjectJIT`,(e,t)=>{Dr.init(e,t);let n=e._zod.parse,r=i(()=>wr(t)),a=y.memoizer,o=t=>{let n=r.value,i=n.symbolKeys,o=new He([`payload`,`ctx`],{shape:t,inst:e,memo:a,syms:i}),s=e=>`shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`,c=(e,t)=>`
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
          }`;o.write(`const input = payload.value;`);let l=Object.create(null),d=0;for(let e of n.allKeys)l[e]=`key_${d++}`;o.write(a?`const newResult = memo.alloc(inst, payload, {}, ctx);`:`const newResult = {};`);for(let e of n.allKeys){if(e===`__proto__`)continue;let n=l[e],r=typeof e==`symbol`?`syms[${i.indexOf(e)}]`:u(e),a=`${r} in input`,d=t[e],f=d?._zod?.optin,p=f!==void 0,m=d?._zod?.optout===`optional`;if(o.write(`const ${n} = ${s(r)};`),p&&m){let e=f===`optional`?`${n}_present`:`${n}.value !== undefined || ${n}_present`;o.write(`
        const ${n}_present = ${a};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n,r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `)}else p?o.write(`
        if (${n}.issues.length) {${c(n,r)}
        }
        
        if (${n}.value === undefined) {
          if (${a}) {
            newResult[${r}] = undefined;
          }
        } else {
          newResult[${r}] = ${n}.value;
        }

      `):o.write(`
        const ${n}_present = ${a};
        if (${n}.issues.length) {${c(n,r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `)}return o.write(`payload.value = newResult;`),o.write(`return payload;`),o.compile()},s,c=p,l=!y.jitless,d=l&&m.value,f=t.catchall,h;e._zod.parse=(i,a)=>{h??=r.value;let u=i.value;return c(u)?l&&d&&a?.async===!1&&a.jitless!==!0?(s||=o(t.shape),i=s(i,a),f?Tr([],u,i,a,h,e):i):n(i,a):(i.issues.push({expected:`object`,code:`invalid_type`,input:u,inst:e}),i)}});function kr(e,t,n,r){for(let n of e)if(n.issues.length===0)return t.value=n.value,t;let i=e.filter(e=>!me(e));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:`invalid_union`,input:t.value,inst:n,errors:e.map(e=>e.issues.map(e=>ye(e,r,Ve())))}),t)}const Ar=v(`$ZodUnion`,(e,t)=>{x.init(e,t),_(e,`optin`,e=>e.def.options.some(e=>e._zod.optin===`defaulted`)?`defaulted`:e.def.options.some(e=>e._zod.optin!==void 0)?`optional`:void 0),_(e,`optout`,e=>e.def.options.some(e=>e._zod.optout===`optional`)?`optional`:void 0),_(e,`values`,e=>{if(e.def.options.every(e=>e._zod.values))return new Set(e.def.options.flatMap(e=>Array.from(e._zod.values)))}),_(e,`pattern`,e=>{if(e.def.options.every(e=>e._zod.pattern)){let t=e.def.options.map(e=>e._zod.pattern);return RegExp(`^(${t.map(e=>o(e.source)).join(`|`)})$`)}});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,i)=>{if(n)return n(r,i);let a=!1,o=[];for(let e of t.options){let t=e._zod.run({value:r.value,issues:[]},i);if(t instanceof Promise)o.push(t),a=!0;else{if(t.issues.length===0)return t;o.push(t)}}return a?Promise.all(o).then(t=>kr(t,r,e,i)):kr(o,r,e,i)}}),jr=v(`$ZodDiscriminatedUnion`,(e,t)=>{t.inclusive=!1,Ar.init(e,t);let n=e._zod.parse;_(e,`propValues`,e=>{let t={};for(let n of e.def.options){let r=n._zod.propValues;if(!r||Object.keys(r).length===0)throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(n)}"`);for(let[e,n]of Object.entries(r)){Object.prototype.hasOwnProperty.call(t,e)||c(t,e,new Set);for(let r of n)t[e].add(r)}}return t}),t.options.forEach((e,n)=>{let r=Er.get(e._zod.def);if(r&&!Object.prototype.hasOwnProperty.call(r,t.discriminator))throw Error(`Invalid discriminated union option at index "${n}"`)});let r=i(()=>{let e=t.options,n=new Map;for(let r of e){let e=r._zod.propValues?.[t.discriminator];if(!e||e.size===0)throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);for(let t of e){if(n.has(t))throw Error(`Duplicate discriminator value "${String(t)}"`);n.set(t,r)}}return n});e._zod.parse=(i,a)=>{let o=i.value;if(!p(o))return i.issues.push({code:`invalid_type`,expected:`object`,input:o,inst:e}),i;let s=r.value.get(o?.[t.discriminator]);return s?s._zod.run(i,a):t.unionFallback||a.direction===`backward`?n(i,a):(i.issues.push({code:`invalid_union`,errors:[],note:`No matching discriminator`,discriminator:t.discriminator,options:Array.from(r.value.keys()),input:o,path:[t.discriminator],inst:e}),i)}}),Mr=v(`$ZodIntersection`,(e,t)=>{x.init(e,t),e._zod.parse=(e,n)=>{let r=e.value,i=t.left._zod.run({value:r,issues:[]},n),a=t.right._zod.run({value:r,issues:[]},n);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,n])=>Pr(e,t,n)):Pr(e,i,a)}});function Nr(e,t){if(e===t||e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(h(e)&&h(t)){let n=Object.keys(t),r=Object.keys(e).filter(e=>n.indexOf(e)!==-1),i={...e,...t};Object.prototype.hasOwnProperty.call(i,`__proto__`)&&delete i.__proto__;for(let n of r){if(n===`__proto__`)continue;let r=Nr(e[n],t[n]);if(!r.valid)return{valid:!1,mergeErrorPath:[n,...r.mergeErrorPath]};i[n]=r.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=t[r],o=Nr(i,a);if(!o.valid)return{valid:!1,mergeErrorPath:[r,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Pr(e,t,n){let r=new Map,i,a=new Map,o=(e,t)=>{let n;if(e.code===`unrecognized_keys`&&!e.path?.length)i??=e,n=e.keys;else if(e.code===`invalid_key`&&e.origin===`record`&&e.path?.length===1){let t=String(e.path[0]);a.has(t)||a.set(t,e),n=[t]}else return!1;for(let e of n)r.has(e)||r.set(e,{}),r.get(e)[t]=!0;return!0};for(let n of t.issues)o(n,`l`)||e.issues.push(n);for(let t of n.issues)o(t,`r`)||e.issues.push(t);let s=[...r].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(s.length){let t=i?s.filter(e=>i.keys.includes(e)):[];t.length&&e.issues.push({...i,keys:t});for(let n of s)!t.includes(n)&&a.has(n)&&e.issues.push(a.get(n))}let c=Nr(t.value,n.value);if(!c.valid){if(me(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}const Fr=v(`$ZodTuple`,(e,t)=>{x.init(e,t);let n=t.items,r=y.memoizer;r?.attach(e),e._zod.parse=(i,a)=>{let o=i.value;if(!Array.isArray(o))return i.issues.push({input:o,inst:e,expected:`tuple`,code:`invalid_type`}),i;i.value=r?r.alloc(e,i,[],a):[];let s=[],c=Ir(n,`optin`),l=Ir(n,`optout`);if(!t.rest){if(o.length<c)return i.issues.push({code:`too_small`,minimum:c,inclusive:!0,input:o,inst:e,origin:`array`}),i;o.length>n.length&&i.issues.push({code:`too_big`,maximum:n.length,inclusive:!0,input:o,inst:e,origin:`array`})}let u=Array(n.length);for(let e=0;e<n.length;e++){let t=n[e]._zod.run({value:o[e],issues:[]},a);t instanceof Promise?s.push(t.then(t=>{u[e]=t})):u[e]=t}if(t.rest){let e=n.length-1,r=o.slice(n.length);for(let n of r){e++;let r=t.rest._zod.run({value:n,issues:[]},a);r instanceof Promise?s.push(r.then(t=>Lr(t,i,e))):Lr(r,i,e)}}return s.length?Promise.all(s).then(()=>Rr(u,i,n,o,l)):Rr(u,i,n,o,l)}});function Ir(e,t){for(let n=e.length-1;n>=0;n--)if(!(t===`optin`?e[n]._zod.optin!==void 0:e[n]._zod.optout===`optional`))return n+1;return 0}function Lr(e,t,n){e.issues.length&&t.issues.push(...ge(n,e.issues)),t.value[n]=e.value}function Rr(e,t,n,r,i){for(let a=0;a<n.length;a++){let o=e[a],s=a<r.length;if(!s&&a>=i&&n[a]._zod.optin===`optional`){t.value.length=a;break}if(o.issues.length){if(!s&&a>=i){t.value.length=a;break}t.issues.push(...ge(a,o.issues))}t.value[a]=o.value}for(let e=t.value.length-1;e>=r.length&&n[e]._zod.optout===`optional`&&t.value[e]===void 0;e--)t.value.length=e;return t}const zr=v(`$ZodRecord`,(e,t)=>{x.init(e,t);let n=y.memoizer;n?.attach(e),e._zod.parse=(r,i)=>{let a=r.value;if(!h(a))return r.issues.push({expected:`record`,code:`invalid_type`,input:a,inst:e}),r;let o=[],s=t.keyType._zod.values;if(s&&!t.partial){r.value=n?n.alloc(e,r,{},i):{};let c=new Set;for(let n of s)if(typeof n==`string`||typeof n==`number`||typeof n==`symbol`){if(c.add(typeof n==`number`?n.toString():n),n===`__proto__`)continue;let s=t.keyType._zod.run({value:n,issues:[]},i);if(s instanceof Promise)throw Error(`Async schemas not supported in object keys currently`);if(s.issues.length){r.issues.push({code:`invalid_key`,origin:`record`,issues:s.issues.map(e=>ye(e,i,Ve())),input:n,path:[n],inst:e});continue}let l=s.value;if(l===`__proto__`)continue;let u=t.valueType._zod.run({value:a[n],issues:[]},i);u instanceof Promise?o.push(u.then(e=>{e.issues.length&&r.issues.push(...ge(n,e.issues)),r.value[l]=e.value})):(u.issues.length&&r.issues.push(...ge(n,u.issues)),r.value[l]=u.value)}let l;for(let e in a)if(!c.has(e)){if(t.mode===`loose`){if(e===`__proto__`)continue;r.value[e]=a[e]}else l??=[],l.push(e)}l&&l.length>0&&r.issues.push({code:`unrecognized_keys`,input:a,inst:e,keys:l,continue:!0})}else{r.value=n?n.alloc(e,r,{},i):{};let c;for(let n of Reflect.ownKeys(a)){if(n===`__proto__`||!Object.prototype.propertyIsEnumerable.call(a,n))continue;let l=t.keyType._zod.run({value:n,issues:[]},i);if(l instanceof Promise)throw Error(`Async schemas not supported in object keys currently`);if(typeof n==`string`&&jt.test(n)&&l.issues.length){let e=t.keyType._zod.run({value:Number(n),issues:[]},i);if(e instanceof Promise)throw Error(`Async schemas not supported in object keys currently`);e.issues.length===0&&(l=e)}if(l.issues.length){t.mode===`loose`?r.value[n]=a[n]:s?(c??=[],c.push(n)):r.issues.push({code:`invalid_key`,origin:`record`,issues:l.issues.map(e=>ye(e,i,Ve())),input:n,path:[n],inst:e});continue}let u=l.value;if(u===`__proto__`)continue;let d=t.valueType._zod.run({value:a[n],issues:[]},i);d instanceof Promise?o.push(d.then(e=>{e.issues.length&&r.issues.push(...ge(n,e.issues)),r.value[u]=e.value})):(d.issues.length&&r.issues.push(...ge(n,d.issues)),r.value[u]=d.value)}c&&c.length>0&&r.issues.push({code:`unrecognized_keys`,input:a,inst:e,keys:c,continue:!0})}return o.length?Promise.all(o).then(()=>r):r}}),Br=v(`$ZodEnum`,(e,n)=>{x.init(e,n);let r=t(n.entries),i=new Set(r);e._zod.values=i;let a=r.filter(e=>te.has(typeof e));e._zod.pattern=RegExp(a.length?`^(${a.map(e=>ne(e.toString())).join(`|`)})$`:`^[^\\s\\S]$`),e._zod.parse=(t,n)=>{let a=t.value;return i.has(a)||t.issues.push({code:`invalid_value`,values:r,input:a,inst:e}),t}}),Vr=v(`$ZodLiteral`,(e,t)=>{x.init(e,t);let n=new Set(t.values);e._zod.values=n,e._zod.pattern=RegExp(t.values.length?`^(${t.values.map(e=>typeof e==`string`?ne(e):e?ne(e.toString()):String(e)).join(`|`)})$`:`^[^\\s\\S]$`),e._zod.parse=(r,i)=>{let a=r.value;return n.has(a)||r.issues.push({code:`invalid_value`,values:t.values,input:a,inst:e}),r}}),Hr=v(`$ZodTransform`,(e,t)=>{x.init(e,t),e._zod.optin=`optional`,y.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new Be(e.constructor.name);let i=t.transform(n.value,n);if(r.async)return(i instanceof Promise?i:Promise.resolve(i)).then(e=>(n.value=e,n));if(i instanceof Promise)throw new ze;return n.value=i,n}});function Ur(e,t){return e.value=t.issues.length?void 0:t.value,e}const Wr=v(`$ZodOptional`,(e,t)=>{x.init(e,t),_(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),e._zod.optout=`optional`,_(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t,void 0]):void 0}),_(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${o(t.source)})?$`):void 0}),e._zod.parse=(e,n)=>{if(e.value===void 0){if(t.innerType._zod.optin!==`defaulted`)return e;let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(t=>Ur(e,t)):Ur(e,r)}return t.innerType._zod.run(e,n)}}),Gr=v(`$ZodExactOptional`,(e,t)=>{Wr.init(e,t),_(e,`values`,e=>e.def.innerType._zod.values),_(e,`pattern`,e=>e.def.innerType._zod.pattern),e._zod.parse=(e,n)=>t.innerType._zod.run(e,n)}),Kr=v(`$ZodNullable`,(e,t)=>{x.init(e,t),_(e,`optin`,e=>e.def.innerType._zod.optin),_(e,`optout`,e=>e.def.innerType._zod.optout),_(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${o(t.source)}|null)$`):void 0}),_(e,`values`,e=>e.def.innerType._zod.values?new Set([...e.def.innerType._zod.values,null]):void 0),e._zod.parse=(e,n)=>e.value===null?e:t.innerType._zod.run(e,n)}),qr=v(`$ZodDefault`,(e,t)=>{x.init(e,t),e._zod.optin=`defaulted`,_(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);if(e.value===void 0)return e.value=t.defaultValue,e;let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(e=>Jr(e,t)):Jr(r,t)}});function Jr(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const Yr=v(`$ZodPrefault`,(e,t)=>{x.init(e,t),e._zod.optin=`defaulted`,_(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>(n.direction===`backward`||e.value===void 0&&(e.value=t.defaultValue),t.innerType._zod.run(e,n))}),Xr=v(`$ZodNonOptional`,(e,t)=>{x.init(e,t),_(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t].filter(e=>e!==void 0)):void 0}),e._zod.parse=(n,r)=>{let i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(t=>Zr(t,e)):Zr(i,e)}});function Zr(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:`invalid_type`,expected:`nonoptional`,input:e.value,inst:t}),e}function Qr(e,t,n,r){return t.issues.length?(e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map(e=>ye(e,r,Ve()))},input:e.value}),e):(e.value=t.value,t.memo&&(e.memo=!0),e)}const $r=v(`$ZodCatch`,(e,t)=>{x.init(e,t),_(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),_(e,`optout`,e=>e.def.innerType._zod.optout),_(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(r=>Qr(e,r,t,n)):Qr(e,r,t,n)}}),ei=v(`$ZodPipe`,(e,t)=>{x.init(e,t),_(e,`values`,e=>e.def.in._zod.values),_(e,`optin`,e=>e.def.in._zod.optin),_(e,`optout`,e=>e.def.out._zod.optout),_(e,`propValues`,e=>e.def.in._zod.propValues),e._zod.parse=(e,n)=>{if(n.direction===`backward`){let r=t.out._zod.run(e,n);return r instanceof Promise?r.then(e=>ti(e,t.in,n)):ti(r,t.in,n)}let r=t.in._zod.run(e,n);return r instanceof Promise?r.then(e=>ti(e,t.out,n)):ti(r,t.out,n)}});function ti(e,t,n){return e.issues.some(e=>e.code!==`unrecognized_keys`)?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}const ni=v(`$ZodPreprocess`,(e,t)=>{ei.init(e,t)}),ri=v(`$ZodReadonly`,(e,t)=>{x.init(e,t),_(e,`propValues`,e=>e.def.innerType._zod.propValues),_(e,`values`,e=>e.def.innerType._zod.values),_(e,`optin`,e=>e.def.innerType?._zod?.optin),_(e,`optout`,e=>e.def.innerType?._zod?.optout),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(ii):ii(r)}});function ii(e){return e.memo||(e.value=Object.freeze(e.value)),e}const ai=v(`$ZodCustom`,(e,t)=>{b.init(e,t),x.init(e,t),e._zod.parse=(e,t)=>e,e._zod.check=n=>{let r=n.value,i=t.fn(r);if(i instanceof Promise)return i.then(t=>oi(t,n,r,e));oi(i,n,r,e)}});function oi(e,t,n,r){if(!e){let e={code:`custom`,input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(e.params=r._zod.def.params),t.issues.push(we(e))}}const si=Symbol.for(`zod.compile.invalid`),ci=Symbol.for(`zod.compile.fallback`);var li=class extends Error{constructor(e=`z.compile does not support async refinements, transforms, or checks`){super(e),this.name=`ZodCompileAsyncError`}},C=class extends Error{constructor(e,t=!0){super(`z.compile does not support ${e}; this schema must use the runtime parser`),this.name=`ZodCompileUnsupportedError`,this.islandable=t}};function ui(e,t){try{return pi(e,{assertOnly:!0})}catch{return t}}function di(e,t){try{let t=pi(e),n=re(e),r=e._zod.run,i=r.__originalRun??r,a=(e,n)=>{if(n?.async||n?.direction===`backward`||n?.skipChecks||n?.[ci]||n&&tt(n,e.value))return i(e,n);let r=t(e.value);return r===si?(n&&(n[ci]=!0),i(e,n)):(e.value=r,e)};return a.__originalRun=i,n._zod.bag.fallbackRun=i,n._zod.bag.validator=ui(e,t),n._zod.run=a,r.__originalRun||fi(n,e,t),n}catch(n){if(t?.strict)throw n;return e}}function fi(e,t,n){let r=e,i=t;if(typeof i.safeParse==`function`){let e=i.safeParse;r.safeParse=(t,r)=>{let i=n(t);return i===si?e(t,r):{success:!0,data:i}}}if(typeof i.parse==`function`){let e=i.parse;r.parse=(t,r)=>{let i=n(t);return i===si?e(t,r):i}}}function pi(e,t){let n=!0;try{n=Ye(e)}catch{}if(n)throw new C(`a schema whose subtree contains a reference cycle`);let r={constants:new Map,constantCounter:0,varCounter:0},i=new He([`input`]),a=D(i,r,e,`input`,!t?.assertOnly);i.write(a===null?`return true;`:`return ${a};`);let o=[`INVALID`,...r.constants.keys()],s=[si,...r.constants.values()],c=i.content.join(`
`),l=t?.debug?o.length>0?`// Constants: ${o.join(`, `)}\n${c}`:c:``,u=Function,d=`return (input) => {\n${c}\n}`,f;try{f=new u(...o,d)(...s)}catch(e){throw new C(`this schema (generated code failed to evaluate: ${e.message})`)}return t?.debug&&(f.code=l),f}function w(e,t){for(let[n,r]of e.constants)if(r===t)return n;let n=`c${e.constantCounter++}`;return e.constants.set(n,t),n}function T(e){return`v${e.varCounter++}`}function mi(e,t){let n=e._zod.run({value:t,issues:[]},{});if(n&&typeof n.then==`function`)return si;let r=n;return r.issues.length===0?r.value:si}function E(e,t,n,r,i=!0){let a=e.content.length,o=t.constants.size,s=t.constantCounter,c=t.varCounter;try{return D(e,t,n,r,i)}catch(i){if(!(i instanceof C)||!i.islandable)throw i;if(e.content.length=a,t.constants.size>o){let e=Array.from(t.constants.keys()).slice(o);for(let n of e)t.constants.delete(n)}return t.constantCounter=s,t.varCounter=c,hi(e,t,n,r)}}function hi(e,t,n,r){let i=w(t,n),a=w(t,mi),o=T(t);return e.write(`const ${o} = ${a}(${i}, ${r});`),e.write(`if (${o} === INVALID) return INVALID;`),o}const gi=new Set([`max_size`,`min_size`,`size_equals`,`max_length`,`min_length`,`length_equals`]);function _i(e,t,n,r){let i=n._zod.def.checks;if(!i||i.length===0)return r;let a=r;for(let n of i){let r=n._zod.def;if(r.when&&!gi.has(r.check))throw new C(`check with a custom "when" condition`);switch(r.check){case`greater_than`:xi(e,t,r,a);break;case`less_than`:Si(e,t,r,a);break;case`multiple_of`:Ci(e,t,r,a);break;case`number_format`:wi(e,r,a);break;case`min_length`:{let n=yi(r.minimum,`min_length`),i=vi(e,t,a,`${a}.length >= ${n} && ${a}.length < ${r.minimum*2}`);e.write(`if (${i} < ${n}) return INVALID;`);break}case`max_length`:{let n=yi(r.maximum,`max_length`),i=vi(e,t,a,`${a}.length > ${n}`);e.write(`if (${i} > ${n}) return INVALID;`);break}case`length_equals`:{let n=yi(r.length,`length_equals`),i=vi(e,t,a,`${a}.length >= ${n} && ${a}.length <= ${r.length*2}`);e.write(`if (${i} !== ${n}) return INVALID;`);break}case`min_size`:e.write(`if (${a}.size < ${yi(r.minimum,`min_size`)}) return INVALID;`);break;case`max_size`:e.write(`if (${a}.size > ${yi(r.maximum,`max_size`)}) return INVALID;`);break;case`size_equals`:e.write(`if (${a}.size !== ${yi(r.size,`size_equals`)}) return INVALID;`);break;case`string_format`:a=Ni(e,t,r,a);break;case`custom`:a=ji(e,t,n,a);break;case`bigint_format`:Ti(e,r,a);break;case`mime_type`:Ei(e,t,r,a);break;case`property`:Di(e,t,r,a);break;case`overwrite`:{let r=T(t);Oi(e,t,n,a,r),a=r;break}default:throw new C(`check type ${r.check}`)}}return a}function vi(e,t,n,r){let i=w(t,xe),a=T(t);return e.write(`const ${a} = typeof ${n} === "string" && ${r} ? ${i}(${n}) : ${n}.length;`),a}function yi(e,t){if(typeof e!=`number`||!Number.isFinite(e))throw new C(`${t} bound of type ${typeof e}`);return`${e}`}function bi(e,t){if(typeof t==`bigint`)return`${t}n`;if(typeof t==`number`){if(Number.isNaN(t))throw new C(`comparison check with NaN bound`);return`${t}`}if(t instanceof Date){if(Number.isNaN(t.getTime()))throw new C(`comparison check with Invalid Date bound`);return w(e,t)}throw new C(`comparison check bound of type ${typeof t}`)}function xi(e,t,n,r){let i=n.inclusive?`<`:`<=`;e.write(`if (${r} ${i} ${bi(t,n.value)}) return INVALID;`)}function Si(e,t,n,r){let i=n.inclusive?`>`:`>=`;e.write(`if (${r} ${i} ${bi(t,n.value)}) return INVALID;`)}function Ci(e,t,n,r){if(typeof n.value==`bigint`){if(n.value===BigInt(0))throw new C(`multiple_of check with a zero divisor`);e.write(`if (${r} % ${n.value}n !== 0n) return INVALID;`)}else{let i=w(t,s);e.write(`if (${i}(${r}, ${yi(n.value,`multiple_of`)}) !== 0) return INVALID;`)}}function wi(e,t,n){let r=t.format;switch(r){case`safeint`:e.write(`if (!Number.isSafeInteger(${n})) return INVALID;`);break;case`int32`:e.write(`if (!Number.isInteger(${n}) || ${n} < -2147483648 || ${n} > 2147483647) return INVALID;`);break;case`uint32`:e.write(`if (!Number.isInteger(${n}) || ${n} < 0 || ${n} > 4294967295) return INVALID;`);break;case`float32`:e.write(`if (!Number.isFinite(${n}) || ${n} < -3.4028234663852886e38 || ${n} > 3.4028234663852886e38) return INVALID;`);break;case`float64`:e.write(`if (!Number.isFinite(${n})) return INVALID;`);break;default:throw new C(`number format ${r}`)}}function Ti(e,t,n){let r=t.format;if(r)switch(r){case`int64`:e.write(`if (${n} < -9223372036854775808n || ${n} > 9223372036854775807n) return INVALID;`);break;case`uint64`:e.write(`if (${n} < 0n || ${n} > 18446744073709551615n) return INVALID;`);break;default:throw new C(`bigint format ${r}`)}}function Ei(e,t,n,r){let i=n.mime;if(i&&i.length>0){let n=w(t,new Set(i));e.write(`if (!${n}.has(${r}.type)) return INVALID;`)}}function Di(e,t,n,r){let i=`${r}[${JSON.stringify(n.property)}]`;D(e,t,n.schema,i)}function Oi(e,t,n,r,i){let a=n._zod.def.tx;if(!a)throw new C(`overwrite check without a transform function`);if(va(a))throw new li(`z.compile: async overwrite transforms are not supported`);let o=w(t,a);e.write(`const ${i} = ${o}(${r});`)}function ki(){throw new ze}function Ai(e){this.issues.push(e)}function ji(e,t,n,r){let i=n._zod.def;if(i.fn){if(va(i.fn))throw new li(`z.compile: async .refine() predicates are not supported`);let n=w(t,i.fn),a=w(t,ki),o=T(t);return e.write(`const ${o} = ${n}(${r});`),e.write(`if (${o} instanceof Promise) ${a}();`),e.write(`if (!${o}) return INVALID;`),r}if(n._zod.check){if(va(n._zod.check))throw new li(`z.compile: async .superRefine() / check functions are not supported`);let i=n._zod.check,a=w(t,e=>{let t={value:e,issues:[],addIssue:Ai};return i(t)instanceof Promise&&ki(),t.issues.length===0?t.value:si}),o=T(t);return e.write(`const ${o} = ${a}(${r});`),e.write(`if (${o} === INVALID) return INVALID;`),o}throw new C(`custom check without a predicate or check function`)}const Mi=new Set([`cidrv4`,`cuid`,`cuid2`,`date`,`datetime`,`duration`,`e164`,`email`,`emoji`,`ends_with`,`guid`,`includes`,`ipv4`,`ksuid`,`lowercase`,`mac`,`nanoid`,`regex`,`starts_with`,`time`,`ulid`,`uppercase`,`uuid`,`xid`]);function Ni(e,t,n,r){let i=n.format;if(i===`base64`){let n=w(t,ir);return e.write(`if (!${n}(${r})) return INVALID;`),r}if(i===`base64url`){let n=w(t,or);return e.write(`if (!${n}(${r})) return INVALID;`),r}if(i===`jwt`){let i=w(t,fr),a=w(t,n.alg??null);return e.write(`if (!${i}(${r}, ${a})) return INVALID;`),r}if(i===`ipv6`){let n=w(t,$n);return e.write(`if (!${n}(${r})) return INVALID;`),r}if(i===`cidrv6`){let n=w(t,nr);return e.write(`if (!${n}(${r})) return INVALID;`),r}if(i===`credit_card`){let n=w(t,dr);return e.write(`if (!${n}(${r})) return INVALID;`),r}let a=n;if(i===`url`||i===`httpurl`||a.normalize||a.hostname!==void 0||a.protocol!==void 0){let i=w(t,Pn),o=w(t,n),s=T(t),c=T(t);if(e.write(`const ${s} = ${r}.trim();`),e.write(`const ${c} = ${i}(${s}, ${o});`),e.write(`if (typeof ${c} === "number") return INVALID;`),a.hostname!==void 0){let n=w(t,Ln);e.write(`if (!${n}(${c}, ${o}.hostname)) return INVALID;`)}if(a.protocol!==void 0){let n=w(t,Rn);e.write(`if (!${n}(${c}, ${o}.protocol)) return INVALID;`)}let l=T(t),u=a.normalize?`${c}.href`:`${w(t,In)}(${s})`;return e.write(`const ${l} = ${u};`),l}let o=n.fn;if(o){if(va(o))throw new C(`async string format ${i}`);let n=w(t,o);return e.write(`if (!${n}(${r})) return INVALID;`),r}if(Mi.has(i)&&n.pattern){let i=w(t,n.pattern);return e.write(`${i}.lastIndex = 0;`),e.write(`if (!${i}.test(${r})) return INVALID;`),r}let s=n.format;switch(s){case`regex`:throw new C(`regex format without a pattern`);case`lowercase`:e.write(`if (${r} !== ${r}.toLowerCase()) return INVALID;`);break;case`uppercase`:e.write(`if (${r} !== ${r}.toUpperCase()) return INVALID;`);break;case`includes`:e.write(`if (!${r}.includes(${u(n.includes)})) return INVALID;`);break;case`starts_with`:{let t=n.prefix;e.write(`if (${r}.slice(0, ${t.length}) !== ${u(t)}) return INVALID;`);break}case`ends_with`:{let t=n.suffix;e.write(`if (${r}.slice(-${t.length}) !== ${u(t)}) return INVALID;`);break}default:throw new C(`string format ${s}`)}return r}function D(e,t,n,r,i=!0){let a=n._zod.def,o=a.type;if(a.coerce)throw new C(`coercion (z.coerce.${o}())`);let s=i||!!a.checks?.length,c;switch(o){case`string`:c=Pi(e,t,n,r);break;case`number`:c=Fi(e,n,r);break;case`boolean`:c=Ii(e,r);break;case`bigint`:c=Li(e,n,r);break;case`symbol`:c=Ri(e,r);break;case`undefined`:c=zi(e,r);break;case`null`:c=Bi(e,r);break;case`any`:case`unknown`:c=r;break;case`never`:e.write(`return INVALID;`),c=r;break;case`void`:c=Vi(e,r);break;case`nan`:c=Hi(e,r);break;case`date`:c=Ui(e,r);break;case`object`:c=Wi(e,t,n,r,s);break;case`optional`:c=Gi(e,t,n,r,s);break;case`nullable`:c=Zi(e,t,n,r,s);break;case`array`:c=Qi(e,t,n,r,s);break;case`literal`:c=$i(e,t,n,r);break;case`enum`:c=ea(e,t,n,r);break;case`readonly`:{let i=ta(e,t,n,r),a=T(t);e.write(`const ${a} = Object.freeze(${i});`),c=a;break}case`success`:ta(e,t,n,r),c=`true`;break;case`default`:case`prefault`:c=na(e,t,n,r);break;case`nonoptional`:c=ra(e,t,n,r);break;case`tuple`:c=ia(e,t,n,r);break;case`union`:c=oa(e,t,n,r);break;case`intersection`:c=la(e,t,n,r);break;case`record`:c=ua(e,t,n,r);break;case`map`:c=fa(e,t,n,r);break;case`set`:c=pa(e,t,n,r);break;case`file`:c=ma(e,r);break;case`template_literal`:c=ha(e,t,n,r);break;case`lazy`:c=ga(e,t,n,r);break;case`pipe`:c=_a(e,t,n,r);break;case`custom`:c=ya(e,t,n,r);break;case`transform`:c=Sa(e,t,n,r);break;case`catch`:c=xa(e,t,n,r);break;default:throw new C(`schema type ${o}`)}return c===null?null:_i(e,t,n,c)}function Pi(e,t,n,r){e.write(`if (typeof ${r} !== "string") return INVALID;`);let i=n._zod.def;return i.format===void 0?r:Ni(e,t,i,r)}function Fi(e,t,n){e.write(`if (typeof ${n} !== "number" || !Number.isFinite(${n})) return INVALID;`);let r=t._zod.def;return r.check===`number_format`&&r.format&&wi(e,{format:r.format},n),n}function Ii(e,t){return e.write(`if (typeof ${t} !== "boolean") return INVALID;`),t}function Li(e,t,n){e.write(`if (typeof ${n} !== "bigint") return INVALID;`);let r=t._zod.def;if(r.format)switch(r.format){case`int64`:e.write(`if (${n} < -9223372036854775808n || ${n} > 9223372036854775807n) return INVALID;`);break;case`uint64`:e.write(`if (${n} < 0n || ${n} > 18446744073709551615n) return INVALID;`)}return n}function Ri(e,t){return e.write(`if (typeof ${t} !== "symbol") return INVALID;`),t}function zi(e,t){return e.write(`if (${t} !== undefined) return INVALID;`),t}function Bi(e,t){return e.write(`if (${t} !== null) return INVALID;`),t}function Vi(e,t){return e.write(`if (${t} !== undefined) return INVALID;`),t}function Hi(e,t){return e.write(`if (typeof ${t} !== "number" || !Number.isNaN(${t})) return INVALID;`),t}function Ui(e,t){return e.write(`if (!(${t} instanceof Date) || Number.isNaN(${t}.getTime())) return INVALID;`),t}function Wi(e,t,n,r,i=!0){let a=n._zod.def;e.write(`if (typeof ${r} !== "object" || ${r} === null || Array.isArray(${r})) return INVALID;`);let o=a.shape,s=Object.keys(o),c=Object.getOwnPropertySymbols(o),l=c.length?[...s,...c]:s,d=e=>typeof e==`symbol`?w(t,e):u(e),f=e=>typeof e==`symbol`?`[${d(e)}]`:u(e),p=o;if(s.includes(`__proto__`))throw new C(`object shape key "__proto__"`);let m=new Map;for(let n of l){let a=p[n],o=d(n),s=T(t);if(e.write(`const ${s} = ${r}[${o}];`),a._zod.optin!==void 0){let i=T(t);e.write(`let ${i} = (() => {`),e.indented(e=>{let n=E(e,t,a,s);e.write(`return ${n};`)}),e.write(`})();`),a._zod.optout===`optional`?(e.write(`if (${i} === INVALID) {`),e.indented(e=>{e.write(`if (${o} in ${r}) return INVALID;`),e.write(`${i} = undefined;`)}),e.write(`}`)):e.write(`if (${i} === INVALID) return INVALID;`),m.set(n,i)}else{qi(a)&&e.write(`if (!(${o} in ${r})) return INVALID;`);let c=E(e,t,a,s,i);c!==null&&m.set(n,c)}}let h=a.catchall,ee=`none`;if(h){let t=h._zod.def.type;if(t===`never`){let t=s.map(e=>`k !== ${u(e)}`).join(` && `)||`true`;e.write(`for (const k in ${r}) {`),e.indented(e=>{e.write(`if (${t}) return INVALID;`)}),e.write(`}`)}else ee=(t===`unknown`||t===`any`)&&!h._zod.def.checks?.length?`passthrough`:`schema`}let te=T(t),ne=l.some(e=>Xi(p[e])||Yi(p[e]));if(!i){if(ee===`schema`){let n=s.length>0?w(t,new Set(s)):null;e.write(`for (const k in ${r}) {`),e.indented(e=>{e.write(`if (k === "__proto__") continue;`),n&&e.write(`if (${n}.has(k)) continue;`);let i=T(t);e.write(`const ${i} = ${r}[k];`),E(e,t,h,i,!1)}),e.write(`}`)}return null}if(ne){e.write(`const ${te} = {};`);for(let t of l){let n=d(t),i=m.get(t);Yi(p[t])?e.write(`if (${n} in ${r}) ${te}[${n}] = ${i};`):Xi(p[t])?e.write(`if (${i} !== undefined || ${n} in ${r}) ${te}[${n}] = ${i};`):e.write(`${te}[${n}] = ${i};`)}}else{let t=l.map(e=>`${f(e)}: ${m.get(e)}`).join(`, `);e.write(`const ${te} = { ${t} };`)}if(ee!==`none`){let n=s.length>0?w(t,new Set(s)):null;e.write(`for (const k in ${r}) {`),e.indented(e=>{if(e.write(`if (k === "__proto__") continue;`),n&&e.write(`if (${n}.has(k)) continue;`),ee===`passthrough`)e.write(`${te}[k] = ${r}[k];`);else{let n=T(t);e.write(`const ${n} = ${r}[k];`);let i=E(e,t,h,n);e.write(`${te}[k] = ${i};`)}}),e.write(`}`)}return te}function Gi(e,t,n,r,i=!0){let a=n._zod.def;if(Ki(n))return D(e,t,a.innerType,r,i);if(a.innerType._zod.optin===`defaulted`){let n=T(t),i=T(t);return e.write(`let ${n};`),e.write(`if (${r} === undefined) {`),e.indented(e=>{e.write(`const ${i} = (() => {`),e.indented(e=>{let n=D(e,t,a.innerType,r);e.write(`return ${n};`)}),e.write(`})();`),e.write(`if (${i} !== INVALID) ${n} = ${i};`)}),e.write(`} else {`),e.indented(e=>{let i=D(e,t,a.innerType,r);e.write(`${n} = ${i};`)}),e.write(`}`),n}let o=i?T(t):null;return o&&e.write(`let ${o};`),e.write(`if (${r} !== undefined) {`),e.indented(e=>{let n=D(e,t,a.innerType,r,i);o&&n!==null&&e.write(`${o} = ${n};`)}),e.write(`}`),o}function Ki(e){return e._zod.traits?.has(`$ZodExactOptional`)===!0}function qi(e){return e._zod.optin===void 0&&Ji(e)}function Ji(e){if(e._zod.def.coerce)return!0;let t=e._zod.def;switch(t.type){case`any`:case`unknown`:case`undefined`:case`void`:case`default`:case`prefault`:case`transform`:case`custom`:case`lazy`:return!0;case`string`:case`number`:case`boolean`:case`bigint`:case`symbol`:case`null`:case`never`:case`nan`:case`date`:case`object`:case`array`:case`tuple`:case`record`:case`map`:case`set`:case`file`:case`template_literal`:return!1;case`nonoptional`:return t.innerType?Ji(t.innerType):!1;case`literal`:return!!t.values?.includes(void 0);case`enum`:return!!e._zod.values?.has(void 0);case`optional`:case`nullable`:case`readonly`:case`success`:return!t.innerType||Ji(t.innerType);case`catch`:return!0;case`union`:return!t.options||t.options.some(Ji);case`intersection`:return!t.left||!t.right||Ji(t.left)&&Ji(t.right);case`pipe`:return!t.in||Ji(t.in);default:return!0}}function Yi(e){return e._zod.optin===`optional`&&e._zod.optout===`optional`}function Xi(e){let t=e._zod.def;switch(t.type){case`string`:case`number`:case`boolean`:case`bigint`:case`symbol`:case`null`:case`nan`:case`date`:case`object`:case`array`:case`tuple`:case`record`:case`map`:case`set`:case`file`:case`template_literal`:case`never`:case`success`:return!1;case`literal`:return!!t.values?.includes(void 0);case`enum`:return!!e._zod.values?.has(void 0);case`optional`:return!0;case`nullable`:case`readonly`:case`nonoptional`:return!t.innerType||Xi(t.innerType);case`union`:return!t.options||t.options.some(Xi);case`intersection`:return!t.left||!t.right||Xi(t.left)||Xi(t.right);case`pipe`:return!t.out||Xi(t.out);default:return!0}}function Zi(e,t,n,r,i=!0){let a=n._zod.def,o=i?T(t):null;return o&&e.write(`let ${o} = null;`),e.write(`if (${r} !== null) {`),e.indented(e=>{let n=D(e,t,a.innerType,r,i);o&&n!==null&&e.write(`${o} = ${n};`)}),e.write(`}`),o}function Qi(e,t,n,r,i=!0){let a=n._zod.def;e.write(`if (!Array.isArray(${r})) return INVALID;`);let o=i?T(t):null,s=T(t),c=T(t);return o&&e.write(`const ${o} = new Array(${r}.length);`),e.write(`for (let ${s} = 0; ${s} < ${r}.length; ${s}++) {`),e.indented(e=>{e.write(`const ${c} = ${r}[${s}];`);let n=E(e,t,a.element,c,i);o&&n!==null&&e.write(`${o}[${s}] = ${n};`)}),e.write(`}`),o}function $i(e,t,n,r){let i=n._zod.def.values;if(i.length!==1){let n=w(t,new Set(i));return e.write(`if (!${n}.has(${r})) return INVALID;`),r}let a=i[0];if(typeof a==`number`&&Number.isNaN(a)){let n=w(t,new Set(i));return e.write(`if (!${n}.has(${r})) return INVALID;`),r}if(typeof a==`string`)e.write(`if (${r} !== ${u(a)}) return INVALID;`);else if(typeof a==`number`||typeof a==`boolean`)e.write(`if (${r} !== ${a}) return INVALID;`);else if(a===null)e.write(`if (${r} !== null) return INVALID;`);else if(a===void 0)e.write(`if (${r} !== undefined) return INVALID;`);else if(typeof a==`bigint`)e.write(`if (${r} !== ${a}n) return INVALID;`);else throw new C(`literal type ${typeof a}`);return r}function ea(e,t,n,r){let i=n._zod.values;if(!i)throw new C(`enum schema without enumerated values`);let a=w(t,i);return e.write(`if (!${a}.has(${r})) return INVALID;`),r}function ta(e,t,n,r){let i=n._zod.def;return D(e,t,i.innerType,r)}function na(e,t,n,r){let i=n._zod.def,a=Object.getOwnPropertyDescriptor(n._zod.def,`defaultValue`)?()=>n._zod.def.defaultValue:void 0;if(n._zod.def.type===`prefault`){if(!a)return D(e,t,i.innerType,r);let n=w(t,a),o=T(t);return e.write(`let ${o} = ${r};`),e.write(`if (${r} === undefined) ${o} = ${n}();`),D(e,t,i.innerType,o)}let o=T(t);if(a){let n=w(t,a),s=w(t,ee);e.write(`let ${o};`),e.write(`if (${r} === undefined) {`),e.indented(e=>{e.write(`${o} = ${s}(${n}());`)}),e.write(`} else {`),e.indented(e=>{let a=D(e,t,i.innerType,r);e.write(`${o} = ${a} === undefined ? ${s}(${n}()) : ${a};`)}),e.write(`}`)}else e.write(`let ${o};`),e.write(`if (${r} !== undefined) {`),e.indented(e=>{let n=D(e,t,i.innerType,r);e.write(`${o} = ${n};`)}),e.write(`}`);return o}function ra(e,t,n,r){let i=n._zod.def,a=D(e,t,i.innerType,r),o=T(t);return e.write(`const ${o} = ${a};`),e.write(`if (${o} === undefined) return INVALID;`),o}function ia(e,t,n,r){let i=n._zod.def,a=i.items,o=i.rest;e.write(`if (!Array.isArray(${r})) return INVALID;`);let s=aa(a,`optin`),c=aa(a,`optout`);o?e.write(`if (${r}.length < ${s}) return INVALID;`):e.write(`if (${r}.length < ${s} || ${r}.length > ${a.length}) return INVALID;`);let l=T(t);e.write(`const ${l} = [];`);for(let n=0;n<a.length;n++){let i=a[n];if(n>=c)e.write(`if (${l}.length === ${n}) {`),e.indented(e=>{e.write(`if (${n} < ${r}.length) {`),e.indented(e=>{let a=T(t);e.write(`const ${a} = ${r}[${n}];`);let o=E(e,t,i,a);e.write(`${l}[${n}] = ${o};`)}),e.write(`} else {`),e.indented(e=>{if(Yi(i)){e.write(`${l}.length = ${n};`);return}let r=T(t),a=T(t);e.write(`const ${r} = undefined;`),e.write(`const ${a} = (() => {`),e.indented(e=>{let n=E(e,t,i,r);e.write(`return ${n};`)}),e.write(`})();`),e.write(`if (${a} === INVALID || ${a} === undefined) ${l}.length = ${n};`),e.write(`else ${l}[${n}] = ${a};`)}),e.write(`}`)}),e.write(`}`);else{let a=T(t);e.write(`const ${a} = ${r}[${n}];`);let o=E(e,t,i,a);e.write(`${l}[${n}] = ${o};`)}}if(o){let n=T(t),i=T(t);e.write(`for (let ${n} = ${a.length}; ${n} < ${r}.length; ${n}++) {`),e.indented(e=>{e.write(`const ${i} = ${r}[${n}];`);let a=E(e,t,o,i);e.write(`${l}[${n}] = ${a};`)}),e.write(`}`)}return l}function aa(e,t){for(let n=e.length-1;n>=0;n--)if(!(t===`optin`?e[n]._zod.optin!==void 0:e[n]._zod.optout===`optional`))return n+1;return 0}function oa(e,t,n,r){let i=n._zod.def,a=i.options;if(i.discriminator)return sa(e,t,i,r);if(i.inclusive===!1)throw new C(`exclusive unions (z.xor)`);if(a.length===0)return e.write(`return INVALID;`),r;if(a.length===1)return D(e,t,a[0],r);if(a.every(e=>e._zod.def.type===`literal`&&!e._zod.def.checks?.length)){let n=w(t,new Set(a.flatMap(e=>e._zod.def.values)));return e.write(`if (!${n}.has(${r})) return INVALID;`),r}let o=T(t);e.write(`let ${o};`);for(let n=0;n<a.length;n++){let i=a[n];n===0?e.write(`${o} = (() => {`):e.write(`if (${o} === INVALID) ${o} = (() => {`),e.indented(e=>{let n=D(e,t,i,r);e.write(`return ${n};`)}),e.write(`})();`)}return e.write(`if (${o} === INVALID) return INVALID;`),o}function sa(e,t,n,r){if(n.unionFallback)throw new C(`discriminated union with unionFallback`);if(n.options.length===0)return e.write(`return INVALID;`),r;let i=T(t),a=T(t);e.write(`const ${i} = ${r}?.[${u(n.discriminator)}];`),e.write(`let ${a};`);let o=!0,s=new Set;for(let c of n.options){let l=c._zod.propValues?.[n.discriminator];if(!l||l.size===0)throw new C(`discriminated union option without static discriminator values`);for(let e of l){if(s.has(e))throw new C(`duplicate discriminator value ${String(e)}`);s.add(e)}let u=Array.from(l,e=>ca(t,i,e)),d=o?`if`:`else if`;e.write(`${d} (${u.join(` || `)}) {`),e.indented(e=>{let n=D(e,t,c,r);e.write(`${a} = ${n};`)}),e.write(`}`),o=!1}return e.write(`else { return INVALID; }`),a}function ca(e,t,n){if(typeof n==`string`)return`${t} === ${u(n)}`;if(typeof n==`number`)return Number.isNaN(n)?`Number.isNaN(${t})`:`${t} === ${n}`;if(typeof n==`boolean`)return`${t} === ${n}`;if(n===null)return`${t} === null`;if(n===void 0)return`${t} === undefined`;if(typeof n==`bigint`)return`${t} === ${n}n`;if(typeof n==`symbol`)return`${t} === ${w(e,n)}`;throw new C(`literal discriminator value ${String(n)}`)}function la(e,t,n,r){let i=n._zod.def,a=E(e,t,i.left,r),o=E(e,t,i.right,r),s=w(t,Nr),c=T(t);return e.write(`const ${c} = ${s}(${a}, ${o});`),e.write(`if (!${c}.valid) return INVALID;`),`${c}.data`}function ua(e,t,n,r){let i=n._zod.def,a=w(t,h);e.write(`if (!${a}(${r})) return INVALID;`);let o=T(t),s=T(t),c=T(t);e.write(`const ${o} = {};`);let l=i,u=l.partial?void 0:i.keyType._zod.values;if(u){let n=[];for(let a of u){if(typeof a!=`string`&&typeof a!=`number`&&typeof a!=`symbol`)throw new C(`record key value ${String(a)}`);let s=typeof a==`number`?a.toString():a;if(s===`__proto__`)throw new C(`record key "__proto__"`);n.push(s);let c=w(t,a),l=D(e,t,i.keyType,c),u=T(t);e.write(`const ${u} = ${r}[${da(t,s)}];`);let d=E(e,t,i.valueType,u);e.write(`${o}[${l}] = ${d};`)}let a=w(t,new Set(n));return e.write(`for (const ${s} in ${r}) {`),e.indented(e=>{e.write(`if (${a}.has(${s})) continue;`),l.mode===`loose`?e.write(`if (${s} !== "__proto__") ${o}[${s}] = ${r}[${s}];`):e.write(`return INVALID;`)}),e.write(`}`),o}let d=i.keyType._zod.def;if(!(d.type===`string`&&d.format===void 0&&!d.coerce&&(d.checks?.length??0)===0)){let n=i.mode===`loose`,a=w(t,pi(i.keyType)),c=w(t,jt),l=w(t,Object.prototype.propertyIsEnumerable),u=T(t);return e.write(`for (const ${s} of Reflect.ownKeys(${r})) {`),e.indented(e=>{e.write(`if (${s} === "__proto__") continue;`),e.write(`if (!${l}.call(${r}, ${s})) continue;`),e.write(`let ${u} = ${a}(${s});`),e.write(`if (${u} === INVALID && typeof ${s} === "string" && ${c}.test(${s})) ${u} = ${a}(Number(${s}));`),n?e.write(`if (${u} === INVALID) { ${o}[${s}] = ${r}[${s}]; continue; }`):e.write(`if (${u} === INVALID) return INVALID;`),e.write(`if (${u} === "__proto__") continue;`);let d=T(t);e.write(`const ${d} = ${r}[${s}];`);let f=E(e,t,i.valueType,d);e.write(`${o}[${u}] = ${f};`)}),e.write(`}`),o}let f=w(t,Object.prototype.propertyIsEnumerable);return e.write(`for (const ${s} of Reflect.ownKeys(${r})) {`),e.indented(e=>{e.write(`if (${s} === "__proto__") continue;`),e.write(`if (!${f}.call(${r}, ${s})) continue;`),e.write(`if (typeof ${s} !== "string") return INVALID;`),e.write(`const ${c} = ${r}[${s}];`);let n=E(e,t,i.valueType,c);e.write(`${o}[${s}] = ${n};`)}),e.write(`}`),o}function da(e,t){return typeof t==`string`?u(t):w(e,t)}function fa(e,t,n,r){let i=n._zod.def;e.write(`if (!(${r} instanceof Map)) return INVALID;`);let a=T(t),o=T(t),s=T(t);return e.write(`const ${a} = new Map();`),e.write(`for (const [${o}, ${s}] of ${r}) {`),e.indented(e=>{let n=D(e,t,i.keyType,o),r=D(e,t,i.valueType,s);e.write(`${a}.set(${n}, ${r});`)}),e.write(`}`),a}function pa(e,t,n,r){let i=n._zod.def;e.write(`if (!(${r} instanceof Set)) return INVALID;`);let a=T(t),o=T(t);return e.write(`const ${a} = new Set();`),e.write(`for (const ${o} of ${r}) {`),e.indented(e=>{let n=D(e,t,i.valueType,o);e.write(`${a}.add(${n});`)}),e.write(`}`),a}function ma(e,t){return e.write(`if (!(${t} instanceof File)) return INVALID;`),t}function ha(e,t,n,r){e.write(`if (typeof ${r} !== "string") return INVALID;`);let i=n._zod.pattern;if(i){let n=w(t,i);e.write(`${n}.lastIndex = 0;`),e.write(`if (!${n}.test(${r})) return INVALID;`)}return r}function ga(e,t,n,r){let i=n._zod.def,a=w(t,i.getter),o=w(t,{parser:null});e.write(`if (!${o}.parser) {`),e.indented(e=>{e.write(`const inner = ${a}();`),e.write(`${o}.parser = function(input) {`),e.indented(e=>{e.write(`const result = inner._zod.run({ value: input, issues: [] }, {});`),e.write(`return result.issues.length === 0 ? result.value : INVALID;`)}),e.write(`};`)}),e.write(`}`);let s=T(t);return e.write(`const ${s} = ${o}.parser(${r});`),e.write(`if (${s} === INVALID) return INVALID;`),s}function _a(e,t,n,r){let i=n._zod.def,a=D(e,t,i.in,r);if(i.transform){if(va(i.transform))throw new li(`z.compile: async transforms in pipes are not supported`);let n=i.transform,r=w(t,e=>{let t={value:e,issues:[],addIssue:Ai},r=n(e,t);return r instanceof Promise?si:t.issues.length===0?r:si}),o=T(t);return e.write(`const ${o} = ${r}(${a});`),e.write(`if (${o} === INVALID) return INVALID;`),D(e,t,i.out,o)}return D(e,t,i.out,a)}function va(e){return typeof e==`function`&&(e.constructor.name===`AsyncFunction`||e[Symbol.toStringTag]===`AsyncFunction`)}function ya(e,t,n,r){let i=n._zod.def;if(i.fn){if(va(i.fn))throw new li(`z.compile: async custom predicates are not supported`);let n=w(t,i.fn),a=w(t,ki),o=T(t);e.write(`const ${o} = ${n}(${r});`),e.write(`if (${o} instanceof Promise) ${a}();`),e.write(`if (!${o}) return INVALID;`)}else throw new C(`custom schema without a predicate function`);return r}function ba(e,t,n){let r=e._zod.run({value:n,issues:[]},{});if(r&&typeof r.then==`function`)return si;let i=r;return i.issues.length===0?i.value:t()}function xa(e,t,n,r){let i=n._zod.def;if(!i.catchValue[`~constantCatch`])throw new C(`catch with a callback (only a constant catch value compiles)`,!1);let a=T(t);e.write(`let ${a} = (() => {`),e.indented(e=>{let n=E(e,t,i.innerType,r);e.write(`return ${n};`)}),e.write(`})();`);let o=w(t,i.innerType),s=w(t,i.catchValue),c=w(t,ba);return e.write(`if (${a} === INVALID) {`),e.indented(e=>{e.write(`${a} = ${c}(${o}, ${s}, ${r});`),e.write(`if (${a} === INVALID) return INVALID;`)}),e.write(`}`),a}function Sa(e,t,n,r){let i=n._zod.def;if(i.transform){if(va(i.transform))throw new li(`z.compile: async transforms are not supported`);let n=i.transform,a=w(t,e=>{let t={value:e,issues:[],addIssue:Ai},r=n(e,t);return r instanceof Promise?si:t.issues.length===0?r:si}),o=T(t);return e.write(`const ${o} = ${a}(${r});`),e.write(`if (${o} === INVALID) return INVALID;`),o}return r}const Ca=()=>{let e={string:{unit:`characters`,verb:`to have`},file:{unit:`bytes`,verb:`to have`},array:{unit:`items`,verb:`to have`},set:{unit:`items`,verb:`to have`},map:{unit:`entries`,verb:`to have`}};function t(t){return e[t]??null}let r={regex:`input`,email:`email address`,url:`URL`,emoji:`emoji`,uuid:`UUID`,uuidv4:`UUIDv4`,uuidv6:`UUIDv6`,nanoid:`nanoid`,guid:`GUID`,cuid:`cuid`,cuid2:`cuid2`,ulid:`ULID`,xid:`XID`,ksuid:`KSUID`,datetime:`ISO datetime`,date:`ISO date`,time:`ISO time`,duration:`ISO duration`,ipv4:`IPv4 address`,ipv6:`IPv6 address`,mac:`MAC address`,cidrv4:`IPv4 range`,cidrv6:`IPv6 range`,base64:`base64-encoded string`,base64url:`base64url-encoded string`,json_string:`JSON string`,e164:`E.164 number`,credit_card:`credit card number`,jwt:`JWT`,template_literal:`input`},i={nan:`NaN`};function a(e,t){return e===`number`&&typeof t==`number`&&!Number.isFinite(t)?String(t):i[e]??e}return e=>{switch(e.code){case`invalid_type`:return`Invalid input: expected ${a(e.expected)}, received ${a(Ce(e.input),e.input)}`;case`invalid_value`:return e.values.length===1?`Invalid input: expected ${ie(e.values[0])}`:`Invalid option: expected one of ${n(e.values,`|`)}`;case`too_big`:{let n=e.exact?`exactly `:e.inclusive?`<=`:`<`,r=t(e.origin);return r?`Too big: expected ${e.origin??`value`} to have ${n}${e.maximum.toString()} ${r.unit??`elements`}`:`Too big: expected ${e.origin??`value`} to be ${n}${e.maximum.toString()}`}case`too_small`:{let n=e.exact?`exactly `:e.inclusive?`>=`:`>`,r=t(e.origin);return r?`Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}`:`Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`}case`invalid_format`:{let t=e;return t.format===`starts_with`?`Invalid string: must start with "${t.prefix}"`:t.format===`ends_with`?`Invalid string: must end with "${t.suffix}"`:t.format===`includes`?`Invalid string: must include "${t.includes}"`:t.format===`regex`?`Invalid string: must match pattern ${t.pattern}`:`Invalid ${r[t.format]??e.format}`}case`not_multiple_of`:return`Invalid number: must be a multiple of ${e.divisor}`;case`unrecognized_keys`:return`Unrecognized key${e.keys.length>1?`s`:``}: ${n(e.keys,`, `)}`;case`invalid_key`:return`Invalid key in ${e.origin}`;case`invalid_union`:return e.options&&Array.isArray(e.options)&&e.options.length>0?`Invalid discriminator value. Expected ${e.options.map(e=>`'${e}'`).join(` | `)}`:e.inclusive===!1?`Invalid input: more than one option matched`:`Invalid input`;case`invalid_element`:return`Invalid value in ${e.origin}`;default:return`Invalid input`}}};function wa(){return{localeError:Ca()}}var Ta,Ea=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];return this._map.set(e,n),n&&typeof n==`object`&&`id`in n&&this._idmap.set(n.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&typeof t==`object`&&`id`in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}};function Da(){return new Ea}(Ta=globalThis).__zod_globalRegistry??(Ta.__zod_globalRegistry=Da());const Oa=globalThis.__zod_globalRegistry;function ka(e,t){return new e({type:`string`,...g(t)})}function Aa(e,t){return new e({type:`string`,format:`email`,check:`string_format`,abort:!1,...g(t)})}function ja(e,t){return new e({type:`string`,format:`guid`,check:`string_format`,abort:!1,...g(t)})}function Ma(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,...g(t)})}function Na(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v4`,...g(t)})}function Pa(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v6`,...g(t)})}function Fa(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v7`,...g(t)})}function Ia(e,t){return new e({type:`string`,format:`url`,check:`string_format`,abort:!1,...g(t)})}function La(e,t){return new e({type:`string`,format:`emoji`,check:`string_format`,abort:!1,...g(t)})}function Ra(e,t){return new e({type:`string`,format:`nanoid`,check:`string_format`,abort:!1,...g(t)})}function za(e,t){return new e({type:`string`,format:`cuid`,check:`string_format`,abort:!1,...g(t)})}function Ba(e,t){return new e({type:`string`,format:`cuid2`,check:`string_format`,abort:!1,...g(t)})}function Va(e,t){return new e({type:`string`,format:`ulid`,check:`string_format`,abort:!1,...g(t)})}function Ha(e,t){return new e({type:`string`,format:`xid`,check:`string_format`,abort:!1,...g(t)})}function Ua(e,t){return new e({type:`string`,format:`ksuid`,check:`string_format`,abort:!1,...g(t)})}function Wa(e,t){return new e({type:`string`,format:`ipv4`,check:`string_format`,abort:!1,...g(t)})}function Ga(e,t){return new e({type:`string`,format:`ipv6`,check:`string_format`,abort:!1,...g(t)})}function Ka(e,t){return new e({type:`string`,format:`cidrv4`,check:`string_format`,abort:!1,...g(t)})}function qa(e,t){return new e({type:`string`,format:`cidrv6`,check:`string_format`,abort:!1,...g(t)})}function Ja(e,t){return new e({type:`string`,format:`base64`,check:`string_format`,abort:!1,...g(t)})}function Ya(e,t){return new e({type:`string`,format:`base64url`,check:`string_format`,abort:!1,...g(t)})}function Xa(e,t){return new e({type:`string`,format:`e164`,check:`string_format`,abort:!1,...g(t)})}function Za(e,t){return new e({type:`string`,format:`jwt`,check:`string_format`,abort:!1,...g(t)})}function Qa(e,t){return new e({type:`string`,format:`datetime`,check:`string_format`,offset:!1,local:!1,precision:null,...g(t)})}function $a(e,t){return new e({type:`string`,format:`date`,check:`string_format`,...g(t)})}function eo(e,t){return new e({type:`string`,format:`time`,check:`string_format`,precision:null,...g(t)})}function to(e,t){return new e({type:`string`,format:`duration`,check:`string_format`,...g(t)})}function no(e,t){return new e({type:`number`,checks:[],...g(t)})}function ro(e,t){return new e({type:`number`,coerce:!0,checks:[],...g(t)})}function io(e,t){return new e({type:`number`,check:`number_format`,abort:!1,format:`safeint`,...g(t)})}function ao(e,t){return new e({type:`boolean`,...g(t)})}function oo(e,t){return new e({type:`boolean`,coerce:!0,...g(t)})}function so(e,t){return new e({type:`null`,...g(t)})}function co(e){return new e({type:`unknown`})}function lo(e,t){return new e({type:`never`,...g(t)})}function uo(e,t){return new Rt({check:`less_than`,...g(t),value:e,inclusive:!1})}function fo(e,t){return new Rt({check:`less_than`,...g(t),value:e,inclusive:!0})}function po(e,t){return new zt({check:`greater_than`,...g(t),value:e,inclusive:!1})}function mo(e,t){return new zt({check:`greater_than`,...g(t),value:e,inclusive:!0})}function ho(e,t){return new Bt({check:`multiple_of`,...g(t),value:e})}function go(e,t){return new Ht({check:`max_length`,...g(t),maximum:e})}function _o(e,t){return new Ut({check:`min_length`,...g(t),minimum:e})}function vo(e,t){return new Wt({check:`length_equals`,...g(t),length:e})}function yo(e,t){return new Kt({check:`string_format`,format:`regex`,...g(t),pattern:e})}function bo(e){return new qt({check:`string_format`,format:`lowercase`,...g(e)})}function xo(e){return new Jt({check:`string_format`,format:`uppercase`,...g(e)})}function So(e,t){return new Yt({check:`string_format`,format:`includes`,...g(t),includes:e})}function Co(e,t){return new Xt({check:`string_format`,format:`starts_with`,...g(t),prefix:e})}function wo(e,t){return new Zt({check:`string_format`,format:`ends_with`,...g(t),suffix:e})}function To(e){return new Qt({check:`overwrite`,tx:e})}function Eo(e){return To(t=>t.normalize(e))}function Do(){return To(e=>e.trim())}function Oo(){return To(e=>e.toLowerCase())}function ko(){return To(e=>e.toUpperCase())}function Ao(){return To(e=>d(e))}function jo(e,t,n){return new e({type:`array`,element:t,...g(n)})}function Mo(e,t,n){return new e({type:`custom`,check:`custom`,fn:t,...g(n)})}function No(e,t){let n=Po(t=>(t.addIssue=e=>{if(typeof e==`string`)t.issues.push(we(e,t.value,n._zod.def));else{let r=e;r.fatal&&(r.continue=!1),r.code??=`custom`,`input`in r||(r.input=t.value),r.inst??=n,r.continue??=!n._zod.def.abort,t.issues.push(we(r))}},e(t.value,t)),t);return n}function Po(e,t){let n=new b({check:`custom`,...g(t)});return n._zod.check=e,n}function Fo(e,...t){for(let n of t)for(let t of Reflect.ownKeys(n))Object.prototype.propertyIsEnumerable.call(n,t)&&c(e,t,n[t]);return e}function Io(e){let t=e?.target??`draft-2020-12`;return t===`draft-4`&&(t=`draft-04`),t===`draft-7`&&(t=`draft-07`),{processors:e.processors??{},metadataRegistry:e?.metadata??Oa,target:t,unrepresentable:e?.unrepresentable??`throw`,override:e?.override??(()=>{}),io:e?.io??`output`,counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??`ref`,reused:e?.reused??`inline`,intersections:[],deferred:[],external:e?.external??void 0}}function Lo(e,t,n,r,i){let a=typeof t.unrepresentable==`function`?t.unrepresentable({zodSchema:e,path:r.path,message:i}):t.unrepresentable;if(a===`any`)return!1;if(a===void 0||a===`throw`)throw Error(i);return Object.assign(n,a),!0}function O(e,t,n={path:[],schemaPath:[]}){var r;let i=e._zod.def,a=t.seen.get(e);if(a)return a.count++,n.schemaPath.includes(e)&&(a.cycle=n.path),a.schema;let o={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,o),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let s=e._zod.toJSONSchema?.();if(s)o.schema=s;else{let r={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,o.schema,r);else{let n=o.schema,a=t.processors[i.type];if(!a)throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);a(e,t,n,r)}let a=e._zod.parent;a&&(o.ref||=a,O(a,t,r),t.seen.get(a).isParent=!0)}let c=t.metadataRegistry.get(e);return c&&Fo(o.schema,c),t.io===`input`&&k(e)&&(delete o.schema.examples,delete o.schema.default),t.io===`input`&&`_prefault`in o.schema&&((r=o.schema).default??(r.default=o.schema._prefault)),delete o.schema._prefault,t.seen.get(e).schema}function Ro(e){return e.replace(/~/g,`~0`).replace(/\//g,`~1`)}function zo(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let t of e.seen.entries()){let n=e.metadataRegistry.get(t[0])?.id;if(n){let e=r.get(n);if(e&&e!==t[0])throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(n,t[0])}}let i=t=>{let r=e.target===`draft-2020-12`?`$defs`:`definitions`;if(e.external){let n=e.external.registry.get(t[0])?.id,i=e.external.uri??(e=>e);if(n)return{ref:i(n)};let a=t[1].defId??t[1].schema.id??`schema${e.counter++}`;return t[1].defId=a,{defId:a,ref:`${i(`__shared`)}#/${r}/${Ro(a)}`}}let i=`#/${r}/`;if(t[1]===n&&!t[1].schema.id)return{ref:`#`};let a=t[1].schema.id??`__schema${e.counter++}`;return{defId:a,ref:i+Ro(a)}},a=e=>{if(e[1].schema.$ref)return;let t=e[1],{ref:n,defId:r}=i(e);t.def={...t.schema},r&&(t.defId=r);let a=t.schema;for(let e in a)delete a[e];a.$ref=n};if(e.cycles===`throw`)for(let t of e.seen.entries()){let e=t[1];if(e.cycle)throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let n of e.seen.entries()){let r=n[1];if(t===n[0]){a(n);continue}if(e.external){let r=e.external.registry.get(n[0])?.id;if(t!==n[0]&&r){a(n);continue}}if(e.metadataRegistry.get(n[0])?.id){a(n);continue}if(r.cycle){a(n);continue}if(r.count>1&&e.reused===`ref`){a(n);continue}}e.external&&(e.sharedDefsExtractedFor=e.external)}function Bo(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let e of t){if(!e||typeof e!=`object`)return;Bo(e);let t=Object.keys(e);if(t.length!==1||t[0]!==`type`)return;let r=e.type;for(let e of Array.isArray(r)?r:[r]){if(typeof e!=`string`)return;n.includes(e)||n.push(e)}}delete e.anyOf,e.type=n.length===1?n[0]:n}const Vo=new Set([`type`,`properties`,`required`,`additionalProperties`]),Ho=[`oneOf`,`anyOf`];function Uo(e){let t=e.additionalProperties;return t===void 0||t===!1||typeof t!=`object`||!t?null:Object.keys(t).length?t:null}function Wo(e){let t=[];for(let n of e){if(typeof n!=`object`||n.type!==`object`)return null;for(let e in n)if(!Vo.has(e))return null;t.push(n)}let n={},r=new Set;for(let e of t){for(let r in e.properties){if(Object.prototype.hasOwnProperty.call(n,r))continue;let e=[];for(let n of t){let t=n.properties?.[r]??Uo(n);t!=null&&(e.some(e=>JSON.stringify(e)===JSON.stringify(t))||e.push(t))}c(n,r,e.length===1?e[0]:Wo(e)??{allOf:e})}for(let t of e.required??[])r.add(t)}let i={type:`object`,properties:n};if(r.size&&(i.required=[...r]),t.every(e=>e.additionalProperties===!1))i.additionalProperties=!1;else{let e=[];for(let n of t){let t=Uo(n);t&&!e.some(e=>JSON.stringify(e)===JSON.stringify(t))&&e.push(t)}e.length===1?i.additionalProperties=e[0]:e.length>1&&(i.additionalProperties={allOf:e})}return i}function Go(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let t of Vo)if(t in e)return;let n=t.filter(e=>Ho.some(t=>Array.isArray(e[t]))),r=null;if(!n.length)r=Wo(t);else{let e=n[0],i=Ho.find(t=>Array.isArray(e[t]));if(Object.keys(e).length!==1)return;let a=t.filter(t=>t!==e),o=e[i].map(e=>Wo([...a,e]));if(o.some(e=>!e))return;r={[i]:o}}r&&(delete e.allOf,Fo(e,r))}function Ko(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);let r=t=>{let n=e.seen.get(t);if(n.ref===null)return;let i=n.def??n.schema,a={...i},o=n.ref;if(n.ref=null,o){r(o);let n=e.seen.get(o),s=n.schema;if(s.$ref&&(e.target===`draft-07`||e.target===`draft-04`||e.target===`openapi-3.0`)?(i.allOf=i.allOf??[],i.allOf.push(s)):Fo(i,s),Fo(i,a),t._zod.parent===o)for(let e in i)e!==`$ref`&&e!==`allOf`&&(e in a||delete i[e]);if(s.$ref&&n.def)for(let e in i)e!==`$ref`&&e!==`allOf`&&e in n.def&&JSON.stringify(i[e])===JSON.stringify(n.def[e])&&delete i[e]}let s=t._zod.parent;if(s&&s!==o){r(s);let t=e.seen.get(s);if(t?.schema.$ref&&(i.$ref=t.schema.$ref,t.def))for(let e in i)e!==`$ref`&&e!==`allOf`&&e in t.def&&JSON.stringify(i[e])===JSON.stringify(t.def[e])&&delete i[e]}e.override({zodSchema:t,jsonSchema:i,path:n.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let t of[...e.seen.entries()].reverse())r(t[0]);if(e.target!==`openapi-3.0`)for(let t of e.seen.entries())Bo(t[1].def??t[1].schema);for(let t of e.deferred)t();if(e.intersections.length){let t=new Map;for(let n of e.seen.values())for(let e of[n.schema,n.def]){let n=e?.allOf;if(!Array.isArray(n))continue;let r=t.get(n);r?r.push(e):t.set(n,[e])}for(let n of e.intersections)for(let e of t.get(n)??[])Go(e)}}let i={};if(e.target===`draft-2020-12`?i.$schema=`https://json-schema.org/draft/2020-12/schema`:e.target===`draft-07`?i.$schema=`http://json-schema.org/draft-07/schema#`:e.target===`draft-04`?i.$schema=`http://json-schema.org/draft-04/schema#`:e.target,e.external?.uri){let n=e.external.registry.get(t)?.id;if(!n)throw Error("Schema is missing an `id` property");i.$id=e.external.uri(n)}Fo(i,n.defId?n.schema:n.def??n.schema);let a=e.metadataRegistry.get(t)?.id;a!==void 0&&i.id===a&&delete i.id;let o=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let t of e.seen.entries()){let e=t[1];e.def&&e.defId&&(e.def.id===e.defId&&delete e.def.id,c(o,e.defId,e.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(o).length>0&&(e.target===`draft-2020-12`?i.$defs=o:i.definitions=o);try{let n=JSON.parse(JSON.stringify(i));return Object.defineProperty(n,"~standard",{value:{...t[`~standard`],jsonSchema:{input:Jo(t,`input`,e.processors),output:Jo(t,`output`,e.processors)}},enumerable:!1,writable:!1}),n}catch{throw Error(`Error converting schema to JSON.`)}}function k(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type===`transform`)return!0;if(r.type===`array`)return k(r.element,n);if(r.type===`set`)return k(r.valueType,n);if(r.type===`lazy`)return k(r.getter(),n);if(r.type===`promise`||r.type===`optional`||r.type===`nonoptional`||r.type===`nullable`||r.type===`readonly`||r.type==="default"||r.type===`prefault`||r.type===`catch`)return k(r.innerType,n);if(r.type===`intersection`)return k(r.left,n)||k(r.right,n);if(r.type===`record`||r.type===`map`)return k(r.keyType,n)||k(r.valueType,n);if(r.type===`pipe`)return e._zod.traits.has(`$ZodCodec`)?!0:k(r.in,n)||k(r.out,n);if(r.type===`object`){for(let e in r.shape)if(k(r.shape[e],n))return!0;return!1}if(r.type===`union`){for(let e of r.options)if(k(e,n))return!0;return!1}if(r.type===`tuple`){for(let e of r.items)if(k(e,n))return!0;return!!(r.rest&&k(r.rest,n))}return!1}const qo=(e,t={})=>n=>{let r=Io({...n,processors:t});return O(e,r),zo(r,e),Ko(r,e)},Jo=(e,t,n={})=>r=>{let{libraryOptions:i,target:a}=r??{},o=Io({...i??{},target:a,io:t,processors:n});return O(e,o),zo(o,e),Ko(o,e)},Yo={guid:`uuid`,url:`uri`,datetime:`date-time`,json_string:`json-string`,regex:``},Xo=(e,t,n,r)=>{let i=n;i.type=`string`;let{minimum:a,maximum:o,format:s,patterns:c,contentEncoding:l,laxFormat:u}=e._zod.bag;if(typeof a==`number`&&(i.minLength=a),typeof o==`number`&&(i.maxLength=o),s&&(i.format=Yo[s]??s,i.format===``&&delete i.format,(s===`time`||u)&&delete i.format),l&&(i.contentEncoding=l),c&&c.size>0){let e=[...c];e.length===1?i.pattern=e[0].source:e.length>1&&(i.allOf=[...e.map(e=>({...t.target===`draft-07`||t.target===`draft-04`||t.target===`openapi-3.0`?{type:`string`}:{},pattern:e.source}))])}},Zo=(e,t,n,r)=>{let i=n,{minimum:a,maximum:o,format:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u}=e._zod.bag;i.type=typeof s==`string`&&s.includes(`int`)?`integer`:`number`;let d=typeof u==`number`&&u>=(a??-1/0),f=typeof l==`number`&&l<=(o??1/0),p=t.target===`draft-04`||t.target===`openapi-3.0`;d?p?(i.minimum=u,i.exclusiveMinimum=!0):i.exclusiveMinimum=u:typeof a==`number`&&(i.minimum=a),f?p?(i.maximum=l,i.exclusiveMaximum=!0):i.exclusiveMaximum=l:typeof o==`number`&&(i.maximum=o),typeof c==`number`&&(Number.isFinite(c)&&c!==0?i.multipleOf=Math.abs(c):Lo(e,t,i,r,`A multipleOf divisor of ${c} cannot be represented in JSON Schema`))},Qo=(e,t,n,r)=>{n.type=`boolean`},$o=(e,t,n,r)=>{t.target===`openapi-3.0`?(n.type=`string`,n.nullable=!0,n.enum=[null]):n.type=`null`},es=(e,t,n,r)=>{n.not={}},ts=(e,n,r,i)=>{let a=e._zod.def,o=t(a.entries);if(o.length===0){r.not={};return}o.every(e=>typeof e==`number`)&&(r.type=`number`),o.every(e=>typeof e==`string`)&&(r.type=`string`),r.enum=o},ns=(e,t,n,r)=>{let i=e._zod.def;if(i.values.length===0){n.not={};return}let a=[];for(let o of i.values)if(o===void 0){if(Lo(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof o==`bigint`){if(Lo(e,t,n,r,`BigInt literals cannot be represented in JSON Schema`))return;a.push(Number(o))}else a.push(o);if(a.length!==0){if(a.length===1){let e=a[0];n.type=e===null?`null`:typeof e,t.target===`draft-04`||t.target===`openapi-3.0`?n.enum=[e]:n.const=e}else a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),a.every(e=>typeof e==`boolean`)&&(n.type=`boolean`),a.every(e=>e===null)&&(n.type=`null`),n.enum=a}},rs=(e,t,n,r)=>{Lo(e,t,n,r,`Custom types cannot be represented in JSON Schema`)},is=(e,t,n,r)=>{Lo(e,t,n,r,`Transforms cannot be represented in JSON Schema`)},as=(e,t,n,r)=>{let i=n,a=e._zod.def,{minimum:o,maximum:s}=e._zod.bag;typeof o==`number`&&(i.minItems=o),typeof s==`number`&&(i.maxItems=s),i.type=`array`,i.items=O(a.element,t,{...r,path:[...r.path,`items`]})};function os(e){let t=e._zod.def;return t.type===`pipe`&&t.in._zod.traits.has(`$ZodTransform`)?os(t.out):t.type===`catch`?os(t.innerType):e._zod.optin}const ss=(e,t,n,r)=>{let i=n,a=e._zod.def,o=a.shape;if(Object.getOwnPropertySymbols(o).length&&Lo(e,t,i,r,`Symbol keys cannot be represented in JSON Schema`))return;i.type=`object`,i.properties={};for(let e in o)c(i.properties,e,O(o[e],t,{...r,path:[...r.path,`properties`,e]}));let s=new Set(Object.keys(o)),l=new Set([...s].filter(e=>{let n=a.shape[e];return t.io===`input`?os(n)===void 0:n._zod.optout===void 0}));l.size>0&&(i.required=Array.from(l)),a.catchall?._zod.def.type===`never`?i.additionalProperties=!1:a.catchall?a.catchall&&(i.additionalProperties=O(a.catchall,t,{...r,path:[...r.path,`additionalProperties`]})):t.io===`output`&&(i.additionalProperties=!1)},cs=(e,t,n,r)=>{let i=e._zod.def,a=i.inclusive===!1,o=i.options.map((e,n)=>O(e,t,{...r,path:[...r.path,a?`oneOf`:`anyOf`,n]}));a?n.oneOf=o:n.anyOf=o},ls=(e,t,n,r)=>{let i=e._zod.def,a=O(i.left,t,{...r,path:[...r.path,`allOf`,0]}),o=O(i.right,t,{...r,path:[...r.path,`allOf`,1]}),s=e=>`allOf`in e&&Object.keys(e).length===1,c=[...s(a)?a.allOf:[a],...s(o)?o.allOf:[o]];n.allOf=c,t.intersections.push(c)},us=(e,t,n,r)=>{let i=n,a=e._zod.def;i.type=`array`;let o=t.target===`draft-2020-12`?`prefixItems`:`items`,s=t.target===`draft-2020-12`||t.target===`openapi-3.0`?`items`:`additionalItems`,c=a.items.map((e,n)=>O(e,t,{...r,path:[...r.path,o,n]})),l=a.rest?O(a.rest,t,{...r,path:[...r.path,s,...t.target===`openapi-3.0`?[a.items.length]:[]]}):null,u=a.items.length;for(;u>0;){let e=a.items[u-1];if(!(t.io===`input`?os(e)!==void 0:e._zod.optout===`optional`))break;u--}let d=a.items.length,f=!a.rest;t.target===`draft-2020-12`?(i.prefixItems=c,f?i.items=!1:l&&(i.items=l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):t.target===`openapi-3.0`?(i.items={anyOf:c},l&&i.items.anyOf.push(l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):(i.items=c,f?i.additionalItems=!1:l&&(i.additionalItems=l),u>0&&(i.minItems=u),f&&(i.maxItems=d));let{minimum:p,maximum:m}=e._zod.bag;typeof p==`number`&&(i.minItems=p),typeof m==`number`&&(i.maxItems=m)};function ds(e,t,n){if(t.$ref){if(n.has(t))return t;n.add(t);let r=e.get(t)?.def;if(!r)return t;let i=ds(e,r,n);return i===r?t:i}for(let r of[`anyOf`,`oneOf`]){let i=t[r];if(!Array.isArray(i))continue;let a=i.map(t=>ds(e,t,n));a.some((e,t)=>e!==i[t])&&(t={...t,[r]:a})}let r=Array.isArray(t.type)?t.type:[t.type],i=!r.includes(`string`)&&r.some(e=>e===`number`||e===`integer`),a=t.enum??(t.const===void 0?void 0:[t.const]);if(!i&&!a?.some(e=>typeof e==`number`))return t;let{minimum:o,maximum:s,exclusiveMinimum:c,exclusiveMaximum:l,multipleOf:u,format:d,id:f,...p}=t;return p.enum?p.enum=p.enum.map(e=>typeof e==`number`?String(e):e):typeof p.const==`number`&&(p.const=String(p.const)),i?(p.type=`string`,a||(p.pattern=(r.includes(`number`)?jt:At).source),p):p}const fs=new WeakMap;function ps(e){let t=new Map;for(let n of e.seen.values())n.def&&!t.has(n.schema)&&t.set(n.schema,n);let n=new Map;for(let r of fs.get(e)??[]){let i=e.seen.get(r),a=(i?.def??i?.schema)?.propertyNames;if(!a||a===!0||n.has(a))continue;let o=ds(t,a,new Set);o!==a&&n.set(a,o)}if(n.size)for(let t of e.seen.values())for(let e of[t.schema,t.def]){let t=e&&n.get(e.propertyNames);t&&(e.propertyNames=t)}}const ms=(e,t,n,r)=>{let i=n,a=e._zod.def;i.type=`object`;let o=a.keyType,s=o._zod.bag?.patterns;if(a.mode===`loose`&&s&&s.size>0){let e=O(a.valueType,t,{...r,path:[...r.path,`patternProperties`,`*`]});i.patternProperties={};for(let t of s)c(i.patternProperties,t.source,e)}else{if(t.target===`draft-07`||t.target===`draft-2020-12`){i.propertyNames=O(a.keyType,t,{...r,path:[...r.path,`propertyNames`]});let n=fs.get(t);n||(n=[],fs.set(t,n),t.deferred.push(()=>ps(t))),n.push(e)}i.additionalProperties=O(a.valueType,t,{...r,path:[...r.path,`additionalProperties`]})}let l=o._zod.values,u=t.io===`input`&&os(a.valueType)!==void 0;if(l&&!a.partial&&!u){let e=[...l].filter(e=>typeof e==`string`||typeof e==`number`);e.length>0&&(i.required=e.map(String))}},hs=(e,t,n,r)=>{let i=e._zod.def,a=O(i.innerType,t,r),o=t.seen.get(e);t.target===`openapi-3.0`?(o.ref=i.innerType,n.nullable=!0):n.anyOf=[a,{type:`null`}]},gs=(e,t,n,r)=>{let i=e._zod.def;O(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},_s=Symbol();function vs(e,t,n,r,i){let a=!1,o=JSON.stringify(e,(e,t)=>typeof t==`bigint`?(a=!0,null):t);return a?(Lo(t,n,r,i,`BigInt defaults cannot be represented in JSON Schema`),_s):JSON.parse(o)}const ys=(e,t,n,r)=>{let i=e._zod.def;O(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o=vs(i.defaultValue,e,t,n,r);o!==_s&&(n.default=o)},bs=(e,t,n,r)=>{let i=e._zod.def;O(i.innerType,t,r);let a=t.seen.get(e);if(a.ref=i.innerType,t.io!==`input`)return;let o=vs(i.defaultValue,e,t,n,r);o!==_s&&(n._prefault=o)},xs=(e,t,n,r)=>{let i=e._zod.def;O(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o;try{o=i.catchValue(void 0)}catch{Lo(e,t,n,r,`Dynamic catch values are not supported in JSON Schema`);return}n.default=o},Ss=(e,t,n,r)=>{let i=e._zod.def,a=i.in._zod.traits.has(`$ZodTransform`),o=t.io===`input`?a?i.out:i.in:i.out;O(o,t,r);let s=t.seen.get(e);s.ref=o},Cs=(e,t,n,r)=>{let i=e._zod.def;O(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,n.readOnly=!0},ws=(e,t,n,r)=>{let i=e._zod.def;O(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType};let Ts=!1;y.postProcessor=e=>{if(Ts)return;let t=e._zod?.run;if(typeof t!=`function`)return;let n=(n,r)=>{if(r?.async||r?.direction===`backward`||r?.skipChecks)return t(n,r);Ts=!0;try{if(y.jitless)return e._zod.run=t,t(n,r);let i=di(e,{strict:!0});e._zod.run=i._zod.run,e._zod.bag.fallbackRun=i._zod.bag.fallbackRun,e._zod.bag.validator=i._zod.bag.validator}catch{e._zod.run=t}finally{Ts=!1}return e._zod.run(n,r)};n.__originalRun=t,e._zod.run=n};let Es=!1,Ds=null;const Os=()=>{Es=!0},ks=()=>{let e=Es;return Es=!1,e},As=e=>{Ds=e},js=()=>{Ds=null},Ms=()=>{Os(),Ds?.()};let Ns=null,Ps=null,Fs=!1,Is=new AbortController;const Ls=()=>{Ns!==null&&(globalThis.clearTimeout(Ns),Ns=null)},Rs=()=>{Ps!==null&&(globalThis.clearTimeout(Ps),Ps=null)},zs=()=>{Is.signal.aborted||Is.abort(),Ls(),Rs(),js()},Bs=e=>{if(!Is.signal.aborted){if(Ls(),Rs(),Fs){Os();return}Fs=!0;try{for(;!Is.signal.aborted;){ks();let t=e.getPastEventIds(Date.now());if(t.length===0)break;for(let n of t)if(Is.signal.aborted||(e.resolveEvent(n),ks()))break}if(Is.signal.aborted)return;let t=e.getNextEvent(Date.now());if(!t)return;let n=Math.max(0,t.resolvesAt-Date.now());Ns=globalThis.setTimeout(()=>{if(Ns=null,!Is.signal.aborted){try{e.resolveEvent(t.id)}catch(e){console.error(e)}Bs(e)}},n)}finally{Fs=!1,!Is.signal.aborted&&ks()&&Bs(e)}}},Vs=e=>{As(()=>Hs(e))},Hs=e=>{Os(),!Is.signal.aborted&&(Ls(),Ps===null&&(Ps=globalThis.setTimeout(()=>{Ps=null,!Is.signal.aborted&&Bs(e)},0)))},Us=new WeakSet([Object.prototype,Error.prototype]);function Ws(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let e=n(this);return Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0})}})}const Gs=v(`ZodError`,(e,t)=>{sn.init(e,t),e.name=`ZodError`;let n=Object.getPrototypeOf(e);Us.has(n)||(Us.add(n),Ws(n,`format`,e=>t=>dn(e,t)),Ws(n,`flatten`,e=>t=>un(e,t)),Ws(n,`addIssue`,e=>t=>{e.issues.push(t),e.message=JSON.stringify(e.issues,r,2)}),Ws(n,`addIssues`,e=>t=>{e.issues.push(...t),e.message=JSON.stringify(e.issues,r,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))},void 0,{Parent:Error}),Ks=pn(Gs),qs=mn(Gs),Js=hn(Gs),Ys=_n(Gs),Xs=yn(Gs),Zs=bn(Gs),Qs=xn(Gs),$s=Sn(Gs),ec=Cn(Gs),tc=wn(Gs),nc=Tn(Gs),rc=En(Gs);function ic(){y.localeError||Ve(wa())}function ac(){y.memoizer||Ve({memoizer:et()})}const A=v(`ZodType`,(e,t)=>(ic(),x.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(l(t,{checks:[...t.checks??[],...e.map(e=>typeof e==`function`?{_zod:{check:e,def:{check:`custom`},onattach:[]}}:e)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return re(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(wl(e,t))},superRefine(e,t){return this.check(Tl(e,t))},overwrite(e){return this.check(To(e))},optional(){return al(this)},exactOptional(){return sl(this)},nullable(){return ll(this)},nullish(){return al(ll(this))},nonoptional(e){return hl(this,e)},array(){return I(this)},or(e){return Wc([this,e])},and(e){return Jc(this,e)},transform(e){return yl(this,rl(e))},default(e){return dl(this,e)},prefault(e){return pl(this,e)},catch(e){return _l(this,e)},pipe(e){return yl(this,e)},readonly(){return Sl(this)},describe(e){let t=this.clone();return Oa.add(t,{description:e}),t},meta(...e){if(e.length===0)return Oa.get(this);let t=this.clone();return Oa.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get"~standard"(){return De(this,`~standard`,{...kn(this),jsonSchema:{input:Jo(this,`input`),output:Jo(this,`output`)}})},set"~standard"(e){Ee(this,`~standard`,e)},parse:function e(t,n){return Ks(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await qs(this,t,n,{callee:e})},safeParse(e,t){return Js(this,e,t)},async safeParseAsync(e,t){return Ys(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){Ee(this,`spa`,e)},encode:function e(t,n){return Xs(this,t,n,{callee:e})},decode:function e(t,n){return Zs(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await Qs(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await $s(this,t,n,{callee:e})},safeEncode(e,t){return ec(this,e,t)},safeDecode(e,t){return tc(this,e,t)},async safeEncodeAsync(e,t){return nc(this,e,t)},async safeDecodeAsync(e,t){return rc(this,e,t)},toJSONSchema(e){return qo(this,{})(e)},get description(){return Oa.get(this)?.description},get _def(){return this._zod.def}}),oc=v(`_ZodString`,(e,t)=>{An.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Xo(e,t,n,r);let n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null},{regex(...e){return this.check(yo(...e))},includes(...e){return this.check(So(...e))},startsWith(...e){return this.check(Co(...e))},endsWith(...e){return this.check(wo(...e))},min(...e){return this.check(_o(...e))},max(...e){return this.check(go(...e))},length(...e){return this.check(vo(...e))},nonempty(...e){return this.check(_o(1,...e))},lowercase(e){return this.check(bo(e))},uppercase(e){return this.check(xo(e))},trim(){return this.check(Do())},normalize(...e){return this.check(Eo(...e))},toLowerCase(){return this.check(Oo())},toUpperCase(){return this.check(ko())},slugify(){return this.check(Ao())}}),sc=v(`ZodString`,(e,t)=>{An.init(e,t),oc.init(e,t)},{email(e){return this.check(Aa(fc,e))},url(e){return this.check(Ia(hc,e))},jwt(e){return this.check(Za(Ac,e))},emoji(e){return this.check(La(gc,e))},guid(e){return this.check(ja(pc,e))},uuid(e){return this.check(Ma(mc,e))},uuidv4(e){return this.check(Na(mc,e))},uuidv6(e){return this.check(Pa(mc,e))},uuidv7(e){return this.check(Fa(mc,e))},nanoid(e){return this.check(Ra(_c,e))},cuid(e){return this.check(za(vc,e))},cuid2(e){return this.check(Ba(yc,e))},ulid(e){return this.check(Va(bc,e))},base64(e){return this.check(Ja(Dc,e))},base64url(e){return this.check(Ya(Oc,e))},xid(e){return this.check(Ha(xc,e))},ksuid(e){return this.check(Ua(Sc,e))},ipv4(e){return this.check(Wa(Cc,e))},ipv6(e){return this.check(Ga(wc,e))},cidrv4(e){return this.check(Ka(Tc,e))},cidrv6(e){return this.check(qa(Ec,e))},e164(e){return this.check(Xa(kc,e))},datetime(e){return this.check(Qa(cc,e))},date(e){return this.check($a(lc,e))},time(e){return this.check(eo(uc,e))},duration(e){return this.check(to(dc,e))}});function j(e){return ka(sc,e)}const M=v(`ZodStringFormat`,(e,t)=>{S.init(e,t),oc.init(e,t)}),cc=v(`ZodISODateTime`,(e,t)=>{qn.init(e,t),M.init(e,t)}),lc=v(`ZodISODate`,(e,t)=>{Jn.init(e,t),M.init(e,t)}),uc=v(`ZodISOTime`,(e,t)=>{Yn.init(e,t),M.init(e,t)}),dc=v(`ZodISODuration`,(e,t)=>{Xn.init(e,t),M.init(e,t)}),fc=v(`ZodEmail`,(e,t)=>{Nn.init(e,t),M.init(e,t)}),pc=v(`ZodGUID`,(e,t)=>{jn.init(e,t),M.init(e,t)}),mc=v(`ZodUUID`,(e,t)=>{Mn.init(e,t),M.init(e,t)}),hc=v(`ZodURL`,(e,t)=>{zn.init(e,t),M.init(e,t)}),gc=v(`ZodEmoji`,(e,t)=>{Bn.init(e,t),M.init(e,t)}),_c=v(`ZodNanoID`,(e,t)=>{Vn.init(e,t),M.init(e,t)}),vc=v(`ZodCUID`,(e,t)=>{Hn.init(e,t),M.init(e,t)}),yc=v(`ZodCUID2`,(e,t)=>{Un.init(e,t),M.init(e,t)}),bc=v(`ZodULID`,(e,t)=>{Wn.init(e,t),M.init(e,t)}),xc=v(`ZodXID`,(e,t)=>{Gn.init(e,t),M.init(e,t)}),Sc=v(`ZodKSUID`,(e,t)=>{Kn.init(e,t),M.init(e,t)}),Cc=v(`ZodIPv4`,(e,t)=>{Zn.init(e,t),M.init(e,t)}),wc=v(`ZodIPv6`,(e,t)=>{er.init(e,t),M.init(e,t)}),Tc=v(`ZodCIDRv4`,(e,t)=>{tr.init(e,t),M.init(e,t)}),Ec=v(`ZodCIDRv6`,(e,t)=>{rr.init(e,t),M.init(e,t)}),Dc=v(`ZodBase64`,(e,t)=>{ar.init(e,t),M.init(e,t)}),Oc=v(`ZodBase64URL`,(e,t)=>{sr.init(e,t),M.init(e,t)}),kc=v(`ZodE164`,(e,t)=>{cr.init(e,t),M.init(e,t)}),Ac=v(`ZodJWT`,(e,t)=>{pr.init(e,t),M.init(e,t)}),jc=v(`ZodNumber`,(e,t)=>{mr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Zo(e,t,n,r);let n=e._zod.bag;e.minValue=Math.max(n.minimum??-1/0,n.exclusiveMinimum??-1/0)??null,e.maxValue=Math.min(n.maximum??1/0,n.exclusiveMaximum??1/0)??null,e.isInt=(n.format??``).includes(`int`)||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null},{gt(e,t){return this.check(po(e,t))},gte(e,t){return this.check(mo(e,t))},min(e,t){return this.check(mo(e,t))},lt(e,t){return this.check(uo(e,t))},lte(e,t){return this.check(fo(e,t))},max(e,t){return this.check(fo(e,t))},int(e){return this.check(P(e))},safe(e){return this.check(P(e))},positive(e){return this.check(po(0,e))},nonnegative(e){return this.check(mo(0,e))},negative(e){return this.check(uo(0,e))},nonpositive(e){return this.check(fo(0,e))},multipleOf(e,t){return this.check(ho(e,t))},step(e,t){return this.check(ho(e,t))},finite(){return this}});function N(e){return no(jc,e)}const Mc=v(`ZodNumberFormat`,(e,t)=>{hr.init(e,t),jc.init(e,t)});function P(e){return io(Mc,e)}const Nc=v(`ZodBoolean`,(e,t)=>{gr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Qo(e,t,n,r)});function F(e){return ao(Nc,e)}const Pc=v(`ZodNull`,(e,t)=>{_r.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>$o(e,t,n,r)});function Fc(e){return so(Pc,e)}const Ic=v(`ZodUnknown`,(e,t)=>{vr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(e,t,n)=>void 0});function Lc(){return co(Ic)}const Rc=v(`ZodNever`,(e,t)=>{yr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>es(e,t,n,r)});function zc(e){return lo(Rc,e)}const Bc=v(`ZodArray`,(e,t)=>{ac(),xr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>as(e,t,n,r),e.element=t.element},{min(e,t){return this.check(_o(e,t))},nonempty(e){return this.check(_o(1,e))},max(e,t){return this.check(go(e,t))},length(e,t){return this.check(vo(e,t))},unwrap(){return this.element}});function I(e,t){return jo(Bc,e,t)}const Vc=v(`ZodObject`,(e,t)=>{ac(),Or.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ss(e,t,n,r),Ne(e,`shape`,e=>e._zod.def.shape,!1)},{keyof(){return R(Object.keys(this._zod.def.shape))},catchall(e){return this.clone({...this._zod.def,catchall:e})},passthrough(){return this.clone({...this._zod.def,catchall:Lc()})},loose(){return this.clone({...this._zod.def,catchall:Lc()})},strict(){return this.clone({...this._zod.def,catchall:zc()})},strip(){return this.clone({...this._zod.def,catchall:void 0})},extend(e){return le(this,e)},safeExtend(e){return ue(this,e)},merge(e){return de(this,e)},pick(e){return se(this,e)},omit(e){return ce(this,e)},partial(...e){return fe(il,this,e[0])},exactPartial(...e){return fe(ol,this,e[0],`exactPartial`)},required(...e){return pe(ml,this,e[0])}});function L(e,t){return new Vc({type:`object`,shape:e,catchall:zc(),...g(t)})}function Hc(e,t){return new Vc({type:`object`,shape:e,catchall:Lc(),...g(t)})}const Uc=v(`ZodUnion`,(e,t)=>{Ar.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>cs(e,t,n,r),e.options=t.options});function Wc(e,t){return new Uc({type:`union`,options:e,...g(t)})}const Gc=v(`ZodDiscriminatedUnion`,(e,t)=>{Uc.init(e,t),jr.init(e,t)});function Kc(e,t,n){return new Gc({type:`union`,options:t,discriminator:e,...g(n)})}const qc=v(`ZodIntersection`,(e,t)=>{Mr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ls(e,t,n,r)});function Jc(e,t){return new qc({type:`intersection`,left:e,right:t})}const Yc=v(`ZodTuple`,(e,t)=>{ac(),Fr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>us(e,t,n,r)},{rest(e){return this.clone({...this._zod.def,rest:e})},partial(){let e=this._zod.def;if(e.checks?.length)throw Error(`.partial() cannot be used on tuple schemas containing refinements`);return this.clone({...e,items:e.items.map(e=>new il({type:`optional`,innerType:e}))})}});function Xc(e,t,n){let r=t instanceof x;return new Yc({type:`tuple`,items:e,rest:r?t:null,...g(r?n:t)})}const Zc=v(`ZodRecord`,(e,t)=>{ac(),zr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ms(e,t,n,r),e.keyType=t.keyType,e.valueType=t.valueType});function Qc(e,t,n){return!t||!t._zod?new Zc({type:`record`,keyType:j(),valueType:e,...g(t)}):new Zc({type:`record`,keyType:e,valueType:t,...g(n)})}function $c(e,t,n){return new Zc({type:`record`,keyType:e,valueType:t,...g(n),partial:!0})}const el=v(`ZodEnum`,(e,t)=>{Br.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ts(e,t,n,r),e.enum=t.entries,e.options=Object.values(t.entries);let n=new Set(Object.keys(t.entries));e.extract=(e,r)=>{let i={};for(let r of e)if(n.has(r))i[r]=t.entries[r];else throw Error(`Key ${r} not found in enum`);return new el({...t,checks:[],...g(r),entries:i})},e.exclude=(e,r)=>{let i={...t.entries};for(let t of e)if(n.has(t))delete i[t];else throw Error(`Key ${t} not found in enum`);return new el({...t,checks:[],...g(r),entries:i})}});function R(e,t){let n=Array.isArray(e)?Object.fromEntries(e.map(e=>[e,e])):e;return new el({type:`enum`,entries:n,...g(t)})}const tl=v(`ZodLiteral`,(e,t)=>{Vr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ns(e,t,n,r),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function z(e,t){return new tl({type:`literal`,values:Array.isArray(e)?e:[e],...g(t)})}const nl=v(`ZodTransform`,(e,t)=>{ac(),Hr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>is(e,t,n,r),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new Be(e.constructor.name);n.addIssue=r=>{if(typeof r==`string`)n.issues.push(we(r,n.value,t));else{let t=r;t.fatal&&(t.continue=!1),t.code??=`custom`,`input`in t||(t.input=n.value),t.inst??=e,n.issues.push(we(t))}};let i=t.transform(n.value,n);return i instanceof Promise?i.then(e=>(n.value=e,n)):(n.value=i,n)}});function rl(e){return new nl({type:`transform`,transform:e})}const il=v(`ZodOptional`,(e,t)=>{Wr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ws(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function al(e){return new il({type:`optional`,innerType:e})}const ol=v(`ZodExactOptional`,(e,t)=>{Gr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ws(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function sl(e){return new ol({type:`optional`,innerType:e})}const cl=v(`ZodNullable`,(e,t)=>{Kr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>hs(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function ll(e){return new cl({type:`nullable`,innerType:e})}const ul=v(`ZodDefault`,(e,t)=>{qr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ys(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function dl(e,t){return new ul({type:`default`,innerType:e,get defaultValue(){return typeof t==`function`?t():ee(t)}})}const fl=v(`ZodPrefault`,(e,t)=>{Yr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>bs(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function pl(e,t){return new fl({type:`prefault`,innerType:e,get defaultValue(){return typeof t==`function`?t():ee(t)}})}const ml=v(`ZodNonOptional`,(e,t)=>{Xr.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>gs(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function hl(e,t){return new ml({type:`nonoptional`,innerType:e,...g(t)})}const gl=v(`ZodCatch`,(e,t)=>{$r.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>xs(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function _l(e,t){return new gl({type:`catch`,innerType:e,catchValue:typeof t==`function`?t:Pe(t)})}const vl=v(`ZodPipe`,(e,t)=>{ei.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ss(e,t,n,r),e.in=t.in,e.out=t.out});function yl(e,t){return new vl({type:`pipe`,in:e,out:t})}const bl=v(`ZodPreprocess`,(e,t)=>{vl.init(e,t),ni.init(e,t)}),xl=v(`ZodReadonly`,(e,t)=>{ri.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Cs(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Sl(e){return new xl({type:`readonly`,innerType:e})}const Cl=v(`ZodCustom`,(e,t)=>{ai.init(e,t),A.init(e,t),e._zod.processJSONSchema=(t,n,r)=>rs(e,t,n,r)});function wl(e,t={}){return Mo(Cl,e,t)}function Tl(e,t){return No(e,t)}function El(e,t){return new bl({type:`pipe`,in:rl(e),out:t})}function B(e){return ro(jc,e)}function V(e){return oo(Nc,e)}const Dl=`
  SELECT id, type, starts_at, duration, resolves_at, meta, village_id
  FROM events
  WHERE id = $event_id;
`,Ol=`
  SELECT id, resolves_at AS resolvesAt
  FROM
    events
  WHERE
    resolves_at > $now
  ORDER BY
    resolves_at
  LIMIT 1;
`,kl=`
  SELECT id, type, starts_at, duration, resolves_at, meta, village_id
  FROM events
  WHERE type = $type
    AND (
    village_id = $village_id
      OR village_id IS NULL
    )
  ORDER BY resolves_at;
`,Al=`
  SELECT
    EXISTS
    (
      SELECT 1
      FROM
        events
      WHERE
        type = $type
        AND village_id = $village_id
    ) AS event_exists;
`,H=R(`BARRACKS.GREAT_BARRACKS.STABLE.GREAT_STABLE.WORKSHOP.HOSPITAL.ASCLEPEION.CLAY_PIT.WHEAT_FIELD.WOODCUTTER.IRON_MINE.BAKERY.BRICKYARD.GRAIN_MILL.GRANARY.GREAT_GRANARY.IRON_FOUNDRY.SAWMILL.WAREHOUSE.GREAT_WAREHOUSE.WATERWORKS.ACADEMY.ROMAN_WALL.SPARTAN_WALL.TEUTONIC_WALL.HEROS_MANSION.HUN_WALL.GAUL_WALL.RALLY_POINT.EGYPTIAN_WALL.NATURE_WALL.NATAR_WALL.TRAPPER.BREWERY.COMMAND_CENTER.CRANNY.HORSE_DRINKING_TROUGH.MAIN_BUILDING.MARKETPLACE.RESIDENCE.TOURNAMENT_SQUARE.TRADE_OFFICE.SMITHY.TOWN_HALL.EMBASSY.TREASURY.GATHERERS_HUT.HUNTERS_LODGE`.split(`.`)).meta({id:`BuildingId`}),jl=R([`resources`,`defensiveStructures`]),Ml=R([`battle`,`capture`]),Nl=I(Wc([H,z(`random`)])).max(2),Pl=R([`buildingScheduledConstruction`,`buildingConstruction`,`buildingLevelChange`,`buildingDestruction`,`troopTraining`,`troopMovementReinforcements`,`troopMovementRelocation`,`troopMovementReturn`,`troopMovementFindNewVillage`,`troopMovementAttack`,`troopMovementRaid`,`troopMovementOasisOccupation`,`troopMovementAdventure`,`unitResearch`,`unitImprovement`,`animalCageProduction`,`trapperCageProduction`,`huntersLodgeHunt`,`gatherersHutGatheringTrip`,`heroRevival`,`heroHealthRegeneration`,`loyaltyIncrease`,`resourceTransfer`,`tradeRoute`]),Fl=L({id:N(),type:Pl,starts_at:N(),duration:N(),resolves_at:N(),village_id:N().nullable(),meta:j().nullable()}),Il=e=>({...e.meta===null?{}:JSON.parse(e.meta),id:e.id,type:e.type,startsAt:e.starts_at,duration:e.duration,resolvesAt:e.resolves_at,villageId:e.village_id});let Ll=null,Rl=!1;const zl=e=>{Ll=e,Ll.start()},Bl=e=>{Rl=e},Vl=(e,t)=>{Ll&&(!t?.force&&!Rl||Ll.postMessage(e))},U=(e,t)=>[{effectId:`infantryDefence`,valuesPerLevel:t,type:e},{effectId:`cavalryDefence`,valuesPerLevel:t,type:e}],Hl=e=>({effectId:e,valuesPerLevel:[3,7,13,21,31,46,70,98,140,203,280,392,525,693,889,1120,1400,1820,2240,2800,3430],type:`base`}),Ul=(e,t=6)=>({effectId:e,valuesPerLevel:[1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2].slice(0,t),type:`bonus`}),Wl=e=>({effectId:e,valuesPerLevel:[1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2],type:`bonus-booster`}),Gl=e=>({effectId:e,valuesPerLevel:[1,1,.9091,.8333,.7143,.6667,.5882,.5263,.4762,.4348,.3846,.3448,.3125,.2857,.2564,.2273,.2041,.1852,.1667,.1493,.1351],type:`bonus`}),Kl=(e,t)=>({effectId:e,valuesPerLevel:[0,400,900,1500,2300,3200,4300,5600,7200,9e3,11300,13900,17200,21e3,25600,31e3,37700,45500,55e3,66300,8e4].map(e=>e*t),type:`base`}),ql=e=>({effectId:e,valuesPerLevel:Array.from({length:21},(e,t)=>t),type:`base`}),Jl=e=>{let t=e===`gauls`?2:1;return{effectId:`crannyCapacity`,valuesPerLevel:[0,100,130,170,220,280,360,460,600,770,1e3].map(e=>e*t),type:`base`}},Yl=e=>{let t=e===`romans`?.2:.1;return{effectId:`merchantCapacity`,valuesPerLevel:Array.from({length:21},(e,n)=>1+n*t),type:`bonus`}},Xl=()=>U(`base`,[0,2,8,18,32,50,72,98,128,162,200,242,288,338,392,450,512,578,648,722,800]),Zl=()=>{let e=[1,1,.99,.98,.97,.96,.95,.94,.93,.92,.91,.9,.89,.88,.86,.85,.84,.83,.82,.81,.8];return[{effectId:`stableTrainingDuration`,valuesPerLevel:e,type:`bonus`},{effectId:`greatStableTrainingDuration`,valuesPerLevel:e,type:`bonus`}]},Ql=new Map([{id:`BAKERY`,category:`resource-booster`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[Ul(`wheatProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WHEAT_FIELD`,level:10},{id:3,type:`building`,buildingId:`GRAIN_MILL`,level:5},{id:4,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[1200,1480,870,1600],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:6080,buildingDurationReduction:2400},{id:`BRICKYARD`,category:`resource-booster`,populationCoefficient:3,culturePointsCoefficient:1,effects:()=>[Ul(`clayProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`CLAY_PIT`,level:10},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[440,480,320,50],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:5240,buildingDurationReduction:2400},{id:`CLAY_PIT`,category:`resource-production`,populationCoefficient:2,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[Hl(`clayProduction`)],baseBuildingCost:[80,40,80,50],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:553,buildingDurationReduction:333},{id:`WHEAT_FIELD`,category:`resource-production`,populationCoefficient:0,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[Hl(`wheatProduction`)],baseBuildingCost:[70,90,70,20],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:483,buildingDurationReduction:333},{id:`GRAIN_MILL`,category:`resource-booster`,populationCoefficient:3,culturePointsCoefficient:1,effects:()=>[Ul(`wheatProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WHEAT_FIELD`,level:5}],baseBuildingCost:[500,440,380,1240],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:4240,buildingDurationReduction:2400},{id:`GRANARY`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[Kl(`granaryCapacity`,1)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:1}],baseBuildingCost:[80,100,70,20],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3475,buildingDurationReduction:1875},{id:`IRON_FOUNDRY`,category:`resource-booster`,populationCoefficient:6,culturePointsCoefficient:1,effects:()=>[Ul(`ironProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`IRON_MINE`,level:10},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[200,450,510,120],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:6480,buildingDurationReduction:2400},{id:`IRON_MINE`,category:`resource-production`,populationCoefficient:3,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[Hl(`ironProduction`)],baseBuildingCost:[100,80,30,60],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:783,buildingDurationReduction:333},{id:`SAWMILL`,category:`resource-booster`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[Ul(`woodProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WOODCUTTER`,level:10},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[520,380,290,90],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:5400,buildingDurationReduction:2400},{id:`WAREHOUSE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[Kl(`warehouseCapacity`,1)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:1}],baseBuildingCost:[130,160,90,40],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`WATERWORKS`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:2,effects:()=>[Wl(`woodProduction`),Wl(`clayProduction`),Wl(`ironProduction`),Wl(`wheatProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`HEROS_MANSION`,level:10},{id:3,type:`tribe`,tribe:`egyptians`}],baseBuildingCost:[910,945,910,340],buildingCostCoefficient:1.31,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`WOODCUTTER`,category:`resource-production`,populationCoefficient:2,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[Hl(`woodProduction`)],baseBuildingCost:[40,100,50,60],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:593,buildingDurationReduction:333},{id:`ACADEMY`,category:`military`,populationCoefficient:4,culturePointsCoefficient:4,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`BARRACKS`,level:3}],baseBuildingCost:[220,160,90,40],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`BARRACKS`,category:`military`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[Gl(`barracksTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:1}],baseBuildingCost:[210,140,260,120],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`ROMAN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.03,1.06,1.09,1.13,1.16,1.19,1.23,1.27,1.31,1.34,1.38,1.43,1.47,1.51,1.56,1.6,1.65,1.7,1.75,1.81]),...U(`base`,[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`romans`}],baseBuildingCost:[70,90,170,70],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TEUTONIC_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.02,1.04,1.06,1.08,1.1,1.13,1.15,1.17,1.2,1.22,1.24,1.27,1.29,1.32,1.35,1.37,1.4,1.43,1.46,1.49]),...U(`base`,[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`teutons`}],baseBuildingCost:[120,200,0,80],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`GREAT_BARRACKS`,category:`military`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[Gl(`greatBarracksTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`BARRACKS`,level:20}],baseBuildingCost:[630,420,780,360],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`GREAT_STABLE`,category:`military`,populationCoefficient:5,culturePointsCoefficient:2,effects:()=>[Gl(`greatStableTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`STABLE`,level:20}],baseBuildingCost:[780,420,660,300],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4075,buildingDurationReduction:1875},{id:`HEROS_MANSION`,category:`military`,populationCoefficient:2,culturePointsCoefficient:1,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:1}],baseBuildingCost:[700,670,700,240],buildingCostCoefficient:1.33,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:2300,buildingDurationReduction:0},{id:`HOSPITAL`,category:`military`,populationCoefficient:3,culturePointsCoefficient:4,effects:()=>[Gl(`hospitalTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`ACADEMY`,level:15}],baseBuildingCost:[320,280,420,360],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`ASCLEPEION`,category:`military`,populationCoefficient:3,culturePointsCoefficient:5,effects:()=>[Gl(`hospitalTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5},{id:3,type:`building`,buildingId:`ACADEMY`,level:10},{id:4,type:`tribe`,tribe:`spartans`}],baseBuildingCost:[320,280,420,360],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`HUN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.02,1.03,1.05,1.06,1.08,1.09,1.11,1.13,1.14,1.16,1.18,1.2,1.21,1.23,1.25,1.27,1.29,1.31,1.33,1.35]),...U(`base`,[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`huns`}],baseBuildingCost:[50,80,40,30],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`GAUL_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.03,1.05,1.08,1.1,1.13,1.16,1.19,1.22,1.25,1.28,1.31,1.35,1.38,1.41,1.45,1.49,1.52,1.56,1.6,1.64]),...U(`base`,[0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`gauls`}],baseBuildingCost:[160,100,80,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`RALLY_POINT`,category:`military`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[ql(`revealedIncomingTroopsAmount`)],buildingRequirements:[{id:1,type:`amount`,amount:1}],baseBuildingCost:[110,160,90,70],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`STABLE`,category:`military`,populationCoefficient:5,culturePointsCoefficient:2,effects:()=>[Gl(`stableTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`ACADEMY`,level:5},{id:3,type:`building`,buildingId:`SMITHY`,level:3}],baseBuildingCost:[260,140,220,100],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4075,buildingDurationReduction:1875},{id:`SMITHY`,category:`military`,populationCoefficient:4,culturePointsCoefficient:2,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`ACADEMY`,level:1},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:3}],baseBuildingCost:[180,250,500,160],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:2875,buildingDurationReduction:1875},{id:`EGYPTIAN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.03,1.05,1.08,1.1,1.13,1.16,1.19,1.22,1.25,1.28,1.31,1.35,1.38,1.41,1.45,1.49,1.52,1.56,1.6,1.64]),...U(`base`,[0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`egyptians`}],baseBuildingCost:[110,160,70,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`SPARTAN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.02,1.04,1.06,1.08,1.1,1.13,1.15,1.17,1.2,1.22,1.24,1.27,1.29,1.32,1.35,1.37,1.4,1.43,1.46,1.49]),...U(`base`,[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`spartans`}],baseBuildingCost:[160,100,80,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`NATURE_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.01,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.1,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.19,1.2]),...U(`base`,[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`nature`}],baseBuildingCost:[50,60,20,200],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`NATAR_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...U(`bonus`,[1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2]),...U(`base`,[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`natars`}],baseBuildingCost:[180,250,400,80],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TRAPPER`,category:`military`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[{effectId:`trapperCapacity`,valuesPerLevel:[0,10,22,35,49,64,80,97,115,134,154,175,196,218,241,265,290,316,343,371,400],type:`base`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`RALLY_POINT`,level:1},{id:3,type:`tribe`,tribe:`gauls`}],baseBuildingCost:[80,120,70,90],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:2e3,buildingDurationReduction:0},{id:`WORKSHOP`,category:`military`,populationCoefficient:3,culturePointsCoefficient:3,effects:()=>[Gl(`workshopTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5},{id:3,type:`building`,buildingId:`ACADEMY`,level:10}],baseBuildingCost:[460,510,600,320],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`BREWERY`,category:`infrastructure`,populationCoefficient:6,culturePointsCoefficient:4,effects:()=>[{effectId:`attack`,valuesPerLevel:[1,1.01,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.1,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.19,1.2],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`GRANARY`,level:20},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:10},{id:4,type:`tribe`,tribe:`teutons`}],baseBuildingCost:[3210,2050,2750,3830],buildingCostCoefficient:1.4,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:11750,buildingDurationReduction:3750},{id:`CRANNY`,category:`infrastructure`,populationCoefficient:0,culturePointsCoefficient:1,effects:e=>[Jl(e)],buildingRequirements:[{id:1,type:`amount`,amount:1/0}],baseBuildingCost:[40,50,30,10],buildingCostCoefficient:1.28,maxLevel:10,buildingDurationBase:1.16,buildingDurationModifier:2625,buildingDurationReduction:1875},{id:`HORSE_DRINKING_TROUGH`,category:`infrastructure`,populationCoefficient:5,culturePointsCoefficient:3,effects:()=>[...Zl()],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`RALLY_POINT`,level:10},{id:3,type:`building`,buildingId:`STABLE`,level:20},{id:4,type:`tribe`,tribe:`romans`}],baseBuildingCost:[780,420,660,540],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:5950,buildingDurationReduction:3750},{id:`MAIN_BUILDING`,category:`infrastructure`,populationCoefficient:2,culturePointsCoefficient:2,effects:()=>[{effectId:`buildingDuration`,valuesPerLevel:[1,1,.98,.96,.94,.91,.89,.87,.85,.83,.81,.78,.75,.73,.7,.67,.64,.6,.57,.54,.5],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1}],baseBuildingCost:[70,40,60,20],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`MARKETPLACE`,category:`infrastructure`,populationCoefficient:4,culturePointsCoefficient:3,effects:()=>[ql(`merchantAmount`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WAREHOUSE`,level:1},{id:3,type:`building`,buildingId:`GRANARY`,level:1},{id:4,type:`building`,buildingId:`MAIN_BUILDING`,level:3}],baseBuildingCost:[80,70,120,70],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3675,buildingDurationReduction:1875},{id:`RESIDENCE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:2,effects:()=>[...Xl(),{effectId:`residenceTrainingDuration`,valuesPerLevel:[1,1,1,1,1,1,1,1,1,1,1,1,.9,.82,.74,.67,.61,.55,.5,.45,.41],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[580,460,350,180],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TREASURY`,category:`infrastructure`,populationCoefficient:4,culturePointsCoefficient:6,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10}],baseBuildingCost:[2880,2740,2580,990],buildingCostCoefficient:1.26,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:9875,buildingDurationReduction:1875},{id:`TOURNAMENT_SQUARE`,category:`military`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[{effectId:`unitSpeedAfter20Fields`,valuesPerLevel:[1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4,4.2,4.4,4.6,4.8,5],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`RALLY_POINT`,level:15}],baseBuildingCost:[1750,2250,1530,240],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:5375,buildingDurationReduction:1875},{id:`TRADE_OFFICE`,category:`infrastructure`,populationCoefficient:3,culturePointsCoefficient:3,effects:e=>[Yl(e)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MARKETPLACE`,level:20},{id:3,type:`building`,buildingId:`STABLE`,level:10}],baseBuildingCost:[1400,1330,1200,400],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`EMBASSY`,category:`infrastructure`,populationCoefficient:3,culturePointsCoefficient:4,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:1}],baseBuildingCost:[1400,1330,1200,400],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TOWN_HALL`,category:`infrastructure`,populationCoefficient:4,culturePointsCoefficient:5,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`ACADEMY`,level:10}],baseBuildingCost:[1250,1110,1260,600],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:14375,buildingDurationReduction:1875},{id:`GATHERERS_HUT`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`WAREHOUSE`,level:3},{id:4,type:`building`,buildingId:`GRANARY`,level:3}],baseBuildingCost:[230,190,80,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4275,buildingDurationReduction:2075},{id:`HUNTERS_LODGE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:5}],baseBuildingCost:[390,280,250,140],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.16,buildingDurationModifier:3675,buildingDurationReduction:1775},{id:`GREAT_GRANARY`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[Kl(`granaryCapacity`,3)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`GRANARY`,level:20}],baseBuildingCost:[400,500,350,100],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:8875,buildingDurationReduction:1875},{id:`GREAT_WAREHOUSE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[Kl(`warehouseCapacity`,3)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`WAREHOUSE`,level:20}],baseBuildingCost:[650,800,450,200],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:10875,buildingDurationReduction:1875}].map(e=>[e.id,e])),$l=e=>Ql.get(e),eu=(e,t)=>{let{populationCoefficient:n}=$l(e);if(t<=0)return 0;if(t===1)return n;let r=5*n+4,i=Math.trunc(r/10),a=r-i*10,o=a+t,s=Math.trunc(o/10),c=o-s*10,l=5*s*s-4*s+s*c,u=a+1,d=Math.trunc(u/10),f=u-d*10,p=l-(5*d*d-4*d+d*f);return n+(t-1)*i+p},tu=(e,t)=>{let{buildingCostCoefficient:n,baseBuildingCost:r}=$l(e);return r.map(e=>Math.ceil(e*n**(t-1)/5)*5)},nu=(e,t)=>{let{culturePointsCoefficient:n}=$l(e);return t===0?0:Math.round(n*1.2**t)},ru=(e,t)=>{let n=$l(e),r=eu(e,t),i=nu(e,t),a=eu(e,t+1),o=nu(e,t+1);return{building:n,isMaxLevel:n.maxLevel===t,population:r,culturePoints:i,nextLevelPopulation:a,nextLevelCulturePoints:o,nextLevelResourceCost:tu(e,t+1),nextLevelBuildingDuration:ou(e,t+1)}},iu=(e,t,n)=>{let{population:r}=ru(e,t),{population:i}=ru(e,n);return i-r},au=(e,t,n=0)=>{let r=tu(e,t),i=n<=.05?.95:Math.max(.4,.95-(n-.05)/.95);return r.map(e=>Math.trunc(e*i))},ou=(e,t)=>{let{buildingDurationBase:n,buildingDurationModifier:r,buildingDurationReduction:i}=$l(e);return Math.ceil((r*n**(t-1)-i)/5)*5*1e3},su=(e,t)=>3e5*e/t,cu=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,39,40],lu=L({id:N(),buildingId:H,level:N()}).meta({id:`BuildingField`}),uu=[`gauls`,`romans`,`teutons`,`egyptians`,`huns`],du=[`spartans`],fu=[`nature`,`natars`],pu=[...uu,...du,...fu],mu=R(uu);R(du),R(fu);const W=R(pu).meta({id:`Tribe`}),hu=`
  SELECT
    ei.effect AS id,
    e.value,
    et.type,
    es.scope,
    eso.source,
    e.tile_id AS tileId,
    e.source_specifier AS sourceSpecifier,
    CASE
      WHEN e.source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
        AND e.source_specifier BETWEEN 1 AND 40
        THEN bi.building
      END AS buildingId
  FROM
    effects AS e
      LEFT JOIN effect_ids AS ei
                ON ei.id = e.effect_id
      JOIN effect_type_ids AS et ON et.id = e.type_id
      JOIN effect_scope_ids AS es ON es.id = e.scope_id
      JOIN effect_source_ids AS eso ON eso.id = e.source_id
      LEFT JOIN villages AS ev ON ev.tile_id = e.tile_id
      LEFT JOIN building_fields AS bf
                ON e.scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
                  AND bf.village_id = ev.id
                  AND bf.field_id = e.source_specifier
      LEFT JOIN building_ids AS bi
                ON bi.id = bf.building_id
  WHERE
    (ei.effect = $effect_id)
    AND (e.scope_id IN (SELECT id FROM effect_scope_ids WHERE scope IN ('global', 'server')) OR e.tile_id = (SELECT tile_id FROM villages WHERE id = $village_id));
`,gu=`
  INSERT INTO effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
  VALUES (
    $effect_id,
    $value,
    (SELECT id FROM effect_type_ids WHERE type = $type),
    (SELECT id FROM effect_scope_ids WHERE scope = $scope),
    (SELECT id FROM effect_source_ids WHERE source = $source),
    $tile_id,
    $source_specifier
  );
`,_u=`
  UPDATE effects
  SET
    value = value - ($value)
  FROM effect_ids ei
  WHERE
    effects.effect_id = ei.id
    AND ei.effect = 'wheatProduction'
    AND type_id = (SELECT id FROM effect_type_ids WHERE type = 'base')
    AND scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
    AND source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
    AND tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
    AND source_specifier = 0;
`,vu=`
  UPDATE effects
  SET
    value = $value
  FROM effect_ids ei
  WHERE
    effects.effect_id = ei.id
    AND ei.effect = $effect_id
    AND tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
    AND type_id = (SELECT id FROM effect_type_ids WHERE type = $type)
    AND scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
    AND source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
    AND source_specifier = $source_specifier;
`,yu=`
  UPDATE effects
  SET
    value = value + $increase_amount
  WHERE
    effect_id = (
      SELECT id
      FROM
        effect_ids
      WHERE
        effect = 'wheatProduction'
    )
    AND source_id = (SELECT id FROM effect_source_ids WHERE source = 'troops')
    AND tile_id = $tile_id;
`,bu=`
  UPDATE resource_sites
  SET
    wood = $wood,
    clay = $clay,
    iron = $iron,
    wheat = $wheat,
    updated_at = $updated_at
  WHERE tile_id = $tile_id;
`,xu=`
  SELECT tile_id
  FROM
    villages
  WHERE
    id = $village_id;
`,Su=`
  SELECT id
  FROM
    villages
  WHERE
    tile_id = $tile_id;
`,Cu=`
  SELECT ti.tribe
  FROM
    villages v
      JOIN players p ON p.id = v.player_id
      JOIN tribe_ids ti ON ti.id = p.tribe_id
  WHERE
    v.id = $village_id;
`,wu=`
  SELECT v.id AS villageId
  FROM
    villages v
  WHERE
    v.tile_id = $tile_id
    AND v.player_id = $player_id;
`,Tu=`
  SELECT MAX(bf.level) AS level
  FROM
    building_fields bf
      JOIN building_ids bi ON bi.id = bf.building_id
  WHERE
    bf.village_id = $village_id
    AND bi.building = $building_id
    AND bf.level > 0;
`,Eu=`
  DROP TABLE IF EXISTS temp_rearrange_source_fields;
`,Du=Xc([P(),P(),P(),P()]).meta({id:`ResourceBundle`}),Ou=R([`wood`,`clay`,`iron`,`wheat`]).meta({id:`Resource`}),ku=L({wood:N(),clay:N(),iron:N(),wheat:N()}).meta({id:`Resources`}),Au=new Set([`woodProduction`,`clayProduction`,`ironProduction`,`wheatProduction`]),ju=e=>Au.has(e),Mu=e=>e.type===`bonus`&&e.scope!==`server`&&ju(e.id),Nu=e=>e.type===`bonus`&&!Mu(e),Pu=(e,t)=>{switch(e.type){case`base`:t.base.push(e.value);break;case`bonus`:if(Mu(e)){t.bonus+=e.value-1;break}Nu(e)&&(t.bonus*=e.value);break;case`bonus-booster`:t.bonusBooster*=e.value}},Fu=e=>Math.trunc(e+1e-9),Iu=({bonus:e,bonusBooster:t})=>1+(e-1)*t,Lu=(e,t)=>{if(ju(e)){let e=0;for(let n of t)e+=Iu(n)-1;return 1+e}let n=1;for(let e of t)n*=Iu(e);return n},Ru=(e,t,n)=>{let r=1,i={base:[],bonus:1,bonusBooster:1},a={base:[],bonus:1,bonusBooster:1},o={base:[],bonus:1,bonusBooster:1},s={base:[],bonus:1,bonusBooster:1},c={base:[],bonus:1,bonusBooster:1};for(let l of t)if(l.id===e&&(l.scope===`global`||l.scope===`server`||l.tileId===n)){if(l.scope===`server`){r=l.value;continue}switch(l.source){case`tribe`:Pu(l,i);break;case`building`:{let e=l;if(e.buildingId===`WATERWORKS`){Pu(e,o);break}Pu(l,i);break}case`hero`:Pu(l,a);break;case`artifact`:Pu(l,s);break;case`oasis`:Pu(l,o);break;case`troops`:Pu(l,c)}}let l=Lu(e,[i,o,s,a,c]);return{serverEffectValue:r,buildingEffectValues:i,oasisEffectValues:o,artifactEffectValues:s,heroEffectValues:a,troopEffectValues:c,combinedBonusEffectValue:l}};function G(e,t,n){let r=Ru(e,t,n),{serverEffectValue:i,oasisEffectValues:a,buildingEffectValues:o,heroEffectValues:s,artifactEffectValues:c}=r,l=o.base.length>0||s.base.length>0||a.base.length>0||c.base.length>0||r.troopEffectValues.base.length>0;if(!l&&ju(e))return e===`wheatProduction`?{total:0,population:0,buildingWheatLimit:0}:{total:0};let u=0;for(let e of s.base)u+=e*i;let d=0;for(let e of c.base)d+=e*i;let f=0;for(let e of a.base)f+=e*i;let p=0;for(let e of r.troopEffectValues.base)p+=e;if(!(o.base.length>0)){let t=d+f+p+u;return l?e===`wheatProduction`?{total:t,population:0,buildingWheatLimit:0}:{total:t}:{total:r.combinedBonusEffectValue*i}}let m=0,h=0;for(let t of o.base){if(t<0){h+=t;continue}let n=t*i;if(!ju(e)){let e=r.combinedBonusEffectValue>1?Fu(n*(r.combinedBonusEffectValue-1)):0;m+=n+e;continue}let l=o.bonus>1?Fu(n*(o.bonus-1)*o.bonusBooster):0,u=s.bonus>1?Fu(n*(s.bonus-1)*s.bonusBooster):0,d=c.bonus>1?Fu(n*(c.bonus-1)*c.bonusBooster):0,f=a.bonus>1?Fu(n*(a.bonus-1)*a.bonusBooster):0;m+=n+l+u+d+f}if(e===`wheatProduction`){let e=Ru(`unitWheatConsumption`,t,n);return{total:m+h+d+f+u-Math.trunc(p*e.combinedBonusEffectValue),population:-h,buildingWheatLimit:m+h}}return{total:m+d+f+p+u}}const zu=({lastKnownResourceAmount:e,lastUpdatedAt:t,hourlyProduction:n,storageCapacity:r,timestamp:i=Date.now()})=>{let a=Math.max(0,i-t),o=Math.floor(a/1e3);if(n===0)return{timeSinceLastUpdateInSeconds:o,secondsForResourceGeneration:1/0,currentAmount:e,lastEffectiveUpdate:t};let s=Math.abs(n),c=36e5/s,l=c/1e3,u=Math.floor(a*s/36e5),d=n<0?-1:1,f=e+u*d;return{timeSinceLastUpdateInSeconds:o,secondsForResourceGeneration:l,currentAmount:d<0?Math.max(f,0):Math.min(f,r),lastEffectiveUpdate:t+Math.floor(u*c)}},Bu=R(`attack.defence.defenceBonus.infantryDefence.cavalryDefence.warehouseCapacity.granaryCapacity.unitSpeed.unitSpeedAfter20Fields.unitWheatConsumption.unitCarryCapacity.buildingDuration.unitResearchDuration.unitImprovementDuration.merchantSpeed.merchantCapacity.merchantAmount.crannyCapacity.trapperCapacity.revealedIncomingTroopsAmount.woodProduction.clayProduction.ironProduction.wheatProduction.residenceTrainingDuration.barracksTrainingDuration.greatBarracksTrainingDuration.stableTrainingDuration.greatStableTrainingDuration.workshopTrainingDuration.hospitalTrainingDuration`.split(`.`)).meta({id:`EffectId`}),Vu=R([`global`,`local`,`server`]).meta({id:`EffectScope`}),Hu=R([`hero`,`oasis`,`artifact`,`building`,`tribe`,`server`,`troops`]).meta({id:`EffectSource`}),Uu=R([`base`,`bonus`,`bonus-booster`]).meta({id:`EffectType`}),Wu=L({id:Bu,value:N(),type:Uu,scope:Vu,source:Hu,tileId:N().nullable().optional(),sourceSpecifier:N().nullable()}).meta({id:`Effect`}),Gu=Wu.extend({buildingId:H.optional().nullable()}).meta({id:`ApiEffect`}),Ku=(e,t,n)=>{e.exec({sql:`
      UPDATE building_fields
      SET
        level = 0
      WHERE
        village_id = $village_id
        AND field_id = $building_field_id
        AND (field_id BETWEEN 1 AND 18 OR field_id IN (39, 40));
    `,bind:{$village_id:t,$building_field_id:n}}),e.exec({sql:`
      DELETE
      FROM
        building_fields
      WHERE
        village_id = $village_id
        AND field_id = $building_field_id
        AND field_id BETWEEN 19 AND 38;
    `,bind:{$village_id:t,$building_field_id:n}})},K=(e,t)=>e.selectValue({sql:`SELECT tile_id FROM villages WHERE id = $village_id;`,bind:{$village_id:t},schema:N()}),qu=(e,t,n)=>{let r=e.selectObjects({sql:`
  SELECT
    ei.effect AS id,
    e.value,
    et.type,
    es.scope,
    eso.source,
    e.tile_id AS tileId,
    e.source_specifier AS sourceSpecifier,
    CASE
      WHEN e.source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
        THEN bi.building
    END AS buildingId
  FROM
    effects AS e
      LEFT JOIN effect_ids AS ei
                ON ei.id = e.effect_id
      JOIN effect_type_ids AS et ON et.id = e.type_id
      JOIN effect_scope_ids AS es ON es.id = e.scope_id
      JOIN effect_source_ids AS eso ON eso.id = e.source_id
      LEFT JOIN villages AS ev ON ev.tile_id = e.tile_id
      LEFT JOIN building_fields AS bf
                ON e.scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
                  AND bf.village_id = ev.id
                  AND bf.field_id = e.source_specifier
      LEFT JOIN building_ids AS bi
                ON bi.id = bf.building_id
  WHERE
    ei.effect IN (
      'warehouseCapacity',
      'granaryCapacity',
      'woodProduction',
      'clayProduction',
      'ironProduction',
      'wheatProduction',
      'unitWheatConsumption'
    )
    AND (
      e.scope_id IN (SELECT id FROM effect_scope_ids WHERE scope IN ('global', 'server'))
      OR e.tile_id = $tile_id
    );
`,bind:{$tile_id:t},schema:Gu}),{total:i}=G(`warehouseCapacity`,r,t),{total:a}=G(`granaryCapacity`,r,t),{total:o}=G(`woodProduction`,r,t),{total:s}=G(`clayProduction`,r,t),{total:c}=G(`ironProduction`,r,t),{total:l}=G(`wheatProduction`,r,t),{wood:u,clay:d,iron:f,wheat:p,last_updated_at:m}=e.selectObject({sql:`
      SELECT
        rs.updated_at AS last_updated_at,
        rs.wood AS wood,
        rs.clay AS clay,
        rs.iron AS iron,
        rs.wheat AS wheat
      FROM
        resource_sites rs
      WHERE
        rs.tile_id = $tile_id;
    `,bind:{$tile_id:t},schema:ku.extend({last_updated_at:N()})}),{currentAmount:h,lastEffectiveUpdate:ee}=zu({lastKnownResourceAmount:u,lastUpdatedAt:m,hourlyProduction:o,storageCapacity:i,timestamp:n}),{currentAmount:te,lastEffectiveUpdate:ne}=zu({lastKnownResourceAmount:d,lastUpdatedAt:m,hourlyProduction:s,storageCapacity:i,timestamp:n}),{currentAmount:re,lastEffectiveUpdate:g}=zu({lastKnownResourceAmount:f,lastUpdatedAt:m,hourlyProduction:c,storageCapacity:i,timestamp:n}),{currentAmount:ie,lastEffectiveUpdate:ae}=zu({lastKnownResourceAmount:p,lastUpdatedAt:m,hourlyProduction:l,storageCapacity:a,timestamp:n});return{currentWood:h,currentIron:re,currentClay:te,currentWheat:ie,warehouseCapacity:i,granaryCapacity:a,timestamp:n,lastEffectiveWoodUpdate:ee,lastEffectiveClayUpdate:ne,lastEffectiveIronUpdate:g,lastEffectiveWheatUpdate:ae,previousWood:u,previousClay:d,previousIron:f,previousWheat:p,previousUpdatedAt:m}},q=(e,t,n)=>{let{currentWood:r,currentClay:i,currentIron:a,currentWheat:o,lastEffectiveWoodUpdate:s,lastEffectiveClayUpdate:c,lastEffectiveIronUpdate:l,lastEffectiveWheatUpdate:u,previousWood:d,previousClay:f,previousIron:p,previousWheat:m,previousUpdatedAt:h}=qu(e,t,n),ee=Math.max(s,c,l,u);(r!==d||i!==f||a!==p||o!==m||ee!==h)&&e.exec({sql:bu,bind:{$tile_id:t,$wood:r,$clay:i,$iron:a,$wheat:o,$updated_at:ee}})},Ju=(e,t,n,r)=>{let{currentWood:i,currentClay:a,currentIron:o,currentWheat:s,warehouseCapacity:c,granaryCapacity:l}=qu(e,t,n),[u,d,f,p]=r,m=Math.min(i+u,c),h=Math.min(a+d,c),ee=Math.min(o+f,c),te=Math.min(s+p,l);e.exec({sql:bu,bind:{$tile_id:t,$wood:m,$clay:h,$iron:ee,$wheat:te,$updated_at:n}})},Yu=(e,t,n,r)=>{let i=qu(e,t,n),{currentWood:a,currentClay:o,currentIron:s,currentWheat:c}=i,l=r(i),[u=0,d=0,f=0,p=0]=l,m=Math.max(a-u,0),h=Math.max(o-d,0),ee=Math.max(s-f,0),te=Math.max(c-p,0);return e.exec({sql:bu,bind:{$tile_id:t,$wood:m,$clay:h,$iron:ee,$wheat:te,$updated_at:n}}),l},Xu=(e,t,n,r)=>{e.exec({sql:`
      INSERT INTO building_fields (village_id, field_id, building_id, level)
      SELECT $village_id, $field_id, bi.id, 0
      FROM building_ids bi
      WHERE bi.building = $building_id;
    `,bind:{$village_id:t,$field_id:n,$building_id:r}});let i=e.selectValue({sql:Cu,bind:{$village_id:t},schema:W}),a=$l(r).effects(i);e.exec({sql:`
      INSERT INTO effects (
        effect_id,
        value,
        type_id,
        scope_id,
        source_id,
        tile_id,
        source_specifier
      )
      SELECT
        effect_ids.id,
        json_extract(effect.value, '$.value'),
        effect_type_ids.id,
        effect_scope_ids.id,
        effect_source_ids.id,
        (SELECT tile_id FROM villages WHERE id = $village_id),
        $source_specifier
      FROM
        json_each($effects) AS effect
        JOIN effect_ids
          ON effect_ids.effect = json_extract(effect.value, '$.effectId')
        JOIN effect_type_ids
          ON effect_type_ids.type = json_extract(effect.value, '$.type')
        JOIN effect_scope_ids
          ON effect_scope_ids.scope = 'local'
        JOIN effect_source_ids
          ON effect_source_ids.source = 'building';
    `,bind:{$effects:JSON.stringify(a.map(({effectId:e,valuesPerLevel:t,type:n})=>({effectId:e,type:n,value:t[0]}))),$village_id:t,$source_specifier:n}});let{population:o}=ru(r,0);e.exec({sql:_u,bind:{$village_id:t,$value:o}})},Zu=(e,t,n,r)=>{if(n<19||n>38||!e.selectValue({sql:`
      SELECT EXISTS (
        SELECT 1
        FROM building_fields bf
        JOIN building_ids bi ON bi.id = bf.building_id
        WHERE bf.village_id = $village_id
          AND bf.field_id = $building_field_id
          AND bf.level = 0
          AND bi.building = $building_id
      );
    `,bind:{$village_id:t,$building_field_id:n,$building_id:r},schema:V()}))return;e.exec({sql:`
      DELETE FROM effects
      WHERE tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
        AND source_specifier = $building_field_id
        AND source_id = (
          SELECT id FROM effect_source_ids WHERE source = 'building'
        );
    `,bind:{$village_id:t,$building_field_id:n}});let{population:i}=ru(r,0);e.exec({sql:_u,bind:{$village_id:t,$value:-i}}),Ku(e,t,n)},Qu=R([`LEGIONNAIRE`,`PRAETORIAN`,`IMPERIAN`,`EQUITES_IMPERATORIS`,`EQUITES_CAESARIS`,`ROMAN_SCOUT`,`ROMAN_RAM`,`ROMAN_CATAPULT`,`ROMAN_CHIEF`,`ROMAN_SETTLER`]),$u=R([`PHALANX`,`SWORDSMAN`,`THEUTATES_THUNDER`,`DRUIDRIDER`,`HAEDUAN`,`GAUL_SCOUT`,`GAUL_RAM`,`GAUL_CATAPULT`,`GAUL_CHIEF`,`GAUL_SETTLER`]),ed=R([`CLUBSWINGER`,`SPEARMAN`,`AXEMAN`,`PALADIN`,`TEUTONIC_KNIGHT`,`TEUTONIC_SCOUT`,`TEUTONIC_RAM`,`TEUTONIC_CATAPULT`,`TEUTONIC_CHIEF`,`TEUTONIC_SETTLER`]),td=R([`MERCENARY`,`BOWMAN`,`STEPPE_RIDER`,`MARKSMAN`,`MARAUDER`,`HUN_SCOUT`,`HUN_RAM`,`HUN_CATAPULT`,`HUN_CHIEF`,`HUN_SETTLER`]),nd=R([`SLAVE_MILITIA`,`ASH_WARDEN`,`KHOPESH_WARRIOR`,`ANHUR_GUARD`,`RESHEPH_CHARIOT`,`EGYPTIAN_SCOUT`,`EGYPTIAN_RAM`,`EGYPTIAN_CATAPULT`,`EGYPTIAN_CHIEF`,`EGYPTIAN_SETTLER`]),rd=R([`HOPLITE`,`SHIELDSMAN`,`TWINSTEEL_THERION`,`ELPIDA_RIDER`,`CORINTHIAN_CRUSHER`,`SPARTAN_SCOUT`,`SPARTAN_RAM`,`SPARTAN_CATAPULT`,`SPARTAN_CHIEF`,`SPARTAN_SETTLER`]),id=R([`PIKEMAN`,`THORNED_WARRIOR`,`GUARDSMAN`,`AXERIDER`,`NATARIAN_KNIGHT`,`NATARIAN_SCOUT`,`NATARIAN_RAM`,`NATARIAN_CATAPULT`,`NATARIAN_CHIEF`,`NATARIAN_SETTLER`]),ad=R([`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`,`CROCODILE`,`TIGER`,`ELEPHANT`]),J=Wc([z(`HERO`),Qu,$u,ed,td,nd,rd,id,ad]).meta({id:`UnitId`});R([`infantry`,`cavalry`,`siege`,`administration`,`hero`]).meta({id:`UnitId`}),R([`tier-1`,`tier-2`,`tier-3`,`scout`,`tier-4`,`tier-5`,`siege-ram`,`siege-catapult`,`administration`,`settler`,`hero`]).meta({id:`UnitId`});const od=L({unitId:J,amount:N().min(1),tileId:N(),sourceTileId:N()}).meta({id:`Troop`}),sd=Hc({id:N(),type:Pl,startsAt:N(),duration:N(),resolvesAt:N(),villageId:N().nullable()}).meta({id:`BaseEventDto`}),cd={startsAt:N().optional(),duration:N().optional()},ld={villageId:N(),...cd},ud={villageId:Fc(),...cd},dd={...ld,buildingFieldId:N(),buildingId:H,level:N(),previousLevel:N()},fd={...ld,troops:I(od),originTileId:N(),targetTileId:N(),scoutingTarget:jl.optional(),catapultTargets:Nl.optional(),heroOasisAnimalAction:Ml.optional()},pd=L({wood:N(),clay:N(),iron:N(),wheat:N()}),md={...ld,originTileId:N(),targetTileId:N(),targetVillageId:N(),resources:pd},hd={...md,merchantAmount:N()},gd=Bu.extract([`residenceTrainingDuration`,`barracksTrainingDuration`,`greatBarracksTrainingDuration`,`stableTrainingDuration`,`greatStableTrainingDuration`,`workshopTrainingDuration`,`hospitalTrainingDuration`]),_d=Pl.extract([`troopMovementReinforcements`,`troopMovementRelocation`,`troopMovementReturn`,`troopMovementFindNewVillage`,`troopMovementAttack`,`troopMovementRaid`,`troopMovementOasisOccupation`,`troopMovementAdventure`]).or(z(`troopMovementReturnReinforcements`)),vd=Kc(`type`,[L({type:z(`buildingConstruction`),...dd}),L({type:z(`buildingLevelChange`),...dd}),L({type:z(`buildingDestruction`),...dd}),L({type:z(`troopTraining`),...ld,batchId:j(),amount:N(),unitId:J,durationEffectId:gd,buildingId:H}),L({type:z(`unitResearch`),...ld,unitId:J}),L({type:z(`unitImprovement`),...ld,unitId:J,level:N()}),L({type:z(`animalCageProduction`),...ld,cageAmount:N()}),L({type:z(`trapperCageProduction`),...ld,cageAmount:N()}),L({type:z(`huntersLodgeHunt`),...ld,huntingPartyLevel:N()}),L({type:z(`gatherersHutGatheringTrip`),...ld,troops:I(od)}),L({type:Pl.extract([`troopMovementReinforcements`,`troopMovementRelocation`,`troopMovementFindNewVillage`,`troopMovementAttack`,`troopMovementRaid`,`troopMovementOasisOccupation`,`troopMovementAdventure`]),...fd}),L({type:z(`troopMovementReturn`),...fd,originalMovementType:_d,loot:Du.optional()}),L({type:z(`heroRevival`),...ld}),L({type:z(`heroHealthRegeneration`),...ud}),L({type:z(`loyaltyIncrease`),...ud}),L({type:z(`resourceTransfer`),...hd}),L({type:z(`tradeRoute`),...md,interval:N()})]).meta({id:`CreateEventDto`});var yd=class{s;constructor(e=Date.now()){let t=typeof e==`number`?e:[...e.toString()].reduce((e,t)=>e+t.charCodeAt(0),0);this.s=t>>>0}next(){this.s=this.s+1831565813>>>0;let e=this.s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)*23283064365386963e-26}state(){return{s:this.s}}setState({s:e}){this.s=e>>>0}};const bd=(e,t)=>{let n=new yd(e);t&&n.setState(t);let r=()=>n.next();return r.quick=r,r.double=()=>r()+(r()*2097152|0)*11102230246251565e-32,r.int32=()=>r()*4294967296|0,r.state=()=>n.state(),r},xd=(e,t,n)=>Math.floor(e()*(n-t+1)+t),Sd=e=>e[Math.floor(Math.random()*e.length)],Cd=e=>{let t=((Math.min(20,Math.max(1,Math.trunc(e)))-1)/19)**1.114;return Math.round(14*(508/14)**t)},wd=(e,t,n,r)=>{let i=bd(`${e}${n}${r}`);return xd(i,48,72)*6e4/t},Td=e=>{let t=e*4,n=Math.floor(t/4),r=t%4;return Array.from({length:4},(e,t)=>n+ +(t<r))},Ed=(e,t)=>{let n=t.x-e.x,r=t.y-e.y;return Math.sqrt(n**2+r**2)},Dd=(e,t=2)=>Math.round(e*10**t)/10**t,Od=e=>Math.round(e/5)*5,kd=e=>{let t=e/25,n=Math.floor((-1+Math.sqrt(1+4*t))/2),r=n*(n+1)*25,i=(n+1)*(n+2)*25,a=i-e,o=e-r,s=i-r,c=s>0?o/s:1;return{level:n,currentLevelExp:r,expToNextLevel:a,percentToNextLevel:Math.floor(c*100)}},Ad=new Map([[`romans`,[130,115,180,75]],[`teutons`,[180,130,115,75]],[`gauls`,[115,180,130,75]],[`egyptians`,[115,180,130,75]],[`huns`,[180,130,115,75]]]),jd=(e,t)=>Ad.get(e).map(e=>Od(e*(1+t/24)*(t+1))),Md=e=>Math.min((e+1)*15,360)*60*1e3,Nd=(e,t)=>e>0?864e5/e/t:0,Pd=[250,150,350,100],Fd=new Map([[1,[`RAT`,`SPIDER`,`SERPENT`]],[2,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`]],[3,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`]],[4,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`]],[5,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`,`CROCODILE`,`TIGER`,`ELEPHANT`]]]),Id=e=>Fd.get(Math.min(5,Math.max(1,e))),Ld=e=>[0,0,0,e*100],Rd=(e,t)=>e*18e5/t,zd=e=>Math.trunc(60/e*60*1e3),Bd=[35,30,10,20],Vd=[0,10,22,35,49,64,80,97,115,134,154,175,196,218,241,265,290,316,343,371,400],Hd=e=>Vd[Math.max(0,Math.min(20,e))],Ud=[{id:`LEGIONNAIRE`,baseRecruitmentCost:[120,100,150,30],baseRecruitmentDuration:16e5,unitWheatConsumption:1,attack:40,infantryDefence:35,cavalryDefence:50,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`romans`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`PRAETORIAN`,baseRecruitmentCost:[100,130,160,70],baseRecruitmentDuration:176e4,unitWheatConsumption:1,attack:30,infantryDefence:65,cavalryDefence:35,unitSpeed:5,unitCarryCapacity:20,category:`infantry`,tribe:`romans`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1}]},{id:`IMPERIAN`,baseRecruitmentCost:[150,160,210,80],baseRecruitmentDuration:192e4,unitWheatConsumption:1,attack:70,infantryDefence:40,cavalryDefence:25,unitSpeed:7,unitCarryCapacity:50,category:`infantry`,tribe:`romans`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`ROMAN_SCOUT`,baseRecruitmentCost:[140,160,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:16,unitCarryCapacity:0,category:`cavalry`,tribe:`romans`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`EQUITES_IMPERATORIS`,baseRecruitmentCost:[550,440,320,100],baseRecruitmentDuration:264e4,unitWheatConsumption:3,attack:120,infantryDefence:65,cavalryDefence:50,unitSpeed:14,unitCarryCapacity:100,category:`cavalry`,tribe:`romans`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`EQUITES_CAESARIS`,baseRecruitmentCost:[550,640,800,180],baseRecruitmentDuration:352e4,unitWheatConsumption:4,attack:180,infantryDefence:80,cavalryDefence:105,unitSpeed:10,unitCarryCapacity:70,category:`cavalry`,tribe:`romans`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`ROMAN_RAM`,baseRecruitmentCost:[900,360,500,70],baseRecruitmentDuration:46e5,unitWheatConsumption:3,attack:60,infantryDefence:30,cavalryDefence:75,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`romans`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`ROMAN_CATAPULT`,baseRecruitmentCost:[950,1350,600,90],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:75,infantryDefence:60,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`romans`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`ROMAN_CHIEF`,baseRecruitmentCost:[30750,27200,45e3,37500],baseRecruitmentDuration:907e5,unitWheatConsumption:5,attack:50,infantryDefence:40,cavalryDefence:30,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`romans`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`ROMAN_SETTLER`,baseRecruitmentCost:[4600,4200,5800,4400],baseRecruitmentDuration:269e5,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`romans`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],Wd=[{id:`PHALANX`,baseRecruitmentCost:[100,130,55,30],baseRecruitmentDuration:104e4,unitWheatConsumption:1,attack:15,infantryDefence:40,cavalryDefence:50,unitSpeed:7,unitCarryCapacity:35,category:`infantry`,tribe:`gauls`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SWORDSMAN`,baseRecruitmentCost:[140,150,185,60],baseRecruitmentDuration:144e4,unitWheatConsumption:1,attack:65,infantryDefence:35,cavalryDefence:20,unitSpeed:6,unitCarryCapacity:45,category:`infantry`,tribe:`gauls`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`GAUL_SCOUT`,baseRecruitmentCost:[170,150,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:17,unitCarryCapacity:0,category:`cavalry`,tribe:`gauls`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`THEUTATES_THUNDER`,baseRecruitmentCost:[350,450,230,60],baseRecruitmentDuration:248e4,unitWheatConsumption:2,attack:90,infantryDefence:25,cavalryDefence:40,unitSpeed:19,unitCarryCapacity:75,category:`cavalry`,tribe:`gauls`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:3}]},{id:`DRUIDRIDER`,baseRecruitmentCost:[360,330,280,120],baseRecruitmentDuration:256e4,unitWheatConsumption:2,attack:45,infantryDefence:115,cavalryDefence:55,unitSpeed:16,unitCarryCapacity:35,category:`cavalry`,tribe:`gauls`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`HAEDUAN`,baseRecruitmentCost:[500,620,675,170],baseRecruitmentDuration:312e4,unitWheatConsumption:3,attack:140,infantryDefence:60,cavalryDefence:165,unitSpeed:13,unitCarryCapacity:65,category:`cavalry`,tribe:`gauls`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`GAUL_RAM`,baseRecruitmentCost:[950,555,330,75],baseRecruitmentDuration:5e6,unitWheatConsumption:3,attack:50,infantryDefence:30,cavalryDefence:105,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`gauls`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`GAUL_CATAPULT`,baseRecruitmentCost:[960,1450,630,90],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:70,infantryDefence:45,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`gauls`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`GAUL_CHIEF`,baseRecruitmentCost:[30750,45400,31e3,37500],baseRecruitmentDuration:907e5,unitWheatConsumption:4,attack:40,infantryDefence:50,cavalryDefence:50,unitSpeed:5,unitCarryCapacity:0,category:`administration`,tribe:`gauls`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`GAUL_SETTLER`,baseRecruitmentCost:[4400,5600,4200,3900],baseRecruitmentDuration:227e5,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`gauls`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],Gd=[{id:`CLUBSWINGER`,baseRecruitmentCost:[95,75,40,40],baseRecruitmentDuration:72e4,unitWheatConsumption:1,attack:40,infantryDefence:20,cavalryDefence:5,unitSpeed:7,unitCarryCapacity:60,category:`infantry`,tribe:`teutons`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SPEARMAN`,baseRecruitmentCost:[145,70,85,40],baseRecruitmentDuration:112e4,unitWheatConsumption:1,attack:10,infantryDefence:35,cavalryDefence:60,unitSpeed:7,unitCarryCapacity:40,category:`infantry`,tribe:`teutons`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1},{buildingId:`BARRACKS`,level:3}]},{id:`AXEMAN`,baseRecruitmentCost:[130,120,170,70],baseRecruitmentDuration:12e5,unitWheatConsumption:1,attack:60,infantryDefence:30,cavalryDefence:30,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`teutons`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`TEUTONIC_SCOUT`,baseRecruitmentCost:[160,100,50,50],baseRecruitmentDuration:112e4,unitWheatConsumption:1,attack:0,infantryDefence:10,cavalryDefence:5,unitSpeed:9,unitCarryCapacity:0,category:`infantry`,tribe:`teutons`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1},{buildingId:`MAIN_BUILDING`,level:5}]},{id:`PALADIN`,baseRecruitmentCost:[370,270,290,75],baseRecruitmentDuration:24e5,unitWheatConsumption:2,attack:55,infantryDefence:100,cavalryDefence:40,unitSpeed:10,unitCarryCapacity:110,category:`cavalry`,tribe:`teutons`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`TEUTONIC_KNIGHT`,baseRecruitmentCost:[450,515,480,80],baseRecruitmentDuration:296e4,unitWheatConsumption:3,attack:150,infantryDefence:50,cavalryDefence:75,unitSpeed:9,unitCarryCapacity:80,category:`cavalry`,tribe:`teutons`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`TEUTONIC_RAM`,baseRecruitmentCost:[1e3,300,350,70],baseRecruitmentDuration:42e5,unitWheatConsumption:3,attack:65,infantryDefence:30,cavalryDefence:80,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`teutons`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:1}]},{id:`TEUTONIC_CATAPULT`,baseRecruitmentCost:[900,1200,600,60],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:50,infantryDefence:60,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`teutons`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`TEUTONIC_CHIEF`,baseRecruitmentCost:[35500,26600,25e3,27200],baseRecruitmentDuration:705e5,unitWheatConsumption:4,attack:40,infantryDefence:60,cavalryDefence:40,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`teutons`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:5}]},{id:`TEUTONIC_SETTLER`,baseRecruitmentCost:[5800,4400,4600,5200],baseRecruitmentDuration:31e6,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`teutons`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],Kd=[{id:`SLAVE_MILITIA`,baseRecruitmentCost:[45,60,30,15],baseRecruitmentDuration:53e4,unitWheatConsumption:1,attack:10,infantryDefence:30,cavalryDefence:20,unitSpeed:7,unitCarryCapacity:15,category:`infantry`,tribe:`egyptians`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`ASH_WARDEN`,baseRecruitmentCost:[115,100,145,60],baseRecruitmentDuration:132e4,unitWheatConsumption:1,attack:30,infantryDefence:55,cavalryDefence:40,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`egyptians`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1}]},{id:`KHOPESH_WARRIOR`,baseRecruitmentCost:[170,180,220,80],baseRecruitmentDuration:144e4,unitWheatConsumption:1,attack:65,infantryDefence:50,cavalryDefence:20,unitSpeed:7,unitCarryCapacity:45,category:`infantry`,tribe:`egyptians`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`EGYPTIAN_SCOUT`,baseRecruitmentCost:[170,150,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:16,unitCarryCapacity:0,category:`cavalry`,tribe:`egyptians`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`ANHUR_GUARD`,baseRecruitmentCost:[360,330,280,120],baseRecruitmentDuration:256e4,unitWheatConsumption:2,attack:50,infantryDefence:110,cavalryDefence:50,unitSpeed:15,unitCarryCapacity:50,category:`cavalry`,tribe:`egyptians`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`RESHEPH_CHARIOT`,baseRecruitmentCost:[450,560,610,180],baseRecruitmentDuration:324e4,unitWheatConsumption:3,attack:110,infantryDefence:120,cavalryDefence:150,unitSpeed:10,unitCarryCapacity:70,category:`cavalry`,tribe:`egyptians`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`EGYPTIAN_RAM`,baseRecruitmentCost:[995,575,340,80],baseRecruitmentDuration:48e5,unitWheatConsumption:3,attack:55,infantryDefence:30,cavalryDefence:95,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`egyptians`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`EGYPTIAN_CATAPULT`,baseRecruitmentCost:[980,1510,660,100],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:65,infantryDefence:55,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`egyptians`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`EGYPTIAN_CHIEF`,baseRecruitmentCost:[34e3,5e4,34e3,42e3],baseRecruitmentDuration:907e5,unitWheatConsumption:4,attack:40,infantryDefence:50,cavalryDefence:50,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`egyptians`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`EGYPTIAN_SETTLER`,baseRecruitmentCost:[5040,6510,4830,4620],baseRecruitmentDuration:248e5,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`egyptians`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],qd=[{id:`MERCENARY`,baseRecruitmentCost:[130,80,40,40],baseRecruitmentDuration:81e4,unitWheatConsumption:1,attack:35,infantryDefence:40,cavalryDefence:30,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`huns`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`BOWMAN`,baseRecruitmentCost:[140,110,60,60],baseRecruitmentDuration:112e4,unitWheatConsumption:1,attack:50,infantryDefence:30,cavalryDefence:10,unitSpeed:6,unitCarryCapacity:30,category:`infantry`,tribe:`huns`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`HUN_SCOUT`,baseRecruitmentCost:[170,150,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:19,unitCarryCapacity:0,category:`cavalry`,tribe:`huns`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`STEPPE_RIDER`,baseRecruitmentCost:[290,370,190,45],baseRecruitmentDuration:24e5,unitWheatConsumption:2,attack:120,infantryDefence:30,cavalryDefence:15,unitSpeed:16,unitCarryCapacity:75,category:`cavalry`,tribe:`huns`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:3}]},{id:`MARKSMAN`,baseRecruitmentCost:[320,350,330,50],baseRecruitmentDuration:248e4,unitWheatConsumption:2,attack:115,infantryDefence:80,cavalryDefence:70,unitSpeed:16,unitCarryCapacity:105,category:`cavalry`,tribe:`huns`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`MARAUDER`,baseRecruitmentCost:[450,560,610,140],baseRecruitmentDuration:299e4,unitWheatConsumption:3,attack:180,infantryDefence:60,cavalryDefence:40,unitSpeed:14,unitCarryCapacity:80,category:`cavalry`,tribe:`huns`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`HUN_RAM`,baseRecruitmentCost:[1060,330,360,70],baseRecruitmentDuration:44e5,unitWheatConsumption:3,attack:65,infantryDefence:30,cavalryDefence:90,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`huns`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`HUN_CATAPULT`,baseRecruitmentCost:[950,1280,620,60],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:45,infantryDefence:55,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`huns`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`HUN_CHIEF`,baseRecruitmentCost:[37200,27600,25200,27600],baseRecruitmentDuration:907e5,unitWheatConsumption:4,attack:50,infantryDefence:40,cavalryDefence:30,unitSpeed:5,unitCarryCapacity:0,category:`administration`,tribe:`huns`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`HUN_SETTLER`,baseRecruitmentCost:[6100,4600,4800,5400],baseRecruitmentDuration:2895e4,unitWheatConsumption:1,attack:10,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`huns`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],Jd=[{id:`HOPLITE`,baseRecruitmentCost:[110,185,110,40],baseRecruitmentDuration:17e5,unitWheatConsumption:1,attack:50,infantryDefence:35,cavalryDefence:30,unitSpeed:6,unitCarryCapacity:60,category:`infantry`,tribe:`spartans`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SPARTAN_SCOUT`,baseRecruitmentCost:[185,150,35,75],baseRecruitmentDuration:1232e3,unitWheatConsumption:1,attack:0,infantryDefence:40,cavalryDefence:22,unitSpeed:9,unitCarryCapacity:0,category:`infantry`,tribe:`spartans`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1}]},{id:`SHIELDSMAN`,baseRecruitmentCost:[145,95,245,45],baseRecruitmentDuration:1936e3,unitWheatConsumption:1,attack:40,infantryDefence:85,cavalryDefence:45,unitSpeed:8,unitCarryCapacity:40,category:`infantry`,tribe:`spartans`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`TWINSTEEL_THERION`,baseRecruitmentCost:[130,200,400,65],baseRecruitmentDuration:2112e3,unitWheatConsumption:1,attack:90,infantryDefence:55,cavalryDefence:40,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`spartans`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10}]},{id:`ELPIDA_RIDER`,baseRecruitmentCost:[555,445,330,110],baseRecruitmentDuration:2816e3,unitWheatConsumption:2,attack:55,infantryDefence:120,cavalryDefence:90,unitSpeed:16,unitCarryCapacity:110,category:`cavalry`,tribe:`spartans`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`CORINTHIAN_CRUSHER`,baseRecruitmentCost:[660,495,995,165],baseRecruitmentDuration:3432e3,unitWheatConsumption:3,attack:195,infantryDefence:80,cavalryDefence:75,unitSpeed:9,unitCarryCapacity:80,category:`cavalry`,tribe:`spartans`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:10}]},{id:`SPARTAN_RAM`,baseRecruitmentCost:[525,260,790,130],baseRecruitmentDuration:462e4,unitWheatConsumption:3,attack:65,infantryDefence:30,cavalryDefence:80,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`spartans`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`SPARTAN_CATAPULT`,baseRecruitmentCost:[550,1240,825,125],baseRecruitmentDuration:0,unitWheatConsumption:6,attack:50,infantryDefence:60,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`spartans`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`SPARTAN_CHIEF`,baseRecruitmentCost:[33450,30665,36240,13935],baseRecruitmentDuration:7755e4,unitWheatConsumption:1,attack:40,infantryDefence:60,cavalryDefence:40,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`spartans`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`SPARTAN_SETTLER`,baseRecruitmentCost:[5115,5580,6045,3255],baseRecruitmentDuration:341e5,unitWheatConsumption:1,attack:10,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`spartans`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],Yd=[{id:`RAT`,baseRecruitmentCost:[85,75,120,25],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:10,infantryDefence:25,cavalryDefence:20,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SPIDER`,baseRecruitmentCost:[125,130,60,40],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:20,infantryDefence:35,cavalryDefence:40,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`SERPENT`,baseRecruitmentCost:[140,150,40,60],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:60,infantryDefence:40,cavalryDefence:60,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`BAT`,baseRecruitmentCost:[95,120,65,25],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:80,infantryDefence:66,cavalryDefence:50,unitSpeed:20,unitCarryCapacity:0,category:`cavalry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`WILD_BOAR`,baseRecruitmentCost:[250,200,125,45],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:50,infantryDefence:70,cavalryDefence:33,unitSpeed:20,unitCarryCapacity:0,category:`cavalry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`WOLF`,baseRecruitmentCost:[250,125,250,150],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:100,infantryDefence:80,cavalryDefence:70,unitSpeed:20,unitCarryCapacity:0,category:`cavalry`,tribe:`nature`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[]},{id:`BEAR`,baseRecruitmentCost:[250,220,135,50],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:250,infantryDefence:140,cavalryDefence:200,unitSpeed:20,unitCarryCapacity:0,category:`siege`,tribe:`nature`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[]},{id:`CROCODILE`,baseRecruitmentCost:[240,125,250,300],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:450,infantryDefence:380,cavalryDefence:240,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[]},{id:`TIGER`,baseRecruitmentCost:[350,350,125,80],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:200,infantryDefence:170,cavalryDefence:250,unitSpeed:20,unitCarryCapacity:0,category:`siege`,tribe:`nature`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[]},{id:`ELEPHANT`,baseRecruitmentCost:[350,250,135,100],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:600,infantryDefence:440,cavalryDefence:520,unitSpeed:20,unitCarryCapacity:3e3,category:`administration`,tribe:`nature`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[]}],Xd=[{id:`PIKEMAN`,baseRecruitmentCost:[100,100,100,50],baseRecruitmentDuration:12e4,unitWheatConsumption:1,attack:20,infantryDefence:35,cavalryDefence:50,unitSpeed:6,unitCarryCapacity:10,category:`infantry`,tribe:`natars`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`THORNED_WARRIOR`,baseRecruitmentCost:[100,100,100,50],baseRecruitmentDuration:12e4,unitWheatConsumption:1,attack:65,infantryDefence:30,cavalryDefence:10,unitSpeed:7,unitCarryCapacity:55,category:`infantry`,tribe:`natars`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`GUARDSMAN`,baseRecruitmentCost:[150,150,150,150],baseRecruitmentDuration:18e4,unitWheatConsumption:1,attack:100,infantryDefence:90,cavalryDefence:75,unitSpeed:6,unitCarryCapacity:40,category:`infantry`,tribe:`natars`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`NATARIAN_SCOUT`,baseRecruitmentCost:[50,50,50,75],baseRecruitmentDuration:3e4,unitWheatConsumption:1,attack:0,infantryDefence:10,cavalryDefence:10,unitSpeed:25,unitCarryCapacity:0,category:`cavalry`,tribe:`natars`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`AXERIDER`,baseRecruitmentCost:[300,150,150,100],baseRecruitmentDuration:24e4,unitWheatConsumption:2,attack:155,infantryDefence:80,cavalryDefence:50,unitSpeed:14,unitCarryCapacity:90,category:`cavalry`,tribe:`natars`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`NATARIAN_KNIGHT`,baseRecruitmentCost:[250,250,400,150],baseRecruitmentDuration:12e5,unitWheatConsumption:3,attack:170,infantryDefence:140,cavalryDefence:80,unitSpeed:12,unitCarryCapacity:0,category:`cavalry`,tribe:`natars`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`NATARIAN_RAM`,baseRecruitmentCost:[400,300,300,400],baseRecruitmentDuration:9e5,unitWheatConsumption:4,attack:250,infantryDefence:120,cavalryDefence:150,unitSpeed:5,unitCarryCapacity:0,category:`siege`,tribe:`natars`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`NATARIAN_CATAPULT`,baseRecruitmentCost:[1e3,1e3,1e3,1e3],baseRecruitmentDuration:18e5,unitWheatConsumption:5,attack:60,infantryDefence:45,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`natars`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`NATARIAN_CHIEF`,baseRecruitmentCost:[5e4,5e4,5e4,25e3],baseRecruitmentDuration:907e5,unitWheatConsumption:1,attack:80,infantryDefence:50,cavalryDefence:50,unitSpeed:5,unitCarryCapacity:0,category:`administration`,tribe:`natars`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`NATARIAN_SETTLER`,baseRecruitmentCost:[7500,7500,7500,3750],baseRecruitmentDuration:227e5,unitWheatConsumption:1,attack:30,infantryDefence:40,cavalryDefence:40,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`natars`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],Zd=[{id:`HERO`,baseRecruitmentCost:[0,0,0,0],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:100,infantryDefence:100,cavalryDefence:100,unitSpeed:7,unitCarryCapacity:0,category:`hero`,tribe:`all`,tier:`hero`,recruitmentRequirements:[],researchRequirements:[]}],Qd=[...Ud,...Wd,...Gd,...Kd,...qd,...Jd,...Yd,...Xd,...Zd],$d=new Map(Qd.map(e=>[e.id,e])),ef=e=>$d.get(e),tf=(e,t)=>{let{baseRecruitmentCost:n}=ef(e);return n.map(e=>Math.ceil(5*e*1.2**(t-1)/5)*5)},nf=(e,t)=>{let{baseRecruitmentDuration:n}=ef(e);return Math.ceil(n*1.15**(t-1)/10)*10},rf=e=>{let{baseRecruitmentCost:t,category:n,tier:r}=ef(e),i=r===`scout`||n===`infantry`?10:n===`cavalry`?7:n===`siege`?5:1.5;return t.map(e=>Math.ceil(e*i/5)*5)},af=e=>{let{baseRecruitmentDuration:t,tier:n,category:r}=ef(e);return Math.ceil(t*(n===`scout`||r===`infantry`?8:r===`cavalry`?5:r===`siege`?3:2)/5)*5},of=Wc([z(100),z(200),z(300)]).meta({id:`ServerMapSize`}),sf=Wc([z(1),z(2),z(3),z(5),z(10)]).meta({id:`ServerSpeed`}),cf=L({id:j(),version:j(),name:j(),slug:j(),created_at:N(),seed:j(),map_size:of,speed:sf,player_name:j(),player_tribe:mu}).transform(e=>({id:e.id,version:e.version,name:e.name,slug:e.slug,createdAt:e.created_at,seed:e.seed,configuration:{mapSize:e.map_size,speed:e.speed},playerConfiguration:{name:e.player_name,tribe:e.player_tribe}})).meta({id:`ServerDb`}),lf=L({id:j(),version:j(),name:j(),slug:j(),createdAt:N(),seed:j(),configuration:L({mapSize:of,speed:sf}),playerConfiguration:L({name:j(),tribe:mu})}).meta({id:`Server`});var uf=class e extends Error{static name=`OutdatedDatabaseSchemaError`;constructor(){super(`Your game world version is outdated.`),this.name=e.name,Object.setPrototypeOf(this,e.prototype)}},df=class e extends Error{static name=`BuildingConstructionQueueFullError`;constructor(){super(`Building construction queue is full`),this.name=e.name,Object.setPrototypeOf(this,e.prototype)}};const ff=e=>{let[t,n,r,...i]=[...e];return[t,n,r,i.join(``)].map(e=>Number.parseInt(e,10))},pf=new Map([...new Map([[`wood`,0],[`clay`,1],[`iron`,2],[`wheat`,3]]).entries()].map(([e,t])=>[t,e])),mf=e=>{let t=e&15,n=e>>4&7,r=e>>7&3,i=e>>9&7,a=e>>12&3;return{oasisResource:pf.get(a),oasisGroup:i,oasisGroupPositions:`${r}-${n}`,variant:t}},hf=e=>{let t=(e%2==0?e:e+1)+4,n=t+1,r=Math.floor(t/2),i=(r-2)**2;return{gridSize:n,totalSize:t,halfSize:r,borderWidth:4,totalTiles:n**2,mapBorderThreshold:i}},gf=(e,t)=>{let{gridSize:n,halfSize:r}=hf(t),i=e-1,a=i%n,o=Math.floor(i/n);return{x:-r+a,y:r-o}},_f=(e,t,n)=>Ed(gf(e,n),gf(t,n)),vf=e=>{let{originTileId:t,targetTileId:n,mapSize:r,troops:i,effects:a}=e,o=Ed(gf(t,r),gf(n,r)),s=i.map(({unitId:e})=>{let{unitSpeed:t}=ef(e);return t}),c=Math.min(...s),{total:l}=G(`unitSpeed`,a,t),u=c*l;if(o<=20)return o/u*36e5;let d=o-20,f=20/u,{total:p}=G(`unitSpeedAfter20Fields`,a,t);return(f+d/(u*p))*36e5},yf=new Set([`HOSPITAL`,`ASCLEPEION`]),bf=e=>yf.has(e),xf=e=>e===`ASCLEPEION`,Sf=e=>e===`HOSPITAL`,Cf=e=>e.type===`buildingConstruction`,wf=e=>e.type===`buildingDestruction`,Tf=e=>e.type===`buildingLevelChange`,Ef=e=>Tf(e)&&e.previousLevel>e.level||wf(e),Df=new Set([`buildingConstruction`,`buildingLevelChange`,`buildingDestruction`]),Of=e=>Df.has(e.type),kf=new Set([`troopMovementReinforcements`,`troopMovementRelocation`,`troopMovementReturn`,`troopMovementFindNewVillage`,`troopMovementAttack`,`troopMovementRaid`,`troopMovementOasisOccupation`,`troopMovementAdventure`]),Af=e=>kf.has(e.type),jf=e=>e.type===`troopMovementReinforcements`,Mf=e=>e.type===`troopMovementRelocation`,Nf=e=>e.type===`troopMovementReturn`,Pf=e=>Nf(e)&&e.originalMovementType===`troopMovementReturnReinforcements`,Ff=e=>e.type===`troopMovementFindNewVillage`,If=e=>e.type===`troopMovementAttack`,Lf=e=>e.type===`troopMovementRaid`,Rf=e=>e.type===`troopMovementOasisOccupation`,zf=e=>e.type===`troopMovementAdventure`,Bf=e=>e.type===`unitImprovement`,Vf=e=>e.type===`unitResearch`,Hf=e=>e.type===`troopTraining`,Uf=e=>e.type===`animalCageProduction`,Wf=e=>e.type===`trapperCageProduction`,Gf=e=>e.type===`huntersLodgeHunt`,Kf=e=>e.type===`gatherersHutGatheringTrip`,qf=e=>e.type===`heroRevival`,Jf=e=>e.type===`heroHealthRegeneration`,Yf=e=>e.type===`loyaltyIncrease`,Xf=e=>e.type===`resourceTransfer`,Zf=e=>e.type===`tradeRoute`,Qf=`
  SELECT map_size
  FROM
    servers
  LIMIT 1;
`,$f=`
  SELECT
    EXISTS
    (
      SELECT 1
      FROM
        unit_research
      WHERE
        village_id = $village_id
        AND unit_id = (
          SELECT id
          FROM
            unit_ids
          WHERE
            unit = $unit_id
          )
      ) AS is_researched;
`,ep=36e5,tp=(e,t,n,r,i)=>{let a=Math.max(r,e),o=Math.min(i,t);if(o<=a)return 0;let s=Math.floor((a-e)/n)+1,c=Math.floor((o-e)/n);return Math.max(0,c-s+1)},np=(e,t)=>{let n=Math.trunc(8/t*ep),r=Math.trunc(16/t*ep),i=Math.trunc(24/t*ep),a=e+6048e5;return{firstPhaseDuration:n,secondPhaseDuration:r,thirdPhaseDuration:i,secondPhaseStartAt:a,thirdPhaseStartAt:a+Math.ceil(19872e5/r)*r}},rp=(e,t,n,r)=>{if(r<=n)return 0;let{firstPhaseDuration:i,secondPhaseDuration:a,thirdPhaseDuration:o,secondPhaseStartAt:s,thirdPhaseStartAt:c}=np(e,t);return tp(e,s,i,n,r)+tp(s,c,a,n,r)+tp(c,1/0,o,n,r)},ip=(e,t,n)=>{let{firstPhaseDuration:r,secondPhaseDuration:i,thirdPhaseDuration:a,secondPhaseStartAt:o,thirdPhaseStartAt:s}=np(e,n);return t<o?{segmentStartAt:e,intervalDuration:r}:t<s?{segmentStartAt:o,intervalDuration:i}:{segmentStartAt:s,intervalDuration:a}},ap=(e,t,n)=>{let{intervalDuration:r,segmentStartAt:i}=ip(e,n,t);return i+(Math.floor((n-i)/r)+1)*r},op=(e,t)=>{let n=+!!t,{seed:r,speed:i,completed:a}=e.selectObject({sql:`
      SELECT
        (
          SELECT
            seed
          FROM
            servers
          LIMIT 1
          ) AS seed,
        (
          SELECT
            speed
          FROM
            servers
          LIMIT 1
          ) AS speed,
        (
          SELECT ha.completed - $completed_adventure_count_modifier
          FROM
            hero_adventures ha
              JOIN heroes h ON ha.hero_id = h.id
          WHERE
            h.player_id = $player_id
          ) AS completed
    `,bind:{$player_id:1,$completed_adventure_count_modifier:n},schema:L({seed:j(),speed:N(),completed:N()})}),o=bd(`${r}${a}`);return xd(o,8,12)*6e4/i},sp=L({available:N(),completed:N(),lastUpdatedAt:N(),createdAt:N(),speed:sf}),cp=(e,t,n)=>{let r=e.selectObject({sql:`
      SELECT
        ha.available,
        ha.completed,
        ha.last_updated_at AS lastUpdatedAt,
        s.created_at AS createdAt,
        s.speed
      FROM
        hero_adventures ha
          CROSS JOIN servers s
      WHERE
        ha.hero_id = $hero_id
    `,bind:{$hero_id:t},schema:sp}),i=rp(r.createdAt,r.speed,r.lastUpdatedAt,n);return{...r,available:r.available+i,nextAvailableAt:ap(r.createdAt,r.speed,n)}},lp=(e,t)=>{let n=e.selectValue({sql:`SELECT id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:1},schema:N()});return cp(e,n,t)},up=(e,t,n)=>{let r=cp(e,t,n);return e.exec({sql:`
      UPDATE hero_adventures
      SET
        available = $available,
        last_updated_at = $last_updated_at
      WHERE
        hero_id = $hero_id
    `,bind:{$hero_id:t,$available:r.available,$last_updated_at:n}}),r},dp=(e,t)=>{let n=t.get(e.buildingId);return n!==void 0&&n>=e.level},fp=(e,t,n,r)=>{let i=n.get(e.id),a=i!==void 0,o=r.has(e.id),s=i===e.maxLevel,c=!a&&!o,l=c||s;return t.amount>1?l:c},pp=(e,t)=>e.tribe===t,mp=(e,t,n,r,i)=>{switch(t.type){case`building`:return dp(t,r);case`tribe`:return pp(t,n);case`amount`:return fp(e,t,r,i)}},hp=e=>{let{building:t,tribe:n,maxLevelByBuildingId:r,buildingIdsInQueue:i}=e,{buildingRequirements:a}=t,o=a.map(e=>{let a=mp(t,e,n,r,i);return{...e,fulfilled:a}});return{canBuild:o.every(({fulfilled:e})=>e),assessedRequirements:o}},gp=L({buildingId:H,level:N()}),_p=(e,t,n,r={})=>{let i=e.selectValue({sql:Cu,bind:{$village_id:t},schema:W}),a=e.selectObjects({sql:`
      SELECT bi.building AS buildingId, MAX(bf.level) AS level
      FROM building_fields bf
      JOIN building_ids bi ON bi.id = bf.building_id
      WHERE bf.village_id = $village_id
        AND NOT (
          bf.field_id = $building_field_id
          AND bf.level = 0
        )
      GROUP BY bi.building;
    `,bind:{$village_id:t,$building_field_id:r.buildingFieldId??null},schema:gp}),o=e.selectValues({sql:`
      SELECT DISTINCT buildingId
      FROM (
        SELECT JSON_EXTRACT(e.meta, '$.buildingId') AS buildingId
        FROM events e
        WHERE e.village_id = $village_id
          AND (
            e.type = 'buildingConstruction'
            OR e.type = 'buildingScheduledConstruction'
            OR (
              e.type = 'buildingLevelChange'
              AND CAST(JSON_EXTRACT(e.meta, '$.level') AS INTEGER) >
                  CAST(JSON_EXTRACT(e.meta, '$.previousLevel') AS INTEGER)
            )
          )

        UNION

        SELECT bi.building AS buildingId
        FROM scheduled_building_upgrades sbu
        JOIN building_ids bi ON bi.id = sbu.building_id
        WHERE sbu.village_id = $village_id
          AND sbu.id IS NOT $excluded_scheduled_building_upgrade_id
      );
    `,bind:{$village_id:t,$excluded_scheduled_building_upgrade_id:r.excludedScheduledBuildingUpgradeId??null},schema:H}),{canBuild:s}=hp({building:$l(n),tribe:i,maxLevelByBuildingId:new Map(a.map(({buildingId:e,level:t})=>[e,t])),buildingIdsInQueue:new Set(o)});if(!s)throw Error(`Building requirements are not met`)},vp=new Map([{tribe:`gauls`,merchantSpeed:24,merchantCapacity:750},{tribe:`romans`,merchantSpeed:16,merchantCapacity:500},{tribe:`teutons`,merchantSpeed:12,merchantCapacity:1e3},{tribe:`huns`,merchantSpeed:20,merchantCapacity:500},{tribe:`egyptians`,merchantSpeed:16,merchantCapacity:750},{tribe:`spartans`,merchantSpeed:14,merchantCapacity:500},{tribe:`nature`,merchantSpeed:12,merchantCapacity:1500},{tribe:`natars`,merchantSpeed:12,merchantCapacity:1500}].map(e=>[e.tribe,e])),yp=L({id:N(),tileId:N(),playerId:N(),tribe:W}),bp=(e,t)=>e.selectObject({sql:`
      SELECT
        v.id,
        v.tile_id AS tileId,
        v.player_id AS playerId,
        ti.tribe
      FROM
        villages v
          JOIN players p ON p.id = v.player_id
          JOIN tribe_ids ti ON ti.id = p.tribe_id
      WHERE
        v.id = $village_id;
    `,bind:{$village_id:t},schema:yp}),xp=(e,t)=>e.selectObject({sql:`
      SELECT
        v.id,
        v.tile_id AS tileId,
        v.player_id AS playerId,
        ti.tribe
      FROM
        villages v
          JOIN players p ON p.id = v.player_id
          JOIN tribe_ids ti ON ti.id = p.tribe_id
      WHERE
        v.tile_id = $tile_id;
    `,bind:{$tile_id:t},schema:yp}),Sp=(e,t)=>e.selectValue({sql:Tu,bind:{$village_id:t,$building_id:`MARKETPLACE`},schema:N().nullable()})??0,Cp=(e,t)=>e.selectValue({sql:`
      SELECT COALESCE(SUM(CAST(JSON_EXTRACT(meta, '$.merchantAmount') AS INTEGER)), 0)
      FROM
        events
      WHERE
        village_id = $village_id
        AND type = 'resourceTransfer';
    `,bind:{$village_id:t},schema:N()}),wp=(e,t)=>Sp(e,t)-Cp(e,t),Tp=(e,t)=>Math.ceil(Ep(e)/t),Ep=e=>e.wood+e.clay+e.iron+e.wheat,Dp=(e,t,n,r)=>{let{mapSize:i,speed:a}=e.selectObject({sql:`
      SELECT
        map_size AS mapSize,
        speed
      FROM
        servers
      LIMIT 1;
    `,schema:L({mapSize:N(),speed:sf})});return _f(t,n,i)/(r*a)*36e5},Op=(e,t)=>{let n=e.selectValue({sql:xu,bind:{$village_id:t},schema:N()});return G(`merchantCapacity`,e.selectObjects({sql:hu,bind:{$effect_id:`merchantCapacity`,$village_id:t},schema:Gu}),n).total},kp=(e,t)=>{let n=bp(e,t);return{village:n,merchant:{...vp.get(n.tribe),merchantCapacity:Op(e,t)},marketplaceLevel:Sp(e,t),usedMerchantAmount:Cp(e,t)}},Ap=(e,t)=>{let n=xp(e,t);return{village:n,merchant:{...vp.get(n.tribe),merchantCapacity:Op(e,n.id)},marketplaceLevel:Sp(e,n.id),usedMerchantAmount:Cp(e,n.id)}},jp=(e,t)=>{e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND quest_id LIKE 'adventureCount-%'
        AND substr(quest_id, length('adventureCount-') + 1) GLOB '[0-9]*'
        AND (
          SELECT COALESCE (
          MAX (
          ha.completed)
          , 0)
          FROM hero_adventures ha
          JOIN heroes h ON ha.hero_id = h.id
          WHERE h.player_id = $player_id
        ) >= CAST (
        substr(
        quest_id
        , LENGTH (
        'adventureCount-') + 1) AS INTEGER);
    `,bind:{$completed_at:t,$player_id:1}})},Mp=(e,t)=>{e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND village_id IS NULL
        AND quest_id LIKE 'queuedTroopCount-%'
        AND substr(quest_id, length('queuedTroopCount-') + 1) GLOB '[0-9]*'
        AND (
          (
            SELECT COALESCE(SUM(uth.amount), 0)
            FROM unit_training_history uth
            JOIN villages v ON uth.village_id = v.id
            WHERE v.player_id = $player_id
          )
          +
          (
            SELECT COUNT(*)
            FROM events e
            JOIN villages v ON e.village_id = v.id
            WHERE
              e.type = 'troopTraining'
              AND v.player_id = $player_id
          )
        ) >= CAST (
        substr(
        quest_id
        , LENGTH (
        'queuedTroopCount-') + 1) AS INTEGER);
    `,bind:{$completed_at:t,$player_id:1}})},Np=(e,t,n)=>{e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND village_id IS NULL
        AND quest_id LIKE 'queuedTroopCountById-' || $unit_id || '-%'
        AND substr(quest_id, length('queuedTroopCountById-' || $unit_id || '-') + 1) GLOB '[0-9]*'
        AND (
          (
            SELECT COALESCE(SUM(uth.amount), 0)
            FROM unit_training_history uth
            JOIN unit_ids ui ON uth.unit_id = ui.id
            JOIN villages v ON uth.village_id = v.id
            WHERE
              v.player_id = $player_id
              AND ui.unit = $unit_id
          )
          +
          (
            SELECT COUNT(*)
            FROM events e
            JOIN villages v ON e.village_id = v.id
            WHERE
              e.type = 'troopTraining'
              AND v.player_id = $player_id
              AND JSON_EXTRACT(e.meta, '$.unitId') = $unit_id
          )
        ) >= CAST (
        substr(
        quest_id
        , length('queuedTroopCountById-' || $unit_id || '-') + 1) AS INTEGER);
    `,bind:{$completed_at:n,$unit_id:t,$player_id:1}})},Pp=(e,t,n)=>{e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND village_id IS NULL
        AND quest_id LIKE 'captureAnimalCountById-' || $unit_id || '-%'
        AND substr(quest_id, length('captureAnimalCountById-' || $unit_id || '-') + 1) GLOB '[0-9]*'
        AND (
          SELECT COALESCE(SUM(hpru.amount), 0)
          FROM hunting_party_report_units hpru
          JOIN unit_ids ui ON ui.id = hpru.unit_id
          JOIN hunting_party_reports hpr ON hpr.id = hpru.hunting_party_report_id
          JOIN reports r ON r.id = hpr.report_id
          JOIN villages v ON v.id = r.village_id
          WHERE
            v.player_id = $player_id
            AND ui.unit = $unit_id
        ) >= CAST (
        substr(
        quest_id
        , length('captureAnimalCountById-' || $unit_id || '-') + 1) AS INTEGER);
    `,bind:{$completed_at:n,$unit_id:t,$player_id:1}})},Fp=(e,t)=>{e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND village_id IS NULL
        AND quest_id LIKE 'captureAnimalKindCount-%'
        AND substr(quest_id, length('captureAnimalKindCount-') + 1) GLOB '[0-9]*'
        AND (
          SELECT COUNT(*)
          FROM (
            SELECT ui.unit
            FROM hunting_party_report_units hpru
            JOIN unit_ids ui ON ui.id = hpru.unit_id
            JOIN hunting_party_reports hpr ON hpr.id = hpru.hunting_party_report_id
            JOIN reports r ON r.id = hpr.report_id
            JOIN villages v ON v.id = r.village_id
            WHERE
              v.player_id = $player_id
              AND ui.unit IN (
                SELECT value
                FROM json_each($unit_ids)
              )
            GROUP BY ui.unit
            HAVING SUM(hpru.amount) > 0
          )
        ) >= CAST (
        substr(
        quest_id
        , LENGTH (
        'captureAnimalKindCount-') + 1) AS INTEGER);
    `,bind:{$completed_at:t,$player_id:1,$unit_ids:JSON.stringify(Id(5))}})},Ip=(e,t)=>{e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND village_id IS NULL
        AND quest_id LIKE 'gatheredResourceCount-%'
        AND substr(quest_id, length('gatheredResourceCount-') + 1) GLOB '[0-9]*'
        AND (
          SELECT COALESCE(
            SUM(
              ger.loot_wood +
              ger.loot_clay +
              ger.loot_iron +
              ger.loot_wheat
            ),
            0
          )
          FROM gathering_expedition_reports ger
          JOIN reports r ON r.id = ger.report_id
          JOIN villages v ON v.id = r.village_id
          WHERE v.player_id = $player_id
        ) >= CAST (
        substr(
        quest_id
        , LENGTH (
        'gatheredResourceCount-') + 1) AS INTEGER);
    `,bind:{$completed_at:t,$player_id:1}})},Lp=(e,t,n,r,i)=>{let a=`oneOf-${n}-${r}`,o=`every-${n}-${r}`;e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND quest_id = $quest_id
        AND village_id = $village_id
        AND EXISTS
        (
          SELECT 1
          FROM
            building_fields bf
          JOIN building_ids bi ON bi.id = bf.building_id
          WHERE
            bf.village_id = $village_id
            AND bi.building = $building_id
            AND bf.level >= $level
          );
    `,bind:{$completed_at:i,$quest_id:a,$village_id:t,$building_id:n,$level:r}}),e.exec({sql:`
      UPDATE quests
      SET
        completed_at = $completed_at
      WHERE
        completed_at IS NULL
        AND quest_id = $everyQuestId
        AND village_id = $village_id
        AND (
              SELECT COUNT(*)
              FROM
                building_fields bf
              JOIN building_ids bi ON bi.id = bf.building_id
              WHERE
                bf.village_id = $village_id
                AND bi.building = $building_id
                AND bf.level >= $level
              ) = (
              SELECT COUNT(*)
              FROM
                building_fields bf
              JOIN building_ids bi ON bi.id = bf.building_id
              WHERE
                bf.village_id = $village_id
                AND bi.building = $building_id
              )
        AND (
              SELECT COUNT(*)
              FROM
                building_fields bf
              JOIN building_ids bi ON bi.id = bf.building_id
              WHERE
                bf.village_id = $village_id
                AND bi.building = $building_id
              ) > 0;
    `,bind:{$completed_at:i,$everyQuestId:o,$village_id:t,$building_id:n,$level:r}})},Y=L({x:N(),y:N()}).meta({id:`Coordinates`}),Rp=R([`player`,`npc1`,`npc2`,`npc3`,`npc4`,`npc5`,`npc6`,`npc7`,`npc8`]).meta({id:`Faction`}),zp=L({id:N(),name:j(),slug:j(),tribe:W,faction:Rp}).meta({id:`Player`}),Bp=R([`4446`,`5436`,`5346`,`4536`,`3546`,`4356`,`3456`,`4437`,`4347`,`3447`,`3339`,`11115`,`00018`]).meta({id:`ResourceFieldComposition`,description:`The composition of resource fields in a village.`,example:`4446`}),Vp=L({id:N(),name:j(),slug:j().nullable(),population:N()}).meta({id:`TileVillage`}),Hp=R([`free`,`oasis`]).meta({id:`TileType`}),Up=L({id:N(),coordinates:Y,type:Hp,owner:zp.nullable(),ownerVillage:Vp.nullable()}).meta({id:`BaseTile`}),Wp=Up.extend({type:z(`free`),attributes:L({resourceFieldComposition:Bp}),item:L({id:N()}).nullable()}).meta({id:`BaseOccupiableTile`}),Gp=Wp.extend({owner:zp,ownerVillage:Vp}).meta({id:`OccupiedOccupiableTile`}),Kp=Wp.extend({owner:z(null),ownerVillage:z(null)}).meta({id:`UnoccupiedOccupiableTile`}),qp=Up.extend({type:z(`oasis`),attributes:L({oasisGraphics:N(),isOccupiable:F()})}).meta({id:`BaseOasisTile`}),Jp=qp.extend({owner:zp,ownerVillage:Vp}).meta({id:`OccupiedOasisTile`}),Yp=qp.extend({owner:z(null),ownerVillage:z(null)}).meta({id:`UnoccupiedOasisTile`});Kc(`type`,[Wp,qp]).meta({id:`Tile`}),Wc([Gp,Kp]).meta({id:`OccupiableTile`}),Wc([Jp,Yp]).meta({id:`OasisTile`});const Xp=(e,t)=>{if(t.length===1){let n=t[0];e.exec({sql:`
        INSERT INTO troops (unit_id, amount, tile_id, source_tile_id)
        VALUES (
          (SELECT id FROM unit_ids WHERE unit = $unit_id),
          $amount,
          $tile_id,
          $source_tile_id
        )
        ON CONFLICT (unit_id, tile_id, source_tile_id) DO UPDATE SET
          amount = troops.amount + EXCLUDED.amount;
      `,bind:{$unit_id:n.unitId,$amount:n.amount,$tile_id:n.tileId,$source_tile_id:n.sourceTileId}});return}e.exec({sql:`
      INSERT INTO troops (unit_id, amount, tile_id, source_tile_id)
      SELECT
        unit_ids.id,
        SUM(json_extract(troop.value, '$.amount')),
        json_extract(troop.value, '$.tileId'),
        json_extract(troop.value, '$.sourceTileId')
      FROM
        json_each($troops) AS troop
        CROSS JOIN unit_ids
      WHERE
        unit_ids.unit = json_extract(troop.value, '$.unitId')
      GROUP BY
        unit_ids.id,
        json_extract(troop.value, '$.tileId'),
        json_extract(troop.value, '$.sourceTileId')
      ON CONFLICT (unit_id, tile_id, source_tile_id) DO UPDATE SET
        amount = troops.amount + EXCLUDED.amount;
    `,bind:{$troops:JSON.stringify(t)}})},Zp=(e,t)=>{if(t.length===1){let n=t[0],r={$unit_id:n.unitId,$amount:n.amount,$tile_id:n.tileId,$source_tile_id:n.sourceTileId};e.exec({sql:`
        DELETE FROM troops
        WHERE
          unit_id = (SELECT id FROM unit_ids WHERE unit = $unit_id)
          AND tile_id = $tile_id
          AND source_tile_id = $source_tile_id
          AND amount <= $amount;
      `,bind:r}),e.exec({sql:`
        UPDATE troops
        SET amount = amount - $amount
        WHERE
          unit_id = (SELECT id FROM unit_ids WHERE unit = $unit_id)
          AND tile_id = $tile_id
          AND source_tile_id = $source_tile_id
          AND amount > $amount;
      `,bind:r});return}e.exec({sql:`
      WITH requested_troops AS (
        SELECT
          unit_ids.id AS unit_id,
          json_extract(troop.value, '$.tileId') AS tile_id,
          json_extract(troop.value, '$.sourceTileId') AS source_tile_id,
          SUM(json_extract(troop.value, '$.amount')) AS amount
        FROM
          json_each($troops) AS troop
          JOIN unit_ids
            ON unit_ids.unit = json_extract(troop.value, '$.unitId')
        GROUP BY unit_ids.id, tile_id, source_tile_id
      )
      DELETE FROM troops
      WHERE EXISTS (
        SELECT 1
        FROM requested_troops
        WHERE
          requested_troops.unit_id = troops.unit_id
          AND requested_troops.tile_id = troops.tile_id
          AND requested_troops.source_tile_id = troops.source_tile_id
          AND troops.amount <= requested_troops.amount
      );
    `,bind:{$troops:JSON.stringify(t)}}),e.exec({sql:`
      WITH requested_troops AS (
        SELECT
          unit_ids.id AS unit_id,
          json_extract(troop.value, '$.tileId') AS tile_id,
          json_extract(troop.value, '$.sourceTileId') AS source_tile_id,
          SUM(json_extract(troop.value, '$.amount')) AS amount
        FROM
          json_each($troops) AS troop
          JOIN unit_ids
            ON unit_ids.unit = json_extract(troop.value, '$.unitId')
        GROUP BY unit_ids.id, tile_id, source_tile_id
      )
      UPDATE troops
      SET amount = troops.amount - requested_troops.amount
      FROM requested_troops
      WHERE
        requested_troops.unit_id = troops.unit_id
        AND requested_troops.tile_id = troops.tile_id
        AND requested_troops.source_tile_id = troops.source_tile_id;
    `,bind:{$troops:JSON.stringify(t)}})},Qp=(e,t,n)=>{let r=e.selectObjects({sql:`
      SELECT
        ui.unit AS unit_id,
        wt.amount,
        wt.updated_at
      FROM
        wounded_troops wt
          JOIN unit_ids ui ON ui.id = wt.unit_id
      WHERE
        wt.village_id = $village_id;
    `,bind:{$village_id:t},schema:L({unit_id:J,amount:N(),updated_at:N()})});for(let i of r){let r=n-i.updated_at;if(r<=0)continue;let a=r/864e5,o=Math.floor(i.amount*.9**a);if(o<=0){e.exec({sql:`
          DELETE FROM wounded_troops
          WHERE
            village_id = $village_id
            AND unit_id = (
              SELECT id
              FROM unit_ids
              WHERE unit = $unit_id
            );
        `,bind:{$village_id:t,$unit_id:i.unit_id}});continue}o!==i.amount&&e.exec({sql:`
          UPDATE wounded_troops
          SET
            amount = $amount,
            updated_at = $updated_at
          WHERE
            village_id = $village_id
            AND unit_id = (
              SELECT id
              FROM unit_ids
              WHERE unit = $unit_id
            );
        `,bind:{$amount:o,$updated_at:n,$village_id:t,$unit_id:i.unit_id}})}},$p=(e,t,n)=>e.selectValue({sql:`
        SELECT amount
        FROM wounded_troops
        WHERE
          village_id = $village_id
          AND unit_id = (
            SELECT id
            FROM unit_ids
            WHERE unit = $unit_id
          );
      `,bind:{$village_id:t,$unit_id:n},schema:N().nullable()})??0,em=(e,t)=>{if(t.length!==0){if(t.length===1){let n=t[0],r={$village_id:n.villageId,$unit_id:n.unitId,$amount:n.amount};e.exec({sql:`
        DELETE FROM wounded_troops
        WHERE
          village_id = $village_id
          AND unit_id = (SELECT id FROM unit_ids WHERE unit = $unit_id)
          AND amount <= $amount;
      `,bind:r}),e.exec({sql:`
        UPDATE wounded_troops
        SET amount = amount - $amount
        WHERE
          village_id = $village_id
          AND unit_id = (SELECT id FROM unit_ids WHERE unit = $unit_id)
          AND amount > $amount;
      `,bind:r});return}e.exec({sql:`
      WITH requested_wounded_troops AS (
        SELECT
          json_extract(wounded_troop.value, '$.villageId') AS village_id,
          unit_ids.id AS unit_id,
          SUM(json_extract(wounded_troop.value, '$.amount')) AS amount
        FROM
          json_each($wounded_troops) AS wounded_troop
          JOIN unit_ids
            ON unit_ids.unit = json_extract(wounded_troop.value, '$.unitId')
        GROUP BY village_id, unit_ids.id
      )
      DELETE FROM wounded_troops
      WHERE EXISTS (
        SELECT 1
        FROM requested_wounded_troops
        WHERE
          requested_wounded_troops.village_id = wounded_troops.village_id
          AND requested_wounded_troops.unit_id = wounded_troops.unit_id
          AND wounded_troops.amount <= requested_wounded_troops.amount
      );
    `,bind:{$wounded_troops:JSON.stringify(t)}}),e.exec({sql:`
      WITH requested_wounded_troops AS (
        SELECT
          json_extract(wounded_troop.value, '$.villageId') AS village_id,
          unit_ids.id AS unit_id,
          SUM(json_extract(wounded_troop.value, '$.amount')) AS amount
        FROM
          json_each($wounded_troops) AS wounded_troop
          JOIN unit_ids
            ON unit_ids.unit = json_extract(wounded_troop.value, '$.unitId')
        GROUP BY village_id, unit_ids.id
      )
      UPDATE wounded_troops
      SET amount = wounded_troops.amount - requested_wounded_troops.amount
      FROM requested_wounded_troops
      WHERE
        requested_wounded_troops.village_id = wounded_troops.village_id
        AND requested_wounded_troops.unit_id = wounded_troops.unit_id;
    `,bind:{$wounded_troops:JSON.stringify(t)}})}},tm=(e,t)=>{let n=t,r=[];if(Nf(n))return[];if(zf(n)&&!e.selectValue({sql:`
        SELECT
          available >= 1 AS has_available_adventure
        FROM
          hero_adventures
        LIMIT 1;
      `,schema:V()}))return[`Hero has no available adventures`];let{targetTileId:i}=n;if(e.selectValue({sql:`
      SELECT
        EXISTS
        (
          SELECT 1
          FROM
            tiles
          WHERE
            id = $target_tile_id
        ) AS tile_exists;
    `,bind:{$target_tile_id:i},schema:V()})||r.push(`Target tile does not exist`),(If(n)||Lf(n))&&(e.selectValue({sql:`
        SELECT
          EXISTS
          (
            SELECT 1
            FROM
              tiles t
                LEFT JOIN villages v ON v.tile_id = t.id
                LEFT JOIN oasis o ON o.tile_id = t.id
            WHERE
              t.id = $target_tile_id
              AND (v.id IS NOT NULL OR o.id IS NOT NULL)
            ) AS is_village_or_oasis;
      `,bind:{$target_tile_id:i},schema:V()})||r.push(`Target must be a village or an oasis`)),Ff(n)){let{troops:t}=n;e.selectValue({sql:`
        SELECT
          EXISTS
          (
            SELECT 1
            FROM
              tiles t
                LEFT JOIN villages v ON v.tile_id = t.id
                LEFT JOIN oasis o ON o.tile_id = t.id
            WHERE
              t.id = $target_tile_id
              AND v.id IS NULL
              AND o.id IS NULL
            ) AS is_unoccupied;
      `,bind:{$target_tile_id:i},schema:V()})||r.push(`Target tile must be unoccupied`),e.selectValue({sql:`
        SELECT
          EXISTS
          (
            SELECT 1
            FROM
              events
            WHERE
              type = 'troopMovementFindNewVillage'
              AND JSON_EXTRACT(meta, '$.targetTileId') = $target_tile_id
            ) AS is_already_on_the_way;
      `,bind:{$target_tile_id:i},schema:V()})&&r.push(`Settlers are already on the way to this tile`),(t?.find(({unitId:e})=>e.includes(`SETTLER`))?.amount??0)!==3&&r.push(`Exactly 3 settlers must be selected`)}if(Rf(n)){let{villageId:t,troops:a}=n,o=e.selectObject({sql:`
        SELECT
          EXISTS (
            SELECT 1
            FROM
              oasis o
            WHERE
              o.tile_id = t.id
          ) AS is_oasis,
          (
            SELECT MAX(o.village_id)
            FROM
              oasis o
            WHERE
              o.tile_id = t.id
          ) = $village_id AS is_occupied_by_you
        FROM
          tiles t
        WHERE
          t.id = $target_tile_id;
      `,bind:{$target_tile_id:i,$village_id:t},schema:L({is_oasis:V(),is_occupied_by_you:V()})});if(!o?.is_oasis)r.push(`Target must be an oasis`);else{o?.is_occupied_by_you&&r.push(`Oasis is already occupied by you`);let{occupiedOases:n,occupiedOasisSlots:i}=e.selectObject({sql:`
          SELECT
            (
              SELECT COUNT(DISTINCT tile_id)
              FROM
                oasis
              WHERE
                village_id = $village_id
              ) AS occupiedOases,
            (
              SELECT
                CASE
                  WHEN bf.level >= 20 THEN 3
                  WHEN bf.level >= 15 THEN 2
                  WHEN bf.level >= 10 THEN 1
                  ELSE 0
                  END
              FROM
                building_fields bf
                  JOIN building_ids bi ON bi.id = bf.building_id
              WHERE
                bf.village_id = $village_id
                AND bi.building = 'HEROS_MANSION'
              LIMIT 1
              ) AS occupiedOasisSlots;
        `,bind:{$village_id:t},schema:L({occupiedOases:N(),occupiedOasisSlots:N().nullable()})});n>=(i??0)&&r.push(`No free oasis occupation slots available`),a?.some(({unitId:e})=>e===`HERO`)||r.push(`Hero must be present in selected troops`)}}if(jf(n)||Mf(n)){let{villageId:t}=n,a=e.selectObject({sql:`
        SELECT
          t.id AS tile_id,
          tt.type AS tile_type,
          cv.tile_id AS current_village_tile_id,
          CASE
            WHEN tt.type = 'free' THEN v.id
            WHEN tt.type = 'oasis' THEN ov.id
          END AS owning_village_id,
          CASE
            WHEN tt.type = 'free' THEN v.player_id
            WHEN tt.type = 'oasis' THEN ov.player_id
          END = $player_id AS is_player_target
        FROM
          tiles t
            JOIN tile_type_ids tt ON tt.id = t.type_id
            JOIN villages cv ON cv.id = $village_id
            LEFT JOIN villages v ON v.tile_id = t.id
            LEFT JOIN villages ov ON ov.id = (
              SELECT MAX(o.village_id)
              FROM
                oasis o
              WHERE
                o.tile_id = t.id
            )
        WHERE
          t.id = $target_tile_id;
      `,bind:{$target_tile_id:i,$village_id:t,$player_id:1},schema:L({tile_id:N(),tile_type:Hp,current_village_tile_id:N(),owning_village_id:N().nullable(),is_player_target:V().nullable()})});a?.owning_village_id===null?r.push(`Reinforcements and relocations can only be sent to your own villages or oases`):a?(a.tile_id===a.current_village_tile_id&&r.push(`Target tile cannot be the current village`),a.is_player_target||r.push(`Target tile must belong to you`),Mf(n)&&a.tile_type===`oasis`&&r.push(`Troops can not be relocated to oasis`)):r.push(`Target tile does not exist`)}return r},nm=new Map([[`infantry`,new Set([`BARRACKS`,`GREAT_BARRACKS`])],[`cavalry`,new Set([`STABLE`,`GREAT_STABLE`])],[`siege`,new Set([`WORKSHOP`])],[`administration`,new Set([`RESIDENCE`])],[`hero`,new Set]]),rm=new Map([[`BARRACKS`,`barracksTrainingDuration`],[`GREAT_BARRACKS`,`greatBarracksTrainingDuration`],[`STABLE`,`stableTrainingDuration`],[`GREAT_STABLE`,`greatStableTrainingDuration`],[`WORKSHOP`,`workshopTrainingDuration`],[`RESIDENCE`,`residenceTrainingDuration`],[`HOSPITAL`,`hospitalTrainingDuration`],[`ASCLEPEION`,`hospitalTrainingDuration`]]),im=L({buildingId:H,level:N()}),am=(e,t,n)=>{if(n.tribe===`all`)return!0;let r=e.selectValue({sql:Cu,bind:{$village_id:t},schema:W});return n.tribe===r},om=(e,t,n)=>{if(n.length===0)return!0;let r=[...new Set(n.map(({buildingId:e})=>e))],i=e.selectObjects({sql:`
      WITH required_buildings AS (
        SELECT value AS building
        FROM json_each($building_ids)
      )

      SELECT
        rb.building AS buildingId,
        COALESCE(MAX(bf.level), 0) AS level
      FROM required_buildings rb
      LEFT JOIN building_ids bi ON bi.building = rb.building
      LEFT JOIN building_fields bf
        ON bf.building_id = bi.id
        AND bf.village_id = $village_id
        AND bf.level > 0
      GROUP BY rb.building;
    `,bind:{$village_id:t,$building_ids:JSON.stringify(r)},schema:im}),a=new Map(i.map(({buildingId:e,level:t})=>[e,t]));for(let e of n)if((a.get(e.buildingId)??0)<e.level)return!1;return!0},sm=(e,t)=>nm.get(e.category).has(t),cm=e=>{let t=rm.get(e.buildingId)??null;return e.durationEffectId===t},lm=new Set([`id`,`type`,`startsAt`,`duration`,`resolvesAt`,`villageId`]),um=(e,t)=>{let n=t.length,r=`
    INSERT INTO
      events (type, starts_at, duration, village_id, meta)
    VALUES
      (?, ?, ?, ?, ?)
  ${`,(?, ?, ?, ?, ?)`.repeat(n-1)};`,i=Array.from({length:t.length*5});for(let e=0;e<t.length;e+=1){let n=t[e],r=e*5;i[r]=n.type,i[r+1]=n.startsAt,i[r+2]=n.duration,i[r+3]=n.villageId??null;let a;for(let e in n)lm.has(e)||(a??={},a[e]=n[e]);i[r+4]=a?JSON.stringify(a):null}e.prepare({sql:r}).bind(i).stepReset()},dm=(e,t)=>{if(Bf(t)){let{villageId:n,level:r}=t;if(r>20)throw Error(`Unit upgrade level cannot exceed 20`);if((e.selectValue({sql:Tu,bind:{$village_id:n,$building_id:`SMITHY`},schema:N().nullable()})??0)<r)throw Error(`Smithy level is too low for this unit upgrade`);if(e.selectValue({sql:Al,bind:{$village_id:n,$type:`unitImprovement`},schema:V()}))throw Error(`Smithy is busy`);if(e.selectValue({sql:`
        SELECT
          COALESCE(
            (
              SELECT
                level
              FROM
                unit_improvements
              WHERE
                player_id = (
                  SELECT
                    player_id
                  FROM
                    villages
                  WHERE
                    id = $village_id
                  )
                AND unit_id = (
                  SELECT
                    id
                  FROM
                    unit_ids
                  WHERE
                    unit = $unit_id
                  )
              ),
            0
          ) AS current_level;
      `,bind:{$village_id:n,$unit_id:t.unitId},schema:N()})>=r)throw Error(`Unit upgrade level already exists`);return}if(Vf(t)){let{unitId:n,villageId:r}=t,i=ef(n);if(!am(e,r,i))throw Error(`Unit does not belong to village tribe`);if(e.selectValue({sql:Al,bind:{$village_id:r,$type:`unitResearch`},schema:V()}))throw Error(`Academy is busy`);if(e.selectValue({sql:$f,bind:{$village_id:r,$unit_id:n},schema:V()}))throw Error(`Unit is already researched`);if(!om(e,r,i.researchRequirements))throw Error(`Unit research requirements are not met`);return}if(Hf(t)){let{villageId:n,unitId:r,buildingId:i,amount:a}=t,o=ef(r),s=bf(i);if(!am(e,n,o))throw Error(`Unit does not belong to village tribe`);if(!Number.isInteger(a)||a<=0)throw Error(`Unit training amount must be positive`);if(o.researchRequirements.length>0&&!e.selectValue({sql:$f,bind:{$village_id:n,$unit_id:r},schema:V()}))throw Error(`Unit is not researched`);if(e.selectValue({sql:Tu,bind:{$village_id:n,$building_id:i},schema:N().nullable()})===null)throw Error(`Unit training building does not exist`);if(!cm(t))throw Error(`Unit training duration effect does not match building`);if(s){let t=e.selectValue({sql:Cu,bind:{$village_id:n},schema:W});if(xf(i)&&t!==`spartans`)throw Error(`Asclepeion can only be used by Spartans`);if(Sf(i)&&t===`spartans`)throw Error(`Spartans must use the Asclepeion`);if(o.category!==`infantry`&&o.category!==`cavalry`)throw Error(`Only infantry and cavalry can be healed`);if(Qp(e,n,Date.now()),a>$p(e,n,r))throw Error(`Not enough wounded troops available`)}else{if(!sm(o,i))throw Error(`Unit training building does not match unit category`);if(!om(e,n,o.recruitmentRequirements))throw Error(`Unit recruitment requirements are not met`)}return}if(Uf(t)||Gf(t)){let{villageId:n}=t,r=e.selectValue({sql:Tu,bind:{$village_id:n,$building_id:`HUNTERS_LODGE`},schema:N().nullable()});if(r==null)throw Error(`Hunter's Lodge does not exist`);if(Uf(t)&&t.cageAmount<=0)throw Error(`Animal cage amount must be positive`);if(Gf(t)){if(t.huntingPartyLevel>r)throw Error(`Hunter's Lodge level is too low`);if(e.selectValue({sql:Al,bind:{$village_id:n,$type:`huntersLodgeHunt`},schema:V()}))throw Error(`Hunter's Lodge is busy`)}return}if(Wf(t)){let{villageId:n,cageAmount:r}=t;if(r<=0)throw Error(`Trapper cage amount must be positive`);let i=e.selectValue({sql:Tu,bind:{$village_id:n,$building_id:`TRAPPER`},schema:N().nullable()})??0;if(i<=0)throw Error(`Trapper does not exist`);let a=e.selectValue({sql:`
        SELECT COUNT(*)
        FROM trapper_cages
        WHERE village_id = $village_id;
      `,bind:{$village_id:n},schema:N()}),o=e.selectValue({sql:`
          SELECT COALESCE(SUM(CAST(JSON_EXTRACT(meta, '$.cageAmount') AS INTEGER)), 0)
          FROM
            events
          WHERE
            village_id = $village_id
            AND type = 'trapperCageProduction';
        `,bind:{$village_id:n},schema:N()})??0,s=Hd(i);if(a+o+r>s)throw Error(`Trapper cage capacity exceeded`);return}if(Kf(t)){let{villageId:n,troops:r}=t,i=e.selectValue({sql:Tu,bind:{$village_id:n,$building_id:`GATHERERS_HUT`},schema:N().nullable()});if(i==null)throw Error(`Gatherer's Hut does not exist`);if(e.selectValue({sql:Al,bind:{$village_id:n,$type:`gatherersHutGatheringTrip`},schema:V()}))throw Error(`Gatherer's Hut is busy`);if(!Array.isArray(r)||r.length===0)throw Error(`Gathering trip must include troops`);let a=e.selectValue({sql:xu,bind:{$village_id:n},schema:N()}),o=e.selectValue({sql:Cu,bind:{$village_id:n},schema:mu}),s=0,c=new Map;for(let e of r){if(!Number.isInteger(e.amount)||e.amount<=0)throw Error(`Gathering trip troop amount must be positive`);let t=ef(e.unitId);if(t.id===`HERO`)throw Error(`Gathering trips can only include regular troops`);if(t.tribe!==o)throw Error(`Gathering trips can only include troops from player's tribe`);if(e.tileId!==a||e.sourceTileId!==a)throw Error(`Gathering trips can only include idle home troops`);s+=e.amount,c.set(e.unitId,(c.get(e.unitId)??0)+e.amount)}let l=Cd(i);if(s>l)throw Error(`Gatherer's Hut party size exceeded`);if(c.size===1){let[t,n]=c.entries().next().value;if(n>e.selectValue({sql:`
          SELECT COALESCE(SUM(t.amount), 0)
          FROM
            troops t
            JOIN unit_ids ui ON ui.id = t.unit_id
          WHERE
            ui.unit = $unit_id
            AND t.tile_id = $tile_id
            AND t.source_tile_id = $tile_id;
        `,bind:{$unit_id:t,$tile_id:a},schema:N()}))throw Error(`Not enough idle troops available`);return}if(e.selectValue({sql:`
        WITH requested_troops AS (
          SELECT
            unit_ids.id AS unit_id,
            SUM(json_extract(troop.value, '$.amount')) AS amount
          FROM
            json_each($troops) AS troop
            JOIN unit_ids
              ON unit_ids.unit = json_extract(troop.value, '$.unitId')
          GROUP BY unit_ids.id
        )
        SELECT EXISTS (
          SELECT 1
          FROM
            requested_troops
            LEFT JOIN troops
              ON troops.unit_id = requested_troops.unit_id
              AND troops.tile_id = $tile_id
              AND troops.source_tile_id = $tile_id
          GROUP BY requested_troops.unit_id, requested_troops.amount
          HAVING COALESCE(SUM(troops.amount), 0) < requested_troops.amount
        );
      `,bind:{$troops:JSON.stringify([...c].map(([e,t])=>({unitId:e,amount:t}))),$tile_id:a},schema:V()}))throw Error(`Not enough idle troops available`);return}if(Of(t)){let{villageId:n,buildingFieldId:r,buildingId:i,level:a}=t;if(Ef(t)){let t=e.selectValue({sql:Tu,bind:{$village_id:n,$building_id:`MAIN_BUILDING`},schema:N().nullable()});if(t===null||t<10)throw Error(`Main building level 10 is required to downgrade buildings`);if(e.selectValue({sql:`
          SELECT
            EXISTS
            (
              SELECT 1
              FROM
                events e
              WHERE
                e.village_id = $village_id
                AND e.type IN ('buildingLevelChange', 'buildingDestruction')
                AND CAST(JSON_EXTRACT(e.meta, '$.previousLevel') AS INTEGER) >
                    CAST(JSON_EXTRACT(e.meta, '$.level') AS INTEGER)
              ) AS event_exists;
        `,bind:{$village_id:n},schema:V()}))throw Error(`Main building is busy`);return}if(e.selectValue({sql:`
        SELECT
          COUNT(*) AS buildingEventsCount
        FROM
          (
            SELECT *,
              CAST(JSON_EXTRACT(meta, '$.buildingFieldId') AS INTEGER) AS building_field_id
            FROM
              events
            WHERE
              village_id = $village_id
            ) e
            JOIN villages v ON v.id = e.village_id
            JOIN players p ON p.id = v.player_id
            JOIN tribe_ids ti ON p.tribe_id = ti.id
        WHERE
          e.type IN ('buildingConstruction', 'buildingLevelChange')
          AND NOT (
            e.type IN ('buildingLevelChange', 'buildingDestruction')
                  AND CAST(JSON_EXTRACT(e.meta, '$.previousLevel') AS INTEGER) >
                      CAST(JSON_EXTRACT(e.meta, '$.level') AS INTEGER)
                )
              AND (
                -- If player is not Romans, include all building events
                ti.tribe <> 'romans'
              -- If Romans, only include events from the same "half" (<=18 or >18)
              OR (
              (e.building_field_id <= 18 AND CAST($building_field_id AS INTEGER) <= 18)
                OR
              (e.building_field_id > 18 AND CAST($building_field_id AS INTEGER) > 18)
              )
            );
      `,bind:{$village_id:n,$building_field_id:r},schema:N()})>=1)throw new df;if(!e.selectValue({sql:`
        SELECT is_free_building_construction_enabled
        FROM developer_settings;
      `,schema:V()})){let{total:r}=G(`wheatProduction`,e.selectObjects({sql:hu,bind:{$effect_id:`wheatProduction`,$village_id:n},schema:Gu}),e.selectValue({sql:xu,bind:{$village_id:n},schema:N()}));if(r<iu(i,t.previousLevel,a))throw Error(`Not enough free crop`)}if(Cf(t)){let{villageId:n,buildingFieldId:r}=t;if(e.selectValue({sql:`
          SELECT
            EXISTS
            (
              SELECT 1
              FROM
                building_fields
              WHERE
                village_id = $village_id
                AND field_id = $building_field_id
                AND level > 0
              ) AS is_occupied;
        `,bind:{$village_id:n,$building_field_id:r},schema:V()}))throw Error(`Building field is already occupied`);_p(e,n,i,{buildingFieldId:r});return}let{maxLevel:o}=$l(i);if(a>o)throw Error(`Building level cannot exceed max level`);return}if(qf(t)){if(e.selectValue({sql:`SELECT health > 0 FROM heroes WHERE player_id = $player_id;`,bind:{$player_id:1},schema:V()}))throw Error(`Hero is already alive`);return}if(zf(t)){let{available:t}=lp(e,Date.now());if(t===0)throw Error(`No adventure points available`);if(!e.selectValue({sql:`
        SELECT
          EXISTS
          (
            SELECT 1
            FROM
              heroes h
                JOIN villages v ON v.id = h.village_id
                JOIN troops t
                     ON t.tile_id = v.tile_id
                       AND t.source_tile_id = v.tile_id
                JOIN unit_ids ui ON ui.id = t.unit_id
            WHERE
              h.player_id = $player_id
              AND ui.unit = 'HERO'
              AND t.amount > 0
          ) AS is_hero_home;
      `,bind:{$player_id:1},schema:V()}))throw Error(`Hero is not stationed in his home village`);return}if(Xf(t)){let{village:n,merchant:r}=kp(e,t.villageId),i=Ep(t.resources)===0,a=bp(e,t.targetVillageId);if(!a||a.playerId!==n.playerId)throw Error(`Target village does not exist or does not belong to player`);if(a.tileId!==t.targetTileId)throw Error(`Target tile does not belong to target village`);if(i){if(t.targetVillageId!==t.villageId)throw Error(`Merchant return must target the source village`);if(t.targetTileId!==n.tileId)throw Error(`Merchant return target tile must be source village`);if(t.merchantAmount<=0)throw Error(`Merchant return must include merchants`);return}if(t.targetVillageId===t.villageId)throw Error(`Target village must be different from source village`);if(n.tileId!==t.originTileId)throw Error(`Origin tile does not belong to source village`);let o=Tp(t.resources,r.merchantCapacity);if(t.merchantAmount!==o)throw Error(`Invalid merchant amount`);if(o>wp(e,t.villageId))throw Error(`Not enough free merchants`);return}if(Zf(t)){let{village:n,merchant:r,marketplaceLevel:i}=kp(e,t.villageId),a=bp(e,t.targetVillageId);if(!a||a.playerId!==n.playerId)throw Error(`Target village does not exist or does not belong to player`);if(t.targetVillageId===t.villageId)throw Error(`Target village must be different from source village`);if(n.tileId!==t.originTileId)throw Error(`Origin tile does not belong to source village`);if(a.tileId!==t.targetTileId)throw Error(`Target tile does not belong to target village`);if(Ep(t.resources)<=0)throw Error(`Trade route must include resources`);if(!Number.isFinite(t.interval)||t.interval<=0)throw Error(`Trade route interval must be positive`);if(Tp(t.resources,r.merchantCapacity)>i)throw Error(`Not enough merchants`);return}if(Af(t)){let n=tm(e,t);if(n.length>0)throw Error(n[0])}},fm=(e,t,n)=>{let{villageId:r,startsAt:i}=t,[a,o,s,c]=n,{currentWood:l,currentClay:u,currentIron:d,currentWheat:f}=qu(e,K(e,r),i);return!(a>l||o>u||s>d||c>f)},pm=(e,t)=>{let[n]=t;if(zf(n)){let t=e.selectValue({sql:`SELECT id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:1},schema:N()}),n=Date.now(),{available:r}=up(e,t,n);if(r<=0)throw Error(`No adventure points available`);e.exec({sql:`
        UPDATE hero_adventures
        SET
          available = available - 1,
          last_updated_at = $now
        WHERE
          hero_id = $hero_id
      `,bind:{$hero_id:t,$now:n}})}if(Af(n)&&!Nf(n)&&Zp(e,t.flatMap(({troops:e})=>e)),Kf(n)&&Zp(e,n.troops),Hf(n)){let t=Date.now();if(bf(n.buildingId)){Qp(e,n.villageId,t),em(e,[{villageId:n.villageId,unitId:n.unitId,amount:n.amount}]);return}Mp(e,t),Np(e,n.unitId,t)}},mm=(e,t)=>{if(Tf(t)){if(Ef(t)||e.selectValue({sql:`SELECT is_free_building_construction_enabled FROM developer_settings`,schema:V()}))return[0,0,0,0];let{buildingId:n,level:r}=t;return tu(n,r)}if(Vf(t)){if(e.selectValue({sql:`SELECT is_free_unit_research_enabled FROM developer_settings`,schema:V()}))return[0,0,0,0];let{unitId:n}=t;return rf(n)}if(Bf(t)){if(e.selectValue({sql:`SELECT is_free_unit_improvement_enabled FROM developer_settings`,schema:V()}))return[0,0,0,0];let{unitId:n,level:r}=t;return tf(n,r)}if(Hf(t)){if(e.selectValue({sql:`SELECT is_free_unit_training_enabled FROM developer_settings`,schema:V()}))return[0,0,0,0];let{unitId:n,buildingId:r,amount:i}=t,{baseRecruitmentCost:a}=ef(n),o=r===`GREAT_BARRACKS`||r===`GREAT_STABLE`?3:1;return a.map(e=>e*o*i)}if(Uf(t))return e.selectValue({sql:`SELECT is_free_unit_training_enabled FROM developer_settings`,schema:V()})?[0,0,0,0]:Pd.map(e=>e*t.cageAmount);if(Wf(t))return e.selectValue({sql:`SELECT is_free_unit_training_enabled FROM developer_settings`,schema:V()})?[0,0,0,0]:Bd.map(e=>e*t.cageAmount);if(Gf(t))return e.selectValue({sql:`SELECT is_free_hunting_parties_enabled FROM developer_settings`,schema:V()})?[0,0,0,0]:Ld(t.huntingPartyLevel);if(qf(t)){if(e.selectValue({sql:`SELECT is_free_hero_revive_enabled FROM developer_settings`,schema:V()}))return[0,0,0,0];let{experience:t,tribe:n}=e.selectObject({sql:`
        SELECT h.experience, ti.tribe
        FROM
          heroes h
            JOIN players p ON h.player_id = p.id
            JOIN tribe_ids ti ON p.tribe_id = ti.id
        WHERE
          h.player_id = $player_id;
      `,bind:{$player_id:1},schema:L({experience:N(),tribe:mu})}),{level:r}=kd(t);return jd(n,r)}if(Xf(t)){let{wood:e,clay:n,iron:r,wheat:i}=t.resources;return[e,n,r,i]}return Zf(t),[0,0,0,0]},hm=(e,t)=>{if(Cf(t))return 0;if(Tf(t)||wf(t)){if(e.selectValue({sql:`SELECT is_instant_building_construction_enabled FROM developer_settings`,schema:V()}))return 0;if(Ef(t)){let n=e.selectValue({sql:`SELECT speed FROM servers LIMIT 1;`,schema:sf});return su(t.previousLevel-t.level,n)}let{villageId:n,buildingId:r,level:i}=t,{total:a}=G(`buildingDuration`,e.selectObjects({sql:hu,bind:{$effect_id:`buildingDuration`,$village_id:n},schema:Gu}),e.selectValue({sql:xu,bind:{$village_id:n},schema:N()}));return ou(r,i)*a}if(Vf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_research_enabled FROM developer_settings`,schema:V()}))return 0;let{villageId:n,unitId:r}=t,{total:i}=G(`unitResearchDuration`,e.selectObjects({sql:hu,bind:{$effect_id:`unitResearchDuration`,$village_id:n},schema:Gu}),e.selectValue({sql:xu,bind:{$village_id:n},schema:N()}));return i*af(r)}if(Bf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_improvement_enabled FROM developer_settings`,schema:V()}))return 0;let{villageId:n,unitId:r,level:i}=t,{total:a}=G(`unitImprovementDuration`,e.selectObjects({sql:hu,bind:{$effect_id:`unitImprovementDuration`,$village_id:n},schema:Gu}),e.selectValue({sql:xu,bind:{$village_id:n},schema:N()}));return a*nf(r,i)}if(Hf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_training_enabled FROM developer_settings`,schema:V()}))return 0;let{unitId:n,villageId:r,durationEffectId:i,buildingId:a}=t,{total:o}=G(i,e.selectObjects({sql:hu,bind:{$effect_id:i,$village_id:r},schema:Gu}),e.selectValue({sql:xu,bind:{$village_id:r},schema:N()})),{baseRecruitmentDuration:s}=ef(n),c=bf(a)?.5:1;return o*s*c}if(Uf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_training_enabled FROM developer_settings`,schema:V()}))return 0;let n=e.selectValue({sql:`SELECT speed FROM servers LIMIT 1;`,schema:sf});return 6e5*t.cageAmount/n}if(Wf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_training_enabled FROM developer_settings`,schema:V()}))return 0;let n=e.selectValue({sql:`SELECT speed FROM servers LIMIT 1;`,schema:sf});return 6e5*t.cageAmount/n}if(Gf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_travel_enabled FROM developer_settings`,schema:V()}))return 0;let n=e.selectValue({sql:`SELECT speed FROM servers LIMIT 1;`,schema:sf});return Rd(t.huntingPartyLevel,n)}if(Kf(t)){if(e.selectValue({sql:`SELECT is_instant_unit_travel_enabled FROM developer_settings`,schema:V()}))return 0;let{completedGatheringTripCount:n,seed:r,speed:i}=e.selectObject({sql:`
        SELECT
          (
            SELECT seed
            FROM
              servers
            LIMIT 1
          ) AS seed,
          (
            SELECT speed
            FROM
              servers
            LIMIT 1
          ) AS speed,
          COALESCE((
            SELECT completed
            FROM
              gatherers_hut_expeditions
            WHERE
              village_id = $village_id
          ), 0) AS completedGatheringTripCount;
      `,bind:{$village_id:t.villageId},schema:L({seed:j(),speed:sf,completedGatheringTripCount:N()})});return wd(r,i,t.villageId,n)}if(Af(t)){if(e.selectValue({sql:`SELECT is_instant_unit_travel_enabled FROM developer_settings`,schema:V()}))return 0;if(zf(t))return op(e,!1);if(Nf(t)&&t.originalMovementType===`troopMovementAdventure`)return op(e,!0);let{villageId:n,targetTileId:r,originTileId:i,troops:a}=t,o=e.selectObjects({sql:`
  SELECT
    ei.effect AS id,
    e.value,
    et.type,
    es.scope,
    eso.source,
    e.tile_id AS tileId,
    e.source_specifier AS sourceSpecifier
  FROM
    effects AS e
      LEFT JOIN effect_ids AS ei
                ON ei.id = e.effect_id
      JOIN effect_type_ids AS et ON et.id = e.type_id
      JOIN effect_scope_ids AS es ON es.id = e.scope_id
      JOIN effect_source_ids AS eso ON eso.id = e.source_id
  WHERE
    (ei.effect IN ('unitSpeed', 'unitSpeedAfter20Fields'))
    AND (e.scope_id IN (SELECT id FROM effect_scope_ids WHERE scope IN ('global', 'server')) OR e.tile_id = (SELECT tile_id FROM villages WHERE id = $village_id));
`,bind:{$village_id:n},schema:Wu}),s=e.selectValue({sql:Qf,schema:N()});return vf({targetTileId:r,originTileId:i,mapSize:s,troops:a,effects:o})}if(Xf(t)){let{merchant:n}=kp(e,t.villageId);return Dp(e,t.originTileId,t.targetTileId,n.merchantSpeed)}if(Zf(t))return 0;if(qf(t)){if(e.selectValue({sql:`SELECT is_instant_hero_revive_enabled FROM developer_settings`,schema:V()}))return 0;let{experience:t,speed:n}=e.selectObject({sql:`
        SELECT h.experience, s.speed
        FROM
          heroes h
            CROSS JOIN servers s
        WHERE
          h.player_id = $player_id;
      `,bind:{$player_id:1},schema:L({experience:N(),speed:sf})}),{level:r}=kd(t);return Md(r)/n}if(Jf(t)){let{healthRegeneration:t,speed:n}=e.selectObject({sql:`SELECT health_regeneration AS healthRegeneration, servers.speed FROM heroes CROSS JOIN servers WHERE player_id = $player_id;`,bind:{$player_id:1},schema:L({healthRegeneration:N(),speed:sf})});return Nd(t,n)}if(Yf(t)){let{createdAt:t,speed:n}=e.selectObject({sql:`SELECT created_at AS createdAt, speed FROM servers LIMIT 1;`,schema:L({createdAt:N(),speed:sf})}),r=zd(n);return(r-(Date.now()-t)%r)%r||r}throw Error(`Missing duration calculation for event type "${t.type}"`)},gm=(e,t,n)=>Tf(t)?n:Date.now(),_m=(e,t)=>{if(Hf(t)){let{villageId:n,buildingId:r}=t,i=e.selectObjects({sql:kl,bind:{$village_id:n,$type:`troopTraining`},schema:Fl}).map(Il).filter(e=>e.buildingId===r);if(i.length>0){let e=i.at(-1);return e.startsAt+e.duration}return Date.now()}if(Uf(t)){let{villageId:n}=t,r=Date.now();return e.selectValue({sql:`
        SELECT COALESCE(MAX(resolves_at), $now)
        FROM
          events
        WHERE
          village_id = $village_id
          AND type = 'animalCageProduction';
      `,bind:{$village_id:n,$now:r},schema:N()})}if(Wf(t)){let{villageId:n}=t,r=Date.now();return e.selectValue({sql:`
        SELECT COALESCE(MAX(resolves_at), $now)
        FROM
          events
        WHERE
          village_id = $village_id
          AND type = 'trapperCageProduction';
      `,bind:{$village_id:n,$now:r},schema:N()})}if(Bf(t)){let{unitId:n}=t,r=Date.now();return e.selectValue({sql:`
        SELECT COALESCE(MAX(resolves_at), $now)
        FROM
          events
        WHERE
          type = 'unitImprovement'
          AND JSON_EXTRACT(meta, '$.unitId') = $unit_id
      `,bind:{$unit_id:n,$now:r},schema:N()})}if(Jf(t)){let{resolvesAt:e}=t;return e}if(Cf(t)||Tf(t))return Date.now();if(Af(t)){if(Nf(t)){if(Pf(t))return Date.now();let{resolvesAt:e}=t;return e}return Date.now()}return Xf(t)?Ep(t.resources)===0?t.resolvesAt??Date.now():Date.now():Zf(t)?t.startsAt??Date.now():Date.now()},vm=L({id:N(),resolvesAt:N()}),X=(e,t)=>{vd.parse(t);let n=t,{startsAt:r=null,duration:i=null}=n,a=t?.amount??1;dm(e,n);let o=mm(e,n);if(o.some(e=>e>0)){if(!fm(e,n,o))throw Error(`Not enough resources`);r??=_m(e,n);let t=gm(e,n,r),{villageId:i}=n;Yu(e,K(e,i),t,()=>o)}r??=_m(e,n),i??=Math.ceil(hm(e,n));let s=Array.from({length:a});for(let e=0;e<a;e+=1)s[e]={...t,startsAt:r+e*i,duration:i,resolvesAt:r+e*i+i};let c=s.at(0),l=Date.now(),u=s.map(e=>e.startsAt+e.duration),d=c.startsAt+c.duration,f=e.selectObject({sql:Ol,bind:{$now:l},schema:vm});um(e,s),pm(e,s),Vl({eventKey:`event:created`,...s[0],affectedVillageIds:[],affectedTileIds:[]}),(u.some(e=>e<=l)||!f||d<f.resolvesAt)&&Ms()},ym=L({id:N(),buildingId:H,villageId:N(),buildingFieldId:N(),level:N()}),bm=(e,t)=>e.selectObjects({sql:`
  SELECT
    sbu.id,
    bi.building AS buildingId,
    sbu.village_id AS villageId,
    sbu.building_field_id AS buildingFieldId,
    sbu.level
  FROM scheduled_building_upgrades sbu
  JOIN building_ids bi ON bi.id = sbu.building_id
  WHERE sbu.village_id = $village_id
  ORDER BY sbu.queue_position, sbu.id;
`,bind:{$village_id:t},schema:ym}),xm=(e,t,n)=>e.selectObject({sql:`
  SELECT
    sbu.id,
    bi.building AS buildingId,
    sbu.village_id AS villageId,
    sbu.building_field_id AS buildingFieldId,
    sbu.level
  FROM scheduled_building_upgrades sbu
  JOIN building_ids bi ON bi.id = sbu.building_id
  JOIN villages v ON v.id = sbu.village_id
  JOIN players p ON p.id = v.player_id
  JOIN tribe_ids ti ON ti.id = p.tribe_id
  WHERE sbu.village_id = $village_id
    AND (
      $building_field_id IS NULL
      OR ti.tribe <> 'romans'
      OR (
        sbu.building_field_id <= 18
        AND $building_field_id <= 18
      )
      OR (
        sbu.building_field_id > 18
        AND $building_field_id > 18
      )
    )
  ORDER BY sbu.queue_position, sbu.id
  LIMIT 1;
`,bind:{$village_id:t,$building_field_id:n??null},schema:ym}),Sm=(e,t)=>{e.exec({sql:`
  INSERT INTO scheduled_building_upgrades (
    building_id,
    village_id,
    building_field_id,
    level,
    queue_position
  )
  VALUES (
    (SELECT id FROM building_ids WHERE building = $building_id),
    $village_id,
    $building_field_id,
    $level,
    COALESCE(
      (
        SELECT MAX(queue_position) + 1
        FROM scheduled_building_upgrades
        WHERE village_id = $village_id
      ),
      0
    )
  );
`,bind:{$building_id:t.buildingId,$village_id:t.villageId,$building_field_id:t.buildingFieldId,$level:t.level}})},Cm=(e,{villageId:t,buildingId:n,buildingFieldId:r,fromLevel:i})=>{e.exec({sql:`
  DELETE FROM scheduled_building_upgrades
  WHERE village_id = $village_id
    AND building_id = (
      SELECT id FROM building_ids WHERE building = $building_id
    )
    AND building_field_id = $building_field_id
    AND level >= $level;
`,bind:{$village_id:t,$building_id:n,$building_field_id:r,$level:i}})},wm=e=>{if(e instanceof Error){if(e.message===`Not enough resources`)return`missing-resources`;if(e.message===`Building requirements are not met`)return`missing-requirements`}},Tm=(e,t)=>{Vl({eventKey:`scheduled-building-construction:cancelled`,villageId:e.villageId,buildingId:e.buildingId,buildingFieldId:e.buildingFieldId,level:e.level,reason:t})},Em=(e,t)=>{e.exec({sql:`
  INSERT INTO scheduled_building_construction_cancellation_history (
    village_id,
    field_id,
    building_id,
    level,
    timestamp
  )
  VALUES (
    $village_id,
    $field_id,
    (SELECT id FROM building_ids WHERE building = $building_id),
    $level,
    unixepoch()
  );
`,bind:{$village_id:t.villageId,$field_id:t.buildingFieldId,$building_id:t.buildingId,$level:t.level}})},Dm=(e,t,n,r)=>{for(;;){let i=xm(e,t,r);if(!i)return;try{i.level===1&&_p(e,t,i.buildingId,{buildingFieldId:i.buildingFieldId,excludedScheduledBuildingUpgradeId:i.id}),X(e,{type:`buildingLevelChange`,villageId:t,buildingId:i.buildingId,buildingFieldId:i.buildingFieldId,previousLevel:i.level-1,level:i.level,startsAt:n}),e.exec({sql:`
  DELETE FROM scheduled_building_upgrades
  WHERE id = $id;
`,bind:{$id:i.id}});return}catch(n){if(n instanceof df)return;let r=wm(n);Cm(e,{villageId:t,buildingId:i.buildingId,buildingFieldId:i.buildingFieldId,fromLevel:i.level}),i.level===1&&Zu(e,t,i.buildingFieldId,i.buildingId),r&&(Em(e,i),Tm(i,r))}}},Om=(e,t)=>{let{buildingFieldId:n,level:r,buildingId:i,villageId:a,previousLevel:o,resolvesAt:s}=t;e.exec({sql:`
      UPDATE building_fields
      SET level = $level
      FROM building_ids bi
      WHERE village_id = $village_id
        AND field_id = $building_field_id
        AND bi.id = building_fields.building_id
        AND bi.building = $building_id;
    `,bind:{$village_id:a,$building_field_id:n,$building_id:i,$level:r}});let c=iu(i,o,r);c!==0&&e.exec({sql:_u,bind:{$village_id:a,$value:c}});let l=e.selectValue({sql:Cu,bind:{$village_id:a},schema:W}),u=$l(i).effects(l);if(u.length===1||u.length>=8)for(let{effectId:t,valuesPerLevel:i,type:o}of u)e.exec({sql:vu,bind:{$effect_id:t,$value:i[r],$type:o,$village_id:a,$source_specifier:n}});else e.exec({sql:`
      UPDATE effects
      SET value = json_extract(effect.value, '$.value')
      FROM
        json_each($effects) AS effect
        JOIN effect_ids
          ON effect_ids.effect = json_extract(effect.value, '$.effectId')
        JOIN effect_type_ids
          ON effect_type_ids.type = json_extract(effect.value, '$.type')
      WHERE
        effects.effect_id = effect_ids.id
        AND effects.type_id = effect_type_ids.id
        AND effects.scope_id = (
          SELECT id FROM effect_scope_ids WHERE scope = 'local'
        )
        AND effects.source_id = (
          SELECT id FROM effect_source_ids WHERE source = 'building'
        )
        AND effects.tile_id = (
          SELECT tile_id FROM villages WHERE id = $village_id
        )
        AND effects.source_specifier = $source_specifier;
    `,bind:{$effects:JSON.stringify(u.map(({effectId:e,valuesPerLevel:t,type:n})=>({effectId:e,type:n,value:t[r]}))),$village_id:a,$source_specifier:n}});return o<r&&(Lp(e,a,i,r,s),Dm(e,a,s,n)),q(e,K(e,a),s),{affectedVillageIds:[a],affectedTileIds:[K(e,a)]}},km=(e,t)=>{let{villageId:n,buildingFieldId:r,buildingId:i,level:a,previousLevel:o,startsAt:s}=t;return Xu(e,n,r,i),X(e,{villageId:n,level:a,previousLevel:o,startsAt:s,buildingFieldId:r,buildingId:i,type:`buildingLevelChange`}),{affectedVillageIds:[n],affectedTileIds:[K(e,n)]}},Am=(e,t)=>{let{buildingFieldId:n,villageId:r,buildingId:i,previousLevel:a}=t;Ku(e,r,n);let o=e.selectValue({sql:Cu,bind:{$village_id:r},schema:W}),s=$l(i).effects(o),c=cu.some(e=>e===n);if(c){if(s.length===1||s.length>=8)for(let{effectId:t,valuesPerLevel:i,type:a}of s)e.exec({sql:vu,bind:{$effect_id:t,$value:i[0],$type:a,$village_id:r,$source_specifier:n}});else e.exec({sql:`
        UPDATE effects
        SET value = json_extract(effect.value, '$.value')
        FROM
          json_each($effects) AS effect
          JOIN effect_ids
            ON effect_ids.effect = json_extract(effect.value, '$.effectId')
          JOIN effect_type_ids
            ON effect_type_ids.type = json_extract(effect.value, '$.type')
        WHERE
          effects.effect_id = effect_ids.id
          AND effects.type_id = effect_type_ids.id
          AND effects.scope_id = (
            SELECT id FROM effect_scope_ids WHERE scope = 'local'
          )
          AND effects.source_id = (
            SELECT id FROM effect_source_ids WHERE source = 'building'
          )
          AND effects.tile_id = (
            SELECT tile_id FROM villages WHERE id = $village_id
          )
          AND effects.source_specifier = $source_specifier;
      `,bind:{$effects:JSON.stringify(s.map(({effectId:e,valuesPerLevel:t,type:n})=>({effectId:e,type:n,value:t[0]}))),$village_id:r,$source_specifier:n}})}else s.length===1?e.exec({sql:`
          DELETE FROM effects
          WHERE
            tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
            AND effect_id = (
              SELECT id FROM effect_ids WHERE effect = $effect_id
            )
            AND source_specifier = $source_specifier;
        `,bind:{$village_id:r,$effect_id:s[0].effectId,$source_specifier:n}}):e.exec({sql:`
        DELETE
        FROM effects
        WHERE tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
          AND effect_id IN (
            SELECT effect_ids.id
            FROM
              json_each($effect_ids) AS effect
              JOIN effect_ids ON effect_ids.effect = effect.value
          )
          AND source_specifier = $source_specifier;
      `,bind:{$village_id:r,$effect_ids:JSON.stringify(s.map(({effectId:e})=>e)),$source_specifier:n}});let{population:l}=ru(i,a),{population:u}=ru(i,0);return e.exec({sql:_u,bind:{$village_id:r,$value:-l+(c?u:0)}}),{affectedVillageIds:[r],affectedTileIds:[K(e,r)]}},jm=(e,t)=>{let{villageId:n,resolvesAt:r,buildingFieldId:i}=t;return Dm(e,n,r,i),{affectedVillageIds:[n],affectedTileIds:[]}},Mm=(e,t)=>{let n=e.selectValue({sql:`
      INSERT INTO
        reports (village_id, timestamp, type_id, report_outcome_id)
      VALUES
        ($village_id, $timestamp, (
          SELECT
            id
          FROM
            report_type_ids
          WHERE
            report_type = $type
          ), (
           SELECT
             id
           FROM
             report_outcome_ids
           WHERE
             report_outcome = $outcome
           ))
      RETURNING id;
    `,bind:{$village_id:t.villageId,$timestamp:t.timestamp,$type:t.type,$outcome:t.outcome},schema:P()});return t.tags.length>0&&e.exec({sql:`
        INSERT INTO
          report_tags (report_id, report_tag_id)
        SELECT $report_id, report_tag_ids.id
        FROM
          JSON_EACH($tags)
            JOIN report_tag_ids ON report_tag_ids.tag = json_each.value;
      `,bind:{$report_id:n,$tags:JSON.stringify(t.tags)}}),n},Nm=(e,t)=>{let n=Mm(e,{villageId:t.villageId,timestamp:t.timestamp,type:`adventure`,outcome:`heroAdventure`,tags:[]});return e.exec({sql:`
      INSERT INTO hero_adventure_reports (
        report_id,
        adventure_id,
        item_id,
        item_amount,
        health_before,
        health_after
      )
      VALUES (
        $report_id,
        $adventure_id,
        $item_id,
        $item_amount,
        $health_before,
        $health_after
      );
    `,bind:{$report_id:n,$adventure_id:t.adventureId,$item_id:t.itemId,$item_amount:t.itemAmount,$health_before:t.healthBefore,$health_after:t.healthAfter}}),n},Pm=(e,t)=>{let n=Mm(e,{villageId:t.villageId,timestamp:t.timestamp,type:`gatheringExpedition`,outcome:`gatheringExpedition`,tags:[]}),r=e.selectValue({sql:`
      INSERT INTO gathering_expedition_reports (
        report_id,
        village_tile_id,
        tribe_id,
        loot_wood,
        loot_clay,
        loot_iron,
        loot_wheat
      )
      VALUES (
        $report_id,
        $village_tile_id,
        $tribe_id,
        $loot_wood,
        $loot_clay,
        $loot_iron,
        $loot_wheat
      )
      RETURNING id;
    `,bind:{$report_id:n,$village_tile_id:t.villageTileId,$tribe_id:t.tribeId,$loot_wood:t.loot[0],$loot_clay:t.loot[1],$loot_iron:t.loot[2],$loot_wheat:t.loot[3]},schema:P()});return e.exec({sql:`
      INSERT INTO gathering_expedition_report_units (
        gathering_expedition_report_id,
        unit_id,
        amount
      )
      SELECT
        $report_detail_id,
        unit_ids.id,
        json_extract(unit.value, '$.amount')
      FROM
        json_each($units) AS unit
        JOIN unit_ids
          ON unit_ids.unit = json_extract(unit.value, '$.unitId');
    `,bind:{$report_detail_id:r,$units:JSON.stringify(t.units)}}),n},Fm=(e,t)=>{let n=Mm(e,{villageId:t.villageId,timestamp:t.timestamp,type:`huntingParty`,outcome:`huntingParty`,tags:[]}),r=e.selectValue({sql:`
      INSERT INTO hunting_party_reports (report_id, village_tile_id)
      VALUES ($report_id, $village_tile_id)
      RETURNING id;
    `,bind:{$report_id:n,$village_tile_id:t.villageTileId},schema:P()});return e.exec({sql:`
      INSERT INTO hunting_party_report_units (
        hunting_party_report_id,
        unit_id,
        amount
      )
      SELECT $hunting_party_report_id, id, $amount
      FROM unit_ids
      WHERE unit = $unit_id;
    `,bind:{$hunting_party_report_id:r,$unit_id:t.unitId,$amount:t.amount}}),n},Im=(e,{villageId:t,resolvesAt:n,originTileId:r,targetTileId:i,movementType:a,troops:o})=>{let s=r??e.selectValue({sql:`SELECT tile_id FROM villages WHERE id = $village_id;`,bind:{$village_id:t},schema:P()}),c=Mm(e,{villageId:t,timestamp:n,type:`movement`,outcome:`troopMovement`,tags:[]}),l=e.selectValue({sql:`
      INSERT INTO
        movement_reports (report_id, origin_tile_id, target_tile_id, movement_type)
      VALUES
        ($report_id, $origin_tile_id, $target_tile_id, $movement_type)
      RETURNING id;
    `,bind:{$report_id:c,$origin_tile_id:s,$target_tile_id:i,$movement_type:a},schema:P()});e.exec({sql:`
      INSERT INTO
        movement_report_units (movement_report_id, unit_id, amount)
      SELECT
        $movement_report_id,
        unit_ids.id,
        JSON_EXTRACT(troop.value, '$.amount')
      FROM
        JSON_EACH($troops) AS troop
          JOIN unit_ids
               ON unit_ids.unit = JSON_EXTRACT(troop.value, '$.unitId');
    `,bind:{$movement_report_id:l,$troops:JSON.stringify(o)}})},Lm=(e,t)=>{let n=Mm(e,{villageId:t.villageId,timestamp:t.timestamp,type:`battle`,outcome:t.outcome,tags:[]}),r=e.selectValue({sql:`
      INSERT INTO battle_reports (
        report_id,
        origin_tile_id,
        target_tile_id,
        is_raid,
        loot_wood,
        loot_clay,
        loot_iron,
        loot_wheat,
        can_attacker_see_full_report,
        attacker_points,
        defender_points
      )
      VALUES (
        $report_id,
        $origin_tile_id,
        $target_tile_id,
        $is_raid,
        $loot_wood,
        $loot_clay,
        $loot_iron,
        $loot_wheat,
        $can_attacker_see_full_report,
        $attacker_points,
        $defender_points
      )
      RETURNING id;
    `,bind:{$report_id:n,$origin_tile_id:t.originTileId,$target_tile_id:t.targetTileId,$is_raid:+!!t.isRaid,$loot_wood:t.loot[0],$loot_clay:t.loot[1],$loot_iron:t.loot[2],$loot_wheat:t.loot[3],$can_attacker_see_full_report:+!!t.canAttackerSeeFullReport,$attacker_points:t.attackerPoints,$defender_points:t.defenderPoints},schema:P()}),i=[t.attacker,t.defender,...t.reinforcements??[]],a=e.selectValue({sql:`SELECT COALESCE(MAX(id), 0) + 1 FROM battle_report_participants;`,schema:P()}),o=i.map((e,t)=>({id:a+t,playerId:e.playerId,tileId:e.tileId}));e.exec({sql:`
      INSERT INTO battle_report_participants (id, battle_id, player_id, tile_id)
      SELECT
        JSON_EXTRACT(participant.value, '$.id'),
        $battle_id,
        JSON_EXTRACT(participant.value, '$.playerId'),
        JSON_EXTRACT(participant.value, '$.tileId')
      FROM JSON_EACH($participants) AS participant;
    `,bind:{$battle_id:r,$participants:JSON.stringify(o)}});let s=[];for(let e=0;e<i.length;e+=1){let t=i[e],n=a+e;for(let e of t.units)s.push({...e,battleParticipantId:n})}return s.length>0&&e.exec({sql:`
        INSERT INTO battle_report_units (
          battle_participant_id,
          unit_id,
          amount_before,
          amount_after,
          amount_imprisoned
        )
        SELECT
          JSON_EXTRACT(unit.value, '$.battleParticipantId'),
          unit_ids.id,
          SUM(JSON_EXTRACT(unit.value, '$.amountBefore')),
          SUM(JSON_EXTRACT(unit.value, '$.amountAfter')),
          SUM(COALESCE(JSON_EXTRACT(unit.value, '$.amountImprisoned'), 0))
        FROM
          JSON_EACH($units) AS unit
          JOIN unit_ids
            ON unit_ids.unit = JSON_EXTRACT(unit.value, '$.unitId')
        GROUP BY
          JSON_EXTRACT(unit.value, '$.battleParticipantId'),
          unit_ids.id;
      `,bind:{$units:JSON.stringify(s)}}),(t.damagedBuildings??[]).length>0&&e.exec({sql:`
        INSERT INTO battle_report_buildings (
          report_id,
          building_id,
          level_before,
          level_after
        )
        SELECT
          $report_id,
          building_ids.id,
          JSON_EXTRACT(building.value, '$.levelBefore'),
          JSON_EXTRACT(building.value, '$.levelAfter')
        FROM
          JSON_EACH($damaged_buildings) AS building
          JOIN building_ids
            ON building_ids.building = JSON_EXTRACT(
              building.value,
              '$.buildingId'
            );
      `,bind:{$report_id:n,$damaged_buildings:JSON.stringify(t.damagedBuildings)}}),n},Rm=(e,t)=>{let n=Mm(e,{villageId:t.villageId,timestamp:t.timestamp,type:`trade`,outcome:t.outcome,tags:[]});return e.exec({sql:`
      INSERT INTO
        trade_reports (report_id, origin_tile_id, target_tile_id, wood, clay, iron, wheat)
      VALUES
        ($report_id, $origin_tile_id, $target_tile_id, $wood, $clay, $iron, $wheat);
    `,bind:{$report_id:n,$origin_tile_id:t.originTileId,$target_tile_id:t.targetTileId,$wood:t.resources.wood,$clay:t.resources.clay,$iron:t.resources.iron,$wheat:t.resources.wheat}}),n},zm=(e,t)=>{let{resolvesAt:n,troops:r,villageId:i}=t,a=0;for(let e of r)a+=e.amount;let o=Td(a);Xp(e,r),Ju(e,K(e,i),n,o);let s=e.selectObject({sql:`
      SELECT v.tile_id, p.tribe_id
      FROM villages v JOIN players p ON p.id = v.player_id
      WHERE v.id = $village_id;
    `,bind:{$village_id:i},schema:L({tile_id:P(),tribe_id:P()})});return Pm(e,{villageId:i,timestamp:n,villageTileId:s.tile_id,tribeId:s.tribe_id,loot:o,units:r}),Ip(e,n),e.exec({sql:`
      INSERT INTO gatherers_hut_expeditions (village_id, completed)
      VALUES ($village_id, 1)
      ON CONFLICT(village_id) DO UPDATE SET
        completed = completed + 1;
    `,bind:{$village_id:i}}),{affectedVillageIds:[i],affectedTileIds:[s.tile_id]}},Bm=(e,t)=>{let{resolvesAt:n}=t,{villageId:r,tileId:i,healthRegeneration:a,speed:o}=e.selectObject({sql:`
      SELECT
        villages.id AS villageId,
        villages.tile_id AS tileId,
        heroes.health_regeneration AS healthRegeneration,
        servers.speed AS speed
      FROM heroes
      JOIN villages ON heroes.village_id = villages.id
      CROSS JOIN servers
      WHERE heroes.player_id = $player_id;
    `,bind:{$player_id:1},schema:L({villageId:N(),tileId:N(),healthRegeneration:N(),speed:N()})});q(e,i,n),e.exec({sql:`UPDATE heroes SET health = 100 WHERE player_id = $player_id;`,bind:{$player_id:1}}),e.exec({sql:`
  INSERT INTO effects (tile_id, effect_id, value, type_id, scope_id, source_id, source_specifier)
  SELECT
    v.tile_id,
    ei.id,
    CASE
      WHEN LOWER(ti.tribe) = 'egyptians' THEN 12 * hsa.resource_production
      ELSE 9 * hsa.resource_production
    END,
    1,
    2,
    2,
    0
  FROM
    heroes AS h
      JOIN villages AS v ON v.id = h.village_id
      JOIN hero_selectable_attributes AS hsa ON h.id = hsa.hero_id
      JOIN players AS p ON h.player_id = p.id
      JOIN tribe_ids AS ti ON p.tribe_id = ti.id
      CROSS JOIN effect_ids AS ei
  WHERE
    h.player_id = $player_id
    AND ei.effect IN (
      'woodProduction',
      'clayProduction',
      'ironProduction',
      'wheatProduction'
    );
`,bind:{$player_id:1}}),Xp(e,[{unitId:`HERO`,amount:1,tileId:i,sourceTileId:i}]);let s=Nd(a,o);return X(e,{villageId:null,type:`heroHealthRegeneration`,startsAt:n,duration:s}),{affectedVillageIds:[r],affectedTileIds:[i]}},Vm=(e,t)=>{let{resolvesAt:n}=t;e.exec({sql:`UPDATE heroes SET health = MIN(health + 1, 100) WHERE player_id = $player_id AND health > 0;`,bind:{$player_id:1}});let{health:r,healthRegeneration:i,speed:a,tileId:o,villageId:s}=e.selectObject({sql:`
      SELECT
        heroes.health AS health,
        villages.tile_id AS tileId,
        heroes.village_id AS villageId,
        heroes.health_regeneration AS healthRegeneration,
        servers.speed AS speed
      FROM heroes
      JOIN villages ON villages.id = heroes.village_id
      CROSS JOIN servers
      WHERE heroes.player_id = $player_id;
    `,bind:{$player_id:1},schema:L({health:N(),tileId:N(),villageId:N(),healthRegeneration:N(),speed:N()})});if(r===100)return{affectedVillageIds:[s],affectedTileIds:[o]};let c=Nd(i,a);return X(e,{villageId:null,type:`heroHealthRegeneration`,startsAt:n,duration:c}),{affectedVillageIds:[s],affectedTileIds:[o]}},Hm=`
  DELETE
  FROM
    map_markers
  WHERE
    player_id = $player_id
    AND tile_id = $tile_id;
`,Um=(e,t)=>{let{cageAmount:n,villageId:r}=t;return e.exec({sql:`
  INSERT INTO
    hero_inventory (hero_id, item_id, amount)
  SELECT h.id, $item_id, $amount
  FROM
    heroes h
      JOIN villages v ON v.player_id = h.player_id
  WHERE
    v.id = $village_id
  ON CONFLICT(hero_id, item_id) DO UPDATE SET
    amount = amount + EXCLUDED.amount;
`,bind:{$village_id:r,$item_id:1023,$amount:n}}),{affectedVillageIds:[r],affectedTileIds:[]}},Wm=(e,t)=>{let{huntingPartyLevel:n,resolvesAt:r,villageId:i}=t,a=e.selectObject({sql:`
  SELECT
    v.tile_id AS villageTileId,
    (
      SELECT tile_id
      FROM
        oasis
      ORDER BY id
      LIMIT 1
    ) AS sourceTileId
  FROM
    villages v
  WHERE
    v.id = $village_id;
`,bind:{$village_id:i},schema:L({villageTileId:N(),sourceTileId:N()})}),o=Id(n),s=Sd(o);return Xp(e,[{unitId:s,amount:1,tileId:a.villageTileId,sourceTileId:a.sourceTileId}]),Fm(e,{villageId:i,timestamp:r,villageTileId:a.villageTileId,unitId:s,amount:1}),Pp(e,s,r),Fp(e,r),{affectedVillageIds:[i],affectedTileIds:[a.villageTileId]}},Gm=(e,t=Date.now())=>{e.selectValue({sql:`
      SELECT
        EXISTS
        (
          SELECT 1
          FROM
            events
          WHERE
            type = 'loyaltyIncrease'
            AND resolves_at > $now
          ) AS event_exists;
    `,bind:{$now:Date.now()},schema:V()})||X(e,{villageId:null,startsAt:t,type:`loyaltyIncrease`})},Km=(e,t,n)=>{e.exec({sql:`
      INSERT INTO loyalties
      VALUES
        ($tile_id, MAX(0, MIN(100, 100 + $amount))) ON CONFLICT DO
      UPDATE SET loyalty = MAX(0, MIN(100, loyalty + $amount))
    `,bind:{$tile_id:t,$amount:n}})},qm=(e,t)=>e.selectValue({sql:`
  SELECT loyalty
  FROM
    loyalties
  WHERE
    tile_id = $tile_id;
`,bind:{$tile_id:t},schema:P()})??100,Jm=(e,t)=>{let{resolvesAt:n}=t,r=e.selectValues({sql:`
      SELECT DISTINCT v.id AS villageId
      FROM
        loyalties l
          JOIN villages v ON v.tile_id = l.tile_id
      WHERE
        v.player_id = $player_id;
    `,bind:{$player_id:1},schema:N()}),i=e.selectValues({sql:`
      SELECT DISTINCT l.tile_id
      FROM
        loyalties l
          JOIN villages v ON v.tile_id = l.tile_id
      WHERE
        v.player_id = $player_id;
    `,bind:{$player_id:1},schema:N()});return e.exec({sql:`
      UPDATE loyalties
      SET loyalty = loyalty + COALESCE(
        (
          SELECT 1 + COALESCE(
            (
              SELECT
                bf.level
              FROM
                building_fields bf
                  JOIN building_ids bi ON bi.id = bf.building_id
              WHERE
                bf.village_id = v.id
                AND bi.building = 'RESIDENCE'
              LIMIT 1
              ),
            0
          )
          FROM
            villages v
          WHERE
            v.tile_id = loyalties.tile_id
        ),
        1
      );
    `}),e.selectValue({sql:`SELECT EXISTS(SELECT 1 FROM loyalties);`,schema:V()})&&Gm(e,n),{affectedVillageIds:r,affectedTileIds:i}},Ym=(e,t)=>{let{villageId:n,targetVillageId:r,originTileId:i,targetTileId:a,resources:o,merchantAmount:s,resolvesAt:c}=t;if(Ep(o)===0)return{affectedVillageIds:[n],affectedTileIds:[i,a]};Ju(e,a,c,[o.wood,o.clay,o.iron,o.wheat]);let l=e.selectValues({sql:`
      SELECT id FROM villages
      WHERE id IN ($origin_village_id, $target_village_id)
        AND player_id = $player_id;
    `,bind:{$origin_village_id:n,$target_village_id:r,$player_id:1},schema:N()}),u=l.some(e=>e===n),d=l.some(e=>e===r);return u&&!d&&Rm(e,{villageId:n,timestamp:c,outcome:`outgoingMerchantsArrived`,originTileId:i,targetTileId:a,resources:o}),d&&Rm(e,{villageId:r,timestamp:c,outcome:`incomingMerchantsArrived`,originTileId:i,targetTileId:a,resources:o}),X(e,{type:`resourceTransfer`,villageId:n,targetVillageId:n,originTileId:a,targetTileId:i,resources:{wood:0,clay:0,iron:0,wheat:0},merchantAmount:s,startsAt:c}),{affectedVillageIds:[n,r],affectedTileIds:[i,a]}},Xm=(e,t)=>{let{villageId:n,targetVillageId:r,originTileId:i,targetTileId:a,resources:o,resolvesAt:s,interval:c}=t;try{let{merchant:t}=kp(e,n),c=Tp(o,t.merchantCapacity);X(e,{type:`resourceTransfer`,villageId:n,targetVillageId:r,originTileId:i,targetTileId:a,resources:o,merchantAmount:c,startsAt:s})}catch{}return X(e,{type:`tradeRoute`,villageId:n,targetVillageId:r,originTileId:i,targetTileId:a,resources:o,interval:c,startsAt:s+c}),{affectedVillageIds:[n,r],affectedTileIds:[i,a]}},Zm=(e,t)=>{let{cageAmount:n,villageId:r}=t;return e.exec({sql:`
      WITH RECURSIVE cage_counter(i) AS (
        SELECT 1
        UNION ALL
        SELECT i + 1
        FROM cage_counter
        WHERE i < $amount
      )
      INSERT INTO trapper_cages (village_id, unit_id)
      SELECT $village_id, NULL
      FROM cage_counter;
    `,bind:{$village_id:r,$amount:n}}),{affectedVillageIds:[r],affectedTileIds:[]}},Qm=e=>({id:`queuedTroopCount-${e}`,scope:`global`}),$m=()=>[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5,15e4,2e5,3e5,5e5,75e4,1e6].flatMap(e=>Qm(e)),eh=e=>({id:`adventureCount-${e}`,scope:`global`}),th=()=>[1,3,5,10,15,20,30,50,75,100,125,150,175,200,250,300,350,400,450,500].flatMap(e=>eh(e)),nh=e=>({id:`killCount-${e}`,scope:`global`}),rh=()=>[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5,15e4,2e5,3e5,5e5,75e4,1e6].flatMap(e=>nh(e)),ih=(e,t)=>({id:`unitKillCount-${e}-${t}`,scope:`global`}),ah=()=>{let e=[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5];return Qd.filter(({id:e})=>e!==`HERO`&&!e.includes(`SETTLER`)&&!e.includes(`CHIEF`)).flatMap(({id:t})=>e.flatMap(e=>ih(t,e)))},oh=(e,t)=>({id:`captureAnimalCountById-${e}-${t}`,scope:`global`}),sh=()=>{let e=[1,3,5,10,20,50];return Id(5).flatMap(t=>e.flatMap(e=>oh(t,e)))},ch=e=>({id:`captureAnimalKindCount-${e}`,scope:`global`}),lh=()=>[ch(Id(5).length)],uh=e=>({id:`gatheredResourceCount-${e}`,scope:`global`}),dh=()=>[20,100,500,1e3,5e3,1e4,5e4,1e5].flatMap(e=>uh(e)),Z=(e,t,n=`oneOf`)=>({id:`${n}-${e}-${t}`,scope:`village`});[...th(),...$m(),...ah(),...rh(),...sh(),...lh(),...dh()];const fh=e=>{let[t,n,r,i]=ff(e);return[...t>0?[Z(`WOODCUTTER`,1),Z(`WOODCUTTER`,2),Z(`WOODCUTTER`,4),Z(`WOODCUTTER`,6),Z(`WOODCUTTER`,8),Z(`WOODCUTTER`,10),Z(`WOODCUTTER`,1,`every`),Z(`WOODCUTTER`,3,`every`),Z(`WOODCUTTER`,5,`every`),Z(`WOODCUTTER`,7,`every`),Z(`WOODCUTTER`,9,`every`),Z(`SAWMILL`,1),Z(`SAWMILL`,3),Z(`SAWMILL`,5)]:[],...n>0?[Z(`CLAY_PIT`,1),Z(`CLAY_PIT`,2),Z(`CLAY_PIT`,4),Z(`CLAY_PIT`,6),Z(`CLAY_PIT`,8),Z(`CLAY_PIT`,10),Z(`CLAY_PIT`,1,`every`),Z(`CLAY_PIT`,3,`every`),Z(`CLAY_PIT`,5,`every`),Z(`CLAY_PIT`,7,`every`),Z(`CLAY_PIT`,9,`every`),Z(`BRICKYARD`,1),Z(`BRICKYARD`,3),Z(`BRICKYARD`,5)]:[],...r>0?[Z(`IRON_MINE`,1),Z(`IRON_MINE`,2),Z(`IRON_MINE`,4),Z(`IRON_MINE`,6),Z(`IRON_MINE`,8),Z(`IRON_MINE`,10),Z(`IRON_MINE`,1,`every`),Z(`IRON_MINE`,3,`every`),Z(`IRON_MINE`,5,`every`),Z(`IRON_MINE`,7,`every`),Z(`IRON_MINE`,9,`every`),Z(`IRON_FOUNDRY`,1),Z(`IRON_FOUNDRY`,3),Z(`IRON_FOUNDRY`,5)]:[],...i>0?[Z(`WHEAT_FIELD`,1),Z(`WHEAT_FIELD`,2),Z(`WHEAT_FIELD`,4),Z(`WHEAT_FIELD`,6),Z(`WHEAT_FIELD`,8),Z(`WHEAT_FIELD`,10),Z(`WHEAT_FIELD`,1,`every`),Z(`WHEAT_FIELD`,3,`every`),Z(`WHEAT_FIELD`,5,`every`),Z(`WHEAT_FIELD`,7,`every`),Z(`WHEAT_FIELD`,9,`every`),Z(`GRAIN_MILL`,1),Z(`GRAIN_MILL`,3),Z(`GRAIN_MILL`,5),Z(`BAKERY`,1),Z(`BAKERY`,3),Z(`BAKERY`,5)]:[],Z(`MAIN_BUILDING`,1),Z(`MAIN_BUILDING`,5),Z(`MAIN_BUILDING`,10),Z(`MAIN_BUILDING`,15),Z(`MAIN_BUILDING`,20),Z(`WAREHOUSE`,1),Z(`WAREHOUSE`,5),Z(`WAREHOUSE`,10),Z(`WAREHOUSE`,15),Z(`WAREHOUSE`,20),Z(`GRANARY`,1),Z(`GRANARY`,5),Z(`GRANARY`,10),Z(`GRANARY`,15),Z(`GRANARY`,20),Z(`MARKETPLACE`,1),Z(`MARKETPLACE`,5),Z(`MARKETPLACE`,10),Z(`MARKETPLACE`,15),Z(`MARKETPLACE`,20),Z(`BARRACKS`,1),Z(`BARRACKS`,5),Z(`BARRACKS`,10),Z(`BARRACKS`,15),Z(`BARRACKS`,20),Z(`STABLE`,1),Z(`STABLE`,5),Z(`STABLE`,10),Z(`STABLE`,15),Z(`STABLE`,20),Z(`RALLY_POINT`,5),Z(`RALLY_POINT`,10),Z(`RALLY_POINT`,15),Z(`RALLY_POINT`,20),Z(`ACADEMY`,1),Z(`ACADEMY`,5),Z(`ACADEMY`,10),Z(`ACADEMY`,15),Z(`ACADEMY`,20),Z(`SMITHY`,1),Z(`SMITHY`,5),Z(`SMITHY`,10),Z(`SMITHY`,15),Z(`SMITHY`,20),Z(`HEROS_MANSION`,10),Z(`HEROS_MANSION`,15),Z(`HEROS_MANSION`,20),Z(`CRANNY`,1),Z(`CRANNY`,3),Z(`CRANNY`,7),Z(`CRANNY`,10)]},ph=(e,t,n)=>{let r=new Map([[`romans`,`ROMAN_WALL`],[`gauls`,`GAUL_WALL`],[`teutons`,`TEUTONIC_WALL`],[`huns`,`HUN_WALL`],[`egyptians`,`EGYPTIAN_WALL`]]).get(t);return[...fh(n),Z(r,1),Z(r,5),Z(r,10),Z(r,15),Z(r,20)].map(t=>({...t,villageId:e}))},mh=new Map([[2,`WHEAT_FIELD`],[8,`WHEAT_FIELD`],[9,`WHEAT_FIELD`],[12,`WHEAT_FIELD`],[13,`WHEAT_FIELD`],[15,`WHEAT_FIELD`]]),hh=new Map([[3,`WOODCUTTER`],[4,`IRON_MINE`],[6,`CLAY_PIT`],[7,`IRON_MINE`],[11,`IRON_MINE`],[14,`WOODCUTTER`],[16,`CLAY_PIT`],[17,`WOODCUTTER`],[18,`CLAY_PIT`]]),gh=e=>new Map([...mh,...hh,...e]),_h=(e,t,n)=>gh([[1,e],[5,t],[10,n]]),vh={3456:_h(`IRON_MINE`,`CLAY_PIT`,`IRON_MINE`),3546:_h(`CLAY_PIT`,`CLAY_PIT`,`IRON_MINE`),4356:_h(`WOODCUTTER`,`IRON_MINE`,`IRON_MINE`),4536:_h(`WOODCUTTER`,`CLAY_PIT`,`CLAY_PIT`),5346:_h(`WOODCUTTER`,`WOODCUTTER`,`IRON_MINE`),5436:_h(`WOODCUTTER`,`CLAY_PIT`,`WOODCUTTER`),4446:_h(`WOODCUTTER`,`CLAY_PIT`,`IRON_MINE`),4437:_h(`WOODCUTTER`,`CLAY_PIT`,`WHEAT_FIELD`),4347:_h(`WOODCUTTER`,`WHEAT_FIELD`,`IRON_MINE`),3447:_h(`WHEAT_FIELD`,`CLAY_PIT`,`IRON_MINE`),3339:_h(`WHEAT_FIELD`,`WHEAT_FIELD`,`WHEAT_FIELD`),11115:new Map([[1,`WHEAT_FIELD`],[2,`WHEAT_FIELD`],[3,`WOODCUTTER`],[4,`IRON_MINE`],[5,`WHEAT_FIELD`],[6,`WHEAT_FIELD`],[7,`WHEAT_FIELD`],[8,`WHEAT_FIELD`],[9,`WHEAT_FIELD`],[10,`WHEAT_FIELD`],[11,`WHEAT_FIELD`],[12,`WHEAT_FIELD`],[13,`WHEAT_FIELD`],[14,`WHEAT_FIELD`],[15,`WHEAT_FIELD`],[16,`CLAY_PIT`],[17,`WHEAT_FIELD`],[18,`WHEAT_FIELD`]]),"00018":new Map([[1,`WHEAT_FIELD`],[2,`WHEAT_FIELD`],[3,`WHEAT_FIELD`],[4,`WHEAT_FIELD`],[5,`WHEAT_FIELD`],[6,`WHEAT_FIELD`],[7,`WHEAT_FIELD`],[8,`WHEAT_FIELD`],[9,`WHEAT_FIELD`],[10,`WHEAT_FIELD`],[11,`WHEAT_FIELD`],[12,`WHEAT_FIELD`],[13,`WHEAT_FIELD`],[14,`WHEAT_FIELD`],[15,`WHEAT_FIELD`],[16,`WHEAT_FIELD`],[17,`WHEAT_FIELD`],[18,`WHEAT_FIELD`]])},yh=e=>vh[e],bh=new Map([[`romans`,`ROMAN_WALL`],[`gauls`,`GAUL_WALL`],[`teutons`,`TEUTONIC_WALL`],[`huns`,`HUN_WALL`],[`egyptians`,`EGYPTIAN_WALL`],[`spartans`,`SPARTAN_WALL`],[`nature`,`NATURE_WALL`],[`natars`,`NATAR_WALL`]]),xh=e=>bh.get(e),Sh=new Map([[`player`,0],[`xxs`,5],[`xs`,5],[`sm`,10],[`md`,15],[`lg`,20],[`xl`,20],[`2xl`,20],[`3xl`,20],[`4xl`,20]]),Ch=e=>Sh.get(e),wh=new Map([[`player`,0],[`xxs`,3],[`xs`,4],[`sm`,6],[`md`,8],[`lg`,10],[`xl`,12],[`2xl`,14],[`3xl`,16],[`4xl`,18]]),Th=e=>wh.get(e),Eh=new Map([[`player`,[{field_id:38,building_id:`MAIN_BUILDING`,level:1},{field_id:39,building_id:`RALLY_POINT`,level:1}]],[`xxs`,[{field_id:26,building_id:`WAREHOUSE`,level:2},{field_id:27,building_id:`GRANARY`,level:1},{field_id:31,building_id:`CRANNY`,level:2},{field_id:38,building_id:`MAIN_BUILDING`,level:2},{field_id:39,building_id:`RALLY_POINT`,level:1}]],[`xs`,[{field_id:26,building_id:`WAREHOUSE`,level:3},{field_id:27,building_id:`GRANARY`,level:2},{field_id:30,building_id:`EMBASSY`,level:1},{field_id:31,building_id:`CRANNY`,level:3},{field_id:32,building_id:`MARKETPLACE`,level:1},{field_id:38,building_id:`MAIN_BUILDING`,level:4},{field_id:39,building_id:`RALLY_POINT`,level:2}]],[`sm`,[{field_id:22,building_id:`BARRACKS`,level:3},{field_id:23,building_id:`RESIDENCE`,level:4},{field_id:24,building_id:`ACADEMY`,level:2},{field_id:25,building_id:`SMITHY`,level:2},{field_id:26,building_id:`WAREHOUSE`,level:6},{field_id:27,building_id:`GRANARY`,level:5},{field_id:30,building_id:`EMBASSY`,level:3},{field_id:31,building_id:`CRANNY`,level:5},{field_id:32,building_id:`MARKETPLACE`,level:3},{field_id:38,building_id:`MAIN_BUILDING`,level:7},{field_id:39,building_id:`RALLY_POINT`,level:3}]],[`md`,[{field_id:21,building_id:`TOWN_HALL`,level:1},{field_id:22,building_id:`BARRACKS`,level:6},{field_id:23,building_id:`RESIDENCE`,level:7},{field_id:24,building_id:`ACADEMY`,level:5},{field_id:25,building_id:`SMITHY`,level:4},{field_id:26,building_id:`WAREHOUSE`,level:10},{field_id:27,building_id:`GRANARY`,level:9},{field_id:30,building_id:`EMBASSY`,level:5},{field_id:31,building_id:`CRANNY`,level:6},{field_id:32,building_id:`MARKETPLACE`,level:7},{field_id:33,building_id:`STABLE`,level:3},{field_id:34,building_id:`WORKSHOP`,level:1},{field_id:38,building_id:`MAIN_BUILDING`,level:10},{field_id:39,building_id:`RALLY_POINT`,level:5}]],[`lg`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:4},{field_id:20,building_id:`HOSPITAL`,level:3},{field_id:21,building_id:`TOWN_HALL`,level:4},{field_id:22,building_id:`BARRACKS`,level:10},{field_id:23,building_id:`RESIDENCE`,level:10},{field_id:24,building_id:`ACADEMY`,level:8},{field_id:25,building_id:`SMITHY`,level:7},{field_id:26,building_id:`WAREHOUSE`,level:15},{field_id:27,building_id:`GRANARY`,level:14},{field_id:28,building_id:`HEROS_MANSION`,level:6},{field_id:29,building_id:`TREASURY`,level:3},{field_id:30,building_id:`EMBASSY`,level:7},{field_id:31,building_id:`CRANNY`,level:7},{field_id:32,building_id:`MARKETPLACE`,level:11},{field_id:33,building_id:`STABLE`,level:7},{field_id:34,building_id:`WORKSHOP`,level:4},{field_id:38,building_id:`MAIN_BUILDING`,level:13},{field_id:39,building_id:`RALLY_POINT`,level:7}]],[`xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:8},{field_id:20,building_id:`HOSPITAL`,level:6},{field_id:21,building_id:`TOWN_HALL`,level:7},{field_id:22,building_id:`BARRACKS`,level:14},{field_id:23,building_id:`RESIDENCE`,level:14},{field_id:24,building_id:`ACADEMY`,level:11},{field_id:25,building_id:`SMITHY`,level:10},{field_id:26,building_id:`WAREHOUSE`,level:19},{field_id:27,building_id:`GRANARY`,level:18},{field_id:28,building_id:`HEROS_MANSION`,level:10},{field_id:29,building_id:`TREASURY`,level:6},{field_id:30,building_id:`EMBASSY`,level:9},{field_id:31,building_id:`CRANNY`,level:8},{field_id:32,building_id:`MARKETPLACE`,level:14},{field_id:33,building_id:`STABLE`,level:11},{field_id:34,building_id:`WORKSHOP`,level:7},{field_id:35,building_id:`BRICKYARD`,level:3},{field_id:36,building_id:`SAWMILL`,level:3},{field_id:37,building_id:`TRADE_OFFICE`,level:5},{field_id:38,building_id:`MAIN_BUILDING`,level:16},{field_id:39,building_id:`RALLY_POINT`,level:10}]],[`2xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:12},{field_id:20,building_id:`HOSPITAL`,level:8},{field_id:21,building_id:`TOWN_HALL`,level:10},{field_id:22,building_id:`BARRACKS`,level:17},{field_id:23,building_id:`RESIDENCE`,level:16},{field_id:24,building_id:`ACADEMY`,level:14},{field_id:25,building_id:`SMITHY`,level:13},{field_id:26,building_id:`WAREHOUSE`,level:20},{field_id:27,building_id:`GRANARY`,level:20},{field_id:28,building_id:`HEROS_MANSION`,level:13},{field_id:29,building_id:`TREASURY`,level:8},{field_id:30,building_id:`EMBASSY`,level:11},{field_id:31,building_id:`CRANNY`,level:9},{field_id:32,building_id:`MARKETPLACE`,level:17},{field_id:33,building_id:`STABLE`,level:14},{field_id:34,building_id:`WORKSHOP`,level:10},{field_id:35,building_id:`BRICKYARD`,level:5},{field_id:36,building_id:`SAWMILL`,level:5},{field_id:37,building_id:`TRADE_OFFICE`,level:8},{field_id:38,building_id:`MAIN_BUILDING`,level:18},{field_id:39,building_id:`RALLY_POINT`,level:12}]],[`3xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:15},{field_id:20,building_id:`HOSPITAL`,level:10},{field_id:21,building_id:`TOWN_HALL`,level:13},{field_id:22,building_id:`BARRACKS`,level:19},{field_id:23,building_id:`RESIDENCE`,level:18},{field_id:24,building_id:`ACADEMY`,level:16},{field_id:25,building_id:`SMITHY`,level:15},{field_id:26,building_id:`WAREHOUSE`,level:20},{field_id:27,building_id:`GRANARY`,level:20},{field_id:28,building_id:`HEROS_MANSION`,level:16},{field_id:29,building_id:`TREASURY`,level:10},{field_id:30,building_id:`EMBASSY`,level:13},{field_id:31,building_id:`CRANNY`,level:10},{field_id:32,building_id:`MARKETPLACE`,level:19},{field_id:33,building_id:`STABLE`,level:17},{field_id:34,building_id:`WORKSHOP`,level:13},{field_id:35,building_id:`BRICKYARD`,level:5},{field_id:36,building_id:`SAWMILL`,level:5},{field_id:37,building_id:`TRADE_OFFICE`,level:11},{field_id:38,building_id:`MAIN_BUILDING`,level:19},{field_id:39,building_id:`RALLY_POINT`,level:15}]],[`4xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:20},{field_id:20,building_id:`HOSPITAL`,level:12},{field_id:21,building_id:`TOWN_HALL`,level:15},{field_id:22,building_id:`BARRACKS`,level:20},{field_id:23,building_id:`RESIDENCE`,level:20},{field_id:24,building_id:`ACADEMY`,level:20},{field_id:25,building_id:`SMITHY`,level:20},{field_id:26,building_id:`WAREHOUSE`,level:20},{field_id:27,building_id:`GRANARY`,level:20},{field_id:28,building_id:`HEROS_MANSION`,level:20},{field_id:29,building_id:`TREASURY`,level:12},{field_id:30,building_id:`EMBASSY`,level:15},{field_id:31,building_id:`CRANNY`,level:10},{field_id:32,building_id:`MARKETPLACE`,level:20},{field_id:33,building_id:`STABLE`,level:20},{field_id:34,building_id:`WORKSHOP`,level:15},{field_id:35,building_id:`BRICKYARD`,level:5},{field_id:36,building_id:`SAWMILL`,level:5},{field_id:37,building_id:`TRADE_OFFICE`,level:14},{field_id:38,building_id:`MAIN_BUILDING`,level:20},{field_id:39,building_id:`RALLY_POINT`,level:20}]]]),Dh=e=>Eh.get(e),Oh=(e,t,n)=>{let r=Ch(e),i=xh(t),a=Th(e),o=yh(n),s=Dh(e);return[...Array.from(o,([e,t])=>({building_id:t,level:a,field_id:e})),...s,{building_id:i,field_id:40,level:r}]},kh=`
  SELECT id
  FROM villages
  WHERE tile_id = $target_tile_id;
`,Ah=R([`wood`,`clay`,`iron`,`wheat`,`shared`]).meta({id:`HeroResourceToProduce`});L({id:N(),stats:L({health:N(),experience:N(),attackPower:N(),healthRegeneration:N(),damageReduction:N(),experienceModifier:N(),speed:N(),natarianAttackBonus:N(),attackBonus:N(),defenceBonus:N()}),selectableAttributes:L({attackPower:N(),resourceProduction:N(),attackBonus:N(),defenceBonus:N()}),resourceToProduce:Ah,villageId:N(),isHeroHome:F()}).meta({id:`Hero`});const jh=[`woodProduction`,`clayProduction`,`ironProduction`,`wheatProduction`],Mh={wood:`woodProduction`,clay:`clayProduction`,iron:`ironProduction`,wheat:`wheatProduction`},Nh=e=>{let t=e.toLowerCase()===`egyptians`;return{shared:t?12:9,focused:t?40:30}},Ph=(e,t)=>{e.exec({sql:`
      UPDATE heroes
      SET
        experience = experience + $experience
      WHERE
        player_id = $player_id;
    `,bind:{$experience:t,$player_id:1}})},Fh=(e,t)=>{let n=e.selectValue({sql:`SELECT village_id FROM heroes WHERE player_id = $player_id;`,bind:{$player_id:1},schema:N()});q(e,K(e,n),t),e.exec({sql:`
  DELETE
  FROM
    effects
  WHERE
    source_id = (SELECT id FROM effect_source_ids WHERE source = 'hero')
    AND EXISTS (
      SELECT
        1
      FROM
        heroes
        JOIN villages ON villages.id = heroes.village_id
      WHERE
        villages.tile_id = effects.tile_id
        AND heroes.player_id = $player_id
      );
`,bind:{$player_id:1}}),e.exec({sql:`DELETE FROM events WHERE type = 'heroHealthRegeneration';`})},Ih=({database:e,villageId:t,tribe:n,resourceProduction:r,resourceToProduce:i})=>{let a=Nh(n),o=Ah.parse(i),s=jh.map(e=>({effectId:e,value:o===`shared`?a.shared*r:Mh[o]===e?a.focused*r:0}));e.exec({sql:`
      UPDATE effects
      SET value = json_extract(effect.value, '$.value')
      FROM
        json_each($effects) AS effect
        JOIN effect_ids
          ON effect_ids.effect = json_extract(effect.value, '$.effectId')
      WHERE
        effects.effect_id = effect_ids.id
        AND effects.source_id = (
          SELECT id FROM effect_source_ids WHERE source = 'hero'
        )
        AND effects.source_specifier = 0
        AND effects.tile_id = (
          SELECT tile_id FROM villages WHERE id = $village_id
        );
    `,bind:{$effects:JSON.stringify(s),$village_id:t}})},Lh=(e,t,n)=>{let{healthRegeneration:r,speed:i}=e.selectObject({sql:`
      SELECT
        heroes.health_regeneration AS healthRegeneration,
        servers.speed AS speed
      FROM heroes
      CROSS JOIN servers
      WHERE heroes.player_id = (
        SELECT player_id
        FROM villages
        WHERE id = $village_id
      );
    `,bind:{$village_id:t},schema:L({healthRegeneration:N(),speed:N()})}),a=Nd(r,i);X(e,{villageId:null,type:`heroHealthRegeneration`,startsAt:n,duration:a})},Rh=(e,t,n,r)=>{q(e,K(e,t),r),q(e,K(e,n),r),e.exec({sql:`
  UPDATE heroes
  SET village_id = $target_village_id
  WHERE
    player_id = (
      SELECT player_id
      FROM villages
      WHERE id = $current_village_id
    );
`,bind:{$current_village_id:t,$target_village_id:n}}),e.exec({sql:`
  UPDATE effects
  SET tile_id = (SELECT tile_id FROM villages WHERE id = $target_village_id)
  WHERE
    source_id = (SELECT id FROM effect_source_ids WHERE source = 'hero')
    AND scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
    AND tile_id = (SELECT tile_id FROM villages WHERE id = $current_village_id);
`,bind:{$current_village_id:t,$target_village_id:n}})},zh=L({unit_id:J,amount:N().int().min(1),source_tile_id:N(),source_village_id:N().nullable()}),Bh=e=>{let t=0;for(let{unitId:n,amount:r}of e){let{unitWheatConsumption:e}=ef(n);t+=e*r}return t},Vh=e=>{let t=0;for(let{unitId:n,amount:r}of e){let{unitCarryCapacity:e}=ef(n);t+=e*r}return t},Hh=(e,t,n)=>{let r=0;for(let t of e)r+=t;let i=Math.max(r-n,0);return Math.min(t,i)},Uh=(e,t)=>{let n=[0,0,0,0],r=[e[0],e[1],e[2],e[3]],i=Math.max(0,t);for(;i>0;){let e=0;for(let t=0;t<r.length;t+=1)r[t]>0&&(e+=1);if(e===0)break;let t=Math.max(1,Math.floor(i/e));for(let e=0;e<r.length&&!(i<=0);e+=1){if(r[e]<=0)continue;let a=Math.min(r[e],t,i);n[e]+=a,r[e]-=a,i-=a}}return n},Wh=L({id:N(),tile_id:N(),coordinates_x:N(),coordinates_y:N(),name:j(),slug:j().nullable(),resource_field_composition:Bp}).meta({id:`GetVillagesByPlayerRow`}),Gh=L({id:N(),tile_id:N(),coordinates_x:N(),coordinates_y:N(),name:j(),slug:j().nullable(),resource_field_composition:Bp,population:N(),occupied_oasis_json:j()}).meta({id:`GetPlayerVillagesWithPopulationRow`}),Kh=L({unit_id:J,amount:N().min(1),tile_id:N(),source_tile_id:N(),source_tile_type:Hp.nullable()}).meta({id:`GetStationedTroopsByTileRow`}),qh=L({unit_id:J,amount:N().min(1),updated_at:N()}).meta({id:`GetWoundedTroopsByVillageRow`}),Jh=L({village_id:N(),target_type:R([`village`,`oasis`]),tile_id:N(),coordinates_x:N(),coordinates_y:N(),name:j(),slug:j().nullable(),resource_field_composition:Bp,unit_id:J,amount:N().min(1),source_tile_id:N(),source_tile_type:Hp.nullable()}).meta({id:`GetSentReinforcementsByTileRow`}),Yh=L({sourceVillageId:N().nullable(),sourceTileType:Hp.nullable(),currentVillageId:N(),currentTileId:N()}),Xh=L({currentVillageId:N(),currentTileId:N(),stationedTileType:Hp.nullable(),stationedVillageId:N().nullable()}),Zh=N().nullable(),Qh=B().int().min(1),$h=I(L({unitId:J,amount:N().int().min(1)})).min(1),eg=L({stationedTileId:Qh,troops:$h}).meta({id:`ReturnSentReinforcements`}),tg=L({sourceTileId:Qh,troops:$h}).meta({id:`RelocateReinforcements`}),ng=L({sourceTileId:Qh,troops:$h}).meta({id:`ReturnReinforcements`}),rg=L({stationedTileId:Qh,troops:$h}).meta({id:`RelocateSentReinforcements`}),ig=`
  SELECT
    CASE
      WHEN stt.type = 'free' THEN sv.id
      WHEN stt.type = 'oasis' THEN (
        SELECT MAX(so.village_id)
        FROM
          oasis so
        WHERE
          so.tile_id = $source_tile_id
      )
    END AS sourceVillageId,
    stt.type AS sourceTileType,
    cv.id AS currentVillageId,
    cv.tile_id AS currentTileId
  FROM villages cv
    LEFT JOIN tiles st ON st.id = $source_tile_id
    LEFT JOIN tile_type_ids stt ON stt.id = st.type_id
    LEFT JOIN villages sv ON sv.tile_id = $source_tile_id
  WHERE cv.tile_id = $current_tile_id;
`,ag=`
  SELECT
    cv.id AS currentVillageId,
    cv.tile_id AS currentTileId,
    stt.type AS stationedTileType,
    CASE
      WHEN stt.type = 'free' THEN sv.id
      WHEN stt.type = 'oasis' THEN (
        SELECT MAX(so.village_id)
        FROM
          oasis so
        WHERE
          so.tile_id = $stationed_tile_id
      )
    END AS stationedVillageId
  FROM villages cv
    LEFT JOIN tiles st ON st.id = $stationed_tile_id
    LEFT JOIN tile_type_ids stt ON stt.id = st.type_id
    LEFT JOIN villages sv ON sv.tile_id = $stationed_tile_id
  WHERE cv.tile_id = $current_tile_id;
`,og=(e,t,n,r,i)=>{let a=Bh(t);q(e,n,i),e.exec({sql:yu,bind:{$tile_id:n,$increase_amount:-a}}),q(e,r,i),e.exec({sql:yu,bind:{$tile_id:r,$increase_amount:a}})},sg=({troops:e,tileId:t,sourceTileId:n})=>e.map(e=>({...e,tileId:t,sourceTileId:n})),cg=(e,t)=>{if(t.length===1){let n=t[0];if((e.selectValue({sql:`
  SELECT amount
  FROM troops
  WHERE
    unit_id = (
      SELECT id
      FROM unit_ids
      WHERE unit = $unit_id
    )
    AND tile_id = $tile_id
    AND source_tile_id = $source_tile_id;
`,bind:{$unit_id:n.unitId,$tile_id:n.tileId,$source_tile_id:n.sourceTileId},schema:Zh})??0)<n.amount)throw Error(`Not enough troops available`);return}if(e.selectValue({sql:`
      WITH requested_troops AS (
        SELECT
          unit_ids.id AS unit_id,
          json_extract(troop.value, '$.tileId') AS tile_id,
          json_extract(troop.value, '$.sourceTileId') AS source_tile_id,
          SUM(json_extract(troop.value, '$.amount')) AS amount
        FROM
          json_each($troops) AS troop
          JOIN unit_ids
            ON unit_ids.unit = json_extract(troop.value, '$.unitId')
        GROUP BY unit_ids.id, tile_id, source_tile_id
      )
      SELECT EXISTS (
        SELECT 1
        FROM
          requested_troops
          LEFT JOIN troops
            ON troops.unit_id = requested_troops.unit_id
            AND troops.tile_id = requested_troops.tile_id
            AND troops.source_tile_id = requested_troops.source_tile_id
        GROUP BY
          requested_troops.unit_id,
          requested_troops.tile_id,
          requested_troops.source_tile_id,
          requested_troops.amount
        HAVING COALESCE(SUM(troops.amount), 0) < requested_troops.amount
      );
    `,bind:{$troops:JSON.stringify(t)},schema:V()}))throw Error(`Not enough troops available`)},lg=(e,t,n,r)=>{let i=sg({troops:t,tileId:n.tileId,sourceTileId:n.sourceTileId});cg(e,i),Zp(e,i),Xp(e,sg({troops:t,tileId:r.tileId,sourceTileId:r.sourceTileId}))},ug=(e,t,n,r,i,a)=>{let o=sg({troops:i,tileId:t,sourceTileId:r});cg(e,o),Zp(e,o);let s=e.selectValue({sql:Su,bind:{$tile_id:n},schema:N().nullable()});if(s==null)throw Error(`Target village not found`);X(e,{type:`troopMovementReturn`,villageId:s,startsAt:a,originTileId:t,targetTileId:n,originalMovementType:`troopMovementReturnReinforcements`,troops:o})},dg=(e,t,n)=>{let r=sg({troops:t,tileId:n.tileId,sourceTileId:n.sourceTileId});cg(e,r),Zp(e,r)},fg=e=>e.some(({unitId:e})=>e===`HERO`),pg=L({village_tile_id:N(),previous_owner_village_id:N().nullable(),previous_owner_tile_id:N().nullable()}),mg=(e,t,n,r)=>{let{village_tile_id:i,previous_owner_village_id:a,previous_owner_tile_id:o}=e.selectObject({sql:`
  WITH previous_owner AS (
    SELECT MAX(village_id) AS village_id
    FROM
      oasis
    WHERE
      tile_id = $oasis_tile_id
  )
  SELECT
    v.tile_id AS village_tile_id,
    po.village_id AS previous_owner_village_id,
    pv.tile_id AS previous_owner_tile_id
  FROM
    villages v
      CROSS JOIN previous_owner po
      LEFT JOIN villages pv ON pv.id = po.village_id
  WHERE
    v.id = $village_id
  LIMIT 1;
`,bind:{$village_id:t,$oasis_tile_id:n},schema:pg});return a===t?{previousOwnerVillageId:a}:(a!==null&&(q(e,o,r),e.exec({sql:`
  DELETE
  FROM
    effects
  WHERE
    source_id = (SELECT id FROM effect_source_ids WHERE source = 'oasis')
    AND tile_id = $tile_id
    AND source_specifier = $source_specifier;
`,bind:{$tile_id:o,$source_specifier:n}})),q(e,i,r),e.exec({sql:`
  INSERT INTO effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
  SELECT
    ei.id,
    CASE
      WHEN o.bonus = 25 THEN 1.25
      ELSE 1.5
    END,
    (SELECT id FROM effect_type_ids WHERE type = 'bonus'),
    (SELECT id FROM effect_scope_ids WHERE scope = 'local'),
    (SELECT id FROM effect_source_ids WHERE source = 'oasis'),
    $village_tile_id,
    $oasis_tile_id
  FROM
    oasis o
      JOIN resource_ids ri ON ri.id = o.resource_id
      JOIN effect_ids ei ON ei.effect = ri.resource || 'Production'
  WHERE
    o.tile_id = $oasis_tile_id;
`,bind:{$village_tile_id:i,$oasis_tile_id:n}}),e.exec({sql:`
  UPDATE oasis
  SET
    village_id = $village_id
  WHERE
    tile_id = $oasis_tile_id;
`,bind:{$oasis_tile_id:n,$village_id:t}}),{previousOwnerVillageId:a})},hg=(e,t,n,r)=>{let i=e.selectObjects({sql:`
  SELECT
    ui.unit AS unit_id,
    t.amount,
    t.source_tile_id,
    sv.id AS source_village_id
  FROM
    troops t
      JOIN unit_ids ui ON ui.id = t.unit_id
      LEFT JOIN villages sv ON sv.tile_id = t.source_tile_id
  WHERE
    t.tile_id = $oasis_tile_id
    AND t.source_tile_id != $oasis_tile_id
    AND EXISTS (
      SELECT 1
      FROM
        oasis o
      WHERE
        o.tile_id = t.tile_id
        AND o.village_id = $village_id
    )
  ORDER BY
    t.source_tile_id,
    ui.id;
`,bind:{$oasis_tile_id:t,$village_id:n},schema:zh}),a=new Map;for(let e of i){if(e.source_village_id===null)throw Error(`Source village not found`);let t=a.get(e.source_tile_id)??{troops:[]};t.troops.push({amount:e.amount,unitId:e.unit_id}),a.set(e.source_tile_id,t)}for(let[n,{troops:i}]of a)ug(e,t,n,n,i,r)},gg=()=>[0,0,0,0],_g=e=>{let t=new Map;for(let n of e)t.set(n.unitId,(t.get(n.unitId)??0)+n.amount);return[...t.entries()].map(([e,t])=>({unitId:e,amountBefore:t,amountAfter:t}))},vg=(e,t,n,r,i,a)=>i<=0?gg():typeof t==`number`?Yu(e,K(e,t),r,({currentWood:e,currentClay:t,currentIron:n,currentWheat:r})=>{let o=[e,t,n,r];return Uh(o,Hh(o,i,a))}):Yu(e,n,r,({currentWood:e,currentClay:t,currentIron:n,currentWheat:r})=>Uh([e,t,n,r],i)),yg=(e,t,n,r)=>{let i=e.selectObjects({sql:`
  WITH
    target_owner AS (
      SELECT (
        SELECT COALESCE(target_v.player_id, oasis_owner_v.player_id)
        FROM
          tiles t
          LEFT JOIN villages target_v ON target_v.tile_id = t.id
          LEFT JOIN villages oasis_owner_v ON oasis_owner_v.id = (
            SELECT MAX(village_id)
            FROM oasis
            WHERE tile_id = t.id
          )
        WHERE t.id = $target_tile_id
      ) AS player_id
    ),
    attacker AS (
      SELECT
        'attacker' AS role,
        $origin_tile_id AS tile_id,
        (
          SELECT player_id
          FROM villages
          WHERE id = $village_id
        ) AS player_id,
        NULL AS unit_id,
        NULL AS amount
    ),
    defender AS (
      SELECT
        'defender' AS role,
        $target_tile_id AS tile_id,
        target_owner.player_id,
        ui.unit AS unit_id,
        SUM(t.amount) AS amount
      FROM
        target_owner
        LEFT JOIN troops t
          ON t.tile_id = $target_tile_id
          AND t.source_tile_id = $target_tile_id
        LEFT JOIN unit_ids ui ON ui.id = t.unit_id
      GROUP BY target_owner.player_id, ui.unit
    ),
    reinforcements AS (
      SELECT
        'reinforcement' AS role,
        t.source_tile_id AS tile_id,
        v.player_id,
        ui.unit AS unit_id,
        SUM(t.amount) AS amount
      FROM
        troops t
        JOIN unit_ids ui ON ui.id = t.unit_id
        LEFT JOIN villages v ON v.tile_id = t.source_tile_id
      WHERE
        t.tile_id = $target_tile_id
        AND t.source_tile_id != $target_tile_id
      GROUP BY t.source_tile_id, v.player_id, ui.unit
    )
  SELECT *
  FROM attacker
  UNION ALL
  SELECT *
  FROM defender
  UNION ALL
  SELECT *
  FROM reinforcements;
`,bind:{$village_id:t,$origin_tile_id:n,$target_tile_id:r},schema:L({role:R([`attacker`,`defender`,`reinforcement`]),tile_id:N(),player_id:N().nullable(),unit_id:J.nullable(),amount:N().nullable()})}),a=new Map;for(let e of i){let t=`${e.role}:${e.tile_id}`,n=a.get(t);n||(n={tileId:e.tile_id,playerId:e.player_id,units:[]},a.set(t,n)),e.unit_id!==null&&e.amount!==null&&n.units.push({unitId:e.unit_id,amountBefore:e.amount,amountAfter:e.amount})}let o=[];for(let[e,t]of a)e.startsWith(`reinforcement:`)&&o.push(t);return{attacker:a.get(`attacker:${n}`),defender:a.get(`defender:${r}`),reinforcements:o}},bg=(e,t,n)=>{let{villageId:r,resolvesAt:i,originTileId:a,targetTileId:o,troops:s}=t,{attacker:c,defender:l,reinforcements:u}=yg(e,r,a,o);Lm(e,{villageId:r,timestamp:i,outcome:`attackerNoLoss`,originTileId:a,targetTileId:o,isRaid:t.type===`troopMovementRaid`,loot:n,canAttackerSeeFullReport:!0,attackerPoints:0,defenderPoints:0,attacker:{...c,units:_g(s)},defender:l,reinforcements:u})},xg=(e,t,n,r)=>{let{resolvesAt:i,targetTileId:a,troops:o}=t,s=vg(e,n,a,i,Vh(o),r);return bg(e,t,s),s},Sg={buildingLevelChange:Om,buildingConstruction:km,buildingDestruction:Am,buildingScheduledConstruction:jm,troopTraining:(e,t)=>{let{unitId:n,villageId:r,resolvesAt:i}=t,a=K(e,r);e.exec({sql:`
      INSERT
      INTO
        troops (unit_id, amount, tile_id, source_tile_id)
      VALUES (
        (
          SELECT id
          FROM unit_ids
          WHERE unit = $unit_id
        ),
        $amount,
        $tile_id,
        $tile_id
      )
      ON CONFLICT(unit_id, tile_id, source_tile_id) DO UPDATE SET
        amount = amount + excluded.amount;
    `,bind:{$unit_id:n,$amount:1,$tile_id:a}});let{unitWheatConsumption:o}=ef(n);return e.exec({sql:yu,bind:{$increase_amount:o,$tile_id:a}}),q(e,a,i),{affectedVillageIds:[r],affectedTileIds:[a]}},troopMovementReinforcements:(e,t)=>{let{originTileId:n,targetTileId:r,troops:i,resolvesAt:a,villageId:o}=t,{tileType:s,villageId:c}=e.selectObject({sql:`
  SELECT
    t.id AS tileId,
    tt.type AS tileType,
    CASE
      WHEN tt.type = 'free' THEN v.id
      WHEN tt.type = 'oasis' THEN (
        SELECT MAX(o.village_id)
        FROM
          oasis o
        WHERE
          o.tile_id = t.id
      )
    END AS villageId
  FROM
    tiles t
      JOIN tile_type_ids tt ON tt.id = t.type_id
      LEFT JOIN villages v ON v.tile_id = t.id
  WHERE
    t.id = $tile_id;
`,bind:{$tile_id:r},schema:L({tileId:N(),tileType:R([`free`,`oasis`]),villageId:N()})});return Im(e,{...t,movementType:`reinforcement`}),Xp(e,i.map(e=>({...e,tileId:r}))),s!==`oasis`&&og(e,i,n,r,a),{affectedVillageIds:[o,s===`oasis`?null:c],affectedTileIds:[n,r]}},troopMovementRelocation:(e,t)=>{let{originTileId:n,targetTileId:r,troops:i,resolvesAt:a,villageId:o}=t,s=e.selectValue({sql:`
  SELECT
    CASE
      WHEN tt.type = 'free' THEN v.id
      WHEN tt.type = 'oasis' THEN (
        SELECT MAX(o.village_id)
        FROM
          oasis o
        WHERE
          o.tile_id = t.id
      )
    END
  FROM
    tiles t
      JOIN tile_type_ids tt ON tt.id = t.type_id
      LEFT JOIN villages v ON v.tile_id = t.id
  WHERE
    t.id = $tile_id;
`,bind:{$tile_id:r},schema:N()});return Im(e,{...t,movementType:`relocation`}),Xp(e,i.map(e=>({...e,tileId:r,sourceTileId:r}))),i.some(({unitId:e})=>e===`HERO`)&&Rh(e,o,s,a),og(e,i,n,r,a),{affectedVillageIds:[o,s],affectedTileIds:[n,r]}},troopMovementReturn:(e,t)=>{let{villageId:n,originTileId:r,targetTileId:i,troops:a,loot:o,resolvesAt:s}=t;return Xp(e,a.map(e=>({...e,tileId:i}))),o?.some(e=>e>0)&&Ju(e,i,s,o),{affectedVillageIds:[n,...e.selectValues({sql:wu,bind:{$tile_id:i,$player_id:1},schema:N()})],affectedTileIds:[r,i]}},troopMovementFindNewVillage:(e,t)=>{let{originTileId:n,targetTileId:r,resolvesAt:i,villageId:a}=t,{id:o,x:s,y:c,resourceFieldComposition:l,tribe:u}=e.selectObject({sql:`
  SELECT
    t.id,
    t.x,
    t.y,
    rfc.resource_field_composition AS resourceFieldComposition,
    ti.tribe
  FROM
    tiles t
      JOIN resource_field_composition_ids rfc
           ON t.resource_field_composition_id = rfc.id
      CROSS JOIN players p
      JOIN tribe_ids ti
           ON p.tribe_id = ti.id
  WHERE
    t.id = $tile_id
    AND p.id = $player_id;
`,bind:{$tile_id:r,$player_id:1},schema:L({id:N(),x:N(),y:N(),resourceFieldComposition:Bp,tribe:mu})}),d=e.selectValue({sql:`
  WITH
    next_slug AS (
      SELECT 'v-' || (COUNT(*) + 1) AS slug
      FROM
        villages
      WHERE
        player_id = $player_id
      )
  INSERT
  INTO
    villages (name, slug, tile_id, player_id)
  SELECT
    $name,
    (
      SELECT slug
      FROM
        next_slug
      ),
    $tile_id,
    $player_id
      RETURNING id;
`,bind:{$name:`New village`,$tile_id:o,$player_id:1},schema:N()});e.exec({sql:`
  INSERT INTO gatherers_hut_expeditions (village_id, completed)
  VALUES ($village_id, 0)
  ON CONFLICT(village_id) DO NOTHING;
`,bind:{$village_id:d}});let f=e.selectObjects({sql:`
  SELECT id, building
  FROM building_ids
`,schema:L({id:N(),building:H})}),p=new Map(f.map(e=>[e.building,e.id])),m=Oh(`player`,u,l),h=e.selectValue({sql:`
  SELECT id FROM effect_ids WHERE effect = 'wheatProduction';
`,schema:N()});e.exec({sql:`
  INSERT INTO building_fields (village_id, field_id, building_id, level)
  SELECT
    $village_id,
    json_extract(field.value, '$.fieldId'),
    json_extract(field.value, '$.buildingId'),
    json_extract(field.value, '$.level')
  FROM json_each($fields) AS field;
`,bind:{$village_id:d,$fields:JSON.stringify(m.map(({field_id:e,building_id:t,level:n})=>({fieldId:e,buildingId:p.get(t),level:n})))}});let ee=m.flatMap(({field_id:e,building_id:t,level:n})=>$l(t).effects(u).map(t=>({effectId:t.effectId,value:t.valuesPerLevel[n],type:t.type,sourceSpecifier:e})));e.exec({sql:`
  INSERT INTO effects (
    effect_id,
    value,
    type_id,
    scope_id,
    source_id,
    tile_id,
    source_specifier
  )
  SELECT
    effect_ids.id,
    json_extract(effect.value, '$.value'),
    effect_type_ids.id,
    effect_scope_ids.id,
    effect_source_ids.id,
    (SELECT tile_id FROM villages WHERE id = $village_id),
    json_extract(effect.value, '$.sourceSpecifier')
  FROM
    json_each($effects) AS effect
    JOIN effect_ids
      ON effect_ids.effect = json_extract(effect.value, '$.effectId')
    JOIN effect_type_ids
      ON effect_type_ids.type = json_extract(effect.value, '$.type')
    JOIN effect_scope_ids
      ON effect_scope_ids.scope = 'local'
    JOIN effect_source_ids
      ON effect_source_ids.source = 'building';
`,bind:{$effects:JSON.stringify(ee),$village_id:d}}),e.exec({sql:`
  INSERT INTO
    resource_sites (tile_id, wood, clay, iron, wheat, updated_at)
  VALUES
    ($tile_id, 750, 750, 750, 750, $updatedAt)
  ON CONFLICT(tile_id) DO NOTHING;
`,bind:{$tile_id:o,$updatedAt:i}});let te=ph(d,u,l);return e.exec({sql:`
  INSERT INTO quests (quest_id, completed_at, collected_at, village_id)
  SELECT
    quest.value,
    CASE
      WHEN quest.value = 'oneOf-MAIN_BUILDING-1' THEN $resolves_at
      ELSE NULL
    END,
    NULL,
    $village_id
  FROM json_each($quests) AS quest;
`,bind:{$quests:JSON.stringify(te.map(({id:e})=>e)),$resolves_at:i,$village_id:d}}),e.exec({sql:gu,bind:{$effect_id:h,$value:-3,$type:`base`,$scope:`local`,$source:`building`,$tile_id:o,$source_specifier:0}}),e.exec({sql:gu,bind:{$effect_id:h,$value:0,$type:`base`,$scope:`local`,$source:`troops`,$tile_id:o,$source_specifier:0}}),e.exec({sql:yu,bind:{$increase_amount:-3,$tile_id:n}}),q(e,K(e,a),i),e.exec({sql:`
  INSERT INTO
    village_founding_history (village_id, tile_id, x, y, timestamp)
  VALUES
    ($village_id, $tile_id, $x, $y, $timestamp);
`,bind:{$village_id:d,$tile_id:o,$x:s,$y:c,$timestamp:Math.trunc(i/1e3)}}),{affectedVillageIds:[a,d],affectedTileIds:[n,r]}},troopMovementAttack:(e,t)=>{let{villageId:n,resolvesAt:r,originTileId:i,targetTileId:a,troops:o}=t,s=0,c=e.selectValue({sql:kh,bind:{$target_tile_id:a},schema:N().nullable()})??null;if(c!==null){let t=e.selectObjects({sql:hu,bind:{$effect_id:`crannyCapacity`,$village_id:c},schema:Gu});if(t.some(({type:e})=>e===`base`)){let{total:e}=G(`crannyCapacity`,t,a);s=e}}let l=xg(e,t,c,s);return X(e,{villageId:n,troops:o,targetTileId:i,originTileId:a,startsAt:r,type:`troopMovementReturn`,originalMovementType:`troopMovementAttack`,loot:l}),{affectedVillageIds:[n,...e.selectValues({sql:wu,bind:{$tile_id:a,$player_id:1},schema:N()})],affectedTileIds:[i,a]}},troopMovementRaid:(e,t)=>{let{villageId:n,resolvesAt:r,troops:i,originTileId:a,targetTileId:o}=t,s=0,c=e.selectValue({sql:kh,bind:{$target_tile_id:o},schema:N().nullable()})??null;if(c!==null){let t=e.selectObjects({sql:hu,bind:{$effect_id:`crannyCapacity`,$village_id:c},schema:Gu});if(t.some(({type:e})=>e===`base`)){let{total:e}=G(`crannyCapacity`,t,o);s=e}}let l=xg(e,t,c,s);return X(e,{villageId:n,troops:i,startsAt:r,targetTileId:a,originTileId:o,type:`troopMovementReturn`,originalMovementType:`troopMovementRaid`,loot:l}),{affectedVillageIds:[n,...e.selectValues({sql:wu,bind:{$tile_id:o,$player_id:1},schema:N()})],affectedTileIds:[a,o]}},troopMovementOasisOccupation:(e,t)=>{let{originTileId:n,targetTileId:r,resolvesAt:i,troops:a,villageId:o,type:s}=t,{previousOwnerVillageId:c}=mg(e,o,r,i);return X(e,{villageId:o,originTileId:r,startsAt:i,targetTileId:n,type:`troopMovementReturn`,originalMovementType:s,troops:a}),{affectedVillageIds:[o,c],affectedTileIds:[n,r]}},troopMovementAdventure:(e,t)=>{let{villageId:n,resolvesAt:r,originTileId:i,targetTileId:a,troops:o}=t,{heroId:s,healthBefore:c,adventureId:l}=e.selectObject({sql:`
  SELECT
    h.id AS heroId,
    h.health AS healthBefore,
    ha.completed + 1 AS adventureId
  FROM
    heroes h
    JOIN hero_adventures ha ON h.id = ha.hero_id
  WHERE
    h.player_id = (
      SELECT player_id
      FROM villages
      WHERE id = $village_id
    );
`,bind:{$village_id:n},schema:L({heroId:N(),healthBefore:N(),adventureId:P()})}),u=e.selectValue({sql:`
  UPDATE heroes
  SET
    health = MAX(0, health - MAX(0, 5 - damage_reduction)),
    experience =
      experience +
      CASE
        WHEN MAX(0, health - MAX(0, 5 - damage_reduction)) > 0
          THEN (
                 SELECT completed + 1
                 FROM
                   hero_adventures
                 WHERE
                   hero_id = heroes.id
                 ) * 10
        ELSE 0
        END
  WHERE id = $hero_id
  RETURNING health
`,bind:{$hero_id:s},schema:N()});return Nm(e,{villageId:n,timestamp:r,adventureId:l,itemId:null,itemAmount:null,healthBefore:c,healthAfter:u}),u===0?(Fh(e,r),{affectedVillageIds:[n],affectedTileIds:[i]}):(e.exec({sql:`
  UPDATE hero_adventures
  SET completed = completed + 1
  WHERE hero_id = $hero_id;
`,bind:{$hero_id:s}}),jp(e,r),u<100&&Lh(e,n,r),X(e,{villageId:n,originTileId:a,startsAt:r,targetTileId:i,type:`troopMovementReturn`,originalMovementType:`troopMovementAdventure`,troops:o}),{affectedVillageIds:[n],affectedTileIds:[i,a]})},heroRevival:Bm,heroHealthRegeneration:Vm,loyaltyIncrease:Jm,unitResearch:(e,t)=>{let{villageId:n,unitId:r}=t;return e.exec({sql:`
      INSERT INTO
        unit_research (village_id, unit_id)
      VALUES
        ($village_id, (
          SELECT id
          FROM
            unit_ids
          WHERE
            unit = $unit_id
          ));
    `,bind:{$village_id:n,$unit_id:r}}),{affectedVillageIds:[n],affectedTileIds:[]}},unitImprovement:(e,t)=>{let{unitId:n,level:r}=t;return e.exec({sql:`
      UPDATE unit_improvements
      SET
        level = $level
      WHERE
        unit_id = (
          SELECT id
          FROM unit_ids
          WHERE unit = $unit_id
          );
    `,bind:{$unit_id:n,$level:r}}),{affectedVillageIds:e.selectValues({sql:`SELECT id FROM villages WHERE player_id = $player_id;`,bind:{$player_id:1},schema:N()}),affectedTileIds:[]}},animalCageProduction:Um,trapperCageProduction:Zm,huntersLodgeHunt:Wm,gatherersHutGatheringTrip:zm,resourceTransfer:Ym,tradeRoute:Xm},Cg=(e,t)=>{let n=e.selectObject({sql:`
      DELETE
      FROM
        events
      WHERE
        id = $id
      RETURNING id, type, starts_at, duration, village_id, resolves_at, meta;
    `,bind:{$id:t},schema:Fl});if(!n)return;let r=Il(n);try{let t=Sg[r.type],{affectedVillageIds:n,affectedTileIds:i=[]}=t(e,r);Vl({eventKey:`event:success`,...r,affectedVillageIds:n,affectedTileIds:i})}catch(e){throw console.error(e),Vl({eventKey:`event:error`,...r,affectedVillageIds:[],affectedTileIds:[]}),e}},wg=N(),Tg=L({id:N(),resolvesAt:N()}),Eg=e=>({getPastEventIds:t=>e.selectValues({sql:`SELECT id FROM events WHERE resolves_at <= $now ORDER BY resolves_at, id;`,bind:{$now:t},schema:wg}),getNextEvent:t=>e.selectObject({sql:Ol,bind:{$now:t},schema:Tg})??null,resolveEvent:t=>{e.transaction(e=>{Cg(e,t)})}});var Dg=e((e=>{Object.defineProperty(e,"__esModule",{value:!0}),e.PathError=e.TokenData=void 0,e.match=c;let t=e=>e,n=/^[$_\p{ID_Start}]$/u,r=/^[$\u200c\u200d\p{ID_Continue}]$/u;function i(e){return e.replace(/[.+*?^${}()[\]|/\\]/g,`\\$&`)}var a=class{constructor(e,t){this.tokens=e,this.originalPath=t}};e.TokenData=a;var o=class extends TypeError{constructor(e,t){let n=e;t&&(n+=`: ${t}`),n+=`; visit https://git.new/pathToRegexpError for info`,super(n),this.originalPath=t}};e.PathError=o;function s(e,i={}){let{encodePath:s=t}=i,c=[...e],l=0;function u(t){let i=[],a=``;function d(){a&&=(i.push({type:`text`,value:s(a)}),``)}for(;l<c.length;){let s=c[l++];if(s===t)return d(),i;if(s===`\\`){if(l===c.length)throw new o(`Unexpected end after \\ at index ${l}`,e);a+=c[l++];continue}if(s===`:`||s===`*`){let t=s===`:`?`param`:`wildcard`,a=``;if(n.test(c[l]))do a+=c[l++];while(r.test(c[l]));else if(c[l]===`"`){let t=l;for(;l<c.length;){if(c[++l]===`"`){l++,t=0;break}c[l]===`\\`&&l++,a+=c[l]}if(t)throw new o(`Unterminated quote at index ${t}`,e)}if(!a)throw new o(`Missing parameter name at index ${l}`,e);d(),i.push({type:t,name:a});continue}if(s===`{`){d(),i.push({type:`group`,tokens:u(`}`)});continue}if(s===`}`||s===`(`||s===`)`||s===`[`||s===`]`||s===`+`||s===`?`||s===`!`)throw new o(`Unexpected ${s} at index ${l-1}`,e);a+=s}if(t)throw new o(`Unexpected end at index ${l}, expected ${t}`,e);return d(),i}return new a(u(``),e)}function c(e,n={}){let{decode:r=decodeURIComponent,delimiter:i=`/`}=n,{regexp:a,keys:o}=l(e,n),s=o.map(e=>r===!1?t:e.type===`param`?r:e=>e.split(i).map(r));return function(e){let t=a.exec(e);if(!t)return!1;let n=t[0],r=Object.create(null);for(let e=1;e<t.length;e++){if(t[e]===void 0)continue;let n=o[e-1],i=s[e-1];r[n.name]=i(t[e])}return{path:n,params:r}}}function l(e,t={}){let{delimiter:n=`/`,end:r=!0,sensitive:a=!1,trailing:c=!0}=t,l=[],f=``,p=0;function m(e){if(Array.isArray(e)){for(let t of e)m(t);return}let r=typeof e==`object`?e:s(e,t);u(r.tokens,0,[],e=>{if(p>=256)throw new o(`Too many path combinations`,r.originalPath);p>0&&(f+=`|`),f+=d(e,n,l,r.originalPath),p++})}m(e);let h=`^(?:${f})`;return c&&(h+=`(?:`+i(n)+`$)?`),h+=r?`$`:`(?=`+i(n)+`|$)`,{regexp:new RegExp(h,a?``:`i`),keys:l}}function u(e,t,n,r){for(;t<e.length;){let i=e[t++];if(i.type===`group`){let a=n.length;u(i.tokens,0,n,n=>u(e,t,n,r)),n.length=a;continue}n.push(i)}r(n)}function d(e,t,n,r){let a=``,s=``,c=``,l=0,u=0,d=0;function p(n,r){for(;n<e.length;){let i=e[n++];if(i.type===r)return!0;if(i.type===`text`&&i.value.includes(t))break}return!1}function m(t){let n=``;for(;t<e.length;){let r=e[t++];if(r.type!==`text`)break;n+=r.value}return n}for(;d<e.length;){let h=e[d++];if(h.type===`text`){a+=i(h.value),s+=h.value,l===2&&(c+=h.value),h.value.includes(t)&&(u=0);continue}if(h.type===`param`||h.type===`wildcard`){if(l&&!s)throw new o(`Missing text before "${h.name}" ${h.type}`,r);h.type===`param`?(a+=u&2?`(${f(t,s)}+)`:p(d,`wildcard`)?`(${f(t,m(d))}+)`:u&1?`(${f(t,s)}+|${i(s)})`:`(${f(t,``)}+)`,u|=l=1):(a+=u&2?`(${f(s,``)}+)`:c?`(${f(c,``)}+|${f(t,``)}+)`:`([^]+)`,c=``,u|=l=2),n.push(h),s=``;continue}throw TypeError(`Unknown token type: ${h.type}`)}return a}function f(e,t){return t.length>e.length?f(t,e):(e===t&&(t=``),t.length>1?`(?:(?!${i(e)}|${i(t)})[^])`:e.length>1?`(?:(?!${i(e)})[^${i(t)}])`:`[^${i(e+t)}]`)}}))();function Q(e,t,n){let r=typeof t==`string`?t:`get`,i=Og(typeof t==`string`?n:t);return t=>{let n=((e,n)=>t({database:e,...n}));return n.path=e,n.method=r,n.operation=i,n}}const Og=e=>{let{response:t,...n}=e,r=n.requestBody instanceof A?{content:{"application/json":{schema:n.requestBody}}}:n.requestBody;return{...n,...r?{requestBody:r}:{},responses:t?{200:{description:e.summary??`OK`,content:{"application/json":{schema:t}}}}:e.responses??{204:{description:e.summary??`No Content`}}}},kg=e=>e instanceof A?e:e?.content?.[`application/json`]?.schema,Ag=L({building_id:H,tab_name:j()}).transform(e=>[e.building_id,e.tab_name]).meta({id:`GetBookmarks`}),jg=Q(`/villages/:villageId/bookmarks`,{summary:`Get bookmarks`,requestParams:{path:L({villageId:B()})},response:Qc(j(),j())})(({database:e,path:{villageId:t}})=>{let n=e.selectObjects({sql:`
  SELECT bi.building AS building_id, b.tab_name
  FROM
    bookmarks b
      JOIN building_ids bi ON bi.id = b.building_id
  WHERE
    b.village_id = $village_id;
`,bind:{$village_id:t},schema:Ag});return Object.fromEntries(n)}),Mg=Q(`/villages/:villageId/bookmarks/:buildingId`,`patch`,{summary:`Update bookmark`,requestParams:{path:L({villageId:B(),buildingId:H})},requestBody:L({tab:j()})})(({database:e,path:{villageId:t,buildingId:n},body:{tab:r}})=>{e.exec({sql:`
  UPDATE bookmarks
  SET
    tab_name = $tab_name
  WHERE
    building_id = (
      SELECT id
      FROM
        building_ids
      WHERE
        building = $building_id
    )
    AND village_id = $village_id;
`,bind:{$tab_name:r,$village_id:t,$building_id:n}})});var Ng=/(?:\d*[a-z]+)|(?:[A-Z][a-z]+)|(?:\d*[A-Z]+(?=[^a-z]|$))|\d+/g;function Pg(e){return e.match(Ng)??[]}var Fg={198:`AE`,230:`ae`,208:`D`,240:`d`,216:`O`,248:`o`,222:`Th`,254:`th`,223:`ss`,272:`D`,273:`d`,294:`H`,295:`h`,305:`i`,306:`IJ`,307:`ij`,312:`k`,319:`L`,320:`l`,321:`L`,322:`l`,329:`'n`,330:`N`,331:`n`,338:`OE`,339:`oe`,358:`T`,359:`t`,383:`s`};function Ig(e){let t=e.normalize(`NFD`),n=``;for(let e=0;e<t.length;e++){let r=t.charCodeAt(e);r>=768&&r<=879||(n+=Fg[r]??t[e])}return n}function Lg(e){if(e===``)return``;e=Ig(e);let t=Pg(e),n=``;for(let e of t)n.length>0&&(n+=`_`),n+=e.toLowerCase();return n}const Rg=L({isInstantBuildingConstructionEnabled:F(),isInstantUnitTrainingEnabled:F(),isInstantUnitImprovementEnabled:F(),isInstantUnitResearchEnabled:F(),isInstantUnitTravelEnabled:F(),isFreeBuildingConstructionEnabled:F(),isFreeUnitTrainingEnabled:F(),isFreeUnitImprovementEnabled:F(),isFreeUnitResearchEnabled:F(),isFreeHuntingPartiesEnabled:F(),isInstantHeroReviveEnabled:F(),isFreeHeroReviveEnabled:F()}).meta({id:`DeveloperSettings`}),zg=e=>Rg.parse({isInstantBuildingConstructionEnabled:!!e.is_instant_building_construction_enabled,isInstantUnitTrainingEnabled:!!e.is_instant_unit_training_enabled,isInstantUnitImprovementEnabled:!!e.is_instant_unit_improvement_enabled,isInstantUnitResearchEnabled:!!e.is_instant_unit_research_enabled,isInstantUnitTravelEnabled:!!e.is_instant_unit_travel_enabled,isFreeBuildingConstructionEnabled:!!e.is_free_building_construction_enabled,isFreeUnitTrainingEnabled:!!e.is_free_unit_training_enabled,isFreeUnitImprovementEnabled:!!e.is_free_unit_improvement_enabled,isFreeUnitResearchEnabled:!!e.is_free_unit_research_enabled,isFreeHuntingPartiesEnabled:!!e.is_free_hunting_parties_enabled,isInstantHeroReviveEnabled:!!e.is_instant_hero_revive_enabled,isFreeHeroReviveEnabled:!!e.is_free_hero_revive_enabled}),Bg=L({is_instant_building_construction_enabled:N(),is_instant_unit_training_enabled:N(),is_instant_unit_improvement_enabled:N(),is_instant_unit_research_enabled:N(),is_instant_unit_travel_enabled:N(),is_free_building_construction_enabled:N(),is_free_unit_training_enabled:N(),is_free_unit_improvement_enabled:N(),is_free_unit_research_enabled:N(),is_free_hunting_parties_enabled:N(),is_instant_hero_revive_enabled:N(),is_free_hero_revive_enabled:N()}).meta({id:`GetDeveloperSettingsRow`}),Vg=Q(`/developer-settings`,{summary:`Get developer settings`,response:Rg})(({database:e})=>{let t=e.selectObject({sql:`
      SELECT
        is_instant_building_construction_enabled,
        is_instant_unit_training_enabled,
        is_instant_unit_improvement_enabled,
        is_instant_unit_research_enabled,
        is_instant_unit_travel_enabled,
        is_free_building_construction_enabled,
        is_free_unit_training_enabled,
        is_free_unit_improvement_enabled,
        is_free_unit_research_enabled,
        is_free_hunting_parties_enabled,
        is_instant_hero_revive_enabled,
        is_free_hero_revive_enabled
      FROM
        developer_settings
    `,schema:Bg});return zg(t)}),Hg=Q(`/developer-settings/:developerSettingName`,`patch`,{summary:`Update developer setting`,requestParams:{path:L({developerSettingName:j()})},requestBody:L({value:F()})})(({database:e,body:{value:t},path:{developerSettingName:n}})=>{let r=Lg(n);if(e.exec({sql:`
      UPDATE developer_settings
      SET
        ${r} = $value
    `,bind:{$value:+!!t}}),t){let t=[];switch(n){case`isInstantBuildingConstructionEnabled`:t=[`buildingLevelChange`,`buildingScheduledConstruction`,`buildingConstruction`,`buildingDestruction`];break;case`isInstantUnitTrainingEnabled`:t=[`troopTraining`,`animalCageProduction`,`trapperCageProduction`];break;case`isInstantUnitImprovementEnabled`:t=[`unitImprovement`];break;case`isInstantUnitResearchEnabled`:t=[`unitResearch`];break;case`isInstantUnitTravelEnabled`:t=[`troopMovementReinforcements`,`troopMovementRelocation`,`troopMovementReturn`,`troopMovementFindNewVillage`,`troopMovementAttack`,`troopMovementRaid`,`troopMovementOasisOccupation`,`troopMovementAdventure`,`huntersLodgeHunt`,`gatherersHutGatheringTrip`];break;case`isInstantHeroReviveEnabled`:t=[`heroRevival`]}t.length>0&&(e.exec({sql:`
          UPDATE events
          SET
            starts_at = $now,
            duration = 0
          WHERE
            type IN (${t.map(e=>`'${e}'`).join(`, `)})
        `,bind:{$now:Date.now()}}),Ms())}}),Ug=Q(`/developer-settings/:heroId/level-up`,`patch`,{summary:`Level up hero`,requestParams:{path:L({heroId:B()})}})(({database:e,path:{heroId:t}})=>{let n=e.selectValue({sql:`SELECT experience FROM heroes WHERE id = $hero_id`,bind:{$hero_id:t},schema:N()}),{expToNextLevel:r}=kd(n);e.exec({sql:`
      UPDATE heroes
      SET
        experience = $nextLevelExp
      WHERE
        id = $hero_id
    `,bind:{$hero_id:t,$nextLevelExp:n+r}})}),Wg=Q(`/developer-settings/:heroId/spawn-item`,`patch`,{summary:`Spawn hero item`,requestParams:{path:L({heroId:B()})},requestBody:L({itemId:N(),amount:N()})})(({database:e,body:{itemId:t,amount:n=1},path:{heroId:r}})=>{e.exec({sql:`
      INSERT INTO
        hero_inventory (hero_id, item_id, amount)
      VALUES
        ($hero_id, $itemId, $amount)
      ON CONFLICT (hero_id, item_id) DO UPDATE SET
        amount = amount + $amount
    `,bind:{$hero_id:r,$itemId:t,$amount:n}})}),Gg=Q(`/developer-settings/:villageId/resources`,`patch`,{summary:`Update village resources`,requestParams:{path:L({villageId:B()})},requestBody:L({resource:Ou,amount:N(),direction:R([`add`,`subtract`])})})(({database:e,body:t,path:{villageId:n}})=>{let{resource:r,amount:i,direction:a}=t,o=Date.now(),s=[0,0,0,0],c={wood:0,clay:1,iron:2,wheat:3};s[c[r]]=i;let l=K(e,n);if(a===`add`){Ju(e,l,o,s);return}Yu(e,l,o,()=>s)}),Kg=Q(`/developer-settings/:heroId/increment-adventure-points`,`patch`,{summary:`Increment hero adventure points`,requestParams:{path:L({heroId:B()})}})(({database:e,path:{heroId:t}})=>{let n=Date.now();up(e,t,n),e.exec({sql:`
      UPDATE hero_adventures
      SET
        available = available + 1,
        last_updated_at = $now
      WHERE
        hero_id = $hero_id
    `,bind:{$hero_id:t,$now:n}})}),qg=Q(`/developer-settings/:heroId/kill`,`patch`,{summary:`Kill hero`,requestParams:{path:L({heroId:B()})}})(({database:e,path:{heroId:t}})=>{if(!e.selectValue({sql:`
      SELECT
        1
      FROM
        troops
      WHERE
        unit_id = (SELECT id FROM unit_ids WHERE unit = 'HERO')
        AND tile_id = source_tile_id
    `,schema:N().optional()}))throw Error(`Hero must be at home to be killed`);let n=Date.now();e.exec({sql:`
      UPDATE heroes
      SET
        health = 0
      WHERE
        id = $hero_id
    `,bind:{$hero_id:t}}),e.exec({sql:`
      DELETE FROM
        troops
      WHERE
        unit_id = (SELECT id FROM unit_ids WHERE unit = 'HERO')
        AND tile_id = source_tile_id
    `}),Fh(e,n)}),Jg=Q(`/developer-settings/:tileId/adjustLoyalty`,`patch`,{summary:`Adjust village loyalty`,requestParams:{path:L({tileId:B()})},requestBody:L({amount:N()})})(({database:e,path:{tileId:t},body:{amount:n}})=>{Km(e,t,n),Gm(e)}),Yg=Wu.extend({buildingId:H.optional().nullable()}).meta({id:`ApiEffectDto`}),Xg=Q(`/tiles/:tileId/effects`,{summary:`Get tile effects`,requestParams:{path:L({tileId:B()})},response:I(Yg)})(({database:e,path:{tileId:t}})=>e.selectObjects({sql:`
  SELECT
    ei.effect AS id,
    e.value,
    et.type,
    es.scope,
    eso.source,
    e.tile_id AS tileId,
    e.source_specifier AS sourceSpecifier,
    CASE
      WHEN e.source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
        THEN bi.building
      END AS buildingId
  FROM
    effects AS e
      LEFT JOIN effect_ids AS ei
                ON ei.id = e.effect_id
      JOIN effect_type_ids AS et ON et.id = e.type_id
      JOIN effect_scope_ids AS es ON es.id = e.scope_id
      JOIN effect_source_ids AS eso ON eso.id = e.source_id
      LEFT JOIN villages AS ev ON ev.tile_id = e.tile_id
      LEFT JOIN building_fields AS bf
                ON e.scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
                  AND bf.village_id = ev.id
                  AND bf.field_id = e.source_specifier
      LEFT JOIN building_ids AS bi
                ON bi.id = bf.building_id
  WHERE
    e.scope_id IN (SELECT id FROM effect_scope_ids WHERE scope IN ('global', 'server'))
    OR e.tile_id = $tile_id;
`,bind:{$tile_id:t},schema:Gu})),Zg=Q(`/villages/:villageId/events`,{summary:`Get village events`,requestParams:{path:L({villageId:B()})},response:I(sd)})(({database:e,path:{villageId:t}})=>e.selectObjects({sql:`
  SELECT id, type, starts_at, duration, resolves_at, meta, village_id
  FROM
    events
  WHERE
    village_id = $village_id
  ORDER BY
    resolves_at;
`,bind:{$village_id:t},schema:Fl}).map(Il)),Qg=Q(`/villages/:villageId/events/:eventType`,{summary:`Get village events by type`,requestParams:{path:L({villageId:B(),eventType:Wc([Pl,z(`troopMovement`)])})},response:I(sd)})(({database:e,path:{villageId:t,eventType:n}})=>n===`troopMovement`?e.selectObjects({sql:`
  SELECT id, type, starts_at, duration, resolves_at, meta, village_id
  FROM
    events
  WHERE
    (
      village_id = $village_id
      AND type IN (
        'troopMovementReinforcements',
        'troopMovementRelocation',
        'troopMovementReturn',
        'troopMovementFindNewVillage',
        'troopMovementAttack',
        'troopMovementRaid',
        'troopMovementOasisOccupation',
        'troopMovementAdventure'
      )
    )
    OR (
      type = 'troopMovementAdventure'
      AND EXISTS (
        SELECT 1
        FROM villages v1
        JOIN villages v2 ON v1.player_id = v2.player_id
        WHERE v1.id = $village_id
          AND v2.id = events.village_id
      )
    )
  ORDER BY
    resolves_at;
`,bind:{$village_id:t},schema:Fl}).map(Il):n===`unitImprovement`?e.selectObjects({sql:`
  SELECT id, type, starts_at, duration, resolves_at, meta, village_id
  FROM
    events
  WHERE
    type = $type
  ORDER BY
    resolves_at;
`,bind:{$type:n},schema:Fl}).map(Il):n===`resourceTransfer`?e.selectObjects({sql:`
  SELECT id, type, starts_at, duration, resolves_at, meta, village_id
  FROM events
  WHERE type = 'resourceTransfer'
    AND (
      village_id = $village_id
      OR JSON_EXTRACT(meta, '$.targetVillageId') = $village_id
    )
  ORDER BY resolves_at;
`,bind:{$village_id:t},schema:Fl}).map(Il):e.selectObjects({sql:kl,bind:{$village_id:t,$type:n},schema:Fl}).map(Il)),$g=Q(`/events`,`post`,{summary:`Create new events`,requestBody:vd})(({database:e,body:t})=>{X(e,t)}),e_=Q(`/events/:eventId`,`delete`,{summary:`Cancel event`,requestParams:{path:L({eventId:j()})}})(({database:e,path:{eventId:t}})=>{e.transaction(e=>{let n=e.selectObject({sql:Dl,bind:{$event_id:t},schema:Fl}),r=Il(n),{level:i,buildingId:a,villageId:o,buildingFieldId:s}=r;e.exec({sql:`DELETE FROM events WHERE id = $event_id;`,bind:{$event_id:r.id}}),e.exec({sql:`
  DELETE FROM scheduled_building_upgrades
  WHERE village_id = $village_id
    AND building_field_id = $building_field_id;
`,bind:{$village_id:o,$building_field_id:s}}),i===1&&Zu(e,o,s,a);let c=Date.now(),l=r.resolvesAt-r.startsAt,u=Math.max(0,c-r.startsAt),d=l>0?Math.min(1,u/l):1,f=au(a,i,d);Ju(e,K(e,o),c,f),Dm(e,o,c,s)}),Ms()}),t_=Q(`/events/unit-improvement-event/:eventId`,`delete`,{summary:`Cancel unit improvement event`,requestParams:{path:L({eventId:j()})}})(({database:e,path:{eventId:t}})=>{e.transaction(e=>{let n=e.selectObject({sql:Dl,bind:{$event_id:t},schema:Fl}),r=Il(n),i=e.selectObjects({sql:`
  DELETE
  FROM
    events
  WHERE
    JSON_EXTRACT(events.meta, '$.unitId') = $unit_id
    AND CAST(JSON_EXTRACT(events.meta, '$.level') AS INTEGER) >= $level
  RETURNING
    village_id AS villageId,
    JSON_EXTRACT(events.meta, '$.unitId') AS unitId,
    CAST(JSON_EXTRACT(events.meta, '$.level') AS INTEGER) AS level;
`,bind:{$unit_id:r.unitId,$level:r.level},schema:L({villageId:N(),unitId:J,level:N()})});for(let t of i){let n=tf(t.unitId,t.level);Ju(e,K(e,t.villageId),Date.now(),n)}}),Ms()}),n_=Q(`/villages/:villageId/events/demolition`,`delete`,{summary:`Cancel demolition event`,requestParams:{path:L({villageId:B()})}})(({database:e,path:{villageId:t}})=>{e.exec({sql:`
  DELETE
  FROM
    events
  WHERE
    id = (
      SELECT id
      FROM
        events
      WHERE
        village_id = $village_id
        AND (
          type = 'buildingDestruction'
          OR (
            type = 'buildingLevelChange'
            AND CAST(JSON_EXTRACT(meta, '$.previousLevel') AS INTEGER) >
                CAST(JSON_EXTRACT(meta, '$.level') AS INTEGER)
          )
        )
      ORDER BY resolves_at, id
      LIMIT 1
    );
`,bind:{$village_id:t}}),Ms()}),r_=L({id:N(),name:j(),villageId:N(),targetCount:N()}),i_=r_.extend({tileIds:I(N())}),a_=L({name:j().min(1).optional(),villageId:N().optional()}),o_=`
  INSERT INTO farm_lists (village_id, name)
  VALUES
    ($village_id, $name);
`,s_=L({id:N(),name:j(),villageId:N(),targetCount:N()});L({name:j().min(1).optional(),villageId:N().optional()});const c_=L({tile_id:N()}).meta({id:`FarmListTileRow`});L({name:j().min(1)}),L({tileId:N()});const l_=Q(`/players/:playerId/farm-lists`,{summary:`Get player farm lists`,requestParams:{path:L({playerId:B()})},response:I(r_)})(({database:e})=>e.selectObjects({sql:`
  SELECT
    fl.id,
    fl.name,
    fl.village_id AS villageId,
    (
      SELECT COUNT(*)
      FROM farm_list_tiles
      WHERE farm_list_id = fl.id
      ) AS targetCount
  FROM
    farm_lists fl
      JOIN villages v ON v.id = fl.village_id
  WHERE
    v.player_id = $player_id;
`,bind:{$player_id:1},schema:s_})),u_=Q(`/villages/:villageId/farm-lists`,{summary:`Get farm lists`,requestParams:{path:L({villageId:B()})},response:I(r_)})(({database:e,path:{villageId:t}})=>e.selectObjects({sql:`
  SELECT
    id,
    name,
    village_id AS villageId,
    (SELECT COUNT(*) FROM farm_list_tiles WHERE farm_list_id = id) AS targetCount
  FROM
    farm_lists
  WHERE
    village_id = $village_id;
`,bind:{$village_id:t},schema:s_})),d_=Q(`/villages/:villageId/farm-lists`,`post`,{summary:`Create farm list`,requestParams:{path:L({villageId:B()})},requestBody:L({name:j()})})(({database:e,path:{villageId:t},body:{name:n}})=>{e.exec({sql:o_,bind:{$village_id:t,$name:n}})}),f_=Q(`/farm-lists/:farmListId`,{summary:`Get farm list details`,requestParams:{path:L({farmListId:B()})},response:i_})(({database:e,path:{farmListId:t}})=>{let n=e.selectObject({sql:`
  SELECT
    id,
    name,
    village_id AS villageId,
    (
      SELECT COUNT(*)
      FROM farm_list_tiles
      WHERE farm_list_id = $farm_list_id
      ) AS targetCount
  FROM
    farm_lists
  WHERE
    id = $farm_list_id;
`,bind:{$farm_list_id:t},schema:s_}),r=e.selectObjects({sql:`
  SELECT tile_id
  FROM
    farm_list_tiles
  WHERE
    farm_list_id = $farm_list_id;
`,bind:{$farm_list_id:t},schema:c_});return{...n,tileIds:r.map(e=>e.tile_id)}}),p_=Q(`/farm-lists/:farmListId`,`delete`,{summary:`Delete farm list`,requestParams:{path:L({farmListId:B()})}})(({database:e,path:{farmListId:t}})=>{e.exec({sql:`
  DELETE
  FROM
    farm_lists
  WHERE
    id = $farm_list_id;
`,bind:{$farm_list_id:t}})}),m_=Q(`/farm-lists/:farmListId/tiles`,`post`,{summary:`Add tile to farm list`,requestParams:{path:L({farmListId:B()})},requestBody:L({tileId:N()})})(({database:e,path:{farmListId:t},body:{tileId:n}})=>{e.transaction(()=>{if(e.selectValue({sql:`
  SELECT COUNT(*)
  FROM
    farm_list_tiles
  WHERE
    farm_list_id = $farm_list_id;
`,bind:{$farm_list_id:t},schema:N()})>=100)throw Error(`Farm list cannot have more than 100 tiles`);e.exec({sql:`
  INSERT OR IGNORE INTO farm_list_tiles (farm_list_id, tile_id)
  VALUES
    ($farm_list_id, $tile_id);
`,bind:{$farm_list_id:t,$tile_id:n}})})}),h_=Q(`/farm-lists/:farmListId/tiles/:tileId`,`delete`,{summary:`Remove tile from farm list`,requestParams:{path:L({farmListId:B(),tileId:B()})}})(({database:e,path:{farmListId:t,tileId:n}})=>{e.exec({sql:`
  DELETE
  FROM
    farm_list_tiles
  WHERE
    farm_list_id = $farm_list_id
    AND tile_id = $tile_id;
`,bind:{$farm_list_id:t,$tile_id:n}})}),g_=Q(`/players/:playerId/farm-lists/tiles`,`delete`,{summary:`Remove tile from all player farm lists`,requestParams:{path:L({playerId:B()})},requestBody:L({tileId:N()})})(({database:e,body:{tileId:t}})=>{e.exec({sql:`
  DELETE
  FROM
    farm_list_tiles
  WHERE
    tile_id = $tile_id
    AND farm_list_id IN (
      SELECT fl.id
      FROM
        farm_lists fl
          JOIN villages v ON v.id = fl.village_id
      WHERE
        v.player_id = $player_id
    );
`,bind:{$tile_id:t,$player_id:1}})}),__=Q(`/farm-lists/:farmListId/clone`,`post`,{summary:`Clone farm list to another village`,requestParams:{path:L({farmListId:B()})},requestBody:L({villageId:N()})})(({database:e,path:{farmListId:t},body:{villageId:n}})=>{e.transaction(()=>{let r=e.selectValue({sql:`
  SELECT name
  FROM
    farm_lists
  WHERE
    id = $farm_list_id;
`,bind:{$farm_list_id:t},schema:j()});e.exec({sql:o_,bind:{$village_id:n,$name:r}});let i=e.selectValue({sql:`
  SELECT last_insert_rowid();
`,schema:N()});e.exec({sql:`
  INSERT INTO farm_list_tiles (farm_list_id, tile_id)
  SELECT $cloned_farm_list_id, tile_id
  FROM
    farm_list_tiles
  WHERE
    farm_list_id = $farm_list_id;
`,bind:{$cloned_farm_list_id:i,$farm_list_id:t}})})}),v_=Q(`/farm-lists/:farmListId`,`patch`,{summary:`Update farm list`,requestParams:{path:L({farmListId:B()})},requestBody:a_})(({database:e,path:{farmListId:t},body:{name:n,villageId:r}})=>{e.transaction(()=>{n!==void 0&&e.exec({sql:`
  UPDATE farm_lists
  SET
    name = $name
  WHERE
    id = $farm_list_id;
`,bind:{$name:n,$farm_list_id:t}}),r!==void 0&&e.exec({sql:`
  UPDATE farm_lists
  SET
    village_id = $village_id
  WHERE
    id = $farm_list_id;
`,bind:{$village_id:r,$farm_list_id:t}})})}),y_=[{id:1001,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_TRAVEL_SPEED`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`unitSpeed`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1002,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_CARRYING_CAPACITY`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`unitCarryCapacity`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1003,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_TRAINING_REDUCTION`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`barracksTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatBarracksTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`stableTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatStableTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`workshopTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`hospitalTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1004,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_WHEAT_CONSUMPTION_REDUCTION`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`unitWheatConsumption`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1005,name:`UNCOMMON_ARTIFACT_CIVIL_BUILD_TIME_REDUCTION`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`buildingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1006,name:`UNCOMMON_ARTIFACT_CIVIL_OASIS_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[]},{id:1007,name:`UNCOMMON_ARTIFACT_CIVIL_RESOURCE_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`woodProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`},{id:`clayProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`},{id:`ironProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`},{id:`wheatProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1008,name:`RARE_ARTIFACT_MILITARY_TROOP_TRAVEL_SPEED`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`unitSpeed`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1009,name:`RARE_ARTIFACT_MILITARY_TROOP_CARRYING_CAPACITY`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`unitCarryCapacity`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10010,name:`RARE_ARTIFACT_MILITARY_TROOP_TRAINING_REDUCTION`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`barracksTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatBarracksTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`stableTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatStableTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`workshopTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`hospitalTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10011,name:`RARE_ARTIFACT_MILITARY_TROOP_WHEAT_CONSUMPTION_REDUCTION`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`unitWheatConsumption`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10012,name:`RARE_ARTIFACT_CIVIL_BUILD_TIME_REDUCTION`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`buildingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10013,name:`RARE_ARTIFACT_CIVIL_OASIS_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[]},{id:10014,name:`RARE_ARTIFACT_CIVIL_RESOURCE_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`woodProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`clayProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`ironProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`wheatProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10015,name:`EPIC_ARTIFACT_MILITARY_TROOP_TRAVEL_SPEED`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`unitSpeed`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10016,name:`EPIC_ARTIFACT_MILITARY_TROOP_CARRYING_CAPACITY`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`unitCarryCapacity`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10017,name:`EPIC_ARTIFACT_MILITARY_TROOP_TRAINING_REDUCTION`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`barracksTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`greatBarracksTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`stableTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`greatStableTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`workshopTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`hospitalTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10018,name:`EPIC_ARTIFACT_MILITARY_TROOP_WHEAT_CONSUMPTION_REDUCTION`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`unitWheatConsumption`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10019,name:`EPIC_ARTIFACT_CIVIL_BUILD_TIME_REDUCTION`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`buildingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10020,name:`EPIC_ARTIFACT_CIVIL_OASIS_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[]},{id:10021,name:`EPIC_ARTIFACT_CIVIL_RESOURCE_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`woodProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`clayProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`ironProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`wheatProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10022,name:`EPIC_ARTIFACT_CIVIL_ENABLE_GREAT_BUILDINGS`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[]}],b_=[{id:1011,name:`COMMON_HORSE`,slot:`horse`,rarity:`common`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:7}]},{id:1012,name:`UNCOMMON_HORSE`,slot:`horse`,rarity:`uncommon`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:9}]},{id:1013,name:`RARE_HORSE`,slot:`horse`,rarity:`rare`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:11}]},{id:1014,name:`EPIC_HORSE`,slot:`horse`,rarity:`epic`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:13}]}],x_=[{id:1021,name:`HEALING_POTION`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:5},{id:1022,name:`BOOK_OF_WISDOM`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:100},{id:1023,name:`ANIMAL_CAGE`,slot:`consumable`,rarity:`common`,category:`consumable`,basePrice:20},{id:1024,name:`REVIVAL_POTION`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:20},{id:1025,name:`SILVER`,slot:`non-equipable`,rarity:`common`,category:`currency`,basePrice:null},{id:1026,name:`WOOD`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1027,name:`CLAY`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1028,name:`IRON`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1029,name:`WHEAT`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1030,name:`EXPERIENCE_SCROLL`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:50}],S_=[...y_,...b_,...x_],C_=new Map(S_.map(e=>[e.id,e])),w_=e=>C_.get(e),T_=R([`head`,`horse`,`torso`,`legs`,`boots`,`right-hand`,`left-hand`,`consumable`]).meta({id:`HeroLoadoutSlot`});L({itemId:N(),slot:T_,amount:N().min(1)}).meta({id:`HeroLoadout`});const E_=L({id:N(),stats:L({health:N(),experience:N(),attackPower:N(),healthRegeneration:N(),damageReduction:N(),experienceModifier:N(),speed:N(),natarianAttackBonus:N(),attackBonus:N(),defenceBonus:N()}),selectableAttributes:L({attackPower:N(),resourceProduction:N(),attackBonus:N(),defenceBonus:N()}),villageId:N(),resourceToProduce:Ah,isHeroHome:F()}),D_=L({itemId:N(),slot:T_,amount:N()}),O_=L({id:N(),amount:N()}),k_=L({available:N(),completed:N(),nextAvailableAt:N()}).meta({id:`HeroAdventures`}),A_=e=>{let t={id:e.id,stats:{health:e.health,experience:e.experience,attackPower:e.base_attack_power,healthRegeneration:e.health_regeneration,damageReduction:e.damage_reduction,experienceModifier:e.experience_modifier,speed:e.speed,natarianAttackBonus:e.natarian_attack_bonus,attackBonus:e.attack_bonus,defenceBonus:e.defence_bonus},selectableAttributes:{attackPower:e.attack_power,resourceProduction:e.resource_production,attackBonus:e.attack_bonus,defenceBonus:e.defence_bonus},villageId:e.village_id,resourceToProduce:e.resource_to_produce,isHeroHome:!!e.is_home};return E_.parse(t)},j_=e=>D_.parse({itemId:e.item_id,slot:e.slot,amount:e.amount}),M_=e=>O_.parse({id:e.item_id,amount:e.amount}),N_=L({id:N(),health:N(),experience:N(),attack_power:N(),resource_production:N(),attack_bonus:N(),defence_bonus:N(),base_attack_power:N(),health_regeneration:N(),damage_reduction:N(),experience_modifier:N(),speed:N(),village_id:N(),natarian_attack_bonus:N(),resource_to_produce:Ah,is_home:N()}).meta({id:`GetHeroRow`}),P_=L({item_id:N(),slot:T_,amount:N().min(1)}).meta({id:`GetHeroLoadoutRow`}),F_=L({item_id:N(),amount:N().int().positive()}).meta({id:`GetHeroInventoryRow`}),I_=Q(`/players/:playerId/hero`,{summary:`Get hero details`,requestParams:{path:L({playerId:B()})},response:E_})(({database:e,path:{playerId:t}})=>{let n=e.selectObject({sql:`
        SELECT
          h.id,
          h.health,
          h.experience,
          h.base_attack_power,
          h.health_regeneration,
          h.damage_reduction,
          h.experience_modifier,
          h.speed,
          h.village_id,
          h.natarian_attack_bonus,
          h.attack_bonus,
          h.defence_bonus,
          h.resource_to_produce,
          hsa.attack_power,
          hsa.resource_production,
          hsa.attack_bonus,
          hsa.defence_bonus,
          EXISTS
          (
            SELECT 1
            FROM
              troops t
                JOIN unit_ids ui ON t.unit_id = ui.id
                JOIN villages v ON v.id = h.village_id
            WHERE
              ui.unit = 'HERO'
              AND t.tile_id = v.tile_id
              AND t.source_tile_id = v.tile_id
              AND t.amount > 0
            ) AS is_home
        FROM
          heroes h
            JOIN
            hero_selectable_attributes hsa ON h.id = hsa.hero_id
        WHERE
          h.player_id = $player_id;
      `,bind:{$player_id:t},schema:N_});return A_(n)}),L_=Q(`/players/:playerId/hero/equipped-items`,{summary:`Get hero loadout`,requestParams:{path:L({playerId:B()})},response:I(D_)})(({database:e})=>e.selectObjects({sql:`
      SELECT slot, item_id, amount
      FROM
        hero_equipped_items
      WHERE
        hero_id = (
          SELECT id
          FROM
            heroes
          LIMIT 1
          )
    `,schema:P_}).map(j_)),R_=Q(`/players/:playerId/hero/inventory`,{summary:`Get hero inventory`,requestParams:{path:L({playerId:B()})},response:I(O_)})(({database:e})=>e.selectObjects({sql:`
      SELECT i.item_id, i.amount
      FROM
        hero_inventory i
      WHERE
        i.hero_id = (
          SELECT h.id
          FROM
            heroes h
          ORDER BY h.id
          LIMIT 1
          )
    `,schema:F_}).map(M_)),z_=Q(`/players/:playerId/hero/adventures`,{summary:`Get hero adventures`,requestParams:{path:L({playerId:B()})},response:k_})(({database:e})=>{let{available:t,completed:n,nextAvailableAt:r}=lp(e,Date.now());return k_.parse({available:t,completed:n,nextAvailableAt:r})}),B_=Q(`/players/:playerId/hero/adventures`,`post`,{summary:`Start hero adventure`,requestParams:{path:L({playerId:B()})}})(({database:e,path:{playerId:t}})=>{let{health:n,isHeroStationedInOwnVillage:r,tileId:i,sourceTileId:a,villageId:o}=e.selectObject({sql:`
      SELECT
        h.health,
        t.tile_id = v.tile_id
          AND t.source_tile_id = v.tile_id
          AND t.amount > 0
          AS isHeroStationedInOwnVillage,
        t.tile_id AS tileId,
        t.source_tile_id AS sourceTileId,
        v.id AS villageId
      FROM
        heroes h
          JOIN unit_ids ui ON ui.unit = 'HERO'
          JOIN troops t ON t.unit_id = ui.id
          JOIN villages v ON v.tile_id = t.tile_id
          AND v.player_id = h.player_id
      WHERE
        h.player_id = $player_id
      LIMIT 1;
    `,bind:{$player_id:t},schema:L({health:N(),isHeroStationedInOwnVillage:V(),tileId:N(),sourceTileId:N(),villageId:N()})});if(n<=0)throw Error(`Hero is dead`);if(!r)throw Error(`Hero is not stationed in his home village`);let s=e.selectValue({sql:`SELECT id FROM tiles WHERE x = 0 AND y = 0;`,schema:N()});X(e,{type:`troopMovementAdventure`,villageId:o,originTileId:i,targetTileId:s,troops:[{unitId:`HERO`,amount:1,tileId:i,sourceTileId:a}]})}),V_=Q(`/players/:playerId/hero/attributes`,`patch`,{summary:`Change hero attributes`,requestParams:{path:L({playerId:B()})},requestBody:L({attackPower:N().int().min(0).max(100),resourceProduction:N().int().min(0).max(100),attackBonus:N().int().min(0).max(100),defenceBonus:N().int().min(0).max(100)})})(({database:e,path:{playerId:t},body:{attackPower:n,resourceProduction:r,attackBonus:i,defenceBonus:a}})=>{e.transaction(()=>{let o=e.selectObject({sql:`
          SELECT h.id, ti.tribe
          FROM
            heroes h
              JOIN players p ON h.player_id = p.id
              JOIN tribe_ids ti ON p.tribe_id = ti.id
          WHERE
            p.id = $player_id
        `,bind:{$player_id:t},schema:L({id:N(),tribe:W})});e.exec({sql:`
          UPDATE hero_selectable_attributes
          SET
            attack_power = $attackPower,
            resource_production = $resourceProduction,
            attack_bonus = $attackBonus,
            defence_bonus = $defenceBonus
          WHERE
            hero_id = $hero_id
        `,bind:{$hero_id:o.id,$attackPower:n,$resourceProduction:r,$attackBonus:i,$defenceBonus:a}});let s=o.tribe.toLowerCase()===`romans`?100:80,c=o.tribe.toLowerCase()===`romans`?100:80,l=e.selectValue({sql:`SELECT village_id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:N()});q(e,K(e,l),Date.now()),e.exec({sql:`
          UPDATE heroes
          SET
            base_attack_power = $initialStrength + ($strengthPerPoint * $attackPower),
            attack_bonus = $attackBonus * 2, -- 0.2% * 10 (stored as integer)
            defence_bonus = $defenceBonus * 2
          WHERE
            id = $hero_id
        `,bind:{$hero_id:o.id,$initialStrength:c,$strengthPerPoint:s,$attackPower:n,$attackBonus:i,$defenceBonus:a}});let u=e.selectValue({sql:`SELECT resource_to_produce FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:Ah});Ih({database:e,villageId:l,tribe:o.tribe,resourceProduction:r,resourceToProduce:u})})}),H_=Q(`/players/:playerId/hero/resource-to-produce`,`patch`,{summary:`Change hero resource to produce`,requestParams:{path:L({playerId:B()})},requestBody:L({resource:Ah})})(({database:e,path:{playerId:t},body:{resource:n}})=>{e.transaction(()=>{e.exec({sql:`
        UPDATE heroes
        SET
          resource_to_produce = $resource
        WHERE
          player_id = $player_id
      `,bind:{$player_id:t,$resource:n}});let r=e.selectObject({sql:`
        SELECT hsa.resource_production, ti.tribe
        FROM
          hero_selectable_attributes hsa
            JOIN heroes h ON hsa.hero_id = h.id
            JOIN players p ON h.player_id = p.id
            JOIN tribe_ids ti ON p.tribe_id = ti.id
        WHERE
          p.id = $player_id
      `,bind:{$player_id:t},schema:L({resource_production:N(),tribe:W})}),i=e.selectValue({sql:`SELECT village_id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:N()});q(e,K(e,i),Date.now()),Ih({database:e,villageId:i,tribe:r.tribe,resourceProduction:r.resource_production,resourceToProduce:n})})}),U_=Q(`/players/:playerId/hero/equipped-items`,`patch`,{summary:`Equip hero item`,requestParams:{path:L({playerId:B()})},requestBody:L({itemId:N(),slot:T_,amount:N()})})(({database:e,path:{playerId:t},body:{itemId:n,slot:r,amount:i}})=>{e.transaction(()=>{let a=e.selectValue({sql:`SELECT id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:N()}),o=e.selectObject({sql:`SELECT item_id, amount FROM hero_equipped_items WHERE hero_id = $hero_id AND slot = $slot`,bind:{$hero_id:a,$slot:r},schema:L({item_id:N(),amount:N()})});o&&o.item_id!==n&&(e.exec({sql:`
          INSERT INTO
            hero_inventory (hero_id, item_id, amount)
          VALUES
            ($hero_id, $equippedItemId, $equippedAmount)
          ON CONFLICT(hero_id, item_id) DO UPDATE SET
            amount = amount + EXCLUDED.amount
        `,bind:{$hero_id:a,$equippedItemId:String(o.item_id),$equippedAmount:o.amount}}),e.exec({sql:`DELETE FROM effects WHERE source_id = (SELECT id FROM effect_source_ids WHERE source = 'hero') AND source_specifier = $itemId`,bind:{$itemId:o.item_id}}),e.exec({sql:`DELETE FROM hero_equipped_items WHERE hero_id = $hero_id AND slot = $slot`,bind:{$hero_id:a,$slot:r}})),e.exec({sql:`
        DELETE
        FROM
          hero_inventory
        WHERE
          hero_id = $hero_id
          AND item_id = $itemId
          AND amount = $amount
      `,bind:{$hero_id:a,$itemId:n,$amount:i}}),e.exec({sql:`
        UPDATE hero_inventory
        SET
          amount = amount - $amount
        WHERE
          hero_id = $hero_id
          AND item_id = $itemId
          AND amount > $amount
      `,bind:{$hero_id:a,$itemId:n,$amount:i}}),e.exec({sql:`
        INSERT INTO
          hero_equipped_items (hero_id, slot, item_id, amount)
        VALUES
          ($hero_id, $slot, $itemId, $amount)
        ON CONFLICT(hero_id, slot) DO UPDATE SET
          amount = amount + EXCLUDED.amount
      `,bind:{$hero_id:a,$slot:r,$itemId:n,$amount:i}});let s=w_(n);if(s.effects){let r=e.selectValue({sql:`SELECT tile_id FROM villages WHERE player_id = $player_id LIMIT 1`,bind:{$player_id:t},schema:N()});e.exec({sql:`
          INSERT INTO effects (
            effect_id,
            value,
            type_id,
            scope_id,
            source_id,
            tile_id,
            source_specifier
          )
          SELECT
            effect_ids.id,
            json_extract(effect.value, '$.value'),
            effect_type_ids.id,
            effect_scope_ids.id,
            effect_source_ids.id,
            CASE
              WHEN json_extract(effect.value, '$.scope') = 'local'
                THEN $tile_id
              ELSE NULL
            END,
            $source_specifier
          FROM
            json_each($effects) AS effect
            JOIN effect_ids
              ON effect_ids.effect = json_extract(effect.value, '$.id')
            JOIN effect_type_ids
              ON effect_type_ids.type = json_extract(effect.value, '$.type')
            JOIN effect_scope_ids
              ON effect_scope_ids.scope = json_extract(effect.value, '$.scope')
            JOIN effect_source_ids
              ON effect_source_ids.source = 'hero';
        `,bind:{$effects:JSON.stringify(s.effects),$tile_id:r??null,$source_specifier:n}})}})}),W_=Q(`/players/:playerId/hero/equipped-items/:slot`,`delete`,{summary:`Unequip hero item`,requestParams:{path:L({playerId:B(),slot:T_})}})(({database:e,path:{playerId:t,slot:n}})=>{e.transaction(()=>{let r=e.selectValue({sql:`SELECT id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:N()}),i=e.selectObject({sql:`SELECT item_id, amount FROM hero_equipped_items WHERE hero_id = $hero_id AND slot = $slot`,bind:{$hero_id:r,$slot:n},schema:L({item_id:N(),amount:N()})});i&&(e.exec({sql:`
          INSERT INTO
            hero_inventory (hero_id, item_id, amount)
          VALUES
            ($hero_id, $itemId, $amount)
          ON CONFLICT(hero_id, item_id) DO UPDATE SET
            amount = amount + EXCLUDED.amount
        `,bind:{$hero_id:r,$itemId:i.item_id,$amount:i.amount}}),e.exec({sql:`DELETE FROM effects WHERE source_id = (SELECT id FROM effect_source_ids WHERE source = 'hero') AND source_specifier = $itemId`,bind:{$itemId:i.item_id}}),e.exec({sql:`DELETE FROM hero_equipped_items WHERE hero_id = $hero_id AND slot = $slot`,bind:{$hero_id:r,$slot:n}}))})}),G_=Q(`/players/:playerId/hero/item`,`post`,{summary:`Use hero item`,requestParams:{path:L({playerId:B()})},requestBody:L({itemId:N(),amount:N()})})(({database:e,path:{playerId:t},body:{itemId:n,amount:r}})=>{e.transaction(()=>{let i=e.selectValue({sql:`SELECT id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:N()});if(i===void 0)throw Error(`Hero not found`);let a=e.selectValue({sql:`SELECT amount FROM hero_inventory WHERE hero_id = $hero_id AND item_id = $itemId`,bind:{$hero_id:i,$itemId:n},schema:N()})??0;if(a<r)throw Error(`Not enough items in inventory`);let o=r;if(n===1021){let t=100-e.selectValue({sql:`SELECT health FROM heroes WHERE id = $hero_id`,bind:{$hero_id:i},schema:N()});if(t<=0)return;o=Math.min(r,t),e.exec({sql:`UPDATE heroes SET health = health + $healthToAdd WHERE id = $hero_id`,bind:{$hero_id:i,$healthToAdd:o}})}else if(n===1022){o=1;let n=e.selectValue({sql:`
          SELECT ti.tribe
          FROM
            heroes h
              JOIN players p ON h.player_id = p.id
              JOIN tribe_ids ti ON p.tribe_id = ti.id
          WHERE
            h.id = $hero_id
        `,bind:{$hero_id:i},schema:j()}),r=n.toLowerCase()===`romans`?100:80,a=e.selectValue({sql:`SELECT village_id FROM heroes WHERE player_id = $player_id`,bind:{$player_id:t},schema:N()});q(e,K(e,a),Date.now()),e.exec({sql:`
          UPDATE hero_selectable_attributes
          SET
            attack_power = 0,
            resource_production = 0,
            attack_bonus = 0,
            defence_bonus = 0
          WHERE
            hero_id = $hero_id
        `,bind:{$hero_id:i}}),e.exec({sql:`
          UPDATE heroes
          SET
            base_attack_power = $initialStrength,
            attack_bonus = 0,
            defence_bonus = 0
          WHERE
            id = $hero_id
        `,bind:{$hero_id:i,$initialStrength:r}}),Ih({database:e,villageId:a,tribe:n,resourceProduction:0,resourceToProduce:`shared`})}else if(n===1030){o=1;let t=10*r;e.exec({sql:`
          UPDATE heroes
          SET
            experience = experience + $experienceToAdd
          WHERE
            id = $hero_id
        `,bind:{$hero_id:i,$experienceToAdd:t}})}else throw Error(`Item effect not implemented`);a===o?e.exec({sql:`DELETE FROM hero_inventory WHERE hero_id = $hero_id AND item_id = $itemId`,bind:{$hero_id:i,$itemId:String(n)}}):e.exec({sql:`UPDATE hero_inventory SET amount = amount - $itemsUsed WHERE hero_id = $hero_id AND item_id = $itemId`,bind:{$hero_id:i,$itemId:String(n),$itemsUsed:o}})})}),K_=L({fieldId:N(),building:H,previousLevel:N(),newLevel:N(),timestamp:N()}).meta({id:`BuildingLevelChangeHistoryItemDto`}),q_=L({batchId:j(),unit:J,building:H,amount:N(),timestamp:N()}).meta({id:`UnitTrainingHistoryItemDto`}),J_=Kc(`type`,[L({id:j(),villageId:N(),type:z(`construction`),timestamp:N(),data:Kc(`status`,[L({status:z(`completed`),fieldId:N(),building:H,previousLevel:N(),newLevel:N()}),L({status:z(`cancelled`),fieldId:N(),building:H,level:N()})])}),L({id:j(),villageId:N(),type:z(`training`),timestamp:N(),data:L({batchId:j(),unit:J,building:H,amount:N()})}),L({id:j(),villageId:N(),type:z(`improvement`),timestamp:N(),data:L({unit:J,previousLevel:N(),newLevel:N()})}),L({id:j(),villageId:N(),type:z(`research`),timestamp:N(),data:L({unit:J})}),L({id:j(),villageId:N(),type:z(`founding`),timestamp:N(),data:L({tileId:N(),x:N(),y:N()})})]).meta({id:`EventsHistoryItemDto`}),Y_=e=>K_.parse({fieldId:e.field_id,building:e.building,previousLevel:e.previous_level,newLevel:e.new_level,timestamp:e.timestamp}),X_=e=>q_.parse({batchId:e.batch_id,unit:e.unit,building:e.building,amount:e.amount,timestamp:e.timestamp}),Z_=L({field_id:N(),building:H,previous_level:N(),new_level:N(),timestamp:N()}).meta({id:`GetBuildingLevelChangeHistoryRow`}),Q_=L({batch_id:j(),unit:J,building:H,amount:N(),timestamp:N()}).meta({id:`GetUnitTrainingHistoryRow`}),$_=Kc(`type`,[L({id:j(),villageId:N(),type:z(`construction`),timestamp:N(),data:El(e=>typeof e==`string`?JSON.parse(e):e,Kc(`status`,[L({status:z(`completed`),fieldId:N(),building:H,previousLevel:N(),newLevel:N()}),L({status:z(`cancelled`),fieldId:N(),building:H,level:N()})]))}),L({id:j(),villageId:N(),type:z(`training`),timestamp:N(),data:El(e=>typeof e==`string`?JSON.parse(e):e,L({batchId:j(),unit:J,building:H,amount:N()}))}),L({id:j(),villageId:N(),type:z(`improvement`),timestamp:N(),data:El(e=>typeof e==`string`?JSON.parse(e):e,L({unit:J,previousLevel:N(),newLevel:N()}))}),L({id:j(),villageId:N(),type:z(`research`),timestamp:N(),data:El(e=>typeof e==`string`?JSON.parse(e):e,L({unit:J}))}),L({id:j(),villageId:N(),type:z(`founding`),timestamp:N(),data:El(e=>typeof e==`string`?JSON.parse(e):e,L({tileId:N(),x:N(),y:N()}))})]).meta({id:`GetEventsHistory`}),ev=Q(`/villages/:villageId/history/buildings`,{summary:`Get village building level change history`,requestParams:{path:L({villageId:B()})},response:I(K_)})(({database:e,path:t})=>{let{villageId:n}=t;return e.selectObjects({sql:`
  SELECT
    h.field_id,
    bi.building,
    h.previous_level,
    h.new_level,
    h.timestamp
  FROM
    building_level_change_history h
      JOIN building_ids bi ON h.building_id = bi.id
  WHERE
    h.village_id = $village_id
  ORDER BY
    h.timestamp DESC;
`,bind:{$village_id:n},schema:Z_}).map(Y_)}),tv=Q(`/villages/:villageId/history/units`,{summary:`Get village unit training history`,requestParams:{path:L({villageId:B()}),query:L({buildingId:H.nullable().optional()})},response:I(q_)})(({database:e,path:t,query:n})=>{let{villageId:r}=t,{buildingId:i=null}=n;return e.selectObjects({sql:`
  SELECT
    h.batch_id,
    ui.unit,
    bi.building,
    h.amount,
    h.timestamp
  FROM
    unit_training_history h
      JOIN unit_ids ui ON h.unit_id = ui.id
      JOIN building_ids bi ON h.building_id = bi.id
  WHERE
    h.village_id = $village_id
    AND ($building_id IS NULL OR bi.building = $building_id)
  ORDER BY
    h.timestamp DESC;
`,bind:{$village_id:r,$building_id:i},schema:Q_}).map(X_)}),nv=Q(`/villages/:villageId/history/events`,{summary:`Get village events history`,requestParams:{path:L({villageId:B()}),query:L({page:B().optional().default(1),scope:R([`village`,`global`]).optional().default(`village`),types:I(R([`construction`,`training`,`improvement`,`research`,`founding`])).or(R([`construction`,`training`,`improvement`,`research`,`founding`])).optional()})},response:I(J_)})(({database:e,path:t,url:n})=>{let{villageId:r}=t,{searchParams:i}=new URL(n,`http://localhost`),a=i.get(`scope`)??`village`,o=i.getAll(`types`);return e.selectObjects({sql:`
  WITH
    requested_types AS (
      SELECT value AS type
      FROM JSON_EACH($types)
    ),
    player_villages AS (
      SELECT id
      FROM villages
      WHERE player_id = (
        SELECT player_id
        FROM villages
        WHERE id = $village_id
      )
    )
  SELECT *
  FROM (
    SELECT
      'construction-' || id AS id,
      village_id AS villageId,
      'construction' AS type,
      timestamp,
      JSON_OBJECT(
        'fieldId', field_id,
        'building', (SELECT building FROM building_ids WHERE id = building_id),
        'status', 'completed',
        'previousLevel', previous_level,
        'newLevel', new_level
      ) AS data
    FROM building_level_change_history
    WHERE
      (
        ($scope = 'village' AND village_id = $village_id)
        OR ($scope = 'global' AND village_id IN (SELECT id FROM player_villages))
      )
      AND (
        NOT EXISTS (SELECT 1 FROM requested_types)
        OR EXISTS (SELECT 1 FROM requested_types WHERE type = 'construction')
      )

    UNION ALL

    SELECT
      'construction-cancellation-' || id AS id,
      village_id AS villageId,
      'construction' AS type,
      timestamp,
      JSON_OBJECT(
        'fieldId', field_id,
        'building', (SELECT building FROM building_ids WHERE id = building_id),
        'status', 'cancelled',
        'level', level
      ) AS data
    FROM scheduled_building_construction_cancellation_history
    WHERE
      (
        ($scope = 'village' AND village_id = $village_id)
        OR ($scope = 'global' AND village_id IN (SELECT id FROM player_villages))
      )
      AND (
        NOT EXISTS (SELECT 1 FROM requested_types)
        OR EXISTS (SELECT 1 FROM requested_types WHERE type = 'construction')
      )

    UNION ALL

    SELECT
      'training-' || id AS id,
      village_id AS villageId,
      'training' AS type,
      timestamp,
      JSON_OBJECT(
        'batchId', batch_id,
        'unit', (SELECT unit FROM unit_ids WHERE id = unit_id),
        'building', (SELECT building FROM building_ids WHERE id = building_id),
        'amount', amount
      ) AS data
    FROM unit_training_history
    WHERE
      (
        ($scope = 'village' AND village_id = $village_id)
        OR ($scope = 'global' AND village_id IN (SELECT id FROM player_villages))
      )
      AND (
        NOT EXISTS (SELECT 1 FROM requested_types)
        OR EXISTS (SELECT 1 FROM requested_types WHERE type = 'training')
      )

    UNION ALL

    SELECT
      'improvement-' || id AS id,
      (SELECT id FROM villages WHERE player_id = unit_improvement_history.player_id LIMIT 1) AS villageId,
      'improvement' AS type,
      timestamp,
      JSON_OBJECT(
        'unit', (SELECT unit FROM unit_ids WHERE id = unit_id),
        'previousLevel', previous_level,
        'newLevel', new_level
      ) AS data
    FROM unit_improvement_history
    WHERE
      player_id = (
        SELECT player_id
        FROM villages
        WHERE id = $village_id
      )
      AND (
        NOT EXISTS (SELECT 1 FROM requested_types)
        OR EXISTS (SELECT 1 FROM requested_types WHERE type = 'improvement')
      )

    UNION ALL

    SELECT
      'research-' || id AS id,
      village_id AS villageId,
      'research' AS type,
      timestamp,
      JSON_OBJECT(
        'unit', (SELECT unit FROM unit_ids WHERE id = unit_id)
      ) AS data
    FROM unit_research_history
    WHERE
      (
        ($scope = 'village' AND village_id = $village_id)
        OR ($scope = 'global' AND village_id IN (SELECT id FROM player_villages))
      )
      AND (
        NOT EXISTS (SELECT 1 FROM requested_types)
        OR EXISTS (SELECT 1 FROM requested_types WHERE type = 'research')
      )

    UNION ALL

    SELECT
      'founding-' || id AS id,
      village_id AS villageId,
      'founding' AS type,
      timestamp,
      JSON_OBJECT(
        'tileId', tile_id,
        'x', x,
        'y', y
      ) AS data
    FROM village_founding_history
    WHERE
      (
        ($scope = 'village' AND village_id = $village_id)
        OR ($scope = 'global' AND village_id IN (SELECT id FROM player_villages))
      )
      AND (
        NOT EXISTS (SELECT 1 FROM requested_types)
        OR EXISTS (SELECT 1 FROM requested_types WHERE type = 'founding')
      )
  )
  ORDER BY timestamp DESC;
`,bind:{$village_id:r,$scope:a,$types:JSON.stringify(o)},schema:$_})}),rv=L({loyalty:N()}).meta({id:`TileLoyaltyDto`}),iv=Q(`/tiles/:tileId/loyalty`,{summary:`Get current loyalty of a tile`,requestParams:{path:L({tileId:B()})},response:rv})(({database:e,path:{tileId:t}})=>({loyalty:qm(e,t)})),av=L({id:N(),name:j(),slug:j(),tribe:W,faction:Rp}),ov=L({id:N(),name:j(),slug:j(),population:N()}),sv=Kc(`type`,[L({id:N(),coordinates:Y,type:z(`free`),owner:Wc([av,Fc()]),ownerVillage:Wc([ov,Fc()]),attributes:L({resourceFieldComposition:Bp}),item:L({id:N()}).nullable()}),L({id:N(),coordinates:Y,type:z(`oasis`),owner:Wc([av,Fc()]),ownerVillage:Wc([ov,Fc()]),attributes:L({oasisGraphics:N(),isOccupiable:F()})})]),cv=L({unitId:J,amount:N(),tileId:N(),sourceTileId:N()}),lv=L({resource:Ou,bonus:N()}),uv=L({id:N(),coordinates:Y,distance:N(),amount:N()}),dv=L({tileId:N(),description:j(),color:j().regex(/^#[\dA-Fa-f]{6}$/u,`Expected a hex color value`)}),fv=e=>{let t=e.type===`free`,n=e.player_id!==null,r=n&&e.player_id!==null&&e.player_name!==null&&e.player_tribe!==null&&e.player_faction!==null?{id:e.player_id,name:e.player_name,slug:e.player_slug??``,tribe:e.player_tribe,faction:e.player_faction}:null,i=n&&e.village_id!==null&&e.village_name!==null&&e.population!==null?{id:e.village_id,name:e.village_name,slug:e.village_slug??``,population:e.population}:null;if(t){let t={id:e.id,type:`free`,coordinates:{x:e.coordinates_x,y:e.coordinates_y},owner:r,ownerVillage:i,attributes:{resourceFieldComposition:e.rfc??`4446`},item:e.item_id===null?null:{id:e.item_id}};return sv.parse(t)}let a={id:e.id,type:`oasis`,coordinates:{x:e.coordinates_x,y:e.coordinates_y},owner:r,ownerVillage:i,attributes:{oasisGraphics:e.oasis_graphics??0,isOccupiable:e.oasis_is_occupiable===1}};return sv.parse(a)},pv=e=>{let t={unitId:e.unit_id,amount:e.amount,tileId:e.tile_id,sourceTileId:e.source_tile_id};return cv.parse(t)},mv=e=>lv.parse({resource:e.resource,bonus:e.bonus}),hv=e=>uv.parse({id:e.item_id,coordinates:{x:0,y:0},distance:0,amount:e.amount}),gv=e=>dv.parse({tileId:e.tile_id,description:e.description,color:e.color}),_v=L({id:N(),coordinates_x:N(),coordinates_y:N(),type:Hp,rfc:Bp.nullable(),oasis_graphics:N().nullable(),oasis_is_occupiable:N().nullable(),player_id:N().nullable(),player_slug:j().nullable(),player_name:j().nullable(),player_tribe:W.nullable(),player_faction:Rp.nullable(),village_id:N().nullable(),village_name:j().nullable(),village_slug:j().nullable(),population:N().nullable(),item_id:N().nullable()}).meta({id:`GetTilesRow`}),vv=L({unit_id:J,amount:N(),tile_id:N(),source_tile_id:N()}).meta({id:`GetTileTroopsRow`}),yv=L({resource:Ou,bonus:N()}).meta({id:`GetTileOasisBonusesRow`}),bv=L({item_id:N(),amount:N()}).meta({id:`GetTileWorldItemRow`}),xv=L({tile_id:N(),description:j(),color:j().regex(/^#[\dA-Fa-f]{6}$/)}).meta({id:`GetMapMarkersRow`}),Sv=Q(`/players/:playerId/map-markers`,{summary:`Get map markers`,requestParams:{path:L({playerId:B()})},response:I(dv)})(({database:e,path:{playerId:t}})=>e.selectObjects({sql:`
  SELECT
    tile_id,
    CASE
      WHEN TRIM(description) = '' THEN 'Map marker ' || ROW_NUMBER() OVER (ORDER BY id)
      ELSE description
      END AS description,
    color
  FROM
    map_markers
  WHERE
    player_id = $player_id
  ORDER BY
    id;
`,bind:{$player_id:t},schema:xv}).map(gv)),Cv=Q(`/players/:playerId/map-markers`,`post`,{summary:`Add map marker`,requestParams:{path:L({playerId:B()})},requestBody:L({tileId:N(),description:j(),color:dv.shape.color})})(({database:e,path:{playerId:t},body:{tileId:n,description:r,color:i}})=>{e.transaction(e=>{e.exec({sql:Hm,bind:{$player_id:t,$tile_id:n}}),e.exec({sql:`
  INSERT INTO
    map_markers (player_id, tile_id, description, color)
  VALUES
    ($player_id, $tile_id, $description, $color);
`,bind:{$player_id:t,$tile_id:n,$description:r,$color:i}})})}),wv=Q(`/players/:playerId/map-markers/:tileId`,`delete`,{summary:`Remove map marker`,requestParams:{path:L({playerId:B(),tileId:B()})}})(({database:e,path:{playerId:t,tileId:n}})=>{e.exec({sql:Hm,bind:{$player_id:t,$tile_id:n}})}),Tv=Q(`/tiles`,{summary:`Get all tiles`,response:I(sv.nullable())})(({database:e})=>{let t=e.selectObjects({sql:`
  WITH
    effects_wheat AS (
      SELECT e.tile_id, SUM(-e.value) AS wheat_production_sum
      FROM
        effects e
      WHERE
        e.effect_id = 1
        AND e.type_id = 1
        AND e.scope_id = 2
        AND e.source_id = 1
        AND e.source_specifier = 0
      GROUP BY e.tile_id
    ),

    world_items_single AS (
      SELECT tile_id, MIN(item_id) AS item_id
      FROM
        world_items
      GROUP BY tile_id
    )

  SELECT
    t.id AS id,
    t.x AS coordinates_x,
    t.y AS coordinates_y,
    CASE t.type_id
      WHEN 1 THEN 'free'
      WHEN 2 THEN 'oasis'
    END AS type,
    rfc.resource_field_composition AS rfc,
    t.oasis_graphics AS oasis_graphics,
    CASE
      WHEN t.type_id = 1 THEN v.id
      WHEN t.type_id = 2 THEN v_owner.id
    END AS village_id,
    CASE
      WHEN t.type_id = 1 THEN v.name
      WHEN t.type_id = 2 THEN v_owner.name
    END AS village_name,
    CASE
      WHEN t.type_id = 1 THEN v.slug
      WHEN t.type_id = 2 THEN v_owner.slug
    END AS village_slug,
    p.id AS player_id,
    p.slug AS player_slug,
    p.name AS player_name,
    ti.tribe AS player_tribe,
    fi.faction AS player_faction,

    CASE
      WHEN t.type_id = 1 AND v.id IS NOT NULL THEN COALESCE(ew.wheat_production_sum, 0)
      WHEN t.type_id = 2 AND v_owner.id IS NOT NULL THEN COALESCE(ew_owner.wheat_production_sum, 0)
    END AS population,

    CASE
      WHEN t.type_id = 1 THEN wi.item_id
    END AS item_id,

    CASE
      WHEN t.type_id = 2 THEN 1
      ELSE 0
    END AS oasis_is_occupiable

  FROM
    tiles t
      LEFT JOIN villages v ON v.tile_id = t.id
      LEFT JOIN (
        SELECT tile_id, MAX(village_id) AS village_id
        FROM
          oasis
        GROUP BY tile_id
      ) o ON o.tile_id = t.id AND t.type_id = 2
      LEFT JOIN villages v_owner ON v_owner.id = o.village_id
      LEFT JOIN players p ON p.id = CASE
        WHEN t.type_id = 1 THEN v.player_id
        WHEN t.type_id = 2 THEN v_owner.player_id
      END
      LEFT JOIN tribe_ids ti ON p.tribe_id = ti.id
      LEFT JOIN faction_ids fi ON fi.id = p.faction_id
      LEFT JOIN resource_field_composition_ids rfc ON rfc.id = t.resource_field_composition_id
      LEFT JOIN effects_wheat ew ON ew.tile_id = v.tile_id
      LEFT JOIN effects_wheat ew_owner ON ew_owner.tile_id = v_owner.tile_id
      LEFT JOIN world_items_single wi ON wi.tile_id = t.id

  ;
`,schema:_v}),n=e.selectValue({sql:Qf,schema:N()}),{totalTiles:r}=hf(n),i=Array.from({length:r}).fill(null);for(let e of t)i[e.id-1]=e;return i.map(e=>e?fv(e):null)}),Ev=Q(`/tiles/:tileId/troops`,{summary:`Get troops on a tile`,requestParams:{path:L({tileId:B()})},response:I(cv)})(({database:e,path:{tileId:t}})=>e.selectObjects({sql:`
  SELECT
    ui.unit AS unit_id,
    SUM(t.amount) AS amount,
    t.tile_id,
    t.source_tile_id
  FROM
    troops t
      JOIN unit_ids ui ON ui.id = t.unit_id
  WHERE
    t.tile_id = $tile_id
  GROUP BY
    ui.unit;
`,bind:{$tile_id:t},schema:vv}).map(pv)),Dv=Q(`/tiles/:tileId/bonuses`,{summary:`Get oasis bonuses on a tile`,requestParams:{path:L({tileId:B()})},response:I(lv)})(({database:e,path:{tileId:t}})=>e.selectObjects({sql:`
  SELECT
    ri.resource,
    o.bonus
  FROM
    oasis o
      JOIN resource_ids ri ON ri.id = o.resource_id
  WHERE
    o.tile_id = $tile_id;
`,bind:{$tile_id:t},schema:yv}).map(mv)),Ov=Q(`/tiles/:tileId/world-item`,{summary:`Get world item on a tile`,requestParams:{path:L({tileId:B()})},response:uv.nullable()})(({database:e,path:{tileId:t}})=>{let n=e.selectObject({sql:`
  SELECT item_id, amount
  FROM
    world_items
  WHERE
    tile_id = $tile_id
  LIMIT 1;
`,bind:{$tile_id:t},schema:bv})??null;return n?hv(n):null}),kv=L({shouldShowFactionReputation:F(),shouldShowOasisIcons:F(),shouldShowTileTooltips:F(),shouldShowTreasureIcons:F(),shouldShowTroopMovements:F(),shouldShowWheatFields:F()}),Av=e=>`
  UPDATE map_filters
  SET
    ${e} = $value;
`,jv=e=>kv.parse({shouldShowFactionReputation:!!e.should_show_faction_reputation,shouldShowOasisIcons:!!e.should_show_oasis_icons,shouldShowTileTooltips:!!e.should_show_tile_tooltips,shouldShowTreasureIcons:!!e.should_show_treasure_icons,shouldShowTroopMovements:!!e.should_show_troop_movements,shouldShowWheatFields:!!e.should_show_wheat_fields}),Mv=L({should_show_faction_reputation:N(),should_show_oasis_icons:N(),should_show_troop_movements:N(),should_show_wheat_fields:N(),should_show_tile_tooltips:N(),should_show_treasure_icons:N()}).meta({id:`GetMapFiltersRow`}),Nv=Q(`/players/:playerId/map-filters`,{summary:`Get map filters`,requestParams:{path:L({playerId:B()})},response:kv})(({database:e})=>{let t=e.selectObject({sql:`
  SELECT
    should_show_faction_reputation,
    should_show_oasis_icons,
    should_show_troop_movements,
    should_show_wheat_fields,
    should_show_tile_tooltips,
    should_show_treasure_icons
  FROM
    map_filters;
`,schema:Mv});return jv(t)}),Pv=Q(`/players/:playerId/map-filters/:filterName`,`patch`,{summary:`Update map filter`,requestParams:{path:L({playerId:B(),filterName:j()})},requestBody:L({value:F()})})(({database:e,path:{filterName:t},body:{value:n}})=>{let r=Lg(t);e.exec({sql:Av(r),bind:{$value:+!!n}})}),Fv=L({targetTileId:N().int().positive(),resources:L({wood:N().int().min(0),clay:N().int().min(0),iron:N().int().min(0),wheat:N().int().min(0)})}),Iv=Fv.extend({startHour:N().int().min(0).max(23),intervalHours:N().int().positive()}),Lv=36e5,Rv=e=>{let t=Date.now(),n=new Date(t);return n.setMinutes(0,0,0),n.setHours(e),n.getTime()<=t&&n.setDate(n.getDate()+1),n.getTime()},zv=Q(`/tiles/:tileId/transfer-resources`,`post`,{summary:`Transfer resources between player villages`,requestParams:{path:L({tileId:B()})},requestBody:Fv})(({database:e,path:{tileId:t},body:{targetTileId:n,resources:r}})=>{e.transaction(e=>{let{village:i,merchant:a}=Ap(e,t),o=xp(e,n);if(!o)throw Error(`Target village does not exist`);let s=Tp(r,a.merchantCapacity);X(e,{type:`resourceTransfer`,villageId:i.id,targetVillageId:o.id,originTileId:i.tileId,targetTileId:o.tileId,resources:r,merchantAmount:s})})}),Bv=Q(`/tiles/:tileId/trade-routes`,`post`,{summary:`Create a marketplace trade route`,requestParams:{path:L({tileId:B()})},requestBody:Iv})(({database:e,path:{tileId:t},body:{targetTileId:n,resources:r,startHour:i,intervalHours:a}})=>{e.transaction(e=>{let{village:o}=Ap(e,t),s=xp(e,n);if(!s)throw Error(`Target village does not exist`);X(e,{type:`tradeRoute`,villageId:o.id,targetVillageId:s.id,originTileId:o.tileId,targetTileId:s.tileId,resources:r,interval:a*Lv,startsAt:Rv(i)})})}),Vv=Q(`/tiles/:tileId/trade-routes/:eventId`,`patch`,{summary:`Update a marketplace trade route`,requestParams:{path:L({tileId:B(),eventId:B()})},requestBody:Iv})(({database:e,path:{tileId:t,eventId:n},body:{targetTileId:r,resources:i,startHour:a,intervalHours:o}})=>{e.transaction(e=>{let{village:s}=Ap(e,t),c=xp(e,r);if(!c)throw Error(`Target village does not exist`);let l=Rv(a),u=o*Lv,d={type:`tradeRoute`,villageId:s.id,targetVillageId:c.id,originTileId:s.tileId,targetTileId:c.tileId,resources:i,interval:u};if(dm(e,d),e.selectValue({sql:`
          UPDATE events
          SET
            starts_at = $starts_at,
            meta = $meta
          WHERE id = $event_id
            AND village_id = $village_id
            AND type = 'tradeRoute'
          RETURNING changes();
        `,bind:{$event_id:n,$village_id:s.id,$starts_at:l,$meta:JSON.stringify({targetVillageId:c.id,originTileId:s.tileId,targetTileId:c.tileId,resources:i,interval:u})},schema:N()})!==1)throw Error(`Trade route does not exist`)}),Ms()}),Hv=Q(`/tiles/:tileId/trade-routes/:eventId`,`delete`,{summary:`Delete a marketplace trade route`,requestParams:{path:L({tileId:B(),eventId:B()})}})(({database:e,path:{tileId:t,eventId:n}})=>{let r=xp(e,t);if(!r)throw Error(`Village does not exist`);e.exec({sql:`
      DELETE
      FROM events
      WHERE id = $event_id
        AND village_id = $village_id
        AND type = 'tradeRoute';
    `,bind:{$event_id:n,$village_id:r.id}}),Ms()}),Uv=L({oasisTileId:N(),ownerVillage:L({id:N(),name:j(),slug:j().nullable(),coordinates:Y}).nullable()}),Wv=L({tileId:N(),coordinates:Y,resourceFieldComposition:Bp,oasisOwners:I(Uv),distance:N()}).meta({id:`OasisByBonusSearchResultItemDto`}),Gv=L({tileId:N(),coordinates:Y,bonuses:I(L({resource:Ou,bonus:N()})),animals:I(L({unitId:ad,amount:N()})),distance:N()}).meta({id:`OasisByAnimalsSearchResultItemDto`}),Kv=e=>[...new Map(e.map(e=>[e.oasisTileId,e])).values()],qv=e=>{let t=JSON.parse(e.bonuses_json),n=JSON.parse(e.animals_json);return Gv.parse({tileId:e.tile_id,coordinates:{x:e.coordinates_x,y:e.coordinates_y},bonuses:t,animals:n,distance:Dd(Math.sqrt(e.distance_squared),2)})},Jv=(e,t)=>Wv.parse({tileId:e.tile_id,coordinates:{x:e.coordinates_x,y:e.coordinates_y},resourceFieldComposition:e.resource_field_composition,oasisOwners:Kv(t),distance:Dd(Math.sqrt(e.distance_squared),2)}),Yv=e=>({oasisTileId:e.oasis_tile_id,ownerVillage:{id:e.owner_village_id,name:e.owner_village_name,slug:e.owner_village_slug,coordinates:{x:e.owner_village_x,y:e.owner_village_y}}}),Xv=e=>I(Uv).parse(JSON.parse(e)),Zv=L({tile_id:N(),coordinates_x:N(),coordinates_y:N(),bonuses_json:j(),animals_json:j(),distance_squared:N()}).meta({id:`GetOasesWithAnimalsRow`}),Qv=Q(`/search/oases/by-animals`,`post`,{summary:`Find oasis tiles with specific nature troop amounts`,requestBody:L({x:N(),y:N(),animalFilters:I(L({animal:ad,amount:N().min(1)}))}),response:I(Gv)})(({database:e,body:t})=>{let{x:n,y:r,animalFilters:i}=t,a=new Map;for(let{animal:e,amount:t}of i)a.set(e,Math.max(a.get(e)??0,t));return e.selectObjects({sql:`
        WITH
          requested_animals AS (
            SELECT
              JSON_EXTRACT(value, '$[0]') AS animal_unit,
              JSON_EXTRACT(value, '$[1]') AS requested_amount
            FROM JSON_EACH($animal_filters)
          ),
          animal_amounts AS (
            SELECT
              tr.tile_id,
              ui.unit AS animal_unit,
              SUM(tr.amount) AS amount
            FROM troops tr
            JOIN unit_ids ui ON ui.id = tr.unit_id
            GROUP BY tr.tile_id, tr.unit_id
          ),
          matching_oases AS (
            SELECT t.id AS tile_id
            FROM tiles t
            WHERE
              t.type_id = 2
              AND NOT EXISTS (
                SELECT 1
                FROM requested_animals ra
                LEFT JOIN animal_amounts aa
                  ON aa.tile_id = t.id
                  AND aa.animal_unit = ra.animal_unit
                WHERE COALESCE(aa.amount, 0) < ra.requested_amount
              )
          ),
          bonuses_by_tile AS (
            SELECT
              o.tile_id,
              JSON_GROUP_ARRAY(JSON_OBJECT('resource', ri.resource, 'bonus', o.bonus)) AS bonuses_json
            FROM oasis o
            JOIN resource_ids ri ON ri.id = o.resource_id
            GROUP BY o.tile_id
          ),
          animals_by_tile AS (
            SELECT
              tile_id,
              JSON_GROUP_ARRAY(JSON_OBJECT('unitId', animal_unit, 'amount', amount)) AS animals_json
            FROM animal_amounts
            GROUP BY tile_id
          )
        SELECT
          t.id AS tile_id,
          t.x AS coordinates_x,
          t.y AS coordinates_y,
          COALESCE(b.bonuses_json, '[]') AS bonuses_json,
          COALESCE(a.animals_json, '[]') AS animals_json,
          ((t.x - $tile_x) * (t.x - $tile_x) + (t.y - $tile_y) * (t.y - $tile_y)) AS distance_squared
        FROM matching_oases mo
        JOIN tiles t ON t.id = mo.tile_id
        LEFT JOIN bonuses_by_tile b ON b.tile_id = t.id
        LEFT JOIN animals_by_tile a ON a.tile_id = t.id
        WHERE
          t.type_id = 2
        ORDER BY distance_squared ASC;
      `,bind:{$animal_filters:JSON.stringify([...a.entries()]),$tile_x:n,$tile_y:r},schema:Zv}).map(qv)}),$v=I(L({bonus:Wc([z(25),z(50)]),resource:Ou})).max(2),ey=L({tile_id:N(),coordinates_x:N(),coordinates_y:N(),resource_field_composition:Bp,oasis_owners_json:j(),distance_squared:N()}).meta({id:`GetTilesWithBonusesRow`}),ty=L({oasis_tile_id:N(),oasis_x:N(),oasis_y:N(),owner_village_id:N(),owner_village_name:j(),owner_village_slug:j().nullable(),owner_village_x:N(),owner_village_y:N()}).meta({id:`OwnedOasisRow`}),ny=e=>{let t=new Map;for(let n of e){let e=`${n.oasis_x},${n.oasis_y}`,r=t.get(e);r?r.push(n):t.set(e,[n])}return t},ry=(e,t)=>{let n=[];for(let r=e.coordinates_x-3;r<=e.coordinates_x+3;r+=1)for(let i=e.coordinates_y-3;i<=e.coordinates_y+3;i+=1){let e=t.get(`${r},${i}`)??[];n.push(...e)}return n.sort((e,t)=>e.oasis_tile_id-t.oasis_tile_id).map(Yv)},iy=Q(`/search/oases/by-bonus`,`post`,{summary:`Find tiles with specific oasis bonuses`,requestBody:L({x:N(),y:N(),resourceFieldComposition:Bp.or(z(`any-cropper`)),bonuses:L({firstOasis:$v,secondOasis:$v,thirdOasis:$v})}),response:I(Wv)})(({database:e,body:t})=>{let{x:n,y:r,resourceFieldComposition:i,bonuses:a}=t,{firstOasis:o,secondOasis:s,thirdOasis:c}=a,l=[...o.map(e=>({slot:1,...e})),...s.map(e=>({slot:2,...e})),...c.map(e=>({slot:3,...e}))];if(l.length===0){let t=e.selectObjects({sql:`
        WITH
          src_village(x, y) AS (
            VALUES ($tile_x, $tile_y)
          ),
          cropper_resource_field_compositions(resource_field_composition) AS (
            VALUES ('3339'), ('11115'), ('00018')
          )
        SELECT
          t.id AS tile_id,
          t.x AS coordinates_x,
          t.y AS coordinates_y,
          rfc.resource_field_composition AS resource_field_composition,
          '[]' AS oasis_owners_json,
          ((t.x - sv.x) * (t.x - sv.x) + (t.y - sv.y) * (t.y - sv.y)) AS distance_squared
        FROM tiles t
        LEFT JOIN resource_field_composition_ids rfc
          ON rfc.id = t.resource_field_composition_id
        CROSS JOIN src_village sv
        WHERE
          t.type_id = (SELECT id FROM tile_type_ids WHERE type = 'free')
          AND (
            (
              $rfc_param = 'any-cropper'
              AND rfc.resource_field_composition IN (
                SELECT resource_field_composition
                FROM cropper_resource_field_compositions
              )
            )
            OR (
              $rfc_param <> 'any-cropper'
              AND rfc.resource_field_composition = $rfc_param
            )
          )
        ORDER BY distance_squared ASC;
      `,bind:{$tile_x:n,$tile_y:r,$rfc_param:i},schema:ey}),a=e.selectObjects({sql:`
        SELECT
          o.tile_id AS oasis_tile_id,
          ot.x AS oasis_x,
          ot.y AS oasis_y,
          ov.id AS owner_village_id,
          ov.name AS owner_village_name,
          ov.slug AS owner_village_slug,
          vt.x AS owner_village_x,
          vt.y AS owner_village_y
        FROM oasis o
        JOIN tiles ot ON ot.id = o.tile_id
        JOIN villages ov ON ov.id = o.village_id
        JOIN tiles vt ON vt.id = ov.tile_id
        WHERE o.village_id IS NOT NULL
        ORDER BY o.tile_id;
      `,schema:ty}),o=ny(a);return t.map(e=>{let t=ry(e,o);return Jv(e,t)})}return e.selectObjects({sql:`
      WITH
        src_village(x, y) AS (
          VALUES ($tile_x, $tile_y)
        ),
        requested_slot_bonuses AS (
          SELECT
            CAST(key AS INTEGER) AS request_id,
            CAST(JSON_EXTRACT(value, '$.slot') AS INTEGER) AS slot_index,
            JSON_EXTRACT(value, '$.resource') AS resource,
            CAST(JSON_EXTRACT(value, '$.bonus') AS INTEGER) AS bonus
          FROM JSON_EACH($requested_slot_bonuses)
        ),
        slot_bonus_counts AS (
          SELECT
            slot_index,
            COUNT(*) AS required_bonus_count
          FROM requested_slot_bonuses
          GROUP BY slot_index
        ),
        ranked_slots AS (
          SELECT
            slot_index,
            ROW_NUMBER() OVER (ORDER BY slot_index) AS slot_rank
          FROM slot_bonus_counts
        ),
        active_slot_count AS (
          SELECT COUNT(*) AS value
          FROM slot_bonus_counts
        ),
        candidates AS (
          SELECT
            t.id,
            t.x,
            t.y,
            rfc.resource_field_composition
          FROM tiles t
          LEFT JOIN resource_field_composition_ids rfc
            ON rfc.id = t.resource_field_composition_id
          WHERE
            t.type_id = (SELECT id FROM tile_type_ids WHERE type = 'free')
            AND (
              (
                $rfc_param = 'any-cropper'
                AND rfc.resource_field_composition IN ('3339', '11115', '00018')
              )
              OR (
                $rfc_param <> 'any-cropper'
                AND rfc.resource_field_composition = $rfc_param
              )
            )
        ),
        slot_matches AS (
          SELECT
            c.id AS candidate_tile,
            rsb.slot_index,
            o.tile_id AS oasis_tile
          FROM candidates c
          JOIN tiles ot
            ON ot.x BETWEEN c.x - 3 AND c.x + 3
            AND ot.y BETWEEN c.y - 3 AND c.y + 3
          JOIN oasis o ON o.tile_id = ot.id
          JOIN resource_ids ri ON ri.id = o.resource_id
          JOIN requested_slot_bonuses rsb
            ON rsb.resource = ri.resource
            AND rsb.bonus = o.bonus
          GROUP BY c.id, rsb.slot_index, o.tile_id
          HAVING COUNT(DISTINCT rsb.request_id) = (
            SELECT required_bonus_count
            FROM slot_bonus_counts sbc
            WHERE sbc.slot_index = rsb.slot_index
          )
        ),
        valid_candidates AS (
          SELECT m1.candidate_tile
          FROM active_slot_count active_slots
          JOIN ranked_slots r1 ON r1.slot_rank = 1
          JOIN slot_matches m1 ON m1.slot_index = r1.slot_index
          WHERE active_slots.value = 1

          UNION

          SELECT m1.candidate_tile
          FROM active_slot_count active_slots
          JOIN ranked_slots r1 ON r1.slot_rank = 1
          JOIN ranked_slots r2 ON r2.slot_rank = 2
          JOIN slot_matches m1 ON m1.slot_index = r1.slot_index
          JOIN slot_matches m2
            ON m2.candidate_tile = m1.candidate_tile
            AND m2.slot_index = r2.slot_index
            AND m2.oasis_tile <> m1.oasis_tile
          WHERE active_slots.value = 2

          UNION

          SELECT m1.candidate_tile
          FROM active_slot_count active_slots
          JOIN ranked_slots r1 ON r1.slot_rank = 1
          JOIN ranked_slots r2 ON r2.slot_rank = 2
          JOIN ranked_slots r3 ON r3.slot_rank = 3
          JOIN slot_matches m1 ON m1.slot_index = r1.slot_index
          JOIN slot_matches m2
            ON m2.candidate_tile = m1.candidate_tile
            AND m2.slot_index = r2.slot_index
            AND m2.oasis_tile <> m1.oasis_tile
          JOIN slot_matches m3
            ON m3.candidate_tile = m1.candidate_tile
            AND m3.slot_index = r3.slot_index
            AND m3.oasis_tile <> m1.oasis_tile
            AND m3.oasis_tile <> m2.oasis_tile
          WHERE active_slots.value = 3
        ),
        candidate_oasis_matches AS (
          SELECT DISTINCT
            sm.candidate_tile,
            sm.oasis_tile
          FROM slot_matches sm
        ),
        candidate_oasis_owners AS (
          SELECT
            m.candidate_tile,
            m.oasis_tile,
            ov.id AS owner_village_id,
            ov.name AS owner_village_name,
            ov.slug AS owner_village_slug,
            vt.x AS owner_village_x,
            vt.y AS owner_village_y
          FROM candidate_oasis_matches m
          JOIN oasis oo ON oo.tile_id = m.oasis_tile
          LEFT JOIN villages ov ON ov.id = oo.village_id
          LEFT JOIN tiles vt ON vt.id = ov.tile_id
        )
      SELECT
        c.id AS tile_id,
        c.x AS coordinates_x,
        c.y AS coordinates_y,
        c.resource_field_composition AS resource_field_composition,
        (
          SELECT COALESCE(
            JSON_GROUP_ARRAY(
              JSON_OBJECT(
                'oasisTileId', matched.oasis_tile,
                'ownerVillage', JSON(
                  CASE
                    WHEN matched.owner_village_id IS NULL THEN 'null'
                    ELSE JSON_OBJECT(
                      'id', matched.owner_village_id,
                      'name', matched.owner_village_name,
                      'slug', matched.owner_village_slug,
                      'coordinates', JSON_OBJECT(
                        'x', matched.owner_village_x,
                        'y', matched.owner_village_y
                      )
                    )
                  END
                )
              )
            ),
            '[]'
          )
          FROM (
            SELECT
              oasis_tile,
              owner_village_id,
              owner_village_name,
              owner_village_slug,
              owner_village_x,
              owner_village_y
            FROM candidate_oasis_owners
            WHERE candidate_tile = c.id
            ORDER BY oasis_tile
          ) matched
        ) AS oasis_owners_json,
        ((c.x - sv.x) * (c.x - sv.x) + (c.y - sv.y) * (c.y - sv.y)) AS distance_squared
      FROM candidates c
      JOIN valid_candidates vc ON vc.candidate_tile = c.id
      CROSS JOIN src_village sv
      ORDER BY distance_squared ASC;
    `,bind:{$tile_x:n,$tile_y:r,$rfc_param:i,$requested_slot_bonuses:JSON.stringify(l)},schema:ey}).map(e=>{let t=Xv(e.oasis_owners_json);return Jv(e,t)})}),ay=Q(`/tiles/:tileId/oasis/:oasisTileId`,`post`,{summary:`Occupy oasis`,requestParams:{path:L({tileId:B(),oasisTileId:B()})}})(({database:e,path:{oasisTileId:t,tileId:n}})=>{e.transaction(e=>{let r=e.selectValue({sql:Su,bind:{$tile_id:n},schema:N()});mg(e,r,t,Date.now())})}),oy=Q(`/tiles/:tileId/oasis/:oasisTileId`,`delete`,{summary:`Abandon oasis`,requestParams:{path:L({tileId:B(),oasisTileId:B()})}})(({database:e,path:{oasisTileId:t,tileId:n}})=>{e.transaction(e=>{let r=Date.now(),i=e.selectValue({sql:Su,bind:{$tile_id:n},schema:N()});q(e,n,r),hg(e,t,i,r),e.exec({sql:`
  DELETE
  FROM
    effects
  WHERE
    source_id = (SELECT id FROM effect_source_ids WHERE source = 'oasis')
    AND tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
    AND source_specifier = $source_specifier;
`,bind:{$village_id:i,$source_specifier:t}}),e.exec({sql:`
  UPDATE oasis
  SET
    village_id = NULL
  WHERE
    tile_id = $oasis_tile_id
    AND village_id = $village_id;
`,bind:{$oasis_tile_id:t,$village_id:i}})})}),sy=L({resource:Ou,bonus:N()}).meta({id:`OasisBonusDto`}),cy=L({id:N(),coordinates:Y,bonuses:I(sy)}).meta({id:`OasisDto`}),ly=L({oasis:cy,village:L({id:N(),name:j(),slug:j(),coordinates:Y}).nullable(),player:L({id:N(),name:j(),slug:j()}).nullable()}).meta({id:`OccupiableOasisDto`}),uy=L({id:N(),tileId:N(),coordinates:Y,name:j(),slug:j(),resourceFieldComposition:Bp}),dy=uy.extend({population:N(),occupiedOasis:I(cy)}),fy=L({unitId:J,amount:N(),tileId:N(),sourceTileId:N(),sourceTileType:Hp.nullable()}),py=L({unitId:J,amount:N(),updatedAt:N()}),my=L({targetType:R([`village`,`oasis`]),village:uy,troops:I(fy)}),hy=e=>{let t={id:e.id,tileId:e.tile_id,coordinates:{x:e.coordinates_x,y:e.coordinates_y},name:e.name,slug:e.slug??`v-${e.id}`,resourceFieldComposition:e.resource_field_composition};return uy.parse(t)},gy=e=>{let t=I(cy).parse(JSON.parse(e.occupied_oasis_json)),n={...hy(e),population:e.population,occupiedOasis:t};return dy.parse(n)},_y=e=>{let t={unitId:e.unit_id,amount:e.amount,tileId:e.tile_id,sourceTileId:e.source_tile_id,sourceTileType:e.source_tile_type};return fy.parse(t)},vy=e=>py.parse({unitId:e.unit_id,amount:e.amount,updatedAt:e.updated_at}),yy=e=>{let t={targetType:e.target_type,village:uy.parse({id:e.village_id,tileId:e.tile_id,coordinates:{x:e.coordinates_x,y:e.coordinates_y},name:e.name,slug:e.slug??`v-${e.village_id}`,resourceFieldComposition:e.resource_field_composition}),troops:[_y({unit_id:e.unit_id,amount:e.amount,tile_id:e.tile_id,source_tile_id:e.source_tile_id,source_tile_type:e.source_tile_type})]};return my.parse(t)},by=e=>{let t=new Map;for(let n of e){let e=yy(n),r=t.get(e.village.tileId);if(r){r.troops.push(...e.troops);continue}t.set(e.village.tileId,e)}return[...t.values()]},xy=({unitId:e})=>ef(e).tribe===`nature`,Sy=Q(`/players/me`,{summary:`Get current player details`,response:zp})(({database:e})=>e.selectObject({sql:`
  SELECT
    p.id,
    p.name,
    p.slug,
    ti.tribe,
    fi.faction AS faction
  FROM
    players p
      JOIN tribe_ids ti ON p.tribe_id = ti.id
      LEFT JOIN faction_ids fi ON fi.id = p.faction_id
  WHERE
    p.id = $player_id;
`,bind:{$player_id:1},schema:zp})),Cy=Q(`/players/:playerId/villages`,{summary:`Get player village listing`,requestParams:{path:L({playerId:B()})},response:I(uy)})(({database:e,path:{playerId:t}})=>e.selectObjects({sql:`
  SELECT
    v.id,
    v.tile_id,
    t.x AS coordinates_x,
    t.y AS coordinates_y,
    v.name,
    v.slug,
    rfc.resource_field_composition AS resource_field_composition
  FROM
    villages v
      JOIN tiles t ON t.id = v.tile_id
      LEFT JOIN resource_field_composition_ids rfc ON t.resource_field_composition_id = rfc.id
  WHERE
    v.player_id = $player_id;
`,bind:{$player_id:t},schema:Wh}).map(hy)),wy=Q(`/players/:playerId/villages-with-population`,{summary:`Get player villages with population`,requestParams:{path:L({playerId:B()})},response:I(dy)})(({database:e,path:{playerId:t}})=>e.selectObjects({sql:`
  SELECT
    v.id,
    v.tile_id,
    t.x AS coordinates_x,
    t.y AS coordinates_y,
    v.name,
    v.slug,
    rfc.resource_field_composition AS resource_field_composition,
    COALESCE(SUM(CASE WHEN ei.effect = 'wheatProduction' THEN e.value * -1 ELSE 0 END), 0) AS population,
    COALESCE(
      (
        SELECT JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'id',
            oasis_data.tile_id,
            'coordinates',
            JSON_OBJECT(
              'x',
              oasis_data.coordinates_x,
              'y',
              oasis_data.coordinates_y
            ),
            'bonuses',
            JSON(oasis_data.bonuses_json)
          )
        )
        FROM (
          SELECT
            o.tile_id,
            ot.x AS coordinates_x,
            ot.y AS coordinates_y,
            JSON_GROUP_ARRAY(
              JSON_OBJECT(
                'resource',
                ri.resource,
                'bonus',
                o.bonus
              )
            ) AS bonuses_json
          FROM
            oasis o
              JOIN tiles ot ON ot.id = o.tile_id
              JOIN resource_ids ri ON ri.id = o.resource_id
          WHERE
            o.village_id = v.id
          GROUP BY
            o.tile_id,
            ot.x,
            ot.y
          ORDER BY
            o.tile_id
        ) oasis_data
      ),
      '[]'
    ) AS occupied_oasis_json
  FROM
    villages v
      JOIN tiles t ON t.id = v.tile_id
      LEFT JOIN resource_field_composition_ids rfc ON t.resource_field_composition_id = rfc.id
      LEFT JOIN effects e ON e.tile_id = v.tile_id
        AND e.type_id = (SELECT id FROM effect_type_ids WHERE type = 'base')
        AND e.scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
        AND e.source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
        AND e.source_specifier = 0
      LEFT JOIN effect_ids ei ON ei.id = e.effect_id
  WHERE
    v.player_id = $player_id
  GROUP BY
    v.id, v.tile_id, t.x, t.y, v.name, v.slug, rfc.resource_field_composition
  ORDER BY
    population DESC;
`,bind:{$player_id:t},schema:Gh}).map(gy)),Ty=Q(`/tiles/:tileId/stationed-troops`,{summary:`Get stationed troops by tile`,requestParams:{path:L({tileId:B()})},response:I(fy)})(({database:e,path:{tileId:t}})=>e.selectObjects({sql:`
  SELECT
    ui.unit AS unit_id,
    t.amount,
    t.tile_id,
    t.source_tile_id,
    source_tt.type AS source_tile_type
  FROM
    troops t
      LEFT JOIN tiles source_t ON source_t.id = t.source_tile_id
      LEFT JOIN tile_type_ids source_tt ON source_tt.id = source_t.type_id
      JOIN unit_ids ui ON ui.id = t.unit_id
  WHERE
    t.tile_id = $tile_id;
`,bind:{$tile_id:t},schema:Kh}).map(_y)),Ey=Q(`/villages/:villageId/wounded-troops`,{summary:`Get wounded troops by village`,requestParams:{path:L({villageId:B()})},response:I(py)})(({database:e,path:{villageId:t}})=>(Qp(e,t,Date.now()),e.selectObjects({sql:`
  SELECT
    ui.unit AS unit_id,
    wt.amount,
    wt.updated_at
  FROM
    wounded_troops wt
      JOIN unit_ids ui ON ui.id = wt.unit_id
  WHERE
    wt.village_id = $village_id
  ORDER BY
    ui.id;
`,bind:{$village_id:t},schema:qh}).map(vy))),Dy=Q(`/villages/:villageId`,`patch`,{summary:`Rename village`,requestParams:{path:L({villageId:B()})},requestBody:L({name:j()})})(({database:e,path:{villageId:t},body:{name:n}})=>{e.exec({sql:`
  UPDATE villages
  SET
    name = $name
  WHERE
    id = $village_id;
`,bind:{$name:n,$village_id:t}})}),Oy=Q(`/players/:playerSlug`,{summary:`Get player by slug`,requestParams:{path:L({playerSlug:zp.shape.slug})},response:zp})(({database:e,path:{playerSlug:t}})=>e.selectObject({sql:`
  SELECT
    p.id,
    p.name,
    p.slug,
    ti.tribe,
    fi.faction
  FROM
    players p
      JOIN tribe_ids ti ON p.tribe_id = ti.id
      JOIN villages v ON v.player_id = p.id
      LEFT JOIN faction_ids fi ON fi.id = p.faction_id
  WHERE
    p.slug = $player_slug
  LIMIT 1;
`,bind:{$player_slug:t},schema:zp})),ky=Q(`/tiles/:tileId/sent-reinforcements`,{summary:`Get sent reinforcements by tile`,requestParams:{path:L({tileId:B()})},response:I(my)})(({database:e,path:{tileId:t}})=>{let n=e.selectObjects({sql:`
  SELECT
    CASE
      WHEN v.id IS NOT NULL THEN v.id
      ELSE ov.id
    END AS village_id,
    CASE
      WHEN v.id IS NOT NULL THEN 'village'
      ELSE 'oasis'
    END AS target_type,
    tr.tile_id,
    t.x AS coordinates_x,
    t.y AS coordinates_y,
    CASE
      WHEN v.id IS NOT NULL THEN v.name
      ELSE 'Oasis'
    END AS name,
    CASE
      WHEN v.id IS NOT NULL THEN v.slug
      ELSE ov.slug
    END AS slug,
    CASE
      WHEN v.id IS NOT NULL THEN rfc.resource_field_composition
      ELSE owner_rfc.resource_field_composition
    END AS resource_field_composition,
    ui.unit AS unit_id,
    tr.amount,
    tr.source_tile_id,
    source_tt.type AS source_tile_type
  FROM
    troops tr
      JOIN tiles t
           ON t.id = tr.tile_id
      LEFT JOIN tiles source_t
           ON source_t.id = tr.source_tile_id
      LEFT JOIN tile_type_ids source_tt
           ON source_tt.id = source_t.type_id
      LEFT JOIN villages v
           ON v.tile_id = tr.tile_id
      LEFT JOIN villages ov
           ON ov.id = (
             SELECT MAX(o.village_id)
             FROM
               oasis o
             WHERE
               o.tile_id = tr.tile_id
           )
      LEFT JOIN resource_field_composition_ids rfc
                ON t.resource_field_composition_id = rfc.id
      LEFT JOIN tiles owner_t
                ON owner_t.id = ov.tile_id
      LEFT JOIN resource_field_composition_ids owner_rfc
                ON owner_t.resource_field_composition_id = owner_rfc.id
      JOIN unit_ids ui
           ON ui.id = tr.unit_id
  WHERE
    tr.source_tile_id = $tile_id
    AND tr.tile_id != $tile_id
    AND (v.id IS NOT NULL OR ov.id IS NOT NULL)
  ORDER BY
    name,
    tr.tile_id,
    ui.id;
`,bind:{$tile_id:t},schema:Jh});return by(n)}),Ay=Q(`/tiles/:tileId/relocate-reinforcements`,`post`,{summary:`Relocate reinforcements to the current village`,requestParams:{path:L({tileId:B()})},requestBody:tg})(({database:e,path:{tileId:t},body:{sourceTileId:n,troops:r}})=>{e.transaction(e=>{let{currentTileId:i,currentVillageId:a,sourceTileType:o,sourceVillageId:s}=e.selectObject({sql:ig,bind:{$source_tile_id:n,$current_tile_id:t},schema:Yh});if(o===`oasis`)throw Error(`Reinforcements from oases cannot be relocated`);if(s===null)throw Error(`Source village not found`);lg(e,r,{tileId:i,sourceTileId:n},{tileId:i,sourceTileId:i}),fg(r)&&Rh(e,s,a,Date.now())})}),jy=Q(`/tiles/:tileId/return-reinforcements`,`post`,{summary:`Return reinforcements to their source village`,requestParams:{path:L({tileId:B()})},requestBody:ng})(({database:e,path:{tileId:t},body:{sourceTileId:n,troops:r}})=>{e.transaction(e=>{let{currentTileId:i,sourceVillageId:a}=e.selectObject({sql:ig,bind:{$source_tile_id:n,$current_tile_id:t},schema:Yh}),o=r.filter(xy),s=r.filter(e=>!xy(e));if(o.length>0&&dg(e,o,{tileId:i,sourceTileId:n}),s.length===0)return;if(a===null)throw Error(`Source village not found`);let c=Date.now();ug(e,i,n,n,s,c),og(e,s,i,n,c)})}),My=Q(`/tiles/:tileId/return-sent-reinforcements`,`post`,{summary:`Return sent reinforcements to the current village`,requestParams:{path:L({tileId:B()})},requestBody:eg})(({database:e,path:{tileId:t},body:{stationedTileId:n,troops:r}})=>{e.transaction(e=>{let{currentTileId:i,stationedTileType:a,stationedVillageId:o}=e.selectObject({sql:ag,bind:{$stationed_tile_id:n,$current_tile_id:t},schema:Xh});if(o===null)throw Error(`Stationed tile not found`);let s=Date.now();ug(e,n,i,i,r,s),a!==`oasis`&&og(e,r,n,i,s)})}),Ny=Q(`/tiles/:tileId/relocate-sent-reinforcements`,`post`,{summary:`Relocate sent reinforcements to their stationed village`,requestParams:{path:L({tileId:B()})},requestBody:rg})(({database:e,path:{tileId:t},body:{stationedTileId:n,troops:r}})=>{e.transaction(e=>{let{currentTileId:i,currentVillageId:a,stationedTileType:o,stationedVillageId:s}=e.selectObject({sql:ag,bind:{$stationed_tile_id:n,$current_tile_id:t},schema:Xh});if(s===null)throw Error(`Stationed village not found`);if(o===`oasis`)throw Error(`Relocations cannot be sent to oases`);lg(e,r,{tileId:n,sourceTileId:i},{tileId:n,sourceTileId:n}),fg(r)&&Rh(e,a,s,Date.now())})});R([`light`,`dark`]).meta({id:`UIColorScheme`}),R([`day`,`night`]).meta({id:`TimeOfDay`}),R([`default`]).meta({id:`SkinVariant`});const Py=L({isAccessibilityModeEnabled:F(),isReducedMotionModeEnabled:F(),shouldShowBuildingNames:F(),isAutomaticNavigationAfterBuildingLevelChangeEnabled:F(),isAutomaticNavigationAfterUnitResearchEnabled:F(),isAutomaticNavigationAfterUnitUpgradeEnabled:F(),isAutomaticNavigationAfterSendUnitsEnabled:F(),isDeveloperToolsConsoleEnabled:F(),shouldShowNotificationsOnBuildingUpgradeCompletion:F(),shouldShowNotificationsOnUnitUpgradeCompletion:F(),shouldShowNotificationsOnAcademyResearchCompletion:F()}).meta({id:`Preferences`}),Fy=e=>`
  UPDATE preferences
  SET
    ${e} = $value;
`,Iy=e=>{let t={isAccessibilityModeEnabled:!!e.is_accessibility_mode_enabled,isReducedMotionModeEnabled:!!e.is_reduced_motion_mode_enabled,shouldShowBuildingNames:!!e.should_show_building_names,isAutomaticNavigationAfterBuildingLevelChangeEnabled:!!e.is_automatic_navigation_after_building_level_change_enabled,isAutomaticNavigationAfterUnitResearchEnabled:!!e.is_automatic_navigation_after_unit_research_enabled,isAutomaticNavigationAfterUnitUpgradeEnabled:!!e.is_automatic_navigation_after_unit_upgrade_enabled,isAutomaticNavigationAfterSendUnitsEnabled:!!e.is_automatic_navigation_after_send_units_enabled,isDeveloperToolsConsoleEnabled:!!e.is_developer_tools_console_enabled,shouldShowNotificationsOnBuildingUpgradeCompletion:!!e.should_show_notifications_on_building_upgrade_completion,shouldShowNotificationsOnUnitUpgradeCompletion:!!e.should_show_notifications_on_unit_upgrade_completion,shouldShowNotificationsOnAcademyResearchCompletion:!!e.should_show_notifications_on_academy_research_completion};return Py.parse(t)},Ly=L({is_accessibility_mode_enabled:N(),is_reduced_motion_mode_enabled:N(),should_show_building_names:N(),is_automatic_navigation_after_building_level_change_enabled:N(),is_automatic_navigation_after_unit_research_enabled:N(),is_automatic_navigation_after_unit_upgrade_enabled:N(),is_automatic_navigation_after_send_units_enabled:N(),is_developer_tools_console_enabled:N(),should_show_notifications_on_building_upgrade_completion:N(),should_show_notifications_on_unit_upgrade_completion:N(),should_show_notifications_on_academy_research_completion:N()}).meta({id:`GetPreferencesDbRow`}),Ry=Q(`/players/:playerId/preferences`,{summary:`Get player preferences`,requestParams:{path:L({playerId:B()})},response:Py})(({database:e})=>{let t=e.selectObject({sql:`
  SELECT
    is_accessibility_mode_enabled,
    is_reduced_motion_mode_enabled,
    should_show_building_names,
    is_automatic_navigation_after_building_level_change_enabled,
    is_automatic_navigation_after_unit_research_enabled,
    is_automatic_navigation_after_unit_upgrade_enabled,
    is_automatic_navigation_after_send_units_enabled,
    is_developer_tools_console_enabled,
    should_show_notifications_on_building_upgrade_completion,
    should_show_notifications_on_unit_upgrade_completion,
    should_show_notifications_on_academy_research_completion
  FROM
    preferences;
`,schema:Ly});return Iy(t)}),zy=Q(`/players/:playerId/preferences/:preferenceName`,`patch`,{summary:`Update player preference`,requestParams:{path:L({playerId:B(),preferenceName:j()})},requestBody:L({value:F()})})(({database:e,path:{preferenceName:t},body:{value:n}})=>{let r=Lg(t);e.exec({sql:Fy(r),bind:{$value:n}})}),By=new Map([[`WOODCUTTER`,100],[`CLAY_PIT`,150],[`IRON_MINE`,120],[`WHEAT_FIELD`,80],[`MAIN_BUILDING`,150],[`WAREHOUSE`,100],[`GRANARY`,100],[`BARRACKS`,150],[`STABLE`,180],[`CRANNY`,90],[`MARKETPLACE`,110],[`SMITHY`,150],[`ACADEMY`,140],[`HEROS_MANSION`,150],[`RALLY_POINT`,120],[`SAWMILL`,200],[`BRICKYARD`,200],[`IRON_FOUNDRY`,200],[`GRAIN_MILL`,200],[`BAKERY`,200],[`GATHERERS_HUT`,120],[`HUNTERS_LODGE`,150],[`BAKERY`,200],[`ROMAN_WALL`,150],[`TEUTONIC_WALL`,150],[`HUN_WALL`,150],[`EGYPTIAN_WALL`,150],[`GAUL_WALL`,150],[`SPARTAN_WALL`,150],[`NATAR_WALL`,150],[`NATURE_WALL`,150]]),Vy=e=>{if(e.startsWith(`queuedTroopCountById`)){let t=e.split(`-`).at(2);return[{type:`resources`,amount:Number.parseInt(t,10)*100}]}if(e.startsWith(`queuedTroopCount`)){let t=e.split(`-`).at(1);return[{type:`resources`,amount:Number.parseInt(t,10)*10}]}if(e.startsWith(`adventureCount`)){let t=e.split(`-`).at(1);return[{type:`hero-exp`,amount:Number.parseInt(t,10)*10}]}if(e.startsWith(`killCount`)){let t=e.split(`-`).at(1);return[{type:`resources`,amount:Number.parseInt(t,10)*10}]}if(e.startsWith(`unitKillCount`)){let t=e.split(`-`).at(2);return[{type:`resources`,amount:Number.parseInt(t,10)*100}]}if(e.startsWith(`captureAnimalCountById`)){let t=e.split(`-`).at(2);return[{type:`hero-exp`,amount:Number.parseInt(t,10)*10}]}if(e.startsWith(`captureAnimalKindCount`)){let t=e.split(`-`).at(1);return[{type:`hero-exp`,amount:Number.parseInt(t,10)*10}]}if(e.startsWith(`gatheredResourceCount`)){let t=e.split(`-`).at(1);return[{type:`hero-exp`,amount:Math.max(1,Math.floor(Number.parseInt(t,10)/100))}]}let[t,n,r]=e.split(`-`),i=Number.parseInt(r,10),a=By.get(n);if(!a)throw Error(`Base resource reward amount is missing for building "${n}" quests.`);let o=i-1,s=Math.round(a*o)+a/2,c=Math.round(a*o**1.3)+a/2;return[{type:`resources`,amount:t===`oneOf`?s:c}]},Hy=j(),Uy=L({id:j(),scope:R([`village`,`global`]),collectedAt:N().nullable(),completedAt:N().nullable()}),Wy=Kc(`scope`,[Uy.extend({id:j(),scope:z(`village`),villageId:N()}).meta({id:`VillageQuest`}),Uy.extend({id:j(),scope:z(`global`)}).meta({id:`GlobalQuest`})]).meta({id:`Quest`}),Gy=e=>e.type===`resources`,Ky=e=>e.type===`hero-exp`,qy=e=>Wy.parse({id:e.quest_id,scope:e.scope,collectedAt:e.collected_at,completedAt:e.completed_at,...e.village_id!==null&&{villageId:e.village_id}}),Jy=L({quest_id:Hy,scope:R([`village`,`global`]),collected_at:N().nullable(),completed_at:N().nullable(),village_id:N().nullable()}).meta({id:`GetQuestsRow`}),Yy=Q(`/villages/:villageId/quests`,{summary:`Get village quests`,requestParams:{path:L({villageId:B()})},response:I(Wy)})(({database:e,path:{villageId:t}})=>e.selectObjects({sql:`
  SELECT quest_id, scope, collected_at, completed_at, village_id
  FROM
    (
      SELECT quest_id, scope, collected_at, completed_at, village_id
      FROM
        quests
      WHERE
        village_id = $village_id

      UNION ALL

      SELECT quest_id, scope, collected_at, completed_at, village_id
      FROM
        quests
      WHERE
        village_id IS NULL
      ) AS q;
`,bind:{$village_id:t},schema:Jy}).map(qy)),Xy=Q(`/villages/:villageId/quests/collectables/count`,{summary:`Get collectable quests count`,requestParams:{path:L({villageId:B()})},response:L({collectableQuestCount:N()})})(({database:e,path:{villageId:t}})=>({collectableQuestCount:e.selectValue({sql:`
  SELECT COUNT(*) AS COUNT
  FROM
    quests
  WHERE
    completed_at IS NOT NULL
    AND collected_at IS NULL
    AND (
      village_id = $village_id
      OR village_id IS NULL
    );
`,bind:{$village_id:t},schema:N()})})),Zy=Q(`/villages/:villageId/quests/:questId/collect`,`patch`,{summary:`Collect quest reward`,requestParams:{path:L({villageId:B(),questId:j()})}})(({database:e,path:{questId:t,villageId:n}})=>{e.exec({sql:`
  UPDATE quests
  SET
    collected_at = $collected_at
  WHERE
    id = (
      SELECT id
      FROM
        quests
      WHERE
        quest_id = $quest_id
        AND (village_id = $village_id OR village_id IS NULL)
      ORDER BY (village_id = $village_id) DESC, (village_id IS NULL) DESC
      LIMIT 1
    );
`,bind:{$collected_at:Date.now(),$quest_id:t,$village_id:n}});let r=Vy(t);for(let t of r){if(Gy(t)){let{amount:r}=t;Ju(e,K(e,n),Date.now(),[r,r,r,r]);continue}Ky(t)&&Ph(e,t.amount)}}),Qy=L({points:P(),supplyBefore:P(),supplyLost:P(),resourcesLost:P()}),$y=L({unitId:J,amountBefore:P(),amountAfter:P(),amountHospitalized:P(),amountImprisoned:P()}),eb=L({id:P(),tribe:W,units:I($y)}),tb=L({player:L({id:P().nullable(),name:j(),slug:j().optional()}),village:L({id:P().nullable(),tileId:P(),name:j(),coordinates:Y}),troops:eb}),nb=tb.extend({reinforcements:I(tb)}),rb=L({loot:Du,totalCarryCapacity:P(),canAttackerSeeFullReport:F()}),ib=L({buildingId:H,levelBefore:P().nonnegative(),levelAfter:P().nonnegative()});L({isRaid:F(),originName:j(),targetName:j(),targetCoordinates:Y});const ab=L({id:P(),attacker:tb,defender:nb,outcome:rb,damagedBuildings:I(ib),statistics:L({attacker:Qy,defender:Qy})}),ob=R([`battle`,`adventure`,`trade`,`movement`,`huntingParty`,`gatheringExpedition`,`scouting`]),sb=R([...R([`attackerNoLoss`,`attackerSomeLoss`,`attackerFullLoss`,`defenderNoLoss`,`defenderSomeLoss`,`defenderFullLoss`]).options,`scoutAttackerNoLoss`,`scoutAttackerSomeLoss`,`scoutAttackerFullLoss`,`scoutDefenderNoLoss`,`scoutDefenderSomeLoss`,`scoutDefenderFullLoss`,`outgoingMerchantsArrived`,`incomingMerchantsArrived`,`heroAdventure`,`troopMovement`,`huntingParty`,`gatheringExpedition`]),cb=R([`read`,`archived`]),lb=R([`attacker`,`defender`]),ub=L({id:P(),villageId:P(),timestamp:P(),type:ob,outcome:sb,tags:I(cb)}),db=L({originName:j(),originCoordinates:Y,targetName:j(),targetCoordinates:Y,movementType:R([`raid`,`attack`])}),fb=ub.extend({type:z(`battle`),summary:db,battle:ab}),pb=ub.extend({type:z(`adventure`),summary:L({originPlayerName:j(),originPlayerSlug:j(),originVillageName:j(),originCoordinates:Y,tribe:W}),adventureId:P(),itemId:P().nullable(),itemAmount:P().positive().nullable(),healthBefore:N(),healthAfter:N()}),mb=ub.extend({type:z(`trade`),summary:L({originPlayerName:j(),originPlayerSlug:j(),originName:j(),originCoordinates:Y,targetPlayerName:j(),targetPlayerSlug:j(),targetName:j(),targetCoordinates:Y}),trade:L({id:P(),originTileId:P(),targetTileId:P(),resources:Du})}),hb=L({originPlayerName:j(),originPlayerSlug:j(),originName:j(),originCoordinates:Y,targetPlayerName:j().nullable(),targetPlayerSlug:j().nullable(),targetName:j(),targetCoordinates:Y,movementType:R([`reinforcement`,`relocation`])}),gb=L({unitId:J,amount:P()}),_b=ub.extend({type:z(`movement`),summary:hb,movement:L({id:P(),tribe:W,originTileId:P(),targetTileId:P(),movementType:R([`reinforcement`,`relocation`]),units:I(gb)})}),vb=L({villageName:j(),villageCoordinates:Y}),yb=L({unitId:J,amount:P().positive()}),bb=ub.extend({type:z(`huntingParty`),summary:vb,tribe:z(`nature`),units:I(yb)}),xb=ub.extend({type:z(`gatheringExpedition`),summary:vb,tribe:W,units:I(yb),loot:Du}),Sb=L({originPlayerName:j(),originPlayerSlug:j(),originName:j(),originCoordinates:Y,targetPlayerName:j(),targetPlayerSlug:j(),targetName:j(),targetCoordinates:Y}),Cb=L({tribe:W,units:I(L({unitId:J,amount:P()}))}),wb=L({tribe:W,units:I(L({unitId:J,amountBefore:P(),amountAfter:P()}))}),Tb=Cb.extend({player:L({name:j(),slug:j()}),village:L({name:j(),coordinates:Y})}),Eb=ub.extend({type:z(`scouting`),summary:Sb,scouting:L({id:P(),perspective:lb,successful:F(),target:R([`resources`,`defensiveStructures`]),attacker:wb,defender:Cb.extend({reinforcements:I(Tb)}),resources:Du.nullable(),defensiveStructures:I(L({buildingId:H,level:P().nonnegative()}))})}),Db=Kc(`type`,[fb,pb,mb,_b,bb,xb,Eb]).meta({id:`Report`}),Ob=R([...ob.options,`noLoss`,`ownTrades`]),kb=Kc(`type`,[fb.omit({battle:!0}),pb.omit({adventureId:!0,itemId:!0,itemAmount:!0,healthBefore:!0,healthAfter:!0}),mb.omit({trade:!0}),_b.omit({movement:!0}),bb.omit({tribe:!0,units:!0}),xb.omit({tribe:!0,units:!0,loot:!0}),Eb.omit({scouting:!0})]),Ab=`
  WITH report AS MATERIALIZED (
    SELECT
      r.id, r.village_id, r.timestamp,
      rty.report_type AS type,
      roi.report_outcome AS outcome,
      COALESCE((
        SELECT json_group_array(rti.tag)
        FROM report_tags rt
        JOIN report_tag_ids rti ON rti.id = rt.report_tag_id
        WHERE rt.report_id = r.id
      ), '[]') AS tags_json
    FROM reports r
    JOIN report_type_ids rty ON rty.id = r.type_id
    JOIN report_outcome_ids roi ON roi.id = r.report_outcome_id
    WHERE r.id = $report_id
  )
`,jb=`
  r.id, r.village_id, r.timestamp,
  r.type, r.outcome, r.tags_json
`,Mb=`
  ${Ab}
  SELECT
    ${jb},
    b.is_raid AS battle_is_raid,
    origin_v.name AS battle_origin_name,
    origin_t.x AS battle_origin_x,
    origin_t.y AS battle_origin_y,
    CASE
      WHEN target_v.id IS NOT NULL THEN target_v.name
      WHEN target_o.id IS NOT NULL AND target_o.village_id IS NOT NULL THEN 'Occupied oasis'
      WHEN target_o.id IS NOT NULL THEN 'Unoccupied oasis'
      ELSE ''
    END AS battle_target_name,
    target_t.x AS battle_target_x,
    target_t.y AS battle_target_y,
    b.id AS battle_id,
    b.origin_tile_id, b.target_tile_id,
    b.loot_wood, b.loot_clay, b.loot_iron, b.loot_wheat,
    b.can_attacker_see_full_report,
    b.attacker_points, b.defender_points,
    bp.id AS participant_id,
    bp.player_id AS participant_player_id,
    bp.tile_id AS participant_tile_id,
    CASE WHEN bp.tile_id = b.origin_tile_id THEN 'attacker' ELSE 'defender' END AS participant_role,
    COALESCE(participant_tribe.tribe, 'nature') AS participant_tribe,
    CASE WHEN bp.tile_id NOT IN (b.origin_tile_id, b.target_tile_id) THEN 1 ELSE 0 END AS participant_is_reinforcement,
    COALESCE(participant_p.name, oasis_p.name, 'Nature') AS participant_player_name,
    COALESCE(participant_p.slug, oasis_p.slug) AS participant_player_slug,
    participant_v.id AS participant_village_id,
    CASE
      WHEN participant_v.id IS NOT NULL THEN participant_v.name
      WHEN participant_o.village_id IS NOT NULL THEN 'Occupied oasis'
      ELSE 'Unoccupied oasis'
    END AS participant_location_name,
    participant_t.x AS participant_x,
    participant_t.y AS participant_y,
    participant_ui.unit AS participant_unit_id,
    bru.amount_before AS participant_amount_before,
    bru.amount_after AS participant_amount_after,
    bru.amount_hospitalized AS participant_amount_hospitalized,
    bru.amount_imprisoned AS participant_amount_imprisoned
  FROM report r
  JOIN battle_reports b ON b.report_id = r.id
  JOIN tiles origin_t ON origin_t.id = b.origin_tile_id
  LEFT JOIN villages origin_v ON origin_v.tile_id = origin_t.id
  JOIN tiles target_t ON target_t.id = b.target_tile_id
  LEFT JOIN villages target_v ON target_v.tile_id = target_t.id
  LEFT JOIN oasis target_o ON target_o.id = (
    SELECT MIN(id) FROM oasis WHERE tile_id = target_t.id
  )
  JOIN battle_report_participants bp ON bp.battle_id = b.id
  JOIN tiles participant_t ON participant_t.id = bp.tile_id
  LEFT JOIN villages participant_v ON participant_v.tile_id = participant_t.id
  LEFT JOIN players participant_p ON participant_p.id = participant_v.player_id
  LEFT JOIN tribe_ids participant_tribe ON participant_tribe.id = participant_p.tribe_id
  LEFT JOIN oasis participant_o ON participant_o.id = (
    SELECT MIN(id) FROM oasis WHERE tile_id = participant_t.id
  )
  LEFT JOIN villages oasis_v ON oasis_v.id = participant_o.village_id
  LEFT JOIN players oasis_p ON oasis_p.id = oasis_v.player_id
  LEFT JOIN battle_report_units bru ON bru.battle_participant_id = bp.id
  LEFT JOIN unit_ids participant_ui ON participant_ui.id = bru.unit_id
  ;
`,Nb=`
  ${Ab}
  SELECT
    ${jb},
    ar.adventure_id, ar.item_id, ar.item_amount, ar.health_before, ar.health_after,
    p.name AS adventure_origin_player_name,
    p.slug AS adventure_origin_player_slug,
    v.name AS adventure_origin_village_name,
    t.x AS adventure_origin_x,
    t.y AS adventure_origin_y,
    ti.tribe AS adventure_origin_tribe
  FROM report r
  JOIN hero_adventure_reports ar ON ar.report_id = r.id
  JOIN villages v ON v.id = r.village_id
  JOIN players p ON p.id = v.player_id
  JOIN tiles t ON t.id = v.tile_id
  JOIN tribe_ids ti ON ti.id = p.tribe_id
  ;
`,Pb=`
  ${Ab}
  SELECT
    ${jb},
    mr.id AS movement_id, mr.movement_type,
    origin_tribe.tribe AS movement_tribe,
    mr.origin_tile_id AS movement_origin_tile_id,
    mr.target_tile_id AS movement_target_tile_id,
    origin_p.name AS movement_origin_player_name,
    origin_p.slug AS movement_origin_player_slug,
    origin_v.name AS movement_origin_name,
    origin_t.x AS movement_origin_x, origin_t.y AS movement_origin_y,
    target_p.name AS movement_target_player_name,
    target_p.slug AS movement_target_player_slug,
    COALESCE(target_v.name, CASE WHEN target_o.id IS NOT NULL THEN 'Oasis' END) AS movement_target_name,
    target_t.x AS movement_target_x, target_t.y AS movement_target_y
  FROM report r
  JOIN movement_reports mr ON mr.report_id = r.id
  JOIN tiles origin_t ON origin_t.id = mr.origin_tile_id
  JOIN villages origin_v ON origin_v.tile_id = origin_t.id
  JOIN players origin_p ON origin_p.id = origin_v.player_id
  JOIN tribe_ids origin_tribe ON origin_tribe.id = origin_p.tribe_id
  JOIN tiles target_t ON target_t.id = mr.target_tile_id
  LEFT JOIN villages target_v ON target_v.tile_id = target_t.id
  LEFT JOIN players target_p ON target_p.id = target_v.player_id
  LEFT JOIN oasis target_o ON target_o.id = (
    SELECT MIN(id) FROM oasis WHERE tile_id = target_t.id
  );
`,Fb=`
  ${Ab}
  SELECT
    ${jb},
    tr.id AS trade_id,
    tr.origin_tile_id AS trade_origin_tile_id,
    tr.target_tile_id AS trade_target_tile_id,
    origin_p.name AS trade_origin_player_name,
    origin_p.slug AS trade_origin_player_slug,
    origin_v.name AS trade_origin_name,
    origin_t.x AS trade_origin_x, origin_t.y AS trade_origin_y,
    target_p.name AS trade_target_player_name,
    target_p.slug AS trade_target_player_slug,
    target_v.name AS trade_target_name,
    target_t.x AS trade_target_x, target_t.y AS trade_target_y,
    tr.wood AS trade_wood, tr.clay AS trade_clay,
    tr.iron AS trade_iron, tr.wheat AS trade_wheat
  FROM report r
  JOIN trade_reports tr ON tr.report_id = r.id
  JOIN tiles origin_t ON origin_t.id = tr.origin_tile_id
  JOIN villages origin_v ON origin_v.tile_id = origin_t.id
  JOIN players origin_p ON origin_p.id = origin_v.player_id
  JOIN tiles target_t ON target_t.id = tr.target_tile_id
  JOIN villages target_v ON target_v.tile_id = target_t.id
  JOIN players target_p ON target_p.id = target_v.player_id
  ;
`,Ib=`
  ${Ab}
  SELECT
    ${jb},
    hpr.id AS expedition_id,
    'nature' AS expedition_tribe,
    v.name AS expedition_village_name,
    t.x AS expedition_village_x,
    t.y AS expedition_village_y,
    NULL AS loot_wood, NULL AS loot_clay, NULL AS loot_iron, NULL AS loot_wheat
  FROM report r
  JOIN hunting_party_reports hpr ON hpr.report_id = r.id
  JOIN tiles t ON t.id = hpr.village_tile_id
  JOIN villages v ON v.tile_id = t.id;
`,Lb=`
  ${Ab}
  SELECT
    ${jb},
    ger.id AS expedition_id,
    ti.tribe AS expedition_tribe,
    v.name AS expedition_village_name,
    t.x AS expedition_village_x,
    t.y AS expedition_village_y,
    ger.loot_wood, ger.loot_clay, ger.loot_iron, ger.loot_wheat
  FROM report r
  JOIN gathering_expedition_reports ger ON ger.report_id = r.id
  JOIN tribe_ids ti ON ti.id = ger.tribe_id
  JOIN tiles t ON t.id = ger.village_tile_id
  JOIN villages v ON v.tile_id = t.id;
`,Rb=`
  ${Ab}
  SELECT ${jb}, sr.id AS scouting_id, sr.perspective,
    sr.successful, sr.scouting_target, sr.wood, sr.clay, sr.iron, sr.wheat,
    origin_p.name AS origin_player_name, origin_p.slug AS origin_player_slug,
    origin_v.name AS origin_name, origin_t.x AS origin_x, origin_t.y AS origin_y,
    target_p.name AS target_player_name, target_p.slug AS target_player_slug,
    target_v.name AS target_name, target_t.x AS target_x, target_t.y AS target_y,
    origin_tribe.tribe AS attacker_tribe, target_tribe.tribe AS defender_tribe
  FROM report r JOIN scouting_reports sr ON sr.report_id = r.id
  JOIN tiles origin_t ON origin_t.id = sr.origin_tile_id
  JOIN villages origin_v ON origin_v.tile_id = origin_t.id
  JOIN players origin_p ON origin_p.id = origin_v.player_id
  JOIN tribe_ids origin_tribe ON origin_tribe.id = origin_p.tribe_id
  JOIN tiles target_t ON target_t.id = sr.target_tile_id
  JOIN villages target_v ON target_v.tile_id = target_t.id
  JOIN players target_p ON target_p.id = target_v.player_id
  JOIN tribe_ids target_tribe ON target_tribe.id = target_p.tribe_id;
`,zb=e=>({originName:e.battle_origin_name,originCoordinates:{x:e.battle_origin_x,y:e.battle_origin_y},targetName:e.battle_target_name,targetCoordinates:{x:e.battle_target_x,y:e.battle_target_y},movementType:e.battle_is_raid?`raid`:`attack`}),Bb=e=>({originPlayerName:e.adventure_origin_player_name,originPlayerSlug:e.adventure_origin_player_slug,originVillageName:e.adventure_origin_village_name,originCoordinates:{x:e.adventure_origin_x,y:e.adventure_origin_y},tribe:e.adventure_origin_tribe}),Vb=e=>({originPlayerName:e.movement_origin_player_name,originPlayerSlug:e.movement_origin_player_slug,originName:e.movement_origin_name,originCoordinates:{x:e.movement_origin_x,y:e.movement_origin_y},targetPlayerName:e.movement_target_player_name,targetPlayerSlug:e.movement_target_player_slug,targetName:e.movement_target_name,targetCoordinates:{x:e.movement_target_x,y:e.movement_target_y},movementType:e.movement_type}),Hb=e=>({originPlayerName:e.trade_origin_player_name,originPlayerSlug:e.trade_origin_player_slug,originName:e.trade_origin_name,originCoordinates:{x:e.trade_origin_x,y:e.trade_origin_y},targetPlayerName:e.trade_target_player_name,targetPlayerSlug:e.trade_target_player_slug,targetName:e.trade_target_name,targetCoordinates:{x:e.trade_target_x,y:e.trade_target_y}}),Ub=e=>({id:e.id,villageId:e.village_id,timestamp:e.timestamp,outcome:e.outcome,tags:JSON.parse(e.tags_json)}),Wb=e=>kb.parse({id:e.id,villageId:e.village_id,timestamp:e.timestamp,type:e.type,outcome:e.outcome,summary:JSON.parse(e.summary_json),tags:JSON.parse(e.tags_json)}),Gb=(e,t)=>{let n=e[0],r=new Map,i=[],a={points:n.attacker_points,supplyBefore:0,supplyLost:0,resourcesLost:0},o={points:n.defender_points,supplyBefore:0,supplyLost:0,resourcesLost:0},s,c,l=0;for(let t of e){let e=r.get(t.participant_id);if(e||(e={player:{id:t.participant_player_id,name:t.participant_player_name,slug:t.participant_player_slug??void 0},village:{id:t.participant_village_id,tileId:t.participant_tile_id,name:t.participant_location_name,coordinates:{x:t.participant_x,y:t.participant_y}},troops:{id:t.participant_id,tribe:t.participant_tribe,units:[]}},r.set(t.participant_id,e),t.participant_role===`attacker`?s=e:t.participant_is_reinforcement?i.push(e):c=e),t.participant_unit_id&&t.participant_amount_before!=null&&t.participant_amount_after!=null){e.troops.units.push({unitId:t.participant_unit_id,amountBefore:t.participant_amount_before,amountAfter:t.participant_amount_after,amountHospitalized:t.participant_amount_hospitalized??0,amountImprisoned:t.participant_amount_imprisoned??0});let n=$d.get(t.participant_unit_id);if(n){let e=t.participant_amount_before-t.participant_amount_after,r=t.participant_role===`attacker`?a:o,i=0;for(let e of n.baseRecruitmentCost)i+=e;r.supplyBefore+=t.participant_amount_before,r.supplyLost+=e,r.resourcesLost+=i*e,t.participant_role===`attacker`&&(l+=n.unitCarryCapacity*t.participant_amount_after)}}}if(!s||!c)throw Error(`Battle participants missing for report ${n.id}`);let u={id:n.battle_id,attacker:s,defender:{...c,reinforcements:i},outcome:{loot:[n.loot_wood,n.loot_clay,n.loot_iron,n.loot_wheat],totalCarryCapacity:l,canAttackerSeeFullReport:!!n.can_attacker_see_full_report},damagedBuildings:t,statistics:{attacker:a,defender:o}};return Db.parse({...Ub(n),type:`battle`,summary:zb(n),battle:u})},Kb=e=>Db.parse({...Ub(e),type:`adventure`,summary:Bb(e),adventureId:e.adventure_id,itemId:e.item_id,itemAmount:e.item_amount,healthBefore:e.health_before,healthAfter:e.health_after}),qb=(e,t)=>Db.parse({...Ub(e),type:`movement`,summary:Vb(e),movement:{id:e.movement_id,tribe:e.movement_tribe,originTileId:e.movement_origin_tile_id,targetTileId:e.movement_target_tile_id,movementType:e.movement_type,units:t}}),Jb=e=>Db.parse({...Ub(e),type:`trade`,summary:Hb(e),trade:{id:e.trade_id,originTileId:e.trade_origin_tile_id,targetTileId:e.trade_target_tile_id,resources:[e.trade_wood,e.trade_clay,e.trade_iron,e.trade_wheat]}}),Yb=e=>({villageName:e.expedition_village_name,villageCoordinates:{x:e.expedition_village_x,y:e.expedition_village_y}}),Xb=(e,t)=>Db.parse({...Ub(e),type:`huntingParty`,summary:Yb(e),tribe:e.expedition_tribe,units:t}),Zb=(e,t)=>Db.parse({...Ub(e),type:`gatheringExpedition`,summary:Yb(e),tribe:e.expedition_tribe,units:t,loot:[e.loot_wood,e.loot_clay,e.loot_iron,e.loot_wheat]}),Qb=(e,t,n,r)=>{let i=!e.successful,a=n.filter(({role:e})=>e===`reinforcement`),o=[...new Set(a.map(({tileId:e})=>e))].map(e=>{let t=a.filter(t=>t.tileId===e),n=t[0];return{tribe:n.tribe,player:{name:n.playerName,slug:n.playerSlug},village:{name:n.villageName,coordinates:{x:n.x,y:n.y}},units:t.map(({unitId:e,amount:t})=>({unitId:e,amount:t}))}});return Db.parse({...Ub(e),type:`scouting`,summary:{originPlayerName:e.origin_player_name,originPlayerSlug:e.origin_player_slug,originName:e.origin_name,originCoordinates:{x:e.origin_x,y:e.origin_y},targetPlayerName:e.target_player_name,targetPlayerSlug:e.target_player_slug,targetName:e.target_name,targetCoordinates:{x:e.target_x,y:e.target_y}},scouting:{id:e.scouting_id,perspective:e.perspective,successful:!!e.successful,target:e.scouting_target,attacker:{tribe:e.attacker_tribe,units:t},defender:{tribe:e.defender_tribe,units:n.filter(({role:e})=>e===`defender`).map(({unitId:e,amount:t})=>({unitId:e,amount:t})),reinforcements:i?[]:o},resources:i||e.wood==null?null:[e.wood,e.clay,e.iron,e.wheat],defensiveStructures:i?[]:r}})},$b=L({id:P(),village_id:P(),timestamp:P(),type:ob,outcome:sb,summary_json:j(),tags_json:j()}),ex=L({type:ob}),tx=L({battle_is_raid:P().nullable(),battle_origin_name:j().nullable(),battle_origin_x:P().nullable(),battle_origin_y:P().nullable(),battle_target_name:j().nullable(),battle_target_x:P().nullable(),battle_target_y:P().nullable(),adventure_id:P().nullable(),item_id:P().nullable(),item_amount:P().nullable(),health_before:N().nullable(),health_after:N().nullable(),adventure_origin_player_name:j().nullable(),adventure_origin_player_slug:j().nullable(),adventure_origin_village_name:j().nullable(),adventure_origin_x:P().nullable(),adventure_origin_y:P().nullable(),adventure_origin_tribe:W.nullable(),movement_id:P().nullable(),movement_type:R([`reinforcement`,`relocation`]).nullable(),movement_tribe:W.nullable(),movement_origin_tile_id:P().nullable(),movement_target_tile_id:P().nullable(),movement_origin_player_name:j().nullable(),movement_origin_player_slug:j().nullable(),movement_origin_name:j().nullable(),movement_origin_x:P().nullable(),movement_origin_y:P().nullable(),movement_target_player_name:j().nullable(),movement_target_player_slug:j().nullable(),movement_target_name:j().nullable(),movement_target_x:P().nullable(),movement_target_y:P().nullable(),trade_id:P().nullable(),trade_origin_tile_id:P().nullable(),trade_target_tile_id:P().nullable(),trade_origin_player_name:j().nullable(),trade_origin_player_slug:j().nullable(),trade_origin_name:j().nullable(),trade_origin_x:P().nullable(),trade_origin_y:P().nullable(),trade_target_player_name:j().nullable(),trade_target_player_slug:j().nullable(),trade_target_name:j().nullable(),trade_target_x:P().nullable(),trade_target_y:P().nullable(),trade_wood:P().nullable(),trade_clay:P().nullable(),trade_iron:P().nullable(),trade_wheat:P().nullable()}).partial().shape,nx=L({id:P(),village_id:P(),timestamp:P(),outcome:sb,tags_json:j(),...tx}),rx=nx.extend({type:z(`battle`),battle_is_raid:P(),battle_origin_name:j(),battle_origin_x:P(),battle_origin_y:P(),battle_target_name:j(),battle_target_x:P(),battle_target_y:P(),battle_id:P(),origin_tile_id:P(),target_tile_id:P(),loot_wood:P(),loot_clay:P(),loot_iron:P(),loot_wheat:P(),can_attacker_see_full_report:P(),attacker_points:P(),defender_points:P(),participant_id:P(),participant_player_id:P().nullable(),participant_tile_id:P(),participant_role:lb,participant_tribe:W,participant_is_reinforcement:P(),participant_player_name:j(),participant_player_slug:j().nullable(),participant_village_id:P().nullable(),participant_location_name:j(),participant_x:P(),participant_y:P(),participant_unit_id:J.nullable(),participant_amount_before:P().nullable(),participant_amount_after:P().nullable(),participant_amount_hospitalized:P().nullable(),participant_amount_imprisoned:P().nullable()}),ix=L({buildingId:H,levelBefore:P(),levelAfter:P()}),ax=nx.extend({type:z(`adventure`),adventure_id:P(),health_before:N(),health_after:N(),adventure_origin_player_name:j(),adventure_origin_player_slug:j(),adventure_origin_village_name:j(),adventure_origin_x:P(),adventure_origin_y:P(),adventure_origin_tribe:W}),ox=nx.extend({type:z(`movement`),movement_id:P(),movement_type:R([`reinforcement`,`relocation`]),movement_tribe:W,movement_origin_tile_id:P(),movement_target_tile_id:P(),movement_origin_player_name:j(),movement_origin_player_slug:j(),movement_origin_name:j(),movement_origin_x:P(),movement_origin_y:P(),movement_target_name:j(),movement_target_x:P(),movement_target_y:P()}),sx=nx.extend({type:z(`trade`),trade_id:P(),trade_origin_tile_id:P(),trade_target_tile_id:P(),trade_origin_player_name:j(),trade_origin_player_slug:j(),trade_origin_name:j(),trade_origin_x:P(),trade_origin_y:P(),trade_target_player_name:j(),trade_target_player_slug:j(),trade_target_name:j(),trade_target_x:P(),trade_target_y:P(),trade_wood:P(),trade_clay:P(),trade_iron:P(),trade_wheat:P()}),cx=nx.extend({expedition_id:P(),expedition_tribe:W,expedition_village_name:j(),expedition_village_x:P(),expedition_village_y:P(),loot_wood:P().nullable(),loot_clay:P().nullable(),loot_iron:P().nullable(),loot_wheat:P().nullable()}),lx=cx.extend({type:z(`huntingParty`)}),ux=cx.extend({type:z(`gatheringExpedition`)}),dx=nx.extend({type:z(`scouting`),scouting_id:P(),perspective:lb,successful:P(),scouting_target:R([`resources`,`defensiveStructures`]),wood:P().nullable(),clay:P().nullable(),iron:P().nullable(),wheat:P().nullable(),origin_player_name:j(),origin_player_slug:j(),origin_name:j(),origin_x:P(),origin_y:P(),target_player_name:j(),target_player_slug:j(),target_name:j(),target_x:P(),target_y:P(),attacker_tribe:W,defender_tribe:W});Kc(`type`,[rx,ax,ox,sx,lx,ux,dx]).meta({id:`GetReportsRow`});const fx=Q(`/reports`,{summary:`Get player reports`,requestParams:{query:L({scope:R([`global`,`unread`,`archived`,`village`]).optional().default(`global`),villageId:B().optional(),filters:I(Ob).or(Ob).optional()})},response:I(kb)})(({database:e,query:t})=>{let n=t.scope??`global`,r=t.filters==null?[]:Array.isArray(t.filters)?t.filters:[t.filters],i=r.filter(e=>ob.safeParse(e).success);return e.selectObjects({sql:`
  SELECT
    r.id,
    r.village_id,
    r.timestamp,
    rty.report_type AS type,
    roi.report_outcome AS outcome,
    CASE rty.report_type
      WHEN 'battle' THEN json_object(
        'originName', origin_v.name,
        'originCoordinates', json_object('x', origin_t.x, 'y', origin_t.y),
        'targetName', CASE
          WHEN target_v.id IS NOT NULL THEN target_v.name
          WHEN target_o.tile_id IS NOT NULL AND target_o.village_id IS NOT NULL THEN 'Occupied oasis'
          WHEN target_o.tile_id IS NOT NULL THEN 'Unoccupied oasis'
          ELSE ''
        END,
        'targetCoordinates', json_object('x', target_t.x, 'y', target_t.y),
        'movementType', CASE WHEN b.is_raid = 1 THEN 'raid' ELSE 'attack' END
      )
      WHEN 'adventure' THEN json_object(
        'originPlayerName', adventure_p.name,
        'originPlayerSlug', adventure_p.slug,
        'originVillageName', adventure_v.name,
        'originCoordinates', json_object('x', adventure_t.x, 'y', adventure_t.y),
        'tribe', adventure_tribe.tribe
      )
      WHEN 'movement' THEN json_object(
        'originPlayerName', movement_origin_p.name,
        'originPlayerSlug', movement_origin_p.slug,
        'originName', movement_origin_v.name,
        'originCoordinates', json_object('x', movement_origin_t.x, 'y', movement_origin_t.y),
        'targetPlayerName', movement_target_p.name,
        'targetPlayerSlug', movement_target_p.slug,
        'targetName', CASE
          WHEN movement_target_v.id IS NOT NULL THEN movement_target_v.name
          WHEN movement_target_o.tile_id IS NOT NULL THEN 'Oasis'
          ELSE NULL
        END,
        'targetCoordinates', json_object('x', movement_target_t.x, 'y', movement_target_t.y),
        'movementType', mr.movement_type
      )
      WHEN 'trade' THEN json_object(
        'originPlayerName', trade_origin_p.name,
        'originPlayerSlug', trade_origin_p.slug,
        'originName', trade_origin_v.name,
        'originCoordinates', json_object('x', trade_origin_t.x, 'y', trade_origin_t.y),
        'targetPlayerName', trade_target_p.name,
        'targetPlayerSlug', trade_target_p.slug,
        'targetName', trade_target_v.name,
        'targetCoordinates', json_object('x', trade_target_t.x, 'y', trade_target_t.y)
      )
      WHEN 'huntingParty' THEN json_object(
        'villageName', hunting_v.name,
        'villageCoordinates', json_object('x', hunting_t.x, 'y', hunting_t.y)
      )
      WHEN 'gatheringExpedition' THEN json_object(
        'villageName', gathering_v.name,
        'villageCoordinates', json_object('x', gathering_t.x, 'y', gathering_t.y)
      )
      WHEN 'scouting' THEN json_object(
        'originPlayerName', scouting_origin_p.name,
        'originPlayerSlug', scouting_origin_p.slug,
        'originName', scouting_origin_v.name,
        'originCoordinates', json_object('x', scouting_origin_t.x, 'y', scouting_origin_t.y),
        'targetPlayerName', scouting_target_p.name,
        'targetPlayerSlug', scouting_target_p.slug,
        'targetName', scouting_target_v.name,
        'targetCoordinates', json_object('x', scouting_target_t.x, 'y', scouting_target_t.y)
      )
    END AS summary_json,
    COALESCE((
      SELECT json_group_array(rti.tag)
      FROM report_tags rt
      JOIN report_tag_ids rti ON rti.id = rt.report_tag_id
      WHERE rt.report_id = r.id
    ), '[]') AS tags_json
  FROM reports r
  JOIN report_type_ids rty ON rty.id = r.type_id
  JOIN report_outcome_ids roi ON roi.id = r.report_outcome_id
  LEFT JOIN battle_reports b ON b.report_id = r.id
  LEFT JOIN tiles origin_t ON origin_t.id = b.origin_tile_id
  LEFT JOIN villages origin_v ON origin_v.tile_id = origin_t.id
  LEFT JOIN tiles target_t ON target_t.id = b.target_tile_id
  LEFT JOIN villages target_v ON target_v.tile_id = target_t.id
  LEFT JOIN oasis target_o ON target_o.id = (
    SELECT MIN(id) FROM oasis WHERE tile_id = target_t.id
  )
  LEFT JOIN villages adventure_v ON adventure_v.id = r.village_id
  LEFT JOIN players adventure_p ON adventure_p.id = adventure_v.player_id
  LEFT JOIN tiles adventure_t ON adventure_t.id = adventure_v.tile_id
  LEFT JOIN tribe_ids adventure_tribe ON adventure_tribe.id = adventure_p.tribe_id
  LEFT JOIN movement_reports mr ON mr.report_id = r.id
  LEFT JOIN tiles movement_origin_t ON movement_origin_t.id = mr.origin_tile_id
  LEFT JOIN villages movement_origin_v ON movement_origin_v.tile_id = movement_origin_t.id
  LEFT JOIN players movement_origin_p ON movement_origin_p.id = movement_origin_v.player_id
  LEFT JOIN tiles movement_target_t ON movement_target_t.id = mr.target_tile_id
  LEFT JOIN villages movement_target_v ON movement_target_v.tile_id = movement_target_t.id
  LEFT JOIN players movement_target_p ON movement_target_p.id = movement_target_v.player_id
  LEFT JOIN (
    SELECT tile_id
    FROM oasis
    GROUP BY tile_id
  ) movement_target_o ON movement_target_o.tile_id = movement_target_t.id
  LEFT JOIN trade_reports tr ON tr.report_id = r.id
  LEFT JOIN tiles trade_origin_t ON trade_origin_t.id = tr.origin_tile_id
  LEFT JOIN villages trade_origin_v ON trade_origin_v.tile_id = trade_origin_t.id
  LEFT JOIN players trade_origin_p ON trade_origin_p.id = trade_origin_v.player_id
  LEFT JOIN tiles trade_target_t ON trade_target_t.id = tr.target_tile_id
  LEFT JOIN villages trade_target_v ON trade_target_v.tile_id = trade_target_t.id
  LEFT JOIN players trade_target_p ON trade_target_p.id = trade_target_v.player_id
  LEFT JOIN hunting_party_reports hpr ON hpr.report_id = r.id
  LEFT JOIN tiles hunting_t ON hunting_t.id = hpr.village_tile_id
  LEFT JOIN villages hunting_v ON hunting_v.tile_id = hunting_t.id
  LEFT JOIN gathering_expedition_reports ger ON ger.report_id = r.id
  LEFT JOIN tiles gathering_t ON gathering_t.id = ger.village_tile_id
  LEFT JOIN villages gathering_v ON gathering_v.tile_id = gathering_t.id
  LEFT JOIN scouting_reports sr ON sr.report_id = r.id
  LEFT JOIN tiles scouting_origin_t ON scouting_origin_t.id = sr.origin_tile_id
  LEFT JOIN villages scouting_origin_v ON scouting_origin_v.tile_id = scouting_origin_t.id
  LEFT JOIN players scouting_origin_p ON scouting_origin_p.id = scouting_origin_v.player_id
  LEFT JOIN tiles scouting_target_t ON scouting_target_t.id = sr.target_tile_id
  LEFT JOIN villages scouting_target_v ON scouting_target_v.tile_id = scouting_target_t.id
  LEFT JOIN players scouting_target_p ON scouting_target_p.id = scouting_target_v.player_id
  WHERE
    ($scope != 'village' OR r.village_id = $village_id)
    AND (
      $scope != 'unread'
      OR NOT EXISTS (
        SELECT 1 FROM report_tags rt
        WHERE rt.report_id = r.id
          AND rt.report_tag_id = (SELECT id FROM report_tag_ids WHERE tag = 'read')
      )
    )
    AND (
      $scope != 'archived'
      OR EXISTS (
        SELECT 1 FROM report_tags rt
        WHERE rt.report_id = r.id
          AND rt.report_tag_id = (SELECT id FROM report_tag_ids WHERE tag = 'archived')
      )
    )
    AND (
      $type_count = 0
      OR ($include_battle = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'battle'))
      OR ($include_adventure = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'adventure'))
      OR ($include_trade = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'trade'))
      OR ($include_movement = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'movement'))
      OR ($include_hunting_party = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'huntingParty'))
      OR ($include_gathering_expedition = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'gatheringExpedition'))
      OR ($include_scouting = 1 AND r.type_id = (SELECT id FROM report_type_ids WHERE report_type = 'scouting'))
    )
    AND (
      $exclude_no_loss = 0
      OR rty.report_type != 'battle'
      OR roi.report_outcome != 'attackerNoLoss'
    )
    AND (
      $exclude_own_trades = 0
      OR rty.report_type != 'trade'
      OR trade_origin_v.player_id != trade_target_v.player_id
    )
  ORDER BY r.timestamp DESC;
`,bind:{$village_id:t.villageId??null,$scope:n,$type_count:i.length,$include_battle:+!!i.includes(`battle`),$include_adventure:+!!i.includes(`adventure`),$include_trade:+!!i.includes(`trade`),$include_movement:+!!i.includes(`movement`),$include_hunting_party:+!!i.includes(`huntingParty`),$include_gathering_expedition:+!!i.includes(`gatheringExpedition`),$include_scouting:+!!i.includes(`scouting`),$exclude_no_loss:r.length===0||r.includes(`noLoss`)?0:1,$exclude_own_trades:r.length===0||r.includes(`ownTrades`)?0:1},schema:$b}).map(Wb)}),px=Q(`/reports/:reportId`,{summary:`Get report by id`,requestParams:{path:L({reportId:B()})},response:Db})(({database:e,path:{reportId:t}})=>{let n=e.selectObject({sql:`
  SELECT
    rty.report_type AS type
  FROM reports r
  JOIN report_type_ids rty ON rty.id = r.type_id
  WHERE r.id = $report_id;
`,bind:{$report_id:t},schema:ex});if(!n)throw Error(`Report ${t} not found`);let r={$report_id:t};if(n.type===`battle`){let t=e.selectObjects({sql:Mb,bind:r,schema:rx}),n=e.selectObjects({sql:`
  SELECT
    bi.building AS buildingId,
    brb.level_before AS levelBefore,
    brb.level_after AS levelAfter
  FROM battle_report_buildings brb
  JOIN building_ids bi ON bi.id = brb.building_id
  WHERE brb.report_id = $report_id;
`,bind:r,schema:ix});return Gb(t,n)}if(n.type===`adventure`){let t=e.selectObject({sql:Nb,bind:r,schema:ax});return Kb(t)}if(n.type===`movement`){let t=e.selectObject({sql:Pb,bind:r,schema:ox}),n=e.selectObjects({sql:`
        SELECT ui.unit AS unitId, mru.amount
        FROM movement_report_units mru
        JOIN unit_ids ui ON mru.unit_id = ui.id
        WHERE mru.movement_report_id = $movement_report_id;
      `,bind:{$movement_report_id:t.movement_id},schema:L({unitId:J,amount:P()})});return qb(t,n)}if(n.type===`huntingParty`){let t=e.selectObject({sql:Ib,bind:r,schema:lx}),n=e.selectObjects({sql:`SELECT ui.unit AS unitId, hpru.amount FROM hunting_party_report_units hpru JOIN unit_ids ui ON ui.id = hpru.unit_id WHERE hpru.hunting_party_report_id = $report_detail_id;`,bind:{$report_detail_id:t.expedition_id},schema:L({unitId:J,amount:P()})});return Xb(t,n)}if(n.type===`gatheringExpedition`){let t=e.selectObject({sql:Lb,bind:r,schema:ux}),n=e.selectObjects({sql:`SELECT ui.unit AS unitId, geru.amount FROM gathering_expedition_report_units geru JOIN unit_ids ui ON ui.id = geru.unit_id WHERE geru.gathering_expedition_report_id = $report_detail_id;`,bind:{$report_detail_id:t.expedition_id},schema:L({unitId:J,amount:P()})});return Zb(t,n)}if(n.type===`scouting`){let t=e.selectObject({sql:Rb,bind:r,schema:dx}),n=e.selectObjects({sql:`SELECT sru.role, sru.tile_id AS tileId, ui.unit AS unitId, sru.amount,
        ti.tribe, p.name AS playerName, p.slug AS playerSlug,
        v.name AS villageName, t.x, t.y
        FROM scouting_report_units sru
        JOIN unit_ids ui ON ui.id = sru.unit_id
        JOIN tiles t ON t.id = sru.tile_id
        JOIN villages v ON v.tile_id = t.id
        JOIN players p ON p.id = v.player_id
        JOIN tribe_ids ti ON ti.id = p.tribe_id
        WHERE sru.scouting_report_id = $id;`,bind:{$id:t.scouting_id},schema:L({role:R([`defender`,`reinforcement`]),tileId:P(),unitId:J,amount:P(),tribe:W,playerName:j(),playerSlug:j(),villageName:j(),x:P(),y:P()})}),i=e.selectObjects({sql:`SELECT ui.unit AS unitId, srau.amount_before AS amountBefore, srau.amount_after AS amountAfter FROM scouting_report_attacker_units srau JOIN unit_ids ui ON ui.id = srau.unit_id WHERE srau.scouting_report_id = $id;`,bind:{$id:t.scouting_id},schema:L({unitId:J,amountBefore:P(),amountAfter:P()})}),a=e.selectObjects({sql:`SELECT bi.building AS buildingId, srs.level FROM scouting_report_structures srs JOIN building_ids bi ON bi.id = srs.building_id WHERE srs.scouting_report_id = $id;`,bind:{$id:t.scouting_id},schema:L({buildingId:H,level:P()})});return Qb(t,i,n,a)}let i=e.selectObject({sql:Fb,bind:r,schema:sx});return Jb(i)}),mx=Q(`/reports`,`patch`,{summary:`Update reports`,requestBody:L({reportIds:I(P()).min(1),tags:$c(cb,F()).refine(e=>Object.keys(e).length>0,`No tag updates provided`)})})(({database:e,body:{reportIds:t,tags:n}})=>{let r={$report_ids:JSON.stringify(t),$tags:JSON.stringify(n)};e.transaction(()=>{e.exec({sql:`
  INSERT OR IGNORE INTO report_tags (report_id, report_tag_id)
  SELECT r.id, rti.id
  FROM json_each($report_ids) report_ids
  JOIN reports r ON r.id = report_ids.value
  CROSS JOIN json_each($tags) tag_updates
  JOIN report_tag_ids rti ON rti.tag = tag_updates.key
  WHERE tag_updates.value = 1
`,bind:r}),e.exec({sql:`
  DELETE FROM report_tags
  WHERE (report_id, report_tag_id) IN (
    SELECT r.id, rti.id
    FROM json_each($report_ids) report_ids
    JOIN reports r ON r.id = report_ids.value
    CROSS JOIN json_each($tags) tag_updates
    JOIN report_tag_ids rti ON rti.tag = tag_updates.key
    WHERE tag_updates.value = 0
  )
`,bind:r})})}),hx=Q(`/reports`,`delete`,{summary:`Delete reports`,requestBody:I(P())})(({database:e,body:t})=>{e.exec({sql:`
  DELETE FROM reports
  WHERE id IN (SELECT value FROM json_each($report_ids))
`,bind:{$report_ids:JSON.stringify(t)}})}),gx=R([`player`,`ecstatic`,`honored`,`respected`,`friendly`,`neutral`,`unfriendly`,`hostile`,`hated`]).meta({id:`ReputationLevel`}),_x=L({faction:Rp,reputation:N().positive().or(z(0)),reputationLevel:gx}).meta({id:`Reputation`}),vx=[...new Map([[`ecstatic`,63e3],[`honored`,57e3],[`respected`,48e3],[`friendly`,45e3],[`neutral`,42e3],[`unfriendly`,39e3],[`hostile`,36e3],[`hated`,0]]).entries()],yx=e=>{if(e===null)return`player`;for(let t=0;t<vx.length;t+=1){let[n,r]=vx[t];if(e>=r)return n}return`hated`},bx=e=>_x.parse({faction:e.faction,reputation:e.reputation,reputationLevel:yx(e.reputation)}),xx=L({faction:Rp,reputation:N()}).meta({id:`GetReputationsRow`}),Sx=Q(`/players/:playerId/reputations`,{summary:`Get player faction reputations`,requestParams:{path:L({playerId:B()})},response:I(_x)})(({database:e,path:{playerId:t}})=>e.selectObjects({sql:`
  SELECT
    fi.faction,
    fr.reputation
  FROM
    faction_reputation fr
      JOIN faction_ids fi ON fr.target_faction_id = fi.id
  WHERE
    fr.source_faction_id = (
      SELECT faction_id
      FROM
        players
      WHERE
        id = $player_id
      );
`,bind:{$player_id:t},schema:xx}).map(bx)),Cx=L({id:N(),buildingId:H,villageId:N(),buildingFieldId:N(),level:N()}),wx=L({buildingId:H,buildingFieldId:N(),level:N()}),Tx=L({scheduledUpgradeIds:I(N()).max(5)}),Ex=Q(`/villages/:villageId/scheduled-building-upgrades`,{summary:`Get scheduled building upgrades`,requestParams:{path:L({villageId:B()})},response:I(Cx)})(({database:e,path:{villageId:t}})=>bm(e,t)),Dx=Q(`/villages/:villageId/scheduled-building-upgrades`,`post`,{summary:`Schedule a building upgrade`,requestParams:{path:L({villageId:B()})},requestBody:wx})(({database:e,path:{villageId:t},body:n})=>{e.transaction(e=>{let{buildingId:r,buildingFieldId:i,level:a}=n;if(!e.selectValue({sql:`
  SELECT EXISTS (
    SELECT 1
    FROM events e
    JOIN villages v ON v.id = e.village_id
    JOIN players p ON p.id = v.player_id
    JOIN tribe_ids ti ON ti.id = p.tribe_id
    WHERE e.village_id = $village_id
      AND (
        e.type = 'buildingConstruction'
        OR (
          e.type = 'buildingLevelChange'
          AND CAST(JSON_EXTRACT(e.meta, '$.level') AS INTEGER) >
              CAST(JSON_EXTRACT(e.meta, '$.previousLevel') AS INTEGER)
        )
      )
      AND (
        ti.tribe <> 'romans'
        OR (
          CAST(JSON_EXTRACT(e.meta, '$.buildingFieldId') AS INTEGER) <= 18
          AND $building_field_id <= 18
        )
        OR (
          CAST(JSON_EXTRACT(e.meta, '$.buildingFieldId') AS INTEGER) > 18
          AND $building_field_id > 18
        )
      )
  );
`,bind:{$village_id:t,$building_field_id:i},schema:V()}))throw Error(`Cannot schedule building upgrade without active construction`);if(e.selectValue({sql:`
  SELECT
    (
      SELECT COUNT(*)
      FROM events
      WHERE village_id = $village_id
        AND (
          type = 'buildingConstruction'
          OR (
            type = 'buildingLevelChange'
            AND CAST(JSON_EXTRACT(meta, '$.level') AS INTEGER) >
                CAST(JSON_EXTRACT(meta, '$.previousLevel') AS INTEGER)
          )
        )
    )
    +
    (
      SELECT COUNT(*)
      FROM scheduled_building_upgrades
      WHERE village_id = $village_id
    );
`,bind:{$village_id:t},schema:N()})>=5)throw new df;let{maxLevel:o}=$l(r);if(a>o)throw Error(`Building level cannot exceed max level`);if(a!==(e.selectValue({sql:`
  SELECT MAX(level)
  FROM (
    SELECT bf.level
    FROM building_fields bf
    JOIN building_ids bi ON bi.id = bf.building_id
    WHERE bf.village_id = $village_id
      AND bf.field_id = $building_field_id
      AND bi.building = $building_id

    UNION ALL

    SELECT CAST(JSON_EXTRACT(meta, '$.level') AS INTEGER)
    FROM events
    WHERE village_id = $village_id
      AND type IN ('buildingConstruction', 'buildingLevelChange')
      AND CAST(JSON_EXTRACT(meta, '$.buildingFieldId') AS INTEGER) =
          $building_field_id

    UNION ALL

    SELECT level
    FROM scheduled_building_upgrades
    WHERE village_id = $village_id
      AND building_field_id = $building_field_id
  );
`,bind:{$village_id:t,$building_field_id:i,$building_id:r},schema:N().nullable()})??0)+1)throw Error(`Scheduled building upgrades must be consecutive`);let s=e.selectObject({sql:`
  SELECT bi.building AS buildingId, bf.level
  FROM building_fields bf
  JOIN building_ids bi ON bi.id = bf.building_id
  WHERE bf.village_id = $village_id
    AND bf.field_id = $building_field_id;
`,bind:{$village_id:t,$building_field_id:i},schema:L({buildingId:H,level:N()})});if(s&&s.buildingId!==r){let n=e.selectValue({sql:`
  SELECT EXISTS (
    SELECT 1
    FROM events
    WHERE village_id = $village_id
      AND type IN ('buildingConstruction', 'buildingLevelChange')
      AND CAST(JSON_EXTRACT(meta, '$.buildingFieldId') AS INTEGER) =
          $building_field_id

    UNION ALL

    SELECT 1
    FROM scheduled_building_upgrades
    WHERE village_id = $village_id
      AND building_field_id = $building_field_id
  );
`,bind:{$village_id:t,$building_field_id:i},schema:V()});if(s.level>0||i<=18||n)throw Error(`Building field is already occupied`);Zu(e,t,i,s.buildingId)}let c=s===void 0||s.buildingId!==r;Sm(e,{buildingId:r,villageId:t,buildingFieldId:i,level:a}),c&&Xu(e,t,i,r)})}),Ox=Q(`/villages/:villageId/scheduled-building-upgrades`,`patch`,{summary:`Reorder scheduled building upgrades`,requestParams:{path:L({villageId:B()})},requestBody:Tx})(({database:e,path:{villageId:t},body:{scheduledUpgradeIds:n}})=>{e.transaction(e=>{let r=bm(e,t),i=new Map(r.map(e=>[e.id,e]));if(n.length!==r.length||new Set(n).size!==n.length||n.some(e=>!i.has(e)))throw Error(`Scheduled upgrade order must include the entire queue`);let a=new Map;for(let e of n){let t=i.get(e),n=a.get(t.buildingFieldId);if(n!==void 0&&t.level<=n)throw Error(`Scheduled upgrades for the same building field cannot be reordered`);a.set(t.buildingFieldId,t.level)}for(let[r,i]of n.entries())e.exec({sql:`
  UPDATE scheduled_building_upgrades
  SET queue_position = $queue_position
  WHERE id = $id AND village_id = $village_id;
`,bind:{$queue_position:r,$id:i,$village_id:t}})})}),kx=Q(`/villages/:villageId/scheduled-building-upgrades/:scheduledUpgradeId`,`delete`,{summary:`Cancel a scheduled building upgrade`,requestParams:{path:L({villageId:B(),scheduledUpgradeId:B()})}})(({database:e,path:{villageId:t,scheduledUpgradeId:n}})=>{e.transaction(e=>{let r=e.selectObject({sql:`
  SELECT
    bi.building AS buildingId,
    sbu.building_field_id AS buildingFieldId,
    sbu.level
  FROM scheduled_building_upgrades sbu
  JOIN building_ids bi ON bi.id = sbu.building_id
  WHERE sbu.id = $id AND sbu.village_id = $village_id;
`,bind:{$id:n,$village_id:t},schema:L({buildingId:H,buildingFieldId:N(),level:N()})});r&&(Cm(e,{villageId:t,buildingId:r.buildingId,buildingFieldId:r.buildingFieldId,fromLevel:r.level}),r.level===1&&Zu(e,t,r.buildingFieldId,r.buildingId))})}),Ax=Q(`/server`,{summary:`Get server details`,response:lf})(({database:e})=>e.selectObject({sql:`
  SELECT
    id,
    version,
    name,
    slug,
    created_at,
    seed,
    speed,
    map_size,
    player_name,
    player_tribe
  FROM
    servers;
`,schema:cf})),jx=L({id:N(),name:j(),slug:j(),tribe:W,faction:Rp,totalPopulation:N(),villageCount:N()}).meta({id:`PlayerRankingItemDto`}),Mx=L({id:N(),name:j(),coordinates:Y,population:N(),playerId:N(),playerName:j(),playerSlug:j()}).meta({id:`VillageRankingItemDto`}),Nx=L({playerCount:N(),villageCount:N(),playersByTribe:Qc(W,N()),playersByFaction:Qc(Rp,N()),villagesByTribe:Qc(W,N()),villagesByFaction:Qc(Rp,N())}).meta({id:`ServerOverviewStatisticsDto`}),Px=e=>jx.parse({id:e.id,name:e.name,slug:e.slug,tribe:e.tribe,faction:e.faction,totalPopulation:e.total_population,villageCount:e.village_count}),Fx=e=>Mx.parse({id:e.village_id,name:e.village_name,coordinates:{x:e.coordinates_x,y:e.coordinates_y},population:e.population,playerId:e.player_id,playerName:e.player_name,playerSlug:e.player_slug}),Ix=e=>Nx.parse({playerCount:e.player_count,villageCount:e.village_count,playersByTribe:e.players_by_tribe,playersByFaction:e.players_by_faction,villagesByTribe:e.villages_by_tribe,villagesByFaction:e.villages_by_faction}),Lx=L({id:N(),name:j(),slug:j(),tribe:W,faction:Rp,total_population:N(),village_count:N()}).meta({id:`GetPlayerRankingsRow`}),Rx=L({village_id:N(),village_name:j(),coordinates_x:N(),coordinates_y:N(),population:N(),player_id:N(),player_name:j(),player_slug:j()}).meta({id:`GetVillageRankingsRow`}),zx=L({tribe:W,faction:Rp,player_count:N()}),Bx=L({tribe:W,faction:Rp,village_count:N()});L({player_count:N(),village_count:N(),players_by_tribe:Qc(W,N()),players_by_faction:Qc(Rp,N()),villages_by_tribe:Qc(W,N()),villages_by_faction:Qc(Rp,N())}).meta({id:`GetServerOverviewStatisticsRow`});const Vx=Q(`/statistics/players`,{summary:`Get player rankings`,requestParams:{query:L({lastPlayerId:B().nullable().optional()})},response:I(jx)})(({database:e,query:t})=>{let{lastPlayerId:n=null}=t;return e.selectObjects({sql:`
  WITH
    player_pop AS (
      SELECT
        p.id,
        p.name,
        p.slug,
        ti.tribe,
        fi.faction AS faction,
        SUM(CASE WHEN ei.effect = 'wheatProduction' THEN e.value * -1 ELSE 0 END) AS total_population,
        COUNT(DISTINCT v.id) AS village_count
      FROM
        players p
          JOIN tribe_ids ti ON p.tribe_id = ti.id
          JOIN faction_ids fi ON fi.id = p.faction_id
          LEFT JOIN villages v ON v.player_id = p.id
          LEFT JOIN effects e ON e.tile_id = v.tile_id
          AND e.type_id = (SELECT id FROM effect_type_ids WHERE type = 'base')
          AND e.scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
          AND e.source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
          AND e.source_specifier = 0
          LEFT JOIN effect_ids ei ON ei.id = e.effect_id
      GROUP BY
        p.id,
        p.name,
        p.slug,
        ti.tribe,
        fi.faction
      ),

    cursor_row AS (
      SELECT total_population, id
      FROM
        player_pop
      WHERE
        id = $last_player_id
      )

  SELECT
    id,
    name,
    slug,
    tribe,
    faction,
    total_population,
    village_count
  FROM
    player_pop
  WHERE
    ($last_player_id IS NULL)
    OR (
      EXISTS
      (
        SELECT 1
        FROM
          cursor_row
        )
        AND (
        (
          total_population < (
            SELECT total_population
            FROM
              cursor_row
            )
          )
          OR (
          total_population = (
            SELECT total_population
            FROM
              cursor_row
            )
            AND id > $last_player_id
          )
        )
      )
  ORDER BY
    total_population DESC, id;
`,bind:{$last_player_id:n},schema:Lx}).map(Px)}),Hx=Q(`/statistics/villages`,{summary:`Get village rankings`,requestParams:{query:L({lastVillageId:B().nullable().optional()})},response:I(Mx)})(({database:e,query:t})=>{let{lastVillageId:n=null}=t;return e.selectObjects({sql:`
  WITH
    village_pop AS (
      SELECT
        v.id AS village_id,
        v.name AS village_name,
        t.x AS coordinates_x,
        t.y AS coordinates_y,
        v.player_id,
        p.name AS player_name,
        p.slug AS player_slug,
        SUM(CASE WHEN ei.effect = 'wheatProduction' THEN e.value * -1 ELSE 0 END) AS population
      FROM
        villages v
          LEFT JOIN tiles t ON t.id = v.tile_id
          LEFT JOIN players p ON p.id = v.player_id
          LEFT JOIN effects e ON e.tile_id = v.tile_id
            AND e.type_id = (SELECT id FROM effect_type_ids WHERE type = 'base')
            AND e.scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
            AND e.source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
            AND e.source_specifier = 0
          LEFT JOIN effect_ids ei ON ei.id = e.effect_id
      GROUP BY v.id, v.name, t.x, t.y, v.player_id, p.name, p.slug
    ),

    cursor_row AS (
      SELECT population, village_id
      FROM
        village_pop
      WHERE
        village_id = $last_village_id
    )

  SELECT
    village_id,
    village_name,
    coordinates_x,
    coordinates_y,
    population,
    player_id,
    player_name,
    player_slug
  FROM
    village_pop
  WHERE
    ($last_village_id IS NULL)
    OR (
      EXISTS
      (
        SELECT 1
        FROM
          cursor_row
      )
      AND (
        (
          population < (
            SELECT population
            FROM
              cursor_row
          )
        )
        OR (
          population = (
            SELECT population
            FROM
              cursor_row
          )
          AND village_id > $last_village_id
        )
      )
    )
  ORDER BY
    population DESC, village_id;
`,bind:{$last_village_id:n},schema:Rx}).map(Fx)}),Ux=Q(`/statistics/overview`,{summary:`Get game world overview statistics`,response:Nx})(({database:e})=>{let t=e.selectObjects({sql:`
  SELECT
    ti.tribe AS tribe,
    fi.faction AS faction,
    COUNT(p.id) AS player_count
  FROM
    players p
      JOIN tribe_ids ti ON p.tribe_id = ti.id
      JOIN faction_ids fi ON fi.id = p.faction_id
  GROUP BY
    ti.tribe, fi.faction;
`,schema:zx}),n=e.selectObjects({sql:`
  SELECT
    ti.tribe AS tribe,
    fi.faction AS faction,
    COUNT(v.id) AS village_count
  FROM
    villages v
      JOIN players p ON v.player_id = p.id
      JOIN tribe_ids ti ON p.tribe_id = ti.id
      JOIN faction_ids fi ON fi.id = p.faction_id
  GROUP BY
    ti.tribe, fi.faction;
`,schema:Bx}),r=0,i={gauls:0,romans:0,teutons:0,egyptians:0,huns:0,spartans:0,nature:0,natars:0},a={player:0,npc1:0,npc2:0,npc3:0,npc4:0,npc5:0,npc6:0,npc7:0,npc8:0};for(let e of t)r+=e.player_count,i[e.tribe]+=e.player_count,a[e.faction]+=e.player_count;let o=0,s={gauls:0,romans:0,teutons:0,egyptians:0,huns:0,spartans:0,nature:0,natars:0},c={player:0,npc1:0,npc2:0,npc3:0,npc4:0,npc5:0,npc6:0,npc7:0,npc8:0};for(let e of n)o+=e.village_count,s[e.tribe]+=e.village_count,c[e.faction]+=e.village_count;return Ix({player_count:r,village_count:o,players_by_tribe:i,players_by_faction:a,villages_by_tribe:s,villages_by_faction:c})}),Wx=L({total:N(),free:N(),occupied:N()}).meta({id:`TrapperCageStatsDto`}),Gx=Q(`/villages/:villageId/trapper-cages`,{summary:`Get Trapper cage stats`,requestParams:{path:L({villageId:B()})},response:Wx})(({database:e,path:{villageId:t}})=>e.selectObject({sql:`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE unit_id IS NULL) AS free,
        COUNT(*) FILTER (WHERE unit_id IS NOT NULL) AS occupied
      FROM
        trapper_cages
      WHERE
        village_id = $village_id;
    `,bind:{$village_id:t},schema:Wx})),Kx=Pl.extract([`troopMovementReinforcements`,`troopMovementRelocation`,`troopMovementReturn`,`troopMovementFindNewVillage`,`troopMovementAttack`,`troopMovementRaid`,`troopMovementOasisOccupation`]),qx=Wc([L({id:N(),type:z(`troopMovementAdventure`),originatingVillageId:N(),originatingVillageName:j(),originatingTileId:N(),playerName:j(),playerId:N(),playerTribe:W,resolvesAt:N()}),L({id:N(),type:Kx,originatingVillageId:N(),originatingVillageName:j(),originatingTileId:N(),playerName:j(),playerId:N(),playerTribe:W,resolvesAt:N(),targetVillageId:N().nullable(),targetVillageName:j().nullable(),targetTileId:N().nullable()})]).meta({id:`TroopMovementItemDto`}),Jx=L({type:R([`deploymentOutgoing`,`deploymentIncoming`,`offensiveMovementOutgoing`,`offensiveMovementIncoming`,`adventure`,`findNewVillage`]),count:N(),earliestResolvesAt:N()}).meta({id:`TroopMovementStatsItemDto`}),Yx=e=>{let t=e.type===`troopMovementAdventure`;return qx.parse({id:e.id,type:e.type,originatingVillageId:e.originating_village_id,originatingVillageName:e.originating_village_name,originatingTileId:e.originating_tile_id,playerName:e.player_name,playerId:e.player_id,playerTribe:e.player_tribe,resolvesAt:e.resolves_at,...t?{}:{targetVillageId:e.target_village_id,targetVillageName:e.target_village_name,targetTileId:e.target_tile_id}})},Xx=e=>Jx.parse({type:e.movement_type,count:e.count,earliestResolvesAt:e.earliest_resolves_at}),Zx=L({type:Pl,originTileId:N().int().min(1),targetTileId:N().int().min(1),troops:I(L({unitId:J,amount:N()}))}),Qx=L({id:N(),type:j(),starts_at:N(),duration:N(),resolves_at:N(),meta:j(),originating_village_id:N(),originating_village_name:j(),originating_tile_id:N(),player_id:N(),player_name:j(),player_tribe:W,target_village_id:N().nullable(),target_village_name:j().nullable(),target_tile_id:N().nullable()}).meta({id:`GetVillageTroopMovementsRow`}),$x=L({movement_type:R([`deploymentOutgoing`,`deploymentIncoming`,`offensiveMovementOutgoing`,`offensiveMovementIncoming`,`adventure`,`findNewVillage`]),count:N(),earliest_resolves_at:N()}).meta({id:`GetVillageTroopMovementStatsRow`}),eS=Q(`/troop-movements/validate`,`post`,{summary:`Validate troop movement`,requestBody:Zx,response:L({errors:I(j())})})(({database:e,body:{originTileId:t,...n}})=>{let r=e.selectValue({sql:Su,bind:{$tile_id:t},schema:N().nullable()});return{errors:tm(e,{...n,originTileId:t,villageId:r??void 0})}}),tS=Q(`/tiles/:tileId/troop-movements`,{summary:`Get tile troop movements`,requestParams:{path:L({tileId:B()})},response:I(qx)})(({database:e,path:{tileId:t}})=>e.selectObjects({sql:`
  SELECT
    e.id,
    e.type,
    e.starts_at,
    e.duration,
    e.resolves_at,
    e.meta,
    e.village_id AS originating_village_id,
    v_orig.name AS originating_village_name,
    t_orig.id AS originating_tile_id,
    p_orig.id AS player_id,
    p_orig.name AS player_name,
    ti_orig.tribe AS player_tribe,
    v_target.id AS target_village_id,
    v_target.name AS target_village_name,
    t_target.id AS target_tile_id
  FROM events e
  JOIN villages v_orig ON e.village_id = v_orig.id
  JOIN tiles t_orig ON v_orig.tile_id = t_orig.id
  JOIN players p_orig ON v_orig.player_id = p_orig.id
  JOIN tribe_ids ti_orig ON p_orig.tribe_id = ti_orig.id
  LEFT JOIN tiles t_target ON JSON_EXTRACT(e.meta, '$.targetTileId') = t_target.id
  LEFT JOIN villages v_target ON t_target.id = v_target.tile_id
  WHERE
    e.type IN (
      'troopMovementReinforcements',
      'troopMovementRelocation',
      'troopMovementReturn',
      'troopMovementFindNewVillage',
      'troopMovementAttack',
      'troopMovementRaid',
      'troopMovementOasisOccupation',
      'troopMovementAdventure'
    )
    AND (
      v_orig.tile_id = $tile_id
      OR (
        JSON_EXTRACT(e.meta, '$.targetTileId') = $tile_id
      )
      OR (
        e.type = 'troopMovementAdventure'
        AND EXISTS (
          SELECT 1
          FROM villages v1
          JOIN villages v2 ON v1.player_id = v2.player_id
          WHERE v1.tile_id = $tile_id
            AND v2.id = e.village_id
        )
      )
    )
  ORDER BY e.resolves_at ASC;
`,bind:{$tile_id:t},schema:Qx}).map(Yx)),nS=Q(`/tiles/:tileId/troop-movements/stats`,{summary:`Get tile troop movement stats`,requestParams:{path:L({tileId:B()})},response:I(Jx)})(({database:e,path:{tileId:t}})=>e.selectObjects({sql:`
  SELECT
    CASE
      WHEN e.type = 'troopMovementFindNewVillage' THEN 'findNewVillage'
      WHEN e.type = 'troopMovementAdventure' THEN 'adventure'
      WHEN e.type IN ('troopMovementReinforcements', 'troopMovementRelocation', 'troopMovementReturn') THEN
        CASE WHEN v_orig.tile_id != $tile_id THEN 'deploymentIncoming' ELSE 'deploymentOutgoing' END
      WHEN e.type IN ('troopMovementAttack', 'troopMovementRaid', 'troopMovementOasisOccupation') THEN
        CASE WHEN v_orig.tile_id != $tile_id THEN 'offensiveMovementIncoming' ELSE 'offensiveMovementOutgoing' END
    END AS movement_type,
    COUNT(*) AS count,
    MIN(e.resolves_at) AS earliest_resolves_at
  FROM events e
  JOIN villages v_orig ON e.village_id = v_orig.id
  WHERE
    e.type IN (
      'troopMovementReinforcements',
      'troopMovementRelocation',
      'troopMovementReturn',
      'troopMovementFindNewVillage',
      'troopMovementAttack',
      'troopMovementRaid',
      'troopMovementOasisOccupation',
      'troopMovementAdventure'
    )
    AND (
      v_orig.tile_id = $tile_id
      OR (
        JSON_EXTRACT(e.meta, '$.targetTileId') = $tile_id
      )
      OR (
        e.type = 'troopMovementAdventure'
        AND EXISTS (
          SELECT 1
          FROM villages v1
          JOIN villages v2 ON v1.player_id = v2.player_id
          WHERE v1.tile_id = $tile_id
            AND v2.id = e.village_id
        )
      )
    )
  GROUP BY movement_type;
`,bind:{$tile_id:t},schema:$x}).map(Xx)),rS=Q(`/troop-movements/:eventId`,`delete`,{summary:`Cancel troop movement`,requestParams:{path:L({eventId:B()})}})(({database:e,path:{eventId:t}})=>{e.transaction(e=>{let n=e.selectObject({sql:Dl,bind:{$event_id:t},schema:Fl});if(!n)throw Error(`Movement event not found`);let r=Il(n);if(r.type===`troopMovementReturn`)throw Error(`Cannot cancel a return movement`);let{troops:i,targetTileId:a,originTileId:o,villageId:s,type:c}=r,l=Date.now(),u=l-r.startsAt;if(u>6e4)throw Error(`Movements can only be cancelled within 1 minute of dispatch`);e.exec({sql:`
  DELETE
  FROM
    events
  WHERE
    id = $event_id;
`,bind:{$event_id:t}}),X(e,{type:`troopMovementReturn`,villageId:s,troops:i,startsAt:l,duration:u,targetTileId:o,originTileId:a,originalMovementType:c})}),Ms()}),iS=L({unitId:J,level:N()}).meta({id:`UnitImprovementDto`}),aS=L({unitId:J}).meta({id:`ResearchedUnitDto`}),oS=e=>iS.parse({unitId:e.unit_id,level:e.level}),sS=e=>aS.parse({unitId:e.unit_id}),cS=L({unit_id:J,level:N()}).meta({id:`GetUnitImprovementsRow`}),lS=Q(`/players/:playerId/unit-improvements`,{summary:`Get unit improvements`,requestParams:{path:L({playerId:B()})},response:I(iS)})(({database:e,path:{playerId:t}})=>e.selectObjects({sql:`
  SELECT
    ui.unit AS unit_id,
    u.level
  FROM
    unit_improvements u
      JOIN unit_ids ui ON ui.id = u.unit_id
  WHERE
    u.player_id = $player_id;
`,bind:{$player_id:t},schema:cS}).map(oS)),uS=L({unit_id:J,village_id:N()}).meta({id:`GetResearchedUnitsRow`}),dS=Q(`/villages/:villageId/researched-units`,{summary:`Get researched units in village`,requestParams:{path:L({villageId:B()})},response:I(aS)})(({database:e,path:{villageId:t}})=>e.selectObjects({sql:`
  SELECT
    ui.unit AS unit_id,
    ur.village_id
  FROM
    unit_research ur
      JOIN unit_ids ui ON ui.id = ur.unit_id
  WHERE
    ur.village_id = $village_id;
`,bind:{$village_id:t},schema:uS}).map(sS)),fS=L({id:N(),tileId:N(),playerId:N(),name:j(),slug:j(),coordinates:Y,lastUpdatedAt:N(),resources:L({wood:N(),clay:N(),iron:N(),wheat:N()}),resourceFieldComposition:Bp,buildingFields:I(lu)}),pS=L({completed:N()}).meta({id:`GatherersHutExpeditions`}),mS=L({field_id:N(),building_id:H,level:N()}),hS=L({id:N(),tile_id:N(),player_id:N(),coordinates_x:N(),coordinates_y:N(),name:j(),slug:j(),resource_field_composition:Bp,last_updated_at:N(),wood:N(),clay:N(),iron:N(),wheat:N(),building_fields:j()}).meta({id:`GetVillageBySlugDbRow`}),gS=L({tile_id:N(),tile_coordinates_x:N(),tile_coordinates_y:N(),bonuses_json:j(),oasis_graphics:N(),occupying_village_id:N().nullable(),occupying_village_coordinates_x:N().nullable(),occupying_village_coordinates_y:N().nullable(),occupying_village_name:j().nullable(),occupying_village_slug:j().nullable(),occupying_player_id:N().nullable(),occupying_player_name:j().nullable(),occupying_player_slug:j().nullable()}).meta({id:`GetOccupiableOasisInRangeRow`}),_S=e=>{let t=[];try{let n=e.building_fields?JSON.parse(e.building_fields):[];t=Array.isArray(n)?n.map(e=>mS.parse(e)):[]}catch{t=[]}let n={id:e.id,tileId:e.tile_id,playerId:e.player_id,name:e.name,slug:e.slug,coordinates:{x:e.coordinates_x,y:e.coordinates_y},lastUpdatedAt:e.last_updated_at,resources:{wood:e.wood,clay:e.clay,iron:e.iron,wheat:e.wheat},resourceFieldComposition:e.resource_field_composition,buildingFields:t.map(e=>({id:e.field_id,buildingId:e.building_id,level:e.level}))};return fS.parse(n)},vS=e=>{let{oasisResource:t}=mf(e.oasis_graphics),n=JSON.parse(e.bonuses_json),r=n.at(0),i=n.at(1),a=[{resource:t,bonus:r}];return i&&a.push({resource:`wheat`,bonus:25}),ly.parse({oasis:{id:e.tile_id,coordinates:{x:e.tile_coordinates_x,y:e.tile_coordinates_y},bonuses:a},player:e.occupying_player_id===null||e.occupying_player_name===null||e.occupying_player_slug===null?null:{id:e.occupying_player_id,name:e.occupying_player_name,slug:e.occupying_player_slug},village:e.occupying_village_id===null||e.occupying_village_coordinates_x===null||e.occupying_village_coordinates_y===null||e.occupying_village_name===null||e.occupying_village_slug===null?null:{id:e.occupying_village_id,coordinates:{x:e.occupying_village_coordinates_x,y:e.occupying_village_coordinates_y},name:e.occupying_village_name,slug:e.occupying_village_slug}})},yS=Q(`/villages/:villageSlug`,{summary:`Get village by slug`,requestParams:{path:L({villageSlug:j()})},response:fS})(({database:e,path:{villageSlug:t}})=>{let n=e.selectObject({sql:`
  SELECT
    v.id,
    v.tile_id,
    v.player_id,
    t.x AS coordinates_x,
    t.y AS coordinates_y,
    v.name,
    v.slug,
    rs.updated_at AS last_updated_at,
    rs.wood AS wood,
    rs.clay AS clay,
    rs.iron AS iron,
    rs.wheat AS wheat,
    rfc.resource_field_composition AS resource_field_composition,
    (
      SELECT
        JSON_GROUP_ARRAY(
          JSON_OBJECT(
            'field_id', bf.field_id,
            'building_id', bi.building,
            'level', bf.level
          )
        )
      FROM
        building_fields bf
          LEFT JOIN building_ids bi ON bi.id = bf.building_id
      WHERE
        bf.village_id = v.id
    ) AS building_fields
  FROM
    villages v
      JOIN tiles t ON t.id = v.tile_id
      LEFT JOIN resource_sites rs ON rs.tile_id = v.tile_id
      LEFT JOIN resource_field_composition_ids rfc ON t.resource_field_composition_id = rfc.id
  WHERE
    v.slug = $slug
  LIMIT 1;
`,bind:{$slug:t},schema:hS});return _S(n)}),bS=Q(`/villages/:villageId/occupiable-oasis`,{summary:`Get occupiable oasis in range`,requestParams:{path:L({villageId:B()})},response:I(ly)})(({database:e,path:{villageId:t}})=>e.selectObjects({sql:`
  WITH
    src_village AS (
      SELECT t.id AS vtile, t.x AS vx, t.y AS vy
      FROM
        villages v
          JOIN tiles t ON t.id = v.tile_id
      WHERE
        v.id = $village_id
      LIMIT 1
    ),

    oasis_agg AS (
      SELECT
        ot.id AS tile_id,
        ot.x AS x,
        ot.y AS y,
        ot.oasis_graphics AS oasis_graphics,
        JSON_GROUP_ARRAY(o.bonus) AS bonuses_json,
        MAX(o.village_id) AS occupying_village_id
      FROM
        tiles ot
          JOIN tile_type_ids ott ON ott.id = ot.type_id
          JOIN src_village sv ON 1 = 1
          JOIN oasis o ON o.tile_id = ot.id
      WHERE
        ott.type = 'oasis'
        AND ot.x BETWEEN sv.vx - $radius AND sv.vx + $radius
        AND ot.y BETWEEN sv.vy - $radius AND sv.vy + $radius
      GROUP BY ot.id
    )

  SELECT
    oa.tile_id,
    oa.x AS tile_coordinates_x,
    oa.y AS tile_coordinates_y,
    oa.oasis_graphics,
    oa.bonuses_json,
    oa.occupying_village_id,
    v2.name AS occupying_village_name,
    v2.slug AS occupying_village_slug,
    vt2.x AS occupying_village_coordinates_x,
    vt2.y AS occupying_village_coordinates_y,
    p.id AS occupying_player_id,
    p.name AS occupying_player_name,
    p.slug AS occupying_player_slug
  FROM
    oasis_agg oa
      CROSS JOIN src_village sv
      LEFT JOIN villages v2 ON v2.id = oa.occupying_village_id
      LEFT JOIN tiles vt2 ON vt2.id = v2.tile_id
      LEFT JOIN players p ON p.id = v2.player_id
  ORDER BY
    (ABS(oa.x - sv.vx) + ABS(oa.y - sv.vy)),
    oa.tile_id;
`,bind:{$village_id:t,$radius:3},schema:gS}).map(vS)),xS=Q(`/villages/:villageId/gatherers-hut/expeditions`,{summary:`Get Gatherers Hut expeditions`,requestParams:{path:L({villageId:B()})},response:pS})(({database:e,path:{villageId:t}})=>{let n=e.selectValue({sql:`
        SELECT COALESCE((
          SELECT completed
          FROM
            gatherers_hut_expeditions
          WHERE
            village_id = $village_id
        ), 0);
      `,bind:{$village_id:t},schema:N()});return pS.parse({completed:n})}),SS=Q(`/villages/:villageId/building-fields`,`patch`,{summary:`Rearrange building fields`,requestParams:{path:L({villageId:B()})},requestBody:I(L({buildingFieldId:N(),buildingId:H.nullable(),sourceBuildingFieldId:N().nullable()}))})(({database:e,path:{villageId:t},body:n})=>{e.transaction(()=>{if(e.exec({sql:Eu}),e.exec({sql:`
  CREATE TEMP TABLE temp_rearrange_source_fields AS
  SELECT bf.field_id, bf.building_id, bi.building AS building_text, bf.level
  FROM
    building_fields bf
      JOIN building_ids bi ON bi.id = bf.building_id
  WHERE
    bf.village_id = $village_id
    AND bf.field_id BETWEEN 19 AND 38
    AND bf.building_id IS NOT NULL;
`,bind:{$village_id:t}}),e.selectValue({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
  ),
  updates AS (
    SELECT ur.field_id, bi.id AS building_id, ur.source_field_id
    FROM updates_raw ur
    LEFT JOIN building_ids bi ON bi.building = ur.building_text
    WHERE ur.field_id BETWEEN 19 AND 38
  )
  SELECT COUNT(*)
  FROM updates u
  LEFT JOIN temp_rearrange_source_fields sf
    ON sf.field_id = u.source_field_id
    AND sf.building_id = u.building_id
  WHERE
    u.building_id IS NOT NULL
    AND (
      u.source_field_id IS NULL
      OR sf.field_id IS NULL
    );
`,bind:{$updates:JSON.stringify(n)},schema:N()})>0)throw Error(`Invalid rearranged building source field`);if(e.selectValue({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
  ),
  updates AS (
    SELECT ur.field_id, bi.id AS building_id, ur.source_field_id
    FROM updates_raw ur
    LEFT JOIN building_ids bi ON bi.building = ur.building_text
    WHERE ur.field_id BETWEEN 19 AND 38
  )
  SELECT COUNT(*)
  FROM (
    SELECT u.source_field_id
    FROM updates u
    WHERE
      u.building_id IS NOT NULL
      AND u.source_field_id IS NOT NULL
    GROUP BY u.source_field_id
    HAVING COUNT(*) > 1
  );
`,bind:{$updates:JSON.stringify(n)},schema:N()})>0)throw Error(`Duplicate rearranged building source field`);e.exec({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
  ),
  updates AS (
    SELECT ur.field_id
    FROM updates_raw ur
    WHERE ur.field_id BETWEEN 19 AND 38
  )
  DELETE
  FROM
    building_fields
  WHERE
    village_id = $village_id
    AND EXISTS (
      SELECT 1
      FROM updates u
      WHERE u.field_id = building_fields.field_id
    );
`,bind:{$village_id:t,$updates:JSON.stringify(n)}}),e.exec({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
  ),
  updates AS (
    SELECT ur.field_id, bi.id AS building_id, ur.source_field_id
    FROM updates_raw ur
    LEFT JOIN building_ids bi ON bi.building = ur.building_text
    WHERE ur.field_id BETWEEN 19 AND 38
  ),
  new_occupied_state AS (
    SELECT
      u.field_id,
      u.building_id,
      COALESCE(
        (
          SELECT sf.level
          FROM temp_rearrange_source_fields sf
          WHERE sf.field_id = u.source_field_id
            AND sf.building_id = u.building_id
          LIMIT 1
        ),
        (
          SELECT sf.level
          FROM temp_rearrange_source_fields sf
          WHERE sf.building_id = u.building_id
            AND EXISTS (
              SELECT 1
              FROM updates source_update
              WHERE source_update.field_id = sf.field_id
                AND (
                  source_update.building_id IS NULL
                  OR source_update.building_id <> sf.building_id
                )
            )
          LIMIT 1
        ),
        (
          SELECT sf.level
          FROM temp_rearrange_source_fields sf
          WHERE sf.field_id = u.field_id
            AND sf.building_id = u.building_id
          LIMIT 1
        ),
        0
      ) as level
    FROM updates u
    WHERE u.building_id IS NOT NULL
  )
  INSERT INTO building_fields (village_id, field_id, building_id, level)
  SELECT $village_id, field_id, building_id, level
  FROM new_occupied_state;
`,bind:{$village_id:t,$updates:JSON.stringify(n)}}),e.exec({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
  ),
  updates AS (
    SELECT ur.field_id, bi.id AS building_id, ur.source_field_id
    FROM updates_raw ur
    LEFT JOIN building_ids bi ON bi.building = ur.building_text
    WHERE ur.field_id BETWEEN 19 AND 38
  ),
  moved_fields AS (
    SELECT
      COALESCE(
        (
          SELECT sf.field_id
          FROM temp_rearrange_source_fields sf
          WHERE sf.field_id = u.source_field_id
            AND sf.building_id = u.building_id
          LIMIT 1
        ),
        (
          SELECT sf.field_id
          FROM temp_rearrange_source_fields sf
          WHERE sf.building_id = u.building_id
            AND EXISTS (
              SELECT 1
              FROM updates source_update
              WHERE source_update.field_id = sf.field_id
                AND (
                  source_update.building_id IS NULL
                  OR source_update.building_id <> sf.building_id
                )
            )
          LIMIT 1
        ),
        (
          SELECT sf.field_id
          FROM temp_rearrange_source_fields sf
          WHERE sf.field_id = u.field_id
            AND sf.building_id = u.building_id
          LIMIT 1
        )
      ) AS source_field_id,
      u.field_id AS target_field_id
    FROM updates u
    WHERE u.building_id IS NOT NULL
  )
  UPDATE effects
  SET source_specifier = (
    SELECT mf.target_field_id
    FROM moved_fields mf
    WHERE mf.source_field_id = effects.source_specifier
  )
  WHERE
    tile_id = (SELECT tile_id FROM villages WHERE id = $village_id)
    AND scope_id = (SELECT id FROM effect_scope_ids WHERE scope = 'local')
    AND source_id = (SELECT id FROM effect_source_ids WHERE source = 'building')
    AND source_specifier IN (
      SELECT source_field_id
      FROM moved_fields
      WHERE source_field_id IS NOT NULL
    );
`,bind:{$village_id:t,$updates:JSON.stringify(n)}}),e.exec({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
    WHERE CAST(value ->> '$.buildingFieldId' AS INTEGER) BETWEEN 19 AND 38
  )
  UPDATE events
  SET
    meta = JSON_SET(meta, '$.buildingFieldId', ur.field_id)
  FROM updates_raw ur
  WHERE
    events.village_id = $village_id
    AND events.type IN ('buildingConstruction', 'buildingLevelChange', 'buildingDestruction')
    AND JSON_EXTRACT(meta, '$.buildingId') = ur.building_text
    AND (
      (
        ur.source_field_id IS NOT NULL
        AND CAST(JSON_EXTRACT(meta, '$.buildingFieldId') AS INTEGER) = ur.source_field_id
      )
      OR ur.source_field_id IS NULL
    )
    AND ur.building_text IS NOT NULL;
`,bind:{$village_id:t,$updates:JSON.stringify(n)}}),e.exec({sql:`
  WITH updates_raw(field_id, building_text, source_field_id) AS (
    SELECT
      CAST(value ->> '$.buildingFieldId' AS INTEGER),
      value ->> '$.buildingId',
      CAST(value ->> '$.sourceBuildingFieldId' AS INTEGER)
    FROM JSON_EACH($updates)
    WHERE CAST(value ->> '$.buildingFieldId' AS INTEGER) BETWEEN 19 AND 38
  )
  UPDATE scheduled_building_upgrades
  SET building_field_id = ur.field_id
  FROM updates_raw ur
  JOIN building_ids bi ON bi.building = ur.building_text
  WHERE
    scheduled_building_upgrades.village_id = $village_id
    AND scheduled_building_upgrades.building_id = bi.id
    AND (
      (
        ur.source_field_id IS NOT NULL
        AND scheduled_building_upgrades.building_field_id = ur.source_field_id
      )
      OR ur.source_field_id IS NULL
    )
    AND ur.building_text IS NOT NULL;
`,bind:{$village_id:t,$updates:JSON.stringify(n)}}),e.exec({sql:Eu})})}),CS=e=>`
  SELECT
    wi.item_id,
    t.x,
    t.y,
    vt.x AS vx,
    vt.y AS vy
  FROM
    world_items wi
      JOIN tiles t ON t.id = wi.tile_id
      JOIN villages v ON v.id = $village_id
      JOIN tiles vt ON vt.id = v.tile_id
  WHERE
    wi.item_id IN (${e.join(`,`)});
`,wS=e=>uv.parse({id:e.item_id,coordinates:{x:e.x,y:e.y},distance:Dd(Ed({x:e.x,y:e.y},{x:e.vx,y:e.vy}),2),amount:1}),TS=L({item_id:N(),x:N(),y:N(),vx:N(),vy:N()}).meta({id:`GetArtifactsAroundVillageRow`}),ES=y_.map(e=>e.id),DS=Q(`/villages/:villageId/artifacts`,{summary:`Get artifacts around village`,requestParams:{path:L({villageId:B()})},response:I(uv)})(({database:e,path:{villageId:t}})=>e.selectObjects({sql:CS(ES),bind:{$village_id:t},schema:TS}).map(wS)),$=e=>({path:e.path,method:e.method.toUpperCase(),controller:e}),OS=[$(Ax),$(Vg),$(Hg),$(Gg),$(Wg),$(Ug),$(Kg),$(qg),$(Jg),$(I_),$(L_),$(R_),$(z_),$(B_),$(G_),$(U_),$(W_),$(V_),$(H_),$(lS),$(Yy),$(Xy),$(Zy),$(Tv),$(Ev),$(Dv),$(Ov),$(Sv),$(Cv),$(wv),$(u_),$(l_),$(d_),$(f_),$(v_),$(p_),$(m_),$(__),$(h_),$(g_),$(Ry),$(zy),$($g),$(e_),$(t_),$(n_),$(Sy),$(Oy),$(Cy),$(wy),$(yS),$(xS),$(Ty),$(Ey),$(ky),$(Xg),$(Zg),$(Qg),$(Dy),$(Ay),$(jy),$(Ny),$(My),$(ay),$(oy),$(bS),$(SS),$(Ex),$(Dx),$(Ox),$(kx),$(dS),$(zv),$(Bv),$(Vv),$(Hv),$(Nv),$(Pv),$(DS),$(jg),$(Mg),$(fx),$(px),$(mx),$(hx),$(iy),$(Qv),$(Vx),$(Hx),$(Ux),$(Sx),$(iv),$(ev),$(nv),$(tv),$(tS),$(nS),$(eS),$(rS),$(Gx)],kS={};for(let e of OS)kS[e.path]??={},kS[e.path][e.controller.method]=e.controller.operation;const AS=OS.map(e=>({...e,matcher:(0,Dg.match)(e.path,{decode:!1})})),jS=new Map,MS=new Map,NS=e=>{let t=+!!e.startsWith(`/`),n=e.indexOf(`/`,t);return n===-1?e.slice(t):e.slice(t,n)},PS=(e,t)=>{let n=NS(e);return n.startsWith(`:`)||n.startsWith(`*`)||n===t},FS=e=>{let t=e.toUpperCase(),n=jS.get(t);return n||(n=AS.filter(e=>e.method===t),jS.set(t,n)),n},IS=(e,t)=>{let n=FS(e),r=NS(t),i=MS.get(e);i||(i=new Map,MS.set(e,i));let a=i.get(r);return a||(a=n.filter(e=>PS(e.path,r)),i.set(r,a)),a},LS=(e,t,n)=>{let r=e.indexOf(`?`),i=r===-1?e:e.slice(0,r),a=r===-1?void 0:e.slice(r+1),o=t.toUpperCase(),s=i.replace(/^\/me(?=\/|$)/,`/players/1`),c=IS(o,s);for(let t of c){let r=t.matcher(s);if(!r)continue;let{params:i}=r,o=t.controller.operation,c=o?.requestParams,l={};if(a)for(let[e,t]of new URLSearchParams(a)){let n=l[e];n===void 0?l[e]=t:Array.isArray(n)?n.push(t):l[e]=[n,t]}let u=c?.path?Ks(c.path,i):i,d=c?.query?Ks(c.query,l):l,f=kg(o?.requestBody),p=f?Ks(f,n):n;return{controller:t.controller,path:u,query:d,body:p,url:e}}throw Error(`Cannot match route ${o}::${e}`)};var RS=`CREATE INDEX idx_trapper_cages_village_id ON trapper_cages (village_id);\r
\r
CREATE INDEX idx_trapper_cages_village_id_unit_id ON trapper_cages (village_id, unit_id);\r
`,zS=`CREATE INDEX IF NOT EXISTS idx_wounded_troops_village_id ON wounded_troops(village_id);\r
CREATE INDEX IF NOT EXISTS idx_wounded_troops_unit_id ON wounded_troops(unit_id);\r
`,BS=`CREATE TABLE battle_report_buildings\r
(\r
  report_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  level_before INTEGER NOT NULL CHECK (level_before >= 0),\r
  level_after INTEGER NOT NULL CHECK (level_after >= 0),\r
\r
  CHECK (level_after <= level_before),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id)\r
) STRICT;\r
`,VS=`CREATE TABLE battle_report_participants\r
(\r
  id INTEGER PRIMARY KEY,\r
  battle_id INTEGER NOT NULL,\r
  player_id INTEGER,\r
  tile_id INTEGER NOT NULL,\r
\r
  FOREIGN KEY (battle_id) REFERENCES battle_reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE,\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
) STRICT;\r
`,HS=`CREATE TABLE battle_report_units\r
(\r
  battle_participant_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  amount_before INTEGER NOT NULL CHECK (amount_before >= 0),\r
  amount_after INTEGER NOT NULL CHECK (amount_after >= 0),\r
  amount_hospitalized INTEGER NOT NULL DEFAULT 0 CHECK (amount_hospitalized >= 0),\r
  amount_imprisoned INTEGER NOT NULL DEFAULT 0 CHECK (amount_imprisoned >= 0),\r
\r
  PRIMARY KEY (battle_participant_id, unit_id),\r
  CHECK (amount_after <= amount_before),\r
  CHECK (amount_hospitalized <= amount_before - amount_after),\r
  CHECK (amount_imprisoned <= amount_before - amount_after),\r
\r
  FOREIGN KEY (battle_participant_id) REFERENCES battle_report_participants (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id) ON DELETE CASCADE\r
) STRICT;\r
`,US=`CREATE TABLE battle_reports\r
(\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE,\r
  origin_tile_id INTEGER NOT NULL,\r
  target_tile_id INTEGER NOT NULL,\r
  -- boolean\r
  is_raid INTEGER NOT NULL CHECK (is_raid IN (0, 1)),\r
  loot_wood INTEGER NOT NULL CHECK (loot_wood >= 0),\r
  loot_clay INTEGER NOT NULL CHECK (loot_clay >= 0),\r
  loot_iron INTEGER NOT NULL CHECK (loot_iron >= 0),\r
  loot_wheat INTEGER NOT NULL CHECK (loot_wheat >= 0),\r
  -- boolean\r
  can_attacker_see_full_report INTEGER NOT NULL CHECK (can_attacker_see_full_report IN (0, 1)),\r
  attacker_points INTEGER NOT NULL CHECK (attacker_points >= 0),\r
  defender_points INTEGER NOT NULL CHECK (defender_points >= 0),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (origin_tile_id) REFERENCES tiles (id),\r
  FOREIGN KEY (target_tile_id) REFERENCES tiles (id)\r
) STRICT;\r
`,WS=`CREATE TABLE gathering_expedition_report_units (\r
  gathering_expedition_report_id INTEGER NOT NULL REFERENCES gathering_expedition_reports(id) ON DELETE CASCADE,\r
  unit_id INTEGER NOT NULL REFERENCES unit_ids(id),\r
  amount INTEGER NOT NULL,\r
  PRIMARY KEY (gathering_expedition_report_id, unit_id)\r
) STRICT, WITHOUT ROWID;\r
`,GS=`CREATE TABLE gathering_expedition_reports (\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE REFERENCES reports(id) ON DELETE CASCADE,\r
  village_tile_id INTEGER NOT NULL REFERENCES tiles(id),\r
  tribe_id INTEGER NOT NULL REFERENCES tribe_ids(id),\r
  loot_wood INTEGER NOT NULL,\r
  loot_clay INTEGER NOT NULL,\r
  loot_iron INTEGER NOT NULL,\r
  loot_wheat INTEGER NOT NULL\r
) STRICT;\r
`,KS=`CREATE TABLE hero_adventure_reports\r
(\r
  report_id INTEGER PRIMARY KEY,\r
  adventure_id INTEGER NOT NULL CHECK (adventure_id >= 0),\r
  item_id INTEGER,\r
  item_amount INTEGER CHECK (item_amount > 0),\r
  health_before INTEGER NOT NULL CHECK (health_before BETWEEN 0 AND 100),\r
  health_after INTEGER NOT NULL CHECK (health_after BETWEEN 0 AND 100),\r
\r
  CHECK ((item_id IS NULL) = (item_amount IS NULL)),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE\r
) STRICT;\r
`,qS=`CREATE TABLE IF NOT EXISTS scheduled_building_construction_cancellation_history\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  field_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  level INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id),\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id)\r
) STRICT;\r
\r
CREATE INDEX IF NOT EXISTS idx_scheduled_building_construction_cancellation_history_village_id ON scheduled_building_construction_cancellation_history(village_id);\r
`,JS=`CREATE TABLE hunting_party_report_units (\r
  hunting_party_report_id INTEGER NOT NULL REFERENCES hunting_party_reports(id) ON DELETE CASCADE,\r
  unit_id INTEGER NOT NULL REFERENCES unit_ids(id),\r
  amount INTEGER NOT NULL,\r
  PRIMARY KEY (hunting_party_report_id, unit_id)\r
) STRICT, WITHOUT ROWID;\r
`,YS=`CREATE TABLE hunting_party_reports (\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE REFERENCES reports(id) ON DELETE CASCADE,\r
  village_tile_id INTEGER NOT NULL REFERENCES tiles(id)\r
) STRICT;\r
`,XS=`CREATE TABLE building_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  building TEXT NOT NULL UNIQUE CHECK (building IN ('BARRACKS', 'GREAT_BARRACKS', 'STABLE', 'GREAT_STABLE', 'WORKSHOP', 'HOSPITAL', 'ASCLEPEION', 'CLAY_PIT', 'WHEAT_FIELD', 'WOODCUTTER', 'IRON_MINE', 'BAKERY', 'BRICKYARD', 'GRAIN_MILL', 'GRANARY', 'GREAT_GRANARY', 'IRON_FOUNDRY', 'SAWMILL', 'WAREHOUSE', 'GREAT_WAREHOUSE', 'WATERWORKS', 'ACADEMY', 'ROMAN_WALL', 'TEUTONIC_WALL', 'HEROS_MANSION', 'HUN_WALL', 'GAUL_WALL', 'RALLY_POINT', 'EGYPTIAN_WALL', 'TRAPPER', 'BREWERY', 'COMMAND_CENTER', 'CRANNY', 'HORSE_DRINKING_TROUGH', 'MAIN_BUILDING', 'MARKETPLACE', 'RESIDENCE', 'TOURNAMENT_SQUARE', 'TRADE_OFFICE', 'SMITHY', 'TOWN_HALL', 'EMBASSY', 'TREASURY', 'GATHERERS_HUT', 'HUNTERS_LODGE', 'SPARTAN_WALL', 'NATAR_WALL', 'NATURE_WALL'))\r
) STRICT;\r
\r
CREATE INDEX idx_building_ids_building ON building_ids(building);\r
`,ZS=`CREATE TABLE report_outcome_ids\r
(\r
    id INTEGER PRIMARY KEY,\r
    report_outcome TEXT NOT NULL UNIQUE CHECK (report_outcome IN (\r
        'attackerNoLoss',\r
        'attackerSomeLoss',\r
        'attackerFullLoss',\r
        'defenderNoLoss',\r
        'defenderSomeLoss',\r
        'defenderFullLoss',\r
        'scoutAttackerNoLoss',\r
        'scoutAttackerSomeLoss',\r
        'scoutAttackerFullLoss',\r
        'scoutDefenderNoLoss',\r
        'scoutDefenderSomeLoss',\r
        'scoutDefenderFullLoss',\r
        'outgoingMerchantsArrived',\r
        'incomingMerchantsArrived',\r
        'heroAdventure',\r
        'troopMovement',\r
        'huntingParty',\r
        'gatheringExpedition'\r
    ))\r
) STRICT;\r
`,QS=`CREATE TABLE report_tag_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  tag TEXT NOT NULL UNIQUE CHECK (tag IN ('read', 'archived'))\r
) STRICT;\r
`,$S=`CREATE TABLE report_type_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  report_type TEXT NOT NULL UNIQUE CHECK (report_type IN ('battle', 'adventure', 'trade', 'movement', 'huntingParty', 'gatheringExpedition', 'scouting'))\r
) STRICT;\r
\r
CREATE INDEX idx_report_type_ids_report_type ON report_type_ids(report_type);\r
`,eC=`CREATE TABLE movement_report_units\r
(\r
  movement_report_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL CHECK (amount >= 0),\r
\r
  PRIMARY KEY (movement_report_id, unit_id),\r
  FOREIGN KEY (movement_report_id) REFERENCES movement_reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT;\r
`,tC=`CREATE TABLE movement_reports\r
(\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE,\r
  origin_tile_id INTEGER NOT NULL,\r
  target_tile_id INTEGER NOT NULL,\r
  movement_type TEXT NOT NULL CHECK (movement_type IN ('reinforcement', 'relocation')),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (origin_tile_id) REFERENCES tiles (id),\r
  FOREIGN KEY (target_tile_id) REFERENCES tiles (id)\r
) STRICT;\r
`,nC=`CREATE TABLE report_tags\r
(\r
  report_id INTEGER NOT NULL,\r
  report_tag_id INTEGER NOT NULL,\r
\r
  PRIMARY KEY (report_id, report_tag_id),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (report_tag_id) REFERENCES report_tag_ids (id) ON DELETE CASCADE\r
) STRICT;\r
`,rC=`CREATE TABLE reports\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
  type_id INTEGER NOT NULL,\r
  report_outcome_id INTEGER NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE,\r
  FOREIGN KEY (type_id) REFERENCES report_type_ids (id),\r
  FOREIGN KEY (report_outcome_id) REFERENCES report_outcome_ids (id)\r
) STRICT;\r
`,iC=`CREATE TABLE IF NOT EXISTS scheduled_building_upgrades\r
(\r
  id INTEGER PRIMARY KEY AUTOINCREMENT,\r
  building_id INTEGER NOT NULL,\r
  village_id INTEGER NOT NULL,\r
  building_field_id INTEGER NOT NULL,\r
  level INTEGER NOT NULL CHECK (level >= 1),\r
  queue_position INTEGER NOT NULL DEFAULT 0,\r
\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id),\r
  FOREIGN KEY (village_id) REFERENCES villages (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE\r
);\r
\r
CREATE INDEX IF NOT EXISTS idx_scheduled_building_upgrades_village_order\r
  ON scheduled_building_upgrades (village_id, queue_position);\r
\r
CREATE INDEX IF NOT EXISTS idx_scheduled_building_upgrades_field_level\r
  ON scheduled_building_upgrades (village_id, building_field_id, level);\r
`,aC=`CREATE TABLE scouting_report_attacker_units\r
(\r
  scouting_report_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  amount_before INTEGER NOT NULL CHECK (amount_before >= 0),\r
  amount_after INTEGER NOT NULL CHECK (amount_after >= 0),\r
  PRIMARY KEY (scouting_report_id, unit_id),\r
  CHECK (amount_after <= amount_before),\r
  FOREIGN KEY (scouting_report_id) REFERENCES scouting_reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT;\r
`,oC=`CREATE TABLE scouting_report_structures\r
(\r
  scouting_report_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  level INTEGER NOT NULL CHECK (level >= 0),\r
\r
  PRIMARY KEY (scouting_report_id, building_id),\r
\r
  FOREIGN KEY (scouting_report_id) REFERENCES scouting_reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id)\r
) STRICT;\r
`,sC=`CREATE TABLE scouting_report_units\r
(\r
  scouting_report_id INTEGER NOT NULL,\r
  role TEXT NOT NULL CHECK (role IN ('defender', 'reinforcement')),\r
  tile_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL CHECK (amount >= 0),\r
\r
  PRIMARY KEY (scouting_report_id, role, tile_id, unit_id),\r
\r
  FOREIGN KEY (scouting_report_id) REFERENCES scouting_reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id),\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
) STRICT;\r
`,cC=`CREATE TABLE scouting_reports\r
(\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE,\r
  origin_tile_id INTEGER NOT NULL,\r
  target_tile_id INTEGER NOT NULL,\r
  perspective TEXT NOT NULL CHECK (perspective IN ('attacker', 'defender')),\r
  successful INTEGER NOT NULL CHECK (successful IN (0, 1)),\r
  scouting_target TEXT NOT NULL CHECK (scouting_target IN ('resources', 'defensiveStructures')),\r
  wood INTEGER CHECK (wood >= 0),\r
  clay INTEGER CHECK (clay >= 0),\r
  iron INTEGER CHECK (iron >= 0),\r
  wheat INTEGER CHECK (wheat >= 0),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (origin_tile_id) REFERENCES tiles (id),\r
  FOREIGN KEY (target_tile_id) REFERENCES tiles (id)\r
) STRICT;\r
`,lC=`CREATE TABLE trade_reports\r
(\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE,\r
  origin_tile_id INTEGER NOT NULL,\r
  target_tile_id INTEGER NOT NULL,\r
  wood INTEGER NOT NULL CHECK (wood >= 0),\r
  clay INTEGER NOT NULL CHECK (clay >= 0),\r
  iron INTEGER NOT NULL CHECK (iron >= 0),\r
  wheat INTEGER NOT NULL CHECK (wheat >= 0),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (origin_tile_id) REFERENCES tiles (id),\r
  FOREIGN KEY (target_tile_id) REFERENCES tiles (id)\r
) STRICT;\r
`,uC=`CREATE TABLE trapper_cages\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  unit_id INTEGER,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
    ON DELETE SET NULL\r
    ON UPDATE CASCADE\r
) STRICT;\r
`,dC=`CREATE TABLE IF NOT EXISTS wounded_troops\r
(\r
  village_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL CHECK (amount > 0),\r
  updated_at INTEGER NOT NULL,\r
\r
  PRIMARY KEY (village_id, unit_id),\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT;\r
`;const fC=e=>{let t=``;for(let n of e)t+=n.toString(16).padStart(2,`0`);return t},pC=e=>e===null?`NULL`:typeof e==`number`||typeof e==`bigint`?String(e):typeof e==`string`?`'${e.replaceAll(`'`,`''`)}'`:e instanceof ArrayBuffer?`X'${fC(new Uint8Array(e))}'`:`X'${fC(new Uint8Array(e.buffer,e.byteOffset,e.byteLength))}'`,mC=(e,t,n,r)=>{if(r.length===0)return;let i=n.length;if(i===0)throw Error(`columns must not be empty`);let a=Math.floor(32766/i);a<1&&(a=1),a=Math.min(a,500);let o=`INSERT INTO ${t} (${n.join(`, `)}) VALUES `,s=r.length;for(let t=0;t<s;t+=a){let n=Math.min(s,t+a),c=o;for(let e=t;e<n;e+=1){let n=r[e];e>t&&(c+=`,`),c+=`(`;for(let e=0;e<i;e+=1)e>0&&(c+=`,`),c+=pC(n[e]);c+=`)`}e.exec({sql:`${c};`})}},hC=e=>{let t=H.options;mC(e,`building_ids`,[`building`],t.map(e=>[e]))},gC={PROD:!0,DEV:!1,MODE:`production`,VERSION:`0.4.62`,GRAPHICS_VERSION:`0.1.2`,VITE_FARO_INGEST_ENDPOINT:void 0,URL:void 0,DEPLOY_URL:void 0,DEPLOY_PRIME_URL:void 0,COMMIT_REF:void 0,HEAD:void 0},_C=e=>{let t=sb.options;mC(e,`report_outcome_ids`,[`report_outcome`],t.map(e=>[e]))},vC=e=>{let t=cb.options;mC(e,`report_tag_ids`,[`tag`],t.map(e=>[e]))},yC=e=>{mC(e,`report_type_ids`,[`report_type`],ob.options.map(e=>[e]))};var bC=`CREATE TRIGGER IF NOT EXISTS battle_report_units_create_wounded_troops_after_insert\r
AFTER INSERT ON battle_report_units\r
WHEN\r
  NEW.amount_before > NEW.amount_after\r
  AND NEW.unit_id IN (\r
    SELECT id\r
    FROM unit_ids\r
    WHERE unit IN (\r
      'LEGIONNAIRE',\r
      'PRAETORIAN',\r
      'IMPERIAN',\r
      'ROMAN_SCOUT',\r
      'EQUITES_IMPERATORIS',\r
      'EQUITES_CAESARIS',\r
      'PHALANX',\r
      'SWORDSMAN',\r
      'GAUL_SCOUT',\r
      'THEUTATES_THUNDER',\r
      'DRUIDRIDER',\r
      'HAEDUAN',\r
      'CLUBSWINGER',\r
      'SPEARMAN',\r
      'AXEMAN',\r
      'TEUTONIC_SCOUT',\r
      'PALADIN',\r
      'TEUTONIC_KNIGHT',\r
      'MERCENARY',\r
      'BOWMAN',\r
      'HUN_SCOUT',\r
      'STEPPE_RIDER',\r
      'MARKSMAN',\r
      'MARAUDER',\r
      'SLAVE_MILITIA',\r
      'ASH_WARDEN',\r
      'KHOPESH_WARRIOR',\r
      'EGYPTIAN_SCOUT',\r
      'ANHUR_GUARD',\r
      'RESHEPH_CHARIOT',\r
      'HOPLITE',\r
      'SHIELDSMAN',\r
      'SPARTAN_SCOUT',\r
      'TWINSTEEL_THERION',\r
      'ELPIDA_RIDER',\r
      'CORINTHIAN_CRUSHER',\r
      'PIKEMAN',\r
      'THORNED_WARRIOR',\r
      'GUARDSMAN',\r
      'NATARIAN_SCOUT',\r
      'AXERIDER',\r
      'NATARIAN_KNIGHT'\r
    )\r
  )\r
BEGIN\r
  UPDATE battle_report_units\r
  SET amount_hospitalized = COALESCE((\r
    SELECT\r
      CAST(\r
        (NEW.amount_before - NEW.amount_after) *\r
        CASE\r
          WHEN MAX(CASE WHEN bi.building = 'ASCLEPEION' THEN 1 ELSE 0 END) = 1\r
            THEN 0.6\r
          ELSE 0.4\r
        END\r
        AS INTEGER\r
      ) AS wounded_amount\r
    FROM\r
      battle_report_participants brp\r
        JOIN battle_reports br ON br.id = brp.battle_id\r
        JOIN villages v ON v.tile_id = brp.tile_id\r
          AND v.player_id = brp.player_id\r
        JOIN building_fields bf ON bf.village_id = v.id\r
          AND bf.level > 0\r
        JOIN building_ids bi ON bi.id = bf.building_id\r
          AND bi.building IN ('HOSPITAL', 'ASCLEPEION')\r
    WHERE\r
      brp.id = NEW.battle_participant_id\r
      AND brp.player_id = 1\r
      AND brp.tile_id IN (br.origin_tile_id, br.target_tile_id)\r
    GROUP BY\r
      v.id\r
  ), 0)\r
  WHERE\r
    battle_participant_id = NEW.battle_participant_id\r
    AND unit_id = NEW.unit_id;\r
\r
  INSERT INTO wounded_troops (village_id, unit_id, amount, updated_at)\r
  SELECT\r
    v.id,\r
    NEW.unit_id,\r
    bru.amount_hospitalized AS wounded_amount,\r
    r.timestamp\r
  FROM\r
    battle_report_participants brp\r
      JOIN battle_reports br ON br.id = brp.battle_id\r
      JOIN battle_report_units bru ON bru.battle_participant_id = brp.id\r
        AND bru.unit_id = NEW.unit_id\r
      JOIN reports r ON r.id = br.report_id\r
      JOIN villages v ON v.tile_id = brp.tile_id\r
        AND v.player_id = brp.player_id\r
  WHERE\r
    brp.id = NEW.battle_participant_id\r
    AND brp.player_id = 1\r
    AND brp.tile_id IN (br.origin_tile_id, br.target_tile_id)\r
    AND bru.amount_hospitalized > 0\r
  ON CONFLICT (village_id, unit_id) DO UPDATE SET\r
    amount = wounded_troops.amount + EXCLUDED.amount,\r
    updated_at = EXCLUDED.updated_at;\r
END;\r
`;const xC=e=>{let t=e.selectValues({sql:`SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '%_ids' AND name NOT LIKE '%_history' AND name != 'meta';`,schema:j()});for(let n of t){let t=`trg_update_meta_on_${n}`;for(let r of[`INSERT`,`UPDATE`,`DELETE`]){let i=`
        CREATE TRIGGER IF NOT EXISTS ${t}_${r.toLowerCase()}
        AFTER ${r} ON ${n}
        
      BEGIN
        UPDATE meta SET last_write = unixepoch();
      END;
    
      `;e.exec({sql:i})}}},SC=e=>{e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS trg_building_level_change_history_update
      AFTER UPDATE OF level ON building_fields
      WHEN OLD.level <> NEW.level
      BEGIN
        INSERT INTO building_level_change_history
          (village_id, field_id, building_id, previous_level, new_level, timestamp)
        VALUES
          (OLD.village_id, OLD.field_id, OLD.building_id, OLD.level, NEW.level, unixepoch());
      END;
    `}),e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS trg_building_level_change_history_delete
      AFTER DELETE ON building_fields
      WHEN OLD.level > 0
      BEGIN
        INSERT INTO building_level_change_history
          (village_id, field_id, building_id, previous_level, new_level, timestamp)
        VALUES
          (OLD.village_id, OLD.field_id, OLD.building_id, OLD.level, 0, unixepoch());
      END;
    `}),e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS trg_unit_training_history_delete
      AFTER DELETE ON events
      WHEN OLD.type = 'troopTraining'
      BEGIN
        INSERT INTO unit_training_history
          (village_id, batch_id, unit_id, building_id, amount, timestamp)
        SELECT
          OLD.village_id,
          JSON_EXTRACT(OLD.meta, '$.batchId'),
          (SELECT id FROM unit_ids WHERE unit = JSON_EXTRACT(OLD.meta, '$.unitId')),
          (SELECT id FROM building_ids WHERE building = JSON_EXTRACT(OLD.meta, '$.buildingId')),
          1,
          unixepoch()
        ON CONFLICT(batch_id, unit_id) DO UPDATE SET
          amount = amount + 1,
          timestamp = unixepoch();
      END;
    `}),e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS trg_unit_improvement_history_update
      AFTER UPDATE OF level ON unit_improvements
      WHEN OLD.level <> NEW.level
      BEGIN
        INSERT INTO unit_improvement_history
          (player_id, unit_id, previous_level, new_level, timestamp)
        VALUES
          (OLD.player_id, OLD.unit_id, OLD.level, NEW.level, unixepoch());
      END;
    `}),e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS trg_unit_improvement_history_insert
      AFTER INSERT ON unit_improvements
      BEGIN
        INSERT INTO unit_improvement_history
          (player_id, unit_id, previous_level, new_level, timestamp)
        VALUES
          (NEW.player_id, NEW.unit_id, 0, NEW.level, unixepoch());
      END;
    `}),e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS trg_unit_research_history_insert
      AFTER INSERT ON unit_research
      BEGIN
        INSERT INTO unit_research_history
          (village_id, unit_id, timestamp)
        VALUES
          (NEW.village_id, NEW.unit_id, unixepoch());
      END;
    `})};var CC=`CREATE TRIGGER reports_delete_details_before_delete\r
BEFORE DELETE ON reports\r
BEGIN\r
  DELETE FROM report_tags WHERE report_id = OLD.id;\r
\r
  DELETE FROM scouting_report_units WHERE scouting_report_id IN (SELECT id FROM scouting_reports WHERE report_id = OLD.id);\r
  DELETE FROM scouting_report_attacker_units WHERE scouting_report_id IN (SELECT id FROM scouting_reports WHERE report_id = OLD.id);\r
  DELETE FROM scouting_report_structures WHERE scouting_report_id IN (SELECT id FROM scouting_reports WHERE report_id = OLD.id);\r
\r
  DELETE FROM battle_report_units\r
  WHERE battle_participant_id IN (\r
    SELECT bp.id\r
    FROM battle_report_participants bp\r
    JOIN battle_reports b ON b.id = bp.battle_id\r
    WHERE b.report_id = OLD.id\r
  );\r
\r
  DELETE FROM battle_report_participants\r
  WHERE battle_id IN (\r
    SELECT id FROM battle_reports WHERE report_id = OLD.id\r
  );\r
\r
  DELETE FROM battle_report_buildings WHERE report_id = OLD.id;\r
\r
  DELETE FROM movement_report_units\r
  WHERE movement_report_id IN (\r
    SELECT id FROM movement_reports WHERE report_id = OLD.id\r
  );\r
\r
  DELETE FROM hunting_party_report_units\r
  WHERE hunting_party_report_id IN (\r
    SELECT id FROM hunting_party_reports WHERE report_id = OLD.id\r
  );\r
\r
  DELETE FROM gathering_expedition_report_units\r
  WHERE gathering_expedition_report_id IN (\r
    SELECT id FROM gathering_expedition_reports WHERE report_id = OLD.id\r
  );\r
\r
  DELETE FROM hero_adventure_reports WHERE report_id = OLD.id;\r
  DELETE FROM movement_reports WHERE report_id = OLD.id;\r
  DELETE FROM trade_reports WHERE report_id = OLD.id;\r
  DELETE FROM battle_reports WHERE report_id = OLD.id;\r
  DELETE FROM hunting_party_reports WHERE report_id = OLD.id;\r
  DELETE FROM gathering_expedition_reports WHERE report_id = OLD.id;\r
  DELETE FROM scouting_reports WHERE report_id = OLD.id;\r
END;\r
`,wC=`CREATE TRIGGER reports_prune_oldest_before_insert\r
BEFORE INSERT ON reports\r
BEGIN\r
  DELETE FROM reports\r
  WHERE id IN (\r
    SELECT r.id\r
    FROM reports r\r
    WHERE NOT EXISTS (\r
      SELECT 1\r
      FROM report_tags rt\r
      JOIN report_tag_ids rti ON rti.id = rt.report_tag_id\r
      WHERE rt.report_id = r.id\r
        AND rti.tag = 'archived'\r
    )\r
    ORDER BY r.timestamp, r.id\r
    LIMIT MAX(\r
      (\r
        SELECT COUNT(*)\r
        FROM reports counted_report\r
        WHERE NOT EXISTS (\r
          SELECT 1\r
          FROM report_tags rt\r
          JOIN report_tag_ids rti ON rti.id = rt.report_tag_id\r
          WHERE rt.report_id = counted_report.id\r
            AND rti.tag = 'archived'\r
        )\r
      ) - 999,\r
      0\r
    )\r
  );\r
END;\r
`;const TC=e=>{let[t,n,r]=e.split(`.`);return[Number.parseInt(t,10),Number.parseInt(n,10),Number.parseInt(r,10)]},EC=e=>[Math.floor(e/1e6),Math.floor(e%1e6/1e3),e%1e3],DC=(e,t)=>{let[n,r,i]=EC(e),[a,o,s]=TC(t);if(n!==a||r!==o)return!1;let c=s-i;return c>=0&&c<20},OC=e=>{let[t,n,r]=TC(e);return t*1e6+n*1e3+r},kC=(e,t,n,r)=>{let i=OC(e),[,,a]=TC(e),[,,o]=EC(r);return o<a?(n(t),t.exec({sql:`PRAGMA user_version=${i};`}),i):r},AC=[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`,`CROCODILE`,`TIGER`,`ELEPHANT`],jC=[1,3,5,10,20,50],MC=[20,100,500,1e3,5e3,1e4,5e4,1e5],NC=[...AC.flatMap(e=>jC.map(t=>`captureAnimalCountById-${e}-${t}`)),`captureAnimalKindCount-${AC.length}`,...MC.map(e=>`gatheredResourceCount-${e}`)],PC=(e,t)=>{let n=OC(gC.VERSION);if(t===n)return;let r=t,i=(t,n)=>{r=kC(t,e,n,r)};i(`0.4.39`,e=>{e.exec({sql:`PRAGMA foreign_keys = OFF;`});try{e.transaction(e=>{e.exec({sql:`
            DELETE
            FROM
              effects
            WHERE
              source = 'oasis'
              AND EXISTS
              (
                SELECT
                  1
                FROM
                  villages
                WHERE
                  villages.id = effects.village_id
                  AND villages.player_id != $player_id
                );
          `,bind:{$player_id:1}}),e.exec({sql:`
            DELETE
            FROM
              effects
            WHERE
              source = 'oasis'
              AND type = 'base'
              AND scope = 'village'
              AND village_id IS NULL;
          `}),e.exec({sql:`
            WITH
              resource_effects(resource, effect) AS (
                VALUES
                  ('wood', 'woodProduction'),
                  ('clay', 'clayProduction'),
                  ('iron', 'ironProduction'),
                  ('wheat', 'wheatProduction')
                ),

              oasis_production AS (
                SELECT
                  tiles.tile_id,
                  re.effect,
                  CASE
                    WHEN MAX(o.bonus) = 50 THEN 80
                    WHEN MAX(o.bonus) = 25 THEN 40
                    ELSE 10
                    END AS value
                FROM
                  (
                    SELECT DISTINCT tile_id
                    FROM
                      oasis
                    ) tiles
                    CROSS JOIN resource_effects re
                    LEFT JOIN oasis o ON o.tile_id = tiles.tile_id
                    AND o.resource = re.resource
                GROUP BY
                  tiles.tile_id,
                  re.effect
                )

            INSERT
            INTO
              effects (effect_id, value, type, scope, source, village_id, source_specifier)
            SELECT
              ei.id,
              op.value,
              'base',
              'village',
              'oasis',
              NULL,
              op.tile_id
            FROM
              oasis_production op
                JOIN effect_ids ei ON ei.effect = op.effect
            WHERE
              op.value > 0;
          `}),e.exec({sql:`
            UPDATE effects
            SET
              scope = 'local'
            WHERE
              scope = 'village';
          `}),e.exec({sql:`
            CREATE TABLE IF NOT EXISTS effect_type_ids
            (
              id INTEGER PRIMARY KEY,
              type TEXT NOT NULL UNIQUE
            );
          `}),e.exec({sql:`
            INSERT OR IGNORE INTO
              effect_type_ids (id, type)
            VALUES
              (1, 'base'         ),
              (2, 'bonus'        ),
              (3, 'bonus-booster');
          `}),e.exec({sql:`
            CREATE TABLE IF NOT EXISTS effect_scope_ids
            (
              id INTEGER PRIMARY KEY,
              scope TEXT NOT NULL UNIQUE
            );
          `}),e.exec({sql:`
            INSERT OR IGNORE INTO
              effect_scope_ids (id, scope)
            VALUES
              (1, 'global'),
              (2, 'local' ),
              (3, 'server');
          `}),e.exec({sql:`
            CREATE TABLE IF NOT EXISTS effect_source_ids
            (
              id INTEGER PRIMARY KEY,
              source TEXT NOT NULL UNIQUE
            );
          `}),e.exec({sql:`
            INSERT OR IGNORE INTO
              effect_source_ids (id, source)
            VALUES
              (1, 'building'),
              (2, 'hero'    ),
              (3, 'oasis'   ),
              (4, 'artifact'),
              (5, 'tribe'   ),
              (6, 'server'  ),
              (7, 'troops'  );
          `}),e.exec({sql:`
            CREATE TABLE IF NOT EXISTS resource_ids
            (
              id INTEGER PRIMARY KEY,
              resource TEXT NOT NULL UNIQUE
            );
          `}),e.exec({sql:`
            INSERT OR IGNORE INTO
              resource_ids (id, resource)
            VALUES
              (1, 'wood' ),
              (2, 'clay' ),
              (3, 'iron' ),
              (4, 'wheat');
          `}),e.exec({sql:`
            CREATE INDEX IF NOT EXISTS idx_resource_ids_resource ON resource_ids (resource);
          `}),e.exec({sql:`
            CREATE TABLE IF NOT EXISTS tile_type_ids
            (
              id INTEGER PRIMARY KEY,
              type TEXT NOT NULL UNIQUE
            );
          `}),e.exec({sql:`
            INSERT OR IGNORE INTO
              tile_type_ids (id, type)
            VALUES
              (1, 'free' ),
              (2, 'oasis');
          `}),e.exec({sql:`
            CREATE INDEX IF NOT EXISTS idx_tile_type_ids_type ON tile_type_ids (type);
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_tiles_rfc_id;
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_tiles_type_xy;
          `}),e.exec({sql:`
            CREATE TABLE tiles_new
            (
              id INTEGER PRIMARY KEY,
              x INTEGER NOT NULL,
              y INTEGER NOT NULL,
              type_id INTEGER NOT NULL,
              resource_field_composition_id INTEGER,
              oasis_graphics INTEGER,

              FOREIGN KEY (type_id) REFERENCES tile_type_ids (id),
              FOREIGN KEY (resource_field_composition_id) REFERENCES resource_field_composition_ids (id)
            );
          `}),e.exec({sql:`
            INSERT INTO
              tiles_new (id, x, y, type_id, resource_field_composition_id, oasis_graphics)
            SELECT
              t.id,
              t.x,
              t.y,
              tti.id,
              t.resource_field_composition_id,
              t.oasis_graphics
            FROM
              tiles t
                JOIN tile_type_ids tti ON tti.type = t.type;
          `}),e.exec({sql:`
            DROP TABLE tiles;
          `}),e.exec({sql:`
            ALTER TABLE tiles_new
              RENAME TO tiles;
          `}),e.exec({sql:`
            CREATE INDEX idx_tiles_rfc_id ON tiles (resource_field_composition_id);
          `}),e.exec({sql:`
            CREATE INDEX idx_tiles_type_xy ON tiles (type_id, x, y);
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_oasis_tile_id;
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_oasis_village_id;
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_oasis_resource_bonus;
          `}),e.exec({sql:`
            CREATE TABLE oasis_new
            (
              id INTEGER PRIMARY KEY,
              tile_id INTEGER NOT NULL,
              village_id INTEGER,
              resource_id INTEGER NOT NULL,
              bonus INTEGER NOT NULL,

              FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE,
              FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE,
              FOREIGN KEY (resource_id) REFERENCES resource_ids (id)
            );
          `}),e.exec({sql:`
            INSERT INTO
              oasis_new (id, tile_id, village_id, resource_id, bonus)
            SELECT
              o.id,
              o.tile_id,
              o.village_id,
              ri.id,
              o.bonus
            FROM
              oasis o
                JOIN resource_ids ri ON ri.resource = o.resource;
          `}),e.exec({sql:`
            DROP TABLE oasis;
          `}),e.exec({sql:`
            ALTER TABLE oasis_new
              RENAME TO oasis;
          `}),e.exec({sql:`
            CREATE INDEX idx_oasis_tile_id ON oasis (tile_id);
          `}),e.exec({sql:`
            CREATE INDEX idx_oasis_village_id ON oasis (village_id);
          `}),e.exec({sql:`
            CREATE INDEX idx_oasis_resource_bonus ON oasis (resource_id, bonus);
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_effects_effect_id;
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_effects_village_id;
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_effects_village_effect_scope_spec;
          `}),e.exec({sql:`
            DROP INDEX IF EXISTS idx_effects_wheat_effect_village_value;
          `}),e.exec({sql:`
            CREATE TABLE effects_new
            (
              id INTEGER PRIMARY KEY,
              effect_id INTEGER NOT NULL,
              value REAL NOT NULL,
              type_id INTEGER NOT NULL,
              scope_id INTEGER NOT NULL,
              source_id INTEGER NOT NULL,
              village_id INTEGER,
              source_specifier INTEGER,

              FOREIGN KEY (effect_id) REFERENCES effect_ids (id),
              FOREIGN KEY (type_id) REFERENCES effect_type_ids (id),
              FOREIGN KEY (scope_id) REFERENCES effect_scope_ids (id),
              FOREIGN KEY (source_id) REFERENCES effect_source_ids (id),
              FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE ON UPDATE CASCADE
            );
          `}),e.exec({sql:`
            INSERT INTO
              effects_new (id, effect_id, value, type_id, scope_id, source_id, village_id, source_specifier)
            SELECT
              e.id,
              e.effect_id,
              e.value,
              et.id,
              esc.id,
              eso.id,
              e.village_id,
              e.source_specifier
            FROM
              effects e
                JOIN effect_type_ids et ON et.type = e.type
                JOIN effect_scope_ids esc ON esc.scope = e.scope
                JOIN effect_source_ids eso ON eso.source = e.source;
          `}),e.exec({sql:`
            DROP TABLE effects;
          `}),e.exec({sql:`
            ALTER TABLE effects_new
              RENAME TO effects;
          `}),e.exec({sql:`
            CREATE INDEX idx_effects_effect_id ON effects (effect_id);
          `}),e.exec({sql:`
            CREATE INDEX idx_effects_village_id ON effects (village_id);
          `}),e.exec({sql:`
            CREATE INDEX idx_effects_village_effect_scope_spec
              ON effects (effect_id, village_id, scope_id, source_specifier);
          `}),e.exec({sql:`
        -- SQLite partial-index predicates cannot contain subqueries. scope_id = 2 is the stable id for 'local'.
        CREATE INDEX IF NOT EXISTS idx_effects_wheat_effect_village_value
          ON effects(effect_id, village_id, value)
          WHERE scope_id = 2 AND source_specifier = 0 AND effect_id = 1;
      `})})}finally{e.exec({sql:`PRAGMA foreign_keys = ON;`})}}),i(`0.4.40`,e=>{try{e.exec({sql:uC}),e.exec({sql:RS})}catch{}xC(e)}),i(`0.4.45`,e=>{e.exec({sql:ZS}),_C(e),e.exec({sql:QS}),vC(e),e.exec({sql:$S}),yC(e),e.exec({sql:rC}),e.exec({sql:KS}),e.exec({sql:tC}),e.exec({sql:eC}),e.exec({sql:lC}),e.exec({sql:YS}),e.exec({sql:JS}),e.exec({sql:GS}),e.exec({sql:WS}),e.exec({sql:nC}),e.exec({sql:US}),e.exec({sql:VS}),e.exec({sql:HS}),e.exec({sql:cC}),e.exec({sql:aC}),e.exec({sql:sC}),e.exec({sql:oC}),xC(e)}),i(`0.4.47`,e=>{e.exec({sql:wC})}),i(`0.4.49`,e=>{e.exec({sql:iC}),e.exec({sql:qS})}),i(`0.4.50`,e=>{e.exec({sql:`
        UPDATE events
        SET
          meta = JSON_REMOVE(meta, '$.merchantAmount')
        WHERE
          type = 'tradeRoute'
          AND meta IS NOT NULL
          AND JSON_TYPE(meta, '$.merchantAmount') IS NOT NULL;
      `})}),i(`0.4.51`,e=>{e.transaction(e=>{e.exec({sql:`
          UPDATE effects
          SET
            value =
              CASE bf.level
                WHEN 0 THEN 0
                WHEN 1 THEN 100
                WHEN 2 THEN 130
                WHEN 3 THEN 170
                WHEN 4 THEN 220
                WHEN 5 THEN 280
                WHEN 6 THEN 360
                WHEN 7 THEN 460
                WHEN 8 THEN 600
                WHEN 9 THEN 770
                WHEN 10 THEN 1000
                END
                *
              CASE
                WHEN ti.tribe = 'gauls' THEN 2
                ELSE 1
                END
          FROM
            building_fields bf
              JOIN building_ids bi ON bi.id = bf.building_id
              JOIN villages v ON v.id = bf.village_id
              JOIN players p ON p.id = v.player_id
              JOIN tribe_ids ti ON ti.id = p.tribe_id
          WHERE
            effects.village_id = bf.village_id
            AND effects.source_specifier = bf.field_id
            AND bi.building = 'CRANNY'
            AND effects.effect_id = (
              SELECT id
              FROM
                effect_ids
              WHERE
                effect = 'crannyCapacity'
              )
            AND effects.type_id = (
              SELECT id
              FROM
                effect_type_ids
              WHERE
                type = 'base'
              )
            AND effects.scope_id = (
              SELECT id
              FROM
                effect_scope_ids
              WHERE
                scope = 'local'
              )
            AND effects.source_id = (
              SELECT id
              FROM
                effect_source_ids
              WHERE
                source = 'building'
              );
        `}),e.exec({sql:`
          UPDATE effects
          SET
            value = ROUND(
              1 + bf.level *
                  CASE
                    WHEN ti.tribe = 'romans' THEN 0.2
                    ELSE 0.1
                    END,
              4
                    )
          FROM
            building_fields bf
              JOIN building_ids bi ON bi.id = bf.building_id
              JOIN villages v ON v.id = bf.village_id
              JOIN players p ON p.id = v.player_id
              JOIN tribe_ids ti ON ti.id = p.tribe_id
          WHERE
            effects.village_id = bf.village_id
            AND effects.source_specifier = bf.field_id
            AND bi.building = 'TRADE_OFFICE'
            AND effects.effect_id = (
              SELECT id
              FROM
                effect_ids
              WHERE
                effect = 'merchantCapacity'
              )
            AND effects.type_id = (
              SELECT id
              FROM
                effect_type_ids
              WHERE
                type = 'bonus'
              )
            AND effects.scope_id = (
              SELECT id
              FROM
                effect_scope_ids
              WHERE
                scope = 'local'
              )
            AND effects.source_id = (
              SELECT id
              FROM
                effect_source_ids
              WHERE
                source = 'building'
              );
        `})})}),i(`0.4.52`,e=>{let t=t=>e.selectValue({sql:`
          SELECT
            EXISTS
            (
              SELECT 1
              FROM
                sqlite_master
              WHERE
                type = 'table'
                AND name = $table_name
              );
        `,bind:{$table_name:t},schema:V()});if(t(`building_ids`)||(t(`building_ids_new`)?e.exec({sql:`ALTER TABLE building_ids_new RENAME TO building_ids;`}):(e.exec({sql:XS}),hC(e))),e.exec({sql:`CREATE INDEX IF NOT EXISTS idx_building_ids_building ON building_ids(building);`}),!e.selectValue({sql:`
        SELECT
          EXISTS
          (
            SELECT 1
            FROM
              building_ids
            WHERE
              building = 'ASCLEPEION'
            );
      `,schema:V()})){e.exec({sql:`PRAGMA foreign_keys = OFF;`});try{e.transaction(e=>{e.exec({sql:`DROP TRIGGER IF EXISTS trg_unit_training_history_delete;`}),e.exec({sql:`DROP TABLE IF EXISTS building_ids_new;`}),e.exec({sql:`
              CREATE TABLE building_ids_new
              (
                id INTEGER PRIMARY KEY,
                building TEXT NOT NULL UNIQUE CHECK (building IN
                                                     ('BARRACKS', 'GREAT_BARRACKS', 'STABLE', 'GREAT_STABLE',
                                                      'WORKSHOP', 'HOSPITAL', 'ASCLEPEION', 'CLAY_PIT', 'WHEAT_FIELD',
                                                      'WOODCUTTER', 'IRON_MINE', 'BAKERY', 'BRICKYARD', 'GRAIN_MILL',
                                                      'GRANARY', 'GREAT_GRANARY', 'IRON_FOUNDRY', 'SAWMILL',
                                                      'WAREHOUSE', 'GREAT_WAREHOUSE', 'WATERWORKS', 'ACADEMY',
                                                      'ROMAN_WALL', 'TEUTONIC_WALL', 'HEROS_MANSION', 'HUN_WALL',
                                                      'GAUL_WALL', 'RALLY_POINT', 'EGYPTIAN_WALL', 'TRAPPER', 'BREWERY',
                                                      'COMMAND_CENTER', 'CRANNY', 'HORSE_DRINKING_TROUGH',
                                                      'MAIN_BUILDING', 'MARKETPLACE', 'RESIDENCE', 'TOURNAMENT_SQUARE',
                                                      'TRADE_OFFICE', 'SMITHY', 'TOWN_HALL', 'EMBASSY', 'TREASURY',
                                                      'GATHERERS_HUT', 'HUNTERS_LODGE', 'SPARTAN_WALL', 'NATAR_WALL',
                                                      'NATURE_WALL'))
              ) STRICT;
            `}),e.exec({sql:`
              INSERT OR IGNORE INTO
                building_ids_new (id, building)
              SELECT id, building
              FROM
                building_ids;
            `}),e.exec({sql:`
              INSERT OR IGNORE INTO
                building_ids_new (building)
              VALUES
                ('ASCLEPEION');
            `}),e.exec({sql:`DROP TABLE building_ids;`}),e.exec({sql:`ALTER TABLE building_ids_new RENAME TO building_ids;`}),e.exec({sql:`CREATE INDEX IF NOT EXISTS idx_building_ids_building ON building_ids(building);`})})}finally{e.exec({sql:`PRAGMA foreign_keys = ON;`})}SC(e)}e.exec({sql:dC}),e.exec({sql:zS}),e.exec({sql:bC})}),i(`0.4.53`,e=>{e.exec({sql:`DROP TRIGGER IF EXISTS reports_delete_details_before_delete;`}),e.exec({sql:`DROP TRIGGER IF EXISTS battle_report_units_create_wounded_troops_after_insert;`}),e.exec({sql:`DROP TABLE IF EXISTS battle_report_units;`}),e.exec({sql:`DROP TABLE IF EXISTS battle_report_buildings;`}),e.exec({sql:HS}),e.exec({sql:BS}),e.exec({sql:`
        CREATE INDEX IF NOT EXISTS idx_battle_report_buildings_report
          ON battle_report_buildings (report_id);
      `}),e.exec({sql:CC}),e.exec({sql:bC}),xC(e)}),i(`0.4.55`,e=>{for(let t of[`DROP INDEX IF EXISTS idx_effects_effect_id;`,`DROP INDEX IF EXISTS idx_effects_village_id;`,`DROP INDEX IF EXISTS idx_effects_tile_id;`,`DROP INDEX IF EXISTS idx_effects_village_effect_scope_spec;`,`DROP INDEX IF EXISTS idx_effects_effect_village_scope_spec;`,`DROP INDEX IF EXISTS idx_effects_effect_tile_scope_spec;`,`DROP INDEX IF EXISTS idx_effects_tile_effect_scope_spec;`,`DROP INDEX IF EXISTS idx_effects_resource_village;`,`DROP INDEX IF EXISTS idx_effects_resource_tile;`,`DROP INDEX IF EXISTS idx_effects_wheat_effect_village_value;`,`DROP INDEX IF EXISTS idx_effects_wheat_effect_tile_value;`])e.exec({sql:t});e.exec({sql:`PRAGMA foreign_keys = OFF;`});try{e.transaction(e=>{e.exec({sql:`ALTER TABLE effects RENAME TO effects_old;`}),e.exec({sql:`
            CREATE TABLE effects
            (
              id INTEGER PRIMARY KEY,
              effect_id INTEGER NOT NULL,
              value REAL NOT NULL,
              type_id INTEGER NOT NULL,
              scope_id INTEGER NOT NULL,
              source_id INTEGER NOT NULL,
              tile_id INTEGER,
              source_specifier INTEGER,

              FOREIGN KEY (effect_id) REFERENCES effect_ids (id),
              FOREIGN KEY (type_id) REFERENCES effect_type_ids (id),
              FOREIGN KEY (scope_id) REFERENCES effect_scope_ids (id),
              FOREIGN KEY (source_id) REFERENCES effect_source_ids (id),
              FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE ON UPDATE CASCADE
            );
          `}),e.exec({sql:`
            INSERT INTO
              effects (id, effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
            SELECT
              e.id,
              e.effect_id,
              e.value,
              e.type_id,
              e.scope_id,
              e.source_id,
              v.tile_id,
              e.source_specifier
            FROM
              effects_old e
                LEFT JOIN villages v ON v.id = e.village_id;
          `}),e.exec({sql:`DROP TABLE effects_old;`})})}finally{e.exec({sql:`PRAGMA foreign_keys = ON;`})}for(let t of[`CREATE INDEX IF NOT EXISTS idx_effects_effect_id ON effects(effect_id);`,`CREATE INDEX IF NOT EXISTS idx_effects_tile_id ON effects(tile_id);`,`
        CREATE INDEX IF NOT EXISTS idx_effects_tile_effect_scope_spec
          ON effects (effect_id, tile_id, scope_id, source_specifier);
      `])e.exec({sql:t});e.exec({sql:`
        UPDATE effects
        SET
          tile_id = source_specifier
        WHERE
          source_id = (
            SELECT id
            FROM effect_source_ids
            WHERE source = 'oasis'
            )
          AND scope_id = (
            SELECT id
            FROM effect_scope_ids
            WHERE scope = 'local'
            )
          AND tile_id IS NULL
          AND source_specifier IN (
            SELECT id
            FROM tiles
            );
      `}),e.exec({sql:`
        DELETE
        FROM
          effects
        WHERE
          source_id = (
            SELECT id
            FROM effect_source_ids
            WHERE source = 'oasis'
            )
          AND scope_id = (
            SELECT id
            FROM effect_scope_ids
            WHERE scope = 'local'
            )
          AND tile_id IS NULL;
      `}),e.exec({sql:`
        WITH
          effect_context(type_id, scope_id, source_id) AS (
            SELECT
              (
                SELECT id
                FROM effect_type_ids
                WHERE type = 'base'
                ),
              (
                SELECT id
                FROM effect_scope_ids
                WHERE scope = 'local'
                ),
              (
                SELECT id
                FROM effect_source_ids
                WHERE source = 'oasis'
                )
            ),

          effect_lookup(effect, effect_id) AS (
            SELECT effect, id
            FROM
              effect_ids
            WHERE
              effect IN (
                         'warehouseCapacity',
                         'granaryCapacity',
                         'woodProduction',
                         'clayProduction',
                         'ironProduction',
                         'wheatProduction'
                )
            ),

          resource_effects(resource_id, effect_id) AS (
            SELECT
              ri.id,
              el.effect_id
            FROM
              resource_ids ri
                JOIN effect_lookup el ON el.effect = ri.resource || 'Production'
            WHERE
              ri.resource IN ('wood', 'clay', 'iron', 'wheat')
            ),

          storage_effects(effect_id) AS (
            SELECT effect_id
            FROM
              effect_lookup
            WHERE
              effect IN ('warehouseCapacity', 'granaryCapacity')
            ),

          oasis_capacity AS (
            SELECT
              tile_id,
              CASE
                WHEN MAX(bonus) = 50 OR COUNT(*) = 2 THEN 2000
                ELSE 1000
                END AS value
            FROM
              oasis
            GROUP BY tile_id
            ),

          oasis_production AS (
            SELECT
              tiles.tile_id,
              re.effect_id,
              CASE
                WHEN MAX(o.bonus) = 50 THEN 80
                WHEN MAX(o.bonus) = 25 THEN 40
                ELSE 10
                END AS value
            FROM
              (
                SELECT DISTINCT tile_id
                FROM
                  oasis
                ) tiles
                CROSS JOIN resource_effects re
                LEFT JOIN oasis o ON o.tile_id = tiles.tile_id
                AND o.resource_id = re.resource_id
            GROUP BY
              tiles.tile_id,
              re.effect_id
            ),

          oasis_effects_to_insert(effect_id, value, tile_id) AS (
            SELECT
              op.effect_id,
              op.value,
              op.tile_id
            FROM
              oasis_production op
            WHERE
              op.value > 0

            UNION ALL

            SELECT
              se.effect_id,
              oc.value,
              oc.tile_id
            FROM
              oasis_capacity oc
                CROSS JOIN storage_effects se
            )

        INSERT
        INTO
          effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
        SELECT
          oeti.effect_id,
          oeti.value,
          ec.type_id,
          ec.scope_id,
          ec.source_id,
          oeti.tile_id,
          oeti.tile_id
        FROM
          oasis_effects_to_insert oeti
            CROSS JOIN effect_context ec
        WHERE
          NOT EXISTS
          (
            SELECT 1
            FROM
              effects e
            WHERE
              e.effect_id = oeti.effect_id
              AND e.type_id = ec.type_id
              AND e.scope_id = ec.scope_id
              AND e.source_id = ec.source_id
              AND e.tile_id = oeti.tile_id
              AND e.source_specifier = oeti.tile_id
            );
      `});for(let t of[`DROP INDEX IF EXISTS idx_building_fields_building_id;`,`
        CREATE INDEX IF NOT EXISTS idx_building_fields_building_id_level
          ON building_fields (building_id, level);
      `,`
        CREATE INDEX IF NOT EXISTS idx_reports_timestamp
          ON reports (timestamp DESC);
      `,`
        CREATE INDEX IF NOT EXISTS idx_reports_village_timestamp
          ON reports (village_id, timestamp DESC);
      `,`
        CREATE INDEX IF NOT EXISTS idx_battle_report_participants_battle
          ON battle_report_participants (battle_id);
      `,`
        CREATE INDEX IF NOT EXISTS idx_battle_report_buildings_report
          ON battle_report_buildings (report_id);
      `,`DROP INDEX IF EXISTS idx_unit_ids_unit;`,`DROP INDEX IF EXISTS idx_resource_sites_tile_id;`,`DROP INDEX IF EXISTS idx_villages_tile_id;`])e.exec({sql:t});xC(e)}),i(`0.4.57`,e=>{e.exec({sql:`
        UPDATE events
        SET
          meta = JSON_SET(
            meta,
            '$.troops',
            JSON((
              SELECT JSON_GROUP_ARRAY(JSON(updated_troop))
              FROM
                (
                  SELECT
                    CASE
                      WHEN (
                             JSON_TYPE(troop.value, '$.sourceTileId') IS NULL
                               OR JSON_TYPE(troop.value, '$.sourceTileId') = 'null'
                             )
                        AND JSON_TYPE(troop.value, '$.tileId') IN ('integer', 'real')
                        THEN JSON_SET(
                        troop.value,
                        '$.sourceTileId',
                        JSON_EXTRACT(troop.value, '$.tileId')
                             )
                      ELSE troop.value
                      END AS updated_troop
                  FROM
                    JSON_EACH(events.meta, '$.troops') AS troop
                  ORDER BY CAST(troop.key AS INTEGER)
                  )
              ))
                 )
        WHERE
          meta IS NOT NULL
          AND JSON_TYPE(meta, '$.troops') = 'array'
          AND EXISTS
          (
            SELECT 1
            FROM
              JSON_EACH(events.meta, '$.troops') AS troop
            WHERE
              (
                JSON_TYPE(troop.value, '$.sourceTileId') IS NULL
                  OR JSON_TYPE(troop.value, '$.sourceTileId') = 'null'
                )
              AND JSON_TYPE(troop.value, '$.tileId') IN ('integer', 'real')
            );
      `})}),i(`0.4.58`,e=>{e.exec({sql:`
        CREATE INDEX IF NOT EXISTS idx_effects_resource_site_resources
          ON effects (effect_id, scope_id, tile_id, source_specifier, source_id, type_id, value);
      `}),e.exec({sql:`DROP INDEX IF EXISTS idx_effects_resource_tile;`}),e.exec({sql:`DROP INDEX IF EXISTS idx_effects_wheat_effect_tile_value;`})}),i(`0.4.62`,e=>{let t=Date.now();e.transaction(e=>{e.exec({sql:`
          INSERT INTO quests (quest_id, completed_at, collected_at, village_id)
          SELECT quest_id.value, NULL, NULL, NULL
          FROM json_each($quest_ids) AS quest_id
          WHERE NOT EXISTS (
            SELECT 1
            FROM quests q
            WHERE
              q.quest_id = quest_id.value
              AND q.village_id IS NULL
          );
        `,bind:{$quest_ids:JSON.stringify(NC)}}),e.exec({sql:`
          UPDATE quests
          SET
            completed_at = $completed_at
          WHERE
            completed_at IS NULL
            AND village_id IS NULL
            AND quest_id LIKE 'captureAnimalCountById-%'
            AND EXISTS (
              SELECT 1
              FROM unit_ids captured_unit_ids
              WHERE
                captured_unit_ids.unit IN (
                  SELECT value
                  FROM json_each($animal_unit_ids)
                )
                AND quest_id LIKE 'captureAnimalCountById-' || captured_unit_ids.unit || '-%'
                AND substr(
                  quest_id,
                  length('captureAnimalCountById-' || captured_unit_ids.unit || '-') + 1
                ) GLOB '[0-9]*'
                AND (
                  SELECT COALESCE(SUM(hpru.amount), 0)
                  FROM hunting_party_report_units hpru
                  JOIN hunting_party_reports hpr
                    ON hpr.id = hpru.hunting_party_report_id
                  JOIN reports r ON r.id = hpr.report_id
                  JOIN villages v ON v.id = r.village_id
                  WHERE
                    v.player_id = $player_id
                    AND hpru.unit_id = captured_unit_ids.id
                ) >= CAST(
                  substr(
                    quest_id,
                    length('captureAnimalCountById-' || captured_unit_ids.unit || '-') + 1
                  ) AS INTEGER
                )
            );
        `,bind:{$completed_at:t,$animal_unit_ids:JSON.stringify(AC),$player_id:1}}),e.exec({sql:`
          UPDATE quests
          SET
            completed_at = $completed_at
          WHERE
            completed_at IS NULL
            AND village_id IS NULL
            AND quest_id LIKE 'captureAnimalKindCount-%'
            AND substr(quest_id, length('captureAnimalKindCount-') + 1) GLOB '[0-9]*'
            AND (
              SELECT COUNT(*)
              FROM (
                SELECT ui.unit
                FROM hunting_party_report_units hpru
                JOIN unit_ids ui ON ui.id = hpru.unit_id
                JOIN hunting_party_reports hpr
                  ON hpr.id = hpru.hunting_party_report_id
                JOIN reports r ON r.id = hpr.report_id
                JOIN villages v ON v.id = r.village_id
                WHERE
                  v.player_id = $player_id
                  AND ui.unit IN (
                    SELECT value
                    FROM json_each($animal_unit_ids)
                  )
                GROUP BY ui.unit
                HAVING SUM(hpru.amount) > 0
              )
            ) >= CAST(
              substr(quest_id, length('captureAnimalKindCount-') + 1) AS INTEGER
            );
        `,bind:{$completed_at:t,$animal_unit_ids:JSON.stringify(AC),$player_id:1}}),e.exec({sql:`
          UPDATE quests
          SET
            completed_at = $completed_at
          WHERE
            completed_at IS NULL
            AND village_id IS NULL
            AND quest_id LIKE 'gatheredResourceCount-%'
            AND substr(quest_id, length('gatheredResourceCount-') + 1) GLOB '[0-9]*'
            AND (
              SELECT COALESCE(
                SUM(
                  ger.loot_wood +
                  ger.loot_clay +
                  ger.loot_iron +
                  ger.loot_wheat
                ),
                0
              )
              FROM gathering_expedition_reports ger
              JOIN reports r ON r.id = ger.report_id
              JOIN villages v ON v.id = r.village_id
              WHERE v.player_id = $player_id
            ) >= CAST(
              substr(quest_id, length('gatheredResourceCount-') + 1) AS INTEGER
            );
        `,bind:{$completed_at:t,$player_id:1}})})}),r!==n&&e.exec({sql:`PRAGMA user_version=${n};`})},FC=L({id:N(),parent:N(),notused:N(),detail:j()}),IC=(e,t)=>I(e).parse(t),LC=()=>new Map,RC=e=>{let t=e.reset.bind(e),n=e.stepReset.bind(e);return e.reset=(()=>t(!0)),e.stepReset=(()=>{try{return n()}finally{t(!0)}}),e},zC=e=>{let t=e.trimStart();for(;;){if(t.startsWith(`--`)){let e=t.search(/\r?\n/u);if(e===-1)return``;t=t.slice(e).trimStart();continue}if(t.startsWith(`/*`)){let e=t.indexOf(`*/`);if(e===-1)return``;t=t.slice(e+2).trimStart();continue}return t}},BC=e=>/^(?:delete|insert|replace|select|update|with)\b/iu.test(zC(e)),VC=(e,t=!1)=>{let n=LC(),r=t=>{let r=n.get(t);if(!r){let r=RC(e.prepare(t));return n.set(t,r),r}return r},i=({sql:t,bind:n})=>I(FC).parse(e.selectObjects(`EXPLAIN QUERY PLAN ${t}`,n)),a=({sql:e,bind:t})=>{if(BC(e))try{return i({sql:e,bind:t})}catch{}},o=({sql:e,bind:n,operation:i,execute:o})=>{let s=t?a({sql:e,bind:n}):void 0,c=t?performance.now():0,l=r(e);l.reset(!0),n&&l.bind(n);try{let n=o(l);if(t){let t=performance.now();console.log(`DbFacade.${i} — ${e} took ${(t-c).toFixed(3)} ms`,...s===void 0?[]:[s])}return n}finally{l.reset(!0)}},s={exec:({sql:e,bind:t})=>{o({sql:e,bind:t,operation:`exec`,execute:e=>e.stepReset()})},explain:i,selectValue:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectValue`,execute:e=>{if(!e.step()){e.reset();return}let t=e.get(0);return e.reset(),t}});if(r!==void 0)return Ks(n,r)},selectValues:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectValues`,execute:e=>{let t=[];for(;e.step();)t.push(e.get(0));return e.reset(),t}});return IC(n,r)},selectObject:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectObject`,execute:e=>{if(e.step()){let t=e.get({});return e.reset(),t}e.reset()}});if(r!==void 0)return Ks(n,r)},selectObjects:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectObjects`,execute:e=>{let t=[];for(;e.step();)t.push(e.get({}));return e.reset(),t}});return IC(n,r)},prepare:({sql:e})=>o({sql:e,operation:`prepare`,execute:e=>e}),transaction:n=>{let r=performance.now();e.transaction(()=>{n(s)});let i=performance.now();t&&console.log(`DbFacade.transaction — full callback took ${(i-r).toFixed(3)} ms`)},close:()=>{for(let[e,t]of n)t.finalize(),n.delete(e)}};return s},HC=async e=>new Promise(t=>{globalThis.setTimeout(t,e)}),UC=e=>typeof DOMException<`u`&&e instanceof DOMException?e.name===`NoModificationAllowedError`:e instanceof Error?e.name===`NoModificationAllowedError`||e.message.includes(`NoModificationAllowedError`)||e.message.includes(`createSyncAccessHandle`):!1,WC=async(e,t={})=>{let n=t.attempts??5,r=t.delayMs??250;for(let t=1;t<=n;t+=1)try{return await e()}catch(e){let i=t===n;if(!UC(e)||i)throw e;await HC(r)}throw Error(`Unexpected retry state while waiting for lock release.`)};let GC=null,KC=null,qC=null;const JC=e=>{try{e?.close()}finally{try{qC?.close()}finally{qC=null,KC?.pauseVfs(),KC=null}}},YC=async e=>{if(GC===null){let{default:e}=await import(`./dist-DQrYgFwJ.js`);GC=await e()}let t={directory:`/pillage-first-ask-questions-later/${e}`,forceReinitIfPreviouslyFailed:!0};KC=await WC(()=>GC.installOpfsSAHPoolVfs(t));let n;try{if(KC.getFileCount()===0)throw new uf;qC=new KC.OpfsSAHPoolDb(`/${e}.sqlite3`),n=VC(qC,!1),n.exec({sql:`
      PRAGMA foreign_keys = ON;        -- keep referential integrity
      PRAGMA locking_mode = EXCLUSIVE; -- single-writer optimization
      PRAGMA journal_mode = WAL;       -- write-ahead-log
      PRAGMA temp_store = MEMORY;      -- temp tables + indices kept in RAM
      PRAGMA cache_size = -20000;      -- negative = KB, so -20000 => 20 MB cache
      PRAGMA secure_delete = OFF;      -- faster deletes (don't overwrite freed pages)
      PRAGMA synchronous = OFF;        -- fastest; risks losing recent writes on crash
      PRAGMA wal_autocheckpoint = 1000;
    `});let t=n.selectValue({sql:`PRAGMA user_version`,schema:N()});if(!DC(t,gC.VERSION))throw new uf;return PC(n,t),n}catch(e){throw JC(n),e}},XC=e=>{JC(e)};let ZC=null;const QC=()=>{if(ZC===null)throw Error(`API worker database is not initialized`);return ZC};globalThis.addEventListener(`message`,async e=>{let{data:t}=e,{type:n}=t;switch(n){case`WORKER_INIT`:try{let[t]=e.ports;if(!t)throw Error(`Missing notification port during worker init`);zl(t);let n=new URLSearchParams(globalThis.location.search).get(`server-slug`);if(!n)throw Error(`Missing server slug during worker init`);ZC=await YC(n);let r=Eg(ZC);Vs(r),Bs(r),Vl({eventKey:`event:database-initialization-success`},{force:!0});break}catch(e){Vl({eventKey:`event:database-initialization-error`,error:e},{force:!0});break}case`WORKER_START_NOTIFICATION_POSTING`:Bl(!0);break;case`WORKER_STOP_NOTIFICATION_POSTING`:Bl(!1);break;case`WORKER_MESSAGE`:{let{data:t,ports:n}=e,[r]=n,{url:i,method:a,body:o}=t;try{let e=QC(),{controller:t,path:n,query:s,body:c,url:l}=LS(i,a,o),u=t(e,{path:n,query:s,body:c,url:l});r.postMessage({data:u});break}catch(e){console.error(e);let t={eventKey:`event:error`,error:e};r.postMessage(t),Vl(t);break}}case`WORKER_CLOSE`:Bl(!1),zs(),ZC!==null&&XC(ZC),ZC=null,Vl({type:`WORKER_CLOSE_SUCCESS`},{force:!0})}});
//# sourceMappingURL=api-worker-BVYJMkU0.js.map