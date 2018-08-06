const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./logger')
// const https = require('https');
// const fs = require('fs');

//Port for Deploying on Heroku
const port = process.env.PORT || 3000;

//Loading files from client
app.use(express.static(__dirname+'/client'));

//! 1/2Uncomment This For using HTTPS protocol in localhost (also check at the end of this file)
// const httpsOptions = {
//   cert: fs.readFileSync(__dirname+'/ssl/server.crt'),
//   key: fs.readFileSync(__dirname+'/ssl/server.key')
// }

//Middleware
app.use(morgan('combined'));
app.use(bodyParser.json());



Professional = require('./models/professionals');

//Connect to Mongoose
mongoose.connect('mongodb://binaryteam14:binaryteam14@ds141641.mlab.com:41641/binary');
var db = mongoose.connection;

app.get('/',function(req,res){
  res.send('Use /api/professionals for Accesing API');
});

app.get('/api/professionals', function(req, res){
  Professional.getProfessionals(function(err, professional){
    if(err){
      throw err;
    }
    res.json(professional);
  });
});

app.get('/api/professionals/:_id', function(req, res){
  Professional.getProfessionalsById(req.params._id, function(err, professional){
    if(err){
      throw err;
    }
    res.json(professional);
  });
});

app.post('/api/professionals', function(req, res){
  var professional = req.body;
  Professional.addProfessionals(professional,function(err, professional){
    if(err){
      throw err;
    }
    res.json(professional);
  });
});

app.put('/api/professionals/:_id', function(req, res){
  var id = req.params._id;
  var professional = req.body;
  Professional.updateProfessionals(id, professional, {}, function(err, professional){
    if(err){
      throw err;
    }
    res.json(professional);
  });
});

app.delete('/api/professionals/:_id', function(req, res){
  var id = req.params._id;
  Professional.deleteProfessionals(id, function(err, professional){
    if(err){
      throw err;
    }
    res.json(professional);
  });
});

//! 2/2 Uncomment This For using HTTPS protocol in localhost
// https.createServer(httpsOptions, app).listen(port, () => {
//   console.log('Running on port '+port);
// });

app.listen(port, () => {
  console.log('Running on port '+port);
});