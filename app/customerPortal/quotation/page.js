"use client";
import { useState } from "react";
import {
  ThemeProvider,
  Box,
  Button,
  IconButton,
  CssBaseline,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import data from "./quotationData";
import CustomInput from "@/app/components/customInput/customInput";
import { theme } from "@/globalCss";
import {
  decryptToken,
  getQuotationFormData,
  sendEmailForQuotation,
  submitQuotationFormData,
} from "@/services/fetchData";
import { ToastContainer, toast } from "react-toastify";
import { formatSubmitForm } from "@/utils/formatFormData";

export default function Quotation() {
  const [addContainer, setAddContainer] = useState([1]);
  const [formData, setFormData] = useState({
    containerDetails: [],
  });
  const [loading, setLoading] = useState(false);

  const addContainerHandler = () => {
    setAddContainer([...addContainer, addContainer.length + 1]);
    setFormData((prevData) => ({
      ...prevData,
      containerDetails: [...prevData.containerDetails, {}],
    }));
  };

  const sendEmail = async () => {
    const { email_id, companyName, userName } = decryptToken();
    const date = new Date();
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replace(",", "");
    const data = {
      to: email_id,
      userName: userName,
      companyName: companyName,
      enquiryNo: "",
      enquiryDate: formattedDate,
      plr: formData?.plr?.Name,
      pol: formData?.pol?.Name,
      pod: formData?.pod?.Name,
      fpd: formData?.fpd?.Name,
      cargoType: formData?.cargoType?.Name,
      containerStatus: formData?.containerStatus?.Name,
      commodity: formData?.commodity?.Name,
      exportSailingDate: formData?.exportSailingDate,
      grossWeight: formData?.grossWeight,
      containerDetails: formData?.containerDetails,
      Freightterms: formData?.FreightTerms?.Name,
      Remarks: formData?.remarks,
      Tradeterms: formData?.Tradeterms?.Name,
    };
    try {
      setLoading(true);
      const res = await sendEmailForQuotation(data);
      if (res.status === 200) {
        toast.success(res?.data.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteContainerHandler = (indexToDelete) => {
    setAddContainer(addContainer.filter((_, index) => index !== indexToDelete));
    setFormData((prevData) => ({
      ...prevData,
      containerDetails: prevData.containerDetails.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  const submitForm = async () => {
    const { email_id, companyName, userName } = decryptToken();

    const {table1, table2} = formatSubmitForm(formData);
    const table = { userEmail: email_id, companyName, userName, ...table1 };

    const obj = {
      table1: table,
      table2: table2,
    };

    const result = await submitQuotationFormData(obj);

    if (result.status === 200) {
      toast.success(result?.data.message);

      setFormData({
        containerDetails: [],
      });
      setAddContainer([1]);
    } else {
      toast.error(result?.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    sendEmail();
    submitForm();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <form onSubmit={submitHandler}>
        <section className="py-2 px-4">
          <Box className="flex justify-between items-end mb-2">
            <h1 className="text-left text-xl font-semibold uppercase flex items-end m-0 ">
              Quotation
            </h1>
            <Button
              className=" hover:bg-[#ffc400]"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#ffc400",
              }}
              variant="contained"
              type="submit"
            >
              {loading ? `Sending Email...` : `Submit`}
            </Button>
          </Box>
          <Box className="border border-solid border-black rounded-[4px] ">
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col border-b border-b-solid border-b-black p-2 ">
              <CustomInput
                fields={data.fields}
                formData={formData}
                setFormData={setFormData}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={data.receiptFields}
                formData={formData}
                setFormData={setFormData}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={data.transportFields}
                formData={formData}
                setFormData={setFormData}
              />
            </Box>
            <Box className=" w-full flex gap-4 ">
              <Box className="md:overflow-y-auto h-[200px] md:w-2/5 w-full overflow-auto p-2 ">
                {addContainer.map((containerItem, index) => (
                  <Box
                    key={containerItem}
                    className="grid grid-cols-4 gap-1 mb-2 pr-[20px]  md:w-fit w-[800px] relative group "
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteContainerHandler(index)}
                      className="absolute right-[0px] top-[-4px] cursor-pointer z-10 w-[20px] invisible group-hover:visible "
                      sx={{ color: "red" }}
                    >
                      <Tooltip title="Delete Row">
                        <DeleteIcon sx={{ width: "20px" }} />
                      </Tooltip>
                    </IconButton>
                    <CustomInput
                      fields={data.containerFields}
                      formData={formData}
                      setFormData={setFormData}
                      containerIndex={index}
                    />
                  </Box>
                ))}
              </Box>
              <Box className="relative h-full p-2 ">
                <Button
                  sx={{
                    padding: "2px 6px",
                    fontSize: "0.75rem",
                    textTransform: "capitalize ",
                    backgroundColor: "#ffc400",
                  }}
                  variant="contained"
                  onClick={addContainerHandler}
                  className=" hover:bg-[#ffc400]"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className="w-full flex  mt-2 ">
            <Button
              className=" hover:bg-[#ffc400]"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#ffc400",
              }}
              variant="contained"
              type="submit"
            >
              {loading ? `Sending Email` : `Submit`}
            </Button>
          </Box>
        </section>
      </form>
      <ToastContainer />
    </ThemeProvider>
  );
}
