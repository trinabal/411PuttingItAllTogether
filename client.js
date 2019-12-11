//This is the client
let movieTitle = "";
let key = "3a043ebff6ecb3d6e8cb2e769586c448";
let picUrl1 = "";
let picUrl2 = "";
let imgTitleList = [];
let imgTitle = "";
let imgID = 0;
let movieSrc = "";

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
		if (request.status == 200)
		{
			results = data.results;
			for (let i = 0; i < results.length; i++)
			{
				movieSrc = picUrl1 + picUrl2 + results[i].poster_path;
				// console.log(results[i]);
				imgTitle = results[i].title;
				imgID = results[i].id;
				let imgOb = {};
				imgOb.title = imgTitle;
				imgOb.id = imgID;
				imgOb.imgSrc = movieSrc;
				imgTitleList.push(imgOb);

				let img = document.createElement('img');
				img.setAttribute('src', movieSrc);
				img.setAttribute('width', '200px');
				img.setAttribute('height', '300px');
				img.setAttribute('onclick','clickedImg(' + i + ');');
				document.querySelector('#posters').appendChild(img);
			}
			// console.log(imgTitleList);
		}
		else
		{console.log("ERROR");}
		addSearchItem();
	}
  request.send();
}

function clickedImg(i) {
	// console.log("index: " + i);
	// console.log(imgTitleList[i].title);
	let id = imgTitleList[i].id;
	// console.log(imgTitleList[i].id);
	let imgSrc = imgTitleList[i].imgSrc;
	// console.log(imgSrc);

	let request = new XMLHttpRequest();
	request.open("GET", "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&language=en-US", true);
	request.onload = function() {
		let data = JSON.parse(this.response);
		// console.log(data);
		document.querySelector("#infoBox").style.display = "block";
		// document.querySelector("#imgSrcPop").style.src = imgSrc;
		document.querySelector("#titlePop").innerHTML = data.title;
		document.querySelector("#descrPop").innerHTML = data.overview;

		//Add image to pop-up
		let img = document.createElement('img');
		img.setAttribute('src', imgSrc);
		img.setAttribute('id', 'imgPop');
		img.setAttribute('width', '200px');
		img.setAttribute('height', '300px');
		document.querySelector('#infoBox').appendChild(img);
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


//https://developers.themoviedb.org/3/movies/get-movie-details

//Adding stuff to file through server.js
//Add search item to list
function addSearchItem() {
  searchTitle = document.querySelector("#searchTitle").value;
  let request = new XMLHttpRequest();
  request.open("POST", "http://127.0.0.1:3000/movies/addInfo/" + movieTitle, true);
  console.log("Search Item = " + searchTitle);
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      // console.log(data);
    }
    else {console.log("ERROR");}
  }
  request.send();
}


function getSearchInfo() {
  let request = new XMLHttpRequest();
  request.open("GET", "http://127.0.0.1:3000/movies/getInfo", true);
  request.onload = function() {
    data = JSON.parse(this.response);
    if (request.status == 200)
    {
      // console.log(data);
			for(let i=0; i<data.length;i++) {
        var newP = document.createElement("p");
        var titleNode = document.createTextNode(data[i].movieTitle);
        newP.appendChild(titleNode);
        document.querySelector("#searchHistoryList").appendChild(newP);
			}
    }
    else {console.log("ERROR");}
  }
  request.send();
}
