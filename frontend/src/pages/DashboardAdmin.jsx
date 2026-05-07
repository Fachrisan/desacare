import { FileCheck2, FileClock, Menu, MessageSquareWarning, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { getAllPengaduan, getAllPengajuan } from '../api/api.js';

function DashboardAdmin() {
  const [open, setOpen] = useState(false);
  const [pengajuan, setPengajuan] = useState([]);
  const [pengaduan, setPengaduan] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('desacare_token')) {
      navigate('/login-admin');
      return;
    }

    const loadData = async () => {
      try {
        const [resPengajuan, resPengaduan] = await Promise.all([getAllPengajuan(), getAllPengaduan()]);
        setPengajuan(resPengajuan.data || []);
        setPengaduan(resPengaduan.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadData();
  }, [navigate]);

  const stats = useMemo(() => {
    const selesai = pengajuan.filter((item) => item.status === 'Selesai').length;
    const aktif = pengaduan.filter((item) => item.status !== 'Selesai' && item.status !== 'Ditolak').length;
    return [
      { label: 'Pengajuan Masuk', value: String(pengajuan.length), icon: FileClock, tone: 'text-sky-700 bg-sky-50' },
      { label: 'Surat Selesai', value: String(selesai), icon: FileCheck2, tone: 'text-emerald-700 bg-emerald-50' },
      { label: 'Pengaduan Aktif', value: String(aktif), icon: MessageSquareWarning, tone: 'text-amber-700 bg-amber-50' },
      { label: 'Total Tiket', value: String(pengajuan.length + pengaduan.length), icon: Users, tone: 'text-primary-700 bg-primary-50' },
    ];
  }, [pengajuan, pengaduan]);

  const mappedPengajuan = pengajuan.slice(0, 3).map((item) => ({
    id: item.kode_tiket,
    nama: item.nama_lengkap,
    jenis: item.jenis_surat,
    status: item.status,
  }));

  const mappedPengaduan = pengaduan.slice(0, 3).map((item) => ({
    id: item.kode_tiket,
    nama: item.nama_pelapor,
    kategori: item.kategori,
    status: item.status,
  }));

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <main className="flex-1">
        <div className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8">
          <button className="rounded-lg border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(true)} type="button">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-950">Dashboard Admin</h1>
            <p className="text-sm text-slate-500">Ringkasan layanan DesaCare hari ini</p>
          </div>
        </div>

        <div className="space-y-6 p-4 lg:p-8">
          {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="panel p-5 transition hover:-translate-y-1 hover:shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                    <p className="mt-2 text-3xl font-black text-slate-950">{item.value}</p>
                  </div>
                  <span className={`rounded-lg p-3 ${item.tone}`}><item.icon size={24} /></span>
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <AdminTable title="Pengajuan Terbaru" data={mappedPengajuan} columns={['nama', 'jenis']} />
            <AdminTable title="Pengaduan Terbaru" data={mappedPengaduan} columns={['nama', 'kategori']} />
          </section>
        </div>
      </main>
    </div>
  );
}

function AdminTable({ title, data, columns }) {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-black text-slate-950">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Kode</th>
              <th className="px-5 py-3">Nama</th>
              <th className="px-5 py-3">Layanan</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4 font-bold text-primary-800">{item.id}</td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">{item[columns[0]]}</td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-700">{item[columns[1]]}</td>
                <td className="whitespace-nowrap px-5 py-4"><StatusBadge status={item.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardAdmin;
