import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';
import CustomerLayout from '@/components/layout/CustomerLayout';
import ERPLayout from '@/components/layout/ERPLayout';

// Public Pages
import HomePage from '@/pages/public/HomePage';
import AboutPage from '@/pages/public/AboutPage';
import ProductsPage from '@/pages/public/ProductsPage';
import ServicesPage from '@/pages/public/ServicesPage';
import GalleryPage from '@/pages/public/GalleryPage';
import ContactPage from '@/pages/public/ContactPage';
import RequestQuotePage from '@/pages/public/RequestQuotePage';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Customer Pages
import CustomerDashboard from '@/pages/customer/DashboardPage';
import CatalogPage from '@/pages/customer/CatalogPage';
import ProductDetailPage from '@/pages/customer/ProductDetailPage';
import CartPage from '@/pages/customer/CartPage';
import CheckoutPage from '@/pages/customer/CheckoutPage';
import CustomerOrdersPage from '@/pages/customer/OrdersPage';
import CustomerInvoicesPage from '@/pages/customer/InvoicesPage';
import CustomerProfilePage from '@/pages/customer/ProfilePage';

// ERP Pages
import ERPDashboard from '@/pages/erp/DashboardPage';
import InventoryPage from '@/pages/erp/InventoryPage';
import ERPCustomersPage from '@/pages/erp/CustomersPage';
import SalesOrdersPage from '@/pages/erp/SalesOrdersPage';
import SuppliersPage from '@/pages/erp/SuppliersPage';
import PurchasePage from '@/pages/erp/PurchasePage';
import BillingPage from '@/pages/erp/BillingPage';
import ReportsPage from '@/pages/erp/ReportsPage';
import AnalyticsPage from '@/pages/erp/AnalyticsPage';
import AIAssistantPage from '@/pages/erp/AIAssistantPage';

// WhatsApp Button
import WhatsAppButton from '@/components/shared/WhatsAppButton';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-quote" element={<RequestQuotePage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer Portal */}
        <Route path="/customer" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<CustomerDashboard />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:slug" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<CustomerOrdersPage />} />
          <Route path="invoices" element={<CustomerInvoicesPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
        </Route>

        {/* Owner ERP Portal */}
        <Route path="/erp" element={
          <ProtectedRoute allowedRoles={['owner', 'admin', 'manager', 'sales_staff', 'inventory_staff', 'accountant']}>
            <ERPLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ERPDashboard />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="customers" element={<ERPCustomersPage />} />
          <Route path="sales" element={<SalesOrdersPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="purchases" element={<PurchasePage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <WhatsAppButton />
    </Router>
  );
}
