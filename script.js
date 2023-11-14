const fs = require('fs');
let city
let args = process.argv
let index = args.findIndex(item => item === '-s')

if(args.includes('-h')) {
    console.log(`
    -h: справочная информация о программе
    -s cityName: погода введённого города
    запуск без флага: погода с городом из config.json
    запуск без флага и без файла config.json: погода с дефолтным городом 
    `);
    return
}

fs.open('config.json', (err) => {
    if (err) {
        city = 'minsk'
    } else {
        if(args.includes('-s') && args[index + 1]) {
            city = args[index + 1]
        } else {
            city = require('./config.json').city
        }
    }
    getWeather()
})

async function getWeather() {
    try {
        const res = await fetch(`https://goweather.herokuapp.com/weather/${city}`)
        console.log({"city": city, ...await res.json()});
    } catch (error) {
        console.log(error);
    }
}