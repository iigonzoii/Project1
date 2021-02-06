// var apikey = "4d2069688cmsh2f088ecb201529bp1f9b94jsn1b274d26bcd1"

document.querySelector(".search-btn").addEventListener("click", function (event) {
    console.log("works")
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-01?inboundpartialdate=2021-03-01", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "803484f99cmsh3c80d518e43f9cbp106fa0jsnc4dcb9639523",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
    // event.preventDefault()
    // // var selectedCity = document.querySelector("#search-term").value
    // // console.log(selectedCity);
    // // weatherSearch(selectedCity)

    // // event listener goes here
    // // var apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-01?=&=`
    // fetch(apiUrl)
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json()
    //         } else {
    //             alert(`error: ${response.statusTest}`)
    //         }
    //     })
    //     .then(function (data) {
    //         console.log(data)
    //     })
});