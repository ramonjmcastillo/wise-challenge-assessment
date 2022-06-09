import React, { useState } from "react";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_EPOCHES } from "../../apollo/queries";

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [startBlock, setStartBlock] = useState(0);
  const [orderBy, setOrderBy] = useState("id");
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

  console.log(getEpoches);

  return <Box> Home </Box>;
};

export default Home;
