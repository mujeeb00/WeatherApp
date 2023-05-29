const weatherApi={
    key:'e35261ecad817611e25cecf1b13e9def',
    url:'https://api.openweathermap.org/data/2.5/weather'
}




// Get Input 
const input=document.getElementById('inputBox');
input.addEventListener('keypress',function(e){
    if(e.key=='Enter'){
      const spiner=document.getElementById('spiner');
      spiner.style.display='block'
        console.log(input.value);
        weatherInfo(input.value)
    }
})

// Get weatherInfo
 function weatherInfo(city){
    fetch(`${weatherApi.url}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather =>{
        return weather.json();
    }).then(showWeather);

}

// Show WeatherInfo
function showWeather(weather){
    console.log(weather)

    spiner.style.display='none'


    var divElement = document.getElementById("firstCard");
    
    // Delete All previous child from Parent Div
    var childNodes = divElement.childNodes;

    for (var i = childNodes.length - 1; i >= 0; i--) {
      var childNode = childNodes[i];
      divElement.removeChild(childNode);
    }
    

    // Create and append elements in Parent element
    const weatherIcon=document.createElement('img');
    weatherIcon.style.width='190px'
    divElement.appendChild(weatherIcon);

    const num=document.createElement('h1');
    num.classList.add('text-center')
    num.style.fontWeight='600'
    num.style.fontSize='4rem'
    divElement.appendChild(num);

    const description=document.createElement('div');
    description.classList.add('text-center')
    divElement.appendChild(description);

    const city=document.createElement('h3');
    city.classList.add('text-center')
    divElement.appendChild(city);
   

    const row = document.createElement('div');
    row.classList.add('row');
    divElement.appendChild(row);
    
    const feels = document.createElement('div');
    row.appendChild(feels);
    
    const humidity = document.createElement('div');
    row.appendChild(humidity);

    const minTem = document.createElement('div');
    row.appendChild(minTem);

    const maxTemp = document.createElement('div');
    row.appendChild(maxTemp);
    
  
    // Get Icons According to weather
    
    const weatherCondition = weather.weather[0].main;
    let iconFileName;
  
    switch (weatherCondition) {
      case 'Clear':
        iconFileName = 'clear.svg';
        break;
      case 'Clouds':
        iconFileName = 'cloud.svg';
        break;
      case 'Rain':
        iconFileName = 'rain.svg';
        break;
        case 'Snow':
        iconFileName = 'snow.svg';
        break;
        case 'Haze':
            iconFileName = 'haze.svg';
            break;
      default:
        iconFileName = 'clear.svg';
    }
  
    weatherIcon.src = `icons/${iconFileName}`;


    // Display Elements With Data

    num.innerHTML = `${Math.floor(weather.main.temp)}°C`;
    description.innerHTML=`${weather.weather[0].description}</br>`
    city.innerHTML=`${weather.name},${weather.sys.country}</br></br>`
    feels.innerHTML=`Feels : ${weather.main.feels_like}°C`
    humidity.innerHTML=`Humidity : ${weather.main.humidity}°C`
    minTem.innerHTML=`Min Temperature : ${Math.floor(weather.main.temp_min)}°C`
    maxTemp.innerHTML=`Max Temperature : ${Math.floor(weather.main.temp_max)}°C`
  }





  // Function to get weather data based on user's location
function getWeatherByLocation() {
  const spiner = document.getElementById('spiner');
  spiner.style.display = 'block';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(`${weatherApi.url}?lat=${latitude}&lon=${longitude}&appid=${weatherApi.key}&units=metric`)
        .then(weather => {
          return weather.json();
        }).then(showWeather);
    }, error => {
      console.log('Error:', error.message);
      spiner.style.display = 'none';
    });
  } else {
    alert('turn on Location');
    spiner.style.display = 'none';
  }
}


  
   
    





    
 












  