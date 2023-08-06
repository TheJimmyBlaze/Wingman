
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

//** Adds a new creep of a given unit type ot the queue and returns where the creep is positioned in the queue */
export const enlist = (unitId: UnitId): number => {

    barracks.queue.push(unitId);
    return barracks.queue.length -1;
}

//** Perform the work of the barracks */
export const operate = () => {

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

//** Gets all game creeps converted to the Wingman format */
export const getCreeps = (): { [creepName: string]: WingCreep } => Game.creeps as { [creepName: string]: WingCreep };