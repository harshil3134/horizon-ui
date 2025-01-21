import {
  Box,
  Button,

  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  Flex,
  Text,
  Menu,
  useColorModeValue,
  useDisclosure,
  Icon,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import routes from 'routes';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Inputform from './Inputform';
import { MdHome } from 'react-icons/md';
import  addRoute  from '../../routes';
import Profile from 'views/admin/profile';


export default function EditRoute() {
  const [sorting, setSorting] = useState([]);
  const [routedata, setRouteData] = useState([]);
  const [hasrun,sethasrun]=useState(false)
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('secondaryGray.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');


  const concatepath=useCallback(()=>{

    const updatedData = routedata.map((item) => {
      return {
        ...item,
        path: `${item.layout}${item.path}`, // Concatenate layout and path
      };
    });
  
    setRouteData(updatedData); //


    // let arr=routedata.map((items)=>{
    //   return ({...items, path:`${[items.layout]}${[items.path]}`})
    // })
    // console.log(arr)
    // setRouteData(arr)
  },[routedata])
  

  useEffect(() => {
    setRouteData(routes);
   sethasrun(true)
  }, []);

  useEffect(() => {
    if (hasrun) {
      concatepath();
      sethasrun(false)
    }
  }, [routedata,concatepath]);


  useEffect(()=>{
    console.log("data",routedata)
  },[routedata])


  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      id: 'name',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          LABEL
        </Text>
      ),
      cell: (info) => (
        <Flex align="center">
          <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),
    columnHelper.accessor('icon', {
      id: 'icon',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          ICON
        </Text>
      ),
      cell: (info) => <Flex align="center">{info.getValue()}</Flex>,
    }),
    columnHelper.accessor('path', {
      id: 'path',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          PATH
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('component', {
      id: 'component',
      header: () => (
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '10px', lg: '12px' }}
          color="gray.400"
        >
          COMPONENT NAME
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()?.type?.name || 'N/A'}
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data: routedata,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const {isOpen,onOpen,onClose}=useDisclosure();

const nroute={
  name: 'temp',
  layout: '/temp',
  path: '/temp',
  icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  component: <Profile />,
}

  const fun=()=>{
addRoute(nroute);
  }

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
      mt={{ base: '250px', md: '80px', xl: '80px' }}
    >
<Inputform isOpen={isOpen} onClose={onClose} />

      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
          mt="50px"
        >
          Edit Routes 
        </Text>
        <Button
          marginRight={'10px'}
          colorScheme="purple"
          bg="purple.600"
          _hover={{ bg: 'purple.700' }}
          size={{ base: 'sm', md: 'md', lg: 'md' }}
          mt="19px"
          onClick={fun}
        >
          +
        </Button>
        <Menu />
      </Flex>
    

      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    pe="10px"
                    borderColor={borderColor}
                    cursor="pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Flex
                      justifyContent="space-between"
                      align="center"
                      fontSize={{ sm: '10px', lg: '12px' }}
                      color="gray.400"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: '',
                        desc: '',
                      }[header.column.getIsSorted()] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 11)
              .map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td
                      key={cell.id}
                      fontSize={{ sm: '14px' }}
                      minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                      borderColor="transparent"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
