import "./RecentOrders.css";

const orders = [
  {
    id: "#ORD1201",
    product: "Apple iPhone 15",
    amount: "₹69,999",
    status: "Delivered",
    date: "02 Aug 2026",
  },
  {
    id: "#ORD1202",
    product: "Sony WH-1000XM5",
    amount: "₹29,999",
    status: "Shipped",
    date: "04 Aug 2026",
  },
  {
    id: "#ORD1203",
    product: "Nike Air Max 270",
    amount: "₹5,999",
    status: "Pending",
    date: "06 Aug 2026",
  },
  {
    id: "#ORD1204",
    product: "boAt Wave Sigma 3",
    amount: "₹1,299",
    status: "Cancelled",
    date: "28 Jul 2026",
  },
];

export default function RecentOrders() {
  return (
    <div className="orders-card">

      <div className="orders-head">
        <h2>Recent Orders</h2>
        <button>View All Orders</button>
      </div>

      <div className="orders-table-wrap">
        <table>

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr key={index}>
                <td className="order-id">{item.id}</td>
                <td>{item.product}</td>
                <td className="amount">{item.amount}</td>
                <td>
                  <span className={`badge ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
