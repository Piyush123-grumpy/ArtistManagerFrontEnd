import loadable from "@loadable/component";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

const LoginPage = loadable(() => import("./pages/auth/login.page"));
const RecordsPage=loadable(()=>import("./pages/admin/records.page"))
const RegisterPage = loadable(() => import("./pages/auth/register.page"));
const ArtistPage=loadable(()=> import('./pages/admin/artists.page'))
const HomePage = loadable(() => import("./pages/home.page"));
const MusicPage=loadable(()=>import('./pages/admin/music.page'))
const ExcelPage=loadable(()=>import('./pages/admin/excel.page'))
// const AboutPage = loadable(() => import("./pages/about.page"));
// const CampaignListPage = loadable(() => import("./pages/campaigns/index.page"));
// const AlertPage = loadable(() => import("./pages/alerts.page"));
// const CampaignDetailPage = loadable(
//   () => import("./pages/campaigns/detail.page")
// );

function AuthRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

function ApplicationRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<RecordsPage />} />
      <Route path="/artist" element={<ArtistPage />} />
      <Route path="/music/:artistId" element={<MusicPage />} />
      <Route path="/excel" element={<ExcelPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}



export { AuthRoutes,ApplicationRoutes };
