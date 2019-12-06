//This is the client

function getInfo() {
	let request = new XMLHttpRequest();
	//request.open("GET", "https://api.themoviedb.org/3/movie/2000/images?api_key=3a043ebff6ecb3d6e8cb2e769586c448&language=en-US", true);
  // request.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=3a043ebff6ecb3d6e8cb2e769586c448&language=en-US", true);
  request.open("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key=3a043ebff6ecb3d6e8cb2e769586c448&language=en-US&page=1", true)
	request.onload = function() {
		let data = JSON.parse(this.response);
    //let poster = "https://api.themoviedb.org/3/movie/2000/images?api_key=3a043ebff6ecb3d6e8cb2e769586c44&language=en-US";
		console.log(data);

    document.querySelector("#title").innerHTML = data;
  }
  request.send();
}

//https://developers.themoviedb.org/3/movies/get-movie-details
//website that it comes from
