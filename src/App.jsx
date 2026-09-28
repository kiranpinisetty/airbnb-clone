import ListingPage from './components/ListingPage';
import listingData from './data/listing.json';

function App() {
  const handleOpenPhotoTour = (photoId) => {
    console.log('Open photo tour requested for photo ID:', photoId);
  };

  return (
    <ListingPage
      listing={listingData}
      onOpenPhotoTour={handleOpenPhotoTour}
    />
  );
}

export default App;
