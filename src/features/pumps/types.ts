export type PumpType =
  | 'Centrifugal'
  | 'Submersible'
  | 'Diaphragm'
  | 'Rotary'
  | 'Peristaltic';

export type OffsetUnit = 'sec' | 'ft';

export type PumpStatus =
  | 'Operational'
  | 'Idle'
  | 'Stopped'
  | 'Fault'
  | 'Maintenance';

export type AreaBlock =
  | 'Area A'
  | 'Area B'
  | 'Area C'
  | 'Area D'
  | 'Area E'
  | 'Area F'
  | 'Area G'
  | 'Area H'
  | 'Area I'
  | 'Area J';

export interface Pump {
  id: number;
  name: string;
  type: PumpType;
  areaBlock: AreaBlock;
  latitude: number;
  longitude: number;
  flowRate: number; // GPM
  offsetValue: number;
  offsetUnit: OffsetUnit;
  pressureCurrent: number;
  pressureMin: number;
  pressureMax: number;
  status: PumpStatus;
  lastUpdated: string;
}

export type NewPump = Omit<Pump, 'id' | 'lastUpdated'>;
