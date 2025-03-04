import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics.jsx";
import PageMeta from "../../components/common/PageMeta";
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext'; // Assuming you have a ThemeContext

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { theme } = useTheme(); // Get current theme from context

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    // Here you would typically make an API call to create the club
    handleOk();
  };

  const modalBgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const modalTextColor = theme === 'dark' ? 'text-white' : 'text-gray-800';
  const inputBgColor = theme === 'dark' ? 'bg-gray-700' : 'bg-white';
  const inputBorderColor = theme === 'dark' ? 'border-gray-600' : 'border-gray-300';

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className={`grid grid-cols-12 gap-4 md:gap-6 ${theme === 'light' ? 'bg-gray-100' : ''}`}>
        <div className="col-span-12 space-y-6">
          <button 
            onClick={showModal} 
            className={`bg-blue-500 text-white px-4 py-2 rounded mb-4 ${theme === 'dark' ? 'hover:bg-blue-600' : 'hover:bg-blue-400'}`}
            style={{ marginBottom: 16 }}
          >
            Add Club
          </button>
          
          <EcommerceMetrics />
        </div>
      </div>

      {isModalVisible && (
        <div className={`fixed inset-0 bg-opacity-50 flex items-center justify-center p-4`}>
          <div className={`${modalBgColor} ${modalTextColor} rounded-lg p-6 w-full max-w-md shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Club</h2>
              <button onClick={handleCancel} className={`${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}>
                &times;
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const values = Object.fromEntries(formData.entries());
              onFinish(values);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  name="name" 
                  required 
                  className={`w-full px-3 py-2 border ${inputBorderColor} rounded ${inputBgColor}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className={`w-full px-3 py-2 border ${inputBorderColor} rounded ${inputBgColor}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input 
                  name="password" 
                  type="password" 
                  required 
                  className={`w-full px-3 py-2 border ${inputBorderColor} rounded ${inputBgColor}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select 
                  name="role" 
                  defaultValue="club" 
                  disabled 
                  className={`w-full px-3 py-2 border ${inputBorderColor} rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-100'}`}
                >
                  <option value="club">Club</option>
                </select>
              </div>
              <button 
                type="submit" 
                className={`bg-blue-500 text-white px-4 py-2 rounded ${theme === 'dark' ? 'hover:bg-blue-600' : 'hover:bg-blue-400'}`}
              >
                Create Club
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
