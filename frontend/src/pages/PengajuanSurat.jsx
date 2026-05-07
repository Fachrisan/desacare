import { FileCheck2, ShieldCheck, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import { createPengajuan } from '../api/api.js';

function PengajuanSurat() {
  const [form, setForm] = useState({
    nama_lengkap: '',
    nik: '',
    alamat: '',
    jenis_surat: '',
    keperluan: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    const fieldMap = {
      nama: 'nama_lengkap',
      nik: 'nik',
      alamat: 'alamat',
      jenis: 'jenis_surat',
      keperluan: 'keperluan',
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
      if (file) payload.append('file', file);

      const response = await createPengajuan(payload);
      setMessage(`Pengajuan berhasil. Kode tiket: ${response.data.kode_tiket}`);
      setForm({ nama_lengkap: '', nik: '', alamat: '', jenis_surat: '', keperluan: '' });
      setFile(null);
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
            <p className="section-kicker text-primary-300">Pengajuan Surat</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">Kirim permohonan surat secara online</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Lengkapi data pemohon dengan benar agar proses verifikasi petugas berjalan lebih cepat.
            </p>
          </div>
          <div className="grid gap-4 p-6">
            {[
              [FileCheck2, 'Data masuk ke antrean operator'],
              [ShieldCheck, 'Dokumen pendukung tersimpan rapi'],
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
            <label className="label-field" htmlFor="nama">Nama lengkap</label>
            <input className="input-field" id="nama" type="text" placeholder="Masukkan nama sesuai KTP" value={form.nama_lengkap} onChange={handleChange} required />
          </div>
          <div>
            <label className="label-field" htmlFor="nik">NIK</label>
            <input className="input-field" id="nik" type="text" placeholder="16 digit NIK" value={form.nik} onChange={handleChange} required />
          </div>
          <div className="lg:col-span-2">
            <label className="label-field" htmlFor="alamat">Alamat</label>
            <textarea className="input-field min-h-28" id="alamat" placeholder="Alamat lengkap domisili" value={form.alamat} onChange={handleChange} required />
          </div>
          <div>
            <label className="label-field" htmlFor="jenis">Jenis surat</label>
            <select className="input-field" id="jenis" value={form.jenis_surat} onChange={handleChange} required>
              <option value="" disabled>Pilih jenis surat</option>
              <option>Surat Keterangan Domisili</option>
              <option>Surat Keterangan Usaha</option>
              <option>Surat Pengantar SKCK</option>
              <option>Surat Keterangan Tidak Mampu</option>
            </select>
          </div>
          <div>
            <label className="label-field" htmlFor="dokumen">Upload dokumen pendukung</label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-primary-200 bg-primary-50/60 px-4 py-3 text-sm font-semibold text-primary-800 hover:bg-primary-50">
              <UploadCloud size={20} />
              <span>{file ? file.name : 'Pilih file PDF/JPG/PNG'}</span>
              <input id="dokumen" type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => setFile(event.target.files?.[0] || null)} />
            </label>
          </div>
          <div className="lg:col-span-2">
            <label className="label-field" htmlFor="keperluan">Keperluan</label>
            <textarea className="input-field min-h-32" id="keperluan" placeholder="Jelaskan keperluan pengajuan surat" value={form.keperluan} onChange={handleChange} required />
          </div>
          {message ? <p className="lg:col-span-2 text-sm font-semibold text-emerald-700">{message}</p> : null}
          {error ? <p className="lg:col-span-2 text-sm font-semibold text-rose-600">{error}</p> : null}
          <div className="lg:col-span-2">
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Pengajuan'}</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default PengajuanSurat;
