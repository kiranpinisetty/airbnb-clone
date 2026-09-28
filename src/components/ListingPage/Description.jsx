import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import './Description.css';

export default function Description({ descriptionText }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="listing-description-container">
      {/* Translation notice */}
      <div className="translation-notice">
        <span className="translation-notice-text">
          Some info has been automatically translated.{' '}
        </span>
        <button
          type="button"
          className="translation-show-original-btn"
          aria-label="Show original untranslated text"
        >
          Show original
        </button>
      </div>

      {/* Description text with 4-line clamp and fade when collapsed */}
      <div className="description-text-wrapper">
        <p
          className={`description-body ${
            isExpanded ? 'description-body-expanded' : 'description-body-collapsed'
          }`}
        >
          {descriptionText}
        </p>

        {!isExpanded && <div className="description-fade-overlay" aria-hidden="true" />}
      </div>

      {/* Expand / Collapse toggle button */}
      <button
        type="button"
        className="description-toggle-btn"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
      >
        <span>{isExpanded ? 'Show less' : 'Show more'}</span>
        {isExpanded ? (
          <ChevronDown size={18} strokeWidth={2.5} aria-hidden="true" />
        ) : (
          <ChevronRight size={18} strokeWidth={2.5} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
