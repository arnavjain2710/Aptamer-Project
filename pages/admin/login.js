// let jwt = localStorage.getItem("jwt");
// if (jwt != null) {
//   window.location.href = "./admin.html";
// }

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("my-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const formData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    console.log(formData);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://aptabase.shuttleapp.rs/auth/login");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        email: username,
        password: password,
      })
    );

    console.log(xhttp.responseText);



    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //       const objects = JSON.parse(this.responseText);
    //       console.log(objects);
    //       if (objects['status'] == 'ok') {
    //         localStorage.setItem("jwt", objects['accessToken']);
    //         Swal.fire({
    //           text: objects['message'],
    //           icon: 'success',
    //           confirmButtonText: 'OK'
    //         }).then((result) => {
    //           if (result.isConfirmed) {
    //             window.location.href = '../../index.html';
    //           }
    //         });
    //       } else {
    //         Swal.fire({
    //           text: objects['message'],
    //           icon: 'error',
    //           confirmButtonText: 'OK'
    //         });
    //       }
    //     }
    //   };
    //  
  });
});
