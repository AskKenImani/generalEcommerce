import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Upload, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { db } from '../firebase';
import { addDoc, collection, Timestamp, updateDoc, doc } from 'firebase/firestore';
import { useCloudinary } from '../hooks/useCloudinary';
import styles from './ProductForm.module.css';

const ProductForm = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const { uploadImage } = useCloudinary();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(product?.imageUrl || '');

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    cost: product?.cost || 0,
    stock: product?.stock || 0,
    status: product?.status || 'active',
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = imagePreview;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const productData = {
        ...formData,
        imageUrl,
        createdAt: Timestamp.now(),
      };

      if (product) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, productData);
        alert('Product updated successfully!');
      } else {
        await addProduct(productData);
        alert('Product added successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to submit product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <Card className={styles.modal}>
        <CardHeader className={styles.header}>
          <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Image Upload */}
            <div className={styles.field}>
              <Label>Product Image</Label>
              <div className={styles.imageUpload}>
                {imagePreview ? (
                  <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Preview" className={styles.previewImg} />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className={styles.removeBtn}
                      onClick={() => {
                        setImage(null);
                        setImagePreview('');
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <label className={styles.uploadLabel}>
                    <Upload className={styles.uploadIcon} />
                    <span className={styles.uploadText}>Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={styles.hiddenInput}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Product Name */}
            <div className={styles.field}>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Description */}
            <div className={styles.field}>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            {/* Pricing */}
            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <Label htmlFor="price">Selling Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className={styles.field}>
                <Label htmlFor="cost">Cost Price (₦)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({ ...formData, cost: Number(e.target.value) })
                  }
                />
              </div>
            </div>

            {/* Stock & Status */}
            <div className={styles.gridTwo}>
              <div className={styles.field}>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className={styles.field}>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Button type="button" variant="outline" onClick={onClose} className={styles.cancelBtn}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? 'Saving...' : product ? 'Update' : 'Add Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
