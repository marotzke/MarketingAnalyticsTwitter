
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(20)



export default window.product = {

    getRealTimeData: (callback) => {
        fetch('http://localhost:5000/rtdata', {
            method: 'GET',
        }).then((response) => {
            callback(response)                                    
        })
    },

    getData: (topic, limit, interval, callback) => {
        fetch('http://localhost:5000/data', {
            method: 'POST',
            body: JSON.stringify({
                topic: topic,
                limit: limit,
                interval: interval
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            callback(res)
        })
    },

    // Component Data Change

    emitValue: (label,value) => {
        emitter.emit(label+'_update', value);
    },

    subscribe: (storeName, callback) => {
        emitter.addListener(`${storeName}_update`, callback)
    },

    unsubscribe: (storeName, callback) => {
        emitter.removeListener(`${storeName}_update`, callback)
    },
}