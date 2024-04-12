import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Results from "./components/Results";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainRouter from "./MainRouter";
import Grid from "@mui/material/Grid";

const theme = createTheme({
    palette: {
        primary: {
            main: "#212121",
        },
        secondary: {
            main: "#212121",
        },
    },
    // typography: {
    //   allVariants: {
    //     fontFamily: 'Exo 2 !important',
    //     textTransform: 'none',
    //     // fontSize: 16,
    //   },
    // },
});

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Router>
                    <MainRouter />
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
