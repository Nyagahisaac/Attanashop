/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow ,Avatar} from '@windmill/react-ui';
import { FiEye, FiTrash2 } from 'react-icons/fi';

import Tooltip from '../tooltip/Tooltip';
import MainModal from '../modal/MainModal';
import { SidebarContext } from '../../context/SidebarContext';

const CustomerTable = ({ customers }) => {
  const [customerId, setCustomerId] = useState('');
  const { toggleModal } = useContext(SidebarContext);

  const handleModalOpen = (id) => {
    setCustomerId(id);
    toggleModal();
  };

  return (
    <>
      <MainModal id={customerId} />
      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {' '}
                {user.id}
              </span>
            </TableCell>
            
            <TableCell>
            <Avatar
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                  src={user.image}
                  alt={user.name}
                />
                
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.email}</span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{user.phone}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(user.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {' '}
                  <Link to={`/customer-order/${user.id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiEye}
                      title="View Order"
                      bgColor="#34D399"
                    />
                  </Link>
                </div>
                <div
                  onClick={() => handleModalOpen(user.id)}
                  className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
                >
                  <Tooltip
                    id="delete"
                    Icon={FiTrash2}
                    title="Delete"
                    bgColor="#F87171"
                  />
                  
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
