const asdfa = document.cookie.split("; ").find((row) => row.startsWith("recentVisited="));
const recentVisited = asdfa ? asdfa.split("=")[1].split(" ") : [];
const table = document.getElementById("recent-tbody");
recentVisited.forEach((item) => {
  fetch("/api/person?id=" + item)
    .then((res) => res.json())
    .then((data) => {
      const person = data[0];
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
    })
    .catch((err) => console.log(err));
});
