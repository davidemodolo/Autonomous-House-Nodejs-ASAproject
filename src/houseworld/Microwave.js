const Observable = require('../utils/Observable')

class Microwave extends Observable {
    constructor (house, name) {
        super()
        this.house = house       // reference to the house
        this.name = name           // non-observable
        this.set('status', 'off')   // observable
        this.set('full', true)
    }
    addCroissant(){
        // if in this house someone is in the kitchen
        for(let people of this.house.people){
            if(people.in_room == 'kitchen'){
                console.log('Someone is in the kitchen')
                break
            }
            else{
                console.log('No one is in the kitchen to fill the MW')
                return
            }
        }


        if(this.full){
            console.log('Microwave already has a croissant')
            return
        }
        this.full = true
        console.log(this.name + '\tmicrowave filled with a croissant')
    }
    removeCroissant(){
        if(!this.full){
            console.log('Microwave does not have a croissant')
            return
        }
        this.full = false
        console.log(this.name + '\tmicrowave removed a croissant')
    }
    switchOnMW () {
        if(this.status == 'on') {
            console.log('Microwave is already on in ' + this.name)
            return
        }
        if(!this.full){
            console.log('Microwave does not have a croissant')
            return
        } 
        this.status = 'on'
        this.house.utilities.electricity.consumption += 1
        console.log(this.name + '\tmicrowave turned on')
    }
    switchOffMW () {
        if(this.status == 'off') {
            console.log('Microwave is already off in ' + this.name)
            return
        }
        this.status = 'off'
        this.house.utilities.electricity.consumption -= 1
        console.log(this.name + '\tmicrowave turned off')
    }
}

module.exports = Microwave