import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-800 font-black text-white">
              DC
            </span>
            <div>
              <p className="text-lg font-extrabold text-slate-900">DesaCare</p>
              <p className="text-sm text-slate-500">Platform layanan desa/kelurahan digital.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">
            Membantu warga mengurus administrasi, memantau layanan, dan menyampaikan pengaduan secara transparan.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Layanan</h3>
          <div className="mt-4 grid gap-3 text-sm font-medium text-slate-700">
            <Link to="/pengajuan-surat" className="hover:text-primary-700">Pengajuan Surat</Link>
            <Link to="/pengaduan" className="hover:text-primary-700">Pengaduan Masyarakat</Link>
            <Link to="/cek-status" className="hover:text-primary-700">Cek Status</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Kontak</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <span className="flex items-center gap-2"><MapPin size={16} /> Kantor Desa/Kelurahan</span>
            <span className="flex items-center gap-2"><Phone size={16} /> 021-1234-5678</span>
            <span className="flex items-center gap-2"><Mail size={16} /> layanan@desacare.id</span>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © 2026 DesaCare. Semua hak dilindungi.
      </div>
    </footer>
  );
}

export default Footer;
