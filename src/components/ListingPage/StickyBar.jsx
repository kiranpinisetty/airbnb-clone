import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import './StickyBar.css';

const SECTIONS = [
  { id: 'photos', label: 'Photos' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
];

export default function StickyBar({ price, rating }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('photos');

  // Use IntersectionObserver to toggle visibility when hero grid top leaves/enters viewport
  useEffect(() => {
    const heroEl = document.getElementById('photos');
    if (!heroEl) return;

    // Observe when the top of the hero grid leaves the viewport
    // rootMargin: '-1px 0px 0px 0px' so when the top crosses the top of viewport, observer fires
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // If boundingClientRect.top < 0 and it is intersecting or past the top
        setIsVisible(entry.boundingClientRect.top < 0);
      },
      {
        root: null,
        threshold: [0],
        rootMargin: '-1px 0px 0px 0px',
      }
    );

    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  // Use requestAnimationFrame-throttled scroll handler for scroll-spy section tracking
  useEffect(() => {
    let rafId = null;

    const updateActiveSection = () => {
      const barHeight = 66;
      let current = 'photos';

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= barHeight + 60) {
            current = section.id;
          }
        }
      }

      setActiveSection((prev) => (prev !== current ? current : prev));
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

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

  const formattedAmount = price ? `${price.currency}${price.amount.toLocaleString('en-IN')}` : '₹28,499';
  const nights = price ? price.nights : 5;
  const ratingScore = rating ? rating.score : 4.95;
  const reviewCount = rating ? rating.reviewCount : 19;

  return (
    <aside
      className={`sticky-bar ${isVisible ? 'sticky-bar-visible' : 'sticky-bar-hidden'}`}
      aria-label="Section navigation and quick booking"
      aria-hidden={!isVisible ? 'true' : undefined}
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
                tabIndex={isVisible ? 0 : -1}
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
              <span className="sticky-bar-nights">{` for ${nights} nights`}</span>
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
            tabIndex={isVisible ? 0 : -1}
          >
            Reserve
          </button>
        </div>
      </div>
    </aside>
  );
}
