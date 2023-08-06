"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.getIndex = exports.purge = exports.chronicle = void 0;
const memory_1 = require("./memory");
const DEFAULT_CHRONICLE = {
    records: []
};
exports.chronicle = memory_1.wingMem.chronicle || (memory_1.wingMem.chronicle = DEFAULT_CHRONICLE);
/** Resets chroncile records to the default value of an empty array. */
const purge = () => exports.chronicle.records = DEFAULT_CHRONICLE.records;
exports.purge = purge;
/** Safely returns the next index of a named record. Returns 1 if the record has never previously existed. */
const getIndex = (name) => {
    //Get next record or create a new one if it does not exist
    let record = exports.chronicle.records.find(record => record.name === name);
    if (record == null) {
        record = {
            name: name,
            index: 0
        };
        exports.chronicle.records.push(record);
    }
    //Increment and return
    record.index++;
    return record.index;
};
exports.getIndex = getIndex;
/** Safely returns the next available indexed name of a record. */
const getName = (name) => {
    const index = (0, exports.getIndex)(name);
    return `${name}${index}`;
};
exports.getName = getName;
