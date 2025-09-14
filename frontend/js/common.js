//=========================== LIBRARIES ===========================
const libs = [
  "../js/libs/jquery.min.js",
  "../js/libs/datatables.min.js",
  "../js/libs/bootstrap.bundle.min.js",
  "../js/fetch.js",
];

libs.forEach((src) => {
  const script = document.createElement("script");
  script.src = src;
  document.body.appendChild(script);
});

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
