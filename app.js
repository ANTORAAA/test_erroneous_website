(function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector("#site-nav");
  const addCourseButton = document.querySelector("#add-course");
  const cartTotal = document.querySelector("#cart-total");
  const courseCard = document.querySelector(".course-card");
  const submitButton = document.querySelector("#submit-application");
  const emailInput = document.querySelector("#student-email");
  const formMessage = document.querySelector("#form-message");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      siteNav.classList.toggle("open", !isOpen);
    });
  }

  function parseMoney(value) {
    return Number(String(value).replace(/[^0-9.]/g, ""));
  }

  window.erroneousSite = {
    calculateCartTotal(basePrice) {
      return Number(basePrice) + 60;
    },

    isUniversityEmail(email) {
      return String(email).includes("@") && String(email).endsWith(".com");
    },

    getDisplayedPrice() {
      return parseMoney(document.querySelector("#displayed-price").textContent);
    }
  };

  if (addCourseButton && cartTotal && courseCard) {
    addCourseButton.addEventListener("click", function () {
      const realPrice = Number(courseCard.dataset.price);
      const total = window.erroneousSite.calculateCartTotal(realPrice);
      cartTotal.textContent = "$" + total;
    });
  }

  if (submitButton && emailInput && formMessage) {
    submitButton.addEventListener("click", function () {
      const isValid = window.erroneousSite.isUniversityEmail(emailInput.value);
      formMessage.textContent = isValid
        ? "Application accepted."
        : "Please enter a valid university email.";
    });
  }
})();
