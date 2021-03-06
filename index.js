'use strict';

var express = require('express');
var faces = require('cool-ascii-faces');
var pg = require('pg');
var app = express();
var request_super = require('superagent');
// var GoogleMapsLoader = require('google-maps');
pg.defaults.ssl = true;
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

            bike_list.forEach(bike => {

            });
            //these results are the current bike bounties, from the biketown api
            response.render('pages/index', {
                results: bike_list
            });
        }); //end openbike api call
});
app.get('/cool', function(request, response) {
    response.send(faces());
});


app.get('/db', function(request, response) {
    pg.connect(process.env.DATABASE_URL || 'postgres://localhost:5000/bikebounties', function(err, client, done) {
        client.query('SELECT * FROM bounties', function(err, result) {
            //done();
            if (err) {
                console.error(err);
                response.send("ERROR ", err);
            } else {
                response.render('pages/db', {
                    results: result.rows
                });
            }
            client.end();
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
