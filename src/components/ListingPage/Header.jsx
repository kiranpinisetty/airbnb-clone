import './Header.css';

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        {/* Left: Airbnb-style wordmark */}
        <div className="header-left">
          <a href="/" className="header-logo-link" aria-label="Airbnb homepage">
            <svg
              className="header-logo-icon"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.115 12.54 7.1 14.836l.145.353c.667 1.591.91 2.479.96 3.397.085 1.62-.487 3.21-1.611 4.359-1.127 1.15-2.67 1.761-4.349 1.761-1.748 0-3.352-.672-4.639-1.928l-.89-.92-.89.92C15.673 29.328 14.07 30 12.32 30c-1.678 0-3.221-.61-4.348-1.76-1.124-1.15-1.696-2.74-1.611-4.36.05-.918.293-1.806.96-3.397l.145-.353c.985-2.296 5.146-11.006 7.1-14.836l.533-1.025C16.39 1.963 17.844 1 19.852 1H16zm0 2c-1.154 0-2.023.518-3.003 2.274l-.46.883c-1.932 3.785-6.068 12.44-7.037 14.697-.565 1.348-.77 2.062-.809 2.766-.067 1.25.373 2.457 1.218 3.322.844.862 2.007 1.319 3.271 1.319 1.332 0 2.56-.516 3.565-1.498l1.49-1.455.765-.747.765.747 1.49 1.455c1.005.982 2.233 1.498 3.565 1.498 1.264 0 2.427-.457 3.271-1.319.845-.865 1.285-2.072 1.218-3.322-.04-.704-.244-1.418-.81-2.766-.968-2.257-5.104-10.912-7.036-14.697l-.46-.883C17.876 3.518 17.006 3 15.852 3H16zm0 11.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
            </svg>
            <span className="header-logo-text">airbnb</span>
          </a>
        </div>

        {/* Center: pill-shaped search bar */}
        <div className="header-center">
          <div
            className="search-bar"
            role="search"
            aria-label="Search accommodations"
          >
            <button
              type="button"
              className="search-segment search-segment-first"
              aria-label="Search destination: Anywhere"
            >
              <svg
                className="search-house-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Anywhere</span>
            </button>

            <span className="search-divider" aria-hidden="true" />

            <button
              type="button"
              className="search-segment"
              aria-label="Search dates: Anytime"
            >
              <span>Anytime</span>
            </button>

            <span className="search-divider" aria-hidden="true" />

            <button
              type="button"
              className="search-segment search-segment-guests"
              aria-label="Search guests: Add guests"
            >
              <span className="search-guests-placeholder">Add guests</span>
              <span className="search-icon-circle" aria-hidden="true">
                <svg
                  className="search-magnifier-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Right: Become a host + Globe + Menu */}
        <div className="header-right">
          <a href="#become-a-host" className="become-host-link">
            Become a host
          </a>

          <button
            type="button"
            className="header-icon-btn"
            aria-label="Choose a language or region"
          >
            <svg
              className="globe-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </button>

          <button
            type="button"
            className="header-icon-btn header-menu-btn"
            aria-label="Main navigation menu"
          >
            <svg
              className="menu-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
