// src/components/BranchCountBarChart.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

// Register the components required for Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function BranchCountBarChart({ companyId }) {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Number of Branches',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(`http://localhost:8000/companies/${companyId}/locations`);
        const companiesResponse = await axios.get(`http://localhost:8000/companies`);

        const locationData = locationsResponse.data;
        const companyData = companiesResponse.data;

        // Count the number of branches for each company
        const companyBranchCounts = companyData.map(company => ({
          name: company.name,
          branchCount: locationData.filter(location => location.company_id === company.company_id).length,
        }));

        // Prepare data for the bar chart
        setData({
          labels: companyBranchCounts.map(company => company.name),
          datasets: [
            {
              label: 'Number of Branches',
              data: companyBranchCounts.map(company => company.branchCount),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [companyId]);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Branch Count Per Company</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.dataset.label || '';
                  const value = context.raw;
                  return `${label}: ${value}`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default BranchCountBarChart;
