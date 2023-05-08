import Root from "./routes/Root/Root";
import AboutPage from "./routes/AboutPage/AboutPage";
import AnimalsPage from "./routes/AnimalsPage/AnimalsPage";
import AnimalDetailPage from "./routes/AnimalDetailsPage/AnimalDetailPage";
import NewAnimalPage from "./routes/NewAnimalPage/NewAnimalPage";
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
      <Route path="animals" element={<AnimalsPage />} />
      <Route path="animals/:animalId" element={<AnimalDetailPage />} />
      <Route path="new-animal" element={<NewAnimalPage />} />
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
