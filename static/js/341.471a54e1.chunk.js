"use strict";(self.webpackChunkfcb_site=self.webpackChunkfcb_site||[]).push([[341],{9409:function(e,t,s){s.r(t),s.d(t,{default:function(){return y}});var a=s(4165),n=s(5861),r=s(885),i=s(2791),c=s(5956);var o={any:0,all:1};function l(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=s.root,n=s.margin,r=s.amount,i=void 0===r?"any":r,l=function(e,t,s){var a;if("string"===typeof e){var n=document;t&&((0,c.k)(Boolean(t.current),"Scope provided, but no element detected."),n=t.current),s?(null!==(a=s[e])&&void 0!==a||(s[e]=n.querySelectorAll(e)),e=s[e]):e=n.querySelectorAll(e)}else e instanceof Element&&(e=[e]);return Array.from(e||[])}(e),u=new WeakMap,d=new IntersectionObserver((function(e){e.forEach((function(e){var s=u.get(e.target);if(e.isIntersecting!==Boolean(s))if(e.isIntersecting){var a=t(e);"function"===typeof a?u.set(e.target,a):d.unobserve(e.target)}else s&&(s(e),u.delete(e.target))}))}),{root:a,rootMargin:n,threshold:"number"===typeof i?i:o[i]});return l.forEach((function(e){return d.observe(e)})),function(){return d.disconnect()}}function u(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=t.root,a=t.margin,n=t.amount,c=t.once,o=void 0!==c&&c,u=(0,i.useState)(!1),d=(0,r.Z)(u,2),m=d[0],h=d[1];return(0,i.useEffect)((function(){if(!(!e.current||o&&m)){var t={root:s&&s.current||void 0,margin:a,amount:"some"===n?"any":n};return l(e.current,(function(){return h(!0),o?void 0:function(){return h(!1)}}),t)}}),[s,e,a,o]),m}var d=s(4450),m=s.p+"static/media/article1.ab971de0cf0d9ea7bc96.jpg",h=s.p+"static/media/article2.8aea4574ac297a3600e2.jpg",f=s.p+"static/media/article3.ba29d6eff30a11b75c50.jpg",j=s.p+"static/media/robert-lewandowski-178.92d96b059670957f5539.png",p=s(7689),x=s(8287),b=s(1313),_=s(7674),v=s(184),y=function(){var e=(0,i.useState)(10),t=(0,r.Z)(e,2),s=t[0],c=t[1],o=(0,i.useState)(0),l=(0,r.Z)(o,2),y=l[0],w=l[1],g=(0,i.useState)(0),N=(0,r.Z)(g,2),k=N[0],q=N[1],C=(0,i.useState)(!1),E=(0,r.Z)(C,2),Z=E[0],z=E[1],S=(0,i.useState)([]),B=(0,r.Z)(S,2),A=B[0],I=B[1],F=(0,i.useRef)(null),R=u(F,{once:!0}),Y=(0,i.useRef)(null),W=u(Y,{once:!0}),G=(0,i.useRef)(null),M=u(G,{once:!0}),O=(0,i.useRef)(null),T=u(O,{once:!0}),D=(0,i.useRef)(null),L=u(D,{once:!0}),X=(0,x.x)(),H=X.isLoading,Q=(X.error,X.sendRequest),U=(X.clearError,(0,p.s0)());(0,i.useEffect)((function(){window.addEventListener("scroll",(function(e){var t=window.scrollY/50,s=window.scrollY/70-70;c(t),w(t),q(s)}));var e=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){var t;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Q("".concat("https://barcelona-website-29be533385b9.herokuapp.com/api","/news"));case 3:t=e.sent,I(t.news.sort((function(e,t){return new Date(t.createdAt)-new Date(e.createdAt)}))),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e(),window.scrollTo(0,0)}),[Q]);return(0,v.jsxs)("div",{className:"home",children:[H&&(0,v.jsx)("div",{className:"center",children:(0,v.jsx)(_.Z,{asOverlay:!0})}),(0,v.jsx)("section",{className:"home-header",ref:F,children:(0,v.jsxs)("div",{className:"home-header__title section-title__container",children:[(0,v.jsx)(d.E.h1,{style:{opacity:R?1:0,transition:"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"},children:"FC Barcelona"}),(0,v.jsx)(d.E.h3,{style:{opacity:R?1:0,transition:"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"},children:"M\xe9s que un club"}),(0,v.jsxs)(d.E.ul,{style:{opacity:R?1:0,transition:"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s"},children:["Welcome to the FC Barcelona website where you can:",(0,v.jsx)("li",{children:"read the latest articles about the club,"}),(0,v.jsx)("li",{children:"add a beautifull Camp Nou photo,"}),(0,v.jsx)("li",{children:"read about your favourite players,"}),(0,v.jsx)("li",{children:"buy a new item."})]})]})}),(0,v.jsxs)("section",{className:"home-news",children:[(0,v.jsx)("h2",{className:"home-news__title",children:"News"}),(0,v.jsx)("div",{className:"home-news__articles-container",ref:Y,children:A.length>0&&A.map((function(e,t){return(0,v.jsxs)(d.E.article,{className:"article",onClick:function(){return U("/news/".concat(e.id))},style:{transform:W?"none":"translateX(-200px)",opacity:W?1:0,transition:"all 1s cubic-bezier(0.17, 0.55, 0.55, 1) ".concat(t/2,"s")},children:[(0,v.jsxs)("div",{className:"article-top__container",children:[(0,v.jsx)("div",{className:"article-image__container",children:(0,v.jsx)("img",{src:"".concat("https://barcelona-website.s3.eu-central-1.amazonaws.com","/").concat(e.image),alt:e.title})}),(0,v.jsx)("h4",{className:"article-title",children:e.title}),(0,v.jsxs)("p",{className:"article-description",children:[e.article[0].description.slice(0,450),"..."]})]}),(0,v.jsx)("div",{className:"article-bottom__container",children:(0,v.jsxs)("div",{className:"article-footer",children:[(0,v.jsx)("div",{className:"article-footer__date",children:e.createdAt.slice(0,10)}),(0,v.jsxs)("div",{className:"article-footer__comments",children:[e.comments.length," comments"]}),(0,v.jsx)("div",{className:"article-footer__author",children:e.author.nickname})]})})]},t)}))}),(0,v.jsx)("button",{className:"home-news__button",onClick:function(){return U("/news")},children:"Show more"})]}),(0,v.jsxs)("section",{className:"home-store",ref:G,children:[(0,v.jsxs)(d.E.div,{className:"home-store__left-container",style:{opacity:M?1:0,transition:"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"},children:[(0,v.jsx)("h2",{className:"home-store__title",children:"Store"}),(0,v.jsx)("p",{className:"home-store__description",children:"If you are a real FC Barcelona fan, you need to have special cule equipment."}),(0,v.jsx)("p",{className:"home-store__description",children:"Check out our store and buy anything you want!"}),(0,v.jsx)(b.Z,{onClick:function(){return U("/store")},children:"Go to store"})]}),(0,v.jsxs)("div",{className:"home-store__right-container",children:[(0,v.jsx)("div",{className:"home-store__image-container image-first",style:{bottom:"".concat(s,"%")},children:(0,v.jsx)("img",{src:m,alt:"store"})}),(0,v.jsx)("div",{className:"home-store__image-container image-second",style:{top:"".concat(y,"%")},children:(0,v.jsx)("img",{src:h,alt:"store"})}),(0,v.jsx)("div",{className:"home-store__image-container image-third",style:{left:"".concat(k,"%"),bottom:"-5%"},children:(0,v.jsx)("img",{src:f,alt:"store"})})]}),(0,v.jsxs)("div",{className:"home-store__small-device",children:[(0,v.jsx)("div",{className:"home-store__image-container",children:(0,v.jsx)("img",{src:m,alt:"store"})}),(0,v.jsx)("div",{className:"home-store__image-container",children:(0,v.jsx)("img",{src:h,alt:"store"})})]})]}),(0,v.jsxs)("section",{className:"home-team",ref:O,children:[(0,v.jsx)(d.E.div,{className:"home-team__photo",style:{opacity:T?1:0,transition:"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1.25s"},children:(0,v.jsx)("img",{src:j,alt:"lewandowski"})}),(0,v.jsxs)(d.E.div,{className:"home-team__info",style:{opacity:T?1:0,transition:"all 1.5s cubic-bezier(0.17, 0.55, 0.55, 1) 1s"},children:[(0,v.jsx)("h2",{children:"TEAM"}),(0,v.jsx)("h3",{children:"Barca is one of the best football clubs and attracts world class players from all over the world."}),(0,v.jsx)("h3",{children:"Get to know Barca players!"}),(0,v.jsx)(b.Z,{onClick:function(){return U("/team")},size:"big",children:"Go to team"})]})]}),(0,v.jsxs)("section",{className:"home-faq",children:[(0,v.jsx)("h2",{className:"home-faq__title",children:"FAQ"}),(0,v.jsx)("div",{className:"home-faq__container",ref:D,children:[{question:"What is this site?",answer:"This site is about Football Club Barcelona. You can read interesting news, buy a jersey or view beautiful photos from the stadium."},{question:"What items can I buy?",answer:"You can buy anything related to FC Barcelona. Home jersey, away jersey, souvenirs or many others."},{question:"Can I add a photo?",answer:"Yes, if you are logged in, you should go to the Gallery section. We can't wait to see your photo!"},{question:"Can I add a news article?",answer:"Only users with a special status can add an article. Otherwise, you can comment on news or add a like."}].map((function(e,t){return(0,v.jsxs)(d.E.div,{className:"home-faq__element",style:{transform:L?"none":"translateX(-50px)",opacity:L?1:0,transition:"all 1.25s cubic-bezier(0.17, 0.55, 0.55, 1) ".concat(t/2,"s")},children:[(0,v.jsxs)("p",{className:"home-faq__element-question",children:[e.question," ",(0,v.jsx)("span",{className:"".concat(Z===t?"fas fa-minus":"fas fa-plus"),onClick:function(){return function(e){z(e!==Z&&e)}(t)}})]}),(0,v.jsx)("p",{className:"home-faq__element-answer ".concat(Z===t&&"active"),children:e.answer})]},t)}))}),(0,v.jsxs)(d.E.div,{className:"home-faq__contact",style:{opacity:L?1:0,transition:"all 1.25s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s"},children:[(0,v.jsx)("p",{children:"You didn't find an answer?"}),(0,v.jsx)("p",{children:"No problem, you can ask us anything you want!"}),(0,v.jsx)("button",{className:"home-faq__button",onClick:function(){return U("contact")},children:"Contact Us!"})]})]})]})}}}]);
//# sourceMappingURL=341.471a54e1.chunk.js.map