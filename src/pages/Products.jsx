
import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Plus, Filter, Package, Edit, Trash2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../hooks/useProducts';
import styles from './Products.module.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(undefined);
  const { products, loading, deleteProduct } = useProducts();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setEditingProduct(undefined);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Products</h1>
          <Button 
            className={styles.addButton}
            onClick={() => setShowProductForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
        
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <Input
              placeholder="Search products..."
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
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={styles.statNumber}>{products.length}</div>
              <div className={styles.statLabel}>Total Products</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={`${styles.statNumber} ${styles.activeNumber}`}>{activeProducts}</div>
              <div className={styles.statLabel}>Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statCard}>
              <div className={`${styles.statNumber} ${styles.outOfStockNumber}`}>{outOfStockProducts}</div>
              <div className={styles.statLabel}>Out of Stock</div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.productsList}>
          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className={styles.emptyState}>
                <Package className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No products yet</h3>
                <p className={styles.emptyDescription}>Start by adding your first product to your store.</p>
                <Button 
                  className={styles.addButton}
                  onClick={() => setShowProductForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredProducts.map((product) => (
              <Card key={product.id} className={styles.productCard}>
                <CardContent className={styles.productContent}>
                  <div className={styles.productRow}>
                    <div className={styles.productImage}>
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className={styles.productImg}
                        />
                      ) : (
                        <Package className={styles.placeholderIcon} />
                      )}
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productPrice}>₦{product.price.toLocaleString()}</p>
                      <div className={styles.productMeta}>
                        <Badge 
                          variant={product.status === 'active' ? 'default' : 'destructive'}
                          className={product.status === 'active' ? styles.activeBadge : ''}
                        >
                          {product.status}
                        </Badge>
                        <span className={styles.stockInfo}>Stock: {product.stock}</span>
                      </div>
                    </div>
                    <div className={styles.productActions}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {showProductForm && (
        <ProductForm 
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}

      <Navigation />
    </div>
  );
};

export default Products;
