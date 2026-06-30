import { useEffect, useState } from "react";
import { getERPDashboard } from "@/services/dashboardService";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { formatCurrency, formatDate } from "@/lib/utils";

import {
  monthlyOrdersData,
  notifications,
} from "@/data/mockData";

export default function ERPDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);

  const revenueChartData =
    analytics?.monthly_sales ?? [];

  const salesByCategoryData =
    analytics?.sales_by_category ?? [];

  const recentOrders =
    analytics?.recent_orders ?? [];

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getERPDashboard();

      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (<div>
  <div style={{ marginBottom: "2rem" }}>
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.75rem",
        fontWeight: 800,
        marginBottom: "0.25rem",
      }}
    >
      Dashboard
    </h1>

    <p style={{ color: "var(--text-muted)" }}>
      Welcome back! Here's your business overview.
    </p>
  </div>

  {analytics && (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div className="kpi-card">
        <div className="kpi-value">
          ₹{analytics.total_revenue.toLocaleString()}
        </div>
        <div className="kpi-label">Total Revenue</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-value">
          {analytics.total_products}
        </div>
        <div className="kpi-label">Products</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-value">
          {analytics.total_customers}
        </div>
        <div className="kpi-label">Customers</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-value">
          {analytics.total_suppliers}
        </div>
        <div className="kpi-label">Suppliers</div>
      </div>
    </div>
  )}

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    }}
  >
    <div className="chart-container">
      <div className="chart-header">
        <span className="chart-title">
          Revenue & Profit Trend
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueChartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(v: any) =>
              formatCurrency(Number(v))
            }
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#f59e0b"
            fill="#fde68a"
          />

          <Area
            type="monotone"
            dataKey="profit"
            stroke="#22c55e"
            fill="#bbf7d0"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div className="chart-container">
      <div className="chart-header">
        <span className="chart-title">
          Sales by Category
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={salesByCategoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {salesByCategoryData.map(
              (_: any, index: number) => {
                const colors = [
                  "#3b82f6",
                  "#22c55e",
                  "#f59e0b",
                  "#ef4444",
                  "#8b5cf6",
                ];

                return (
                  <Cell
                    key={index}
                    fill={
                      colors[index % colors.length]
                    }
                  />
                );
              }
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
    {/* Orders Chart + Notifications */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    }}
  >
    {/* Orders Chart */}
    <div className="chart-container">
      <div className="chart-header">
        <span className="chart-title">
          Monthly Orders
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={monthlyOrdersData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="orders"
            fill="#3b82f6"
            name="Orders"
          />

          <Bar
            dataKey="delivered"
            fill="#22c55e"
            name="Delivered"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

    {/* Notifications */}
    <div
      className="glass-card"
      style={{ padding: "1.5rem" }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          marginBottom: "1rem",
        }}
      >
        Recent Notifications
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              display: "flex",
              gap: "0.75rem",
              padding: "0.75rem",
              border: "1px solid var(--border-secondary)",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                marginTop: 6,
                background:
                  n.type === "success"
                    ? "#22c55e"
                    : n.type === "warning"
                    ? "#f59e0b"
                    : n.type === "danger"
                    ? "#ef4444"
                    : "#3b82f6",
              }}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                }}
              >
                {n.title}
              </div>

              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.85rem",
                }}
              >
                {n.message}
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                }}
              >
                {formatDate(n.createdAt, "relative")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
    {/* Recent Orders */}
  <div
    className="glass-card"
    style={{ padding: "1.5rem" }}
  >
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        marginBottom: "1rem",
      }}
    >
      Recent Orders
    </h3>

    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
          </tr>
        </thead>

        <tbody>
          {recentOrders.length > 0 ? (
            recentOrders.map((o: any) => (
              <tr key={o.id}>
                <td
                  style={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  #{o.id}
                </td>

                <td>{o.customer}</td>

                <td>--</td>

                <td
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(o.amount)}
                </td>

                <td>
                  <span
                    className={`badge badge-${
                      o.status === "Delivered"
                        ? "success"
                        : o.status === "Pending"
                        ? "warning"
                        : "info"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                <td>
                  <span className="badge badge-info">
                    Backend
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Recent Orders
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  <style>{`
    @media (max-width:1024px){
      div[style*="gridTemplateColumns: 2fr 1fr"],
      div[style*="gridTemplateColumns: 1fr 1fr"]{
        grid-template-columns:1fr!important;
      }
    }
  `}</style>

</div>
);
}