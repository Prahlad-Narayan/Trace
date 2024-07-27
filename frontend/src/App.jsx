import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetails from './components/CompanyDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8">
          <Routes>
            <Route path="/" element={<CompanyList />} />
            <Route path="/company/:id" element={<CompanyDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
