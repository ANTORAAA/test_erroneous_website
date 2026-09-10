(function () {
  const frame = document.querySelector("#site-frame");
  const resultsBody = document.querySelector("#results-body");
  const passedCount = document.querySelector("#passed-count");
  const failedCount = document.querySelector("#failed-count");

  function moneyFromText(value) {
    return Number(String(value).replace(/[^0-9.]/g, ""));
  }

  function render(results) {
    const passed = results.filter((result) => result.passed).length;
    const failed = results.length - passed;

    passedCount.textContent = passed;
    failedCount.textContent = failed;
    resultsBody.innerHTML = results
      .map(function (result) {
        const status = result.passed ? "PASS" : "FAIL";
        const className = result.passed ? "pass" : "fail";

        return `
          <tr>
            <td>${result.name}</td>
            <td>${result.expected}</td>
            <td>${result.actual}</td>
            <td><span class="status ${className}">${status}</span></td>
          </tr>
        `;
      })
      .join("");
  }

  function runTests() {
    const siteWindow = frame.contentWindow;
    const siteDocument = frame.contentDocument;
    const previewImage = siteDocument.querySelector(".broken-preview");
    const courseCard = siteDocument.querySelector(".course-card");
    const addButton = siteDocument.querySelector("#add-course");
    const cartTotal = siteDocument.querySelector("#cart-total");
    const displayedPrice = siteWindow.erroneousSite.getDisplayedPrice();
    const storedPrice = Number(courseCard.dataset.price);

    addButton.click();

    const results = [
      {
        name: "Page title is available",
        expected: "Browser title should contain Error Demo.",
        actual: siteDocument.title,
        passed: siteDocument.title.includes("Error Demo")
      },
      {
        name: "Main heading is visible",
        expected: "The tested page should have one main heading.",
        actual: siteDocument.querySelectorAll("h1").length + " h1 element found",
        passed: siteDocument.querySelectorAll("h1").length === 1
      },
      {
        name: "Application form labels exist",
        expected: "Each input should have a matching label.",
        actual: siteDocument.querySelectorAll("label[for]").length + " labels found",
        passed: siteDocument.querySelectorAll("label[for]").length >= 3
      },
      {
        name: "Invalid email is rejected",
        expected: "student.example.edu should be rejected.",
        actual: siteWindow.erroneousSite.isUniversityEmail("student.example.edu") ? "Accepted" : "Rejected",
        passed: siteWindow.erroneousSite.isUniversityEmail("student.example.edu") === false
      },
      {
        name: "Apply navigation target works",
        expected: "The Apply Now button should point to an existing section.",
        actual: siteDocument.querySelector("#enroll-now") ? "Target exists" : "Target missing",
        passed: Boolean(siteDocument.querySelector("#enroll-now"))
      },
      {
        name: "Course preview image loads",
        expected: "The course preview image should load successfully.",
        actual: previewImage.complete && previewImage.naturalWidth > 0 ? "Image loaded" : "Image broken",
        passed: previewImage.complete && previewImage.naturalWidth > 0
      },
      {
        name: "Displayed price matches stored price",
        expected: "$" + storedPrice,
        actual: "$" + displayedPrice,
        passed: displayedPrice === storedPrice
      },
      {
        name: "Cart total equals course fee",
        expected: "$" + storedPrice,
        actual: cartTotal.textContent,
        passed: moneyFromText(cartTotal.textContent) === storedPrice
      },
      {
        name: "University email is accepted",
        expected: "student@example.edu should be accepted.",
        actual: siteWindow.erroneousSite.isUniversityEmail("student@example.edu") ? "Accepted" : "Rejected",
        passed: siteWindow.erroneousSite.isUniversityEmail("student@example.edu") === true
      }
    ];

    render(results);
  }

  frame.addEventListener("load", function () {
    setTimeout(runTests, 150);
  });
})();
