const apiKey = '0b44ddb18f4ffc3a68c9242e5dc25e76'; 
const GeminiapiKey = 'AIzaSyCp9dstZwnUn1a7v6FTHheyG967seYywz8';

const weatherWidget = document.getElementById('weather-widget');
const forecastTableBody = document.querySelector('#forecast-table tbody');

async function fetchCurrentWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        displayErrorMessage('City not found or invalid city entered.');
    }
}

function displayErrorMessage(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
}

async function fetchForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
        throw new Error('Forecast not found');
    }
    return await response.json();
}

function updateWidgetBackground(weather) {
    switch (weather.toLowerCase()) {
        case 'clear sky':
            weatherWidget.style.backgroundImage = "url('clear_sky.jpg')";
            break;
        case 'clouds':
            weatherWidget.style.backgroundImage = "url('cloudy.jpg')";
            break;
        case 'rain':
            weatherWidget.style.backgroundImage = "url('rainy.jpg')";
            break;
        case 'snow':
            weatherWidget.style.backgroundImage = "url('snowy.jpg')";
            break;
        case 'drizzle':
            weatherWidget.style.backgroundImage = "url('drizzle.jpg')";
            break;
        case 'fog':
            weatherWidget.style.backgroundImage = "url('foggy.jpg')";
            break;
        default:
            weatherWidget.style.backgroundImage = "url('default.jpg')";
    }
}

function displayCurrentWeather(data) {
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherDescription = document.getElementById('weather-description');
    const weatherIcon = document.getElementById('weather-icon');

    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    weatherDescription.textContent = `Description: ${data.weather[0].description}`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    updateWidgetBackground(data.weather[0].main);
}

document.getElementById('get-weather').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    try {
        const currentWeatherData = await fetchCurrentWeather(city);
        displayCurrentWeather(currentWeatherData);

        const forecastData = await fetchForecast(city);
        displayForecastTable(forecastData);
        createCharts(forecastData);
    } catch (error) {
        alert(error.message);
    }
});

function createCharts(data) {
    const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
    const temperatures = data.list.map(item => item.main.temp);
    const weatherConditions = data.list.map(item => item.weather[0].main);

    const barChartCtx = document.getElementById('bar-chart').getContext('2d');
    new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }]
        },
        options: {
            animation: {
                duration: 2000,
                easing: 'easeOutBounce',
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const weatherCounts = {};
    weatherConditions.forEach(condition => {
        weatherCounts[condition] = (weatherCounts[condition] || 0) + 1;
    });

    const doughnutChartCtx = document.getElementById('doughnut-chart').getContext('2d');
    new Chart(doughnutChartCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(weatherCounts),
            datasets: [{
                label: 'Weather Conditions',
                data: Object.values(weatherCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000
            }
        }
    });

    const lineChartCtx = document.getElementById('line-chart').getContext('2d');
    new Chart(lineChartCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
            }]
        },
        options: {
            animation: {
                duration: 1500,
                easing: 'easeOutBounce',
                onComplete: function () {
                    this.chartInstance.data.datasets[0].hidden = false;
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function displayForecastTable(data) {
    const forecastTableBody = document.querySelector('#forecast-table tbody');
    forecastTableBody.innerHTML = '';

    data.list.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(item.dt * 1000).toLocaleDateString()}</td>
            <td>${item.main.temp} °C</td>
            <td>${item.weather[0].main}</td>
        `;
        forecastTableBody.appendChild(row);
    });
}

function paginateForecastTable(data, rowsPerPage) {
    const forecastTableBody = document.querySelector('#forecast-table tbody');
    const paginationContainer = document.getElementById('pagination-container');
    forecastTableBody.innerHTML = '';
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(data.list.length / rowsPerPage);
    const currentPageData = data.list.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    currentPageData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(item.dt * 1000).toLocaleDateString()}</td>
            <td>${item.main.temp} °C</td>
            <td>${item.weather[0].main}</td>
        `;
        forecastTableBody.appendChild(row);
    });

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.classList.add(i === currentPage ? 'active-page' : '');
        pageLink.addEventListener('click', () => {
            currentPage = i;
            paginateForecastTable(data, rowsPerPage);
        });
        paginationContainer.appendChild(pageLink);
    }
}

let currentPage = 1;
const rowsPerPage = 10;
paginateForecastTable(forecastData, rowsPerPage);

async function sendToGemini(query) {
    const response = await fetch('https://api.gemini.com/v1/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GeminiapiKey}`
        },
        body: JSON.stringify({
            query: query
        })
    });

    if (!response.ok) {
        throw new Error('Error communicating with the chatbot API');
    }

    return await response.json();
}

document.getElementById('send-button').addEventListener('click', async () => {
    const inputField = document.getElementById('chat-input');
    const userQuery = inputField.value;
    if (!userQuery) return;

    displayMessage(userQuery, 'user');
    inputField.value = '';

    try {
        if (userQuery.toLowerCase().includes('weather')) {
            const city = userQuery.match(/in\s+(\w+)/i);
            if (city && city[1]) {
                const weatherData = await fetchCurrentWeather(city[1]);
                displayMessage(`The current temperature in ${city[1]} is ${weatherData.main.temp} °C.`, 'bot');
            } else {
                displayMessage('Please specify a city.', 'bot');
            }
        } else {
            const geminiResponse = await sendToGemini(userQuery);
            displayMessage(geminiResponse.response, 'bot');
        }
    } catch (error) {
        displayMessage(error.message, 'bot');
    }
});

function displayMessage(message, sender) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'message user-message' : 'message bot-message';
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
