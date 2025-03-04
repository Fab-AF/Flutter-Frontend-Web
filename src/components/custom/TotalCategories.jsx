import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { useTheme } from '../../context/ThemeContext.js';
import { BiCategory } from 'react-icons/bi';
import { LuUserCheck } from 'react-icons/lu';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { fetchCategories } from '../../redux/category/categorySlice';

const columns = [
  {
    name: 'ID',
    selector: row => row._id,
    sortable: true,
  },
  {
    name: 'Category Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Description',
    selector: row => row.description,
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
        <button className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
          <FiEye size={18} />
        </button>
        <button className="p-1 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400">
          <LuUserCheck size={18} />
        </button>
        <button className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
          <FiEdit size={18} />
        </button>
        <button className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400">
          <FiTrash2 size={18} />
        </button>
      </div>
    ),
  },
];

const TotalCategories = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const { categories, loading, error } = useSelector((state) => state.category);

  const themeClasses = useMemo(() => ({
    container: theme === 'dark' ? 'dark:border-gray-800 dark:bg-white/[0.03]' : '',
    text: theme === 'dark' ? 'dark:text-white/90' : 'text-gray-800',
    input: theme === 'dark' ? 'dark:bg-gray-800 dark:text-white/90' : '',
    placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
  }), [theme]);

  const filteredData = useMemo(() => {
    if (!search) return categories;
    return categories.filter((row) => {
      const searchLower = search.toLowerCase();
      return (
        row.name?.toLowerCase().includes(searchLower) ||
        row.description?.toLowerCase().includes(searchLower) ||
        row.createdBy?.name?.toLowerCase().includes(searchLower) ||
        new Date(row.createdAt).toLocaleDateString().includes(searchLower)
      );
    });
  }, [search, categories]);

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
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 md:p-6 ${themeClasses.container}`}>
      <div className="mb-4">
        <h3 className={`text-lg font-semibold flex items-center gap-2 ${themeClasses.text}`}>
          <BiCategory className='w-6 h-6'/> Total Categories: {categories.length}
        </h3>
      </div>
      <input
        type="text"
        placeholder="Search categories..."
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
          noDataComponent="No categories found"
        />
      )}
    </div>
  );
}

export default TotalCategories;