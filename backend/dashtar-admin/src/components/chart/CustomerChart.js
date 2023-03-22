import React from 'react';
import CategoryServices from '../../services/CategoryServices';
import useAsync from '../../hooks/useAsync';

const CustomerChart = ({ legends }) => {
  const { data } = useAsync(CategoryServices.getAllCategory);
  return (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {data.map((legend) => (
        <div className="flex items-center" key={legend.name}>
          <span className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}></span>
          <span>{legend.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomerChart;