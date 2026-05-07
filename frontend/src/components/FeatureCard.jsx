function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="panel group p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-primary-700 transition group-hover:bg-primary-700 group-hover:text-white">
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-extrabold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}

export default FeatureCard;
