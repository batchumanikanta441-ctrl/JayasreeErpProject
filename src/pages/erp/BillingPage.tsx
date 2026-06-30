import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Plus,
  IndianRupee,
} from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import {
  getInvoices,
  createInvoice,
} from "@/services/invoiceService";

import { getPayments } from "@/services/paymentService";

import { getOrders } from "@/services/orderService";

import { X } from "lucide-react";

export default function BillingPage() {

  const [tab, setTab] = useState<
    "invoices" | "payments" | "ledger"
  >("invoices");

  const [invoiceList, setInvoiceList] = useState<any[]>([]);
  const [paymentList, setPaymentList] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

const [creating, setCreating] = useState(false);

const [orderList, setOrderList] = useState<any[]>([]);

const [selectedOrder, setSelectedOrder] = useState("");

  useEffect(() => {
  loadData();
  loadOrders();
}, []);

const handleCreateInvoice = async () => {
  if (!selectedOrder) {
    alert("Please select a Sales Order.");
    return;
  }

  try {
    setCreating(true);

    await createInvoice({
      sales_order_id: Number(selectedOrder),
    });

    await loadData();

    setShowCreateModal(false);

    setSelectedOrder("");

    alert("Invoice created successfully.");
  } catch (error) {
    console.error(error);
    alert("Unable to create invoice.");
  } finally {
    setCreating(false);
  }
};

  const loadOrders = async () => {
  try {
    const data = await getOrders();
    setOrderList(data);
  } catch (error) {
    console.error(error);
  }
};

  const loadData = async () => {
    try {

      const invoices = await getInvoices();
      console.log("Invoices:", invoices);

      const payments = await getPayments();
      console.log("Payments:", payments);

      setInvoiceList(invoices);
      setPaymentList(payments);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Loading Billing...
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
            Billing & Invoices
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
            }}
          >
            Manage invoices and payments
          </p>
        </div>

        <button
  className="btn btn-primary"
  onClick={() => setShowCreateModal(true)}
>
  <Plus size={16} />
  Create Invoice
</button>
      </div>

      {/* Quick Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(220px,1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {[
          {
            label: "Invoices",

            value: formatCurrency(
              invoiceList.reduce(
                (sum: number, i: any) =>
                  sum + (i.total_amount ?? 0),
                0
              )
            ),

            color: "#f59e0b",
          },

          {
            label: "Payments",

            value: formatCurrency(
              paymentList.reduce(
                (sum: number, p: any) =>
                  sum + (p.amount ?? 0),
                0
              )
            ),

            color: "#22c55e",
          },

          {
            label: "Invoice Count",

            value: invoiceList.length,

            color: "#3b82f6",
          },

          {
            label: "Payment Count",

            value: paymentList.length,

            color: "#ef4444",
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: "1rem",
              background: "var(--bg-card)",
              border:
                "1px solid var(--border-primary)",
              borderRadius:
                "var(--radius-md)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              {s.label}
            </div>

            <div
              style={{
                fontFamily:
                  "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.3rem",
                color: s.color,
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}

      <div className="tabs">
        {(
          [
            "invoices",
            "payments",
            "ledger",
          ] as const
        ).map((t) => (
          <button
            key={t}
            className={`tab-item ${
              tab === t ? "active" : ""
            }`}
            onClick={() => setTab(t)}
            style={{
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>
            {/* ==========================
          INVOICES
      =========================== */}

      {tab === "invoices" && (
        <div
          className="glass-card"
          style={{
            padding: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Invoice No</th>
                  <th>Customer</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Invoice Status</th>
                </tr>
              </thead>

              <tbody>
                {invoiceList.map((inv: any) => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>

                    <td
                      style={{
                        fontWeight: 600,
                        color: "var(--color-accent-400)",
                      }}
                    >
                      <FileText
                        size={14}
                        style={{
                          display: "inline",
                          marginRight: 6,
                        }}
                      />

                      {inv.invoice_number}
                    </td>

                    <td>{inv.customer_name}</td>

                    <td
                      style={{
                        fontWeight: 700,
                      }}
                    >
                      {formatCurrency(inv.total_amount)}
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          inv.payment_status === "Paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {inv.payment_status}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-info">
                        {inv.invoice_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
            {/* ==========================
          PAYMENTS
      =========================== */}

      {tab === "payments" && (
        <div
          className="glass-card"
          style={{
            padding: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sales Order</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>

              <tbody>
                {paymentList.map((payment: any) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>

                    <td>{payment.sales_order_id}</td>

                    <td
                      style={{
                        fontWeight: 700,
                        color: "var(--color-success-400)",
                      }}
                    >
                      {formatCurrency(payment.amount)}
                    </td>

                    <td>{payment.payment_method}</td>

                    <td>
                      <span
                        className={`badge ${
                          payment.payment_status === "Paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>

                    <td>
                      {payment.transaction_id ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
            {/* ==========================
          LEDGER
      =========================== */}

      {tab === "ledger" && (
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <IndianRupee
            size={48}
            color="var(--text-muted)"
            style={{
              margin: "0 auto 1rem",
              opacity: 0.3,
            }}
          />

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              marginBottom: "0.5rem",
            }}
          >
            Customer & Supplier Ledger
          </h3>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            Ledger module will display complete customer and supplier
            transaction history.
          </p>

          <button className="btn btn-primary">
            View Ledger
          </button>
        </div>
      )}


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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <h2>Create Invoice</h2>

        <button
          className="btn btn-secondary"
          onClick={() => setShowCreateModal(false)}
        >
          <X size={18} />
        </button>
      </div>

      <select
        className="input-field"
        value={selectedOrder}
        onChange={(e) =>
          setSelectedOrder(e.target.value)
        }
      >
        <option value="">Select Sales Order</option>

        {orderList.map((o: any) => (
          <option key={o.id} value={o.id}>
            Order #{o.id}
          </option>
        ))}
      </select>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          marginTop: 24,
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
          onClick={handleCreateInvoice}
          disabled={creating}
        >
          {creating ? "Creating..." : "Generate Invoice"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}