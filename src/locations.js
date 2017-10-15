import {randLogNormal} from './util';
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


export const stateCapitals = {
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

export const LOCATIONS = [];
class Location {
    constructor(name, locatedIn) {
        this.name = name;
        this.locatedIn = locatedIn;
        this.connections = {};
        LOCATIONS.push(this);
    }

    connect(direction, loc2) {
        this.connections[direction] = loc2;
        loc2.connections[direction.opposite] = this;
        return this;
    }

    toString() {
        return this.name;
    }
}

function Direction(name) {
    this.name = name;
    return this;
}
Direction.prototype.toString = function() {
    return this.name;
}

const NORTH = new Direction("north");
const SOUTH = new Direction("south");
const EAST = new Direction("east");
const WEST = new Direction("west");
NORTH.opposite = SOUTH;
SOUTH.opposite = NORTH;
EAST.opposite = WEST;
WEST.opposite = EAST;

export const SALT_LAKE_CITY = new Location("Salt Lake City");
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
