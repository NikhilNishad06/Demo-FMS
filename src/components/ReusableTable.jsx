import React from 'react';
import { Edit3, Trash2, Inbox } from 'lucide-react';

/**
 * ReusableTable Component
 * 
 * @param {Array} columns - Array of column definitions: { key, header, align, render, className }
 * @param {Array} data - Array of data objects
 * @param {Function} onEdit - Callback function when Edit is clicked
 * @param {Function} onDelete - Callback function when Delete is clicked
 * @param {String} emptyMessage - Message to show when data is empty
 * @param {Array} summaryData - Optional array representing totals/summary for columns
 * @param {Boolean} darkMode - Theme state
 */
export default function ReusableTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  emptyMessage = "No records found",
  summaryData = null,
  darkMode = false
}) {
  return (
    <div className={`w-full overflow-hidden rounded-xl border transition-all duration-300 ${
      darkMode 
        ? 'border-slate-800/80 bg-slate-900/40 backdrop-blur-md shadow-xl' 
        : 'border-slate-200 bg-white shadow-md'
    }`}>
      <div className="overflow-x-auto w-full scrollbar-thin">
        <table className="w-full text-left border-collapse">
          {/* Sticky Header */}
          <thead className={`sticky top-0 transition-colors duration-300 border-b z-10 ${
            darkMode 
              ? 'bg-slate-900/90 backdrop-blur-md border-slate-850' 
              : 'bg-slate-55 bg-slate-50 border-slate-200'
          }`}>
            <tr>
              {columns.map((col, idx) => {
                const alignClass = 
                  col.align === 'right' ? 'text-right' : 
                  col.align === 'center' ? 'text-center' : 'text-left';
                return (
                  <th
                    key={col.key || idx}
                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    } ${alignClass} ${col.className || ''}`}
                  >
                    {col.header}
                  </th>
                );
              })}
              {(onEdit || onDelete) && (
                <th className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 text-center w-28 ${
                  darkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className={`divide-y transition-colors duration-300 ${
            darkMode ? 'divide-slate-800/60' : 'divide-slate-100'
          }`}>
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} 
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className={`p-3 rounded-full border transition-all duration-300 ${
                      darkMode 
                        ? 'bg-slate-850 text-slate-500 border-slate-700/50' 
                        : 'bg-slate-50 text-slate-400 border border-slate-200'
                    }`}>
                      <Inbox className="w-8 h-8 animate-pulse" />
                    </div>
                    <p className={`font-medium text-base transition-colors duration-300 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>{emptyMessage}</p>
                    <p className={`text-sm max-w-xs transition-colors duration-300 ${
                      darkMode ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      Try adjusting your search criteria or add a new record to get started.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIdx) => (
                <tr 
                  key={row.id || rowIdx} 
                  className={`group transition-colors duration-150 ${
                    darkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/50'
                  }`}
                >
                  {columns.map((col, colIdx) => {
                    const alignClass = 
                      col.align === 'right' ? 'text-right' : 
                      col.align === 'center' ? 'text-center' : 'text-left';
                    return (
                      <td 
                        key={col.key || colIdx} 
                        className={`px-6 py-4 text-sm font-medium transition-colors duration-300 ${
                          darkMode ? 'text-slate-200' : 'text-slate-700'
                        } ${alignClass} ${col.className || ''}`}
                      >
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    );
                  })}
                  
                  {/* Actions Column */}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className={`p-1.5 rounded-lg border border-transparent transition-all duration-150 ${
                              darkMode
                                ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/20'
                                : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 hover:border-indigo-100'
                            }`}
                            title="Edit Record"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className={`p-1.5 rounded-lg border border-transparent transition-all duration-150 ${
                              darkMode
                                ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 hover:border-rose-500/20'
                                : 'text-rose-600 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-105'
                            }`}
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>

          {/* Table Summary Footer */}
          {data.length > 0 && summaryData && (
            <tfoot className={`border-t-2 transition-colors duration-300 font-semibold ${
              darkMode 
                ? 'border-slate-800 bg-slate-900/60' 
                : 'border-slate-200 bg-slate-50/60'
            }`}>
              <tr>
                {columns.map((col, idx) => {
                  const alignClass = 
                    col.align === 'right' ? 'text-right' : 
                    col.align === 'center' ? 'text-center' : 'text-left';
                  const hasSummary = summaryData.hasOwnProperty(col.key);
                  return (
                    <td
                      key={col.key || idx}
                      className={`px-6 py-4 text-sm transition-colors duration-300 ${
                        darkMode ? 'text-slate-300' : 'text-slate-600'
                      } ${alignClass} ${col.className || ''}`}
                    >
                      {hasSummary ? (
                        <div className="flex flex-col">
                          <span className={`text-xs font-normal uppercase tracking-wider ${
                            darkMode ? 'text-slate-500' : 'text-slate-400'
                          }`}>Total</span>
                          <span className={`font-bold text-base ${
                            darkMode ? 'text-slate-100' : 'text-slate-850 text-slate-800'
                          }`}>{summaryData[col.key]}</span>
                        </div>
                      ) : (
                        idx === 0 ? (
                          <span className={`font-medium ${
                            darkMode ? 'text-slate-400' : 'text-slate-500'
                          }`}>Totals</span>
                        ) : null
                      )}
                    </td>
                  );
                })}
                {(onEdit || onDelete) && <td className="px-6 py-4"></td>}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
