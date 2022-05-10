'use strict';

const fs = require('fs');

Set

let rawdata = fs.readFileSync('aide-all.json');
let aide = JSON.parse(rawdata);


const all_aid_types = new Set()
for (const result of aide.results) {
    result.aid_types.forEach(x => all_aid_types.add(x))
}

const all_perimeters = new Set()
for (const result of aide.results) {
    all_perimeters.add(result.perimeter)
}

console.log(aide.results[0])
console.log(JSON.stringify(Array.from(all_aid_types), null, " "))
console.log(JSON.stringify(Array.from(all_perimeters), null, " "))