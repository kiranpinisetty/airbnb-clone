import { useEffect, useRef, useState, useMemo } from 'react';
import TourHeader from './TourHeader';
import CategoryNav from './CategoryNav';
import CategorySection from './CategorySection';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import './PhotoTour.css';

export default function PhotoTour({
  isOpen,
  initialPhotoId,
  photos = [],
  categories = [],
  onClose,
  onOpenLightbox,
  isLightboxOpen = false
}) {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const backButtonRef = useRef(null);
  const overlayRef = useRef(null);

  const dialogRef = useFocusTrap(isRendered && !isClosing, backButtonRef, isLightboxOpen);

  useBodyScrollLock(isRendered);

  // Group photos by category name and map photos by ID
  const { photosById, photosByCategory } = useMemo(() => {
    const idMap = new Map(photos.map((p) => [String(p.id), p]));
    const catMap = new Map();
    for (const cat of categories) {
      catMap.set(cat.name, []);
    }
    for (const photo of photos) {
      if (catMap.has(photo.category)) {
        catMap.get(photo.category).push(photo);
      } else {
        if (!catMap.has('Additional photos')) {
          catMap.set('Additional photos', []);
        }
        catMap.get('Additional photos').push(photo);
      }
    }
    return { photosById: idMap, photosByCategory: catMap };
  }, [photos, categories]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Adjust state during render when isOpen prop changes
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIsRendered(true);
      setIsClosing(false);
    } else if (isRendered) {
      setIsClosing(true);
    }
  }

  // Handle animation end to cleanly unmount
  const handleAnimationEnd = (e) => {
    // Only respond to animations on the overlay itself
    if (e.target === overlayRef.current && isClosing) {
      setIsRendered(false);
      setIsClosing(false);
    }
  };

  // Fallback timer in case onAnimationEnd doesn't fire (e.g. reduced motion or hidden tab)
  useEffect(() => {
    if (!isClosing) return;
    const timer = setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [isClosing]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isRendered) return;

    const handleKeyDown = (e) => {
      if (isLightboxOpen) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered, isLightboxOpen, onClose]);

  // Scroll to initial photo or category on open
  useEffect(() => {
    if (!isOpen || !initialPhotoId) return;

    const targetPhoto = photosById.get(String(initialPhotoId));
    if (!targetPhoto) return;

    const categoryId = `tour-cat-${targetPhoto.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const timer = setTimeout(() => {
      const targetEl = document.getElementById(categoryId);
      const containerEl = overlayRef.current;
      if (targetEl && containerEl) {
        const headerOffset = 96;
        const targetTop =
          targetEl.getBoundingClientRect().top -
          containerEl.getBoundingClientRect().top +
          containerEl.scrollTop -
          headerOffset;
        containerEl.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'auto',
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, initialPhotoId, photosById]);

  if (!isRendered) return null;

  return (
    <div
      ref={(node) => {
        dialogRef.current = node;
        overlayRef.current = node;
      }}
      className={`photo-tour-overlay ${isClosing ? 'photo-tour-closing' : 'photo-tour-open'}`}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      onAnimationEnd={handleAnimationEnd}
    >
      <TourHeader backButtonRef={backButtonRef} onClose={onClose} />

      <main className="tour-content-container">
        <div className="tour-content-column">
          <CategoryNav categories={categories} photosById={photosById} />

          <div className="tour-categories-list">
            {categories.map((cat) => {
              const catPhotos = photosByCategory.get(cat.name) || [];
              if (catPhotos.length === 0) return null;

              return (
                <CategorySection
                  key={cat.name}
                  category={cat}
                  photos={catPhotos}
                  totalPhotosCount={photos.length}
                  allPhotos={photos}
                  onOpenLightbox={onOpenLightbox}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
