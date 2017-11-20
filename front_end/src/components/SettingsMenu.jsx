import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import dataColector from '../actions/product';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    block: {
      maxWidth: 150,
      marginLeft: "10px",
      marginRight: "10px"
    },
    block2: {
        maxWidth: 250,
        marginLeft: "10px",
        marginRight: "10px"
      },
    toggle: {
      marginBottom: 16,
    },
    labelStyle: {
     fontSize: 16,
    },
    customWidth: {
        width: 150,
    },
    headline: {
        fontSize: 16,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    customWidth: {
        width: 150,
    },
    button: {
        margin: 12,        
    }
}

class SettingsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstSlider: 0.5,
            pos: true,
            neg: true,
            neu: true,
            count: false,
            realtime: true,
            interval: null,
            limit: null,
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    handleFirstSlider = (event, value) => {
        this.setState({firstSlider: value});
      };

    updateCheckPos = () => {
    this.setState(() => {
        dataColector.emitValue("pos", !this.state.pos)
        return {
        pos: !this.state.pos,
        };
    });
    }

    updateCheckNeg = () => {
    this.setState(() => {
        dataColector.emitValue("neg", !this.state.neg)
        return {
        neg: !this.state.neg,
        };
    });
    }
    
    updateCheckNeu = () => {
        this.setState(() => {
            dataColector.emitValue("neu", !this.state.neu)
            return {
            neu: !this.state.neu,
            };
        });
        }
    

    updateCheckCount = () => {
        this.setState(() => {
            dataColector.emitValue("count", !this.state.count)
            return {
            count: !this.state.count,
            };
        });
        }

    updateToggled = () => {
        this.setState(() => {
            dataColector.emitValue("realtime", !this.state.realtime)
            return {
            realtime: !this.state.realtime,
            };
        });
        }
    
    getTimeUnit = (value) => {
        if(value < 3600){
            return {time: value/60,scale: "minutos"}
        }else if(value >= 3600 && value < 86400){
            return {time: value/3600, scale: "horas"}
        }else if(value >= 86400 && value < 604800){
            return {time: value/86400,scale: "dias"}
        }else{
            return {time: value/604800, scale: "semanas"}
        }
    }

    handleButtonClick = () => {
        var ctx = this
        dataColector.getData("trump",this.state.limit, this.state.interval, (res) => {
            if (res.status === 200) {
                let recieved = res.json().then((result) => {
                    var values = []
                    var prevstate = 0
                    console.log(result)
                    result['data'].forEach(function (pt) {
                        console.log(pt)
                        var time = ctx.getTimeUnit(ctx.state.interval)
                        var item = {
                            name: (prevstate + time["time"]).toString() + " " + time["scale"] + " atrás",
                            positive: parseInt(pt['positive']),
                            negative: parseInt(pt['negative']),
                            neutral: parseInt(pt['neutral']),
                            count: parseInt(pt['count']),
                        }
                        prevstate += time["time"];
                        values.push(item);
                    })
                    dataColector.emitValue("data", values);
                })
            }else{
                alert("An error has occured while fetching data")
            }
        })
    }

    handleChangeInterval = (event, index, value) => this.setState({interval : value});
    handleChangeLimit = (event, index, value) => {this.setState({limit : Math.round(value)}); console.log(Math.round(value))};
        
    
    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title="Filters" subtitle={this.state.message} />
                        <div className='toggle' style={styles.block}>
                            <Toggle
                            label="Real-Time"
                            style={styles.toggle}
                            labelStyle={styles.labelStyle}
                            onToggle= {this.updateToggled} 
                            defaultToggled={true}                     
                            />
                        </div>
                        <div style={styles.block}>
                            <h2 style={styles.headline}>Values</h2>
                            <Checkbox
                            label="Positive"
                            style={styles.checkbox}
                            onCheck={this.updateCheckPos}
                            checked={this.state.pos}                            
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Negative"
                            style={styles.checkbox}
                            onCheck={this.updateCheckNeg}
                            checked={this.state.neg}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Neutral"
                            style={styles.checkbox}
                            onCheck={this.updateCheckNeu}
                            checked={this.state.neu}
                            labelStyle={styles.labelStyle} 
                            />
                            <Checkbox
                            label="Total"
                            style={styles.checkbox}
                            onCheck={this.updateCheckCount}
                            checked={this.state.count}
                            labelStyle={styles.labelStyle} 
                            />
                        </div>
                        { !this.state.realtime ? 
                        <div style={styles.block}>
                            <h2 style={styles.headline}>Values</h2>
                            <SelectField value={this.state.interval}
                                         onChange={this.handleChangeInterval}
                                         style={styles.customWidth}>
                                <MenuItem value={300} primaryText="5 Minutos" />
                                <MenuItem value={600} primaryText="10 Minutos" />
                                <MenuItem value={1800} primaryText="30 Minutos" />
                                <MenuItem value={3600} primaryText="1 Hora" />
                                <MenuItem value={7200} primaryText="2 Horas" />
                                <MenuItem value={18000} primaryText="5 Horas" />
                                <MenuItem value={86400} primaryText="1 Dia" />
                                <MenuItem value={259200} primaryText="3 Dias" />
                                <MenuItem value={604800} primaryText="1 Semana" />
                            </SelectField>
                            {this.state.interval !== null ? 
                            <SelectField value={this.state.limit}
                                         onChange={this.handleChangeLimit}
                                         style={styles.customWidth}>
                                {this.state.interval < 1800 
                                    ? <MenuItem value={1800/this.state.interval} primaryText="30 Minutos" /> : null}
                                {this.state.interval < 3600 
                                    ? <MenuItem value={3600/this.state.interval} primaryText="1 Hora" /> :null} 
                                {this.state.interval < 7200 && this.state.interval >= 600 
                                    ? <MenuItem value={7200/this.state.interval} primaryText="2 Horas" /> :null}
                                {this.state.interval < 18000 && this.state.interval >= 600 
                                    ? <MenuItem value={18000/this.state.interval} primaryText="5 Horas" /> :null}
                                {this.state.interval <= 86400 && this.state.interval >= 1800 
                                    ? <MenuItem value={86400/this.state.interval} primaryText="1 Dia" /> :null}
                                {this.state.interval <= 86400 && this.state.interval >= 1800 
                                    ? <MenuItem value={(86400*3)/this.state.interval} primaryText="3 Dias" /> :null}
                                {this.state.interval >= 86400
                                    ? <MenuItem value={604800/this.state.interval} primaryText="1 Semana" /> :null}
                                {this.state.interval >= 259200 
                                    ? <MenuItem value={(604800*4)/this.state.interval} primaryText="4 Semanas" /> :null}
                                {this.state.interval >= 259200 
                                    ? <MenuItem value={(604800*8)/this.state.interval} primaryText="8 Semanas" /> :null}
                            </SelectField>
                            : null }
                            {
                                this.state.limit ?
                                <RaisedButton onClick={this.handleButtonClick} label="GET DATA" 
                                backgroundColor="#FFC000" labelColor="#FFFFFF" style={styles.button} />                                    
                            : null }
                        </div>
                        : null}
                    </Card>
                </div>
            );
    }
}
export default SettingsMenu;