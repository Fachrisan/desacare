import { Camera, MapPinned, MessageSquareText } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import { createPengaduan } from '../api/api.js';

function Pengaduan() {
  const [form, setForm] = useState({
    nama_pelapor: '',
    nomor_hp: '',
    kategori: '',
    lokasi: '',
    isi_pengaduan: '',
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    const fieldMap = {
      pelapor: 'nama_pelapor',
      hp: 'nomor_hp',
      kategori: 'kategori',
      lokasi: 'lokasi',
      isi: 'isi_pengaduan',
    };
    setForm((prev) => ({ ...prev, [fieldMap[id]]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (foto) payload.append('foto', foto);

      const response = await createPengaduan(payload);
      setMessage(`Pengaduan berhasil dikirim. Kode tiket: ${response.data.kode_tiket}`);
      setForm({ nama_pelapor: '', nomor_hp: '', kategori: '', lokasi: '', isi_pengaduan: '' });
      setFoto(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="container-page grid gap-8 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:py-14">
        <aside className="panel h-fit overflow-hidden">
          <div className="bg-slate-950 p-7 text-white">
            <p className="section-kicker text-primary-300">Pengaduan Masyarakat</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">Sampaikan pengaduan dengan jelas</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Aduan yang lengkap membantu perangkat desa menindaklanjuti masalah dengan lebih tepat.
            </p>
          </div>
          <div className="grid gap-4 p-6">
            {[
              [MessageSquareText, 'Kategori aduan membantu prioritas tindak lanjut'],
              [MapPinned, 'Lokasi jelas mempercepat respons petugas'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                <span className="rounded-lg bg-primary-50 p-2 text-primary-700"><Icon size={20} /></span>
                <p className="text-sm font-bold text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </aside>

        <form className="panel grid gap-6 p-6 lg:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="label-field" htmlFor="pelapor">Nama pelapor</label>
            <input className="input-field" id="pelapor" type="text" placeholder="Nama lengkap pelapor" value={form.nama_pelapor} onChange={handleChange} required />
          </div>
          <div>
            <label className="label-field" htmlFor="hp">Nomor HP</label>
            <input className="input-field" id="hp" type="tel" placeholder="08xxxxxxxxxx" value={form.nomor_hp} onChange={handleChange} required />
          </div>
          <div>
            <label className="label-field" htmlFor="kategori">Kategori pengaduan</label>
            <select className="input-field" id="kategori" value={form.kategori} onChange={handleChange} required>
              <option value="" disabled>Pilih kategori</option>
              <option>Infrastruktur</option>
              <option>Kebersihan</option>
              <option>Keamanan</option>
              <option>Administrasi</option>
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="lokasi">Lokasi kejadian</label>
            <input className="input-field" id="lokasi" type="text" placeholder="Contoh: Jl. Melati RT 03" value={form.lokasi} onChange={handleChange} required />
          </div>
          <div className="lg:col-span-2">
            <label className="label-field" htmlFor="isi">Isi pengaduan</label>
            <textarea className="input-field min-h-36" id="isi" placeholder="Tuliskan kronologi atau detail pengaduan" value={form.isi_pengaduan} onChange={handleChange} required />
          </div>
          <div className="lg:col-span-2">
            <label className="label-field" htmlFor="foto">Upload foto bukti</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary-200 bg-primary-50/60 px-4 py-4 text-sm font-semibold text-primary-800 hover:bg-primary-50">
              <Camera size={20} />
              <span>{foto ? foto.name : 'Pilih foto bukti kejadian'}</span>
              <input id="foto" type="file" className="sr-only" accept=".jpg,.jpeg,.png,.pdf" onChange={(event) => setFoto(event.target.files?.[0] || null)} />
            </label>
          </div>
          {message ? <p className="lg:col-span-2 text-sm font-semibold text-emerald-700">{message}</p> : null}
          {error ? <p className="lg:col-span-2 text-sm font-semibold text-rose-600">{error}</p> : null}
          <div className="lg:col-span-2">
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Pengaduan'}</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Pengaduan;
