(this["webpackJsonpportfolio2-group7"]=this["webpackJsonpportfolio2-group7"]||[]).push([[0],{30:function(e,t,a){},35:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var s=a(1),c=a.n(s),r=a(10),l=a.n(r),n=(a(30),a(31),a(32),a(35),a(2)),i=a(3),o=a(5),d=a(4),h=a(0),j=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={},e.handleLogin=function(){e.props.loginCallback()},e.handleRegister=function(){e.props.registerCallback()},e}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsx)("header",{children:Object(h.jsxs)("nav",{className:"navbar navbar-expand-md navbar-dark fixed-top bg-dark",children:[Object(h.jsxs)("div",{className:"container-fluid",children:[Object(h.jsx)("a",{className:"navbar-brand",href:"#",children:"Carousel"}),Object(h.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(h.jsx)("span",{className:"navbar-toggler-icon",children:"tag"})}),Object(h.jsx)("div",{className:"collapse navbar-collapse",id:"navbarCollapse",children:Object(h.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-md-0",children:[Object(h.jsx)("li",{className:"nav-item",children:Object(h.jsx)("a",{className:"nav-link active","aria-current":"page",href:"#",children:"Home"})}),Object(h.jsx)("li",{className:"nav-item",children:Object(h.jsx)("a",{className:"nav-link",href:"cart.jsx",children:"Cart"})}),Object(h.jsx)("li",{className:"nav-item",children:Object(h.jsx)("a",{className:"nav-link",href:"#",tabIndex:"-1",children:"Orders"})})]})})]}),Object(h.jsx)("button",{onClick:this.handleLogin,className:"btn text-white float-right mr-2",children:"Login"}),Object(h.jsx)("button",{onClick:this.handleRegister,className:"btn text-white float-right mr-2",children:"Register"})]})})}}]),a}(s.Component),m=a(11),b=a.n(m),u=a(13),x=a(14),p=a(8),g=a(9),O=a.n(g),f=a(12),N=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsxs)(f.a,{className:"mt-4",variant:"danger",children:[Object(h.jsx)(f.a.Heading,{children:"Oh snap!"}),Object(h.jsx)("hr",{}),Object(h.jsx)("p",{children:this.props.feedback_error_text})]})}}]),a}(s.Component),v=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){return Object(n.a)(this,a),t.call(this,e)}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsxs)(f.a,{className:"mt-4",variant:"success",children:[Object(h.jsx)(f.a.Heading,{children:"This is great!"}),Object(h.jsx)("hr",{}),Object(h.jsx)("p",{children:this.props.feedback_success_text})]})}}]),a}(s.Component),k=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).state={email:"",password:"",toggle_success_feedback:!1,toggle_error_feedback:!1,feedback_text:""},s.handleInputChange=function(e){var t=e.target,a=t.value,c=t.name;s.setState(Object(x.a)({},c,a))},s.handleSubmit=function(e){e.preventDefault(),s.postLoginDetails().then((function(e){})).catch((function(e){}))},s.handleInputChange=s.handleInputChange.bind(Object(p.a)(s)),s}return Object(i.a)(a,[{key:"postLoginDetails",value:function(){var e=Object(u.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,O()({method:"post",url:"http://localhost:3001/api/users/signIn",data:{email:this.state.email,password:this.state.password}}).then((function(e){console.log("Data:",e.data.message),console.log("Status:",e.status),200===e.status&&(t.setState({feedback_text:e.data.message}),t.setState({toggle_error_feedback:!1}),t.setState({toggle_success_feedback:!0}))})).catch((function(e){e.response?(console.log(e.response.data),console.log(e.response.status),t.setState({feedback_text:e.response.data}),t.setState({toggle_success_feedback:!1}),t.setState({toggle_error_feedback:!0})):e.request?console.log(e.request):console.log("Error",e.message)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(h.jsx)("div",{className:"loginContainer",children:Object(h.jsx)("div",{id:"login_div",className:"row",children:Object(h.jsx)("div",{className:"col-md-12",children:Object(h.jsxs)("form",{onSubmit:this.handleSubmit,className:"form-signin",children:[Object(h.jsx)("div",{className:"text-center mb-4",children:Object(h.jsx)("h4",{children:"Sign in to store"})}),Object(h.jsxs)("div",{className:"form-label-group",children:[Object(h.jsx)("input",{type:"email",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Email",name:"email",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"Password",onChange:this.handleInputChange,className:"form-control mt-2",pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}",title:"Password must contain at least 1 upper and lower case letter, 1 number and\r be at least 8 characters long.",placeholder:"Password",name:"password",required:"*",autoFocus:""})]}),Object(h.jsx)("button",{type:"submit",className:"btn btn-lg btn-primary btn-block mt-2",children:"Sign in"}),this.state.toggle_success_feedback&&Object(h.jsx)(v,{feedback_success_text:this.state.feedback_text}),this.state.toggle_error_feedback&&Object(h.jsx)(N,{feedback_error_text:this.state.feedback_text})]})})})})}}]),a}(s.Component),C=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).state={firstName:"",lastName:"",email:"",password:"",zipCode:"",street:"",phoneNumber:"",toggle_error_feedback:!1,toggle_success_feedback:!1,feedback_text:""},s.handleSubmit=function(e){e.preventDefault(),s.submitUserDetails().then((function(e){})).catch((function(e){}))},s.handleInputChange=s.handleInputChange.bind(Object(p.a)(s)),s}return Object(i.a)(a,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.value,s=t.name;this.setState(Object(x.a)({},s,a))}},{key:"submitUserDetails",value:function(){var e=Object(u.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,O()({method:"post",url:"http://localhost:3001/api/users/signup",data:{firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password,zipCode:this.state.zipCode,street:this.state.street,phoneNumber:this.state.phoneNumber}}).then((function(e){console.log("Data:",e.data),console.log("Status:",e.status),t.setState({toggle_error_feedback:!1}),t.setState({toggle_success_feedback:!0}),t.setState({feedback_text:e.data.message})})).catch((function(e){e.response?(console.log(e.response.data),console.log(e.response.status),t.setState({toggle_error_feedback:!0}),t.setState({toggle_success_feedback:!1}),t.setState({feedback_text:e.response.data})):e.request?console.log(e.request):console.log("Error",e.message)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(h.jsx)("div",{className:"registerContainer",children:Object(h.jsx)("div",{id:"login_div",className:"row",children:Object(h.jsx)("div",{className:"col-md-12",children:Object(h.jsxs)("form",{onSubmit:this.handleSubmit,className:"form-signin",children:[Object(h.jsx)("div",{className:"text-center mb-4",children:Object(h.jsx)("h4",{children:"Register User"})}),Object(h.jsxs)("div",{className:"form-label-group",children:[Object(h.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Firstname",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20}$",title:"First name has to start with an upper case letter and have at least 2 characters.",name:"firstName",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Lastname",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20}$",title:"Last name has to start with an upper case letter and have at least 2 characters.",name:"lastName",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"email",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Email",name:"email",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"Password",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Password",pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}",title:"Password must contain at least 1 upper and lower case letter, 1 number and be at least 8 characters long.",name:"password",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Zip Code",pattern:"^\\d{4,5}(?:[-\\s]\\d{4})?$",name:"zipCode",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Street name",pattern:"^[A-z]+\\s\\d+\\s?[A-z]?",title:"The address should follow this format:\r <Address> <Number><Letter(optional)>.",name:"street",required:"*",autoFocus:""}),Object(h.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Phone",pattern:"^(\\+|00)?[1-9][0-9 \\-\\(\\)\\.]{7,}$",title:"The address should follow this format:\r <Country code(optional)> <Number(At least 7 digits>.",name:"phoneNumber",required:"*",autoFocus:""})]}),Object(h.jsx)("button",{type:"submit",className:"btn btn-lg btn-primary btn-block mt-2",children:"Register"}),this.state.toggle_error_feedback&&Object(h.jsx)(N,{feedback_error_text:this.state.feedback_text}),this.state.toggle_success_feedback&&Object(h.jsx)(v,{feedback_success_text:this.state.feedback_text})]})})})})}}]),a}(s.Component),y=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"bestsellers",children:[Object(h.jsx)("h2",{children:"Our current bestsellers:"}),Object(h.jsx)("main",{children:Object(h.jsx)("div",{className:"container marketing",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-lg-4",children:[Object(h.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(h.jsx)("title",{children:"Placeholder"}),Object(h.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(h.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(h.jsx)("h2",{children:"Heading"}),Object(h.jsx)("p",{children:"Some representative placeholder content for the three columns of text below the carousel. This is the first column."}),Object(h.jsx)("p",{children:Object(h.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]}),Object(h.jsxs)("div",{className:"col-lg-4",children:[Object(h.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(h.jsx)("title",{children:"Placeholder"}),Object(h.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(h.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(h.jsx)("h2",{children:"Heading"}),Object(h.jsx)("p",{children:"Another exciting bit of representative placeholder content. This time, we've moved on to the second column."}),Object(h.jsx)("p",{children:Object(h.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]}),Object(h.jsxs)("div",{className:"col-lg-4",children:[Object(h.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(h.jsx)("title",{children:"Placeholder"}),Object(h.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(h.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(h.jsx)("h2",{children:"Heading"}),Object(h.jsx)("p",{children:"And lastly this, the third column of representative placeholder content."}),Object(h.jsx)("p",{children:Object(h.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]})]})})})]})}}]),a}(s.Component),w=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).componentDidMount=function(){O.a.get("http://localhost:3001/api/products/allProducts").then((function(e){s.setState({products:e.data})})).catch((function(e){console.log(e)}))},s.addToCart=function(e){s.props.addToCart(e)},s.state={products:[]},s}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsx)("div",{className:"container",children:Object(h.jsxs)("div",{className:"row",children:[Object(h.jsxs)("div",{className:"col-lg-3",children:[Object(h.jsx)("h1",{className:"my-4",children:"ShopMet"}),Object(h.jsxs)("div",{className:"listclassName-group",children:[Object(h.jsx)("a",{href:"#",className:"list-group-item",children:"Category 1"}),Object(h.jsx)("a",{href:"#",className:"list-group-item",children:"Category 2"}),Object(h.jsx)("a",{href:"#",className:"list-group-item",children:"Category 3"})]})]}),Object(h.jsxs)("div",{className:"col-lg-9",children:[Object(h.jsxs)("div",{id:"carouselExampleIndicators",className:"carousel slide my-4","data-ride":"carousel",children:[Object(h.jsxs)("ol",{className:"carousel-indicators",children:[Object(h.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"0",className:"active"}),Object(h.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"1"}),Object(h.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"2"})]}),Object(h.jsxs)("div",{className:"carousel-inner",role:"listbox",children:[Object(h.jsx)("div",{className:"carousel-item active",children:Object(h.jsx)("img",{className:"d-block img-fluid",src:"http://placehold.it/900x350",alt:"First slide"})}),Object(h.jsx)("div",{className:"carousel-item",children:Object(h.jsx)("img",{className:"d-block img-fluid",src:"http://placehold.it/900x350",alt:"Second slide"})}),Object(h.jsx)("div",{className:"carousel-item",children:Object(h.jsx)("img",{className:"d-block img-fluid",src:"http://placehold.it/900x350",alt:"Third slide"})})]}),Object(h.jsxs)("a",{className:"carousel-control-prev",href:"#carouselExampleIndicators",role:"button","data-slide":"prev",children:[Object(h.jsx)("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),Object(h.jsx)("span",{className:"sr-only",children:"Previous"})]}),Object(h.jsxs)("a",{className:"carousel-control-next",href:"#carouselExampleIndicators",role:"button","data-slide":"next",children:[Object(h.jsx)("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),Object(h.jsx)("span",{className:"sr-only",children:"Next"})]})]}),Object(h.jsxs)("div",{className:"row",children:[Object(h.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(h.jsxs)("div",{className:"card h-100",children:[Object(h.jsx)("a",{href:"#",children:Object(h.jsx)("img",{className:"card-img-top",src:"http://placehold.it/700x400",alt:""})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsx)("h4",{className:"card-title",children:Object(h.jsx)("a",{href:"#",children:this.props.name})}),Object(h.jsx)("h5",{children:this.props.price}),Object(h.jsx)("p",{className:"card-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"})]}),Object(h.jsx)("div",{className:"card-footer",children:Object(h.jsx)("small",{className:"text-muted",children:"\u2605 \u2605 \u2605 \u2605 \u2606"})})]})}),Object(h.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(h.jsxs)("div",{className:"card h-100",children:[Object(h.jsx)("a",{href:"#",children:Object(h.jsx)("img",{className:"card-img-top",src:"http://placehold.it/700x400",alt:""})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsx)("h4",{className:"card-title",children:Object(h.jsx)("a",{href:"#",children:this.props.name})}),Object(h.jsx)("h5",{children:this.props.price}),Object(h.jsx)("p",{className:"card-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet."})]}),Object(h.jsx)("div",{className:"card-footer",children:Object(h.jsx)("small",{className:"text-muted",children:"\u2605 \u2605 \u2605 \u2605 \u2606"})})]})}),Object(h.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(h.jsxs)("div",{className:"card h-100",children:[Object(h.jsx)("a",{href:"#",children:Object(h.jsx)("img",{className:"card-img-top",src:"http://placehold.it/700x400",alt:""})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsx)("h4",{className:"card-title",children:Object(h.jsx)("a",{href:"#",children:"Item Three"})}),Object(h.jsx)("h5",{children:"$24.99"}),Object(h.jsx)("p",{className:"card-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"})]}),Object(h.jsx)("div",{className:"card-footer",children:Object(h.jsx)("small",{className:"text-muted",children:"\u2605 \u2605 \u2605 \u2605 \u2606"})})]})}),Object(h.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(h.jsxs)("div",{className:"card h-100",children:[Object(h.jsx)("a",{href:"#",children:Object(h.jsx)("img",{className:"card-img-top",src:"http://placehold.it/700x400",alt:""})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsx)("h4",{className:"card-title",children:Object(h.jsx)("a",{href:"#",children:"Item Four"})}),Object(h.jsx)("h5",{children:"$24.99"}),Object(h.jsx)("p",{className:"card-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"})]}),Object(h.jsx)("div",{className:"card-footer",children:Object(h.jsx)("small",{className:"text-muted",children:"\u2605 \u2605 \u2605 \u2605 \u2606"})})]})}),Object(h.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(h.jsxs)("div",{className:"card h-100",children:[Object(h.jsx)("a",{href:"#",children:Object(h.jsx)("img",{className:"card-img-top",src:"http://placehold.it/700x400",alt:""})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsx)("h4",{className:"card-title",children:Object(h.jsx)("a",{href:"#",children:"Item Five"})}),Object(h.jsx)("h5",{children:"$24.99"}),Object(h.jsx)("p",{className:"card-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet."})]}),Object(h.jsx)("div",{className:"card-footer",children:Object(h.jsx)("small",{className:"text-muted",children:"\u2605 \u2605 \u2605 \u2605 \u2606"})})]})}),Object(h.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(h.jsxs)("div",{className:"card h-100",children:[Object(h.jsx)("a",{href:"#",children:Object(h.jsx)("img",{className:"card-img-top",src:"http://placehold.it/700x400",alt:""})}),Object(h.jsxs)("div",{className:"card-body",children:[Object(h.jsx)("h4",{className:"card-title",children:Object(h.jsx)("a",{href:"#",children:"Item Six"})}),Object(h.jsx)("h5",{children:"$24.99"}),Object(h.jsx)("p",{className:"card-text",children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!"})]}),Object(h.jsx)("div",{className:"card-footer",children:Object(h.jsx)("small",{className:"text-muted",children:"\u2605 \u2605 \u2605 \u2605 \u2606"})})]})})]})]})]})})}}]),a}(s.Component),_=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsx)("footer",{className:"py-5 bg-dark",children:Object(h.jsx)("div",{className:"container",children:Object(h.jsx)("p",{className:"m-0 text-center text-white",children:"Copyright \xa9 ShopMet 2021"})})})}}]),a}(s.Component),S=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={toggleLogin:!1,toggleRegister:!1},e.handleCallbackLogin=function(){e.setState({toggleLogin:!e.state.toggleLogin,toggleRegister:!1})},e.handleCallbackRegister=function(){e.setState({toggleLogin:!1,toggleRegister:!e.state.toggleRegister})},e}return Object(i.a)(a,[{key:"render",value:function(){return Object(h.jsxs)(c.a.Fragment,{children:[Object(h.jsx)(w,{}),Object(h.jsx)(y,{}),Object(h.jsx)(_,{}),Object(h.jsx)(j,{loginCallback:this.handleCallbackLogin,registerCallback:this.handleCallbackRegister}),this.state.toggleLogin&&Object(h.jsx)(k,{}),this.state.toggleRegister&&Object(h.jsx)(C,{})]})}}]),a}(s.Component),I=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,60)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,l=t.getTTFB;a(e),s(e),c(e),r(e),l(e)}))};l.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)(S,{})}),document.getElementById("root")),I()}},[[58,1,2]]]);
//# sourceMappingURL=main.b5618ade.chunk.js.map