
import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  imageUrl?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  userId: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'products'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Product[];
      
      setProducts(productsData.filter(p => p.userId === user.uid));
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'userId'>, image?: File) => {
    if (!user) throw new Error('User not authenticated');

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `products/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await addDoc(collection(db, 'products'), {
      ...productData,
      imageUrl,
      userId: user.uid,
      createdAt: new Date()
    });
  };

  const updateProduct = async (id: string, updates: Partial<Product>, image?: File) => {
    let imageUrl = updates.imageUrl;
    
    if (image) {
      const imageRef = ref(storage, `products/${Date.now()}-${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await updateDoc(doc(db, 'products', id), {
      ...updates,
      imageUrl
    });
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};
