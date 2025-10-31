import React from 'react';
import { LogEntry } from '@/utils/logParser';

interface LogTableRowProps {
  entry: LogEntry;
}

const LogTableRow: React.FC<LogTableRowProps> = ({ entry }) => {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Error':
        return 'bg-red-900 text-red-200';
      case 'Warning':
        return 'bg-yellow-900 text-yellow-200';
      default:
        return 'bg-green-900 text-green-200';
    }
  };

  return (
    <tr className="hover:bg-gray-750">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.entryNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.timestamp}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityClass(entry.severity)}`}>
          {entry.severity}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-200 max-w-md">{entry.message}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.module}</td>
    </tr>
  );
};

export default LogTableRow;