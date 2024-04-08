import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import { Suspense } from "react";
import Loading from "./loading_and_error/Loading";
import { api } from "./config";
const Login = React.lazy(() => import(`./${api}_middleware/Login`));
const EditCitiesPage = React.lazy(() =>
  import(`./${api}_middleware/EditCitiesPage`)
);
const EditHotelsPage = React.lazy(() =>
  import(`./${api}_middleware/EditHotelsPage`)
);
const EditRestaurantsPage = React.lazy(() =>
  import(`./${api}_middleware/EditRestaurantsPage`)
);
const EditTripsPage = React.lazy(() =>
  import(`./${api}_middleware/EditTripsPage`)
);

const EditCountriesPage = React.lazy(() =>
  import(`./${api}_middleware/EditCountriesPage`)
);

function App() {
  return (
    <div className="app-container">
      <Header id="home" />
      <div className="app-content">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/countries" element={<EditCountriesPage />} />
            <Route path="/cities" element={<EditCitiesPage />} />
            <Route path="/hotels" element={<EditHotelsPage />} />
            <Route path="/restaurants" element={<EditRestaurantsPage />} />
            <Route path="/trips" element={<EditTripsPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer className="app-footer" />
    </div>
  );
}

export default App;
