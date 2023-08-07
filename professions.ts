
import { WingCreep } from "./barracks";
import { Objective } from "./memory";

export enum Profession {
    Basic = 'basic',
    Harvester = 'harvester',
    Logistics = 'logistics'
};

/** Perform a Creep's role */
export const performProfession = (creep: WingCreep) => {

    switch (creep.memory.profession) {
        case Profession.Basic:
            doBasic(creep);
            break;
        default:
            console.log(`${creep.name}'s profession (${creep.memory.profession}) does not have an implementation`);
            break;
    }
}

//** Basic does a little bit of everything, badly */
const doBasic = (creep: WingCreep) => {

    //If inventory is fill, consume stuff. If it's empty, collect stuff
    let objective = creep.memory.objective || (creep.memory.objective = Objective.Consume);
    if (objective === Objective.Consume && creep.store[RESOURCE_ENERGY] === 0) {
        objective = Objective.Collect;
    } else if (objective === Objective.Collect && creep.store.getFreeCapacity() === 0) {
        objective = Objective.Consume;
    }
    creep.memory.objective = objective;

    //If inventory is empty, go mine something
    if (objective === Objective.Collect) {

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
        filter: structure =>(
            structure.structureType === STRUCTURE_TOWER &&
            (structure as StructureTower).store.getFreeCapacity(RESOURCE_ENERGY)
        )
    });
    if (tower) {
        
        if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(tower);
        }

        return;
    }

    //Find the nearest spawn or extension and add energy to it
    const capacitor = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: structure => (
            (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION) &&
            (structure as StructureExtension | StructureSpawn).store.getFreeCapacity(RESOURCE_ENERGY)
        )
    });
    if (capacitor) {

        if (creep.transfer(capacitor, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(capacitor);
        }

        return;
    }

    //Move the energy to the controller
    const controller = creep.room.controller!;  //A basic creep should never be in a room without a controller
    if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller);
    }
}