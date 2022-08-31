const fs = require('fs');
const detectObfuscation = require(__dirname + '/../src');

let file="/Users/au711317/Work/auserver/packages/shelljs/0.8.5/plugin.js";
let code = fs.readFileSync(file, 'utf-8');
const most_likely_obfuscation_type = detectObfuscation(code);
console.log(most_likely_obfuscation_type);
