import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TrackOrdersSection = () => {
  const navigate = useNavigate();

  const handleTrackOrders = () => {
    navigate('/orders');
  };

  return (
    <Card className="bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Track Orders, Drive Growth</h3>
            <p className="text-orange-100 text-sm mb-4">
              See what sells, know your top customers, and grow your business - all in one place.
            </p>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold"
              onClick={handleTrackOrders}
            >
              START TRACKING ORDERS
            </Button>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center ml-4">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackOrdersSection;