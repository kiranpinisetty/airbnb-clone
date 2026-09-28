import { useEffect, useRef } from 'react';
import {
  Wind,
  Sparkles,
  Droplets,
  Flame,
  ShowerHead,
  WashingMachine,
  Shirt,
  Bed,
  Blinds,
  Package,
  Baby,
  Tv,
  AirVent,
  Fan,
  Cctv,
  ShieldAlert,
  Wifi,
  Laptop,
  Utensils,
  Refrigerator,
  Snowflake,
  Microwave,
  Soup,
  UtensilsCrossed,
  Coffee,
  Wine,
  Blend,
  ChefHat,
  DoorOpen,
  Sun,
  Car,
  Waves,
  Bath,
  Dumbbell,
  PawPrint,
  Calendar,
  KeyRound,
  X,
  HelpCircle,
} from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './AmenitiesModal.css';

const ICON_MAP = {
  Wind,
  Sparkles,
  Droplets,
  Flame,
  ShowerHead,
  WashingMachine,
  Shirt,
  Bed,
  Blinds,
  Package,
  Baby,
  Tv,
  AirVent,
  Fan,
  Cctv,
  ShieldAlert,
  Wifi,
  Laptop,
  Utensils,
  Refrigerator,
  Snowflake,
  Microwave,
  Soup,
  UtensilsCrossed,
  Coffee,
  Wine,
  Blend,
  ChefHat,
  DoorOpen,
  Sun,
  Car,
  Waves,
  Bath,
  Dumbbell,
  PawPrint,
  Calendar,
  KeyRound,
};

export default function AmenitiesModal({ isOpen, onClose, amenitiesModal }) {
  const closeButtonRef = useRef(null);
  const containerRef = useFocusTrap(isOpen, closeButtonRef);
  useBodyScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !amenitiesModal) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="amenities-modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={containerRef}
        className="amenities-modal-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="amenities-modal-title"
      >
        <div className="amenities-modal-header">
          <button
            ref={closeButtonRef}
            type="button"
            className="amenities-modal-close-btn"
            onClick={onClose}
            aria-label="Close amenities modal"
          >
            <X size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <div className="amenities-modal-content">
          <h2 id="amenities-modal-title" className="amenities-modal-title">
            What this place offers
          </h2>

          {Object.entries(amenitiesModal).map(([category, items]) => (
            <div key={category} className="amenities-modal-section">
              <h3 className="amenities-modal-section-title">{category}</h3>
              <div className="amenities-modal-section-items">
                {items.map((item, idx) => {
                  const Icon = ICON_MAP[item.icon] || HelpCircle;
                  return (
                    <div
                      key={`${category}-${item.name}-${idx}`}
                      className="amenities-modal-item-row"
                    >
                      <div className="amenities-modal-item-icon-wrapper">
                        <Icon
                          size={24}
                          strokeWidth={1.5}
                          color="#222222"
                          aria-hidden="true"
                        />
                        {item.unavailable && (
                          <svg
                            className="amenities-modal-icon-slash"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <line
                              x1="3"
                              y1="21"
                              x2="21"
                              y2="3"
                              stroke="#222222"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`amenities-modal-item-label ${
                          item.unavailable ? 'unavailable' : ''
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
