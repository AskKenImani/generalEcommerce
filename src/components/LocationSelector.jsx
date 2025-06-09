import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const LocationSelector = () => {
  return (
    <div className="px-4 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <Package className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700">Headquarters</span>
        <Button variant="ghost" size="sm" className="ml-auto">
          <span className="text-gray-600">▼</span>
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;