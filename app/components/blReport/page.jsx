"use client";
/* eslint-disable */
import React from "react";
import { toWords } from "number-to-words";
import "./reportStyles.css";
function BlReport({ reportData }) {
  if (!reportData) return <p>No report data available</p>;

  const shouldRenderSecondPage =
    reportData.descOfGoodsDetaislAttach &&
    reportData.descOfGoodsDetaislAttach.trim() !== "" &&
    reportData.descOfGoodsDetaislAttach !== "undefined" &&
    reportData.descOfGoodsDetaislAttach !== null;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
  }

  const numberInWords = reportData?.numberOfOriginal
    ? toWords(reportData.numberOfOriginal)
    : "";

  const formattedDateOfIssue = reportData?.dateOfIssue
    ? formatDate(reportData.dateOfIssue)
    : "";

  return (
    <div>
      <div
        className="mx-auto p-2"
        style={{
          width: "210mm",
          height: "297mm",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          className="mx-auto"
        >
          <div className="text-center" style={{ flex: 11 }}>
            <h2 className="text-black text-lg pb-2 font-semibold text-center">
              MULTI MODAL TRANSPORT DOCUMENT
            </h2>
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="text-black text-md pb-2 font-semibold text-center uppercase">
              Draft
            </h2>
          </div>
        </div>

        {/* New Division Section */}
        <div
          className="h-auto"
          style={{
            display: "flex",
            border: "1px solid black",
          }}
        >
          {/* Left Section */}
          <div
            style={{
              flex: 1,
              borderRight: "1px solid black",
            }}
          >
            <div className="min-height-custom">
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  marginTop: "5px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                Consignor
              </p>
              <p
                className="text-black font-normal"
                style={{
                  fontSize: "8px",
                  marginTop: "5px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  paddingBottom: "5px",
                  width: "50%",
                }}
              >
                {reportData.shipperName} <br />
                {reportData.shipperAddress}
              </p>
            </div>

            <hr
              style={{
                border: "none",
                borderTop: "1px solid black",
                height: "1px",
                margin: "8px 0px 0px 0px",
              }}
            />
            <div className="min-height-custom">
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  marginTop: "5px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                Consignee (or Order)
              </p>
              <p
                className="text-black font-normal"
                style={{
                  fontSize: "8px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  marginTop: "5px",
                  paddingBottom: "5px",
                  width: "50%",
                }}
              >
                {reportData.consigneeName} <br />
                {reportData.consigneeAddress}
              </p>
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid black",
                height: "1px",
                margin: "8px 0 8px 0",
              }}
            />
            <div className="min-height-custom">
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  marginTop: "5px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                Notify Address
              </p>
              <p
                className="text-black font-normal"
                style={{
                  fontSize: "8px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                  marginTop: "5px",
                  paddingBottom: "5px",
                  width: "50%",
                }}
              >
                {reportData.notifyName} <br />
                {reportData.notifyAddress}
              </p>
            </div>
          </div>
          {/* Right Section */}
          <div
            style={{
              flex: 1,
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontSize: "9px",
                paddingRight: "10px",
                paddingLeft: "10px",
                width: "100%",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>MTD Number</span>:{" "}
              <span style={{ fontWeight: "bold", paddingRight: "30px" }}>
                {reportData.blNo}
              </span>
            </p>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid black",
                height: "1px",
                margin: "8px 0 8px 0",
              }}
            />
            <p
              className="text-black font-normal"
              style={{
                fontSize: "9px",
                paddingRight: "10px",
                paddingLeft: "10px",
                width: "100%",
              }}
            >
              <span style={{ fontWeight: "bold" }}>SHIPMENT REFERENCE NO.</span>
              :{" "}
              <span style={{ fontWeight: "bold", paddingRight: "30px" }}></span>
            </p>
            {/* Logo with controlled size */}
            <img
              src="/assets/images/ECMRpt.png"
              alt="logo"
              className="mx-auto mb-4 w-2/3 mt-2"
              style={{ maxHeight: "100px", width: "auto" }}
            />
            <p
              className="text-black font-normal text-center"
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                paddingRight: "10px",
                paddingLeft: "10px",
                width: "100%",
              }}
            >
              EXPRESSWAY CARGO MOVERS PVT. LTD
            </p>
            <p
              className="text-black font-normal text-center"
              style={{
                fontSize: "10px",
                paddingRight: "20px",
                paddingLeft: "20px",
                width: "100%",
              }}
            >
              133/1/1A, S.N. Banerjee Road, Kolkata - 700 013, India <br />
              Tel: +91 33 3008-2300 (HUNTING), Fax: +91 33 3008-2319 / 20 <br />
              E-mail: kolkata@expresswayshipping.com <br />
              Web: www.expresswayshipping.com
            </p>
            <p
              className="text-black font-normal text-center"
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                paddingRight: "10px",
                paddingLeft: "10px",
                width: "100%",
                paddingBottom: "2px",
              }}
            >
              Registration No. MTO/DGS/1282/APR/2023
            </p>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid black",
                height: "1px",
                margin: "8px 0 2px 0",
              }}
            />
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
                paddingRight: "8px",
                paddingLeft: "8px",
                width: "100%",
              }}
            >
              Taken in charge in apparently good condition herein at the place
              of receipt for transport and delivery as mentioned above, unless
              otherwise state. The MTO in accordance with the provision
              contained in the MTD undertakes to perform or to procure the
              performance of the multimodal transport from the place at which
              the goods are taken in charge, to the place designated for
              delivery and assumes responsibility for such transport.
            </p>
            <hr
              style={{
                border: "none",
                borderTop: "1px solid black",
                height: "1px",
                margin: "8px 0 2px 0",
              }}
            />
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
                paddingRight: "8px",
                paddingLeft: "8px",
                width: "100%",
              }}
            >
              One of the MTD(s) must be surrendered, duly endorsed in exchange
              for the goods. In witness where of the original MTD all of this
              tenure and date have been signed in the number indicated below one
              of which being accomplished the other(s) to be void.
            </p>
          </div>
        </div>

        {/* New Division Section */}
        <div
          className="h-auto"
          style={{
            display: "flex",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          {/* Left Section */}
          <div
            style={{
              flex: 1,
              borderRight: "1px solid black",
            }}
          >
            <div
              className="h-auto"
              style={{
                display: "flex",
              }}
            >
              {/* Left Section */}
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid black",
                }}
              >
                <div className="min-height-grid2">
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    Place of Acceptance
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      paddingBottom: "5px",
                    }}
                  >
                    {reportData.placeOfReceipt?.Name}
                  </p>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid black",
                    height: "1px",
                    margin: "5px 0px 0px 0px",
                  }}
                />
                <div className="min-height-grid2">
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    Date of Acceptance
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    {formattedDateOfIssue}
                  </p>
                </div>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid black",
                    height: "1px",
                    margin: "5px 0 8px 0",
                  }}
                />
                <div className="min-height-grid2">
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    Place of Delivery
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    {reportData.placeOfDelivery?.Name}
                  </p>
                </div>
              </div>
              {/* Right Section */}
              <div
                style={{
                  flex: 1,
                }}
              >
                <div className="min-height-grid2">
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    Port of Loading
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      paddingBottom: "5px",
                    }}
                  >
                    {reportData.portOfLoading?.Name}
                  </p>
                </div>

                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid black",
                    height: "1px",
                    margin: "5px 0px 0px 0px",
                  }}
                />
                <div className="min-height-grid2">
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    Place of Discharge
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    {reportData.portOfDischarge?.Name}
                  </p>
                </div>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid black",
                    height: "1px",
                    margin: "5px 0 8px 0",
                  }}
                />
                <div className="min-height-grid2">
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      marginTop: "5px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    Vessel & Voyage No.
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    {reportData.oceanVessel?.Name} / {reportData.voyageNo?.Name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div
            style={{
              flex: 1,
            }}
          >
            {/* New Division Section */}
            <div
              className="h-auto"
              style={{
                display: "flex",
                height: "100%",
              }}
            >
              {/* First Column */}
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid black",
                  padding: "10px",
                }}
              >
                <p
                  className="text-black font-normal"
                  style={{
                    fontWeight: "bold",
                    fontSize: "9px",
                  }}
                >
                  Date of period of delivery (as expressly agreed upon by the
                  consignor and MTO)
                </p>
                <p
                  className="text-black font-normal"
                  style={{
                    fontSize: "8px",
                  }}
                >
                  {/* Insert Date Here */}
                </p>
              </div>

              {/* Second Column */}
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid black",
                  padding: "10px",
                }}
              >
                <p
                  className="text-black font-normal"
                  style={{
                    fontWeight: "bold",
                    fontSize: "9px",
                  }}
                >
                  Modes Means of Transport
                </p>
                <p
                  className="text-black font-normal"
                  style={{
                    fontSize: "8px",
                    marginTop: "35px",
                  }}
                >
                  {reportData?.modeOfTransport}
                </p>
              </div>

              {/* Third Column */}
              <div
                style={{
                  flex: 1,
                  padding: "10px",
                }}
              >
                <p
                  className="text-black font-normal"
                  style={{
                    fontWeight: "bold",
                    fontSize: "9px",
                  }}
                >
                  Route/Place of Transshipment (if any)
                </p>
                <p
                  className="text-black font-normal"
                  style={{
                    fontSize: "8px",
                    marginTop: "35px",
                  }}
                >
                  {/* Insert Route Here */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Five-Section Division */}
        {/* First row with content */}
        <div
          className="h-auto"
          style={{
            display: "flex",
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          {/* Section 1: Container No(s) */}
          <div
            style={{
              flexBasis: "14%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontWeight: "bold",
                fontSize: "9px",
              }}
            >
              Container No(s)
            </p>
          </div>

          {/* Section 2: Marks and No(s) */}
          <div
            style={{
              flexBasis: "14%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontWeight: "bold",
                fontSize: "9px",
              }}
            >
              Marks and No. (s)
            </p>
          </div>

          {/* Section 3: No. of Pkgs., Kinds of Pkgs., General Description of Goods */}
          <div
            style={{
              flexBasis: "44%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontWeight: "bold",
                fontSize: "9px",
              }}
            >
              No. of Pkgs., Kinds of Pkgs., General Description of Goods
            </p>
          </div>

          {/* Section 4: Gross Weight */}
          <div
            style={{
              flexBasis: "12%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontWeight: "bold",
                fontSize: "9px",
              }}
            >
              Gross Weight
            </p>
          </div>

          {/* Section 5: Measurement */}
          <div
            style={{
              flexBasis: "12%",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontWeight: "bold",
                fontSize: "9px",
              }}
            >
              Measurement
            </p>
          </div>
        </div>
        {/* Second row with content */}
        <div
          className="min-height-table"
          style={{
            display: "flex",
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          {/* Section 1: Container No(s) Content */}
          <div
            style={{
              flexBasis: "14%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
              }}
            >
              {reportData?.containerDetail}
            </p>
          </div>

          {/* Section 2: Marks and No(s) Content */}
          <div
            style={{
              flexBasis: "14%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
              }}
            >
              {reportData?.marksAndNumbers}
            </p>
          </div>

          {/* Section 3: No. of Pkgs., Kinds of Pkgs., General Description of Goods */}
          <div
            style={{
              flexBasis: "44%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
              }}
            >
              {reportData?.descriptionOfGoods}
            </p>
          </div>

          {/* Section 4: Gross Weight Content */}
          <div
            style={{
              flexBasis: "12%",
              borderRight: "1px solid black",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
              }}
            >
              Gross Weight: {reportData?.grossWeight}{" "}
              {reportData?.grossWeightUnit?.Name}
              <br />
              <br />
              Net Weight: {reportData?.netWeight}{" "}
              {reportData?.netWeightUnit?.Name}
              <br />
              <br />
              {reportData?.shippedOnboardDate}
            </p>
          </div>

          {/* Section 5: Measurement Content */}
          <div
            style={{
              flexBasis: "12%",
              padding: "10px",
            }}
          >
            <p
              className="text-black font-normal"
              style={{
                fontSize: "8px",
              }}
            >
              {reportData?.volume} {reportData?.volumeUnit?.Name}
            </p>
          </div>
        </div>

        {/* New Division Section */}
        <table
          className="w-full"
          style={{
            fontSize: "9px",
            fontWeight: "bold",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
            borderLeft: "1px solid black",
            paddingTop: "-20px !important",
            width: "100%",
            height: "30px",
          }}
        >
          <tr>
            <td
              style={{
                paddingRight: "10px",
                paddingLeft: "10px",
                paddingBottom: "2px",
              }}
              className="text-black"
            >
              Particulars above furnished by Consignee / Consinor
            </td>
          </tr>
        </table>

        {/* New Division Section */}
        <div
          className="min-height-grid3"
          style={{
            display: "flex",
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          {/* Section 1: 60% width */}
          <div
            style={{
              flex: "0 0 60%", // Fixed width of 60%
              borderRight: "1px solid black",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              {/* Section 1: 50% width */}
              <div
                style={{
                  flex: "0 0 50%",
                  paddingBottom: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <p
                  className="text-black font-normal"
                  style={{
                    fontWeight: "bold",
                    fontSize: "9px",
                  }}
                >
                  Other Particulars(if any) Delivery Agent
                </p>
                <p
                  className="text-black font-normal mt-1"
                  style={{
                    fontSize: "8px",
                    width: "70%",
                  }}
                >
                  {reportData?.deliveryAgentName}
                  <br />
                  {reportData?.deliveryAgentAddress}
                </p>
                <p
                  className="text-black font-normal mt-1"
                  style={{
                    fontSize: "8px",
                    marginTop: "25px",
                  }}
                >
                  Weight and Measurement of container not to be included
                </p>
              </div>

              {/* Section 2: 50% width */}
              <div
                style={{
                  flex: "0 0 50%",
                  borderLeft: "1px solid black",
                  borderBottom: "1px solid black",
                }}
              >
                <p
                  className="text-black font-normal"
                  style={{
                    fontWeight: "bold",
                    fontSize: "9px",
                    paddingLeft: "10px",
                  }}
                >
                  Freight Amount
                </p>
                <p
                  className="text-black font-normal"
                  style={{
                    fontSize: "8px",
                    paddingLeft: "10px",
                    paddingTop: "5px",
                    paddingBottom: "10px",
                  }}
                ></p>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid black",
                    height: "1px",
                    margin: "5px 0 8px 0",
                  }}
                />
                <p
                  className="text-black font-normal"
                  style={{
                    fontWeight: "bold",
                    fontSize: "9px",
                    paddingLeft: "10px",
                  }}
                >
                  Freight Payable At by consignor & consignee (to be maintained
                  only if expressively Agreed by both consignor / conginee.)
                </p>
                <p
                  className="text-black font-normal"
                  style={{
                    fontSize: "8px",
                    paddingLeft: "10px",
                    paddingTop: "5px",
                    paddingBottom: "10px",
                  }}
                >
                  {reportData?.freightPayableAt}
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: 40% width */}
          <div
            style={{
              flex: "0 0 40%",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                }}
              >
                {/* Section 1: 50% width */}
                <div
                  style={{
                    flex: "0 0 50%",
                    paddingBottom: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderBottom: "1px solid black",
                  }}
                >
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                    }}
                  >
                    Number of Original MTD
                  </p>
                  <p
                    className="text-black font-normal mt-1"
                    style={{
                      fontSize: "8px",
                      width: "70%",
                    }}
                  >
                    {reportData?.numberOfOriginal}
                    {"   "}
                    {numberInWords.toUpperCase()}
                  </p>
                </div>

                {/* Section 2: 50% width */}
                <div
                  style={{
                    flex: "0 0 50%",
                    borderLeft: "1px solid black",
                    borderBottom: "1px solid black",
                  }}
                >
                  <p
                    className="text-black font-normal"
                    style={{
                      fontWeight: "bold",
                      fontSize: "9px",
                      paddingLeft: "10px",
                    }}
                  >
                    Place and Date of Issue
                  </p>
                  <p
                    className="text-black font-normal"
                    style={{
                      fontSize: "8px",
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      paddingBottom: "15px",
                    }}
                  >
                    {reportData?.placeofIssue} - {formattedDateOfIssue}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p
                className="text-black font-normal mt-2"
                style={{
                  fontSize: "11px",
                  paddingLeft: "10px",
                }}
              >
                For{" "}
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  EXPRESSWAY CARGO MOVERS PVT LTD{" "}
                </span>
              </p>
              <p
                className="text-black font-normal mt-2 text-center"
                style={{
                  fontSize: "11px",
                  paddingLeft: "10px",
                  marginTop: "50px",
                }}
              >
                (Authorised Signatory)
              </p>
            </div>
          </div>
        </div>
      </div>
      {shouldRenderSecondPage && (
        <div
          id="second-page"
          className="mx-auto p-2"
          style={{ width: "210mm", height: "297mm" }}
        >
          <h2 className="text-black text-lg pb-2 font-semibold text-center">
            ATTACHED SHEET
          </h2>
          {/* B/L No Section */}
          <div
            className="flex"
            style={{ border: "1px solid black", height: "30px" }}
          >
            <div
              style={{
                flex: "0 0 50%",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  paddingLeft: "10px",
                }}
              >
                B/L No : {reportData?.blNo}
              </p>
            </div>
            <div
              style={{
                flex: "0 0 50%",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  paddingLeft: "10px",
                }}
              >
                Vessel Name : {reportData?.oceanVessel?.Name}
                <span className="ms-2">{reportData?.voyageNo?.Name}</span>
              </p>
            </div>
          </div>
          {/* Description of goods */}
          <div
            className="flex"
            style={{
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
              height: "30px",
            }}
          >
            <div
              style={{
                flex: "0 0 40%",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRight: "1px solid black",
              }}
            >
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  paddingLeft: "10px",
                }}
              >
                Marks & Nos.
              </p>
            </div>
            <div
              style={{
                flex: "0 0 40%",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  paddingLeft: "10px",
                }}
              >
                Description of goods
              </p>
            </div>
          </div>
          {/* Description of goods Data*/}
          <div
            className="flex min-height-attachment"
            style={{
              borderLeft: "1px solid black",
              borderRight: "1px solid black",
              borderBottom: "1px solid black",
            }}
          >
            <div
              style={{
                flex: "0 0 40%",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRight: "1px solid black",
              }}
            >
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  paddingLeft: "10px",
                }}
              ></p>
            </div>
            <div
              style={{
                flex: "0 0 40%",
                paddingBottom: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <p
                className="text-black font-normal"
                style={{
                  fontWeight: "bold",
                  fontSize: "9px",
                  paddingLeft: "10px",
                }}
              >
                {reportData?.descOfGoodsDetaislAttach}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlReport;
