//This is the Server
const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

//Add movie info to JSON file
app.post('/movies/addInfo/:movieTitle', (req, res) => {
	//probably change this to more info about movie which is taken
	//from the client and API
	let movieTitle = req.params.movieTitle;
	let movieObj = {};
	movieObj.movieTitle = movieTitle;

	let infoFile = JSON.parse(fs.readFileSync('info.json'));
	infoFile.push(movieObj);

	fs.writeFileSync('info.json', JSON.stringify(infoFile), err => {
    if(err) throw err;
    console.log('Saved file');
  })

  res.send(infoFile);
});

//Get movie info from JSON file
app.get('/movies/getInfo', (req, res) => {
	let infoFile = JSON.parse(fs.readFileSync('info.json'));
	res.send(infoFile);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
