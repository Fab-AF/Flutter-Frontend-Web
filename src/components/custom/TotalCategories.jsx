import React, { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useTheme } from '../../context/ThemeContext.js';
import { BiCategory } from 'react-icons/bi';
import { LuUserCheck } from 'react-icons/lu';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'Category Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Products Count',
    selector: row => row.count,
    sortable: true,
  },
  {
    name: 'Status',
    selector: row => row.status,
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

const data = [
  {
    id: 1,
    name: 'Electronics',
    count: 120,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Clothing',
    count: 85,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Furniture',
    count: 45,
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'Books',
    count: 200,
    status: 'Active'
  },
  {
    id: 5,
    name: 'Sports',
    count: 60,
    status: 'Active'
  },
];

const TotalCategories = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  
  const themeClasses = useMemo(() => ({
    container: theme === 'dark' ? 'dark:border-gray-800 dark:bg-white/[0.03]' : '',
    text: theme === 'dark' ? 'dark:text-white/90' : 'text-gray-800',
    input: theme === 'dark' ? 'dark:bg-gray-800 dark:text-white/90' : '',
    placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
  }), [theme]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some(value => 
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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

  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-5 md:p-6 ${themeClasses.container}`}>
      <div className="mb-4">
        <h3 className={`text-lg font-semibold flex items-center gap-2 ${themeClasses.text}`}>
          <BiCategory className='w-6 h-6'/> Total Categories: {data.length}
        </h3>
      </div>
      <input
        type="text"
        placeholder="Search categories..."
        value={search}
        onChange={handleSearch}
        className={`mb-4 p-2 border rounded w-full ${themeClasses.input} ${themeClasses.placeholder}`}
      />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        theme={theme === 'dark' ? 'dark' : 'default'}
        customStyles={tableCustomStyles}
        noDataComponent="No categories found"
      />
    </div>
  );
}

export default TotalCategories;