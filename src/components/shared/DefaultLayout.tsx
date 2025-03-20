import { Outlet } from 'react-router';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-[960px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
