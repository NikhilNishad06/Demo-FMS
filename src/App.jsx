import React, { useState, useEffect } from 'react';
import Sales from './Sales';
import Purchase from './assets/Purchase';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  Layers, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Globe,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sales');
  const [darkMode, setDarkMode] = useState(false); // Default to light mode

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
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
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

      {/* Main Header / Navigation */}
      <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
        darkMode ? 'border-slate-900 bg-slate-950/80' : 'border-slate-200 bg-white/80'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black shadow-md shadow-indigo-600/10">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-extrabold text-base tracking-tight transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-slate-900'
              }`}>FlowControl</span>
              <span className="text-xs block text-slate-500 -mt-1">Workflow FMS</span>
            </div>
          </div>

          {/* Navigation Tabs & Theme Toggle */}
          <div className="flex items-center gap-4">
            <nav className={`flex space-x-1 p-1 rounded-xl border transition-colors duration-300 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200/80'
            }`}>
              <button
                onClick={() => setActiveTab('sales')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'sales'
                    ? 'bg-indigo-600 text-white shadow-sm border border-indigo-700/20'
                    : `border border-transparent ${
                        darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`
                }`}
              >
                <ArrowUpRight className="w-4 h-4" />
                Sales Flow
              </button>
              <button
                onClick={() => setActiveTab('purchase')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === 'purchase'
                    ? 'bg-amber-600 text-white shadow-sm border border-amber-700/20'
                    : `border border-transparent ${
                        darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      }`
                }`}
              >
                <ArrowDownLeft className="w-4 h-4" />
                Purchase Flow
              </button>
            </nav>

            {/* Premium Theme Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-amber-300' 
                  : 'border-slate-200 bg-slate-100 text-indigo-600 hover:bg-slate-200 hover:text-indigo-700'
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10">
        
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
              darkMode ? 'text-slate-400' : 'text-slate-500'
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
              activeTab === 'sales' ? 'text-indigo-500/20' : 'text-slate-500/10'
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
              darkMode ? 'text-slate-500' : 'text-slate-505 text-slate-500'
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
                darkMode ? 'hover:text-slate-450 hover:text-slate-400' : 'hover:text-slate-800'
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
  );
}
