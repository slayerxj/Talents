const asdfa = document.cookie.split("; ").find((row) => row.startsWith("recentVisited="));
const recentVisited = asdfa ? asdfa.split("=")[1].split(" ") : [];

const insertPersonToTable = (person, tableName) => {
  const table = document.getElementById(tableName);
  const row = document.createElement("tr");
  row.className = "fd-table__row";

  row.onclick = () => {
    document.location.href = `/person?id=${person.uuid}`;
  };

  const content = [
    person.lastName + person.firstName,
    person.title,
    person.companyName,
    person.salary,
    new Date(person.lastModified).toLocaleString(),
  ];
  content.forEach((datum) => {
    const cell = document.createElement("td");
    cell.className = "fd-table__cell";
    cell.innerHTML = datum;
    row.appendChild(cell);
  });
  table.appendChild(row);
};

recentVisited.forEach((item) => {
  fetch("/api/person?id=" + item)
    .then((res) => res.json())
    .then((data) => {
      const person = data[0];
      insertPersonToTable(person, "recent-tbody");
    })
    .catch((err) => console.log(err));
});

const clearLastResult = () => {
  var table = document.getElementById("search-result-table");
  var rowCount = table.rows.length;
  for (var x = rowCount - 1; x > 0; x--) {
    table.deleteRow(x);
  }
};

const searchBox = document.getElementById("search-box");
searchBox.onkeyup = (event) => {
  if (event.key === "Enter") {
    console.log(`search ${searchBox.value}`);
    fetch("/api/person?name=" + searchBox.value)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length) {
          clearLastResult();
          document.getElementById("search-result").style.display = "block";
          data.forEach((person) => {
            insertPersonToTable(person, "result-tbody");
          });
        } else {
          // "没有搜到任何结果！"
        }
      })
      .catch((err) => console.log(err));
  }
};
