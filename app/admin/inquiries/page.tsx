export default function Page() {
  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Lead management</span>
          <h1>Inquiries</h1>
          <p className="muted">
            Review and route contact requests submitted through advisor
            profiles.
          </p>
        </div>
      </div>
      <div className="card data-card">
        <table>
          <thead>
            <tr>
              <th>Visitor</th>
              <th>Advisor</th>
              <th>Goal</th>
              <th>Preferred contact</th>
              <th>Received</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>No inquiries have been received.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
