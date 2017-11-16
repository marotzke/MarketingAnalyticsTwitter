
export default window.product = {

    getData: (callback) => {
        fetch('http://localhost:5000/item', {
            method: 'GET',
        }).then((response) => {
            callback(response)                                    
        })
    }
}