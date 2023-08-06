import { wingMem } from './memory';

export interface Chronicle {
    records: NameRecord[];
}

export interface NameRecord {
    name: string;
    index: number;
}

const DEFAULT_CHRONICLE = {
    records: []
}

export const chronicle = wingMem.chronicle || (wingMem.chronicle = DEFAULT_CHRONICLE);

/** Resets chroncile records to the default value of an empty array. */
export const purge = () => chronicle.records = DEFAULT_CHRONICLE.records;

/** Safely returns the next index of a named record. Returns 1 if the record has never previously existed. */
export const getIndex = (name: string): number => {

    //Get next record or create a new one if it does not exist
    let record = chronicle.records.find(record => record.name === name);
    if (record == null) {
        record = {
            name: name,
            index: 0
        };
        chronicle.records.push(record);
    }

    //Increment and return
    record.index ++;
    return record.index;
}

/** Safely returns the next available indexed name of a record. */
export const getName = (name: string): string => {

    const index = getIndex(name);
    return `${name}${index}`;
}