export type SupplyItem = {
  item: string;
  category: string;
  quantity: string;
  priority: string;
  port: string;
  status: string;
};

export type SupplierRecommendation = {
  item: string;
  recommendedSupplier: string;
  backupSupplier: string;
  estimatedCost: string;
  deliveryTime: string;
  stockAvailability: string;
  riskLevel: string;
};

export type ProcurementBatch = {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  analysisStatus: "Uploaded" | "Analyzing" | "Analyzed" | "Optimized" | "Reported";
  detectedItems: SupplyItem[];
  recommendations?: SupplierRecommendation[];
  metrics?: {
    expectedCostSaving: string;
    leadTimeReduction: string;
    riskScore: string;
  };
};

export const PROCUREMENT_BATCH_KEY = "smart-marine-current-procurement-batch";

const baseItems: SupplyItem[] = [
  { item: "Hydraulic Oil", category: "Engine", quantity: "24 drums", priority: "High", port: "Rotterdam", status: "Detected" },
  { item: "Engine Filters", category: "Engine", quantity: "48 units", priority: "Critical", port: "Singapore", status: "Detected" },
  { item: "Safety Gloves", category: "Safety", quantity: "180 pairs", priority: "Medium", port: "Busan", status: "Detected" },
  { item: "Navigation Lamp", category: "Deck", quantity: "16 units", priority: "High", port: "Jebel Ali", status: "Detected" },
  { item: "First Aid Kit", category: "Safety", quantity: "22 kits", priority: "High", port: "Hamburg", status: "Detected" },
  { item: "Marine Paint", category: "Deck", quantity: "35 cans", priority: "Medium", port: "Antwerp", status: "Detected" },
  { item: "Bolts M10", category: "Engine", quantity: "600 pcs", priority: "Low", port: "Rotterdam", status: "Detected" }
];

const provisionItems: SupplyItem[] = [
  { item: "Fresh Provisions", category: "Provisions", quantity: "420 kg", priority: "High", port: "Valencia", status: "Detected" },
  { item: "Cabin Linens", category: "Cabin", quantity: "90 sets", priority: "Medium", port: "Lisbon", status: "Detected" },
  { item: "Galley Cleaning Kit", category: "Cabin", quantity: "45 boxes", priority: "Medium", port: "Singapore", status: "Detected" }
];

const safetyItems: SupplyItem[] = [
  { item: "Life Raft Service Kit", category: "Safety", quantity: "12 kits", priority: "Critical", port: "Busan", status: "Detected" },
  { item: "Fire Extinguisher Refill", category: "Safety", quantity: "30 units", priority: "High", port: "Jebel Ali", status: "Detected" },
  { item: "Safety Harness", category: "Safety", quantity: "24 units", priority: "High", port: "Rotterdam", status: "Detected" }
];

const supplierByCategory: Record<string, { primary: string; backup: string }> = {
  Engine: { primary: "Atlas Ship Chandlers", backup: "Bayline Technical" },
  Safety: { primary: "Marisafe Technical", backup: "Harborline Logistics" },
  Deck: { primary: "NordPort Marine", backup: "Emirates Marine Hub" },
  Provisions: { primary: "MedBlue Chandlers", backup: "Portside Provisions" },
  Cabin: { primary: "Iberia Ship Stores", backup: "OceanLink Stores" }
};

export function getStoredBatch() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(PROCUREMENT_BATCH_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as ProcurementBatch;
  } catch {
    return null;
  }
}

export function storeBatch(batch: ProcurementBatch) {
  window.localStorage.setItem(PROCUREMENT_BATCH_KEY, JSON.stringify(batch));
  window.dispatchEvent(new Event("procurement-batch-updated"));
}

export function generateDetectedItems(fileName: string) {
  const lower = fileName.toLowerCase();
  let items = [...baseItems];

  if (lower.includes("provision") || lower.includes("food") || lower.includes("cabin")) {
    items = [...provisionItems, ...items.slice(0, 4)];
  }

  if (lower.includes("safety") || lower.includes("inspection") || lower.includes("certificate")) {
    items = [...safetyItems, ...items.slice(0, 4)];
  }

  return items.map((item, index) => ({
    ...item,
    status: index % 3 === 0 ? "High confidence" : "Detected"
  }));
}

export function createUploadBatch(fileName: string, fileType: string, detectedItems: SupplyItem[]): ProcurementBatch {
  return {
    id: `BATCH-${Date.now()}`,
    fileName,
    fileType,
    uploadDate: new Date().toISOString(),
    analysisStatus: "Uploaded",
    detectedItems
  };
}

export function createManualBatch(items: SupplyItem[]): ProcurementBatch {
  return createUploadBatch("Manual Supply Entry", "Manual", items);
}

export function generateRecommendations(items: SupplyItem[]): SupplierRecommendation[] {
  return items.map((item, index) => {
    const supplier = supplierByCategory[item.category] ?? supplierByCategory.Engine;
    const baseCost = 1200 + index * 340 + item.item.length * 18;
    return {
      item: item.item,
      recommendedSupplier: supplier.primary,
      backupSupplier: supplier.backup,
      estimatedCost: `$${baseCost.toLocaleString()}`,
      deliveryTime: `${18 + (index % 5) * 4}h`,
      stockAvailability: index % 4 === 0 ? "Medium" : "High",
      riskLevel: item.priority === "Critical" ? "Medium" : index % 5 === 0 ? "Low-Medium" : "Low"
    };
  });
}

export function calculateBatchMetrics(itemCount: number) {
  const saving = Math.min(30, 16 + itemCount * 1.4);
  const leadTime = Math.min(40, 21 + itemCount * 1.8);
  const riskScore = Math.max(8, 22 - itemCount);

  return {
    expectedCostSaving: `${saving.toFixed(1)}%`,
    leadTimeReduction: `${leadTime.toFixed(1)}%`,
    riskScore: `${riskScore}/100`
  };
}
