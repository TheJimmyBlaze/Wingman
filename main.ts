
import * as barracks from './barracks';
import { cleanMemory } from './garbage';
import { performProfession } from './professions';

const wingman = () => {

    barracks.operate();

    const creeps = barracks.getCreeps();
    creeps.forEach(creep => performProfession(creep));

    cleanMemory();
}

declare const module: any;
module.exports.loop = wingman();