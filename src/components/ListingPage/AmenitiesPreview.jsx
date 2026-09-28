import {
  Utensils,
  Wifi,
  Briefcase,
  Car,
  Waves,
  Bath,
  Dog,
  Cctv,
  CircleSlash2,
  BellOff,
} from 'lucide-react';
import './AmenitiesPreview.css';

const AMENITIES_LIST = [
  { icon: Utensils, label: 'Kitchen', struckThrough: false },
  { icon: Wifi, label: 'Wifi', struckThrough: false },
  { icon: Briefcase, label: 'Dedicated workspace', struckThrough: false },
  { icon: Car, label: 'Free parking on premises', struckThrough: false },
  { icon: Waves, label: 'Pool', struckThrough: false },
  { icon: Bath, label: 'Hot tub', struckThrough: false },
  { icon: Dog, label: 'Pets allowed', struckThrough: false },
  { icon: Cctv, label: 'Exterior security cameras on property', struckThrough: false },
  { icon: CircleSlash2, label: 'Carbon monoxide alarm', struckThrough: true },
  { icon: BellOff, label: 'Smoke alarm', struckThrough: true },
];

export default function AmenitiesPreview() {
  return (
    <section id="amenities" className="amenities-preview-section" aria-labelledby="amenities-heading">
      <h2 id="amenities-heading" className="amenities-preview-heading">
        What this place offers
      </h2>

      <div className="amenities-preview-grid">
        {AMENITIES_LIST.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`amenity-item ${item.struckThrough ? 'amenity-item-unavailable' : ''}`}
            >
              <Icon
                size={24}
                strokeWidth={1.75}
                color={item.struckThrough ? '#717171' : '#222222'}
                className="amenity-icon"
                aria-hidden="true"
              />
              <span className={`amenity-label ${item.struckThrough ? 'amenity-label-struck' : ''}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="amenities-show-all-btn"
        aria-label="Show all 50 amenities"
      >
        Show all 50 amenities
      </button>
    </section>
  );
}
