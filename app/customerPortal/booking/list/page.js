"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/navigation";
import { decryptToken, getBookingListData } from "@/services/fetchData";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffc400",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`& td, & th`]: {
    padding: "6px 16px",
    fontSize: 10,
    minWidth: "150px",
  },
}));

function createData(
  number,
  date,
  booking,
  shipper,
  consignee,
  plr,
  pol,
  pod,
  fpd
) {
  return { number, date, booking, shipper, consignee, plr, pol, pod, fpd };
}

export default function BookingList() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bookingData, setBookingData] = useState([]);
  const [loadingState, setLoadingState] = useState("Loading...");
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const getEmail = decryptToken();
    async function fetchData() {
      const obj = {
        loginName: getEmail?.email_id,
      };
      setAuth(getEmail?.email_id);
      try {
        const val = await getBookingListData(obj);
        val.message
          ? setLoadingState("No Data Found")
          : setBookingData(val.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const rows = bookingData
    ? bookingData.map((item) =>
        createData(
          item["jobNo"],
          item["jobDate"],
          item["Carrier Booking No"],
          item["shipper"],
          item["consignee"],
          item["plr"],
          item["pol"],
          item["pod"],
          item["fpd"]
        )
      )
    : [];

  // createData(234534, "9/7/24", "mumbai", "Delhi", "USA", 33, 22, 67, 88),

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchBookingData = (value) => {
    localStorage.setItem("bookingId", value);
    localStorage.setItem("isViewBooking", true);
    router.push("/customerPortal/booking");
  };

  return (
    <Box className="sm:p-3 p-3 ">
      <Box className="flex justify-between">
        <Typography variant="h5" className="text-left flex items-center ">
          Booking List
        </Typography>
        <Button
          variant="contained"
          className="mx-4 my-2 capitalize hover:bg-[#ffc400] "
          size="small"
          onClick={() => {
            auth
              ? router.push("/customerPortal/booking")
              : router.push("/login");

            localStorage.removeItem("bookingId");
            localStorage.removeItem("isViewBooking");
          }}
          sx={{ backgroundColor: "#ffc400" }}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Booking No.</StyledTableCell>
              <StyledTableCell>Booking Date</StyledTableCell>
              <StyledTableCell>PLR</StyledTableCell>
              <StyledTableCell>POL</StyledTableCell>
              <StyledTableCell>POD</StyledTableCell>
              <StyledTableCell>FPD</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!rows.length ? (
              <StyledTableRow>
                <TableCell>{loadingState}</TableCell>
              </StyledTableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index} hover className="relative group ">
                    <TableCell component="th" scope="row">
                      {row.number}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.plr}</TableCell>
                    <TableCell>{row.pol}</TableCell>
                    <TableCell>{row.pod}</TableCell>
                    <TableCell>{row.fpd}</TableCell>
                    <TableCell className="absolute right-[5px] top-[-4px] cursor-pointer z-10 w-[20px] invisible group-hover:visible border-0 ">
                      <IconButton
                        aria-label="View"
                        sx={{ color: "#1976d2" }}
                        className="absolute top-0 right-0 "
                        onClick={() => fetchBookingData(row.number)}
                      >
                        <Tooltip title="View">
                          <VisibilityIcon
                            sx={{ width: "20px", color: "#ffc400" }}
                          />
                        </Tooltip>
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
