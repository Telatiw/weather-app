const d = document
const inputCoutnryElem = d.getElementById('inputCountry')
const titleCountryElem = d.getElementById('titleCountry')
const titileDateElem = d.getElementById('titileDate')
const titileTemper = d.getElementById('titileTemper')
const titileStateElem = d.getElementById('titileState')
const titileDetailElem = d.getElementById('titileDetail')
const daysOfWeek = ['Sunday', 'Monday', 'Thuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agust', 'September', 'October', 'November', 'December']
let fetchData = () => {
    let countryValue = inputCoutnryElem.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryValue}&appid=4e61a8ca0040c20f48682a76268b6f13`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showData(data)
            inputCoutnryElem.value = ''
            inputCoutnryElem.blur()
        })
        .catch((res) => {
            const position = window.innerWidth <= 768 ? 'topCenter' : 'bottomRight'
            iziToast.warning({
                title: 'oh',
                message: 'doesn\'t exit this country or city',
                position: position
            });
            inputCoutnryElem.value = ''
            inputCoutnryElem.blur()
        })
}
function showData(data) {
    titleCountryElem.textContent = `${data.name},${data.sys.country}`
    titileTemper.textContent = `${Math.floor(data.main.temp - 273.15)}°c`
    titileStateElem.textContent = data.weather[0].description
    titileDetailElem.textContent = `${Math.floor(data.main.temp_max - 273.15)} / ${Math.floor(data.main.temp_min - 273.15)}`
}
inputCoutnryElem.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        fetchData()
    }
})
let today = new Date();
let dayOfWeek = today.getDay()
let dayOfMonth = today.getDate()
let monthOfYear = today.getMonth()
let year = today.getFullYear()
titileDateElem.textContent = `${daysOfWeek[dayOfWeek]} ${dayOfMonth} ${month[monthOfYear]} ${year}`