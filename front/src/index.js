import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
