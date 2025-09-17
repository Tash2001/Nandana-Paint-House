const API_BASE = "http://localhost:3001/api/inventory";

async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }
  return res.json();
}

const getSuppliers = () => fetchData("suppliers");
const getBrands = () => fetchData("brands");
const getUnits = () => fetchData("units");
const getCategories = () => fetchData("category");
const getSubcategories = () => fetchData("sub-category");
const getColors = () => fetchData("colors");
const getProducts = () => fetchData("products");
const getProductById = (id) => fetchData(`products/${id}`);
const getStock = () => fetchData("stock");
const getTransactions = () => fetchData("transactions");

//===================================================Saving and Updating=======================================

async function saveEntity(endpoint, formId, idField = "id") {
  const form = document.getElementById(formId);
  const formData = new FormData(form);

  // Convert to plain object
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Preserve foreign keys if empty
  [
    "brand_id",
    "supplier_id",
    "unit_id",
    "category_id",
    "subcategory_id",
    "color_id",
  ].forEach((key) => {
    if (data[key] === "" && form.elements[key]?.dataset.original) {
      data[key] = form.elements[key].dataset.original;
    }
  });

  // Decide POST vs PUT
  const entityId = data[idField];
  const method = entityId ? "PUT" : "POST";
  const url = entityId
    ? `${API_BASE}/${endpoint}/${entityId}`
    : `${API_BASE}/${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to save ${endpoint}: ${res.status}`);
  }

  return res.json();
}

//===================================================DELETING=======================================

async function deleteEntity(endpoint, id) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete ${endpoint}: ${res.status}`);
  }

  return res.json();
}

//===================================================EDIT=======================================

async function editEntity(endpoint, id, formId, modalId) {
  // Fetch single item
  const res = await fetch(`${API_BASE}/${endpoint}/${id}`);
  if (!res.ok)
    throw new Error(`Failed to fetch ${endpoint} item: ${res.status}`);
  const data = await res.json();

  // Populate text/number inputs
  const form = document.getElementById(formId);
  Object.keys(data).forEach((key) => {
    if (
      form.elements[key] &&
      ![
        "brand_id",
        "supplier_id",
        "unit_id",
        "category_id",
        "subcategory_id",
        "color_id",
      ].includes(key)
    ) {
      form.elements[key].value = data[key] ?? "";
    }
  });

  // Populate dropdowns with current value selected
  await populateSelect("brand_id", getBrands, "id", "name", data.brand_id);
  await populateSelect(
    "supplier_id",
    getSuppliers,
    "id",
    "name",
    data.supplier_id
  );
  await populateSelect("unit_id", getUnits, "id", "name", data.unit_id);
  await populateSelect(
    "category_id",
    getCategories,
    "id",
    "name",
    data.category_id
  );
  await populateSelect(
    "subcategory_id",
    getSubcategories,
    "id",
    "name",
    data.subcategory_id
  );
  await populateSelect("color_id", getColors, "id", "name", data.color_id);

  // Show modal
  const modalEl = document.getElementById(modalId);
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}
