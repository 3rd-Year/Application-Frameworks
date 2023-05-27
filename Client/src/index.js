import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { ThemeProvider } from "@emotion/react";
import CTheme from "./components/theme/CTheme";
//axios.defaults.baseURL = "https://ctms-api.vercel.app";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={CTheme}></ThemeProvider>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);
