const Observable = require("../utils/Observable")

class Person extends Observable {
  constructor(house, name) {
    super()
    this.house = house // reference to the house
    this.name = name // non-observable
    this.set("in_room", "bedroom") // observable
    // this.observe( 'in_room', v => console.log(this.name, 'moved to', v) )    // observe
  }
  moveTo(to_room) {
    if (this.in_room == to_room) {
      console.log(this.name, "\talready in " + to_room);
      return false;
    }
    if (this.house.rooms[this.in_room].doors_to.includes(to_room)) {
      // for object: to in this.house.rooms[this.in_room].doors_to
      console.log(this.name, "\tmoved from", this.in_room, "to", to_room);
      this.in_room = to_room
      return true
    } else {
      console.log(
        this.name,
        "\tfailed moving from",
        this.in_room,
        "to",
        to_room
      );
      return false
    }
  }
}

module.exports = Person
