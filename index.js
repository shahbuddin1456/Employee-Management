/** @format */

/* start a control coding */

let registerForm = document.querySelector("#register-form");
let allInput = registerForm.querySelectorAll("INPUT");
let addBtn = document.querySelector("#add-btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function () {
  modal.classList.add("active");
};

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  console.log("close");
  let i;
  for (i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
});

/* start a global varibale*/
let userData = [];
let profile_pic = document.querySelector("#profile-pic");
let uploadPic = document.querySelector("#upload-field");
let idE1 = document.getElementById("id");
let nameE1 = document.querySelector("#f-name");
let l_nameE1 = document.querySelector("#l-name");
let emailE1 = document.querySelector("#email");
let officeE1 = document.querySelector("#office-code");
let jobTitleE1 = document.querySelector("#job-title");
let registerBtn = document.querySelector("#register-btn");
let updateBtn = document.querySelector("#update-btn");
let imgUrl;
/* end all global varibale*/

/* start register coding */

registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registerForm.reset("");
  closeBtn.click();
};

if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData() {
  userData.push({
    id: idE1.value,
    name: nameE1.value,
    l_name: l_nameE1.value,
    email: emailE1.value,
    officeCode: officeE1.value,
    jobTitle: jobTitleE1.value,
    profilePic: imgUrl == undefined ? "./imgaes/avtar.jpg" : imgUrl,
  });
  let userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration Done!!", "success");
}

/* Start returning data on page from localStorage*/

let tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
    <tr index='${index}'>
    <td class="hide-on-tablet hide-on-Mobile">${index + 1}</td>
    <td class="hide-on-Mobile"><img src="${data.profilePic}" width="40"></td>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td class="hide-on-tablet hide-on-Mobile">${data.l_name}</td>
    <td class="hide-on-tablet hide-on-Mobile">${data.email}</td>
    <td class="hide-on-tablet hide-on-Mobile">${data.officeCode}</td>
    <td class="hide-on-Mobile">${data.jobTitle}</td>
    <td>
        <button class="edit-btn"><i class="fa fa-eye"></i></button>
        <button class="del-btn" style="background-color: #ef534f;"><i class="fa fa-trash"></i></button>
    </td>
</tr>
    `;
  });

  /* start delete coding*/

  let i;
  let allDelBtn = document.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }

  /* Start update Coding */

  let allEdit = document.querySelectorAll(".edit-btn");
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("TD");
      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("IMG");
      let profilePic = imgTag[0].src;
      let id = td[2].innerHTML;
      let name = td[3].innerHTML;
      let l_name = td[4].innerHTML;
      let email = td[5].innerHTML;
      let officeCode = td[6].innerHTML;
      let jobTitle = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idE1.value = id;
      nameE1.value = name;
      l_nameE1.value = l_name;
      emailE1.value = email;
      officeE1.value = officeCode;
      jobTitleE1.value = jobTitle;
      profile_pic.src = profilePic;
      updateBtn.onclick = function (e) {
        userData[index] = {
          id: idE1.value,
          name: nameE1.value,
          l_name: l_nameE1.value,
          email: emailE1.value,
          officeCode: officeE1.value,
          jobTitle: jobTitleE1.value,
          profilePic: uploadPic.value == "" ? profile_pic.src : imgUrl,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      };
    };
  }
};
getDataFromLocal();

/* image processing code*/

uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    let fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profile_pic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File Size Is To Long");
  }
};

/* Search Coding*/

let searchE1 = document.querySelector("#empId");
searchE1.oninput = function () {
  searchFuc();
};

function searchFuc() {
  let tr = tableData.querySelectorAll("TR");
  let filter = searchE1.value.toLowerCase();
  let i;
  for (i = 0; i < tr.length; i++) {
    let id = tr[i].getElementsByTagName("TD")[2].innerHTML;
    let name = tr[i].getElementsByTagName("TD")[3].innerHTML;
    let l_name = tr[i].getElementsByTagName("TD")[4].innerHTML;
    let email = tr[i].getElementsByTagName("TD")[5].innerHTML;
    let officeCode = tr[i].getElementsByTagName("TD")[6].innerHTML;
    let jobTitle = tr[i].getElementsByTagName("TD")[7].innerHTML;
    if (id.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (l_name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (email.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (officeCode.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (jobTitle.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

/* Start Clear All Data*/

let delAllBtn = document.querySelector("#del-all-btn");
let delAllBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener("click", () => {
  if (delAllBox.checked == true) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("userData");
        window.location = location.href;
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  } else {
    swal("Check The Box!", "Please Check the box to delete data", "warning");
  }
});
