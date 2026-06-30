import { invoices } from '@/data/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Download, FileText } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>My Invoices</h1>
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Invoice #</th><th>Order #</th><th>Date</th><th>Amount</th><th>GST</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}><FileText size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />{inv.invoiceNumber}</td>
                  <td>{inv.orderNumber}</td>
                  <td>{formatDate(inv.createdAt)}</td>
                  <td>{formatCurrency(inv.subtotal)}</td>
                  <td>{formatCurrency(inv.totalGst)}</td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(inv.grandTotal)}</td>
                  <td><span className={`badge badge-${inv.paymentStatus === 'paid' ? 'success' : 'warning'}`}>{inv.paymentStatus}</span></td>
                  <td><button className="btn btn-ghost btn-sm"><Download size={14} /> PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
