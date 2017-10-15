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

export const STATES = [];
class State extends Location {
    constructor(name, locatedIn) {
        super(name, locatedIn);
        STATES.push(this);
    }
}

export const CITIES = [];
class City extends Location {
    constructor(name, locatedIn, isCapital) {
        super(name, locatedIn);
        if(isCapital) {
            locatedIn.capital = this;
        }
        CITIES.push(this);
    }
}

class Direction {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

const NORTH = new Direction("north");
const SOUTH = new Direction("south");
const EAST = new Direction("east");
const WEST = new Direction("west");
NORTH.opposite = SOUTH;
SOUTH.opposite = NORTH;
EAST.opposite = WEST;
WEST.opposite = EAST;

const USA = new Location("United States");

const ALABAMA = new State("Alabama", USA);
const ALASKA = new State("Alaska", USA);
const ARIZONA = new State("Arizona", USA);
const ARKANSAS = new State("Arkansas", USA);
const CALIFORNIA = new State("California", USA);
const COLORADO = new State("Colorado", USA);
const CONNECTICUT = new State("Connecticut", USA);
const DELAWARE = new State("Delaware", USA);
const FLORIDA = new State("Florida", USA);
const GEORGIA = new State("Georgia", USA);
const HAWAII = new State("Hawaii", USA);
const IDAHO = new State("Idaho", USA);
const ILLINOIS = new State("Illinois", USA);
const INDIANA = new State("Indiana", USA);
const IOWA = new State("Iowa", USA);
const KANSAS = new State("Kansas", USA);
const KENTUCKY = new State("Kentucky", USA);
const LOUISIANA = new State("Louisiana", USA);
const MAINE = new State("Maine", USA);
const MARYLAND = new State("Maryland", USA);
const MASSACHUSETTS = new State("Massachusetts", USA);
const MICHIGAN = new State("Michigan", USA);
const MINNESOTA = new State("Minnesota", USA);
const MISSISSIPPI = new State("Mississippi", USA);
const MISSOURI = new State("Missouri", USA);
const MONTANA = new State("Montana", USA);
const NEBRASKA = new State("Nebraska", USA);
const NEVADA = new State("Nevada", USA);
const NEW_HAMPSHIRE = new State("New Hampshire", USA);
const NEW_JERSEY = new State("New Jersey", USA);
const NEW_MEXICO = new State("New Mexico", USA);
const NEW_YORK = new State("New York", USA);
const NORTH_CAROLINA = new State("North Carolina", USA);
const NORTH_DAKOTA = new State("North Dakota", USA);
const OHIO = new State("Ohio", USA);
const OKLAHOMA = new State("Oklahoma", USA);
const OREGON = new State("Oregon", USA);
const PENNSYLVANIA = new State("Pennsylvania", USA);
const RHODE_ISLAND = new State("Rhode Island", USA);
const SOUTH_CAROLINA = new State("South Carolina", USA);
const SOUTH_DAKOTA = new State("South Dakota", USA);
const TENNESSEE = new State("Tennessee", USA);
const TEXAS = new State("Texas", USA);
const UTAH = new State("Utah", USA);
const VERMONT = new State("Vermont", USA);
const VIRGINIA = new State("Virginia", USA);
const WASHINGTON = new State("Washington", USA);
const WEST_VIRGINIA = new State("West Virginia", USA);
const WISCONSIN = new State("Wisconsin", USA);
const WYOMING = new State("Wyoming", USA);









export const POSSIBLE_HOME_STATES = [
    UTAH
];

export const POSSIBLE_DESTINATION_STATES = [
    WASHINGTON
];

const MONTGOMERY = new City("Montgomery", ALABAMA, true);
const JUNEAU = new City("Juneau", ALASKA, true);
const PHOENIX = new City("Phoenix", ARIZONA, true);
const LITTLE_ROCK = new City("Little Rock", ARKANSAS, true);
const SACRAMENTO = new City("Sacramento", CALIFORNIA, true);
const DENVER = new City("Denver", COLORADO, true);
const HARTFORD = new City("Hartford", CONNECTICUT, true);
const DOVER = new City("Dover", DELAWARE, true);
const TALLAHASSEE = new City("Tallahassee", FLORIDA, true);
const ATLANTA = new City("Atlanta", GEORGIA, true);
const HONOLULU = new City("Honolulu", HAWAII, true);

const BOISE = new City("Boise", IDAHO, true);

const SPRINGFIELD = new City("Springfield", ILLINOIS, true);
const INDIANAPOLIS = new City("Indianapolis", INDIANA, true);
const DES_MOINES = new City("Des Moines", IOWA, true);
const TOPEKA = new City("Topeka", KANSAS, true);
const FRANKFORT = new City("Frankfort", KENTUCKY, true);
const BATON_ROUGE = new City("Baton Rouge", LOUISIANA, true);
const AUGUSTA = new City("Augusta", MAINE, true);
const ANNAPOLIS = new City("Annapolis", MARYLAND, true);
const BOSTON = new City("Boston", MASSACHUSETTS, true);
const LANSING = new City("Lansing", MICHIGAN, true);
const SAINT_PAUL = new City("Saint Paul", MINNESOTA, true);
const JACKSON = new City("Jackson", MISSISSIPPI, true);
const JEFFERSON_CITY = new City("Jefferson City", MISSOURI, true);
const HELENA = new City("Helena", MONTANA, true);
const LINCOLN = new City("Lincoln", NEBRASKA, true);
const CARSON_CITY = new City("Carson City", NEVADA, true);
const CONCORD = new City("Concord", NEW_HAMPSHIRE, true);
const TRENTON = new City("Trenton", NEW_JERSEY, true);
const SANTA_FE = new City("Santa Fe", NEW_MEXICO, true);
const ALBANY = new City("Albany", NEW_YORK, true);
const RALEIGH = new City("Raleigh", NORTH_CAROLINA, true);
const BISMARCK = new City("Bismarck", NORTH_DAKOTA, true);
const COLUMBUS = new City("Columbus", OHIO, true);
const OKLAHOMA_CITY = new City("Oklahoma City", OKLAHOMA, true);

const SALEM = new City("Salem", OREGON, true);
const LA_GRANDE = new City("La Grande", OREGON);
const PENDLETON = new City("Pendleton", OREGON);
const HERMISTON = new City("Hermiston", OREGON);


const HARRISBURG = new City("Harrisburg", PENNSYLVANIA, true);
const PROVIDENCE = new City("Providence", RHODE_ISLAND, true);
const COLUMBIA = new City("Columbia", SOUTH_CAROLINA, true);
const PIERRE = new City("Pierre", SOUTH_DAKOTA, true);
const NASHVILLE = new City("Nashville", TENNESSEE, true);
const AUSTIN = new City("Austin", TEXAS, true);

const SALT_LAKE_CITY = new City("Salt Lake City", UTAH, true);
const TREMONTON = new City("Tremonton", UTAH);

const MONTPELIER = new City("Montpelier", VERMONT, true);
const RICHMOND = new City("Richmond", VIRGINIA, true);

const OLYMPIA = new City("Olympia", WASHINGTON, true);
const WALLA_WALLA = new Location("Walla Walla", WASHINGTON);
const KENNEWICK = new Location("Kennewick", WASHINGTON);

const CHARLESTON = new City("Charleston", WEST_VIRGINIA, true);
const MADISON = new City("Madison", WISCONSIN, true);
const CHEYENNE = new City("Cheyenne", WYOMING, true);



SALT_LAKE_CITY.connect(NORTH, TREMONTON);
TREMONTON     .connect(NORTH, BOISE);
BOISE         .connect(WEST, LA_GRANDE);
LA_GRANDE     .connect(NORTH, PENDLETON);
PENDLETON     .connect(NORTH, WALLA_WALLA);
PENDLETON     .connect(WEST, HERMISTON);
HERMISTON     .connect(NORTH, KENNEWICK);




CITIES.forEach(function(loc){
    loc.radioactivity = randLogNormal(10, 10);// μSv/hour
});
