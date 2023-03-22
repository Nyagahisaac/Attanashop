import React from 'react';

import useAsync from '../../hooks/useAsync';
import CategoryServices from '../../services/CategoryServices';


const ParentCategory = () => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  return (
    <>
      {data.map((category, category_id) => (
        <option key={category.id} >
          {category.name}
          {category.category_id}
        </option>
      ))}
    </>
  );
};

export default ParentCategory;
