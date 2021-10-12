const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const currentWeatherItemsE1 = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryE1 = document.getElementById('country');

const weatherforecastE1 = document.getElementById('weather-forecast');
const currentTempE1 = document.getElementById('current-temp');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY ='cc470aeada247200251078afa86e9dac';

setInterval(() => {
const time = new Date();
const month = time.getMonth();
const date = time.getUTCDate();
const day = time.getDay();
const hour = time.getHours();
const hoursIn12HrFormat = hour >= 13 ? hour %12: hour; 
const minutes = time.getUTCMinutes();
const ampm = hour >= 12 ? 'PM' : 'AM';

timeE1.innerHTML = (hoursIn12HrFormat < 10? '0' +hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0' +minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`;

dateE1.innerHTML = days[day] + ', ' +date+ ' '+months[month]
}, 1000);

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) =>{
        
        let {latitude, longitude} = success.coords;

        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`

        ).then(res => res.json()).then(data => {
        
            console.log(data)
            showWeatherData(data);
        
        })
    })
}
showWeatherData()

function showWeatherData (data){
let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

timezone.innerHTML = data.timezone;
countryE1.innerHTML = data.lat + 'N' + data.lon+ 'E'

currentWeatherItemsE1.innerHTML = `<div class="weather-item">
<div>Humidity:</div>
<div>${humidity}%</div>
</div>
<div class="weather-item">
<div>Pressure:</div>
<div>${pressure}P</div>
</div>
<div class="weather-item">
<div>Wind Spd:</div>
<div>${wind_speed}km/h</div>
</div>
<div class="weather-item">
<div>Sunrise:</div>
<div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
<div>Sunset:</div>
<div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>`;

let otherDayForecast = ''
data.daily.forEach((day, idx) => {
    if(idx == 0){
currentTempE1.innerHTML = `
<img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon" units="metric">
                <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Day - ${day.temp.day}°C</div>
                <div class="temp">Night - ${day.temp.night}°C</div>
            </div>
`
    }else{
        otherDayForecast += `
        <div class="weather-forecast-item">
                    <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <div class="temp">Day - ${day.temp.day}°C</div>
                <div class="temp">Night - ${day.temp.night}°C</div>
                </div>
        
        `
    }


})

weatherforecastE1.innerHTML = otherDayForecast;

}