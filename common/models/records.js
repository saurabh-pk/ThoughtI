'use strict';
require('./remoteMethodDisable')();
const fs = require('fs');
module.exports = function(Records) {
  disableAll(Records);
  /*---------------get Records Start-------------------*/
  Records.remoteMethod('getManagedRecords', {
    description: 'This endpoint is used to create category',
    accepts: [
      {arg: 'page_no', type: 'number', required: false},
      {arg: 'row_count', type: 'number', required: false},
    ],
    returns: {
      arg: '',
      type: 'object',
      root: true,
      description: 'This endpoint is used to get managed records',
    },
    http: {verb: 'post'},
  });
  Records.getManagedRecords = function(page_no, row_count, cb) {
    // Read data.json file
    fs.readFile('data.json', function(err, record_data) {

      if (err) {
        console.log('Error in reading data', err);
      } else {
        const records = JSON.parse(record_data);
        let skip = page_no * row_count;
        let paged_data = records.splice(skip, row_count);
        let Open = [], ClosedCount = 0;
        let Ids = paged_data.map(v => {
          let {id, disposition} = v;
          if (disposition == 'open') {
            Open.push(v);
          } else {
            ClosedCount++;
          }
          return id;
        });
        let PreviousPage = null, NextPage = null;
        if (page_no !== 0) {
          PreviousPage = page_no - 1;
        }
        if (records.length > (skip + row_count)) {
          NextPage = page_no + 1;
        }
        let data = {Ids, Open, ClosedCount, PreviousPage, NextPage};
        return cb(null, {status: 1, msg: 'Success', data});
      }
    });
  };
  /*---------------get Records End-------------------*/

};
