const init = () => {
    "use strict";

    let weatherButton = document.querySelector("#getWeather");
    weatherButton.addEventListener("click", getLocation);
}

const getWeather = (lat, lng, name) => {
    let xhr = new XMLHttpRequest();
    let url = "http://api.geonames.org/findNearByWeatherJSON?username=marilg&lng=" + lng + "&lat=" + lat;

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            // get weather info
            let data = JSON.parse(xhr.responseText);
            let cel = data.weatherObservation.temperature;
            let wDir = data.weatherObservation.windDirection;
            let wSpeed = data.weatherObservation.windSpeed;

            //calculate outputs
            let currentTemp;
            let currentWind;

            let far = (cel * 1.8) + 32;
            currentTemp = Math.round(far) + "&deg; Farenheit";
            
            let i = document.createElement("i");
            i.style.fontSize = "2em";
            if (far <= 34) {
                i.className = "bi bi-thermometer-snow";
                i.style.color = "DodgerBlue";
            } else if (far >= 84) {
                i.className = "bi bi-thermometer-sun";
                i.style.color = "red";
            } else {
                i.className = "bi bi-thermometer-half";
                i.style.color = "ForestGreen";
            }

            currentWind = wSpeed + " mph ";

            if (wDir >= 315 || wDir < 45 && wDir != 0) {
                currentWind += "N";
            } else if (wDir >= 45 && wDir < 135) {
                currentWind += "E";
            } else if (wDir >= 135 && wDir < 225) {
                currentWind += "W";
            } else if (wDir >= 225 && wDir < 315) {
                currentWind += "S";
            } else {
                currentWind += "No";
            }
            currentWind += " Winds";

            let i1 = document.createElement("i");
            i.style.fontSize = "2em";
            if (wSpeed >= 15) {
                i1.className = "bi bi-wind";
                i1.style.color = "LightBlue";
            }
             
            

            //output
            let output = document.getElementById("Project02Output");
            let h2 = document.createElement("h2");
            let br = document.createElement("br");
            let h5 = document.createElement("h5");
            let h5two = document.createElement("h5");

            h2.innerHTML = name;
            h5.innerHTML = currentTemp + "  ";
            h5.appendChild(i);
            h5two.innerHTML = currentWind;
            h5two.appendChild(i1);
            output.appendChild(h2);
            output.appendChild(br);
            output.appendChild(h5);
            output.appendChild(br);
            output.appendChild(h5two);

            document.body.appendChild(output);
        }
    }

    xhr.send(null);
}

const getLocation = () => {
    let output = document.getElementById("Project02Output");
    output.innerHTML = "";
    let form = document.getElementById("Project02Form");
    let zipcode = form.zip.value;
    
    let xhr = new XMLHttpRequest();
    let url = "http://api.geonames.org/postalCodeSearchJSON?username=marilg&postalcode=" + zipcode + "&country=US";

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            let data = JSON.parse(xhr.responseText);
            let lat = data.postalCodes[0].lat;
            let lng = data.postalCodes[0].lng;
            let name = data.postalCodes[0].placeName;
            getWeather(lat, lng, name);
        }
    }

    xhr.send(null);
}

window.onload = init;