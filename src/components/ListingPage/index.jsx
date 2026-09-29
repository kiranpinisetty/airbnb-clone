import { useState } from 'react';
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
import AmenitiesModal from './AmenitiesModal';
import Calendar from './Calendar';
import BookingSidebar from './BookingSidebar';
import ReviewsSection from './ReviewsSection';
import WhereYoullBe from './WhereYoullBe';
import MeetHost from './MeetHost';
import ThingsToKnow from './ThingsToKnow';
import MoreStays from './MoreStays';
import './ListingPage.css';

export default function ListingPage({ listing, onOpenPhotoTour }) {
  // Default selection: Oct 18, 2026 to Oct 23, 2026 (5 nights)
  const [checkIn, setCheckIn] = useState(() => new Date(2026, 9, 18));
  const [checkOut, setCheckOut] = useState(() => new Date(2026, 9, 23));
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);

  if (!listing) return null;

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)))
      : 0;
  const totalPrice = nights > 0 ? Math.round(5699.8 * nights) : 0;

  return (
    <div className="listing-page">
      <StickyBar
        price={listing.price}
        rating={listing.rating}
        nights={nights}
        totalPrice={totalPrice}
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
              <AmenitiesPreview
                countLabel={listing.amenitiesCountLabel}
                onOpenModal={() => setIsAmenitiesModalOpen(true)}
              />
            </div>

            <div className="listing-section">
              <Calendar
                checkIn={checkIn}
                checkOut={checkOut}
                onDatesChange={(newIn, newOut) => {
                  setCheckIn(newIn);
                  setCheckOut(newOut);
                }}
              />
            </div>
          </div>

          <div className="listing-sidebar-wrapper">
            <BookingSidebar
              price={listing.price}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              totalPrice={totalPrice}
            />
          </div>
        </div>

        {/* Full 1120px Sections Below Two-Column Grid */}
        <div id="reviews" className="listing-full-section">
          <ReviewsSection
            reviews={listing.reviews}
            rating={listing.rating}
          />
        </div>

        <div id="location" className="listing-location-group">
          <div className="listing-location-sub-section">
            <WhereYoullBe
              neighbourhood={listing.neighbourhood}
              location={listing.location}
            />
          </div>

          <div className="listing-location-sub-section">
            <MeetHost
              host={listing.host}
              coHosts={listing.coHosts}
            />
          </div>

          <div className="listing-location-sub-section">
            <ThingsToKnow
              thingsToKnow={listing.thingsToKnow}
              houseRules={listing.houseRules}
              safety={listing.safety}
            />
          </div>

          <div className="listing-location-sub-section">
            <MoreStays
              similarStays={listing.similarStays}
            />
          </div>
        </div>
      </main>

      <AmenitiesModal
        isOpen={isAmenitiesModalOpen}
        onClose={() => setIsAmenitiesModalOpen(false)}
        amenitiesModal={listing.amenitiesModal}
      />
    </div>
  );
}
