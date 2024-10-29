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
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";
import { decryptToken, getQuotationListData } from "@/services/fetchData";

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

function createData(number, date, expectedSailingDate, plr, pol, pod, fpd) {
  return { number, date, expectedSailingDate, plr, pol, pod, fpd };
}

export default function QuotationList() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quotationData, setQuotationData] = useState([]);
  const [loadingState, setLoadingState] = useState("Loading...");
  const [auth , setAuth] = useState('');

  useEffect(() => {
    async function fetchData() {
      const getEmail = decryptToken();
      const obj = {
        loginName: getEmail?.email_id,
      };
      setAuth(getEmail?.email_id);
      try {
        const val = await getQuotationListData(obj);
        val.message
          ? setLoadingState("No Data Found")
          : setQuotationData(val.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const rows = quotationData
    ? quotationData.map((item) =>
        createData(
          item[`enquiryNo`],
          item[`enquiryDate`],
          item["expectedSailingDate"],
          // "Delhi",
          item["plr"],
          item["pol"],
          item["pod"],
          item["fpd"]
        )
      )
    : [];

  // createData(234534, "9/7/24", "mumbai", "Delhi", 33, 22, 67, 88),

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box className="sm:p-3 p-3 ">
      <Box className="flex justify-between">
        <Typography variant="h5" className="text-left flex items-center  ">
          Enquiry List
        </Typography>
        <Button
          variant="contained"
          className="mx-4 my-2 capitalize hover:bg-[#ffc400] "
          size="small"
          onClick={() => auth ? router.push("/customerPortal/quotation") : router.push("/login")}
          sx={{ backgroundColor: "#ffc400" }}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Enquiry No.</StyledTableCell>
              <StyledTableCell>Enquiry Date</StyledTableCell>
              <StyledTableCell>Expected Sailing Date</StyledTableCell>
              {/* <StyledTableCell>Date To</StyledTableCell> */}
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
                    <TableCell>{row.expectedSailingDate}</TableCell>
                    {/* <TableCell>{row.dateTo}</TableCell> */}
                    <TableCell>{row.plr}</TableCell>
                    <TableCell>{row.pol}</TableCell>
                    <TableCell>{row.pod}</TableCell>
                    <TableCell>{row.fpd}</TableCell>
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
