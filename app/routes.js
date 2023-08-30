//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here



router.post('/journeys/select-destination', function(request, response) {
    const destination = request.body['select-destination']
    if (destination === "Moon"){
        return response.redirect("/journeys/enter-full-name")
    } 
    if (destination === "Mars"){
        return response.redirect("/journeys/mars-full-capacity")
    }
    else {
       return response.render("/journeys/select-destination", {error: true})
    }
})

router.post('/journeys/enter-address-manually', function(request, response){
    console.log(request.body)
    const address1= request.body['address-line-1']
    const town= request.body['address-town']
    const postcode= request.body['address-postcode']
    if(!address1 || !town || !postcode ) {
        return response.render('/journeys/enter-address-manually', {error: true})
    } else {
        return response.redirect('/journeys/check-answer-manual')
    }
})

router.post('/journeys/enter-full-name', function(request, response){
    const fullname = request.body['full-name']
    if(fullname){
        return response.redirect('/journeys/find-address')
    } else {
        return response.render('/journeys/enter-full-name', {error: true})
    }
})

router.post('/journeys/find-address', function(request, response){
    const postcode = request.body['address-postcode']
    if(postcode){
        return response.redirect('/journeys/select-address-details')
    } else {
        return response.render('/journeys/find-address', {error: true})
    }
})

router.post('/journeys/select-address-details', function(request, response) {
    const address = request.body['where-do-you-live']
    if (address) {
        return response.redirect('/journeys/check-answer')
    } else {
        return response.render('/journeys/select-address-details', {error: true})
    }
})

