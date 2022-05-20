import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserState } from "../redux/selectors/user";
import { getUsers } from "../redux/slice/user";
import UserRow from "./UserRow";
import UserTableSkeleton from "./UserTableSkeleton";

const TableRowStyle: SxProps<Theme> = {
  "&:last-child td, &:last-child th": { border: 0 },
};

const UserTable = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(getUserState);

  const { fetchLoading } = loading;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (fetchLoading) {
    return <UserTableSkeleton rows={6} sxProp={TableRowStyle} />;
  }

  return (
    <Container maxWidth={false}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Surname</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!users.length && (
              <TableRow sx={TableRowStyle}>
                <TableCell colSpan={5}>Users list is empty.</TableCell>
              </TableRow>
            )}
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                tableRowStyle={TableRowStyle}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserTable;
