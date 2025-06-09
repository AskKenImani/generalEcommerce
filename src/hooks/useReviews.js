
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      setReviews(reviewsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addReview = async (rating, comment, userName) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName,
        rating,
        comment,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return { reviews, loading, addReview };
};
