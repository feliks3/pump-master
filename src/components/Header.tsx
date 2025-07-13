import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <div>
      <li className="flex flex-row">
        <ul className="p-4">
          <Sparkles />
        </ul>
        <ul className="p-4">PumpMaster</ul>
        <ul className="p-4">Dashboard</ul>
        <ul className="p-4">Pumps</ul>
        <ul className="p-4">Reports</ul>
        <ul className="p-4">Alerts</ul>
        <ul className="p-4">search bar</ul>
        <ul className="p-4">notification bell</ul>
        <ul className="p-4">user avatar</ul>
      </li>
    </div>
  );
}
