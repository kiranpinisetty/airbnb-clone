import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAsset } from '../../lib/assets';
import './MoreStays.css';

export default function MoreStays({ similarStays = [] }) {
  const [page, setPage] = useState(1);
  const totalPages = 2;

  const handlePrev = () => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((p) => p + 1);
    }
  };

  // 3 cards shifted = 3 * (208px + 20px) = 684px
  const shiftOffset = (page - 1) * 684;

  return (
    <section className="more-stays-section" aria-label="More stays nearby">
      <div className="more-stays-header-row">
        <h2 className="more-stays-heading">More stays nearby</h2>

        <div className="more-stays-controls">
          <span className="more-stays-counter" aria-live="polite">
            {`${page} / ${totalPages}`}
          </span>

          <div className="more-stays-arrow-btns">
            <button
              type="button"
              className="more-stays-arrow-btn"
              onClick={handlePrev}
              disabled={page === 1}
              aria-disabled={page === 1 ? 'true' : undefined}
              tabIndex={page === 1 ? -1 : 0}
              aria-label="Previous stays"
            >
              <ChevronLeft size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="more-stays-arrow-btn"
              onClick={handleNext}
              disabled={page === totalPages}
              aria-disabled={page === totalPages ? 'true' : undefined}
              tabIndex={page === totalPages ? -1 : 0}
              aria-label="Next stays"
            >
              <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="more-stays-track-viewport">
        <div
          className="more-stays-track"
          style={{ transform: `translateX(-${shiftOffset}px)` }}
        >
          {similarStays.map((stay) => {
            const formattedPrice = `₹${Number(stay.price).toLocaleString('en-IN')}`;
            const formattedRating = typeof stay.rating === 'number'
              ? (stay.rating % 1 === 0 ? `${stay.rating}.0` : `${stay.rating}`)
              : stay.rating;

            return (
              <a
                key={stay.id}
                href={`#stay-${stay.id}`}
                className="more-stay-card"
                aria-label={`${stay.title}, ${formattedPrice} per night, rated ${formattedRating} stars`}
              >
                <div className="more-stay-img-box">
                  <img
                    src={getAsset(stay.photo)}
                    alt=""
                    className="more-stay-img"
                    width="208"
                    height="208"
                    loading="lazy"
                  />
                </div>

                <h3 className="more-stay-title">{stay.title}</h3>

                <div className="more-stay-info-row">
                  <span className="more-stay-price">{formattedPrice}</span>
                  <span className="more-stay-rating">
                    <span aria-hidden="true">★</span>
                    <span>{formattedRating}</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
