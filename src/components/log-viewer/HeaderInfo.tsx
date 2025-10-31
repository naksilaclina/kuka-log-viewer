import React from 'react';
import { LogFileHeader } from '@/utils/logParser';

interface HeaderInfoProps {
  header: LogFileHeader;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ header }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-gray-100">Log File Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center p-3 bg-gray-700 rounded">
          <span className="font-medium w-32 text-gray-300">Computer:</span> 
          <span className="ml-2 text-gray-100">{header.computerName || 'N/A'}</span>
        </div>
        <div className="flex items-center p-3 bg-gray-700 rounded">
          <span className="font-medium w-32 text-gray-300">Export Time:</span> 
          <span className="ml-2 text-gray-100">{header.exportTime || 'N/A'}</span>
        </div>
        <div className="flex items-center p-3 bg-gray-700 rounded">
          <span className="font-medium w-32 text-gray-300">Filter:</span> 
          <span className="ml-2 text-gray-100">{header.filter || 'N/A'}</span>
        </div>
        <div className="flex items-center p-3 bg-gray-700 rounded">
          <span className="font-medium w-32 text-gray-300">Total Entries:</span> 
          <span className="ml-2 text-gray-100">{header.totalEntries || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderInfo;