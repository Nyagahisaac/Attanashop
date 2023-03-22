import React, { useContext } from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import { SidebarContext } from '../context/SidebarContext';
import ToolsServices from '../services/ToolsServices';
import MainDrawer from '../components/drawer/MainDrawer';
import ToolsDrawer from '../components/drawer/ToolsDrawer';
import ToolCategory from '../components/Tools/ToolsCategory';

const Tools = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(ToolsServices.getAllTools);

  const {
    toolsRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitTools,
  } = useFilter(data);

  return (
    <>
      {/* <PageTitle>Tools</PageTitle> */}

      <MainDrawer>
        <ToolsDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitTools}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={toolsRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by Tools type"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Tools
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Tools Icon</TableCell>
                <TableCell>Tools Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <ToolCategory tools={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Tools" />
      )}
    </>
  );
};

export default Tools;

