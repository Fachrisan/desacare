import { LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/api.js';

function LoginAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin(form);
      localStorage.setItem('desacare_token', response.token);
      localStorage.setItem('desacare_user', JSON.stringify(response.user));
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#ecfeff_0%,#f8fafc_48%,#ffffff_100%)] px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mx-auto mb-7 flex w-fit items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-700 font-black text-white">
            DC
          </span>
          <div>
            <p className="text-xl font-black text-slate-950">DesaCare</p>
            <p className="text-sm text-slate-500">Portal Admin Desa</p>
          </div>
        </Link>

        <form className="panel p-7 shadow-card" onSubmit={handleSubmit}>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-black text-slate-950">Login Admin</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Masuk untuk mengelola pengajuan dan pengaduan warga.</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="label-field" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className="input-field pl-11" id="email" type="email" placeholder="admin@desacare.id" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="label-field" htmlFor="password">Password</label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input className="input-field pl-11" id="password" type="password" placeholder="Masukkan password" value={form.password} onChange={handleChange} required />
              </div>
            </div>
            {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
