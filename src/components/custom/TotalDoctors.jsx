import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext.js';
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../redux/auth/authSlice';
import { LuUserCheck } from 'react-icons/lu';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';
import { FaUserDoctor } from 'react-icons/fa6';

const columns = [
  { name: "ID", selector: (row) => row._id, sortable: true },
  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email },
  { name: "Role", selector: (row) => row.role },
  {
    name: "Actions",
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

const TotalDoctors = () => {
  const dispatch = useDispatch();
  const { usersLoading, usersError } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);

  const themeClasses = useMemo(() => ({
    container: theme === 'dark' ? 'dark:border-gray-800 dark:bg-white/[0.03]' : '',
    text: theme === 'dark' ? 'dark:text-white/90' : 'text-gray-800',
    input: theme === 'dark' ? 'dark:bg-gray-800 dark:text-white/90' : '',
    placeholder: theme === 'dark' ? 'placeholder-gray-400' : 'placeholder-gray-500',
  }), [theme]);

  const filteredData = useMemo(() => {
    if (!search) return allData;
    return allData.filter((row) =>
      Object.values(row).some(value => 
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allData]);

  const fetchData = useCallback(async () => {
    try {
      const result = await dispatch(fetchAllUsers());
      if (result.payload?.users?.doctors) {
        const doctors = result.payload.users.doctors;
        setAllData(doctors);
        setTotalDoctors(doctors.length);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error:', error);
      setAllData([]);
      setTotalDoctors(0);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <h3 className={`text-lg font-semibold flex items-center gap-2 ${themeClasses.text}`}><FaUserDoctor className='w-6 h-6'/> Total Doctors: {totalDoctors}</h3>
      </div>
      <input
        type="text"
        placeholder="Search doctors..."
        value={search}
        onChange={handleSearch}
        className={`mb-4 p-2 border rounded w-full ${themeClasses.input} ${themeClasses.placeholder}`}
      />
      {usersLoading ? (
        <p className={themeClasses.text}>Loading...</p>
      ) : usersError ? (
        <p className="text-red-500">Error: {usersError}</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          theme={theme === 'dark' ? 'dark' : 'default'}
          customStyles={tableCustomStyles}
          noDataComponent="No doctors found"
        />
      )}
    </div>
  );
}

export default TotalDoctors;