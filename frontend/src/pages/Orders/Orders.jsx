import { Package } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Orders.css";

export default function Orders() {
  return (
    <>
      <Sidebar />
      <div style={{ marginLeft: "260px" }}>
        <Navbar />
        <div className="orders-page">
          <h1>My Orders</h1>
          <div className="orders-placeholder">
            <Package size={48} color="#9CA3AF" />
            <h2>Orders Module Coming Soon</h2>
            <p>Your placed orders will appear here shortly.</p>
          </div>
        </div>
      </div>
    </>
  );
}
