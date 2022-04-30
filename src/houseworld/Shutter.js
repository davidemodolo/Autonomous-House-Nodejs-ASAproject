const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Clock = require('../utils/Clock');

class Shutter{
    constructor(house, name, room){
        this.house = house
        this.name = name
        this.room = room
        // true = up, false = down
        this.status = True
    }
}

class ShutterGoal extends Goal {
    
}

class ShutterIntention extends Intention {
    static applicable(goal) {
        return goal instanceof ShutterGoal
    }
    *exec(){
        while(true) {
            Clock.global.notifyChange('mm')
            if (Clock.global.hh == 6) this.log('Shutter' + Clock.global.mm)
            yield
            if (Clock.global.hh == 6) {
                // Log a message!
                this.log('Shutter, up in every room')
                break;
            }
        }
    }
}



module.exports = {ShutterGoal, ShutterIntention}