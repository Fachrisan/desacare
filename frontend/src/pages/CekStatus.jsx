import { Search } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { getStatusByTicket } from '../api/api.js';

function CekStatus() {
  const [kode, setKode] = useState('');
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!kode.trim()) {
      setError('Kode tiket wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await getStatusByTicket(kode.trim());
      setHasil(response.data);
    } catch (err) {
      setHasil(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page grid gap-8 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:py-14">
        <section>
          <p className="section-kicker">Cek Status</p>
          <h1 className="section-title">Pantau progres layanan administrasi</h1>
          <p className="section-copy">
            Masukkan kode tiket dari pengajuan surat atau pengaduan untuk melihat status layanan terbaru.
          </p>
          <div className="panel mt-7 p-6">
            <label className="label-field" htmlFor="kode">Kode tiket</label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="input-field"
                id="kode"
                value={kode}
                onChange={(event) => setKode(event.target.value)}
                placeholder="Contoh: PGJ-123456789012"
              />
              <button type="button" className="btn-primary" onClick={handleCheck} disabled={loading}>
                <Search size={18} /> {loading ? 'Memuat...' : 'Cek'}
              </button>
            </div>
            {error ? <p className="mt-3 text-sm font-semibold text-rose-600">{error}</p> : null}
          </div>
        </section>

        <section className="panel overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-950 px-6 py-5 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-400">{hasil ? hasil.jenis : 'Belum ada data'}</p>
                <h2 className="mt-1 text-xl font-black text-white">{hasil ? hasil.kode_tiket : '-'}</h2>
              </div>
              <StatusBadge status={hasil ? hasil.status : '-'} />
            </div>
          </div>
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
              <p className="mt-2 font-semibold text-slate-900">{hasil ? hasil.status : '-'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Jenis Layanan</p>
              <p className="mt-2 font-semibold text-slate-900">{hasil ? hasil.jenis : '-'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Dibuat</p>
              <p className="mt-2 font-semibold text-slate-900">{hasil ? new Date(hasil.created_at).toLocaleString('id-ID') : '-'}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Catatan</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{hasil?.catatan_admin || 'Belum ada catatan admin.'}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CekStatus;
