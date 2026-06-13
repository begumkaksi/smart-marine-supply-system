import {
  BarChart3,
  Boxes,
  BrainCircuit,
  ClipboardCheck,
  FileText,
  GitCompareArrows,
  Globe2,
  LayoutDashboard,
  LineChart,
  Settings,
  Ship,
  TableProperties,
  UploadCloud
} from "lucide-react";

export const navItems = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Supply Upload", href: "/upload", icon: UploadCloud },
  { title: "AI Analysis", href: "/ai-analysis", icon: BrainCircuit },
  { title: "Supplier Database", href: "/supplier-database", icon: TableProperties },
  { title: "Comparison", href: "/supplier-comparison", icon: GitCompareArrows },
  { title: "Optimization", href: "/optimization", icon: BrainCircuit },
  { title: "Results", href: "/results", icon: LineChart },
  { title: "Reports", href: "/report-generation", icon: FileText },
  { title: "Settings", href: "/settings", icon: Settings }
];

export const kpis = [
  { label: "Total Suppliers", value: "1,800+", change: "Global verified network", tone: "text-cyan-700" },
  { label: "Procurement Requests", value: "5,200+", change: "Across active fleets", tone: "text-cyan-700" },
  { label: "Average Cost Saving", value: "15-30%", change: "AI-optimized sourcing", tone: "text-emerald-600" },
  { label: "Lead Time Reduction", value: "20-40%", change: "Port-aware matching", tone: "text-emerald-600" }
];

export const monthlyProcurementRequests = [
  { month: "Jan", requests: 362 },
  { month: "Feb", requests: 388 },
  { month: "Mar", requests: 421 },
  { month: "Apr", requests: 456 },
  { month: "May", requests: 487 },
  { month: "Jun", requests: 512 },
  { month: "Jul", requests: 548 },
  { month: "Aug", requests: 575 },
  { month: "Sep", requests: 601 },
  { month: "Oct", requests: 638 },
  { month: "Nov", requests: 657 },
  { month: "Dec", requests: 694 }
];

export const supplierPerformance = [
  { name: "NordPort", reliability: 96, delivery: 92 },
  { name: "Atlas", reliability: 94, delivery: 95 },
  { name: "Bluewake", reliability: 88, delivery: 84 },
  { name: "Harborline", reliability: 91, delivery: 87 },
  { name: "OceanLink", reliability: 89, delivery: 90 },
  { name: "Marisafe", reliability: 93, delivery: 89 }
];

export const costSavingsTrend = [
  { month: "Jan", savings: 15 },
  { month: "Feb", savings: 17 },
  { month: "Mar", savings: 19 },
  { month: "Apr", savings: 21 },
  { month: "May", savings: 22 },
  { month: "Jun", savings: 24 },
  { month: "Jul", savings: 25 },
  { month: "Aug", savings: 27 },
  { month: "Sep", savings: 26 },
  { month: "Oct", savings: 28 },
  { month: "Nov", savings: 29 },
  { month: "Dec", savings: 30 }
];

export const savingsTrend = [
  { month: "Jan", optimized: 124, baseline: 168 },
  { month: "Feb", optimized: 138, baseline: 179 },
  { month: "Mar", optimized: 126, baseline: 171 },
  { month: "Apr", optimized: 149, baseline: 205 },
  { month: "May", optimized: 158, baseline: 224 },
  { month: "Jun", optimized: 142, baseline: 212 },
  { month: "Jul", optimized: 132, baseline: 194 },
  { month: "Aug", optimized: 151, baseline: 226 }
];

export const categorySpend = [
  { name: "Provisions", value: 31 },
  { name: "Engine", value: 24 },
  { name: "Deck", value: 19 },
  { name: "Safety", value: 14 },
  { name: "Cabin", value: 12 }
];

export const suppliers = [
  {
    name: "NordPort Marine",
    region: "Rotterdam",
    score: 96,
    lead: "22h",
    savings: "$86K",
    status: "Preferred"
  },
  {
    name: "Atlas Ship Chandlers",
    region: "Singapore",
    score: 92,
    lead: "18h",
    savings: "$74K",
    status: "Preferred"
  },
  {
    name: "Bluewake Supply Co.",
    region: "Busan",
    score: 87,
    lead: "31h",
    savings: "$49K",
    status: "Watch"
  },
  {
    name: "Harborline Logistics",
    region: "Dubai",
    score: 83,
    lead: "28h",
    savings: "$41K",
    status: "Qualified"
  }
];

