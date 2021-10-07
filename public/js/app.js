const testSiteForm = document.querySelector('form')
const search = document.querySelector('input')
const fieldOne = document.querySelector('#field-1')

// const nameElement = document.querySelector('#name')
// const fullAddress = document.querySelector('#fullAddress')
// const siteType = document.querySelector('#siteType')
// const apptRequired = document.querySelector('#apptRequired')
// const operationalHours = document.querySelector('#operationalHours')
// const driveThrough = document.querySelector('#driveThrough')
// const scheduleURL = document.querySelector('scheduleURL')
// const websiteURL = document.querySelector('#websiteURL')


testSiteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fieldOne.textContent = 'Loading...'

    fetch('/search?municipality=' + search.value).then((response) => {
    response.json().then((data) => {
        
        // console.log(data.testsites)
        if (data.error) {
            fieldOne.textContent = data.error
        } else {
            fieldOne.textContent = data.municipality
            // nameElement.textContent = data.testsites

            const resultsHTML = data.testsites
                .map(testsite => {
                    return `<div class="testsite">
                                <p>Name: ${testsite.attributes.name}</p>
                                <p>Address: ${testsite.attributes.fulladdr}</p>
                                <p>Site Type: ${testsite.attributes.site_type}</p>
                                <p>Appointment Required: ${testsite.attributes.appt_required}</p>
                                <p>Hours: ${testsite.attributes.operationalhours}</p>
                                <p>Drivethru: ${testsite.attributes.drivethru}</p>
                                <p>Schedule: ${testsite.attributes.schedule_url}</p>
                                <p>Website: ${testsite.attributes.website_url}</p>
                            </div>`
            }).join()
            document
                .querySelector("#searchResults")
                .insertAdjacentHTML("afterbegin", resultsHTML)

        }
    })
})

})