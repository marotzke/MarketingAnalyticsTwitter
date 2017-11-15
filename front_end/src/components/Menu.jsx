import React, { Component } from 'react';
import MainItemList from './MainItemList';


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.setState({ loading: false })
    }

    render() {
            return (
                <div className="row">
                    <div className="col s12 m4 l2"></div>
                    <div className="col s12 m4 l7"><MainItemList /></div>
                    <div className="col s12 m4 l3"></div>
                </div>
            );
        }
}

export default Menu;