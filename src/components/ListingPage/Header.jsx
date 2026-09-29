import logoSvg from '../../assets/logo.svg';
import searchbarHouseImg from '../../assets/searchbar-house.png';
import './Header.css';

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        {/* Left: Airbnb logo */}
        <div className="header-left">
          <a href="/" className="header-logo-link" aria-label="Airbnb homepage">
            <img
              src={logoSvg}
              alt=""
              className="header-logo-icon"
              width="32"
              height="32"
              aria-hidden="true"
            />
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
              <img
                src={searchbarHouseImg}
                alt=""
                className="search-house-icon"
                aria-hidden="true"
              />
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
