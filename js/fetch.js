/* Api key */

const Key_api = "10eec9e1f729069ade19e36fecfa2afc";

function BuscarClima() {
  navigator.geolocation.getCurrentPosition(getLocation);

  function getLocation(location) {
    const { latitude, longitude } = location.coords;

    getDatos(latitude, longitude);
  }

  function getDatos(lat, lon) {
    spinner();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Key_api}`
    )
      .then((res) => res.json())
      .then((data) => {
        const {
          name,
          main: { humidity, temp_max, temp_min, temp },
          weather,
          sys: { country },
        } = data;

        console.log(data);
        const clima = {
          nombre: name,
          pais: country,
          icono: weather[0].icon,
          clima: weather[0].main,
          temp: ` ${Format(temp - 273.15)}`,
          temp_max: `Temp-máx : ${Format(temp_max - 273.15)}`,
          temp_min: `Temp-min : ${Format(temp_min - 273.15)}`,
          humedad: `Humedad: ${Format(humidity)}%`,
        };
        mostrarClima(clima);
      });
  }
}
/* variable */
const cardWeather = document.querySelector(".card-weather");

const cityName = document.getElementById("cityName");

const bg = document.getElementById("bg");

const BuscarCiudad = () => {
  if (cityName.value.length > 0) {
    spinner();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${Key_api}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.cod == "404") {
          alert("Ciudad no encontrada");
        } else {
          const {
            name,
            main: { humidity, temp_max, temp_min, temp },
            weather,
            sys: { country },
          } = data;

          const clima = {
            nombre: name,
            pais: country,
            icono: weather[0].icon,
            clima: weather[0].main,
            temp: ` ${Format(temp - 273.15)}`,
            temp_max: `Temp-máx : ${Format(temp_max - 273.15)}`,
            temp_min: `Temp-min : ${Format(temp_min - 273.15)}`,
            humedad: `Humedad: ${Format(humidity)}%`,
          };
          cityName.value = "";
          mostrarClima(clima);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Debe elegir una ciudad");
  }
};

const mostrarClima = (clima) => {
  condicionClimatica(clima.clima);
  cardWeather.innerHTML = "";
  cardWeather.innerHTML = ` 

  
  <div class="info-weather">
  <h2 class="name-city">${clima.nombre}, ${clima.pais}</h2>

  

  
   
    <p class="temp-actual">${clima.temp} &#8451</p>
   <div class = "datos-weather"> <p class="temp-max">${clima.temp_max} &#8451</p>
   <p class="temp-min">${clima.temp_min} &#8451</p>
   <p class="humidity">${clima.humedad}</p></div>
  </div>`;
};

const Format = (valor) => {
  return Math.round(valor);
};

const spinner = () => {
  cardWeather.innerHTML = "";
  const spinnerCharge = document.createElement("div");
  spinnerCharge.classList.add("spinner");

  spinnerCharge.innerHTML = ` <div class="bounce1"></div>
  <div class="bounce2"></div>
  <div class="bounce3"></div>`;

  cardWeather.appendChild(spinnerCharge);
};

const icons = document.getElementById("icon-weather");

const condicionClimatica = (clima) => {
  switch (clima) {
    case "Rain":
      bg.style.backgroundImage = "url('../img/lluvia.jpg')";

      break;

    case "Clear":
      bg.style.backgroundImage = "url('../img/dia-soleado.png')";
      break;

    case "Clouds":
      bg.style.backgroundImage = "url('../img/nubes.jpg')";

      break;

    case "Snow":
      bg.style.backgroundImage = "url('../img/nieve.jpg')";
      break;

    case "Thunderstorm":
      bg.style.backgroundImage = "url('../img/tormentaelectrica.jpg')";
      break;
    case "Drizzle":
      bg.style.backgroundImage = "url('../img/llovizna.jpg')";
      break;

    default:
      bg.style.backgroundColor = "blue";
      break;
  }
};
