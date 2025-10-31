import React from 'react';
import { LogEntry } from '@/utils/logParser';
import LogTableRow from './LogTableRow';

interface LogTableProps {
  entries: LogEntry[];
}

const LogTable: React.FC<LogTableProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
        <p className="text-gray-400">No log entries found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-750">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Entry</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Timestamp</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Module</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {entries.map((entry) => (
            <LogTableRow key={entry.entryNumber} entry={entry} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;