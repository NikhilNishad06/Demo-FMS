import React, { useState, useMemo } from 'react';
import { Plus, Search, AlertCircle, X, ShieldAlert, Sparkles } from 'lucide-react';
import ReusableTable from './components/ReusableTable';
import WorkflowIndicator from './components/WorkflowIndicator';

// Initial Demo Data
const INITIAL_SALES = [
  { id: '1', productName: 'Wireless Mouse Pro', quotationName: 'QT-2026-001', invoicingQty: 120, salesReturnQty: 5 },
  { id: '2', productName: 'Mechanical Keyboard RGB', quotationName: 'QT-2026-002', invoicingQty: 80, salesReturnQty: 2 },
  { id: '3', productName: 'UltraWide Monitor 34"', quotationName: 'QT-2026-003', invoicingQty: 45, salesReturnQty: 1 },
  { id: '4', productName: 'USB-C Multiport Adapter', quotationName: 'QT-2026-004', invoicingQty: 300, salesReturnQty: 15 },
  { id: '5', productName: 'Noise Cancelling Headphones', quotationName: 'QT-2026-005', invoicingQty: 150, salesReturnQty: 0 },
];

export default function Sales({ darkMode = false }) {
  const [sales, setSales] = useState(INITIAL_SALES);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null); // null when adding new record

  // Form states
  const [productName, setProductName] = useState('');
  const [quotationName, setQuotationName] = useState('');
  const [invoicingQty, setInvoicingQty] = useState('');
  const [salesReturnQty, setSalesReturnQty] = useState('');
  
  // Validation errors state
  const [errors, setErrors] = useState({});

  // Reset form helper
  const resetForm = () => {
    setProductName('');
    setQuotationName('');
    setInvoicingQty('');
    setSalesReturnQty('');
    setErrors({});
    setEditingRow(null);
  };

  // Open modal for editing
  const handleEdit = (row) => {
    setEditingRow(row);
    setProductName(row.productName);
    setQuotationName(row.quotationName);
    setInvoicingQty(row.invoicingQty.toString());
    setSalesReturnQty(row.salesReturnQty.toString());
    setErrors({});
    setIsModalOpen(true);
  };

  // Open modal for adding
  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete the sales record for "${row.productName}"?`)) {
      setSales(sales.filter(item => item.id !== row.id));
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!quotationName.trim()) {
      newErrors.quotationName = 'Quotation name is required';
    }

    // Positive integer check
    const qtyRegex = /^\d+$/;

    if (invoicingQty === '' || invoicingQty === null) {
      newErrors.invoicingQty = 'Invoicing quantity is required';
    } else if (!qtyRegex.test(invoicingQty)) {
      newErrors.invoicingQty = 'Must be a whole positive number (integer)';
    }

    if (salesReturnQty === '' || salesReturnQty === null) {
      newErrors.salesReturnQty = 'Sales return quantity is required';
    } else if (!qtyRegex.test(salesReturnQty)) {
      newErrors.salesReturnQty = 'Must be a whole positive number (integer)';
    } else if (
      qtyRegex.test(invoicingQty) &&
      parseInt(salesReturnQty, 10) > parseInt(invoicingQty, 10)
    ) {
      newErrors.salesReturnQty = 'Return quantity cannot exceed Invoicing quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit (Add/Edit save)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const parsedInvoicingQty = parseInt(invoicingQty, 10);
    const parsedSalesReturnQty = parseInt(salesReturnQty, 10);

    if (editingRow) {
      // Edit mode
      setSales(sales.map(item => 
        item.id === editingRow.id 
          ? { ...item, productName, quotationName, invoicingQty: parsedInvoicingQty, salesReturnQty: parsedSalesReturnQty }
          : item
      ));
    } else {
      // Add mode
      const newRecord = {
        id: Date.now().toString(),
        productName,
        quotationName,
        invoicingQty: parsedInvoicingQty,
        salesReturnQty: parsedSalesReturnQty
      };
      setSales([newRecord, ...sales]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Filtering Logic
  const filteredSales = useMemo(() => {
    return sales.filter(row => 
      row.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.quotationName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sales, searchQuery]);

  // Calculating Totals
  const totals = useMemo(() => {
    return filteredSales.reduce(
      (acc, row) => {
        acc.invoicingQty += row.invoicingQty;
        acc.salesReturnQty += row.salesReturnQty;
        return acc;
      },
      { invoicingQty: 0, salesReturnQty: 0 }
    );
  }, [filteredSales]);

  // Table Columns Setup
  const columns = [
    { 
      key: 'productName', 
      header: 'Product Name',
      className: `w-1/3 transition-colors duration-300 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`
    },
    { 
      key: 'quotationName', 
      header: 'Quotation Qty',
      className: 'w-1/4',
      render: (val) => (
        <span className={`font-mono text-xs px-2.5 py-1 rounded-md font-semibold transition-all duration-300 ${
          darkMode 
            ? 'bg-slate-800/80 text-indigo-400 border border-slate-700/60' 
            : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
        }`}>
          {val}
        </span>
      )
    },
    { 
      key: 'invoicingQty', 
      header: 'Invoicing Qty',
      align: 'right',
      className: `w-1/6 font-semibold transition-colors duration-300 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`
    },
    { 
      key: 'salesReturnQty', 
      header: 'Sales Return Qty',
      align: 'right',
      className: `w-1/6 font-semibold transition-colors duration-300 ${darkMode ? 'text-rose-400' : 'text-rose-600'}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Workflow Indicator */}
      <WorkflowIndicator type="sales" darkMode={darkMode} />

      {/* Main card */}
      <div className={`rounded-xl border transition-all duration-300 p-6 ${
        darkMode 
          ? 'border-slate-800 bg-slate-900/20' 
          : 'border-slate-200 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className={`text-xl font-bold transition-colors duration-300 flex items-center gap-2 ${
              darkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Sales Records
              <span className={`text-xs font-normal px-2 py-0.5 rounded-full transition-all duration-305 ${
                darkMode 
                  ? 'text-indigo-400 bg-indigo-500/10 border border-indigo-500/20' 
                  : 'text-indigo-700 bg-indigo-50 border border-indigo-100'
              }`}>
                {filteredSales.length} {filteredSales.length === 1 ? 'record' : 'records'}
              </span>
            </h2>
            <p className={`text-sm mt-0.5 transition-colors duration-300 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Manage and track your quotation and invoice workflows.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type="text"
                placeholder="Search product or quote..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg outline-none transition-all focus:ring-1 ${
                  darkMode 
                    ? 'bg-slate-900/60 text-slate-200 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30' 
                    : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
            </div>
            
            {/* Add Record Button */}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm border border-indigo-700/20 transition-all duration-150 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Record
            </button>
          </div>
        </div>

        {/* Reusable Table */}
        <ReusableTable
          columns={columns}
          data={filteredSales}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No sales records found"
          summaryData={totals}
          darkMode={darkMode}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in ${
          darkMode ? 'bg-slate-950/80' : 'bg-slate-900/40'
        }`}>
          <div className={`w-full max-w-md overflow-hidden rounded-2xl border shadow-2xl animate-zoom-in ${
            darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
          }`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between border-b px-6 py-4 ${
              darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-slate-50'
            }`}>
              <h3 className={`text-lg font-bold flex items-center gap-2 ${
                darkMode ? 'text-slate-100' : 'text-slate-900'
              }`}>
                <Sparkles className="w-4 h-4 text-indigo-600" />
                {editingRow ? 'Edit Sales Record' : 'Add Sales Record'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  darkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Product Name */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Wireless Keyboard"
                  className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                    errors.productName 
                      ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                      : darkMode 
                        ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                        : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                />
                {errors.productName && (
                  <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.productName}
                  </p>
                )}
              </div>

              {/* Quotation Name */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Quotation QTYGIT
                </label>
                <input
                  type="text"
                  value={quotationName}
                  onChange={(e) => setQuotationName(e.target.value)}
                  placeholder="e.g. QT-2026-098"
                  className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                    errors.quotationName 
                      ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                      : darkMode 
                        ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                        : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                />
                {errors.quotationName && (
                  <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.quotationName}
                  </p>
                )}
              </div>

              {/* Quantities Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Invoicing Qty */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Invoicing Qty
                  </label>
                  <input
                    type="text"
                    value={invoicingQty}
                    onChange={(e) => setInvoicingQty(e.target.value)}
                    placeholder="0"
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                      errors.invoicingQty 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                        : darkMode 
                          ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                          : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.invoicingQty && (
                    <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.invoicingQty}
                    </p>
                  )}
                </div>

                {/* Sales Return Qty */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Sales Return Qty
                  </label>
                  <input
                    type="text"
                    value={salesReturnQty}
                    onChange={(e) => setSalesReturnQty(e.target.value)}
                    placeholder="0"
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                      errors.salesReturnQty 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                        : darkMode 
                          ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/30'
                          : 'bg-white text-slate-800 border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.salesReturnQty && (
                    <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.salesReturnQty}
                    </p>
                  )}
                </div>
              </div>

              {/* Info Validation Notice */}
              <div className={`rounded-lg p-3 border flex items-start gap-2.5 ${
                darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <ShieldAlert className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <p className={`text-xs leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Quantity validation: Only positive whole numbers are accepted. Return Quantity must not exceed Invoiced Quantity.
                </p>
              </div>

              {/* Modal Actions */}
              <div className={`flex items-center justify-end gap-3 pt-3 border-t ${
                darkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer border ${
                    darkMode 
                      ? 'text-slate-300 hover:text-slate-100 bg-slate-800 hover:bg-slate-705 border-slate-700/60' 
                      : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-sm border border-indigo-700/20 transition-colors cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
