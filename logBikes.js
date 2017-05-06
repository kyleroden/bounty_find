'use strict';
var request = require('superagent');

function logBikes(){
  request.get('http://biketownpdx.socialbicycles.com/opendata/free_bike_status.json')
      .end(function(err, response) {
        let current_bounty_bikes = response.data.bikes;
        let bike_total = current_bounty_bikes.length;
        const current_date = new Date();
        const bounty_obj = {};
        bounty_obj.date = current_date;
        bounty_obj.count = bike_total;
        //check to make sure this is working from heroku server
        console.log("date variable from server: ", current_date);
        console.log("success");
        console.log(bounty_obj);
        fs.readFile('./bounties.json', function(error, data) {
            var json = JSON.parse(data);
            json.entries.push(bounty_obj);

            fs.writeFile('./bounties.json', JSON.stringify(json));
        });
   });
}
logBikes();
process.exit();
