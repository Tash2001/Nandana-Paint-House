//===========================================LIBRARIES============================================================

// Import jQuery
document.write('<script src="js/libs/jquery.min.js"></script>');
// Import Bootstrap
document.write('<script src="js/libs/bootstrap.bundle.min.js"></script>');
// Import DataTables
document.write('<script src="js/libs/datatables.min.js"></script>');
// Import Fetch.js
document.write('<script src="js/fetch.js"></script>');

//===========================================SIDE BAR==================================================================
 // Load sidebar component dynamically
    fetch("components/sidebar.html")
      .then(res => res.text())
      .then(html => document.getElementById("sidebar-container").innerHTML = html);


//routing pages

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', async function() {
    const page = this.dataset.page;
    const res = await fetch(`${page}.html`);
    const html = await res.text();
    document.getElementById('main-content').innerHTML = html;
    // Optionally re-run any JS needed for DataTable or modals
  });
});


//===========================================================================================================================
