import { useState, useEffect } from 'react';
import {
  getAllPumps,
  createPump,
  deletePump,
  updatePump,
} from '../../services/pumpService';
import type { Pump, NewPump } from './types';
import { Filter, Pencil, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import SearchBar from '../../components/SearchBar';
import type { PumpQuery } from '../../services/pumpService';
import { Link } from 'react-router-dom';

const emptyPump: NewPump = {
  name: '',
  type: 'Centrifugal',
  areaBlock: 'Area A',
  latitude: 0,
  longitude: 0,
  flowRate: 0,
  offsetValue: 0,
  offsetUnit: 'sec',
  pressureCurrent: 0,
  pressureMin: 0,
  pressureMax: 0,
  status: 'Operational',
};

const PumpsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPump, setNewPump] = useState<NewPump>(emptyPump);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<PumpQuery>({
    name: '',
    type: '',
    status: '',
    areaBlock: '',
  });

  const fetchPumps = async (query: PumpQuery = {}) => {
    try {
      const res = await getAllPumps(query);
      setPumps(res);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(true);
      console.error('Error fetching pumps:', e);
    }
  };

  useEffect(() => {
    fetchPumps();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchPumps(filters);
    }, 300);
    return () => clearTimeout(delay);
  }, [filters.name, filters.type, filters.status, filters.areaBlock]);

  const handleNewPumpChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewPump({
      ...newPump,
      [name]: [
        'latitude',
        'longitude',
        'flowRate',
        'offsetValue',
        'pressureCurrent',
        'pressureMin',
        'pressureMax',
      ].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSaveNewPump = async () => {
    try {
      if (editingId !== null) {
        const updated = {
          ...newPump,
          id: editingId,
          lastUpdated: new Date().toISOString(),
        };
        await updatePump(editingId, updated);
        setPumps((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        const created = await createPump(newPump);
        setPumps((prev) => [...prev, created]);
      }

      fetchPumps();
      setShowModal(false);
      setNewPump(emptyPump);
      setEditingId(null);
      setSelectedId(null);
    } catch (error) {
      console.error('Error saving pump:', error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedId !== null) {
      try {
        const created = await deletePump(selectedId);
        setPumps((prev) => [...prev, created]);
        setShowModal(false);
        setNewPump(emptyPump);
        fetchPumps();
      } catch (error) {
        console.error('Error creating pump:', error);
      }
      setSelectedId(null);
    }
  };

  if (isLoading || !pumps) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between w-full mb-4">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl font-bold">Pumps</h1>
          <div className="flex gap-0 text-gray-600">
            <SearchBar
              searchTerm={filters.name || ''}
              onChange={(val) => setFilters((prev) => ({ ...prev, name: val }))}
              onClear={() => setFilters((prev) => ({ ...prev, name: '' }))}
            />

            <button
              className="px-4 py-2 rounded text-sm flex items-center gap-1"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Filter className="w-5 h-5" />
            </button>
            {showFilters && (
              <div className="flex gap-4 mt-2">
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      type: e.target.value || undefined,
                    }))
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="">All Types</option>
                  {[
                    'Centrifugal',
                    'Submersible',
                    'Diaphragm',
                    'Rotary',
                    'Peristaltic',
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.value || undefined,
                    }))
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="">All Statuses</option>
                  {[
                    'Operational',
                    'Idle',
                    'Stopped',
                    'Fault',
                    'Maintenance',
                  ].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.areaBlock}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      areaBlock: e.target.value || undefined,
                    }))
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="">All Areas</option>
                  {[
                    'Area A',
                    'Area B',
                    'Area C',
                    'Area D',
                    'Area E',
                    'Area F',
                    'Area G',
                    'Area H',
                    'Area I',
                    'Area J',
                  ].map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <button
                  className="text-sm text-blue-500 underline"
                  onClick={() =>
                    setFilters({
                      name: '',
                      type: '',
                      status: '',
                      areaBlock: '',
                    })
                  }
                >
                  Clear Filters
                </button>
              </div>
            )}

            <button
              className="px-4 py-2 rounded text-sm flex items-center cursor-pointer"
              onClick={() => {
                if (selectedId !== null) {
                  const pumpToEdit = pumps.find((p) => p.id === selectedId);
                  if (pumpToEdit) {
                    setNewPump({ ...pumpToEdit });
                    setEditingId(pumpToEdit.id);
                    setShowModal(true);
                  }
                } else {
                  toast.warn('Please select a pump to edit');
                }
              }}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            className="bg-gray-100 px-4 py-2 rounded text-sm"
            onClick={() => setShowModal(true)}
          >
            New Pump
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm flex items-center gap-1"
            onClick={handleDeleteSelected}
            disabled={selectedId === null}
          >
            <Trash className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      <table className="w-full table-fixed text-sm border-collapse">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2 w-32">Pump Name</th>
            <th className="px-4 py-2 w-32">Type</th>
            <th className="px-4 py-2 w-32">Area/Block</th>
            <th className="px-4 py-2 w-32">Latitude</th>
            <th className="px-4 py-2 w-32">Longitude</th>
            <th className="px-4 py-2 w-32">Flow Rate</th>
            <th className="px-4 py-2 w-32">Offset</th>
            <th className="px-4 py-2 w-32">Current Pressure</th>
            <th className="px-4 py-2 w-32">Min Pressure</th>
            <th className="px-4 py-2 w-32">Max Pressure</th>
          </tr>
        </thead>
        <tbody>
          {pumps.map((pump: Pump) => (
            <tr
              key={pump.id}
              className={`border-t cursor-pointer ${
                selectedId === pump.id ? 'bg-blue-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => {
                setSelectedId((prev) => (prev === pump.id ? null : pump.id));
              }}
            >
              <td className="px-4 py-2 text-blue-600 underline">
                <Link to={`/pumps/${pump.id}`}>{pump.name}</Link>
              </td>
              <td className="px-4 py-2">{pump.type}</td>
              <td className="px-4 py-2">{pump.areaBlock}</td>
              <td className="px-4 py-2">{pump.latitude}</td>
              <td className="px-4 py-2">{pump.longitude}</td>
              <td className="px-4 py-2">{pump.flowRate} GPM</td>
              <td className="px-4 py-2">
                {pump.offsetValue} {pump.offsetUnit}
              </td>
              <td className="px-4 py-2">{pump.pressureCurrent} psi</td>
              <td className="px-4 py-2">{pump.pressureMin} psi</td>
              <td className="px-4 py-2">{pump.pressureMax} psi</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500/50 z-50"
          onClick={() => {
            setShowModal(false);
            setNewPump(emptyPump);
            setEditingId(null);
            setSelectedId(null);
          }}
        >
          <div
            className="bg-white p-8 rounded-xl w-[600px] max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowModal(false);
                setNewPump(emptyPump);
                setEditingId(null);
                setSelectedId(null);
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {editingId !== null ? 'Edit Pump' : 'New Pump'}
              </h2>
              <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                <span>Pump ID</span>
                <span className="font-medium">{'—'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Pump Name
                </label>
                <input
                  className="w-full border rounded px-3 py-2"
                  name="name"
                  value={newPump.name}
                  onChange={handleNewPumpChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Pump Type
                </label>
                <select
                  name="type"
                  value={newPump.type}
                  onChange={handleNewPumpChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {[
                    'Centrifugal',
                    'Submersible',
                    'Diaphragm',
                    'Rotary',
                    'Peristaltic',
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Area</label>
                <select
                  name="areaBlock"
                  value={newPump.areaBlock}
                  onChange={handleNewPumpChange}
                  className="w-full border rounded px-3 py-2"
                >
                  {[
                    'Area A',
                    'Area B',
                    'Area C',
                    'Area D',
                    'Area E',
                    'Area F',
                    'Area G',
                    'Area H',
                    'Area I',
                    'Area J',
                  ].map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={newPump.latitude}
                  onChange={handleNewPumpChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={newPump.longitude}
                  onChange={handleNewPumpChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Offset</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="offsetValue"
                    value={newPump.offsetValue}
                    onChange={handleNewPumpChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <select
                    name="offsetUnit"
                    value={newPump.offsetUnit}
                    onChange={handleNewPumpChange}
                    className="w-28 border rounded px-3 py-2"
                  >
                    <option value="sec">sec</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Pressure Min / Max
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    name="pressureMin"
                    value={newPump.pressureMin}
                    onChange={handleNewPumpChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <span className="text-sm text-gray-600">psi</span>
                  <input
                    type="number"
                    name="pressureMax"
                    value={newPump.pressureMax}
                    onChange={handleNewPumpChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <span className="text-sm text-gray-600">psi</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => {
                  setShowModal(false);
                  setNewPump(emptyPump);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSaveNewPump}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PumpsPage;
