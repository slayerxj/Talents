const params = new URLSearchParams(document.location.search);
const s = params.get("id");

if (s) {
  fetch("/api/person?id=" + s)
    .then((res) => res.json())
    .then((data) => {
      const a = data[0];
      document.getElementById("lastName").value = a.lastName;
      document.getElementById("firstName").value = a.firstName;
      document.getElementById("company").value = a.companyName;
      document.getElementById("company").onclick = () => {
        document.location.href = `/company?id=${a.company}`;
      }
      document.getElementById("email").value = a.email;
      document.getElementById("email").onclick = () => {
        document.location.href = "mailto:" + a.email;
      }
      document.getElementById("gender").value = a.gender;
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
        b.innerText = a.resume;
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

  const applyButton = document.getElementById('apply-person');
  applyButton.style.visibility = "visible";

  applyButton.onclick = () => {
    const data = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      mobilePhone: document.getElementById('mobile').value,
      gender: document.getElementById('gender').value,
    };

    fetch('/api/persons', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
