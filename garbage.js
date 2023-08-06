"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanMemory = void 0;
const memory_1 = require("./memory");
const cleanMemory = () => {
    const mem = memory_1.wingMem;
    cleanCreeps(mem);
};
exports.cleanMemory = cleanMemory;
const cleanCreeps = (mem) => {
    for (const name in mem.creeps) {
        if (!Game.creeps[name]) {
            delete mem.creeps[name];
        }
    }
};
