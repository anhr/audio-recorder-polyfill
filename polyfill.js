!function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=2)}([,,function(t,e,n){document.addEventListener("DOMContentLoaded",function(){document.getElementById("mode").innerText="Polyfill is enabled"}),window.MediaRecorder=n(3)},function(t,e,n){function i(t){this.stream=t,this.state="inactive",this.em=document.createDocumentFragment(),this.encoder=function(t){var e=t.toString().replace(/^function\s*\(\)\s*{/,"").replace(/}$/,""),n=new Blob([e]);return new Worker(URL.createObjectURL(n))}(i.encoder);var e=this;this.encoder.addEventListener("message",function(t){var n=new Event("dataavailable");n.data=new Blob([t.data],{type:e.mimeType}),e.em.dispatchEvent(n),"inactive"===e.state&&e.em.dispatchEvent(new Event("stop"))})}var s=window.AudioContext||window.webkitAudioContext;i.prototype={mimeType:"audio/wav",start:function(t){if("inactive"===this.state){this.state="recording",this.context=new s;var e=this.context.createMediaStreamSource(this.stream),n=this.context.createScriptProcessor(2048,1,1),i=this;n.onaudioprocess=function(t){"recording"===i.state&&i.encoder.postMessage(["encode",t.inputBuffer.getChannelData(0)])},e.connect(n),n.connect(this.context.destination),this.em.dispatchEvent(new Event("start")),t&&(this.slicing=setInterval(function(){"recording"===i.state&&i.requestData()},t))}},stop:function(){"inactive"!==this.state&&(this.requestData(),this.state="inactive",clearInterval(this.slicing))},pause:function(){"recording"===this.state&&(this.state="paused",this.em.dispatchEvent(new Event("pause")))},resume:function(){"paused"===this.state&&(this.state="recording",this.em.dispatchEvent(new Event("resume")))},requestData:function(){"inactive"!==this.state&&this.encoder.postMessage(["dump",this.context.sampleRate])},addEventListener:function(){this.em.addEventListener.apply(this.em,arguments)},removeEventListener:function(){this.em.removeEventListener.apply(this.em,arguments)},dispatchEvent:function(){this.em.dispatchEvent.apply(this.em,arguments)}},i.isTypeSupported=function(t){return/audio\/wave?/.test(t)},i.notSupported=!navigator.mediaDevices||!s,i.encoder=n(4),t.exports=i},function(t,e){t.exports=function(){var t=[];onmessage=function(e){"encode"===e.data[0]?function(e){for(var n=e.length,i=new Uint8Array(2*n),s=0;s<n;s++){var a=2*s,r=e[s];r>1?r=1:r<-1&&(r=-1),r*=32768,i[a]=r,i[a+1]=r>>8}t.push(i)}(e.data[1]):function(e){var n=t.length?t[0].length:0,i=t.length*n,s=new Uint8Array(44+i),a=new DataView(s.buffer);a.setUint32(0,1380533830,!1),a.setUint32(4,36+i,!0),a.setUint32(8,1463899717,!1),a.setUint32(12,1718449184,!1),a.setUint32(16,16,!0),a.setUint16(20,1,!0),a.setUint16(22,1,!0),a.setUint32(24,e,!0),a.setUint32(28,2*e,!0),a.setUint16(32,2,!0),a.setUint16(34,16,!0),a.setUint32(36,1684108385,!1),a.setUint32(40,i,!0);for(var r=0;r<t.length;r++)s.set(t[r],r*n+44);t=[],postMessage(s.buffer,[s.buffer])}(e.data[1])}}}]);