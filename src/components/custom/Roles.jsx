import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.js';
import { LiaUserCheckSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPermissions, updatePermissions } from '../../redux/permission/permissionSlice.js';

const Roles = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { permissions: storedPermissions, loading } = useSelector((state) => state.auth);
  const [permissions, setPermissions] = useState({});

  // Fetch permissions when component mounts
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching permissions...');
      try {
        const result = await dispatch(fetchPermissions()).unwrap();
        console.log('API Response:', result);

        // Transform API response into state format { permission_name: isActive }
        const formattedPermissions = result.reduce((acc, item) => {
          acc[item.name] = item.isActive;
          return acc;
        }, {});

        setPermissions(formattedPermissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Handle permission toggle
  const handlePermissionChange = async (permission) => {
    const newPermissions = {
      ...permissions,
      [permission]: !permissions[permission]
    };

    console.log('Updating permission:', permission, 'to:', newPermissions[permission]);
    setPermissions(newPermissions);

    try {
      const result = await dispatch(updatePermissions(newPermissions)).unwrap();
      console.log('Update API Response:', result);
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const themeClasses = {
    container: theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
    label: theme === 'dark' ? 'text-gray-300' : 'text-gray-700',
    toggle: {
      base: 'relative w-11 h-6 rounded-full peer transition-colors',
      unchecked: theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200', // Unchecked BG
      checked: 'peer-checked:bg-blue-500', // Checked BG (blue)
      after: "after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white",
      focus: theme === 'dark' ? 'peer-focus:ring-blue-500' : 'peer-focus:ring-blue-300'
    },
    card: theme === 'dark' ? 'border-gray-700 shadow-xs' : 'border-gray-200 shadow-sm'
  };
  
  


  console.log('Current permissions state:', permissions);
  console.log('Loading state:', loading);

  return (
    <div className={`rounded-2xl border p-5 md:p-6 ${themeClasses.container} ${themeClasses.card}`}>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <LiaUserCheckSolid className="w-6 h-6" />
        Role Permissions
      </h2>
      {loading ? (
        <p>Loading permissions...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(permissions).map(([key, value]) => {
            console.log(`Rendering permission toggle for: ${key}, value: ${value}`);
            return (
              <div key={key} className={`p-4 rounded-lg flex items-center border ${themeClasses.card}`}>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handlePermissionChange(key)}
                    className="sr-only peer"
                    disabled={loading}
                  />
                  <div className={`${themeClasses.toggle.base} ${themeClasses.toggle.unchecked} peer-focus:ring-4 ${themeClasses.toggle.focus} ${themeClasses.toggle.checked} ${themeClasses.toggle.after}`}></div>

                  <span className={`ms-3 text-sm font-medium capitalize ${themeClasses.label}`}>
                    {key.replace('_', ' ')}
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Roles;
