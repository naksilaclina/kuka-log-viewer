'use client';

import React, { useEffect, useState } from 'react';
import { LogEntry, LogFileHeader } from '@/utils/logParser';
import HeaderInfo from './HeaderInfo';
import EntryCounter from './EntryCounter';
import LogTable from './LogTable';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Kuka Log Viewer</h1>
      
      {header && <HeaderInfo header={header} />}

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-100">Log Entries</h2>
        <EntryCounter count={entries.length} />
      </div>

      <LogTable entries={entries} />
    </div>
  );
};

export default LogViewer;