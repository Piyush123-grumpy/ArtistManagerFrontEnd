import AuthLayout from "./components/auth-layout";
import MainLayout from "./components/main-layout";
import { useAppSelector } from "./store/hooks";

function Application() {
  
  const { isAuthenticated } = useAppSelector((state) => {
   
    return state.auth;
  });

  if (isAuthenticated) return <MainLayout />;
  return <AuthLayout />;
  // return <MainLayout />;
}

export default Application;



