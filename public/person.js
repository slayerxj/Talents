const params = new URLSearchParams(document.location.search);
const s = params.get("id");

fetch("/api/person?id=" + s)
  .then((res) => res.json())
  .then((data) => {
    const a = data[0];
    let firstName = a.firstName
    if (!a.firstName) {
      firstName = a.gender === "male" ? "先生" : "女士";
    }
    document.getElementById("name").value = a.lastName + firstName;
    document.getElementById("company").value = a.company;
    document.getElementById("company").onclick = () => {
      document.location.href = `/company?id=${a.company}`;
    }
    document.getElementById("email").value = a.email;
    document.getElementById("email").onclick = () => {
      document.location.href = "mailto:" + a.email;
    }
    document.getElementById("gender").value = a.gender === "male" ? "男" : "女";
    document.getElementById("mobile").value = a.mobilePhone;
    document.getElementById("salary").value = a.salary;
  })
  .catch((err) => console.log(err));
