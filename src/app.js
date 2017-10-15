import {SALT_LAKE_CITY, stateCapitals} from './locations';
import {log, clearLog, input, select, showArt} from './ui';
import {randomKey} from './util';

(function(){
const FUEL_GASOLINE = "gasoline";
const FUEL_FOOD = "food";

/*
carryingCapacity: cubic feet or something
fuelType: gasoline or food
fuelEfficiency: gallons per mile or calories per mile
*/
class Vehicle {
    constructor(name, passengerCapacity, carryingCapacity, fuelType, fuelEfficiency) {
        this.name = name;
        this.passengerCapacity = passengerCapacity;
        this.carryingCapacity = carryingCapacity;
        this.fuelType = fuelType;
        this.fuelEfficiency = fuelEfficiency;
    }

    toString() {
        return this.name;
    }
}

const VEHICLE_SUV = new Vehicle("Seikan Brumby Crossover SUV", 5, 65, FUEL_GASOLINE, 0.034);
const VEHICLE_BIKE = new Vehicle("Jumbo Gravitas Mountain Bike", 1, 3, FUEL_FOOD, 60);
const VEHICLES = [VEHICLE_SUV, VEHICLE_BIKE];

class Game {
    constructor(startLocation) {
        this.playerLocation = startLocation;
        this.people = [];
        this.vehicle = undefined;
    }
}

class Level {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }
}

// const SATIATION_STARVED = new Level("starved", 0);
const SATIATION_STARVING = new Level("starving", 1);
const SATIATION_HUNGRY = new Level("hungry", 2);
const SATIATION_SATIATED = new Level("satiated", 3);
const SATIATION_FULL = new Level("full", 4);
const SATIATION_VERY_FULL = new Level("very full", 5);

const THIRST_DESSICATED = new Level("dessicated", 1);
const THIRST_THIRSTY = new Level("thirsty", 2);
const THIRST_SATIATED = new Level("satiated", 3);
const THIRST_FULL = new Level("full", 4);
const THIRST_VERY_FULL = new Level("very full", 5);

class Person {
    constructor(name) {
        this.name = name;
        this.hunger = SATIATION_SATIATED;
        this.thirst = THIRST_SATIATED;
        this.cumRadiation = 0.0;// μSv
    }
}

window.WATrail = {
    start: function() {
        let self = this;

        self.game = new Game(SALT_LAKE_CITY);

        const homeState = randomKey(stateCapitals);
        const homeTown = stateCapitals[homeState];

        showArt("flag.WA");

        log("<h1>Washington Trail</h1>");

        log("<p>The apocalypse has come.</p>");

        log("<p>Nobody thought it would. They were always wrong before. But this time... this time... doom befell us all.</p>")

        log("<p>You find yourself in the blasted crater of what once was "+homeTown+", "+homeState+". Radioactive ash drifts like deadly snow over the remains of the city. Somehow you survived. But most did not.</p>");

        // console.log("\nAll around you, civilization was collapsing. What was left of the government had been powerless to stop the rioting. And then the bomb fell.");

        log("<p>In the camps you begin to hear from other survivors of a beacon of peace and freedom in this benighted world. The homeland you forsook for what once was your life: Washington.</p>");

        log("<p>You don't know how you'll make it. You only know you must.</p>");

        log("<p>On the Washington Trail.</p>");
        log("<p>[Press any key]</p>");

        document.querySelectorAll("body")[0].addEventListener("keypress", function(){
            // clearLog();
            // log("Welcome to " + game.playerLocation);
            self.configureParty();
        }, {once: true});
    },

    showLocationArt: function() {
        showArt(this.game.playerLocation.name);
    },

    configureParty: function() {
        let self = this;

        self.showLocationArt();
        clearLog();
        log("<p>Your journey begins in " + self.game.playerLocation + "</p>");

        log("<p>Gather your people:</p>");

        input("Your Name: ", function(yourName){
            self.game.people.push(new Person(yourName));
            input("Passenger 1: ", function(passenger1Name){
                self.game.people.push(new Person(passenger1Name));
                input("Passenger 2: ", function(passenger2Name){
                    self.game.people.push(new Person(passenger2Name));
                    input("Passenger 3: ", function(passenger3Name){
                        self.game.people.push(new Person(passenger3Name));
                        select("Choose Your Vehicle:", VEHICLES, function(vehicle, _idx, _key){
                            log("Selected " + vehicle);
                            self.game.vehicle = vehicle;

                            self.visitLocation(false);
                        });
                    });
                });
            });
        });
    },

    visitLocation: function(justArrived) {
        justArrived = justArrived || true;

        let self = this;

        self.showLocationArt();
        clearLog();

        if(justArrived) {
            log("<p>You reach " + self.game.playerLocation + "</p>");
        }


        // log("<p>From " + self.game.playerLocation + " you can reach the following destinations:");
        //
        let connections = self.game.playerLocation.connections;
        // log("<ul>");
        // Object.keys(connections).forEach(function(direction){
        //     let conLoc = connections[direction];
        //     log("<li>" + direction + " -> " + conLoc + "</li>");
        // });
        // log("</ul>");

        select("Choose your next destination:", Object.values(connections), function(conLoc, _idx, _key){
            self.game.playerLocation = conLoc;
            self.visitLocation()
        });
    }
    /*

Fuel types:
    food
    gasoline
    electricity

Fuel sources:
    hunting -> food
    theft/barter -> gasoline
    generation/car battery/solar cells -> electricity

Water
    dirty (radioactive, bacterial)

Radiation protection (see https://www.ready.gov/nuclear-blast)
    shielding for car
    protective suits

Medicine




Starting supplies:


Vehicle



People
    cumulative radiation exposure
    hunger
    thirst
    body temperature (hot/cold)

    weapons
    clothes
    radiation suits


    */
};

})();
