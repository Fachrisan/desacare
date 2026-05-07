import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PengajuanSurat from './pages/PengajuanSurat.jsx';
import Pengaduan from './pages/Pengaduan.jsx';
import CekStatus from './pages/CekStatus.jsx';
import LoginAdmin from './pages/LoginAdmin.jsx';
import DashboardAdmin from './pages/DashboardAdmin.jsx';
import KelolaPengajuan from './pages/KelolaPengajuan.jsx';
import KelolaPengaduan from './pages/KelolaPengaduan.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pengajuan-surat" element={<PengajuanSurat />} />
      <Route path="/pengaduan" element={<Pengaduan />} />
      <Route path="/cek-status" element={<CekStatus />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/admin/pengajuan" element={<KelolaPengajuan />} />
      <Route path="/admin/pengaduan" element={<KelolaPengaduan />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
