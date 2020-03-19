const weatherform = document.querySelector('#form-1')
const search = document.querySelector('#location-search')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg1.textContent = 'Loading......'
    msg2.textContent = ''
    const location = search.value
    fetch('http://localhost:5000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
        }
        else{
        msg1.textContent = data.location
        msg2.textContent = data.weather
        }
    })
})
})