import type { Pump } from '../features/pumps/types';

export const mockPumps: Pump[] = [
  {
    id: '1',
    name: 'Pump Alpha',
    type: 'Rotary',
    status: 'Active',
    lat: '34.0522',
    lon: '-118.2437',
    flowRate: '1200',
    minPressure: 100,
    maxPressure: 200,
    currentPressure: 130,
  },
  {
    id: '2',
    name: 'Pump Beta',
    type: 'Centrifugal',
    status: 'Inactive',
    lat: '35.0000',
    lon: '-120.0000',
    flowRate: '980',
    minPressure: 90,
    maxPressure: 180,
    currentPressure: 95,
  },
];
