import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '@/hooks/useUserProfile';

const ReferralsSection = () => {
  const { profile } = useUserProfile();

  const generateReferralCode = () => {
    if (profile?.firstName && profile?.lastName) {
      const initials = (profile.firstName.charAt(0) + profile.lastName.charAt(0)).toUpperCase();
      const randomNum = Math.floor(Math.random() * 1000);
      return `${initials}${randomNum}`;
    }
    return 'KEN' + Math.floor(Math.random() * 1000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Referrals is now live</h3>
            <p className="text-gray-600 text-sm">Refer business owners and earn rewards.</p>
          </div>
          <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-gray-600 text-sm">Referral Code: </span>
            <span className="font-mono font-semibold">{generateReferralCode()}</span>
          </div>
          <Button variant="outline" size="sm" className="text-green-600 border-green-200">
            View Earnings →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralsSection;