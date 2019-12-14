class Renderer {

    constructor(dest,source){
        this.dest = $('.results')
        this.source = $('.template')
        this.header = $('.header')
    }

    renderData(allCityData){
        // $('.alert').remove()/
        this.dest.empty()
        const template = Handlebars.compile(this.source.html())
        const newHTML = template({allCityData})
        this.dest.append(newHTML)
    }

    deleteCity(cityName){
        const delCity = $(`[data-id='${cityName}']`)
        delCity.remove()
    }

    showMessage(cityName, content){
        $('.alert').remove()
        switch(content){
            case 'exist':
                this.header.append(`<p class='alert'>${cityName} is already displayed</p>`)
                break
            case 'stored':
                this.header.append(`<p class='alert'>${cityName} has been stored successfully</p>`)
                break
            case 'notFound':
                this.header.append(`<p class='alert'>${cityName} could not be found</p>`)
        }

    }

}

const renderer = new Renderer()