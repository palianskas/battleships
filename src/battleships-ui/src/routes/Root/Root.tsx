import { Outlet } from 'react-router-dom';
import CommandInput from '../../components/CommandInput/CommandInput';
import LoggerConfig from '../../components/LoggerConfig/LoggerConfig';

export default function Root() {
  return (
    <div>
      <LoggerConfig />
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <Outlet />
      </div>
      <CommandInput />
    </div>
  );
}
