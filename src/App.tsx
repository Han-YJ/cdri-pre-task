import { Route, Routes } from 'react-router';
import Search from './pages/Search';
import Save from './pages/Save';
import Layout from './components/shared/DefaultLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="/save" element={<Save />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
