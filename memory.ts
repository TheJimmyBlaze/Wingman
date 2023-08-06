import { Chronicle } from "./chronicle";
import { Barracks } from "./barracks";

interface WingMemory extends Memory {
    chronicle: Chronicle;
    barracks: Barracks;
}

export const wingMem = Memory as WingMemory;