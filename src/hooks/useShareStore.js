import { useState } from 'react';

export const useShareStore = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareStoreLink = async () => {
    setIsSharing(true);
    
    const storeUrl = `${window.location.origin}/store`;
    const shareData = {
      title: 'Kenmatics Solution Services Store',
      text: 'Check out amazing products from Kenmatics Solution Services!',
      url: storeUrl
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(storeUrl);
        alert('Store link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(storeUrl);
        alert('Store link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        alert(`Share this link: ${storeUrl}`);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return { shareStoreLink, isSharing };
};