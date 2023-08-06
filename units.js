"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnit = exports.UnitId = void 0;
const professions_1 = require("./professions");
var UnitId;
(function (UnitId) {
    UnitId["Basic"] = "basic";
    UnitId["DrillMkI"] = "drill_mki";
    UnitId["CarrierMkI"] = "carrier_mki";
})(UnitId || (exports.UnitId = UnitId = {}));
;
const units = new Map([
    [UnitId.Basic, {
            id: UnitId.Basic,
            attributes: [MOVE, CARRY, WORK],
            profession: professions_1.Profession.Basic
        }],
    [UnitId.DrillMkI, {
            id: UnitId.DrillMkI,
            attributes: [MOVE, WORK, WORK],
            profession: professions_1.Profession.Harvester
        }],
    [UnitId.CarrierMkI, {
            id: UnitId.CarrierMkI,
            attributes: [MOVE, CARRY, CARRY],
            profession: professions_1.Profession.Logistics
        }]
]);
/** Safely gets a unit by unitId */
const getUnit = (id) => units.get(id);
exports.getUnit = getUnit;
