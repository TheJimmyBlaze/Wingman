"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreeps = exports.getCreepMap = exports.operate = exports.enlist = exports.purge = exports.barracks = void 0;
const chronicle_1 = require("./chronicle");
const memory_1 = require("./memory");
const units_1 = require("./units");
const DEFAULT_BARRACKS = {
    queue: []
};
exports.barracks = memory_1.wingMem.barracks || (memory_1.wingMem.barracks = DEFAULT_BARRACKS);
//** Resets the barracks queue to the default value of an empty array */
const purge = () => exports.barracks.queue = DEFAULT_BARRACKS.queue;
exports.purge = purge;
//** Adds a new creep of a given unit type ot the queue and returns where the creep is positioned in the queue */
const enlist = (unitId) => {
    exports.barracks.queue.push(unitId);
    return exports.barracks.queue.length - 1;
};
exports.enlist = enlist;
//** Perform the work of the barracks */
const operate = () => {
    emergencyEnlist();
    spawn();
};
exports.operate = operate;
/** If there are no creeps left, and there are no enlistments queued, enlist a basic creep */
const emergencyEnlist = () => {
    if ((0, exports.getCreeps)().length === 0 &&
        exports.barracks.queue.length === 0) {
        (0, exports.enlist)(units_1.UnitId.Basic);
        (0, exports.enlist)(units_1.UnitId.Basic);
        (0, exports.enlist)(units_1.UnitId.Basic);
    }
};
/** Perform enlistments */
const spawn = () => {
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
//** Gets all game creeps in the original format converted to the Wingman type */
const getCreepMap = () => Game.creeps;
exports.getCreepMap = getCreepMap;
//** Gets an array of all creeps */
const getCreeps = () => Object.values((0, exports.getCreepMap)());
exports.getCreeps = getCreeps;
