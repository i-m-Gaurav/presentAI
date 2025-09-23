// src/pages/DashboardLayout.tsx
import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { DashboardHome } from "../components/Dashboard/DashboardHome";
import { CreatePresentation } from "../components/Dashboard/CreatePresentation";
import { PresentationsList } from "../components/Dashboard/PresentationsList";
import { UploadPDF } from "../components/Dashboard/UploadPDF";
import { BillingPage } from "../components/Dashboard/BillingPage";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { PaymentModal } from "../components/Dashboard/PaymentModal";
import { Button } from "../components/ui/Button";
import { Menu } from "lucide-react";

type TabId =
  | "dashboard"
  | "create"
  | "presentations"
  | "upload"
  | "billing"
  | "templates"
  | "settings"
  | "profile";

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [userPlan, setUserPlan] = useState<"free" | "pro">("free");
  const [freeUsage, setFreeUsage] = useState({ presentations: 3, limit: 5 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", amount: "" });

  // Sync activeTab with the current route
  useEffect(() => {
    const last = location.pathname.split("/").filter(Boolean).pop();
    // Map route segments to known tabs
    const mapped: Record<string, TabId> = {
      dashboard: "dashboard",
      create: "create",
      presentations: "presentations",
      upload: "upload",
      billing: "billing",
    };
    setActiveTab(mapped[last ?? "dashboard"] ?? "dashboard");
  }, [location.pathname]);

  const routeForTab: Record<TabId, string> = useMemo(
    () => ({
      dashboard: "/dashboard",
      create: "/dashboard/create",
      presentations: "/dashboard/presentations",
      upload: "/dashboard/upload",
      billing: "/dashboard/billing",
      templates: "/dashboard", // not implemented yet
      settings: "/dashboard", // not implemented yet
      profile: "/dashboard", // not implemented yet
    }),
    []
  );

  const onTabChange = (tab: string) => {
    const t = (tab as TabId) ?? "dashboard";
    setActiveTab(t);
    navigate(routeForTab[t] ?? "/dashboard");
  };

  const onLogout = () => {
    // Simple redirect to landing for now
    navigate("/");
  };

  const handlePaymentSuccess = () => {
    setUserPlan("pro");
    setShowPaymentModal(false);
  };

  const handleUpgrade = () => {
    setSelectedPlan({ name: "Pro", amount: "$19" });
    setShowPaymentModal(true);
  };

  const handleCreatePresentation = () => {
    if (userPlan === "free" && freeUsage.presentations >= freeUsage.limit) {
      setSelectedPlan({ name: "Pro", amount: "$19" });
      setShowPaymentModal(true);
      return false;
    }
    if (userPlan === "free") {
      setFreeUsage((prev) => ({
        ...prev,
        presentations: prev.presentations + 1,
      }));
    }
    return true;
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={onTabChange}
        onLogout={onLogout}
        userPlan={userPlan}
        freeUsage={freeUsage}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={toggleMobileMenu}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "create" && "Create Presentation"}
            {activeTab === "presentations" && "My Presentations"}
            {activeTab === "upload" && "Upload PDF"}
            {activeTab === "billing" && "Billing & Usage"}
          </h1>
          <div className="w-10" />
        </div>

        <div className="p-4 md:p-8">
          <Routes>
            <Route
              index
              element={
                <DashboardHome
                  onTabChange={onTabChange}
                  userPlan={userPlan}
                  freeUsage={freeUsage}
                  onUpgrade={handleUpgrade}
                />
              }
            />
            <Route
              path="create"
              element={
                <CreatePresentation
                  onTabChange={onTabChange}
                  onCreatePresentation={handleCreatePresentation}
                  userPlan={userPlan}
                  freeUsage={freeUsage}
                  onUpgrade={handleUpgrade}
                />
              }
            />
            <Route
              path="presentations"
              element={<PresentationsList onUpgrade={handleUpgrade} />}
            />
            <Route
              path="upload"
              element={
                <UploadPDF
                  onTabChange={onTabChange}
                  onUpgrade={handleUpgrade}
                />
              }
            />
            <Route
              path="billing"
              element={<BillingPage onUpgrade={handleUpgrade} />}
            />
          </Routes>
        </div>
      </main>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        plan={selectedPlan.name}
        amount={selectedPlan.amount}
      />
    </div>
  );
}
