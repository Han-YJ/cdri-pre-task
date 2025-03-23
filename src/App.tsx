import { Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/shared/DefaultLayout';
import Search from './pages/Search';
import Like from './pages/Like';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Search />} />
          <Route path="/like" element={<Like />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
