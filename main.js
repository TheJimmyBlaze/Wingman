"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const units_1 = require("./units");
const wingman = () => {
    const unit = (0, units_1.getUnit)(units_1.UnitId.CarrierMkI);
    console.log(JSON.stringify(unit));
};
module.exports.loop = wingman();
