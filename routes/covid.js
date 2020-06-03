const express = require('express');
const router = express.Router();
const axios = require('axios');
const lodash = require('lodash');

router.get('/',(req,res) => {
    res.send('<code>Covid Server Running</code>');
});

async function fetchData(countryName){
    let apiPath = `https://corona.lmao.ninja/v2/countries/${countryName}`;
    let result = {};
    try {
        const response = await axios.get(apiPath);
        if(response && response.data){
            result = response.data;
            console.log(`${countryName} Found`);
        }
    } catch (error) {
        console.error('API PROBLEM');
    }
    return result;
}

router.get('/country/:countryName', async (req,res) => {
    let countryName = req.params.countryName;
    const data = await fetchData(countryName);
    let response = 'Data Not Found';
    if(!lodash.isEmpty(data)){
        const {todayRecovered, critical, tests, todayCases, cases, country} = data;
        response = `
            Country : ${country}<br/>
            Today New Cases : ${todayCases}<br/>
            Totally Recovered : ${todayRecovered}<br/>
            Critical : ${critical}<br/>
            Total tests : ${tests}<br/>
            Total cases : ${cases}
        `;
    }
    res.send(response);
});

module.exports = router;