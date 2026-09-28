import { CalendarX, KeyRound, Shield } from 'lucide-react';
import './ThingsToKnow.css';

export default function ThingsToKnow({ thingsToKnow }) {
  const cancellationRules = thingsToKnow?.cancellation || [
    'Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.',
    "Review this host's full policy for details.",
  ];

  const houseRules = thingsToKnow?.houseRules || [
    'Check-in: 2:00 PM – 10:00 PM',
    'Checkout: 11:00 AM',
    'No smoking',
    'No parties or events',
    'Pets allowed',
  ];

  const safetyRules = thingsToKnow?.safety || [
    'Exterior security cameras on property',
    'Carbon monoxide alarm',
    'Smoke alarm',
    'Fire extinguisher',
  ];

  return (
    <section className="things-to-know-section" aria-label="Important information about the listing">
      <h2 className="things-to-know-heading">Things to know</h2>

      <div className="things-to-know-grid">
        {/* Column 1: Cancellation policy */}
        <div className="things-to-know-col">
          <CalendarX
            size={24}
            strokeWidth={1.8}
            className="things-to-know-icon"
            aria-hidden="true"
          />
          <h3 className="things-to-know-col-title">Cancellation policy</h3>
          <div className="things-to-know-lines">
            {cancellationRules.map((rule, idx) => (
              <p key={idx} className="things-to-know-line">
                {rule}
              </p>
            ))}
          </div>
          <button
            type="button"
            className="things-to-know-learn-more-btn"
            aria-label="Learn more about the cancellation policy"
          >
            Learn more
          </button>
        </div>

        {/* Column 2: House rules */}
        <div className="things-to-know-col">
          <KeyRound
            size={24}
            strokeWidth={1.8}
            className="things-to-know-icon"
            aria-hidden="true"
          />
          <h3 className="things-to-know-col-title">House rules</h3>
          <div className="things-to-know-lines">
            {houseRules.map((rule, idx) => (
              <p key={idx} className="things-to-know-line">
                {rule}
              </p>
            ))}
          </div>
          <button
            type="button"
            className="things-to-know-learn-more-btn"
            aria-label="Learn more about the house rules"
          >
            Learn more
          </button>
        </div>

        {/* Column 3: Safety & property */}
        <div className="things-to-know-col">
          <Shield
            size={24}
            strokeWidth={1.8}
            className="things-to-know-icon"
            aria-hidden="true"
          />
          <h3 className="things-to-know-col-title">Safety & property</h3>
          <div className="things-to-know-lines">
            {safetyRules.map((rule, idx) => (
              <p key={idx} className="things-to-know-line">
                {rule}
              </p>
            ))}
          </div>
          <button
            type="button"
            className="things-to-know-learn-more-btn"
            aria-label="Learn more about safety and property features"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
