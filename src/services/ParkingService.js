const axios = require('axios');

export function getParkings(){

    return axios.get('https://x2xmalta.gotomobility.com/api/FreeVehicles?driverId=1&startDate=2019-01-01&endDate=2019-01-02&isFlexiable=true&longitude=1&latitude=2&requestType=1')

}


