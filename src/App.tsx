import { Route, Routes } from 'react-router';
import Search from './pages/Search';
import Save from './pages/Save';
import Layout from './components/shared/DefaultLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="/save" element={<Save />} />
      </Route>
    </Routes>
  );
}

export default App;
