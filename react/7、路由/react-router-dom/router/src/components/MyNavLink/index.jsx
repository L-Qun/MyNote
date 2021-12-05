import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class index extends Component {
    render() {
        return (
            <div>
                <NavLink activeClassName="active" className="list-group-item" {...this.props}/>
            </div>
        )
    }
}
