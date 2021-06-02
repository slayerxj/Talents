const params = new URLSearchParams(document.location.search);
const s = params.get("id");

fetch("/api/company?id=" + s)
  .then((res) => res.json())
  .then((data) => {
    const a = data[0];

    document.getElementById("name").value = a.name;
    document.getElementById("url").value = a.url;
    document.getElementById("url").onclick = () => {
      window.open(a.url, "_blank");
    };
  })
  .catch((err) => console.log(err));
