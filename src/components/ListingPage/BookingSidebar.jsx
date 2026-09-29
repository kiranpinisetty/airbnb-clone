import { useState, useRef, useEffect } from 'react';
import { Tag, ChevronDown, ChevronUp, Flag, Minus, Plus } from 'lucide-react';
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
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const guestPickerRef = useRef(null);

  // Close guest picker when clicking outside or pressing Escape
  useEffect(() => {
    if (!isGuestOpen) return;

    const handleClickOutside = (e) => {
      if (guestPickerRef.current && !guestPickerRef.current.contains(e.target)) {
        setIsGuestOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsGuestOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGuestOpen]);

  const totalGuests = guests.adults + guests.children;
  const maxGuests = 3; // From property capacity

  const guestSummary = (() => {
    const parts = [];
    parts.push(`${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`);
    if (guests.infants > 0) {
      parts.push(`${guests.infants} ${guests.infants === 1 ? 'infant' : 'infants'}`);
    }
    if (guests.pets > 0) {
      parts.push(`${guests.pets} ${guests.pets === 1 ? 'pet' : 'pets'}`);
    }
    return parts.join(', ');
  })();

  const handleGuestChange = (type, delta) => {
    setGuests((prev) => {
      const next = { ...prev };
      if (type === 'adults') {
        const val = prev.adults + delta;
        if (val >= 1 && val + prev.children <= maxGuests) {
          next.adults = val;
        }
      } else if (type === 'children') {
        const val = prev.children + delta;
        if (val >= 0 && prev.adults + val <= maxGuests) {
          next.children = val;
        }
      } else if (type === 'infants') {
        const val = prev.infants + delta;
        if (val >= 0 && val <= 5) {
          next.infants = val;
        }
      } else if (type === 'pets') {
        const val = prev.pets + delta;
        if (val >= 0 && val <= 2) {
          next.pets = val;
        }
      }
      return next;
    });
  };

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
        <div className="booking-fields-box" ref={guestPickerRef}>
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

          <div className="booking-guests-control-wrapper">
            <button
              type="button"
              className="booking-field-btn booking-guests-btn"
              aria-label={`Guests: ${guestSummary}`}
              aria-expanded={isGuestOpen}
              onClick={() => setIsGuestOpen((prev) => !prev)}
            >
              <div className="booking-guests-content">
                <span className="booking-field-label">GUESTS</span>
                <span className="booking-field-value">{guestSummary}</span>
              </div>
              {isGuestOpen ? (
                <ChevronUp size={18} color="#222222" aria-hidden="true" />
              ) : (
                <ChevronDown size={18} color="#222222" aria-hidden="true" />
              )}
            </button>

            {/* Interactive Guest Stepper Popover */}
            {isGuestOpen && (
              <div className="booking-guest-popover" role="dialog" aria-label="Guest selection">
                {/* Adults */}
                <div className="guest-popover-row">
                  <div className="guest-popover-text">
                    <span className="guest-popover-title">Adults</span>
                    <span className="guest-popover-subtitle">Age 13+</span>
                  </div>
                  <div className="guest-popover-stepper">
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={guests.adults <= 1}
                      onClick={() => handleGuestChange('adults', -1)}
                      aria-label="Decrease adults"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="guest-stepper-count">{guests.adults}</span>
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={totalGuests >= maxGuests}
                      onClick={() => handleGuestChange('adults', 1)}
                      aria-label="Increase adults"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="guest-popover-row">
                  <div className="guest-popover-text">
                    <span className="guest-popover-title">Children</span>
                    <span className="guest-popover-subtitle">Ages 2–12</span>
                  </div>
                  <div className="guest-popover-stepper">
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={guests.children <= 0}
                      onClick={() => handleGuestChange('children', -1)}
                      aria-label="Decrease children"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="guest-stepper-count">{guests.children}</span>
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={totalGuests >= maxGuests}
                      onClick={() => handleGuestChange('children', 1)}
                      aria-label="Increase children"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="guest-popover-row">
                  <div className="guest-popover-text">
                    <span className="guest-popover-title">Infants</span>
                    <span className="guest-popover-subtitle">Under 2</span>
                  </div>
                  <div className="guest-popover-stepper">
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={guests.infants <= 0}
                      onClick={() => handleGuestChange('infants', -1)}
                      aria-label="Decrease infants"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="guest-stepper-count">{guests.infants}</span>
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={guests.infants >= 5}
                      onClick={() => handleGuestChange('infants', 1)}
                      aria-label="Increase infants"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="guest-popover-row">
                  <div className="guest-popover-text">
                    <span className="guest-popover-title">Pets</span>
                    <span className="guest-popover-subtitle">Bringing a service animal?</span>
                  </div>
                  <div className="guest-popover-stepper">
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={guests.pets <= 0}
                      onClick={() => handleGuestChange('pets', -1)}
                      aria-label="Decrease pets"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="guest-stepper-count">{guests.pets}</span>
                    <button
                      type="button"
                      className="guest-stepper-btn"
                      disabled={guests.pets >= 2}
                      onClick={() => handleGuestChange('pets', 1)}
                      aria-label="Increase pets"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="guest-popover-footer">
                  <button
                    type="button"
                    className="guest-popover-close-btn"
                    onClick={() => setIsGuestOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
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
