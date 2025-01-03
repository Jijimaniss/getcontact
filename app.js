const form = document.getElementById("myForm"),
    imgInput = document.querySelector(".imgholder img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem("userProfile")
    ? JSON.parse(localStorage.getItem("userProfile"))
    : [];

let isEdit = false,
    editId;

showInfo();

newUserBtn.addEventListener("click", () => {
    submitBtn.innerText = "Submit";
    isEdit = false;
    imgInput.src = "img/profile.png";
    form.reset();
});

file.onchange = function () {
    if (file.files[0].size < 1000000) {
        // 1MB = 1000000 bytes
        const fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgInput.src = e.target.result;
        };

        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("This file is too large!");
    }
};

function showInfo() {
    document.querySelectorAll(".employeeDetails").forEach((info) => info.remove());
    getData.forEach((element, index) => {
        const createElement = `
        <tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="Profile" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash3"></i></button>
            </td>
        </tr>`;
        userInfo.innerHTML += createElement;
    });
}

function readInfo(pic, name, age, city, email, phone, post, sDate) {
    document.querySelector(".showImg").src = pic;
    document.querySelector("#showName").value = name;
    document.querySelector("#showAge").value = age;
    document.querySelector("#showCity").value = city;
    document.querySelector("#showEmail").value = email;
    document.querySelector("#showPhone").value = phone;
    document.querySelector("#showPost").value = post;
    document.querySelector("#showsDate").value = sDate;
}

function editInfo(index, pic, name, Age, City, Email, Phone, Post, SDate) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    userName.value = name;
    age.value = Age;
    city.value = City;
    email.value = Email;
    phone.value = Phone;
    post.value = Post;
    sDate.value = SDate;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update the Form";
}

function deleteInfo(index) {
    if (confirm("Are you sure you want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src === undefined ? "img/profile.png" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value,
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem("userProfile", JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";

    showInfo();

    form.reset();
    imgInput.src = "img/profile.png";

    const modalBackdrop = document.querySelector(".modal-backdrop");
    if (modalBackdrop) modalBackdrop.remove();
});
