// endpoints are for making external api calls to prevent making calls from client
const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const OPENTRIPMAPS_API_KEY = process.env.OPENTRIPMAPS_API_KEY

// get hotel info near coords
router.get('/accomodations', (req,res) => {
    // query string
    const lat = req.query.lat;
    const lng = req.query.lng;
    const radius = req.query.radius; 

    //todo: ask for all accomodation in area with a set max radius and return 5 best places or return by category
    axios.get(`https://api.opentripmap.com/0.1/en/places/radius?apikey=${OPENTRIPMAPS_API_KEY}&lon=${lng}&lat=${lat}&radius=${radius}&kinds=accomodations&limit=5`)
        .then((response) => {
            const accomodations = response.data.features;
            console.log(accomodations);
            const xidArray = accomodations.map((accomodationObj) => { 
                return {'xid':accomodationObj.properties.xid}
            });
            return xidArray;
        })
        .then((data) => {
            return Promise.all(
                data.map((item) => {
                    //TODO: use google places api for info and pictures
                    return axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${item.xid}?apikey=${OPENTRIPMAPS_API_KEY}`)
                })
            );
        })
        .then((data) => {
            let dataArr = data.map(item => item.data);
            return res.send(dataArr);
        })
        .catch((error) => {
            console.log('Error: ',error);
            return res.send(error);
        });

})

router.get('/activities', (req, res) => {
    return res.send('welcome to activities');
})

module.exports = router;