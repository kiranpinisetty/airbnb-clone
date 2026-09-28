import './TourHeader.css';

export default function TourHeader({ backButtonRef, onClose }) {
  return (
    <header className="tour-header">
      <div className="tour-header-inner">
        <div className="tour-header-left">
          <button
            ref={backButtonRef}
            type="button"
            className="tour-header-icon-btn"
            onClick={onClose}
            aria-label="Back to listing"
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
              className="tour-header-chevron-icon"
            >
              <path d="M20 26 L10 16 L20 6" />
            </svg>
          </button>
        </div>

        <h1 className="tour-header-title">Photo tour</h1>

        <div className="tour-header-right">
          <button
            type="button"
            className="tour-header-icon-btn"
            aria-label="Share this listing"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="tour-header-action-icon"
            >
              <path d="M16 4 L16 20 M16 4 L10 10 M16 4 L22 10 M6 16 L6 26 A2 2 0 0 0 8 28 L24 28 A2 2 0 0 0 26 26 L26 16" />
            </svg>
          </button>

          <button
            type="button"
            className="tour-header-icon-btn"
            aria-label="Save this listing"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              className="tour-header-action-icon"
            >
              <path d="M16 28 C16 28 3 20 3 11 A7.5 7.5 0 0 1 16 7.5 A7.5 7.5 0 0 1 29 11 C29 20 16 28 16 28 Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
