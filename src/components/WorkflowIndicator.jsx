import React from 'react';
import { ChevronRight, FileText, Receipt, RotateCcw, ShoppingCart, Truck } from 'lucide-react';

export default function WorkflowIndicator({ type = 'sales', darkMode = false }) {
  const steps = type === 'sales' ? [
    { 
      label: 'Quotation', 
      desc: 'Price quote sent to customer', 
      icon: FileText, 
      color: darkMode 
        ? 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
        : 'text-indigo-600 border-indigo-200 bg-indigo-50' 
    },
    { 
      label: 'Invoice', 
      desc: 'Billing invoice generated', 
      icon: Receipt, 
      color: darkMode 
        ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
        : 'text-emerald-600 border-emerald-200 bg-emerald-50' 
    },
    { 
      label: 'Sales Return', 
      desc: 'Customer returned products', 
      icon: RotateCcw, 
      color: darkMode 
        ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
        : 'text-rose-600 border-rose-200 bg-rose-50' 
    }
  ] : [
    { 
      label: 'Purchase Order', 
      desc: 'Order placed to vendor', 
      icon: ShoppingCart, 
      color: darkMode 
        ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
        : 'text-amber-600 border-amber-200 bg-amber-50' 
    },
    { 
      label: 'Purchase', 
      desc: 'Goods received & billed', 
      icon: Truck, 
      color: darkMode 
        ? 'text-sky-400 border-sky-500/30 bg-sky-500/10'
        : 'text-sky-600 border-sky-200 bg-sky-50' 
    },
    { 
      label: 'Purchase Return', 
      desc: 'Goods returned to vendor', 
      icon: RotateCcw, 
      color: darkMode 
        ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
        : 'text-rose-600 border-rose-200 bg-rose-50' 
    }
  ];

  return (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 p-6 ${
      darkMode 
        ? 'border-slate-800 bg-slate-900/30 shadow-lg' 
        : 'border-slate-200 bg-white shadow-sm'
    }`}>
      {/* Decorative Glow */}
      <div className={`absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full blur-2xl pointer-events-none transition-colors ${
        darkMode ? 'bg-indigo-500/5' : 'bg-indigo-500/2'
      }`} />
      <div className={`absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 rounded-full blur-2xl pointer-events-none transition-colors ${
        darkMode ? 'bg-emerald-500/5' : 'bg-emerald-500/2'
      }`} />

      <h4 className={`text-xs font-semibold uppercase tracking-widest mb-4 transition-colors duration-300 ${
        darkMode ? 'text-slate-550 text-slate-500' : 'text-slate-400'
      }`}>
        Workflow Pipeline Logic
      </h4>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={idx}>
              <div className="flex items-center gap-4 flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl border ${step.color} shadow-sm transition-transform duration-300 hover:scale-105 shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-semibold px-1.5 py-0.5 rounded border transition-colors duration-300 ${
                      darkMode 
                        ? 'text-slate-550 text-slate-500 bg-slate-800 border-slate-700/40' 
                        : 'text-slate-500 bg-slate-100 border border-slate-200'
                    }`}>
                      0{idx + 1}
                    </span>
                    <h5 className={`font-bold transition-colors duration-300 ${
                      darkMode ? 'text-slate-200' : 'text-slate-800'
                    }`}>{step.label}</h5>
                  </div>
                  <p className={`text-xs mt-0.5 transition-colors duration-300 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>{step.desc}</p>
                </div>
              </div>

              {/* Separator arrow (only between steps) */}
              {idx < steps.length - 1 && (
                <div className={`hidden md:flex items-center transition-colors duration-300 ${
                  darkMode ? 'text-slate-600 animate-pulse' : 'text-slate-350 text-slate-300'
                }`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
