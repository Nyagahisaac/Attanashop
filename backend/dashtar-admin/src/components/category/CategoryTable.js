import React from 'react';
import { TableBody, TableRow, TableCell, Avatar} from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import CategoryDrawer from '../drawer/CategoryDrawer'
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';


const CategoryTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  

  
  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CategoryDrawer id={serviceId} />
      </MainDrawer>

     

      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.id}>
             <TableCell className="font-medium text-sm">
              {category.id}
            </TableCell>
          
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={category.image}
                alt={category.name}
              />
            </TableCell>

            <TableCell className="font-medium text-sm">
              {category.name}
            </TableCell>
            
            <TableCell>
              <ShowHideButton id={category.id} status={category.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={category.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;