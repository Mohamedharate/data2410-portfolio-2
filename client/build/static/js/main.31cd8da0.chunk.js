(this["webpackJsonpportfolio2-group7"]=this["webpackJsonpportfolio2-group7"]||[]).push([[0],{30:function(e,t,a){},35:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),c=a(12),r=a.n(c),l=(a(30),a(31),a(32),a(35),a(6)),i=a.n(l),o=a(9),d=a(2),h=a(3),u=a(11),b=a(5),j=a(4),m=a(10),p=a.n(m),g=a(0),x=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(d.a)(this,a);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={},e.handleLogin=function(){e.props.toggleLoginCallback()},e.handleRegister=function(){e.props.toggleRegisterCallback()},e.handleLogout=function(){console.log("HandleLogout i navbar"),e.props.handleLogoutCallback()},e}return Object(h.a)(a,[{key:"render",value:function(){return Object(g.jsx)("header",{children:Object(g.jsxs)("nav",{className:"navbar navbar-expand-md navbar-dark fixed-top bg-dark",children:[Object(g.jsxs)("div",{className:"container-fluid",children:[Object(g.jsx)("img",{className:"navbar-logo",src:"./ShopMetLogo.png",alt:""}),Object(g.jsx)("a",{className:"navbar-brand"}),Object(g.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(g.jsx)("span",{className:"navbar-toggler-icon",children:"tag"})}),Object(g.jsx)("div",{className:"collapse navbar-collapse",id:"navbarCollapse",children:Object(g.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-md-0",children:[Object(g.jsx)("li",{className:"nav-item",children:Object(g.jsx)("a",{className:"nav-link active","aria-current":"page",href:"#",children:"Home"})}),Object(g.jsx)("li",{className:"nav-item",children:Object(g.jsx)("a",{className:"nav-link",href:"cart.jsx",children:"Cart"})}),Object(g.jsx)("li",{className:"nav-item",children:Object(g.jsx)("a",{className:"nav-link",href:"#",tabIndex:"-1",children:"Orders"})})]})})]}),!this.props.isAuthenticated&&Object(g.jsx)("button",{onClick:this.handleLogin,className:"btn text-white float-right mr-2",children:"Login"}),!this.props.isAuthenticated&&Object(g.jsx)("button",{onClick:this.handleRegister,className:"btn text-white float-right mr-2",children:"Register"}),this.props.isAuthenticated&&Object(g.jsxs)("div",{className:"welcomeText text-white float-right mr-2",children:["Welcome, ",this.props.current_user.firstName]}),this.props.isAuthenticated&&Object(g.jsx)("button",{onClick:this.handleLogout,className:"btn text-white float-right mr-2",children:"Logout"})]})})}}]),a}(s.Component),O=a(14),f=a(13),v=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){return Object(d.a)(this,a),t.call(this,e)}return Object(h.a)(a,[{key:"render",value:function(){return Object(g.jsxs)(f.a,{className:"mt-4",variant:"danger",children:[Object(g.jsx)(f.a.Heading,{children:"Oh snap!"}),Object(g.jsx)("hr",{}),Object(g.jsx)("p",{children:this.props.feedback_error_text})]})}}]),a}(s.Component),N=(s.Component,function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).state={email:"",password:"",toggle_error_feedback:!1,feedback_text:""},s.handleInputChange=function(e){var t=e.target,a=t.value,n=t.name;s.setState(Object(O.a)({},n,a))},s.handleSubmit=function(e){e.preventDefault(),s.postLoginDetails().then((function(e){s.props.loginCallback()})).catch((function(e){console.log(e)}))},s.handleInputChange=s.handleInputChange.bind(Object(u.a)(s)),s}return Object(h.a)(a,[{key:"postLoginDetails",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,console.log("Inne i postLoginDetails"),e.next=4,p()({method:"post",url:"http://localhost:3001/api/users/signIn",data:{email:this.state.email,password:this.state.password}}).then((function(e){console.log("Data:",e.data.message),console.log("Status:",e.status),200===e.status&&(t.setState({feedback_text:e.data.message}),t.setState({toggle_error_feedback:!1}))})).catch((function(e){e.response?(console.log(e.response.data),console.log(e.response.status),t.setState({feedback_text:e.response.data}),t.setState({toggle_error_feedback:!0})):e.request?console.log(e.request):console.log("Error",e.message)}));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(g.jsx)("div",{className:"loginContainer",children:Object(g.jsx)("div",{id:"login_div",className:"row",children:Object(g.jsx)("div",{className:"col-md-12",children:Object(g.jsxs)("form",{onSubmit:this.handleSubmit,className:"form-signin",children:[Object(g.jsx)("div",{className:"text-center mb-4",children:Object(g.jsx)("h4",{children:"Sign in to store"})}),Object(g.jsxs)("div",{className:"form-label-group",children:[Object(g.jsxs)("div",{className:"input-group",children:[Object(g.jsx)("div",{className:"input-group-prepend",children:Object(g.jsx)("div",{className:"input-group-text mt-2",id:"basic-addon1",children:Object(g.jsx)("i",{className:"material-icons",children:"mail"})})}),Object(g.jsx)("input",{type:"email",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Email",name:"email",required:"*",autoFocus:"","aria-describedby":"basic-addon1"})]}),Object(g.jsxs)("div",{className:"input-group",children:[Object(g.jsx)("div",{className:"input-group-prepend",children:Object(g.jsx)("div",{className:"input-group-text mt-2",id:"basic-addon1",children:Object(g.jsx)("i",{className:"material-icons",children:"vpn_key"})})}),Object(g.jsx)("input",{type:"Password",onChange:this.handleInputChange,className:"form-control mt-2",pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}",title:"Password must contain at least 1 upper and lower case letter, 1 number and\r be at least 8 characters long.",placeholder:"Password",name:"password",required:"*",autoFocus:""})]})]}),Object(g.jsx)("button",{type:"submit",className:"btn btn-lg btn-primary btn-block mt-2",children:"Sign in!"}),this.state.toggle_error_feedback&&Object(g.jsx)(v,{feedback_error_text:this.state.feedback_text})]})})})})}}]),a}(s.Component)),y=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).state={firstName:"",lastName:"",email:"",password:"",country:"",city:"",zipCode:"",street:"",phoneNumber:"",toggle_error_feedback:!1,feedback_text:""},s.handleSubmit=function(e){e.preventDefault(),s.submitUserDetails().then((function(e){})).catch((function(e){}))},s.handleInputChange=s.handleInputChange.bind(Object(u.a)(s)),s}return Object(h.a)(a,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.value,s=t.name;this.setState(Object(O.a)({},s,a))}},{key:"submitUserDetails",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,p()({method:"post",url:"http://localhost:3001/api/users/signup",data:{firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password,country:this.state.country,city:this.state.city,zipCode:this.state.zipCode,street:this.state.street,phoneNumber:this.state.phoneNumber}}).then((function(e){console.log("Data:",e.data),console.log("Status:",e.status),t.setState({toggle_error_feedback:!1}),t.setState({feedback_text:e.data.message}),t.props.registerCallback()})).catch((function(e){e.response?(console.log(e.response.data),console.log(e.response.status),t.setState({toggle_error_feedback:!0}),t.setState({feedback_text:e.response.data})):e.request?console.log(e.request):console.log("Error",e.message)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(g.jsx)("div",{className:"registerContainer",children:Object(g.jsx)("div",{id:"login_div",className:"row",children:Object(g.jsx)("div",{className:"col-md-12",children:Object(g.jsxs)("form",{onSubmit:this.handleSubmit,className:"form-signin",children:[Object(g.jsx)("div",{className:"text-center mb-4",children:Object(g.jsx)("h4",{children:"Register User"})}),Object(g.jsxs)("div",{className:"form-label-group",children:[Object(g.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Firstname",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20}(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20})?$",title:"First name has to start with an upper case letter and have at least 2 characters.",name:"firstName",required:!0,autoFocus:""}),Object(g.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Lastname",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20}$",title:"Last name has to start with an upper case letter and have at least 2 characters.",name:"lastName",required:!0,autoFocus:""}),Object(g.jsx)("input",{type:"email",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Email",name:"email",required:!0,autoFocus:""}),Object(g.jsx)("input",{type:"Password",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Password",pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}",title:"Password must contain at least 1 upper and lower case letter, 1 number and be at least 8 characters long.",name:"password",required:!0,autoFocus:""}),Object(g.jsxs)("select",{name:"country",onChange:this.handleInputChange,className:"custom-select my-1 mr-sm-2 mt-2",required:!0,children:[Object(g.jsx)("option",{value:"",defaultValue:"",children:"Choose..."}),Object(g.jsx)("option",{value:"Norway",children:"Norway"}),Object(g.jsx)("option",{value:"Sweden",children:"Sweden"}),Object(g.jsx)("option",{value:"Denmark",children:"Denmark"})]}),Object(g.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"City",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20}(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?$",title:"City name has to start with an upper case letter and have at least 2 characters.",name:"city",required:!0,autoFocus:""}),Object(g.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Zip Code",pattern:"^\\d{4,5}(?:[-\\s]\\d{4})?$",name:"zipCode",required:!0,autoFocus:""}),Object(g.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Street name",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20}([A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?\\s\\d+\\s?[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5]?",title:"The address should follow this format:\r <Address> <Number><Letter(optional)>.",name:"street",required:!0,autoFocus:""}),Object(g.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Phone",pattern:"^(\\+|00)?[1-9][0-9 \\-\\(\\)\\.]{7,}$",title:"The address should follow this format:\r <Country code(optional)> <Number(At least 7 digits>.",name:"phoneNumber",required:!0,autoFocus:""})]}),Object(g.jsx)("button",{type:"submit",className:"btn btn-lg btn-primary btn-block mt-2",children:"Sign Up!"}),this.state.toggle_error_feedback&&Object(g.jsx)(v,{feedback_error_text:this.state.feedback_text})]})})})})}}]),a}(s.Component),C=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return Object(g.jsxs)("div",{className:"bestsellers",children:[Object(g.jsx)("h2",{children:"Our current bestsellers:"}),Object(g.jsx)("main",{children:Object(g.jsx)("div",{className:"container marketing",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsxs)("div",{className:"col-lg-4",children:[Object(g.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(g.jsx)("title",{children:"Placeholder"}),Object(g.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(g.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(g.jsx)("h2",{children:"Heading"}),Object(g.jsx)("p",{children:"Some representative placeholder content for the three columns of text below the carousel. This is the first column."}),Object(g.jsx)("p",{children:Object(g.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]}),Object(g.jsxs)("div",{className:"col-lg-4",children:[Object(g.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(g.jsx)("title",{children:"Placeholder"}),Object(g.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(g.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(g.jsx)("h2",{children:"Heading"}),Object(g.jsx)("p",{children:"Another exciting bit of representative placeholder content. This time, we've moved on to the second column."}),Object(g.jsx)("p",{children:Object(g.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]}),Object(g.jsxs)("div",{className:"col-lg-4",children:[Object(g.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(g.jsx)("title",{children:"Placeholder"}),Object(g.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(g.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(g.jsx)("h2",{children:"Heading"}),Object(g.jsx)("p",{children:"And lastly this, the third column of representative placeholder content."}),Object(g.jsx)("p",{children:Object(g.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]})]})})})]})}}]),a}(s.Component),k=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).state={product:[]},s}return Object(h.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this,p()({method:"get",url:"http://localhost:3001/api/products/allProducts"}).then((function(e){console.log("Data: ",e),t.setState({product:e.data})})).catch((function(e){e.data||console.log(e.data),console.log(e)}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(g.jsx)("div",{className:"container",children:Object(g.jsxs)("div",{className:"row",children:[Object(g.jsxs)("div",{className:"col-lg-3",children:[Object(g.jsx)("h1",{className:"my-4",children:"ShopMet"}),Object(g.jsxs)("div",{className:"listclassName-group",children:[Object(g.jsx)("a",{href:"#",className:"list-group-item",children:"Category 1"}),Object(g.jsx)("a",{href:"#",className:"list-group-item",children:"Category 2"}),Object(g.jsx)("a",{href:"#",className:"list-group-item",children:"Category 3"})]})]}),Object(g.jsxs)("div",{className:"col-lg-9",children:[Object(g.jsxs)("div",{id:"carouselExampleIndicators",className:"carousel slide my-4","data-ride":"carousel",children:[Object(g.jsxs)("ol",{className:"carousel-indicators",children:[Object(g.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"0",className:"active"}),Object(g.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"1"}),Object(g.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"2"})]}),Object(g.jsxs)("div",{className:"carousel-inner",role:"listbox",children:[Object(g.jsx)("div",{className:"carousel-item active",children:Object(g.jsx)("img",{className:"d-block img-fluid",src:"http://placehold.it/900x350",alt:"First slide"})}),Object(g.jsx)("div",{className:"carousel-item",children:Object(g.jsx)("img",{className:"d-block img-fluid",src:"http://placehold.it/900x350",alt:"Second slide"})}),Object(g.jsx)("div",{className:"carousel-item",children:Object(g.jsx)("img",{className:"d-block img-fluid",src:"http://placehold.it/900x350",alt:"Third slide"})})]}),Object(g.jsxs)("a",{className:"carousel-control-prev",href:"#carouselExampleIndicators",role:"button","data-slide":"prev",children:[Object(g.jsx)("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),Object(g.jsx)("span",{className:"sr-only",children:"Previous"})]}),Object(g.jsxs)("a",{className:"carousel-control-next",href:"#carouselExampleIndicators",role:"button","data-slide":"next",children:[Object(g.jsx)("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),Object(g.jsx)("span",{className:"sr-only",children:"Next"})]})]}),Object(g.jsx)("div",{className:"row",children:Object(g.jsx)("div",{className:"col-lg-4 col-md-6 mb-4",children:Object(g.jsx)("div",{dangerouslySetInnerHTML:{__html:this.state.product}})})})]})]})})}}]),a}(s.Component),w=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(){return Object(d.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return Object(g.jsx)("footer",{className:"py-5 bg-dark",children:Object(g.jsx)("div",{className:"container",children:Object(g.jsx)("p",{className:"m-0 text-center text-white",children:"Copyright \xa9 ShopMet 2021"})})})}}]),a}(s.Component),L=function(e){Object(b.a)(a,e);var t=Object(j.a)(a);function a(e){var s;return Object(d.a)(this,a),(s=t.call(this,e)).state={toggleLogin:!1,toggleRegister:!1,isAuthenticated:!1,current_user:{}},s.handleToggleLoginCallback=function(){s.setState({toggleLogin:!s.state.toggleLogin,toggleRegister:!1})},s.handleToggleRegisterCallback=function(){s.setState({toggleLogin:!1,toggleRegister:!s.state.toggleRegister})},s.handleLogin=function(){s.tryIsAuthenticated().then()},s.handleLogoutCallback=function(){console.log("HandleLogout i home"),s.tryLogout().then(),s.tryIsAuthenticated().then()},s.handleLoad=s.handleLoad.bind(Object(u.a)(s)),s}return Object(h.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("load",this.handleLoad)}},{key:"handleLoad",value:function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.tryIsAuthenticated().then();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"tryIsAuthenticated",value:function(){var e=Object(o.a)(i.a.mark((function e(){var t=this;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("http://localhost:3001/api/users/isAuthenticated").then((function(e){t.setState({isAuthenticated:!0}),t.setState({current_user:e.data}),t.setState({toggleLogin:!1}),console.log(t.state.current_user.firstName)})).catch((function(e){t.setState({isAuthenticated:!1}),t.setState({current_user:{}}),console.log("No session available: ",e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"tryLogout",value:function(){var e=Object(o.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Try Logout"),e.next=3,p()({method:"post",url:"http://localhost:3001/logout",data:{}}).then();case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(g.jsxs)(n.a.Fragment,{children:[Object(g.jsx)(k,{}),Object(g.jsx)(C,{}),Object(g.jsx)(w,{}),Object(g.jsx)(x,{toggleLoginCallback:this.handleToggleLoginCallback,toggleRegisterCallback:this.handleToggleRegisterCallback,handleLogoutCallback:this.handleLogoutCallback,isAuthenticated:this.state.isAuthenticated,current_user:this.state.current_user}),this.state.toggleLogin&&Object(g.jsx)(N,{loginCallback:this.handleLogin}),this.state.toggleRegister&&Object(g.jsx)(y,{registerCallback:this.handleToggleLoginCallback})]})}}]),a}(s.Component),A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,60)).then((function(t){var a=t.getCLS,s=t.getFID,n=t.getFCP,c=t.getLCP,r=t.getTTFB;a(e),s(e),n(e),c(e),r(e)}))};r.a.render(Object(g.jsx)(n.a.StrictMode,{children:Object(g.jsx)(L,{})}),document.getElementById("root")),A()}},[[58,1,2]]]);
//# sourceMappingURL=main.31cd8da0.chunk.js.map