export const supplierDatabase = [
  { name: "NordPort Marine", port: "Rotterdam", category: "Provisions", costIndex: 91, deliveryTime: "22h", reliability: 96, stock: "High", score: 96 },
  { name: "Atlas Ship Chandlers", port: "Singapore", category: "Engine", costIndex: 88, deliveryTime: "18h", reliability: 94, stock: "High", score: 94 },
  { name: "Bluewake Supply Co.", port: "Busan", category: "Deck", costIndex: 83, deliveryTime: "31h", reliability: 88, stock: "Medium", score: 87 },
  { name: "Harborline Logistics", port: "Jebel Ali", category: "Safety", costIndex: 86, deliveryTime: "28h", reliability: 91, stock: "High", score: 89 },
  { name: "OceanLink Stores", port: "Hamburg", category: "Cabin", costIndex: 84, deliveryTime: "26h", reliability: 89, stock: "Medium", score: 86 },
  { name: "Marisafe Technical", port: "Antwerp", category: "Safety", costIndex: 82, deliveryTime: "24h", reliability: 93, stock: "High", score: 90 },
  { name: "Pacific Berth Supply", port: "Shanghai", category: "Provisions", costIndex: 87, deliveryTime: "20h", reliability: 90, stock: "High", score: 91 },
  { name: "Baltic Marine Parts", port: "Gdansk", category: "Engine", costIndex: 79, deliveryTime: "35h", reliability: 85, stock: "Medium", score: 82 },
  { name: "Aegean Vessel Supply", port: "Piraeus", category: "Deck", costIndex: 81, deliveryTime: "29h", reliability: 87, stock: "Medium", score: 84 },
  { name: "Gulf Horizon Trading", port: "Doha", category: "Cabin", costIndex: 85, deliveryTime: "25h", reliability: 88, stock: "High", score: 87 },
  { name: "Arctic Port Services", port: "Oslo", category: "Safety", costIndex: 78, deliveryTime: "38h", reliability: 92, stock: "Low", score: 81 },
  { name: "MedBlue Chandlers", port: "Valencia", category: "Provisions", costIndex: 89, deliveryTime: "21h", reliability: 90, stock: "High", score: 92 },
  { name: "Evergreen Marine Supply", port: "Kaohsiung", category: "Engine", costIndex: 86, deliveryTime: "27h", reliability: 87, stock: "High", score: 88 },
  { name: "CapeRoute Procurement", port: "Cape Town", category: "Deck", costIndex: 80, deliveryTime: "34h", reliability: 84, stock: "Medium", score: 80 },
  { name: "Portside Provisions", port: "Los Angeles", category: "Provisions", costIndex: 84, deliveryTime: "23h", reliability: 86, stock: "High", score: 86 },
  { name: "Canal Line Supply", port: "Panama", category: "Safety", costIndex: 82, deliveryTime: "30h", reliability: 89, stock: "Medium", score: 85 },
  { name: "Iberia Ship Stores", port: "Lisbon", category: "Cabin", costIndex: 88, deliveryTime: "24h", reliability: 88, stock: "High", score: 89 },
  { name: "NorthSea Components", port: "Bergen", category: "Engine", costIndex: 77, deliveryTime: "36h", reliability: 91, stock: "Medium", score: 83 },
  { name: "Red Sea Maritime", port: "Jeddah", category: "Deck", costIndex: 83, deliveryTime: "28h", reliability: 86, stock: "High", score: 85 },
  { name: "EastPort Essentials", port: "Tokyo", category: "Provisions", costIndex: 90, deliveryTime: "19h", reliability: 92, stock: "High", score: 94 },
  { name: "Lighthouse Marine Co.", port: "Vancouver", category: "Safety", costIndex: 81, deliveryTime: "33h", reliability: 90, stock: "Medium", score: 84 },
  { name: "Bayline Technical", port: "Houston", category: "Engine", costIndex: 85, deliveryTime: "26h", reliability: 89, stock: "High", score: 88 },
  { name: "BlackSea Stores", port: "Constanta", category: "Cabin", costIndex: 79, deliveryTime: "37h", reliability: 83, stock: "Low", score: 78 },
  { name: "Sunda Strait Supply", port: "Jakarta", category: "Provisions", costIndex: 87, deliveryTime: "22h", reliability: 87, stock: "High", score: 88 },
  { name: "Emirates Marine Hub", port: "Abu Dhabi", category: "Deck", costIndex: 86, deliveryTime: "24h", reliability: 90, stock: "High", score: 90 },
  { name: "Nile Delta Chandlers", port: "Alexandria", category: "Safety", costIndex: 80, deliveryTime: "32h", reliability: 86, stock: "Medium", score: 82 },
  { name: "Atlantic Spares", port: "New York", category: "Engine", costIndex: 83, deliveryTime: "29h", reliability: 88, stock: "Medium", score: 85 },
  { name: "Seaway Global Supply", port: "Montreal", category: "Cabin", costIndex: 84, deliveryTime: "30h", reliability: 89, stock: "High", score: 86 }
];

