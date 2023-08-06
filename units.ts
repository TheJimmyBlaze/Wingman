import { Profession } from './professions';

export enum UnitId {
    Basic = 'basic',
    DrillMkI = 'drill_mki',
    CarrierMkI = 'carrier_mki'
}

export interface Unit {
    id: UnitId;
    attributes: BodyPartConstant[];
    profession: Profession;
};

const units = new Map<UnitId, Unit>([
    [UnitId.Basic, {
        id: UnitId.Basic,
        attributes: [MOVE, CARRY, WORK],
        profession: Profession.Basic
    }],
    [UnitId.DrillMkI, {
        id: UnitId.DrillMkI,
        attributes: [MOVE, WORK, WORK],
        profession: Profession.Harvester
    }],
    [UnitId.CarrierMkI, {
        id: UnitId.CarrierMkI,
        attributes: [MOVE, CARRY, CARRY],
        profession: Profession.Logistics
    }]
]);

export const getUnit = (id: UnitId): Unit | undefined => units.get(id);