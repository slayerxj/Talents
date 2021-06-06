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
    const person = data[0];
    document.getElementById("lastName").value = person.lastName;
    document.getElementById("firstName").value = person.firstName;
    document.getElementById("company").value = person.companyName;
    document.getElementById("company").onclick = () => {
      document.location.href = `/company?id=${person.company}`;
    };
    document.getElementById("email").value = person.email;
    document.getElementById("email").onclick = () => {
      document.location.href = "mailto:" + person.email;
    };
    document.getElementById("gender").value = person.gender === "male" ? "男" : "女";
    document.getElementById("mobile").value = person.mobilePhone;
    document.getElementById("salary").value = person.salary;

    const communicationLogs = JSON.parse(person.communication);
    if (communicationLogs) {
      const logs = document.getElementById("communication-log");
      communicationLogs.forEach((comment) => {
        const logArea = document.createElement("textarea");
        logArea.className = "fd-textarea";
        logArea.setAttribute("readonly", true);
        logArea.value = comment;
        logs.appendChild(logArea);
      });
    }

    if (person.resume) {
      const resumeDownload = document.createElement("a");
      resumeDownload.href = "/files/" + person.resume;
      resumeDownload.innerText = person.resume;
      const resumeDiv = document.getElementById("resume");
      resumeDiv.appendChild(resumeDownload);
    }
  })
  .catch((err) => console.log(err));
