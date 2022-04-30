const Beliefset = require("../bdi/Beliefset");
const Observable = require("../utils/Observable");
const Clock = require("../utils/Clock");
const Agent = require("../bdi/Agent");
const Goal = require("../bdi/Goal");
const Intention = require("../bdi/Intention");
const Person = require("./Person");
const Light = require("./Light");
const Microwave = require("./Microwave");
const { AlarmGoal, AlarmIntention } = require("./Alarm");
const {
  SenseLightsGoal,
  SenseLightsIntention,
  SenseOneLightGoal,
  SenseOneLightIntention,
} = require("./LightSensor");

class House {
  constructor() {
    this.people = {
      davide: new Person(this, "Davide"),
      maura: new Person(this, "Maura"),
    };
    this.rooms = {
      kitchen: { name: "kitchen", doors_to: ["living_room"], peop: 0 },
      bedroom: { name: "bedroom", doors_to: ["bedroom", "living_room"], peop: 2 },
      living_room: { name: "living_room", doors_to: ["kitchen", "bedroom"], peop: 0 }
    };
    this.devices = {
      kitchen_light: new Light(this, "kitchen"),
      kitchen_microwave: new Microwave(this, "kitchen"),
      bedroom_light: new Light(this, "bedroom"),
      living_room_light: new Light(this, "living_room")
    };
    this.utilities = {
      electricity: new Observable({ consumption: 0 }),
    };
  }
}

// House, which includes rooms and devices

var myHouse = new House();
// Agents
var myAgent = new Agent("HouseAgent");
myAgent.intentions.push(AlarmIntention);
myAgent.postSubGoal(new AlarmGoal());

myAgent.intentions.push(SenseLightsIntention);
// myAgent.intentions.push(SenseOneLightIntention)
myAgent.postSubGoal(
  new SenseLightsGoal([
    myHouse.devices.kitchen_light,
    myHouse.devices.bedroom_light,
  ])
);

// Simulated Daily/Weekly schedule
Clock.global.observe("mm", (mm) => {
  var time = Clock.global;
  if (time.hh == 5 && time.mm == 45) {
    myHouse.devices.kitchen_microwave.switchOnMW();
  }
  if (time.hh == 6 && time.mm == 0) {
    myHouse.devices.bedroom_light.switchOnLight();
    myHouse.devices.kitchen_light.switchOnLight();
    myHouse.devices.kitchen_microwave.switchOffMW();

    myHouse.people.davide.moveTo("living_room");
    myHouse.people.davide.moveTo("kitchen");

    myHouse.devices.bedroom_light.switchOffLight();

    myHouse.devices.kitchen_microwave.removeCroissant();
  }
  if (time.hh == 7 && time.mm == 30) {
    myHouse.people.davide.moveTo("living_room");
    myHouse.devices.kitchen_light.switchOffLight();
    myHouse.devices.living_room_light.switchOnLight();
  }

  if (time.hh == 12 && time.mm == 0) myHouse.people.davide.moveTo("kitchen");
  if (time.hh == 13 && time.mm == 30)
    myHouse.people.davide.moveTo("living_room");
  if (time.hh == 19 && time.mm == 0) myHouse.people.davide.moveTo("kitchen");
  if (time.hh == 20 && time.mm == 15)
    myHouse.people.davide.moveTo("living_room");
  if (time.hh == 22 && time.mm == 0) myHouse.people.davide.moveTo("bedroom");
});

// Start clock
Clock.startTimer();
