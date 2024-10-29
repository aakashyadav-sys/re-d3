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
import data from "./bookingData";
import CustomInput from "@/app/components/customInput/customInput";
import { theme } from "@/globalCss";
import { useRouter } from "next/navigation";
import {
  getBookingFormDataById,
  submitBookingFormData,
} from "@/services/fetchData";
import { toast, ToastContainer } from "react-toastify";
import { formatSubmitForm } from "@/utils/formatFormData";

export default function Booking() {
  const [addContainer, setAddContainer] = useState([1]);
  const [formData, setFormData] = useState({
    containerDetails: [],
  });
  const router = useRouter();

  const [isView, setIsView] = useState(false);

  const [jsonData, setJsonData] = useState(data);

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

  const submitForm = async () => {
    const result = formatSubmitForm(formData);
    const { status, data, error } = await submitBookingFormData(result);
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
    submitForm();
  };

  const handleChangeEventFunctions = {
    cargoType: (name,value) => {
      if(value?.Name === "HAZARDOUS"){
        setJsonData((prevData) => ({
          ...prevData,
          cargoFields: prevData.cargoFields.map((field, index) => {
            if (index === 2 || index === 3) {
              return { ...field, style: "flex" };
            }
            return field;
          }),
        }));
    }else{
      setJsonData((prevData) => ({
        ...prevData,
        cargoFields: prevData.cargoFields.map((field, index) => {
          if (index === 2 || index === 3) {
            return { ...field, style: "hidden" };
          }
          return field;
        }),
      }));
    }
  }
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("isViewBooking"));
    const itemsID = localStorage.getItem("bookingId");
    async function fetchData() {
      const obj = {
        generatedMemoNo: itemsID,
      };
      const { data } = await getBookingFormDataById(obj);
      if (data === undefined) {
        toast.error("Invalid Booking Id");
        setAddContainer([1]);
        setFormData({ containerDetails: [] });
      } else {
        const newContainerArray = data?.data?.containerDetails?.map(
          (_, index) => index + 1
        );
        setAddContainer(newContainerArray);
        setFormData(data?.data);
        handleChangeEventFunctions.cargoType("",data?.data['cargoType']);
      }
    }

    if (items) {
      setIsView(items);
      fetchData();
    }else{
      handleChangeEventFunctions.cargoType("",null);
    }
  }, [isView]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <form onSubmit={submitHandler}>
        <section className="py-2 px-4">
          <Box className="flex justify-between items-end mb-2">
            <h1 className="text-left text-xl font-semibold uppercase flex items-end m-0 ">
              Booking
            </h1>
            <Box>
              <Button
                variant="contained"
                className="mx-4 my-2 capitalize hover:bg-[#ffc400] "
                onClick={() => router.push("/customerPortal/booking/list")}
                sx={{ backgroundColor: "#ffc400" }}
              >
                Back
              </Button>
              {isView ? (
                <></>
              ) : (
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
              )}
            </Box>
          </Box>
          <Box className="border border-solid border-black rounded-[4px] ">
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col border-b border-b-solid border-b-black p-2 ">
              <CustomInput
                fields={jsonData.fields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <Box className="flex flex-col">
                <CustomInput
                  fields={jsonData.consignorFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
              <Box className="flex flex-col">
                <CustomInput
                  fields={jsonData.consigneeFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
              <Box className="flex flex-col">
                <CustomInput
                  fields={jsonData.notifyFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
              <Box className="flex flex-col">
                <CustomInput
                  fields={jsonData.deliveryAgentFields}
                  formData={formData}
                  setFormData={setFormData}
                  disabled={isView}
                />
              </Box>
            </Box>
            <Box className="sm:grid sm:grid-cols-4 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={jsonData.receiptFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className="sm:grid sm:grid-cols-5 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={jsonData.cargoFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
                handleChangeEventFunctions={handleChangeEventFunctions}
              />
            </Box>
            <Box className="md:grid md:grid-cols-6 gap-2 flex flex-col p-2 border-b border-b-solid border-b-black ">
              <CustomInput
                fields={jsonData.goodsFields}
                formData={formData}
                setFormData={setFormData}
                disabled={isView}
              />
            </Box>
            <Box className="w-full flex gap-4 ">
              <Box className=" md:overflow-y-auto h-[90px] md:w-3/5  overflow-auto p-2 ">
                {addContainer?.map((containerItem, index) => (
                  <Box
                    key={containerItem}
                    className="grid grid-cols-6 gap-1 mb-2 pr-[20px]  md:w-full w-[500px] relative group "
                  >
                    {isView ? (
                      <></>
                    ) : (
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
                    )}
                    <CustomInput
                      fields={jsonData.containerFields}
                      formData={formData}
                      setFormData={setFormData}
                      containerIndex={index}
                      disabled={isView}
                    />
                  </Box>
                ))}
              </Box>
              <Box className="relative h-full p-2 ">
                {isView ? (
                  <></>
                ) : (
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
                )}
              </Box>
            </Box>
          </Box>
          <Box className="w-full flex  mt-2 ">
            {isView ? (
              <></>
            ) : (
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
            )}
          </Box>
        </section>
      </form>
      <ToastContainer />
    </ThemeProvider>
  );
}
