interface CompareOutputPanelProps {
  apiId: string;
  apiName: string;
  output: any;
  latency: number;
  error?: string;
  loading?: boolean;
}

export default function CompareOutputPanel({
  apiId,
  apiName,
  output,
  latency,
  error,
  loading = false,
}: CompareOutputPanelProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-900/50">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white mb-1">{apiName}</h3>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>ID: {apiId}</span>
          <span>Latency: {latency}ms</span>
        </div>
      </div>

      <div className="bg-black rounded p-4 min-h-[200px] max-h-[300px] overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400">Running...</span>
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm">{error}</div>
        ) : output ? (
          <pre className="text-cyan-400 text-sm font-mono whitespace-pre-wrap break-words">
            {typeof output === 'string' ? output : JSON.stringify(output, null, 2)}
          </pre>
        ) : (
          <div className="text-gray-400 text-sm">No output yet. Run a comparison to see results.</div>
        )}
      </div>
    </div>
  );
}

