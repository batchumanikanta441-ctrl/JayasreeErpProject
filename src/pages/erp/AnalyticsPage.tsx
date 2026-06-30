import { useState, useEffect } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  getSalesReport,
  getPurchaseReport,
  getInventoryReport,
  getBusinessReport,
} from "@/services/reportService";

import {
  revenueChartData,
  salesByCategoryData,
  monthlyOrdersData,
  inventoryLevelsData,
  salesForecastData,
} from "@/data/mockData";

import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {

  const [salesReport, setSalesReport] = useState<any>(null);
  const [purchaseReport, setPurchaseReport] = useState<any>(null);
  const [inventoryReport, setInventoryReport] = useState<any>(null);
  const [businessReport, setBusinessReport] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
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
        Loading Analytics...
      </div>
    );
  }

  return (
    <div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 800,
          }}
        >
          Analytics
        </h1>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.85rem",
          }}
        >
          Business intelligence and forecasting dashboard
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <div className="glass-card" style={{ padding: "1rem" }}>
            <div>Total Revenue</div>
            <h2 style={{ color: "#22c55e" }}>
              {formatCurrency(salesReport?.total_revenue ?? 0)}
            </h2>
          </div>

          <div className="glass-card" style={{ padding: "1rem" }}>
            <div>Total Sales</div>
            <h2>{salesReport?.total_sales ?? 0}</h2>
          </div>

          <div className="glass-card" style={{ padding: "1rem" }}>
            <div>Total Purchases</div>
            <h2>{purchaseReport?.total_purchases ?? 0}</h2>
          </div>

          <div className="glass-card" style={{ padding: "1rem" }}>
            <div>Total Customers</div>
            <h2>{businessReport?.total_customers ?? 0}</h2>
          </div>
        </div>
      </div>

      {/* Revenue Trend */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">Revenue vs Expenses</span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              6 months
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueChartData}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#f59e0b"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#f59e0b"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#ef4444"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#ef4444"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border-primary)"
              />

              <XAxis
                dataKey="month"
                stroke="var(--text-muted)"
                fontSize={12}
              />

              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
                tickFormatter={(v) =>
                  `₹${(v / 100000).toFixed(0)}L`
                }
              />

              <Tooltip
                contentStyle={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                formatter={(v) =>
                  typeof v === "number"
                    ? formatCurrency(v)
                    : String(v ?? "")
                }
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                fill="url(#ag1)"
                strokeWidth={2}
                name="Revenue"
              />

              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fill="url(#ag2)"
                strokeWidth={2}
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">
              Profit Trend
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border-primary)"
              />

              <XAxis
                dataKey="month"
                stroke="var(--text-muted)"
                fontSize={12}
              />

              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
                tickFormatter={(v) =>
                  `₹${(v / 100000).toFixed(1)}L`
                }
              />

              <Tooltip
                contentStyle={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: 8,
                  fontSize: 13,
                }}
                formatter={(v) =>
                  typeof v === "number"
                    ? formatCurrency(v)
                    : String(v ?? "")

                }
              />

              <Line
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{
                  fill: "#22c55e",
                  r: 5,
                }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category & Orders */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">
              Sales by Category
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
                fontSize={11}
              >
                {salesByCategoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <span className="chart-title">
              Order Fulfillment
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOrdersData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border-primary)"
              />

              <XAxis
                dataKey="month"
                stroke="var(--text-muted)"
                fontSize={12}
              />

              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
              />

              <Tooltip
                contentStyle={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: 8,
                  fontSize: 13,
                }}
              />

              <Legend fontSize={12} />

              <Bar
                dataKey="orders"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                name="Total Orders"
              />

              <Bar
                dataKey="delivered"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
                name="Delivered"
              />

              <Bar
                dataKey="cancelled"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
                name="Cancelled"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Levels */}

      <div
        className="chart-container"
        style={{ marginBottom: "1.5rem" }}
      >
        <div className="chart-header">
          <span className="chart-title">
            Inventory Levels vs Reorder Points
          </span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={inventoryLevelsData}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-primary)"
            />

            <XAxis
              type="number"
              stroke="var(--text-muted)"
              fontSize={12}
            />

            <YAxis
              type="category"
              dataKey="name"
              stroke="var(--text-muted)"
              fontSize={11}
              width={80}
            />

            <Tooltip
              contentStyle={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: 8,
                fontSize: 13,
              }}
            />

            <Legend fontSize={12} />

            <Bar
              dataKey="current"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
              name="Current Stock"
            />

            <Bar
              dataKey="reorder"
              fill="#f59e0b"
              radius={[0, 4, 4, 0]}
              name="Reorder Level"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Forecast */}

      <div className="chart-container">        <div className="chart-header">
          <span className="chart-title">
            📈 Sales Forecast (AI-Powered)
          </span>

          <span className="badge badge-info">
            Predicted
          </span>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={[
              ...revenueChartData.map((d) => ({
                period: d.month,
                actual: d.revenue,
                predicted: d.revenue,
                lowerBound: d.revenue * 0.9,
                upperBound: d.revenue * 1.1,
              })),
              ...salesForecastData,
            ]}
          >
            <defs>
              <linearGradient
                id="fg1"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#8b5cf6"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="#8b5cf6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-primary)"
            />

            <XAxis
              dataKey="period"
              stroke="var(--text-muted)"
              fontSize={12}
            />

            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickFormatter={(v) =>
                `₹${(v / 100000).toFixed(0)}L`
              }
            />

            <Tooltip
              contentStyle={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: 8,
                fontSize: 13,
              }}
              formatter={(v) =>
                typeof v === "number"
                  ? formatCurrency(v)
                  : String(v ?? "")

              }
            />

            <Area
              type="monotone"
              dataKey="upperBound"
              stroke="none"
              fill="#8b5cf615"
              name="Upper Bound"
            />

            <Area
              type="monotone"
              dataKey="lowerBound"
              stroke="none"
              fill="#8b5cf610"
              name="Lower Bound"
            />

            <Line
              type="monotone"
              dataKey="actual"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{
                fill: "#f59e0b",
                r: 4,
              }}
              name="Actual"
            />

            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#8b5cf6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{
                fill: "#8b5cf6",
                r: 4,
              }}
              name="Predicted"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        @media (max-width:1024px){
          div[style*="gridTemplateColumns: 1fr 1fr"]{
            grid-template-columns:1fr!important;
          }
        }
      `}</style>

    </div>
  );
}