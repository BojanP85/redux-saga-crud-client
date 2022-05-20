import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Provider } from "react-redux";

import store from "../store";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const App = () => (
  <Provider store={store}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Redux-Saga CRUD
        </Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth={false} sx={{ my: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <UserForm />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <UserTable />
        </Grid>
      </Grid>
    </Container>
  </Provider>
);

export default App;
