const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Person = require('./Person');



class SensePersonGoal extends Goal {

    constructor (Persons = []) {
        super()

        /** @type {Dictionary} lights */
        this.Persons = Persons

    }

}



class SensePersonsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        /** @type {Array<Light>} lights */
        this.Persons = this.goal.Persons
    }
    
    static applicable (goal) {
        return goal instanceof SensePersonGoal
    }
    *exec () {
        var PersonsGoals = []
        for (let p of this.Persons) {
            // let lightGoalPromise = this.agent.postSubGoal( new SenseOneLightGoal(l) )
            // lightsGoals.push(lightGoalPromise)
            
            let PersonGoalPromise = new Promise( async res => {
                while (true) {
                    let new_room = await p.notifyChange('in_room')
                    p.house.devices[p.prev_room+'_light'].switchOffLight()
                    p.house.devices[p.in_room+'_light'].switchOnLight()
                    this.log('sense: Person ' + p.name + ' moved to ' + new_room)
                    // this.agent.beliefs.declare('Person '+r.name, status=='on')
                    // this.agent.beliefs.declare('Person '+r.name, status=='off')
                }
            });

            PersonsGoals.push(PersonGoalPromise)
        }
        yield Promise.all(PersonsGoals)
    }

}


module.exports = {SensePersonGoal, SensePersonsIntention}