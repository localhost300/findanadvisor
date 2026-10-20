export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const { section = "Section" } = await searchParams;
  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Administration</span>
          <h1>{section}</h1>
        </div>
      </div>
      <div className="card form-card">
        <h2>{section} workspace</h2>
        <p className="muted">
          The database, permissions and navigation are ready for this module.
          Connect Supabase to begin managing live records.
        </p>
      </div>
    </>
  );
}
