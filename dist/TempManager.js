class TempManager{

    constructor(){
        this.cityData = []
    }

    async getDataFromDB(){
        let data = await $.get('/cities')
        if (data != []){
            this.cityData = data
        }
    }

    async getCityData(cityName){
        try {
            let result = await $.get(`/city/${cityName}`)
            result = JSON.parse(result)
            if (result.cod == '404'){
                renderer.showMessage(cityName, 'notFound')
            } else {
                this.cityData.push(
                    {
                        name: result.name,
                        temperature: result.main.temp,
                        condition: result.weather[0].description,
                        conditionPic: result.weather[0].icon,
                        nameRaw: result.name.replace(/\s/, '')
                    })
                    console.log(this.cityData)
            }
        } catch(e) {
            console.log(e);
        }
    }
                

    saveCity(cityName){
        let savedCity = this.cityData.find( c => c.name == cityName )
        $.post('/city', {savedCity} , function(response){
            console.log(response)
        })
    }

    removeCity(cityRaw){
        let index = this.cityData.indexOf(this.cityData.find( c => c.nameRaw == cityRaw))
        this.cityData.splice(index,1)
        $.ajax({
            url: `/city/${cityRaw}`,
            method: 'DELETE',
            // dataType: 'json',
            success: function(response){
                console.log(response)
            }
        })
    }

    updateCity(cityName){
        $.ajax({
            url: `/city/${cityName}`,
            method: 'PUT',
            dataType: 'json',
            success: (data) => {
                    let index = this.cityData.findIndex( c => c.name == cityName )
                    this.cityData[index].temperature = data.main.temp
                    this.cityData[index].condition = data.weather[0].description
                    this.cityData[index].conditionPic = data.weather[0].icon
                    renderer.renderData(this.cityData)
            }
        })
    }
}

const tempManager = new TempManager()