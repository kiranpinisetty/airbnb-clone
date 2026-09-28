import './Sleeping.css';

export default function Sleeping({ photos = [] }) {
  // Find real images from listing.json
  const bedroomPhoto = photos.find((p) => p.category === 'Bedroom') || photos[0];
  const livingRoomPhoto =
    photos.find((p) => p.category === 'Living room 1') ||
    photos.find((p) => p.category === 'Living room 2') ||
    photos[1];

  const sleepingCards = [
    {
      title: 'Bedroom',
      bedType: '1 double bed',
      photo: bedroomPhoto,
    },
    {
      title: 'Living room',
      bedType: '1 sofa',
      photo: livingRoomPhoto,
    },
  ];

  return (
    <section className="sleeping-section" aria-labelledby="sleeping-heading">
      <h2 id="sleeping-heading" className="sleeping-heading">
        Where you&apos;ll sleep
      </h2>

      <div className="sleeping-cards-container">
        {sleepingCards.map((card) => (
          <div key={card.title} className="sleeping-card">
            <div className="sleeping-card-img-box">
              {card.photo ? (
                <img
                  src={card.photo.url}
                  alt={card.photo.alt || `${card.title} sleeping space`}
                  className="sleeping-card-img"
                  loading="lazy"
                />
              ) : (
                <div className="sleeping-card-placeholder" />
              )}
            </div>

            <div className="sleeping-card-info">
              <h3 className="sleeping-card-title">{card.title}</h3>
              <p className="sleeping-card-subtitle">{card.bedType}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
