import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from 'react-hook-form';
import { DataSource } from "./DataSource.js";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import "./TenantOnboardComponent.css";
import api from "../Services/api";
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

export default function FileStructureDefine() {
  const [tenantonboardForm, setTenantonboardForm] = useState({
    id: "",
    tenant_name: "",

    is_legal_tenant: false,

    bank_tenant_ref_id: "",

    is_active: true,
  });
  //   const [BTN_VAL, setBTN_VAL] = useState("Submit");
  // const [screenName] = useState('Tenant Hierarchy Define');
  const [open, setOpen] = useState(true);
  const [showupdate, setShowUpdate] = useState(false);
  const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const [obj, setObj] = useState(['tbl_loan_shadow_staging', 'tbl_deposit_shadow_staging', 'tbl_trial_balance_staging']);
  const [obj2, setobj2] = useState(["Text", "numeric", "Date", "Float"])


  const { control, handleSubmit, reset, register, setValue } = useForm({
    defaultValues: {
      is_permanent: false,
      initialItemRow1: [{ field_name: '', actual_field_name: '', refer_form: '', field_len: '', data_type: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'initialItemRow1',
  });
  //   const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const [editdisabled, setEditDisabled] = useState(false);
  // const [submitBtn, setSubmitBtn] = useState(true);
  const handleTenantTypeChange = (e, index, fieldName) => {
    console.log(e.target.value)
 console.log(fields)
 
    // // Update the field value in the form data
    // console.log("Field----", fields)
    const updatedValue = e.target.value;

    // Update the field value in the form data
    setValue(`initialItemRow1[${index}].${fieldName}`, updatedValue);
    
    // Set the updated fields in the form
   
  };

  useEffect(() => {
    getApi();
    setShowUpdate(true);



  }, []);

  const getApi = () => {
    const acToken = localStorage.getItem("accessToken");
    // console.log("AC=",acToken)
    api
      .fileStructure(acToken)
      .then((response) => {
        console.log("response123--", response.data);
        setDataSource(response.data);
      })
      .catch((err) => {
        console.log("errrr-", err);
      });

  };

  const apiTenant = () => {
    const acToken = localStorage.getItem("accessToken");

    const data = {
      id: tenantonboardForm.id,
      tenant_name: tenantonboardForm.tenant_name,

      is_legal_tenant: tenantonboardForm.is_legal_tenant,

      bank_tenant_ref_id: tenantonboardForm.bank_tenant_ref_id,

      is_active: true,


    };
    console.log("dataforapi", data)
    api
      .filePost(acToken, data)
      .then((res) => {
        console.log("this is post", res);
      })
      .catch((err) => {
        console.log("post err", err);
      });
  };
  // const viewRecord = (row) => {
  //   // Populate form fields with the data from the 'row' parameter
  //   setTenantonboardForm({
  //     ...tenantonboardForm,
  //     id: row.id,
  //     tenant_name: row.tenant_name,
  //     tenant_shortname: row.tenant_shortname,
  //     is_legal_tenant: row.is_legal_tenant,
  //     tenant_code: row.tenant_code,
  //     tenant_type_ref_id: row.tenant_type_ref_id,
  //     tenant_belongs_to: row.tenant_belongs_to,
  //     address1: row.address1,
  //     address2: row.address2,
  //     bank_tenant_ref_id: row.bank_tenant_ref_id,
  //     pincode: row.pincode,
  //     country_ref_id: row.country_ref_id,
  //     state_ref_id: row.state_ref_id,
  //     city_ref_id: row.city_ref_id,
  //     is_active: row.is_active,
  //   });
  //   setBTN_VAL("Update");
  //   setEditDisabled(true);
  // };

  const onCancelForm = () => {
    setTenantonboardForm({
      id: "",
      tenant_name: "",
      tenant_shortname: "",
      is_legal_tenant: false,
      tenant_code: "",
      tenant_type_ref_id: "",
      tenant_belongs_to: "",
      address1: "",
      address2: "",
      bank_tenant_ref_id: "",
      pincode: "",
      country_ref_id: "",
      state_ref_id: "",
      city_ref_id: "",
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

  const [dataSource, setDataSource] = useState([]);
  const [displayColumns] = useState([
    "actions",
    "tenant_name",
    "tenant_type",
    "address1",
    "pincode",
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
    const filteredData = dataSource.filter((row) =>
      displayColumns.some(
        (column) =>
          row[column] !== undefined &&
          row[column].toString().toLowerCase().includes(searchValue)
      )
    );


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
  return (
    <section className="content">
      {open ? <div>
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
                      <h5>
                        <strong >List of File Structue Define</strong>
                      </h5>
                      {/* <Link to="/tenant-onboarddetail"> */}
                      <button
                        className="btn btn-secondary buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                        onClick={() => { setOpen(false) }}
                      >
                        <span>Add New File Structue Define</span>
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                          <em className="fa fa-search" aria-hidden="true"></em>
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
                        <th>File Name</th>
                        <th></th>
                        <th>Tenant Type</th>
                        <th>Is Temporary ?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSource.map((row) => (
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
                                onClick={() => viewRecord(row)}
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </button>
                              <button
                                className="btn tblActnBtn h-auto"
                                onClick={() => editRecord(row)}
                              >
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </span>
                          </td>
                          <td>{row.file_name}</td>

                          <td>{row.file_type_name}</td>
                          <td>{row.is_temporary_flag}</td>
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
      </div> : <> <div className="container">
        <div className="row clearfix">
          <div>
            <div className="card" style={{ width: "100%" }}>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div
                    className="header"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5>
                      <strong>File Structue Define</strong>
                    </h5>
                    {/* <Link
                        to="/tenant-onboard"
                        style={{ textDecoration: "none" }}
                      > */}
                    <button
                      className="btn btn-secondary buttons-html5"
                      tabIndex="0"
                      aria-controls="example1"
                      type="button"
                      onClick={() => { setOpen(true) }}
                    >
                      <span>
                        <em
                          className="fa fa-calendar"
                          aria-hidden="true"
                          style={{ color: "white" }}
                        ></em>
                        List of file Struture Define
                      </span>
                    </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
                      <FormLabel
                        style={{ color: "black", marginBottom: "10px" }}
                      >
                        File Name<em style={{ color: "red" }}>*</em>
                      </FormLabel>
                      <div className="form-group">
                        <TextField
                          type="text"
                          name="tenant_name"
                          value={tenantonboardForm.tenant_name}
                          onChange={handleInputChange}
                          variant="outlined"
                          placeholder="Enter File Name"
                          required
                        />
                        {/* Display validation errors if needed */}
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                      <div className="form-group">
                        <FormLabel
                          style={{ color: "black", marginBottom: "10px" }}
                        >
                          Type of Tenant<em style={{ color: "red" }}>*</em>
                        </FormLabel>

                        <Select
                          name="bank_tenant_ref_id"
                          value={tenantonboardForm.bank_tenant_ref_id}
                          onChange={handleInputChange}
                          variant="outlined"

                          placeholder="Bank Tenant"
                          disabled={editdisabled}
                          style={{ width: "80%" }}
                        >
                          {tenantHierarchyData.map((tenant) => (
                            <MenuItem key={tenant.id} value={tenant.id}>
                              {tenant.bank_tenant_ref_id}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                      <div className="form-group">
                        <label className="form-label">Is Temporary?</label>
                        <br />
                        <FormControlLabel
                          control={
                            <Switch
                              name="is_legal_tenant"
                              checked={tenantonboardForm.is_legal_tenant}
                              onChange={handleInputChange}
                              color="primary"
                            />
                          }
                          label={tenantonboardForm.is_legal_tenant ? "Yes" : "No"}
                        />
                      </div>
                    </div>

                    <div
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4"
                      style={{ paddingTop: "10px" }}
                    >
                      <div className="form-group">
                        <label className="form-label">Is Active?</label>
                        <br />
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
                  </div>
                </div>
              </div>

              <div className="card" style={{ paddingTop: "20px" }}>
                <h5>
                  <strong>Define File Structure</strong>
                </h5>
                <div className="card">
                  <div className="body">
                    <br />
                    <div className="table-responsive">
                      <table className="display table table-hover table-checkable order-column m-t-20 width-per-100 table-bordered">
                        <thead>
                          <tr>
                            {showupdate && (
                              <th style={{ textAlign: "center" }}>Action</th>
                            )}
                            <th style={{ textAlign: "center" }}>Field Name</th>
                            <th style={{ textAlign: "center" }}>Actual Field Name</th>
                            <th style={{ textAlign: "center" }}>Refer From</th>
                            <th style={{ textAlign: "center" }}>Field Length</th>
                            <th style={{ textAlign: "center" }}>Data Type</th>
                          </tr>
                        </thead>
                        <tbody className="main_tbody">


                          {fields.map((field, index) => (
                            <tr key={field.id}>
                              {showupdate && (
                                <td>
                                  <center>
                                    {index === 0 ? (
                                      <button
                                        type="button"
                                        className="btn btn-primary btn-rounded waves-effect"
                                        onClick={() =>
                                          append({
                                            field_name:'',
                                            actual_field_name:'',
                                            refer_form:'', 
                                            field_len:'',
                                            data_type:'', 
                                          })
                                        }
                                      >
                                        +
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-rounded waves-effect"
                                        onClick={() => remove(index)}
                                      >
                                        -
                                      </button>
                                    )}
                                  </center>
                                </td>
                              )}

                              <td className="col_input">
                                <input
       {...register(`initialItemRow1[${index}].field_name`)}
        value={fields.field_name}
        placeholder="Enter Field Name"
        onChange={(e) => handleTenantTypeChange(e, index, 'field_name')}
      />
                              </td>

                              <td className="col_input">
                                <input
                                  {...register(`initialItemRow1[${index}].actual_field_name`)}
                                  value={fields.actual_field_name}
                                  placeholder="Enter Actual Field Name"
                                  onChange={(e) => handleTenantTypeChange(e, index, 'actual_field_name')}
                                />
                              </td>

                              <td className="col_input">
                                <select
                                  {...register(`initialItemRow1[${index}].refer_form`)}
                                  
                                  placeholder="Select Tenant Type"
                                  style={{
                                    width: "100%",
                                    color: "black",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                  }}
                                  value={fields.refer_form}
                                  onChange={(e) => handleTenantTypeChange(e, index,'refer_form')}
                                >
                                  {obj.map((data, dataIndex) => (
                                    <option key={dataIndex}>{data}</option>
                                  ))}
                                </select>
                              </td>

                              <td className="col_input">
                                <input
                                  {...register(`initialItemRow1[${index}].field_len`)}
                                  value={fields.field_len}
                                  placeholder="Enter Field Length"
                                  onChange={(e) => handleTenantTypeChange(e, index, 'field_len')}
                                />
                              </td>

                              <td className="col_input">
                                <select
                                  {...register(`initialItemRow1[${index}].data_type`)}
                                  
                                  placeholder="Select Data Type"
                                  style={{
                                    width: "100%",
                                    color: "black",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                  }}
                                  value={fields.data_type}
                                  onChange={(e) => handleTenantTypeChange(e, index, 'data_type')}
                                >
                                  {obj2.map((data, dataIndex) => (
                                    <option key={dataIndex}>{data}</option>
                                  ))}
                                </select>
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
                      disabled={!submitBtn}
                    >
                      {BTN_VAL}
                    </Button>
                    <Button onClick={onCancelForm} className="btn btn-danger">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div></>}

    </section>
  );
}

