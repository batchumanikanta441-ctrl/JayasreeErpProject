import { clsx, type ClassValue } from 'clsx';

// Combine class names (Tailwind-compatible utility)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format currency to Indian Rupees
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format number with Indian numbering system
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

// Format compact numbers (1.2K, 3.4M, etc.)
export function formatCompact(num: number): string {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
  return `₹${num}`;
}

// Format date
export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'relative') {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  
  if (format === 'long') {
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
  
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// Generate order number
export function generateOrderNumber(): string {
  const prefix = 'JE';
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${date}-${random}`;
}

// Generate invoice number
export function generateInvoiceNumber(): string {
  const prefix = 'INV';
  const fy = getFiscalYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `${prefix}/${fy}/${random}`;
}

// Get fiscal year string (e.g., "24-25")
export function getFiscalYear(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  if (month >= 3) {
    return `${year.toString().slice(-2)}-${(year + 1).toString().slice(-2)}`;
  }
  return `${(year - 1).toString().slice(-2)}-${year.toString().slice(-2)}`;
}

// Generate UUID
export function generateId(): string {
  return crypto.randomUUID();
}

// Calculate GST
export function calculateGST(amount: number, rate: number) {
  const gstAmount = (amount * rate) / 100;
  return {
    baseAmount: amount,
    gstRate: rate,
    cgst: gstAmount / 2,
    sgst: gstAmount / 2,
    igst: 0,
    totalGst: gstAmount,
    totalAmount: amount + gstAmount,
  };
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Get status color
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'var(--color-success-400)',
    inactive: 'var(--color-danger-400)',
    pending: 'var(--color-warning-400)',
    confirmed: 'var(--color-info-400)',
    processing: 'var(--color-secondary-400)',
    packed: 'var(--color-accent-400)',
    shipped: 'var(--color-info-400)',
    delivered: 'var(--color-success-400)',
    cancelled: 'var(--color-danger-400)',
    returned: 'var(--color-danger-400)',
    paid: 'var(--color-success-400)',
    partial: 'var(--color-warning-400)',
    overdue: 'var(--color-danger-400)',
    refunded: 'var(--color-info-400)',
  };
  return colors[status] || 'var(--text-muted)';
}

// Get order status badge class
export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    active: 'badge-success',
    delivered: 'badge-success',
    paid: 'badge-success',
    pending: 'badge-warning',
    partial: 'badge-warning',
    processing: 'badge-info',
    confirmed: 'badge-info',
    shipped: 'badge-info',
    cancelled: 'badge-danger',
    overdue: 'badge-danger',
    returned: 'badge-danger',
    inactive: 'badge-danger',
  };
  return map[status] || 'badge-info';
}

// WhatsApp URL generator
export function getWhatsAppUrl(
  phone: string,
  message?: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const baseUrl = 'https://wa.me/';
  const url = message
    ? `${baseUrl}${cleanPhone}?text=${encodeURIComponent(message)}`
    : `${baseUrl}${cleanPhone}`;
  return url;
}

// Percentage change
export function percentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number(((current - previous) / previous * 100).toFixed(1));
}

// Sleep utility
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Category labels
export const categoryLabels: Record<string, string> = {
  'tmt-steel': 'TMT Steel',
  'cement': 'Cement',
  'rods': 'Rods',
  'pipes': 'Pipes',
  'angles': 'Angles',
  'channels': 'Channels',
  'construction-materials': 'Construction Materials',
};

// Category colors
export const categoryColors: Record<string, string> = {
  'tmt-steel': '#f59e0b',
  'cement': '#3b82f6',
  'rods': '#10b981',
  'pipes': '#8b5cf6',
  'angles': '#ec4899',
  'channels': '#06b6d4',
  'construction-materials': '#f97316',
};
