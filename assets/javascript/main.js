
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
            console.log(response.json());
        })
        .catch(err => {
            console.error(err);
        });
    fiveDay()
});

function fiveDay() {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://api.openweathermap.org/data/2.5/forecast?q=denver&appid=1ab5d5fb108148020574fbedf5d8f664&units=imperial", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
