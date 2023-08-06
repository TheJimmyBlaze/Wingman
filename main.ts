
import { getName, purge } from "./chronicle";
import { UnitId, getUnit } from "./units";

const wingman = () => {

    const unit = getUnit(UnitId.CarrierMkI);
    console.log(JSON.stringify(unit));
}

declare const module: any;
module.exports.loop = wingman();