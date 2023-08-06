
import { getRecord, commitRecord, getName } from './chronicle';
import { wingMem } from './memory';
import { WingCreepMemory } from './memory';
import { UnitId, getUnit } from './units';

export interface Barracks {
    queue: UnitId[];
}

const DEFAULT_BARRACKS = {
    queue: []
}

export const barracks = wingMem.barracks || (wingMem.barracks = DEFAULT_BARRACKS);

//** Resets the barracks queue to the default value of an empty array */
export const purge = () => barracks.queue = DEFAULT_BARRACKS.queue;

//** Adds a new creep of a given unit type ot the queue and returns where the creep is positioned in the queue */
export const enlist = (unitId: UnitId): number => {

    barracks.queue.push(unitId);
    return barracks.queue.length -1;
}

//** Perform the work of the barracks */
export const operate = () => {

    emergencyEnlist();
    spawn();
}

/** If there are no creeps left, and there are no enlistments queued, enlist a basic creep */
const emergencyEnlist = () => {
    
    if (
        getCreeps().length === 0 &&
        barracks.queue.length === 0
    ) {
        enlist(UnitId.Basic);
    }
}

/** Perform enlistments */
const spawn = () => {
    
    if (!barracks.queue.length) {
        return;
    }

    //TODO: expand the logic to work on more than just the origin spawn
    const spawn = Game.spawns['Origin'];
    if (!spawn) {
        return;
    }

    //Get unit info
    const unitId = barracks.queue[0];
    const unit = getUnit(unitId);

    //Get name info
    const record = getRecord(unit.id);
    const name = getName(record);

    //Attempt spawn
    const spawnResult = spawn.spawnCreep(unit.attributes, name, {
        memory: {
            id: unitId,
            profession: unit.profession 
        }
    });

    //If spawn successful, commit name and remove enlistment from queue
    if (spawnResult === OK) {
        barracks.queue.shift();
        commitRecord(record);
    }
}

export interface WingCreep extends Creep {
    memory: WingCreepMemory;
}

//** Gets all game creeps in the original format converted to the Wingman type */
export const getCreepMap = (): { [creepName: string]: WingCreep } => Game.creeps as { [creepName: string]: WingCreep };

//** Gets an array of all creeps */
export const getCreeps = (): WingCreep[] => Object.values(getCreepMap());