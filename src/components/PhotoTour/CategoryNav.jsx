import './CategoryNav.css';

export default function CategoryNav({ categories = [], photosById = new Map() }) {
  const handleScrollTo = (categoryName) => {
    const categoryId = `tour-cat-${categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    const targetEl = document.getElementById(categoryId);
    const containerEl = document.querySelector('.photo-tour-overlay');
    if (!targetEl || !containerEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const headerOffset = 96; // accounts for fixed header height
    const targetTop = targetEl.getBoundingClientRect().top - containerEl.getBoundingClientRect().top + containerEl.scrollTop - headerOffset;

    containerEl.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <nav className="category-nav" aria-label="Room categories">
      <div className="category-nav-grid">
        {categories.map((cat) => {
          const thumbPhoto = photosById.get(String(cat.thumbnailPhotoId));
          const thumbUrl = thumbPhoto ? thumbPhoto.url : '';
          const thumbAlt = thumbPhoto ? thumbPhoto.alt || `${cat.name} preview` : cat.name;

          return (
            <button
              key={cat.name}
              type="button"
              className="category-nav-item"
              onClick={() => handleScrollTo(cat.name)}
              aria-label={`Jump to ${cat.name}`}
            >
              <div className="category-nav-thumb-box">
                {thumbUrl ? (
                  <img
                    src={thumbUrl}
                    alt={thumbAlt}
                    className="category-nav-thumb-img"
                    loading="lazy"
                    decoding="async"
                    width="111"
                    height="105"
                  />
                ) : (
                  <div className="category-nav-thumb-placeholder" />
                )}
              </div>
              <span className="category-nav-label">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
