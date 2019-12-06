//This is the client

function getInfo() {
	let request = new XMLHttpRequest();
	request.open("GET", "https://api.themoviedb.org/3/movie/550?api_key=3a043ebff6ecb3d6e8cb2e769586c448", true);
	request.onload = function() {
		let data = JSON.parse(this.response);
		console.log(data);
  }
  request.send();
}
//https://developers.themoviedb.org/3/movies/get-movie-details
//website that it comes from
