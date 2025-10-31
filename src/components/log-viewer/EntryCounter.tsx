import React from 'react';

interface EntryCounterProps {
  count: number;
}

const EntryCounter: React.FC<EntryCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center">
      <span className="bg-blue-900 text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
        {count} entries
      </span>
    </div>
  );
};

export default EntryCounter;