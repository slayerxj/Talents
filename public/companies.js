fetch("/api/companies")
  .then((res) => res.json())
  .then((data) => {
    var table = document.getElementById("main");
    data.forEach((datam) => {
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = datam.name;
        cell2.innerHTML = datam.phone;
    })
  })
  .catch((err) => console.log(err));
