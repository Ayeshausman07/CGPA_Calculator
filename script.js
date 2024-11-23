const courseContainer = document.getElementById("course-container");
const addCourseBtn = document.getElementById("add-course");
const calculateBtn = document.getElementById("calculate");
const resultDiv = document.getElementById("result");
const cgpaSpan = document.getElementById("cgpa");

// Add a new course input row
addCourseBtn.addEventListener("click", () => {
    const row = document.createElement("div");
    row.classList.add("row", "mb-3", "fade-in");
    row.innerHTML = `
        <div class="col-md-5">
            <input type="text" class="form-control" placeholder="Course Name">
        </div>
        <div class="col-md-3">
            <input type="number" class="form-control grade" placeholder="Grade (0-4.0)" step="0.01" min="0" max="4">
        </div>
        <div class="col-md-3">
            <input type="number" class="form-control credit" placeholder="Credits" step="0.5" min="0">
        </div>
        <div class="col-md-1">
            <button class="btn btn-danger w-100 remove-course">-</button>
        </div>
    `;
    courseContainer.appendChild(row);
});

// Remove a course input row
courseContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-course")) {
        const row = event.target.closest(".row");
        courseContainer.removeChild(row);
    }
});

// Calculate CGPA
calculateBtn.addEventListener("click", () => {
    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");
    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((gradeInput, index) => {
        const grade = parseFloat(gradeInput.value);
        const credit = parseFloat(credits[index].value);

        if (!isNaN(grade) && !isNaN(credit)) {
            totalPoints += grade * credit;
            totalCredits += credit;
        }
    });

    if (totalCredits === 0) {
        alert("Please enter valid grades and credits.");
        return;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);
    cgpaSpan.textContent = cgpa;
    resultDiv.classList.remove("d-none");
});