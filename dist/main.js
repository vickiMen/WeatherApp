const loadPage = async function(){
    await tempManager.getDataFromDB()
    renderer.renderData(tempManager.cityData)
}

const handleSearch = async function(){
    const cityInput = $('#cityInput').val()
    let isAlreadyShown = tempManager.cityData.some( c => c.name.toLowerCase() == cityInput.toLowerCase())
    isAlreadyShown ? renderer.showMessage(cityInput, 'exist') : await tempManager.getCityData(cityInput)
    renderer.renderData(tempManager.cityData)
}


$('.results').on('click', '#saveBtn', function(){
    const cityName = $(this).parent().parent().find('.cityName').html()
    tempManager.saveCity(cityName)
    renderer.showMessage(cityName, 'stored')
})

$('.results').on('click', '#dltBtn', function(){
    const cityRaw = $(this).parent().parent().data('id')
    renderer.deleteCity(cityRaw)
    tempManager.removeCity(cityRaw)
})


$('.results').on('click', '#rfrsBtn', function(){
    const cityName = $(this).parent().parent().find('.cityName').html()
    tempManager.updateCity(cityName)
    // renderer.deleteCity(cityRaw)
})


loadPage()