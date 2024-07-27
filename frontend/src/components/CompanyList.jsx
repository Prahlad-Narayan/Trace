import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch company data from the API
    axios.get('http://localhost:8000/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  // Filter companies based on the search term
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Company List</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-48"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCompanies.map(company => (
          <div key={company.company_id} className="flex flex-col justify-between p-4 border border-gray-200 rounded hover:bg-gray-50 transition h-48">
            <div>
              <Link to={`/company/${company.company_id}`} className="text-lg font-semibold text-blue-600">
                {company.name}
              </Link>
              <p className="text-gray-600">{company.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
