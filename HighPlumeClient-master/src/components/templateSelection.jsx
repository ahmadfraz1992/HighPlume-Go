import React, { Component } from "react";
import "../startup.css";
import $ from "jquery";
import axios from "axios";
import Modal from "react-awesome-modal";
var cat_info_db = [];
var questions_from_db = [];
var userDataTemp = [];
var catSection_name = "";
var catDataTemp = [];
function showLoader() {
  $(".overlay").show();
}
function hideLoader() {
  $(".overlay").hide();
}

class templateSelection extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
    this.state = {
      questions: [],
      cat_name: "",
      question: ""
    };
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  openModal() {
    debugger;
    //<!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        {/* <!-- Modal content--> */}
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Modal Header</h4>
          </div>
          <div class="modal-body">
            <p>Some text in the modal.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>;
    $("#table tbody").on("click", "#btnModal", function() {
      $("#myModal").modal("show");
      // var rowIndex = $(this).closest("tr");
      // var uid = $.trim(
      //   $(rowIndex)
      //     .find("td:eq(0)")
      //     .text()
      // );
      // console.log(uid);
      // sessionStorage.setItem("ModalData", uid);
      // window.location.replace("/sectionEdit");
    });
    // var secdivHtml = "";
    // var checkedRows = [];
    // var checkedRowId = [];
    // $("#tbody tr").each(function() {
    //   if (
    //     $(this)
    //       .find("input")
    //       .is(":checked")
    //   ) {
    //     checkedRows.push(
    //       $(this)
    //         .find("td:eq(0)")
    //         .text()
    //     );
    //     console.log(checkedRows);
    //   }
    //   if (
    //     $(this)
    //       .find("input")
    //       .is(":checked")
    //   ) {
    //     checkedRowId.push(
    //       $(this)
    //         .find("th:eq(0)")
    //         .text()
    //     );
    //     console.log(checkedRowId);
    //   }
    // });
    // debugger;
    // const Template_id = checkedRowId.toString();
    // parseInt(Template_id, 10);
    // axios
    //   .post("http://localhost:6005/createCategory/getcategoryInfoTemplate", {
    //     params: {
    //       Template_id: Template_id
    //     }
    //   })
    //   .then(response => {
    //     console.log(response);
    //     debugger;
    //     catDataTemp = response.data.categoryLocalData;
    //     secdivHtml +=
    //       "<h2 style='color:black;padding-top:10%' class=''>" +
    //       checkedRows.toString() +
    //       "</h2></br>";
    //     for (var i = 0; i < catDataTemp.length; i++) {
    //       secdivHtml +=
    //         "<ul style='color:black;float:left' class='text-center'><li>" +
    //         catDataTemp[i].section_name +
    //         "</li><br/></ul>";
    //     }
    //     document.getElementById("modalSection").innerHTML = secdivHtml;
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
    // this.setState({
    //   visible: true
    // });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  handleButtonClick(e) {
    debugger;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    debugger;
    // var categoryInfo = [];
    // axios
    //   .post("http://localhost:6005/createcategory/getcategoryInfoWithoutPara")
    //   .then(response => {
    //     console.log(response);
    //     categoryInfo = response.data.categoryLocalData;
    //   })
    //   .catch(err => {
    //     console.log(err.response);
    //   });

    axios
      .post("http://localhost:6005/category/getCategoryInformationWithoutPara")
      .then(response => {
        console.log(response);
        var divHtml = "";
        cat_info_db = response.data.categoryLocalData;

        // for (var j = 0; j < categoryInfo.length; j++) {
        //   if (categoryInfo[j].cat_id == userDataTemp[i]._id) {
        //     categorySections_name[j] = userDataTemp[j].section_name;
        //   }
        // }

        divHtml += "<thead  id='thead'>";
        divHtml += " <th  style='width:25%' id=''>ID</th>";
        divHtml += " <th style='width:25%'>Category Name</th>";

        divHtml += " <th  style='width:25%'>Action</th>";
        divHtml += "</thead><tbody id='tbody'>";
        for (var i = 0; i < cat_info_db.length; i++) {
          divHtml += "<tr>";
          divHtml +=
            "<th id='th3'  style='width:25%' >" + cat_info_db[i]._id + "</th>";

          divHtml +=
            " <td   style='width:25%' value=>" +
            cat_info_db[i].cat_name +
            "</td>";

          divHtml +=
            "<td style='width:25%'><button type='button' id='btnModal' class='btn btn-info btn-sm'>Show</button></td>";
          // "<td style='width:25%'><a  class='btn' style='border:none' data-toggle='modal' href='btnModalID'><i class='fas fa-smile'></i>Show</a></td>";

          divHtml += "</tr>";
        }

        divHtml += "</tbody>";
        document.getElementById("tableSection").innerHTML = divHtml;
        // document.getElementById("reg1").innerHTML = divHtml;

        // <!-- Modal -->
        <div class="modal fade" id="myModal" role="dialog">
          <div class="modal-dialog">
            {/* <!-- Modal content--> */}
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 class="modal-title">Modal Header</h4>
              </div>
              <div class="modal-body">
                <p>Some text in the modal.</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>;
        $("#tableSection tbody").on("click", "#btnModal", function() {
          $("#myModal").modal();
        });
        // $("#table tbody").on("click", "#btnModal", function() {
        //   $("#myModal").modal("show");
        // var rowIndex = $(this).closest("tr");
        // var uid = $.trim(
        //   $(rowIndex)
        //     .find("td:eq(0)")
        //     .text()
        // );
        // console.log(uid);
        // sessionStorage.setItem("ModalData", uid);
        // window.location.replace("/sectionEdit");
        //});
      })
      .catch(error => {
        console.log(error.response);
      });

    // $("#tableSection tbody tr").on("click", "#btnSelect", function() {
    //   debugger;
    //   var rowIndex = $(this).closest("tr");
    // });
  }

  onSubmit() {
    // debugger;
    // var checkedRows = [];
    // var checkedRowId = [];
    // $("#tbody tr").each(function() {
    //   if (
    //     $(this)
    //       .find("input")
    //       .is(":checked")
    //   ) {
    //     checkedRows.push(
    //       $(this)
    //         .find("td:eq(0)")
    //         .text()
    //     );
    //     console.log(checkedRows);
    //   }
    //   if (
    //     $(this)
    //       .find("input")
    //       .is(":checked")
    //   ) {
    //     checkedRowId.push(
    //       $(this)
    //         .find("th:eq(0)")
    //         .text()
    //     );
    //     console.log(checkedRowId);
    //   }
    // });
    // debugger;
    // // for (var i = 0; i < checkedRows.length; i++) {
    // //   const userData = {
    // //     //checkedRows: checkedRows[i],
    // //     checkedRowId: checkedRowId[i]
    // //   };
    // const Template_id = checkedRowId.toString();
    // // parseInt(Template_id, 10);
    // axios
    //   .post("http://localhost:6005/createCategory/getcategoryInfoTemplate", {
    //     params: {
    //       Template_id: Template_id
    //     }
    //   })
    //   .then(response => {
    //     console.log(response);
    //     debugger;
    //     catDataTemp = response.data.categoryLocalData;
    //   })
    //   .catch(error => {
    //     console.log(error.response);
    //   });
  }
  onSubmit1(e) {}

  render() {
    return (
      <div className="container">
        <nav className="main-menu">
          <ul>
            <li>
              <a href="/admin" style={{ marginTop: "30%" }}>
                <i class="fas fa-home fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> Home</b>
                </span>
              </a>
            </li>

            <li>
              <a href="/showQuestions" style={{ marginTop: "10%" }}>
                <i class="fas fa-plus-square fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b> General Questions</b>
                </span>
              </a>
            </li>

            <li style={{ marginTop: "10%" }}>
              <a href="/section">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Section</b>
                </span>
              </a>
            </li>
            <li className="has-subnav" style={{ marginTop: "10%" }}>
              <a href="/category">
                <i class="fas fa-edit fa-2x" />
                <span className=" nav-text" style={{ color: "white" }}>
                  <b>Category</b>
                </span>
              </a>
            </li>
            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/templateSelection">
                <i class="fas fa-edit fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Template</b>
                </span>
              </a>
            </li>

            <li className="dropdown has-subnav" style={{ marginTop: "10%" }}>
              <a href="/registerCustomer">
                <i class="fas fa-user-plus fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Register User</b>
                </span>
              </a>
            </li>
          </ul>

          <ul className="logout">
            <li>
              <a href="#">
                <i className="fa fa-power-off fa-2x" />
                <span className="nav-text" style={{ color: "white" }}>
                  <b>Logout</b>
                </span>
              </a>
            </li>
          </ul>
        </nav>
        <h1>List of all Templates</h1>
        <table
          className="table table-light"
          id="tableSection"
          style={{ marginTop: "5%" }}
        />

        {/* <button
          type="button"
          name="savebtn"
          className="btn btn-primary"
          onClick={() => this.openModal()}
        >
          Show
        </button> */}

        <Modal
          visible={this.state.visible}
          width="300"
          height="250"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div className="col-md-12" id="modalSection" />
          <div className="col-md-12">
            <a
              className="btn btn-primary"
              type="button"
              href="javascript:void(0);"
              onClick={() => this.closeModal()}
            >
              Close
            </a>
          </div>
        </Modal>
      </div>
    );
  }
}

export default templateSelection;
