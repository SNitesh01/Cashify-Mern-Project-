import React from 'react';
import { ThemeProvider } from "@material-ui/core/styles";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { Provider } from "react-redux"
import theme from "./constants/theme";
import Login from "./screens/Login";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import "../src/assets/style.css"
import store from "./store";
import Layout from "./components/layout/Layout";
import Nabar from './components/Userinterface/Nabar';

function App() {
  return (
      <React.StrictMode>
          <Provider store={store}>
              <ThemeProvider theme={theme}>
                  <BrowserRouter>
                      <Switch>
                          <PublicRoute path="/Home" component={Nabar} />
                          <PublicRoute path="/login" component={Login}/>
                          <PrivateRoute path="/admin" component={Layout}/>
                          <Route path="/" render={props => <Redirect to="/Home"/>}/>
                      </Switch>
                  </BrowserRouter>
              </ThemeProvider>
          </Provider>
      </React.StrictMode>
  );
}

export default App;
