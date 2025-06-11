
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Users, Mail, Phone, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';

const AddCustomerForm = ({ onAdd }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', location: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'customers'), {
        ...form,
        orders: 0,
        totalSpent: 0,
        status: 'New',
        createdAt: new Date()
      });
      onAdd();
    } catch (err) {
      console.error('Add customer error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <Input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
      <Button disabled={loading} onClick={handleSubmit} className="w-full bg-green-600">
        {loading ? 'Adding...' : 'Add Customer'}
      </Button>
    </div>
  );
};

const ViewCustomerCard = ({ customer }) => (
  <div className="space-y-3">
    <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
    <p>Email: {customer.email}</p>
    <p>Phone: {customer.phone}</p>
    <p>Location: {customer.location}</p>
    <p>Status: {customer.status}</p>
    <p>Orders: {customer.orders}</p>
    <p>Total Spent: ₦{customer.totalSpent}</p>
  </div>
);

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const { profile } = useUserProfile();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'customers'), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(data);
    });
    return () => unsub();
  }, []);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'New': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Customers</h1>
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="bg-green-600">
                <Users className="w-4 h-4 mr-2" /> Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddCustomerForm onAdd={() => setOpenAdd(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        <div className="grid grid-cols-3 gap-4">
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{customers.length}</div><div>Total Customers</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{customers.filter(c => c.status === 'Active').length}</div><div>Active</div></CardContent></Card>
          <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{customers.filter(c => c.status === 'New').length}</div><div>New This Month</div></CardContent></Card>
        </div>

        <div className="space-y-3">
          {filteredCustomers.length === 0 ? (
            <Card><CardContent className="p-8 text-center">No customers found.</CardContent></Card>
          ) : (
            filteredCustomers.map((customer) => (
              <Card key={customer.id} className="hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-700 font-semibold">{customer.name?.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{customer.name}</h3>
                        <Badge className={getStatusColor(customer.status)}>{customer.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-2"><Mail className="w-3 h-3" /><span>{customer.email}</span></div>
                        <div className="flex items-center space-x-2"><Phone className="w-3 h-3" /><span>{customer.phone}</span></div>
                        <div className="flex items-center space-x-2"><MapPin className="w-3 h-3" /><span>{customer.location}</span></div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="text-sm text-gray-600">{customer.orders} orders • ₦{customer.totalSpent}</div>
                        <Dialog open={openView} onOpenChange={setOpenView}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedCustomer(customer)}>
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            {selectedCustomer && <ViewCustomerCard customer={selectedCustomer} />}
                          </DialogContent>
                        </Dialog>
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
