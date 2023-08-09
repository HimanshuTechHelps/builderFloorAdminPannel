import { useState } from "react";
import React from "react";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUserPlus,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import FormBuilder from "./FormBuilder";
import ReusablePopup from "./ReusablePopup";
import { GET, NEED_APPROVAL_BY, POST, PROFILE } from "./Const";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { callApi } from "../../redux/utils/apiActions";

const TableButtonHeader = ({
  tableData = [],
  fieldConst,
  saveDataApi,
  refreshDataApi,
  addHeader,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newPopup, setNewPopup] = useState(null);
  const [importPopup, setImportPopup] = useState(null);
  const [exportPopup, setExportPopup] = useState(null);
  const [formData, setFormData] = useState({});
  const userProfile = useSelector((state) => state[PROFILE]);

  const dispatch = useDispatch();
  const convertArrayToExcel = (dataArray, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(dataArray);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    const anchor = document.createElement("a");
    const url = window.URL.createObjectURL(data);
    anchor.href = url;
    anchor.download = `${filename}.xlsx`;
    anchor.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleExportClick = () => {
    convertArrayToExcel(tableData, "data_export");
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      console.log({ ...formData, parentId: userProfile._id }, userProfile._id);
      const newFormData = new FormData();
      for (const file of formData?.images || []) {
        newFormData.append("files", file);
      }
      newFormData.append("parentId", userProfile._id);
      newFormData.append([NEED_APPROVAL_BY], userProfile.parentId);
      newFormData.append("formData", { ...formData });
      Object.keys(formData).map((element) => {
        newFormData.append(
          element,
          formData[element]?.value
            ? formData[element]?.value
            : formData[element]
        );
      });
      const options = {
        url: API_ENDPOINTS[saveDataApi],
        method: POST,
        headers: {
          "Content-Type": formData.images
            ? "multipart/form-data"
            : "application/json",
        },
        data: formData.images ? newFormData : formData,
      };
      dispatch(callApi(options));
    } catch (err) {
      console.log(err);
    }
  };

  const toogleNewPopup = () => {
    setNewPopup(!newPopup);
  };
  const toogleUploadPopup = () => {
    setImportPopup(!importPopup);
  };
  const toogleExportPopup = () => {
    setExportPopup(!exportPopup);
  };
  const handleRefreshClick = () => {
    console.log(refreshDataApi);
    try {
      const options = {
        url: API_ENDPOINTS[refreshDataApi],
        method: GET,
        headers: { "Content-Type": "application/json" },
        data: formData,
      };
      dispatch(callApi(options));
    } catch (error) {}
  };
  return (
    <>
      {newPopup ? (
        <ReusablePopup
          onSave={handleSubmit}
          onHide={toogleNewPopup}
          onCancel={toogleNewPopup}
        >
          <div className="formheadingcontainer">{addHeader}</div>
          <FormBuilder
            fields={fieldConst}
            onFormDataChange={handleFormDataChange}
          />
        </ReusablePopup>
      ) : null}
      {importPopup ? (
        <ReusablePopup onHide={toogleUploadPopup} onCancel={toogleUploadPopup}>
          <div className="container">
            <h2 className="lbel">You Can Upload Your Files over Here</h2>
            <input
              className="inputtag"
              type="file"
              onChange={handleFileSelect}
            />
            <Button variant="success" class="btnclass">
              Upload File
            </Button>
          </div>
        </ReusablePopup>
      ) : null}
      {exportPopup ? (
        <ReusablePopup onHide={toogleExportPopup}>
          <div class="container">
            <p className="lbel">Export Table Data into Excel</p>
            <Button variant="success" onClick={handleExportClick}>
              Export to Excel
            </Button>
          </div>
        </ReusablePopup>
      ) : null}
      <div>
        <Button class="btn" variant="success" onClick={toogleNewPopup}>
          <FaUserPlus />
          &nbsp;&nbsp; ADD
        </Button>
        <Button class="btn" onClick={toogleUploadPopup}>
          <FaCloudUploadAlt /> &nbsp;&nbsp; UPLOAD
        </Button>
        <Button class="btn" onClick={toogleExportPopup}>
          <FaCloudDownloadAlt /> &nbsp;&nbsp; EXPORT
        </Button>
        <Button class="btn" onClick={handleRefreshClick}>
          <FiRefreshCcw /> &nbsp;&nbsp; REFRESH
        </Button>
      </div>
    </>
  );
};

export default TableButtonHeader;
