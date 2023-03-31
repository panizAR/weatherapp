let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];
console.log(day);

let dayelement = document.querySelector("#day");
dayelement.innerHTML = day;

//clock
let hour = date.getHours();
let min = date.getMinutes();

let clocklement = document.querySelector("#clock");
clocklement.innerHTML = `${hour}:${min}`;

//search
let formsearch = document.querySelector("#form-search");

function weather(response) {
  console.log(response.data.main.humidity);
  let humidity = document.querySelector(".humid");
  humidity.innerHTML = response.data.main.humidity;

  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = `${temp}°c`;

  let tempdescription = response.data.weather[0].description;
  console.log(tempdescription);
  let tempdescriptionelement = document.querySelector("#tempdescription");
  tempdescriptionelement.innerHTML = tempdescription;
}

function searchcity(event) {
  event.preventDefault();
  let cityname = document.querySelector("#search-input").value;
  let htext = document.querySelector("h1");
  htext.innerHTML = cityname;

  console.log(cityname);
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  axios.get(url).then(weather);
}
formsearch.addEventListener("submit", searchcity);

let faren = document.querySelector("#faren");
function farentem(event) {
  event.preventDefault();
  let temelement = document.querySelector(".temperature");
  let f = (temp * 9) / 5 + 32;
  temelement.innerHTML = f;
}
faren.addEventListener("click", farentem);
