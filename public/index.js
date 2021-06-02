const recentVisited = ["1167", "1166bedd-bfdb-457b-a533-f6e76a103eed", "1168"];
const table = document.getElementById("recent-tbody");
recentVisited.forEach((item) => {
  fetch("/api/person?id=" + item)
    .then((res) => res.json())
    .then((data) => {
      const a = data[0];
      const row = document.createElement("tr");
      row.className = "fd-table__row";

      row.onclick = () => {
        document.location.href = `/person?id=${a.uuid}`;
      }

      const content = [
        a.lastName + a.firstName,
        a.title,
        a.companyName,
        a.salary,
        new Date(a.lastModified).toLocaleString(),
      ];
      content.forEach((datum) => {
        const cell = document.createElement("td");
        cell.className = "fd-table__cell";
        cell.innerHTML = datum;
        row.appendChild(cell);
      });
      table.appendChild(row);
    })
    .catch((err) => console.log(err));
});
