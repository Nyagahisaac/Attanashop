import React from 'react'
import { TableBody, TableRow, TableCell, Avatar} from '@windmill/react-ui';

import MainModal from '../modal/MainModal';
import MainDrawer from '../drawer/MainDrawer';
import ShowHideButton from '../table/ShowHideButton';
import ToolsDrawer from '../drawer/ToolsDrawer';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EditDeleteButton from '../table/EditDeleteButton';

const ToolCategory = ({tools}) => {
    const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    return (
      <>
        <MainModal id={serviceId} />
        <MainDrawer>
          <ToolsDrawer id={serviceId} />
        </MainDrawer>
  
       
  
        <TableBody>
          {tools?.map((tool, i) => (
            <TableRow key={i + 1}>
               <TableCell className="font-medium text-sm">
                {tool.id}
              </TableCell>
            
              <TableCell>
                <a href={`${tool.image}`} target="_blank" rel="noreferrer" >
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={tool.image}
                  alt={tool.tool}
                />
                </a>
              </TableCell>
  
              <TableCell className="text-sm  " > 
               { tool.tool}
              </TableCell>
              <TableCell>
                <ShowHideButton id={tool.id} status={tool.status} />
              </TableCell>
              <TableCell>
                <EditDeleteButton
                  id={tool.id}
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

export default ToolCategory