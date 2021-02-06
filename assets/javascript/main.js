var apikey = "4d2069688cmsh2f088ecb201529bp1f9b94jsn1b274d26bcd1"

// event listener goes here
var apiUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-01?=&=`
fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert(`error: ${response.statusTest}`)
            }
        })