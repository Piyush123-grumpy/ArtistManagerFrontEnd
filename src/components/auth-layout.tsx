import { AuthRoutes } from "../routes";

const AuthLayout = () => {
  return (
    <div className="flex-row w-full min-h-screen flex items-center justify-center">
      <AuthRoutes />
    </div>
  );
};

export default AuthLayout;
