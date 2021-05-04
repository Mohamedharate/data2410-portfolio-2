(this["webpackJsonpportfolio2-group7"]=this["webpackJsonpportfolio2-group7"]||[]).push([[0],{44:function(e,t,a){},48:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var s=a(1),c=a.n(s),n=a(21),r=a.n(n),i=(a(44),a(45),a(46),a(48),a(3)),l=a.n(i),o=a(11),d=a(28),h=a(4),u=a(5),j=a(17),m=a(7),b=a(6),p=a(10),g=a.n(p),x=a(13),O=a(9),f=a(0),v=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){var e;Object(h.a)(this,a);for(var s=arguments.length,c=new Array(s),n=0;n<s;n++)c[n]=arguments[n];return(e=t.call.apply(t,[this].concat(c))).state={},e.handleLogin=function(){e.props.toggleLoginCallback()},e.handleRegister=function(){e.props.toggleRegisterCallback()},e.handleShoppingCart=function(){e.props.toggleShoppingCartCallback()},e.handleLogout=function(){e.props.handleLogoutCallback()},e}return Object(u.a)(a,[{key:"render",value:function(){return Object(f.jsx)("header",{children:Object(f.jsxs)("nav",{className:"navbar navbar-expand-md navbar-dark fixed-top bg-dark",children:[Object(f.jsxs)("div",{className:"container-fluid",children:[Object(f.jsx)("img",{className:"navbar-logo",src:"/LogoMet.svg",alt:""}),Object(f.jsx)("a",{className:"navbar-brand"}),Object(f.jsx)("button",{className:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarCollapse","aria-controls":"navbarCollapse","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(f.jsx)("span",{className:"navbar-toggler-icon",children:"tag"})}),Object(f.jsx)("div",{className:"collapse navbar-collapse",id:"navbarCollapse",children:Object(f.jsxs)("ul",{className:"navbar-nav me-auto mb-2 mb-md-0",children:[Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(x.b,{to:"/",className:"nav-link active","aria-current":"page",children:"Home"})}),Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)(x.b,{to:"/order",className:"nav-link",href:"#",tabIndex:"-1",children:"Orders"})}),Object(f.jsx)("li",{className:"nav-item",children:Object(f.jsx)("button",{onClick:this.handleShoppingCart,className:"btn text-white",children:Object(f.jsx)("i",{className:"material-icons",children:"shopping_cart"})})})]})})]}),!this.props.isAuthenticated&&Object(f.jsx)("button",{onClick:this.handleLogin,className:"btn text-white float-right mr-2",children:"Login"}),!this.props.isAuthenticated&&Object(f.jsx)("button",{onClick:this.handleRegister,className:"btn text-white float-right mr-2",children:"Register"}),this.props.isAuthenticated&&Object(f.jsxs)("div",{className:"welcomeText text-white float-right mr-2",children:["Welcome, ",this.props.current_user.firstName]}),this.props.isAuthenticated&&Object(f.jsx)("button",{onClick:this.handleLogout,className:"btn text-white float-right mr-2",children:"Logout"})]})})}}]),a}(s.Component),N=a(20),y=a(27),C=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){return Object(h.a)(this,a),t.call(this,e)}return Object(u.a)(a,[{key:"render",value:function(){return Object(f.jsxs)(y.a,{className:"mt-4",variant:"danger",children:[Object(f.jsx)(y.a.Heading,{children:"Oh snap!"}),Object(f.jsx)("hr",{}),Object(f.jsx)("p",{children:this.props.feedback_error_text})]})}}]),a}(s.Component),w=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={email:"",password:"",toggle_error_feedback:!1,feedback_text:""},s.handleInputChange=function(e){var t=e.target,a=t.value,c=t.name;s.setState(Object(N.a)({},c,a))},s.handleSubmit=function(e){e.preventDefault(),s.postLoginDetails().then((function(e){s.props.loginCallback()})).catch((function(e){console.log(e)}))},s.handleInputChange=s.handleInputChange.bind(Object(j.a)(s)),s}return Object(u.a)(a,[{key:"postLoginDetails",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,g()({method:"post",url:"http://localhost:3001/api/users/signIn",data:{email:this.state.email,password:this.state.password}}).then((function(e){console.log("Status:",e.status),200===e.status&&(t.setState({feedback_text:e.data.message}),t.setState({toggle_error_feedback:!1}))})).catch((function(e){e.response?(console.log(e.response.data),console.log(e.response.status),t.setState({feedback_text:e.response.data}),t.setState({toggle_error_feedback:!0})):e.request?console.log(e.request):console.log("Error",e.message)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(f.jsx)("div",{className:"loginContainer",children:Object(f.jsx)("div",{id:"login_div",className:"row",children:Object(f.jsx)("div",{className:"col-md-12",children:Object(f.jsxs)("form",{onSubmit:this.handleSubmit,className:"form-signin",children:[Object(f.jsx)("div",{className:"text-center mb-4",children:Object(f.jsx)("h4",{children:"Sign in to store"})}),Object(f.jsxs)("div",{className:"form-label-group",children:[Object(f.jsxs)("div",{className:"input-group",children:[Object(f.jsx)("div",{className:"input-group-prepend",children:Object(f.jsx)("div",{className:"input-group-text mt-2",id:"basic-addon1",children:Object(f.jsx)("i",{className:"material-icons",children:"mail"})})}),Object(f.jsx)("input",{type:"email",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Email",name:"email",required:"*",autoFocus:"","aria-describedby":"basic-addon1"})]}),Object(f.jsxs)("div",{className:"input-group",children:[Object(f.jsx)("div",{className:"input-group-prepend",children:Object(f.jsx)("div",{className:"input-group-text mt-2",id:"basic-addon1",children:Object(f.jsx)("i",{className:"material-icons",children:"vpn_key"})})}),Object(f.jsx)("input",{type:"Password",onChange:this.handleInputChange,className:"form-control mt-2",pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}",title:"Password must contain at least 1 upper and lower case letter, 1 number and\r be at least 8 characters long.",placeholder:"Password",name:"password",required:"*",autoFocus:""})]})]}),Object(f.jsx)("button",{type:"submit",className:"btn btn-lg btn-primary btn-block mt-2",children:"Sign in!"}),this.state.toggle_error_feedback&&Object(f.jsx)(C,{feedback_error_text:this.state.feedback_text})]})})})})}}]),a}(s.Component),k=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={firstName:"",lastName:"",email:"",password:"",country:"",city:"",zipCode:"",street:"",phoneNumber:"",toggle_error_feedback:!1,feedback_text:""},s.handleSubmit=function(e){e.preventDefault(),s.submitUserDetails().then((function(e){})).catch((function(e){}))},s.handleInputChange=s.handleInputChange.bind(Object(j.a)(s)),s}return Object(u.a)(a,[{key:"handleInputChange",value:function(e){var t=e.target,a=t.value,s=t.name;this.setState(Object(N.a)({},s,a))}},{key:"submitUserDetails",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,g()({method:"post",url:"http://localhost:3001/api/register/",data:{firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password,country:this.state.country,city:this.state.city,zipCode:this.state.zipCode,street:this.state.street,phoneNumber:this.state.phoneNumber}}).then((function(e){console.log("Data:",e.data),console.log("Status:",e.status),t.setState({toggle_error_feedback:!1}),t.setState({feedback_text:e.data.message}),t.props.registerCallback()})).catch((function(e){e.response?(console.log(e.response.data.message),console.log(e.response.status),t.setState({toggle_error_feedback:!0}),t.setState({feedback_text:e.response.data.message})):e.request?console.log(e.request):console.log("Error",e.message)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(f.jsx)("div",{className:"registerContainer",children:Object(f.jsx)("div",{id:"login_div",className:"row",children:Object(f.jsx)("div",{className:"col-md-12",children:Object(f.jsxs)("form",{onSubmit:this.handleSubmit,className:"form-signin",children:[Object(f.jsx)("div",{className:"text-center mb-4",children:Object(f.jsx)("h4",{children:"Register User"})}),Object(f.jsxs)("div",{className:"form-label-group",children:[Object(f.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Firstname",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20}(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20})?$",title:"First name has to start with an upper case letter and have at least 2 characters.",name:"firstName",required:!0,autoFocus:""}),Object(f.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Lastname",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5 ,.'-]{1,20}$",title:"Last name has to start with an upper case letter and have at least 2 characters.",name:"lastName",required:!0,autoFocus:""}),Object(f.jsx)("input",{type:"email",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Email",name:"email",required:!0,autoFocus:""}),Object(f.jsx)("input",{type:"Password",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Password",pattern:"^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}",title:"Password must contain at least 1 upper and lower case letter, 1 number and be at least 8 characters long.",name:"password",required:!0,autoFocus:""}),Object(f.jsxs)("select",{name:"country",onChange:this.handleInputChange,className:"custom-select my-1 mr-sm-2 mt-2",required:!0,children:[Object(f.jsx)("option",{value:"",defaultValue:"",children:"Choose..."}),Object(f.jsx)("option",{value:"Norway",children:"Norway"}),Object(f.jsx)("option",{value:"Sweden",children:"Sweden"}),Object(f.jsx)("option",{value:"Denmark",children:"Denmark"})]}),Object(f.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"City",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20}(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?$",title:"City name has to start with an upper case letter and have at least 2 characters.",name:"city",required:!0,autoFocus:""}),Object(f.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Zip Code",pattern:"^\\d{4,5}(?:[-\\s]\\d{4})?$",name:"zipCode",required:!0,autoFocus:""}),Object(f.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Street name",pattern:"^[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20}([A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?(\\s[A-Z\xc6\xd8\xc5]+[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5 ,.'-]{1,20})?\\s\\d+\\s?[a-z\xe6\xf8\xe5A-Z\xc6\xd8\xc5]?",title:"The address should follow this format:\r <Address> <Number><Letter(optional)>.",name:"street",required:!0,autoFocus:""}),Object(f.jsx)("input",{type:"text",onChange:this.handleInputChange,className:"form-control mt-2",placeholder:"Phone",pattern:"^(\\+|00)?[1-9][0-9 \\-\\(\\)\\.]{7,}$",title:"The address should follow this format:\r <Country code(optional)> <Number(At least 7 digits>.",name:"phoneNumber",required:!0,autoFocus:""})]}),Object(f.jsx)("button",{type:"submit",className:"btn btn-lg btn-primary btn-block mt-2",children:"Sign Up!"}),this.state.toggle_error_feedback&&Object(f.jsx)(C,{feedback_error_text:this.state.feedback_text})]})})})})}}]),a}(s.Component),_=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return Object(f.jsxs)("div",{className:"bestsellers",children:[Object(f.jsx)("h2",{children:"About us"}),Object(f.jsx)("main",{children:Object(f.jsx)("div",{className:"container marketing",children:Object(f.jsxs)("div",{className:"row",children:[Object(f.jsxs)("div",{className:"col-lg-4",children:[Object(f.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(f.jsx)("title",{children:"Placeholder"}),Object(f.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(f.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(f.jsx)("h2",{children:"Organic coffee"}),Object(f.jsx)("p",{children:"Organic coffee blah bah"}),Object(f.jsx)("p",{children:Object(f.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]}),Object(f.jsxs)("div",{className:"col-lg-4",children:[Object(f.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(f.jsx)("title",{children:"Placeholder"}),Object(f.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(f.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(f.jsx)("h2",{children:"Excellent selection"}),Object(f.jsx)("p",{children:"The best machines on the market"}),Object(f.jsx)("p",{children:Object(f.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]}),Object(f.jsxs)("div",{className:"col-lg-4",children:[Object(f.jsxs)("svg",{className:"bd-placeholder-img rounded-circle",width:"140",height:"140",xmlns:"http://www.w3.org/2000/svg",role:"img","aria-label":"Placeholder: 140x140",preserveAspectRatio:"xMidYMid slice",focusable:"false",children:[Object(f.jsx)("title",{children:"Placeholder"}),Object(f.jsx)("rect",{width:"100%",height:"100%",fill:"#777"}),Object(f.jsx)("text",{x:"50%",y:"50%",fill:"#777",dy:".3em",children:"140x140"})]}),Object(f.jsx)("h2",{children:"Small business"}),Object(f.jsx)("p",{children:"And lastly this, the third column of representative placeholder content."}),Object(f.jsx)("p",{children:Object(f.jsx)("a",{className:"btn btn-secondary",href:"#",children:"View details \xbb"})})]})]})})})]})}}]),a}(s.Component),S=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={product:[]},s}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,g()({method:"get",url:"http://localhost:3001/api/products/get/allProducts"}).then((function(e){t.setState({product:e.data})})).catch((function(e){e.data||console.log(e.data),console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(f.jsx)("div",{className:"container",children:Object(f.jsxs)("div",{className:"row",children:[Object(f.jsxs)("div",{className:"col-lg-3",children:[Object(f.jsx)("h1",{className:"my-4",children:"ShopMet"}),Object(f.jsxs)("div",{className:"list-group",children:[Object(f.jsx)(x.b,{to:"/category/coffee",className:"list-group-item",children:"Coffee"}),Object(f.jsx)(x.b,{to:"/category/machines",className:"list-group-item",children:"Coffee and espresso machines"}),Object(f.jsx)(x.b,{to:"/category/access",className:"list-group-item",children:"Accessories"}),Object(f.jsx)(x.b,{to:"/",className:"list-group-item",children:"All"})]})]}),Object(f.jsxs)("div",{className:"col-lg-9",children:[Object(f.jsxs)("div",{id:"carouselExampleIndicators",className:"carousel slide my-4","data-ride":"carousel",children:[Object(f.jsxs)("ol",{className:"carousel-indicators",children:[Object(f.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"0",className:"active"}),Object(f.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"1"}),Object(f.jsx)("li",{"data-target":"#carouselExampleIndicators","data-slide-to":"2"})]}),Object(f.jsxs)("div",{className:"carousel-inner",role:"listbox",children:[Object(f.jsx)("div",{className:"carousel-item active",children:Object(f.jsx)("img",{className:"d-block img-fluid",src:"https://www.fino.eu/wp-content/uploads/2013/12/Coffee-Filters.jpg",alt:"First slide"})}),Object(f.jsx)("div",{className:"carousel-item",children:Object(f.jsx)("img",{className:"d-block img-fluid",src:"https://www.thegeneralpost.com/wp-content/uploads/2021/01/cofee-900x350.jpg",alt:"Second slide"})}),Object(f.jsx)("div",{className:"carousel-item",children:Object(f.jsx)("img",{className:"d-block img-fluid",src:"https://i0.wp.com/www.toptensell.com/wp-content/uploads/2020/05/best-coffee-makers.jpg?fit=900%2C350&ssl=1",alt:"Third slide"})})]}),Object(f.jsxs)("a",{className:"carousel-control-prev",href:"#carouselExampleIndicators",role:"button","data-slide":"prev",children:[Object(f.jsx)("span",{className:"carousel-control-prev-icon","aria-hidden":"true"}),Object(f.jsx)("span",{className:"sr-only",children:"Previous"})]}),Object(f.jsxs)("a",{className:"carousel-control-next",href:"#carouselExampleIndicators",role:"button","data-slide":"next",children:[Object(f.jsx)("span",{className:"carousel-control-next-icon","aria-hidden":"true"}),Object(f.jsx)("span",{className:"sr-only",children:"Next"})]})]}),Object(f.jsx)("div",{className:"row",dangerouslySetInnerHTML:{__html:this.state.product}})]})]})})}}]),a}(s.Component),I=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return Object(f.jsx)("footer",{className:"py-5 bg-dark",children:Object(f.jsx)("div",{className:"container",children:Object(f.jsx)("p",{className:"m-0 text-center text-white",children:"Copyright \xa9 ShopMet 2021"})})})}}]),a}(s.Component),A=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={name:"",price:0,descriptionLong:""},s.state={products:[],name:"",price:0,description:"",itemId:"",imageUrl:"",email:"",quantity:0},s}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,g()({method:"get",url:"http://localhost:3001/api/products/get/"+this.props.match.params.itemId}).then((function(e){t.setState({name:e.data.name,price:e.data.price,description:e.data.descriptionLong,image:"data:image/png;base64,"+e.data.imageUrl[0].image,itemId:e.data.itemId})})).catch((function(e){e.data||console.log(e.data),console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"postToCart",value:function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({method:"post",url:"http://localhost:3001/api/cart/addToCart/:email",data:{}}).then((function(e){console.log("data:",e.data)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.price;return Object(f.jsx)("div",{className:"container",children:Object(f.jsxs)("div",{className:"row product",children:[Object(f.jsxs)("div",{className:"col-lg-3",children:[Object(f.jsx)("h1",{className:"my-4",children:"ShopMet"}),Object(f.jsxs)("div",{className:"list-group",children:[Object(f.jsx)(x.b,{to:"/category/coffee",className:"list-group-item",children:"Coffee"}),Object(f.jsx)(x.b,{to:"/category/machines",className:"list-group-item",children:"Coffee and espresso machines"}),Object(f.jsx)(x.b,{to:"/category/access",className:"list-group-item",children:"Accessories"}),Object(f.jsx)(x.b,{to:"/",className:"list-group-item",children:"All"})]})]}),Object(f.jsxs)("div",{className:"col-lg-9",children:[Object(f.jsxs)("div",{className:"card mt-4",children:[Object(f.jsx)("img",{className:"card-img-top",src:this.state.image,alt:"..."}),Object(f.jsxs)("div",{className:"card-body",children:[Object(f.jsx)("h3",{className:"card-title",children:this.state.name}),Object.values(e).map((function(e){return Object(f.jsxs)("h4",{className:"price",children:["$",e]},"p")})),Object(f.jsx)("p",{className:"card-text",children:this.state.description}),Object(f.jsx)("span",{className:"text-warning",children:"\u2605 \u2605 \u2605 \u2605 \u2606"}),"4.0 stars",Object(f.jsx)("button",{type:"submit",className:"btn btn-lg btn-success btn-block mt-2",onClick:this.postToCart,children:"Add to cart"})]})]}),Object(f.jsxs)("div",{className:"card card-outline-secondary my-4",children:[Object(f.jsx)("div",{className:"card-header",children:"Product Reviews"}),Object(f.jsxs)("div",{className:"card-body",children:[Object(f.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus."}),Object(f.jsx)("small",{className:"text-muted",children:"Posted by Anonymous on 3/1/21"}),Object(f.jsx)("hr",{}),Object(f.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus."}),Object(f.jsx)("small",{className:"text-muted",children:"Posted by Anonymous on 3/1/21"}),Object(f.jsx)("hr",{}),Object(f.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus."}),Object(f.jsx)("small",{className:"text-muted",children:"Posted by Anonymous on 3/1/21"}),Object(f.jsx)("hr",{}),Object(f.jsx)(x.b,{to:"/addReview/"+this.state.itemId,className:"btn btn-success",children:"Leave a Review"})]})]})]})]})})}}]),a}(s.Component),L=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).handleChange=function(e){s.setState(Object(N.a)({},e.target.name,e.target.value))},s.handleSubmit=function(e){e.preventDefault(),s.putReview().then((function(e){})).catch((function(e){}))},s.state={dateTime:(new Date).toDateString(),reviewText:s.props.reviewText||"",reviewStars:s.props.reviewStars||""},s.handleChange=s.handleChange.bind(Object(j.a)(s)),s}return Object(u.a)(a,[{key:"putReview",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,g()({method:"post",url:"/api/products/addReview/:itemId",data:{user:this.state.user,mail:this.state.mail,reviewText:this.state.reviewText,rating:this.state.rating}}).then((function(e){console.log("Data: ",e.data),t.setState({reviewText:e.data.message})})).catch((function(e){e.response&&console.log(e.response.data)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this,e.next=3,g()({method:"get",url:"http://localhost:3001/api/products/get/"+this.props.match.params.itemId}).then((function(e){t.setState({name:e.data.name,image:"data:image/png;base64,"+e.data.imageUrl[0].image,itemId:e.data.itemId})})).catch((function(e){e.data||console.log(e.data),console.log(e)}));case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.reviewStars;return Object(f.jsx)("div",{className:"review",children:Object(f.jsx)("div",{className:"container",children:Object(f.jsx)("div",{children:Object(f.jsx)("div",{width:"100%",children:Object(f.jsxs)("div",{className:"row",children:[Object(f.jsxs)("div",{className:"col-lg-6",children:[Object(f.jsxs)("div",{className:"card-header",children:["Add review for item ",this.state.name]}),Object(f.jsx)("div",{className:"card-body",children:Object(f.jsx)("form",{onSubmit:this.handleSubmit,children:Object(f.jsxs)("fieldset",{children:[Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{className:"col-md-9 control-label",children:"Full Name"}),Object(f.jsx)("div",{className:"col-md-9",children:Object(f.jsx)("input",{id:"name",name:"name",type:"text",placeholder:"Your name",className:"form-control"})})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{className:"col-md-9 control-label",children:"Your E-mail"}),Object(f.jsx)("div",{className:"col-md-9",children:Object(f.jsx)("input",{id:"email",name:"email",type:"text",placeholder:"Your email",className:"form-control"})})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{className:"col-md-9 control-label",children:"Your message"}),Object(f.jsx)("div",{className:"col-md-9",children:Object(f.jsx)("textarea",{className:"form-control",id:"message",name:"message",placeholder:"Please enter your feedback here...",rows:"5"})})]}),Object(f.jsxs)("div",{className:"form-group",children:[Object(f.jsx)("label",{className:"rating",htmlFor:"message",children:"Your rating"}),Object(f.jsx)("div",{className:"col-md-9",children:Object(f.jsx)("select",{name:"rating",id:"reviewStars",className:"star_rate",value:e,onChange:this.handleChange,children:[{label:"1",value:"1"},{label:"2",value:"2"},{label:"3",value:"3"},{label:"4",value:"4"},{label:"5",value:"5"}].map((function(e){return Object(f.jsx)("option",{value:e.value,children:e.label},e.value)}))})})]}),Object(f.jsx)("button",{type:"submit",className:"btn btn-success",children:"Send review"})]})})})]}),Object(f.jsx)("div",{className:"col-lg-6",children:Object(f.jsx)("img",{className:"card-img",src:this.state.image,alt:"picture of product"})})]})})})})})}}]),a}(s.Component),q=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return Object(f.jsxs)("div",{className:"shoppingCartObject m-1",children:[Object(f.jsxs)("div",{className:"row text-nowrap",children:[Object(f.jsx)("div",{className:"col-4",children:Object(f.jsxs)("p",{className:"mt-1 text-center",children:[Object(f.jsx)("button",{onClick:this.props.quantity_increase,className:"btn-circle btn-dark btn-sm rounded-circle mr-2",children:"+"}),this.props.shoppingCartObject.quantity,Object(f.jsx)("button",{onClick:this.props.quantity_decrease,className:"btn-circle btn-dark btn-sm rounded-circle ml-2",children:"-"})]})}),Object(f.jsx)("div",{className:"col-sm-3",children:Object(f.jsxs)("p",{className:"mt-1 text-right",children:["$",this.props.shoppingCartObject.price*this.props.shoppingCartObject.quantity]})}),Object(f.jsx)("div",{className:"col-sm-5",children:Object(f.jsx)("p",{className:"mt-1 text-center",children:this.props.shoppingCartObject.name})})]}),Object(f.jsx)("div",{className:"row",children:Object(f.jsx)("div",{className:"col-12",children:Object(f.jsx)("hr",{})})})]})}}]),a}(s.Component),T=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return Object(f.jsxs)("div",{className:"shoppingCartContainer",children:[Object(f.jsxs)("div",{className:"shoppingCartHeader",children:[Object(f.jsxs)("div",{className:"row",children:[Object(f.jsx)("div",{className:"col-sm-7",children:Object(f.jsx)("h4",{className:"text-center m-3",children:"Shopping Cart"})}),Object(f.jsx)("div",{className:"col-sm-5",children:Object(f.jsx)("button",{className:"btn btn-dark float-right mt-3",children:"Check out!"})})]}),this.props.empty_cart&&Object(f.jsx)("p",{className:"text-center mt-4",children:Object(f.jsx)("strong",{children:this.props.empty_cart_message})}),!this.props.empty_cart&&Object(f.jsxs)("div",{className:"row text-nowrap mt-2",children:[Object(f.jsx)("div",{className:"col-sm-4 text-center",children:Object(f.jsx)("h5",{children:"Quantity:"})}),Object(f.jsx)("div",{className:"col-sm-3 text-center",children:Object(f.jsx)("h5",{children:"Price:"})}),Object(f.jsx)("div",{className:"col-sm-5 text-center",children:Object(f.jsx)("h5",{children:"Product:"})})]})]}),!this.props.empty_cart&&Object(f.jsx)("div",{className:"shoppingCartObjectsContainer",children:this.props.cart_objects.map((function(t){return Object(f.jsx)(q,{shoppingCartObject:t,quantity_increase:function(){return e.props.quantity_increase(t.itemId)},quantity_decrease:function(){return e.props.quantity_decrease(t.itemId)}},t.id)}))})]})}}]),a}(s.Component),D=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={user:"",orders:[]},s}return Object(u.a)(a,[{key:"getOrder",value:function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({method:"get",url:"http://localhost:3001/api/orders/getUserOrders/"+this.props.match.email}).then((function(e){this.setState({email:e.data.email,orderNumber:e.data.orderNumber,products:e.data.products,total:e.data.total})})).catch((function(e){console.log(e.data)}));case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.orderNumber;return Object(f.jsx)("div",{className:"previous-orders",children:Object(f.jsxs)("table",{className:"table",children:[Object(f.jsx)("thead",{children:Object(f.jsxs)("tr",{children:[Object(f.jsx)("th",{children:"ID"}),Object(f.jsx)("th",{children:"Total"})]})}),Object(f.jsx)("tbody",{children:e.map((function(e){return Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:e}),Object(f.jsx)("td",{children:e.total})]},e)}))})]})})}}]),a}(s.Component),P=function(e){Object(m.a)(a,e);var t=Object(b.a)(a);function a(e){var s;return Object(h.a)(this,a),(s=t.call(this,e)).state={toggleLogin:!1,toggleRegister:!1,toggleShoppingCart:!1,isAuthenticated:!1,current_user:{},empty_cart:!1,empty_cart_message:"Nothing to show here.",cart_objects:[]},s.handleToggleLoginCallback=function(){s.setState({toggleLogin:!s.state.toggleLogin,toggleRegister:!1})},s.handleToggleRegisterCallback=function(){s.setState({toggleLogin:!1,toggleRegister:!s.state.toggleRegister})},s.handleToggleShoppingCartCallback=function(){s.setState({toggleShoppingCart:!s.state.toggleShoppingCart})},s.handleQuantityIncreaseCallback=function(e){var t=Object(d.a)(s.state.cart_objects),a=t.findIndex((function(t){return t.itemId===e}));t[a].quantity++,s.setState({cart_objects:t})},s.handleQuantityDecreaseCallback=function(e){var t=Object(d.a)(s.state.cart_objects),a=t.findIndex((function(t){return t.itemId===e}));t[a].quantity--,s.setState({cart_objects:t})},s.handleLoginCallback=function(){s.tryIsAuthenticated().then()},s.handleLogoutCallback=function(){s.tryLogout().then(),s.tryIsAuthenticated().then(),s.getCartObjects().then(),s.state.toggleShoppingCart=!1},s.handleLoad=s.handleLoad.bind(Object(j.a)(s)),s}return Object(u.a)(a,[{key:"componentDidMount",value:function(){window.addEventListener("load",this.handleLoad)}},{key:"handleLoad",value:function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.tryIsAuthenticated().then();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"tryIsAuthenticated",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("http://localhost:3001/api/users/isAuthenticated").then((function(e){t.setState({isAuthenticated:!0}),t.setState({current_user:e.data}),t.setState({toggleLogin:!1}),t.getCartObjects()})).catch((function(e){t.setState({isAuthenticated:!1}),t.setState({current_user:{}})}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"tryLogout",value:function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g()({method:"post",url:"http://localhost:3001/logout",data:{}}).then();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getCartObjects",value:function(){var e=Object(o.a)(l.a.mark((function e(){var t=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.a.get("http://localhost:3001/api/cart/getCart").then((function(e){return e.data.message?(t.state.empty_cart=!0,t.state.empty_cart_message=e.data.message,!0):(t.state.empty_cart=!1,t.state.cart_objects=e.data.products,!1)})).catch((function(e){console.log(e.data)}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(f.jsx)(x.a,{children:Object(f.jsxs)(c.a.Fragment,{children:[Object(f.jsx)(v,{toggleLoginCallback:this.handleToggleLoginCallback,toggleRegisterCallback:this.handleToggleRegisterCallback,toggleShoppingCartCallback:this.handleToggleShoppingCartCallback,handleLogoutCallback:this.handleLogoutCallback,isAuthenticated:this.state.isAuthenticated,current_user:this.state.current_user}),Object(f.jsxs)(O.c,{children:[Object(f.jsx)(O.a,{exact:!0,path:"/",component:S}),Object(f.jsx)(O.a,{path:"/products/:itemId",component:A}),Object(f.jsx)(O.a,{path:"/addReview/:itemId",component:L}),Object(f.jsx)(O.a,{path:"/chart",component:T}),Object(f.jsx)(O.a,{path:"/orders",component:D})]}),this.state.toggleLogin&&Object(f.jsx)(w,{loginCallback:this.handleLoginCallback}),this.state.toggleRegister&&Object(f.jsx)(k,{registerCallback:this.handleToggleLoginCallback}),this.state.toggleShoppingCart&&Object(f.jsx)(T,{quantity_increase:this.handleQuantityIncreaseCallback,quantity_decrease:this.handleQuantityDecreaseCallback,empty_cart:this.state.empty_cart,empty_cart_message:this.state.empty_cart_message,cart_objects:this.state.cart_objects}),Object(f.jsx)(_,{}),Object(f.jsx)(I,{})]})})}}]),a}(s.Component),R=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,75)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),s(e),c(e),n(e),r(e)}))};r.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(P,{})}),document.getElementById("root")),R()}},[[73,1,2]]]);
//# sourceMappingURL=main.abc8786b.chunk.js.map