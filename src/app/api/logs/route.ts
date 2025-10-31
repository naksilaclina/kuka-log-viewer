import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parseLogFile } from '@/utils/logParser';

export async function GET() {
  try {
    // Read the log file from the public directory
    const logFilePath = path.join(process.cwd(), 'public', 'data', 'logs', 'Logbuch.txt');
    const fileContent = await fs.readFile(logFilePath, 'utf8');
    
    // Parse the log file
    const parsedData = parseLogFile(fileContent);
    
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error reading or parsing log file:', error);
    return NextResponse.json({ error: 'Failed to read or parse log file' }, { status: 500 });
  }
}