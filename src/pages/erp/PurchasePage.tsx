import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import {
  getPurchases,
  createPurchase,
} from "@/services/purchaseService";

import { getProducts } from "@/services/productService";
import { getSuppliers } from "@/services/supplierService";
export default function PurchasePage() {
  const [purchaseList, setPurchaseList] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [search, setSearch] = useState("");

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [newPurchase, setNewPurchase] = useState({
    supplier_id: "",
    product_id: "",
    quantity: "",
  });
  useEffect(() => {
  loadPurchases();
  loadProducts();
  loadSuppliers();
}, []);

const loadPurchases = async () => {
  try {
    const data = await getPurchases();
    setPurchaseList(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
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

const loadSuppliers = async () => {
  try {
    const data = await getSuppliers();
    setSuppliers(data);
  } catch (error) {
    console.error(error);
  }
};
const handleCreatePurchase = async () => {
  try {
    setCreating(true);

    await createPurchase({
      supplier_id: Number(newPurchase.supplier_id),
      product_id: Number(newPurchase.product_id),
      quantity: Number(newPurchase.quantity),
    });

    await loadPurchases();

    setShowCreateModal(false);

    setNewPurchase({
      supplier_id: "",
      product_id: "",
      quantity: "",
    });

    alert("Purchase created successfully.");
  } catch (error) {
    console.error(error);
    alert("Unable to create purchase.");
  } finally {
    setCreating(false);
  }
};
const filtered = purchaseList.filter(
  (p: any) =>
    String(p.id).includes(search) ||
    String(p.supplier_id).includes(search) ||
    String(p.product_id).includes(search)
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
      Loading Purchases...
    </div>
  );
}
return (
  <div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 800,
          }}
        >
          Purchase Management
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.85rem",
          }}
        >
          {purchaseList.length} Purchases
        </p>
      </div>

      <button
        className="btn btn-primary"
        onClick={() => setShowCreateModal(true)}
      >
        <Plus size={16} />
        Create Purchase
      </button>

    </div>
    <div
  style={{
    position: "relative",
    marginBottom: "1.25rem",
    maxWidth: 400,
  }}
>
  <Search
    size={16}
    style={{
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
    }}
  />

  <input
    className="input-field"
    placeholder="Search purchases..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      paddingLeft: 36,
      width: "100%",
    }}
  />
</div>
<div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
  <div style={{ overflowX: "auto" }}>
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Supplier</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Amount</th>
          <th>Payment</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((p: any) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.supplier_id}</td>
            <td>{p.product_id}</td>
            <td>{p.quantity}</td>
            <td>{formatCurrency(p.unit_price)}</td>
            <td>{formatCurrency(p.total_amount)}</td>
            <td>{p.payment_status}</td>
            <td>{p.purchase_status}</td>
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
        width: 500,
        maxWidth: "95%",
        padding: 24,
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        Create Purchase
      </h2>

      <select
        className="input-field"
        value={newPurchase.supplier_id}
        onChange={(e) =>
          setNewPurchase({
            ...newPurchase,
            supplier_id: e.target.value,
          })
        }
      >
        <option value="">Select Supplier</option>

        {suppliers.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        className="input-field"
        style={{ marginTop: 12 }}
        value={newPurchase.product_id}
        onChange={(e) =>
          setNewPurchase({
            ...newPurchase,
            product_id: e.target.value,
          })
        }
      >
        <option value="">Select Product</option>

        {products.map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        className="input-field"
        type="number"
        placeholder="Quantity"
        style={{ marginTop: 12 }}
        value={newPurchase.quantity}
        onChange={(e) =>
          setNewPurchase({
            ...newPurchase,
            quantity: e.target.value,
          })
        }
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          marginTop: 20,
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() => setShowCreateModal(false)}
        >
          Cancel
        </button>

        <button
          className="btn btn-primary"
          onClick={handleCreatePurchase}
          disabled={creating}
        >
          {creating ? "Creating..." : "Create Purchase"}
        </button>
      </div>
    </div>
  </div>
)}

</div>
);
}
