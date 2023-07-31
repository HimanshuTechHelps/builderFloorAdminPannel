import React, { useState } from "react";
import { Table, Button, Container, Badge } from "react-bootstrap";
import Pagination from "react-js-pagination";
import Select from "react-select";
import ReusablePopup from "./ReusablePopup";
import FormBuilder from "./FormBuilder";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import "./../css/AdminTable.css";
import { FaUserEdit, FaRegTrashAlt } from "react-icons/fa";
import { API_ENDPOINTS } from "../../redux/utils/api";
import { GET, POST, REMOVE, SAVE } from "./Const";
import { useDispatch } from "react-redux";
import { callApi } from "../../redux/utils/apiActions";

const options = [
  { value: 5, label: "5" },
  { value: 10, label: "10" },
  { value: 20, label: "20" },
];

const ListingTable = ({
  data = [],
  headersDesktop = [],
  headersMobile = [],
  fieldConst,
  editApi,
  deleteApi,
  getDataApi,
  itemCount,
}) => {
  console.log(data);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRowModal, setShowRowModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
  const [sortType, setSortType] = useState("asc");
  const [sortColumn, setSortColumn] = useState("id");
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const [formData, setFormData] = useState({});

  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your needs

  const tableHeaders = isMobile ? headersMobile : headersDesktop;
  const dispatch = useDispatch();

  const handleSave = (action) => {
    console.log(formData, action);
    const apiEndpoint = action === SAVE ? editApi : deleteApi;
    try {
      const options = {
        url: API_ENDPOINTS[apiEndpoint],
        method: POST,
        headers: { "Content-Type": "application/json" },
        data: currentRowData,
      };
      dispatch(callApi(options));
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    dispatch(
      callApi({
        url: API_ENDPOINTS[getDataApi],
        method: GET,
        headers: { "Content-Type": "application/json" },
        data: { sortType, sortColumn, activePage, itemsCountPerPage },
      })
    );
  };
  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
    console.log(formData);
  };

  const toogleRowClick = () => {
    console.log(currentRowData);
    setShowRowModal(!showRowModal);
  };

  const toogleEdit = () => {
    console.log(currentRowData);
    setShowEditModal(!showEditModal);
  };

  const toogleDelete = () => {
    console.log(currentRowData);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleSort = (column) => {
    const newSortType = sortType === "asc" ? "desc" : "asc";
    setSortType(newSortType);
    setSortColumn(column);
    filterData();
    console.log(
      `Sort type: ${newSortType}, Sort column: ${column}, Active page: ${activePage}, Records per page: ${itemsCountPerPage}`
    );
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    filterData();
    console.log(
      `Sort type: ${sortType}, Sort column: ${sortColumn}, Active page: ${pageNumber}, Records per page: ${itemsCountPerPage}`
    );
  };

  const handleRecordPerPage = (selectedOption) => {
    setSelectedOption(selectedOption);
    setItemsCountPerPage(selectedOption.value);
    filterData();
    console.log(
      `Sort type: ${sortType}, Sort column: ${sortColumn}, Active page: ${activePage}, Records per page: ${selectedOption.value}`
    );
  };

  // Sort the data
  data.sort((a, b) => {
    const itemA = a[sortColumn];
    const itemB = b[sortColumn];

    let comparison = 0;
    if (itemA > itemB) {
      comparison = 1;
    } else if (itemA < itemB) {
      comparison = -1;
    }
    return sortType === "asc" ? comparison : comparison * -1;
  });

  return (
    <>
      {showEditModal ? (
        <ReusablePopup
          onSave={() => {
            handleSave(SAVE);
            toogleEdit();
          }}
          onHide={toogleEdit}
          onCancel={toogleEdit}
        >
          <FormBuilder
            propsFormData={currentRowData}
            fields={fieldConst}
            onFormDataChange={handleFormDataChange}
          />
        </ReusablePopup>
      ) : null}
      {showDeleteModal ? (
        <ReusablePopup
          onYes={() => {
            handleSave(REMOVE);
            toogleDelete();
          }}
          onHide={toogleDelete}
          onCancel={toogleDelete}
        >
          <p className="lbel">Are you sure want to Delete?</p>
        </ReusablePopup>
      ) : null}
      {showRowModal ? (
        <ReusablePopup onHide={toogleRowClick} onClose={toogleRowClick}>
          <FormBuilder
            propsFormData={currentRowData}
            fields={fieldConst}
            onFormDataChange={handleFormDataChange}
          />
        </ReusablePopup>
      ) : null}

      <div className="tablediv ">
        <Table>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(header)}
                  className="tablehead text"
                >
                  {header}
                  {sortColumn === header &&
                    (sortType === "asc" ? <FaCaretUp /> : <FaCaretDown />)}
                </th>
              ))}
              <th className="tablehead text">Actions</th>
            </tr>
          </thead>
          <tbody className="tablebody text">
            {data
              .slice(
                (activePage - 1) * itemsCountPerPage,
                activePage * itemsCountPerPage
              )
              .map((element) => (
                <tr
                  className="tableborder text"
                  key={element.id}
                  onClick={() => {
                    setCurrentRowData(element);
                    toogleRowClick();
                  }}
                >
                  {tableHeaders.map((header, index) => (
                    <td className="bodytext" key={index}>
                      {element[header]}
                    </td>
                  ))}
                  <td className="tablebody tableborder text">
                    <Button
                      style={{ width: "75px", paddingLeft: "2px" }}
                      variant="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentRowData(element);
                        toogleEdit();
                      }}
                    >
                      <FaUserEdit />
                      &nbsp; Edit
                    </Button>
                    <Button
                      variant="danger"
                      style={{ width: "80px", paddingLeft: "2px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentRowData(element);
                        toogleDelete();
                      }}
                    >
                      <FaRegTrashAlt size={12} />
                      &nbsp; Delete
                    </Button>
                    &nbsp;
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <p className="font">Records Per Page</p>
      <div className="selectbox">
        <Select
          value={selectedOption}
          onChange={handleRecordPerPage}
          options={options}
        />
      </div>

      <div className="paginationcontainer">
        <Pagination
          size="lg"
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={itemCount}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ListingTable;
