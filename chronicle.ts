
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

/** Resets chroncile records to the default value of an empty array */
export const purge = () => chronicle.records = DEFAULT_CHRONICLE.records;

/** Safely returns a named record.*/
export const getRecord = (name: string): NameRecord => {

    //Get next record or create a new one if it does not exist
    let record = chronicle.records.find(record => record.name === name);
    if (record == null) {
        record = {
            name: name,
            index: 1
        };
        chronicle.records.push(record);
    }
    
    return record;
}

/** Formats a NameRecord as a name */
export const getName = (record: NameRecord): string => `${record.name}_${record.index}`;

/** Commiting a record increases it's index, ready reuse */
export const commitRecord = (record: NameRecord) => record.index++;