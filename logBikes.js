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

        console.log(bounty_obj);
        fs.readFile('./bounties.json', function(error, data) {
            var json = JSON.parse(data);
            json.entries.push(bounty_obj);

            fs.writeFile('./bounties.json', JSON.stringify(json));
        });
  //     });
  // let request = new Request('http://biketownpdx.socialbicycles.com/opendata/free_bike_status.json',{
  //   method: 'get',
  //   mode: 'cors',
  //   headers: new Headers({
  // 		'Content-Type': 'text/plain'
  // 	})
  // });
  // fetch(request).then(function(response_object){
  //   return response_object.json();
  // }).then(function(json_object) {
  //
  //   //console.log(json_object.data)
  //   let current_bounty_bikes = json_object.data.bikes;
  //   let bike_total = current_bounty_bikes.length;
  //   const current_date = new Date();
  //   const bounty_obj = {};
  //   bounty_obj.date = current_date;
  //   bounty_obj.count = bike_total;
  //
  //   console.log(bounty_obj);
  //   fs.readFile('./bounties.json', function(error, data) {
  //       var json = JSON.parse(data);
  //       json.entries.push(bounty_obj);
  //
  //       fs.writeFile('./bounties.json', JSON.stringify(json));
  //   });
   });
}
logBikes();
process.exit();
