import React, { Component } from 'react'

export default class index extends Component {
    render() {
        return (
            <div>
                <div class="row">
                <div class="col-xs-offset-2 col-xs-8">
                    <div class="page-header"><h2>React Router Demo</h2></div>
                </div>
                </div>
                <div class="row">
                <div class="col-xs-2 col-xs-offset-2">
                    <div class="list-group">
                    <a class="list-group-item active" href="./about.html">About</a>
                    <a class="list-group-item" href="./home.html">Home</a>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
