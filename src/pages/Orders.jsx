
import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, ShoppingCart, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import styles from './Orders.module.css';

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

  const mockOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      amount: '₦15,000',
      status: 'Delivered',
      date: '2024-06-01',
      items: 2
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      amount: '₦8,500',
      status: 'Processing',
      date: '2024-06-02',
      items: 1
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      amount: '₦12,000',
      status: 'Pending',
      date: '2024-06-03',
      items: 3
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return styles.deliveredBadge;
      case 'Processing': return styles.processingBadge;
      case 'Pending': return styles.pendingBadge;
      case 'Shipped': return styles.shippedBadge;
      default: return styles.defaultBadge;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Orders</h1>
          <Button className={styles.newOrderBtn}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
        
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${styles.tab} ${
                selectedTab === tab ? styles.activeTab : ''
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={styles.statNumber}>3</div>
              <div className={styles.statLabel}>Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={`${styles.statNumber} ${styles.pendingNumber}`}>1</div>
              <div className={styles.statLabel}>Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={`${styles.statNumber} ${styles.processingNumber}`}>1</div>
              <div className={styles.statLabel}>Processing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={`${styles.statNumber} ${styles.deliveredNumber}`}>1</div>
              <div className={styles.statLabel}>Delivered</div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.ordersList}>
          {mockOrders.length === 0 ? (
            <Card>
              <CardContent className={styles.emptyState}>
                <ShoppingCart className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No orders yet</h3>
                <p className={styles.emptyDescription}>Your orders will appear here once customers start purchasing.</p>
                <Button className={styles.newOrderBtn}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Create Your First Order
                </Button>
              </CardContent>
            </Card>
          ) : (
            mockOrders.map((order) => (
              <Card key={order.id} className={styles.orderCard}>
                <CardContent className={styles.orderContent}>
                  <div className={styles.orderHeader}>
                    <div>
                      <h3 className={styles.orderId}>{order.id}</h3>
                      <p className={styles.customerName}>{order.customer}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className={styles.orderFooter}>
                    <div className={styles.orderMeta}>
                      <span>{order.amount}</span>
                      <span>{order.items} items</span>
                      <div className={styles.dateWrapper}>
                        <Calendar className={styles.calendarIcon} />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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

export default Orders;
