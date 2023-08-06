"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commitRecord = exports.getName = exports.getRecord = exports.purge = exports.chronicle = void 0;
const memory_1 = require("./memory");
const DEFAULT_CHRONICLE = {
    records: []
};
exports.chronicle = memory_1.wingMem.chronicle || (memory_1.wingMem.chronicle = DEFAULT_CHRONICLE);
/** Resets chroncile records to the default value of an empty array */
const purge = () => exports.chronicle.records = DEFAULT_CHRONICLE.records;
exports.purge = purge;
/** Safely returns a named record.*/
const getRecord = (name) => {
    //Get next record or create a new one if it does not exist
    let record = exports.chronicle.records.find(record => record.name === name);
    if (record == null) {
        record = {
            name: name,
            index: 1
        };
        exports.chronicle.records.push(record);
    }
    return record;
};
exports.getRecord = getRecord;
/** Formats a NameRecord as a name */
const getName = (record) => `${record.name}_${record.index}`;
exports.getName = getName;
/** Commiting a record increases it's index, ready reuse */
const commitRecord = (record) => record.index++;
exports.commitRecord = commitRecord;
