let items = [];

function addItem() {
    const name = document.getElementById("item").value;
    const price = parseFloat(document.getElementById("price").value);
    const qty = parseInt(document.getElementById("qty").value);

    if (!name || isNaN(price) || isNaN(qty)) {
        alert("Enter valid item details");
        return;
    }

    const total = price * qty;
    items.push({ name, price, qty, total });

    renderTable();
}

function renderTable() {
    const tbody = document.querySelector("#billTable tbody");
    tbody.innerHTML = "";

    let grandTotal = 0;
    items.forEach(item => {
        grandTotal += item.total;
        const row = `<tr>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.qty}</td>
      <td>${item.total}</td>
    </tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}

async function saveAndPrintBill() {
    const customer = document.getElementById("customerName").value;

    const billData = {
        bill: {
            total_net_amount: items.reduce((sum, i) => sum + i.total, 0),
            discount: 0,
            total_payable_value: items.reduce((sum, i) => sum + i.total, 0),
        },
        items
    };

    // send to backend
    const res = await fetch("http://localhost:3001/api/bill/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billData),
    });

    const data = await res.json();
    console.log("Bill Saved:", data);
    alert("Bill saved successfully!");
}
