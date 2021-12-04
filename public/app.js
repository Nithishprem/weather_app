const getLocDOM =document.querySelector('.get-loc')
let lat,long,city;
const locationDOM = document.querySelector('.city-input')
const errorDOM = document.querySelector('.error')

const getweather = async (city)=>{
    try{
        console.log(city)
        const res = await fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept' : 'application/json'
            },
            body : JSON.stringify({ city })
        })
        console.log(res)
        if(!res.ok){
                   throw new Error("reource not found")
                }
        const data = await res.json()
        setWeather(data)
        }
        catch(err){
            console.log(err)
            document.querySelector('.or').classList.remove('show')
            getLocDOM.classList.remove('show')
            errorDOM.classList.add('show')
            setTimeout(()=>{
                errorDOM.classList.remove('show')
                document.querySelector('.or').classList.add('show')
            getLocDOM.classList.add('show')
                  
            },2000)
    }
}

const getweatherCord = async(lat,long)=>{
    try{
        const res = await fetch('/weather',
        {
            method: "POST",
            headers: {
               'content-type':  'application/json',
               'Accept': 'application/json'
            },
            body: JSON.stringify({ lat, long})
        })
        if(!res.ok){
            throw new Error("reource not found")
         }
        const data = await res.json()
        setWeather(data)   
        }
        catch(err){
            console.log(err)
            document.querySelector('.or').classList.remove('show')
            getLocDOM.classList.remove('show')
            errorDOM.classList.add('show')
            setTimeout(()=>{
                errorDOM.classList.remove('show') 
                document.querySelector('.or').classList.add('show')
                getLocDOM.classList.add('show') 
            },2000)
    }
}

function setWeather(data){
    // console.log(data)
    document.querySelector('.or').classList.remove('show')
    getLocDOM.classList.remove('show')
    let { name } = data
    let date = new Date()
    date = date.toString().split(' ').filter((i,index)=>index<5)
    date[4]=date[4].split(':').filter((i,index)=>index<2).join(':')
    const {main, icon} =data.weather[0]
    // console.log(description)
    let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const {temp, feels_like, humidity } = data.main
    const{speed } = data.wind
    document.querySelector('body').style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${main}")`
    document.querySelector('#city').innerHTML=name
    document.querySelector('.date').innerHTML= `${date[0]} ${date[2]} ${date[1]} , ${date[4]}`
    document.querySelector('.weath-icon').setAttribute('src', iconUrl)
    document.querySelector('.curr-temp').innerHTML=`${temp.toString().split('.')[0]}&#176;C`
    document.querySelector('.feel-temp').innerHTML=`Feels like${feels_like.toString().split('.')[0]}&#176;`
    document.querySelector('.curr-weather').innerHTML=main
    document.querySelector('.humidity').innerHTML=`Humidity <br />${humidity}<span>%</span>`
    document.querySelector('.wind').innerHTML=` Wind Speed<br />${speed}<span>m/sec</span>`
    document.querySelector('.weather-data').classList.remove('loading')
    locationDOM.value=''
}

document.querySelector('.search-btn').addEventListener('click', (e)=>{
    city = locationDOM.value
    if(city == ''){
        console.log('please enter a city')
    }else{
        weathData = getweather(city)
    } 
})

locationDOM.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter'){
    e.preventDefault()
    city = locationDOM.value
    if(city == ''){
        console.log('please enter a city')
    }else{
        weathData = getweather(city)
    }  
}
})

getLocDOM.addEventListener('click', ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((location)=>{
        lat = location.coords.latitude
        long = location.coords.longitude
        getweatherCord(lat,long)  
        })
    }
})



