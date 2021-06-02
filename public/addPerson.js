const applyButton = document.getElementById("submit");
applyButton.style.visibility = "visible";

applyButton.onclick = () => {
  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    gender: document.getElementById("pDidh767").checked ? "male" : "female",
    mobilePhone: document.getElementById("mobilePhone").value,
    email: document.getElementById("email").value,
    company: document.getElementById("company").value,
    title: document.getElementById("title").value,
    salary: document.getElementById("salary").value,
    education: document.getElementById("education").value,
    graduatedSchool: document.getElementById("graduatedSchool").value,
  };

  fetch("/api/persons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      window.open("person?id=" + data.id, "_self");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
