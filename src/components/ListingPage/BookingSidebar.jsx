import { Tag, ChevronDown, Flag } from 'lucide-react';
import './BookingSidebar.css';

function formatSlashDate(d) {
  if (!d) return 'Add date';
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const y = d.getFullYear();
  return `${m}/${day}/${y}`;
}

export default function BookingSidebar({
  price,
  checkIn,
  checkOut,
  nights = 5,
  totalPrice,
}) {
  const hasDates = Boolean(checkIn && checkOut && nights > 0);
  const formattedPrice = hasDates
    ? `₹${totalPrice.toLocaleString('en-IN')}`
    : price && price.amount
    ? `${price.currency}${price.amount.toLocaleString('en-IN')}`
    : 'Add dates for prices';

  // Cancellation date calculation (day before check-in)
  let cancelText = 'Free cancellation available';
  if (checkIn) {
    const cancelDate = new Date(checkIn);
    cancelDate.setDate(cancelDate.getDate() - 1);
    const cancelDay = cancelDate.getDate();
    const cancelMonth = cancelDate.toLocaleString('en-US', { month: 'long' });
    cancelText = (
      <span>
        Free cancellation before <strong>{`${cancelDay} ${cancelMonth}`}</strong>
      </span>
    );
  }

  const checkInText = formatSlashDate(checkIn);
  const checkOutText = formatSlashDate(checkOut);

  return (
    <aside className="booking-sidebar" aria-label="Booking and reservation">
      {/* 10% Claim banner */}
      <div className="claim-banner">
        <div className="claim-banner-left">
          <Tag size={20} color="#008a05" className="claim-tag-icon" aria-hidden="true" />
          <div className="claim-banner-text">
            <span>Get 10% off your next stay.{' '}</span>
            <button
              type="button"
              className="claim-terms-btn"
              aria-label="Terms apply for 10% discount"
            >
              Terms apply
            </button>
          </div>
        </div>

        <button
          type="button"
          className="claim-action-btn"
          aria-label="Claim 10% off promotion"
        >
          Claim
        </button>
      </div>

      {/* Booking Card */}
      <div className="booking-card">
        <div className="booking-card-price-header">
          <span className="booking-card-price-amount">{formattedPrice}</span>
          {hasDates && (
            <span className="booking-card-price-nights">{` for ${nights} ${
              nights === 1 ? 'night' : 'nights'
            }`}</span>
          )}
        </div>

        {/* Date and Guests Field Box */}
        <div className="booking-fields-box">
          <div className="booking-dates-row">
            <button
              type="button"
              className="booking-field-btn booking-checkin-btn"
              aria-label={`Check-in date: ${checkInText}`}
            >
              <span className="booking-field-label">CHECK-IN</span>
              <span className="booking-field-value">{checkInText}</span>
            </button>

            <button
              type="button"
              className="booking-field-btn booking-checkout-btn"
              aria-label={`Checkout date: ${checkOutText}`}
            >
              <span className="booking-field-label">CHECKOUT</span>
              <span className="booking-field-value">{checkOutText}</span>
            </button>
          </div>

          <button
            type="button"
            className="booking-field-btn booking-guests-btn"
            aria-label="Guests: 2 guests"
          >
            <div className="booking-guests-content">
              <span className="booking-field-label">GUESTS</span>
              <span className="booking-field-value">2 guests</span>
            </div>
            <ChevronDown size={18} color="#222222" aria-hidden="true" />
          </button>
        </div>

        {/* Free cancellation pill */}
        <div className="booking-cancellation-pill">
          {typeof cancelText === 'string' ? <span>{cancelText}</span> : cancelText}
        </div>

        {/* Reserve CTA */}
        <button
          type="button"
          className="booking-reserve-cta"
          aria-label="Reserve this listing"
        >
          Reserve
        </button>

        <p className="booking-no-charge-note">You won&apos;t be charged yet</p>
      </div>

      {/* Report this listing */}
      <div className="booking-report-wrapper">
        <button
          type="button"
          className="booking-report-btn"
          aria-label="Report this listing to Airbnb"
        >
          <Flag size={14} color="#717171" aria-hidden="true" />
          <span>Report this listing</span>
        </button>
      </div>
    </aside>
  );
}
