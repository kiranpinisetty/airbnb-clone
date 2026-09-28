import Header from './Header';
import TitleRow from './TitleRow';
import HeroGrid from './HeroGrid';
import Summary from './Summary';
import './ListingPage.css';

export default function ListingPage({ listing, onOpenPhotoTour }) {
  if (!listing) return null;

  return (
    <div className="listing-page">
      <Header />
      <main className="listing-main">
        <TitleRow title={listing.title} />
        <HeroGrid
          photos={listing.photos}
          heroPhotoIds={listing.heroPhotoIds}
          onOpenPhotoTour={onOpenPhotoTour}
        />
        <Summary
          propertyType={listing.propertyType}
          capacity={listing.capacity}
        />
      </main>
    </div>
  );
}
