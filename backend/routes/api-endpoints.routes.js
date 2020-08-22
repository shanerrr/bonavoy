// the following routes are for making external api calls to pass 
// to client to keep api keys secure  

const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })


const OPENTRIPMAPS_API_KEY = process.env.OPENTRIPMAPS_API_KEY

// get hotel info near coords
router.get('/hotels', (req,res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const radius = req.query.lon; 

    //todo: ask for all accomodation in area with a set max radius and return 5 best places or return by category
    axios.get(`https://api.opentripmap.com/0.1/en/places/radius?apikey=${OPENTRIPMAPS_API_KEY}&radius=4000&lon=${lon}&lat=${lat}&radius=${radius}&kinds=accomodations&limit=5`)
        .then((response) => {
            const accomodations = response.data.features;
            const xidArray = accomodations.map((accomodationObj) => { 
                return {'xid':accomodationObj.properties.xid}
            });
            return xidArray;
        })
        .then((data) => {
            return Promise.all(
                data.map((item) => {
                    return axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${item.xid}?apikey=${OPENTRIPMAPS_API_KEY}`)
                })
            )
        })
        .then((data) => {
            let dataArr = data.map(item => item.data)
            return res.send(dataArr);
        })
        .catch((error) => {
            console.log('Error: ',error);
            return res.send(error);
        });

})

// bars and restaurants
router.get('/food', (req, res) => {
    res.send('bars, restaurants and food stuff');
})

// places of interest
router.get('/poi', (req,res) => {
    res.send('return place of interest stuff here')
})

module.exports = router;