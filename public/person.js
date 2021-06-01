const params = new URLSearchParams(document.location.search);
const s = params.get("id");

if (s) {
  fetch("/api/person?id=" + s)
    .then((res) => res.json())
    .then((data) => {
      const a = data[0];
      let firstName = a.firstName
      if (!a.firstName) {
        firstName = a.gender === "male" ? "先生" : "女士";
      }
      document.getElementById("name").value = a.lastName + firstName;
      document.getElementById("company").value = a.companyName;
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
      const c = JSON.parse(a.communication);
      const logs = document.getElementById("communication-log");
      c.forEach((comment) => {
        const b = document.createElement("textarea");
        b.value = comment;
        logs.appendChild(b);
      });

      if (a.resume) {
        const b = document.createElement("a");
        b.href = "/files/" + a.resume;
        b.value = a.resume;
        const c = document.getElementById("resume");
        c.appendChild(b);
      }
    })
    .catch((err) => console.log(err));
} else {
  const cells = document.getElementsByTagName('input');

  for (let cell of cells) {
    cell.removeAttribute("readonly")
  }
}
