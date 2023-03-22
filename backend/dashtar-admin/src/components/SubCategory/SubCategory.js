import React from 'react';
import { TableBody, TableRow, TableCell, Avatar} from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import SubcategoryDrawer from '../drawer/SubcategoryDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';


const SubCategory = ({ subcategory }) => {
    const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <SubcategoryDrawer id={serviceId} />
      </MainDrawer>

     

      <TableBody>
        {subcategory?.map((subcat, i) => (
          <TableRow key={i + 1}>
             <TableCell className="font-medium text-sm">
              {subcat.id}
            </TableCell>
          
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={subcat.image}
                alt={subcat.type}
              />
            </TableCell>

          
            <TableCell className="font-medium text-sm">
              {subcat.type}
            </TableCell>
            <TableCell>
              <ShowHideButton id={subcat.id} status={subcat.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={subcat.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  )
}

export default SubCategory;