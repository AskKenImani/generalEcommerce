import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = ({ analytics }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This week');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-600 text-sm">Total sales</h2>
          <Button variant="outline" size="sm" className="text-green-600 border-green-200">
            {selectedPeriod} ▼
          </Button>
        </div>
        <div className="text-4xl font-bold text-gray-900 mb-6">
          ₦{analytics.totalSales.toLocaleString()}
        </div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Sales']} />
              <Bar dataKey="sales" fill="#ea580c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;