import Header from './Header';
import TitleRow from './TitleRow';
import HeroGrid from './HeroGrid';
import StickyBar from './StickyBar';
import Summary from './Summary';
import GuestFavourite from './GuestFavourite';
import HostRow from './HostRow';
import Highlights from './Highlights';
import Description from './Description';
import Sleeping from './Sleeping';
import AmenitiesPreview from './AmenitiesPreview';
import BookingSidebar from './BookingSidebar';
import './ListingPage.css';

export default function ListingPage({ listing, onOpenPhotoTour }) {
  if (!listing) return null;

  return (
    <div className="listing-page">
      <StickyBar
        price={listing.price}
        rating={listing.rating}
      />
      <Header />
      <main className="listing-main">
        <TitleRow title={listing.title} />
        <HeroGrid
          photos={listing.photos}
          heroPhotoIds={listing.heroPhotoIds}
          onOpenPhotoTour={onOpenPhotoTour}
        />

        <div className="listing-body-grid">
          <div className="listing-left-column">
            <div className="listing-section">
              <Summary
                propertyType={listing.propertyType}
                capacity={listing.capacity}
              />
            </div>

            {listing.guestFavourite && (
              <div className="listing-section">
                <GuestFavourite
                  ratingScore={listing.rating?.score}
                  reviewCount={listing.rating?.reviewCount}
                />
              </div>
            )}

            <div className="listing-section">
              <HostRow host={listing.host} />
            </div>

            <div className="listing-section">
              <Highlights highlights={listing.highlights} />
            </div>

            <div className="listing-section">
              <Description descriptionText={listing.description} />
            </div>

            <div className="listing-section">
              <Sleeping photos={listing.photos} />
            </div>

            <div className="listing-section">
              <AmenitiesPreview />
            </div>

            {/* Anchors for scroll-spy sections */}
            <div id="reviews" className="section-anchor" />
            <div id="location" className="section-anchor" />
          </div>

          <div className="listing-sidebar-wrapper">
            <BookingSidebar price={listing.price} />
          </div>
        </div>
      </main>
    </div>
  );
}
