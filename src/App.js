import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Stack, createTheme } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import Sidebar from './components/Sidebar/Sidebar';
import Rightbar from './components/Rightbar/Rightbar';
// import AddPost from './components/AddPost/AddPost';


function App() {

  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    }
  });

  return (
    <div className="App">

      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"} sx={{ minHeight: "100vh" }}>
          <BrowserRouter>
            <Navbar />
            <Stack
              direction={'row'}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Sidebar setMode={setMode} mode={mode} />
              <Box flex={4} p={2}>
                <Routes>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/users/:userId' element={<User />}></Route>
                  <Route exact path="/auth" element={
                    localStorage.getItem("currentUser") != null
                      ? <Navigate to="/" />
                      : <Auth />
                  }></Route>
                </Routes>
              </Box>

              <Rightbar />
            </Stack>
            {/* <Post /> */}
          </BrowserRouter>
        </Box>
      </ThemeProvider>


      {/* <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home />} > </Route>
          <Route path='/users/:userId' element={<User />} ></Route>
          <Route exact path="/auth" element={
            localStorage.getItem("currentUser") != null
              ? <Navigate to="/" />
              : <Auth />
          }></Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;