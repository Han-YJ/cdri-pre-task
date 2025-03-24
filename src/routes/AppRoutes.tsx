import { Route, Routes } from 'react-router';
import Layout from '@/components/shared/DefaultLayout';
import { lazy } from 'react';

const Search = lazy(() => import('@/pages/Search'));
const Like = lazy(() => import('@/pages/Like'));

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
