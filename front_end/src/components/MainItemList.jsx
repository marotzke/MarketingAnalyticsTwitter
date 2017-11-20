import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import dataColector from '../actions/product';
import {BarChart, Bar,Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Preloader from './Preloader'

class MainItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            pos: true,
            neg: true,
            neu: true,
            count: false,
            realtime: true,
        }
    }

    componentWillMount = () => {
        dataColector.subscribe("pos",(newValue) => {
            this.setState({pos : newValue})
        })
        dataColector.subscribe("neg",(newValue) => {
            this.setState({neg : newValue})
        })
        dataColector.subscribe("neu",(newValue) => {
            this.setState({neu : newValue})
        })
        dataColector.subscribe("count",(newValue) => {
            this.setState({count : newValue})
        })
        dataColector.subscribe("realtime",(newValue) => {
            this.setState({realtime : newValue})
            if(newValue){
                this.setState({data: []})
                this.interval = setInterval(this.handleMostRecentData, 7000);                
            }else{
                clearInterval(this.interval);
            }
        })
        dataColector.subscribe("data",(newValue) => {
            this.setState({data : newValue})
        })
    }
    componentDidMount = () => {
        this.interval = setInterval(this.handleMostRecentData, 7000);
    }

    handleData = () => {
        dataColector.getData
    }

    handleMostRecentData = () => {
        dataColector.getRealTimeData((response) => {
            if(response.status === 200){
                let data = response.json().then((val) => {
                    var append = false                    
                    var item = {
                        name: val['timestamp'],
                        positive: parseInt(val['data']['positive']),
                        negative: parseInt(val['data']['negative']),
                        neutral: parseInt(val['data']['neutral']),
                        count: parseInt(val['data']['count']),
                    }
                    if(this.state.data.length === 0){
                        append = true
                    }
                    else if(this.state.data[-1] !== item){
                        append = true
                    }
                    if(append){
                        var newList = []
                        this.state.data.forEach((value) => {
                            newList.push(value);
                        })
                        newList.push(item)
                        // newList.concat(this.state.data)
                        this.setState({data: newList})
                        // this.state.data.push(newData)
                        console.log("here")
                        append = false                
                    }
                    console.log(item)                                   
            })
            }  
        })          
    }

    render() {
            return (
                <div>
                    <Card>
                        <CardTitle title='"trump"'/>
                        <div >
                        {
                            this.state.data.length !== 0 ?
                        <BarChart width={900} height={450} data={this.state.data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            {!this.state.realtime ? <Brush dataKey='name' height={30} stroke="#FFC000"/> : null }
                            {this.state.pos ? <Bar dataKey="positive" fill="#82ca9d" /> : null}
                            {this.state.neu ? <Bar dataKey="neutral" fill="#dbdb83" /> : null}
                            {this.state.neg ? <Bar dataKey="negative" fill="#db8785" /> : null}
                            {this.state.count ? <Bar dataKey="count" fill="#77a9f9" /> : null}
                        </BarChart>
                        : <div>{this.state.realtime ? <Preloader/> : null}</div>}
                        </div>
                    </Card>
                </div>
            );
    }
}

export default MainItemList;