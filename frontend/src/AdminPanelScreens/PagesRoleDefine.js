import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataSource3, DataSource4 } from "./DataSource.js";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import "./TenantOnboardComponent.css";
import ReactPaginate from "react-paginate";
import {
  FormControl,
  FormGroup,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  Select,
  MenuItem,
  InputLabel,
  FormLabel,
} from "@material-ui/core";

export default function PagesRoleDefine() {
  const [dataSource, setDataSource] = useState(DataSource3);
  const [displayColumns] = useState([
    "actions",
    "tenant_name",
    "role_name",
    "user_name",
  ]);
  const [screenName] = useState("Tenant Onboard");
  const [BTN_VAL, setBTN_VAL] = useState("Submit");
  const [USERID] = useState(localStorage.getItem("user_id"));
  const [submitBtn, setSubmitBtn] = useState(true);
  const [listDiv, setListDiv] = useState(false);
  const [showList, setShowList] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [open, setopen] = useState(true);
  const [nob, setNob] = useState(true);
  const pageCount = Math.ceil(dataSource.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Reset to the first page when changing items per page
  };

  const visibleData = dataSource.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const viewRecord = (row) => {
    setRowData(row);
    setShowList(false);
    setSubmitBtn(false);
    setListDiv(true);
  };

  const editRecord = (row) => {
    setRowData(row);
    setShowList(false);
    setListDiv(true);
    setSubmitBtn(true);
    setBTN_VAL("Update");
  };

  const showFormList = (item) => {
    setRowData([]);
    setBTN_VAL("Submit");
    if (item === false) {
      setListDiv(true);
      setShowList(false);
      setSubmitBtn(true);
    } else {
      setListDiv(false);
      setShowList(true);
    }
  };

  const onCancel = (item) => {
    setListDiv(item);
    setShowList(true);
    setRowData([]);
    setBTN_VAL("Submit");
  };

  const showSwalMassage = (message, icon) => {
    Swal.fire({
      title: message,
      icon: icon,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const tbl_FilterDatatable = (value) => {
    // Convert the search value to lowercase for case-insensitive filtering
    const searchValue = value.toLowerCase();

    // Filter the data based on the search value for all columns
    const filteredData = DataSource3.filter((row) =>
      displayColumns.some(
        (column) =>
          row[column] !== undefined &&
          row[column].toString().toLowerCase().includes(searchValue)
      )
    );

    // Update the 'dataSource' state with the filtered data
    setDataSource(filteredData);
  };

  const export_to_excel = () => {
    // Implement your export logic here
  };

  const getPaginationLabel = () => {
    if (pageCount === 0) return "";

    const start = currentPage * itemsPerPage + 1;
    const end = Math.min((currentPage + 1) * itemsPerPage, dataSource.length);
    return `${start} - ${end} of ${dataSource.length}`;
  };

  const [tenantonboardForm, setTenantonboardForm] = useState({
    id: "",
    tenant_name: "",
    role_name: "",
    user_name: "",
  });
  const [BTN_VAL1, setBTN_VAL1] = useState("Submit");
  const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const [countrydata, setCountrydata] = useState([]);
  const [statedata, setStatedata] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [tenantData, setTenantData] = useState([]);
  const [BankTenantData, setBankTenantData] = useState([]);
  const [editdisabled, setEditDisabled] = useState(false);
  const [submitBtn1, setSubmitBtn1] = useState(true);
  useEffect(() => {
    // Fetch data and set state for tenantHierarchyData, countrydata, and other data
    // You can perform data fetching here as you did in componentDidMount in the class component
  }, []);

  const viewRecord1 = (row) => {
    // Populate form fields with the data from the 'row' parameter
    setTenantonboardForm({
      ...tenantonboardForm,
      id: row.id,
      tenant_name: row.tenant_name,
      role_name: row.role_name,
      user_name: row.user_name,
      is_active: row.is_active,
    });
    setBTN_VAL1("Update");
    setEditDisabled(true);
  };

  const onCancelForm = () => {
    setTenantonboardForm({
      id: "",
      tenant_name: "",
      role_name: "",
      user_name: "",

      is_active: true,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      // Handle form submission
      const formData = tenantonboardForm;
      // Emit onSave event with formData
    }
  };

  const isFormValid = () => {
    // Implement your form validation logic here
    return true; // Change this to return true/false based on validation
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedForm = { ...tenantonboardForm };

    if (type === "checkbox") {
      updatedForm[name] = checked;
    } else {
      updatedForm[name] = value;
    }

    setTenantonboardForm(updatedForm);
  };

  const onCheckboxChange = (dynamic, event, i) => {
    if (
      tenantonboardForm.tenant_name === "" ||
      tenantonboardForm.role_name === "" ||
      tenantonboardForm.user_name === ""
    ) {
      Swal.fire({
        title: "Please select tenant first",
      });

      event.target.checked = false;
    } else {
      const updatedDynamic = { ...dynamic, check: event.target.checked };
    }
  };

  const read = (dynamic, event, i) => {
    console.log(event.target);
    const updatedDynamic = { ...dynamic, read_access: event.target.checked };
  };

  // Implement your write function
  const write = (dynamic, event, i) => {
    console.log(event.target);
    const updatedDynamic = { ...dynamic, write_access: event.target.checked };
  };

  const deletefunc = (dynamic, event, i) => {
    console.log(event.target);
    const updatedDynamic = { ...dynamic, delete_access: event.target.checked };
  };

  return (
    <section className="content">
      <div className="container">
        <div className="row clearfix">
          <div>
            <div className="card" style={{ width: "100%" }}>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div
                    className="header"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {open ? (
                      <>
                        <h5>
                          <strong>List of Pages Role Link</strong>
                        </h5>
                        <button
                          className="btn btn-secondary buttons-html5"
                          tabIndex="0"
                          aria-controls="example1"
                          type="button"
                          onClick={() => setopen(!open)}
                        >
                          <em
                            className="fa fa-plus"
                            aria-hidden="true"
                            style={{ color: "white" }}
                          ></em>
                          <span>Add New Pages Role Link</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <h5>
                          <strong>Pages Role Link</strong>
                        </h5>
                        <button
                          className="btn btn-secondary buttons-html5"
                          tabIndex="0"
                          aria-controls="example1"
                          type="button"
                          onClick={() => setopen(!open)}
                        >
                          <span>
                            <em
                              className="fa fa-calendar"
                              aria-hidden="true"
                              style={{ color: "white" }}
                            ></em>
                            List of Pages Role Link
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <div className="row clearfix" hidden={listDiv}>
          <div style={{ width: "91%", margin: "auto" }}>
            <div className="card">
              <div className="body">
                <div className="table-responsive">
                  <div
                    className="row clearfix"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                  >
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div className="dt-buttons btn-group flex-wrap">
                        <button
                          className="btn btn-secondary buttons-html5"
                          tabIndex="0"
                          aria-controls="example1"
                          type="button"
                          onClick={export_to_excel}
                        >
                          <span>Export To Excel</span>
                        </button>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 col-xs-12"
                      style={{ textAlign: "right" }}
                    >
                      <div
                        className="mat-form-field"
                        style={{
                          display: "flex",
                          flexDirection: "space-between",
                        }}
                      >
                        <label>
                          <em
                            className="fa fa-search"
                            aria-hidden="true"
                            color="black"
                          ></em>
                          Search
                        </label>
                        <input
                          type="text"
                          onChange={(e) => tbl_FilterDatatable(e.target.value)}
                          style={{ marginLeft: "20px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <table className="mat-table" id="excel-table">
                    {/* Table header */}
                    <thead>
                      <tr>
                        <th>Actions</th>
                        <th>Tenant Name</th>
                        <th>Role Name</th>
                        <th>User Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleData.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <button
                                className="btn tblActnBtn h-auto"
                                onClick={() => {
                                  setNob(!nob);
                                  setopen(!open);
                                }}
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </button>

                              <button
                                className="btn tblActnBtn h-auto"
                                onClick={() => {
                                  setBTN_VAL1("Update");
                                  setopen(!open);
                                }}
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </span>
                          </td>
                          <td>{row.tenant_name}</td>
                          <td>{row.role_name}</td>
                          <td>{row.user_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                    }}
                  >
                    <div
                      className="items-per-page"
                      style={{
                        alignSelf: "flex-end",
                        width: "50%",
                        marginLeft: "10px",
                      }}
                    >
                      Items per page:
                      <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        style={{ marginLeft: "8px", marginTop: "8px" }}
                      >
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                      </select>
                    </div>
                    <div
                      className="pagination-label"
                      style={{ paddingTop: "8px" }}
                    >
                      {getPaginationLabel()}
                    </div>
                    <div className="pagination-first-last">
                      <button
                        className="btn btn-secondary pagination-btn"
                        onClick={() => setCurrentPage(0)}
                        disabled={currentPage === 0}
                      >
                        <i className="fa fa-angle-double-left"></i>
                      </button>
                      <button
                        className="btn btn-secondary pagination-btn"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <i className="fa fa-angle-left"></i>
                      </button>
                      <button
                        className="btn btn-secondary pagination-btn"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <i className="fa fa-angle-right"></i>
                      </button>
                      <button
                        className="btn btn-secondary pagination-btn"
                        onClick={() => setCurrentPage(pageCount - 1)}
                        disabled={currentPage === pageCount - 1}
                      >
                        <i className="fa fa-angle-double-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row clearfix" style={{ width: "82%", margin: "auto" }}>
          <div>
            <form onSubmit={onSubmit}>
              <div className="card" style={{ paddingTop: "20px" }}>
                <div className="body">
                  <div className="row clearfix">
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={tenantonboardForm.id}
                      className="form-control"
                    />

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                      <div className="form-group">
                        <FormLabel
                          style={{ color: "black", marginBottom: "10px" }}
                        >
                          Tenant<em style={{ color: "red" }}>*</em>
                        </FormLabel>

                        <Select
                          name="tenant_name"
                          value={tenantonboardForm.tenant_name}
                          onChange={handleInputChange}
                          variant="outlined"
                          required
                          placeholder="Select Tenant"
                          disabled={editdisabled}
                          style={{ width: "80%" }}
                        >
                          {tenantHierarchyData.map((tenant) => (
                            <MenuItem key={tenant.id} value={tenant.id}>
                              {tenant.tenant_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                      <FormLabel
                        style={{ color: "black", marginBottom: "10px" }}
                      >
                        Role <em style={{ color: "red" }}>*</em>
                      </FormLabel>

                      <div className="form-group">
                        <Select
                          name="role_name"
                          value={tenantonboardForm.role_name}
                          onChange={handleInputChange}
                          variant="outlined"
                          required
                          placeholder="Select Role"
                          disabled={editdisabled}
                          style={{ width: "80%" }}
                        >
                          {tenantHierarchyData.map((tenant) => (
                            <MenuItem key={tenant.id} value={tenant.id}>
                              {tenant.role_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* More form fields */}

                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                      <FormLabel
                        style={{ color: "black", marginBottom: "10px" }}
                      >
                        User<em style={{ color: "red" }}>*</em>
                      </FormLabel>

                      <div className="form-group">
                        <Select
                          name="user_name"
                          value={tenantonboardForm.user_name}
                          onChange={handleInputChange}
                          variant="outlined"
                          required
                          placeholder="Select User"
                          disabled={editdisabled}
                          style={{ width: "80%" }}
                        >
                          {tenantHierarchyData.map((tenant) => (
                            <MenuItem key={tenant.id} value={tenant.id}>
                              {tenant.user_name}
                            </MenuItem>
                          ))}
                        </Select>
                        {/* Display validation errors if needed */}
                      </div>
                    </div>

                    <div
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4"
                      style={{ paddingTop: "10px" }}
                    >
                      <div className="form-group">
                        <label
                          className="form-label"
                          style={{ paddingRight: "10px" }}
                        >
                          Is Active?
                        </label>

                        <FormControlLabel
                          control={
                            <Switch
                              name="is_active"
                              checked={tenantonboardForm.is_active}
                              onChange={handleInputChange}
                              color="primary"
                            />
                          }
                          label={tenantonboardForm.is_active ? "Yes" : "No"}
                        />
                      </div>
                    </div>

                    {/* More form fields */}
                  </div>
                </div>
              </div>
              <div className="card" style={{ paddingBottom: "20px" }}>
                <div className="body">
                  <div className="form-group">
                    <div
                      className="table-responsive"
                      formArrayName="initialItemRow"
                    >
                      <table
                        id="tableExport1"
                        className="display table table-hover table-checkable order-column m-t-20 width-per-100"
                      >
                        <thead>
                          <tr>
                            <th style={{ backgroundColor: "#CAD5E2" }}></th>
                            <th style={{ backgroundColor: "#CAD5E2" }}>
                              Form Name
                            </th>
                            <th style={{ backgroundColor: "#CAD5E2" }}>
                              Read Access
                            </th>
                            <th style={{ backgroundColor: "#CAD5E2" }}>
                              Write Access
                            </th>
                            <th style={{ backgroundColor: "#CAD5E2" }}>
                              Delete Access
                            </th>
                          </tr>
                        </thead>
                        <tbody className="main_tbody">
                          {DataSource4.map((dynamic, i) => (
                            <tr key={i}>
                              <td
                                style={{
                                  backgroundColor: dynamic.is_parent
                                    ? "#90e0ef"
                                    : "#d0efff",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  id={`check${i + 1}`}
                                  value={dynamic.check}
                                  onChange={(e) =>
                                    onCheckboxChange(dynamic, e, i)
                                  }
                                />
                              </td>
                              <td
                                style={{
                                  backgroundColor: dynamic.is_parent
                                    ? "#90e0ef"
                                    : "#d0efff",
                                }}
                              >
                                <mat-label>{dynamic.form_name}</mat-label>
                              </td>
                              <td
                                style={{
                                  backgroundColor: dynamic.is_parent
                                    ? "#90e0ef"
                                    : "#d0efff",
                                }}
                              >
                                <label style={{ marginRight: "0.5rem" }}>
                                  No
                                </label>
                                <Switch
                                  id={`read_access${i + 1}`}
                                  checked={dynamic.read_access}
                                  onChange={(e) => read(dynamic, e, i)}
                                />
                                <label>Yes</label>
                              </td>
                              <td
                                style={{
                                  backgroundColor: dynamic.is_parent
                                    ? "#90e0ef"
                                    : "#d0efff",
                                }}
                              >
                                <label style={{ marginRight: "0.5rem" }}>
                                  No
                                </label>
                                <Switch
                                  id={`write_access${i + 1}`}
                                  checked={dynamic.write_access}
                                  onChange={(e) => write(dynamic, e, i)}
                                />
                                <label>Yes</label>
                              </td>
                              <td
                                style={{
                                  backgroundColor: dynamic.is_parent
                                    ? "#90e0ef"
                                    : "#d0efff",
                                }}
                              >
                                <label style={{ marginRight: "0.5rem" }}>
                                  No
                                </label>
                                <Switch
                                  id={`delete_access${i + 1}`}
                                  checked={dynamic.delete_access}
                                  onChange={(e) => deletefunc(dynamic, e, i)}
                                />
                                <label>Yes</label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ paddingBottom: "20px" }}>
                <div className="body" style={{ textAlign: "center" }}>
                  <div className="button-demo">
                    <Button
                      className="btn btn-primary mr5"
                      type="submit"
                      disabled={!submitBtn1}
                    >
                      {BTN_VAL1}
                    </Button>
                    <Button onClick={onCancelForm} className="btn btn-danger">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
