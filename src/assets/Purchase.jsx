import React, { useState, useMemo } from 'react';
import { Plus, Search, AlertCircle, X, ShieldAlert, Sparkles } from 'lucide-react';
import ReusableTable from '../components/ReusableTable';
import WorkflowIndicator from '../components/WorkflowIndicator';

// Initial Demo Data
const INITIAL_PURCHASES = [
  { id: '1', productName: 'Intel Core i7-13700K', purchaseOrderQty: 150, purchaseQty: 145, purchaseReturnQty: 5 },
  { id: '2', productName: 'NVIDIA RTX 4070 Ti', purchaseOrderQty: 60, purchaseQty: 60, purchaseReturnQty: 0 },
  { id: '3', productName: 'Crucial DDR5 RAM 32GB', purchaseOrderQty: 200, purchaseQty: 195, purchaseReturnQty: 4 },
  { id: '4', productName: 'Samsung 990 Pro SSD 2TB', purchaseOrderQty: 120, purchaseQty: 120, purchaseReturnQty: 2 },
  { id: '5', productName: 'Corsair RM850x PSU', purchaseOrderQty: 80, purchaseQty: 78, purchaseReturnQty: 1 },
];

export default function Purchase({ darkMode = false }) {
  const [purchases, setPurchases] = useState(INITIAL_PURCHASES);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null); // null when adding new record

  // Form states
  const [productName, setProductName] = useState('');
  const [purchaseOrderQty, setPurchaseOrderQty] = useState('');
  const [purchaseQty, setPurchaseQty] = useState('');
  const [purchaseReturnQty, setPurchaseReturnQty] = useState('');

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Reset form helper
  const resetForm = () => {
    setProductName('');
    setPurchaseOrderQty('');
    setPurchaseQty('');
    setPurchaseReturnQty('');
    setErrors({});
    setEditingRow(null);
  };

  // Open modal for editing
  const handleEdit = (row) => {
    setEditingRow(row);
    setProductName(row.productName);
    setPurchaseOrderQty(row.purchaseOrderQty.toString());
    setPurchaseQty(row.purchaseQty.toString());
    setPurchaseReturnQty(row.purchaseReturnQty.toString());
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
    if (window.confirm(`Are you sure you want to delete the purchase record for "${row.productName}"?`)) {
      setPurchases(purchases.filter(item => item.id !== row.id));
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    // Positive integer check
    const qtyRegex = /^\d+$/;

    if (purchaseOrderQty === '' || purchaseOrderQty === null) {
      newErrors.purchaseOrderQty = 'Purchase Order quantity is required';
    } else if (!qtyRegex.test(purchaseOrderQty)) {
      newErrors.purchaseOrderQty = 'Must be a whole positive number (integer)';
    }

    if (purchaseQty === '' || purchaseQty === null) {
      newErrors.purchaseQty = 'Purchase quantity is required';
    } else if (!qtyRegex.test(purchaseQty)) {
      newErrors.purchaseQty = 'Must be a whole positive number (integer)';
    } else if (
      qtyRegex.test(purchaseOrderQty) &&
      parseInt(purchaseQty, 10) > parseInt(purchaseOrderQty, 10)
    ) {
      // Check if received is greater than ordered
      newErrors.purchaseQty = 'Purchase quantity cannot exceed Purchase Order quantity';
    }

    if (purchaseReturnQty === '' || purchaseReturnQty === null) {
      newErrors.purchaseReturnQty = 'Purchase return quantity is required';
    } else if (!qtyRegex.test(purchaseReturnQty)) {
      newErrors.purchaseReturnQty = 'Must be a whole positive number (integer)';
    } else if (
      qtyRegex.test(purchaseQty) &&
      parseInt(purchaseReturnQty, 10) > parseInt(purchaseQty, 10)
    ) {
      newErrors.purchaseReturnQty = 'Return quantity cannot exceed Purchase quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit (Save add/edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const parsedOrderQty = parseInt(purchaseOrderQty, 10);
    const parsedQty = parseInt(purchaseQty, 10);
    const parsedReturnQty = parseInt(purchaseReturnQty, 10);

    if (editingRow) {
      // Edit mode
      setPurchases(purchases.map(item => 
        item.id === editingRow.id 
          ? { ...item, productName, purchaseOrderQty: parsedOrderQty, purchaseQty: parsedQty, purchaseReturnQty: parsedReturnQty }
          : item
      ));
    } else {
      // Add mode
      const newRecord = {
        id: Date.now().toString(),
        productName,
        purchaseOrderQty: parsedOrderQty,
        purchaseQty: parsedQty,
        purchaseReturnQty: parsedReturnQty
      };
      setPurchases([newRecord, ...purchases]);
    }

    setIsModalOpen(false);
    resetForm();
  };

  // Filtering Logic
  const filteredPurchases = useMemo(() => {
    return purchases.filter(row => 
      row.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [purchases, searchQuery]);

  // Calculating Totals for Purchase Qty and Purchase Return Qty
  const totals = useMemo(() => {
    return filteredPurchases.reduce(
      (acc, row) => {
        acc.purchaseQty += row.purchaseQty;
        acc.purchaseReturnQty += row.purchaseReturnQty;
        return acc;
      },
      { purchaseQty: 0, purchaseReturnQty: 0 }
    );
  }, [filteredPurchases]);

  // Table Columns Setup
  const columns = [
    { 
      key: 'productName', 
      header: 'Product Name',
      className: `w-2/5 transition-colors duration-300 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`
    },
    { 
      key: 'purchaseOrderQty', 
      header: 'Order Qty',
      align: 'right',
      className: `w-1/5 font-semibold transition-colors duration-300 ${darkMode ? 'text-amber-400' : 'text-amber-650 text-amber-600'}`
    },
    { 
      key: 'purchaseQty', 
      header: 'Purchase Qty',
      align: 'right',
      className: `w-1/5 font-semibold transition-colors duration-300 ${darkMode ? 'text-sky-400' : 'text-sky-600'}`
    },
    { 
      key: 'purchaseReturnQty', 
      header: 'Return Qty',
      align: 'right',
      className: `w-1/5 font-semibold transition-colors duration-300 ${darkMode ? 'text-rose-400' : 'text-rose-600'}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Workflow Indicator */}
      <WorkflowIndicator type="purchase" darkMode={darkMode} />

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
              Purchase Records
              <span className={`text-xs font-normal px-2 py-0.5 rounded-full transition-all duration-305 ${
                darkMode 
                  ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' 
                  : 'text-amber-700 bg-amber-50 border border-amber-100'
              }`}>
                {filteredPurchases.length} {filteredPurchases.length === 1 ? 'record' : 'records'}
              </span>
            </h2>
            <p className={`text-sm mt-0.5 transition-colors duration-300 ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>Manage and track your procurement order to return workflows.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                darkMode ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                type="text"
                placeholder="Search product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-sm rounded-lg outline-none transition-all focus:ring-1 ${
                  darkMode 
                    ? 'bg-slate-900/60 text-slate-200 border-slate-800 focus:border-amber-500 focus:ring-amber-500/30' 
                    : 'bg-white text-slate-800 border-slate-200 focus:border-amber-500 focus:ring-amber-100'
                }`}
              />
            </div>
            
            {/* Add Record Button */}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-lg shadow-sm border border-amber-700/20 transition-all duration-150 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Record
            </button>
          </div>
        </div>

        {/* Reusable Table */}
        <ReusableTable
          columns={columns}
          data={filteredPurchases}
          onEdit={handleEdit}
          onDelete={handleDelete}
          emptyMessage="No purchase records found"
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
                <Sparkles className="w-4 h-4 text-amber-600" />
                {editingRow ? 'Edit Purchase Record' : 'Add Purchase Record'}
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
                  placeholder="e.g. DDR5 Memory Module"
                  className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                    errors.productName 
                      ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                      : darkMode 
                        ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-amber-500 focus:ring-amber-500/30'
                        : 'bg-white text-slate-800 border-slate-200 focus:border-amber-500 focus:ring-amber-100'
                  }`}
                />
                {errors.productName && (
                  <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.productName}
                  </p>
                )}
              </div>

              {/* Quantities Row */}
              <div className="space-y-4">
                {/* Purchase Order Qty */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Purchase Order Qty
                  </label>
                  <input
                    type="text"
                    value={purchaseOrderQty}
                    onChange={(e) => setPurchaseOrderQty(e.target.value)}
                    placeholder="0"
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                      errors.purchaseOrderQty 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                        : darkMode 
                          ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-amber-500 focus:ring-amber-500/30'
                          : 'bg-white text-slate-800 border-slate-200 focus:border-amber-500 focus:ring-amber-100'
                    }`}
                  />
                  {errors.purchaseOrderQty && (
                    <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.purchaseOrderQty}
                    </p>
                  )}
                </div>

                {/* Purchase Qty */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Purchase Qty (Received)
                  </label>
                  <input
                    type="text"
                    value={purchaseQty}
                    onChange={(e) => setPurchaseQty(e.target.value)}
                    placeholder="0"
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                      errors.purchaseQty 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                        : darkMode 
                          ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-amber-500 focus:ring-amber-500/30'
                          : 'bg-white text-slate-800 border-slate-200 focus:border-amber-500 focus:ring-amber-100'
                    }`}
                  />
                  {errors.purchaseQty && (
                    <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.purchaseQty}
                    </p>
                  )}
                </div>

                {/* Purchase Return Qty */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Purchase Return Qty
                  </label>
                  <input
                    type="text"
                    value={purchaseReturnQty}
                    onChange={(e) => setPurchaseReturnQty(e.target.value)}
                    placeholder="0"
                    className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all focus:ring-1 ${
                      errors.purchaseReturnQty 
                        ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/30' 
                        : darkMode 
                          ? 'bg-slate-950 text-slate-200 border-slate-800 focus:border-amber-500 focus:ring-amber-500/30'
                          : 'bg-white text-slate-800 border-slate-200 focus:border-amber-500 focus:ring-amber-100'
                    }`}
                  />
                  {errors.purchaseReturnQty && (
                    <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.purchaseReturnQty}
                    </p>
                  )}
                </div>
              </div>

              {/* Info Validation Notice */}
              <div className={`rounded-lg p-3 border flex items-start gap-2.5 ${
                darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className={`text-xs leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Validation rules: Qty must be whole positive numbers. Purchase Qty cannot exceed Purchase Order Qty. Purchase Return Qty cannot exceed Purchase Qty.
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
                  className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-lg shadow-sm border border-amber-700/20 transition-colors cursor-pointer"
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
