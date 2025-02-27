/*! For license information please see 149.0faa7.bundule.js.LICENSE.txt */
"use strict";(self.webpackChunkdapp_interface_demo=self.webpackChunkdapp_interface_demo||[]).push([[149],{2824:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.add5L=e.add5H=e.add4H=e.add4L=e.add3H=e.add3L=e.rotlBL=e.rotlBH=e.rotlSL=e.rotlSH=e.rotr32L=e.rotr32H=e.rotrBL=e.rotrBH=e.rotrSL=e.rotrSH=e.shrSL=e.shrSH=e.toBig=void 0,e.fromBig=o,e.split=s,e.add=L;const n=BigInt(2**32-1),r=BigInt(32);function o(t,e=!1){return e?{h:Number(t&n),l:Number(t>>r&n)}:{h:0|Number(t>>r&n),l:0|Number(t&n)}}function s(t,e=!1){let n=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let s=0;s<t.length;s++){const{h:i,l:c}=o(t[s],e);[n[s],r[s]]=[i,c]}return[n,r]}const i=(t,e)=>BigInt(t>>>0)<<r|BigInt(e>>>0);e.toBig=i;const c=(t,e,n)=>t>>>n;e.shrSH=c;const a=(t,e,n)=>t<<32-n|e>>>n;e.shrSL=a;const u=(t,e,n)=>t>>>n|e<<32-n;e.rotrSH=u;const h=(t,e,n)=>t<<32-n|e>>>n;e.rotrSL=h;const f=(t,e,n)=>t<<64-n|e>>>n-32;e.rotrBH=f;const d=(t,e,n)=>t>>>n-32|e<<64-n;e.rotrBL=d;const l=(t,e)=>e;e.rotr32H=l;const p=(t,e)=>t;e.rotr32L=p;const y=(t,e,n)=>t<<n|e>>>32-n;e.rotlSH=y;const w=(t,e,n)=>e<<n|t>>>32-n;e.rotlSL=w;const g=(t,e,n)=>e<<n-32|t>>>64-n;e.rotlBH=g;const b=(t,e,n)=>t<<n-32|e>>>64-n;function L(t,e,n,r){const o=(e>>>0)+(r>>>0);return{h:t+n+(o/2**32|0)|0,l:0|o}}e.rotlBL=b;const k=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0);e.add3L=k;const B=(t,e,n,r)=>e+n+r+(t/2**32|0)|0;e.add3H=B;const _=(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0);e.add4L=_;const H=(t,e,n,r,o)=>e+n+r+o+(t/2**32|0)|0;e.add4H=H;const x=(t,e,n,r,o)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(o>>>0);e.add5L=x;const O=(t,e,n,r,o,s)=>e+n+r+o+s+(t/2**32|0)|0;e.add5H=O;const S={fromBig:o,split:s,toBig:i,shrSH:c,shrSL:a,rotrSH:u,rotrSL:h,rotrBH:f,rotrBL:d,rotr32H:l,rotr32L:p,rotlSH:y,rotlSL:w,rotlBH:g,rotlBL:b,add:L,add3L:k,add3H:B,add4L:_,add4H:H,add5H:O,add5L:x};e.default=S},8543:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.crypto=void 0,e.crypto="object"==typeof globalThis&&"crypto"in globalThis?globalThis.crypto:void 0},35149:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.shake256=e.shake128=e.keccak_512=e.keccak_384=e.keccak_256=e.keccak_224=e.sha3_512=e.sha3_384=e.sha3_256=e.sha3_224=e.Keccak=void 0,e.keccakP=L;const r=n(79931),o=n(2824),s=n(44665),i=[],c=[],a=[],u=BigInt(0),h=BigInt(1),f=BigInt(2),d=BigInt(7),l=BigInt(256),p=BigInt(113);for(let t=0,e=h,n=1,r=0;t<24;t++){[n,r]=[r,(2*n+3*r)%5],i.push(2*(5*r+n)),c.push((t+1)*(t+2)/2%64);let o=u;for(let t=0;t<7;t++)e=(e<<h^(e>>d)*p)%l,e&f&&(o^=h<<(h<<BigInt(t))-h);a.push(o)}const[y,w]=(0,o.split)(a,!0),g=(t,e,n)=>n>32?(0,o.rotlBH)(t,e,n):(0,o.rotlSH)(t,e,n),b=(t,e,n)=>n>32?(0,o.rotlBL)(t,e,n):(0,o.rotlSL)(t,e,n);function L(t,e=24){const n=new Uint32Array(10);for(let r=24-e;r<24;r++){for(let e=0;e<10;e++)n[e]=t[e]^t[e+10]^t[e+20]^t[e+30]^t[e+40];for(let e=0;e<10;e+=2){const r=(e+8)%10,o=(e+2)%10,s=n[o],i=n[o+1],c=g(s,i,1)^n[r],a=b(s,i,1)^n[r+1];for(let n=0;n<50;n+=10)t[e+n]^=c,t[e+n+1]^=a}let e=t[2],o=t[3];for(let n=0;n<24;n++){const r=c[n],s=g(e,o,r),a=b(e,o,r),u=i[n];e=t[u],o=t[u+1],t[u]=s,t[u+1]=a}for(let e=0;e<50;e+=10){for(let r=0;r<10;r++)n[r]=t[e+r];for(let r=0;r<10;r++)t[e+r]^=~n[(r+2)%10]&n[(r+4)%10]}t[0]^=y[r],t[1]^=w[r]}n.fill(0)}class k extends s.Hash{constructor(t,e,n,o=!1,i=24){if(super(),this.blockLen=t,this.suffix=e,this.outputLen=n,this.enableXOF=o,this.rounds=i,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,(0,r.anumber)(n),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=(0,s.u32)(this.state)}keccak(){s.isLE||(0,s.byteSwap32)(this.state32),L(this.state32,this.rounds),s.isLE||(0,s.byteSwap32)(this.state32),this.posOut=0,this.pos=0}update(t){(0,r.aexists)(this);const{blockLen:e,state:n}=this,o=(t=(0,s.toBytes)(t)).length;for(let r=0;r<o;){const s=Math.min(e-this.pos,o-r);for(let e=0;e<s;e++)n[this.pos++]^=t[r++];this.pos===e&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:t,suffix:e,pos:n,blockLen:r}=this;t[n]^=e,128&e&&n===r-1&&this.keccak(),t[r-1]^=128,this.keccak()}writeInto(t){(0,r.aexists)(this,!1),(0,r.abytes)(t),this.finish();const e=this.state,{blockLen:n}=this;for(let r=0,o=t.length;r<o;){this.posOut>=n&&this.keccak();const s=Math.min(n-this.posOut,o-r);t.set(e.subarray(this.posOut,this.posOut+s),r),this.posOut+=s,r+=s}return t}xofInto(t){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(t)}xof(t){return(0,r.anumber)(t),this.xofInto(new Uint8Array(t))}digestInto(t){if((0,r.aoutput)(t,this),this.finished)throw new Error("digest() was already called");return this.writeInto(t),this.destroy(),t}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(t){const{blockLen:e,suffix:n,outputLen:r,rounds:o,enableXOF:s}=this;return t||(t=new k(e,n,r,s,o)),t.state32.set(this.state32),t.pos=this.pos,t.posOut=this.posOut,t.finished=this.finished,t.rounds=o,t.suffix=n,t.outputLen=r,t.enableXOF=s,t.destroyed=this.destroyed,t}}e.Keccak=k;const B=(t,e,n)=>(0,s.wrapConstructor)((()=>new k(e,t,n)));e.sha3_224=B(6,144,28),e.sha3_256=B(6,136,32),e.sha3_384=B(6,104,48),e.sha3_512=B(6,72,64),e.keccak_224=B(1,144,28),e.keccak_256=B(1,136,32),e.keccak_384=B(1,104,48),e.keccak_512=B(1,72,64);const _=(t,e,n)=>(0,s.wrapXOFConstructorWithOpts)(((r={})=>new k(e,t,void 0===r.dkLen?n:r.dkLen,!0)));e.shake128=_(31,168,16),e.shake256=_(31,136,32)},44665:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Hash=e.nextTick=e.byteSwapIfBE=e.isLE=void 0,e.isBytes=function(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&"Uint8Array"===t.constructor.name},e.u8=function(t){return new Uint8Array(t.buffer,t.byteOffset,t.byteLength)},e.u32=function(t){return new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4))},e.createView=function(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)},e.rotr=function(t,e){return t<<32-e|t>>>e},e.rotl=function(t,e){return t<<e|t>>>32-e>>>0},e.byteSwap=s,e.byteSwap32=function(t){for(let e=0;e<t.length;e++)t[e]=s(t[e])},e.bytesToHex=function(t){(0,o.abytes)(t);let e="";for(let n=0;n<t.length;n++)e+=i[t[n]];return e},e.hexToBytes=function(t){if("string"!=typeof t)throw new Error("hex string expected, got "+typeof t);const e=t.length,n=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);const r=new Uint8Array(n);for(let e=0,o=0;e<n;e++,o+=2){const n=a(t.charCodeAt(o)),s=a(t.charCodeAt(o+1));if(void 0===n||void 0===s){const e=t[o]+t[o+1];throw new Error('hex string expected, got non-hex character "'+e+'" at index '+o)}r[e]=16*n+s}return r},e.asyncLoop=async function(t,n,r){let o=Date.now();for(let s=0;s<t;s++){r(s);const t=Date.now()-o;t>=0&&t<n||(await(0,e.nextTick)(),o+=t)}},e.utf8ToBytes=u,e.toBytes=h,e.concatBytes=function(...t){let e=0;for(let n=0;n<t.length;n++){const r=t[n];(0,o.abytes)(r),e+=r.length}const n=new Uint8Array(e);for(let e=0,r=0;e<t.length;e++){const o=t[e];n.set(o,r),r+=o.length}return n},e.checkOpts=function(t,e){if(void 0!==e&&"[object Object]"!=={}.toString.call(e))throw new Error("Options should be object or undefined");return Object.assign(t,e)},e.wrapConstructor=function(t){const e=e=>t().update(h(e)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e},e.wrapConstructorWithOpts=function(t){const e=(e,n)=>t(n).update(h(e)).digest(),n=t({});return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=e=>t(e),e},e.wrapXOFConstructorWithOpts=function(t){const e=(e,n)=>t(n).update(h(e)).digest(),n=t({});return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=e=>t(e),e},e.randomBytes=function(t=32){if(r.crypto&&"function"==typeof r.crypto.getRandomValues)return r.crypto.getRandomValues(new Uint8Array(t));if(r.crypto&&"function"==typeof r.crypto.randomBytes)return r.crypto.randomBytes(t);throw new Error("crypto.getRandomValues must be defined")};const r=n(8543),o=n(79931);function s(t){return t<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255}e.isLE=68===new Uint8Array(new Uint32Array([287454020]).buffer)[0],e.byteSwapIfBE=e.isLE?t=>t:t=>s(t);const i=Array.from({length:256},((t,e)=>e.toString(16).padStart(2,"0")));const c={_0:48,_9:57,A:65,F:70,a:97,f:102};function a(t){return t>=c._0&&t<=c._9?t-c._0:t>=c.A&&t<=c.F?t-(c.A-10):t>=c.a&&t<=c.f?t-(c.a-10):void 0}function u(t){if("string"!=typeof t)throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array((new TextEncoder).encode(t))}function h(t){return"string"==typeof t&&(t=u(t)),(0,o.abytes)(t),t}e.nextTick=async()=>{};e.Hash=class{clone(){return this._cloneInto()}}},79931:(t,e)=>{function n(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function r(t,...e){if(!((n=t)instanceof Uint8Array||ArrayBuffer.isView(n)&&"Uint8Array"===n.constructor.name))throw new Error("Uint8Array expected");var n;if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}Object.defineProperty(e,"__esModule",{value:!0}),e.anumber=n,e.abytes=r,e.ahash=function(t){if("function"!=typeof t||"function"!=typeof t.create)throw new Error("Hash should be wrapped by utils.wrapConstructor");n(t.outputLen),n(t.blockLen)},e.aexists=function(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")},e.aoutput=function(t,e){r(t);const n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}}}]);