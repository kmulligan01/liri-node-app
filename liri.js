var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');
var userSearch = process.argv[2];
var songName = process.argv.slice(3).join(" ");
var artist = process.argv.slice(3).join(" ");
var movieName = process.argv.slice(3).join(" ");
var request = require("request");

switch (userSearch) {
    case "spotify-this-song":
        getSongInfo(songName);
        break;
    case "concert-this":
        concertThis(artist);
        break;
    case "movie-this":
        movieThis(movieName);
        break;
    case "do-this":
        doThis();
        break;
    default:
        console.log("No valid argument has been provided, please enter one of the following commands: spotify-this-song, movie-this, concert-this, or do-this followed by parameter.");

}

function getSongInfo(songName) {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });
    
	if (songName === '') {
		songName = 'The Sign Ace Of Base';
	} 

    spotify.search({ type: 'track', query: songName }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        } else {

            var songInfo = data.tracks.items[0];
            var songData = [
                "Song Name: " + songInfo.name,
                "Artist: " + songInfo.artists[0].name,
                "Album: " + songInfo.album.name,
                "Preview Link: " + songInfo.preview_url
            ].join("\n\n");

            console.log(songData);
        }
    });
}

function concertThis() {
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(URL, function (err, response, EventData) {
        if (!err && response.statusCode === 200) {

            var venueData = [
                "Name of Venue: " + EventData.venue.name,
                "Location: " + venueInfo.city,
                "Date of the event: " + venueInfo.datetime
            ].join("\n\n");

            console.log(venueData);
        };
    });
}


function movieThis() {

    if (movieName === '') {
        console.log ("If you haven't seen Mr. Nobody yet you should! It's on Netflix!\n\n");
        movieName = 'Mr. Nobody';
    }
        
    var URL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
   
    request(URL, function (err, response, data) {
        if (!err && response.statusCode === 200) {

            var jsonData = JSON.parse(data);
            var movieData = [
                "Title: " + jsonData.Title,
                "Year Movie Came Out: " + jsonData.Year,
                "Rating from Rotten Tomatoes: " + jsonData.Rated,
                "IMDB Rating: " + jsonData.imdbRating,
                "Country Where Produced: " + jsonData.Country,
                "Language: " + jsonData.Language,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
            ].join("\n\n");

            console.log(movieData);
        };
    });
}

function doThis() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        else {
            console.log(data);
            var dataArray = data.split(",");
            var command = dataArray[0].trim();
			var param = dataArray[1].trim();

            caseCommands(command, param);
        }
    
    });
}
