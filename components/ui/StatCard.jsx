import React from 'react';

export const StatCard = ({ value, label }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-lg">{label}</p>
    </div>
  );
};
