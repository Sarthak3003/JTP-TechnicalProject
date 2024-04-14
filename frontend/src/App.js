import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Results from "./components/Results";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainRouter from "./MainRouter";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
import Grid from "@mui/material/Grid";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0B4040',
    },
    secondary: {
      main: '#34A853',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Add fallback fonts as needed
  },
})

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
                <Router>
                    <MainRouter />
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
