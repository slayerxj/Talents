const params = new URLSearchParams(document.location.search);
const personId = params.get("id");

const handleRecentVisitedCookie = () => {
  const MAX_RECENT_VISITED_LIST_LENGTH = 5;
  const cookieString = document.cookie.split("; ").find((row) => row.startsWith("recentVisited="));
  const recentVisited = cookieString ? cookieString.split("=")[1].split(" ") : [];

  if (recentVisited.includes(personId)) {
    const index = recentVisited.indexOf(personId);
    recentVisited.splice(index, 1);
  } else {
    if (recentVisited.length > MAX_RECENT_VISITED_LIST_LENGTH) {
      recentVisited.pop();
    }
  }

  recentVisited.unshift(personId);

  const oneYearLater = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString();
  document.cookie = `recentVisited=${recentVisited.join(" ")}; Expires=${oneYearLater}`;
};

if (!personId) {
  throw err("No id");
}

fetch("/api/person?id=" + personId)
  .then((res) => res.json())
  .then((data) => {
    handleRecentVisitedCookie();
    const a = data[0];
    document.getElementById("lastName").value = a.lastName;
    document.getElementById("firstName").value = a.firstName;
    document.getElementById("company").value = a.companyName;
    document.getElementById("company").onclick = () => {
      document.location.href = `/company?id=${a.company}`;
    };
    document.getElementById("email").value = a.email;
    document.getElementById("email").onclick = () => {
      document.location.href = "mailto:" + a.email;
    };
    document.getElementById("gender").value = a.gender === "male" ? "男" : "女";
    document.getElementById("mobile").value = a.mobilePhone;
    document.getElementById("salary").value = a.salary;

    const c = JSON.parse(a.communication);
    if (c) {
      const logs = document.getElementById("communication-log");
      c.forEach((comment) => {
        const b = document.createElement("textarea");
        b.className = "fd-textarea";
        b.setAttribute("readonly", true);
        b.value = comment;
        logs.appendChild(b);
      });
    }

    if (a.resume) {
      const b = document.createElement("a");
      b.href = "/files/" + a.resume;
      b.innerText = a.resume;
      const c = document.getElementById("resume");
      c.appendChild(b);
    }
  })
  .catch((err) => console.log(err));
