import type { Product, Customer, Supplier, Order, Invoice, Payment, Warehouse, InventoryTransaction, Notification, KPIData } from '@/types';

// ============================
// PRODUCTS DATA
// ============================
export const products: Product[] = [
  {
    id: '1', name: 'Tata Tiscon 500D TMT Bar 8mm', slug: 'tata-tiscon-500d-8mm',
    description: 'Tata Tiscon 500D Fe-500D Grade TMT Steel Bars. Superior rib pattern for excellent bond strength with concrete. Earthquake-resistant, weldable, and corrosion-resistant. Ideal for residential, commercial, and industrial construction.',
    shortDescription: 'Fe-500D Grade TMT Steel Bar, 8mm diameter',
    category: 'tmt-steel', categoryLabel: 'TMT Steel', sku: 'TMT-TATA-8MM-500D', unit: 'Kg',
    price: 62, mrp: 68, discount: 8.8, gstRate: 18, hsnCode: '7214',
    images: ['/products/tmt-steel-1.jpg'], 
    specifications: { 'Grade': 'Fe-500D', 'Diameter': '8mm', 'Length': '12m', 'Standard': 'IS 1786:2008', 'Yield Strength': '500 N/mm²', 'Elongation': '≥16%' },
    minOrderQty: 100, maxOrderQty: 50000, stockQty: 12500, reorderLevel: 2000,
    warehouseId: 'wh1', brand: 'Tata Tiscon', weight: 1, weightUnit: 'kg',
    rating: 4.8, reviewCount: 156, isFeatured: true, tags: ['tmt', 'steel', 'tata', 'construction'],
    createdAt: '2024-01-15', updatedAt: '2024-06-20', status: 'active'
  },
  {
    id: '2', name: 'Tata Tiscon 500D TMT Bar 10mm', slug: 'tata-tiscon-500d-10mm',
    description: 'Tata Tiscon 500D Fe-500D Grade TMT Steel Bars, 10mm diameter. Superior rib pattern for excellent bond strength. Earthquake-resistant, weldable, and corrosion-resistant.',
    shortDescription: 'Fe-500D Grade TMT Steel Bar, 10mm diameter',
    category: 'tmt-steel', categoryLabel: 'TMT Steel', sku: 'TMT-TATA-10MM-500D', unit: 'Kg',
    price: 61, mrp: 67, discount: 9, gstRate: 18, hsnCode: '7214',
    images: ['/products/tmt-steel-2.jpg'],
    specifications: { 'Grade': 'Fe-500D', 'Diameter': '10mm', 'Length': '12m', 'Standard': 'IS 1786:2008', 'Yield Strength': '500 N/mm²' },
    minOrderQty: 100, maxOrderQty: 50000, stockQty: 18500, reorderLevel: 3000,
    warehouseId: 'wh1', brand: 'Tata Tiscon', weight: 1, weightUnit: 'kg',
    rating: 4.7, reviewCount: 142, isFeatured: true, tags: ['tmt', 'steel', 'tata'],
    createdAt: '2024-01-15', updatedAt: '2024-06-18', status: 'active'
  },
  {
    id: '3', name: 'JSW Neosteel 550D TMT Bar 12mm', slug: 'jsw-neosteel-550d-12mm',
    description: 'JSW Neosteel Fe-550D Grade TMT Steel Bars, 12mm diameter. Thermex technology for superior strength. CRS technology ensures corrosion resistance.',
    shortDescription: 'Fe-550D Grade TMT Steel Bar, 12mm diameter',
    category: 'tmt-steel', categoryLabel: 'TMT Steel', sku: 'TMT-JSW-12MM-550D', unit: 'Kg',
    price: 64, mrp: 72, discount: 11.1, gstRate: 18, hsnCode: '7214',
    images: ['/products/tmt-steel-3.jpg'],
    specifications: { 'Grade': 'Fe-550D', 'Diameter': '12mm', 'Length': '12m', 'Standard': 'IS 1786:2008', 'Yield Strength': '550 N/mm²' },
    minOrderQty: 100, maxOrderQty: 50000, stockQty: 9800, reorderLevel: 2000,
    warehouseId: 'wh1', brand: 'JSW Neosteel', weight: 1, weightUnit: 'kg',
    rating: 4.6, reviewCount: 98, isFeatured: true, tags: ['tmt', 'steel', 'jsw'],
    createdAt: '2024-02-10', updatedAt: '2024-06-19', status: 'active'
  },
  {
    id: '4', name: 'SAIL TMT Bar 16mm Fe-500', slug: 'sail-tmt-16mm-fe500',
    description: 'SAIL TMT Fe-500 Grade Steel Bars, 16mm diameter. Government-standard quality for large construction projects.',
    shortDescription: 'Fe-500 Grade TMT Steel Bar, 16mm diameter',
    category: 'tmt-steel', categoryLabel: 'TMT Steel', sku: 'TMT-SAIL-16MM-500', unit: 'Kg',
    price: 58, mrp: 65, discount: 10.8, gstRate: 18, hsnCode: '7214',
    images: ['/products/tmt-steel-4.jpg'],
    specifications: { 'Grade': 'Fe-500', 'Diameter': '16mm', 'Length': '12m', 'Standard': 'IS 1786:2008' },
    minOrderQty: 200, maxOrderQty: 100000, stockQty: 22000, reorderLevel: 5000,
    warehouseId: 'wh1', brand: 'SAIL', weight: 1, weightUnit: 'kg',
    rating: 4.5, reviewCount: 87, isFeatured: false, tags: ['tmt', 'steel', 'sail'],
    createdAt: '2024-01-20', updatedAt: '2024-06-15', status: 'active'
  },
  {
    id: '5', name: 'UltraTech OPC 53 Grade Cement', slug: 'ultratech-opc-53-grade',
    description: 'UltraTech OPC 53 Grade Cement. India\'s No.1 selling cement. Suitable for RCC, pre-stressed concrete, and all structural work requiring high-early-strength concrete.',
    shortDescription: '53 Grade OPC Cement, 50kg bag',
    category: 'cement', categoryLabel: 'Cement', sku: 'CEM-UT-OPC53-50', unit: 'Bag',
    price: 380, mrp: 420, discount: 9.5, gstRate: 28, hsnCode: '2523',
    images: ['/products/cement-1.jpg'],
    specifications: { 'Grade': 'OPC 53', 'Weight': '50 Kg', 'Standard': 'IS 12269:2013', 'Setting Time': '30 min initial', 'Compressive Strength': '53 MPa at 28 days' },
    minOrderQty: 10, maxOrderQty: 5000, stockQty: 3200, reorderLevel: 500,
    warehouseId: 'wh2', brand: 'UltraTech', weight: 50, weightUnit: 'kg',
    rating: 4.9, reviewCount: 234, isFeatured: true, tags: ['cement', 'opc', 'ultratech'],
    createdAt: '2024-01-10', updatedAt: '2024-06-21', status: 'active'
  },
  {
    id: '6', name: 'ACC PPC Cement', slug: 'acc-ppc-cement',
    description: 'ACC PPC (Portland Pozzolana Cement). Ideal for plastering, masonry, and tiling. Offers better workability and durability.',
    shortDescription: 'PPC Cement, 50kg bag',
    category: 'cement', categoryLabel: 'Cement', sku: 'CEM-ACC-PPC-50', unit: 'Bag',
    price: 350, mrp: 395, discount: 11.4, gstRate: 28, hsnCode: '2523',
    images: ['/products/cement-2.jpg'],
    specifications: { 'Grade': 'PPC', 'Weight': '50 Kg', 'Standard': 'IS 1489:2015', 'Fineness': '320 m²/kg' },
    minOrderQty: 10, maxOrderQty: 5000, stockQty: 2800, reorderLevel: 400,
    warehouseId: 'wh2', brand: 'ACC', weight: 50, weightUnit: 'kg',
    rating: 4.7, reviewCount: 189, isFeatured: true, tags: ['cement', 'ppc', 'acc'],
    createdAt: '2024-01-12', updatedAt: '2024-06-20', status: 'active'
  },
  {
    id: '7', name: 'Ambuja Plus Cement OPC 43', slug: 'ambuja-plus-opc-43',
    description: 'Ambuja Plus OPC 43 Grade Cement. Quality construction material for foundations, columns, and beams.',
    shortDescription: 'OPC 43 Grade Cement, 50kg bag',
    category: 'cement', categoryLabel: 'Cement', sku: 'CEM-AMB-OPC43-50', unit: 'Bag',
    price: 340, mrp: 380, discount: 10.5, gstRate: 28, hsnCode: '2523',
    images: ['/products/cement-3.jpg'],
    specifications: { 'Grade': 'OPC 43', 'Weight': '50 Kg', 'Standard': 'IS 8112:2013' },
    minOrderQty: 10, maxOrderQty: 5000, stockQty: 1850, reorderLevel: 300,
    warehouseId: 'wh2', brand: 'Ambuja', weight: 50, weightUnit: 'kg',
    rating: 4.6, reviewCount: 145, isFeatured: false, tags: ['cement', 'opc', 'ambuja'],
    createdAt: '2024-02-01', updatedAt: '2024-06-18', status: 'active'
  },
  {
    id: '8', name: 'GI Pipe 1 inch Medium', slug: 'gi-pipe-1-inch-medium',
    description: 'Galvanized Iron Pipe, 1 inch diameter, medium class. Hot-dip galvanized for superior corrosion resistance. Suitable for water supply and structural applications.',
    shortDescription: 'GI Pipe 1" Medium Class, 6m length',
    category: 'pipes', categoryLabel: 'Pipes', sku: 'PIPE-GI-1IN-MED', unit: 'Piece',
    price: 850, mrp: 980, discount: 13.3, gstRate: 18, hsnCode: '7306',
    images: ['/products/pipe-1.jpg'],
    specifications: { 'Material': 'Galvanized Iron', 'Diameter': '1 inch (25mm)', 'Length': '6m', 'Class': 'Medium', 'Standard': 'IS 1239' },
    minOrderQty: 5, maxOrderQty: 500, stockQty: 450, reorderLevel: 50,
    warehouseId: 'wh1', brand: 'Tata', weight: 8.5, weightUnit: 'kg',
    rating: 4.4, reviewCount: 67, isFeatured: false, tags: ['pipe', 'gi', 'galvanized'],
    createdAt: '2024-03-01', updatedAt: '2024-06-19', status: 'active'
  },
  {
    id: '9', name: 'MS Angle 50x50x6mm', slug: 'ms-angle-50x50x6mm',
    description: 'Mild Steel Angle 50x50x6mm. Used in structural fabrication, frames, towers, and general engineering purposes.',
    shortDescription: 'MS Equal Angle 50x50x6mm, 6m length',
    category: 'angles', categoryLabel: 'Angles', sku: 'ANG-MS-50X50X6', unit: 'Piece',
    price: 2400, mrp: 2750, discount: 12.7, gstRate: 18, hsnCode: '7216',
    images: ['/products/angle-1.jpg'],
    specifications: { 'Material': 'Mild Steel', 'Size': '50x50x6mm', 'Length': '6m', 'Type': 'Equal', 'Standard': 'IS 2062' },
    minOrderQty: 5, maxOrderQty: 500, stockQty: 320, reorderLevel: 40,
    warehouseId: 'wh1', brand: 'SAIL', weight: 27, weightUnit: 'kg',
    rating: 4.3, reviewCount: 45, isFeatured: false, tags: ['angle', 'ms', 'structural'],
    createdAt: '2024-03-15', updatedAt: '2024-06-17', status: 'active'
  },
  {
    id: '10', name: 'ISMC 150 Channel', slug: 'ismc-150-channel',
    description: 'ISMC 150 Mild Steel Channel. Standard parallel flange channel for structural and fabrication work.',
    shortDescription: 'ISMC 150 Channel, 6m length',
    category: 'channels', categoryLabel: 'Channels', sku: 'CHN-ISMC-150', unit: 'Piece',
    price: 4800, mrp: 5400, discount: 11.1, gstRate: 18, hsnCode: '7216',
    images: ['/products/channel-1.jpg'],
    specifications: { 'Type': 'ISMC 150', 'Size': '150x75mm', 'Length': '6m', 'Web Thickness': '5.7mm', 'Flange Width': '75mm' },
    minOrderQty: 2, maxOrderQty: 200, stockQty: 85, reorderLevel: 15,
    warehouseId: 'wh1', brand: 'SAIL', weight: 90, weightUnit: 'kg',
    rating: 4.4, reviewCount: 32, isFeatured: false, tags: ['channel', 'ismc', 'structural'],
    createdAt: '2024-04-01', updatedAt: '2024-06-16', status: 'active'
  },
  {
    id: '11', name: 'TMT Binding Wire 20 Gauge', slug: 'tmt-binding-wire-20-gauge',
    description: 'Soft annealed binding wire for tying TMT bars. 20 gauge, bright finish, easy to work with.',
    shortDescription: 'Binding Wire 20G, 25kg coil',
    category: 'construction-materials', categoryLabel: 'Construction Materials', sku: 'BW-20G-25KG', unit: 'Coil',
    price: 1800, mrp: 2100, discount: 14.3, gstRate: 18, hsnCode: '7217',
    images: ['/products/binding-wire.jpg'],
    specifications: { 'Gauge': '20', 'Weight': '25 Kg', 'Material': 'Mild Steel', 'Finish': 'Bright' },
    minOrderQty: 1, maxOrderQty: 200, stockQty: 180, reorderLevel: 20,
    warehouseId: 'wh1', brand: 'Local', weight: 25, weightUnit: 'kg',
    rating: 4.2, reviewCount: 78, isFeatured: false, tags: ['binding wire', 'construction'],
    createdAt: '2024-02-20', updatedAt: '2024-06-20', status: 'active'
  },
  {
    id: '12', name: 'Welding Electrode 6013 3.15mm', slug: 'welding-electrode-6013-3mm',
    description: 'General purpose welding electrode. Smooth arc, easy slag removal, all-position welding capability.',
    shortDescription: 'Welding Rod E6013, 3.15mm, 20kg box',
    category: 'construction-materials', categoryLabel: 'Construction Materials', sku: 'WE-6013-315', unit: 'Box',
    price: 1450, mrp: 1700, discount: 14.7, gstRate: 18, hsnCode: '8311',
    images: ['/products/welding-rod.jpg'],
    specifications: { 'Type': 'E6013', 'Diameter': '3.15mm', 'Weight': '20 Kg', 'Position': 'All Position' },
    minOrderQty: 1, maxOrderQty: 100, stockQty: 95, reorderLevel: 10,
    warehouseId: 'wh1', brand: 'D&H Secheron', weight: 20, weightUnit: 'kg',
    rating: 4.5, reviewCount: 56, isFeatured: false, tags: ['welding', 'electrode', 'construction'],
    createdAt: '2024-03-10', updatedAt: '2024-06-15', status: 'active'
  },
];

