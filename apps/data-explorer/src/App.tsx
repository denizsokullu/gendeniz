import { Button, Input, Card, CardBody, Badge } from '@gendeniz/ui';
import { useDataExplorer } from './hooks/useDataExplorer';
import { FileUpload } from './components/FileUpload';
import { DataTable } from './components/DataTable';
import { DataStats } from './components/DataStats';
import { DataPrompt } from './components/DataPrompt';
import { QueryResult } from './components/QueryResult';

export default function App() {
  const {
    data,
    isLoading,
    loadingProgress,
    error,
    searchTerm,
    sortColumn,
    sortDirection,
    visibleColumns,
    currentPage,
    pageSize,
    filteredData,
    paginatedData,
    totalPages,
    columnStats,
    queryResults,
    isQuerying,
    handleFileUpload,
    loadSampleData,
    handleQuery,
    setSearchTerm,
    toggleSort,
    toggleColumnVisibility,
    setCurrentPage,
    setPageSize,
    resetData,
  } = useDataExplorer();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Data Explorer</h1>
              <p className="text-sm text-text-muted">
                Upload and explore CSV or JSON datasets with AI assistance
              </p>
            </div>
            {data && (
              <Button variant="outline" onClick={resetData}>
                Upload New File
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-error/30 bg-error/10 p-4 text-error">
            {error}
          </div>
        )}

        {!data ? (
          <div className="space-y-6">
            <FileUpload onFileSelect={handleFileUpload} isLoading={isLoading} />

            {/* Sample Data Section */}
            <Card>
              <CardBody>
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-medium text-text-primary">
                    Or try with sample data
                  </h3>
                  <p className="mb-4 text-sm text-text-muted">
                    Load a sample stock market dataset to explore the features
                  </p>
                  <Button onClick={loadSampleData} isLoading={isLoading} variant="primary">
                    {isLoading
                      ? `Loading... ${Math.round(loadingProgress)}%`
                      : 'Load Sample Stock Data'}
                  </Button>
                  {isLoading && (
                    <div className="mt-4 h-2 w-full rounded-full bg-surface-overlay">
                      <div
                        className="h-2 rounded-full bg-primary-500 transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* AI Query Section */}
            <DataPrompt onQuery={handleQuery} isLoading={isQuerying} />

            {/* Query Results */}
            {queryResults.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary">Query Results</h3>
                {queryResults.map((result) => (
                  <QueryResult key={result.id} result={result} />
                ))}
              </div>
            )}

            {/* Stats Panel */}
            <DataStats
              rowCount={data.rowCount}
              columnCount={data.columnCount}
              filteredCount={filteredData.length}
              columnStats={columnStats}
            />

            {/* Controls */}
            <Card>
              <CardBody>
                <div className="flex flex-wrap items-end gap-4">
                  {/* Search */}
                  <div className="min-w-[200px] flex-1">
                    <Input
                      label="Search"
                      placeholder="Search all columns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Page Size */}
                  <div className="w-32">
                    <label className="mb-1 block text-sm font-medium text-text-secondary">
                      Rows per page
                    </label>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(Number(e.target.value))}
                      className="block w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                </div>

                {/* Column Visibility */}
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-text-secondary">
                    Visible Columns
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {data.headers.map((header) => (
                      <Badge
                        key={header}
                        variant={visibleColumns.has(header) ? 'primary' : 'default'}
                        className="cursor-pointer select-none"
                        onClick={() => toggleColumnVisibility(header)}
                      >
                        {header}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Data Table */}
            <DataTable
              headers={data.headers}
              rows={paginatedData}
              visibleColumns={visibleColumns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={toggleSort}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-text-muted">
                  Showing {(currentPage - 1) * pageSize + 1} to{' '}
                  {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}{' '}
                  results
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-3 text-sm text-text-secondary">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
