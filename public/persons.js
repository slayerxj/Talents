fetch("/api/persons")
  .then((res) => res.json())
  .then((data) => {
    const div = document.getElementById("main");
    data.forEach((datum) => {
      const nameDiv = document.createElement("div");
      nameDiv.onclick = () => {
        document.location.href = `/person?id=${datum.uuid}`;
      }

      let firstName = datum.firstName
      if (!datum.firstName) {
        firstName = datum.gender === "male" ? "先生" : "女士";
      }

      nameDiv.innerHTML = (datum.lastName ? datum.lastName : "") + firstName;
      div.appendChild(nameDiv);

      const comDiv = document.createElement("div");
      comDiv.innerHTML = datum.companyName ? datum.companyName : datum.company;
      div.appendChild(comDiv);
    })
  })
  .catch((err) => console.log(err));
