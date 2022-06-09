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
    setStartBlock(value ? parseInt(value, 10) : 0);
  };

  return (
    <Box>
      Home
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
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? orderDirection : "asc"}
                  onClick={() => handleSort("id")}
                >
                  Id
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "startBlock"}
                  direction={orderBy === "startBlock" ? orderDirection : "asc"}
                  onClick={() => handleSort("startBlock")}
                >
                  Start Block
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "endBlock"}
                  direction={orderBy === "endBlock" ? orderDirection : "asc"}
                  onClick={() => handleSort("endBlock")}
                >
                  End Block
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "signalledTokens"}
                  direction={
                    orderBy === "signalledTokens" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("signalledTokens")}
                >
                  Signalled Tokens
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "stakeDeposited"}
                  direction={
                    orderBy === "stakeDeposited" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("stakeDeposited")}
                >
                  Stake Deposited
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "totalQueryFees"}
                  direction={
                    orderBy === "totalQueryFees" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("totalQueryFees")}
                >
                  Total Query Fees
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "taxedQueryFees"}
                  direction={
                    orderBy === "taxedQueryFees" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("taxedQueryFees")}
                >
                  Taxed Query Fees
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "queryFeesCollected"}
                  direction={
                    orderBy === "queryFeesCollected" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("queryFeesCollected")}
                >
                  Query Fees Collected
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "curatorQueryFees"}
                  direction={
                    orderBy === "curatorQueryFees" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("curatorQueryFees")}
                >
                  Curator Query Fees
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "queryFeeRebates"}
                  direction={
                    orderBy === "queryFeeRebates" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("queryFeeRebates")}
                >
                  Total Rewards
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "totalRewards"}
                  direction={
                    orderBy === "totalRewards" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("totalRewards")}
                >
                  Total Indexer Rewards
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "totalIndexerRewards"}
                  direction={
                    orderBy === "totalIndexerRewards" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("totalIndexerRewards")}
                >
                  Total Delegator Rewards
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "totalDelegatorRewards"}
                  direction={
                    orderBy === "totalDelegatorRewards" ? orderDirection : "asc"
                  }
                  onClick={() => handleSort("totalDelegatorRewards")}
                >
                  Total Delegator Rewards
                </TableSortLabel>
              </TableCell>
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
