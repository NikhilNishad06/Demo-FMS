import React, { useState, useEffect } from 'react';
import Sales from './Sales';
import Purchase from './assets/Purchase';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Layers, 
  ShoppingCart,
  ShoppingBag,
  Globe,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sales');
  const [darkMode, setDarkMode] = useState(false); // Default to light mode
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync state to body element classes for smooth global transition
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-slate-950', 'text-slate-100');
      document.body.classList.remove('bg-slate-55', 'bg-slate-50', 'text-slate-800');
    } else {
      document.body.classList.add('bg-slate-50', 'text-slate-800');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${
      darkMode ? 'bg-slate-950/20' : 'bg-slate-50/10'
    }`}>
      {/* Decorative Soft Accents */}
      <div className={`fixed top-0 left-1/4 -mt-20 -ml-20 h-96 w-96 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
        darkMode ? 'bg-indigo-500/10' : 'bg-indigo-500/5'
      }`} />
      <div className={`fixed top-1/3 right-1/4 -mt-20 -mr-20 h-96 w-96 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
        darkMode ? 'bg-emerald-500/5' : 'bg-emerald-500/2'
      }`} />
      <div className="fixed bottom-0 right-10 h-80 w-80 rounded-full bg-rose-500/2 blur-3xl pointer-events-none" />

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-all duration-300 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 border-r ${
          darkMode ? 'border-slate-900 bg-slate-950 text-slate-100' : 'border-slate-200 bg-white text-slate-800'
        }`}>
        
        {/* Branding header in Sidebar */}
        <div className={`h-16 flex items-center justify-between px-6 border-b ${
          darkMode ? 'border-slate-900' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black shadow-md shadow-indigo-600/10">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className={`font-extrabold text-sm tracking-tight transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>FlowControl</span>
              <span className="text-[10px] block text-slate-500 -mt-1">Workflow FMS</span>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-1.5 rounded-lg border transition-colors ${
              darkMode ? 'border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white' : 'border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation links inside Sidebar */}
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Core Workflows</p>
            <nav className="space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab('sales');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'sales'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10 border border-indigo-700/20'
                    : `border border-transparent ${
                        darkMode 
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`
                }`}
              >
                <ShoppingCart className={`w-4 h-4 ${activeTab === 'sales' ? 'text-white' : 'text-indigo-500'}`} />
                <span>Sales Flow</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('purchase');
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'purchase'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/10 border border-amber-700/20'
                    : `border border-transparent ${
                        darkMode 
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`
                }`}
              >
                <ShoppingBag className={`w-4 h-4 ${activeTab === 'purchase' ? 'text-white' : 'text-amber-500'}`} />
                <span>Purchase Flow</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t ${darkMode ? 'border-slate-900' : 'border-slate-200'}`}>
          <div className={`flex items-center justify-between p-2 rounded-xl ${
            darkMode ? 'bg-slate-900/40' : 'bg-slate-100/50'
          }`}>
            <span className="text-xs text-slate-500 font-medium">Appearance</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-850 hover:text-amber-300' 
                  : 'border-slate-200 bg-white text-indigo-600 hover:bg-slate-50 hover:text-indigo-700 shadow-sm'
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 z-10">
        
        {/* Top Header */}
        <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
          darkMode ? 'border-slate-900 bg-slate-950/80' : 'border-slate-200 bg-white/80'
        } backdrop-blur-md`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`lg:hidden p-2 rounded-lg border transition-colors cursor-pointer ${
                  darkMode ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              <span className={`hidden lg:inline-block font-extrabold text-sm tracking-tight transition-colors duration-300 ${
                darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                Workspace
              </span>
              <span className="hidden lg:inline-block text-xs text-slate-400">/</span>
              <span className={`font-semibold text-sm transition-colors duration-300 ${
                activeTab === 'sales' 
                  ? darkMode ? 'text-indigo-400' : 'text-indigo-650 text-indigo-600'
                  : darkMode ? 'text-amber-450 text-amber-500' : 'text-amber-650 text-amber-600'
              }`}>
                {activeTab === 'sales' ? 'Sales Flow' : 'Purchase Flow'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors duration-300 ${
                darkMode ? 'text-slate-300 bg-slate-900/60 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  activeTab === 'sales' ? 'bg-indigo-500 animate-pulse' : 'bg-amber-500 animate-pulse'
                }`} />
                <span>Live Workspace</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* Page Hero/Header */}
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 transition-colors duration-300 ${
            darkMode ? 'border-slate-900' : 'border-slate-200'
          }`}>
            <div>
              <h1 className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${
                darkMode ? 'text-slate-100' : 'text-slate-950'
              }`}>
                {activeTab === 'sales' ? 'Sales Workflow' : 'Purchase Workflow'}
              </h1>
              <p className={`text-sm mt-1 transition-colors duration-300 ${
                darkMode ? 'text-slate-400' : 'text-slate-505 text-slate-500'
              }`}>
                {activeTab === 'sales' 
                  ? 'Track transaction steps from Customer Quotation to Invoice processing and Return validation.' 
                  : 'Monitor inventory operations from Purchase Ordering to vendor billing and Return management.'}
              </p>
            </div>
          </div>

          {/* Dynamic Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 ${
              darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
            }`}>
              <div className={`absolute top-0 right-0 p-3 transition-colors ${
                darkMode ? 'text-slate-700 opacity-20' : 'text-slate-300 opacity-40'
              }`}>
                <Package className="w-12 h-12 stroke-1" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Modules</p>
              <h3 className={`text-2xl font-bold mt-2 transition-colors duration-300 ${
                darkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>2 Workflows</h3>
              <p className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? 'text-slate-500' : 'text-slate-500'
              }`}>Sales Flow & Purchase Flow configured</p>
            </div>

            {/* Card 2 */}
            <div className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-305 ${
              activeTab === 'sales' 
                ? darkMode
                  ? 'border-indigo-900/40 bg-indigo-950/10'
                  : 'border-indigo-100 bg-indigo-50/50' 
                : darkMode
                  ? 'border-slate-800 bg-slate-900/40'
                  : 'border-slate-200 bg-white'
            }`}>
              <div className={`absolute top-0 right-0 p-3 transition-all duration-300 ${
                activeTab === 'sales' ? 'text-indigo-500/20' : 'text-slate-505 text-slate-500/10'
              }`}>
                <TrendingUp className="w-12 h-12 stroke-1" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Pipeline</p>
              <h3 className={`text-2xl font-bold mt-2 transition-colors duration-300 ${
                activeTab === 'sales' 
                  ? darkMode ? 'text-indigo-400' : 'text-indigo-600'
                  : darkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>
                {activeTab === 'sales' ? 'Quotation → Invoice' : 'PO → Purchase'}
              </h3>
              <p className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? 'text-slate-500' : 'text-slate-500'
              }`}>Status checks and limits active</p>
            </div>

            {/* Card 3 */}
            <div className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 ${
              darkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
            }`}>
              <div className={`absolute top-0 right-0 p-3 transition-colors ${
                darkMode ? 'text-slate-700 opacity-20' : 'text-slate-300 opacity-40'
              }`}>
                <BarChart3 className="w-12 h-12 stroke-1" />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Validations Active</p>
              <h3 className={`text-2xl font-bold mt-2 transition-colors duration-300 ${
                darkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>100% Strict Qty</h3>
              <p className={`text-xs mt-1 transition-colors duration-300 ${
                darkMode ? 'text-slate-500' : 'text-slate-500'
              }`}>Return limits bounded by invoice/purchase</p>
            </div>
          </div>

          {/* Selected Dashboard component */}
          <div className="transition-all duration-300">
            {activeTab === 'sales' ? <Sales darkMode={darkMode} /> : <Purchase darkMode={darkMode} />}
          </div>

        </main>

        {/* Footer */}
        <footer className={`w-full border-t py-6 mt-12 text-slate-500 text-xs transition-colors duration-300 ${
          darkMode ? 'border-slate-900 bg-slate-950' : 'border-slate-200 bg-white'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers className={`w-4 h-4 ${darkMode ? 'text-indigo-500' : 'text-indigo-600'}`} />
              <span>&copy; 2026 FlowControl Workspace. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Built with React + Vite + Tailwind CSS</span>
              <span className={`transition-colors ${darkMode ? 'text-slate-800' : 'text-slate-200'}`}>|</span>
              <a 
                href="#" 
                className={`flex items-center gap-1 transition-colors ${
                  darkMode ? 'hover:text-slate-400' : 'hover:text-slate-800'
                }`}
                onClick={(e) => e.preventDefault()}
              >
                <Globe className="w-3.5 h-3.5" />
                Developer Sandbox
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
