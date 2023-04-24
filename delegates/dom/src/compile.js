const protobuf = require('protobufjs');
const fs = require('fs');

// Load the protobuf schema
const root = protobuf.loadSync('proto/customisation.proto');

// Generate the JSON representation of the schema
const json = root.toJSON();

// Write the JSON to a file
fs.writeFileSync('compiled.json', JSON.stringify(json, null, 2));
