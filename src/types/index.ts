// ==========================================
// Jayasree ERP AI - Core Type Definitions
// ==========================================

// === Base Types ===
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'deleted';
}

// === Auth Types ===
export type UserRole = 'owner' | 'admin' | 'manager' | 'sales_staff' | 'inventory_staff' | 'accountant' | 'customer';

export interface User extends BaseEntity {
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// === Product Types ===
export type ProductCategory = 
  | 'tmt-steel'
  | 'cement'
  | 'rods'
  | 'pipes'
  | 'angles'
  | 'channels'
  | 'construction-materials';

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ProductCategory;
  categoryLabel: string;
  sku: string;
  unit: string;
  price: number;
  mrp: number;
  discount: number;
  gstRate: number;
  hsnCode: string;
  images: string[];
  specifications: Record<string, string>;
  minOrderQty: number;
  maxOrderQty: number;
  stockQty: number;
  stock?: number;  
  reorderLevel: number;
  warehouseId: string;
  brand: string;
  weight: number;
  weightUnit: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  tags: string[];
}

// === Customer Types ===
export interface Customer extends BaseEntity {
  userId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  gstNumber?: string;
  panNumber?: string;
  billingAddress: Address;
  shippingAddresses: Address[];
  creditLimit: number;
  creditUsed: number;
  outstandingBalance: number;
  totalOrders: number;
  totalPurchases: number;
  lastOrderDate?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  notes?: string;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

// === Supplier Types ===
export interface Supplier extends BaseEntity {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  gstNumber: string;
  panNumber?: string;
  address: Address;
  bankDetails: BankDetails;
  rating: number;
  totalOrders: number;
  totalPurchases: number;
  outstandingDues: number;
  lastOrderDate?: string;
  paymentTerms: string;
  categories: ProductCategory[];
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  branchName: string;
}

// === Order Types ===
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 'pending' | 'partial' | 'paid' | 'refunded' | 'overdue';

export interface Order extends BaseEntity {
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  gstAmount: number;
  shippingCharges: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  expectedDelivery?: string;
  deliveredAt?: string;
  trackingNumber?: string;
  invoiceId?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  unit: string;
  quantity: number;
  price: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
}

// === Cart Types ===
export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  shippingCharges: number;
  totalAmount: number;
}

// === Invoice Types ===
export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  companyName: string;
  gstNumber?: string;
  items: OrderItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  totalAmount: number;
  roundOff: number;
  grandTotal: number;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  dueDate: string;
  notes?: string;
}

// === Payment Types ===
export interface Payment extends BaseEntity {
  paymentNumber: string;
  orderId?: string;
  invoiceId?: string;
  customerId?: string;
  supplierId?: string;
  type: 'received' | 'made';
  amount: number;
  method: 'cash' | 'bank_transfer' | 'upi' | 'card' | 'cheque' | 'razorpay';
  reference?: string;
  transactionId?: string;
  notes?: string;
  paymentDate: string;
}

// === Inventory Types ===
export type TransactionType = 'stock_in' | 'stock_out' | 'transfer' | 'adjustment' | 'return';

export interface InventoryTransaction extends BaseEntity {
  productId: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  type: TransactionType;
  quantity: number;
  previousQty: number;
  newQty: number;
  reference?: string;
  notes?: string;
  performedBy: string;
}

export interface Warehouse extends BaseEntity {
  name: string;
  code: string;
  address: Address;
  capacity: number;
  utilized: number;
  managerId: string;
  managerName: string;
}

// === Quotation Types ===
export interface Quotation extends BaseEntity {
  quotationNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  validUntil: string;
  notes?: string;
  convertedToOrder: boolean;
  orderId?: string;
}

// === Purchase Order Types ===
export interface PurchaseOrder extends BaseEntity {
  poNumber: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  deliveryDate?: string;
  receivedDate?: string;
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  unit: string;
  quantity: number;
  receivedQty: number;
  price: number;
  gstRate: number;
  gstAmount: number;
  totalAmount: number;
}

// === Ledger Types ===
export interface LedgerEntry extends BaseEntity {
  entityType: 'customer' | 'supplier';
  entityId: string;
  entityName: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  reference?: string;
  type: 'invoice' | 'payment' | 'credit_note' | 'debit_note' | 'opening_balance';
}

// === Notification Types ===
export interface Notification extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  isRead: boolean;
  link?: string;
  icon?: string;
}

// === AI Types ===
export interface AIConversation extends BaseEntity {
  userId: string;
  title: string;
  messages: AIMessage[];
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

// === Forecast Types ===
export interface ForecastData {
  period: string;
  actual?: number;
  predicted: number;
  lowerBound: number;
  upperBound: number;
}

export interface ForecastResult {
  type: 'demand' | 'sales' | 'revenue' | 'profit' | 'inventory' | 'purchase';
  period: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  data: ForecastData[];
  accuracy: number;
  trend: 'up' | 'down' | 'stable';
  summary: string;
}

// === Report Types ===
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type ExportFormat = 'pdf' | 'excel' | 'csv';

export interface ReportConfig {
  title: string;
  period: ReportPeriod;
  startDate: string;
  endDate: string;
  format: ExportFormat;
  filters?: Record<string, string>;
}

// === Dashboard KPI ===
export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

// === Navigation Types ===
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  badge?: string | number;
  roles?: UserRole[];
}
