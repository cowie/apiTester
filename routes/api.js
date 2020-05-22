var express = require('express');
var router = express.Router();

var jsforce = require('jsforce');


var moment = require('moment');

var SFDCUSERNAME = process.env.SFDCUSERNAME;
var SFDCPASSWORD = process.env.SFDCPASSWORD;
var JSFORCELOGINURL = process.env.JSFORCELOGINURL;

var conn = new jsforce.Connection({
    loginUrl: JSFORCELOGINURL
});


router.get('/objects/create/:objectName', function(req, res, next) {
    var objectName = req.params.objectName;
    console.log(`request to create ${objectName}`);
    conn.login(SFDCUSERNAME, SFDCPASSWORD, (err, lres)=>{
        if(err) {console.error(err); res.send(200);}
        else{
            var startTime = moment();
            conn.sobject(objectName).create(req.query, function(err,ret){
                if(err||!ret.success){return console.error(err, ret);}
                var deltaTime = moment().diff(startTime);
                var d = moment.utc(deltaTime).format("HH:mm:ss:SSS");
                console.log(`Time for insert to complete: ` + d);
                res.render('singleUpdateTest', {recordID: ret.id, time: d});
            });
        }
    });
});

router.get('/events/create/:objectName', function(req, res, next) {

});

module.exports=router;