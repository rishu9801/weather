const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const container1 = document.querySelector(".card-container1");
const container2 = document.querySelector(".card-container2");
const key = "47fc65002091c63d3254f975a425fe78";
const cityArr = ['delhi','patna','mumbai','dubai'];
let cardBg = '';

const bg = function (d){
  if (d.includes("n")){
    console.log('it is night');
    cardBg = "background: linear-gradient(rgba(71, 71, 71, 0.65),rgba(128, 128, 128, 0.6)), url(night1.png);background-size:cover";
  }else if(d.includes("d")){
    console.log('it is day');
    cardBg = "background: linear-gradient(rgba(185, 185, 185, 0.75),rgba(185, 185, 185, 0.6)), url(day.png);background-size:cover";
  }
}



function degToCompass(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["NORTH", "NORTH NORTH EAST", "NORTH EAST", "EAST NORTH EAST", "EAST", 
            "EAST SOUTH EAST", "SOUTH EAST", "SOUTH SOUTH EAST", "SOUTH", "SOUTH SOUTH WEST",
             "SOUTH WEST", "WEST SOUTH WEST", "WEST", "WEST NORTH WEST", "NORTH WEST", "NORTH NORTH WEST"];
  return arr[(val % 16)];
}





const Search = function () {
  city = input.value;
  const data = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log();
      console.log(data);
      bg(data.weather[0].icon);
      container1.innerHTML = `<div class="card1" style="${cardBg}">
      <img src="${parseInt(data.weather[0].icon,10)}.png" class="card-img-top card-animation" >
      <p class="card-text temp">${Math.round(data.main.temp)}°C</p>
      <p class="card-text weather">${data.weather[0].main}</p>
        <h5 class="card-title card-text">${data.name}</h5>
        <div class="card-body">
          <div class='body1'>
              <p class="b-title">wind</p>
              <p class="b-title">temp</p>
          </div>
          <div class="body2">
              <p class="wind"> <img src="wind.png" > <br> speed:${data.wind.speed} <br> ${degToCompass(data.wind.deg)}</p>
              <p class="min-max"> <img src="temp.png" alt=""> <br> max:${data.main.temp_max} <br> min:${data.main.temp_min}</p>
          </div>
        </div>    
      </div>`;
       input.value = '';
       input.blur()                     
    })
    .catch(err => {alert('Wrong City Name!:',console.log(err));
    input.value = '';
    input.blur() });
};

btn.addEventListener("click", Search);
input.addEventListener('keydown',function(e){
    if(e.key === 'Enter'){
    Search()};
});



for (i=0; i<cityArr.length; i++) {

    city = cityArr[i]
    const data = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          bg(data.weather[0].icon);
          container2.insertAdjacentHTML('beforeend', 
          `<div class="card2" style="${cardBg}">
          <img src="${parseInt(data.weather[0].icon,10)}.png" class="card-img-top" alt="...">
          <p class="card-text temp">${Math.round(data.main.temp)}°C</p>
          <p class="card-text weather">${data.weather[0].main}</p>
            <h5 class="card-title card-text" >${data.name}</h5>
            <div class="card-body">
              <div class='body1'>
                  <p class="b-title">wind</p>
                  <p class="b-title">temp</p>
              </div>
              <div class="body2">
                  <p class="wind"> <img src="wind.png" > <br> speed:${(data.wind.speed*3.6).toFixed(2)}<br> ${degToCompass(data.wind.deg)}</p>
                  <p class="min-max"> <img src="temp.png" alt=""> <br> max:${data.main.temp_max} <br> min:${data.main.temp_min}</p>
              </div>
            </div>    
          </div>`);
          console.log(parseInt(data.weather[0].icon,10));
        });
      }


