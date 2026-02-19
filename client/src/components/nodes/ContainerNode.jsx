import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Box, Activity, Globe, Database } from 'lucide-react';

const ContainerNode = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'running': return 'bg-green-500';
      case 'exited': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const statusColor = getStatusColor(data.state);

  return (
    <div className="shadow-lg rounded-md bg-white border-2 border-gray-200 w-64 transition-all hover:border-blue-500 hover:shadow-xl">
      
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-t-md border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-gray-700 text-sm truncate max-w-30" title={data.name}>
            {data.name || 'Unknown Container'}
          </span>
        </div>
        <div className={`w-3 h-3 rounded-full ${statusColor} shadow-sm`} title={data.status} />
      </div>

      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-semibold">Img:</span>
          <span className="truncate bg-gray-100 px-1 py-0.5 rounded border border-gray-200">
            {data.imageName || 'scratch'}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-mono">ID: {data.id}</span>
        </div>

        {data.ports && data.ports.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {data.ports.map((port, index) => (
                <span key={index} className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                  <Globe className="w-3 h-3" />
                  {port}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Volume/Network Handles */}
      <div className="px-3 py-1 bg-gray-50 rounded-b-md flex justify-between">
         {/* You can add labels for handles if you want */}
         <span className="text-[10px] text-gray-400">Vol</span>
         <span className="text-[10px] text-gray-400">Net</span>
      </div>

      {/* Output: Connections to Networks or Volumes */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
};

export default memo(ContainerNode);