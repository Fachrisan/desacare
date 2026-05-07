import { FileText, Gauge, Inbox, LogOut, MessageSquare, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Dashboard', to: '/admin', icon: Gauge },
  { label: 'Kelola Pengajuan', to: '/admin/pengajuan', icon: FileText },
  { label: 'Kelola Pengaduan', to: '/admin/pengaduan', icon: MessageSquare },
];

function AdminSidebar({ open = false, onClose }) {
  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-white/10 hover:text-white'
    }`;

  const handleLogout = () => {
    localStorage.removeItem('desacare_token');
    localStorage.removeItem('desacare_user');
    onClose?.();
  };

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-slate-950/45 lg:hidden ${open ? 'block' : 'hidden'}`} onClick={onClose} />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 -translate-x-full flex-col border-r border-slate-800 bg-slate-900 text-white transition lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sm font-black text-slate-900">DC</span>
            <div>
              <p className="font-extrabold text-white">DesaCare</p>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-2 px-4 py-5">
          {menu.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={navClass} onClick={onClose}>
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="border-t border-slate-800 p-4">
          <div className="mb-4 rounded-xl bg-slate-800 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                <Inbox size={18} />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Operator Desa</p>
                <p className="text-xs text-emerald-300">online</p>
              </div>
            </div>
          </div>
          <NavLink
            to="/"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            Keluar
          </NavLink>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
