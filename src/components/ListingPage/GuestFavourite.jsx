import { Star } from 'lucide-react';
import './GuestFavourite.css';

export default function GuestFavourite({ ratingScore = 4.95, reviewCount = 19 }) {
  return (
    <section className="guest-favourite-card" aria-label="Guest favourite highlights">
      <div className="guest-favourite-left">
        <div className="guest-favourite-badge">
          {/* Stylized Laurel Branch Leaf Motif */}
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            className="guest-favourite-laurel-icon"
          >
            <path d="M12.5 4C9.5 8 9.5 14 13 18C13.5 13 15 8 18 5C15 4.5 13.5 4.2 12.5 4ZM8 10C5 13 4.5 19 8 23C8.5 18 10.5 14 14 11.5C11 10.5 9 10 8 10ZM6 20C4 23 4 27.5 7 30C7.2 25.5 9.5 22 13 20C10 20 7.5 20 6 20Z" />
          </svg>
          <div className="guest-favourite-title">
            <span>Guest</span>
            <span>favourite</span>
          </div>
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            className="guest-favourite-laurel-icon guest-favourite-laurel-flip"
          >
            <path d="M12.5 4C9.5 8 9.5 14 13 18C13.5 13 15 8 18 5C15 4.5 13.5 4.2 12.5 4ZM8 10C5 13 4.5 19 8 23C8.5 18 10.5 14 14 11.5C11 10.5 9 10 8 10ZM6 20C4 23 4 27.5 7 30C7.2 25.5 9.5 22 13 20C10 20 7.5 20 6 20Z" />
          </svg>
        </div>

        <p className="guest-favourite-subtitle">
          One of the most loved homes on Airbnb, according to guests
        </p>
      </div>

      <div className="guest-favourite-right">
        <div className="guest-favourite-stat">
          <span className="guest-favourite-stat-number">{ratingScore}</span>
          <div className="guest-favourite-stars" aria-label={`Rated ${ratingScore} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="#222222" color="#222222" aria-hidden="true" />
            ))}
          </div>
        </div>

        <div className="guest-favourite-divider" aria-hidden="true" />

        <div className="guest-favourite-stat">
          <span className="guest-favourite-stat-number">{reviewCount}</span>
          <span className="guest-favourite-stat-label">Reviews</span>
        </div>
      </div>
    </section>
  );
}
