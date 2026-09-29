import { useState } from 'react';
import { Search, Plus, Minus, ChevronRight, Home } from 'lucide-react';
import './WhereYoullBe.css';

export default function WhereYoullBe({ neighbourhood, location }) {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(2, Number((z + 0.2).toFixed(1))));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(1))));
  };

  const locationText = location
    ? `${location.city}, ${location.state}, ${location.country}`
    : '';

  const neighbourhoodText =
    location?.neighbourhoodHighlight || location?.description || neighbourhood || '';

  return (
    <section className="where-youll-be-section" aria-label="Location and neighbourhood">
      <h2 className="location-main-heading">Where you&apos;ll be</h2>
      <p className="location-address">{locationText}</p>

      {/* SVG Map Canvas */}
      <div className="location-map-container" role="region" aria-label="Map of Candolim area">
        {/* Search button top-left */}
        <button
          type="button"
          className="location-map-search-btn"
          aria-label="Search map location"
        >
          <Search size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>

        {/* Zoom stack top-right */}
        <div className="location-map-zoom-stack">
          <button
            type="button"
            className="location-map-zoom-btn"
            onClick={handleZoomIn}
            disabled={zoom >= 2}
            aria-label="Zoom in on map"
          >
            <Plus size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="location-map-zoom-btn"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            aria-label="Zoom out on map"
          >
            <Minus size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* Scalable SVG Map artwork */}
        <svg
          viewBox="0 0 1120 480"
          className="location-map-svg-layer"
          style={{ transform: `scale(${zoom})` }}
          aria-hidden="true"
        >
          <defs>
            {/* ~90px faint grid pattern */}
            <pattern
              id="map-grid-pattern"
              width="90"
              height="90"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 90 0 L 0 0 0 90"
                fill="none"
                stroke="#dbe3d6"
                strokeWidth="1"
              />
            </pattern>

            {/* Drop shadow for pin */}
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="6"
                floodColor="#000000"
                floodOpacity="0.28"
              />
            </filter>
          </defs>

          {/* Pale green land base (#EAEFE5) */}
          <rect width="1120" height="480" fill="#EAEFE5" />

          {/* Faint grid overlay */}
          <rect width="1120" height="480" fill="url(#map-grid-pattern)" />

          {/* Blue water polygon on the left with diagonal coastline (#B4D2E4) */}
          <path
            d="M 0,0 L 260,0 C 230,110 170,220 200,320 C 220,380 190,440 170,480 L 0,480 Z"
            fill="#B4D2E4"
          />

          {/* Coastal subtle shoreline wave accent */}
          <path
            d="M 260,0 C 230,110 170,220 200,320 C 220,380 190,440 170,480"
            fill="none"
            stroke="#9ec4dc"
            strokeWidth="3"
            strokeDasharray="4 6"
          />

          {/* Translucent green circle overlapping coast (#D5E5CB) */}
          <circle cx="260" cy="300" r="90" fill="#D5E5CB" fillOpacity="0.75" />

          {/* Translucent green circle right of centre (#D5E5CB) */}
          <circle cx="740" cy="240" r="145" fill="#D5E5CB" fillOpacity="0.75" />

          {/* Centred 56px black circular pin with white house icon */}
          <g transform="translate(560, 240)">
            <circle
              cx="0"
              cy="0"
              r="28"
              fill="#222222"
              filter="url(#pin-shadow)"
            />
            {/* White house icon centered in pin */}
            <g transform="translate(-12, -12)">
              <Home size={24} color="#ffffff" strokeWidth={2.2} fill="#ffffff" />
            </g>
          </g>
        </svg>
      </div>

      {/* Details below map */}
      <p className="location-exact-note">
        Exact location will be provided after booking.
      </p>

      <h3 className="location-neighbourhood-title">Neighbourhood highlights</h3>
      <p className="location-neighbourhood-desc">{neighbourhoodText}</p>

      <button
        type="button"
        className="location-show-more-btn"
        aria-label="Show more neighbourhood details"
      >
        <span>Show more</span>
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </section>
  );
}
