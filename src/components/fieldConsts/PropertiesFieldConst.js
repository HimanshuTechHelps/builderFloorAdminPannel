import { TEXT } from "../utils/Const";
import { PROPERTY_TITLE_LIST } from "../utils/tempData";

export const newPropertyConst = [
  {
    name: "state",
    label: "State",
    type: "select",
    isRequired: true,
    options: [{ value: "Haryana", label: "Haryana" }],
    requiredErrorMessage: "Please select a state.",
  },
  {
    name: "city",
    label: "City",
    type: "select",
    isRequired: true,
    options: [{ value: "gurgaon", label: "Gurgaon" }],
    requiredErrorMessage: "Please select a city.",
  },
  {
    name: "sectorNumber",
    label: "Location",
    type: "select",
    isRequired: true,
    options: [
      { value: "DLF1", label: "DLF City Phase 1" },
      { value: "DLF2", label: "DLF City Phase 2" },
      { value: "DLF3", label: "DLF City Phase 3" },
      { value: "DLF4", label: "DLF City Phase 4" },
    ],
    requiredErrorMessage: "Please select a sector number.",
  },
  {
    name: "plotNumber",
    label: "Plot Number",
    type: TEXT,
    isRequired: true,
    requiredErrorMessage: "Please enter a plot number.",
  },
  {
    name: "size",
    label: "Size",
    type: TEXT,
    isRequired: true,
    requiredErrorMessage: "Please enter a size.",
  },
  {
    name: "floor",
    label: "Floor",
    type: "select",
    options: [
      { value: "1st Floor", label: "First Floor" },
      { value: "2nd Floor", label: "Second Floor" },
      { value: "3rd Floor", label: "Third Floor" },
      { value: "4th Floor", label: "Fourth Floor" },
      { value: "Basement + 1st Floor", label: "Basement + First Floor" },
    ],
    isRequired: true,
    requiredErrorMessage: "Please enter a floor.",
  },
  {
    name: "price",
    label: "Price",
    type: "price",
    className: "property-price-class",
    isRequired: true,
    requiredErrorMessage: "Please enter a price.",
  },
  {
    name: "accommodation",
    label: "Accommodation",
    type: "select",
    isRequired: true,
    options: [
      { value: "2BHK", label: "2 BHK" },
      { value: "3BHK", label: "3 BHK" },
      { value: "4BHK", label: "4 BHK" },
      { value: "5BHK", label: "5 BHK" },
      { value: "6BHK", label: "6 BHK" },
    ],
    requiredErrorMessage: "Please select an accommodation.",
  },
  {
    name: "facing",
    label: "Facing",
    type: "select",
    isRequired: true,
    options: [
      { value: "North", label: "North" },
      { value: "South", label: "South" },
      { value: "East", label: "East" },
      { value: "West", label: "West" },
      { value: "North-East", label: "North-East" },
      { value: "North-West", label: "North-West" },
      { value: "South-East", label: "South-East" },
      { value: "South-West", label: "South-West" },
    ],
    requiredErrorMessage: "Please select a facing direction.",
  },

  {
    name: "parkFacing",
    label: "Park Facing",
    type: "radio",
    dataKey: "parkFacing",
    isRequired: true,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    requiredErrorMessage: "Please select an option for park facing.",
  },
  {
    name: "corner",
    label: "Corner",
    type: "radio",
    isRequired: true,
    dataKey: "corner",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
    requiredErrorMessage: "Please select an option for corner.",
  },

  {
    name: "possession",
    label: "Possession",
    type: "select",
    isRequired: true,
    options: [
      { value: "Ready", label: "Ready" },
      { value: "1Months", label: "1 Months" },
      { value: "3Months", label: "3 Months" },
      { value: "6Months", label: "6 Months" },
      { value: "9Months", label: "9 Months" },
      { value: "12Months", label: "12 Months" },
    ],
    requiredErrorMessage: "Please select a possession status.",
  },
  {
    name: "builderName",
    label: "Builder Name",
    type: TEXT,
    isRequired: true,
    requiredErrorMessage: "Please enter a builder name.",
  },
  {
    name: "builderContact",
    label: "Builder Contact",
    type: TEXT,
    isRequired: true,
    requiredErrorMessage: "Please enter a builder contact.",
  },
  {
    name: "title",
    label: "Main Title",
    type: "select",
    options: PROPERTY_TITLE_LIST,
    isRequired: true,
    requiredErrorMessage: "Please enter a title.",
  },
  {
    name: "detailTitle",
    label: "Sub Title",
    type: TEXT,
    textLimit: 100,
    isRequired: true,
    requiredErrorMessage: "Please enter a detail title.",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    isRequired: true,
    textLimit: 100,
    requiredErrorMessage: "Please enter a description.",
  },
  {
    name: "thumbnailFile",
    label: "Thumbnail Image",
    type: "file",
    isRequired: true,
    requiredErrorMessage: "Please Add 360 Image",
  },
  {
    name: "normalImageFile",
    label: "Normal Images",
    type: "file",
    isRequired: true,
    requiredErrorMessage: "Please Add 360 Image",
  },
  {
    name: "threeSixtyImages",
    label: "360 Images",
    type: "file",
    isRequired: true,
    requiredErrorMessage: "Please Add 360 Image",
  },
  {
    name: "layoutFile",
    label: "Layout Plan",
    type: "file",
    isRequired: true,
    requiredErrorMessage: "Please Add 360 Image",
  },
  {
    name: "VideoFile",
    label: "Load Videos",
    type: "file",
    isRequired: true,
    requiredErrorMessage: "Please Add 360 Image",
  },
  {
    name: "virtualFile",
    label: "Load Virtual Tour",
    type: "file",
    isRequired: true,
    requiredErrorMessage: "Please Add 360 Image",
  },
];
export const bulkuploadheader = [
  {
    property: [
      "Property id",
      "City",
      "Location",
      "Plot Number",
      "Size",
      "Floor",
      "Accommodation",
      "Possession",
      "Price",
      "Facing",
      "Park Facing",
      "Corner",
      "Description",
      "1st Page Title",
      "2 Page Title",
      "Channel Partner Name",
      "Channel Contact Number",
      "Builder name",
      "Contact",
      "THUMBNAIL IMAGE NAME",
      "FOLDER NAME",
    ],
  },
];
