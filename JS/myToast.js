function myToast(message, type = "information") {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  switch (type) {
    case "success":
      toast.classList.add("success");
      break;

    case "error":
      toast.classList.add("error");
      break;
  }

  const toastContainer = document.querySelector("aside");
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
//rende la funzione globale, senza import/export
window.myToast = myToast;
