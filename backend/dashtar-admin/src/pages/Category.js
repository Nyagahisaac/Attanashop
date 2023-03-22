/* eslint-disable no-undef */
import React from 'react';
import {
  Table,
  TableHeader,
  TableContainer,

} from '@windmill/react-ui';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import PageTitle from '../components/Typography/PageTitle';
import CategoryServices from '../services/CategoryServices';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SubCategory from './SubCategory';
import Tools from "./Tools"
import Brand from './Brands';
import Binding from './Binding';

const Category = () => {
  const { data, loading } = useAsync(CategoryServices.getAllCategory);
 
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  const {
    dataTable,
    serviceData,
  } = useFilter(data);

  return (
    <>
    
    <PageTitle>All Categories</PageTitle>


      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (

        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider'  }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" className='color-white'>
                      <Tab label="Main Category" value="1"  />
                      <Tab label="Sub Category" value="2"   />
                      <Tab label="Brands" value="3"   />
                      <Tab label=" Tools" value="4"  />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                   
                    <Binding categories={dataTable} />
                  </TabPanel>
                  <TabPanel value="2">

                    <SubCategory subcategory={dataTable} />
                  </TabPanel>
                  <TabPanel value="3">
                    <Brand brands={dataTable} />
                  </TabPanel>
                  <TabPanel value="4">
                    <Tools tools={dataTable} />
                  </TabPanel>
                </TabContext>
              </Box>
            
           
            </TableHeader>
          </Table>
    
        </TableContainer>
      ) : (
        <NotFound title="Category" />
      )}
    </>
  );
};

export default Category;
