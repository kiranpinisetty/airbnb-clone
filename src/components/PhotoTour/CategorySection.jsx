import PhotoStack from './PhotoStack';
import './CategorySection.css';

export default function CategorySection({
  category,
  photos = [],
  totalPhotosCount,
  allPhotos,
  onOpenLightbox
}) {
  const categoryId = `tour-cat-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const hasTags = Array.isArray(category.tags) && category.tags.length > 0;
  const tagsString = hasTags ? category.tags.join(' · ') : null;

  return (
    <section id={categoryId} className="category-section" aria-labelledby={`${categoryId}-heading`}>
      <div className="category-info-col">
        <div className="category-info-sticky">
          <h2 id={`${categoryId}-heading`} className="category-name">
            {category.name}
          </h2>
          {tagsString && (
            <p className="category-tags">
              {tagsString}
            </p>
          )}
        </div>
      </div>

      <div className="category-photos-col">
        <PhotoStack
          photos={photos}
          totalPhotosCount={totalPhotosCount}
          categoryName={category.name}
          onOpenLightbox={onOpenLightbox}
          allPhotos={allPhotos}
        />
      </div>
    </section>
  );
}
