(this["webpackJsonpmind-map"]=this["webpackJsonpmind-map"]||[]).push([[0],{136:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),c=n.n(o),i=(n(85),n(26)),d=n(36),l=n.n(d),s=n(53),u=n(37),f=n(67),p=n(19),m=(n(56),n(14)),h=function(e){var t=e.node,n=(e.id,e.updateEdges),a=e.setSelectedNode,o=e.selectedNodeId,c=e.updateNode;e.label,e.bibEntryId;return r.a.createElement(m.Group,{id:t.id,x:t.x_pos,y:t.y_pos,draggable:!0,onDragMove:function(e){t.x_pos=e.target.x(),t.y_pos=e.target.y(),c(t),n(t.id,e.target.x(),e.target.y())},onClick:function(){return a(t)}},r.a.createElement(m.Rect,{radius:{x:50,y:30},width:150,height:70,offsetX:75,offsetY:35,cornerRadius:20,fill:o===t.id?"#a2b8e5":"white",stroke:"black"}),r.a.createElement(m.Text,{text:t.label,offsetX:75,offsetY:45,align:"center",verticalAlign:"middle",width:150,height:70}),r.a.createElement(m.Group,{width:150,height:70,offsetX:65,offsetY:-15},t.citationKey&&r.a.createElement(m.Rect,{width:10,height:10,fill:"red"})))},b=function(e){var t=e.x1,n=e.y1,a=e.x2,o=e.y2,c={st:[t,n],ct:[t,o,t,o],en:[a,o]};return r.a.createElement(m.Shape,{stroke:"#50618F",strokeWidth:6,lineCap:"round",sceneFunc:function(e,t){e.beginPath(),e.moveTo.apply(e,Object(i.a)(c.st)),e.bezierCurveTo.apply(e,Object(i.a)(c.ct).concat(Object(i.a)(c.en))),e.strokeShape(t)}})},g=n(164),v=function(e){var t=e.nodes,n=e.edges,a=e.updateEdges,o=e.setSelectedNode,c=e.selectedNodeId,i=e.updateNode;window.innerWidth,window.innerHeight,Object(g.a)({canvas:{left:"25%",position:"absolute"}})();return r.a.createElement(m.Group,{x:310},n.map((function(e){return r.a.createElement(b,{x1:e.startX,y1:e.startY,x2:e.endX,y2:e.endY})})),t.map((function(e){return r.a.createElement(h,{node:e,key:e.id,label:e.label,id:e.id,x:e.x_pos,y:e.y_pos,colour:e.colour,updateEdges:a,selectedNodeId:c,setSelectedNode:o,updateNode:i})})))},E=r.a.memo((function(e){var t=e.references,n=(e.setReferences,e.addNode),o=e.layerRef,c=e.stageRef,i=(Object(g.a)({table:{position:"absolute",left:0,top:0,maxWidth:"25%",overflow:"hidden",tableLayout:"fixed",height:"100vh",backgroundColor:"#e1e1e1"}})(),t.length),d=r.a.useRef([]);return d.current.length!==i&&(d.current=Array(i).fill().map((function(e,t){return d.current[t]||Object(a.createRef)()}))),r.a.createElement(m.Group,null,t.map((function(e,t){return r.a.createElement(m.Group,null,r.a.createElement(m.Group,{y:110*t},r.a.createElement(m.Rect,{width:300,height:100,fill:"#dddddd"}),r.a.createElement(m.Text,{text:e.title,x:150,y:50,width:100,height:60})),r.a.createElement(m.Group,{opacity:.5,draggable:!0,ref:d.current[t],position:{x:0,y:110*t},onDragEnd:function(){d.current[t].current.position({x:0,y:110*t}),o.current.draw();var a=c.current.getPointerPosition(),r=a.x,i=a.y;n(e,r-300,i,e.citekey)}},r.a.createElement(m.Rect,{width:300,height:100,fill:"#dddddd"}),r.a.createElement(m.Text,{text:e.title,x:150,y:50,width:100,height:60})))})))}));function y(){var e=window;return{windowWidth:e.innerWidth,windowHeight:e.innerHeight}}var w=n(175),j=r.a.memo((function(e){var t=e.addNode,n=e.saveMap,a=e.deleteNode;console.log("toolbar render");var o=Object(g.a)({toolbar:{width:"100%",textAlign:"center"}})();return r.a.createElement("div",{className:o.toolbar},r.a.createElement(w.a,{onClick:function(){return t()}},"Add Node"),r.a.createElement(w.a,{onClick:function(){return n()}},"Save Map"),r.a.createElement(w.a,{onClick:a},"Delete Node"))})),x=n(168),O=n(170),N=n(171),k=n(172),I=n(173),_=n(169),R=n(174),S=function(e){var t=e.node,n=e.reference,o=e.updateNode,c=Object(g.a)({panel:{position:"absolute",top:10,right:10,width:"300px",height:"400px",backgroundColor:"#dddddd"}})(),i=Object(a.useRef)(),d=Object(a.useState)(),l=Object(p.a)(d,2),s=l[0],u=l[1];Object(a.useEffect)((function(){u(t.label),i.current.focus()}),[t]);return r.a.createElement(x.a,{className:c.panel},r.a.createElement(_.a,{gutterBottom:!0,variant:"h4",component:"h4",style:{textAlign:"center"}},"Node Info"),r.a.createElement(R.a,{style:{width:"90%",marginBottom:"20px",marginLeft:"5%"},id:"standard-basic",label:"Label",value:s,type:"text",inputRef:i,onChange:function(e){u(e.target.value),t.label=e.target.value,o(t)}}),n&&r.a.createElement(O.a,{className:c.table,"aria-label":"simple table"},r.a.createElement(_.a,{gutterBottom:!0,style:{marginLeft:"5%"},variant:"h5",component:"h5"},"BibEntry"),r.a.createElement(N.a,null,r.a.createElement(k.a,{key:n.title},r.a.createElement(I.a,{component:"td",scope:"row"},"Title:"),r.a.createElement(I.a,{component:"td",scope:"row"},n.title)),r.a.createElement(k.a,{key:n.author},r.a.createElement(I.a,{component:"td",scope:"row"},"Author:"),r.a.createElement(I.a,{component:"td",scope:"row"},n.author)),r.a.createElement(k.a,{key:n.year},r.a.createElement(I.a,{component:"td",scope:"row"},"Year:"),r.a.createElement(I.a,{component:"td",scope:"row"},n.year)))))};var Y=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)([]),d=Object(p.a)(c,2),h=d[0],b=d[1],w=Object(a.useState)([{}]),x=Object(p.a)(w,2),O=x[0],N=x[1],k=Object(a.useState)({}),I=Object(p.a)(k,2),_=I[0],R=I[1],Y=Object(a.useState)(4),X=Object(p.a)(Y,2),C=(X[0],X[1],function(e){var t=n.map((function(t){return e.id==t.id?e:t}));o(t)}),T=Object(g.a)({wrapper:{position:"relative"},canvas:{left:"25%",position:"absolute"}})(),W=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("http://localhost:9898/libraries/current/map").then((function(e){return e.json()})).then((function(e){console.log(e),o(e.nodes),b(e.edges.map((function(t){var n=e.nodes.find((function(e){return e.id===t.node1_Id}));console.log(n);var a=e.nodes.find((function(e){return e.id===t.node2_Id}));return console.log(a),{startId:t.node1_Id,startX:n.x_pos,startY:n.y_pos,endId:t.node2_Id,endX:a.x_pos,endY:a.y_pos}})))})).catch(console.log);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(s.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("http://localhost:9898/libraries/current/entries").then((function(e){return e.json()})).then((function(e){N(e)})).catch(console.log);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){G(),W()}),[]);var L=function(e,t,a){if(void 0!==_.id){var r,c;console.log(_),void 0===e?r="New Node":(c=e.citekey,r=e.title),void 0===t&&(t=0),void 0===a&&(a=400);var d={id:Math.floor(1e9*Math.random()),label:r,x_pos:t,y_pos:a,citationKey:c};o([].concat(Object(i.a)(n),[d]));var l={startId:_.id,startX:_.x_pos,startY:_.y_pos,endId:d.id,endX:d.x_pos,endY:d.y_pos};b([].concat(Object(i.a)(h),[l]))}},M=Object(a.useRef)(),A=Object(a.useRef)(),B=function(){var e=Object(a.useState)(y()),t=Object(p.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){function e(){r(y())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n}(),H=B.windowHeight,P=B.windowWidth;return r.a.createElement("div",{className:T.wrapper},r.a.createElement(j,{addNode:L,saveMap:function(){console.log(n);var e=h.map((function(e){return{node1_Id:e.startId,node2_Id:e.endId}})),t=JSON.stringify({nodes:n,edges:e});console.log(t),fetch("http://localhost:9898/libraries/current/map",{method:"PUT",headers:{"Content-Type":"application/json"},body:t})},deleteNode:function(){void 0!==_.id&&(o(n.filter((function(e){return e.id!==_.id}))),b(h.filter((function(e){return e.startId!==_.id&&e.endId!==_.id}))))}}),r.a.createElement(m.Stage,{width:P,height:H,ref:A},r.a.createElement(m.Layer,{ref:M},r.a.createElement(E,{references:O,setReferences:N,addNode:L,layerRef:M,stageRef:A}),r.a.createElement(v,{nodes:n,edges:h,updateEdges:function(e,t,n){var a=h.map((function(a){return a.startId===e?Object(u.a)(Object(u.a)({},a),{},{startX:t,startY:n}):a.endId===e?Object(u.a)(Object(u.a)({},a),{},{endX:t,endY:n}):a}));b(a)},updateNode:C,selectedNodeId:_.id,setSelectedNode:R}))),_.id?r.a.createElement(S,{node:_,reference:function(e){var t,n=Object(f.a)(O);try{for(n.s();!(t=n.n()).done;){var a=t.value;if(a.citekey===e)return a}}catch(r){n.e(r)}finally{n.f()}}(_.citationKey),updateNode:C}):r.a.createElement(S,{node:_,updateNode:C}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},56:function(e,t,n){},81:function(e,t,n){e.exports=n(136)},85:function(e,t,n){}},[[81,1,2]]]);
//# sourceMappingURL=main.de82520a.chunk.js.map