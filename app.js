(function(){

/*
Abbreviation	State Name	Capital	Became a State
AL	Alabama	Montgomery	December 14, 1819
AK	Alaska	Juneau	January 3, 1959
AZ	Arizona	Phoenix	February 14, 1912
AR	Arkansas	Little Rock	June 15, 1836
CA	California	Sacramento	September 9, 1850
CO	Colorado	Denver	August 1, 1876
CT	Connecticut	Hartford	January 9, 1788
DE	Delaware	Dover	December 7, 1787
FL	Florida	Tallahassee	March 3, 1845
GA	Georgia	Atlanta	January 2, 1788
HI	Hawaii	Honolulu	August 21, 1959
ID	Idaho	Boise	July 3, 1890
IL	Illinois	Springfield	December 3, 1818
IN	Indiana	Indianapolis	December 11, 1816
IA	Iowa	Des Moines	December 28, 1846
KS	Kansas	Topeka	January 29, 1861
KY	Kentucky	Frankfort	June 1, 1792
LA	Louisiana	Baton Rouge	April 30, 1812
ME	Maine	Augusta	March 15, 1820
MD	Maryland	Annapolis	April 28, 1788
MA	Massachusetts	Boston	February 6, 1788
MI	Michigan	Lansing	January 26, 1837
MN	Minnesota	Saint Paul	May 11, 1858
MS	Mississippi	Jackson	December 10, 1817
MO	Missouri	Jefferson City	August 10, 1821
MT	Montana	Helena	November 8, 1889
NE	Nebraska	Lincoln	March 1, 1867
NV	Nevada	Carson City	October 31, 1864
NH	New Hampshire	Concord	June 21, 1788
NJ	New Jersey	Trenton	December 18, 1787
NM	New Mexico	Santa Fe	January 6, 1912
NY	New York	Albany	July 26, 1788
NC	North Carolina	Raleigh	November 21, 1789
ND	North Dakota	Bismarck	November 2, 1889
OH	Ohio	Columbus	March 1, 1803
OK	Oklahoma	Oklahoma City	November 16, 1907
OR	Oregon	Salem	February 14, 1859
PA	Pennsylvania	Harrisburg	December 12, 1787
RI	Rhode Island	Providence	May 19, 1790
SC	South Carolina	Columbia	May 23, 1788
SD	South Dakota	Pierre	November 2, 1889
TN	Tennessee	Nashville	June 1, 1796
TX	Texas	Austin	December 29, 1845
UT	Utah	Salt Lake City	January 4, 1896
VT	Vermont	Montpelier	March 4, 1791
VA	Virginia	Richmond	June 25, 1788
WA	Washington	Olympia	November 11, 1889
WV	West Virginia	Charleston	June 20, 1863
WI	Wisconsin	Madison	May 29, 1848
WY	Wyoming	Cheyenne	July 10, 1890

*/

function randomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function randomKey(obj) {
    return randomElement(Object.keys(obj));
}

function randomProperty (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}

// Standard Normal variate using Box-Muller transform.
// https://stackoverflow.com/a/36481059/5374919
function randStandardNormal() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function randNormal(mu, sigma) {
    return mu + sigma * randStandardNormal();
}

// https://stats.stackexchange.com/questions/110961/sampling-from-a-lognormal-distribution
function randLogNormal(mu, sigma) {
    return Math.exp(randNormal(mu, sigma));
}

const stateCapitals = {
    "Alabama": "Montgomery",
    "Alaska": "Juneau",
    "Arizona": "Phoenix",
    "Arkansas": "Little Rock",
    "California": "Sacramento",
    "Colorado": "Denver",
    "Connecticut": "Hartford",
    "Delaware": "Dover",
    "Florida": "Tallahassee",
    "Georgia": "Atlanta",
    "Hawaii": "Honolulu",
    "Idaho": "Boise",
    "Illinois": "Springfield",
    "Indiana": "Indianapolis",
    "Iowa": "Des Moines",
    "Kansas": "Topeka",
    "Louisiana": "Frankfort",
    "Maine": "Augusta",
    "Maryland": "Annapolis",
    "Massacusetts": "Boston",
    "Michigan": "Lansing",
    "Minnesota": "Saint Paul",
    "Mississippi": "Jackson",
    "Missouri": "Jefferson City",
    "Montana": "Helena",
    "Nebraska": "Lincoln",
    "Nevada": "Carson City",
    "New Hampshire": "Concord",
    "New Jersey": "Trenton",
    "New Mexico": "Santa Fe",
    "New York": "Albany",
    "North Carolina": "Raleigh",
    "North Dakota": "Bismarck",
    "Ohio": "Columbus",
    "Oklahoma": "Oklahoma City",
    "Oregon": "Salem",
    "Pennsylvania": "Harrisburg",
    "Rhode Island": "Providence",
    "South Carolina": "Columbia",
    "South Dakota": "Pierre",
    "Tennessee": "Nashville",
    "Texas": "Austin",
    "Utah": "Salt Lake City",
    "Vermont": "Montpelier",
    "Virginia": "Richmond",
    // "Washington": "Olympia",
    "West Virginia": "Charleston",
    "Wisconsin": "Madison",
    "Wyoming": "Cheyenne"
};

const LOCATIONS = [];
function Location(name) {
    var self = this;
    this.name = name;
    this.connections = {};
    this.connect = function(direction, loc2) {
        self.connections[direction] = loc2;
        loc2.connections[direction.opposite] = self;
        return self;
    };

    LOCATIONS.push(this);

    return this;
}

Location.prototype.toString = function() {
    return this.name;
}

function connect(loc1, direction, loc2) {
    loc1.connections[direction] = loc2;
    loc2.connections[direction.opposite] = loc1;
}

function Direction(name) {
    this.name = name;
    return this;
}

const NORTH = new Direction("north");
const SOUTH = new Direction("south");
const EAST = new Direction("east");
const WEST = new Direction("west");
NORTH.opposite = SOUTH;
SOUTH.opposite = NORTH;
EAST.opposite = WEST;
WEST.opposite = EAST;

const SALT_LAKE_CITY = new Location("Salt Lake City");
const TREMONTON = new Location("Tremonton");
const BOISE = new Location("Boise");
const LA_GRANDE = new Location("La Grande");
const PENDLETON = new Location("Pendleton");
const HERMISTON = new Location("Hermiston");
const WALLA_WALLA = new Location("Walla Walla");
const KENNEWICK = new Location("Kennewick");

SALT_LAKE_CITY.connect(NORTH, TREMONTON);
TREMONTON     .connect(NORTH, BOISE);
BOISE         .connect(WEST, LA_GRANDE);
LA_GRANDE     .connect(NORTH, PENDLETON);
PENDLETON     .connect(NORTH, WALLA_WALLA);
PENDLETON     .connect(WEST, HERMISTON);
HERMISTON     .connect(NORTH, KENNEWICK);

LOCATIONS.forEach(function(loc){
    loc.radioactivity = randLogNormal(10, 10);// μSv/hour
});


const FUEL_GASOLINE = "gasoline";
const FUEL_FOOD = "food";

/*
carryingCapacity: cubic feet or something
fuelType: gasoline or food
fuelEfficiency: gallons per mile or calories per mile
*/
function Vehicle(name, passengerCapacity, carryingCapacity, fuelType, fuelEfficiency) {
    this.name = name;
    this.passengerCapacity = passengerCapacity;
    this.carryingCapacity = carryingCapacity;
    this.fuelType = fuelType;
    this.fuelEfficiency = fuelEfficiency;
}
Vehicle.prototype.toString = function() {
    return this.name;
}

const VEHICLE_SUV = new Vehicle("Seikan Brumby Crossover SUV", 5, 65, FUEL_GASOLINE, 0.034);
const VEHICLE_BIKE = new Vehicle("Jumbo Gravitas Mountain Bike", 1, 3, FUEL_FOOD, 60);
const VEHICLES = [VEHICLE_SUV, VEHICLE_BIKE];

function Game(startLocation) {
    this.playerLocation = startLocation;
    this.people = [];
    this.vehicle = undefined;
    return this;
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function randomID() {
  return 'IDxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/* UI Functions */
function logEl() {
    return document.querySelectorAll("#log")[0];
}
function log(s) {
    logEl().insertAdjacentHTML("beforeend", s.replace(/\n/g, "<br/>"));
};
function clearLog() {
    logEl().innerHTML = "";
};
function input(prompt, callback) {
    let log = logEl();
    log.insertAdjacentHTML("beforeend", prompt);

    let uuid = randomID();
    log.insertAdjacentHTML("beforeend", "<span class=\"input\" id=\"" + uuid + "\"></span>");

    let span = document.querySelector("#" + uuid);

    let input = "";
    function keydownHandler(event) {
        console.log(event);

        if(event.key.length == 1) {
            span.insertAdjacentHTML("beforeend", event.key);
            input += event.key;
        }

        if(event.key=="Enter") {
            span.insertAdjacentHTML("beforeend", "<br/>");
            callback(input);
            document.removeEventListener("keydown", keydownHandler);
        }

        if(event.key=="Backspace") {
            input = input.substring(0, input.length-1);
            span.innerHTML = span.innerHTML.substring(0, span.innerHTML.length - 1);
        }
    };

    document.addEventListener('keydown', keydownHandler);
};

const SELECT_LABELS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
function select(prompt, items, callback) {
    let log = logEl();
    let labels = items.map(function(item, idx){
        return SELECT_LABELS[idx];
    });

    log.insertAdjacentHTML("beforeend", "<p>" + prompt + "</p>");

    let list = "<ol style=\"list-style-type:none;\">";
    items.forEach(function(item, idx){
        list += "<li>" + labels[idx] + ". " + item + "</li>";
    });
    list += "</ol>";

    log.insertAdjacentHTML("beforeend", list);

    function listener(event) {
        console.log(event);
        if(labels.includes(event.key)) {
            let selectedIdx = SELECT_LABELS.indexOf(event.key);
            callback(items[selectedIdx], selectedIdx, event.key);
            document.removeEventListener("keydown", listener);
        }
    }

    document.addEventListener("keydown", listener);
}

function showArt(name) {
    let rqst = new XMLHttpRequest();

    rqst.addEventListener("load", function(){
        if(rqst.readyState==XMLHttpRequest.DONE) {
            document.querySelector("#screen").innerHTML = rqst.responseText;
        }
    });
    rqst.open("GET", "/art/" + name.replace(/ /g, "_") + ".html");
    rqst.send();
}

function Level(name, level) {
    this.name = name;
    this.level = level;
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

function Person(name) {
    this.name = name;
    this.hunger = SATIATION_SATIATED;
    this.thirst = THIRST_SATIATED;
    this.cumRadiation = 0.0;// μSv
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
        let self = this;

        self.showLocationArt();
        clearLog();

        if(justArrived) {
            log("<p>You reach " + self.game.playerLocation + "</p>");
        }


        log("<p>From " + self.game.playerLocation + " you can reach the following destinations:");
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
