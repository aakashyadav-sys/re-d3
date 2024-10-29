const fieldData = {
  fields: [
    {
      label: "Shipment Reference No.",
      name: "bookingReferenceNo",
      type: "text",
    },
    {
      label: "B/L No.",
      name: "blNo",
      style: "col-start-3",
      blurFun: "shipment",
    },
  ],

  consignorFields: [
    {
      label: "Shipper Name",
      name: "shipperName",
      style: "mb-2",
    },
    {
      label: "Shipper Address",
      name: "shipperAddress",
      style: "sm:w-[min(100%,300px)]",
      multiline: true,
      rows: 6,
      type: "textarea",
    },
  ],

  consigneeFields: [
    {
      label: "Consignee Name",
      name: "consigneeName",
      style: "mb-2",
    },
    {
      label: "Consignee Address",
      name: "consigneeAddress",
      style: "sm:w-[min(100%,300px)]",
      multiline: true,
      rows: 6,
      type: "textarea",
    },
  ],

  notifyFields: [
    {
      label: "Notify Name",
      name: "notifyName",
      style: "mb-2",
    },
    {
      label: "Notify Address",
      name: "notifyAddress",
      style: "sm:w-[min(100%,300px)]",
      multiline: true,
      rows: 6,
      type: "textarea",
    },
  ],

  deliveryAgentFields: [
    {
      label: "Notify2 Name",
      name: "notify2Name",
      style: "mb-2",
    },
    {
      label: "Notify2 Address",
      name: "notify2Address",
      style: "sm:w-[min(100%,300px)]",
      multiline: true,
      rows: 6,
      height: "auto",
      type: "textarea",
    },
  ],

  receiptFields: [
    {
      label: "Place Of Receipt",
      name: "placeOfReceipt",
      type: "dropdown",
      labelType: "PORT",
    },
    {
      label: "Port Of Loading",
      name: "portOfLoading",
      type: "dropdown",
      labelType: "PORT",
    },
    {
      label: "Port Of Discharge",
      name: "portOfDischarge",
      type: "dropdown",
      labelType: "PORT",
    },
    {
      label: "Place Of Delivery",
      name: "placeOfDelivery",
      type: "dropdown",
      labelType: "PORT",
    },
  ],

  transportFields: [
    {
      label: "Vessel",
      name: "vessel",
      type: "dropdown",
      labelType: "vessel",
    },
    {
      label: "Voyage No.",
      name: "voyageNo",
      type: "dropdown",
      labelType: "voyageNo",
    },
    { label: "Route/Place Of Transshipment", name: "placeOfTransshipment" },
  ],

  goodsFields: [
    {
      label: "Marks And Numbers",
      name: "marksAndNumbers",
      multiline: true,
      rows: 4,
      gridColumn: "col-span-2 row-span-2 ",
      type: "textarea",
    },
    {
      label: "Description of Goods",
      name: "descriptionOfGoods",
      multiline: true,
      rows: 4,
      gridColumn: "col-span-2 row-span-2 ",
      type: "textarea",
    },
    { label: "No Of Pkgs", name: "noOfPackages", type: "number" },
    {
      label: "Type Of Pkgs",
      name: "typeofPkgs",
      type: "dropdown",
      labelType: "TypeofPkgs",
    },
    {
      label: "Gross Weight",
      name: "grossWeight",
      style: "mb-2",
      type: "number",
    },
    {
      label: "Gross Unit",
      name: "grossWtUnit",
      type: "dropdown",
      labelType: "grossWtUnit",
    },
    { label: "Net Weight", name: "netWeight", style: "mb-2", type: "number" },
    {
      label: "Net Unit",
      name: "netUnit",
      type: "dropdown",
      labelType: "netWtUnit",
    },
    {
      label: "Volume",
      name: "volume",
      style: "mb-2",
      type: "number",
    },
    {
      label: "Volume Unit",
      name: "volumeUnit",
      type: "dropdown",
      labelType: "volumeUnit",
    },
  ],

  issueFields: [
    {
      label: "B/L Clause",
      name: "BLClause",
      multiline: true,
      rows: 4,
      gridColumn: "col-span-2 row-span-2 ",
      type: "textarea",
    },
    {
      label: "Freight Payable At",
      name: "freightPayableAt",
      style: "w-full",
    },
    {
      label: "Number Of Original",
      name: "numberOfOriginal",
      type: "number",
    },
    {
      label: "Place Of Issue",
      name: "placeofIssue",
      style: "w-full",
    },
    {
      label: "Date Of Issue",
      name: "dateOfIssue",
      type: "date",
    },
  ],

  containerFields: [
    { label: "Container No.", name: "containerNo", type: "text" },
    {
      label: "Size",
      name: "size",
      type: "dropdown",
      labelType: "SIZE",
    },
    {
      label: "Type",
      name: "type",
      type: "dropdown",
      labelType: "TYPE",
    },
    { label: "Seal No", name: "sealNo", type: "number" },
    { label: "No Of Pkgs", name: "noOfPackages", type: "number" },
    {
      label: "Type Of Pkgs",
      name: "package",
      type: "dropdown",
      labelType: "TypeofPkgs",
    },
    { label: "Gross Weight", name: "grossWeight", type: "number" },
    {
      label: "Gross Unit",
      name: "grossWtUnit",
      type: "dropdown",
      labelType: "grossWtUnit",
    },
    { label: "Net Weight", name: "netWeight", type: "number" },
    {
      label: "Net Unit",
      name: "netWtUnit",
      type: "dropdown",
      labelType: "netWtUnit",
    },
    { label: "Volume", name: "volume", type: "number" },
    {
      label: "Volume Unit",
      name: "volumeUnit",
      type: "dropdown",
      labelType: "volumeUnit",
    },
    { label: "Temperature", name: "temp", type: "number" },
    {
      label: "Unit",
      name: "tempUnit",
      type: "dropdown",
      labelType: "tempUnit",
    },
  ],
};

export default fieldData;
