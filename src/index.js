import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { SkiDayCount } from './containers/login'
import { LoginForm } from './containers/login'
// import { Login } from './containers/login'

import Login from "./containers/login";

// <Route path="/login" exact component={Login} />

window.React = React

// render(
// 	<SkiDayCount
// 	total={50}
// 	powder={20}
// 	backcountry={10}
// 	goal={100}
// 	/>,
// 	document.getElementById('react-container')
// )
	// <Route path="/login" exact component={Login} />

	     //  <ul>
      //   <li>
      //     <Link to="/">Home</Link>
      //   </li>
      //   <li>
      //     <Link to="/about">About</Link>
      //   </li>
      //   <li>
      //     <Link to="/login">Login</Link>
      //   </li>
      // </ul>

      // <hr />

render(
	<Router>
	<div>
      	<Route path="/" exact component={Login} />
  	</div>
	</Router>,
	document.getElementById('react-container')
)