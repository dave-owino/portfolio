/* Start of contact.js */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.getElementById("sendMessageButton"); // Target the button

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Disable button to prevent double-submissions
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validation Logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !emailRegex.test(email) || !message) {
      showMessage("Please check your details and try again.", "#FFD700");
      resetButton();
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        showMessage("Success! Message sent to David.", "#00d4ff");
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      showMessage("Server error. Please try again later.", "#FFD700");
    } finally {
      // Re-enable button after process finishes
      resetButton();
    }
  });

  function showMessage(text, color) {
    successMessage.innerText = text;
    successMessage.style.color = color;
    successMessage.style.display = "block";
    setTimeout(() => { successMessage.style.display = "none"; }, 5000);
  }

  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Message";
  }
});
/* End of contact.js */