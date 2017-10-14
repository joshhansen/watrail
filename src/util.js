function randomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

export function randomKey(obj) {
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
export function randLogNormal(mu, sigma) {
    return Math.exp(randNormal(mu, sigma));
}
