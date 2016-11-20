var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var tizim = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
},{
	id: 3,
	description: 'Feed the cat',
	completed: true
}];

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
	var matchedTizim;

	tizim.forEach(function(tizim){
		if(tizimId === tizim.id){
			matchedTizim = tizim;
		}
	});

	if(matchedTizim){
		res.json(matchedTizim);
	}else{
		res.status(404).send();
	}

	res.send('Asking for todo with id of ' + req.params.id)
});


app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});

