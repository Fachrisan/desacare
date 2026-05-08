import { ExternalLink, Menu, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { getAllPengajuan, updatePengajuanStatus } from '../api/api.js';

const STATUS_OPTIONS = ['Menunggu', 'Diproses', 'Selesai', 'Ditolak'];

function KelolaPengajuan() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const response = await getAllPengajuan();
      setItems(response.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('desacare_token')) {
      navigate('/login-admin');
      return;
    }
    loadData();
  }, [navigate]);

  const handleUpdate = async (id, status) => {
    setLoadingId(id);
    setError('');
    try {
      await updatePengajuanStatus(id, { status });
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <main className="flex-1">
        <div className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:px-8">
          <button className="rounded-lg border border-slate-200 p-2 lg:hidden" onClick={() => setOpen(true)} type="button">
            <Menu size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-black text-slate-950">Kelola Pengajuan Surat</h1>
            <p className="truncate text-sm text-slate-500">Pantau permohonan surat dan status verifikasi</p>
          </div>
          <button className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:flex" type="button">
            <SlidersHorizontal size={17} /> Filter
          </button>
        </div>

        <div className="p-4 lg:p-8">
          <div className="panel overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-black text-slate-950">Data Pengajuan Surat</h2>
                <p className="mt-1 text-sm text-slate-500">Data real-time dari backend.</p>
              </div>
              <span className="text-sm font-semibold text-primary-700">{items.length} pengajuan</span>
            </div>
            {error ? <p className="px-5 py-3 text-sm font-semibold text-rose-600">{error}</p> : null}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Kode</th>
                    <th className="px-5 py-3">Nama</th>
                    <th className="px-5 py-3">NIK</th>
                    <th className="px-5 py-3">Jenis Surat</th>
                    <th className="px-5 py-3">File</th>
                    <th className="px-5 py-3">Tanggal</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-5 py-4 font-bold text-primary-800">{item.kode_tiket}</td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">{item.nama_lengkap}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-600">{item.nik}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-600">{item.jenis_surat}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        {item.file_url ? (
                          <a
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-primary-700 hover:bg-primary-50"
                            href={item.file_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink size={14} /> Lihat file
                          </a>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-600">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                      <td className="whitespace-nowrap px-5 py-4"><StatusBadge status={item.status} /></td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <select
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700"
                          value={item.status}
                          onChange={(event) => handleUpdate(item.id, event.target.value)}
                          disabled={loadingId === item.id}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default KelolaPengajuan;
