const key="6b9d9bae701c721b6b9c218b1ad18640"
let currentWeather= document.querySelector(".current-weather")
let futureWeather= document.querySelector(".future-weather")
let searchHistory = document.querySelector(".search-history");
localHistory = []
var lat = 0;
var long = 0;
function save(){
    var location=document.getElementById("city").value;
    localHistory.push(location);
    localStorage.setItem("searchLocation", JSON.stringify(localHistory));
    
    let historyBtn = document.createElement('button');
    historyBtn.innerHTML = location;
    historyBtn.onclick = function () {
        historyUpdate(location);
    }
    searchHistory.appendChild(historyBtn);
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+key + "&units=imperial")
   .then(response =>response.json())
   .then(data=>
    {
        currentWeather.innerHTML = "";
        let city=data.name;
        lat= data.coord.lat;
        long=data.coord.lon;

        let wind_speed= data.wind.speed;
        let temp= data.main.temp;
        let humidity=data.main.humidity;   
        let iconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 

        let icon = document.createElement("img");
        icon.src = iconSrc;
        let div=document.createElement("div")
        let h2el=document.createElement("h2")
        h2el.innerHTML= city
        let wind_pargraph=document.createElement("p")
        wind_pargraph.innerHTML="Wind:"+wind_speed +"MPH"
        let temp_pargraph=document.createElement("p")
        temp_pargraph.innerHTML="Temperature:"+temp
        let humidity_pargraph=document.createElement("p")
        humidity_pargraph.innerHTML="Humidity:"+ humidity
        div.append(h2el,wind_pargraph,temp_pargraph,humidity_pargraph, icon);
        // console.log(div)
        currentWeather.append(div);
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=imperial`)
    .then(response => response.json())
    .then(data=>
    {
        futureWeather.innerHTML = "";
        
        forecast_weathers = []
        for (let index = 0; index < data.list.length; index+=8) {
            forecast_weathers.push(data.list[index]);
        }
        for (let i = 0; i < forecast_weathers.length; i++)
        {
            date = forecast_weathers[i].dt_txt.substring(0,10);
            temp = forecast_weathers[i].main.temp;
            wind = forecast_weathers[i].wind.speed;
            humidity = forecast_weathers[i].main.humidity;
            console.log(date);
            console.log(temp);
            console.log(wind);
            console.log(humidity);
            let iconSrc = `http://openweathermap.org/img/wn/${forecast_weathers[i].weather[0].icon}@2x.png`; 
            let icon = document.createElement("img");
            icon.src = iconSrc;
            let div=document.createElement("div")
            let h2el=document.createElement("h5")
            h2el.innerHTML= date
            let wind_pargraph=document.createElement("p")
            wind_pargraph.innerHTML="Wind: "+ wind
            let temp_pargraph=document.createElement("p")
            temp_pargraph.innerHTML="Temperature: "+temp +"F"
            let humidity_pargraph=document.createElement("p")
            humidity_pargraph.innerHTML="Humidity: "+ humidity
            div.append(h2el,icon, wind_pargraph,temp_pargraph,humidity_pargraph)
            
            futureWeather.appendChild(div);
            
            }
        });
    });  
}  

function historyUpdate(location){
    
    let lat = 0
    let long = 0
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+key + "&units=imperial")
   .then(response =>response.json())
   .then(data=>
    {
        currentWeather.innerHTML = "";
        console.log(data);
        let city=data.name;
        lat= data.coord.lat;
        long=data.coord.lon;

        let wind_speed= data.wind.speed;
        let temp= data.main.temp;
        let humidity=data.main.humidity;   
        let iconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; 

        let icon = document.createElement("img");
        icon.src = iconSrc;
        let div=document.createElement("div")
        let h2el=document.createElement("h2")
        h2el.innerHTML= city
        let wind_pargraph=document.createElement("p")
        wind_pargraph.innerHTML="Wind:"+wind_speed +"MPH"
        let temp_pargraph=document.createElement("p")
        temp_pargraph.innerHTML="Temperature:"+temp
        let humidity_pargraph=document.createElement("p")
        humidity_pargraph.innerHTML="Humidity:"+ humidity
        div.append(h2el,wind_pargraph,temp_pargraph,humidity_pargraph, icon);
        currentWeather.append(div);

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=imperial`)
        .then(response => response.json())
        .then(data=>
        {
            forecast_weathers = []
            for (let index = 0; index < data.list.length; index+=8) {
                forecast_weathers.push(data.list[index]);
            }
            console.log(forecast_weathers);
            futureWeather.innerHTML = "";
            for (let i = 0; i < forecast_weathers.length; i++)
            {
                date = forecast_weathers[i].dt_txt.substring(0,10);
                temp = forecast_weathers[i].main.temp;
                wind = forecast_weathers[i].wind.speed;
                humidity = forecast_weathers[i].main.humidity;

                let iconSrc = `http://openweathermap.org/img/wn/${forecast_weathers[i].weather[0].icon}@2x.png`; 
                let icon = document.createElement("img");
                icon.src = iconSrc;
                let div=document.createElement("div")
                let h2el=document.createElement("h5")
                h2el.innerHTML= date
                let wind_pargraph=document.createElement("p")
                wind_pargraph.innerHTML="Wind: "+ wind
                let temp_pargraph=document.createElement("p")
                temp_pargraph.innerHTML="Temperature: "+temp +"F"
                let humidity_pargraph=document.createElement("p")
                humidity_pargraph.innerHTML="Humidity: "+ humidity
                div.append(h2el,icon, wind_pargraph,temp_pargraph,humidity_pargraph)
                
                futureWeather.appendChild(div);
            }
        });
    });
}  