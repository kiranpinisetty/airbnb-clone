import './PhotoStack.css';

export default function PhotoStack({
  photos = [],
  totalPhotosCount = 42,
  categoryName = '',
  onOpenLightbox,
  allPhotos = []
}) {
  // Compute global index for each photo so aria-label reads "Open photo N of 42: <room name>"
  const getGlobalIndex = (photo) => {
    const idx = allPhotos.findIndex((p) => String(p.id) === String(photo.id));
    return idx !== -1 ? idx + 1 : 1;
  };

  // Group photos into pattern: 1 full-width (3:2) then 2 half-width side-by-side
  // Remaining: 1 leftover is full-width, 2 leftovers are two halves
  const groups = [];
  let i = 0;
  while (i < photos.length) {
    const remaining = photos.length - i;
    if (remaining === 1) {
      groups.push({ type: 'single', items: [photos[i]] });
      i += 1;
    } else if (remaining === 2) {
      groups.push({ type: 'pair', items: [photos[i], photos[i + 1]] });
      i += 2;
    } else {
      // Pick 1 single, then if more left, pick 2 as pair
      groups.push({ type: 'single', items: [photos[i]] });
      groups.push({ type: 'pair', items: [photos[i + 1], photos[i + 2]] });
      i += 3;
    }
  }

  return (
    <div className="photo-stack">
      {groups.map((group, groupIndex) => {
        if (group.type === 'single') {
          const photo = group.items[0];
          const photoNumber = getGlobalIndex(photo);
          return (
            <div key={photo.id || groupIndex} className="photo-stack-full">
              <button
                id={`photo-tour-btn-${photo.id}`}
                type="button"
                className="photo-stack-btn photo-stack-btn-full"
                onClick={() => onOpenLightbox && onOpenLightbox(photo.id)}
                aria-label={`Open photo ${photoNumber} of ${totalPhotosCount}: ${categoryName}`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || `${categoryName} view`}
                  loading="lazy"
                  decoding="async"
                  width="458"
                  height="305"
                  className="photo-stack-img"
                />
                <span className="photo-stack-overlay" aria-hidden="true" />
              </button>
            </div>
          );
        }

        return (
          <div key={groupIndex} className="photo-stack-row-pair">
            {group.items.map((photo) => {
              const photoNumber = getGlobalIndex(photo);
              return (
                <button
                  id={`photo-tour-btn-${photo.id}`}
                  key={photo.id}
                  type="button"
                  className="photo-stack-btn photo-stack-btn-half"
                  onClick={() => onOpenLightbox && onOpenLightbox(photo.id)}
                  aria-label={`Open photo ${photoNumber} of ${totalPhotosCount}: ${categoryName}`}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt || `${categoryName} view`}
                    loading="lazy"
                    decoding="async"
                    width="223"
                    height="149"
                    className="photo-stack-img"
                  />
                  <span className="photo-stack-overlay" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
