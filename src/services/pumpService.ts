import { mockPumps } from '../mock/pumps';
import type { Pump } from '../features/pumps/types';

export async function fetchPumps(): Promise<{ data: Pump[] }> {
  return Promise.resolve({ data: mockPumps });
  // return axois.get('/api/pumps');
}
