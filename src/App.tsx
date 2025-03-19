import { Route, Routes } from 'react-router';
import Search from './pages/Search';
import Save from './pages/Save';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/save" element={<Save />} />
    </Routes>
  );
}

export default App;
