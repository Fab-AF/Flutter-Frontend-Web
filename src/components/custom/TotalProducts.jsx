import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { useTheme } from '../../context/ThemeContext.js';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { LuUserCheck } from 'react-icons/lu';
import { fetchProducts } from '../../redux/products/productSlice.js';

const TotalProducts = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const { products, loading, error } = useSelector((state) => state.product);

  const themeClasses = useMemo(() => ({
    container: theme === 'dark' ? 'dark:border-gray-800 dark:bg-white/[0.03]' : '',
    text: theme === 'dark' ? 'dark:text-white/90' : 'text-gray-800',
    input: theme === 'dark' ? 'dark:bg-gray-800 dark:text-white/90' : '',
    placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
  }), [theme]);

  const columns = useMemo(() => [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category?.name || 'Uncategorized',
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.price || 'N/A',
      sortable: true,
    },
    {
      name: 'Manufacturer',
      selector: row => row.manufacturer || 'N/A',
      sortable: true,
    },
    {
      name: 'Batch Number',
      selector: row => row.batchNumber || 'N/A',
      sortable: true,
    },
    {
      name: 'Expiry Date',
      selector: row => new Date(row.expiryDate).toLocaleDateString() || 'N/A',
      sortable: true,
    },
    {
      name: 'Stock Quantity',
      selector: row => row.stockQuantity || 'N/A',
      sortable: true,
    },
    {
      name: 'Created By',
      selector: row => row.createdBy?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Created At',
      selector: row => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button 
            className="p-1 text-gray-5 hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => console.log('View clicked for:', row._id)}
          >
            <FiEye size={18} />
          </button>
          <button className="p-1 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400">
            <LuUserCheck size={18} />
          </button>
          <button 
            className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400"
            onClick={() => console.log('Edit clicked for:', row._id)}
          >
            <FiEdit size={18} />
          </button>
          <button 
            className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
            onClick={() => console.log('Delete clicked for:', row._id)}
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ], []);

  const filteredData = useMemo(() => {
    if (!search) return products;
    return products.filter((row) => {
      const searchLower = search.toLowerCase();
      return (
        row.name?.toLowerCase().includes(searchLower) ||
        row.category?.name?.toLowerCase().includes(searchLower) ||
        row.price?.toString().includes(searchLower) ||
        row.manufacturer?.toLowerCase().includes(searchLower) ||
        row.batchNumber?.toLowerCase().includes(searchLower) ||
        new Date(row.expiryDate).toLocaleDateString().includes(searchLower) ||
        row.createdBy?.name?.toLowerCase().includes(searchLower)
      );
    });
  }, [search, products]);

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const tableCustomStyles = useMemo(() => ({
    table: {
      style: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      },
    },
    rows: {
      style: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#1a1a1a',
      },
    },
    headCells: {
      style: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#1a1a1a',
      },
    },
    pagination: {
      style: {
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#1a1a1a',
      },
    },
    paginationButton: {
      style: {
        color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : '#1a1a1a',
      },
    },
  }), [theme]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 md:p-6 ${themeClasses.container}`}>
      <div className="mb-4">
        <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
          Product List
        </h3>
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={handleSearch}
        className={`mb-4 p-2 border rounded w-full ${themeClasses.input} ${themeClasses.placeholder}`}
      />
      {loading ? (
        <p className={themeClasses.text}>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          theme={theme === 'dark' ? 'dark' : 'default'}
          customStyles={tableCustomStyles}
        />
      )}
    </div>
  );
};

export default TotalProducts;
