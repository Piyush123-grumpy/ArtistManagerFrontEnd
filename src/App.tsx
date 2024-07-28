import AuthLayout from "./layout/auth-layout";
import MainLayout from "./layout/main-layout";
import { useAppSelector } from "./store/hooks";

function Application() {
  
  const { isAuthenticated } = useAppSelector((state) => {
   
    return state.auth;
  });

  if (isAuthenticated) return <MainLayout />;
  return <AuthLayout />;
}

export default Application;



