import { Routes, Route } from "react-router-dom";
import { Home, Profile } from "./pages";
import RootLayout from "./layouts/RootLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
