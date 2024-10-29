const fieldData = {
  fields: [
    { label: "Booking No.", name: "jobNo" },
    { label: "Booking Date", name: "jobDate", type: "date" },
    {
      label: "Customer Name",
      name: "customer",
      type: "dropdown",
      labelType: "PORT",
    },
  ],

  consignorFields: [
    { label: "Shipper Name", name: "shipper", style: "mb-2" },
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
      name: "consignee",
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
    { label: "Notify Name", name: "notifyParty", style: "mb-2" },
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
    { label: "Notify2 Name", name: "notifyParty2", style: "mb-2" },
    {
      label: "Notify2 Address",
      name: "notifyToAddress",
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

  cargoFields: [
    {
      label: "Remarks",
      name: "remarks",
      style: "sm:w-[min(100%,2fr)]",
      multiline: true,
      rows: 5,
      type: "textarea",
      gridColumn: "col-span-2 row-span-2 ",
    },
    {
      label: "Cargo Type",
      name: "cargoType",
      type: "dropdown",
      labelType: "CargoType",
      changeFun:"cargoType"
    },
    {
      label: "Event No.",
      name: "eventNo",
      style:'hidden'
    },
    {
      label: "Class",
      name: "class",
      style:'hidden'
    },
    {
      label: "Commodity",
      name: "commodity",
    },
    { label: "HSN Code", name: "HSNCode", type: "number" },
    {
      label: "Container Status",
      name: "containerStatus",
      type: "dropdown",
      labelType: "containerStatus",
    },
  ],

  goodsFields: [
    {
      label: "Est. Date Of Shipment",
      name: "estDateOfShipment",
      type: "date",
    },
    { label: "No Of Pkgs", name: "noOfPackages", type: "number" },
    {
      label: "Type Of Pkgs",
      name: "typeOfPackages",
      type: "dropdown",
      labelType: "TypeofPkgs",
    },
    { label: "Gross Weight", name: "grossWeight", type: "number" },
    {
      label: "Gross Unit",
      name: "grossWeightUnit",
      type: "dropdown",
      labelType: "grossWtUnit",
    },
    { label: "Net Weight", name: "netWeight", type: "number" },
    {
      label: "Net Unit",
      name: "netWeightUnit",
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
    {
      label: "FreightTerms",
      name: "freightTerms",
      type: "dropdown",
      labelType: "Freightterms",
    },
    {
      label: "Trade Terms",
      name: "tradeTerms",
      type: "dropdown",
      labelType: "Tradeterms",
    },
  ],

  containerFields: [
    { label: "Size", name: "size", type: "dropdown", labelType: "SIZE" },
    {
      label: "Type",
      name: "type",
      gridColumn: "span 2",
      style: "w-full",
      type: "dropdown",
      labelType: "TYPE",
    },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Gross Weight", name: "grossWeight", type: "number" },
    {
      label: "Gross Unit",
      name: "grossWeightUnit",
      type: "dropdown",
      labelType: "grossWtUnit",
    },
  ],
};

export default fieldData;
