import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useDashboardAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSales: 0,
    totalOrders: 0,
    productsSold: 0,
    newCustomers: 0,
    websiteVisits: 0,
    salesData: [
      { name: 'Mon', sales: 0 },
      { name: 'Tue', sales: 0 },
      { name: 'Wed', sales: 0 },
      { name: 'Thu', sales: 0 },
      { name: 'Fri', sales: 0 },
      { name: 'Sat', sales: 0 },
      { name: 'Sun', sales: 0 },
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current week start and end dates
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    // Listen to orders for sales data
    const ordersQuery = query(
      collection(db, 'orders'),
      where('createdAt', '>=', weekStart),
      where('createdAt', '<=', weekEnd),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));

      // Calculate analytics
      const totalSales = orders.reduce((sum, order) => {
        const amount = typeof order.total === 'string' 
          ? parseFloat(order.total.replace(/[₦,]/g, '')) || 0
          : order.total || 0;
        return sum + amount;
      }, 0);

      const productsSold = orders.reduce((sum, order) => {
        return sum + (order.items?.length || 0);
      }, 0);

      // Create daily sales data
      const salesByDay = {};
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      orders.forEach(order => {
        const dayName = days[order.createdAt.getDay()];
        const amount = typeof order.total === 'string' 
          ? parseFloat(order.total.replace(/[₦,]/g, '')) || 0
          : order.total || 0;
        salesByDay[dayName] = (salesByDay[dayName] || 0) + amount;
      });

      const salesData = days.map(day => ({
        name: day,
        sales: salesByDay[day] || 0
      }));

      setAnalytics(prev => ({
        ...prev,
        totalSales,
        totalOrders: orders.length,
        productsSold,
        salesData
      }));
    });

    // Listen to customers for new customers count
    const customersQuery = query(
      collection(db, 'users'),
      where('createdAt', '>=', weekStart),
      where('createdAt', '<=', weekEnd),
      where('role', '==', 'customer')
    );

    const unsubscribeCustomers = onSnapshot(customersQuery, (snapshot) => {
      setAnalytics(prev => ({
        ...prev,
        newCustomers: snapshot.docs.length
      }));
    });

    // Listen to page visits (you can track this in your app)
    const visitsQuery = query(
      collection(db, 'page_visits'),
      where('visitDate', '>=', weekStart),
      where('visitDate', '<=', weekEnd)
    );

    const unsubscribeVisits = onSnapshot(visitsQuery, (snapshot) => {
      setAnalytics(prev => ({
        ...prev,
        websiteVisits: snapshot.docs.length
      }));
      setLoading(false);
    }, () => {
      // If page_visits collection doesn't exist, just set loading to false
      setLoading(false);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeCustomers();
      unsubscribeVisits();
    };
  }, []);

  return { analytics, loading };
};