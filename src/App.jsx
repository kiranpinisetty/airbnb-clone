import { useEffect, useState, useRef } from 'react';
import ListingPage from './components/ListingPage';
import PhotoTour from './components/PhotoTour';
import Lightbox from './components/Lightbox';
import listingData from './data/listing.json';

function App() {
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const [photoTourTargetId, setPhotoTourTargetId] = useState(null);
  const [lightboxPhotoId, setLightboxPhotoId] = useState(null);
  const mainPageRef = useRef(null);

  const isLightboxOpen = Boolean(lightboxPhotoId);

  // Sync state with URL query string on mount and popstate (browser back/forward)
  useEffect(() => {
    const syncFromUrl = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isTour = searchParams.get('photoTour') === '1';
      const photoId = searchParams.get('photo');
      const lightboxId = searchParams.get('lightbox');

      if (lightboxId) {
        setIsPhotoTourOpen(true);
        setPhotoTourTargetId(photoId || null);
        setLightboxPhotoId(lightboxId);
      } else {
        setLightboxPhotoId(null);
        if (isTour) {
          setIsPhotoTourOpen(true);
          setPhotoTourTargetId(photoId || null);
        } else {
          setIsPhotoTourOpen(false);
          setPhotoTourTargetId(null);
        }
      }
    };

    // Run on initial load
    syncFromUrl();

    // Listen to popstate for back/forward navigation
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const handleOpenPhotoTour = (photoId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('photoTour', '1');
    if (photoId) {
      url.searchParams.set('photo', String(photoId));
    } else {
      url.searchParams.delete('photo');
    }

    window.history.pushState({}, '', url.toString());
    setIsPhotoTourOpen(true);
    setPhotoTourTargetId(photoId || null);
  };

  const handleClosePhotoTour = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('photoTour');
    url.searchParams.delete('photo');
    url.searchParams.delete('lightbox');

    window.history.pushState({}, '', url.toString());
    setIsPhotoTourOpen(false);
    setPhotoTourTargetId(null);
    setLightboxPhotoId(null);
  };

  const handleOpenLightbox = (photoId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('photoTour', '1');
    url.searchParams.set('lightbox', String(photoId));

    window.history.pushState({}, '', url.toString());
    setLightboxPhotoId(String(photoId));
  };

  const handleLightboxPhotoChange = (newPhotoId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('lightbox', String(newPhotoId));

    window.history.replaceState({}, '', url.toString());
    setLightboxPhotoId(String(newPhotoId));
  };

  const handleCloseLightbox = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('lightbox');

    window.history.pushState({}, '', url.toString());
    setLightboxPhotoId(null);
  };

  return (
    <>
      <div
        ref={mainPageRef}
        inert={isPhotoTourOpen ? '' : undefined}
        aria-hidden={isPhotoTourOpen ? 'true' : undefined}
      >
        <ListingPage
          listing={listingData}
          onOpenPhotoTour={handleOpenPhotoTour}
        />
      </div>

      <PhotoTour
        isOpen={isPhotoTourOpen}
        initialPhotoId={photoTourTargetId}
        photos={listingData.photos}
        categories={listingData.categories}
        onClose={handleClosePhotoTour}
        onOpenLightbox={handleOpenLightbox}
        isLightboxOpen={isLightboxOpen}
      />

      <Lightbox
        isOpen={isLightboxOpen}
        initialPhotoId={lightboxPhotoId}
        photos={listingData.photos}
        onClose={handleCloseLightbox}
        onPhotoChange={handleLightboxPhotoChange}
      />
    </>
  );
}

export default App;
