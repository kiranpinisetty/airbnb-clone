import {
  Star,
  SprayCan,
  CircleCheck,
  KeyRound,
  MessageSquare,
  Map,
  Tag,
} from 'lucide-react';
import laurelLeft from '../../assets/laurel-left.png';
import laurelRight from '../../assets/laurel-right.png';
import { getAsset } from '../../lib/assets';
import './ReviewsSection.css';

const CATEGORY_ICONS = {
  Cleanliness: SprayCan,
  Accuracy: CircleCheck,
  'Check-in': KeyRound,
  Communication: MessageSquare,
  Location: Map,
  Value: Tag,
};

export default function ReviewsSection({ reviews, rating }) {
  if (!reviews) return null;

  const summary = reviews.summary || {
    score: rating?.score || 4.95,
    count: rating?.reviewCount || 19,
    breakdown: { 5: 18, 4: 1, 3: 0, 2: 0, 1: 0 },
    categoryScores: {
      Cleanliness: 5.0,
      Accuracy: 5.0,
      'Check-in': 5.0,
      Communication: 5.0,
      Location: 4.8,
      Value: 4.8,
    },
  };

  const totalReviews = summary.count || 19;
  const breakdown = summary.breakdown || {};
  const chips = reviews.chips || [];
  const items = reviews.items || [];

  return (
    <section className="reviews-section" aria-label="Guest reviews and ratings">
      {/* Centered Laurel + Guest Favourite Block */}
      <div className="reviews-hero-block">
        <div className="reviews-hero-score-row">
          <img
            src={laurelLeft}
            alt=""
            aria-hidden="true"
            className="reviews-laurel-img"
          />
          <span className="reviews-big-score">{summary.score}</span>
          <img
            src={laurelRight}
            alt=""
            aria-hidden="true"
            className="reviews-laurel-img"
          />
        </div>

        <h2 className="reviews-hero-title">Guest favourite</h2>
        <p className="reviews-hero-desc">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>

        <button
          type="button"
          className="reviews-how-work-btn"
          aria-label="Learn how reviews work on Airbnb"
        >
          How reviews work
        </button>
      </div>

      {/* 7-Column Ratings Row */}
      <div className="reviews-ratings-row" aria-label="Detailed category ratings">
        {/* Column 1: Overall rating bar breakdown */}
        <div className="reviews-overall-col">
          <span className="reviews-col-label">Overall rating</span>
          <div className="reviews-bars-list" aria-label="Rating breakdown by star">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = breakdown[star] || 0;
              const fillPct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="reviews-bar-item">
                  <span className="reviews-bar-star-num">{star}</span>
                  <div className="reviews-bar-track">
                    <div
                      className="reviews-bar-fill"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columns 2-7: Specific Category Ratings */}
        {Object.entries(summary.categoryScores || {}).map(([catName, catScore]) => {
          const IconComp = CATEGORY_ICONS[catName] || Tag;
          const formattedScore = typeof catScore === 'number' ? catScore.toFixed(1) : catScore;
          return (
            <div key={catName} className="reviews-cat-col">
              <span className="reviews-col-label">{catName}</span>
              <span className="reviews-cat-score">{formattedScore}</span>
              <IconComp
                size={32}
                strokeWidth={1.5}
                className="reviews-cat-icon"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* Chips Row */}
      {chips.length > 0 && (
        <div className="reviews-chips-scroll" role="region" aria-label="Review topic filters">
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              className="reviews-chip-pill"
              aria-label={`Filter reviews by topic: ${chip.label} (${chip.count})`}
            >
              <img
                src={getAsset(chip.image)}
                alt=""
                className="reviews-chip-img"
                width="24"
                height="24"
                loading="lazy"
              />
              <span className="reviews-chip-label">{chip.label}</span>
              <span className="reviews-chip-count">{chip.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Review Cards Grid */}
      <div className="reviews-cards-grid">
        {items.map((item) => (
          <article key={item.id} className="review-card" aria-label={`Review by ${item.author}`}>
            <div className="review-card-header">
              <div className="review-avatar-box">
                {item.initial ? (
                  <div
                    className="review-avatar-initial"
                    style={{
                      backgroundColor: item.initial.bg,
                      color: item.initial.fg,
                    }}
                  >
                    {item.initial.text}
                  </div>
                ) : (
                  <img
                    src={getAsset(item.photo)}
                    alt=""
                    className="review-avatar-img"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="review-author-meta">
                <span className="review-author-name">{item.author}</span>
                <span className="review-author-tenure">{item.tenure}</span>
              </div>
            </div>

            <div className="review-card-stars-row">
              <div className="review-card-stars" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill="#222222"
                    color="#222222"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="review-card-dot" aria-hidden="true">
                ·
              </span>
              <span className="review-card-date">{item.date}</span>
            </div>

            <p className="review-card-text">{item.text}</p>

            {item.showMore && (
              <button
                type="button"
                className="review-show-more-btn"
                aria-label={`Read full review by ${item.author}`}
              >
                Show more
              </button>
            )}
          </article>
        ))}
      </div>

      {/* Show All Reviews Button */}
      <button
        type="button"
        className="reviews-show-all-btn"
        aria-label={`Show all ${totalReviews} reviews`}
      >
        {`Show all ${totalReviews} reviews`}
      </button>
    </section>
  );
}
