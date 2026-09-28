import './HeroGrid.css';

// SVG fallback data URI with soft neutral placeholder tone and label
function getFallbackImage(label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="#f0efe9"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="28" fill="#717171" font-weight="500">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function HeroGrid({ photos = [], heroPhotoIds = [], onOpenPhotoTour }) {
  // Build a lookup map by ID
  const photosById = new Map(photos.map((p) => [String(p.id), p]));

  // If heroPhotoIds is provided and not empty, pick photos in that exact order:
  // [big image, top-middle, top-right, bottom-middle, bottom-right]
  const displayPhotos = heroPhotoIds.length > 0
    ? heroPhotoIds.slice(0, 5).map((id, index) => {
        const found = photosById.get(String(id));
        return found || { id: String(id), category: `Photo ${index + 1}`, url: 'PLACEHOLDER' };
      })
    : photos.slice(0, 5);

  const handlePhotoClick = (id) => {
    if (onOpenPhotoTour) {
      onOpenPhotoTour(id);
    }
  };

  // Main big photo (left)
  const mainPhoto = displayPhotos[0];
  // 4 photos on the right:
  // heroPhotoIds order is:
  // 0: big image
  // 1: top-middle (index 0 of subgrid)
  // 2: top-right (index 1 of subgrid)
  // 3: bottom-middle (index 2 of subgrid)
  // 4: bottom-right (index 3 of subgrid)
  const sidePhotos = displayPhotos.slice(1, 5);

  const getImageUrl = (photo) => {
    if (!photo || !photo.url || photo.url === 'PLACEHOLDER') {
      return getFallbackImage(photo ? photo.category : 'Photo');
    }
    // If URL starts with src/assets, in Vite root serving it can be prepended with /
    if (photo.url.startsWith('src/')) {
      return `/${photo.url}`;
    }
    return photo.url;
  };

  return (
    <div id="photos" className="hero-grid-container">
      <div className="hero-grid" role="region" aria-label="Photo gallery preview">
        {/* Main large photo (left side, 50% width) */}
        {mainPhoto && (
          <button
            type="button"
            className="hero-grid-item hero-grid-item-main"
            onClick={() => handlePhotoClick(mainPhoto.id)}
            aria-label={`Open photo 1 of ${photos.length}: ${mainPhoto.category}`}
          >
            <img
              src={getImageUrl(mainPhoto)}
              alt={mainPhoto.alt || mainPhoto.category || 'Primary listing view'}
              className="hero-grid-img"
              loading="eager"
            />
            <span className="hero-grid-overlay" aria-hidden="true" />
          </button>
        )}

        {/* 2x2 grid of four images on the right */}
        <div className="hero-grid-subgrid">
          {sidePhotos.map((photo, index) => {
            const photoNumber = index + 2;
            const positionClass = `hero-grid-item-side-${index}`;
            return (
              <button
                key={photo.id || index}
                type="button"
                className={`hero-grid-item hero-grid-item-side ${positionClass}`}
                onClick={() => handlePhotoClick(photo.id)}
                aria-label={`Open photo ${photoNumber} of ${photos.length}: ${photo.category}`}
              >
                <img
                  src={getImageUrl(photo)}
                  alt={photo.alt || photo.category || `Listing view ${photoNumber}`}
                  className="hero-grid-img"
                  loading="lazy"
                />
                <span className="hero-grid-overlay" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {/* Show all photos button pinned bottom-right */}
        <button
          type="button"
          className="hero-grid-show-all-btn"
          onClick={() => handlePhotoClick(photos[0] ? photos[0].id : null)}
          aria-label={`Show all ${photos.length} photos`}
        >
          <svg
            className="show-all-dots-icon"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="2" cy="2" r="1.5" />
            <circle cx="8" cy="2" r="1.5" />
            <circle cx="14" cy="2" r="1.5" />
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="8" cy="8" r="1.5" />
            <circle cx="14" cy="8" r="1.5" />
            <circle cx="2" cy="14" r="1.5" />
            <circle cx="8" cy="14" r="1.5" />
            <circle cx="14" cy="14" r="1.5" />
          </svg>
          <span>Show all photos</span>
        </button>
      </div>
    </div>
  );
}
