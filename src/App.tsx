import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import Header from '@/components/Header';
import RestaurantList from '@/components/RestaurantList';
import RestaurantMap from '@/components/RestaurantMap';
import ReviewForm from '@/components/ReviewForm';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Add latitude and longitude to dummy restaurants
const dummyRestaurants = [
  { id: 1, name: 'Tasty Bites', cuisine: 'Italian', rating: 4.5, lat: 40.7128, lng: -74.0060 },
  { id: 2, name: 'Spice Garden', cuisine: 'Indian', rating: 4.2, lat: 40.7282, lng: -73.7949 },
  { id: 3, name: 'Sushi Haven', cuisine: 'Japanese', rating: 4.8, lat: 40.7589, lng: -73.9851 },
  { id: 4, name: 'Burger Palace', cuisine: 'American', rating: 4.0, lat: 40.7484, lng: -73.9857 },
];

function App() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const googleMapsApiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <RestaurantList restaurants={dummyRestaurants} />
            </TabsContent>
            <TabsContent value="map">
              <RestaurantMap restaurants={dummyRestaurants} apiKey={googleMapsApiKey} />
            </TabsContent>
          </Tabs>
          {showReviewForm ? (
            <ReviewForm onClose={() => setShowReviewForm(false)} />
          ) : (
            <button
              className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded"
              onClick={() => setShowReviewForm(true)}
            >
              Add Review
            </button>
          )}
        </main>
        <Footer />
        <ModeToggle className="fixed bottom-4 right-4" />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;