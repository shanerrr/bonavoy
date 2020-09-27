// endpoints acting as proxy for making external api calls to not expose key in client
const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const OPENTRIPMAPS_API_KEY = process.env.OPENTRIPMAPS_API_KEY;


// helper function to throttle external calls
function scheduleRequests(axiosInstance, intervalMs) {
    let lastInvocationTime = undefined;

    const scheduler = (config) => {
        const now = Date.now();
        if (lastInvocationTime) {
            lastInvocationTime += intervalMs;
            const waitPeriodForThisRequest = lastInvocationTime - now;
            if (waitPeriodForThisRequest > 0) {
                return new Promise((resolve) => {
                    setTimeout(
                        () => resolve(config),
                        waitPeriodForThisRequest);
                });
            }
        }

        lastInvocationTime = now;
        return config;
    }

    axiosInstance.interceptors.request.use(scheduler);
}

// get hotel info near coords
router.get('/places', (req,res) => {
    console.log('skljdfsdkjflsa');
    // query string
    const lat = req.query.lat;
    const lng = req.query.lng;
    const radius = req.query.radius; 
    const kind = req.query.kind;
    const offset = parseInt(req.query.offset);
    const page_size = parseInt(req.query.page_size);
    
    // determine limit to get next page
    const limit = page_size*(offset+1);

    const placesService = axios.create({baseURL:'https://api.opentripmap.com'});
    scheduleRequests(placesService, 100); // TODO: not consistent, sometimes gets error 429

    //todo: ask for all accomodation in area with a set max radius and return 5 best places or return by category
    placesService.get(`/0.1/en/places/radius?apikey=${OPENTRIPMAPS_API_KEY}&lon=${lng}&lat=${lat}&radius=${radius}&kinds=${kind}&limit=${limit}`)
        .then((places) => {
            const last = Math.min(limit, places.data.features.length);
            const placesPage = places.data.features.slice(page_size*offset, last);
            const placesInfoRequests = placesPage.map((place) => {
                //TODO: use google places api for info and pictures
                return placesService
                    .get(`/0.1/en/places/xid/${place.properties.xid}?apikey=${OPENTRIPMAPS_API_KEY}`)
                    .then((placeInfo) => placeInfo.data);
            })
            return axios.all(placesInfoRequests)
                .then((response) => {
                    res.status(200);
                    return res.send(response);
                })
                .catch((error) => { 
                    res.status(500);
                    return res.send(error);
                });
        })
        .catch((error) => {
            res.status(500);
            return res.send(error);
        });

})

module.exports = router;
