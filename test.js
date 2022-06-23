
const GetLocation = require('location-by-ip');
const SPOTT_API_KEY = '4add49e12cmsh77b2507efa94f0ep1655eajsnce8669274ed4';

const getLocation = new GetLocation(SPOTT_API_KEY);

 getLocation.byMyIp()
    .then(res => console.log(res))
    .catch(err => console.log(err))

