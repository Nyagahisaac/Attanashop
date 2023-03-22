import React from 'react';
import { TableBody, TableRow, TableCell, Avatar} from '@windmill/react-ui';
import * as dayjs from 'dayjs';
import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import BrandDrawer from '../drawer/BrandDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const BrandTable = ({ brands }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <BrandDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {brands?.map((brand, i) => (
          <TableRow key={i + 1}>
            <TableCell className="font-semibold uppercase text-xs">
              {brand.id}
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={brand.image}
                alt={brand.brandname}
              />
            </TableCell>
            <TableCell className="text-sm">{brand.brandname}</TableCell>
           

            <TableCell className="text-sm">{dayjs(brand.createdAt).format('MMM/D/YYYY')}</TableCell>

            <TableCell>
              <EditDeleteButton
                id={brand.id}
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

export default BrandTable;