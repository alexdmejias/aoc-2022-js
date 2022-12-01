const fs = require('fs');
const path = require('path');

function getInput(fileIndex) {
    return fs.readFileSync(path.join(__dirname, '..', 'inputs', `${fileIndex}.txt`), 'utf-8');
}

function prepInput(rawInput) {
    return rawInput.split('\n').slice(0, -1);
}

function getAndSplitInput(index) {
    return prepInput(getInput(index));
}

function sortInputsDesc(inputs) {
    return inputs.sort((a, b) => b - a);
}

exports.getInput = getInput;
exports.prepInput = prepInput;
exports.getAndSplitInput = getAndSplitInput;
exports.sortInputsDesc = sortInputsDesc;
