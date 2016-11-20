
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var tizim = [];
var tizimNextId = 1;//osy katar turly surak

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('ToDo API Root');
});

// GET /todos
app.get('/tizim', function(req, res){
	res.json(tizim);
});

// GET /todos/:id
app.get('/tizim/:id', function(req, res){
	var tizimId = parseInt(req.params.id, 10);
	var matchedTizim = _.findWhere(tizim, {id: tizimId});

	if(matchedTizim){
		res.json(matchedTizim);
	}else{
		res.status(404).send();
	}
});

// POST /todos

app.post('/tizim', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId++;

	tizim.push(body);

	res.json(body);
});

app.delete('/tizim/:id', function(req,res){
	var tizimId = parseInt(req.params.id,10);
	var matchedTizim = _.findWhere(tizim, {id: tizimId});

	if(!matchedTizim){
		res.status(404).json({"error": "no todo found with that id"});
	}else{
		tizim = _.without(tizim, matchedTizim);
		res.json(matchedTizim);
	}
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
