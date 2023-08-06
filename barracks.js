"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreeps = exports.operate = exports.enlist = exports.barracks = void 0;
const chronicle_1 = require("./chronicle");
const memory_1 = require("./memory");
const units_1 = require("./units");
const DEFAULT_BARRACKS = {
    queue: []
};
exports.barracks = memory_1.wingMem.barracks || (memory_1.wingMem.barracks = DEFAULT_BARRACKS);
//** Adds a new creep of a given unit type ot the queue and returns where the creep is positioned in the queue */
const enlist = (unitId) => {
    exports.barracks.queue.push(unitId);
    return exports.barracks.queue.length - 1;
};
exports.enlist = enlist;
//** Perform the work of the barracks */
const operate = () => {
    if (!exports.barracks.queue.length) {
        return;
    }
    //TODO: expand the logic to work on more than just the origin spawn
    const spawn = Game.spawns['Origin'];
    if (!spawn) {
        return;
    }
    //Get unit info
    const unitId = exports.barracks.queue[0];
    const unit = (0, units_1.getUnit)(unitId);
    //Get name info
    const record = (0, chronicle_1.getRecord)(unit.id);
    const name = (0, chronicle_1.getName)(record);
    //Attempt spawn
    const spawnResult = spawn.spawnCreep(unit.attributes, name, {
        memory: {
            id: unitId,
            profession: unit.profession
        }
    });
    //If spawn successful, commit name and remove enlistment from queue
    if (spawnResult === OK) {
        exports.barracks.queue.shift();
        (0, chronicle_1.commitRecord)(record);
    }
};
exports.operate = operate;
//** Gets all game creeps converted to the Wingman format */
const getCreeps = () => Game.creeps;
exports.getCreeps = getCreeps;
