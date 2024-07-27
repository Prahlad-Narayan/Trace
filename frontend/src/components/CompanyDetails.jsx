import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for proper styling
import L from 'leaflet';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Fix for default Leaflet icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [locations, setLocations] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  
  useEffect(() => {
    // Fetch company details, locations, and all companies data
    axios.get(`http://localhost:8000/companies/${id}`)
      .then(response => setCompany(response.data))
      .catch(error => console.error('Error fetching company details:', error));

    axios.get(`http://localhost:8000/companies/${id}/locations`)
      .then(response => setLocations(response.data))
      .catch(error => console.error('Error fetching locations:', error));

    axios.get(`http://localhost:8000/companies`)
      .then(response => setAllCompanies(response.data))
      .catch(error => console.error('Error fetching all companies:', error));
  }, [id]);

  // Calculate branch counts for all companies
  const branchCounts = allCompanies.map(company => {
    const count = locations.filter(location => location.company_id === company.company_id).length;
    return { name: company.name, count };
  });

  // Prepare data for the bar chart
  const data = {
    labels: branchCounts.map(company => company.name),
    datasets: [
      {
        label: 'Branch Count',
        data: branchCounts.map(company => company.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options with y-axis step size set to 1
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        stepSize: 1, // Set the y-axis step size to 1
      },
    },
  };

  // Display loading state if company data is not yet available
  if (!company) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{company.name}</h1>
      <p className="text-gray-600 mb-4">{company.address}</p>
      <button 
        onClick={() => navigate('/')} 
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Back to List
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 h-64 mb-6 rounded-lg overflow-hidden">
          <MapContainer 
            center={[company.latitude, company.longitude]} 
            zoom={8} 
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={[company.latitude, company.longitude]}>
              <Popup>{company.name}</Popup>
            </Marker>
            {locations.map(location => (
              <Marker key={location.location_id} position={[location.latitude, location.longitude]}>
                <Popup>{location.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="md:w-1/2 h-72">
          <Bar data={data} options={options} />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Locations</h2>
      <ul className="space-y-4">
        {locations.map(location => (
          <li key={location.location_id} className="p-4 border-b border-gray-200">
            <p className="font-semibold">{location.name}</p>
            <p className="text-gray-600">{location.address}</p>
            <p className="text-gray-600">Lat: {location.latitude}, Lng: {location.longitude}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyDetails;
