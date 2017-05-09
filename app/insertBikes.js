#!/usr/bin/env node
'use strict';
//INSERT INTO postgres
//the program should make a call to the biketown api and insert into
//the postgres db the timestamp and the current number of bike bounties
//var express = require('express');
//var app = express();
// var pg = require('pg');
// var request_super = require('superagent');
console.log('ran outside of logbikes function');

const current_date = new Date();

//check to make sure this is working from heroku server
console.log("date variable from server: ", current_date);

//differnt method
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/bikebounties';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'INSERT INTO bounties values(' + "'" + current_date + "'" + ', ' + "'" + bike_total + "'" + ')');
query.on('end', () => { client.end(); });
//
// function logBikes() {
//
//  }//end api call
//
// logBikes();
// request_super.get('http://biketownpdx.socialbicycles.com/opendata/free_bike_status.json')
//     .end(function(err, response) {
//         if(err) {
//           console.log("error: ", err);
//         }
//         let current_bounty_inventory = response.data.bikes;
//         let bike_total = current_bounty_inventory.length;
//         const current_date = new Date();
//
//         //check to make sure this is working from heroku server
//         console.log("date variable from server: ", current_date);
//         console.log("success");
//         console.log(bounty_obj);
//
//         //now put the data into the pg database 'bounties'
//
//         pg.connect(process.env.DATABASE_URL || 'bikebounties://localhost:5000', function(err, client, done) {
//             client.query('INSERT INTO bounties values(' + "'" + current_date + "'" + ', ' + "'" + bike_total + "'" + ')',
//                 function(err, result) {
//                     done();
//                     if (err) {
//                         console.error(err);
//                         response.send("ERROR ", err);
//                     } else {
//                         //
//                         // response.render('pages/db', {
//                         //     results: result.rows
//                     }
//                     client.end();
//                   });
//         });
//     });
//needed in order to use this script as a heroku worker
process.exit();
