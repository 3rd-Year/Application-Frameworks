import { createTheme } from "@mui/material/styles";

const CTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: "#5ebc67",
        },
    },
    // typography: {
    //     fontFamily: "Quicksand,Almarai",
    // },
    // shape: {
    //     borderRadius: 20, // Set the border radius to 10
    // },
});

export default CTheme;