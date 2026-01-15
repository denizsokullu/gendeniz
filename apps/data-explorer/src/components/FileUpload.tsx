import { useCallback, useState, type DragEvent, type ChangeEvent } from 'react';
import { Card, CardBody } from '@gendeniz/ui';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  accept?: string;
}

export function FileUpload({ onFileSelect, isLoading, accept = '.csv,.json' }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return (
    <Card>
      <CardBody>
        <div
          className={`rounded-lg border-2 border-dashed p-12 text-center transition-colors ${isDragging ? 'border-primary-500 bg-primary-500/10' : 'border-border'} ${isLoading ? 'pointer-events-none opacity-50' : ''} `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <svg
              className="h-12 w-12 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="text-lg font-medium text-text-secondary">
                {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
              </p>
              <p className="mt-1 text-sm text-text-muted">or click to browse</p>
            </div>
            <input
              type="file"
              accept={accept}
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
              disabled={isLoading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="inline-flex items-center justify-center rounded-lg border-2 border-primary-500 px-4 py-2 text-base font-medium text-primary-500 transition-colors hover:bg-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-background">
                {isLoading ? 'Processing...' : 'Select File'}
              </span>
            </label>
            <p className="text-xs text-text-muted">Supported formats: CSV, JSON</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
