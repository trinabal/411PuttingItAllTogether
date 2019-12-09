//This is the client
let movieTitle = "";
let key = "3a043ebff6ecb3d6e8cb2e769586c448";
let picUrl1 = "";
let picUrl2 = "";

function getTitle(){
	let request = new XMLHttpRequest();
	  request.open("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key=" + key + "&language=en-US&page=1", true)
		request.onload = function() {
			let data = JSON.parse(this.response);

	    if (request.status == 200)
			{
				results = data.results;
				for (let i = 0; i < results.length; i++)
				{
	        let movie = document.createElement("li")
	        let movieText = document.createTextNode(results[i].title);
					console.log(results[i].id);
	        movie.appendChild(movieText);
					document.querySelector("#Movies").appendChild(movie);
	        // document.querySelector("#Movies").innerHTML = data.results;
	      }
	    }
	  }
		getInfo();
	  request.send();
	}



function getInfo() {
	let request = new XMLHttpRequest();
	request.open("GET", "https://api.themoviedb.org/3/configuration?api_key=" + key, true);
	request.onload = function() {
		let data = JSON.parse(this.response);
		picUrl1 = data.images.base_url;
		console.log(data.images.base_url);
		picUrl2 = data.images.poster_sizes[6];
		getInfo2();
	}
	request.send();
}


function getInfo2() {
	movieTitle = document.querySelector("#searchTitle").value;
	let request = new XMLHttpRequest();
	request.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&page=1&include_adult=false&query=" + movieTitle + "&append_to_response=images&include_image_language=en", true)
	request.onload = function() {
		let data = JSON.parse(this.response);
		results = data.results;
		for (let i = 0; i < results.length; i++)
		{
			console.log(results[i].title);
			let movie = picUrl1 + picUrl2 + results[i].poster_path;
			let img = document.createElement('img');
			img.setAttribute('src', movie);
			img.setAttribute('width', '200px');
			img.setAttribute('height', '300px');
			document.querySelector('#posters').appendChild(img);
		}
	}
  request.send();
}

function getMovieRecommendations() {
	let request = new XMLHttpRequest();
  request.open("GET", "https://api.themoviedb.org/3/movie/5/recommendations?api_key=" + key + "&language=en-US&page=1", true)
	request.onload = function() {
		let data = JSON.parse(this.response);
		console.log(data);

   // document.querySelector("#recommendTitle").innerHTML = data;
  }
  request.send();
}



//request.open("GET", "https://api.themoviedb.org/3/movie/2/images?api_key=3a043ebff6ecb3d6e8cb2e769586c448&language=en-US", true);
// request.open("GET", "https://api.themoviedb.org/3/genre/movie/list?api_key=3a043ebff6ecb3d6e8cb2e769586c448&language=en-US", true);
//request.open("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key=3a043ebff6ecb3d6e8cb2e769586c448&language=en-US&page=1", true)


//https://developers.themoviedb.org/3/movies/get-movie-details
//website that it comes from
