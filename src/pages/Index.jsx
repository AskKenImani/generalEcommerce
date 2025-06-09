import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import LocationSelector from '@/components/LocationSelector';
import SalesChart from '@/components/SalesChart';
import MetricsGrid from '@/components/MetricsGrid';
import TrackOrdersSection from '@/components/TrackOrdersSection';
import QuickActions from '@/components/QuickActions';
import ReferralsSection from '@/components/ReferralsSection';
import LatestFromKenmatics from '@/components/LatestFromKenmatics';
import { useDashboardAnalytics } from '@/hooks/useDashboardAnalytics';

const Index = () => {
  const { analytics, loading } = useDashboardAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <LocationSelector />

      <div className="p-4 space-y-6 pb-20">
        <SalesChart analytics={analytics} />
        <MetricsGrid analytics={analytics} />
        <TrackOrdersSection />
        <QuickActions />
        <ReferralsSection />
        <LatestFromKenmatics />
      </div>

      <Navigation />
    </div>
  );
};

export default Index;