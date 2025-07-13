import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPumpById } from '../../services/pumpService';
import type { Pump } from './types';
import mapImage from '../../../public/map.jpg';
import chartImage from '../../../public/chart.jpg';

const PumpDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pump, setPump] = useState<Pump | null>(null);

  useEffect(() => {
    if (id) {
      getPumpById(Number(id)).then(setPump).catch(console.error);
    }
  }, [id]);

  if (!pump) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-6"
      >
        ← Back to Pumps
      </button>

      <div className="flex items-start justify-between mb-8">
        <h1 className="text-3xl font-bold">{pump.name}</h1>
        <div className="text-sm text-gray-500 space-y-1 text-right">
          <div>
            <span className="font-semibold">Pump ID:</span> {pump.id}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {pump.status}
          </div>
          <div>
            <span className="font-semibold">Last Updated:</span>{' '}
            {pump.lastUpdated || '—'}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Attributes</h2>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
          <div>
            <strong>Type:</strong> {pump.type}
          </div>
          <div>
            <strong>Area/Block:</strong> {pump.areaBlock}
          </div>
          <div>
            <strong>Location (lat/lon):</strong> {pump.latitude}°,{' '}
            {pump.longitude}°
          </div>
          <div>
            <strong>Flow Rate:</strong> {pump.flowRate} GPM
          </div>
          <div>
            <strong>Offset:</strong> {pump.offsetValue} {pump.offsetUnit}
          </div>
          <div>
            <strong>Pressure (Current | Min | Max):</strong>{' '}
            {pump.pressureCurrent} | {pump.pressureMin} | {pump.pressureMax} psi
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Map</h2>
        <img
          src={mapImage}
          alt="Pump Location Map"
          className="w-full h-auto rounded shadow"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-4">Pressure Over Time</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <div>
            <strong>Pressure (PSI):</strong> {pump.pressureCurrent}
          </div>
          <div className="text-green-600">Last 24 Hours +5%</div>
        </div>
        <img
          src={chartImage}
          alt="Pressure Over Time Chart"
          className="w-full h-auto rounded shadow"
        />
      </div>
    </div>
  );
};

export default PumpDetailPage;
