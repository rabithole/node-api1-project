// implement your API here
const express = require('express'); // A path goes here when needed. 
// This access modules installed. 

const db = require('./data/db.js');// .js is not requeired. 
// calls local database file. 

const server = express(); // returns a server object. 

// TCP/IP goes in parameters of the function below. 
// 4000 is the designated port
server.listen(4000, () => {
	console.log('listening on port 4000...');
})
// Places in listen mode. 


// Don't include a path for use to call all paths. 
// All requests will go through the use method. 
server.use(express.json());

server.get('/', (req, res) => {
	res.send(req.params); // Printed in the browser
})

server.get('/api/users', (req, res) => {
	// res.send(req.body);

	db.find()
		.then(user => {
			res.status(200).json({user});
		})
		.catch(err => {
			res.status(500).json({sucess: false, message: 'The users information could not be retreieved.'});
		});
})

server.post('/api/users', (req, res) => {
	const hubInfo = req.body;

	db.insert(hubInfo)
		.then(user => {
			res.status(201).json({user});
		})
		.catch(err => {
			res.status(400).json({success: false, message: 'Please provide name and bio for the user.'});
		});
})

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;

	db.findById(id)
		.then(userId => {
			if(userId) {
			res.status(200)
			.json({success: true, userId});
		} else {
			res.status(404)
			.json({success: false, message: "The user with the specified ID does not exist"});
			}
		})
		.catch(err => {
			res.status(500)
			.json({success: false, message: "The user information could not be retreieved!"});
		});
})

server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;

	db.remove(id)
		.then(users => {
      if(users) {
      	res.json(users);
      } else {
        res.status(404)
        .json({message: 'The user with the specified ID does not exist.'});
      }
    })	
	.catch(error => {
      res.status(500).json({
        error: error,
        message: 'The user could not be removed'});
    });
})

server.put('/api/users/:id', (req, res) => {
	const { name, bio } = req.body;

		if (!name || !bio) {
			res.status(400)
		  		.json({ errorMessage: 'Please provide name and bio for the user.' });
			} else {
		db.update(req.params.id, req.body)
			.then(user => {
		if (user) {
		  res.status(200).json(user);
			} else {
		  	res.status(404)
		    	.json({ message: 'The user with the specified ID does not exist.'});
			}
		})
		.catch(() => {
		res.status(500).json({
		  errorMessage: 'The user information could not be modified.',
			});
		});
  }	
})