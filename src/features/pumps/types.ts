export interface Pump {
  id: string;
  name: string;
  type: string; // Rotary / Centrifugal / Other
  status: 'Active' | 'Inactive';
  lat: string;
  lon: string;
  flowRate: string; // e.g. "1200"
  minPressure: number;
  maxPressure: number;
  currentPressure: number;
}
