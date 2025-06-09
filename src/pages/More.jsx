
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Settings, 
  HelpCircle, 
  CreditCard, 
  BarChart3, 
  Share2, 
  Gift, 
  LogOut,
  User,
  Bell,
  Shield
} from 'lucide-react';
import Navigation from '../components/Navigation';
import styles from './More.module.css';

const More = () => {
  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Settings', description: 'Manage your account information' },
        { icon: Bell, label: 'Notifications', description: 'Configure your notification preferences' },
        { icon: Shield, label: 'Security', description: 'Manage password and security settings' },
      ]
    },
    {
      title: 'Business',
      items: [
        { icon: BarChart3, label: 'Analytics', description: 'View detailed business insights' },
        { icon: CreditCard, label: 'Payment Methods', description: 'Manage payment and billing' },
        { icon: Share2, label: 'Marketing Tools', description: 'Promote your business' },
        { icon: Gift, label: 'Referral Program', description: 'Earn rewards by referring friends' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', description: 'Find answers to common questions' },
        { icon: Settings, label: 'App Settings', description: 'Configure app preferences' },
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>More</h1>
      </div>

      <div className={styles.content}>
        <Card>
          <CardContent className={styles.profileCard}>
            <div className={styles.profileRow}>
              <div className={styles.avatar}>
                <span className={styles.avatarText}>KS</span>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileName}>Kenmatics Solution Services</h2>
                <p className={styles.profileUrl}>kenmatics.store</p>
                <p className={styles.profileRole}>Business Owner</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h3 className={styles.sectionTitle}>
              {section.title}
            </h3>
            <Card>
              <CardContent className={styles.menuCard}>
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className={styles.menuItem}
                  >
                    <div className={styles.menuIcon}>
                      <item.icon className={styles.icon} />
                    </div>
                    <div className={styles.menuContent}>
                      <h4 className={styles.menuLabel}>{item.label}</h4>
                      <p className={styles.menuDescription}>{item.description}</p>
                    </div>
                    <div className={styles.menuArrow}>
                      →
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}

        <Card>
          <CardContent className={styles.appInfo}>
            <div className={styles.appDetails}>
              <p>Kenmatics Solution Services App</p>
              <p>Version 2.1.0</p>
              <p className={styles.copyright}>© 2024 Kenmatics Solution Services</p>
            </div>
          </CardContent>
        </Card>

        <Button 
          variant="outline" 
          className={styles.logoutBtn}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>

      <Navigation />
    </div>
  );
};

export default More;
