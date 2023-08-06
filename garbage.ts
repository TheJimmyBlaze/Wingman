import { WingMemory, wingMem } from "./memory";

export const cleanMemory = () => {

    const mem = wingMem;

    cleanCreeps(mem);
};

const cleanCreeps = (mem: WingMemory) => {
    
    for (const name in mem.creeps) {
        if (!Game.creeps[name]) {
            delete mem.creeps[name];
        }
    }
}