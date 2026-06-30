import { useState, useEffect } from 'react';
import { Plus, Search, Eye } from 'lucide-react';

import { formatCurrency, formatDate } from '@/lib/utils';
import {
  getOrders,
  createOrder,
} from "@/services/orderService";
import { getCustomers } from "@/services/customerService";
import { getProducts } from "@/services/productService";

export default function SalesOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderList, setOrderList] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [customers, setCustomers] = useState<any[]>([]);
const [products, setProducts] = useState<any[]>([]);

const [showCreateModal, setShowCreateModal] =
  useState(false);

const [creating, setCreating] =
  useState(false);

const [newOrder, setNewOrder] = useState({
  customer_id: "",
  product_id: "",
  quantity: "",
  payment_method: "Cash",
});



const loadOrders = async () => {
  try {
    const data = await getOrders();
    setOrderList(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const loadCustomers = async () => {
  try {
    const data = await getCustomers();
    setCustomers(data);
  } catch (error) {
    console.error(error);
  }
};

const loadProducts = async () => {
  try {
    const data = await getProducts();
    setProducts(data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadOrders();
  loadCustomers();
  loadProducts();
}, []);


const handleCreateOrder = async () => {
  try {
    setCreating(true);

    await createOrder({
      customer_id: Number(newOrder.customer_id),
      product_id: Number(newOrder.product_id),
      quantity: Number(newOrder.quantity),
      payment_method: newOrder.payment_method,
    });

    await loadOrders();

    setShowCreateModal(false);

    setNewOrder({
      customer_id: "",
      product_id: "",
      quantity: "",
      payment_method: "Cash",
    });

    alert("Order created successfully.");
  } catch (error) {
    console.error(error);

    alert("Failed to create order.");
  } finally {
    setCreating(false);
  }
};
  

  const filtered = orderList
  .filter(
    (o: any) =>
      statusFilter === "all" ||
      o.order_status === statusFilter
  )
  .filter(
    (o: any) =>
      String(o.id)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      String(o.customer_id)
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontSize: "20px",
      }}
    >
      Loading Sales Orders...
    </div>
  );
}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>Sales & Orders</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{orderList.length} total orders</p>
        </div>
        <button
         className="btn btn-primary"
         onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
           Create Order
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
  {
    label: "Total Sales",
    value: formatCurrency(
      orderList.reduce(
        (sum: number, o: any) => sum + (o.total_amount ?? 0),
        0
      )
    ),
    color: "#f59e0b",
  },
  {
    label: "Paid",
    value: formatCurrency(
      orderList.reduce(
        (sum: number, o: any) => sum + (o.paid_amount ?? 0),
        0
      )
    ),
    color: "#22c55e",
  },
  {
    label: "Pending",
    value: orderList.filter(
      (o: any) => o.order_status === "pending"
    ).length,
    color: "#f97316",
  },
  {
    label: "Delivered",
    value: orderList.filter(
      (o: any) => o.order_status === "delivered"
    ).length,
    color: "#3b82f6",
  },
].map(s => (
          <div key={s.label} style={{ padding: '1rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 250px' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-field" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, width: '100%' }} />
        </div>
        <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ minWidth: 160, background: 'var(--bg-input)' }}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
  <th>ID</th>
  <th>Customer</th>
  <th>Product</th>
  <th>Quantity</th>
  <th>Total Amount</th>
  <th>Payment Method</th>
  <th>Payment Status</th>
  <th>Order Status</th>
</tr>
            </thead>
            
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                 <td>{o.id}</td>
                 <td>
  {customers.find(
    (customer: any) => customer.id === o.customer_id
  )?.name || "Unknown Customer"}
</td>

<td>
  {products.find(
    (product: any) => product.id === o.product_id
  )?.name || "Unknown Product"}
</td>
                 
                 <td>{o.quantity}</td>
                 <td>{formatCurrency(o.total_amount)}</td>
                 <td>{o.payment_method}</td>
                 <td>{o.payment_status}</td>
                 <td>{o.order_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

            {showCreateModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="glass-card"
            style={{
              width: "500px",
              maxWidth: "95%",
              padding: "24px",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
              Create Sales Order
            </h2>

            <select
  className="input-field"
  value={newOrder.customer_id}
  onChange={(e) =>
    setNewOrder({
      ...newOrder,
      customer_id: e.target.value,
    })
  }
>
  <option value="">Select Customer</option>

  {customers.map((customer: any) => (
    <option key={customer.id} value={customer.id}>
      {customer.name}
    </option>
  ))}
</select>

            <select
  className="input-field"
  value={newOrder.product_id}
  onChange={(e) =>
    setNewOrder({
      ...newOrder,
      product_id: e.target.value,
    })
  }
>
  <option value="">Select Product</option>

  {products.map((product: any) => (
    <option key={product.id} value={product.id}>
      {product.name}
    </option>
  ))}
</select>

            <input
              className="input-field"
              placeholder="Quantity"
              type="number"
              value={newOrder.quantity}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  quantity: e.target.value,
                })
              }
            />

            <select
              className="input-field"
              value={newOrder.payment_method}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  payment_method: e.target.value,
                })
              }
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Bank Transfer</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                className="btn btn-secondary"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                onClick={handleCreateOrder}
                disabled={creating}
              >
                {creating
                  ? "Creating..."
                  : "Create Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
