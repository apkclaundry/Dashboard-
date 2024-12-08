// Harga per kilogram berdasarkan jenis layanan
const servicePrices = {
  "cuci-setrika": 10000,
  "cuci": 6000,
  "setrika": 4000,
};

// Hitung total harga
document.getElementById('calculate-btn').addEventListener('click', function () {
  const serviceType = document.getElementById('service-type').value;
  const weightInput = document.getElementById('weight').value;
  const weight = parseFloat(weightInput);

  if (isNaN(weight) || weight <= 0) {
    alert('Masukkan berat yang valid!');
    return;
  }

  // Ambil harga per kg berdasarkan jenis layanan
  const pricePerKg = servicePrices[serviceType];
  const totalPrice = Math.ceil(weight * pricePerKg);

  // Tampilkan total harga
  document.getElementById('total-price').value = `Rp${totalPrice.toLocaleString('id-ID')}`;
});

// Simpan data ke local storage
document.getElementById('save-btn').addEventListener('click', function () {
  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const service = document.getElementById('service-type').value;
  const weight = document.getElementById('weight').value;
  const totalPrice = document.getElementById('total-price').value;

  if (!name || !phone || !service || !weight || !totalPrice) {
    alert('Harap isi semua data sebelum menyimpan!');
    return;
  }

  const order = { name, phone, service, weight, totalPrice };

  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Tampilkan data terbaru
  displayOrders();

  // Reset form
  document.getElementById('order-form').reset();
  document.getElementById('total-price').value = '';
});

// Fungsi untuk menampilkan data dari local storage
function displayOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const tableBody = document.querySelector('#order-table tbody');
  const orderList = document.querySelector('.order-list');

  tableBody.innerHTML = '';
  orderList.innerHTML = '';

  orders.forEach((order, index) => {
    // Tambahkan data ke tabel
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.name}</td>
      <td>${order.phone}</td>
      <td>${order.service}</td>
      <td>${order.weight}</td>
      <td>${order.totalPrice}</td>
      <td>
        <button class="edit" onclick="editOrder(${index})">Edit</button>
        <button class="delete" onclick="deleteOrder(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);

    // Tambahkan data ke list
    const listItem = document.createElement('div');
    listItem.classList.add('order-item');
    listItem.innerHTML = `
      <p><strong>Nama Pelanggan:</strong> ${order.name}</p>
      <p><strong>Nomor Telepon:</strong> ${order.phone}</p>
      <p><strong>Jenis Layanan:</strong> ${order.service}</p>
      <p><strong>Berat (KG):</strong> ${order.weight}</p>
      <p><strong>Total Harga:</strong> ${order.totalPrice}</p>
      <div class="actions">
        <button class="edit" onclick="editOrder(${index})">Edit</button>
        <button class="delete" onclick="deleteOrder(${index})">Delete</button>
      </div>
    `;
    orderList.appendChild(listItem);
  });
}

// Fungsi untuk mengedit data pesanan
function editOrder(index) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const order = orders[index];

  // Mengisi data ke form
  document.getElementById('customer-name').value = order.name;
  document.getElementById('customer-phone').value = order.phone;
  document.getElementById('service-type').value = order.service;
  document.getElementById('weight').value = order.weight;
  document.getElementById('total-price').value = order.totalPrice;

  // Menghapus pesanan lama dan menyimpan pesanan baru
  document.getElementById('save-btn').onclick = function () {
    const updatedOrder = {
      name: document.getElementById('customer-name').value,
      phone: document.getElementById('customer-phone').value,
      service: document.getElementById('service-type').value,
      weight: document.getElementById('weight').value,
      totalPrice: document.getElementById('total-price').value
    };

    if (!updatedOrder.name || !updatedOrder.phone || !updatedOrder.service || !updatedOrder.weight || !updatedOrder.totalPrice) {
      alert('Harap isi semua data sebelum menyimpan!');
      return;
    }

    orders[index] = updatedOrder; // Update order data
    localStorage.setItem('orders', JSON.stringify(orders));

    // Tampilkan data terbaru
    displayOrders();

    // Reset form
    document.getElementById('order-form').reset();
    document.getElementById('total-price').value = '';
  };
}

// Fungsi untuk menghapus data pesanan
function deleteOrder(index) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.splice(index, 1); // Menghapus item berdasarkan index
  localStorage.setItem('orders', JSON.stringify(orders));

  // Tampilkan data terbaru
  displayOrders();
}

// Panggil fungsi untuk menampilkan data saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayOrders);
