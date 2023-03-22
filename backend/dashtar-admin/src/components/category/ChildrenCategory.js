import React from 'react';

import useAsync from '../../hooks/useAsync';
import SubCategoryServices from '../../services/SubCategoryServices';


const ChildrenCategory = ({ value }) => {

  const { data } = useAsync(SubCategoryServices.getAllSubCategory);
 

  return (
    <>
      {data?.map((subcategory) => (
        
        
          <option  key={subcategory.id} value={subcategory}>
            {subcategory.type}
         
          </option>
       
      ))}
    </>
  );
};

export default ChildrenCategory;
