   // === course.js ===

// Array of course objects
const courses = [
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: true },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];
const container = document.getElementById("courseCards");
const totalCreditsDisplay = document.getElementById("totalCredits");

function displayCourses(list) {
  container.innerHTML = "";
  let totalCredits = list.reduce((sum, course) => sum + course.credits, 0);

  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course");
    if (course.completed) card.classList.add("completed");
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>${course.credits}</strong> Credits</p>
    `;
    container.appendChild(card);
  });

  totalCreditsDisplay.textContent = `Total Credits: ${totalCredits}`;
}

displayCourses(courses);

// === Filtering Buttons ===
document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.prefix === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.prefix === "CSE")));
