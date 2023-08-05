import { Chronicle } from "./chronicle";

interface WingMemory extends Memory {
    chronicle: Chronicle;
};

export const wingMem = Memory as WingMemory;