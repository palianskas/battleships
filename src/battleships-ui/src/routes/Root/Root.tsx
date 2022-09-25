import { Outlet } from 'react-router-dom';

import './Root.css';

export default function Root() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      id="root-container"
    >
      <Outlet />
    </div>
  );
}
