import React, { useState } from "react";
import {
  Box,
  InputBase,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableSortLabel,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_EPOCHES } from "../../apollo/queries";
import { formatBigInt } from "../../utilities/utilities";
import { columns } from "../../utilities/tableColumns";

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [startBlock, setStartBlock] = useState(0);
  const [orderBy, setOrderBy] = useState("startBlock");
  const [orderDirection, setOrderDirection] = useState("asc");

  const getEpoches = useQuery(GET_EPOCHES, {
    variables: {
      skip: offset,
      first: limit,
      orderBy,
      orderDirection,
      startBlock,
    },
  });

  const handleSort = (key) => {
    setOrderBy(key);
    setOrderDirection((prevState) => (prevState === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setOffset(newPage * limit);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setStartBlock(value ? parseInt(value) : 0);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <InputBase
          placeholder="Search"
          type="number"
          onChange={handleSearchChange}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? orderDirection : "asc"}
                      key={column.id}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {!getEpoches?.loading &&
              getEpoches?.data?.epoches?.map((epoch) => (
                <TableRow key={epoch.id}>
                  <TableCell>{epoch.id}</TableCell>
                  <TableCell>{epoch.startBlock}</TableCell>
                  <TableCell>{epoch.endBlock}</TableCell>
                  <TableCell>{formatBigInt(epoch.signalledTokens)}</TableCell>
                  <TableCell>{formatBigInt(epoch.stakeDeposited)}</TableCell>
                  <TableCell>{formatBigInt(epoch.totalQueryFees)}</TableCell>
                  <TableCell>{formatBigInt(epoch.taxedQueryFees)}</TableCell>
                  <TableCell>
                    {formatBigInt(epoch.queryFeesCollected)}
                  </TableCell>
                  <TableCell>{formatBigInt(epoch.curatorQueryFees)}</TableCell>
                  <TableCell>{formatBigInt(epoch.queryFeeRebates)}</TableCell>
                  <TableCell>{formatBigInt(epoch.totalRewards)}</TableCell>
                  <TableCell>
                    {formatBigInt(epoch.totalIndexerRewards)}
                  </TableCell>
                  <TableCell>
                    {formatBigInt(epoch.totalDelegatorRewards)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        count={-1}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default Home;
