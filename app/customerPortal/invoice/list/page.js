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
  // Button,
  // IconButton,
  TablePagination,
  // Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { useRouter } from "next/navigation";
import { decryptToken, getInvoiceListData } from "@/services/fetchData";

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

function createInvoiceData(
  invoiceNo,
  invoiceDate,
  bookingBLNo,
  invoiceCurrency,
  invoiceAmount,
  taxAmount,
  totalInvoiceAmount
) {
  return {
    invoiceNo,
    invoiceDate,
    bookingBLNo,
    invoiceCurrency,
    invoiceAmount,
    taxAmount,
    totalInvoiceAmount,
  };
}

export default function InvoiceList() {
  // const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoiceData, setInvoiceData] = useState([]);
  const [loadingState, setLoadingState] = useState("Loading...");
  // Todo:  Will be requied in the future
  // const [auth, setAuth] = useState("");


  useEffect(() => {
    const getEmail = decryptToken();
    async function fetchData() {
      const obj = {
        loginName: getEmail?.email_id,
      };
  // Todo:  Will be requied in the future
      // setAuth(getEmail?.email_id);
      try {
        const val = await getInvoiceListData(obj);
        val.message
          ? setLoadingState("No Data Found")
          : setInvoiceData(val.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const rows = invoiceData
    ? invoiceData.map((item) =>
        createInvoiceData(
          item[`invoiceNo`],
          item[`invoiceDate`],
          item[`bookingBLNo`] || "N/A",
          item[`invoiceCurrency`],
          item[`invoiceAmount`],
          item[`taxAmount`],
          item[`totalInvoiceAmount`]
        )
      )
    : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Todo:  Will be requied in the future
  // const fetchInvoiceData = (value) => {
  //   localStorage.setItem("invoiceId", value);
  //   router.push("/customerPortal/invoice");
  // };

  return (
    <Box className="sm:p-3 p-3 ">
      <Box className="flex justify-between">
        <Typography variant="h5" className="text-left flex items-center ">
          Invoice List
        </Typography>
        {/* <Button
          variant="contained"
          className="mx-4 my-2 capitalize hover:bg-[#ffc400] "
          sx={{ backgroundColor: "#ffc400" }}
          size="small"
          onClick={() => {
            auth ? router.push("/customerPortal/invoice") : router.push("/login");
          }}
        >
          Add
        </Button> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Invoice No.</StyledTableCell>
              <StyledTableCell>Invoice Date</StyledTableCell>
              <StyledTableCell>Booking B/L No.</StyledTableCell>
              <StyledTableCell>Currency</StyledTableCell>
              <StyledTableCell>Invoice Amount</StyledTableCell>
              <StyledTableCell>Tax Amount</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
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
                  <StyledTableRow key={index} hover className="relative group">
                    <TableCell component="th" scope="row">
                      {row.invoiceNo}
                    </TableCell>
                    <TableCell>{row.invoiceDate}</TableCell>
                    <TableCell>{row.bookingBLNo}</TableCell>
                    <TableCell>{row.invoiceCurrency}</TableCell>
                    <TableCell>{row.invoiceAmount}</TableCell>
                    <TableCell>{row.taxAmount}</TableCell>
                    <TableCell>{row.totalInvoiceAmount}</TableCell>
                    {/* <TableCell className="absolute right-[5px] top-[-4px] cursor-pointer z-10 w-[20px] invisible group-hover:visible border-0">
                      <IconButton
                        aria-label="View"
                        sx={{ color: "#1976d2" }}
                        className="absolute top-0 right-0"
                        onClick={() => fetchInvoiceData(row.invoiceNo)}
                      >
                        <Tooltip title="View">
                          <VisibilityIcon
                            sx={{ width: "20px", color: "#ffc400", marginTop: "5px" }}
                          />
                        </Tooltip>
                      </IconButton>
                    </TableCell> */}
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
