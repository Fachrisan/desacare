import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Beranda', to: '/' },
  { label: 'Pengajuan Surat', to: '/pengajuan-surat' },
  { label: 'Pengaduan', to: '/pengaduan' },
  { label: 'Cek Status', to: '/cek-status' },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-800 text-sm font-black text-white">
            DC
          </span>
          <span>
            <span className="block text-base font-extrabold leading-5 text-slate-900">DesaCare</span>
            <span className="block text-[11px] font-semibold text-slate-500">Layanan Publik Digital</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex">
          <Link to="/login-admin" className="btn-primary px-4">
            Login Admin <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Buka menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-page grid gap-2 py-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/login-admin" className="btn-primary mt-1" onClick={() => setOpen(false)}>
              Login Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
