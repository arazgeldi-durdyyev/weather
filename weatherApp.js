
// let p = new Promise((resolve, reject) => {
//     let a = 2+1;
//     if (a ==2) {
//         resolve("Success");
//     } else {
//         reject("Failed");
//     }
// })

// p.then((message)=> {//do this when it succeeds
//     console.log('This is in the then ' + message)
// }).catch((message)=> {//do this when it fails
//     console.log('This is in the catch '+ message)
// }) 

// const userLeft = false;
// const userWatchingCatMeme = false;

// function watchingTutorialCallback(callback, errorCallback) {
//     if(userLeft) {
//         errorCallback({
//             name: "User left",
//             message: ' :('
//         })
//     } else if (userWatchingCatMeme) {
//         errorCallback({
//             name: "User watching cat meme",
//             message: 'WebdevSimplified < Cat'
//         })
//     } else {
//         callback("THumbs up and subscribe")
//     }
// }

// watchingTutorialCallback(message => {
//     console.log("Success: "+message)
// }, error => {
//     console.log(error.name + ' ' + error.message )
// })

// ///now use it with promise
// function watchingTutorialPromise() {
//     return new Promise((resolve, reject) => {
//         if(userLeft) {
//             reject({
//                 name: "User left",
//                 message: ' :('
//             })
//         } else if (!userWatchingCatMeme) {
//             reject({
//                 name: "User watching cat meme",
//                 message: 'WebdevSimplified < Cat'
//             })
//         } else {
//             resolve("THumbs up and subscribe")
//         }
//     })
// }

// watchingTutorialPromise().then((message) => {
//     console.log('Success: '+ message)
// }).catch((error) => {
//     console.log(error.name + ' ' + error.message)
// })

// //another use of promises
// const recordVideoOne = new Promise((resolve, reject)=>{
//     resolve('Video 1 Recorded')
// })
// const recordVideTwo = new Promise((resolve, reject)=>{
//     resolve('Video 2 Recorded')
// })
// const recordVideoThree = new Promise((resolve, reject) => {
//     resolve('Video 3 Recorded')
// })
 
// Promise.all([
//     recordVideoOne,
//     recordVideTwo,
//     recordVideoThree
// ]).then((message) => {
//     console.log(message)
// })
//Promise.race is just like Promise.all except it returns as soon
//as the first one completed instead of waiting for everything to complete

///////////////////////////
////////////////////here starts the WEATHER Application
const appID = 'c33f1fa73169b9c1cf4186a69375fb9e';
const url = 
    `https://api.openweathermap.org/data/2.5/weather?appid=${appID}&units=metric&q=`;
const searchInput = document.getElementById('city-name');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.querySelector('.weather-icon');  

searchInput.addEventListener('keypress', e => {
    if (e.key == 'Enter') {
        searchBtn.click();
    }
})

async function checkWeather(city) {
    const response = await fetch(url + city);
    
    if (response.status == 404){
        console.log(response.status)
        document.querySelector('#forecast').style.display = 'none'
        document.querySelector('.error').style.display = 'block';
    }else {
        document.getElementById('forecast').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
        let data = await response.json() //json() is a method ????
        console.log(data)
    
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '⁰c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
    
        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = './images/cloudy.png'
            document.body.style.backgroundImage = `url('./images/stormCl.png')`
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = './images/sunny.png';
            document.body.style.backgroundImage = `url('./images/sun.png')`
        } else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = './images/rain.png'
            document.body.style.backgroundImage = `url('./images/sun.png')`
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = './images/rain.png'
            document.body.style.backgroundImage = `url('./images/little-boy.jpg')`
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = './images/foggy.png'
            document.body.style.backgroundImage = `url('./images/sun.png')`
        }else if(data.weather[0].main == "Snow") {
            weatherIcon.src = './images/snow.png'
            document.body.style.backgroundImage = `url('./images/osman.jpg')`
        }
    }

}

searchBtn.addEventListener('click', ()=> {
    let cityName = searchInput.value
    checkWeather(cityName)
    searchInput.value = ''
})