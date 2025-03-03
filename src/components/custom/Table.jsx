import React, { useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  { name: "ID", selector: (row) => row.id, sortable: true },
  { name: "Name", selector: (row) => row.name, sortable: true },
  { name: "Email", selector: (row) => row.email },
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Brown", email: "alice@example.com" },
];

const CustomTable = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    
    // Filter data
    const filtered = data.filter((row) =>
      row.name.toLowerCase().includes(query) || row.email.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full"
      />
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default CustomTable;
