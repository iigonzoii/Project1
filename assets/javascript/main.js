// api key set to global scope for easy access
var APIKEY = "1ab5d5fb108148020574fbedf5d8f664";
// our event listener sets variables, fetches the information that we need from sky scanner and runs our weather search function. In short we have the click event setting the whole application into motion.
document.querySelector(".search-btn").addEventListener("click", function (event) {
    var departureDay = document.querySelector(".departure").value;
    var returnDay = document.querySelector(".arrival-home").value;
    var departureCity = document.querySelector(".origin").value;
    var arrivalCity = document.querySelector(".destination").value;
    var departureCityCode = "DEN-sky"
    var arrivalCityCode = "ORD-sky"
    weatherSearch(arrivalCity)


    // ---------------------- SKY FETCH
    var MyUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/${departureCityCode}/${arrivalCityCode}/${departureDay}?inboundpartialdate=${returnDay}`

    fetch(MyUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "803484f99cmsh3c80d518e43f9cbp106fa0jsnc4dcb9639523",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
        })

        .then(function (data) {

            // here we use these variables to store data from the object we fetched to be later used in dynamically displaying our flight results
            var carrier = data.Carriers[0].Name;
            var iataCodeDep = data.Places[0].IataCode;
            var depAirport = data.Places[0].Name;
            var iataCodeArrival = data.Places[1].IataCode;
            var destinationAirport = data.Places[1].Name;
            var outboundDate = data.Dates.OutboundDates[0].PartialDate;
            var price = data.Dates.OutboundDates[0].Price;

            document.querySelector(".results-btn").setAttribute("display", "inline")
            // here we create a display based on the users input that will return the flight information.
            var resultsList = document.getElementById("#results-list")
            var listItem = document.createElement("li")
            listItem.innerHTML = `
            <div>
                <h2><b> Airline: </b>${carrier}</h2>
                <h3><b>Departs From: </b>${depAirport} (${iataCodeDep})</h3>
                <h3><b>Arriving To: </b>${destinationAirport} (${iataCodeArrival})</h3>
                <h3><b>Price: </b>$${price}</h3>
            </div>
                `
            document.querySelector("#results-list").innerHTML = ""
            document.getElementById("results-list").appendChild(listItem)
        });
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
    // SKY FETCH2------------------------------------
    fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city}`, requestOptions)
        .then(response => {
            console.log(response.json());
        })
        .then(function (data) {
            var cityCode = data.places[1].placeId
            return cityCode
        })
        .catch(error => console.log('error', error));
}

// function that will call our five day forecast
function weatherSearch(arrivalCity) {
    // here we do our first weather fetch which takes the user input of destination and uses it as the city parameter in our query string.
    var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${arrivalCity}&units=imperial&appid=${APIKEY}`;
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert(`error: ${response.statusTest}`)
            }
        })
        // below we set variables for latitude and longitude which we access from our first fetch. 
        // we then use those variables in our query string for our second fetch which allows us to take the users input for a five day forecast in their destination city.
        .then(function (data) {
            var longitude = data.coord.lon
            var latitude = data.coord.lat
            var apiurl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKEY}`
            fetch(apiurl2)
                .then(function (response2) {
                    if (response2.ok) {
                        return response2.json()
                    } else {
                        alert(`error: ${response2.statusTest}`)
                    }
                })

                .then(function (data2) {
                    document.querySelector("#weather-results").innerHTML = ""
                    //    here we use a for loop to traverse the object we got from our fetch. this will dynamically display the forecast cards you see on the front end of the application.
                    for (let i = 1; i < 6; i++) {
                        var day = document.createElement('div')
                        day.innerHTML = `
                        <div class="col s2">
                        <div class="card">
                        <div class="card-image">
                        <img class="weather-icon" style="background:blue" src="http://openweathermap.org/img/wn/${data2.daily[i].weather[0].icon}@2x.png">
                        <span class="card-title">Day ${i}</span>
                        </div>
                        <div class="card-content" style="width:100%">
                        <p>Temperature: ${data2.daily[i].temp.day} F°</p> 
                        <p>Humidity: ${data2.daily[i].humidity}%</p> 
                        </div>
                        </div>
                        </div>
                        `
                        document.querySelector("#weather-results").appendChild(day)
                    }
                })
        })
};

