"use client";

import React, { useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { inputLabelProps, textFieldStyles } from "@/globalCss";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { fetchDropDownValues } from "@/services/fetchData";

const CustomInput = ({
  fields,
  formData,
  setFormData,
  containerIndex = null,
  handleBlurEventFunctions = null,
  handleChangeEventFunctions = null,
  disabled,
}) => {
  const [dropdowns, setDropdowns] = useState([]);

  const changeHandler = (e, containerIndex) => {
    const { name, value } = e.target;
    if (containerIndex === null) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setFormData((prevData) => {
        const updatedContainers = [...prevData.containerDetails];
        updatedContainers[containerIndex] = {
          ...updatedContainers[containerIndex],
          [name]: value,
        };
        return {
          ...prevData,
          containerDetails: updatedContainers,
        };
      });
    }
  };

  const getData = async (type, name) => {
    const data = { masterName: type };
    const keyNames = Object.keys(dropdowns);
    if (!keyNames.includes(name)) {
      const res = await fetchDropDownValues(data);
      const isData = Array.isArray(res) ? res : [];
      setDropdowns((prev) => ({ ...prev, [name]: isData }));
    } else {
      setDropdowns(dropdowns);
    }
  };

  const auto = {
    disabled: disabled ? true : false,
  };

  return fields?.map((field, index) => {
    const fieldValue =
      containerIndex === null
        ? formData[field.name] || ""
        : formData?.containerDetails[containerIndex]?.[field.name] || "";

    const commonProps = {
      key: index,
      label: field.label,
      name: field.name,
      className: `text-black-500 font-normal text-xs ${field.style} `,
      onChange: (e) => changeHandler(e, containerIndex),
      sx: {
        ...textFieldStyles(),
        gridColumn: field.gridColumn,
      },
      InputLabelProps: inputLabelProps,
    };

    switch (field.type) {
      case "textarea":
        return (
          <Box
            className={`relative ${field.gridColumn} `}
            key={commonProps.key}
          >
            <textarea
              {...commonProps}
              value={fieldValue ? fieldValue : ""}
              className={`peer py-2 px-3 border border-solid border-[#0000003b] rounded-[4px] placeholder-[#000000a6] w-full hover:border-black focus:outline-[#1976d2] ${commonProps.className}`}
              rows={field.rows}
              key={commonProps.key}
              disabled={disabled}
            />
            <p
              className={`absolute top-0 transition-all duration-150 ease-in-out text-[#00000099] font-medium text-xs my-1 mx-3 peer-focus:text-[#1976d2] peer-focus:top-[-12px] peer-focus:px-1 peer-focus:bg-white peer-focus:text-[9px] ${
                fieldValue ? " px-1 top-[-12px] bg-white text-[9px]" : ""
              } `}
            >
              {commonProps.label}
            </p>
          </Box>
        );

      case "number":
        return (
          <TextField
            {...commonProps}
            value={fieldValue ? fieldValue : ""}
            type="number"
            variant="outlined"
            key={commonProps.key}
            disabled={disabled}
          />
        );

      case "dropdown":
        return (
          <Autocomplete
            key={commonProps.key}
            className={commonProps.className}
            value={fieldValue ? fieldValue : null}
            sx={commonProps.sx}
            disabled={disabled === true ? true : false}
            options={
              dropdowns[field?.name]
                ? dropdowns[field?.name]
                : [{ Name: "Loading..." }]
            }
            getOptionLabel={(option) => option?.Name || ""}
            renderInput={(params) => (
              <TextField {...params} label={field.label} />
            )}
            onFocus={() => getData(field?.labelType, commonProps.name)}
            onChange={(event, value) => {
              changeHandler(
                { target: { name: commonProps.name, value } },
                containerIndex
              );
              field.changeFun
                ? handleChangeEventFunctions[field.changeFun](
                    commonProps.name,
                    value
                  )
                : null;
            }}
          />
        );

      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...commonProps}
              className="datepicker"
              value={fieldValue ? dayjs(fieldValue) : null}
              onChange={(date) => {
                const formattedDate = date?.isValid()
                  ? date.format("DD/MM/YYYY")
                  : null;
                changeHandler(
                  { target: { name: commonProps.name, value: formattedDate } },
                  containerIndex
                );
              }}
              slotProps={{ field: { clearable: true } }}
              key={commonProps.key}
              disabled={disabled}
            />
          </LocalizationProvider>
        );

      default:
        return (
          <TextField
            {...commonProps}
            value={fieldValue ? fieldValue : ""}
            variant="outlined"
            onBlur={(event) =>
              field.blurFun
                ? handleBlurEventFunctions[field.blurFun](event)
                : null
            }
            key={commonProps.key}
            disabled={disabled}
          />
        );
    }
  });
};

export default CustomInput;
