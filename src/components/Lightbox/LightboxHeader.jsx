import './LightboxHeader.css';

export default function LightboxHeader({
  categoryName,
  currentIndex,
  totalCount,
  onClose,
  closeButtonRef
}) {
  return (
    <header className="lightbox-header">
      <div className="lightbox-header-inner">
        <div className="lightbox-header-left">
          <button
            type="button"
            className="lightbox-header-btn"
            onClick={onClose}
            aria-label="Back to photo tour"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              className="lightbox-dots-icon"
            >
              <circle cx="2" cy="2" r="1.5" />
              <circle cx="8" cy="2" r="1.5" />
              <circle cx="14" cy="2" r="1.5" />
              <circle cx="2" cy="8" r="1.5" />
              <circle cx="8" cy="8" r="1.5" />
              <circle cx="14" cy="8" r="1.5" />
              <circle cx="2" cy="14" r="1.5" />
              <circle cx="8" cy="14" r="1.5" />
              <circle cx="14" cy="14" r="1.5" />
            </svg>
          </button>
        </div>

        <div className="lightbox-header-center">
          <span className="lightbox-header-category">{categoryName}</span>
        </div>

        <div className="lightbox-header-right">
          <span className="lightbox-header-counter">
            {`${currentIndex + 1} of ${totalCount}`}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="lightbox-header-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="lightbox-close-icon"
            >
              <path d="M7 7 L25 25 M25 7 L7 25" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
