import InboxSidebar from "../../components/InboxSidebar"
export default function InboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <main className="container msg-container">
      <h2 className="ff-Mabry-Pro-bold fs-32">Inbox</h2>

<div className="msg-menu">
 <InboxSidebar > {children} </InboxSidebar >
</div>

      </main>
  );
}
