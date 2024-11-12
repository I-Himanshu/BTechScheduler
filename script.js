const subjects = {
  BIO: {
    fullName: "Biology",
    description: "Biology is the scientific study of life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development, and evolution. It covers a wide range of fields including botany, zoology, and genetics, and it seeks to understand the intricate systems that govern life on Earth."
  },
  SSIC: {
    fullName: "Soft Skills and Interpersonal Communication",
    description: "This course focuses on developing crucial communication skills, both verbal and non-verbal, to enhance interpersonal interactions in professional and personal settings. Topics include public speaking, effective listening, empathy, teamwork, and negotiation, with a strong emphasis on practical exercises to build confidence and social awareness in various situations."
  },
  CS: {
    fullName: "Cyber Security",
    description: "Cyber Security provides an in-depth look at protecting computer systems, networks, and data from digital attacks. This course covers key areas such as risk assessment, threat mitigation, secure software development, cryptography, and network defense strategies. Students will learn to recognize potential vulnerabilities and implement security measures to safeguard against unauthorized access and cyber threats."
  },
  PROJECT: {
    fullName: "Project Work",
    description: "Project Work is a designated time for students to apply theoretical knowledge to real-world challenges through hands-on projects. This activity fosters problem-solving, critical thinking, and project management skills, as students research, design, and execute a project in their chosen field, often culminating in a presentation or final report."
  },
  ERP: {
    fullName: "E-Commerce and ERP (Enterprise Resource Planning)",
    description: "This course explores the fundamentals of E-Commerce, including online business models, digital marketing, and consumer behavior, along with an introduction to ERP systems that integrate essential business processes. Students learn how ERP solutions help organizations streamline operations, improve efficiency, and enhance decision-making by centralizing data across finance, human resources, and supply chain functions."
  },
  SEMINAR: {
    fullName: "Seminar",
    description: "The Seminar is an interactive session where students participate in discussions, presentations, and knowledge-sharing on various topics. It is designed to foster active learning, encourage critical analysis, and provide an opportunity to engage with subject matter experts and peers. Topics vary based on current trends, research, and student interest."
  },
  PE_LAB: {
    fullName: "Professional Elective Lab",
    description: "The Professional Elective Lab is a hands-on, practical component for specialized elective subjects chosen by students. This lab focuses on applying theoretical knowledge in a controlled, experimental environment, allowing students to deepen their expertise and enhance technical skills in areas aligned with their professional goals and interests."
  },
  CISCO: {
    fullName: "CISCO Networking",
    description: "This course introduces students to Cisco networking concepts, covering fundamental aspects of networking such as IP addressing, routing, and switching. Students gain practical skills using Cisco hardware and software, preparing them for industry-recognized certifications like CCNA, which validate their ability to install, configure, and troubleshoot Cisco networks."
  },
  SPOKEN_TUTORIAL: {
    fullName: "Spoken Tutorial",
    description: "The Spoken Tutorial program is a self-learning platform that provides guided tutorials on various technical and non-technical topics. Developed by educational experts, these tutorials allow students to learn at their own pace and cover a broad range of skills, from software tools to programming languages, aiming to enhance self-study capabilities and technical proficiency."
  }
};


// Weekly Routine
const routine = [
  { day: "Monday", periods: ["BIO", "SSIC", "CS", "RECESS", "PROJECT", "PROJECT", "PROJECT"] },
  { day: "Tuesday", periods: ["BIO", "ERP", "SSIC", "RECESS", "SEMINAR", "SEMINAR", "SEMINAR"] },
  { day: "Wednesday", periods: ["PE_LAB", "PE_LAB", "PE_LAB", "RECESS", "PROJECT", "PROJECT", "PROJECT"] },
  { day: "Thursday", periods: ["ERP", "CS", "SSIC", "RECESS", "CISCO", "CISCO", "CISCO"] },
  { day: "Friday", periods: ["SEMINAR", "SEMINAR", "SEMINAR", "RECESS", "SPOKEN_TUTORIAL", "SPOKEN_TUTORIAL", "SPOKEN_TUTORIAL"] },
  { day: "Saturday", periods: ["CS", "BIO", "ERP", "RECESS", "PROJECT", "PROJECT", "PROJECT"] }
];

function populateRoutine() {
  const routineBody = document.getElementById("routineBody");

  routine.forEach(day => {
    const row = document.createElement("tr");
    row.id = day.day;
    const dayCell = document.createElement("td");
    dayCell.textContent = day.day;
    row.appendChild(dayCell);

    day.periods.forEach(subjectCode => {
      const cell = document.createElement("td");
      cell.textContent = subjectCode;

      if (subjectCode === "RECESS") {
        cell.classList.add("recess");
      } else {
        const subjectInfo = subjects[subjectCode];
        cell.addEventListener("mouseover", () => showTooltip(subjectInfo, cell));
        cell.addEventListener("mouseout", hideTooltip);
        cell.addEventListener("click", () => openModal(subjectInfo));
      }

      row.appendChild(cell);
    });

    routineBody.appendChild(row);
  });
}

function showTooltip(subjectInfo, cell) {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";
  tooltip.textContent = `${subjectInfo.fullName} - ${subjectInfo.description}`;
  const rect = cell.getBoundingClientRect();
  tooltip.style.top = `${window.scrollY + rect.top - tooltip.offsetHeight - 10}px`;
  tooltip.style.left = `${window.scrollX + rect.left + (cell.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;
}

function hideTooltip() {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.visibility = "hidden";
  tooltip.style.opacity = "0";
}

function openModal(subjectInfo) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalSyllabus = document.getElementById("modalSyllabus").querySelector("ul");

  modalTitle.textContent = subjectInfo.fullName;
  modalDescription.textContent = subjectInfo.description;

  modalSyllabus.innerHTML = "";
  subjectInfo.syllabus.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    modalSyllabus.appendChild(li);
  });

  modal.style.display = "block";
}
function highlightToday() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = days[new Date().getDay()];
  document.getElementById(today)?.classList.add("today");
}

document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  populateRoutine();
  highlightToday();
});
