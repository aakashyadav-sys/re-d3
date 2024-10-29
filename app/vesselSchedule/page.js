"use client";
import React, { useState } from "react";
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
  TablePagination,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { vesselFormData } from "@/services/fetchData";
import CustomInput from "@/app/components/customInput/customInput";
import Navbar from "../components/navbar/navbar";

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

const fields = [
  {
    label: "Origin Port",
    name: "por",
    type: "dropdown",
    labelType: "PORT",
  },
  {
    label: "Destination Port",
    name: "pod",
    type: "dropdown",
    labelType: "PORT",
  },
];

function createData(vesselName, voyageNo, route , eta , etd , PortCutoff) {
  return { vesselName, voyageNo, route , eta , etd , PortCutoff};
}

export default function VesselSchedule() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quotationData, setVesselData] = useState([]);
  const [loadingState, setLoadingState] = useState("No Data Fund");
  const [formData, setFormData] = useState({ containerDetails: [] });

  const rows = quotationData
    ? quotationData.map((item) =>
        createData(
          item[`vesselName`],
          item["voyageNo"],
          item["route"],
          item[`eta`],
          item[`etd`],
          item['port_cut_off']
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

  const filterHandler = async () => {
    const obj = {
      originPort: formData?.por?.Id,
      destinationPort: formData?.pod?.Id,
    };
    const { data } = await vesselFormData(obj);
    console.log(data);
    if (!data.result) {
      setLoadingState("No Data Fund");
    } else {
      setVesselData(data.result);
    }
  };

  return (
    <Box className="sm:p-3 p-3 ">
        <Navbar />
      <Box className="flex justify-between mt-4">
        <Typography variant="h5" className="text-left flex items-center  ">
          Vessel Schedule
        </Typography>
      </Box>
      <Box className="mb-4">
        <Box className="flex gap-4 mb-4  mt-4  ">
          <CustomInput
            fields={fields}
            formData={formData}
            setFormData={setFormData}
          />
        </Box>
        <Button
          className=" hover:bg-[#ffc400]"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#ffc400",
          }}
          variant="contained"
          onClick={filterHandler}
        >
          Go
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Vessel Name</StyledTableCell>
              <StyledTableCell>Voyage No</StyledTableCell>
              <StyledTableCell>Route</StyledTableCell>
              <StyledTableCell>ETA</StyledTableCell>
              <StyledTableCell>ETD</StyledTableCell>
              <StyledTableCell>PortCutoff</StyledTableCell>
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
                    <TableCell  component="th" scope="row">{row.vesselName}</TableCell>
                    <TableCell>{row?.voyageNo}</TableCell>
                    <TableCell>{row?.route}</TableCell>
                    <TableCell> {row?.eta}</TableCell>
                    <TableCell> {row?.etd}</TableCell>
                    <TableCell> {row?.PortCutoff}</TableCell>
                    {/* <TableCell className="absolute right-[5px] top-[-4px] cursor-pointer z-10 w-[20px] invisible group-hover:visible border-0 ">
                      <IconButton
                        aria-label="Edit"
                        sx={{ color: "#1976d2" }}
                        className="absolute top-0 right-0 "
                        onClick={() => router.push("/customerPortal/quotation")}
                      >
                        <Tooltip title="Edit">
                          <EditIcon sx={{ width: "20px", color: "#ffc400" }} />
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
