const fieldData = {

    userDetails: [
      {
        label: "Company Name",
        name: "companyName",
        type: "email",
      },
      {
        label: "Name",
        name: "userName",
        type: "text",
      },
      {
        label: "Email",
        name: "userEmail",
        type: "text",
      },
    ],
  
    fields: [
      {
        label: "Place Of Receipt",
        name: "plr",
        type: "dropdown",
        labelType: "PORT",
      },
      {
        label: "Port Of Loading",
        name: "pol",
        type: "dropdown",
        labelType: "PORT",
      },
      {
        label: "Port Of Discharge",
        name: "pod",
        type: "dropdown",
        labelType: "PORT",
      },
      {
        label: "Place Of Delivery",
        name: "fpd",
        type: "dropdown",
        labelType: "PORT",
      },
    ],
  
    receiptFields: [
      {
        label: "Cargo Type",
        name: "cargoType",
        type: "dropdown",
        labelType: "CargoType",
      },
      {
        label: "Container Status",
        name: "containerStatus",
        type: "dropdown",
        labelType: "containerStatus",
      },
      {
        label: "Commodity",
        name: "commodity",
        type: "dropdown",
        labelType: "Commodity",
      },
    ],
  
    transportFields: [
      { label: "Gross Weight", name: "grossWeight", type: "number" },
      {
        label: "Gross Unit",
        name: "grossWtUnit",
        type: "dropdown",
        labelType: "grossWtUnit",
      },
      { label: "Export Sailing Date", name: "exportSailingDate", type: "date" },
    ],
  
    containerFields: [
      {
        label: "Size",
        name: "size",
        type: "dropdown",
        labelType: "SIZE",
      },
      {
        label: "Type",
        name: "type",
        gridColumn: "span 2",
        style: "w-full",
        type: "dropdown",
        labelType: "TYPE",
      },
      { label: "Quantity", name: "quotationQuantity", type: "number" },
    ],
  };
  
  export default fieldData;
  