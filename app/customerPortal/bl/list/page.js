"use client";
/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
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
import PrintIcon from "@mui/icons-material/Print";
import { useRouter } from "next/navigation";
import { decryptToken, getShipperListData } from "@/services/fetchData";
import BlReport from "@/app/components/blReport/page";
import { getShipperFormDataById } from "@/services/fetchData";

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
  jobNo,
  blNo,
  blDate,
  shipper,
  consignee,
  plr,
  pol,
  pod,
  fpd
) {
  return { jobNo, blNo, blDate, shipper, consignee, plr, pol, pod, fpd };
}

export default function BlList() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [blData, setBlData] = useState([]);
  const [loadingState, setLoadingState] = useState("Loading...");
  const [auth, setAuth] = useState("");
  const [reportData, setReportData] = useState(null); // State for the report data
  const reportRef = useRef(null); // Initialize ref for report content
  const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    const loadHtml2pdf = async () => {
      const module = await import("html2pdf.js");
      setHtml2pdf(() => module.default);
    };

    loadHtml2pdf();
  }, []);

  // Function to handle the print action
  const handlePrint = async (row) => {
    const requestBody = { blNo: row.blNo };
    // attach Sheet Data
    //const requestBody = { blNo: "ECMCCUSIN240205" };
    // No attach Sheet Data
    //const requestBody = { blNo: "ECMNSAJEA240085" };
    try {
      const response = await getShipperFormDataById(requestBody);
      setReportData(response.data.data); // Set report data to trigger rendering
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (reportData && reportRef.current) {
      const options = {
        margin: 0,
        filename: "BlReport.pdf",
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      // Generate the PDF
      html2pdf()
        .from(reportRef.current)
        .set(options)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          // Get the total number of pages
          // Check if descOfGoodsDetaislAttach is null
          if (
            reportData.descOfGoodsDetaislAttach === null ||
            reportData.descOfGoodsDetaislAttach === ""
          ) {
            // If null or empty, ensure there is only 1 page
            while (pdf.getNumberOfPages() > 1) {
              pdf.deletePage(pdf.getNumberOfPages());
            }
          } else {
            const totalPages = pdf.deletePage(pdf.getNumberOfPages());
            console.log("Total PDF Pages:", totalPages);
          }

          // Open the PDF in a new tab
          const blob = pdf.output("blob");
          const blobUrl = URL.createObjectURL(blob);
          window.open(blobUrl, "_blank");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  }, [reportData]);
  // This effect runs when reportData is set

  useEffect(() => {
    const getEmail = decryptToken();
    async function fetchData() {
      const obj = {
        loginName: getEmail?.email_id,
      };
      setAuth(getEmail?.email_id);
      try {
        const val = await getShipperListData(obj);
        val.message
          ? setLoadingState("No Data Found")
          : setBlData(val.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const rows = blData
    ? blData.map((item) =>
        createData(
          item[`jobNo`],
          item[`blNo`],
          item[`blDate`], // split string into two parts of array and get data of 0 index
          item["shipper"],
          item["consignee"],
          item["plr"],
          item["pol"],
          item["pod"],
          item["fpd"]
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

  const fetchShipmentData = (value) => {
    localStorage.setItem("shipmentId", value);
    localStorage.setItem("isViewShipment", true);
    router.push("/customerPortal/bl");
  };

  const remove = () => {
    localStorage.removeItem("shipmentId");
    localStorage.removeItem("isViewShipment");
  };

  return (
    <Box className="sm:p-3 p-3 ">
      <Box className="flex justify-between">
        <Typography variant="h5" className="text-left flex items-center ">
          B/L List
        </Typography>
        <Button
          variant="contained"
          className="mx-4 my-2 capitalize hover:bg-[#ffc400] "
          sx={{ backgroundColor: "#ffc400" }}
          size="small"
          onClick={() => {
            auth ? router.push("/customerPortal/bl") : router.push("/login");
            remove();
          }}
        >
          Add
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Booking No.</StyledTableCell>
              <StyledTableCell>B/L No.</StyledTableCell>
              <StyledTableCell>B/L Date</StyledTableCell>
              <StyledTableCell>Shipper</StyledTableCell>
              <StyledTableCell>Consignee</StyledTableCell>
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
                      {row.jobNo}
                    </TableCell>
                    <TableCell>{row.blNo}</TableCell>
                    <TableCell>{row.blDate}</TableCell>
                    <TableCell>{row.shipper}</TableCell>
                    <TableCell>{row.consignee}</TableCell>
                    <TableCell>{row.plr}</TableCell>
                    <TableCell>{row.pol}</TableCell>
                    <TableCell>{row.pod}</TableCell>
                    <TableCell>{row.fpd}</TableCell>
                    <TableCell className="absolute right-[5px] top-[-4px] cursor-pointer z-10 w-fit !p-0 border-b-0 !min-w-fit invisible group-hover:visible !border-0 ">
                      <IconButton
                        sx={{ color: "#1976d2" }}
                        className="top-0  right-0 "
                      >
                        <Tooltip title="View">
                          <VisibilityIcon
                            sx={{
                              width: "20px",
                              color: "#ffc400",
                            }}
                            onClick={() => fetchShipmentData(row.blNo)}
                          />
                        </Tooltip>
                        <Tooltip title="Print">
                          <PrintIcon
                            sx={{
                              width: "20px",
                              color: "#ffc400",
                              marginLeft: "10px",
                            }}
                            onClick={() => handlePrint(row)} // Pass row data to handlePrint
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
      {/* Hidden report content */}
      <div style={{ display: "none" }}>
        <div ref={reportRef}>
          {reportData && <BlReport reportData={reportData} />}{" "}
          {/* Render report conditionally */}
        </div>
      </div>
    </Box>
  );
}
