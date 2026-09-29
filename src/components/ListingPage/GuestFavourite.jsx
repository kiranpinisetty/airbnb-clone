import { Star } from 'lucide-react';
import laurelLeft from '../../assets/laurel-left.png';
import laurelRight from '../../assets/laurel-right.png';
import './GuestFavourite.css';

export default function GuestFavourite({ ratingScore = 4.95, reviewCount = 19 }) {
  return (
    <section className="guest-favourite-card" aria-label="Guest favourite highlights">
      <div className="guest-favourite-left">
        <div className="guest-favourite-badge">
          <img
            src={laurelLeft}
            alt=""
            aria-hidden="true"
            className="guest-favourite-laurel-img"
          />
          <div className="guest-favourite-title">
            <span>Guest</span>
            <span>favourite</span>
          </div>
          <img
            src={laurelRight}
            alt=""
            aria-hidden="true"
            className="guest-favourite-laurel-img"
          />
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
