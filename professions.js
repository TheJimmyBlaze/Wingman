"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performProfession = exports.Profession = void 0;
const memory_1 = require("./memory");
var Profession;
(function (Profession) {
    Profession["Basic"] = "basic";
    Profession["Harvester"] = "harvester";
    Profession["Logistics"] = "logistics";
})(Profession || (exports.Profession = Profession = {}));
;
/** Perform a Creep's role */
const performProfession = (creep) => {
    switch (creep.memory.profession) {
        case Profession.Basic:
            doBasic(creep);
            break;
        default:
            console.log(`${creep.name}'s profession (${creep.memory.profession}) does not have an implementation`);
            break;
    }
};
exports.performProfession = performProfession;
//** Basic does a little bit of everything, badly */
const doBasic = (creep) => {
    //If inventory is fill, consume stuff. If it's empty, collect stuff
    let objective = creep.memory.objective || (creep.memory.objective = memory_1.Objective.Consume);
    if (objective === memory_1.Objective.Consume && creep.store[RESOURCE_ENERGY] === 0) {
        objective = memory_1.Objective.Collect;
    }
    else if (objective === memory_1.Objective.Collect && creep.store.getFreeCapacity() === 0) {
        objective = memory_1.Objective.Consume;
    }
    creep.memory.objective = objective;
    //If inventory is empty, go mine something
    if (objective === memory_1.Objective.Collect) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (!source) {
            console.log(`${creep.name} can't find anything to mine`);
            return;
        }
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        return;
    }
    //If theres something to build, do that first
    const construction = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (construction) {
        if (creep.build(construction) === ERR_NOT_IN_RANGE) {
            creep.moveTo(construction);
        }
        return;
    }
    //Find the nearest tower and power it
    const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => (structure.structureType === STRUCTURE_TOWER &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY))
    });
    if (tower) {
        if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(tower);
        }
        return;
    }
    //Find the nearest spawn or extension and add energy to it
    const capacitor = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => ((structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY))
    });
    if (capacitor) {
        if (creep.transfer(capacitor, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(capacitor);
        }
        return;
    }
    //Move the energy to the controller
    const controller = creep.room.controller; //A basic creep should never be in a room without a controller
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
    }
};
