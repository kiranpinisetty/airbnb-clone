import { useState, useEffect, useRef } from 'react';
import LightboxHeader from './LightboxHeader';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import './Lightbox.css';

function getIndexFromId(photos, photoId) {
  if (!photos || photos.length === 0) return 0;
  const foundIdx = photos.findIndex((p) => String(p.id) === String(photoId));
  return foundIdx !== -1 ? foundIdx : 0;
}

export default function Lightbox({
  isOpen,
  initialPhotoId,
  photos = [],
  onClose,
  onPhotoChange
}) {
  const closeButtonRef = useRef(null);

  // Fallback focus restorer on unmount if trigger element is not available
  const handleRestoreFocus = () => {
    if (initialPhotoId) {
      const btn = document.getElementById(`photo-tour-btn-${initialPhotoId}`);
      if (btn) btn.focus();
    }
  };

  const dialogRef = useFocusTrap(isOpen, closeButtonRef, false, handleRestoreFocus);

  useBodyScrollLock(isOpen);

  const [currentIndex, setCurrentIndex] = useState(() => getIndexFromId(photos, initialPhotoId));
  const [displayedPhoto, setDisplayedPhoto] = useState(() => photos[currentIndex] || null);
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [prevInitialPhotoId, setPrevInitialPhotoId] = useState(initialPhotoId);

  // Adjust state during render when initialPhotoId prop changes
  if (initialPhotoId !== prevInitialPhotoId) {
    setPrevInitialPhotoId(initialPhotoId);
    const newIdx = getIndexFromId(photos, initialPhotoId);
    setCurrentIndex(newIdx);
    setDisplayedPhoto(photos[newIdx] || null);
    setPrevPhoto(null);
    setIsCrossfading(false);
  }

  // Clear crossfading state after 200ms transition
  useEffect(() => {
    if (!isCrossfading) return;
    const timer = setTimeout(() => {
      setIsCrossfading(false);
      setPrevPhoto(null);
    }, 200);
    return () => clearTimeout(timer);
  }, [isCrossfading]);

  // Preload neighbouring photos
  useEffect(() => {
    if (!isOpen || !photos || photos.length === 0) return;

    const urlsToPreload = [];
    if (currentIndex > 0 && photos[currentIndex - 1]) {
      urlsToPreload.push(photos[currentIndex - 1].url);
    }
    if (currentIndex < photos.length - 1 && photos[currentIndex + 1]) {
      urlsToPreload.push(photos[currentIndex + 1].url);
    }

    urlsToPreload.forEach((url) => {
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [isOpen, currentIndex, photos]);

  const changePhotoToIndex = (newIndex) => {
    if (newIndex < 0 || newIndex >= photos.length || newIndex === currentIndex) return;

    const nextPhoto = photos[newIndex];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setCurrentIndex(newIndex);
      setDisplayedPhoto(nextPhoto);
      setPrevPhoto(null);
      setIsCrossfading(false);
    } else {
      setPrevPhoto(photos[currentIndex]);
      setDisplayedPhoto(nextPhoto);
      setCurrentIndex(newIndex);
      setIsCrossfading(true);
    }

    if (onPhotoChange && nextPhoto) {
      onPhotoChange(nextPhoto.id);
    }
  };

  // Handle keyboard events (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        if (currentIndex > 0) {
          changePhotoToIndex(currentIndex - 1);
        }
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        if (currentIndex < photos.length - 1) {
          changePhotoToIndex(currentIndex + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen || !photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === photos.length - 1;

  const handlePrev = () => {
    changePhotoToIndex(currentIndex - 1);
  };

  const handleNext = () => {
    changePhotoToIndex(currentIndex + 1);
  };

  return (
    <div
      ref={dialogRef}
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <LightboxHeader
        categoryName={currentPhoto.category}
        currentIndex={currentIndex}
        totalCount={photos.length}
        onClose={onClose}
        closeButtonRef={closeButtonRef}
      />

      {/* Screen-reader announcement for photo changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Photo ${currentIndex + 1} of ${photos.length}: ${currentPhoto.category}`}
      </div>

      <main className="lightbox-main">
        {/* Previous photo button */}
        <button
          type="button"
          className="lightbox-arrow lightbox-arrow-prev"
          onClick={handlePrev}
          disabled={isFirst}
          aria-disabled={isFirst ? 'true' : undefined}
          tabIndex={isFirst ? -1 : 0}
          aria-label="Previous photo"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="lightbox-arrow-chevron"
          >
            <path d="M20 26 L10 16 L20 6" />
          </svg>
        </button>

        {/* 4:3 Photo Area */}
        <div className="lightbox-photo-wrapper">
          <div className="lightbox-photo-stage">
            {prevPhoto && isCrossfading && (
              <img
                src={prevPhoto.url}
                alt=""
                aria-hidden="true"
                className="lightbox-photo-img lightbox-photo-prev"
              />
            )}
            {displayedPhoto && (
              <img
                key={displayedPhoto.id}
                src={displayedPhoto.url}
                alt={displayedPhoto.alt || `${displayedPhoto.category} view`}
                className={`lightbox-photo-img ${isCrossfading ? 'lightbox-photo-entering' : ''}`}
              />
            )}
          </div>
        </div>

        {/* Next photo button */}
        <button
          type="button"
          className="lightbox-arrow lightbox-arrow-next"
          onClick={handleNext}
          disabled={isLast}
          aria-disabled={isLast ? 'true' : undefined}
          tabIndex={isLast ? -1 : 0}
          aria-label="Next photo"
        >
          <svg
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            className="lightbox-arrow-chevron"
          >
            <path d="M12 6 L22 16 L12 26" />
          </svg>
        </button>
      </main>
    </div>
  );
}
