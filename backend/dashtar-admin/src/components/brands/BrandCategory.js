import React from 'react';

import useAsync from '../../hooks/useAsync';
import BrandServices from '../../services/BrandServices';


const BrandCategory = () => {
  const { data } = useAsync(BrandServices.getAllBrand); //   console.log(value);
  return (
    <>
      {data.map((brand) => (
        <option key={brand.id} value={brand.brand}>
          {brand.brandname}
        </option>
      
      ))}
    </>
  );
};

export default BrandCategory;