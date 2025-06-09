
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Users, Mail, Phone, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const mockCustomers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      orders: 5,
      totalSpent: '₦45,000',
      status: 'Active',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+234 802 345 6789',
      location: 'Abuja, Nigeria',
      orders: 3,
      totalSpent: '₦28,500',
      status: 'Active',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+234 803 456 7890',
      location: 'Port Harcourt, Nigeria',
      orders: 1,
      totalSpent: '₦12,000',
      status: 'New',
      avatar: 'MJ'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
          <Button className="bg-green-600 hover:bg-green-700">
            <Users className="w-4 h-4 mr-2" />
            Add Customer
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-gray-600 text-sm">Total Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-gray-600 text-sm">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-gray-600 text-sm">New This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="space-y-3">
          {mockCustomers.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
                <p className="text-gray-600 mb-4">Your customers will appear here once they make their first purchase.</p>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Users className="w-4 h-4 mr-2" />
                  Add Your First Customer
                </Button>
              </CardContent>
            </Card>
          ) : (
            mockCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold">{customer.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{customer.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="text-sm">
                          <span className="text-gray-600">{customer.orders} orders • </span>
                          <span className="font-semibold text-gray-900">{customer.totalSpent}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Customers;
