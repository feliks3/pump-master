import { useState, useEffect } from 'react';
import { fetchPumps } from '../../services/pumpService';
import type { Pump } from './types';

const PumpsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pumps, setPumps] = useState<Pump[]>([]);
  console.log('pump page');
  useEffect(() => {
    fetchPumps()
      .then((res) => {
        setIsLoading(false);
        setPumps(res.data);
        console.log('then', res);
      })
      .catch((e) => {
        setIsLoading(true);
        console.log(`unknown error:${e}`);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {pumps.map((pump) => {
        return (
          <li key={pump.id}>
            <div>{pump.id}</div>
            <div>{pump.name}</div>
            <div>{pump.type}</div>
            <div>{pump.status}</div>
            <div>{pump.lat}</div>
            <div>{pump.lon}</div>
            <div>{pump.flowRate}</div>
            <div>{pump.minPressure}</div>
            <div>{pump.maxPressure}</div>
            <div>{pump.currentPressure}</div>
          </li>
        );
      })}
    </>
  );
};

export default PumpsPage;
