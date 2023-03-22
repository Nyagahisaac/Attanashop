import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow, Badge, Avatar } from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import CouponDrawer from '../drawer/CouponDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const CouponTable = ({ coupons }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  
  
  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CouponDrawer id={serviceId} />
        
      </MainDrawer>
    
      <TableBody>
        
        {coupons.map((coupon, i) => {
         
        console.log('copon', coupon)
return(
          <TableRow key={i + 1}>          
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {coupon.id}
              </span>
            </TableCell>
            <TableCell>
              <Avatar
                className="hidden mr-3 md:block bg-gray-50 p-1"
                src={coupon.logo}
                alt={coupon.title}
              />
            </TableCell>
           
            <TableCell>
              <span className="text-sm">
                {' '}
                {dayjs(coupon.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {' '}
                {dayjs(coupon.endtime).format('MMM D, YYYY')}
              </span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm"> {coupon.title}</span>{' '}
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm"> {coupon.couponcode}</span>{' '}
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                {' '}
                {coupon.discountpercentage}%
              </span>{' '}
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm"> {coupon.type}</span>{' '}
            </TableCell>

            <TableCell className="align-middle ">
              {dayjs().isAfter(dayjs(coupon.endtime)) ? (
                <Badge type="danger">Expired</Badge>
                ) : (
                <Badge type="success">Active</Badge>
              )}

              <span></span>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={coupon.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
)
        })}

      </TableBody>
    </>
  );
};

export default CouponTable;
