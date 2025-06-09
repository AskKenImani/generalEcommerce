
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'products'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      
      setProducts(productsData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addProduct = async (productData, imageFile) => {
    if (!user) return;

    try {
      let imageUrl = '';
      
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'products'), {
        ...productData,
        imageUrl,
        createdAt: new Date(),
        createdBy: user.uid
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (productId, productData, imageFile) => {
    if (!user) return;

    try {
      let updateData = { ...productData };
      
      if (imageFile) {
        const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        updateData.imageUrl = await getDownloadURL(snapshot.ref);
      }

      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, updateData);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return { products, loading, addProduct, updateProduct, deleteProduct };
};
