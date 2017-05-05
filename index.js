'use strict';

var express = require('express');
var faces = require('cool-ascii-faces');
var pg = require('pg');
var app = express();
var request_super = require('superagent');
var fs = require('fs');
//json file with date and current count of Bounties


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    // console.log("logging from the index directory");

    request_super.get('http://biketownpdx.socialbicycles.com/opendata/free_bike_status.json')
        .end((err, res) => {
            if (err) {
                console.log("error: ", err);
                return response.status(500).send("there was an error in calling the bikes api");
            }
            const bike_list = res.body.data.bikes;
            //get the current date, then write to the json file: date: bounty count
            const current_date = new Date();
            const bounty_obj = {};
            bounty_obj.date = current_date;
            bounty_obj.count = bike_list.length;

            console.log(bounty_obj);
            fs.readFile('./bounties.json', function(error, data) {
                var json = JSON.parse(data);
                json.entries.push(bounty_obj);

                fs.writeFile('./bounties.json', JSON.stringify(json));
            });

            //response.status(200).send(bike_list);
            response.render('pages/index', {
                results: bike_list
            });
        });//end openbike api call
});
app.get('/cool', function(request, response) {
    response.send(faces());
});


app.get('/db', function(request, response) {
    pg.connect(process.env.DATABASE_URL || 'postgres://localhost:5000', function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err) {
                console.error(err);
                response.send("ERROR ", err);
            } else {
                response.render('pages/db', {
                    results: result.rows
                });
            }
        });
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
