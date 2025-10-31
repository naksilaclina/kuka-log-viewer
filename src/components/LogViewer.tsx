'use client';

import React, { useEffect, useState } from 'react';
import { LogEntry, LogFileHeader } from '../utils/logParser';

const LogViewer = () => {
  const [header, setHeader] = useState<LogFileHeader | null>(null);
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLogFile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/logs');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch log data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        setHeader(data.header);
        setEntries(data.entries);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load log data';
        setError(errorMessage);
        console.error('Error loading log data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLogFile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-xl text-gray-200">Loading log data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Kuka Log Viewer</h1>
      
      {header && (
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
      )}

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-100">Log Entries</h2>
        <div className="flex items-center">
          <span className="bg-blue-900 text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
            {entries.length} entries
          </span>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-gray-400">No log entries found.</p>
        </div>
      ) : (
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
                <tr key={entry.entryNumber} className="hover:bg-gray-750">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.entryNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.severity === 'Error' ? 'bg-red-900 text-red-200' :
                      entry.severity === 'Warning' ? 'bg-yellow-900 text-yellow-200' :
                      'bg-green-900 text-green-200'
                    }`}>
                      {entry.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200 max-w-md">{entry.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{entry.module}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogViewer;