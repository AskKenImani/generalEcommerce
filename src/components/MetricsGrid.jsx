import { Card, CardContent } from '@/components/ui/card';

const MetricsGrid = ({ analytics }) => {
  const metrics = [
    { 
      title: 'Orders', 
      value: analytics.totalOrders.toString(), 
      bgColor: 'bg-green-50', 
      textColor: 'text-green-700' 
    },
    { 
      title: 'Products sold', 
      value: analytics.productsSold.toString(), 
      bgColor: 'bg-blue-50', 
      textColor: 'text-blue-700' 
    },
    { 
      title: 'New Customers', 
      value: analytics.newCustomers.toString(), 
      bgColor: 'bg-yellow-50', 
      textColor: 'text-yellow-700' 
    },
    { 
      title: 'Website Visits', 
      value: analytics.websiteVisits.toString(), 
      bgColor: 'bg-pink-50', 
      textColor: 'text-pink-700' 
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className={`${metric.bgColor} border-0`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${metric.textColor} mb-1`}>
              {metric.value}
            </div>
            <div className="text-gray-600 text-sm">{metric.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;