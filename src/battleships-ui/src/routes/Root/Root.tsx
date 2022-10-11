import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <Outlet />
    </div>
  );
}
