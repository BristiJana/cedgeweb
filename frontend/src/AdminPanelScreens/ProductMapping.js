import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {DataSource} from "./DataSource.js";
import Swal from "sweetalert2";
import api from "../Services/api.js";
import { useForm, useFieldArray } from "react-hook-form";
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
import "./TenantOnboardComponent.css";

export default function ProductMapping() {
  const [tenantonboardForm, setTenantonboardForm] = useState({
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
  const [open, setOpen] = useState(true);
  // const [screenName] = useState('Tenant Hierarchy Define');
  // const [BTN_VAL, setBTN_VAL] = useState('Submit');
  const [showupdate, setShowUpdate] = useState(false);
  const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const [obj, setObj] = useState([
    "tbl_loan_shadow_staging",
    "tbl_deposit_shadow_staging",
    "tbl_trial_balance_staging",
  ]);
  const [obj2, setobj2] = useState(["Text", "numeric", "Date", "Float"]);
  const { control, handleSubmit, reset, register, setValue } = useForm({
    defaultValues: {
      is_permanent: false,
      initialItemRow1: [{ tenant_type: "", sequence_no: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "initialItemRow1",
  });
  //   const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const [editdisabled, setEditDisabled] = useState(false);
  // const [submitBtn, setSubmitBtn] = useState(true);
  const [dataSource, setDataSource] = useState(DataSource);
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

  const handleTenantTypeChange = (e, index) => {
    const selectedTenantType = e.target.value;
    const isDuplicate = fields.some(
      (field, i) => i !== index && field.tenant_type === selectedTenantType
    );

    if (index === 0 && selectedTenantType !== "Apex Bank") {
      Swal.fire({
        icon: "error",
        title: "Top Most Level should be Apex Bank",

        timer: 2000,
        showConfirmButton: false,
      });

      setValue(`initialItemRow1[${index}].tenant_type`, null);
    } else if (isDuplicate) {
      Swal.fire({
        icon: "warning",
        title: "Tenant Type already exist",

        timer: 2000,
        showConfirmButton: false,
      });
      setValue(`initialItemRow1[${index}].tenant_type`, null);
    }
  };
  useEffect(() => {
    getApi()
    setShowUpdate(true);
  }, []);
  
  const getApi = () => {
    const acToken = localStorage.getItem("accessToken");
    // console.log("AC=",acToken)
    api
      .ProjectMap(acToken)
      .then((response) => {
        console.log("response123--", response.data);
        setDataSource(response.data);
      })
      .catch((err) => {
        console.log("errrr-", err);
      });
   
  };

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
    const filteredData = DataSource.filter((row) =>
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

  return (
    <section className="content">
      {open == true ? (
        <>
          <div className="container">
            <div className="row clearfix">
              <div>
                <div className="card" style={{ width: "100%" }}>
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <div
                        className="header"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>
                          <strong>List of Product Mapping</strong>
                        </h5>
                        {/* <Link to="/tenant-onboarddetail"> */}
                          <button
                            className="btn btn-secondary buttons-html5"
                            tabIndex="0"
                            aria-controls="example1"
                            type="button"
                            onClick={()=>{
                              setOpen(false)
                            }}
                          >
                            <span>Add New Product Mapping</span>
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
                            <em
                              className="fa fa-search"
                              aria-hidden="true"
                            ></em>
                            Search
                          </label>
                          <input
                            type="text"
                            onChange={(e) =>
                              tbl_FilterDatatable(e.target.value)
                            }
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
                          <th>Bank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleData.map((row) => (
                          <tr key={row.id}>
                            <td>
                              <span
                              // style={{
                              //   display: "flex",
                              //   justifyContent: "space-between",
                              // }}
                              >
                                <button
                                  className="btn tblActnBtn h-auto"
                                  onClick={() => viewRecord(row)}
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
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
                            <td>{row.tenant_name}</td>
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
        </>
      ) : (
        <>
          <section className="content">
            <div className="container">
              <div className="row clearfix">
                <div>
                  <div className="card" style={{ width: "100%" }}>
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div
                          className="header"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5>
                            <strong>Product Mapping</strong>
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
                              onClick={()=>{
                                setOpen(true)
                              }}
                            >
                              <span>
                                <em
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                  style={{ color: "white" }}
                                ></em>
                                List of Product Mapping
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
            <div
              className="row clearfix"
              style={{ width: "82%", margin: "auto" }}
            >
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
                            Bank<em style={{ color: "red" }}>*</em>
                          </FormLabel>
                          <div className="form-group">
                            <Select
                              name="bank_tenant_ref_id"
                              value={tenantonboardForm.bank_tenant_ref_id}
                              onChange={handleInputChange}
                              variant="outlined"
                              required
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
                      </div>
                    </div>
                  </div>

                  <div className="card" style={{ paddingTop: "20px" }}>
                    <h5 style={{ textAlign: "center" }}>
                      <strong>Define File Structure</strong>
                    </h5>
                    <div className="body" style={{ display: "flex", flex: 1 }}>
                      <br />
                      <div
                        className="table-responsive"
                        style={{ overflowY: "scroll" }}
                      >
                        <table className="display table table-hover table-checkable order-column m-t-20 width-per-100 table-bordered">
                          <thead>
                            <tr>
                              {showupdate && (
                                <th style={{ textAlign: "center" }}>Action</th>
                              )}
                              <th style={{ textAlign: "center" }}>
                                Product Name
                              </th>
                              <th style={{ textAlign: "center" }}>
                                Report Name
                              </th>
                              <th style={{ textAlign: "center" }}>
                                Sub Category
                              </th>
                              <th style={{ textAlign: "center" }}>Comp1</th>
                              <th style={{ textAlign: "center" }}>Comp2</th>
                              <th style={{ textAlign: "center" }}>
                                Segment Code
                              </th>
                              <th style={{ textAlign: "center" }}>Cgl Code</th>
                              <th style={{ textAlign: "center" }}>
                                Account Type
                              </th>
                              <th style={{ textAlign: "center" }}>Int Cat</th>
                            </tr>
                          </thead>
                          <tbody
                            className="main_tbody"
                            style={{ overflowX: "auto" }}
                          >
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
                                              tenant_type: "",
                                              sequence_no: fields.length + 1, // Calculate sequence_no dynamically
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
                                    {...register(
                                      `initialItemRow1.${index}.sequence_no`
                                    )}
                                    placeholder="Enter Field Name"
                                  />
                                </td>

                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
                                      <option key={dataIndex}>{data}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
                                      <option key={dataIndex}>{data}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
                                      <option key={dataIndex}>{data}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
                                      <option key={dataIndex}>{data}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
                                      <option key={dataIndex}>{data}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="col_input">
                                  <input
                                    editdisabled
                                    {...register(
                                      `initialItemRow1.${index}.sequence_no`
                                    )}
                                    placeholder="Enter Field Length"
                                  />
                                </td>
                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
                                      <option key={dataIndex}>{data}</option>
                                    ))}
                                  </select>
                                </td>
                                <td className="col_input">
                                  <select
                                    {...register(
                                      `initialItemRow1.${index}.tenant_type`
                                    )}
                                    id={`tenant_type${index + 1}`}
                                    placeholder="Select Tenant Type"
                                    style={{
                                      width: "100%",
                                      color: "black",
                                      paddingTop: "4px",
                                      paddingBottom: "4px",
                                    }}
                                    onChange={(e) =>
                                      handleTenantTypeChange(e, index)
                                    }
                                  >
                                    {obj.map((data, dataIndex) => (
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
                        <Button
                          onClick={onCancelForm}
                          className="btn btn-danger"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
