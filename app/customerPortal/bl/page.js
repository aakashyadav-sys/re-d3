"use client";
import { useEffect, useState } from "react";
import {
  ThemeProvider,
  Box,
  Button,
  IconButton,
  CssBaseline,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import data from "./BLdata";
import CustomInput from "@/app/components/customInput/customInput";
import { theme } from "@/globalCss";
import {
  getShipperFormDataById,
  submitShipperFormData,
} from "@/services/fetchData";
import { toast, ToastContainer } from "react-toastify";
import { formatSubmitForm } from "@/utils/formatFormData";

export default function Home() {
  const [addContainer, setAddContainer] = useState([1]);
  const [formData, setFormData] = useState({
    containerDetails: [],
  });

  const [isView, setIsView] = useState(false);

  const addContainerHandler = () => {
    setAddContainer([...addContainer, addContainer.length + 1]);
    setFormData((prevData) => ({
      ...prevData,
      containerDetails: [...prevData.containerDetails, {}],
    }));
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

  const formSubmit = async () => {
    const result = formatSubmitForm(formData);
    const { status, data, error } = await submitShipperFormData(result);
    if (status === 200) {
      toast.success(data?.message);
      setFormData({
        containerDetails: [],
      });
      setAddContainer([1]);
    } else {
      toast.error(error);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    formSubmit();
  };

  const handleBlurEventFunctions = {
    shipment: async (event) => {
      const { value } = event.target;

      const obj = {
        blNo: value,
      };
      
      const { data } = await getShipperFormDataById(obj);

      if (data === undefined) {
        toast.error("Invalid Shipment Id");
        // setAddContainer([1]);
        // setFormData({ containerDetails: [] });
      } else {
        const newContainerArray = data?.data?.containerDetails?.map(
          (_, index) => index + 1
        );
        setAddContainer(newContainerArray);
        setFormData(data?.data);
      }
    },
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("isViewShipment"));
    const itemsID = localStorage.getItem("shipmentId");
    async function fetchData() {
      const obj = {
        blNo: itemsID,
      };
      const { data } = await getShipperFormDataById(obj);

      if (data === undefined) {
        // toast.error("Invalid Shipment Id");
        setAddContainer([1]);
        setFormData({ containerDetails: [] });
      } else {
        const newContainerArray = data?.data?.containerDetails?.map(
          (_, index) => index + 1
        );
        setAddContainer(newContainerArray);
        setFormData(data?.data);
      }
    }

    if (items) {
      setIsView(items);
      fetchData();
    }
  }, [isView]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <form onSubmit={submitHandler}>
        <section className="py-2 px-4">
          <Box className="flex justify-between items-end mb-2">
            <h1 className="text-left text-xl font-semibold uppercase flex items-end m-0 ">
              Bill Of Lading For Ocean Transport
            </h1>
            {isView ? (
              <></>
            ) : (
              <>
                <Button
                  className=" hover:bg-[#ffc400]"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#ffc400",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
          <Box className="border border-solid border-black rounded-[4px] ">
            <Box className="grid grid-cols-4 gap-2  border-b border-b-solid border-b-black p-2 ">
              <CustomInput
                fields={data.fields}
                formData={formData}
                setFormData={setFormData}
                handleBlurEventFunctions={handleBlurEventFunctions}
                disabled={isView}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <Box className="flex flex-col">
                <CustomInput
                  fields={data.consignorFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
              <Box className="flex flex-col">
                <CustomInput
                  fields={data.consigneeFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
              <Box className="flex flex-col">
                <CustomInput
                  fields={data.notifyFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
              <Box className="flex flex-col">
                <CustomInput
                  fields={data.deliveryAgentFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={data.receiptFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={data.transportFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className="md:grid md:grid-cols-8 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={data.goodsFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={data.issueFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className=" md:overflow-y-auto h-[140px] overflow-auto p-2 w-full ">
              {addContainer?.map((containerItem, index) => (
                <Box
                  key={containerItem}
                  className="grid grid-cols-8 gap-1 mb-2 pr-[20px]  md:w-full w-[1500px] relative group border-b border-b-solid border-b-black pb-2 "
                  sx={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}
                >
                  {isView ? (
                    <></>
                  ) : (
                    <>
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
                    </>
                  )}
                  <CustomInput
                    fields={data.containerFields}
                    formData={formData}
                    setFormData={setFormData}
                    containerIndex={index}
                    disabled={isView}
                  />
                </Box>
              ))}
              {isView ? (
                <></>
              ) : (
                <>
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
                </>
              )}
            </Box>
          </Box>
          {isView ? (
            <></>
          ) : (
            <>
              <Box className="w-full flex mt-2 ">
                <Button
                  className=" hover:bg-[#ffc400]"
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#ffc400",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </section>
      </form>
      <ToastContainer />
    </ThemeProvider>
  );
}
