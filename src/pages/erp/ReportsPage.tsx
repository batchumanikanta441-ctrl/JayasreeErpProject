
import { useState, useEffect } from "react";

import {
  Download,
  FileBarChart,
  Calendar,
} from "lucide-react";

import {
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getBusinessReport,
} from "@/services/reportService";

const reportTypes = [
  { id: 'sales', label: 'Sales Report', desc: 'Revenue, orders, and customer-wise sales breakdown' },
  { id: 'inventory', label: 'Inventory Report', desc: 'Stock levels, movements, and valuation' },
  { id: 'purchases', label: 'Purchase Report', desc: 'Supplier-wise purchases and payment summary' },
  { id: 'profit-loss', label: 'Profit & Loss', desc: 'Income vs expenses with net profit calculation' },
  { id: 'gst', label: 'GST Report', desc: 'GSTR-1 and GSTR-3B summary for filing' },
  { id: 'customer', label: 'Customer Report', desc: 'Customer-wise outstanding and payment summary' },
  { id: 'supplier', label: 'Supplier Report', desc: 'Supplier-wise dues and purchase summary' },
  { id: 'outstanding', label: 'Outstanding Report', desc: 'Aging analysis of receivables and payables' },
];

export default function ReportsPage() {
    const [period, setPeriod] = useState("monthly");

  const [salesReport, setSalesReport] = useState<any>(null);
const [purchaseReport, setPurchaseReport] = useState<any>(null);
const [inventoryReport, setInventoryReport] = useState<any>(null);
const [businessReport, setBusinessReport] = useState<any>(null);

const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
  try {
    const sales = await getSalesReport();
    const purchases = await getPurchaseReport();
    const inventory = await getInventoryReport();
    const business = await getBusinessReport();

    setSalesReport(sales);
    setPurchaseReport(purchases);
    setInventoryReport(inventory);
    setBusinessReport(business);

    console.log(sales);
    console.log(purchases);
    console.log(inventory);
    console.log(business);

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
        Loading Reports...
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>Reports</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Generate and export business reports</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Calendar size={16} color="var(--text-muted)" />
          <select className="input-field" value={period} onChange={e => setPeriod(e.target.value)} style={{ background: 'var(--bg-input)', height: 38 }}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
        {reportTypes.map((report) => (
  <div
    key={report.id}
    className="glass-card"
    style={{
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "var(--radius-md)",
          background: "rgba(59,130,246,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FileBarChart
          size={22}
          color="var(--color-secondary-400)"
        />
      </div>

      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            marginBottom: "0.25rem",
          }}
        >
          {report.label}
        </h3>

        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            lineHeight: 1.5,
          }}
        >
          {report.desc}
        </p>

        <div
          style={{
            marginTop: "10px",
            fontSize: "13px",
            color: "var(--color-accent-400)",
            fontWeight: 600,
          }}
        >
          Backend Records :
{
  report.id === "sales"
    ? salesReport?.total_sales ?? 0
    : report.id === "inventory"
    ? inventoryReport?.total_products ?? 0
    : report.id === "purchases"
    ? purchaseReport?.total_purchases ?? 0
    : report.id === "customer"
    ? businessReport?.total_customers ?? 0
    : report.id === "supplier"
    ? businessReport?.total_suppliers ?? 0
    : report.id === "profit-loss"
    ? businessReport?.total_sales ?? 0
    : 0
}
        </div>
      </div>
    </div>

    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginTop: "auto",
      }}
    >
      <button
        className="btn btn-secondary btn-sm"
        style={{ flex: 1 }}
      >
        <Download size={14} />
        PDF
      </button>

      <button
        className="btn btn-secondary btn-sm"
        style={{ flex: 1 }}
      >
        <Download size={14} />
        Excel
      </button>

      <button
        className="btn btn-secondary btn-sm"
        style={{ flex: 1 }}
      >
        <Download size={14} />
        CSV
      </button>
    </div>
  </div>
))}
      </div>
    </div>
  );
}
