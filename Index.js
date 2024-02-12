const express = require('express');
const axios = require('axios');

const app = express();
const youtubeLink = "https://www.youtube.com/playlist?list=PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU";

// Regular expression to extract the playlist ID
const playlistIdRegex = /list=([a-zA-Z0-9_-]+)/;
const matches = youtubeLink.match(playlistIdRegex);
let playlistId; 
// console.log("hii",matches);

if (matches && matches.length >= 2) {
  playlistId = matches[1];
  console.log("Playlist ID:", playlistId);
} else {
  console.log("Unable to extract the playlist ID from the link.");
}
let totalHours = 0;
let totalMinutes = 0;
let totalSeconds = 0;
// URL for retrieving video details from a playlist
const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=AIzaSyBTxd5lQkSU9OXSGeSdQlrh-SuWX_FtRyc`;

// Make a GET request to retrieve video details from the playlist

axios.get(apiUrl)
  .then(response => {
    // Get the data from the response
    const data = response.data;
    console.log("API Response Data:", data);

    // Loop through each item in the response
    data.items.forEach(item => {
      // Get video ID and title from snippet
      const videoId = item.snippet.resourceId.videoId;
      const videoTitle = item.snippet.title;
//       let totalHours = 0;
// let totalMinutes = 0;
// let totalSeconds = 0;
      // Make another API call to get video details including duration
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=AIzaSyBTxd5lQkSU9OXSGeSdQlrh-SuWX_FtRyc`;
     
      axios.get(videoDetailsUrl)
        .then(videoResponse => {
          // Get the video details from the response
          const videoData = videoResponse.data;
        //   console.log("Video Details Response Data:", videoData);

          // Get video duration from contentDetails
          const videoDuration = videoData.items[0].contentDetails.duration;
           console.log(videoData.items[0].contentDetails.duration);
    
        
            const durationRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
            const durationMatches = videoDuration.match(durationRegex);
            
            let hours = parseInt(durationMatches[1]) || 0;
            let minutes = parseInt(durationMatches[2]) || 0;
            let seconds = parseInt(durationMatches[3]) || 0;
          
           
            minutes += Math.floor(seconds / 60);
            seconds %= 60;
        
            hours += Math.floor(minutes / 60);
            minutes %= 60;
            totalHours += hours;
            totalMinutes += minutes;
            totalSeconds += seconds;
        
            // Adjusting for overflow in the total
            totalMinutes += Math.floor(totalSeconds / 60);
            totalSeconds %= 60;
        
            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes %= 60;
        
            // console.log("Total Duration:", `${hours}h ${minutes}m ${seconds}s`);
            // console.log("Accumulated Total Duration:", `${totalHours}h ${totalMinutes}m ${totalSeconds}s`);
          })
        
        .catch(error => {
          console.error("Error making the API request for Video Details:", error.message);
        }).finally(() => {
          // After all videos are processed, print the final accumulated total duration
          const finalTotalDuration = `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;
          console.log("Accumulated Total Duration:", finalTotalDuration);
        });
      })
    })
        // console.log("Accumulated Total Duration:", `${totalHours}h ${totalMinutes}m ${totalSeconds}s`);

   
          //  console.log("Accumulated Total Duration:", `${totalHours}h ${totalMinutes}m ${totalSeconds}s`);
    
  //  console.log("Total Duration:", `${hours}h ${minutes}m ${seconds}s`);

  
  .catch(error => {
    console.error("Error making the API request for Playlist Items:", error.message);
  });

const port = process.env.PORT || 8085;
app.listen(port, () => {
  console.log("listening on port " + port);
});
