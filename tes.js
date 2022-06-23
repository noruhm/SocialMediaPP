const GetLocation = require('location-by-ip');
        const SPOTT_API_KEY = '4add49e12cmsh77b2507efa94f0ep1655eajsnce8669274ed4';

        let location = ''

        const getLocation = new GetLocation(SPOTT_API_KEY)  
        getLocation.byIp('200.194.51.97')
        .then(data=>{
            location = data.name
        })
        .catch(err=>{
            console.log(err)
        })



setTimeout(() => {
    console.log(location)
}, 2000);


     