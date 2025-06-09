import { Card, CardContent } from '@/components/ui/card';
import { Package, TrendingUp } from 'lucide-react';

const LatestFromKenmatics = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest from Kenmatics</h3>
      <div className="space-y-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Accept payments for your business</h4>
                <p className="text-gray-600 text-sm">Paystack integration now available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">New Analytics Dashboard</h4>
                <p className="text-gray-600 text-sm">Real-time insights for your business</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LatestFromKenmatics;