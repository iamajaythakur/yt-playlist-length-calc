**Tool for YouTube Playlist Length Calculation**

The YouTube Playlist Length Calculator stands as a digital tool designed to estimate the overall duration of a YouTube playlist. It operates by harnessing the capabilities of the YouTube Data API. The application is built using a combination of JavaScript, HTML, and CSS for the user-facing interface, while employing Node.js and Express.js for the backend operations.

**Key Features**
- Retrieves video data from a specified YouTube playlist utilizing the YouTube Data API.
- Calculates the aggregate duration of the playlist by summing the durations of individual videos.
- Offers a user-friendly interface enabling input of the YouTube playlist URL.
- Presents the total duration in hours, minutes, and seconds for easy comprehension.

**Technology Stack**
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- API Integration: YouTube Data API
- HTTP Client: Axios

**Installation Guide**
To deploy the application locally, adhere to the following steps:

1. Clone the repository:
   ```
   git clone https://github.com/OmK121/YouTube-Playlist-Length-Calculator.git
   cd YouTube-Playlist-Length-Calculator
   ```

2. Install necessary dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory.
   Add your YouTube Data API key to the `.env` file:
   ```
   API_KEY=YOUR_YOUTUBE_API_KEY
   ```

4. Launch the server:
   ```
   npm start
   ```

5. Access the application via your preferred web browser at http://localhost:3000.

**Usage Instructions**
- Input the URL of the YouTube playlist into the designated field on the webpage.
- Click the "Calculate" button to fetch the playlist data and compute the total duration.
- The cumulative duration of the playlist will be promptly displayed on the interface.

**Contribution Guidelines**
Contributions to enhance the functionality of this tool are encouraged. Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Commit your modifications: `git commit -am 'Add new feature'`
4. Push your changes to the branch: `git push origin feature/new-feature`
5. Submit a pull request for review and inclusion.