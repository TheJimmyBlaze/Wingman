
import { Chronicle } from "./chronicle";
import { Barracks } from "./barracks";
import { UnitId } from './units';
import { Profession } from "./professions";

export interface WingMemory extends Memory {
    chronicle: Chronicle;
    barracks: Barracks;
}

export enum Objective {
    Consume = 'consume',
    Collect = 'collect'
}

export interface WingCreepMemory extends CreepMemory {
    unitId: UnitId;
    profession: Profession;
    objective: Objective;
}

export const wingMem = Memory as WingMemory;