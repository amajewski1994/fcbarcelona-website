"use strict";(self.webpackChunkfcb_site=self.webpackChunkfcb_site||[]).push([[241],{4241:function(e,n,i){i.r(n);var a=i(1413),t=i(4165),r=i(2982),s=i(5861),c=i(885),l=i(2791),o=i(4450),u=i(8287),p=i(7674),d=i(1087),m=i(184);n.default=function(){var e=(0,l.useState)([]),n=(0,c.Z)(e,2),i=n[0],h=n[1],x=(0,l.useState)([]),f=(0,c.Z)(x,2),g=f[0],v=f[1],j=(0,l.useState)([]),y=(0,c.Z)(j,2),b=y[0],N=y[1],Z=(0,l.useState)(!1),C=(0,c.Z)(Z,2),V=C[0],w=C[1],P=(0,u.x)(),_=P.isLoading,E=(P.error,P.sendRequest),I=(P.clearError,(0,l.useState)({searchValue:!1,type:!1,minPriceValue:0,maxPriceValue:100,numberOfImages:0})),k=(0,c.Z)(I,2),F=k[0],S=k[1],U={open:{opacity:1,y:0,height:"30px",transition:{type:"spring",stiffness:300,damping:24}},closed:{height:0,opacity:0,y:0,transition:{duration:.2}}};(0,l.useEffect)((function(){var e=function(){var e=(0,s.Z)((0,t.Z)().mark((function e(){var n,i,a;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E("".concat("https://barcelona-website-29be533385b9.herokuapp.com/api","/items"));case 3:n=e.sent,N(n.items),h(n.items),i=[],n.items.forEach((function(e){i.push(e.type.toLowerCase())})),a=i.reduce((function(e,n){return e.includes(n)?e:[].concat((0,r.Z)(e),[n])}),[]),v(a),e.next=14;break;case 12:e.prev=12,e.t0=e.catch(0);case 14:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();e()}),[E]),(0,l.useEffect)((function(){var e;e=(0,r.Z)(i).filter((function(e){return e.price>=F.minPriceValue&&e.price<=F.maxPriceValue})),F.searchValue.length>0&&(e=e.filter((function(e){var n=e.name.toUpperCase(),i=F.searchValue.toUpperCase();return n.includes(i)}))),F.type.length>0&&(e=e.filter((function(e){var n=e.type.toUpperCase(),i=F.type.toUpperCase();return n.includes(i)}))),F.numberOfImages>0&&(e=e.filter((function(e){var n=F.numberOfImages;return 4===n?e.images.length>=n:e.images.length===n}))),N(e)}),[F]);var O=b.map((function(e){return(0,m.jsx)(o.E.div,{className:"item",initial:{opacity:0},whileInView:{opacity:1,transition:{duration:.5,delay:.2}},viewport:{once:!0},children:(0,m.jsx)(d.rU,{to:e.id,children:(0,m.jsxs)("div",{className:"item-container",children:[(0,m.jsx)("div",{className:"item-image",children:(0,m.jsx)("img",{src:"".concat("https://barcelona-website.s3.eu-central-1.amazonaws.com","/").concat(e.images[0]),alt:e.name})}),(0,m.jsxs)("div",{className:"item-info",children:[(0,m.jsx)("div",{className:"item-info__name",children:e.name}),(0,m.jsx)("div",{className:"item-info__price",children:(0,m.jsx)("div",{children:(0,m.jsxs)("span",{children:[e.price,"$"]})})})]})]})})},e.id)})),T=function(e){if("search"===e.target.id)S((function(n){return(0,a.Z)((0,a.Z)({},n),{},{searchValue:e.target.value.toUpperCase()})}));else if("price-range"===e.target.id){if("min-price"===e.target.name){var n=e.target.value;parseInt(n)<parseInt(F.maxPriceValue)&&S((function(e){return(0,a.Z)((0,a.Z)({},e),{},{minPriceValue:n})}))}else if("max-price"===e.target.name){var i=e.target.value;parseInt(i)>parseInt(F.minPriceValue)&&S((function(e){return(0,a.Z)((0,a.Z)({},e),{},{maxPriceValue:i})}))}}else"radio"===e.target.type?S((function(n){return(0,a.Z)((0,a.Z)({},n),{},{numberOfImages:parseInt(e.target.value)})})):"type-select"===e.target.id&&(S((function(n){return(0,a.Z)((0,a.Z)({},n),{},{type:e.target.dataset.value})})),w(!1))},R=g.map((function(e,n){return(0,m.jsx)(o.E.li,{"data-value":e,variants:U,id:"type-select",onClick:function(e){T(e)},children:e},n)})),$=[0,1,2,3,4].map((function(e){return(0,m.jsxs)("div",{children:[(0,m.jsx)("input",{type:"radio",id:e,name:e,value:e,checked:F.numberOfImages===e,onChange:function(e){T(e)}}),(0,m.jsx)("label",{htmlFor:e,children:0===e?"Any":e})]},e)}));return(0,m.jsx)(l.Fragment,{children:(0,m.jsxs)("div",{className:"store",children:[_&&(0,m.jsx)("div",{className:"center",children:(0,m.jsx)(p.Z,{})}),!_&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"store-header",children:[(0,m.jsxs)("div",{className:"store-header__navbar",children:[(0,m.jsx)("div",{children:(0,m.jsx)("input",{id:"search",type:"text",placeholder:"SEARCH",onChange:T})}),(0,m.jsx)("div",{className:"cart__container",children:(0,m.jsx)(d.rU,{to:"0/cart",children:(0,m.jsx)("span",{className:"fas fa-shopping-cart"})})})]}),(0,m.jsx)(o.E.h2,{initial:{opacity:0},whileInView:{opacity:1,transition:{duration:.5,delay:.2}},viewport:{once:!0},children:"STORE"})]}),(0,m.jsxs)("div",{className:"store-container",children:[(0,m.jsxs)("div",{className:"store-container__left",children:[(0,m.jsx)("h3",{children:"Filters"}),(0,m.jsxs)("div",{className:"input-container filters-container",children:[(0,m.jsx)("label",{htmlFor:"type-select",className:"select-label",children:"Type"}),(0,m.jsxs)(o.E.nav,{initial:!1,animate:V?"open":"closed",className:"menu",children:[(0,m.jsx)(o.E.span,{onClick:function(){w(!V)},children:F.type?F.type:"Choose an option"}),F.type&&(0,m.jsx)(o.E.span,{className:"fas fa-times",onClick:function(){S((function(e){return(0,a.Z)((0,a.Z)({},e),{},{type:!1})}))}}),(0,m.jsx)(o.E.ul,{variants:{open:{clipPath:"inset(0% 0% 0% 0% round 10px)",transition:{type:"spring",bounce:0,duration:.7,delayChildren:.3,staggerChildren:.05},marginTop:"0.5em"},closed:{clipPath:"inset(10% 50% 90% 50% round 10px)",transition:{type:"spring",bounce:0,duration:.3},marginTop:0}},children:R})]}),(0,m.jsx)("span",{style:{width:"10%"}})]}),(0,m.jsxs)("div",{className:"input-container filters-container",children:[(0,m.jsx)("label",{htmlFor:"min-price",children:"Min Price"}),(0,m.jsx)("input",{type:"range",id:"price-range",name:"min-price",min:"0",max:"100",value:F.minPriceValue,step:"10",onChange:T}),(0,m.jsxs)("span",{style:{width:"10%"},children:[F.minPriceValue,"$"]})]}),(0,m.jsxs)("div",{className:"input-container filters-container",children:[(0,m.jsx)("label",{htmlFor:"max-price",children:"Max Price"}),(0,m.jsx)("input",{type:"range",id:"price-range",name:"max-price",min:"0",max:"100",value:F.maxPriceValue,step:"10",onChange:T}),(0,m.jsxs)("span",{style:{width:"10%"},children:[F.maxPriceValue,"$"]})]}),(0,m.jsxs)("div",{className:"input-container-images filters-container",children:[(0,m.jsx)("legend",{children:"Number of images:"}),(0,m.jsx)("div",{className:"radio-container",children:$})]})]}),(0,m.jsx)("div",{className:"store-container__right",children:O})]})]})]})})}}}]);
//# sourceMappingURL=241.5a9ca9c5.chunk.js.map