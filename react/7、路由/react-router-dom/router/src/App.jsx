import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
// import './css/bootstrap.css'
import Headers from './components/Headers'
import MyNavLink from './components/MyNavLink'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
    render() {
        return (
            <div>
                <Headers></Headers>
                <div className="row">
                <div className="col-xs-2 col-xs-offset-2">
                    <div className="list-group">
                        <MyNavLink to="/about">About</MyNavLink>
                        <MyNavLink to="/home">Home</MyNavLink>
                        {/* <a className="list-group-item active" href="./about.html">About</a>
                        <a className="list-group-item" href="./home.html">Home</a> */}
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                    <div className="panel-body">
                        <Route path="/about" component={About}/>
                        <Route path="/home" component={Home}/>
                        <Redirect to="/about"/>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
