import{r as u,R as g}from"./index-B15hoXzW.js";/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),I=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,s,o)=>o?o.toUpperCase():s.toLowerCase()),f=e=>{const t=I(e);return t.charAt(0).toUpperCase()+t.slice(1)},C=(...e)=>e.filter((t,s,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===s).join(" ").trim(),y=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var A={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=u.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:a="",children:n,iconNode:b,...c},d)=>u.createElement("svg",{ref:d,...A,width:t,height:t,stroke:e,strokeWidth:o?Number(s)*24/Number(t):s,className:C("lucide",a),...!n&&!y(c)&&{"aria-hidden":"true"},...c},[...b.map(([r,l])=>u.createElement(r,l)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.536.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=(e,t)=>{const s=u.forwardRef(({className:o,...a},n)=>u.createElement(L,{ref:n,iconNode:t,className:C(`lucide-${h(f(e))}`,`lucide-${e}`,o),...a}));return s.displayName=f(e),s},m=e=>{let t;const s=new Set,o=(r,l)=>{const i=typeof r=="function"?r(t):r;if(!Object.is(i,t)){const S=t;t=l??(typeof i!="object"||i===null)?i:Object.assign({},t,i),s.forEach(w=>w(t,S))}},a=()=>t,c={setState:o,getState:a,getInitialState:()=>d,subscribe:r=>(s.add(r),()=>s.delete(r))},d=t=e(o,a,c);return c},k=(e=>e?m(e):m),x=e=>e;function j(e,t=x){const s=g.useSyncExternalStore(e.subscribe,g.useCallback(()=>t(e.getState()),[e,t]),g.useCallback(()=>t(e.getInitialState()),[e,t]));return g.useDebugValue(s),s}const p=e=>{const t=k(e),s=o=>j(t,o);return Object.assign(s,t),s},E=(e=>e?p(e):p),R=E(e=>({isLoggedIn:!1,setIsLoggedIn:t=>e({isLoggedIn:t})}));export{O as c,R as u};
