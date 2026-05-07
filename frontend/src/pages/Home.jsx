import {
  ArrowRight,
  ClipboardCheck,
  Clock3,
  FileText,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import { statistik } from '../data/dummyData.js';

const features = [
  {
    icon: FileText,
    title: 'Pengajuan Surat Online',
    description: 'Warga mengirim permohonan surat tanpa antre, dengan alur yang jelas dan terdokumentasi.',
  },
  {
    icon: MessageSquare,
    title: 'Pengaduan Masyarakat',
    description: 'Laporan warga terdokumentasi rapi agar tindak lanjut perangkat desa lebih terukur.',
  },
  {
    icon: Search,
    title: 'Pelacakan Status Real-Time',
    description: 'Setiap tiket layanan bisa dipantau warga kapan saja menggunakan kode tiket.',
  },
];

const steps = [
  { title: 'Pilih layanan', copy: 'Warga memilih pengajuan surat atau pengaduan sesuai kebutuhan.' },
  { title: 'Isi formulir', copy: 'Data dikirim secara digital beserta dokumen pendukung.' },
  { title: 'Proses verifikasi', copy: 'Operator meninjau, memvalidasi, dan memberi status tindak lanjut.' },
  { title: 'Selesai', copy: 'Warga menerima hasil layanan dan riwayat tersimpan otomatis.' },
];

function Home() {
  return (
    <div className="page-shell bg-slate-50">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
          <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-primary-700">
                <Sparkles size={14} /> Platform layanan publik berbasis cloud
              </div>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Layanan Desa Digital yang Cepat, Transparan, dan Profesional
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                DesaCare membantu pemerintah desa memberikan layanan administrasi modern dengan pengalaman warga yang lebih nyaman dan terukur.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/pengajuan-surat" className="btn-primary">
                  Ajukan Surat <ArrowRight size={18} />
                </Link>
                <Link to="/pengaduan" className="btn-secondary">
                  Buat Pengaduan
                </Link>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ['Akses Mudah', 'Layanan dapat diakses kapan saja'],
                  ['Proses Jelas', 'Status tiket transparan'],
                  ['Arsip Rapi', 'Data tersimpan aman dan terstruktur'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-extrabold text-slate-900">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel overflow-hidden">
              <div className="border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
                <p className="text-sm font-bold text-slate-300">Ringkasan Dashboard</p>
                <h3 className="mt-1 text-lg font-extrabold">Operasional Layanan Desa</h3>
              </div>
              <div className="space-y-3 p-5">
                {[
                  ['Surat masuk', '34', 'Hari ini', 'text-slate-700'],
                  ['Aduan aktif', '12', 'Perlu tindak lanjut', 'text-slate-700'],
                  ['Layanan selesai', '86', 'Bulan ini', 'text-slate-700'],
                ].map(([label, value, note, tone]) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{label}</p>
                      <p className="text-xs text-slate-500">{note}</p>
                    </div>
                    <p className={`text-2xl font-extrabold ${tone}`}>{value}</p>
                  </div>
                ))}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">Status Layanan</p>
                    <Clock3 size={15} className="text-slate-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <span className="rounded-lg bg-amber-50 px-2 py-1 font-semibold text-amber-700">Menunggu</span>
                    <span className="rounded-lg bg-sky-50 px-2 py-1 font-semibold text-sky-700">Diproses</span>
                    <span className="rounded-lg bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">Selesai</span>
                    <span className="rounded-lg bg-rose-50 px-2 py-1 font-semibold text-rose-700">Ditolak</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-page py-14">
          <div className="mb-8 flex flex-col gap-3">
            <p className="section-kicker">Fitur Utama</p>
            <h2 className="section-title">Satu platform untuk semua layanan inti</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-14">
          <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="section-kicker">Alur Layanan</p>
              <h2 className="section-title">Terstruktur dari pengajuan hingga selesai</h2>
              <p className="section-copy">Desain proses yang ringkas memudahkan warga dan membantu perangkat desa bekerja lebih efisien.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((item, index) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-700 text-xs font-extrabold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-14">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="section-kicker">Statistik Singkat</p>
              <h2 className="section-title">Capaian layanan DesaCare</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statistik.map((item) => (
              <div key={item.label} className="panel p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-primary-700">
                  <UsersRound size={19} />
                </div>
                <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-slate-900">{item.value}</p>
                <p className="mt-2 text-sm text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;

