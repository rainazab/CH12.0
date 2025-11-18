interface ApiCardProps {
  id: string;
  name: string;
  provider: string;
  uptime: string;
  cost: string;
  description: string;
  icon: string;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

export default function ApiCard({
  id,
  name,
  provider,
  uptime,
  cost,
  description,
  icon,
  onSelect,
  selected = false,
}: ApiCardProps) {
  return (
    <div
      onClick={() => onSelect?.(id)}
      className={`rounded-lg border-2 p-6 cursor-pointer transition ${
        selected
          ? 'border-cyan-400 bg-cyan-400/10'
          : 'border-gray-700 bg-gray-900/50 hover:border-cyan-400/50'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{icon}</span>
          <div>
            <h3 className="font-bold text-white text-lg">{name}</h3>
            <p className="text-sm text-gray-400">{provider}</p>
          </div>
        </div>
        {selected && (
          <div className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">✓</span>
          </div>
        )}
      </div>

      <p className="text-gray-300 text-sm mb-4">{description}</p>

      <div className="flex justify-between items-center text-xs">
        <div className="flex gap-4">
          <span className="text-gray-400">
            Uptime: <span className="text-cyan-400">{uptime}</span>
          </span>
          <span className="text-gray-400">
            Cost: <span className="text-cyan-400">{cost}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

