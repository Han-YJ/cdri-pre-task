import { Route, Routes } from 'react-router';
import Layout from '@/components/shared/DefaultLayout';
import Search from '@/pages/Search';
import Like from '@/pages/Like';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Search />} />
        <Route path="like" element={<Like />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
