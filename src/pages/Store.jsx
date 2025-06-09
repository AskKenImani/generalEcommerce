
import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Search, Filter, ShoppingCart, Star, LogOut } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import Cart from '../components/Cart';
import ReviewForm from '../components/ReviewForm';
import styles from './Store.module.css';

const Store = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const { products, loading } = useProducts();
  const { addToCart, getTotalItems } = useCart();
  const { logout } = useAuth();
  const { profile } = useUserProfile();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || '/placeholder.svg',
      quantity: 1
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <img 
              src="/lovable-uploads/bc103821-ca31-4322-bcee-5f8adfdcf6ea.png" 
              alt="Kenmatics Logo" 
              className={styles.logoImg}
            />
            <span className={styles.logoText}>Kenmatics Store</span>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCart(true)}
              className={styles.cartButton}
            >
              <ShoppingCart className="w-4 h-4" />
              {getTotalItems() > 0 && (
                <Badge className={styles.cartBadge}>
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('products')}
            className={`${styles.tab} ${activeTab === 'products' ? styles.activeTab : ''}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
          >
            Reviews
          </button>
        </div>
        
        {activeTab === 'products' && (
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
        )}
      </div>

      <div className={styles.content}>
        {activeTab === 'products' ? (
          <>
            <Card className={styles.welcomeCard}>
              <CardContent className={styles.welcomeContent}>
                <h2 className={styles.welcomeTitle}>
                  Welcome, {profile?.firstName}!
                </h2>
                <p className={styles.welcomeText}>Discover amazing products from Kenmatics Solution Services</p>
              </CardContent>
            </Card>

            <div className={styles.productsGrid}>
              {filteredProducts.length === 0 ? (
                <div className={styles.emptyState}>
                  <Card>
                    <CardContent className={styles.emptyContent}>
                      <ShoppingCart className={styles.emptyIcon} />
                      <h3 className={styles.emptyTitle}>No products found</h3>
                      <p className={styles.emptyText}>Check back later for new products!</p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Card key={product.id} className={styles.productCard}>
                    <CardContent className={styles.productContent}>
                      <div className={styles.productImage}>
                        <img
                          src={product.imageUrl || '/placeholder.svg'}
                          alt={product.name}
                          className={styles.productImg}
                        />
                      </div>
                      <h3 className={styles.productName}>
                        {product.name}
                      </h3>
                      <p className={styles.productDescription}>
                        {product.description}
                      </p>
                      <div className={styles.productBottom}>
                        <span className={styles.productPrice}>
                          ₦{product.price.toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className={styles.addToCartBtn}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </>
        ) : (
          <ReviewForm />
        )}
      </div>

      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Store;