export const comparisonSuppliers = supplierDatabase.slice(0, 6).map((supplier) => ({
  supplier: supplier.name,
  cost: `${supplier.costIndex}/100`,
  deliveryTime: supplier.deliveryTime,
  reliability: `${supplier.reliability}%`,
  stockAvailability: supplier.stock,
  overallScore: supplier.score
}));

export const optimizationWeights = [
  { label: "Cost", value: 40 },
  { label: "Delivery Time", value: 25 },
  { label: "Reliability", value: 20 },
  { label: "Stock Availability", value: 15 }
];

export const demandForecast = [
  { week: "W24", provisions: 74, engine: 44, safety: 31 },
  { week: "W25", provisions: 82, engine: 48, safety: 34 },
  { week: "W26", provisions: 79, engine: 53, safety: 29 },
  { week: "W27", provisions: 91, engine: 57, safety: 37 },
  { week: "W28", provisions: 88, engine: 62, safety: 41 },
  { week: "W29", provisions: 97, engine: 66, safety: 43 }
];

export const routes = [
  { port: "Rotterdam", vessel: "MV North Star", eta: "12 Jun 18:40", fill: 78 },
  { port: "Singapore", vessel: "MV Ardent Sea", eta: "14 Jun 09:10", fill: 91 },
  { port: "Busan", vessel: "MV Meridian", eta: "16 Jun 03:25", fill: 64 },
  { port: "Jebel Ali", vessel: "MV Tideway", eta: "18 Jun 21:30", fill: 72 }
];

export const purchaseOrders = [
  { id: "PO-7814", vessel: "MV North Star", category: "Provisions", value: "$42,800", status: "Ready" },
  { id: "PO-7815", vessel: "MV Ardent Sea", category: "Engine", value: "$68,300", status: "Optimizing" },
  { id: "PO-7816", vessel: "MV Meridian", category: "Safety", value: "$21,900", status: "Review" },
  { id: "PO-7817", vessel: "MV Tideway", category: "Deck", value: "$35,600", status: "Ready" }
];

export const pageSummaries = {
  upload: {
    title: "Supply List Intake",
    description: "Upload CSV and Excel supply lists, drag files into the workspace, or manually enter urgent vessel requisitions.",
    icon: UploadCloud
  },
  aiAnalysis: {
    title: "AI Analysis Workflow",
    description: "Convert raw supply lists into clean demand predictions, supplier evaluations, and optimized recommendations.",
    icon: ClipboardCheck
  },
  suppliers: {
    title: "Supplier Selection",
    description: "Rank suppliers by cost, port coverage, lead time, compliance, inventory depth, and delivery confidence.",
    icon: Ship
  },
  supplierDatabase: {
    title: "Supplier Database",
    description: "Search, filter, and sort the verified maritime supplier network by port, category, inventory, and AI score.",
    icon: TableProperties
  },
  supplierComparison: {
    title: "Supplier Comparison",
    description: "Compare supplier cost, delivery time, reliability, stock availability, and overall score side by side.",
    icon: GitCompareArrows
  },
  optimization: {
    title: "Procurement Optimization",
    description: "Apply AI scoring weights across cost, delivery time, reliability, and stock availability before purchase approval.",
    icon: BrainCircuit
  },
  results: {
    title: "Results Dashboard",
    description: "Track optimized award outcomes, savings captured, fulfillment risk, and supplier recommendation quality.",
    icon: LineChart
  },
  reportGeneration: {
    title: "Report Generation",
    description: "Generate executive procurement summaries, supplier scorecards, savings reports, and audit-ready exports.",
    icon: FileText
  },
  demand: {
    title: "Demand Prediction",
    description: "Forecast replenishment demand by vessel route, consumption history, seasonality, and crew profile.",
    icon: Boxes
  },
  visibility: {
    title: "Supply Chain Visibility",
    description: "Track procurement readiness, port handoffs, shipment milestones, and exception alerts in one place.",
    icon: Globe2
  },
  reports: {
    title: "Procurement Performance",
    description: "Monitor savings capture, supplier performance, forecast accuracy, and operational resilience.",
    icon: BarChart3
  },
  settings: {
    title: "Platform Settings",
    description: "Configure approval rules, AI thresholds, supplier scoring weights, and maritime ERP integrations.",
    icon: Settings
  }
};
