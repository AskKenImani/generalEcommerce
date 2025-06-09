import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { useShareStore } from '@/hooks/useShareStore';

const Header = () => {
  const { shareStoreLink, isSharing } = useShareStore();

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KS</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">kenmaticssolutionservices.com</h1>
            <div className="flex items-center space-x-4 mt-1">
              <Link to="/store">
                <Button variant="outline" size="sm" className="text-xs">
                  Visit store
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={shareStoreLink}
                disabled={isSharing}
              >
                {isSharing ? 'Sharing...' : 'Share link'}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <div className="w-5 h-5 bg-green-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;