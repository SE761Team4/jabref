(this["webpackJsonpmind-map"]=this["webpackJsonpmind-map"]||[]).push([[0],{109:function(e,t,n){},169:function(e,t,n){e.exports=n(388)},173:function(e,t,n){},219:function(e,t,n){},220:function(e,t,n){},387:function(e,t,n){},388:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),i=n.n(o),c=(n(173),n(155)),s=n(41),l=n(59),d=n.n(l),u=n(30),m=n(103),f=n(17),p=(n(109),n(18)),h=n(36),g=n.n(h),E="READ",b="TO_READ",y="HIGH_PRIORITY",v="MEDIUM_PRIORITY",N="LOW_PRIORITY",w="FAVOURITE",O="NOT_FAVOURITE",k=function(e){var t=e.node,n=e.updateNode,a=g()("./assets/Read.png"),o=Object(f.a)(a,1)[0],i=g()("./assets/ToRead.png"),c=Object(f.a)(i,1)[0],s=g()("./assets/HighPriority.png"),l=Object(f.a)(s,1)[0],d=g()("./assets/MediumPriority.png"),u=Object(f.a)(d,1)[0],m=g()("./assets/LowPriority.png"),h=Object(f.a)(m,1)[0],k=g()("./assets/Favourited.png"),j=Object(f.a)(k,1)[0],I=g()("./assets/NotFavourited.png"),x=Object(f.a)(I,1)[0];return r.a.createElement(p.Group,{width:170,height:80,offsetX:75,offsetY:-20},r.a.createElement(p.Image,{image:t.icons.includes(E)?o:c,width:24,height:24,offsetX:-30,offsetY:10,onClick:function(){if(t.icons){var e=[];t.icons.includes(E)?(e=t.icons.filter((function(e){return e!==E}))).push(b):(e=t.icons.filter((function(e){return e!==b}))).push(E),t.icons=e,n(t)}}}),t.icons.includes(y)&&r.a.createElement(p.Image,{image:l,width:24,height:24,offsetX:0,offsetY:10}),t.icons.includes(v)&&r.a.createElement(p.Image,{image:u,width:24,height:24,offsetX:0,offsetY:10}),t.icons.includes(N)&&r.a.createElement(p.Image,{image:h,width:24,height:24,offsetX:0,offsetY:10}),r.a.createElement(p.Image,{image:t.icons.includes(w)?j:x,width:24,height:24,offsetX:-60,offsetY:10,onClick:function(){if(t.icons){var e=[];t.icons.includes(w)?(e=t.icons.filter((function(e){return e!==w}))).push(O):(e=t.icons.filter((function(e){return e!==O}))).push(w),t.icons=e,n(t)}}}))};function j(e){if(e)return e.length>60?"".concat(e.substring(0,57),"..."):e}var I=function(e){var t=e.node,n=e.updateEdges,a=e.setSelectedNode,o=e.selectedNodeId,i=e.updateNode,c=(e.label,e.bibEntryId,e.isInSearch);return r.a.createElement(p.Group,{id:t.id,x:t.x_pos,y:t.y_pos,draggable:!0,onDragMove:function(e){t.x_pos=e.target.x(),t.y_pos=e.target.y(),i(t),n(t.id,e.target.x(),e.target.y())},onClick:function(){return a(t)},onMouseEnter:function(e){e.target.getStage().container().style.cursor="pointer"},onMouseLeave:function(e){e.target.getStage().container().style.cursor="default"}},r.a.createElement(p.Rect,{radius:{x:50,y:30},width:170,height:80,offsetX:85,offsetY:40,cornerRadius:20,fill:"white",strokeWidth:4}),r.a.createElement(p.Rect,{radius:{x:50,y:30},width:170,height:80,offsetX:85,offsetY:40,cornerRadius:20,fill:c?"#3f51b5":o===t.id?"#a2b8e5":void 0==t.colour?"white":t.colour+"80",stroke:void 0===t.colour?"#6E6E6E":t.colour,strokeWidth:4}),r.a.createElement(p.Text,{text:j(t.label),offsetX:85,offsetY:50,align:"center",verticalAlign:"middle",width:170,height:80}),r.a.createElement(k,{node:t,updateNode:i}))},x=function(e){var t=e.x1,n=e.y1,a=e.x2,o=e.y2,i={st:[t,n],ct:[t,o,t,o],en:[a,o]};return r.a.createElement(p.Shape,{stroke:"#50618F",strokeWidth:6,lineCap:"round",sceneFunc:function(e,t){e.beginPath(),e.moveTo.apply(e,Object(s.a)(i.st)),e.bezierCurveTo.apply(e,Object(s.a)(i.ct).concat(Object(s.a)(i.en))),e.strokeShape(t)}})},C=function(e){var t=e.nodes,n=e.edges,a=e.updateEdges,o=e.setSelectedNode,i=e.selectedNodeId,c=e.updateNode;return r.a.createElement(p.Group,{x:310},n.map((function(e){return r.a.createElement(x,{key:e.startID,x1:e.startX,y1:e.startY,x2:e.endX,y2:e.endY})})),t.map((function(e){return r.a.createElement(I,{node:e,key:e.id,label:e.label,x:e.x_pos,y:e.y_pos,colour:e.colour,updateEdges:a,selectedNodeId:i,setSelectedNode:o,updateNode:c,isInSearch:e.isInSearch})})))};function S(){var e=window;return{windowWidth:e.innerWidth,windowHeight:e.innerHeight}}function _(){var e=Object(a.useState)(S()),t=Object(f.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){function e(){r(S())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}var R=n(430),Y=(n(219),n(389)),T=n(425),P=n(161),L=n(438),X=n(429),A=(n(220),"High priority"),M="Medium priority",D="Low priority",z=r.a.memo((function(e){var t=e.selectedNode,n=e.updateNode,a=r.a.useState(null),o=Object(f.a)(a,2),i=o[0],c=o[1],s=function(){c(null)},l=function(e){if(t.icons)if(e.target.textContent===A){var a=[];(a=t.icons.filter((function(e){return e!==v&&e!==N}))).push(y),t.icons=a,n(t)}else if(e.target.textContent===M){var r=[];(r=t.icons.filter((function(e){return e!==y&&e!==N}))).push(v),t.icons=r,n(t)}else if(e.target.textContent===D){var o=[];(o=t.icons.filter((function(e){return e!==v&&e!==y}))).push(N),t.icons=o,n(t)}s()};return r.a.createElement("div",{className:"priority-menu"},r.a.createElement(T.a,{onClick:function(e){c(e.currentTarget)}},r.a.createElement("img",{src:"./assets/LowPriority.png",className:"main-button-icon"})),r.a.createElement(P.a,{id:"customized-menu",anchorEl:i,keepMounted:!0,open:Boolean(i),onClose:s},r.a.createElement(L.a,{onClick:l},r.a.createElement("img",{src:"./assets/LowPriority.png",alt:"low-priority",className:"menu-buttons",id:"low-priority"}),r.a.createElement(X.a,{primary:D})),r.a.createElement(L.a,{onClick:l},r.a.createElement("img",{src:"./assets/MediumPriority.png",alt:"medium-priority",className:"menu-buttons",id:"medium-priority"}),r.a.createElement(X.a,{primary:M})),r.a.createElement(L.a,{onClick:l},r.a.createElement("img",{src:"./assets/HighPriority.png",alt:"high-priority",className:"menu-buttons",id:"high-priority"}),r.a.createElement(X.a,{primary:A}))))})),B=r.a.memo((function(e){var t=e.selectedNode,n=e.updateNode,o=e.addNode,i=e.saveMap,c=e.deleteNode,s=e.searchNodes,l=e.linking,d=e.setLinking,u=e.unlinking,m=e.setUnlinking,f=Object(a.useRef)(null);window.onkeydown=function(e){(114===e.keyCode||e.ctrlKey&&70===e.keyCode)&&(e.preventDefault(),f.current.focus())};return r.a.createElement(R.a,{className:"toolbar-proportions",component:Y.a},r.a.createElement("div",{className:"buttons-container"},r.a.createElement(T.a,{size:"small","aria-label":"add",onClick:function(){return o()}},r.a.createElement("img",{src:"./assets/Add.png",alt:"Add",className:"toolbar-button"})),r.a.createElement(T.a,{size:"small",onClick:function(){return d(!l)},color:l?"primary":"default"},r.a.createElement("img",{src:"./assets/Link.png",alt:"Link",className:"toolbar-button "})),r.a.createElement(T.a,{size:"small",onClick:function(){return m(!u)},color:l?"primary":"default"},r.a.createElement("img",{src:"./assets/Unlink.png",alt:"Unlink",className:"toolbar-button "})),r.a.createElement("div",{className:"divider"}),r.a.createElement(z,{selectedNode:t,updateNode:n}),r.a.createElement(T.a,{size:"small",onClick:function(){if(t.icons){var e=[];t.icons.includes(E)?(e=t.icons.filter((function(e){return e!==E}))).push(b):(e=t.icons.filter((function(e){return e!==b}))).push(E),t.icons=e,n(t)}}},r.a.createElement("img",{src:"./assets/MarkRead.png",alt:"Read Status",className:"toolbar-button"})),r.a.createElement(T.a,{size:"small",onClick:function(){if(t.icons){var e=[];t.icons.includes(w)?(e=t.icons.filter((function(e){return e!==w}))).push(O):(e=t.icons.filter((function(e){return e!==O}))).push(w),t.icons=e,n(t)}}},r.a.createElement("img",{src:"./assets/Favourite.png",alt:"Favourite",className:"toolbar-button"})),r.a.createElement("div",{className:"divider"}),r.a.createElement(T.a,{size:"small",onClick:c},r.a.createElement("img",{src:"./assets/Trash.png",alt:"Delete Node",className:"trash-button"}))),r.a.createElement("div",{className:"search-container"},r.a.createElement(T.a,{size:"small",onClick:function(){return i()},style:{paddingLeft:"0.5em"}},r.a.createElement("img",{src:"./assets/Save.png",alt:"Priority",className:"toolbar-button save-button"})),r.a.createElement("input",{className:"search-bar",id:"outlined-basic",onChange:s,ref:f,placeholder:"Search..."})))})),F=n(431),H=n(160),W=n(432),U=n(433),G=n(434),J=n(435),K=n(436),V=n(79),$=n(437),q=function(e){var t=e.node,n=e.reference,o=e.updateNode,i=e.changeNodeColor,c=Object(F.a)({panel:{position:"absolute",top:"10%",right:"1%",width:"300px",backgroundColor:"white","& td":{border:"none",padding:"10px"}}})(),s=Object(a.useRef)(),l=Object(a.useState)(),d=Object(f.a)(l,2),u=d[0],m=d[1];Object(a.useEffect)((function(){m(t.label),s.current.focus()}),[t]);return r.a.createElement(W.a,{className:c.panel},r.a.createElement(V.a,{gutterBottom:!0,variant:"h4",component:"h4",style:{textAlign:"center"}},"Node Info"),r.a.createElement($.a,{style:{width:"calc(100% - 20px)",marginBottom:"10px",marginLeft:"10px"},InputLabelProps:{shrink:!0},id:"standard-basic",label:"Label",value:u,type:"text",inputRef:s,onChange:function(e){m(e.target.value),t.label=e.target.value,o(t)}}),r.a.createElement(U.a,{key:"colorEditor"},r.a.createElement(G.a,{component:"td",scope:"row",style:{border:"none",color:"#3f51b5"}},"Color:"),r.a.createElement(G.a,{component:"td",scope:"row",style:{border:"none"}},r.a.createElement(H.CirclePicker,{colors:["#BA1D2A","#FC6A38","#55773B","#279DA3","#0E5756"],onChange:i}))),n&&r.a.createElement(J.a,{className:c.table,"aria-label":"simple table"},r.a.createElement(V.a,{gutterBottom:!0,style:{paddingLeft:"10px",margin:0},variant:"h5",component:"h5"},"BibEntry"),r.a.createElement(K.a,null,r.a.createElement(U.a,{key:n.title},r.a.createElement(G.a,{component:"td",scope:"row",style:{color:"#3f51b5"}},"Title:"),r.a.createElement(G.a,{component:"td",scope:"row"},n.title)),r.a.createElement(U.a,{key:n.author},r.a.createElement(G.a,{component:"td",scope:"row",style:{color:"#3f51b5"}},"Author:"),r.a.createElement(G.a,{component:"td",scope:"row"},n.author)),r.a.createElement(U.a,{key:n.year},r.a.createElement(G.a,{component:"td",scope:"row",style:{color:"#3f51b5"}},"Year:"),r.a.createElement(G.a,{component:"td",scope:"row"},n.year)))))},Q=(n(387),r.a.memo((function(e){var t=e.references,n=e.draggedRow,a=_().windowHeight;return r.a.createElement("div",{className:"table-proportions",style:{height:a,backgroundColor:"#f9f9f9"}},r.a.createElement(W.a,{style:{width:"99.5%"}},r.a.createElement(V.a,{gutterBottom:!0,variant:"h4",component:"h4",style:{textAlign:"center"}},"References"),r.a.createElement("div",null,r.a.createElement(J.a,{hover:!0,size:"sm",className:"table-striped"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Author"),r.a.createElement("th",null,"Year"))),r.a.createElement("tbody",null,t&&t.map((function(e){return r.a.createElement(U.a,{key:e,draggable:!0,onDragStart:function(t){n.current=e}},r.a.createElement("td",{className:"displayedText"},e.title),r.a.createElement("td",{className:"displayedText"},e.author),r.a.createElement("td",{className:"displayedText"},e.year))})))))))})));var Z=function(){var e=Object(a.useState)([]),t=Object(f.a)(e,2),n=t[0],o=t[1],i=Object(a.useState)([]),l=Object(f.a)(i,2),h=l[0],g=l[1],E=Object(a.useState)([{}]),y=Object(f.a)(E,2),v=y[0],w=y[1],k=Object(a.useState)({}),j=Object(f.a)(k,2),I=j[0],x=j[1],S=Object(a.useState)(!1),R=Object(f.a)(S,2),Y=R[0],T=R[1],P=Object(a.useState)(!1),L=Object(f.a)(P,2),X=L[0],A=L[1];Object(a.useEffect)((function(){D(),M()}),[]);var M=function(){var e=Object(m.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("http://localhost:9898/libraries/current/map").then((function(e){return e.json()})).then((function(e){o(e.nodes.map((function(e){return-1===e.id?Object(u.a)(Object(u.a)({},e),{},{x_pos:ee/8,y_pos:Z/3}):e}))),g(e.edges.map((function(t){var n=e.nodes.find((function(e){return e.id===t.node1_Id})),a=e.nodes.find((function(e){return e.id===t.node2_Id}));return{startId:t.node1_Id,startX:n.x_pos,startY:n.y_pos,endId:t.node2_Id,endX:a.x_pos,endY:a.y_pos}})))})).catch(console.log);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(m.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("http://localhost:9898/libraries/current/entries").then((function(e){return e.json()})).then((function(e){w(e)})).catch(console.log);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),z=function(e){Y||X?X?(F(I,e),A(!1)):Y&&(G(I,e),T(!1),x(e)):x(e)},F=function(e,t){var n=h.filter((function(n){return n.startId===e.id&&n.endId===t.id||n.startId===t.id&&n.endId===e.id}));g(h.filter((function(e){return!n.includes(e)})))},H=function(e){var t=n.map((function(t){return e.id===t.id?e:t}));o(t)},W=function(e){n.forEach((function(t){e.indexOf(t.id)>-1?t.isInSearch=!0:t.isInSearch=!1,H(t)}))},U=function(e,t,a){if(void 0!==I.id){var r,i;void 0===e?r="New Node":(i=e.citekey,r=e.title),void 0===t&&(t=0),void 0===a&&(a=400);var c={id:Math.floor(1e9*Math.random()),label:r,x_pos:t,y_pos:a,citationKey:i,icons:[b,N,O]};o([].concat(Object(s.a)(n),[c])),G(I,c),z(c)}},G=function(e,t){if(e.id!==t.id){var n={startId:e.id,startX:e.x_pos,startY:e.y_pos,endId:t.id,endX:t.x_pos,endY:t.y_pos};g([].concat(Object(s.a)(h),[n]))}},J=Object(a.useRef)(),K=Object(a.useRef)(),V=Object(a.useRef)(),$=_(),Z=$.windowHeight,ee=$.windowWidth;return r.a.createElement("div",{className:"container"},r.a.createElement(Q,{draggedRow:V,addNode:U,references:v,setReferences:w,className:"references"}),r.a.createElement("div",{className:"map-container"},r.a.createElement(B,{selectedNode:I,updateNode:H,addNode:U,saveMap:function(){var e=h.map((function(e){return{node1_Id:e.startId,node2_Id:e.endId}})),t=JSON.stringify({nodes:n,edges:e});fetch("http://localhost:9898/libraries/current/map",{method:"PUT",headers:{"Content-Type":"application/json"},body:t})},deleteNode:function(){void 0!==I.id&&-1!==I.id&&(o(n.filter((function(e){return e.id!==I.id}))),g(h.filter((function(e){return e.startId!==I.id&&e.endId!==I.id}))),x(n[0]))},searchNodes:function(e){var t=e.target.value,a=[];""!==t?(n.forEach((function(e){e.label.indexOf(t)>-1&&a.push(e.id)})),W(a)):W(a)},linking:Y,setLinking:T,unlinking:X,setUnlinking:A}),r.a.createElement("div",{onDrop:function(e){K.current.setPointersPositions(e);var t=K.current.getPointerPosition(),n=t.x,a=t.y;U(V.current,n-.25*Z-75,a)},onDragOver:function(e){return e.preventDefault()}},r.a.createElement(p.Stage,{style:{left:"25%",position:"absolute",top:"72px",margin:0,padding:0},width:.75*ee,height:Z-75,ref:K},r.a.createElement(p.Layer,{ref:J},r.a.createElement(C,{nodes:n,edges:h,updateEdges:function(e,t,n){var a=h.map((function(a){return a.startId===e?Object(u.a)(Object(u.a)({},a),{},{startX:t,startY:n}):a.endId===e?Object(u.a)(Object(u.a)({},a),{},{endX:t,endY:n}):a}));g(a)},updateNode:H,selectedNodeId:I.id,setSelectedNode:z,updateSearchIndex:W})))),I.id?r.a.createElement(q,{node:I,reference:function(e){var t,n=Object(c.a)(v);try{for(n.s();!(t=n.n()).done;){var a=t.value;if(a.citekey===e)return a}}catch(r){n.e(r)}finally{n.f()}}(I.citationKey),updateNode:H,changeNodeColor:function(e){!function(e,t){var a=n.map((function(n){return n.id===e?Object(u.a)(Object(u.a)({},n),{},{colour:t}):n}));o(a)}(I.id,e.hex)}}):r.a.createElement(q,{node:I,updateNode:H})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[169,1,2]]]);
//# sourceMappingURL=main.96c88dda.chunk.js.map