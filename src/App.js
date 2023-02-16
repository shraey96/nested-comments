import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha } from "@mui/material";
import Navbar from "./components/Navbar";
import Posts from "./Pages/Posts";

const APP_THEME = createTheme();

const BOX_STYLE = {
  display: "flex",
  flexDirection: "column",
  minHeight: "calc(100vh - 64px)",
  backgroundColor: (theme) => alpha(theme.palette.common.black, 0.8),
};

function App() {
  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <Navbar />
      <Box sx={BOX_STYLE} bgColor="red">
        <Container maxWidth="lg">
          <Posts />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
