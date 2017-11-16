import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/materialize.css'

class Preloader extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            </MuiThemeProvider>

        );
    }
}

export default Preloader;