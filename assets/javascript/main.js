var APIKEY = "1ab5d5fb108148020574fbedf5d8f664";
document.querySelector(".search-btn").addEventListener("click", function (event) {

    var departureDay = document.querySelector(".departure").value
    var returnDay = document.querySelector(".arrival-home").value; /* arrival-home */
    var departureCity = document.querySelector(".origin").value; /* origin */
    var arrivalCity = document.querySelector(".destination").value; /* desitnation */
    var departureCityCode = generateCityCode(departureCity);
    var arrivalCityCode = generateCityCode(arrivalCity);
    
// weatherSearch(arrivalCity)
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${departureCityCode}/${arrivalCityCode}/${departureDay}?inboundpartialdate=${returnDay}`, {

        "method": "GET",
        "headers": {
            "x-rapidapi-key": "803484f99cmsh3c80d518e43f9cbp106fa0jsnc4dcb9639523",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
        .then(response => {
            console.log(response.json());
        })
        .then(function (data) {
            data.Quotes[0].DepartureDate ; /* departure */
            console.log(departureDay)

            // 1. create html variables that display the data that you are getting back. Ex; var modal= whatever htmal element you want to document.createElement
            // 2. maybe add somestyling to your var modal? modal.attr("styles"... whatever)
            // 3. Then append to an html element you already have above. ex: div.append(modal)... that kind of thing...

        });
    // .catch(err => {
    //     console.error(err);
    // });

//     fiveDay()
});


// function that changes the cities typed in by the user into an acceptable query for our flight dates fetch
function generateCityCode(city) {
    var myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "4d2069688cmsh2f088ecb201529bp1f9b94jsn1b274d26bcd1");
    myHeaders.append("x-rapidapi-host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city}`, requestOptions)
        .then(response => {
            console.log(response.json());
        })
        .then(function (data) {
            var cityCode = data.Places[1].PlaceId
            console.log("City code is: " + cityCode)
            return cityCode

        })
        .catch(error => console.log('error', error));

}

// functioin that will call our five day forecast
// function weatherSearch(arrivalCity) {

//     var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${arrivalCity}&units=imperial&appid=${APIKEY}`;
//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 return response.json()
//             } else {
//                 alert(`error: ${response.statusTest}`)
//             }
//         })
//         .then(function (data) {

//             var longitude = data.coord.lon
//             var latitude = data.coord.lat
//             var apiurl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKEY}`
//             fetch(apiurl2)
//                 .then(function (response2) {
//                     if (response2.ok) {
//                         return response2.json()
//                     } else {
//                         alert(`error: ${response2.statusTest}`)
//                     }
//                 })
//                 .then(function (data2) {
//                     // document.querySelector(".modal-content").innerHTML = ""
//                     for (let i = 1; i < 6; i++) {
//                         var day = document.createElement('div')
//                         day.innerHTML = `
//                         <p>Temperature: ${data2.daily[i].temp.day} F°</p>                
//                         <img src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png">
//                         <p>Humidity: ${data2.daily[i].humidity}%</p>
//                         `
//                         document.querySelector(".modal-content").appendChild(day)
//                     }
//                 })

//             // document.querySelector("#current-day").innerHTML = ""
           
//             // var title = document.createElement(`h1`)
//             // title.innerHTML = data.name
           
//             // var weatherImg = document.createElement("img")
//             // weatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)

//             // var temp = document.createElement("P")
//             // temp.innerHTML = "Temperature: " + data.main.temp + " F°"

//             // var humidity = document.createElement("P")
//             // humidity.innerHTML = "Humidity: " + data.main.humidity + "%"

//             // var windSpeed = document.createElement("P")
//             // windSpeed.innerHTML = "Wind Speed: " + data.wind.speed + " MPH"

//             // document.querySelector("#current-day").appendChild(title)
//             // document.querySelector("#current-day").appendChild(weatherImg)
//             // document.querySelector("#current-day").appendChild(temp)
//             // document.querySelector("#current-day").appendChild(humidity)
//             // document.querySelector("#current-day").appendChild(windSpeed)
//         })   


// };




// for (var i = 0; i < data.list.length; i++) {
//     if (data.list[i].dt_txt.indexOf(“15:00:00”) !== -1)
//     { paste variables for html elements here...}
//     }