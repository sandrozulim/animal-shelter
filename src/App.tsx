import Root from "./routes/Root/Root";
import AboutPage from "./routes/AboutPage/AboutPage";
import AnimalListPage from "./routes/AnimalsListPage/AnimalsListPage";
import AnimalDetailPage from "./routes/AnimalDetailsPage/AnimalDetailPage";
import NewAnimalPage from "./routes/NewAnimalPage/NewAnimalPage";
import DonationsListPage from "./routes/DonationsListPage/DonationsListPage";
import NewDonationPage from "./routes/NewDonationPage/NewDonationPage";
import NotificationsListPage from "./routes/NotificationsListPage/NotificationsListPage";
import NewNotificationPage from "./routes/NewNotificationPage/NewNotificationPage";
import { UserProvider } from "./contexts/UserContext";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="about" element={<AboutPage />} />
      <Route index element={<AnimalListPage />} />
      <Route path="animals/:animalId" element={<AnimalDetailPage />} />
      <Route path="new-animal" element={<NewAnimalPage />} />
      <Route path="donations" element={<DonationsListPage />} />
      <Route path="new-donation" element={<NewDonationPage />} />
      <Route path="notifications" element={<NotificationsListPage />} />
      <Route path="new-notification" element={<NewNotificationPage />} />
    </Route>
  )
);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
