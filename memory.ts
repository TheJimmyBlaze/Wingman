
import { Chronicle } from "./chronicle";
import { Barracks } from "./barracks";
import { UnitId } from './units';
import { Profession } from "./professions";

interface WingMemory extends Memory {
    chronicle: Chronicle;
    barracks: Barracks;
}

export interface WingCreepMemory extends CreepMemory {
    unitId: UnitId;
    profession: Profession;
}

export const wingMem = Memory as WingMemory;