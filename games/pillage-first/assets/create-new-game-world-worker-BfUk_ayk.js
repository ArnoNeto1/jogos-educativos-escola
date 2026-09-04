const e=`Angry.Wiggly.Moist.Turbo.Nomadic.Sneaky.Banana.Goblin.Cheese.Grumpy.Pickle.Sofa.Fluffy.Zesty.Chonky.Bread.Spicy.Epic.Knightly.Tofu.Cranky.Rogue.Honky.Panda.Emperor.Sir.Toilet.Crusty.Knight.Flapjack.Baron.Oregano.Meme.Beardius.Yelling.Count.Loot.Major.Queen.Soggy.Grillmaster.Sneezus.Unicorn.General.Rage.Bloop.Lord.Chieftain.Wizard.Clumsy.Cabbage.Captain.Barbarian.Mayo.Commander.Knightmare.Salty.Yeet.Cursed.Doom.Goblet.Druid.Spartan.Snacc.Feral.Silent.Witch.Donut.Archduke.Sergeant.Beefy.Battle.Tactical.Lard.Overcooked.Funky.Shady.Milk.Troll.Boom.Yawn.Clownshoes.Oathbreaker.Lizard.Snack.Floppa.Jazz.NomNom.Emo.Snail.Toast.Duck.Potato.Cow.Sleep.Drama.Croissant.Noodle.WiFi.Bean.Hamster`.split(`.`),t=`Warlord.Scone.Toast.Knight.Viking.Baguette.Donkey.Sloth.Ferret.Chancellor.CEO.Wizard.Druid.Ducklord.Crusader.General.Barbarian.Raider.Witch.Emperor.Meerkat.Farticus.Pigeon.Warden.Oops.Paladin.Minotaur.Mancer.Disguise.Cows.Snaccalot.Strategist.Jester.Nope.Overlord.VonDuck.Sorcerer.Mercenary.Maximus.Llama.Spatula.Gobblin.Snuggle.Beans.Tactician.Rex.Christ.Slapper.Snacc.Beef.Knight.Sleep.Chunk.Fizz.Centaur.Crusher.Moo.Bae.Assassin.Quackalot.Wiggles.Snuggie.Oracle.Boop.Wizard.Biscuit.Toast.Sniffer.Drama.Noodle.Knight.Croissant.Gravy.Moo.WiFi.Overseer.Flop.Turtle.Mage.Meow.Banana.Paladin.Bard.Minotaur.Churro.Storm.Sauce.Boom.Yawn.Mage.Owl.Lizards.Snack.Floppa.Jazz.Viking.Centaur`.split(`.`),n=e=>{e.exec({sql:`
      INSERT INTO
        bookmarks (village_id, building_id, tab_name)
      SELECT
        v.id,
        b.id,
        'default'
      FROM
        villages v,
        building_ids b
      WHERE
        v.player_id = $player_id;
    `,bind:{$player_id:1}})};function r(e){let t=Object.values(e).filter(e=>typeof e==`number`);return Object.entries(e).filter(([e,n])=>t.indexOf(+e)===-1).map(([e,t])=>t)}function i(e,t=`|`){return e.map(e=>C(e)).join(t)}function a(e,t){return typeof t==`bigint`?t.toString():t}function o(e){return{get value(){{let t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function s(e){return e==null}function c(e){let t=+!!e.startsWith(`^`),n=e.endsWith(`$`)?e.length-1:e.length;return e.slice(t,n)}function l(e,t){let n=e/t,r=Math.round(n),i=4*2**-52*Math.max(Math.abs(n),1);return Math.abs(n-r)<i?0:n-r}function u(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function d(...e){let t={};for(let n of e){let e=Object.getOwnPropertyDescriptors(n);Object.assign(t,e)}return Object.defineProperties({},t)}function f(e){return JSON.stringify(e)}function p(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,``).replace(/[\s_-]+/g,`-`).replace(/^-+|-+$/g,``)}const m=`captureStackTrace`in Error?Error.captureStackTrace:(...e)=>{};function h(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}const g=o(()=>{if(E.jitless||typeof navigator<`u`&&navigator?.userAgent?.includes(`Cloudflare`))return!1;try{return Function(``),!0}catch{return!1}});function _(e){if(h(e)===!1)return!1;let t=e.constructor;if(t===void 0||typeof t!=`function`)return!0;let n=t.prototype;return h(n)!==!1&&Object.prototype.hasOwnProperty.call(n,`isPrototypeOf`)!==!1}function v(e){return _(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}const y=new Set([`string`,`number`,`symbol`]);function b(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function x(e,t,n){let r=new e._zod.constr(t??e._zod.def);return(!t||n?.parent)&&(r._zod.parent=e),r}function S(e){let t=e;if(!t)return{};if(typeof t==`string`)return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error==`string`?{...t,error:()=>t.error}:t}function C(e){return typeof e==`bigint`?e.toString()+`n`:typeof e==`string`?`"${e}"`:`${e}`}function ee(e){return Object.keys(e).filter(t=>e[t]._zod.optin!==void 0&&e[t]._zod.optout===`optional`)}const te={safeint:[-(2**53-1),2**53-1],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function ne(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.pick() cannot be used on object schemas containing refinements`);return x(e,d(e._zod.def,{get shape(){let e={};for(let r of Reflect.ownKeys(t)){if(!Object.prototype.hasOwnProperty.call(n.shape,r))throw Error(`Unrecognized key: "${String(r)}"`);t[r]&&u(e,r,n.shape[r])}return u(this,`shape`,e),e},checks:[]}))}function re(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(`.omit() cannot be used on object schemas containing refinements`);return x(e,d(e._zod.def,{get shape(){let r={...e._zod.def.shape};for(let e of Reflect.ownKeys(t)){if(!Object.prototype.hasOwnProperty.call(n.shape,e))throw Error(`Unrecognized key: "${String(e)}"`);t[e]&&delete r[e]}return u(this,`shape`,r),r},checks:[]}))}function ie(e,t){if(!_(t))throw Error(`Invalid input to extend: expected a plain object`);let n=e._zod.def.checks;if(n&&n.length>0){let n=e._zod.def.shape;for(let e of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(n,e)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return x(e,d(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return u(this,`shape`,n),n}}))}function ae(e,t){if(!_(t))throw Error(`Invalid input to safeExtend: expected a plain object`);return x(e,d(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t};return u(this,`shape`,n),n}}))}function oe(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(`.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`);return x(e,d(e._zod.def,{get shape(){let n={...e._zod.def.shape,...t._zod.def.shape};return u(this,`shape`,n),n},get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]}))}function se(e,t,n,r=`partial`){let i=t._zod.def.checks;if(i&&i.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);return x(t,d(t._zod.def,{get shape(){let r=t._zod.def.shape,i={...r};if(n)for(let t of Reflect.ownKeys(n)){if(!Object.prototype.hasOwnProperty.call(r,t))throw Error(`Unrecognized key: "${String(t)}"`);n[t]&&(i[t]=e?new e({type:`optional`,innerType:r[t]}):r[t])}else for(let t of Reflect.ownKeys(r))i[t]=e?new e({type:`optional`,innerType:r[t]}):r[t];return u(this,`shape`,i),i},checks:[]}))}function ce(e,t,n){return x(t,d(t._zod.def,{get shape(){let r=t._zod.def.shape,i={...r};if(n)for(let t of Reflect.ownKeys(n)){if(!Object.prototype.hasOwnProperty.call(i,t))throw Error(`Unrecognized key: "${String(t)}"`);n[t]&&(i[t]=new e({type:`nonoptional`,innerType:r[t]}))}else for(let t of Reflect.ownKeys(r))i[t]=new e({type:`nonoptional`,innerType:r[t]});return u(this,`shape`,i),i}}))}function le(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function ue(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function de(e,t){return t.map(t=>{var n;return(n=t).path??(n.path=[]),t.path.unshift(e),t})}function fe(e){return typeof e==`string`?e:e?.message}function pe(e,t,n){var r;for(let i=t;i<e.length;i++)(r=e[i]).schema??(r.schema=n)}function me(e,t,n){var r;let i=e.inst?._zod?.traits;i?.has(`$ZodType`)&&(i.has(`$ZodCheck`)?(r=e).schema??(r.schema=e.inst):e.schema=e.inst);let a=e.schema===e.inst?void 0:e.schema?._zod.def?.error,o=e.message?e.message:fe(e.inst?._zod.def?.error?.(e))??fe(a?.(e))??fe(t?.error?.(e))??fe(n.customError?.(e))??fe(n.localeError?.(e))??`Invalid input`,{inst:s,schema:c,continue:l,input:u,...d}=e;return d.path??=[],d.message=o,t?.reportInput&&(d.input=u),d}const he=/[\uD800-\uDBFF]/;function ge(e){let t=e.length;if(!he.test(e))return t;let n=t;for(let r=0;r<t-1;r++)(e.charCodeAt(r)&64512)==55296&&(e.charCodeAt(r+1)&64512)==56320&&(n--,r++);return n}function _e(e){return Array.isArray(e)?`array`:typeof e==`string`?`string`:`unknown`}function ve(e){let t=typeof e;switch(t){case`number`:return Number.isNaN(e)?`nan`:`number`;case`object`:{if(e===null)return`null`;if(Array.isArray(e))return`array`;let t=e;if(t&&Object.getPrototypeOf(t)!==Object.prototype&&`constructor`in t&&t.constructor)return t.constructor.name}}return t}function ye(...e){let[t,n,r]=e;return typeof t==`string`?{message:t,code:`custom`,input:n,inst:r}:{...t}}function be(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);r.get?Object.defineProperty(e,n,{...r,enumerable:!1}):Ce(e,n,r.value)}}function xe(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function Se(e,t,n){return xe(e,t,n,!1)}function Ce(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:xe(this,t,n.bind(this))},set(e){xe(this,t,e)}})}function we(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}let Te,Ee=!1;const De={configurable:!0,get(){Ee=!0}};function w(e,t,n){let r=Object.getPrototypeOf(e._zod);if(t in r&&Te!==e._zod){Te=void 0;return}Te=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,De);let e=Ee;Ee=!1;try{let r=n(this);return Ee?delete this[t]:Object.defineProperty(this,t,{configurable:!0,writable:!0,value:r}),Ee||=e,r}catch(n){throw delete this[t],Ee||=e,n}},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:e})}})}function Oe(e,t,n,r){let i=we(e,t);i&&Object.defineProperty(i,t,{configurable:!0,get(){let e={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,e),e.value=n(this),Object.defineProperty(this,t,e),e.value},set(e){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:e})}})}function ke(e){let t=()=>e;return t[`~constantCatch`]=!0,t}var Ae;const je={value:void 0,enumerable:!1};let Me=`captureStackTrace`in Error?Error:null;function Ne(e){let t=Me;if(t){let n=t.stackTraceLimit;if(typeof n==`number`){try{t.stackTraceLimit=0}catch{return Me=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function T(e,t,n,r){let i={};function a(e){this.def=e,this.constr=d,this.traits=new Set}a.prototype=i;let o=n,s=o&&new WeakSet;function c(n,r){if(!n._zod){je.value=new a(r);try{Object.defineProperty(n,"_zod",je)}finally{je.value=void 0}}if(n._zod.traits.has(e))return;if(n._zod.traits.add(e),t(n,r),s){let e=Object.getPrototypeOf(n),t=n._zod.constr.prototype,r=e;for(;r&&r!==t;)r=Object.getPrototypeOf(r);let i=r??e;s.has(i)||(s.add(i),be(i,o))}let i=d.prototype;for(let e in i)Object.prototype.hasOwnProperty.call(i,e)&&(e in n||(n[e]=i[e].bind(n)))}let l=r?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function d(e){let t=r?.Parent?Ne(u):this;c(t,e);let n=t._zod.deferred;if(n){for(let e of n)e();t._zod.deferred=void 0}let i=globalThis.__zod_globalConfig?.postProcessor;return i&&i(t),t}return Object.defineProperty(d,"init",{value:c}),Object.defineProperty(d,Symbol.hasInstance,{value:t=>r?.Parent&&t instanceof r.Parent?!0:t?._zod?.traits?.has(e)}),Object.defineProperty(d,"name",{value:e}),d}var Pe=class extends Error{constructor(){super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`)}},Fe=class extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`),this.name=`ZodEncodeError`}};(Ae=globalThis).__zod_globalConfig??(Ae.__zod_globalConfig={});const E=globalThis.__zod_globalConfig;function D(e){return e&&Object.assign(E,e),E}function Ie(){let e=this._zod;return e.message??=JSON.stringify(e.def,a,2),e.message}function Le(e){this._zod.message=e}const Re={get:Ie,set:Le,enumerable:!0,configurable:!0},ze={value:void 0,enumerable:!1},Be={value:void 0,enumerable:!1},Ve=new WeakSet([Object.prototype,Error.prototype]),He=(e,t)=>{e.name=`$ZodError`,ze.value=e._zod,Object.defineProperty(e,"_zod",ze),Be.value=t,Object.defineProperty(e,"issues",Be),ze.value=void 0,Be.value=void 0,Object.defineProperty(e,"message",Re);let n=Object.getPrototypeOf(e);Ve.has(n)||(Ve.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let e=()=>this.message;return Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,"toString",{value:e,configurable:!0,writable:!0})}}))},Ue=T(`$ZodError`,He),We=T(`$ZodError`,He,void 0,{Parent:Error});function Ge(e,t,n){return Object.prototype.hasOwnProperty.call(e,t)||(t===`__proto__`?Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0}):e[t]=n()),e[t]}function Ke(e,t=e=>e.message){let n={},r=[];for(let i of e.issues)i.path.length>0?Ge(n,i.path[0],()=>[]).push(t(i)):r.push(t(i));return{formErrors:r,fieldErrors:n}}function qe(e,t=e=>e.message){let n={_errors:[]},r=(e,i=[])=>{for(let a of e.issues)if(a.code===`invalid_union`&&a.errors.length)a.errors.map(e=>r({issues:e},[...i,...a.path]));else if(a.code===`invalid_key`)r({issues:a.issues},[...i,...a.path]);else if(a.code===`invalid_element`)r({issues:a.issues},[...i,...a.path]);else{let e=[...i,...a.path];if(e.length===0)n._errors.push(t(a));else{let r=n,i=0;for(;i<e.length;){let n=e[i],o=i===e.length-1;if(n===`_errors`){o&&r._errors.push(t(a)),i++;continue}Object.prototype.hasOwnProperty.call(r,n)||Object.defineProperty(r,n,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let s=r[n];o&&s._errors.push(t(a)),r=s,i++}}}};return r(e),n}function Je(e,t){return{callee:t?.callee??e,Err:t?.Err}}const Ye=e=>{let t=(n,r,i,a)=>{let o=i?{...i,async:!1}:{async:!1},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise)throw new Pe;if(s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>me(e,o,D())));throw m(n,a?.callee??t),n}return s.value};return t},Xe=e=>{let t=async(n,r,i,a)=>{let o=i?{...i,async:!0}:{async:!0},s=n._zod.run({value:r,issues:[]},o);if(s instanceof Promise&&(s=await s),s.issues.length){let n=new((a?.Err)??e)(s.issues.map(e=>me(e,o,D())));throw m(n,a?.callee??t),n}return s.value};return t},Ze=e=>(t,n,r)=>{let i=r?{...r,async:!1}:{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new Pe;return a.issues.length?{success:!1,error:new(e??Ue)(a.issues.map(e=>me(e,i,D())))}:{success:!0,data:a.value}},Qe=Ze(We),$e=e=>async(t,n,r)=>{let i=r?{...r,async:!0}:{async:!0},a=t._zod.run({value:n,issues:[]},i);return a instanceof Promise&&(a=await a),a.issues.length?{success:!1,error:new e(a.issues.map(e=>me(e,i,D())))}:{success:!0,data:a.value}},et=$e(We),tt=e=>{let t=Ye(e),n=(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return t(e,r,o,Je(n,a))};return n},nt=e=>{let t=Ye(e),n=(e,r,i,a)=>t(e,r,i,Je(n,a));return n},rt=e=>{let t=Xe(e),n=async(e,r,i,a)=>{let o=i?{...i,direction:`backward`}:{direction:`backward`};return await t(e,r,o,Je(n,a))};return n},it=e=>{let t=Xe(e),n=async(e,r,i,a)=>await t(e,r,i,Je(n,a));return n},at=e=>(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return Ze(e)(t,n,i)},ot=e=>(t,n,r)=>Ze(e)(t,n,r),st=e=>async(t,n,r)=>{let i=r?{...r,direction:`backward`}:{direction:`backward`};return $e(e)(t,n,i)},ct=e=>async(t,n,r)=>$e(e)(t,n,r),lt=/^[cC][0-9a-z]{6,}$/,ut=/^[0-9a-z]+$/,dt=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,ft=/^[0-9a-vA-V]{20}$/,pt=/^[A-Za-z0-9]{27}$/,mt=/^[a-zA-Z0-9_-]{21}$/;function ht(e){return RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}const gt=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,_t=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,vt=e=>e?RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,yt=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;function bt(){return RegExp(`^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$`,`u`)}const xt=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,St=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,Ct=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,wt=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Tt=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Et=/^[A-Za-z0-9_-]*$/,Dt=/^https?$/,Ot=/^\+[1-9]\d{6,14}$/,kt=`(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;function At(e){return RegExp(`^${e}$`)}const jt=At(kt);function Mt(e){let t=`(?:[01]\\d|2[0-3]):[0-5]\\d`;return typeof e.precision==`number`?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?`${t}:[0-5]\\d(?:\\.\\d+)?`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Nt(e){return RegExp(`^${Mt(e)}$`)}function Pt(e){let t=[`Z`];e.offset&&t.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);let n=`${Mt({precision:e.precision,seconds:!0})}(?:${t.join(`|`)})`,r=e.local?`${n}|${Mt({precision:e.precision})}`:n;return RegExp(`^${kt}T(?:${r})$`)}const Ft=e=>{let t=e?`[\\s\\S]{${e?.minimum??0},${e?.maximum??``}}`:`[\\s\\S]*`;return RegExp(`^${t}$`)},It=/^-?\d+$/,Lt=/^-?\d+(?:\.\d+)?$/,Rt=/^(?:true|false)$/i,zt=/^[^A-Z]*$/,Bt=/^[^a-z]*$/,O=T(`$ZodCheck`,(e,t)=>{var n;e._zod??={},e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),Vt=e=>{let t=e.value;return!s(t)&&t.length!==void 0},Ht={number:`number`,bigint:`bigint`,object:`date`},Ut=T(`$ZodCheckLessThan`,(e,t)=>{O.init(e,t);let n=Ht[typeof t.value];e._zod.onattach.push(e=>{let n=e._zod.bag,r=(t.inclusive?n.maximum:n.exclusiveMaximum)??1/0;t.value<r&&(t.inclusive?n.maximum=t.value:n.exclusiveMaximum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:Ht[typeof r.value]??n,code:`too_big`,maximum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Wt=T(`$ZodCheckGreaterThan`,(e,t)=>{O.init(e,t);let n=Ht[typeof t.value];e._zod.onattach.push(e=>{let n=e._zod.bag,r=(t.inclusive?n.minimum:n.exclusiveMinimum)??-1/0;t.value>r&&(t.inclusive?n.minimum=t.value:n.exclusiveMinimum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:Ht[typeof r.value]??n,code:`too_small`,minimum:typeof t.value==`object`?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Gt=T(`$ZodCheckMultipleOf`,(e,t)=>{O.init(e,t),e._zod.onattach.push(e=>{var n;(n=e._zod.bag).multipleOf??(n.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw Error(`Cannot mix number and bigint in multiple_of check.`);(typeof n.value==`bigint`?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):l(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:`not_multiple_of`,divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Kt=T(`$ZodCheckNumberFormat`,(e,t)=>{O.init(e,t),t.format=t.format||`float64`;let n=t.format?.includes(`int`),r=n?`int`:`number`,[i,a]=te[t.format];e._zod.onattach.push(e=>{let r=e._zod.bag;r.format=t.format,r.minimum=i,r.maximum=a,n&&(r.pattern=It)}),e._zod.check=o=>{let s=o.value;if(n){if(!Number.isInteger(s)){o.issues.push({expected:r,format:t.format,code:`invalid_type`,continue:!1,input:s,inst:e});return}if(!Number.isSafeInteger(s)){s>0?o.issues.push({input:s,code:`too_big`,maximum:2**53-1,note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort}):o.issues.push({input:s,code:`too_small`,minimum:-(2**53-1),note:`Integers must be within the safe integer range.`,inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}s<i&&o.issues.push({origin:`number`,input:s,code:`too_small`,minimum:i,inclusive:!0,inst:e,continue:!t.abort}),s>a&&o.issues.push({origin:`number`,input:s,code:`too_big`,maximum:a,inclusive:!0,inst:e,continue:!t.abort})}}),qt=T(`$ZodCheckMaxLength`,(e,t)=>{var n;O.init(e,t),(n=e._zod.def).when??(n.when=Vt),e._zod.onattach.push(e=>{let n=e._zod.bag.maximum??1/0;t.maximum<n&&(e._zod.bag.maximum=t.maximum)}),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>t.maximum?ge(r):i)<=t.maximum)return;let a=_e(r);n.issues.push({origin:a,code:`too_big`,maximum:t.maximum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Jt=T(`$ZodCheckMinLength`,(e,t)=>{var n;O.init(e,t),(n=e._zod.def).when??(n.when=Vt),e._zod.onattach.push(e=>{let n=e._zod.bag.minimum??-1/0;t.minimum>n&&(e._zod.bag.minimum=t.minimum)}),e._zod.check=n=>{let r=n.value,i=r.length;if((typeof r==`string`&&i>=t.minimum&&i<t.minimum*2?ge(r):i)>=t.minimum)return;let a=_e(r);n.issues.push({origin:a,code:`too_small`,minimum:t.minimum,inclusive:!0,input:r,inst:e,continue:!t.abort})}}),Yt=T(`$ZodCheckLengthEquals`,(e,t)=>{var n;O.init(e,t),(n=e._zod.def).when??(n.when=Vt),e._zod.onattach.push(e=>{let n=e._zod.bag;n.minimum=t.length,n.maximum=t.length,n.length=t.length}),e._zod.check=n=>{let r=n.value,i=r.length,a=typeof r==`string`&&i>=t.length&&i<=t.length*2?ge(r):i;if(a===t.length)return;let o=_e(r),s=a>t.length;n.issues.push({origin:o,...s?{code:`too_big`,maximum:t.length}:{code:`too_small`,minimum:t.length},inclusive:!0,exact:!0,input:n.value,inst:e,continue:!t.abort})}}),Xt=T(`$ZodCheckStringFormat`,(e,t)=>{var n,r;O.init(e,t),e._zod.onattach.push(e=>{let n=e._zod.bag;n.format=t.format,t.pattern&&(n.patterns??=new Set,n.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:`string`,code:`invalid_format`,format:t.format,input:n.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(r=e._zod).check??(r.check=()=>{})}),Zt=T(`$ZodCheckRegex`,(e,t)=>{Xt.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:`string`,code:`invalid_format`,format:`regex`,input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),Qt=T(`$ZodCheckLowerCase`,(e,t)=>{t.pattern??=zt,Xt.init(e,t)}),$t=T(`$ZodCheckUpperCase`,(e,t)=>{t.pattern??=Bt,Xt.init(e,t)}),en=T(`$ZodCheckIncludes`,(e,t)=>{O.init(e,t);let n=b(t.includes),r=new RegExp(typeof t.position==`number`?`^.{${t.position},}${n}`:n);t.pattern=r,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(r)}),e._zod.check=n=>{n.value.includes(t.includes,t.position)||n.issues.push({origin:`string`,code:`invalid_format`,format:`includes`,includes:t.includes,input:n.value,inst:e,continue:!t.abort})}}),tn=T(`$ZodCheckStartsWith`,(e,t)=>{O.init(e,t);let n=RegExp(`^${b(t.prefix)}.*`);t.pattern??=n,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(n)}),e._zod.check=n=>{n.value.startsWith(t.prefix)||n.issues.push({origin:`string`,code:`invalid_format`,format:`starts_with`,prefix:t.prefix,input:n.value,inst:e,continue:!t.abort})}}),nn=T(`$ZodCheckEndsWith`,(e,t)=>{O.init(e,t);let n=RegExp(`.*${b(t.suffix)}$`);t.pattern??=n,e._zod.onattach.push(e=>{let t=e._zod.bag;t.patterns??=new Set,t.patterns.add(n)}),e._zod.check=n=>{n.value.endsWith(t.suffix)||n.issues.push({origin:`string`,code:`invalid_format`,format:`ends_with`,suffix:t.suffix,input:n.value,inst:e,continue:!t.abort})}}),rn=T(`$ZodCheckOverwrite`,(e,t)=>{O.init(e,t),e._zod.check=e=>{e.value=t.tx(e.value)}});var an=class{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1,e(this),--this.indent}write(e){if(typeof e==`function`){e(this,{execution:`sync`}),e(this,{execution:`async`});return}let t=e.split(`
`).filter(e=>e),n=Math.min(...t.map(e=>e.length-e.trimStart().length)),r=t.map(e=>e.slice(n)).map(e=>` `.repeat(this.indent*2)+e);for(let e of r)this.content.push(e)}compile(){let e=Function,t=this?.content??[``];return new e(...Object.keys(this.closed),`return function (${this.args.join(`, `)}) {\n${t.join(`
`)}\n};`)(...Object.values(this.closed))}};const on={major:4,minor:5,patch:4},k=T(`$ZodType`,(e,t)=>{var n;e??={},e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=on;let r=e._zod.def.checks,i=e._zod.traits.has(`$ZodCheck`)?[e,...r??[]]:r?.length?[...r]:[];for(let t of i)for(let n of t._zod.onattach)n(e);if(i.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let t=(t,n,r)=>{if(t.memo)return t;let i=le(t),a;for(let o of n){if(o._zod.def.when){if(ue(t)||!o._zod.def.when(t))continue}else if(i)continue;let n=t.issues.length,s=o._zod.check(t);if(s instanceof Promise&&r?.async===!1)throw new Pe;if(a||s instanceof Promise)a=(a??Promise.resolve()).then(async()=>{await s,t.issues.length!==n&&(pe(t.issues,n,e),i||=le(t,n))});else{if(t.issues.length===n)continue;pe(t.issues,n,e),i||=le(t,n)}}return a?a.then(()=>t):t},n=(n,r,a)=>{if(le(n))return n.aborted=!0,n;let o=t(r,i,a);if(o instanceof Promise){if(a.async===!1)throw new Pe;return o.then(t=>e._zod.parse(t,a))}return e._zod.parse(o,a)};e._zod.run=(r,a)=>{if(a.skipChecks)return e._zod.parse(r,a);if(a.direction===`backward`){let t=e._zod.parse({value:r.value,issues:[]},{...a,skipChecks:!0});return t instanceof Promise?t.then(e=>n(e,r,a)):n(t,r,a)}let o=e._zod.parse(r,a);if(o instanceof Promise){if(a.async===!1)throw new Pe;return o.then(e=>t(e,i,a))}return t(o,i,a)}}},{get"~standard"(){return Se(this,`~standard`,cn(this))},set"~standard"(e){xe(this,`~standard`,e)}}),sn=e=>e.success?{value:e.data}:{issues:e.error?.issues};function cn(e){return{validate:t=>{try{return sn(Qe(e,t))}catch{return et(e,t).then(sn)}},vendor:`zod`,version:1}}const ln=T(`$ZodString`,(e,t)=>{k.init(e,t),e._zod.pattern=[...e?._zod.bag?.patterns??[]].pop()??Ft(e._zod.bag),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch{}return typeof n.value==`string`||n.issues.push({expected:`string`,code:`invalid_type`,input:n.value,inst:e}),n}}),A=T(`$ZodStringFormat`,(e,t)=>{Xt.init(e,t),ln.init(e,t)}),un=T(`$ZodGUID`,(e,t)=>{t.pattern??=_t,A.init(e,t)}),dn=T(`$ZodUUID`,(e,t)=>{if(t.version){let e={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(e===void 0)throw Error(`Invalid UUID version: "${t.version}"`);t.pattern??=vt(e)}else t.pattern??=vt();A.init(e,t)}),fn=T(`$ZodEmail`,(e,t)=>{t.pattern??=yt,A.init(e,t)});function pn(e,t){if(!t.normalize&&t.protocol?.source===Dt.source&&!/^https?:\/\//i.test(e))return 1;try{return new URL(e)}catch{return 2}}const mn=/[\t\n\r]/g;function hn(e){return e.replace(mn,``)}function gn(e,t){return t.lastIndex=0,t.test(e.hostname)}function _n(e,t){return t.lastIndex=0,t.test(e.protocol.endsWith(`:`)?e.protocol.slice(0,-1):e.protocol)}const vn=T(`$ZodURL`,(e,t)=>{A.init(e,t),e._zod.check=n=>{try{let r=n.value.trim(),i=pn(r,t);if(i===1){n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid URL format`,input:n.value,inst:e,continue:!t.abort});return}if(i===2){n.issues.push({code:`invalid_format`,format:`url`,input:n.value,inst:e,continue:!t.abort});return}t.hostname&&!gn(i,t.hostname)&&n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid hostname`,pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort}),t.protocol&&!_n(i,t.protocol)&&n.issues.push({code:`invalid_format`,format:`url`,note:`Invalid protocol`,pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort}),n.value=t.normalize?i.href:hn(r);return}catch{n.issues.push({code:`invalid_format`,format:`url`,input:n.value,inst:e,continue:!t.abort})}}}),yn=T(`$ZodEmoji`,(e,t)=>{t.pattern??=bt(),A.init(e,t)}),bn=T(`$ZodNanoID`,(e,t)=>{if(t.length!==void 0&&(!Number.isInteger(t.length)||t.length<1))throw Error(`Invalid nanoid length: ${t.length}`);t.pattern??=t.length===void 0?mt:ht(t.length),A.init(e,t)}),xn=T(`$ZodCUID`,(e,t)=>{t.pattern??=lt,A.init(e,t)}),Sn=T(`$ZodCUID2`,(e,t)=>{t.pattern??=ut,A.init(e,t)}),Cn=T(`$ZodULID`,(e,t)=>{t.pattern??=dt,A.init(e,t)}),wn=T(`$ZodXID`,(e,t)=>{t.pattern??=ft,A.init(e,t)}),Tn=T(`$ZodKSUID`,(e,t)=>{t.pattern??=pt,A.init(e,t)}),En=T(`$ZodISODateTime`,(e,t)=>{t.pattern??=Pt(t),A.init(e,t),(t.local||t.precision===-1)&&(e._zod.bag.laxFormat=!0,e._zod.onattach.push(e=>{e._zod.bag.laxFormat=!0}))}),Dn=T(`$ZodISODate`,(e,t)=>{t.pattern??=jt,A.init(e,t)}),On=T(`$ZodISOTime`,(e,t)=>{t.pattern??=Nt(t),A.init(e,t)}),kn=T(`$ZodISODuration`,(e,t)=>{t.pattern??=gt,A.init(e,t)}),An=T(`$ZodIPv4`,(e,t)=>{t.pattern??=xt,A.init(e,t),e._zod.bag.format=`ipv4`}),jn=/^[0-9a-fA-F:.]+$/;function Mn(e){if(!jn.test(e))return!1;try{return new URL(`http://[${e}]`),!0}catch{return!1}}const Nn=T(`$ZodIPv6`,(e,t)=>{t.pattern??=St,A.init(e,t),e._zod.bag.format=`ipv6`,e._zod.check=n=>{Mn(n.value)||n.issues.push({code:`invalid_format`,format:`ipv6`,input:n.value,inst:e,continue:!t.abort})}}),Pn=T(`$ZodCIDRv4`,(e,t)=>{t.pattern??=Ct,A.init(e,t)});function Fn(e){let t=e.split(`/`);if(t.length!==2)return!1;let[n,r]=t;if(!r)return!1;let i=Number(r);return`${i}`!==r||i<0||i>128?!1:Mn(n)}const In=T(`$ZodCIDRv6`,(e,t)=>{t.pattern??=wt,A.init(e,t),e._zod.check=n=>{Fn(n.value)||n.issues.push({code:`invalid_format`,format:`cidrv6`,input:n.value,inst:e,continue:!t.abort})}});function Ln(e){if(e===``)return!0;if(/\s/.test(e)||e.length%4!=0)return!1;try{return atob(e),!0}catch{return!1}}const Rn=T(`$ZodBase64`,(e,t)=>{t.pattern??=Tt,A.init(e,t),e._zod.bag.contentEncoding=`base64`,e._zod.check=n=>{Ln(n.value)||n.issues.push({code:`invalid_format`,format:`base64`,input:n.value,inst:e,continue:!t.abort})}});function zn(e){if(!Et.test(e))return!1;let t=e.replace(/[-_]/g,e=>e===`-`?`+`:`/`);return Ln(t.padEnd(Math.ceil(t.length/4)*4,`=`))}const Bn=T(`$ZodBase64URL`,(e,t)=>{t.pattern??=Et,A.init(e,t),e._zod.bag.contentEncoding=`base64url`,e._zod.check=n=>{zn(n.value)||n.issues.push({code:`invalid_format`,format:`base64url`,input:n.value,inst:e,continue:!t.abort})}}),Vn=T(`$ZodE164`,(e,t)=>{t.pattern??=Ot,A.init(e,t)});function Hn(e,t=null){try{let n=e.split(`.`);if(n.length!==3)return!1;let[r]=n;if(!r)return!1;let i=JSON.parse(atob(r));return!(`typ`in i&&i?.typ!==`JWT`||!i.alg||t&&(!(`alg`in i)||i.alg!==t))}catch{return!1}}const Un=T(`$ZodJWT`,(e,t)=>{A.init(e,t),e._zod.check=n=>{Hn(n.value,t.alg)||n.issues.push({code:`invalid_format`,format:`jwt`,input:n.value,inst:e,continue:!t.abort})}}),Wn=T(`$ZodNumber`,(e,t)=>{k.init(e,t),e._zod.pattern=e._zod.bag.pattern??Lt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}let i=n.value;if(typeof i==`number`&&!Number.isNaN(i)&&Number.isFinite(i))return n;let a=typeof i==`number`?Number.isNaN(i)?`NaN`:Number.isFinite(i)?void 0:String(i):void 0;return n.issues.push({expected:`number`,code:`invalid_type`,input:i,inst:e,...a?{received:a}:{}}),n}}),Gn=T(`$ZodNumberFormat`,(e,t)=>{Kt.init(e,t),Wn.init(e,t)}),Kn=T(`$ZodBoolean`,(e,t)=>{k.init(e,t),e._zod.pattern=Rt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=!!n.value}catch{}let i=n.value;return typeof i==`boolean`||n.issues.push({expected:`boolean`,code:`invalid_type`,input:i,inst:e}),n}}),qn=T(`$ZodUnknown`,(e,t)=>{k.init(e,t),e._zod.parse=e=>e}),Jn=T(`$ZodNever`,(e,t)=>{k.init(e,t),e._zod.parse=(t,n)=>(t.issues.push({expected:`never`,code:`invalid_type`,input:t.value,inst:e}),t)});function Yn(e,t,n){e.issues.length&&t.issues.push(...de(n,e.issues)),t.value[n]=e.value}const Xn=T(`$ZodArray`,(e,t)=>{k.init(e,t);let n=E.memoizer;n?.attach(e),e._zod.parse=(r,i)=>{let a=r.value;if(!Array.isArray(a))return r.issues.push({expected:`array`,code:`invalid_type`,input:a,inst:e}),r;r.value=n?n.alloc(e,r,Array(a.length),i):Array(a.length);let o=[];for(let e=0;e<a.length;e++){let n=a[e],s=t.element._zod.run({value:n,issues:[]},i);s instanceof Promise?o.push(s.then(t=>Yn(t,r,e))):Yn(s,r,e)}return o.length?Promise.all(o).then(()=>r):r}});function Zn(e,t,n,r,i,a){let o=n in r,s=a===`optional`;if(!(!o&&s&&i===`optional`)){if(e.issues.length){if(i!==void 0&&s&&!o)return;t.issues.push(...de(n,e.issues))}if(!o&&i===void 0){e.issues.length||t.issues.push({code:`invalid_type`,expected:`nonoptional`,input:void 0,path:[n]});return}e.value===void 0?o&&(t.value[n]=void 0):t.value[n]=e.value}}const Qn=[];function $n(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:Qn,i=r.length?[...t,...r]:t;for(let t of i)if(!e.shape?.[t]?._zod?.traits?.has(`$ZodType`))throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);let a=ee(e.shape);return{...e,allKeys:i,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(a)}}function er(e,t,n,r,i,a){let o=[],s=i.keySet,c=i.catchall._zod,l=c.def.type,u=c.optin,d=c.optout;for(let i in t){if(s.has(i))continue;if(i===`__proto__`){l===`never`&&o.push(i);continue}if(l===`never`){o.push(i);continue}let a=c.run({value:t[i],issues:[]},r);a instanceof Promise?e.push(a.then(e=>Zn(e,n,i,t,u,d))):Zn(a,n,i,t,u,d)}return o.length&&n.issues.push({code:`unrecognized_keys`,keys:o,input:t,inst:a,continue:!0}),e.length?Promise.all(e).then(()=>n):n}const tr=new WeakMap,nr=T(`$ZodObject`,(e,t)=>{if(k.init(e,t),!Object.getOwnPropertyDescriptor(t,`shape`)?.get){let e=t.shape;tr.set(t,e),Object.defineProperty(t,"shape",{get:()=>{let n={...e};return Object.defineProperty(t,"shape",{value:n}),tr.set(t,n),n}})}let n=o(()=>$n(t));w(e,`propValues`,e=>{let t=e.def.shape,n={};for(let e in t){let r=t[e]._zod;if(r.values){Object.prototype.hasOwnProperty.call(n,e)||u(n,e,new Set);for(let t of r.values)n[e].add(t);r.optin!==void 0&&n[e].add(void 0)}}return n});let r=h,i=t.catchall,a,s=E.memoizer;s?.attach(e),e._zod.parse=(t,o)=>{a??=n.value;let c=t.value;if(!r(c))return t.issues.push({expected:`object`,code:`invalid_type`,input:c,inst:e}),t;t.value=s?s.alloc(e,t,{},o):{};let l=[],u=a.shape;for(let e of a.allKeys){if(e===`__proto__`)continue;let n=u[e],r=n._zod.optin,i=n._zod.optout,a=n._zod.run({value:c[e],issues:[]},o);a instanceof Promise?l.push(a.then(n=>Zn(n,t,e,c,r,i))):Zn(a,t,e,c,r,i)}return i?er(l,c,t,o,n.value,e):l.length?Promise.all(l).then(()=>t):t}}),rr=T(`$ZodObjectJIT`,(e,t)=>{nr.init(e,t);let n=e._zod.parse,r=o(()=>$n(t)),i=E.memoizer,a=t=>{let n=r.value,a=n.symbolKeys,o=new an([`payload`,`ctx`],{shape:t,inst:e,memo:i,syms:a}),s=e=>`shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`,c=(e,t)=>`
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
          }`;o.write(`const input = payload.value;`);let l=Object.create(null),u=0;for(let e of n.allKeys)l[e]=`key_${u++}`;o.write(i?`const newResult = memo.alloc(inst, payload, {}, ctx);`:`const newResult = {};`);for(let e of n.allKeys){if(e===`__proto__`)continue;let n=l[e],r=typeof e==`symbol`?`syms[${a.indexOf(e)}]`:f(e),i=`${r} in input`,u=t[e],d=u?._zod?.optin,p=d!==void 0,m=u?._zod?.optout===`optional`;if(o.write(`const ${n} = ${s(r)};`),p&&m){let e=d===`optional`?`${n}_present`:`${n}.value !== undefined || ${n}_present`;o.write(`
        const ${n}_present = ${i};
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
          if (${i}) {
            newResult[${r}] = undefined;
          }
        } else {
          newResult[${r}] = ${n}.value;
        }

      `):o.write(`
        const ${n}_present = ${i};
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

      `)}return o.write(`payload.value = newResult;`),o.write(`return payload;`),o.compile()},s,c=h,l=!E.jitless,u=l&&g.value,d=t.catchall,p;e._zod.parse=(i,o)=>{p??=r.value;let f=i.value;return c(f)?l&&u&&o?.async===!1&&o.jitless!==!0?(s||=a(t.shape),i=s(i,o),d?er([],f,i,o,p,e):i):n(i,o):(i.issues.push({expected:`object`,code:`invalid_type`,input:f,inst:e}),i)}});function ir(e,t,n,r){for(let n of e)if(n.issues.length===0)return t.value=n.value,t;let i=e.filter(e=>!le(e));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:`invalid_union`,input:t.value,inst:n,errors:e.map(e=>e.issues.map(e=>me(e,r,D())))}),t)}const ar=T(`$ZodUnion`,(e,t)=>{k.init(e,t),w(e,`optin`,e=>e.def.options.some(e=>e._zod.optin===`defaulted`)?`defaulted`:e.def.options.some(e=>e._zod.optin!==void 0)?`optional`:void 0),w(e,`optout`,e=>e.def.options.some(e=>e._zod.optout===`optional`)?`optional`:void 0),w(e,`values`,e=>{if(e.def.options.every(e=>e._zod.values))return new Set(e.def.options.flatMap(e=>Array.from(e._zod.values)))}),w(e,`pattern`,e=>{if(e.def.options.every(e=>e._zod.pattern)){let t=e.def.options.map(e=>e._zod.pattern);return RegExp(`^(${t.map(e=>c(e.source)).join(`|`)})$`)}});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,i)=>{if(n)return n(r,i);let a=!1,o=[];for(let e of t.options){let t=e._zod.run({value:r.value,issues:[]},i);if(t instanceof Promise)o.push(t),a=!0;else{if(t.issues.length===0)return t;o.push(t)}}return a?Promise.all(o).then(t=>ir(t,r,e,i)):ir(o,r,e,i)}}),or=T(`$ZodDiscriminatedUnion`,(e,t)=>{t.inclusive=!1,ar.init(e,t);let n=e._zod.parse;w(e,`propValues`,e=>{let t={};for(let n of e.def.options){let r=n._zod.propValues;if(!r||Object.keys(r).length===0)throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(n)}"`);for(let[e,n]of Object.entries(r)){Object.prototype.hasOwnProperty.call(t,e)||u(t,e,new Set);for(let r of n)t[e].add(r)}}return t}),t.options.forEach((e,n)=>{let r=tr.get(e._zod.def);if(r&&!Object.prototype.hasOwnProperty.call(r,t.discriminator))throw Error(`Invalid discriminated union option at index "${n}"`)});let r=o(()=>{let e=t.options,n=new Map;for(let r of e){let e=r._zod.propValues?.[t.discriminator];if(!e||e.size===0)throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);for(let t of e){if(n.has(t))throw Error(`Duplicate discriminator value "${String(t)}"`);n.set(t,r)}}return n});e._zod.parse=(i,a)=>{let o=i.value;if(!h(o))return i.issues.push({code:`invalid_type`,expected:`object`,input:o,inst:e}),i;let s=r.value.get(o?.[t.discriminator]);return s?s._zod.run(i,a):t.unionFallback||a.direction===`backward`?n(i,a):(i.issues.push({code:`invalid_union`,errors:[],note:`No matching discriminator`,discriminator:t.discriminator,options:Array.from(r.value.keys()),input:o,path:[t.discriminator],inst:e}),i)}}),sr=T(`$ZodIntersection`,(e,t)=>{k.init(e,t),e._zod.parse=(e,n)=>{let r=e.value,i=t.left._zod.run({value:r,issues:[]},n),a=t.right._zod.run({value:r,issues:[]},n);return i instanceof Promise||a instanceof Promise?Promise.all([i,a]).then(([t,n])=>lr(e,t,n)):lr(e,i,a)}});function cr(e,t){if(e===t||e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(_(e)&&_(t)){let n=Object.keys(t),r=Object.keys(e).filter(e=>n.indexOf(e)!==-1),i={...e,...t};Object.prototype.hasOwnProperty.call(i,`__proto__`)&&delete i.__proto__;for(let n of r){if(n===`__proto__`)continue;let r=cr(e[n],t[n]);if(!r.valid)return{valid:!1,mergeErrorPath:[n,...r.mergeErrorPath]};i[n]=r.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let i=e[r],a=t[r],o=cr(i,a);if(!o.valid)return{valid:!1,mergeErrorPath:[r,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function lr(e,t,n){let r=new Map,i,a=new Map,o=(e,t)=>{let n;if(e.code===`unrecognized_keys`&&!e.path?.length)i??=e,n=e.keys;else if(e.code===`invalid_key`&&e.origin===`record`&&e.path?.length===1){let t=String(e.path[0]);a.has(t)||a.set(t,e),n=[t]}else return!1;for(let e of n)r.has(e)||r.set(e,{}),r.get(e)[t]=!0;return!0};for(let n of t.issues)o(n,`l`)||e.issues.push(n);for(let t of n.issues)o(t,`r`)||e.issues.push(t);let s=[...r].filter(([,e])=>e.l&&e.r).map(([e])=>e);if(s.length){let t=i?s.filter(e=>i.keys.includes(e)):[];t.length&&e.issues.push({...i,keys:t});for(let n of s)!t.includes(n)&&a.has(n)&&e.issues.push(a.get(n))}let c=cr(t.value,n.value);if(!c.valid){if(le(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}const ur=T(`$ZodTuple`,(e,t)=>{k.init(e,t);let n=t.items,r=E.memoizer;r?.attach(e),e._zod.parse=(i,a)=>{let o=i.value;if(!Array.isArray(o))return i.issues.push({input:o,inst:e,expected:`tuple`,code:`invalid_type`}),i;i.value=r?r.alloc(e,i,[],a):[];let s=[],c=dr(n,`optin`),l=dr(n,`optout`);if(!t.rest){if(o.length<c)return i.issues.push({code:`too_small`,minimum:c,inclusive:!0,input:o,inst:e,origin:`array`}),i;o.length>n.length&&i.issues.push({code:`too_big`,maximum:n.length,inclusive:!0,input:o,inst:e,origin:`array`})}let u=Array(n.length);for(let e=0;e<n.length;e++){let t=n[e]._zod.run({value:o[e],issues:[]},a);t instanceof Promise?s.push(t.then(t=>{u[e]=t})):u[e]=t}if(t.rest){let e=n.length-1,r=o.slice(n.length);for(let n of r){e++;let r=t.rest._zod.run({value:n,issues:[]},a);r instanceof Promise?s.push(r.then(t=>fr(t,i,e))):fr(r,i,e)}}return s.length?Promise.all(s).then(()=>pr(u,i,n,o,l)):pr(u,i,n,o,l)}});function dr(e,t){for(let n=e.length-1;n>=0;n--)if(!(t===`optin`?e[n]._zod.optin!==void 0:e[n]._zod.optout===`optional`))return n+1;return 0}function fr(e,t,n){e.issues.length&&t.issues.push(...de(n,e.issues)),t.value[n]=e.value}function pr(e,t,n,r,i){for(let a=0;a<n.length;a++){let o=e[a],s=a<r.length;if(!s&&a>=i&&n[a]._zod.optin===`optional`){t.value.length=a;break}if(o.issues.length){if(!s&&a>=i){t.value.length=a;break}t.issues.push(...de(a,o.issues))}t.value[a]=o.value}for(let e=t.value.length-1;e>=r.length&&n[e]._zod.optout===`optional`&&t.value[e]===void 0;e--)t.value.length=e;return t}const mr=T(`$ZodEnum`,(e,t)=>{k.init(e,t);let n=r(t.entries),i=new Set(n);e._zod.values=i;let a=n.filter(e=>y.has(typeof e));e._zod.pattern=RegExp(a.length?`^(${a.map(e=>b(e.toString())).join(`|`)})$`:`^[^\\s\\S]$`),e._zod.parse=(t,r)=>{let a=t.value;return i.has(a)||t.issues.push({code:`invalid_value`,values:n,input:a,inst:e}),t}}),hr=T(`$ZodLiteral`,(e,t)=>{k.init(e,t);let n=new Set(t.values);e._zod.values=n,e._zod.pattern=RegExp(t.values.length?`^(${t.values.map(e=>typeof e==`string`?b(e):e?b(e.toString()):String(e)).join(`|`)})$`:`^[^\\s\\S]$`),e._zod.parse=(r,i)=>{let a=r.value;return n.has(a)||r.issues.push({code:`invalid_value`,values:t.values,input:a,inst:e}),r}}),gr=T(`$ZodTransform`,(e,t)=>{k.init(e,t),e._zod.optin=`optional`,E.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new Fe(e.constructor.name);let i=t.transform(n.value,n);if(r.async)return(i instanceof Promise?i:Promise.resolve(i)).then(e=>(n.value=e,n));if(i instanceof Promise)throw new Pe;return n.value=i,n}});function _r(e,t){return e.value=t.issues.length?void 0:t.value,e}const vr=T(`$ZodOptional`,(e,t)=>{k.init(e,t),w(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),e._zod.optout=`optional`,w(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t,void 0]):void 0}),w(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${c(t.source)})?$`):void 0}),e._zod.parse=(e,n)=>{if(e.value===void 0){if(t.innerType._zod.optin!==`defaulted`)return e;let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(t=>_r(e,t)):_r(e,r)}return t.innerType._zod.run(e,n)}}),yr=T(`$ZodExactOptional`,(e,t)=>{vr.init(e,t),w(e,`values`,e=>e.def.innerType._zod.values),w(e,`pattern`,e=>e.def.innerType._zod.pattern),e._zod.parse=(e,n)=>t.innerType._zod.run(e,n)}),br=T(`$ZodNullable`,(e,t)=>{k.init(e,t),w(e,`optin`,e=>e.def.innerType._zod.optin),w(e,`optout`,e=>e.def.innerType._zod.optout),w(e,`pattern`,e=>{let t=e.def.innerType._zod.pattern;return t?RegExp(`^(${c(t.source)}|null)$`):void 0}),w(e,`values`,e=>e.def.innerType._zod.values?new Set([...e.def.innerType._zod.values,null]):void 0),e._zod.parse=(e,n)=>e.value===null?e:t.innerType._zod.run(e,n)}),xr=T(`$ZodDefault`,(e,t)=>{k.init(e,t),e._zod.optin=`defaulted`,w(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);if(e.value===void 0)return e.value=t.defaultValue,e;let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(e=>Sr(e,t)):Sr(r,t)}});function Sr(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const Cr=T(`$ZodPrefault`,(e,t)=>{k.init(e,t),e._zod.optin=`defaulted`,w(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>(n.direction===`backward`||e.value===void 0&&(e.value=t.defaultValue),t.innerType._zod.run(e,n))}),wr=T(`$ZodNonOptional`,(e,t)=>{k.init(e,t),w(e,`values`,e=>{let t=e.def.innerType._zod.values;return t?new Set([...t].filter(e=>e!==void 0)):void 0}),e._zod.parse=(n,r)=>{let i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(t=>Tr(t,e)):Tr(i,e)}});function Tr(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:`invalid_type`,expected:`nonoptional`,input:e.value,inst:t}),e}function Er(e,t,n,r){return t.issues.length?(e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map(e=>me(e,r,D()))},input:e.value}),e):(e.value=t.value,t.memo&&(e.memo=!0),e)}const Dr=T(`$ZodCatch`,(e,t)=>{k.init(e,t),w(e,`optin`,e=>e.def.innerType._zod.optin===`defaulted`?`defaulted`:`optional`),w(e,`optout`,e=>e.def.innerType._zod.optout),w(e,`values`,e=>e.def.innerType._zod.values),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run({value:e.value,issues:[]},n);return r instanceof Promise?r.then(r=>Er(e,r,t,n)):Er(e,r,t,n)}}),Or=T(`$ZodPipe`,(e,t)=>{k.init(e,t),w(e,`values`,e=>e.def.in._zod.values),w(e,`optin`,e=>e.def.in._zod.optin),w(e,`optout`,e=>e.def.out._zod.optout),w(e,`propValues`,e=>e.def.in._zod.propValues),e._zod.parse=(e,n)=>{if(n.direction===`backward`){let r=t.out._zod.run(e,n);return r instanceof Promise?r.then(e=>kr(e,t.in,n)):kr(r,t.in,n)}let r=t.in._zod.run(e,n);return r instanceof Promise?r.then(e=>kr(e,t.out,n)):kr(r,t.out,n)}});function kr(e,t,n){return e.issues.some(e=>e.code!==`unrecognized_keys`)?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}const Ar=T(`$ZodReadonly`,(e,t)=>{k.init(e,t),w(e,`propValues`,e=>e.def.innerType._zod.propValues),w(e,`values`,e=>e.def.innerType._zod.values),w(e,`optin`,e=>e.def.innerType?._zod?.optin),w(e,`optout`,e=>e.def.innerType?._zod?.optout),e._zod.parse=(e,n)=>{if(n.direction===`backward`)return t.innerType._zod.run(e,n);let r=t.innerType._zod.run(e,n);return r instanceof Promise?r.then(jr):jr(r)}});function jr(e){return e.memo||(e.value=Object.freeze(e.value)),e}const Mr=T(`$ZodCustom`,(e,t)=>{O.init(e,t),k.init(e,t),e._zod.parse=(e,t)=>e,e._zod.check=n=>{let r=n.value,i=t.fn(r);if(i instanceof Promise)return i.then(t=>Nr(t,n,r,e));Nr(i,n,r,e)}});function Nr(e,t,n,r){if(!e){let e={code:`custom`,input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(e.params=r._zod.def.params),t.issues.push(ye(e))}}var Pr=class extends Error{constructor(){super(`Cannot parse a reference cycle that closes through a transform`),this.name=`ZodCyclicError`}};const Fr=`~memo`,Ir=[];function Lr(e){return e.map(e=>e.path?{...e,path:e.path.slice()}:{...e})}const Rr=new WeakMap;function zr(e,t){let n=Rr.get(e);if(n!==void 0)return n;if(t.has(e))return!0;t.add(e);let r=!1,i=e=>{!r&&e?._zod&&zr(e,t)&&(r=!0)},a=e._zod.def;switch(a.type){case`object`:for(let e of Reflect.ownKeys(a.shape))i(a.shape[e]);i(a.catchall);break;case`array`:i(a.element);break;case`tuple`:for(let e of a.items)i(e);i(a.rest);break;case`record`:case`map`:i(a.keyType),i(a.valueType);break;case`set`:i(a.valueType);break;case`union`:for(let e of a.options)i(e);break;case`intersection`:i(a.left),i(a.right);break;case`optional`:case`nullable`:case`default`:case`prefault`:case`catch`:case`readonly`:case`nonoptional`:case`promise`:case`success`:i(a.innerType);break;case`pipe`:i(a.in),i(a.out);break;case`function`:i(a.input),i(a.output);break;case`lazy`:i(e._zod.innerType);break;case`template_literal`:case`string`:case`number`:case`int`:case`boolean`:case`bigint`:case`symbol`:case`undefined`:case`null`:case`void`:case`never`:case`any`:case`unknown`:case`date`:case`nan`:case`enum`:case`literal`:case`file`:case`transform`:case`custom`:break;default:for(let e in a){let t=Object.getOwnPropertyDescriptor(a,e);if(!t||t.get)continue;let n=t.value;if(!(!n||typeof n!=`object`)){if(n._zod)i(n);else if(Array.isArray(n))for(let e of n)i(e)}}}return t.delete(e),Rr.set(e,r),r}function Br(e,t){let n=e.buckets.get(t);return n||(n=new Map,e.buckets.set(t,n)),n}let Vr;const Hr=[],Ur={alloc(e,t,n){let r=Vr;if(!r)return n;Vr=void 0;let i={value:n,issues:null};return r.set(t.value,i),Hr.push(i),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,n=(e,n)=>{if(n.direction!==`backward`&&Gr(n,e.value))throw new Pr;return t(e,n)};e._zod.parse=n,e._zod.run===t&&(e._zod.run=n)})},attach(e){var t;let n,r,i;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let t=e._zod.parse,a=(o,s)=>{if(n===void 0&&(n=zr(e,new Set),!n))return e._zod.parse=t,e._zod.run===a&&(e._zod.run=t),t(o,s);let c=o.value;if(typeof c!=`object`||!c)return t(o,s);let l=s[Fr];l||(l={buckets:new Map,backEdges:void 0},s[Fr]=l);let u;r===s?u=i:(u=Br(l,e),r=s,i=u);let d=u.get(c);if(d)return o.value=d.value,d.issues?d.issues.length&&o.issues.push(...Lr(d.issues)):(o.memo=!0,l.backEdges??(l.backEdges=new Set),l.backEdges.add(d.value)),o;Vr=u;let f=Hr.length,p=t(o,s);Vr=void 0;let m=Hr.length>f?Hr.pop():void 0;return p instanceof Promise?p.then(e=>(m&&(m.issues=e.issues.length?Lr(e.issues):Ir),e)):(m&&(m.issues=p.issues.length?Lr(p.issues):Ir),p)};e._zod.parse=a,e._zod.run===t&&(e._zod.run=a)})}};function Wr(){return Ur}function Gr(e,t){let n=e[Fr]?.backEdges;return n!==void 0&&typeof t==`object`&&!!t&&n.has(t)}const Kr=()=>{let e={string:{unit:`characters`,verb:`to have`},file:{unit:`bytes`,verb:`to have`},array:{unit:`items`,verb:`to have`},set:{unit:`items`,verb:`to have`},map:{unit:`entries`,verb:`to have`}};function t(t){return e[t]??null}let n={regex:`input`,email:`email address`,url:`URL`,emoji:`emoji`,uuid:`UUID`,uuidv4:`UUIDv4`,uuidv6:`UUIDv6`,nanoid:`nanoid`,guid:`GUID`,cuid:`cuid`,cuid2:`cuid2`,ulid:`ULID`,xid:`XID`,ksuid:`KSUID`,datetime:`ISO datetime`,date:`ISO date`,time:`ISO time`,duration:`ISO duration`,ipv4:`IPv4 address`,ipv6:`IPv6 address`,mac:`MAC address`,cidrv4:`IPv4 range`,cidrv6:`IPv6 range`,base64:`base64-encoded string`,base64url:`base64url-encoded string`,json_string:`JSON string`,e164:`E.164 number`,credit_card:`credit card number`,jwt:`JWT`,template_literal:`input`},r={nan:`NaN`};function a(e,t){return e===`number`&&typeof t==`number`&&!Number.isFinite(t)?String(t):r[e]??e}return e=>{switch(e.code){case`invalid_type`:return`Invalid input: expected ${a(e.expected)}, received ${a(ve(e.input),e.input)}`;case`invalid_value`:return e.values.length===1?`Invalid input: expected ${C(e.values[0])}`:`Invalid option: expected one of ${i(e.values,`|`)}`;case`too_big`:{let n=e.exact?`exactly `:e.inclusive?`<=`:`<`,r=t(e.origin);return r?`Too big: expected ${e.origin??`value`} to have ${n}${e.maximum.toString()} ${r.unit??`elements`}`:`Too big: expected ${e.origin??`value`} to be ${n}${e.maximum.toString()}`}case`too_small`:{let n=e.exact?`exactly `:e.inclusive?`>=`:`>`,r=t(e.origin);return r?`Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}`:`Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`}case`invalid_format`:{let t=e;return t.format===`starts_with`?`Invalid string: must start with "${t.prefix}"`:t.format===`ends_with`?`Invalid string: must end with "${t.suffix}"`:t.format===`includes`?`Invalid string: must include "${t.includes}"`:t.format===`regex`?`Invalid string: must match pattern ${t.pattern}`:`Invalid ${n[t.format]??e.format}`}case`not_multiple_of`:return`Invalid number: must be a multiple of ${e.divisor}`;case`unrecognized_keys`:return`Unrecognized key${e.keys.length>1?`s`:``}: ${i(e.keys,`, `)}`;case`invalid_key`:return`Invalid key in ${e.origin}`;case`invalid_union`:return e.options&&Array.isArray(e.options)&&e.options.length>0?`Invalid discriminator value. Expected ${e.options.map(e=>`'${e}'`).join(` | `)}`:e.inclusive===!1?`Invalid input: more than one option matched`:`Invalid input`;case`invalid_element`:return`Invalid value in ${e.origin}`;default:return`Invalid input`}}};function qr(){return{localeError:Kr()}}var Jr,Yr=class{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];return this._map.set(e,n),n&&typeof n==`object`&&`id`in n&&this._idmap.set(n.id,e),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);return t&&typeof t==`object`&&`id`in t&&this._idmap.delete(t.id),this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}};function Xr(){return new Yr}(Jr=globalThis).__zod_globalRegistry??(Jr.__zod_globalRegistry=Xr());const Zr=globalThis.__zod_globalRegistry;function Qr(e,t){return new e({type:`string`,...S(t)})}function $r(e,t){return new e({type:`string`,format:`email`,check:`string_format`,abort:!1,...S(t)})}function ei(e,t){return new e({type:`string`,format:`guid`,check:`string_format`,abort:!1,...S(t)})}function ti(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,...S(t)})}function ni(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v4`,...S(t)})}function ri(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v6`,...S(t)})}function ii(e,t){return new e({type:`string`,format:`uuid`,check:`string_format`,abort:!1,version:`v7`,...S(t)})}function ai(e,t){return new e({type:`string`,format:`url`,check:`string_format`,abort:!1,...S(t)})}function oi(e,t){return new e({type:`string`,format:`emoji`,check:`string_format`,abort:!1,...S(t)})}function si(e,t){return new e({type:`string`,format:`nanoid`,check:`string_format`,abort:!1,...S(t)})}function ci(e,t){return new e({type:`string`,format:`cuid`,check:`string_format`,abort:!1,...S(t)})}function li(e,t){return new e({type:`string`,format:`cuid2`,check:`string_format`,abort:!1,...S(t)})}function ui(e,t){return new e({type:`string`,format:`ulid`,check:`string_format`,abort:!1,...S(t)})}function di(e,t){return new e({type:`string`,format:`xid`,check:`string_format`,abort:!1,...S(t)})}function fi(e,t){return new e({type:`string`,format:`ksuid`,check:`string_format`,abort:!1,...S(t)})}function pi(e,t){return new e({type:`string`,format:`ipv4`,check:`string_format`,abort:!1,...S(t)})}function mi(e,t){return new e({type:`string`,format:`ipv6`,check:`string_format`,abort:!1,...S(t)})}function hi(e,t){return new e({type:`string`,format:`cidrv4`,check:`string_format`,abort:!1,...S(t)})}function gi(e,t){return new e({type:`string`,format:`cidrv6`,check:`string_format`,abort:!1,...S(t)})}function _i(e,t){return new e({type:`string`,format:`base64`,check:`string_format`,abort:!1,...S(t)})}function vi(e,t){return new e({type:`string`,format:`base64url`,check:`string_format`,abort:!1,...S(t)})}function yi(e,t){return new e({type:`string`,format:`e164`,check:`string_format`,abort:!1,...S(t)})}function bi(e,t){return new e({type:`string`,format:`jwt`,check:`string_format`,abort:!1,...S(t)})}function xi(e,t){return new e({type:`string`,format:`datetime`,check:`string_format`,offset:!1,local:!1,precision:null,...S(t)})}function Si(e,t){return new e({type:`string`,format:`date`,check:`string_format`,...S(t)})}function Ci(e,t){return new e({type:`string`,format:`time`,check:`string_format`,precision:null,...S(t)})}function wi(e,t){return new e({type:`string`,format:`duration`,check:`string_format`,...S(t)})}function Ti(e,t){return new e({type:`number`,checks:[],...S(t)})}function Ei(e,t){return new e({type:`number`,check:`number_format`,abort:!1,format:`safeint`,...S(t)})}function Di(e,t){return new e({type:`boolean`,...S(t)})}function Oi(e){return new e({type:`unknown`})}function ki(e,t){return new e({type:`never`,...S(t)})}function Ai(e,t){return new Ut({check:`less_than`,...S(t),value:e,inclusive:!1})}function ji(e,t){return new Ut({check:`less_than`,...S(t),value:e,inclusive:!0})}function Mi(e,t){return new Wt({check:`greater_than`,...S(t),value:e,inclusive:!1})}function Ni(e,t){return new Wt({check:`greater_than`,...S(t),value:e,inclusive:!0})}function Pi(e,t){return new Gt({check:`multiple_of`,...S(t),value:e})}function Fi(e,t){return new qt({check:`max_length`,...S(t),maximum:e})}function Ii(e,t){return new Jt({check:`min_length`,...S(t),minimum:e})}function Li(e,t){return new Yt({check:`length_equals`,...S(t),length:e})}function Ri(e,t){return new Zt({check:`string_format`,format:`regex`,...S(t),pattern:e})}function zi(e){return new Qt({check:`string_format`,format:`lowercase`,...S(e)})}function Bi(e){return new $t({check:`string_format`,format:`uppercase`,...S(e)})}function Vi(e,t){return new en({check:`string_format`,format:`includes`,...S(t),includes:e})}function Hi(e,t){return new tn({check:`string_format`,format:`starts_with`,...S(t),prefix:e})}function Ui(e,t){return new nn({check:`string_format`,format:`ends_with`,...S(t),suffix:e})}function Wi(e){return new rn({check:`overwrite`,tx:e})}function Gi(e){return Wi(t=>t.normalize(e))}function Ki(){return Wi(e=>e.trim())}function qi(){return Wi(e=>e.toLowerCase())}function Ji(){return Wi(e=>e.toUpperCase())}function Yi(){return Wi(e=>p(e))}function Xi(e,t,n){return new e({type:`array`,element:t,...S(n)})}function Zi(e,t,n){return new e({type:`custom`,check:`custom`,fn:t,...S(n)})}function Qi(e,t){let n=$i(t=>(t.addIssue=e=>{if(typeof e==`string`)t.issues.push(ye(e,t.value,n._zod.def));else{let r=e;r.fatal&&(r.continue=!1),r.code??=`custom`,`input`in r||(r.input=t.value),r.inst??=n,r.continue??=!n._zod.def.abort,t.issues.push(ye(r))}},e(t.value,t)),t);return n}function $i(e,t){let n=new O({check:`custom`,...S(t)});return n._zod.check=e,n}function ea(e,...t){for(let n of t)for(let t of Reflect.ownKeys(n))Object.prototype.propertyIsEnumerable.call(n,t)&&u(e,t,n[t]);return e}function ta(e){let t=e?.target??`draft-2020-12`;return t===`draft-4`&&(t=`draft-04`),t===`draft-7`&&(t=`draft-07`),{processors:e.processors??{},metadataRegistry:e?.metadata??Zr,target:t,unrepresentable:e?.unrepresentable??`throw`,override:e?.override??(()=>{}),io:e?.io??`output`,counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??`ref`,reused:e?.reused??`inline`,intersections:[],deferred:[],external:e?.external??void 0}}function j(e,t,n,r,i){let a=typeof t.unrepresentable==`function`?t.unrepresentable({zodSchema:e,path:r.path,message:i}):t.unrepresentable;if(a===`any`)return!1;if(a===void 0||a===`throw`)throw Error(i);return Object.assign(n,a),!0}function M(e,t,n={path:[],schemaPath:[]}){var r;let i=e._zod.def,a=t.seen.get(e);if(a)return a.count++,n.schemaPath.includes(e)&&(a.cycle=n.path),a.schema;let o={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,o),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let s=e._zod.toJSONSchema?.();if(s)o.schema=s;else{let r={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,o.schema,r);else{let n=o.schema,a=t.processors[i.type];if(!a)throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);a(e,t,n,r)}let a=e._zod.parent;a&&(o.ref||=a,M(a,t,r),t.seen.get(a).isParent=!0)}let c=t.metadataRegistry.get(e);return c&&ea(o.schema,c),t.io===`input`&&N(e)&&(delete o.schema.examples,delete o.schema.default),t.io===`input`&&`_prefault`in o.schema&&((r=o.schema).default??(r.default=o.schema._prefault)),delete o.schema._prefault,t.seen.get(e).schema}function na(e){return e.replace(/~/g,`~0`).replace(/\//g,`~1`)}function ra(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let t of e.seen.entries()){let n=e.metadataRegistry.get(t[0])?.id;if(n){let e=r.get(n);if(e&&e!==t[0])throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(n,t[0])}}let i=t=>{let r=e.target===`draft-2020-12`?`$defs`:`definitions`;if(e.external){let n=e.external.registry.get(t[0])?.id,i=e.external.uri??(e=>e);if(n)return{ref:i(n)};let a=t[1].defId??t[1].schema.id??`schema${e.counter++}`;return t[1].defId=a,{defId:a,ref:`${i(`__shared`)}#/${r}/${na(a)}`}}let i=`#/${r}/`;if(t[1]===n&&!t[1].schema.id)return{ref:`#`};let a=t[1].schema.id??`__schema${e.counter++}`;return{defId:a,ref:i+na(a)}},a=e=>{if(e[1].schema.$ref)return;let t=e[1],{ref:n,defId:r}=i(e);t.def={...t.schema},r&&(t.defId=r);let a=t.schema;for(let e in a)delete a[e];a.$ref=n};if(e.cycles===`throw`)for(let t of e.seen.entries()){let e=t[1];if(e.cycle)throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let n of e.seen.entries()){let r=n[1];if(t===n[0]){a(n);continue}if(e.external){let r=e.external.registry.get(n[0])?.id;if(t!==n[0]&&r){a(n);continue}}if(e.metadataRegistry.get(n[0])?.id){a(n);continue}if(r.cycle){a(n);continue}if(r.count>1&&e.reused===`ref`){a(n);continue}}e.external&&(e.sharedDefsExtractedFor=e.external)}function ia(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let e of t){if(!e||typeof e!=`object`)return;ia(e);let t=Object.keys(e);if(t.length!==1||t[0]!==`type`)return;let r=e.type;for(let e of Array.isArray(r)?r:[r]){if(typeof e!=`string`)return;n.includes(e)||n.push(e)}}delete e.anyOf,e.type=n.length===1?n[0]:n}const aa=new Set([`type`,`properties`,`required`,`additionalProperties`]),oa=[`oneOf`,`anyOf`];function sa(e){let t=e.additionalProperties;return t===void 0||t===!1||typeof t!=`object`||!t?null:Object.keys(t).length?t:null}function ca(e){let t=[];for(let n of e){if(typeof n!=`object`||n.type!==`object`)return null;for(let e in n)if(!aa.has(e))return null;t.push(n)}let n={},r=new Set;for(let e of t){for(let r in e.properties){if(Object.prototype.hasOwnProperty.call(n,r))continue;let e=[];for(let n of t){let t=n.properties?.[r]??sa(n);t!=null&&(e.some(e=>JSON.stringify(e)===JSON.stringify(t))||e.push(t))}u(n,r,e.length===1?e[0]:ca(e)??{allOf:e})}for(let t of e.required??[])r.add(t)}let i={type:`object`,properties:n};if(r.size&&(i.required=[...r]),t.every(e=>e.additionalProperties===!1))i.additionalProperties=!1;else{let e=[];for(let n of t){let t=sa(n);t&&!e.some(e=>JSON.stringify(e)===JSON.stringify(t))&&e.push(t)}e.length===1?i.additionalProperties=e[0]:e.length>1&&(i.additionalProperties={allOf:e})}return i}function la(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let t of aa)if(t in e)return;let n=t.filter(e=>oa.some(t=>Array.isArray(e[t]))),r=null;if(!n.length)r=ca(t);else{let e=n[0],i=oa.find(t=>Array.isArray(e[t]));if(Object.keys(e).length!==1)return;let a=t.filter(t=>t!==e),o=e[i].map(e=>ca([...a,e]));if(o.some(e=>!e))return;r={[i]:o}}r&&(delete e.allOf,ea(e,r))}function ua(e,t){let n=e.seen.get(t);if(!n)throw Error(`Unprocessed schema. This is a bug in Zod.`);let r=t=>{let n=e.seen.get(t);if(n.ref===null)return;let i=n.def??n.schema,a={...i},o=n.ref;if(n.ref=null,o){r(o);let n=e.seen.get(o),s=n.schema;if(s.$ref&&(e.target===`draft-07`||e.target===`draft-04`||e.target===`openapi-3.0`)?(i.allOf=i.allOf??[],i.allOf.push(s)):ea(i,s),ea(i,a),t._zod.parent===o)for(let e in i)e!==`$ref`&&e!==`allOf`&&(e in a||delete i[e]);if(s.$ref&&n.def)for(let e in i)e!==`$ref`&&e!==`allOf`&&e in n.def&&JSON.stringify(i[e])===JSON.stringify(n.def[e])&&delete i[e]}let s=t._zod.parent;if(s&&s!==o){r(s);let t=e.seen.get(s);if(t?.schema.$ref&&(i.$ref=t.schema.$ref,t.def))for(let e in i)e!==`$ref`&&e!==`allOf`&&e in t.def&&JSON.stringify(i[e])===JSON.stringify(t.def[e])&&delete i[e]}e.override({zodSchema:t,jsonSchema:i,path:n.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let t of[...e.seen.entries()].reverse())r(t[0]);if(e.target!==`openapi-3.0`)for(let t of e.seen.entries())ia(t[1].def??t[1].schema);for(let t of e.deferred)t();if(e.intersections.length){let t=new Map;for(let n of e.seen.values())for(let e of[n.schema,n.def]){let n=e?.allOf;if(!Array.isArray(n))continue;let r=t.get(n);r?r.push(e):t.set(n,[e])}for(let n of e.intersections)for(let e of t.get(n)??[])la(e)}}let i={};if(e.target===`draft-2020-12`?i.$schema=`https://json-schema.org/draft/2020-12/schema`:e.target===`draft-07`?i.$schema=`http://json-schema.org/draft-07/schema#`:e.target===`draft-04`?i.$schema=`http://json-schema.org/draft-04/schema#`:e.target,e.external?.uri){let n=e.external.registry.get(t)?.id;if(!n)throw Error("Schema is missing an `id` property");i.$id=e.external.uri(n)}ea(i,n.defId?n.schema:n.def??n.schema);let a=e.metadataRegistry.get(t)?.id;a!==void 0&&i.id===a&&delete i.id;let o=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let t of e.seen.entries()){let e=t[1];e.def&&e.defId&&(e.def.id===e.defId&&delete e.def.id,u(o,e.defId,e.def))}e.external&&(e.sharedEmitDoneFor=e.external),e.external||Object.keys(o).length>0&&(e.target===`draft-2020-12`?i.$defs=o:i.definitions=o);try{let n=JSON.parse(JSON.stringify(i));return Object.defineProperty(n,"~standard",{value:{...t[`~standard`],jsonSchema:{input:fa(t,`input`,e.processors),output:fa(t,`output`,e.processors)}},enumerable:!1,writable:!1}),n}catch{throw Error(`Error converting schema to JSON.`)}}function N(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type===`transform`)return!0;if(r.type===`array`)return N(r.element,n);if(r.type===`set`)return N(r.valueType,n);if(r.type===`lazy`)return N(r.getter(),n);if(r.type===`promise`||r.type===`optional`||r.type===`nonoptional`||r.type===`nullable`||r.type===`readonly`||r.type==="default"||r.type===`prefault`||r.type===`catch`)return N(r.innerType,n);if(r.type===`intersection`)return N(r.left,n)||N(r.right,n);if(r.type===`record`||r.type===`map`)return N(r.keyType,n)||N(r.valueType,n);if(r.type===`pipe`)return e._zod.traits.has(`$ZodCodec`)?!0:N(r.in,n)||N(r.out,n);if(r.type===`object`){for(let e in r.shape)if(N(r.shape[e],n))return!0;return!1}if(r.type===`union`){for(let e of r.options)if(N(e,n))return!0;return!1}if(r.type===`tuple`){for(let e of r.items)if(N(e,n))return!0;return!!(r.rest&&N(r.rest,n))}return!1}const da=(e,t={})=>n=>{let r=ta({...n,processors:t});return M(e,r),ra(r,e),ua(r,e)},fa=(e,t,n={})=>r=>{let{libraryOptions:i,target:a}=r??{},o=ta({...i??{},target:a,io:t,processors:n});return M(e,o),ra(o,e),ua(o,e)},pa={guid:`uuid`,url:`uri`,datetime:`date-time`,json_string:`json-string`,regex:``},ma=(e,t,n,r)=>{let i=n;i.type=`string`;let{minimum:a,maximum:o,format:s,patterns:c,contentEncoding:l,laxFormat:u}=e._zod.bag;if(typeof a==`number`&&(i.minLength=a),typeof o==`number`&&(i.maxLength=o),s&&(i.format=pa[s]??s,i.format===``&&delete i.format,(s===`time`||u)&&delete i.format),l&&(i.contentEncoding=l),c&&c.size>0){let e=[...c];e.length===1?i.pattern=e[0].source:e.length>1&&(i.allOf=[...e.map(e=>({...t.target===`draft-07`||t.target===`draft-04`||t.target===`openapi-3.0`?{type:`string`}:{},pattern:e.source}))])}},ha=(e,t,n,r)=>{let i=n,{minimum:a,maximum:o,format:s,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u}=e._zod.bag;i.type=typeof s==`string`&&s.includes(`int`)?`integer`:`number`;let d=typeof u==`number`&&u>=(a??-1/0),f=typeof l==`number`&&l<=(o??1/0),p=t.target===`draft-04`||t.target===`openapi-3.0`;d?p?(i.minimum=u,i.exclusiveMinimum=!0):i.exclusiveMinimum=u:typeof a==`number`&&(i.minimum=a),f?p?(i.maximum=l,i.exclusiveMaximum=!0):i.exclusiveMaximum=l:typeof o==`number`&&(i.maximum=o),typeof c==`number`&&(Number.isFinite(c)&&c!==0?i.multipleOf=Math.abs(c):j(e,t,i,r,`A multipleOf divisor of ${c} cannot be represented in JSON Schema`))},ga=(e,t,n,r)=>{n.type=`boolean`},_a=(e,t,n,r)=>{n.not={}},va=(e,t,n,i)=>{let a=e._zod.def,o=r(a.entries);if(o.length===0){n.not={};return}o.every(e=>typeof e==`number`)&&(n.type=`number`),o.every(e=>typeof e==`string`)&&(n.type=`string`),n.enum=o},ya=(e,t,n,r)=>{let i=e._zod.def;if(i.values.length===0){n.not={};return}let a=[];for(let o of i.values)if(o===void 0){if(j(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof o==`bigint`){if(j(e,t,n,r,`BigInt literals cannot be represented in JSON Schema`))return;a.push(Number(o))}else a.push(o);if(a.length!==0){if(a.length===1){let e=a[0];n.type=e===null?`null`:typeof e,t.target===`draft-04`||t.target===`openapi-3.0`?n.enum=[e]:n.const=e}else a.every(e=>typeof e==`number`)&&(n.type=`number`),a.every(e=>typeof e==`string`)&&(n.type=`string`),a.every(e=>typeof e==`boolean`)&&(n.type=`boolean`),a.every(e=>e===null)&&(n.type=`null`),n.enum=a}},ba=(e,t,n,r)=>{j(e,t,n,r,`Custom types cannot be represented in JSON Schema`)},xa=(e,t,n,r)=>{j(e,t,n,r,`Transforms cannot be represented in JSON Schema`)},Sa=(e,t,n,r)=>{let i=n,a=e._zod.def,{minimum:o,maximum:s}=e._zod.bag;typeof o==`number`&&(i.minItems=o),typeof s==`number`&&(i.maxItems=s),i.type=`array`,i.items=M(a.element,t,{...r,path:[...r.path,`items`]})};function Ca(e){let t=e._zod.def;return t.type===`pipe`&&t.in._zod.traits.has(`$ZodTransform`)?Ca(t.out):t.type===`catch`?Ca(t.innerType):e._zod.optin}const wa=(e,t,n,r)=>{let i=n,a=e._zod.def,o=a.shape;if(Object.getOwnPropertySymbols(o).length&&j(e,t,i,r,`Symbol keys cannot be represented in JSON Schema`))return;i.type=`object`,i.properties={};for(let e in o)u(i.properties,e,M(o[e],t,{...r,path:[...r.path,`properties`,e]}));let s=new Set(Object.keys(o)),c=new Set([...s].filter(e=>{let n=a.shape[e];return t.io===`input`?Ca(n)===void 0:n._zod.optout===void 0}));c.size>0&&(i.required=Array.from(c)),a.catchall?._zod.def.type===`never`?i.additionalProperties=!1:a.catchall?a.catchall&&(i.additionalProperties=M(a.catchall,t,{...r,path:[...r.path,`additionalProperties`]})):t.io===`output`&&(i.additionalProperties=!1)},Ta=(e,t,n,r)=>{let i=e._zod.def,a=i.inclusive===!1,o=i.options.map((e,n)=>M(e,t,{...r,path:[...r.path,a?`oneOf`:`anyOf`,n]}));a?n.oneOf=o:n.anyOf=o},Ea=(e,t,n,r)=>{let i=e._zod.def,a=M(i.left,t,{...r,path:[...r.path,`allOf`,0]}),o=M(i.right,t,{...r,path:[...r.path,`allOf`,1]}),s=e=>`allOf`in e&&Object.keys(e).length===1,c=[...s(a)?a.allOf:[a],...s(o)?o.allOf:[o]];n.allOf=c,t.intersections.push(c)},Da=(e,t,n,r)=>{let i=n,a=e._zod.def;i.type=`array`;let o=t.target===`draft-2020-12`?`prefixItems`:`items`,s=t.target===`draft-2020-12`||t.target===`openapi-3.0`?`items`:`additionalItems`,c=a.items.map((e,n)=>M(e,t,{...r,path:[...r.path,o,n]})),l=a.rest?M(a.rest,t,{...r,path:[...r.path,s,...t.target===`openapi-3.0`?[a.items.length]:[]]}):null,u=a.items.length;for(;u>0;){let e=a.items[u-1];if(!(t.io===`input`?Ca(e)!==void 0:e._zod.optout===`optional`))break;u--}let d=a.items.length,f=!a.rest;t.target===`draft-2020-12`?(i.prefixItems=c,f?i.items=!1:l&&(i.items=l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):t.target===`openapi-3.0`?(i.items={anyOf:c},l&&i.items.anyOf.push(l),u>0&&(i.minItems=u),f&&(i.maxItems=d)):(i.items=c,f?i.additionalItems=!1:l&&(i.additionalItems=l),u>0&&(i.minItems=u),f&&(i.maxItems=d));let{minimum:p,maximum:m}=e._zod.bag;typeof p==`number`&&(i.minItems=p),typeof m==`number`&&(i.maxItems=m)},Oa=(e,t,n,r)=>{let i=e._zod.def,a=M(i.innerType,t,r),o=t.seen.get(e);t.target===`openapi-3.0`?(o.ref=i.innerType,n.nullable=!0):n.anyOf=[a,{type:`null`}]},ka=(e,t,n,r)=>{let i=e._zod.def;M(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},Aa=Symbol();function ja(e,t,n,r,i){let a=!1,o=JSON.stringify(e,(e,t)=>typeof t==`bigint`?(a=!0,null):t);return a?(j(t,n,r,i,`BigInt defaults cannot be represented in JSON Schema`),Aa):JSON.parse(o)}const Ma=(e,t,n,r)=>{let i=e._zod.def;M(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o=ja(i.defaultValue,e,t,n,r);o!==Aa&&(n.default=o)},Na=(e,t,n,r)=>{let i=e._zod.def;M(i.innerType,t,r);let a=t.seen.get(e);if(a.ref=i.innerType,t.io!==`input`)return;let o=ja(i.defaultValue,e,t,n,r);o!==Aa&&(n._prefault=o)},Pa=(e,t,n,r)=>{let i=e._zod.def;M(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType;let o;try{o=i.catchValue(void 0)}catch{j(e,t,n,r,`Dynamic catch values are not supported in JSON Schema`);return}n.default=o},Fa=(e,t,n,r)=>{let i=e._zod.def,a=i.in._zod.traits.has(`$ZodTransform`),o=t.io===`input`?a?i.out:i.in:i.out;M(o,t,r);let s=t.seen.get(e);s.ref=o},Ia=(e,t,n,r)=>{let i=e._zod.def;M(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType,n.readOnly=!0},La=(e,t,n,r)=>{let i=e._zod.def;M(i.innerType,t,r);let a=t.seen.get(e);a.ref=i.innerType},Ra=new WeakSet([Object.prototype,Error.prototype]);function za(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let e=n(this);return Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}),e},set(e){Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0})}})}const P=T(`ZodError`,(e,t)=>{Ue.init(e,t),e.name=`ZodError`;let n=Object.getPrototypeOf(e);Ra.has(n)||(Ra.add(n),za(n,`format`,e=>t=>qe(e,t)),za(n,`flatten`,e=>t=>Ke(e,t)),za(n,`addIssue`,e=>t=>{e.issues.push(t),e.message=JSON.stringify(e.issues,a,2)}),za(n,`addIssues`,e=>t=>{e.issues.push(...t),e.message=JSON.stringify(e.issues,a,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}}))},void 0,{Parent:Error}),Ba=Ye(P),Va=Xe(P),Ha=Ze(P),Ua=$e(P),Wa=tt(P),Ga=nt(P),Ka=rt(P),qa=it(P),Ja=at(P),Ya=ot(P),Xa=st(P),Za=ct(P);function Qa(){E.localeError||D(qr())}function $a(){E.memoizer||D({memoizer:Wr()})}const F=T(`ZodType`,(e,t)=>(Qa(),k.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(d(t,{checks:[...t.checks??[],...e.map(e=>typeof e==`function`?{_zod:{check:e,def:{check:`custom`},onattach:[]}}:e)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return x(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(ps(e,t))},superRefine(e,t){return this.check(ms(e,t))},overwrite(e){return this.check(Wi(e))},optional(){return Yo(this)},exactOptional(){return Zo(this)},nullable(){return $o(this)},nullish(){return Yo($o(this))},nonoptional(e){return as(this,e)},array(){return B(this)},or(e){return Lo([this,e])},and(e){return Vo(this,e)},transform(e){return ls(this,qo(e))},default(e){return ts(this,e)},prefault(e){return rs(this,e)},catch(e){return ss(this,e)},pipe(e){return ls(this,e)},readonly(){return ds(this)},describe(e){let t=this.clone();return Zr.add(t,{description:e}),t},meta(...e){if(e.length===0)return Zr.get(this);let t=this.clone();return Zr.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get"~standard"(){return Se(this,`~standard`,{...cn(this),jsonSchema:{input:fa(this,`input`),output:fa(this,`output`)}})},set"~standard"(e){xe(this,`~standard`,e)},parse:function e(t,n){return Ba(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await Va(this,t,n,{callee:e})},safeParse(e,t){return Ha(this,e,t)},async safeParseAsync(e,t){return Ua(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){xe(this,`spa`,e)},encode:function e(t,n){return Wa(this,t,n,{callee:e})},decode:function e(t,n){return Ga(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await Ka(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await qa(this,t,n,{callee:e})},safeEncode(e,t){return Ja(this,e,t)},safeDecode(e,t){return Ya(this,e,t)},async safeEncodeAsync(e,t){return Xa(this,e,t)},async safeDecodeAsync(e,t){return Za(this,e,t)},toJSONSchema(e){return da(this,{})(e)},get description(){return Zr.get(this)?.description},get _def(){return this._zod.def}}),eo=T(`_ZodString`,(e,t)=>{ln.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ma(e,t,n,r);let n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null},{regex(...e){return this.check(Ri(...e))},includes(...e){return this.check(Vi(...e))},startsWith(...e){return this.check(Hi(...e))},endsWith(...e){return this.check(Ui(...e))},min(...e){return this.check(Ii(...e))},max(...e){return this.check(Fi(...e))},length(...e){return this.check(Li(...e))},nonempty(...e){return this.check(Ii(1,...e))},lowercase(e){return this.check(zi(e))},uppercase(e){return this.check(Bi(e))},trim(){return this.check(Ki())},normalize(...e){return this.check(Gi(...e))},toLowerCase(){return this.check(qi())},toUpperCase(){return this.check(Ji())},slugify(){return this.check(Yi())}}),to=T(`ZodString`,(e,t)=>{ln.init(e,t),eo.init(e,t)},{email(e){return this.check($r(oo,e))},url(e){return this.check(ai(lo,e))},jwt(e){return this.check(bi(To,e))},emoji(e){return this.check(oi(uo,e))},guid(e){return this.check(ei(so,e))},uuid(e){return this.check(ti(co,e))},uuidv4(e){return this.check(ni(co,e))},uuidv6(e){return this.check(ri(co,e))},uuidv7(e){return this.check(ii(co,e))},nanoid(e){return this.check(si(fo,e))},cuid(e){return this.check(ci(po,e))},cuid2(e){return this.check(li(mo,e))},ulid(e){return this.check(ui(ho,e))},base64(e){return this.check(_i(So,e))},base64url(e){return this.check(vi(Co,e))},xid(e){return this.check(di(go,e))},ksuid(e){return this.check(fi(_o,e))},ipv4(e){return this.check(pi(vo,e))},ipv6(e){return this.check(mi(yo,e))},cidrv4(e){return this.check(hi(bo,e))},cidrv6(e){return this.check(gi(xo,e))},e164(e){return this.check(yi(wo,e))},datetime(e){return this.check(xi(no,e))},date(e){return this.check(Si(ro,e))},time(e){return this.check(Ci(io,e))},duration(e){return this.check(wi(ao,e))}});function I(e){return Qr(to,e)}const L=T(`ZodStringFormat`,(e,t)=>{A.init(e,t),eo.init(e,t)}),no=T(`ZodISODateTime`,(e,t)=>{En.init(e,t),L.init(e,t)}),ro=T(`ZodISODate`,(e,t)=>{Dn.init(e,t),L.init(e,t)}),io=T(`ZodISOTime`,(e,t)=>{On.init(e,t),L.init(e,t)}),ao=T(`ZodISODuration`,(e,t)=>{kn.init(e,t),L.init(e,t)}),oo=T(`ZodEmail`,(e,t)=>{fn.init(e,t),L.init(e,t)}),so=T(`ZodGUID`,(e,t)=>{un.init(e,t),L.init(e,t)}),co=T(`ZodUUID`,(e,t)=>{dn.init(e,t),L.init(e,t)}),lo=T(`ZodURL`,(e,t)=>{vn.init(e,t),L.init(e,t)}),uo=T(`ZodEmoji`,(e,t)=>{yn.init(e,t),L.init(e,t)}),fo=T(`ZodNanoID`,(e,t)=>{bn.init(e,t),L.init(e,t)}),po=T(`ZodCUID`,(e,t)=>{xn.init(e,t),L.init(e,t)}),mo=T(`ZodCUID2`,(e,t)=>{Sn.init(e,t),L.init(e,t)}),ho=T(`ZodULID`,(e,t)=>{Cn.init(e,t),L.init(e,t)}),go=T(`ZodXID`,(e,t)=>{wn.init(e,t),L.init(e,t)}),_o=T(`ZodKSUID`,(e,t)=>{Tn.init(e,t),L.init(e,t)}),vo=T(`ZodIPv4`,(e,t)=>{An.init(e,t),L.init(e,t)}),yo=T(`ZodIPv6`,(e,t)=>{Nn.init(e,t),L.init(e,t)}),bo=T(`ZodCIDRv4`,(e,t)=>{Pn.init(e,t),L.init(e,t)}),xo=T(`ZodCIDRv6`,(e,t)=>{In.init(e,t),L.init(e,t)}),So=T(`ZodBase64`,(e,t)=>{Rn.init(e,t),L.init(e,t)}),Co=T(`ZodBase64URL`,(e,t)=>{Bn.init(e,t),L.init(e,t)}),wo=T(`ZodE164`,(e,t)=>{Vn.init(e,t),L.init(e,t)}),To=T(`ZodJWT`,(e,t)=>{Un.init(e,t),L.init(e,t)}),Eo=T(`ZodNumber`,(e,t)=>{Wn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ha(e,t,n,r);let n=e._zod.bag;e.minValue=Math.max(n.minimum??-1/0,n.exclusiveMinimum??-1/0)??null,e.maxValue=Math.min(n.maximum??1/0,n.exclusiveMaximum??1/0)??null,e.isInt=(n.format??``).includes(`int`)||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null},{gt(e,t){return this.check(Mi(e,t))},gte(e,t){return this.check(Ni(e,t))},min(e,t){return this.check(Ni(e,t))},lt(e,t){return this.check(Ai(e,t))},lte(e,t){return this.check(ji(e,t))},max(e,t){return this.check(ji(e,t))},int(e){return this.check(z(e))},safe(e){return this.check(z(e))},positive(e){return this.check(Mi(0,e))},nonnegative(e){return this.check(Ni(0,e))},negative(e){return this.check(Ai(0,e))},nonpositive(e){return this.check(ji(0,e))},multipleOf(e,t){return this.check(Pi(e,t))},step(e,t){return this.check(Pi(e,t))},finite(){return this}});function R(e){return Ti(Eo,e)}const Do=T(`ZodNumberFormat`,(e,t)=>{Gn.init(e,t),Eo.init(e,t)});function z(e){return Ei(Do,e)}const Oo=T(`ZodBoolean`,(e,t)=>{Kn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ga(e,t,n,r)});function ko(e){return Di(Oo,e)}const Ao=T(`ZodUnknown`,(e,t)=>{qn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(e,t,n)=>void 0});function jo(){return Oi(Ao)}const Mo=T(`ZodNever`,(e,t)=>{Jn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>_a(e,t,n,r)});function No(e){return ki(Mo,e)}const Po=T(`ZodArray`,(e,t)=>{$a(),Xn.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Sa(e,t,n,r),e.element=t.element},{min(e,t){return this.check(Ii(e,t))},nonempty(e){return this.check(Ii(1,e))},max(e,t){return this.check(Fi(e,t))},length(e,t){return this.check(Li(e,t))},unwrap(){return this.element}});function B(e,t){return Xi(Po,e,t)}const Fo=T(`ZodObject`,(e,t)=>{$a(),rr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>wa(e,t,n,r),Oe(e,`shape`,e=>e._zod.def.shape,!1)},{keyof(){return H(Object.keys(this._zod.def.shape))},catchall(e){return this.clone({...this._zod.def,catchall:e})},passthrough(){return this.clone({...this._zod.def,catchall:jo()})},loose(){return this.clone({...this._zod.def,catchall:jo()})},strict(){return this.clone({...this._zod.def,catchall:No()})},strip(){return this.clone({...this._zod.def,catchall:void 0})},extend(e){return ie(this,e)},safeExtend(e){return ae(this,e)},merge(e){return oe(this,e)},pick(e){return ne(this,e)},omit(e){return re(this,e)},partial(...e){return se(Jo,this,e[0])},exactPartial(...e){return se(Xo,this,e[0],`exactPartial`)},required(...e){return ce(is,this,e[0])}});function V(e,t){return new Fo({type:`object`,shape:e,catchall:No(),...S(t)})}const Io=T(`ZodUnion`,(e,t)=>{ar.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ta(e,t,n,r),e.options=t.options});function Lo(e,t){return new Io({type:`union`,options:e,...S(t)})}const Ro=T(`ZodDiscriminatedUnion`,(e,t)=>{Io.init(e,t),or.init(e,t)});function zo(e,t,n){return new Ro({type:`union`,options:t,discriminator:e,...S(n)})}const Bo=T(`ZodIntersection`,(e,t)=>{sr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ea(e,t,n,r)});function Vo(e,t){return new Bo({type:`intersection`,left:e,right:t})}const Ho=T(`ZodTuple`,(e,t)=>{$a(),ur.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Da(e,t,n,r)},{rest(e){return this.clone({...this._zod.def,rest:e})},partial(){let e=this._zod.def;if(e.checks?.length)throw Error(`.partial() cannot be used on tuple schemas containing refinements`);return this.clone({...e,items:e.items.map(e=>new Jo({type:`optional`,innerType:e}))})}});function Uo(e,t,n){let r=t instanceof k;return new Ho({type:`tuple`,items:e,rest:r?t:null,...S(r?n:t)})}const Wo=T(`ZodEnum`,(e,t)=>{mr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>va(e,t,n,r),e.enum=t.entries,e.options=Object.values(t.entries);let n=new Set(Object.keys(t.entries));e.extract=(e,r)=>{let i={};for(let r of e)if(n.has(r))i[r]=t.entries[r];else throw Error(`Key ${r} not found in enum`);return new Wo({...t,checks:[],...S(r),entries:i})},e.exclude=(e,r)=>{let i={...t.entries};for(let t of e)if(n.has(t))delete i[t];else throw Error(`Key ${t} not found in enum`);return new Wo({...t,checks:[],...S(r),entries:i})}});function H(e,t){let n=Array.isArray(e)?Object.fromEntries(e.map(e=>[e,e])):e;return new Wo({type:`enum`,entries:n,...S(t)})}const Go=T(`ZodLiteral`,(e,t)=>{hr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ya(e,t,n,r),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function U(e,t){return new Go({type:`literal`,values:Array.isArray(e)?e:[e],...S(t)})}const Ko=T(`ZodTransform`,(e,t)=>{$a(),gr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>xa(e,t,n,r),e._zod.parse=(n,r)=>{if(r.direction===`backward`)throw new Fe(e.constructor.name);n.addIssue=r=>{if(typeof r==`string`)n.issues.push(ye(r,n.value,t));else{let t=r;t.fatal&&(t.continue=!1),t.code??=`custom`,`input`in t||(t.input=n.value),t.inst??=e,n.issues.push(ye(t))}};let i=t.transform(n.value,n);return i instanceof Promise?i.then(e=>(n.value=e,n)):(n.value=i,n)}});function qo(e){return new Ko({type:`transform`,transform:e})}const Jo=T(`ZodOptional`,(e,t)=>{vr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>La(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Yo(e){return new Jo({type:`optional`,innerType:e})}const Xo=T(`ZodExactOptional`,(e,t)=>{yr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>La(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function Zo(e){return new Xo({type:`optional`,innerType:e})}const Qo=T(`ZodNullable`,(e,t)=>{br.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Oa(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function $o(e){return new Qo({type:`nullable`,innerType:e})}const es=T(`ZodDefault`,(e,t)=>{xr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ma(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function ts(e,t){return new es({type:`default`,innerType:e,get defaultValue(){return typeof t==`function`?t():v(t)}})}const ns=T(`ZodPrefault`,(e,t)=>{Cr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Na(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function rs(e,t){return new ns({type:`prefault`,innerType:e,get defaultValue(){return typeof t==`function`?t():v(t)}})}const is=T(`ZodNonOptional`,(e,t)=>{wr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ka(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function as(e,t){return new is({type:`nonoptional`,innerType:e,...S(t)})}const os=T(`ZodCatch`,(e,t)=>{Dr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Pa(e,t,n,r),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function ss(e,t){return new os({type:`catch`,innerType:e,catchValue:typeof t==`function`?t:ke(t)})}const cs=T(`ZodPipe`,(e,t)=>{Or.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Fa(e,t,n,r),e.in=t.in,e.out=t.out});function ls(e,t){return new cs({type:`pipe`,in:e,out:t})}const us=T(`ZodReadonly`,(e,t)=>{Ar.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>Ia(e,t,n,r),e.unwrap=()=>e._zod.def.innerType});function ds(e){return new us({type:`readonly`,innerType:e})}const fs=T(`ZodCustom`,(e,t)=>{Mr.init(e,t),F.init(e,t),e._zod.processJSONSchema=(t,n,r)=>ba(e,t,n,r)});function ps(e,t={}){return Zi(fs,e,t)}function ms(e,t){return Qi(e,t)}const W=(e,t)=>[{effectId:`infantryDefence`,valuesPerLevel:t,type:e},{effectId:`cavalryDefence`,valuesPerLevel:t,type:e}],hs=e=>({effectId:e,valuesPerLevel:[3,7,13,21,31,46,70,98,140,203,280,392,525,693,889,1120,1400,1820,2240,2800,3430],type:`base`}),gs=(e,t=6)=>({effectId:e,valuesPerLevel:[1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2].slice(0,t),type:`bonus`}),_s=e=>({effectId:e,valuesPerLevel:[1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2],type:`bonus-booster`}),vs=e=>({effectId:e,valuesPerLevel:[1,1,.9091,.8333,.7143,.6667,.5882,.5263,.4762,.4348,.3846,.3448,.3125,.2857,.2564,.2273,.2041,.1852,.1667,.1493,.1351],type:`bonus`}),ys=(e,t)=>({effectId:e,valuesPerLevel:[0,400,900,1500,2300,3200,4300,5600,7200,9e3,11300,13900,17200,21e3,25600,31e3,37700,45500,55e3,66300,8e4].map(e=>e*t),type:`base`}),bs=e=>({effectId:e,valuesPerLevel:Array.from({length:21},(e,t)=>t),type:`base`}),xs=e=>{let t=e===`gauls`?2:1;return{effectId:`crannyCapacity`,valuesPerLevel:[0,100,130,170,220,280,360,460,600,770,1e3].map(e=>e*t),type:`base`}},Ss=e=>{let t=e===`romans`?.2:.1;return{effectId:`merchantCapacity`,valuesPerLevel:Array.from({length:21},(e,n)=>1+n*t),type:`bonus`}},Cs=()=>W(`base`,[0,2,8,18,32,50,72,98,128,162,200,242,288,338,392,450,512,578,648,722,800]),ws=()=>{let e=[1,1,.99,.98,.97,.96,.95,.94,.93,.92,.91,.9,.89,.88,.86,.85,.84,.83,.82,.81,.8];return[{effectId:`stableTrainingDuration`,valuesPerLevel:e,type:`bonus`},{effectId:`greatStableTrainingDuration`,valuesPerLevel:e,type:`bonus`}]},Ts=[{id:`BAKERY`,category:`resource-booster`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[gs(`wheatProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WHEAT_FIELD`,level:10},{id:3,type:`building`,buildingId:`GRAIN_MILL`,level:5},{id:4,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[1200,1480,870,1600],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:6080,buildingDurationReduction:2400},{id:`BRICKYARD`,category:`resource-booster`,populationCoefficient:3,culturePointsCoefficient:1,effects:()=>[gs(`clayProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`CLAY_PIT`,level:10},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[440,480,320,50],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:5240,buildingDurationReduction:2400},{id:`CLAY_PIT`,category:`resource-production`,populationCoefficient:2,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[hs(`clayProduction`)],baseBuildingCost:[80,40,80,50],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:553,buildingDurationReduction:333},{id:`WHEAT_FIELD`,category:`resource-production`,populationCoefficient:0,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[hs(`wheatProduction`)],baseBuildingCost:[70,90,70,20],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:483,buildingDurationReduction:333},{id:`GRAIN_MILL`,category:`resource-booster`,populationCoefficient:3,culturePointsCoefficient:1,effects:()=>[gs(`wheatProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WHEAT_FIELD`,level:5}],baseBuildingCost:[500,440,380,1240],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:4240,buildingDurationReduction:2400},{id:`GRANARY`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[ys(`granaryCapacity`,1)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:1}],baseBuildingCost:[80,100,70,20],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3475,buildingDurationReduction:1875},{id:`IRON_FOUNDRY`,category:`resource-booster`,populationCoefficient:6,culturePointsCoefficient:1,effects:()=>[gs(`ironProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`IRON_MINE`,level:10},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[200,450,510,120],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:6480,buildingDurationReduction:2400},{id:`IRON_MINE`,category:`resource-production`,populationCoefficient:3,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[hs(`ironProduction`)],baseBuildingCost:[100,80,30,60],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:783,buildingDurationReduction:333},{id:`SAWMILL`,category:`resource-booster`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[gs(`woodProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WOODCUTTER`,level:10},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[520,380,290,90],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.5,buildingDurationModifier:5400,buildingDurationReduction:2400},{id:`WAREHOUSE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[ys(`warehouseCapacity`,1)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:1}],baseBuildingCost:[130,160,90,40],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`WATERWORKS`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:2,effects:()=>[_s(`woodProduction`),_s(`clayProduction`),_s(`ironProduction`),_s(`wheatProduction`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`HEROS_MANSION`,level:10},{id:3,type:`tribe`,tribe:`egyptians`}],baseBuildingCost:[910,945,910,340],buildingCostCoefficient:1.31,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`WOODCUTTER`,category:`resource-production`,populationCoefficient:2,culturePointsCoefficient:1,buildingRequirements:[],effects:()=>[hs(`woodProduction`)],baseBuildingCost:[40,100,50,60],buildingCostCoefficient:1.67,maxLevel:20,buildingDurationBase:1.6,buildingDurationModifier:593,buildingDurationReduction:333},{id:`ACADEMY`,category:`military`,populationCoefficient:4,culturePointsCoefficient:4,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`BARRACKS`,level:3}],baseBuildingCost:[220,160,90,40],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`BARRACKS`,category:`military`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[vs(`barracksTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:1}],baseBuildingCost:[210,140,260,120],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`ROMAN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.03,1.06,1.09,1.13,1.16,1.19,1.23,1.27,1.31,1.34,1.38,1.43,1.47,1.51,1.56,1.6,1.65,1.7,1.75,1.81]),...W(`base`,[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`romans`}],baseBuildingCost:[70,90,170,70],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TEUTONIC_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.02,1.04,1.06,1.08,1.1,1.13,1.15,1.17,1.2,1.22,1.24,1.27,1.29,1.32,1.35,1.37,1.4,1.43,1.46,1.49]),...W(`base`,[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`teutons`}],baseBuildingCost:[120,200,0,80],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`GREAT_BARRACKS`,category:`military`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[vs(`greatBarracksTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`BARRACKS`,level:20}],baseBuildingCost:[630,420,780,360],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`GREAT_STABLE`,category:`military`,populationCoefficient:5,culturePointsCoefficient:2,effects:()=>[vs(`greatStableTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`STABLE`,level:20}],baseBuildingCost:[780,420,660,300],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4075,buildingDurationReduction:1875},{id:`HEROS_MANSION`,category:`military`,populationCoefficient:2,culturePointsCoefficient:1,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:1}],baseBuildingCost:[700,670,700,240],buildingCostCoefficient:1.33,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:2300,buildingDurationReduction:0},{id:`HOSPITAL`,category:`military`,populationCoefficient:3,culturePointsCoefficient:4,effects:()=>[vs(`hospitalTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`ACADEMY`,level:15}],baseBuildingCost:[320,280,420,360],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`ASCLEPEION`,category:`military`,populationCoefficient:3,culturePointsCoefficient:5,effects:()=>[vs(`hospitalTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5},{id:3,type:`building`,buildingId:`ACADEMY`,level:10},{id:4,type:`tribe`,tribe:`spartans`}],baseBuildingCost:[320,280,420,360],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`HUN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.02,1.03,1.05,1.06,1.08,1.09,1.11,1.13,1.14,1.16,1.18,1.2,1.21,1.23,1.25,1.27,1.29,1.31,1.33,1.35]),...W(`base`,[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`huns`}],baseBuildingCost:[50,80,40,30],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`GAUL_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.03,1.05,1.08,1.1,1.13,1.16,1.19,1.22,1.25,1.28,1.31,1.35,1.38,1.41,1.45,1.49,1.52,1.56,1.6,1.64]),...W(`base`,[0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`gauls`}],baseBuildingCost:[160,100,80,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`RALLY_POINT`,category:`military`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[bs(`revealedIncomingTroopsAmount`)],buildingRequirements:[{id:1,type:`amount`,amount:1}],baseBuildingCost:[110,160,90,70],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`STABLE`,category:`military`,populationCoefficient:5,culturePointsCoefficient:2,effects:()=>[vs(`stableTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`ACADEMY`,level:5},{id:3,type:`building`,buildingId:`SMITHY`,level:3}],baseBuildingCost:[260,140,220,100],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4075,buildingDurationReduction:1875},{id:`SMITHY`,category:`military`,populationCoefficient:4,culturePointsCoefficient:2,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`ACADEMY`,level:1},{id:3,type:`building`,buildingId:`MAIN_BUILDING`,level:3}],baseBuildingCost:[180,250,500,160],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:2875,buildingDurationReduction:1875},{id:`EGYPTIAN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.03,1.05,1.08,1.1,1.13,1.16,1.19,1.22,1.25,1.28,1.31,1.35,1.38,1.41,1.45,1.49,1.52,1.56,1.6,1.64]),...W(`base`,[0,8,16,24,32,40,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`egyptians`}],baseBuildingCost:[110,160,70,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`SPARTAN_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.02,1.04,1.06,1.08,1.1,1.13,1.15,1.17,1.2,1.22,1.24,1.27,1.29,1.32,1.35,1.37,1.4,1.43,1.46,1.49]),...W(`base`,[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`spartans`}],baseBuildingCost:[160,100,80,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`NATURE_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.01,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.1,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.19,1.2]),...W(`base`,[0,6,12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`nature`}],baseBuildingCost:[50,60,20,200],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`NATAR_WALL`,category:`military`,populationCoefficient:0,culturePointsCoefficient:1,effects:()=>[...W(`bonus`,[1,1.05,1.1,1.15,1.2,1.25,1.3,1.35,1.4,1.45,1.5,1.55,1.6,1.65,1.7,1.75,1.8,1.85,1.9,1.95,2]),...W(`base`,[0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200])],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`tribe`,tribe:`natars`}],baseBuildingCost:[180,250,400,80],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TRAPPER`,category:`military`,populationCoefficient:4,culturePointsCoefficient:1,effects:()=>[{effectId:`trapperCapacity`,valuesPerLevel:[0,10,22,35,49,64,80,97,115,134,154,175,196,218,241,265,290,316,343,371,400],type:`base`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`RALLY_POINT`,level:1},{id:3,type:`tribe`,tribe:`gauls`}],baseBuildingCost:[80,120,70,90],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:2e3,buildingDurationReduction:0},{id:`WORKSHOP`,category:`military`,populationCoefficient:3,culturePointsCoefficient:3,effects:()=>[vs(`workshopTrainingDuration`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5},{id:3,type:`building`,buildingId:`ACADEMY`,level:10}],baseBuildingCost:[460,510,600,320],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`BREWERY`,category:`infrastructure`,populationCoefficient:6,culturePointsCoefficient:4,effects:()=>[{effectId:`attack`,valuesPerLevel:[1,1.01,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.1,1.11,1.12,1.13,1.14,1.15,1.16,1.17,1.18,1.19,1.2],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`GRANARY`,level:20},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:10},{id:4,type:`tribe`,tribe:`teutons`}],baseBuildingCost:[3210,2050,2750,3830],buildingCostCoefficient:1.4,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:11750,buildingDurationReduction:3750},{id:`CRANNY`,category:`infrastructure`,populationCoefficient:0,culturePointsCoefficient:1,effects:e=>[xs(e)],buildingRequirements:[{id:1,type:`amount`,amount:1/0}],baseBuildingCost:[40,50,30,10],buildingCostCoefficient:1.28,maxLevel:10,buildingDurationBase:1.16,buildingDurationModifier:2625,buildingDurationReduction:1875},{id:`HORSE_DRINKING_TROUGH`,category:`infrastructure`,populationCoefficient:5,culturePointsCoefficient:3,effects:()=>[...ws()],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`RALLY_POINT`,level:10},{id:3,type:`building`,buildingId:`STABLE`,level:20},{id:4,type:`tribe`,tribe:`romans`}],baseBuildingCost:[780,420,660,540],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:5950,buildingDurationReduction:3750},{id:`MAIN_BUILDING`,category:`infrastructure`,populationCoefficient:2,culturePointsCoefficient:2,effects:()=>[{effectId:`buildingDuration`,valuesPerLevel:[1,1,.98,.96,.94,.91,.89,.87,.85,.83,.81,.78,.75,.73,.7,.67,.64,.6,.57,.54,.5],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1}],baseBuildingCost:[70,40,60,20],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`MARKETPLACE`,category:`infrastructure`,populationCoefficient:4,culturePointsCoefficient:3,effects:()=>[bs(`merchantAmount`)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`WAREHOUSE`,level:1},{id:3,type:`building`,buildingId:`GRANARY`,level:1},{id:4,type:`building`,buildingId:`MAIN_BUILDING`,level:3}],baseBuildingCost:[80,70,120,70],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3675,buildingDurationReduction:1875},{id:`RESIDENCE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:2,effects:()=>[...Cs(),{effectId:`residenceTrainingDuration`,valuesPerLevel:[1,1,1,1,1,1,1,1,1,1,1,1,.9,.82,.74,.67,.61,.55,.5,.45,.41],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5}],baseBuildingCost:[580,460,350,180],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TREASURY`,category:`infrastructure`,populationCoefficient:4,culturePointsCoefficient:6,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10}],baseBuildingCost:[2880,2740,2580,990],buildingCostCoefficient:1.26,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:9875,buildingDurationReduction:1875},{id:`TOURNAMENT_SQUARE`,category:`military`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[{effectId:`unitSpeedAfter20Fields`,valuesPerLevel:[1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4,4.2,4.4,4.6,4.8,5],type:`bonus`}],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`RALLY_POINT`,level:15}],baseBuildingCost:[1750,2250,1530,240],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:5375,buildingDurationReduction:1875},{id:`TRADE_OFFICE`,category:`infrastructure`,populationCoefficient:3,culturePointsCoefficient:3,effects:e=>[Ss(e)],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MARKETPLACE`,level:20},{id:3,type:`building`,buildingId:`STABLE`,level:10}],baseBuildingCost:[1400,1330,1200,400],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4875,buildingDurationReduction:1875},{id:`EMBASSY`,category:`infrastructure`,populationCoefficient:3,culturePointsCoefficient:4,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:1}],baseBuildingCost:[1400,1330,1200,400],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:3875,buildingDurationReduction:1875},{id:`TOWN_HALL`,category:`infrastructure`,populationCoefficient:4,culturePointsCoefficient:5,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`ACADEMY`,level:10}],baseBuildingCost:[1250,1110,1260,600],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:14375,buildingDurationReduction:1875},{id:`GATHERERS_HUT`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:3},{id:3,type:`building`,buildingId:`WAREHOUSE`,level:3},{id:4,type:`building`,buildingId:`GRANARY`,level:3}],baseBuildingCost:[230,190,80,60],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:4275,buildingDurationReduction:2075},{id:`HUNTERS_LODGE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[],buildingRequirements:[{id:1,type:`amount`,amount:1},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:5},{id:3,type:`building`,buildingId:`RALLY_POINT`,level:5}],baseBuildingCost:[390,280,250,140],buildingCostCoefficient:1.8,maxLevel:5,buildingDurationBase:1.16,buildingDurationModifier:3675,buildingDurationReduction:1775},{id:`GREAT_GRANARY`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[ys(`granaryCapacity`,3)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`GRANARY`,level:20}],baseBuildingCost:[400,500,350,100],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:8875,buildingDurationReduction:1875},{id:`GREAT_WAREHOUSE`,category:`infrastructure`,populationCoefficient:1,culturePointsCoefficient:1,effects:()=>[ys(`warehouseCapacity`,3)],buildingRequirements:[{id:1,type:`amount`,amount:1/0},{id:2,type:`building`,buildingId:`MAIN_BUILDING`,level:10},{id:3,type:`building`,buildingId:`WAREHOUSE`,level:20}],baseBuildingCost:[650,800,450,200],buildingCostCoefficient:1.28,maxLevel:20,buildingDurationBase:1.16,buildingDurationModifier:10875,buildingDurationReduction:1875}],Es=new Map(Ts.map(e=>[e.id,e])),Ds=e=>Es.get(e),Os=(e,t)=>{let{populationCoefficient:n}=Ds(e);if(t<=0)return 0;if(t===1)return n;let r=5*n+4,i=Math.trunc(r/10),a=r-i*10,o=a+t,s=Math.trunc(o/10),c=o-s*10,l=5*s*s-4*s+s*c,u=a+1,d=Math.trunc(u/10),f=u-d*10,p=l-(5*d*d-4*d+d*f);return n+(t-1)*i+p},ks=H(`attack.defence.defenceBonus.infantryDefence.cavalryDefence.warehouseCapacity.granaryCapacity.unitSpeed.unitSpeedAfter20Fields.unitWheatConsumption.unitCarryCapacity.buildingDuration.unitResearchDuration.unitImprovementDuration.merchantSpeed.merchantCapacity.merchantAmount.crannyCapacity.trapperCapacity.revealedIncomingTroopsAmount.woodProduction.clayProduction.ironProduction.wheatProduction.residenceTrainingDuration.barracksTrainingDuration.greatBarracksTrainingDuration.stableTrainingDuration.greatStableTrainingDuration.workshopTrainingDuration.hospitalTrainingDuration`.split(`.`)).meta({id:`EffectId`}),As=H([`global`,`local`,`server`]).meta({id:`EffectScope`}),js=H([`hero`,`oasis`,`artifact`,`building`,`tribe`,`server`,`troops`]).meta({id:`EffectSource`}),Ms=H([`base`,`bonus`,`bonus-booster`]).meta({id:`EffectType`});V({id:ks,value:R(),type:Ms,scope:As,source:js,tileId:R().nullable().optional(),sourceSpecifier:R().nullable()}).meta({id:`Effect`});const Ns=[`gauls`,`romans`,`teutons`,`egyptians`,`huns`],Ps=[`spartans`],Fs=[`nature`,`natars`],Is=[...Ns,...Ps,...Fs],Ls=H(Ns),Rs=H(Ps),zs=H(Fs),G=H(Is).meta({id:`Tribe`}),Bs=e=>{let t=``;for(let n of e)t+=n.toString(16).padStart(2,`0`);return t},Vs=e=>e===null?`NULL`:typeof e==`number`||typeof e==`bigint`?String(e):typeof e==`string`?`'${e.replaceAll(`'`,`''`)}'`:e instanceof ArrayBuffer?`X'${Bs(new Uint8Array(e))}'`:`X'${Bs(new Uint8Array(e.buffer,e.byteOffset,e.byteLength))}'`,K=(e,t,n,r)=>{if(r.length===0)return;let i=n.length;if(i===0)throw Error(`columns must not be empty`);let a=Math.floor(32766/i);a<1&&(a=1),a=Math.min(a,500);let o=`INSERT INTO ${t} (${n.join(`, `)}) VALUES `,s=r.length;for(let t=0;t<s;t+=a){let n=Math.min(s,t+a),c=o;for(let e=t;e<n;e+=1){let n=r[e];e>t&&(c+=`,`),c+=`(`;for(let e=0;e<i;e+=1)e>0&&(c+=`,`),c+=Vs(n[e]);c+=`)`}e.exec({sql:`${c};`})}},Hs=({effectId:e,type:t})=>`${e}:${t}`,Us=e=>{let t=new Map(Is.map(t=>[t,new Map(e.effects(t).map(e=>[Hs(e),e]))])),n=t.get(Is[0]);for(let r of t.values())if(!(r.size===n.size&&[...n.keys()].every(e=>r.has(e))))throw Error(`${e.id} effects must return the same effect ids and types for every tribe. Only values may differ.`);return t},Ws=(e,t)=>e.some((e,n)=>e!==t[n]),Gs=e=>{let t=Us(e);return[...t.get(Is[0]).keys()].map(e=>{let n=t.get(Is[0]).get(e),r=new Map(Is.map(n=>[n,t.get(n).get(e)]));return{effect:n,effectsByTribe:r,hasTribalValues:[...r.values()].some(e=>Ws(n.valuesPerLevel,e.valuesPerLevel))}})},Ks=e=>{let t=e.selectObjects({sql:`SELECT effect, id FROM effect_ids`,schema:V({effect:ks,id:R()})}),n=new Map(t.map(e=>[e.effect,e.id])),r=n.get(`wheatProduction`),i=[];for(let e of Ts){let t=Gs(e);for(let a=0;a<=e.maxLevel;a+=1){let o=Os(e.id,a);i.push([e.id,a,null,r,-o,`base`,o]);for(let{effect:r,effectsByTribe:o,hasTribalValues:s}of t){if(!s){i.push([e.id,a,null,n.get(r.effectId),r.valuesPerLevel[a],r.type,null]);continue}let t=new Map;for(let e of Is){let n=o.get(e),r=n.valuesPerLevel[a],i=t.get(r);if(i){i.tribes.push(e);continue}t.set(r,{effect:n,tribes:[e]})}let c;for(let e of t.values())(!c||e.tribes.length>c.tribes.length)&&(c=e);let{effect:{effectId:l,type:u,valuesPerLevel:d}}=c;i.push([e.id,a,null,n.get(l),d[a],u,null]);for(let[r,o]of t)if(o!==c)for(let t of o.tribes)i.push([e.id,a,t,n.get(o.effect.effectId),r,o.effect.type,null])}}}K(e,`building_data`,[`building_id`,`level`,`tribe`,`effect_id`,`value`,`type`,`population`],i)},qs=`Sleepy.Chonky.Moist.Sneaky.Cursed.Crusty.Wiggly.Spicy.Zesty.Grumpy.Donut.Floppy.Tofu.Boopy.Snaccy.Cheesy.Feral.Overcooked.Funky.Battle.Unicorn.NomNom.Snoring.Whiffled.Goopy.Thirsty.Rumbly.Twinkling.Mossy.Sizzling.Greasy.Plump.Bashful.Lumpy.Meaty.Fizzy.Nervous.Crumbly.Oozy.Dank.Wheezy.Jiggly.Mild.Chilly.Pungent.Tragic.Frilly.Melty.Loafy.Honkable.Farty`.split(`.`),Js=`Hill.Ford.Cliff.Knoll.Creek.Marsh.Ridge.Moor.Glen.Plains.Woods.Field.Knob.Wastes.Hollow.Pit.Haven.Borough.Valley.Town.Bridge.Fort.Crossing.Falls.Fjord.Crag.Shire.Bluff.Cairn.Pass.Ditch.Bay.Lagoon.Spire.Summit.Thicket.Mire.Arch.Chasm.Corridor.Steps.Gorge.Sprawl.Meadow.Furnace.Yard.Roost.Nest.Burrow.Oasis.Terrace.Vault.Landing.Nook`.split(`.`),Ys=new Map([[2,`WHEAT_FIELD`],[8,`WHEAT_FIELD`],[9,`WHEAT_FIELD`],[12,`WHEAT_FIELD`],[13,`WHEAT_FIELD`],[15,`WHEAT_FIELD`]]),Xs=new Map([[3,`WOODCUTTER`],[4,`IRON_MINE`],[6,`CLAY_PIT`],[7,`IRON_MINE`],[11,`IRON_MINE`],[14,`WOODCUTTER`],[16,`CLAY_PIT`],[17,`WOODCUTTER`],[18,`CLAY_PIT`]]),Zs=e=>new Map([...Ys,...Xs,...e]),q=(e,t,n)=>Zs([[1,e],[5,t],[10,n]]),Qs={3456:q(`IRON_MINE`,`CLAY_PIT`,`IRON_MINE`),3546:q(`CLAY_PIT`,`CLAY_PIT`,`IRON_MINE`),4356:q(`WOODCUTTER`,`IRON_MINE`,`IRON_MINE`),4536:q(`WOODCUTTER`,`CLAY_PIT`,`CLAY_PIT`),5346:q(`WOODCUTTER`,`WOODCUTTER`,`IRON_MINE`),5436:q(`WOODCUTTER`,`CLAY_PIT`,`WOODCUTTER`),4446:q(`WOODCUTTER`,`CLAY_PIT`,`IRON_MINE`),4437:q(`WOODCUTTER`,`CLAY_PIT`,`WHEAT_FIELD`),4347:q(`WOODCUTTER`,`WHEAT_FIELD`,`IRON_MINE`),3447:q(`WHEAT_FIELD`,`CLAY_PIT`,`IRON_MINE`),3339:q(`WHEAT_FIELD`,`WHEAT_FIELD`,`WHEAT_FIELD`),11115:new Map([[1,`WHEAT_FIELD`],[2,`WHEAT_FIELD`],[3,`WOODCUTTER`],[4,`IRON_MINE`],[5,`WHEAT_FIELD`],[6,`WHEAT_FIELD`],[7,`WHEAT_FIELD`],[8,`WHEAT_FIELD`],[9,`WHEAT_FIELD`],[10,`WHEAT_FIELD`],[11,`WHEAT_FIELD`],[12,`WHEAT_FIELD`],[13,`WHEAT_FIELD`],[14,`WHEAT_FIELD`],[15,`WHEAT_FIELD`],[16,`CLAY_PIT`],[17,`WHEAT_FIELD`],[18,`WHEAT_FIELD`]]),"00018":new Map([[1,`WHEAT_FIELD`],[2,`WHEAT_FIELD`],[3,`WHEAT_FIELD`],[4,`WHEAT_FIELD`],[5,`WHEAT_FIELD`],[6,`WHEAT_FIELD`],[7,`WHEAT_FIELD`],[8,`WHEAT_FIELD`],[9,`WHEAT_FIELD`],[10,`WHEAT_FIELD`],[11,`WHEAT_FIELD`],[12,`WHEAT_FIELD`],[13,`WHEAT_FIELD`],[14,`WHEAT_FIELD`],[15,`WHEAT_FIELD`],[16,`WHEAT_FIELD`],[17,`WHEAT_FIELD`],[18,`WHEAT_FIELD`]])},$s=e=>Qs[e],ec=new Map([[`romans`,`ROMAN_WALL`],[`gauls`,`GAUL_WALL`],[`teutons`,`TEUTONIC_WALL`],[`huns`,`HUN_WALL`],[`egyptians`,`EGYPTIAN_WALL`],[`spartans`,`SPARTAN_WALL`],[`nature`,`NATURE_WALL`],[`natars`,`NATAR_WALL`]]),tc=e=>ec.get(e),nc=new Map([[`player`,0],[`xxs`,5],[`xs`,5],[`sm`,10],[`md`,15],[`lg`,20],[`xl`,20],[`2xl`,20],[`3xl`,20],[`4xl`,20]]),rc=e=>nc.get(e),ic=new Map([[`player`,0],[`xxs`,3],[`xs`,4],[`sm`,6],[`md`,8],[`lg`,10],[`xl`,12],[`2xl`,14],[`3xl`,16],[`4xl`,18]]),ac=e=>ic.get(e),oc=new Map([[`player`,[{field_id:38,building_id:`MAIN_BUILDING`,level:1},{field_id:39,building_id:`RALLY_POINT`,level:1}]],[`xxs`,[{field_id:26,building_id:`WAREHOUSE`,level:2},{field_id:27,building_id:`GRANARY`,level:1},{field_id:31,building_id:`CRANNY`,level:2},{field_id:38,building_id:`MAIN_BUILDING`,level:2},{field_id:39,building_id:`RALLY_POINT`,level:1}]],[`xs`,[{field_id:26,building_id:`WAREHOUSE`,level:3},{field_id:27,building_id:`GRANARY`,level:2},{field_id:30,building_id:`EMBASSY`,level:1},{field_id:31,building_id:`CRANNY`,level:3},{field_id:32,building_id:`MARKETPLACE`,level:1},{field_id:38,building_id:`MAIN_BUILDING`,level:4},{field_id:39,building_id:`RALLY_POINT`,level:2}]],[`sm`,[{field_id:22,building_id:`BARRACKS`,level:3},{field_id:23,building_id:`RESIDENCE`,level:4},{field_id:24,building_id:`ACADEMY`,level:2},{field_id:25,building_id:`SMITHY`,level:2},{field_id:26,building_id:`WAREHOUSE`,level:6},{field_id:27,building_id:`GRANARY`,level:5},{field_id:30,building_id:`EMBASSY`,level:3},{field_id:31,building_id:`CRANNY`,level:5},{field_id:32,building_id:`MARKETPLACE`,level:3},{field_id:38,building_id:`MAIN_BUILDING`,level:7},{field_id:39,building_id:`RALLY_POINT`,level:3}]],[`md`,[{field_id:21,building_id:`TOWN_HALL`,level:1},{field_id:22,building_id:`BARRACKS`,level:6},{field_id:23,building_id:`RESIDENCE`,level:7},{field_id:24,building_id:`ACADEMY`,level:5},{field_id:25,building_id:`SMITHY`,level:4},{field_id:26,building_id:`WAREHOUSE`,level:10},{field_id:27,building_id:`GRANARY`,level:9},{field_id:30,building_id:`EMBASSY`,level:5},{field_id:31,building_id:`CRANNY`,level:6},{field_id:32,building_id:`MARKETPLACE`,level:7},{field_id:33,building_id:`STABLE`,level:3},{field_id:34,building_id:`WORKSHOP`,level:1},{field_id:38,building_id:`MAIN_BUILDING`,level:10},{field_id:39,building_id:`RALLY_POINT`,level:5}]],[`lg`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:4},{field_id:20,building_id:`HOSPITAL`,level:3},{field_id:21,building_id:`TOWN_HALL`,level:4},{field_id:22,building_id:`BARRACKS`,level:10},{field_id:23,building_id:`RESIDENCE`,level:10},{field_id:24,building_id:`ACADEMY`,level:8},{field_id:25,building_id:`SMITHY`,level:7},{field_id:26,building_id:`WAREHOUSE`,level:15},{field_id:27,building_id:`GRANARY`,level:14},{field_id:28,building_id:`HEROS_MANSION`,level:6},{field_id:29,building_id:`TREASURY`,level:3},{field_id:30,building_id:`EMBASSY`,level:7},{field_id:31,building_id:`CRANNY`,level:7},{field_id:32,building_id:`MARKETPLACE`,level:11},{field_id:33,building_id:`STABLE`,level:7},{field_id:34,building_id:`WORKSHOP`,level:4},{field_id:38,building_id:`MAIN_BUILDING`,level:13},{field_id:39,building_id:`RALLY_POINT`,level:7}]],[`xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:8},{field_id:20,building_id:`HOSPITAL`,level:6},{field_id:21,building_id:`TOWN_HALL`,level:7},{field_id:22,building_id:`BARRACKS`,level:14},{field_id:23,building_id:`RESIDENCE`,level:14},{field_id:24,building_id:`ACADEMY`,level:11},{field_id:25,building_id:`SMITHY`,level:10},{field_id:26,building_id:`WAREHOUSE`,level:19},{field_id:27,building_id:`GRANARY`,level:18},{field_id:28,building_id:`HEROS_MANSION`,level:10},{field_id:29,building_id:`TREASURY`,level:6},{field_id:30,building_id:`EMBASSY`,level:9},{field_id:31,building_id:`CRANNY`,level:8},{field_id:32,building_id:`MARKETPLACE`,level:14},{field_id:33,building_id:`STABLE`,level:11},{field_id:34,building_id:`WORKSHOP`,level:7},{field_id:35,building_id:`BRICKYARD`,level:3},{field_id:36,building_id:`SAWMILL`,level:3},{field_id:37,building_id:`TRADE_OFFICE`,level:5},{field_id:38,building_id:`MAIN_BUILDING`,level:16},{field_id:39,building_id:`RALLY_POINT`,level:10}]],[`2xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:12},{field_id:20,building_id:`HOSPITAL`,level:8},{field_id:21,building_id:`TOWN_HALL`,level:10},{field_id:22,building_id:`BARRACKS`,level:17},{field_id:23,building_id:`RESIDENCE`,level:16},{field_id:24,building_id:`ACADEMY`,level:14},{field_id:25,building_id:`SMITHY`,level:13},{field_id:26,building_id:`WAREHOUSE`,level:20},{field_id:27,building_id:`GRANARY`,level:20},{field_id:28,building_id:`HEROS_MANSION`,level:13},{field_id:29,building_id:`TREASURY`,level:8},{field_id:30,building_id:`EMBASSY`,level:11},{field_id:31,building_id:`CRANNY`,level:9},{field_id:32,building_id:`MARKETPLACE`,level:17},{field_id:33,building_id:`STABLE`,level:14},{field_id:34,building_id:`WORKSHOP`,level:10},{field_id:35,building_id:`BRICKYARD`,level:5},{field_id:36,building_id:`SAWMILL`,level:5},{field_id:37,building_id:`TRADE_OFFICE`,level:8},{field_id:38,building_id:`MAIN_BUILDING`,level:18},{field_id:39,building_id:`RALLY_POINT`,level:12}]],[`3xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:15},{field_id:20,building_id:`HOSPITAL`,level:10},{field_id:21,building_id:`TOWN_HALL`,level:13},{field_id:22,building_id:`BARRACKS`,level:19},{field_id:23,building_id:`RESIDENCE`,level:18},{field_id:24,building_id:`ACADEMY`,level:16},{field_id:25,building_id:`SMITHY`,level:15},{field_id:26,building_id:`WAREHOUSE`,level:20},{field_id:27,building_id:`GRANARY`,level:20},{field_id:28,building_id:`HEROS_MANSION`,level:16},{field_id:29,building_id:`TREASURY`,level:10},{field_id:30,building_id:`EMBASSY`,level:13},{field_id:31,building_id:`CRANNY`,level:10},{field_id:32,building_id:`MARKETPLACE`,level:19},{field_id:33,building_id:`STABLE`,level:17},{field_id:34,building_id:`WORKSHOP`,level:13},{field_id:35,building_id:`BRICKYARD`,level:5},{field_id:36,building_id:`SAWMILL`,level:5},{field_id:37,building_id:`TRADE_OFFICE`,level:11},{field_id:38,building_id:`MAIN_BUILDING`,level:19},{field_id:39,building_id:`RALLY_POINT`,level:15}]],[`4xl`,[{field_id:19,building_id:`TOURNAMENT_SQUARE`,level:20},{field_id:20,building_id:`HOSPITAL`,level:12},{field_id:21,building_id:`TOWN_HALL`,level:15},{field_id:22,building_id:`BARRACKS`,level:20},{field_id:23,building_id:`RESIDENCE`,level:20},{field_id:24,building_id:`ACADEMY`,level:20},{field_id:25,building_id:`SMITHY`,level:20},{field_id:26,building_id:`WAREHOUSE`,level:20},{field_id:27,building_id:`GRANARY`,level:20},{field_id:28,building_id:`HEROS_MANSION`,level:20},{field_id:29,building_id:`TREASURY`,level:12},{field_id:30,building_id:`EMBASSY`,level:15},{field_id:31,building_id:`CRANNY`,level:10},{field_id:32,building_id:`MARKETPLACE`,level:20},{field_id:33,building_id:`STABLE`,level:20},{field_id:34,building_id:`WORKSHOP`,level:15},{field_id:35,building_id:`BRICKYARD`,level:5},{field_id:36,building_id:`SAWMILL`,level:5},{field_id:37,building_id:`TRADE_OFFICE`,level:14},{field_id:38,building_id:`MAIN_BUILDING`,level:20},{field_id:39,building_id:`RALLY_POINT`,level:20}]]]),sc=e=>oc.get(e),cc=(e,t,n)=>{let r=rc(e),i=tc(t),a=ac(e),o=$s(n),s=sc(e);return[...Array.from(o,([e,t])=>({building_id:t,level:a,field_id:e})),...s,{building_id:i,field_id:40,level:r}]},lc=H(`BARRACKS.GREAT_BARRACKS.STABLE.GREAT_STABLE.WORKSHOP.HOSPITAL.ASCLEPEION.CLAY_PIT.WHEAT_FIELD.WOODCUTTER.IRON_MINE.BAKERY.BRICKYARD.GRAIN_MILL.GRANARY.GREAT_GRANARY.IRON_FOUNDRY.SAWMILL.WAREHOUSE.GREAT_WAREHOUSE.WATERWORKS.ACADEMY.ROMAN_WALL.SPARTAN_WALL.TEUTONIC_WALL.HEROS_MANSION.HUN_WALL.GAUL_WALL.RALLY_POINT.EGYPTIAN_WALL.NATURE_WALL.NATAR_WALL.TRAPPER.BREWERY.COMMAND_CENTER.CRANNY.HORSE_DRINKING_TROUGH.MAIN_BUILDING.MARKETPLACE.RESIDENCE.TOURNAMENT_SQUARE.TRADE_OFFICE.SMITHY.TOWN_HALL.EMBASSY.TREASURY.GATHERERS_HUT.HUNTERS_LODGE`.split(`.`)).meta({id:`BuildingId`}),uc=H([`4446`,`5436`,`5346`,`4536`,`3546`,`4356`,`3456`,`4437`,`4347`,`3447`,`3339`,`11115`,`00018`]).meta({id:`ResourceFieldComposition`,description:`The composition of resource fields in a village.`,example:`4446`}),dc=(()=>{let e=[`xxs`,`xs`,`sm`,`md`,`lg`,`xl`,`2xl`,`3xl`,`4xl`],t=[16,15,14,14,14,13,6,5,4],n=Array.from({length:101}),r=0;for(let i=0;i<e.length;i+=1){let a=e[i],o=t[i];for(let e=0;e<o;e+=1)r+=1,n[r]=a}return n})(),fc=(e,t=2048)=>{let n=e/2,r=n*n,i=r/t,a=new Uint8Array(t);for(let e=0;e<t;e+=1){let t=(e+.5)*i,r=Math.floor(Math.sqrt(t)/n*100);a[e]=Math.min(100,Math.max(0,r))}return{table:a,step:i,maxD2:r}},pc=new Map,mc=(e,t,n)=>{let r=Math.round(e),i=pc.get(r);i||(i=fc(e,4096),pc.set(r,i));let{table:a,step:o,maxD2:s}=i,c=t*t+n*n;if(c>=s)return dc[100];let l=a[Math.floor(c/o)];return dc[l]},hc=(e,t)=>{let n=e.selectObjects({sql:`SELECT id, building FROM building_ids`,schema:V({id:R(),building:lc})}),r=new Map(n.map(e=>[e.building,e.id])),i=e.selectObjects({sql:`
      SELECT
        v.id AS village_id,
        t.x,
        t.y,
        rfc.resource_field_composition AS resource_field_composition,
        ti.tribe,
        p.id AS player_id
      FROM
        villages v
          JOIN tiles t ON v.tile_id = t.id
          LEFT JOIN resource_field_composition_ids rfc ON t.resource_field_composition_id = rfc.id
          JOIN players p ON v.player_id = p.id
          JOIN tribe_ids ti ON p.tribe_id = ti.id;
    `,schema:V({village_id:R(),x:R(),y:R(),resource_field_composition:uc,tribe:G,player_id:R()})}),a=new Map,o=[],s=[],c=1,l=(e,t,n)=>{let i=`${e}:${t}:${n}`,s=a.get(i);if(s!==void 0)return s;let l=c;c+=1,a.set(i,l);let u=cc(e,t,n).map(({field_id:e,building_id:t,level:n})=>[e,r.get(t),n]);for(let[e,t,n]of u)o.push([l,e,t,n]);return l};for(let{player_id:e,resource_field_composition:n,tribe:r,village_id:a,x:o,y:c}of i){if(e===1){let e=l(`player`,r,n);s.push([a,e]);continue}let i=l(mc(t.configuration.mapSize,o,c),r,n);s.push([a,i])}e.exec({sql:`
      CREATE TEMPORARY TABLE building_field_templates
      (
        template_id INTEGER NOT NULL,
        field_id INTEGER NOT NULL,
        building_id INTEGER NOT NULL,
        level INTEGER NOT NULL
      ) STRICT;
    `}),e.exec({sql:`
      CREATE TEMPORARY TABLE village_building_field_templates
      (
        village_id INTEGER NOT NULL,
        template_id INTEGER NOT NULL
      ) STRICT;
    `}),K(e,`building_field_templates`,[`template_id`,`field_id`,`building_id`,`level`],o),K(e,`village_building_field_templates`,[`village_id`,`template_id`],s),e.exec({sql:`
      INSERT INTO
        building_fields (village_id, field_id, building_id, level)
      SELECT
        vbft.village_id,
        bft.field_id,
        bft.building_id,
        bft.level
      FROM
        village_building_field_templates vbft
          JOIN building_field_templates bft ON bft.template_id = vbft.template_id;
    `}),e.exec({sql:`DROP TABLE village_building_field_templates;`}),e.exec({sql:`DROP TABLE building_field_templates;`})},gc=e=>{let t=lc.options;K(e,`building_ids`,[`building`],t.map(e=>[e]))},_c=e=>{e.exec({sql:`
      INSERT INTO
        developer_settings (
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
      )
      VALUES
        (0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    `})},vc=e=>{e.exec({sql:`
      INSERT INTO effect_type_ids (id, type)
      VALUES
        (1, 'base'),
        (2, 'bonus'),
        (3, 'bonus-booster');
    `}),e.exec({sql:`
      INSERT INTO effect_scope_ids (id, scope)
      VALUES
        (1, 'global'),
        (2, 'local'),
        (3, 'server');
    `}),e.exec({sql:`
      INSERT INTO effect_source_ids (id, source)
      VALUES
        (1, 'building'),
        (2, 'hero'),
        (3, 'oasis'),
        (4, 'artifact'),
        (5, 'tribe'),
        (6, 'server'),
        (7, 'troops');
    `})},yc=e=>{let t=[`wheatProduction`,...ks.options.filter(e=>e!==`wheatProduction`)];K(e,`effect_ids`,[`effect`],t.map(e=>[e]))},bc=[{tribe:`gauls`,merchantSpeed:24,merchantCapacity:750},{tribe:`romans`,merchantSpeed:16,merchantCapacity:500},{tribe:`teutons`,merchantSpeed:12,merchantCapacity:1e3},{tribe:`huns`,merchantSpeed:20,merchantCapacity:500},{tribe:`egyptians`,merchantSpeed:16,merchantCapacity:750},{tribe:`spartans`,merchantSpeed:14,merchantCapacity:500},{tribe:`nature`,merchantSpeed:12,merchantCapacity:1500},{tribe:`natars`,merchantSpeed:12,merchantCapacity:1500}];new Map(bc.map(e=>[e.tribe,e]));const xc=e=>e.scope===`local`,Sc=(e,t)=>{let{tribe:n}=e.playerConfiguration,r=n===`egyptians`?12:9;return[{id:`woodProduction`,value:r*4,type:`base`},{id:`clayProduction`,value:r*4,type:`base`},{id:`ironProduction`,value:r*4,type:`base`},{id:`wheatProduction`,value:r*4,type:`base`}].map(e=>({...e,scope:`local`,source:`hero`,tileId:t,sourceSpecifier:0}))},Cc=e=>{let{tribe:t}=e.playerConfiguration,n=bc.find(({tribe:e})=>e===t),r=[{id:`merchantCapacity`,value:n.merchantCapacity},{id:`merchantSpeed`,value:n.merchantSpeed}],i=[`warehouseCapacity`,`granaryCapacity`];return[...r.map(e=>({...e,scope:`global`,source:`tribe`,type:`base`,sourceSpecifier:null})),...i.map(e=>({id:e,value:800,source:`building`,scope:`global`,type:`base`,sourceSpecifier:null}))]},wc=e=>{let{configuration:{speed:t}}=e,n=[`merchantCapacity`,`merchantSpeed`,`woodProduction`,`clayProduction`,`ironProduction`,`wheatProduction`,`unitSpeed`],r=[`barracksTrainingDuration`,`greatBarracksTrainingDuration`,`stableTrainingDuration`,`greatStableTrainingDuration`,`workshopTrainingDuration`,`hospitalTrainingDuration`,`buildingDuration`,`unitImprovementDuration`,`unitResearchDuration`];return[...n,...r].map(e=>({id:e,value:n.includes(e)?t:1/t,source:`server`,scope:`server`,type:`bonus`,sourceSpecifier:null}))},Tc=(e,t)=>{let n=e.selectObjects({sql:`SELECT effect, id FROM effect_ids`,schema:V({effect:ks,id:R()})}),r=new Map(n.map(e=>[e.effect,e.id])),i=e.selectObjects({sql:`SELECT type, id FROM effect_type_ids`,schema:V({type:Ms,id:R()})}),a=new Map(i.map(e=>[e.type,e.id])),o=e.selectObjects({sql:`SELECT scope, id FROM effect_scope_ids`,schema:V({scope:As,id:R()})}),s=new Map(o.map(e=>[e.scope,e.id])),c=e.selectObjects({sql:`SELECT source, id FROM effect_source_ids`,schema:V({source:js,id:R()})}),l=new Map(c.map(e=>[e.source,e.id])),u=e.selectValue({sql:`
      SELECT tile_id
      FROM
        villages
      WHERE
        player_id = $player_id;`,bind:{$player_id:1},schema:R()}),d=[],f=[...wc(t),...Cc(t),...Sc(t,u)];for(let e of f){let t=xc(e)?e.tileId:null;d.push([r.get(e.id),e.value,a.get(e.type),s.get(e.scope),l.get(e.source),t,e.sourceSpecifier])}let p=r.get(`wheatProduction`),m=a.get(`base`),h=s.get(`local`),g=l.get(`building`),_=l.get(`troops`),v=l.get(`oasis`),y=r.get(`warehouseCapacity`),b=r.get(`granaryCapacity`),x=r.get(`woodProduction`),S=r.get(`clayProduction`),C=r.get(`ironProduction`);e.exec({sql:`
      WITH
        building_effect_data AS (
          SELECT
            bi.id AS building_id,
            bd.level,
            ti.id AS tribe_id,
            bd.effect_id,
            COALESCE(tbd.value, bd.value) AS value,
            et.id AS type_id
          FROM
            building_data bd
              JOIN building_ids bi ON bi.building = bd.building_id
              JOIN effect_type_ids et ON et.type = bd.type
              CROSS JOIN tribe_ids ti
              LEFT JOIN building_data tbd ON tbd.building_id = bd.building_id
                AND tbd.level = bd.level
                AND tbd.tribe = ti.tribe
                AND tbd.effect_id = bd.effect_id
                AND tbd.type = bd.type
                AND tbd.population IS NULL
          WHERE
            bd.tribe IS NULL
            AND bd.population IS NULL
        )

      INSERT INTO
        effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
      SELECT
        bed.effect_id,
        bed.value,
        bed.type_id,
        $local_scope_id,
        $building_source_id,
        v.tile_id,
        bf.field_id
      FROM
        building_fields bf
          JOIN villages v ON v.id = bf.village_id
          JOIN players p ON p.id = v.player_id
          JOIN building_effect_data bed ON bed.building_id = bf.building_id
            AND bed.level = bf.level
            AND bed.tribe_id = p.tribe_id;
    `,bind:{$building_source_id:g,$local_scope_id:h}}),e.exec({sql:`
      WITH
        building_population_data AS MATERIALIZED (
          SELECT
            bi.id AS building_id,
            bd.level,
            bd.value
          FROM
            building_data bd
              JOIN building_ids bi ON bi.building = bd.building_id
          WHERE
            bd.tribe IS NULL
            AND bd.population IS NOT NULL
        )

      INSERT INTO
        effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
      SELECT
        $wheat_production_effect_id,
        SUM(bpd.value),
        $base_type_id,
        $local_scope_id,
        $building_source_id,
        v.tile_id,
        0
      FROM
        building_fields bf
          JOIN villages v ON v.id = bf.village_id
          JOIN building_population_data bpd ON bpd.building_id = bf.building_id
            AND bpd.level = bf.level
      GROUP BY
        v.tile_id;
    `,bind:{$base_type_id:m,$building_source_id:g,$local_scope_id:h,$wheat_production_effect_id:p}}),e.exec({sql:`
      INSERT INTO
        effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
      SELECT
        $wheat_production_effect_id,
        SUM(tr.amount * ud.wheat_consumption),
        $base_type_id,
        $local_scope_id,
        $troops_source_id,
        v.tile_id,
        NULL
      FROM
        troops AS tr
          JOIN unit_ids ui ON ui.id = tr.unit_id
          JOIN villages AS v ON tr.tile_id = v.tile_id
          JOIN unit_data ud ON ud.unit_id = ui.unit
      GROUP BY
        v.tile_id;
    `,bind:{$base_type_id:m,$local_scope_id:h,$troops_source_id:_,$wheat_production_effect_id:p}}),e.exec({sql:`
      WITH
        oasis_by_tile AS MATERIALIZED (
          SELECT
            o.tile_id,
            MAX(CASE WHEN ri.resource = 'wood' THEN o.bonus END) AS wood_bonus,
            MAX(CASE WHEN ri.resource = 'clay' THEN o.bonus END) AS clay_bonus,
            MAX(CASE WHEN ri.resource = 'iron' THEN o.bonus END) AS iron_bonus,
            MAX(CASE WHEN ri.resource = 'wheat' THEN o.bonus END) AS wheat_bonus,
            MAX(o.bonus) AS max_bonus,
            COUNT(*) AS bonus_count
          FROM
            oasis o
              JOIN resource_ids ri ON ri.id = o.resource_id
          GROUP BY
            o.tile_id
          ),

        oasis_effects_to_insert(effect_id, value, tile_id) AS (
          SELECT
            $wood_production_effect_id,
            CASE
              WHEN wood_bonus = 50 THEN 80
              WHEN wood_bonus = 25 THEN 40
              ELSE 10
              END,
            tile_id
          FROM oasis_by_tile

          UNION ALL

          SELECT
            $clay_production_effect_id,
            CASE
              WHEN clay_bonus = 50 THEN 80
              WHEN clay_bonus = 25 THEN 40
              ELSE 10
              END,
            tile_id
          FROM oasis_by_tile

          UNION ALL

          SELECT
            $iron_production_effect_id,
            CASE
              WHEN iron_bonus = 50 THEN 80
              WHEN iron_bonus = 25 THEN 40
              ELSE 10
              END,
            tile_id
          FROM oasis_by_tile

          UNION ALL

          SELECT
            $wheat_production_effect_id,
            CASE
              WHEN wheat_bonus = 50 THEN 80
              WHEN wheat_bonus = 25 THEN 40
              ELSE 10
              END,
            tile_id
          FROM oasis_by_tile

          UNION ALL

          SELECT
            $warehouse_capacity_effect_id,
            CASE
              WHEN max_bonus = 50 OR bonus_count = 2 THEN 2000
              ELSE 1000
              END,
            tile_id
          FROM oasis_by_tile

          UNION ALL

          SELECT
            $granary_capacity_effect_id,
            CASE
              WHEN max_bonus = 50 OR bonus_count = 2 THEN 2000
              ELSE 1000
              END,
            tile_id
          FROM oasis_by_tile
          )

      INSERT
      INTO
        effects (effect_id, value, type_id, scope_id, source_id, tile_id, source_specifier)
      SELECT
        oeti.effect_id,
        oeti.value,
        $base_type_id,
        $local_scope_id,
        $oasis_source_id,
        oeti.tile_id,
        oeti.tile_id
      FROM
        oasis_effects_to_insert oeti;
    `,bind:{$base_type_id:m,$clay_production_effect_id:S,$granary_capacity_effect_id:b,$iron_production_effect_id:C,$local_scope_id:h,$oasis_source_id:v,$warehouse_capacity_effect_id:y,$wheat_production_effect_id:p,$wood_production_effect_id:x}}),K(e,`effects`,[`effect_id`,`value`,`type_id`,`scope_id`,`source_id`,`tile_id`,`source_specifier`],d)},Ec=(e,t)=>{K(e,`events`,[`type`,`starts_at`,`duration`,`village_id`,`meta`],[])},Dc=H([`player`,`npc1`,`npc2`,`npc3`,`npc4`,`npc5`,`npc6`,`npc7`,`npc8`]).meta({id:`Faction`}),Oc=e=>{let t=Dc.options;K(e,`faction_ids`,[`faction`],t.map(e=>[e]))},J=new Map([[`ecstatic`,63e3],[`honored`,57e3],[`respected`,48e3],[`friendly`,45e3],[`neutral`,42e3],[`unfriendly`,39e3],[`hostile`,36e3],[`hated`,0]]),kc=e=>{let t=e.selectObjects({sql:`SELECT faction, id FROM faction_ids;`,schema:V({faction:Dc,id:R()})}),n=Object.fromEntries(t.map(e=>[e.faction,e.id])),r=n.player,i=[[r,n.npc1,J.get(`ecstatic`)],[r,n.npc2,J.get(`honored`)],[r,n.npc3,J.get(`respected`)],[r,n.npc4,J.get(`friendly`)],[r,n.npc5,J.get(`neutral`)],[r,n.npc6,J.get(`unfriendly`)],[r,n.npc7,J.get(`hostile`)],[r,n.npc8,J.get(`hated`)]];K(e,`faction_reputation`,[`source_faction_id`,`target_faction_id`,`reputation`],i)},Ac=e=>{e.exec({sql:`
      INSERT INTO
        gatherers_hut_expeditions (village_id, completed)
      SELECT id, 0
      FROM
        villages
      WHERE
        player_id = $player_id
      ON CONFLICT(village_id) DO NOTHING;
    `,bind:{$player_id:1}})},jc=e=>{let t=e.selectValue({sql:`SELECT created_at FROM servers LIMIT 1;`,schema:R()});e.exec({sql:`
      INSERT INTO
        hero_adventures (hero_id, available, last_updated_at, completed)
      SELECT id, 3, $last_updated_at, 0
      FROM
        heroes
      WHERE
        player_id = $player_id;
    `,bind:{$player_id:1,$last_updated_at:t}})},Mc=e=>{e.exec({sql:`
      INSERT INTO heroes (
        player_id,
        experience,
        health,
        base_attack_power,
        health_regeneration,
        damage_reduction,
        experience_modifier,
        speed,
        natarian_attack_bonus,
        attack_bonus,
        defence_bonus,
        resource_to_produce,
        village_id
      )
      SELECT
        p.id,
        0,
        100,
        CASE WHEN LOWER(ti.tribe) = 'romans' THEN 100 ELSE 80 END,
        10,
        0,
        0,
        6,
        0,
        0,
        0,
        'shared',
        (SELECT id FROM villages WHERE player_id = p.id LIMIT 1)
      FROM players p
      JOIN tribe_ids ti ON ti.id = p.tribe_id
      WHERE p.id = $player_id;
    `,bind:{$player_id:1}}),e.exec({sql:`
      INSERT INTO hero_selectable_attributes (
        hero_id,
        attack_power,
        resource_production,
        attack_bonus,
        defence_bonus
      )
      SELECT
        id,
        0,
        4,
        0,
        0
      FROM heroes;
    `})},Nc=e=>{e.exec({sql:`
      INSERT INTO
        map_filters (player_id, should_show_faction_reputation, should_show_oasis_icons, should_show_troop_movements,
                     should_show_wheat_fields, should_show_tile_tooltips, should_show_treasure_icons)
      VALUES
        (1, 1, 1, 1, 1, 1, 1)
    `})},Pc=e=>{e.exec({sql:`INSERT INTO meta (last_write) VALUES (unixepoch());`})},Fc=Uo([z(),z(),z(),z()]).meta({id:`ResourceBundle`}),Ic=H([`wood`,`clay`,`iron`,`wheat`]).meta({id:`Resource`});V({wood:R(),clay:R(),iron:R(),wheat:R()}).meta({id:`Resources`});var Lc=class{s;constructor(e=Date.now()){let t=typeof e==`number`?e:[...e.toString()].reduce((e,t)=>e+t.charCodeAt(0),0);this.s=t>>>0}next(){this.s=this.s+1831565813>>>0;let e=this.s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)*23283064365386963e-26}state(){return{s:this.s}}setState({s:e}){this.s=e>>>0}};const Y=(e,t)=>{let n=new Lc(e);t&&n.setState(t);let r=()=>n.next();return r.quick=r,r.double=()=>r()+(r()*2097152|0)*11102230246251565e-32,r.int32=()=>r()*4294967296|0,r.state=()=>n.state(),r},Rc=e=>{let[t,n,r,...i]=[...e];return[t,n,r,i.join(``)].map(e=>Number.parseInt(e,10))},zc=new Map([[`wood`,0],[`clay`,1],[`iron`,2],[`wheat`,3]]),Bc=new Map([...zc.entries()].map(([e,t])=>[t,e])),Vc=(e,t,n,r,i)=>zc.get(e)<<12|t<<9|n<<7|r<<4|i,Hc=e=>{let t=e&15,n=e>>4&7,r=e>>7&3,i=e>>9&7,a=e>>12&3;return{oasisResource:Bc.get(a),oasisGroup:i,oasisGroupPositions:`${r}-${n}`,variant:t}},Uc=e=>{let t=(e%2==0?e:e+1)+4,n=t+1,r=Math.floor(t/2),i=(r-2)**2;return{gridSize:n,totalSize:t,halfSize:r,borderWidth:4,totalTiles:n**2,mapBorderThreshold:i}},X=(e,t,n)=>Math.floor(e()*(n-t+1)+t),Z=(e,t)=>t[Math.floor(e()*t.length)],Wc=(e,t,n)=>{let r=t.length;if(n>=r)return[...t];let i=[],a=Array.from({length:r},(e,t)=>t);for(let o=0;o<n;o+=1){let n=o+Math.floor(e()*(r-o));[a[o],a[n]]=[a[n],a[o]],i.push(t[a[o]])}return i},Gc=(e,t)=>{let n=Y(e.seed),r=[];for(let{id:e,oasis_graphics:i}of t){let{oasisResource:t}=Hc(i);if(X(n,1,2)===1){r.push({tileId:e,resource:t,bonus:50});continue}r.push({tileId:e,resource:t,bonus:25}),t!==`wheat`&&X(n,1,2)===1&&r.push({tileId:e,resource:`wheat`,bonus:25})}return r},Kc=(e,t)=>{let n=e.selectObjects({sql:`SELECT id, resource FROM resource_ids;`,schema:V({id:R(),resource:Ic})}),r=new Map(n.map(({id:e,resource:t})=>[t,e])),i=e.selectObjects({sql:`
      SELECT id, oasis_graphics
      FROM
        tiles
      WHERE
        type_id = (SELECT id FROM tile_type_ids WHERE type = 'oasis')
      ORDER BY
        id;
    `,schema:V({id:R(),oasis_graphics:R()})}),a=Gc(t,i).map(({tileId:e,resource:t,bonus:n})=>[e,r.get(t),n,null]);K(e,`oasis`,[`tile_id`,`resource_id`,`bonus`,`village_id`],a)},qc=V({id:R(),x:R(),y:R(),hero_mansion_level:R()}),Jc=V({id:R(),x:R(),y:R()}),Yc=e=>e>=20?3:e>=15?2:+(e>=10),Xc=(e,t)=>{let n=Y(t.seed),r=e.selectObjects({sql:`
      SELECT
        villages.id,
        x,
        y,
        COALESCE(MAX(building_fields.level), 0) AS hero_mansion_level
      FROM
        tiles
          INNER JOIN villages ON tiles.id = villages.tile_id
          LEFT JOIN building_fields
            ON building_fields.village_id = villages.id
            AND building_fields.building_id = (SELECT id FROM building_ids WHERE building = 'HEROS_MANSION')
      GROUP BY
        villages.id,
        x,
        y;
    `,schema:qc}),i=e.selectObjects({sql:`
      SELECT tiles.id, x, y
      FROM
        tiles
      WHERE
        type_id = (SELECT id FROM tile_type_ids WHERE type = 'oasis');
    `,schema:Jc}),a=new Map(i.map(e=>[`${e.x}-${e.y}`,e])),o=[];for(let{hero_mansion_level:e,id:t,x:i,y:s}of r){let r=Yc(e);if(r===0)continue;let c=0;outer:for(let e=-3;e<=3;e+=1)for(let l=-3;l<=3;l+=1){let u=`${i+e}-${s+l}`,d=a.get(u);if(d&&X(n,1,3)===1&&(o.push([t,d.id]),c+=1,a.delete(u),c===r))break outer}}let s=e.prepare({sql:`UPDATE oasis SET village_id = $village_id WHERE tile_id = $tile_id;`});for(let e of o){let[t,n]=e;s.bind({$village_id:t,$tile_id:n}).stepReset()}},Zc=({prng:n,id:r,factionId:i})=>{let a=Z(n,e),o=Z(n,t),s=`${r%1e4}`.padStart(4,`0`),c=Z(n,G.exclude([`spartans`,`nature`]).options);return{id:r,name:`${a}${o}#${s}`,tribe:c,factionId:i}},Qc=(e,t)=>{let{playerConfiguration:{name:n,tribe:r}}=e;return{id:1,name:n,tribe:r,factionId:t}},$c=(e,t)=>{let n=Y(e.seed),{mapSize:r}=e.configuration,{totalTiles:i}=Uc(r),a=Math.round((.046*i+1)/100)*100-1;return Array.from({length:a},(e,r)=>{let i=Z(n,t);return Zc({prng:n,id:r+2,factionId:i})})},el=e=>e.replaceAll(/([a-z])([A-Z])/g,`$1-$2`).toLowerCase().replaceAll(/[^a-z0-9]+/g,`-`).replaceAll(/^-+|-+$/g,``),tl=(e,t)=>{let n=e.selectObjects({sql:`SELECT id, tribe FROM tribe_ids`,schema:V({id:R(),tribe:G})}),r=new Map(n.map(e=>[e.tribe,e.id])),i=e.selectObjects({sql:`SELECT id, faction FROM faction_ids`,schema:V({id:R(),faction:Dc})}),a=new Map(i.map(e=>[e.faction,e.id])),o=a.get(`player`);a.delete(`player`);let s=[...a.values()],c=[Qc(t,o),...$c(t,s)].map(({id:e,name:t,tribe:n,factionId:i})=>[e,t,el(t),r.get(n),i]);K(e,`players`,[`id`,`name`,`slug`,`tribe_id`,`faction_id`],c)},nl={PROD:!0,DEV:!1,MODE:`production`,VERSION:`0.4.62`,GRAPHICS_VERSION:`0.1.2`,VITE_FARO_INGEST_ENDPOINT:void 0,URL:void 0,DEPLOY_URL:void 0,DEPLOY_PRIME_URL:void 0,COMMIT_REF:void 0,HEAD:void 0},rl=e=>{let t=nl.DEV,n=Number(t),r=Number(!t);e.exec({sql:`
      INSERT INTO
        preferences (player_id, is_accessibility_mode_enabled, is_reduced_motion_mode_enabled,
                     should_show_building_names,
                     is_automatic_navigation_after_building_level_change_enabled,
                     is_automatic_navigation_after_unit_research_enabled,
                     is_automatic_navigation_after_unit_upgrade_enabled,
                     is_automatic_navigation_after_send_units_enabled, is_developer_tools_console_enabled,
                     should_show_notifications_on_building_upgrade_completion,
                     should_show_notifications_on_unit_upgrade_completion,
                     should_show_notifications_on_academy_research_completion)
      VALUES
        ($player_id, 0, 0, 1, ${r}, ${r}, ${r}, ${r}, ${n}, 0, 0, 0)
    `,bind:{$player_id:1}})},il=[{id:`LEGIONNAIRE`,baseRecruitmentCost:[120,100,150,30],baseRecruitmentDuration:16e5,unitWheatConsumption:1,attack:40,infantryDefence:35,cavalryDefence:50,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`romans`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`PRAETORIAN`,baseRecruitmentCost:[100,130,160,70],baseRecruitmentDuration:176e4,unitWheatConsumption:1,attack:30,infantryDefence:65,cavalryDefence:35,unitSpeed:5,unitCarryCapacity:20,category:`infantry`,tribe:`romans`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1}]},{id:`IMPERIAN`,baseRecruitmentCost:[150,160,210,80],baseRecruitmentDuration:192e4,unitWheatConsumption:1,attack:70,infantryDefence:40,cavalryDefence:25,unitSpeed:7,unitCarryCapacity:50,category:`infantry`,tribe:`romans`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`ROMAN_SCOUT`,baseRecruitmentCost:[140,160,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:16,unitCarryCapacity:0,category:`cavalry`,tribe:`romans`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`EQUITES_IMPERATORIS`,baseRecruitmentCost:[550,440,320,100],baseRecruitmentDuration:264e4,unitWheatConsumption:3,attack:120,infantryDefence:65,cavalryDefence:50,unitSpeed:14,unitCarryCapacity:100,category:`cavalry`,tribe:`romans`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`EQUITES_CAESARIS`,baseRecruitmentCost:[550,640,800,180],baseRecruitmentDuration:352e4,unitWheatConsumption:4,attack:180,infantryDefence:80,cavalryDefence:105,unitSpeed:10,unitCarryCapacity:70,category:`cavalry`,tribe:`romans`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`ROMAN_RAM`,baseRecruitmentCost:[900,360,500,70],baseRecruitmentDuration:46e5,unitWheatConsumption:3,attack:60,infantryDefence:30,cavalryDefence:75,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`romans`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`ROMAN_CATAPULT`,baseRecruitmentCost:[950,1350,600,90],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:75,infantryDefence:60,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`romans`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`ROMAN_CHIEF`,baseRecruitmentCost:[30750,27200,45e3,37500],baseRecruitmentDuration:907e5,unitWheatConsumption:5,attack:50,infantryDefence:40,cavalryDefence:30,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`romans`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`ROMAN_SETTLER`,baseRecruitmentCost:[4600,4200,5800,4400],baseRecruitmentDuration:269e5,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`romans`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],al=[{id:`PHALANX`,baseRecruitmentCost:[100,130,55,30],baseRecruitmentDuration:104e4,unitWheatConsumption:1,attack:15,infantryDefence:40,cavalryDefence:50,unitSpeed:7,unitCarryCapacity:35,category:`infantry`,tribe:`gauls`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SWORDSMAN`,baseRecruitmentCost:[140,150,185,60],baseRecruitmentDuration:144e4,unitWheatConsumption:1,attack:65,infantryDefence:35,cavalryDefence:20,unitSpeed:6,unitCarryCapacity:45,category:`infantry`,tribe:`gauls`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`GAUL_SCOUT`,baseRecruitmentCost:[170,150,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:17,unitCarryCapacity:0,category:`cavalry`,tribe:`gauls`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`THEUTATES_THUNDER`,baseRecruitmentCost:[350,450,230,60],baseRecruitmentDuration:248e4,unitWheatConsumption:2,attack:90,infantryDefence:25,cavalryDefence:40,unitSpeed:19,unitCarryCapacity:75,category:`cavalry`,tribe:`gauls`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:3}]},{id:`DRUIDRIDER`,baseRecruitmentCost:[360,330,280,120],baseRecruitmentDuration:256e4,unitWheatConsumption:2,attack:45,infantryDefence:115,cavalryDefence:55,unitSpeed:16,unitCarryCapacity:35,category:`cavalry`,tribe:`gauls`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`HAEDUAN`,baseRecruitmentCost:[500,620,675,170],baseRecruitmentDuration:312e4,unitWheatConsumption:3,attack:140,infantryDefence:60,cavalryDefence:165,unitSpeed:13,unitCarryCapacity:65,category:`cavalry`,tribe:`gauls`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`GAUL_RAM`,baseRecruitmentCost:[950,555,330,75],baseRecruitmentDuration:5e6,unitWheatConsumption:3,attack:50,infantryDefence:30,cavalryDefence:105,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`gauls`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`GAUL_CATAPULT`,baseRecruitmentCost:[960,1450,630,90],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:70,infantryDefence:45,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`gauls`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`GAUL_CHIEF`,baseRecruitmentCost:[30750,45400,31e3,37500],baseRecruitmentDuration:907e5,unitWheatConsumption:4,attack:40,infantryDefence:50,cavalryDefence:50,unitSpeed:5,unitCarryCapacity:0,category:`administration`,tribe:`gauls`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`GAUL_SETTLER`,baseRecruitmentCost:[4400,5600,4200,3900],baseRecruitmentDuration:227e5,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`gauls`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],ol=[{id:`CLUBSWINGER`,baseRecruitmentCost:[95,75,40,40],baseRecruitmentDuration:72e4,unitWheatConsumption:1,attack:40,infantryDefence:20,cavalryDefence:5,unitSpeed:7,unitCarryCapacity:60,category:`infantry`,tribe:`teutons`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SPEARMAN`,baseRecruitmentCost:[145,70,85,40],baseRecruitmentDuration:112e4,unitWheatConsumption:1,attack:10,infantryDefence:35,cavalryDefence:60,unitSpeed:7,unitCarryCapacity:40,category:`infantry`,tribe:`teutons`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1},{buildingId:`BARRACKS`,level:3}]},{id:`AXEMAN`,baseRecruitmentCost:[130,120,170,70],baseRecruitmentDuration:12e5,unitWheatConsumption:1,attack:60,infantryDefence:30,cavalryDefence:30,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`teutons`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`TEUTONIC_SCOUT`,baseRecruitmentCost:[160,100,50,50],baseRecruitmentDuration:112e4,unitWheatConsumption:1,attack:0,infantryDefence:10,cavalryDefence:5,unitSpeed:9,unitCarryCapacity:0,category:`infantry`,tribe:`teutons`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1},{buildingId:`MAIN_BUILDING`,level:5}]},{id:`PALADIN`,baseRecruitmentCost:[370,270,290,75],baseRecruitmentDuration:24e5,unitWheatConsumption:2,attack:55,infantryDefence:100,cavalryDefence:40,unitSpeed:10,unitCarryCapacity:110,category:`cavalry`,tribe:`teutons`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`TEUTONIC_KNIGHT`,baseRecruitmentCost:[450,515,480,80],baseRecruitmentDuration:296e4,unitWheatConsumption:3,attack:150,infantryDefence:50,cavalryDefence:75,unitSpeed:9,unitCarryCapacity:80,category:`cavalry`,tribe:`teutons`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`TEUTONIC_RAM`,baseRecruitmentCost:[1e3,300,350,70],baseRecruitmentDuration:42e5,unitWheatConsumption:3,attack:65,infantryDefence:30,cavalryDefence:80,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`teutons`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:1}]},{id:`TEUTONIC_CATAPULT`,baseRecruitmentCost:[900,1200,600,60],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:50,infantryDefence:60,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`teutons`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`TEUTONIC_CHIEF`,baseRecruitmentCost:[35500,26600,25e3,27200],baseRecruitmentDuration:705e5,unitWheatConsumption:4,attack:40,infantryDefence:60,cavalryDefence:40,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`teutons`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:5}]},{id:`TEUTONIC_SETTLER`,baseRecruitmentCost:[5800,4400,4600,5200],baseRecruitmentDuration:31e6,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`teutons`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],sl=[{id:`SLAVE_MILITIA`,baseRecruitmentCost:[45,60,30,15],baseRecruitmentDuration:53e4,unitWheatConsumption:1,attack:10,infantryDefence:30,cavalryDefence:20,unitSpeed:7,unitCarryCapacity:15,category:`infantry`,tribe:`egyptians`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`ASH_WARDEN`,baseRecruitmentCost:[115,100,145,60],baseRecruitmentDuration:132e4,unitWheatConsumption:1,attack:30,infantryDefence:55,cavalryDefence:40,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`egyptians`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1}]},{id:`KHOPESH_WARRIOR`,baseRecruitmentCost:[170,180,220,80],baseRecruitmentDuration:144e4,unitWheatConsumption:1,attack:65,infantryDefence:50,cavalryDefence:20,unitSpeed:7,unitCarryCapacity:45,category:`infantry`,tribe:`egyptians`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`EGYPTIAN_SCOUT`,baseRecruitmentCost:[170,150,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:16,unitCarryCapacity:0,category:`cavalry`,tribe:`egyptians`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`ANHUR_GUARD`,baseRecruitmentCost:[360,330,280,120],baseRecruitmentDuration:256e4,unitWheatConsumption:2,attack:50,infantryDefence:110,cavalryDefence:50,unitSpeed:15,unitCarryCapacity:50,category:`cavalry`,tribe:`egyptians`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`RESHEPH_CHARIOT`,baseRecruitmentCost:[450,560,610,180],baseRecruitmentDuration:324e4,unitWheatConsumption:3,attack:110,infantryDefence:120,cavalryDefence:150,unitSpeed:10,unitCarryCapacity:70,category:`cavalry`,tribe:`egyptians`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`EGYPTIAN_RAM`,baseRecruitmentCost:[995,575,340,80],baseRecruitmentDuration:48e5,unitWheatConsumption:3,attack:55,infantryDefence:30,cavalryDefence:95,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`egyptians`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`EGYPTIAN_CATAPULT`,baseRecruitmentCost:[980,1510,660,100],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:65,infantryDefence:55,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`egyptians`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`EGYPTIAN_CHIEF`,baseRecruitmentCost:[34e3,5e4,34e3,42e3],baseRecruitmentDuration:907e5,unitWheatConsumption:4,attack:40,infantryDefence:50,cavalryDefence:50,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`egyptians`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`EGYPTIAN_SETTLER`,baseRecruitmentCost:[5040,6510,4830,4620],baseRecruitmentDuration:248e5,unitWheatConsumption:1,attack:0,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`egyptians`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],cl=[{id:`MERCENARY`,baseRecruitmentCost:[130,80,40,40],baseRecruitmentDuration:81e4,unitWheatConsumption:1,attack:35,infantryDefence:40,cavalryDefence:30,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`huns`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`BOWMAN`,baseRecruitmentCost:[140,110,60,60],baseRecruitmentDuration:112e4,unitWheatConsumption:1,attack:50,infantryDefence:30,cavalryDefence:10,unitSpeed:6,unitCarryCapacity:30,category:`infantry`,tribe:`huns`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`HUN_SCOUT`,baseRecruitmentCost:[170,150,20,40],baseRecruitmentDuration:136e4,unitWheatConsumption:2,attack:0,infantryDefence:20,cavalryDefence:10,unitSpeed:19,unitCarryCapacity:0,category:`cavalry`,tribe:`huns`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`STEPPE_RIDER`,baseRecruitmentCost:[290,370,190,45],baseRecruitmentDuration:24e5,unitWheatConsumption:2,attack:120,infantryDefence:30,cavalryDefence:15,unitSpeed:16,unitCarryCapacity:75,category:`cavalry`,tribe:`huns`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:3}]},{id:`MARKSMAN`,baseRecruitmentCost:[320,350,330,50],baseRecruitmentDuration:248e4,unitWheatConsumption:2,attack:115,infantryDefence:80,cavalryDefence:70,unitSpeed:16,unitCarryCapacity:105,category:`cavalry`,tribe:`huns`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:5}]},{id:`MARAUDER`,baseRecruitmentCost:[450,560,610,140],baseRecruitmentDuration:299e4,unitWheatConsumption:3,attack:180,infantryDefence:60,cavalryDefence:40,unitSpeed:14,unitCarryCapacity:80,category:`cavalry`,tribe:`huns`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`HUN_RAM`,baseRecruitmentCost:[1060,330,360,70],baseRecruitmentDuration:44e5,unitWheatConsumption:3,attack:65,infantryDefence:30,cavalryDefence:90,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`huns`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`HUN_CATAPULT`,baseRecruitmentCost:[950,1280,620,60],baseRecruitmentDuration:9e6,unitWheatConsumption:6,attack:45,infantryDefence:55,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`huns`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`HUN_CHIEF`,baseRecruitmentCost:[37200,27600,25200,27600],baseRecruitmentDuration:907e5,unitWheatConsumption:4,attack:50,infantryDefence:40,cavalryDefence:30,unitSpeed:5,unitCarryCapacity:0,category:`administration`,tribe:`huns`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`HUN_SETTLER`,baseRecruitmentCost:[6100,4600,4800,5400],baseRecruitmentDuration:2895e4,unitWheatConsumption:1,attack:10,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`huns`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],ll=[{id:`HOPLITE`,baseRecruitmentCost:[110,185,110,40],baseRecruitmentDuration:17e5,unitWheatConsumption:1,attack:50,infantryDefence:35,cavalryDefence:30,unitSpeed:6,unitCarryCapacity:60,category:`infantry`,tribe:`spartans`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SPARTAN_SCOUT`,baseRecruitmentCost:[185,150,35,75],baseRecruitmentDuration:1232e3,unitWheatConsumption:1,attack:0,infantryDefence:40,cavalryDefence:22,unitSpeed:9,unitCarryCapacity:0,category:`infantry`,tribe:`spartans`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:1}]},{id:`SHIELDSMAN`,baseRecruitmentCost:[145,95,245,45],baseRecruitmentDuration:1936e3,unitWheatConsumption:1,attack:40,infantryDefence:85,cavalryDefence:45,unitSpeed:8,unitCarryCapacity:40,category:`infantry`,tribe:`spartans`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`TWINSTEEL_THERION`,baseRecruitmentCost:[130,200,400,65],baseRecruitmentDuration:2112e3,unitWheatConsumption:1,attack:90,infantryDefence:55,cavalryDefence:40,unitSpeed:6,unitCarryCapacity:50,category:`infantry`,tribe:`spartans`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10}]},{id:`ELPIDA_RIDER`,baseRecruitmentCost:[555,445,330,110],baseRecruitmentDuration:2816e3,unitWheatConsumption:2,attack:55,infantryDefence:120,cavalryDefence:90,unitSpeed:16,unitCarryCapacity:110,category:`cavalry`,tribe:`spartans`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`CORINTHIAN_CRUSHER`,baseRecruitmentCost:[660,495,995,165],baseRecruitmentDuration:3432e3,unitWheatConsumption:3,attack:195,infantryDefence:80,cavalryDefence:75,unitSpeed:9,unitCarryCapacity:80,category:`cavalry`,tribe:`spartans`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:10}]},{id:`SPARTAN_RAM`,baseRecruitmentCost:[525,260,790,130],baseRecruitmentDuration:462e4,unitWheatConsumption:3,attack:65,infantryDefence:30,cavalryDefence:80,unitSpeed:4,unitCarryCapacity:0,category:`siege`,tribe:`spartans`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`SPARTAN_CATAPULT`,baseRecruitmentCost:[550,1240,825,125],baseRecruitmentDuration:0,unitWheatConsumption:6,attack:50,infantryDefence:60,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`spartans`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`SPARTAN_CHIEF`,baseRecruitmentCost:[33450,30665,36240,13935],baseRecruitmentDuration:7755e4,unitWheatConsumption:1,attack:40,infantryDefence:60,cavalryDefence:40,unitSpeed:4,unitCarryCapacity:0,category:`administration`,tribe:`spartans`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`SPARTAN_SETTLER`,baseRecruitmentCost:[5115,5580,6045,3255],baseRecruitmentDuration:341e5,unitWheatConsumption:1,attack:10,infantryDefence:80,cavalryDefence:80,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`spartans`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],ul=[{id:`RAT`,baseRecruitmentCost:[85,75,120,25],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:10,infantryDefence:25,cavalryDefence:20,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`SPIDER`,baseRecruitmentCost:[125,130,60,40],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:20,infantryDefence:35,cavalryDefence:40,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`SERPENT`,baseRecruitmentCost:[140,150,40,60],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:60,infantryDefence:40,cavalryDefence:60,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`BAT`,baseRecruitmentCost:[95,120,65,25],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:80,infantryDefence:66,cavalryDefence:50,unitSpeed:20,unitCarryCapacity:0,category:`cavalry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`WILD_BOAR`,baseRecruitmentCost:[250,200,125,45],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:50,infantryDefence:70,cavalryDefence:33,unitSpeed:20,unitCarryCapacity:0,category:`cavalry`,tribe:`nature`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[]},{id:`WOLF`,baseRecruitmentCost:[250,125,250,150],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:100,infantryDefence:80,cavalryDefence:70,unitSpeed:20,unitCarryCapacity:0,category:`cavalry`,tribe:`nature`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[]},{id:`BEAR`,baseRecruitmentCost:[250,220,135,50],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:250,infantryDefence:140,cavalryDefence:200,unitSpeed:20,unitCarryCapacity:0,category:`siege`,tribe:`nature`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[]},{id:`CROCODILE`,baseRecruitmentCost:[240,125,250,300],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:450,infantryDefence:380,cavalryDefence:240,unitSpeed:20,unitCarryCapacity:0,category:`infantry`,tribe:`nature`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[]},{id:`TIGER`,baseRecruitmentCost:[350,350,125,80],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:200,infantryDefence:170,cavalryDefence:250,unitSpeed:20,unitCarryCapacity:0,category:`siege`,tribe:`nature`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[]},{id:`ELEPHANT`,baseRecruitmentCost:[350,250,135,100],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:600,infantryDefence:440,cavalryDefence:520,unitSpeed:20,unitCarryCapacity:3e3,category:`administration`,tribe:`nature`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[]}],dl=[{id:`PIKEMAN`,baseRecruitmentCost:[100,100,100,50],baseRecruitmentDuration:12e4,unitWheatConsumption:1,attack:20,infantryDefence:35,cavalryDefence:50,unitSpeed:6,unitCarryCapacity:10,category:`infantry`,tribe:`natars`,tier:`tier-1`,recruitmentRequirements:[],researchRequirements:[]},{id:`THORNED_WARRIOR`,baseRecruitmentCost:[100,100,100,50],baseRecruitmentDuration:12e4,unitWheatConsumption:1,attack:65,infantryDefence:30,cavalryDefence:10,unitSpeed:7,unitCarryCapacity:55,category:`infantry`,tribe:`natars`,tier:`tier-2`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:3}]},{id:`GUARDSMAN`,baseRecruitmentCost:[150,150,150,150],baseRecruitmentDuration:18e4,unitWheatConsumption:1,attack:100,infantryDefence:90,cavalryDefence:75,unitSpeed:6,unitCarryCapacity:40,category:`infantry`,tribe:`natars`,tier:`tier-3`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5}]},{id:`NATARIAN_SCOUT`,baseRecruitmentCost:[50,50,50,75],baseRecruitmentDuration:3e4,unitWheatConsumption:1,attack:0,infantryDefence:10,cavalryDefence:10,unitSpeed:25,unitCarryCapacity:0,category:`cavalry`,tribe:`natars`,tier:`scout`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`AXERIDER`,baseRecruitmentCost:[300,150,150,100],baseRecruitmentDuration:24e4,unitWheatConsumption:2,attack:155,infantryDefence:80,cavalryDefence:50,unitSpeed:14,unitCarryCapacity:90,category:`cavalry`,tribe:`natars`,tier:`tier-4`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:5},{buildingId:`STABLE`,level:1}]},{id:`NATARIAN_KNIGHT`,baseRecruitmentCost:[250,250,400,150],baseRecruitmentDuration:12e5,unitWheatConsumption:3,attack:170,infantryDefence:140,cavalryDefence:80,unitSpeed:12,unitCarryCapacity:0,category:`cavalry`,tribe:`natars`,tier:`tier-5`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`STABLE`,level:10}]},{id:`NATARIAN_RAM`,baseRecruitmentCost:[400,300,300,400],baseRecruitmentDuration:9e5,unitWheatConsumption:4,attack:250,infantryDefence:120,cavalryDefence:150,unitSpeed:5,unitCarryCapacity:0,category:`siege`,tribe:`natars`,tier:`siege-ram`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:10},{buildingId:`WORKSHOP`,level:1}]},{id:`NATARIAN_CATAPULT`,baseRecruitmentCost:[1e3,1e3,1e3,1e3],baseRecruitmentDuration:18e5,unitWheatConsumption:5,attack:60,infantryDefence:45,cavalryDefence:10,unitSpeed:3,unitCarryCapacity:0,category:`siege`,tribe:`natars`,tier:`siege-catapult`,recruitmentRequirements:[],researchRequirements:[{buildingId:`ACADEMY`,level:15},{buildingId:`WORKSHOP`,level:10}]},{id:`NATARIAN_CHIEF`,baseRecruitmentCost:[5e4,5e4,5e4,25e3],baseRecruitmentDuration:907e5,unitWheatConsumption:1,attack:80,infantryDefence:50,cavalryDefence:50,unitSpeed:5,unitCarryCapacity:0,category:`administration`,tribe:`natars`,tier:`administration`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[{buildingId:`ACADEMY`,level:20},{buildingId:`RALLY_POINT`,level:10}]},{id:`NATARIAN_SETTLER`,baseRecruitmentCost:[7500,7500,7500,3750],baseRecruitmentDuration:227e5,unitWheatConsumption:1,attack:30,infantryDefence:40,cavalryDefence:40,unitSpeed:5,unitCarryCapacity:3e3,category:`administration`,tribe:`natars`,tier:`settler`,recruitmentRequirements:[{buildingId:`RESIDENCE`,level:10}],researchRequirements:[]}],fl=[{id:`HERO`,baseRecruitmentCost:[0,0,0,0],baseRecruitmentDuration:0,unitWheatConsumption:0,attack:100,infantryDefence:100,cavalryDefence:100,unitSpeed:7,unitCarryCapacity:0,category:`hero`,tribe:`all`,tier:`hero`,recruitmentRequirements:[],researchRequirements:[]}],pl=[...il,...al,...ol,...sl,...cl,...ll,...ul,...dl,...fl];new Map(pl.map(e=>[e.id,e]));const ml=new Map([[1,[`RAT`,`SPIDER`,`SERPENT`]],[2,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`]],[3,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`]],[4,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`]],[5,[`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`,`CROCODILE`,`TIGER`,`ELEPHANT`]]]),hl=e=>ml.get(Math.min(5,Math.max(1,e))),gl=e=>{switch(e){case`egyptians`:return sl;case`romans`:return il;case`gauls`:return al;case`huns`:return cl;case`natars`:return dl;case`nature`:return ul;case`spartans`:return ll;case`teutons`:return ol}},_l=(e,t)=>gl(e).find(({tier:e})=>e===t),vl=e=>({id:`queuedTroopCount-${e}`,scope:`global`}),yl=()=>[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5,15e4,2e5,3e5,5e5,75e4,1e6].flatMap(e=>vl(e)),bl=e=>({id:`adventureCount-${e}`,scope:`global`}),xl=()=>[1,3,5,10,15,20,30,50,75,100,125,150,175,200,250,300,350,400,450,500].flatMap(e=>bl(e)),Sl=e=>({id:`killCount-${e}`,scope:`global`}),Cl=()=>[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5,15e4,2e5,3e5,5e5,75e4,1e6].flatMap(e=>Sl(e)),wl=(e,t)=>({id:`unitKillCount-${e}-${t}`,scope:`global`}),Tl=()=>{let e=[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5];return pl.filter(({id:e})=>e!==`HERO`&&!e.includes(`SETTLER`)&&!e.includes(`CHIEF`)).flatMap(({id:t})=>e.flatMap(e=>wl(t,e)))},El=(e,t)=>({id:`captureAnimalCountById-${e}-${t}`,scope:`global`}),Dl=()=>{let e=[1,3,5,10,20,50];return hl(5).flatMap(t=>e.flatMap(e=>El(t,e)))},Ol=e=>({id:`captureAnimalKindCount-${e}`,scope:`global`}),kl=()=>[Ol(hl(5).length)],Al=e=>({id:`gatheredResourceCount-${e}`,scope:`global`}),jl=()=>[20,100,500,1e3,5e3,1e4,5e4,1e5].flatMap(e=>Al(e)),Ml=(e,t)=>({id:`queuedTroopCountById-${e}-${t}`,scope:`global`}),Nl=e=>{let t=[10,50,100,200,500,1e3,2e3,5e3,1e4,2e4,5e4,1e5];return gl(e).filter(({id:e})=>![`SETTLER`,`CHIEF`].includes(e)).flatMap(({id:e})=>t.flatMap(t=>Ml(e,t)))},Q=(e,t,n=`oneOf`)=>({id:`${n}-${e}-${t}`,scope:`village`}),Pl=[...xl(),...yl(),...Tl(),...Cl(),...Dl(),...kl(),...jl()],Fl=e=>{let[t,n,r,i]=Rc(e);return[...t>0?[Q(`WOODCUTTER`,1),Q(`WOODCUTTER`,2),Q(`WOODCUTTER`,4),Q(`WOODCUTTER`,6),Q(`WOODCUTTER`,8),Q(`WOODCUTTER`,10),Q(`WOODCUTTER`,1,`every`),Q(`WOODCUTTER`,3,`every`),Q(`WOODCUTTER`,5,`every`),Q(`WOODCUTTER`,7,`every`),Q(`WOODCUTTER`,9,`every`),Q(`SAWMILL`,1),Q(`SAWMILL`,3),Q(`SAWMILL`,5)]:[],...n>0?[Q(`CLAY_PIT`,1),Q(`CLAY_PIT`,2),Q(`CLAY_PIT`,4),Q(`CLAY_PIT`,6),Q(`CLAY_PIT`,8),Q(`CLAY_PIT`,10),Q(`CLAY_PIT`,1,`every`),Q(`CLAY_PIT`,3,`every`),Q(`CLAY_PIT`,5,`every`),Q(`CLAY_PIT`,7,`every`),Q(`CLAY_PIT`,9,`every`),Q(`BRICKYARD`,1),Q(`BRICKYARD`,3),Q(`BRICKYARD`,5)]:[],...r>0?[Q(`IRON_MINE`,1),Q(`IRON_MINE`,2),Q(`IRON_MINE`,4),Q(`IRON_MINE`,6),Q(`IRON_MINE`,8),Q(`IRON_MINE`,10),Q(`IRON_MINE`,1,`every`),Q(`IRON_MINE`,3,`every`),Q(`IRON_MINE`,5,`every`),Q(`IRON_MINE`,7,`every`),Q(`IRON_MINE`,9,`every`),Q(`IRON_FOUNDRY`,1),Q(`IRON_FOUNDRY`,3),Q(`IRON_FOUNDRY`,5)]:[],...i>0?[Q(`WHEAT_FIELD`,1),Q(`WHEAT_FIELD`,2),Q(`WHEAT_FIELD`,4),Q(`WHEAT_FIELD`,6),Q(`WHEAT_FIELD`,8),Q(`WHEAT_FIELD`,10),Q(`WHEAT_FIELD`,1,`every`),Q(`WHEAT_FIELD`,3,`every`),Q(`WHEAT_FIELD`,5,`every`),Q(`WHEAT_FIELD`,7,`every`),Q(`WHEAT_FIELD`,9,`every`),Q(`GRAIN_MILL`,1),Q(`GRAIN_MILL`,3),Q(`GRAIN_MILL`,5),Q(`BAKERY`,1),Q(`BAKERY`,3),Q(`BAKERY`,5)]:[],Q(`MAIN_BUILDING`,1),Q(`MAIN_BUILDING`,5),Q(`MAIN_BUILDING`,10),Q(`MAIN_BUILDING`,15),Q(`MAIN_BUILDING`,20),Q(`WAREHOUSE`,1),Q(`WAREHOUSE`,5),Q(`WAREHOUSE`,10),Q(`WAREHOUSE`,15),Q(`WAREHOUSE`,20),Q(`GRANARY`,1),Q(`GRANARY`,5),Q(`GRANARY`,10),Q(`GRANARY`,15),Q(`GRANARY`,20),Q(`MARKETPLACE`,1),Q(`MARKETPLACE`,5),Q(`MARKETPLACE`,10),Q(`MARKETPLACE`,15),Q(`MARKETPLACE`,20),Q(`BARRACKS`,1),Q(`BARRACKS`,5),Q(`BARRACKS`,10),Q(`BARRACKS`,15),Q(`BARRACKS`,20),Q(`STABLE`,1),Q(`STABLE`,5),Q(`STABLE`,10),Q(`STABLE`,15),Q(`STABLE`,20),Q(`RALLY_POINT`,5),Q(`RALLY_POINT`,10),Q(`RALLY_POINT`,15),Q(`RALLY_POINT`,20),Q(`ACADEMY`,1),Q(`ACADEMY`,5),Q(`ACADEMY`,10),Q(`ACADEMY`,15),Q(`ACADEMY`,20),Q(`SMITHY`,1),Q(`SMITHY`,5),Q(`SMITHY`,10),Q(`SMITHY`,15),Q(`SMITHY`,20),Q(`HEROS_MANSION`,10),Q(`HEROS_MANSION`,15),Q(`HEROS_MANSION`,20),Q(`CRANNY`,1),Q(`CRANNY`,3),Q(`CRANNY`,7),Q(`CRANNY`,10)]},Il=(e,t,n)=>{let r=new Map([[`romans`,`ROMAN_WALL`],[`gauls`,`GAUL_WALL`],[`teutons`,`TEUTONIC_WALL`],[`huns`,`HUN_WALL`],[`egyptians`,`EGYPTIAN_WALL`]]).get(t);return[...Fl(n),Q(r,1),Q(r,5),Q(r,10),Q(r,15),Q(r,20)].map(t=>({...t,villageId:e}))},Ll=e=>{let t=e.selectValue({sql:`
      SELECT id
      FROM
        villages
      WHERE
        player_id = $player_id;
    `,bind:{$player_id:1},schema:R()}),{playerTribe:n,playerResourceFieldComposition:r}=e.selectObject({sql:`
      SELECT
        ti.tribe AS playerTribe,
        rfc.resource_field_composition AS playerResourceFieldComposition
      FROM
        players p
        JOIN tribe_ids ti ON ti.id = p.tribe_id
        JOIN villages v ON v.player_id = p.id
        JOIN tiles t ON t.id = v.tile_id
        JOIN resource_field_composition_ids rfc ON rfc.id = t.resource_field_composition_id
      WHERE
        p.id = $player_id;
    `,bind:{$player_id:1},schema:V({playerTribe:Ls,playerResourceFieldComposition:uc})}),i=[],a=Il(t,n,r),o=Nl(n);for(let{id:e}of a)i.push([e,null,null,t]);let s=[...Pl,...o];for(let{id:e}of s)i.push([e,null,null,null]);K(e,`quests`,[`quest_id`,`completed_at`,`collected_at`,`village_id`],i),e.exec({sql:`
        UPDATE quests
        SET
          completed_at = $completed_at
        WHERE
          quest_id = $quest_id
          AND village_id = $village_id;
      `,bind:{$quest_id:`oneOf-MAIN_BUILDING-1`,$village_id:t,$completed_at:Date.now()}})},$=V({x:R(),y:R()}).meta({id:`Coordinates`}),Rl=H([`LEGIONNAIRE`,`PRAETORIAN`,`IMPERIAN`,`EQUITES_IMPERATORIS`,`EQUITES_CAESARIS`,`ROMAN_SCOUT`,`ROMAN_RAM`,`ROMAN_CATAPULT`,`ROMAN_CHIEF`,`ROMAN_SETTLER`]),zl=H([`PHALANX`,`SWORDSMAN`,`THEUTATES_THUNDER`,`DRUIDRIDER`,`HAEDUAN`,`GAUL_SCOUT`,`GAUL_RAM`,`GAUL_CATAPULT`,`GAUL_CHIEF`,`GAUL_SETTLER`]),Bl=H([`CLUBSWINGER`,`SPEARMAN`,`AXEMAN`,`PALADIN`,`TEUTONIC_KNIGHT`,`TEUTONIC_SCOUT`,`TEUTONIC_RAM`,`TEUTONIC_CATAPULT`,`TEUTONIC_CHIEF`,`TEUTONIC_SETTLER`]),Vl=H([`MERCENARY`,`BOWMAN`,`STEPPE_RIDER`,`MARKSMAN`,`MARAUDER`,`HUN_SCOUT`,`HUN_RAM`,`HUN_CATAPULT`,`HUN_CHIEF`,`HUN_SETTLER`]),Hl=H([`SLAVE_MILITIA`,`ASH_WARDEN`,`KHOPESH_WARRIOR`,`ANHUR_GUARD`,`RESHEPH_CHARIOT`,`EGYPTIAN_SCOUT`,`EGYPTIAN_RAM`,`EGYPTIAN_CATAPULT`,`EGYPTIAN_CHIEF`,`EGYPTIAN_SETTLER`]),Ul=H([`HOPLITE`,`SHIELDSMAN`,`TWINSTEEL_THERION`,`ELPIDA_RIDER`,`CORINTHIAN_CRUSHER`,`SPARTAN_SCOUT`,`SPARTAN_RAM`,`SPARTAN_CATAPULT`,`SPARTAN_CHIEF`,`SPARTAN_SETTLER`]),Wl=H([`PIKEMAN`,`THORNED_WARRIOR`,`GUARDSMAN`,`AXERIDER`,`NATARIAN_KNIGHT`,`NATARIAN_SCOUT`,`NATARIAN_RAM`,`NATARIAN_CATAPULT`,`NATARIAN_CHIEF`,`NATARIAN_SETTLER`]),Gl=H([`RAT`,`SPIDER`,`SERPENT`,`BAT`,`WILD_BOAR`,`WOLF`,`BEAR`,`CROCODILE`,`TIGER`,`ELEPHANT`]),Kl=U(`HERO`),ql=Lo([Kl,Rl,zl,Bl,Vl,Hl,Ul,Wl,Gl]).meta({id:`UnitId`});H([`infantry`,`cavalry`,`siege`,`administration`,`hero`]).meta({id:`UnitId`}),H([`tier-1`,`tier-2`,`tier-3`,`scout`,`tier-4`,`tier-5`,`siege-ram`,`siege-catapult`,`administration`,`settler`,`hero`]).meta({id:`UnitId`});const Jl=V({points:z(),supplyBefore:z(),supplyLost:z(),resourcesLost:z()}),Yl=V({unitId:ql,amountBefore:z(),amountAfter:z(),amountHospitalized:z(),amountImprisoned:z()}),Xl=V({id:z(),tribe:G,units:B(Yl)}),Zl=V({player:V({id:z().nullable(),name:I(),slug:I().optional()}),village:V({id:z().nullable(),tileId:z(),name:I(),coordinates:$}),troops:Xl}),Ql=Zl.extend({reinforcements:B(Zl)}),$l=V({loot:Fc,totalCarryCapacity:z(),canAttackerSeeFullReport:ko()}),eu=V({buildingId:lc,levelBefore:z().nonnegative(),levelAfter:z().nonnegative()});V({isRaid:ko(),originName:I(),targetName:I(),targetCoordinates:$});const tu=V({id:z(),attacker:Zl,defender:Ql,outcome:$l,damagedBuildings:B(eu),statistics:V({attacker:Jl,defender:Jl})}),nu=H([`battle`,`adventure`,`trade`,`movement`,`huntingParty`,`gatheringExpedition`,`scouting`]),ru=H([...H([`attackerNoLoss`,`attackerSomeLoss`,`attackerFullLoss`,`defenderNoLoss`,`defenderSomeLoss`,`defenderFullLoss`]).options,`scoutAttackerNoLoss`,`scoutAttackerSomeLoss`,`scoutAttackerFullLoss`,`scoutDefenderNoLoss`,`scoutDefenderSomeLoss`,`scoutDefenderFullLoss`,`outgoingMerchantsArrived`,`incomingMerchantsArrived`,`heroAdventure`,`troopMovement`,`huntingParty`,`gatheringExpedition`]),iu=H([`read`,`archived`]),au=H([`attacker`,`defender`]),ou=V({id:z(),villageId:z(),timestamp:z(),type:nu,outcome:ru,tags:B(iu)}),su=V({originName:I(),originCoordinates:$,targetName:I(),targetCoordinates:$,movementType:H([`raid`,`attack`])}),cu=ou.extend({type:U(`battle`),summary:su,battle:tu}),lu=ou.extend({type:U(`adventure`),summary:V({originPlayerName:I(),originPlayerSlug:I(),originVillageName:I(),originCoordinates:$,tribe:G}),adventureId:z(),itemId:z().nullable(),itemAmount:z().positive().nullable(),healthBefore:R(),healthAfter:R()}),uu=ou.extend({type:U(`trade`),summary:V({originPlayerName:I(),originPlayerSlug:I(),originName:I(),originCoordinates:$,targetPlayerName:I(),targetPlayerSlug:I(),targetName:I(),targetCoordinates:$}),trade:V({id:z(),originTileId:z(),targetTileId:z(),resources:Fc})}),du=V({originPlayerName:I(),originPlayerSlug:I(),originName:I(),originCoordinates:$,targetPlayerName:I().nullable(),targetPlayerSlug:I().nullable(),targetName:I(),targetCoordinates:$,movementType:H([`reinforcement`,`relocation`])}),fu=V({unitId:ql,amount:z()}),pu=ou.extend({type:U(`movement`),summary:du,movement:V({id:z(),tribe:G,originTileId:z(),targetTileId:z(),movementType:H([`reinforcement`,`relocation`]),units:B(fu)})}),mu=V({villageName:I(),villageCoordinates:$}),hu=V({unitId:ql,amount:z().positive()}),gu=ou.extend({type:U(`huntingParty`),summary:mu,tribe:U(`nature`),units:B(hu)}),_u=ou.extend({type:U(`gatheringExpedition`),summary:mu,tribe:G,units:B(hu),loot:Fc}),vu=V({originPlayerName:I(),originPlayerSlug:I(),originName:I(),originCoordinates:$,targetPlayerName:I(),targetPlayerSlug:I(),targetName:I(),targetCoordinates:$}),yu=V({tribe:G,units:B(V({unitId:ql,amount:z()}))}),bu=V({tribe:G,units:B(V({unitId:ql,amountBefore:z(),amountAfter:z()}))}),xu=yu.extend({player:V({name:I(),slug:I()}),village:V({name:I(),coordinates:$})});zo(`type`,[cu,lu,uu,pu,gu,_u,ou.extend({type:U(`scouting`),summary:vu,scouting:V({id:z(),perspective:au,successful:ko(),target:H([`resources`,`defensiveStructures`]),attacker:bu,defender:yu.extend({reinforcements:B(xu)}),resources:Fc.nullable(),defensiveStructures:B(V({buildingId:lc,level:z().nonnegative()}))})})]).meta({id:`Report`});const Su=e=>{let t=ru.options;K(e,`report_outcome_ids`,[`report_outcome`],t.map(e=>[e]))},Cu=e=>{let t=iu.options;K(e,`report_tag_ids`,[`tag`],t.map(e=>[e]))},wu=e=>{K(e,`report_type_ids`,[`report_type`],nu.options.map(e=>[e]))},Tu=e=>{let t=uc.options;K(e,`resource_field_composition_ids`,[`resource_field_composition`],t.map(e=>[e]))},Eu=e=>{K(e,`resource_ids`,[`resource`],Ic.options.map(e=>[e]))},Du=V({id:R(),x:R(),y:R()}),Ou=V({id:R(),bonus:R(),count_per_tile:R()}),ku=new Map([[`xxs`,6300],[`xs`,6300],[`sm`,31300],[`md`,8e4],[`lg`,16e4],[`xl`,16e4],[`2xl`,16e4],[`3xl`,16e4],[`4xl`,16e4]]),Au=(e,t)=>{let n=[],r=Date.now(),i=e.selectObjects({sql:`
      SELECT tiles.id, x, y
      FROM
        tiles
          INNER JOIN villages ON tiles.id = villages.tile_id;
    `,schema:Du}),a=e.selectObjects({sql:`
      SELECT
        tiles.id,
        COUNT(oasis.tile_id) AS count_per_tile,
        MAX(oasis.bonus) AS bonus
      FROM
        tiles
          INNER JOIN oasis ON tiles.id = oasis.tile_id
      GROUP BY
        tiles.id;
    `,schema:Ou});for(let{id:e,x:a,y:o}of i){if(a===0&&o===0){n.push([e,750,750,750,750,r]);continue}let i=mc(t.configuration.mapSize,a,o),s=ku.get(i),[c,l,u,d]=[s,s,s,s];n.push([e,c,l,u,d,r])}for(let{id:e,bonus:t,count_per_tile:i}of a){let a=t===50||i===2?2e3:1e3,[o,s,c,l]=[a,a,a,a];n.push([e,o,s,c,l,r])}K(e,`resource_sites`,[`tile_id`,`wood`,`clay`,`iron`,`wheat`,`updated_at`],n)},ju=(e,t)=>{let{id:n,seed:r,createdAt:i,slug:a,name:o,version:s,configuration:c,playerConfiguration:l}=t,{speed:u,mapSize:d}=c,{name:f,tribe:p}=l;e.exec({sql:`
      INSERT INTO
        servers
      (id, version, name, slug, created_at, seed, speed, map_size, player_name, player_tribe)
      VALUES
        ($id, $version, $name, $slug, $created_at, $seed, $speed, $map_size, $player_name, $player_tribe);
    `,bind:{$id:n,$version:s,$name:o,$slug:a,$created_at:i,$seed:r,$speed:u,$map_size:d,$player_name:f,$player_tribe:p}})},Mu=e=>{e.exec({sql:`
      INSERT INTO tile_type_ids (id, type)
      VALUES
        (1, 'free'),
        (2, 'oasis');
    `})},Nu=V({id:R(),name:I(),slug:I(),tribe:G,faction:Dc}).meta({id:`Player`}),Pu=V({id:R(),name:I(),slug:I().nullable(),population:R()}).meta({id:`TileVillage`}),Fu=H([`free`,`oasis`]).meta({id:`TileType`}),Iu=V({id:R(),coordinates:$,type:Fu,owner:Nu.nullable(),ownerVillage:Pu.nullable()}).meta({id:`BaseTile`}),Lu=Iu.extend({type:U(`free`),attributes:V({resourceFieldComposition:uc}),item:V({id:R()}).nullable()}).meta({id:`BaseOccupiableTile`}),Ru=Lu.extend({owner:Nu,ownerVillage:Pu}).meta({id:`OccupiedOccupiableTile`}),zu=Lu.extend({owner:U(null),ownerVillage:U(null)}).meta({id:`UnoccupiedOccupiableTile`}),Bu=Iu.extend({type:U(`oasis`),attributes:V({oasisGraphics:R(),isOccupiable:ko()})}).meta({id:`BaseOasisTile`}),Vu=Bu.extend({owner:Nu,ownerVillage:Pu}).meta({id:`OccupiedOasisTile`}),Hu=Bu.extend({owner:U(null),ownerVillage:U(null)}).meta({id:`UnoccupiedOasisTile`});zo(`type`,[Lu,Bu]).meta({id:`Tile`}),Lo([Ru,zu]).meta({id:`OccupiableTile`}),Lo([Vu,Hu]).meta({id:`OasisTile`});const Uu=e=>{let{configuration:t}=e,{halfSize:n,totalTiles:r,mapBorderThreshold:i}=Uc(t.mapSize),a=-n-1,o=n,s=0,c=Array.from({length:r});for(let e=0;e<r;e+=1){s+=1,a+=1;let t=a,r=o;if(a===n&&(a=-n-1,--o),!(t**2+r**2>=i)){if(t===0&&r===0){c[e]={id:s,x:t,y:r,type:`free`,resource_field_composition:`4446`,oasis_graphics:null};continue}c[e]={id:s,x:t,y:r,resource_field_composition:null,oasis_graphics:null}}}return c.filter(Boolean)},Wu=({tile:e,oasisGroup:t,oasisGroupPosition:n,prng:r,preGeneratedResourceType:i})=>{let a=i||Z(r,[`wheat`,`iron`,`clay`,`wood`,`wood`,`clay`,`iron`]),[o,s]=n,c=Vc(a,t,o,s,0);return{...e,type:`oasis`,oasis_graphics:c}},Gu=(e,t)=>{let n=Y(e.seed),r=[{group:1,shape:[2]},{group:2,shape:[2,2]},{group:3,shape:[1,1,1]},{group:4,shape:[3]}],i={wood:r,clay:r,iron:r,wheat:r},a=new Map(t.map(e=>[`${e.x}-${e.y}`,e]));tileLoop:for(let e of t){if(Object.hasOwn(e,`type`)||X(n,1,20)!==1)continue;let{x:t,y:r}=e,o=Z(n,[`wheat`,`iron`,`clay`,`wood`]),{group:s,shape:c}=Z(n,i[o]),l=[],u=[];for(let e=0;e<c.length;e+=1){let n=c[e];for(let i=0;i<n;i+=1){let n=`${t+i}-${r-e}`,o=a.get(n);if(!o||Object.hasOwn(o,`type`))continue tileLoop;u.push([e,i]),l.push(o)}}for(let[e,t]of l.entries()){let r=Wu({tile:t,oasisGroup:s,oasisGroupPosition:u[e],preGeneratedResourceType:o,prng:n});Object.assign(t,r)}}return t},Ku=[[1,`00018`],[2,`11115`],[4,`3339`],[7,`4437`],[10,`4347`],[13,`3447`],[21,`3456`],[29,`4356`],[37,`3546`],[45,`4536`],[53,`5346`],[61,`5436`]],qu=e=>{let t=X(e,1,90);for(let[e,n]of Ku)if(t<=e)return n;return`4446`},Ju=(e,t)=>{let n=Y(e.seed);return t.map(e=>{if(Object.hasOwn(e,`type`))return e;if(X(n,1,20)===1)return Wu({tile:e,oasisGroup:0,oasisGroupPosition:[0,0],prng:n});let t=qu(n);return{...e,type:`free`,resource_field_composition:t}})},Yu=[[`00018`,4],[`11115`,12],[`3339`,20]],Xu=(e,t)=>{let n=[],r=[],i=new Map,a=new Map,o=new Map,s=new Map,c=[],l=new Map;for(let[e]of Yu)l.set(e,new Set);for(let e of t){if(e.type===`free`){n.push(e),i.set(`${e.x}-${e.y}`,e),o.set(e.id,e);continue}a.set(e.id,e),r.push({id:e.id,oasis_graphics:e.oasis_graphics})}for(let{tileId:t,resource:n,bonus:o}of Gc(e,r)){if(n!==`wheat`||o!==50)continue;let e=a.get(t);for(let t=e.x-3;t<=e.x+3;t+=1)for(let n=e.y-3;n<=e.y+3;n+=1){let e=i.get(`${t}-${n}`);e&&s.set(e.id,(s.get(e.id)??0)+1)}}for(let{id:e,resource_field_composition:t}of n){if((s.get(e)??0)<3)continue;let n=l.get(t);if(n){n.add(e);continue}c.push(e)}let u=Y(e.seed);for(let[e,t]of Yu){let n=l.get(e);for(;n.size<t&&c.length>0;){let t=Math.floor(u()*c.length),[r]=c.splice(t,1);n.add(r),o.get(r).resource_field_composition=e}}return t},Zu=(e,t)=>{let n=Uu(t),r=Gu(t,n),i=Ju(t,r),a=Xu(t,i),o=e.selectObjects({sql:`SELECT resource_field_composition, id FROM resource_field_composition_ids;`,schema:V({resource_field_composition:uc,id:R()})}),s=Object.fromEntries(o.map(e=>[e.resource_field_composition,e.id])),c=e.selectObjects({sql:`SELECT type, id FROM tile_type_ids;`,schema:V({type:Fu,id:R()})}),l=Object.fromEntries(c.map(e=>[e.type,e.id])),u=a.map(e=>{let{id:t,x:n,y:r,type:i,resource_field_composition:a,oasis_graphics:o}=e,c=i===`free`?s[a]:null;return[t,n,r,l[i],c,o]});K(e,`tiles`,[`id`,`x`,`y`,`type_id`,`resource_field_composition_id`,`oasis_graphics`],u)},Qu=e=>{let t=[...Ls.options,...Rs.options,...zs.options];K(e,`tribe_ids`,[`tribe`],t.map(e=>[e]))},$u=new Map([[`wood`,[[`WILD_BOAR`,2,11],[`WOLF`,2,7],[`BEAR`,2,5]]],[`clay`,[[`RAT`,3,12],[`SPIDER`,2,10],[`WILD_BOAR`,2,7]]],[`iron`,[[`RAT`,2,16],[`SPIDER`,2,12],[`BAT`,2,10]]],[`wheat`,[[`RAT`,2,20],[`SERPENT`,2,18],[`TIGER`,2,11],[`CROCODILE`,2,9]]]]),ed=new Map([[`gauls`,new Map([[`xxs`,[[`PHALANX`,8,26],[`SWORDSMAN`,3,18]]],[`xs`,[[`PHALANX`,20,65],[`SWORDSMAN`,10,50]]],[`sm`,[[`PHALANX`,95,180],[`SWORDSMAN`,55,140],[`GAUL_SCOUT`,8,20]]],[`md`,[[`PHALANX`,190,360],[`SWORDSMAN`,150,300],[`GAUL_SCOUT`,25,70],[`THEUTATES_THUNDER`,25,80],[`DRUIDRIDER`,20,55],[`HAEDUAN`,10,35]]],[`lg`,[[`PHALANX`,280,520],[`SWORDSMAN`,180,360],[`GAUL_SCOUT`,40,120],[`THEUTATES_THUNDER`,70,180],[`DRUIDRIDER`,50,120],[`HAEDUAN`,20,80],[`GAUL_RAM`,12,50],[`GAUL_CATAPULT`,8,28]]],[`xl`,[[`PHALANX`,360,650],[`SWORDSMAN`,220,420],[`GAUL_SCOUT`,55,150],[`THEUTATES_THUNDER`,100,240],[`DRUIDRIDER`,70,150],[`HAEDUAN`,35,110],[`GAUL_RAM`,20,75],[`GAUL_CATAPULT`,14,45]]],[`2xl`,[[`PHALANX`,460,800],[`SWORDSMAN`,260,500],[`GAUL_SCOUT`,75,180],[`THEUTATES_THUNDER`,130,300],[`DRUIDRIDER`,90,190],[`HAEDUAN`,50,140],[`GAUL_RAM`,30,110],[`GAUL_CATAPULT`,20,60]]],[`3xl`,[[`PHALANX`,560,950],[`SWORDSMAN`,320,580],[`GAUL_SCOUT`,90,220],[`THEUTATES_THUNDER`,160,360],[`DRUIDRIDER`,120,240],[`HAEDUAN`,70,170],[`GAUL_RAM`,40,130],[`GAUL_CATAPULT`,25,75]]],[`4xl`,[[`PHALANX`,680,1150],[`SWORDSMAN`,380,700],[`GAUL_SCOUT`,110,260],[`THEUTATES_THUNDER`,190,430],[`DRUIDRIDER`,150,290],[`HAEDUAN`,90,210],[`GAUL_RAM`,55,160],[`GAUL_CATAPULT`,35,95]]]])],[`romans`,new Map([[`xxs`,[[`LEGIONNAIRE`,8,24],[`PRAETORIAN`,4,16]]],[`xs`,[[`LEGIONNAIRE`,16,55],[`PRAETORIAN`,8,40]]],[`sm`,[[`LEGIONNAIRE`,80,160],[`PRAETORIAN`,55,130],[`ROMAN_SCOUT`,8,18]]],[`md`,[[`LEGIONNAIRE`,170,320],[`PRAETORIAN`,120,250],[`ROMAN_SCOUT`,20,60],[`IMPERIAN`,35,110],[`EQUITES_IMPERATORIS`,20,60],[`EQUITES_CAESARIS`,8,30]]],[`lg`,[[`LEGIONNAIRE`,260,470],[`PRAETORIAN`,180,340],[`ROMAN_SCOUT`,35,100],[`IMPERIAN`,80,190],[`EQUITES_IMPERATORIS`,55,120],[`EQUITES_CAESARIS`,20,70],[`ROMAN_RAM`,10,40],[`ROMAN_CATAPULT`,8,26]]],[`xl`,[[`LEGIONNAIRE`,330,580],[`PRAETORIAN`,230,420],[`ROMAN_SCOUT`,50,130],[`IMPERIAN`,110,240],[`EQUITES_IMPERATORIS`,75,155],[`EQUITES_CAESARIS`,32,95],[`ROMAN_RAM`,16,60],[`ROMAN_CATAPULT`,12,36]]],[`2xl`,[[`LEGIONNAIRE`,420,700],[`PRAETORIAN`,290,500],[`ROMAN_SCOUT`,65,160],[`IMPERIAN`,145,300],[`EQUITES_IMPERATORIS`,95,190],[`EQUITES_CAESARIS`,45,125],[`ROMAN_RAM`,24,85],[`ROMAN_CATAPULT`,16,50]]],[`3xl`,[[`LEGIONNAIRE`,500,840],[`PRAETORIAN`,350,590],[`ROMAN_SCOUT`,80,190],[`IMPERIAN`,180,360],[`EQUITES_IMPERATORIS`,120,230],[`EQUITES_CAESARIS`,58,150],[`ROMAN_RAM`,32,110],[`ROMAN_CATAPULT`,20,62]]],[`4xl`,[[`LEGIONNAIRE`,620,1020],[`PRAETORIAN`,420,700],[`ROMAN_SCOUT`,95,220],[`IMPERIAN`,220,430],[`EQUITES_IMPERATORIS`,150,280],[`EQUITES_CAESARIS`,75,180],[`ROMAN_RAM`,45,140],[`ROMAN_CATAPULT`,28,78]]]])],[`teutons`,new Map([[`xxs`,[[`CLUBSWINGER`,12,40],[`SPEARMAN`,4,18]]],[`xs`,[[`CLUBSWINGER`,30,95],[`SPEARMAN`,10,45]]],[`sm`,[[`CLUBSWINGER`,110,220],[`SPEARMAN`,55,140],[`TEUTONIC_SCOUT`,10,25]]],[`md`,[[`CLUBSWINGER`,220,420],[`SPEARMAN`,130,280],[`TEUTONIC_SCOUT`,20,55],[`AXEMAN`,45,130],[`PALADIN`,20,65],[`TEUTONIC_KNIGHT`,10,35]]],[`lg`,[[`CLUBSWINGER`,330,620],[`SPEARMAN`,180,360],[`TEUTONIC_SCOUT`,35,100],[`AXEMAN`,90,220],[`PALADIN`,60,140],[`TEUTONIC_KNIGHT`,25,80],[`TEUTONIC_RAM`,14,45],[`TEUTONIC_CATAPULT`,8,24]]],[`xl`,[[`CLUBSWINGER`,420,760],[`SPEARMAN`,240,430],[`TEUTONIC_SCOUT`,50,130],[`AXEMAN`,120,270],[`PALADIN`,80,170],[`TEUTONIC_KNIGHT`,35,105],[`TEUTONIC_RAM`,20,68],[`TEUTONIC_CATAPULT`,12,34]]],[`2xl`,[[`CLUBSWINGER`,520,900],[`SPEARMAN`,290,500],[`TEUTONIC_SCOUT`,65,160],[`AXEMAN`,155,330],[`PALADIN`,95,200],[`TEUTONIC_KNIGHT`,45,130],[`TEUTONIC_RAM`,28,95],[`TEUTONIC_CATAPULT`,16,46]]],[`3xl`,[[`CLUBSWINGER`,620,1060],[`SPEARMAN`,350,590],[`TEUTONIC_SCOUT`,80,190],[`AXEMAN`,190,390],[`PALADIN`,115,230],[`TEUTONIC_KNIGHT`,58,150],[`TEUTONIC_RAM`,36,120],[`TEUTONIC_CATAPULT`,22,60]]],[`4xl`,[[`CLUBSWINGER`,740,1260],[`SPEARMAN`,410,680],[`TEUTONIC_SCOUT`,95,220],[`AXEMAN`,230,460],[`PALADIN`,140,270],[`TEUTONIC_KNIGHT`,72,175],[`TEUTONIC_RAM`,50,150],[`TEUTONIC_CATAPULT`,30,75]]]])],[`huns`,new Map([[`xxs`,[[`MERCENARY`,8,26],[`BOWMAN`,4,18]]],[`xs`,[[`MERCENARY`,20,65],[`BOWMAN`,10,45]]],[`sm`,[[`MERCENARY`,85,175],[`BOWMAN`,55,140],[`HUN_SCOUT`,10,25]]],[`md`,[[`MERCENARY`,170,320],[`BOWMAN`,120,250],[`HUN_SCOUT`,22,60],[`STEPPE_RIDER`,30,95],[`MARKSMAN`,25,80],[`MARAUDER`,10,35]]],[`lg`,[[`MERCENARY`,250,470],[`BOWMAN`,180,360],[`HUN_SCOUT`,40,110],[`STEPPE_RIDER`,80,200],[`MARKSMAN`,60,160],[`MARAUDER`,22,80],[`HUN_RAM`,12,42],[`HUN_CATAPULT`,8,24]]],[`xl`,[[`MERCENARY`,320,580],[`BOWMAN`,230,430],[`HUN_SCOUT`,55,140],[`STEPPE_RIDER`,110,250],[`MARKSMAN`,80,195],[`MARAUDER`,35,105],[`HUN_RAM`,18,62],[`HUN_CATAPULT`,12,34]]],[`2xl`,[[`MERCENARY`,410,700],[`BOWMAN`,290,500],[`HUN_SCOUT`,70,170],[`STEPPE_RIDER`,145,310],[`MARKSMAN`,105,240],[`MARAUDER`,50,135],[`HUN_RAM`,26,90],[`HUN_CATAPULT`,16,48]]],[`3xl`,[[`MERCENARY`,500,840],[`BOWMAN`,350,590],[`HUN_SCOUT`,85,200],[`STEPPE_RIDER`,180,370],[`MARKSMAN`,125,290],[`MARAUDER`,68,165],[`HUN_RAM`,34,118],[`HUN_CATAPULT`,22,62]]],[`4xl`,[[`MERCENARY`,620,1020],[`BOWMAN`,420,700],[`HUN_SCOUT`,105,230],[`STEPPE_RIDER`,220,440],[`MARKSMAN`,160,340],[`MARAUDER`,82,195],[`HUN_RAM`,46,145],[`HUN_CATAPULT`,30,78]]]])],[`egyptians`,new Map([[`xxs`,[[`SLAVE_MILITIA`,10,32],[`ASH_WARDEN`,4,16]]],[`xs`,[[`SLAVE_MILITIA`,25,80],[`ASH_WARDEN`,10,45]]],[`sm`,[[`SLAVE_MILITIA`,100,210],[`ASH_WARDEN`,50,140],[`EGYPTIAN_SCOUT`,8,20]]],[`md`,[[`SLAVE_MILITIA`,190,360],[`ASH_WARDEN`,130,280],[`EGYPTIAN_SCOUT`,24,65],[`KHOPESH_WARRIOR`,35,110],[`ANHUR_GUARD`,20,60],[`RESHEPH_CHARIOT`,8,30]]],[`lg`,[[`SLAVE_MILITIA`,280,520],[`ASH_WARDEN`,180,360],[`EGYPTIAN_SCOUT`,40,110],[`KHOPESH_WARRIOR`,80,190],[`ANHUR_GUARD`,55,130],[`RESHEPH_CHARIOT`,20,75],[`EGYPTIAN_RAM`,12,45],[`EGYPTIAN_CATAPULT`,8,24]]],[`xl`,[[`SLAVE_MILITIA`,360,650],[`ASH_WARDEN`,220,420],[`EGYPTIAN_SCOUT`,55,140],[`KHOPESH_WARRIOR`,110,240],[`ANHUR_GUARD`,75,160],[`RESHEPH_CHARIOT`,30,100],[`EGYPTIAN_RAM`,18,68],[`EGYPTIAN_CATAPULT`,12,34]]],[`2xl`,[[`SLAVE_MILITIA`,460,800],[`ASH_WARDEN`,280,500],[`EGYPTIAN_SCOUT`,70,170],[`KHOPESH_WARRIOR`,145,300],[`ANHUR_GUARD`,95,200],[`RESHEPH_CHARIOT`,45,130],[`EGYPTIAN_RAM`,26,95],[`EGYPTIAN_CATAPULT`,16,48]]],[`3xl`,[[`SLAVE_MILITIA`,560,950],[`ASH_WARDEN`,340,580],[`EGYPTIAN_SCOUT`,85,200],[`KHOPESH_WARRIOR`,180,360],[`ANHUR_GUARD`,115,240],[`RESHEPH_CHARIOT`,58,160],[`EGYPTIAN_RAM`,34,120],[`EGYPTIAN_CATAPULT`,22,62]]],[`4xl`,[[`SLAVE_MILITIA`,680,1150],[`ASH_WARDEN`,400,700],[`EGYPTIAN_SCOUT`,105,230],[`KHOPESH_WARRIOR`,220,430],[`ANHUR_GUARD`,140,280],[`RESHEPH_CHARIOT`,75,190],[`EGYPTIAN_RAM`,46,145],[`EGYPTIAN_CATAPULT`,30,78]]]])],[`natars`,new Map([[`xxs`,[[`PIKEMAN`,10,32],[`THORNED_WARRIOR`,4,16]]],[`xs`,[[`PIKEMAN`,25,80],[`THORNED_WARRIOR`,10,45]]],[`sm`,[[`PIKEMAN`,100,210],[`THORNED_WARRIOR`,50,140],[`NATARIAN_SCOUT`,10,25]]],[`md`,[[`PIKEMAN`,190,360],[`THORNED_WARRIOR`,130,280],[`NATARIAN_SCOUT`,24,65],[`GUARDSMAN`,35,110],[`AXERIDER`,20,60],[`NATARIAN_KNIGHT`,8,30]]],[`lg`,[[`PIKEMAN`,280,520],[`THORNED_WARRIOR`,180,360],[`NATARIAN_SCOUT`,40,110],[`GUARDSMAN`,80,190],[`AXERIDER`,55,130],[`NATARIAN_KNIGHT`,20,75],[`NATARIAN_RAM`,12,45],[`NATARIAN_CATAPULT`,8,24]]],[`xl`,[[`PIKEMAN`,360,650],[`THORNED_WARRIOR`,220,420],[`NATARIAN_SCOUT`,55,140],[`GUARDSMAN`,110,240],[`AXERIDER`,75,160],[`NATARIAN_KNIGHT`,30,100],[`NATARIAN_RAM`,18,68],[`NATARIAN_CATAPULT`,12,34]]],[`2xl`,[[`PIKEMAN`,460,800],[`THORNED_WARRIOR`,280,500],[`NATARIAN_SCOUT`,70,170],[`GUARDSMAN`,145,300],[`AXERIDER`,95,200],[`NATARIAN_KNIGHT`,45,130],[`NATARIAN_RAM`,26,95],[`NATARIAN_CATAPULT`,16,48]]],[`3xl`,[[`PIKEMAN`,560,950],[`THORNED_WARRIOR`,340,580],[`NATARIAN_SCOUT`,85,200],[`GUARDSMAN`,180,360],[`AXERIDER`,115,240],[`NATARIAN_KNIGHT`,58,160],[`NATARIAN_RAM`,34,120],[`NATARIAN_CATAPULT`,22,62]]],[`4xl`,[[`PIKEMAN`,680,1150],[`THORNED_WARRIOR`,400,700],[`NATARIAN_SCOUT`,105,230],[`GUARDSMAN`,220,430],[`AXERIDER`,140,280],[`NATARIAN_KNIGHT`,75,190],[`NATARIAN_RAM`,46,145],[`NATARIAN_CATAPULT`,30,78]]]])]]),td=1.2,nd=(e,t)=>{let n=Y(t.seed),r=[],i=e.selectObjects({sql:`SELECT id, unit FROM unit_ids`,schema:V({id:R(),unit:ql})}),a=new Map(i.map(e=>[e.unit,e.id])),o=e.selectObjects({sql:`
      SELECT
        players.id AS player_id,
        ti.tribe,
        tiles.id AS tile_id,
        tiles.x,
        tiles.y
      FROM
        villages
          INNER JOIN players ON villages.player_id = players.id
          JOIN tribe_ids ti ON players.tribe_id = ti.id
          INNER JOIN tiles ON villages.tile_id = tiles.id;
    `,schema:V({player_id:R(),tribe:G,tile_id:R(),x:R(),y:R()})});for(let{tribe:e,tile_id:i,player_id:s,x:c,y:l}of o){if(s===1){let t=_l(e,`tier-1`);r.push([a.get(t.id),3,i,i],[a.get(`HERO`),1,i,i]);continue}let o=mc(t.configuration.mapSize,c,l),u=ed.get(e).get(o);for(let[e,t,o]of u){let s=Math.max(1,Math.floor(t*td)),c=Math.max(s,Math.floor(o*td)),l=X(n,s,c);r.push([a.get(e),l,i,i])}}let s=e.selectObjects({sql:`
      SELECT
        o.tile_id AS tile_id,
        GROUP_CONCAT(ri.resource) AS resources
      FROM
        oasis o
          JOIN resource_ids ri ON ri.id = o.resource_id
      GROUP BY
        o.tile_id
      HAVING
        MAX(o.village_id) IS NULL;
    `,schema:V({tile_id:R(),resources:I()})});for(let{tile_id:e,resources:t}of s){let[i,o]=t.split(`,`),s=o&&i===`wheat`?o:i,c=$u.get(s);for(let[t,i,o]of c){let s=X(n,i,o);r.push([a.get(t),s,e,e])}}K(e,`troops`,[`unit_id`,`amount`,`tile_id`,`source_tile_id`],r)},rd=e=>{let t=[];for(let e of pl)t.push([e.id,e.unitWheatConsumption]);K(e,`unit_data`,[`unit_id`,`wheat_consumption`],t)},id=e=>{let t=[Kl.value,...Rl.options,...zl.options,...Bl.options,...Vl.options,...Hl.options,...Ul.options,...Wl.options,...Gl.options];K(e,`unit_ids`,[`unit`],t.map(e=>[e]))},ad=new Set([`tier-1`,`tier-2`,`tier-3`,`scout`,`tier-4`,`tier-5`,`siege-ram`,`siege-catapult`]),od=(e,t)=>{let n=gl(t.playerConfiguration.tribe).filter(({tier:e})=>ad.has(e)).map(e=>e.id);e.exec({sql:`
      INSERT INTO
        unit_improvements (player_id, unit_id, level)
      SELECT
        $player_id,
        id,
        0
      FROM
        unit_ids
      WHERE
        unit IN (${n.map((e,t)=>`$unit${t}`).join(`,`)});
    `,bind:{$player_id:1,...Object.fromEntries(n.map((e,t)=>[`$unit${t}`,e]))}})};var sd=class{size;bit;constructor(e){if(typeof e==`number`){this.size=e,this.bit=new Float64Array(this.size+1);return}this.size=e.length,this.bit=new Float64Array(this.size+1);for(let t=0;t<this.size;t+=1)this.add(t,e[t])}add(e,t){let n=e+1;for(;n<=this.size;)this.bit[n]+=t,n+=n&-n}sum(e){let t=e+1,n=0;for(;t>0;)n+=this.bit[t],t-=t&-t;return n}total(){return this.sum(this.size-1)}findByPrefix(e){let t=0,n=1;for(;n<<1<=this.size;)n<<=1;let r=e;for(;n!==0;n>>=1){let e=t+n;e<=this.size&&this.bit[e]<=r&&(r-=this.bit[e],t=e)}return Math.min(this.size-1,t)}};const cd={xxs:0,xs:1,sm:1,md:2,lg:3,xl:4,"2xl":5,"3xl":6,"4xl":7},ld={xxs:0,xs:0,sm:1,md:2,lg:4,xl:7,"2xl":9,"3xl":10,"4xl":13},ud=(e,t)=>{let n=Math.max(1,Math.round(t/200));return Math.max(0,Math.round(e*n))},dd=(e,t)=>{for(let n=t.length-1;n>0;--n){let r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}},fd=(e,t)=>{let n=Y(t.seed),r=t.configuration.mapSize/2,{gridSize:i,halfSize:a}=Uc(t.configuration.mapSize),o=e=>{let t=e-1,n=t%i,r=Math.floor(t/i);return{x:-a+n,y:a-r}},s=(e,t)=>{let n=e+a;return(a-t)*i+n+1},c=(e,t)=>Math.min(1,Math.hypot(e,t)/r),l=e.selectValue({sql:`SELECT id FROM tiles WHERE x = 0 AND y = 0;`,schema:R()});e.exec({sql:`
      INSERT INTO
        villages (name, slug, tile_id, player_id)
      VALUES
        ($name, $slug, $tile_id, $player_id);
    `,bind:{$name:`New village`,$slug:`v-1`,$tile_id:l,$player_id:1}});let u=e.selectValues({sql:`
      SELECT id
      FROM
        players
      WHERE
        id != $player_id
    `,bind:{$player_id:1},schema:R()}),d=e.selectValues({sql:`
      SELECT t.id
      FROM
        tiles AS t
      WHERE
        t.type_id = (SELECT id FROM tile_type_ids WHERE type = 'free')
        AND NOT (t.x = 0 AND t.y = 0);
    `,schema:R()}),f=e=>{let t=d[e],{x:n,y:r}=o(t);return{id:t,x:n,y:r}},p=d.length,m=new Float64Array(p);for(let e=0;e<p;e+=1){let{x:t,y:n}=o(d[e]),r=c(t,n);m[e]=(1-r)**1}let h=new sd(m),g=Array.from({length:p},(e,t)=>t);dd(n,g);let _=new Int32Array(p).fill(-1);for(let e=0;e<g.length;e+=1)_[g[e]]=e;let v=new Map;for(let e=0;e<p;e+=1)v.set(d[e],e);let y=e=>{let t=_[e];if(t===-1)return!1;let n=g.length-1,r=g[n];t!==n&&(g[t]=r,_[r]=t),g.pop(),_[e]=-1;let i=m[e];return i!==0&&(h.add(e,-i),m[e]=0),v.delete(d[e]),!0},b=()=>{if(g.length===0)return;let e=X(n,0,g.length-1),t=g[e];return y(t),t},x=()=>{if(g.length===0)return;let e=h.total();if(!(e>0)){let e=b();return typeof e==`number`?f(e):void 0}let t=n()*e,r=h.findByPrefix(t);if(_[r]===-1){let e=r+1;for(;e<p&&_[e]===-1;)e+=1;if(e<p)r=e;else{for(e=r-1;e>=0&&_[e]===-1;)--e;if(e>=0)r=e;else{let e=b();return e===void 0?void 0:f(e)}}}return y(r),f(r)},S=[];for(let e=0;e<u.length;e+=1){let r=u[e];if(g.length===0)break;let i=Math.max(1,u.length-e),a=g.length,o=Math.max(1,Math.floor(a/i)),c=X(n,1,o),l=x();if(!l)break;S.push([r,l]);let d=mc(t.configuration.mapSize,l.x,l.y),p=cd[d],m=ud(p,t.configuration.mapSize),h=ld[d],_=h>0?X(n,0,h):0,C=Math.min(_,Math.max(0,c-1),g.length);if(m>0&&C>0){let e=[];for(let t=-m;t<=m;t+=1)for(let n=-m;n<=m;n+=1)(t!==0||n!==0)&&e.push([t,n]);dd(n,e);for(let[t,n]of e){if(C===0)break;let e=s(l.x+t,l.y+n),i=v.get(e);i!==void 0&&(y(i),S.push([r,f(i)]),--C)}}let ee=Math.max(3,m+1);for(;C>0&&g.length>0;){let e=-1,t=Math.min(5,g.length);for(let r=0;r<t;r+=1){let t=g[X(n,0,g.length-1)],r=f(t),i=r.x-l.x,a=r.y-l.y;if(i*i+a*a>=ee*ee){e=t;break}}if(e===-1){let e=b();if(e===void 0)break;S.push([r,f(e)])}else y(e),S.push([r,f(e)]);--C}}let C=S.map(([e,{id:t}])=>[`${Z(n,qs)}${Z(n,Js)}`,null,t,e]);K(e,`villages`,[`name`,`slug`,`tile_id`,`player_id`],C)},pd=[{id:1001,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_TRAVEL_SPEED`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`unitSpeed`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1002,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_CARRYING_CAPACITY`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`unitCarryCapacity`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1003,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_TRAINING_REDUCTION`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`barracksTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatBarracksTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`stableTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatStableTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`workshopTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`},{id:`hospitalTrainingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1004,name:`UNCOMMON_ARTIFACT_MILITARY_TROOP_WHEAT_CONSUMPTION_REDUCTION`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`unitWheatConsumption`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1005,name:`UNCOMMON_ARTIFACT_CIVIL_BUILD_TIME_REDUCTION`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`buildingDuration`,value:.9,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1006,name:`UNCOMMON_ARTIFACT_CIVIL_OASIS_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[]},{id:1007,name:`UNCOMMON_ARTIFACT_CIVIL_RESOURCE_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`uncommon`,category:`artifact`,basePrice:null,effects:[{id:`woodProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`},{id:`clayProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`},{id:`ironProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`},{id:`wheatProduction`,value:1.1,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1008,name:`RARE_ARTIFACT_MILITARY_TROOP_TRAVEL_SPEED`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`unitSpeed`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:1009,name:`RARE_ARTIFACT_MILITARY_TROOP_CARRYING_CAPACITY`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`unitCarryCapacity`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10010,name:`RARE_ARTIFACT_MILITARY_TROOP_TRAINING_REDUCTION`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`barracksTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatBarracksTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`stableTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`greatStableTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`workshopTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`hospitalTrainingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10011,name:`RARE_ARTIFACT_MILITARY_TROOP_WHEAT_CONSUMPTION_REDUCTION`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`unitWheatConsumption`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10012,name:`RARE_ARTIFACT_CIVIL_BUILD_TIME_REDUCTION`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`buildingDuration`,value:.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10013,name:`RARE_ARTIFACT_CIVIL_OASIS_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[]},{id:10014,name:`RARE_ARTIFACT_CIVIL_RESOURCE_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`rare`,category:`artifact`,basePrice:null,effects:[{id:`woodProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`clayProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`ironProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`},{id:`wheatProduction`,value:1.5,scope:`local`,source:`artifact`,type:`bonus`}]},{id:10015,name:`EPIC_ARTIFACT_MILITARY_TROOP_TRAVEL_SPEED`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`unitSpeed`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10016,name:`EPIC_ARTIFACT_MILITARY_TROOP_CARRYING_CAPACITY`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`unitCarryCapacity`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10017,name:`EPIC_ARTIFACT_MILITARY_TROOP_TRAINING_REDUCTION`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`barracksTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`greatBarracksTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`stableTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`greatStableTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`workshopTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`hospitalTrainingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10018,name:`EPIC_ARTIFACT_MILITARY_TROOP_WHEAT_CONSUMPTION_REDUCTION`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`unitWheatConsumption`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10019,name:`EPIC_ARTIFACT_CIVIL_BUILD_TIME_REDUCTION`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`buildingDuration`,value:.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10020,name:`EPIC_ARTIFACT_CIVIL_OASIS_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[]},{id:10021,name:`EPIC_ARTIFACT_CIVIL_RESOURCE_PRODUCTION_BONUS`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[{id:`woodProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`clayProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`ironProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`},{id:`wheatProduction`,value:1.5,scope:`global`,source:`artifact`,type:`bonus`}]},{id:10022,name:`EPIC_ARTIFACT_CIVIL_ENABLE_GREAT_BUILDINGS`,slot:`non-equipable`,rarity:`epic`,category:`artifact`,basePrice:null,effects:[]}],md=[{id:1011,name:`COMMON_HORSE`,slot:`horse`,rarity:`common`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:7}]},{id:1012,name:`UNCOMMON_HORSE`,slot:`horse`,rarity:`uncommon`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:9}]},{id:1013,name:`RARE_HORSE`,slot:`horse`,rarity:`rare`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:11}]},{id:1014,name:`EPIC_HORSE`,slot:`horse`,rarity:`epic`,category:`wearable`,basePrice:5,heroBonus:[{attribute:`speed`,value:13}]}],hd=[{id:1021,name:`HEALING_POTION`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:5},{id:1022,name:`BOOK_OF_WISDOM`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:100},{id:1023,name:`ANIMAL_CAGE`,slot:`consumable`,rarity:`common`,category:`consumable`,basePrice:20},{id:1024,name:`REVIVAL_POTION`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:20},{id:1025,name:`SILVER`,slot:`non-equipable`,rarity:`common`,category:`currency`,basePrice:null},{id:1026,name:`WOOD`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1027,name:`CLAY`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1028,name:`IRON`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1029,name:`WHEAT`,slot:`non-equipable`,rarity:`common`,category:`resource`,basePrice:null},{id:1030,name:`EXPERIENCE_SCROLL`,slot:`non-equipable`,rarity:`common`,category:`consumable`,basePrice:50}],gd=[...pd,...md,...hd];new Map(gd.map(e=>[e.id,e]));const _d=V({tile_id:R(),x:R(),y:R()}),vd=(e,t)=>{let n=Y(t.seed),r=[],i=new Set([`consumable`,`resource`,`currency`]),a=[],o=[],s=[],c=[],l=[];for(let e of gd){if(i.has(e.category)){a.push(e);continue}switch(e.rarity){case`epic`:o.push(e);break;case`rare`:s.push(e);break;case`uncommon`:c.push(e);break;case`common`:l.push(e)}}let u=e.selectObjects({sql:`
      SELECT
        tiles.id AS tile_id,
        tiles.x,
        tiles.y
      FROM
        villages
          JOIN players ON villages.player_id = players.id
          JOIN tiles ON villages.tile_id = tiles.id
      WHERE
        players.id != $player_id;
    `,bind:{$player_id:1},schema:_d}).map(e=>({...e,size:mc(t.configuration.mapSize,e.x,e.y)})),d=u.filter(({size:e})=>e===`4xl`),f=Wc(n,d,o.length).map((e,t)=>{let{id:n}=o[t];return{id:n,amount:1,tileId:e.tile_id}}),p=u.filter(e=>[`3xl`,`2xl`].includes(e.size)),m=Wc(n,p,s.length).map((e,t)=>{let{id:n}=s[t];return{id:n,tileId:e.tile_id,amount:1}}),h=u.filter(e=>[`xl`,`lg`].includes(e.size)),g=Wc(n,h,c.length).map((e,t)=>{let{id:n}=c[t];return{id:n,tileId:e.tile_id,amount:1}}),_=u.filter(e=>[`md`,`sm`].includes(e.size)),v=Wc(n,_,l.length).map((e,t)=>{let{id:n}=l[t];return{id:n,tileId:e.tile_id,amount:1}}),y=[...f,...m,...g,...v],b=new Set(y.map(({tileId:e})=>e)),x=u.filter(({tile_id:e})=>!b.has(e)),S=x.length/2,C=Wc(n,x,S).map(e=>{let{id:t}=Z(n,a);return{id:t,tileId:e.tile_id,amount:1}}),ee=[...f,...m,...g,...v,...C];for(let e of ee)r.push([e.id,e.amount,e.tileId]);K(e,`world_items`,[`item_id`,`amount`,`tile_id`],r)};var yd=`CREATE TRIGGER IF NOT EXISTS battle_report_units_create_wounded_troops_after_insert\r
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
`;const bd=e=>{let t=e.selectValues({sql:`SELECT name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '%_ids' AND name NOT LIKE '%_history' AND name != 'meta';`,schema:I()});for(let n of t){let t=`trg_update_meta_on_${n}`;for(let r of[`INSERT`,`UPDATE`,`DELETE`]){let i=`
        CREATE TRIGGER IF NOT EXISTS ${t}_${r.toLowerCase()}
        AFTER ${r} ON ${n}
        
      BEGIN
        UPDATE meta SET last_write = unixepoch();
      END;
    
      `;e.exec({sql:i})}}},xd=e=>{e.exec({sql:`
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
    `})},Sd=e=>{e.exec({sql:`
      CREATE TRIGGER IF NOT EXISTS loyalties_delete_capped_entries_after_update
      AFTER UPDATE OF loyalty
      ON loyalties
      WHEN NEW.loyalty >= 100
      BEGIN
        DELETE FROM loyalties WHERE tile_id = NEW.tile_id;
      END;
    `})};var Cd=`CREATE TRIGGER reports_delete_details_before_delete\r
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
`,wd=`CREATE TRIGGER reports_prune_oldest_before_insert\r
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
`;const Td=(e,t,r)=>{let i=performance.now();return e.transaction(e=>{e.exec({sql:`CREATE TABLE building_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  building TEXT NOT NULL UNIQUE CHECK (building IN ('BARRACKS', 'GREAT_BARRACKS', 'STABLE', 'GREAT_STABLE', 'WORKSHOP', 'HOSPITAL', 'ASCLEPEION', 'CLAY_PIT', 'WHEAT_FIELD', 'WOODCUTTER', 'IRON_MINE', 'BAKERY', 'BRICKYARD', 'GRAIN_MILL', 'GRANARY', 'GREAT_GRANARY', 'IRON_FOUNDRY', 'SAWMILL', 'WAREHOUSE', 'GREAT_WAREHOUSE', 'WATERWORKS', 'ACADEMY', 'ROMAN_WALL', 'TEUTONIC_WALL', 'HEROS_MANSION', 'HUN_WALL', 'GAUL_WALL', 'RALLY_POINT', 'EGYPTIAN_WALL', 'TRAPPER', 'BREWERY', 'COMMAND_CENTER', 'CRANNY', 'HORSE_DRINKING_TROUGH', 'MAIN_BUILDING', 'MARKETPLACE', 'RESIDENCE', 'TOURNAMENT_SQUARE', 'TRADE_OFFICE', 'SMITHY', 'TOWN_HALL', 'EMBASSY', 'TREASURY', 'GATHERERS_HUT', 'HUNTERS_LODGE', 'SPARTAN_WALL', 'NATAR_WALL', 'NATURE_WALL'))\r
) STRICT;\r
\r
CREATE INDEX idx_building_ids_building ON building_ids(building);\r
`}),gc(e),e.exec({sql:`CREATE TABLE faction_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  faction TEXT NOT NULL UNIQUE CHECK (faction IN ('player', 'npc1', 'npc2', 'npc3', 'npc4', 'npc5', 'npc6', 'npc7', 'npc8'))\r
) STRICT;\r
\r
CREATE INDEX idx_faction_ids_faction ON faction_ids(faction);\r
`}),Oc(e),e.exec({sql:`CREATE TABLE tribe_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  tribe TEXT NOT NULL UNIQUE CHECK (tribe IN ('gauls', 'romans', 'teutons', 'egyptians', 'huns', 'spartans', 'nature', 'natars'))\r
) STRICT;\r
\r
CREATE INDEX idx_tribe_ids_tribe ON tribe_ids(tribe);\r
`}),Qu(e),e.exec({sql:`CREATE TABLE unit_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  unit TEXT NOT NULL UNIQUE CHECK (unit IN ('HERO', 'LEGIONNAIRE', 'PRAETORIAN', 'IMPERIAN', 'EQUITES_IMPERATORIS', 'EQUITES_CAESARIS', 'ROMAN_SCOUT', 'ROMAN_RAM', 'ROMAN_CATAPULT', 'ROMAN_CHIEF', 'ROMAN_SETTLER', 'PHALANX', 'SWORDSMAN', 'THEUTATES_THUNDER', 'DRUIDRIDER', 'HAEDUAN', 'GAUL_SCOUT', 'GAUL_RAM', 'GAUL_CATAPULT', 'GAUL_CHIEF', 'GAUL_SETTLER', 'CLUBSWINGER', 'SPEARMAN', 'AXEMAN', 'PALADIN', 'TEUTONIC_KNIGHT', 'TEUTONIC_SCOUT', 'TEUTONIC_RAM', 'TEUTONIC_CATAPULT', 'TEUTONIC_CHIEF', 'TEUTONIC_SETTLER', 'MERCENARY', 'BOWMAN', 'STEPPE_RIDER', 'MARKSMAN', 'MARAUDER', 'HUN_SCOUT', 'HUN_RAM', 'HUN_CATAPULT', 'HUN_CHIEF', 'HUN_SETTLER', 'SLAVE_MILITIA', 'ASH_WARDEN', 'KHOPESH_WARRIOR', 'ANHUR_GUARD', 'RESHEPH_CHARIOT', 'EGYPTIAN_SCOUT', 'EGYPTIAN_RAM', 'EGYPTIAN_CATAPULT', 'EGYPTIAN_CHIEF', 'EGYPTIAN_SETTLER', 'HOPLITE', 'SHIELDSMAN', 'TWINSTEEL_THERION', 'ELPIDA_RIDER', 'CORINTHIAN_CRUSHER', 'SPARTAN_SCOUT', 'SPARTAN_RAM', 'SPARTAN_CATAPULT', 'SPARTAN_CHIEF', 'SPARTAN_SETTLER', 'PIKEMAN', 'THORNED_WARRIOR', 'GUARDSMAN', 'AXERIDER', 'NATARIAN_KNIGHT', 'NATARIAN_SCOUT', 'NATARIAN_RAM', 'NATARIAN_CATAPULT', 'NATARIAN_CHIEF', 'NATARIAN_SETTLER', 'RAT', 'SPIDER', 'SERPENT', 'BAT', 'WILD_BOAR', 'WOLF', 'BEAR', 'CROCODILE', 'TIGER', 'ELEPHANT'))\r
) STRICT;\r
`}),id(e),e.exec({sql:`CREATE TABLE effect_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  effect TEXT NOT NULL UNIQUE CHECK (effect IN ('attack', 'defence', 'defenceBonus', 'infantryDefence', 'cavalryDefence', 'warehouseCapacity', 'granaryCapacity', 'unitSpeed', 'unitSpeedAfter20Fields', 'unitWheatConsumption', 'unitCarryCapacity', 'buildingDuration', 'unitResearchDuration', 'unitImprovementDuration', 'merchantSpeed', 'merchantCapacity', 'merchantAmount', 'crannyCapacity', 'trapperCapacity', 'revealedIncomingTroopsAmount', 'woodProduction', 'clayProduction', 'ironProduction', 'wheatProduction', 'residenceTrainingDuration', 'barracksTrainingDuration', 'greatBarracksTrainingDuration', 'stableTrainingDuration', 'greatStableTrainingDuration', 'workshopTrainingDuration', 'hospitalTrainingDuration'))\r
) STRICT;\r
\r
CREATE INDEX idx_effect_ids_effect ON effect_ids(effect);\r
`}),yc(e),e.exec({sql:`CREATE TABLE effect_type_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  type TEXT NOT NULL UNIQUE CHECK (type IN ('base', 'bonus', 'bonus-booster'))\r
);\r
`}),e.exec({sql:`CREATE TABLE effect_scope_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  scope TEXT NOT NULL UNIQUE CHECK (scope IN ('server', 'global', 'local'))\r
);\r
`}),e.exec({sql:`CREATE TABLE effect_source_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  source TEXT NOT NULL UNIQUE CHECK (source IN ('hero', 'oasis', 'artifact', 'building', 'tribe', 'server', 'troops'))\r
);\r
`}),vc(e),e.exec({sql:`CREATE TEMPORARY TABLE unit_data\r
(\r
  unit_id TEXT PRIMARY KEY,\r
  wheat_consumption INTEGER NOT NULL\r
) STRICT;\r
`}),rd(e),e.exec({sql:`CREATE TEMPORARY TABLE building_data\r
(\r
  building_id TEXT NOT NULL,\r
  level INTEGER NOT NULL,\r
  tribe TEXT,\r
  effect_id INTEGER NOT NULL REFERENCES effect_ids(id),\r
  value REAL NOT NULL,\r
  type TEXT NOT NULL,\r
  population INTEGER\r
) STRICT;\r
`}),Ks(e),e.exec({sql:`CREATE UNIQUE INDEX idx_building_data_generic_effect_unique ON building_data(building_id, level, effect_id, type)\r
  WHERE tribe IS NULL AND population IS NULL;\r
\r
CREATE UNIQUE INDEX idx_building_data_tribal_effect_unique ON building_data(building_id, level, tribe, effect_id, type)\r
  WHERE tribe IS NOT NULL AND population IS NULL;\r
\r
CREATE UNIQUE INDEX idx_building_data_generic_population_unique ON building_data(building_id, level)\r
  WHERE tribe IS NULL AND population IS NOT NULL;\r
`}),e.exec({sql:`CREATE TABLE resource_field_composition_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  resource_field_composition TEXT NOT NULL UNIQUE CHECK (resource_field_composition IN ('4446', '5436', '5346', '4536', '3546', '4356', '3456', '4437', '4347', '3447', '3339', '11115', '00018'))\r
) STRICT;\r
`}),Tu(e),e.exec({sql:`CREATE TABLE resource_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  resource TEXT NOT NULL UNIQUE CHECK (resource IN ('wood', 'clay', 'iron', 'wheat'))\r
) STRICT;\r
\r
CREATE INDEX idx_resource_ids_resource ON resource_ids(resource);\r
`}),Eu(e),e.exec({sql:`CREATE TABLE tile_type_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  type TEXT NOT NULL UNIQUE CHECK (type IN ('free', 'oasis'))\r
) STRICT;\r
\r
CREATE INDEX idx_tile_type_ids_type ON tile_type_ids(type);\r
`}),Mu(e),e.exec({sql:`CREATE TABLE unit_training_history\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  batch_id TEXT NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id),\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id),\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id),\r
\r
  UNIQUE (batch_id, unit_id)\r
) STRICT;\r
\r
CREATE INDEX idx_unit_training_history_village_id ON unit_training_history(village_id);\r
CREATE INDEX idx_unit_training_history_unit_id ON unit_training_history(unit_id);\r
CREATE INDEX idx_unit_training_history_building_id ON unit_training_history(building_id);\r
`}),e.exec({sql:`CREATE TABLE building_level_change_history\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  field_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  previous_level INTEGER NOT NULL,\r
  new_level INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id),\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id)\r
) STRICT;\r
\r
CREATE INDEX idx_building_level_change_history_village_id ON building_level_change_history(village_id);\r
CREATE INDEX idx_building_level_change_history_building_id ON building_level_change_history(building_id);\r
`}),e.exec({sql:`CREATE TABLE IF NOT EXISTS scheduled_building_construction_cancellation_history\r
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
`}),e.exec({sql:`CREATE TABLE unit_improvement_history\r
(\r
  id INTEGER PRIMARY KEY,\r
  player_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  previous_level INTEGER NOT NULL,\r
  new_level INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
\r
  FOREIGN KEY (player_id) REFERENCES players (id),\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT;\r
\r
CREATE INDEX idx_unit_improvement_history_player_id ON unit_improvement_history(player_id);\r
CREATE INDEX idx_unit_improvement_history_unit_id ON unit_improvement_history(unit_id);\r
`}),e.exec({sql:`CREATE TABLE unit_research_history\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id),\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT;\r
\r
CREATE INDEX idx_unit_research_history_village_id ON unit_research_history(village_id);\r
CREATE INDEX idx_unit_research_history_unit_id ON unit_research_history(unit_id);\r
`}),e.exec({sql:`CREATE TABLE village_founding_history\r
(\r
  id INTEGER PRIMARY KEY,\r
  village_id INTEGER NOT NULL,\r
  tile_id INTEGER NOT NULL,\r
  x INTEGER NOT NULL,\r
  y INTEGER NOT NULL,\r
  timestamp INTEGER NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id),\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
) STRICT;\r
\r
CREATE INDEX idx_village_founding_history_village_id ON village_founding_history(village_id);\r
CREATE INDEX idx_village_founding_history_tile_id ON village_founding_history(tile_id);\r
`}),e.exec({sql:`CREATE TABLE developer_settings\r
(\r
  -- Durations\r
  is_instant_building_construction_enabled INTEGER NOT NULL CHECK (is_instant_building_construction_enabled IN (0, 1)),\r
  is_instant_unit_training_enabled INTEGER NOT NULL CHECK (is_instant_unit_training_enabled IN (0, 1)),\r
  is_instant_unit_improvement_enabled INTEGER NOT NULL CHECK (is_instant_unit_improvement_enabled IN (0, 1)),\r
  is_instant_unit_research_enabled INTEGER NOT NULL CHECK (is_instant_unit_research_enabled IN (0, 1)),\r
  is_instant_unit_travel_enabled INTEGER NOT NULL CHECK (is_instant_unit_travel_enabled IN (0, 1)),\r
\r
  -- Cost\r
  is_free_building_construction_enabled INTEGER NOT NULL CHECK (is_free_building_construction_enabled IN (0, 1)),\r
  is_free_unit_training_enabled INTEGER NOT NULL CHECK (is_free_unit_training_enabled IN (0, 1)),\r
  is_free_unit_improvement_enabled INTEGER NOT NULL CHECK (is_free_unit_improvement_enabled IN (0, 1)),\r
  is_free_unit_research_enabled INTEGER NOT NULL CHECK (is_free_unit_research_enabled IN (0, 1)),\r
  is_free_hunting_parties_enabled INTEGER NOT NULL CHECK (is_free_hunting_parties_enabled IN (0, 1)),\r
  is_instant_hero_revive_enabled INTEGER NOT NULL CHECK (is_instant_hero_revive_enabled IN (0, 1)),\r
  is_free_hero_revive_enabled INTEGER NOT NULL CHECK (is_free_hero_revive_enabled IN (0, 1))\r
) STRICT;\r
`}),_c(e),e.exec({sql:`CREATE TABLE servers\r
(\r
  id TEXT PRIMARY KEY,\r
  version TEXT NOT NULL,\r
  name TEXT NOT NULL,\r
  slug TEXT NOT NULL UNIQUE,\r
  created_at INTEGER NOT NULL,\r
  seed TEXT NOT NULL,\r
  speed INTEGER CHECK (speed IN (1, 2, 3, 5, 10)) NOT NULL,\r
  map_size INTEGER CHECK (map_size IN (100, 200, 300)) NOT NULL,\r
  player_name TEXT NOT NULL,\r
  player_tribe TEXT CHECK (player_tribe IN ('romans', 'gauls', 'teutons', 'huns', 'egyptians')) NOT NULL\r
) STRICT, WITHOUT ROWID;\r
`}),ju(e,t),e.exec({sql:`CREATE TABLE map_filters\r
(\r
  player_id INTEGER PRIMARY KEY,\r
  should_show_faction_reputation INTEGER NOT NULL CHECK (should_show_faction_reputation IN (0, 1)),\r
  should_show_oasis_icons        INTEGER NOT NULL CHECK (should_show_oasis_icons IN (0, 1)),\r
  should_show_troop_movements    INTEGER NOT NULL CHECK (should_show_troop_movements IN (0, 1)),\r
  should_show_wheat_fields       INTEGER NOT NULL CHECK (should_show_wheat_fields IN (0, 1)),\r
  should_show_tile_tooltips      INTEGER NOT NULL CHECK (should_show_tile_tooltips IN (0, 1)),\r
  should_show_treasure_icons     INTEGER NOT NULL CHECK (should_show_treasure_icons IN (0, 1)),\r
\r
  FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE\r
) STRICT;\r
\r
CREATE INDEX idx_map_filters_player_id ON map_filters(player_id);\r
`}),Nc(e),e.exec({sql:`CREATE TABLE preferences\r
(\r
  player_id INTEGER PRIMARY KEY,\r
\r
  -- Accessibility\r
  is_accessibility_mode_enabled INTEGER NOT NULL CHECK (is_accessibility_mode_enabled IN (0, 1)),\r
  is_reduced_motion_mode_enabled INTEGER NOT NULL CHECK (is_reduced_motion_mode_enabled IN (0, 1)),\r
\r
  -- Display\r
  should_show_building_names INTEGER NOT NULL CHECK (should_show_building_names IN (0, 1)),\r
\r
  -- Functionality\r
  is_automatic_navigation_after_building_level_change_enabled INTEGER NOT NULL CHECK (is_automatic_navigation_after_building_level_change_enabled IN (0,1)),\r
  is_automatic_navigation_after_unit_research_enabled INTEGER NOT NULL CHECK (is_automatic_navigation_after_unit_research_enabled IN (0,1)),\r
  is_automatic_navigation_after_unit_upgrade_enabled INTEGER NOT NULL CHECK (is_automatic_navigation_after_unit_upgrade_enabled IN (0,1)),\r
  is_automatic_navigation_after_send_units_enabled INTEGER NOT NULL CHECK (is_automatic_navigation_after_send_units_enabled IN (0,1)),\r
  is_developer_tools_console_enabled INTEGER NOT NULL CHECK (is_developer_tools_console_enabled IN (0,1)),\r
\r
  -- Notifications\r
  should_show_notifications_on_building_upgrade_completion INTEGER NOT NULL CHECK (should_show_notifications_on_building_upgrade_completion IN (0,1)),\r
  should_show_notifications_on_unit_upgrade_completion INTEGER NOT NULL CHECK (should_show_notifications_on_unit_upgrade_completion IN (0,1)),\r
  should_show_notifications_on_academy_research_completion INTEGER NOT NULL CHECK (should_show_notifications_on_academy_research_completion IN (0,1)),\r
\r
  FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_preferences_player_id ON preferences(player_id);\r
`}),rl(e),e.exec({sql:`CREATE TABLE faction_reputation\r
(\r
  source_faction_id INTEGER NOT NULL,\r
  target_faction_id INTEGER NOT NULL,\r
  reputation INTEGER NOT NULL DEFAULT 0,\r
\r
  PRIMARY KEY (source_faction_id, target_faction_id),\r
\r
  FOREIGN KEY (source_faction_id) REFERENCES faction_ids (id),\r
  FOREIGN KEY (target_faction_id) REFERENCES faction_ids (id)\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_faction_reputation_source_faction_id ON faction_reputation (source_faction_id);\r
CREATE INDEX idx_faction_reputation_target_faction_id ON faction_reputation (target_faction_id);\r
`}),kc(e),e.exec({sql:`CREATE TABLE tiles\r
(\r
  id INTEGER PRIMARY KEY,\r
  x INTEGER NOT NULL,\r
  y INTEGER NOT NULL,\r
  type_id INTEGER NOT NULL,\r
  resource_field_composition_id INTEGER,\r
  -- Bit-packed number that describes oasis resource, oasis group, group position and variant\r
  oasis_graphics INTEGER,\r
\r
  FOREIGN KEY (type_id) REFERENCES tile_type_ids (id),\r
  FOREIGN KEY (resource_field_composition_id) REFERENCES resource_field_composition_ids (id)\r
) STRICT;\r
`}),Zu(e,t),e.exec({sql:`CREATE INDEX idx_tiles_rfc_id ON tiles(resource_field_composition_id);\r
\r
CREATE INDEX idx_tiles_type_xy ON tiles(type_id, x, y);\r
\r
CREATE INDEX idx_tiles_xy ON tiles(x, y);\r
`}),e.exec({sql:`CREATE TABLE loyalties\r
(\r
  tile_id INTEGER NOT NULL PRIMARY KEY,\r
  loyalty INTEGER NOT NULL,\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
) STRICT;\r
\r
CREATE INDEX idx_loyalties_tile_id ON loyalties(tile_id);\r
`}),e.exec({sql:`CREATE TABLE map_markers\r
(\r
  id INTEGER PRIMARY KEY,\r
  player_id INTEGER NOT NULL,\r
  tile_id INTEGER NOT NULL,\r
  description TEXT NOT NULL DEFAULT '',\r
  color TEXT NOT NULL DEFAULT '#dc2626',\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE,\r
  FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE\r
\r
) STRICT;\r
\r
CREATE INDEX idx_map_markers_player_id ON map_markers (player_id);\r
CREATE INDEX idx_map_markers_tile_id ON map_markers (tile_id);\r
`}),r?.(),e.exec({sql:`CREATE TABLE oasis\r
(\r
  id INTEGER PRIMARY KEY,\r
  tile_id INTEGER NOT NULL,\r
  village_id INTEGER,\r
  resource_id INTEGER NOT NULL,\r
  bonus INTEGER NOT NULL,\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE,\r
  FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE,\r
  FOREIGN KEY (resource_id) REFERENCES resource_ids (id)\r
) STRICT;\r
`}),Kc(e,t),e.exec({sql:`CREATE INDEX idx_oasis_tile_id ON oasis(tile_id);\r
CREATE INDEX idx_oasis_village_id ON oasis(village_id);\r
CREATE INDEX idx_oasis_resource_bonus ON oasis(resource_id, bonus);\r
`}),r?.(),e.exec({sql:`CREATE TABLE players\r
(\r
  id INTEGER PRIMARY KEY,\r
  name TEXT NOT NULL,\r
  slug TEXT NOT NULL UNIQUE,\r
  tribe_id INTEGER NOT NULL,\r
  faction_id INTEGER NOT NULL,\r
\r
  FOREIGN KEY (tribe_id) REFERENCES tribe_ids (id),\r
  FOREIGN KEY (faction_id) REFERENCES faction_ids (id)\r
) STRICT;\r
`}),tl(e,t),e.exec({sql:`CREATE INDEX idx_players_tribe_id ON players (tribe_id);\r
CREATE INDEX idx_players_faction_id ON players (faction_id);\r
`}),r?.(),e.exec({sql:`CREATE TABLE villages\r
(\r
  id INTEGER PRIMARY KEY,\r
  name TEXT NOT NULL,\r
  slug TEXT,\r
  tile_id INTEGER NOT NULL,\r
  player_id INTEGER NOT NULL,\r
\r
  UNIQUE (tile_id),\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE,\r
  FOREIGN KEY (player_id) REFERENCES players (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE\r
) STRICT;\r
`}),fd(e,t),e.exec({sql:`CREATE TABLE gatherers_hut_expeditions\r
(\r
  village_id INTEGER PRIMARY KEY,\r
  completed INTEGER NOT NULL DEFAULT 0 CHECK (completed >= 0),\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE\r
) STRICT;\r
`}),Ac(e),r?.(),e.exec({sql:`CREATE TABLE report_outcome_ids\r
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
`}),Su(e),e.exec({sql:`CREATE TABLE report_tag_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  tag TEXT NOT NULL UNIQUE CHECK (tag IN ('read', 'archived'))\r
) STRICT;\r
`}),Cu(e),e.exec({sql:`CREATE TABLE report_type_ids\r
(\r
  id INTEGER PRIMARY KEY,\r
  report_type TEXT NOT NULL UNIQUE CHECK (report_type IN ('battle', 'adventure', 'trade', 'movement', 'huntingParty', 'gatheringExpedition', 'scouting'))\r
) STRICT;\r
\r
CREATE INDEX idx_report_type_ids_report_type ON report_type_ids(report_type);\r
`}),wu(e),e.exec({sql:`CREATE TABLE reports\r
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
`}),e.exec({sql:`CREATE TABLE hero_adventure_reports\r
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
`}),e.exec({sql:`CREATE TABLE movement_reports\r
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
`}),e.exec({sql:`CREATE TABLE movement_report_units\r
(\r
  movement_report_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL CHECK (amount >= 0),\r
\r
  PRIMARY KEY (movement_report_id, unit_id),\r
  FOREIGN KEY (movement_report_id) REFERENCES movement_reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT;\r
`}),e.exec({sql:`CREATE TABLE trade_reports\r
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
`}),e.exec({sql:`CREATE TABLE hunting_party_reports (\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE REFERENCES reports(id) ON DELETE CASCADE,\r
  village_tile_id INTEGER NOT NULL REFERENCES tiles(id)\r
) STRICT;\r
`}),e.exec({sql:`CREATE TABLE hunting_party_report_units (\r
  hunting_party_report_id INTEGER NOT NULL REFERENCES hunting_party_reports(id) ON DELETE CASCADE,\r
  unit_id INTEGER NOT NULL REFERENCES unit_ids(id),\r
  amount INTEGER NOT NULL,\r
  PRIMARY KEY (hunting_party_report_id, unit_id)\r
) STRICT, WITHOUT ROWID;\r
`}),e.exec({sql:`CREATE TABLE gathering_expedition_reports (\r
  id INTEGER PRIMARY KEY,\r
  report_id INTEGER NOT NULL UNIQUE REFERENCES reports(id) ON DELETE CASCADE,\r
  village_tile_id INTEGER NOT NULL REFERENCES tiles(id),\r
  tribe_id INTEGER NOT NULL REFERENCES tribe_ids(id),\r
  loot_wood INTEGER NOT NULL,\r
  loot_clay INTEGER NOT NULL,\r
  loot_iron INTEGER NOT NULL,\r
  loot_wheat INTEGER NOT NULL\r
) STRICT;\r
`}),e.exec({sql:`CREATE TABLE gathering_expedition_report_units (\r
  gathering_expedition_report_id INTEGER NOT NULL REFERENCES gathering_expedition_reports(id) ON DELETE CASCADE,\r
  unit_id INTEGER NOT NULL REFERENCES unit_ids(id),\r
  amount INTEGER NOT NULL,\r
  PRIMARY KEY (gathering_expedition_report_id, unit_id)\r
) STRICT, WITHOUT ROWID;\r
`}),e.exec({sql:`CREATE TABLE report_tags\r
(\r
  report_id INTEGER NOT NULL,\r
  report_tag_id INTEGER NOT NULL,\r
\r
  PRIMARY KEY (report_id, report_tag_id),\r
\r
  FOREIGN KEY (report_id) REFERENCES reports (id) ON DELETE CASCADE,\r
  FOREIGN KEY (report_tag_id) REFERENCES report_tag_ids (id) ON DELETE CASCADE\r
) STRICT;\r
`}),e.exec({sql:`CREATE TABLE battle_reports\r
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
`}),e.exec({sql:`CREATE TABLE battle_report_buildings\r
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
`}),e.exec({sql:`CREATE TABLE battle_report_participants\r
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
`}),e.exec({sql:`CREATE TABLE battle_report_units\r
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
`}),e.exec({sql:`CREATE TABLE scouting_reports\r
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
`}),e.exec({sql:`CREATE TABLE scouting_report_attacker_units\r
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
`}),e.exec({sql:`CREATE TABLE scouting_report_units\r
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
`}),e.exec({sql:`CREATE TABLE scouting_report_structures\r
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
`}),e.exec({sql:`CREATE INDEX idx_reports_timestamp\r
ON reports(timestamp DESC);\r
\r
CREATE INDEX idx_reports_village_timestamp\r
ON reports(village_id, timestamp DESC);\r
\r
CREATE INDEX idx_battle_report_participants_battle\r
ON battle_report_participants(battle_id);\r
\r
CREATE INDEX idx_battle_report_buildings_report\r
  ON battle_report_buildings(report_id);\r
`}),e.exec({sql:Cd}),e.exec({sql:wd}),e.exec({sql:`CREATE TABLE heroes\r
(\r
  id INTEGER PRIMARY KEY,\r
  player_id INTEGER NOT NULL,\r
\r
  health INTEGER NOT NULL DEFAULT 100 CHECK (health BETWEEN 0 AND 100),\r
  experience INTEGER NOT NULL DEFAULT 0 CHECK (experience >= 0),\r
  base_attack_power INTEGER NOT NULL CHECK (base_attack_power >= 0),\r
  health_regeneration INTEGER NOT NULL CHECK (health_regeneration >= 0),\r
  damage_reduction INTEGER NOT NULL CHECK (damage_reduction >= 0),\r
  experience_modifier INTEGER NOT NULL CHECK (experience_modifier >= 0),\r
  speed INTEGER NOT NULL CHECK (speed >= 0),\r
  natarian_attack_bonus INTEGER NOT NULL CHECK (natarian_attack_bonus >= 0),\r
  attack_bonus INTEGER NOT NULL CHECK (attack_bonus >= 0),\r
  defence_bonus INTEGER NOT NULL CHECK (defence_bonus >= 0),\r
\r
  resource_to_produce TEXT CHECK ( resource_to_produce IN ('shared', 'wood', 'clay', 'iron', 'wheat') ) NOT NULL,\r
  village_id INTEGER NOT NULL,\r
\r
  FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE,\r
  FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE\r
) STRICT;\r
\r
CREATE INDEX idx_heroes_player_id ON heroes(player_id);\r
CREATE INDEX idx_heroes_village_id ON heroes(village_id);\r
`}),e.exec({sql:`CREATE TABLE hero_selectable_attributes\r
(\r
  hero_id INTEGER PRIMARY KEY,\r
\r
  attack_power INTEGER NOT NULL DEFAULT 0 CHECK (attack_power >= 0),\r
  resource_production INTEGER NOT NULL DEFAULT 4 CHECK (resource_production >= 0),\r
  attack_bonus INTEGER NOT NULL DEFAULT 0 CHECK (attack_bonus >= 0),\r
  defence_bonus INTEGER NOT NULL DEFAULT 0 CHECK (defence_bonus >= 0),\r
\r
  FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE\r
) STRICT;\r
\r
CREATE INDEX idx_hero_selectable_attributes_hero_id ON hero_selectable_attributes(hero_id);\r
`}),Mc(e),e.exec({sql:`CREATE TABLE bookmarks\r
(\r
  village_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  tab_name TEXT NOT NULL,\r
\r
  PRIMARY KEY (village_id, building_id),\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id),\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id)\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_bookmarks_village_id ON bookmarks(village_id);\r
CREATE INDEX idx_bookmarks_building_id ON bookmarks(building_id);\r
\r
`}),n(e),e.exec({sql:`CREATE TABLE hero_adventures\r
(\r
  hero_id INTEGER PRIMARY KEY,\r
  available INTEGER NOT NULL CHECK (available >= 0),\r
  last_updated_at INTEGER NOT NULL,\r
  completed INTEGER NOT NULL CHECK (completed >= 0),\r
\r
  FOREIGN KEY (hero_id) REFERENCES heroes (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE\r
) STRICT;\r
\r
CREATE INDEX idx_hero_adventures_hero_id ON hero_adventures(hero_id);\r
`}),jc(e),e.exec({sql:`CREATE TABLE hero_equipped_items\r
(\r
  hero_id INTEGER NOT NULL,\r
  slot TEXT NOT NULL CHECK (\r
    slot IN\r
    (\r
     'head',\r
     'torso',\r
     'legs',\r
     'right-hand',\r
     'left-hand',\r
     'horse',\r
     'consumable'\r
      )\r
    ),\r
  item_id INTEGER NOT NULL,\r
  amount INTEGER DEFAULT 1,\r
\r
  PRIMARY KEY (hero_id, slot),\r
\r
  FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_hero_equipped_items_hero_id ON hero_equipped_items(hero_id);\r
`}),e.exec({sql:`CREATE TABLE hero_inventory\r
(\r
  hero_id INTEGER NOT NULL,\r
  item_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL DEFAULT 1 CHECK (amount > 0),\r
\r
  PRIMARY KEY (hero_id, item_id),\r
\r
  FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_hero_inventory_hero_id ON hero_inventory(hero_id);\r
`}),e.exec({sql:`CREATE TABLE farm_lists\r
(\r
  id INTEGER PRIMARY KEY AUTOINCREMENT,\r
  village_id INTEGER NOT NULL,\r
  name TEXT NOT NULL,\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id)\r
) STRICT;\r
\r
CREATE INDEX idx_farm_lists_village_id ON farm_lists(village_id);\r
`}),e.exec({sql:`CREATE TABLE farm_list_tiles\r
(\r
  farm_list_id INTEGER NOT NULL,\r
  tile_id INTEGER NOT NULL,\r
\r
  PRIMARY KEY (farm_list_id, tile_id),\r
  FOREIGN KEY (farm_list_id) REFERENCES farm_lists (id) ON DELETE CASCADE,\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_farm_list_tiles_farm_list_id ON farm_list_tiles(farm_list_id);\r
CREATE INDEX idx_farm_list_tiles_tile_id ON farm_list_tiles(tile_id);\r
`}),e.exec({sql:`CREATE TABLE building_fields\r
(\r
  village_id INTEGER NOT NULL,\r
  -- Resource fields - 1-18\r
  -- Village building fields - 19-38\r
  -- Reserved village building fields:\r
  -- -- Rally point - 39\r
  -- -- Wall - 40\r
  field_id INTEGER NOT NULL,\r
  building_id INTEGER NOT NULL,\r
  level INTEGER NOT NULL DEFAULT 0,\r
\r
  PRIMARY KEY (village_id, field_id),\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE,\r
  FOREIGN KEY (building_id) REFERENCES building_ids (id)\r
) STRICT, WITHOUT ROWID;\r
`}),hc(e,t),Xc(e,t),e.exec({sql:`CREATE INDEX idx_building_fields_building_id_level ON building_fields(building_id, level);\r
`}),e.exec({sql:`CREATE TABLE trapper_cages\r
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
`}),e.exec({sql:`CREATE INDEX idx_trapper_cages_village_id ON trapper_cages (village_id);\r
\r
CREATE INDEX idx_trapper_cages_village_id_unit_id ON trapper_cages (village_id, unit_id);\r
`}),e.exec({sql:`CREATE TABLE troops\r
(\r
  id INTEGER PRIMARY KEY,\r
  unit_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL CHECK (amount > 0),\r
  tile_id INTEGER NOT NULL,\r
  source_tile_id INTEGER NOT NULL,\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE,\r
  FOREIGN KEY (source_tile_id) REFERENCES tiles (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id),\r
\r
  UNIQUE (unit_id, tile_id, source_tile_id)\r
) STRICT;\r
`}),nd(e,t),e.exec({sql:`CREATE INDEX idx_troops_unit_id ON troops (unit_id);\r
CREATE INDEX idx_troops_tile_id ON troops (tile_id);\r
CREATE INDEX idx_troops_source_tile_id ON troops (source_tile_id);\r
CREATE INDEX idx_troops_tile_unit ON troops(tile_id, unit_id);\r
`}),e.exec({sql:`CREATE TABLE IF NOT EXISTS wounded_troops\r
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
`}),e.exec({sql:`CREATE INDEX IF NOT EXISTS idx_wounded_troops_village_id ON wounded_troops(village_id);\r
CREATE INDEX IF NOT EXISTS idx_wounded_troops_unit_id ON wounded_troops(unit_id);\r
`}),e.exec({sql:yd}),e.exec({sql:`CREATE TABLE effects\r
(\r
  id INTEGER PRIMARY KEY,\r
  effect_id INTEGER NOT NULL,\r
  value REAL NOT NULL,\r
  type_id INTEGER NOT NULL,\r
  scope_id INTEGER NOT NULL,\r
  source_id INTEGER NOT NULL,\r
  tile_id INTEGER,\r
  source_specifier INTEGER,\r
\r
  FOREIGN KEY (effect_id) REFERENCES effect_ids (id),\r
  FOREIGN KEY (type_id) REFERENCES effect_type_ids (id),\r
  FOREIGN KEY (scope_id) REFERENCES effect_scope_ids (id),\r
  FOREIGN KEY (source_id) REFERENCES effect_source_ids (id),\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE ON UPDATE CASCADE\r
);\r
`}),Tc(e,t),e.exec({sql:`-- General effect-name filtering, e.g. effect lookup joins that start from effect_ids.\r
CREATE INDEX idx_effects_effect_id ON effects(effect_id);\r
\r
-- General tile-scoped lookups and cleanup/update paths that target all effects on a tile.\r
CREATE INDEX idx_effects_tile_id ON effects(tile_id);\r
\r
-- Building-effect updates by effect + tile + scope + field/source specifier.\r
CREATE INDEX idx_effects_tile_effect_scope_spec\r
  ON effects(effect_id, tile_id, scope_id, source_specifier);\r
\r
-- Hot resource-site resource calculation query. Covers effect filtering plus returned scalar columns\r
-- for selectResourceSiteResourcesRelevantEffectsByTileIdQuery.\r
CREATE INDEX idx_effects_resource_site_resources\r
  ON effects(effect_id, scope_id, tile_id, source_specifier, source_id, type_id, value);\r
`}),e.exec({sql:`CREATE TABLE resource_sites\r
(\r
  tile_id INTEGER PRIMARY KEY,\r
  wood INTEGER NOT NULL,\r
  clay INTEGER NOT NULL,\r
  iron INTEGER NOT NULL,\r
  wheat INTEGER NOT NULL,\r
  updated_at REAL NOT NULL,\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id)\r
    ON DELETE CASCADE\r
    ON UPDATE CASCADE\r
) STRICT, WITHOUT ROWID;\r
`}),Au(e,t),e.exec({sql:`CREATE TABLE world_items\r
(\r
  item_id INTEGER NOT NULL,\r
  amount INTEGER NOT NULL CHECK (amount > 0),\r
  tile_id INTEGER NOT NULL,\r
\r
  PRIMARY KEY (tile_id, item_id),\r
\r
  FOREIGN KEY (tile_id) REFERENCES tiles (id) ON DELETE CASCADE\r
) STRICT, WITHOUT ROWID;\r
`}),vd(e,t),e.exec({sql:`CREATE INDEX idx_world_items_tile_id ON world_items(tile_id);\r
`}),e.exec({sql:`CREATE TABLE unit_research\r
(\r
  unit_id INTEGER NOT NULL,\r
  village_id INTEGER NOT NULL,\r
\r
  PRIMARY KEY (village_id, unit_id),\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id) ON DELETE CASCADE,\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_unit_research_unit_id ON unit_research(unit_id);\r
\r
`}),e.exec({sql:`CREATE TABLE unit_improvements\r
(\r
  player_id INTEGER NOT NULL,\r
  unit_id INTEGER NOT NULL,\r
  level INTEGER NOT NULL CHECK (level >= 0),\r
\r
  PRIMARY KEY (player_id, unit_id),\r
\r
  FOREIGN KEY (player_id) REFERENCES players (id),\r
  FOREIGN KEY (unit_id) REFERENCES unit_ids (id)\r
) STRICT, WITHOUT ROWID;\r
\r
CREATE INDEX idx_unit_improvements_unit_id ON unit_improvements(unit_id);\r
`}),od(e,t),e.exec({sql:`CREATE TABLE quests\r
(\r
  id INTEGER PRIMARY KEY,\r
  quest_id TEXT NOT NULL,\r
  completed_at INTEGER,\r
  collected_at INTEGER,\r
  village_id INTEGER,\r
  scope TEXT GENERATED ALWAYS AS (\r
    CASE WHEN village_id IS NOT NULL THEN 'village' ELSE 'global' END\r
  ) VIRTUAL,\r
\r
  CONSTRAINT fk_quests_village FOREIGN KEY (village_id)\r
    REFERENCES villages (id) ON DELETE SET NULL\r
) STRICT;\r
\r
CREATE INDEX idx_quests_village_id_notnull\r
  ON quests(village_id)\r
  WHERE village_id IS NOT NULL;\r
\r
CREATE INDEX idx_quests_quest_id ON quests (quest_id);\r
`}),Ll(e),e.exec({sql:`CREATE TABLE events\r
(\r
  id INTEGER PRIMARY KEY,\r
  type TEXT NOT NULL,\r
  starts_at INTEGER NOT NULL,\r
  duration INTEGER NOT NULL,\r
  resolves_at INTEGER GENERATED ALWAYS AS (starts_at + duration) STORED,\r
  village_id INTEGER DEFAULT NULL,\r
  meta TEXT DEFAULT NULL, -- Event-specific payload (the different event argument shapes) stored as JSON.\r
\r
  FOREIGN KEY (village_id) REFERENCES villages (id)\r
    ON DELETE SET NULL\r
    ON UPDATE CASCADE\r
) STRICT;\r
\r
CREATE INDEX idx_events_resolves_at ON events (resolves_at);\r
CREATE INDEX idx_events_type ON events (type);\r
CREATE INDEX idx_events_village_id ON events(village_id);\r
\r
`}),Ec(e,t),e.exec({sql:`CREATE TABLE IF NOT EXISTS scheduled_building_upgrades\r
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
`}),e.exec({sql:`CREATE TABLE IF NOT EXISTS meta (\r
  last_write INTEGER NOT NULL\r
);\r
`}),Pc(e),bd(e),xd(e),Sd(e)}),performance.now()-i},Ed=e=>{let[t,n,r]=e.split(`.`);return[Number.parseInt(t,10),Number.parseInt(n,10),Number.parseInt(r,10)]},Dd=e=>{let[t,n,r]=Ed(e);return t*1e6+n*1e3+r},Od=V({id:R(),parent:R(),notused:R(),detail:I()}),kd=(e,t)=>B(e).parse(t),Ad=()=>new Map,jd=e=>{let t=e.reset.bind(e),n=e.stepReset.bind(e);return e.reset=(()=>t(!0)),e.stepReset=(()=>{try{return n()}finally{t(!0)}}),e},Md=e=>{let t=e.trimStart();for(;;){if(t.startsWith(`--`)){let e=t.search(/\r?\n/u);if(e===-1)return``;t=t.slice(e).trimStart();continue}if(t.startsWith(`/*`)){let e=t.indexOf(`*/`);if(e===-1)return``;t=t.slice(e+2).trimStart();continue}return t}},Nd=e=>/^(?:delete|insert|replace|select|update|with)\b/iu.test(Md(e)),Pd=(e,t=!1)=>{let n=Ad(),r=t=>{let r=n.get(t);if(!r){let r=jd(e.prepare(t));return n.set(t,r),r}return r},i=({sql:t,bind:n})=>B(Od).parse(e.selectObjects(`EXPLAIN QUERY PLAN ${t}`,n)),a=({sql:e,bind:t})=>{if(Nd(e))try{return i({sql:e,bind:t})}catch{}},o=({sql:e,bind:n,operation:i,execute:o})=>{let s=t?a({sql:e,bind:n}):void 0,c=t?performance.now():0,l=r(e);l.reset(!0),n&&l.bind(n);try{let n=o(l);if(t){let t=performance.now();console.log(`DbFacade.${i} — ${e} took ${(t-c).toFixed(3)} ms`,...s===void 0?[]:[s])}return n}finally{l.reset(!0)}},s={exec:({sql:e,bind:t})=>{o({sql:e,bind:t,operation:`exec`,execute:e=>e.stepReset()})},explain:i,selectValue:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectValue`,execute:e=>{if(!e.step()){e.reset();return}let t=e.get(0);return e.reset(),t}});if(r!==void 0)return Ba(n,r)},selectValues:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectValues`,execute:e=>{let t=[];for(;e.step();)t.push(e.get(0));return e.reset(),t}});return kd(n,r)},selectObject:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectObject`,execute:e=>{if(e.step()){let t=e.get({});return e.reset(),t}e.reset()}});if(r!==void 0)return Ba(n,r)},selectObjects:({sql:e,bind:t,schema:n})=>{let r=o({sql:e,bind:t,operation:`selectObjects`,execute:e=>{let t=[];for(;e.step();)t.push(e.get({}));return e.reset(),t}});return kd(n,r)},prepare:({sql:e})=>o({sql:e,operation:`prepare`,execute:e=>e}),transaction:n=>{let r=performance.now();e.transaction(()=>{n(s)});let i=performance.now();t&&console.log(`DbFacade.transaction — full callback took ${(i-r).toFixed(3)} ms`)},close:()=>{for(let[e,t]of n)t.finalize(),n.delete(e)}};return s},Fd=async e=>new Promise(t=>{globalThis.setTimeout(t,e)}),Id=e=>typeof DOMException<`u`&&e instanceof DOMException?e.name===`NoModificationAllowedError`:e instanceof Error?e.name===`NoModificationAllowedError`||e.message.includes(`NoModificationAllowedError`)||e.message.includes(`createSyncAccessHandle`):!1,Ld=async(e,t={})=>{let n=t.attempts??5,r=t.delayMs??250;for(let t=1;t<=n;t+=1)try{return await e()}catch(e){let i=t===n;if(!Id(e)||i)throw e;await Fd(r)}throw Error(`Unexpected retry state while waiting for lock release.`)};let Rd=null,zd=null,Bd=null,Vd=null;globalThis.addEventListener(`message`,async e=>{let{server:t,port:n}=e.data;try{let{default:e}=await import(`./dist-DQrYgFwJ.js`);Rd??=await e();let r={directory:`/pillage-first-ask-questions-later/${t.slug}`,forceReinitIfPreviouslyFailed:!0},i=Rd;zd=await Ld(()=>i.installOpfsSAHPoolVfs(r)),Bd=new zd.OpfsSAHPoolDb(`/${t.slug}.sqlite3`),Vd=Pd(Bd,!1),Vd.exec({sql:`
        PRAGMA user_version=${Dd(nl.VERSION)};
        PRAGMA locking_mode=EXCLUSIVE;
        PRAGMA foreign_keys=OFF;
        PRAGMA journal_mode=OFF;
        PRAGMA synchronous=OFF;
        PRAGMA temp_store=MEMORY;
        PRAGMA cache_size=-20000;
      `});let a=Td(Vd,t,()=>{n.postMessage({type:`progress`})});n.postMessage({type:`result`,migrationDuration:a})}catch(e){let t=e instanceof Error?e:Error(`Unknown error happened while creating game world`);n.postMessage({type:`error`,message:t.message,stack:t.stack})}finally{Vd?.close(),Bd?.close(),zd?.pauseVfs(),n.close(),globalThis.close()}});
//# sourceMappingURL=create-new-game-world-worker-BfUk_ayk.js.map