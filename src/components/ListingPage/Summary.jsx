import './Summary.css';

export default function Summary({ propertyType, capacity }) {
  // Format capacity details: e.g., "3 guests · 1 bedroom · 1 bed · 1 bathroom"
  const details = [];

  if (capacity) {
    if (capacity.guests) {
      details.push(`${capacity.guests} ${capacity.guests === 1 ? 'guest' : 'guests'}`);
    }
    if (capacity.bedrooms) {
      details.push(`${capacity.bedrooms} ${capacity.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`);
    }
    if (capacity.beds) {
      details.push(`${capacity.beds} ${capacity.beds === 1 ? 'bed' : 'beds'}`);
    }
    if (capacity.bathrooms) {
      details.push(`${capacity.bathrooms} ${capacity.bathrooms === 1 ? 'bathroom' : 'bathrooms'}`);
    }
  }

  const detailsString = details.join(' · ');

  return (
    <section className="property-summary" aria-label="Property summary">
      <h2 className="summary-heading">{propertyType}</h2>
      {detailsString && <p className="summary-details">{detailsString}</p>}
    </section>
  );
}
