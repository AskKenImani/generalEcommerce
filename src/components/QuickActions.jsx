import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Package, Zap, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    { 
      title: 'Create Order', 
      icon: ShoppingCart, 
      bgColor: 'bg-pink-50', 
      iconColor: 'text-pink-600',
      action: () => navigate('/orders')
    },
    { 
      title: 'New Product', 
      icon: Package, 
      bgColor: 'bg-blue-50', 
      iconColor: 'text-blue-600',
      action: () => navigate('/products')
    },
    { 
      title: 'Run Sales', 
      icon: Zap, 
      bgColor: 'bg-yellow-50', 
      iconColor: 'text-yellow-600',
      action: () => navigate('/products')
    },
    { 
      title: 'Get Support', 
      icon: MessageCircle, 
      bgColor: 'bg-green-50', 
      iconColor: 'text-green-600',
      action: () => window.open('mailto:support@kenmaticssolution.com', '_blank')
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={action.action}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 ${action.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <action.icon className={`w-6 h-6 ${action.iconColor}`} />
              </div>
              <div className="text-gray-700 text-sm font-medium">{action.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;