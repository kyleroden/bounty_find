'use strict';

var express = require('express');
var faces = require('cool-ascii-faces');
var pg = require('pg');
var app = express();
var request_super = require('superagent');
var GoogleMapsLoader = require('google-maps');

//json file with date and current count of Bounties


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    // console.log("logging from the index directory");
    var map;
    request_super.get('http://biketownpdx.socialbicycles.com/opendata/free_bike_status.json')
        .end((err, res) => {
            if (err) {
                console.log("error: ", err);
                return response.status(500).send("there was an error in calling the bikes api");
            }
            const bike_list = res.body.data.bikes;
            //response.status(200).send(bike_list);
            const map_div = document.getElementById("map");
            GoogleMapsLoader.load(function(google) {
                new google.maps.Map(map_div, {
                    lat: -25.363,
                    lng: 131.044
                });
            });
            bike_list.forEach(bike => {

            });

            // map = new google.maps.Map(document.getElementById('map'), {
            //   center: {
            //     lat: 45.5236966,
            //     lng: -122.660585
            //   },
            //   zoom: 13
            // });
            response.render('pages/index', {
                results: bike_list
            });
        }); //end openbike api call
});
app.get('/cool', function(request, response) {
    response.send(faces());
});


app.get('/db', function(request, response) {
    // pg.connect(process.env.DATABASE_URL || 'postgres://localhost:5000', function(err, client, done) {
    //     client.query('SELECT * FROM test_table', function(err, result) {
    //         done();
    //         if (err) {
    //             console.error(err);
    //             response.send("ERROR ", err);
    //         } else {
    //             response.render('pages/db', {
    //                 results: result.rows
    //             });
    //         }
    //     });
    // });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
