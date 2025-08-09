import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './components/Protected';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* { Public routes } */}
          <Route path="/login" element={<Login />} />

          {/* Routes that require user to log in */}
          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />

          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
