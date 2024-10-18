Weather Dashboard with Chatbot Integration

This project is a web-based weather dashboard application that fetches and displays current weather information and a 5-day forecast for any city. The app also integrates a chatbot for interacting with users.

Features:

Weather Dashboard:
Input a city name to get the current weather conditions (temperature, humidity, wind speed, and description).
Displays a weather icon based on the weather condition.
Updates the background image of the weather widget based on the weather type (clear sky, clouds, rain, etc.).

5-Day Forecast:
Provides a 5-day forecast in both a table format and visualized in three different charts (Bar, Doughnut, and Line).

Chatbot:
A chatbot feature where users can interact by asking weather-related questions or general queries.
It detects weather-related queries, fetches relevant data, and responds accordingly.
Chatbot communication is handled by the Gemini API for non-weather queries.

Project Structure
The project consists of three main files:

index.html: The main HTML file containing the structure of the dashboard, search input, weather display, charts, and chatbot interface.

styles.css: The stylesheet for styling the dashboard layout, weather widget, charts, chatbot, and responsive behavior.

script.js: The JavaScript logic that handles fetching weather data, updating the UI, rendering charts, chatbot functionality, and API communication.

Setup and Installation
Prerequisites:
An internet connection for fetching data from APIs (OpenWeatherMap and Gemini API).
A web browser (Google Chrome, Firefox, etc.) to run the web app.

Instructions:
Clone the repository to your local machine:
bash
Copy code
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
Open the index.html file in a web browser to run the app locally:
You can simply double-click on index.html after navigating to the project folder or use a web server to run the project.
APIs Used
OpenWeatherMap API: Used to fetch current weather data and 5-day forecasts for any city.

Ensure to use your own API key in the script.js file:
javascript
Copy code
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
Gemini API: Used for chatbot interactions and answering non-weather queries.

Replace the GeminiapiKey in script.js with your actual Gemini API key:
javascript
Copy code
const GeminiapiKey = 'YOUR_GEMINI_API_KEY';
Dependencies
Chart.js: Used for rendering bar, doughnut, and line charts to visualize the 5-day weather forecast.
The Chart.js library is loaded via CDN in the index.html:
html
Copy code
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
How It Works
Weather Search:

Enter the city name in the search bar and click "Get Weather."
The app fetches weather data and updates the widget, charts, and table.
Weather Widget:

The current weather is displayed, including temperature, humidity, wind speed, and a weather icon.
Background image changes dynamically based on the weather condition.
5-Day Forecast:

Three charts (bar, doughnut, and line) display the forecast temperature and weather conditions over the next five days.

Chatbot:
Users can ask weather-related or general questions via the chatbot. For example:
"What’s the weather in London?"
"Tell me a fun fact."

Future Enhancements
Add pagination to the 5-day forecast table.
Improve chatbot capabilities by expanding query handling.
