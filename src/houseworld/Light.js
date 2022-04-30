const Observable = require('../utils/Observable')

class Light extends Observable {
    constructor (house, name) {
        super()
        this.house = house       // reference to the house
        console.log(this.house.rooms)
        this.name = name           // non-observable
        this.set('status', 'off')   // observable
    }
    switchOnLight (l) {
        if(this.status == 'on') {
            console.log('Light is already on in ' + this.name)
            return
        }
        this.status = 'on'
        this.house.utilities.electricity.consumption += 1
        console.log(this.name + '\tlight turned on')
    }
    switchOffLight (l) {
        if(this.status == 'off') {
            console.log('Light is already off in ' + this.name)
            return
        }
        this.status = 'off'
        this.house.utilities.electricity.consumption -= 1
        console.log(this.name + '\tlight turned off')
    }
}

module.exports = Light