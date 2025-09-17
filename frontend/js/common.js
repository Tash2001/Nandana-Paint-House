//=========================== LIBRARIES ===========================

//=========================== SIDEBAR ============================
// Load sidebar component dynamically
let sidebarPath = "components/sidebar.html";

// If page is inside pages folder
if (window.location.pathname.includes("/pages/")) {
  sidebarPath = "../components/sidebar.html";
}

fetch(sidebarPath)
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("sidebar-container").innerHTML = html;

    // Add click handlers after sidebar is loaded
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const page = this.dataset.page;
        window.location.href = `pages/${page}.html`;
      });
    });
  });

//===========================================================================================================================

//=========================================================TOAST NORTIFICATION==================================================================

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
  toast.style.zIndex = 9999;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
//===========================================================================================================================

//=========================================================LOADING SCREEN==================================================================
function showLoading() {
  document.getElementById("loadingOverlay").style.display = "flex";
}
function hideLoading() {
  document.getElementById("loadingOverlay").style.display = "none";
}
