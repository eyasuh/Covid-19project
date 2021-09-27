const testSiteForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

testSiteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const municipality = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/search?municipality=' + municipality).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.municipality
            messageTwo.textContent = data.forecast
        }
    })
})

    console.log(location)
})