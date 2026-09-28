import { Tag, ChevronDown, Flag } from 'lucide-react';
import './BookingSidebar.css';

export default function BookingSidebar({ price }) {
  const formattedPrice = price
    ? `${price.currency}${price.amount.toLocaleString('en-IN')}`
    : '₹28,499';
  const nights = price ? price.nights : 5;

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
          <span className="booking-card-price-nights">{` for ${nights} nights`}</span>
        </div>

        {/* Date and Guests Field Box */}
        <div className="booking-fields-box">
          <div className="booking-dates-row">
            <button
              type="button"
              className="booking-field-btn booking-checkin-btn"
              aria-label="Check-in date: 10/18/2026"
            >
              <span className="booking-field-label">CHECK-IN</span>
              <span className="booking-field-value">10/18/2026</span>
            </button>

            <button
              type="button"
              className="booking-field-btn booking-checkout-btn"
              aria-label="Checkout date: 10/23/2026"
            >
              <span className="booking-field-label">CHECKOUT</span>
              <span className="booking-field-value">10/23/2026</span>
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
          <span>
            Free cancellation before <strong>17 October</strong>
          </span>
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