// ============================
// CUSTOMERS DATA
// ============================
export const customers: Customer[] = [
  {
    id: 'c1', userId: 'u10', companyName: 'Sai Constructions Pvt Ltd', contactPerson: 'Rajesh Kumar',
    email: 'rajesh@saiconstructions.in', phone: '+919876543210', gstNumber: '36AADCS1234A1Z5', panNumber: 'AADCS1234A',
    billingAddress: { id: 'a1', label: 'Head Office', line1: '45 Industrial Area', line2: 'Phase 2', city: 'Hyderabad', state: 'Telangana', pincode: '500032', country: 'India', isDefault: true },
    shippingAddresses: [{ id: 'a2', label: 'Site 1', line1: 'Survey No. 123, Shamshabad', city: 'Hyderabad', state: 'Telangana', pincode: '501218', country: 'India', isDefault: true }],
    creditLimit: 500000, creditUsed: 125000, outstandingBalance: 85000, totalOrders: 47, totalPurchases: 2350000,
    lastOrderDate: '2024-06-18', tier: 'platinum', notes: 'Premium customer, always pays on time',
    createdAt: '2023-06-15', updatedAt: '2024-06-20', status: 'active'
  },
  {
    id: 'c2', userId: 'u11', companyName: 'BuildRight Engineers', contactPerson: 'Suresh Reddy',
    email: 'suresh@buildright.in', phone: '+919876543211', gstNumber: '36AABCB5678B1Z3',
    billingAddress: { id: 'a3', label: 'Office', line1: '78 Builders Colony', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530003', country: 'India', isDefault: true },
    shippingAddresses: [{ id: 'a4', label: 'Site', line1: 'Plot 45, MVP Colony', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530017', country: 'India', isDefault: true }],
    creditLimit: 300000, creditUsed: 78000, outstandingBalance: 42000, totalOrders: 32, totalPurchases: 1580000,
    lastOrderDate: '2024-06-15', tier: 'gold',
    createdAt: '2023-08-20', updatedAt: '2024-06-18', status: 'active'
  },
  {
    id: 'c3', userId: 'u12', companyName: 'Krishna Builders', contactPerson: 'Venkat Rao',
    email: 'venkat@krishnabuilders.in', phone: '+919876543212', gstNumber: '36AADCK9012C1Z1',
    billingAddress: { id: 'a5', label: 'Office', line1: '23 Main Road, Karimnagar', city: 'Karimnagar', state: 'Telangana', pincode: '505001', country: 'India', isDefault: true },
    shippingAddresses: [],
    creditLimit: 200000, creditUsed: 45000, outstandingBalance: 28000, totalOrders: 21, totalPurchases: 890000,
    lastOrderDate: '2024-06-10', tier: 'silver',
    createdAt: '2023-11-05', updatedAt: '2024-06-15', status: 'active'
  },
  {
    id: 'c4', userId: 'u13', companyName: 'Metro Infrastructure Ltd', contactPerson: 'Anil Gupta',
    email: 'anil@metroinfra.in', phone: '+919876543213', gstNumber: '36AADCM3456D1Z9',
    billingAddress: { id: 'a6', label: 'Corporate Office', line1: '112 HITEC City', city: 'Hyderabad', state: 'Telangana', pincode: '500081', country: 'India', isDefault: true },
    shippingAddresses: [],
    creditLimit: 1000000, creditUsed: 320000, outstandingBalance: 215000, totalOrders: 65, totalPurchases: 5200000,
    lastOrderDate: '2024-06-22', tier: 'platinum',
    createdAt: '2023-03-10', updatedAt: '2024-06-22', status: 'active'
  },
  {
    id: 'c5', userId: 'u14', companyName: 'Lakshmi Homes', contactPerson: 'Priya Sharma',
    email: 'priya@lakshmihomes.in', phone: '+919876543214',
    billingAddress: { id: 'a7', label: 'Office', line1: '56 Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500033', country: 'India', isDefault: true },
    shippingAddresses: [],
    creditLimit: 150000, creditUsed: 15000, outstandingBalance: 12000, totalOrders: 8, totalPurchases: 320000,
    lastOrderDate: '2024-06-05', tier: 'bronze',
    createdAt: '2024-02-15', updatedAt: '2024-06-10', status: 'active'
  },
];

// ============================
// SUPPLIERS DATA
// ============================
export const suppliers: Supplier[] = [
  {
    id: 's1', companyName: 'Tata Steel Distribution', contactPerson: 'Amit Mehta',
    email: 'distribution@tatasteel.com', phone: '+919812345678', gstNumber: '27AAACT2727Q1ZV',
    address: { id: 'sa1', label: 'Plant', line1: 'Jamshedpur Works', city: 'Jamshedpur', state: 'Jharkhand', pincode: '831001', country: 'India', isDefault: true },
    bankDetails: { bankName: 'State Bank of India', accountNumber: '1234567890', ifscCode: 'SBIN0001234', accountType: 'Current', branchName: 'Jamshedpur Main' },
    rating: 4.9, totalOrders: 89, totalPurchases: 12500000, outstandingDues: 450000,
    lastOrderDate: '2024-06-20', paymentTerms: 'Net 30', categories: ['tmt-steel'],
    createdAt: '2023-01-10', updatedAt: '2024-06-20', status: 'active'
  },
  {
    id: 's2', companyName: 'UltraTech Cement Dealer', contactPerson: 'Vikram Singh',
    email: 'vikram@ultratechdealer.in', phone: '+919812345679', gstNumber: '36AADCU5678E1Z2',
    address: { id: 'sa2', label: 'Warehouse', line1: 'Industrial Estate, Medchal', city: 'Hyderabad', state: 'Telangana', pincode: '501401', country: 'India', isDefault: true },
    bankDetails: { bankName: 'HDFC Bank', accountNumber: '9876543210', ifscCode: 'HDFC0001234', accountType: 'Current', branchName: 'Medchal' },
    rating: 4.7, totalOrders: 56, totalPurchases: 8900000, outstandingDues: 280000,
    lastOrderDate: '2024-06-19', paymentTerms: 'Net 15', categories: ['cement'],
    createdAt: '2023-02-15', updatedAt: '2024-06-19', status: 'active'
  },
  {
    id: 's3', companyName: 'SAIL Authorized Dealer', contactPerson: 'Ramesh Agarwal',
    email: 'ramesh@saildealer.in', phone: '+919812345680', gstNumber: '36AADCS9012F1Z8',
    address: { id: 'sa3', label: 'Godown', line1: '34 Industrial Area, Nacharam', city: 'Hyderabad', state: 'Telangana', pincode: '500076', country: 'India', isDefault: true },
    bankDetails: { bankName: 'Bank of Baroda', accountNumber: '5678901234', ifscCode: 'BARB0NACHRY', accountType: 'Current', branchName: 'Nacharam' },
    rating: 4.5, totalOrders: 34, totalPurchases: 5600000, outstandingDues: 180000,
    lastOrderDate: '2024-06-17', paymentTerms: 'Net 30', categories: ['tmt-steel', 'angles', 'channels'],
    createdAt: '2023-04-20', updatedAt: '2024-06-17', status: 'active'
  },
];

// ============================
// ORDERS DATA
// ============================
export const orders: Order[] = [
  {
    id: 'o1', orderNumber: 'JE-240620-0001', customerId: 'c1', customerName: 'Sai Constructions Pvt Ltd', customerEmail: 'rajesh@saiconstructions.in',
    items: [
      { id: 'oi1', productId: '1', productName: 'Tata Tiscon 500D TMT Bar 8mm', sku: 'TMT-TATA-8MM-500D', unit: 'Kg', quantity: 2000, price: 62, gstRate: 18, gstAmount: 22320, totalAmount: 146320 },
      { id: 'oi2', productId: '5', productName: 'UltraTech OPC 53 Grade Cement', sku: 'CEM-UT-OPC53-50', unit: 'Bag', quantity: 200, price: 380, gstRate: 28, gstAmount: 21280, totalAmount: 97280 },
    ],
    subtotal: 200000, gstAmount: 43600, shippingCharges: 5000, discount: 0, totalAmount: 248600,
    paidAmount: 200000, balanceAmount: 48600,
    orderStatus: 'delivered', paymentStatus: 'partial', paymentMethod: 'bank_transfer',
    shippingAddress: { id: 'a2', label: 'Site 1', line1: 'Survey No. 123, Shamshabad', city: 'Hyderabad', state: 'Telangana', pincode: '501218', country: 'India', isDefault: true },
    billingAddress: { id: 'a1', label: 'Head Office', line1: '45 Industrial Area, Phase 2', city: 'Hyderabad', state: 'Telangana', pincode: '500032', country: 'India', isDefault: true },
    expectedDelivery: '2024-06-22', deliveredAt: '2024-06-21',
    invoiceId: 'inv1', createdAt: '2024-06-20', updatedAt: '2024-06-21', status: 'active'
  },
  {
    id: 'o2', orderNumber: 'JE-240619-0002', customerId: 'c2', customerName: 'BuildRight Engineers', customerEmail: 'suresh@buildright.in',
    items: [
      { id: 'oi3', productId: '3', productName: 'JSW Neosteel 550D TMT Bar 12mm', sku: 'TMT-JSW-12MM-550D', unit: 'Kg', quantity: 3000, price: 64, gstRate: 18, gstAmount: 34560, totalAmount: 226560 },
    ],
    subtotal: 192000, gstAmount: 34560, shippingCharges: 4000, discount: 2000, totalAmount: 228560,
    paidAmount: 228560, balanceAmount: 0,
    orderStatus: 'shipped', paymentStatus: 'paid', paymentMethod: 'upi',
    shippingAddress: { id: 'a4', label: 'Site', line1: 'Plot 45, MVP Colony', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530017', country: 'India', isDefault: true },
    billingAddress: { id: 'a3', label: 'Office', line1: '78 Builders Colony', city: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530003', country: 'India', isDefault: true },
    expectedDelivery: '2024-06-25', trackingNumber: 'TRK-2024-56789',
    invoiceId: 'inv2', createdAt: '2024-06-19', updatedAt: '2024-06-22', status: 'active'
  },
  {
    id: 'o3', orderNumber: 'JE-240622-0003', customerId: 'c4', customerName: 'Metro Infrastructure Ltd', customerEmail: 'anil@metroinfra.in',
    items: [
      { id: 'oi4', productId: '2', productName: 'Tata Tiscon 500D TMT Bar 10mm', sku: 'TMT-TATA-10MM-500D', unit: 'Kg', quantity: 5000, price: 61, gstRate: 18, gstAmount: 54900, totalAmount: 359900 },
      { id: 'oi5', productId: '6', productName: 'ACC PPC Cement', sku: 'CEM-ACC-PPC-50', unit: 'Bag', quantity: 500, price: 350, gstRate: 28, gstAmount: 49000, totalAmount: 224000 },
      { id: 'oi6', productId: '11', productName: 'TMT Binding Wire 20 Gauge', sku: 'BW-20G-25KG', unit: 'Coil', quantity: 20, price: 1800, gstRate: 18, gstAmount: 6480, totalAmount: 42480 },
    ],
    subtotal: 516000, gstAmount: 110380, shippingCharges: 8000, discount: 5000, totalAmount: 629380,
    paidAmount: 300000, balanceAmount: 329380,
    orderStatus: 'processing', paymentStatus: 'partial', paymentMethod: 'bank_transfer',
    shippingAddress: { id: 'a6', label: 'Corporate Office', line1: '112 HITEC City', city: 'Hyderabad', state: 'Telangana', pincode: '500081', country: 'India', isDefault: true },
    billingAddress: { id: 'a6', label: 'Corporate Office', line1: '112 HITEC City', city: 'Hyderabad', state: 'Telangana', pincode: '500081', country: 'India', isDefault: true },
    expectedDelivery: '2024-06-28',
    createdAt: '2024-06-22', updatedAt: '2024-06-22', status: 'active'
  },
  {
    id: 'o4', orderNumber: 'JE-240615-0004', customerId: 'c3', customerName: 'Krishna Builders', customerEmail: 'venkat@krishnabuilders.in',
    items: [
      { id: 'oi7', productId: '7', productName: 'Ambuja Plus Cement OPC 43', sku: 'CEM-AMB-OPC43-50', unit: 'Bag', quantity: 100, price: 340, gstRate: 28, gstAmount: 9520, totalAmount: 43520 },
    ],
    subtotal: 34000, gstAmount: 9520, shippingCharges: 2000, discount: 0, totalAmount: 45520,
    paidAmount: 45520, balanceAmount: 0,
    orderStatus: 'delivered', paymentStatus: 'paid', paymentMethod: 'cash',
    shippingAddress: { id: 'a5', label: 'Office', line1: '23 Main Road, Karimnagar', city: 'Karimnagar', state: 'Telangana', pincode: '505001', country: 'India', isDefault: true },
    billingAddress: { id: 'a5', label: 'Office', line1: '23 Main Road, Karimnagar', city: 'Karimnagar', state: 'Telangana', pincode: '505001', country: 'India', isDefault: true },
    expectedDelivery: '2024-06-18', deliveredAt: '2024-06-17',
    invoiceId: 'inv3', createdAt: '2024-06-15', updatedAt: '2024-06-17', status: 'active'
  },
  {
    id: 'o5', orderNumber: 'JE-240623-0005', customerId: 'c5', customerName: 'Lakshmi Homes', customerEmail: 'priya@lakshmihomes.in',
    items: [
      { id: 'oi8', productId: '1', productName: 'Tata Tiscon 500D TMT Bar 8mm', sku: 'TMT-TATA-8MM-500D', unit: 'Kg', quantity: 500, price: 62, gstRate: 18, gstAmount: 5580, totalAmount: 36580 },
      { id: 'oi9', productId: '8', productName: 'GI Pipe 1 inch Medium', sku: 'PIPE-GI-1IN-MED', unit: 'Piece', quantity: 20, price: 850, gstRate: 18, gstAmount: 3060, totalAmount: 20060 },
    ],
    subtotal: 48000, gstAmount: 8640, shippingCharges: 2500, discount: 0, totalAmount: 59140,
    paidAmount: 0, balanceAmount: 59140,
    orderStatus: 'pending', paymentStatus: 'pending', paymentMethod: 'razorpay',
    shippingAddress: { id: 'a7', label: 'Office', line1: '56 Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500033', country: 'India', isDefault: true },
    billingAddress: { id: 'a7', label: 'Office', line1: '56 Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500033', country: 'India', isDefault: true },
    expectedDelivery: '2024-06-28',
    createdAt: '2024-06-23', updatedAt: '2024-06-23', status: 'active'
  },
];

// ============================
// INVOICES DATA
// ============================
export const invoices: Invoice[] = [
  {
    id: 'inv1', invoiceNumber: 'INV/24-25/00001', orderId: 'o1', orderNumber: 'JE-240620-0001',
    customerId: 'c1', customerName: 'Rajesh Kumar', companyName: 'Sai Constructions Pvt Ltd', gstNumber: '36AADCS1234A1Z5',
    items: orders[0].items, subtotal: 200000, cgst: 21800, sgst: 21800, igst: 0, totalGst: 43600,
    totalAmount: 243600, roundOff: 0, grandTotal: 248600, paidAmount: 200000, balanceAmount: 48600,
    paymentStatus: 'partial', dueDate: '2024-07-20',
    createdAt: '2024-06-20', updatedAt: '2024-06-21', status: 'active'
  },
  {
    id: 'inv2', invoiceNumber: 'INV/24-25/00002', orderId: 'o2', orderNumber: 'JE-240619-0002',
    customerId: 'c2', customerName: 'Suresh Reddy', companyName: 'BuildRight Engineers', gstNumber: '36AABCB5678B1Z3',
    items: orders[1].items, subtotal: 192000, cgst: 17280, sgst: 17280, igst: 0, totalGst: 34560,
    totalAmount: 226560, roundOff: 0, grandTotal: 228560, paidAmount: 228560, balanceAmount: 0,
    paymentStatus: 'paid', dueDate: '2024-07-19',
    createdAt: '2024-06-19', updatedAt: '2024-06-22', status: 'active'
  },
];

// ============================
// PAYMENTS DATA
// ============================
export const payments: Payment[] = [
  { id: 'p1', paymentNumber: 'PAY-240620-001', orderId: 'o1', invoiceId: 'inv1', customerId: 'c1', type: 'received', amount: 200000, method: 'bank_transfer', reference: 'NEFT/2024/123456', transactionId: 'TXN123456', paymentDate: '2024-06-20', createdAt: '2024-06-20', updatedAt: '2024-06-20', status: 'active' },
  { id: 'p2', paymentNumber: 'PAY-240619-002', orderId: 'o2', invoiceId: 'inv2', customerId: 'c2', type: 'received', amount: 228560, method: 'upi', reference: 'UPI/2024/789012', transactionId: 'TXN789012', paymentDate: '2024-06-19', createdAt: '2024-06-19', updatedAt: '2024-06-19', status: 'active' },
  { id: 'p3', paymentNumber: 'PAY-240617-003', orderId: 'o4', customerId: 'c3', type: 'received', amount: 45520, method: 'cash', paymentDate: '2024-06-17', createdAt: '2024-06-17', updatedAt: '2024-06-17', status: 'active' },
  { id: 'p4', paymentNumber: 'PAY-240622-004', supplierId: 's1', type: 'made', amount: 500000, method: 'bank_transfer', reference: 'NEFT/2024/654321', paymentDate: '2024-06-22', createdAt: '2024-06-22', updatedAt: '2024-06-22', status: 'active' },
  { id: 'p5', paymentNumber: 'PAY-240620-005', supplierId: 's2', type: 'made', amount: 300000, method: 'bank_transfer', reference: 'RTGS/2024/111222', paymentDate: '2024-06-20', createdAt: '2024-06-20', updatedAt: '2024-06-20', status: 'active' },
];

// ============================
// WAREHOUSES DATA
// ============================
export const warehouses: Warehouse[] = [
  { id: 'wh1', name: 'Main Warehouse - Nacharam', code: 'WH-NCH', address: { id: 'wa1', label: 'Main', line1: '45 Industrial Area, Nacharam', city: 'Hyderabad', state: 'Telangana', pincode: '500076', country: 'India', isDefault: true }, capacity: 50000, utilized: 35600, managerId: 'u3', managerName: 'Ravi Kumar', createdAt: '2023-01-01', updatedAt: '2024-06-22', status: 'active' },
  { id: 'wh2', name: 'Cement Godown - Medchal', code: 'WH-MDL', address: { id: 'wa2', label: 'Cement', line1: 'Plot 78, Industrial Estate', city: 'Medchal', state: 'Telangana', pincode: '501401', country: 'India', isDefault: true }, capacity: 20000, utilized: 7850, managerId: 'u4', managerName: 'Sunil Yadav', createdAt: '2023-03-15', updatedAt: '2024-06-21', status: 'active' },
];

// ============================
// INVENTORY TRANSACTIONS
// ============================
export const inventoryTransactions: InventoryTransaction[] = [
  { id: 'it1', productId: '1', productName: 'Tata Tiscon 500D TMT Bar 8mm', warehouseId: 'wh1', warehouseName: 'Main Warehouse', type: 'stock_in', quantity: 5000, previousQty: 9500, newQty: 14500, reference: 'PO-2024-001', performedBy: 'Ravi Kumar', createdAt: '2024-06-18', updatedAt: '2024-06-18', status: 'active' },
  { id: 'it2', productId: '1', productName: 'Tata Tiscon 500D TMT Bar 8mm', warehouseId: 'wh1', warehouseName: 'Main Warehouse', type: 'stock_out', quantity: 2000, previousQty: 14500, newQty: 12500, reference: 'JE-240620-0001', performedBy: 'Ravi Kumar', createdAt: '2024-06-20', updatedAt: '2024-06-20', status: 'active' },
  { id: 'it3', productId: '5', productName: 'UltraTech OPC 53 Grade Cement', warehouseId: 'wh2', warehouseName: 'Cement Godown', type: 'stock_in', quantity: 1000, previousQty: 2400, newQty: 3400, reference: 'PO-2024-005', performedBy: 'Sunil Yadav', createdAt: '2024-06-19', updatedAt: '2024-06-19', status: 'active' },
  { id: 'it4', productId: '5', productName: 'UltraTech OPC 53 Grade Cement', warehouseId: 'wh2', warehouseName: 'Cement Godown', type: 'stock_out', quantity: 200, previousQty: 3400, newQty: 3200, reference: 'JE-240620-0001', performedBy: 'Sunil Yadav', createdAt: '2024-06-20', updatedAt: '2024-06-20', status: 'active' },
];

// ============================
// NOTIFICATIONS DATA
// ============================
export const notifications: Notification[] = [
  { id: 'n1', userId: 'u1', title: 'New Order Received', message: 'Order JE-240623-0005 from Lakshmi Homes for ₹59,140', type: 'info', isRead: false, link: '/erp/sales/orders/o5', createdAt: '2024-06-23T10:30:00', updatedAt: '2024-06-23', status: 'active' },
  { id: 'n2', userId: 'u1', title: 'Low Stock Alert', message: 'ISMC 150 Channel stock is below reorder level (85 units)', type: 'warning', isRead: false, link: '/erp/inventory', createdAt: '2024-06-23T09:15:00', updatedAt: '2024-06-23', status: 'active' },
  { id: 'n3', userId: 'u1', title: 'Payment Received', message: '₹2,28,560 received from BuildRight Engineers via UPI', type: 'success', isRead: true, link: '/erp/billing/payments/p2', createdAt: '2024-06-22T14:20:00', updatedAt: '2024-06-22', status: 'active' },
  { id: 'n4', userId: 'u1', title: 'Invoice Overdue', message: 'Invoice INV/24-25/00001 for Sai Constructions is partially unpaid', type: 'danger', isRead: false, link: '/erp/billing/invoices/inv1', createdAt: '2024-06-22T08:00:00', updatedAt: '2024-06-22', status: 'active' },
];

// ============================
// DASHBOARD KPI DATA
// ============================
export const dashboardKPIs: KPIData[] = [
  { label: 'Total Revenue', value: '₹45.2L', change: 12.5, changeLabel: 'vs last month', icon: 'IndianRupee', color: '#f59e0b', trend: 'up' },
  { label: 'Net Profit', value: '₹8.4L', change: 8.2, changeLabel: 'vs last month', icon: 'TrendingUp', color: '#22c55e', trend: 'up' },
  { label: 'Total Orders', value: '127', change: 15.3, changeLabel: 'vs last month', icon: 'ShoppingCart', color: '#3b82f6', trend: 'up' },
  { label: 'Pending Payments', value: '₹4.8L', change: -5.2, changeLabel: 'vs last month', icon: 'Clock', color: '#f97316', trend: 'down' },
  { label: 'Inventory Value', value: '₹1.2Cr', change: 3.1, changeLabel: 'vs last month', icon: 'Package', color: '#8b5cf6', trend: 'up' },
  { label: 'Active Customers', value: '48', change: 6.7, changeLabel: 'vs last month', icon: 'Users', color: '#06b6d4', trend: 'up' },
  { label: 'Active Suppliers', value: '12', change: 0, changeLabel: 'unchanged', icon: 'Truck', color: '#ec4899', trend: 'stable' },
  { label: "Today's Sales", value: '₹3.2L', change: 22.1, changeLabel: 'vs yesterday', icon: 'Zap', color: '#fbbf24', trend: 'up' },
];

// ============================
// CHART DATA
// ============================
export const revenueChartData = [
  { month: 'Jan', revenue: 2800000, profit: 520000, expenses: 2280000 },
  { month: 'Feb', revenue: 3200000, profit: 610000, expenses: 2590000 },
  { month: 'Mar', revenue: 3500000, profit: 680000, expenses: 2820000 },
  { month: 'Apr', revenue: 3100000, profit: 590000, expenses: 2510000 },
  { month: 'May', revenue: 3800000, profit: 740000, expenses: 3060000 },
  { month: 'Jun', revenue: 4520000, profit: 840000, expenses: 3680000 },
];

export const salesByCategoryData = [
  { name: 'TMT Steel', value: 58, fill: '#f59e0b' },
  { name: 'Cement', value: 25, fill: '#3b82f6' },
  { name: 'Pipes', value: 7, fill: '#8b5cf6' },
  { name: 'Angles', value: 4, fill: '#ec4899' },
  { name: 'Channels', value: 3, fill: '#06b6d4' },
  { name: 'Others', value: 3, fill: '#64748b' },
];

export const monthlyOrdersData = [
  { month: 'Jan', orders: 85, delivered: 78, cancelled: 3 },
  { month: 'Feb', orders: 92, delivered: 86, cancelled: 2 },
  { month: 'Mar', orders: 108, delivered: 99, cancelled: 4 },
  { month: 'Apr', orders: 95, delivered: 89, cancelled: 2 },
  { month: 'May', orders: 115, delivered: 107, cancelled: 3 },
  { month: 'Jun', orders: 127, delivered: 98, cancelled: 1 },
];

export const inventoryLevelsData = [
  { name: 'TMT 8mm', current: 12500, reorder: 2000, max: 20000 },
  { name: 'TMT 10mm', current: 18500, reorder: 3000, max: 25000 },
  { name: 'TMT 12mm', current: 9800, reorder: 2000, max: 15000 },
  { name: 'TMT 16mm', current: 22000, reorder: 5000, max: 30000 },
  { name: 'UltraTech', current: 3200, reorder: 500, max: 5000 },
  { name: 'ACC PPC', current: 2800, reorder: 400, max: 4000 },
  { name: 'Ambuja', current: 1850, reorder: 300, max: 3000 },
];

// ============================
// FORECAST DATA
// ============================
export const salesForecastData = [
  { period: 'Jul 24', actual: undefined, predicted: 4800000, lowerBound: 4200000, upperBound: 5400000 },
  { period: 'Aug 24', actual: undefined, predicted: 5100000, lowerBound: 4400000, upperBound: 5800000 },
  { period: 'Sep 24', actual: undefined, predicted: 4600000, lowerBound: 3900000, upperBound: 5300000 },
  { period: 'Oct 24', actual: undefined, predicted: 5500000, lowerBound: 4700000, upperBound: 6300000 },
  { period: 'Nov 24', actual: undefined, predicted: 5200000, lowerBound: 4500000, upperBound: 5900000 },
  { period: 'Dec 24', actual: undefined, predicted: 4900000, lowerBound: 4100000, upperBound: 5700000 },
];

// Current user mock
export const currentUser: import('@/types').User = {
  id: 'u1',
  email: 'owner@jayasree.in',
  name: 'Jayasree Kumar',
  phone: '+919100277157',
  role: 'owner',
  avatar: '',
  isVerified: true,
  lastLogin: '2024-06-23T10:00:00',
  createdAt: '2023-01-01',
  updatedAt: '2024-06-23',
  status: 'active',
};
