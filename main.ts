
import { getName, purge } from "./chronicle";

const wingman = () => {

    console.log(getName("builder"));
};

declare const module: any;
module.exports.loop = wingman();