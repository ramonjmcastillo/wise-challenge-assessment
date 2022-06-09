import React from "react";
import "./App.css";
import { Box } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import Home from "./pages/home";

function App() {
  return (
    <ApolloProvider client={client}>
      <Box sx={{ padding: "32px" }}>
        <Home />
      </Box>
    </ApolloProvider>
  );
}

export default App;
