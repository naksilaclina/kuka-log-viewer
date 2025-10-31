export interface LogEntry {
  entryNumber: number;
  category: string;
  severity: string;
  timestamp: string;
  message: string;
  module: string;
  messageNumber: number;
}

export interface LogFileHeader {
  computerName: string;
  exportTime: string;
  filter: string;
  totalEntries: number;
}

export function parseLogFile(content: string): { header: LogFileHeader; entries: LogEntry[] } {
  // Clean up the content by removing null bytes and other problematic characters
  const cleanContent = content.replace(/\0/g, '').trim();
  const lines = cleanContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Parse header information
  const header: LogFileHeader = {
    computerName: '',
    exportTime: '',
    filter: '',
    totalEntries: 0
  };
  
  let i = 0;
  // Skip the first line (title)
  i++;
  
  // Parse header lines
  while (i < lines.length && !lines[i].startsWith('Entry')) {
    const line = lines[i];
    if (line.startsWith('Computer name:')) {
      header.computerName = line.substring('Computer name:'.length).trim();
    } else if (line.startsWith('Time:')) {
      header.exportTime = line.substring('Time:'.length).trim();
    } else if (line.startsWith('Filter:')) {
      header.filter = line.substring('Filter:'.length).trim();
    } else if (line.endsWith('Entries')) {
      const entriesStr = line.split(' ')[0];
      header.totalEntries = parseInt(entriesStr, 10) || 0;
    }
    i++;
  }
  
  // Parse entries
  const entries: LogEntry[] = [];
  
  while (i < lines.length) {
    if (lines[i].startsWith('Entry')) {
      const entryLine = lines[i];
      const entryMatch = entryLine.match(/Entry (\d+) \(([^,]+), ([^)]+)\)/);
      
      if (entryMatch) {
        const entry: LogEntry = {
          entryNumber: parseInt(entryMatch[1], 10),
          category: entryMatch[2],
          severity: entryMatch[3],
          timestamp: '',
          message: '',
          module: '',
          messageNumber: 0
        };
        
        i++;
        
        // Parse timestamp
        if (i < lines.length) {
          entry.timestamp = lines[i];
          i++;
        }
        
        // Parse message
        if (i < lines.length) {
          entry.message = lines[i];
          i++;
        }
        
        // Parse module and message number
        if (i < lines.length) {
          const moduleLine = lines[i];
          const moduleMatch = moduleLine.match(/Module: ([^ ]+)   Message number: (\d+)/);
          if (moduleMatch) {
            entry.module = moduleMatch[1];
            entry.messageNumber = parseInt(moduleMatch[2], 10) || 0;
          }
          i++;
        }
        
        entries.push(entry);
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  
  return { header, entries };
}