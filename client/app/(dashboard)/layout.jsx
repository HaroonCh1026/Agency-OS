import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />

        <main>{children}</main>
      </div>
    </div>
  );
}
