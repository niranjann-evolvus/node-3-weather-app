
console.log('Client side js')
const weatherForm  = document.querySelector('form')
const search  = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')
messageOne.textContent = "From js"
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    console.log("testing")

    messageTwo.textContent = "Loading"
    messageOne.textContent = ""
fetch('http://localhost:1997/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (location=='') {
                console.log("Give an address")
                messageOne.textContent = "Enter Address"
                messageTwo.textContent = ""
           }
            else if (data.error) {
                 console.log("invalid  location",data.error)
                 messageOne.textContent = "Invalid Address"
                 messageTwo.textContent = ""
                }
            else {
                 console.log("Location:",data.location) 
                 console.log("Forecast:", data.forecast) 
                 messageOne.textContent=data.location 
                 messageTwo.textContent = data.forecast
            }
        })
 })
})