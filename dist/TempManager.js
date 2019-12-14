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

    removeCity(cityName){
        let index = this.cityData.indexOf(this.cityData.find( c => c == cityName))
        this.cityData.splice(index,1)
        $.ajax({
            url: `/city/${cityName}`,
            method: 'DELETE',
            dataType: 'json',
            success: function(request,response){
                console.log(response)
            }
        })
    }
}

const tempManager = new TempManager()