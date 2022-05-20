import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Skeleton from "@mui/material/Skeleton";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

const UserTableSkeleton = ({
  rows,
  sxProp,
}: {
  rows: number;
  sxProp: SxProps<Theme>;
}) => {
  return (
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
          {Array(rows)
            .fill(1)
            .map((_, index) => (
              <TableRow key={index} sx={sxProp}>
                <TableCell colSpan={5}>
                  <Skeleton
                    sx={{ borderRadius: "4px" }}
                    variant="rectangular"
                    height={36.5}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTableSkeleton;
