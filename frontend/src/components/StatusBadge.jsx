const statusStyle = {
  Menunggu: 'bg-amber-50 text-amber-700 ring-amber-100',
  Diproses: 'bg-sky-50 text-sky-700 ring-sky-100',
  Selesai: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  Ditolak: 'bg-rose-50 text-rose-700 ring-rose-100',
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
        statusStyle[status] || 'bg-slate-100 text-slate-700 ring-slate-200'
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
