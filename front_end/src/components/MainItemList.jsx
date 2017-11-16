import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import dataColector from '../actions/product';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Preloader from './Preloader'

class MainItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }
    componentDidMount = () => {
        setInterval(this.handleMostRecentData, 7000);
    }

    handleMostRecentData = () => {
        dataColector.getData((response) => {
            if(response.status === 200){
                let data = response.json().then((val) => {
                    var append = false                    
                    var item = {
                        name: val['timestamp'],
                        positive: parseInt(val['data']['positive']),
                        negative: parseInt(val['data']['negative']),
                        neutral: parseInt(val['data']['neutral']),
                        // count: parseInt(val['data']['count']),
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
                    }
                    console.log(item)                                   
            })
            }  
        })
        // console.log(this.state.data)
          
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
                            <Bar dataKey="positive" fill="#82ca9d" />
                            <Bar dataKey="neutral" fill="#dbdb83" />
                            <Bar dataKey="negative" fill="#db8785" />
                        </BarChart>
                        : <Preloader/>}
                        </div>
                    </Card>
                </div>
            );
    }
}

export default MainItemList;