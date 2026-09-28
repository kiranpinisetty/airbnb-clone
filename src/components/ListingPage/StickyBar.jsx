import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './StickyBar.css';

const SECTIONS = [
  { id: 'photos', label: 'Photos' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
];

export default function StickyBar({
  price,
  rating,
  nights: propNights,
  totalPrice: propTotalPrice,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('photos');

  // 1. Observe summary sentinel to toggle StickyBar visibility (no scroll-event setState)
  useEffect(() => {
    const sentinel = document.getElementById('summary-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sticky bar appears once the summary heading sentinel has scrolled above top of viewport
        const isPastSentinel = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setIsVisible(isPastSentinel);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, []);

  // 2. Observe sections with IntersectionObserver for scroll-spy (no per-scroll setState)
  useEffect(() => {
    const sectionIds = ['photos', 'amenities', 'reviews', 'location'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const intersectingMap = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingMap.set(entry.target.id, entry);
          } else {
            intersectingMap.delete(entry.target.id);
          }
        });

        // Determine active section:
        // Pick the lowest section in document order whose top has reached the bar zone (<= 90px)
        let active = null;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const entry = intersectingMap.get(id);
          if (entry && entry.boundingClientRect.top <= 90) {
            active = id;
            break;
          }
        }

        // Fallback: if at the top of the page before 90px boundary
        if (!active && intersectingMap.size > 0) {
          for (const id of sectionIds) {
            if (intersectingMap.has(id)) {
              active = id;
              break;
            }
          }
        }

        if (active) {
          setActiveSection(active);
        }
      },
      {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 0.1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nights = propNights !== undefined ? propNights : (price ? price.nights : 5);
  const totalPrice = propTotalPrice !== undefined ? propTotalPrice : (price ? price.amount : 28499);
  const hasDates = nights > 0;
  const formattedAmount = hasDates
    ? `₹${totalPrice.toLocaleString('en-IN')}`
    : 'Add dates for prices';
  const nightsText = hasDates ? ` for ${nights} ${nights === 1 ? 'night' : 'nights'}` : '';
  const ratingScore = rating ? rating.score : 4.95;
  const reviewCount = rating ? rating.reviewCount : 19;

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;

    const barHeight = 66;
    const targetTop = el.getBoundingClientRect().top + window.pageYOffset - barHeight;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: targetTop,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <aside
      className={`sticky-bar ${isVisible ? 'sticky-bar-visible' : 'sticky-bar-hidden'}`}
      aria-label="Section navigation and quick booking"
      aria-hidden={!isVisible}
      inert={!isVisible ? '' : undefined}
    >
      <div className="sticky-bar-inner">
        <nav className="sticky-bar-nav" aria-label="Page sections">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`sticky-bar-link ${isActive ? 'sticky-bar-link-active' : ''}`}
                onClick={(e) => handleLinkClick(e, sec.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                {sec.label}
              </a>
            );
          })}
        </nav>

        <div className="sticky-bar-booking">
          <div className="sticky-bar-price-block">
            <div className="sticky-bar-price-line">
              <span className="sticky-bar-amount">{formattedAmount}</span>
              {nightsText && (
                <span className="sticky-bar-nights">{nightsText}</span>
              )}
            </div>
            <div className="sticky-bar-rating-line">
              <Star size={12} fill="#222222" color="#222222" aria-hidden="true" />
              <span>{`${ratingScore} · `}</span>
              <span className="sticky-bar-reviews-count">{`${reviewCount} reviews`}</span>
            </div>
          </div>

          <button
            type="button"
            className="sticky-bar-reserve-btn"
            aria-label="Reserve listing"
          >
            Reserve
          </button>
        </div>
      </div>
    </aside>
  );
}
