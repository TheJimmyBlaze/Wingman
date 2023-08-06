
import * as barracks from './barracks';
import { purge } from './chronicle';
import { UnitId } from './units';

const wingman = () => {

    if (barracks.barracks.queue.length === 0) {
        barracks.enlist(UnitId.Basic);
        barracks.enlist(UnitId.DrillMkI);
        barracks.enlist(UnitId.CarrierMkI);
    }

    barracks.operate();
}

declare const module: any;
module.exports.loop = wingman();