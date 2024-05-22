function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function searchOrder() {
    // Hiển thị preloader
    const preloader = document.getElementById("preloader");
    preloader.style.display = "flex";

    // Giả sử đây là dữ liệu từ cơ sở dữ liệu hoặc API
    const orders = [
        {
            phoneNumber: "1",
            senderName: "Nguyễn Văn A",
            senderPhone: "0123456789",
            receiverName: "Trần Thị B",
            receiverPhone: "0987654322",
            receiverAddress: "Số 10, Đường ABC, Quận XYZ, Hà Nội",
            sendDate: "2023-05-21",
            quantity: "1 túi",
            cod: "1.750.000 vnđ",
            vehicle: {
                name: "Bắc Sơn",
                licensePlate: "26A-12345",
                phone: "0972090059"
            },
            route: {
                startLocation: "Bx Mộc Châu",
                startTime: "08:00",
                endLocation: "Bx Mỹ Đình",
                endTime: "14:00"
            }
        },
        {
            phoneNumber: "1",
            senderName: "Nguyễn Văn C",
            senderPhone: "0987654321",
            receiverName: "Lê Thị D",
            receiverPhone: "0987654323",
            receiverAddress: "Số 20, Đường XYZ, Quận ABC, Hà Nội",
            sendDate: "2023-05-22",
            quantity: "2 hộp",
            cod: "2.500.000 vnđ",
            vehicle: {
                name: "Duy Hồng",
                licensePlate: "26B-67890",
                phone: "0976543210"
            },
            route: {
                startLocation: "Bx Giáp Bát",
                startTime: "09:00",
                endLocation: "Bx Nước Ngầm",
                endTime: "15:00"
            }
        },
        {
            phoneNumber: "1",
            senderName: "Nguyễn Văn E",
            senderPhone: "0987654324",
            receiverName: "Trần Thị F",
            receiverPhone: "0987654325",
            receiverAddress: "Số 30, Đường DEF, Quận GHI, Hà Nội",
            sendDate: "2023-05-23",
            quantity: "3 thùng",
            cod: "3.750.000 vnđ",
            vehicle: {
                name: "Duy Hồng",
                licensePlate: "26C-54321",
                phone: ":0972090059"
            },
            route: {
                startLocation: "Bx Miền Đông",
                startTime: "10:00",
                endLocation: "Bx Miền Tây",
                endTime: "16:00"
            }
        }
    ];

    setTimeout(() => {
        const phoneNumber = document.getElementById("phoneNumber").value;
        const customerOrders = orders.filter(o => o.phoneNumber === phoneNumber);

        const orderSummaryDiv = document.getElementById("orderSummary");
        orderSummaryDiv.innerHTML = "";

        if (customerOrders.length > 0) {
            customerOrders.sort((a, b) => new Date(b.sendDate) - new Date(a.sendDate)); // Sắp xếp theo ngày gửi

            customerOrders.forEach((order, index) => {
                const orderSummaryItem = document.createElement("div");
                orderSummaryItem.className = "order-summary-item";
                orderSummaryItem.innerHTML = `
                    <div style="flex: 1; display: flex; justify-content: space-between; align-items: center;">
                        <p>Ngày: ${formatDate(order.sendDate)}</p>
                        <button onclick="toggleOrderDetail(${index})" class="toggle-button">&#9662;</button>
                    </div>
                    <div class="order-detail" id="orderDetail-${index}">
                        <h2>Thông tin đơn hàng</h2>
                        <h3>Người gửi</h3>
                        <div class="info-section">
                            <p><strong>Người gửi:</strong> ${order.senderName}</p>
                            <p><strong>Số điện thoại:</strong> <a href="tel:${order.senderPhone}">${order.senderPhone}</a></p>
                        </div>
                        <h3>Người nhận</h3>
                        <div class="info-section">
                            <p><strong>Người nhận:</strong> ${order.receiverName}</p>
                            <p><strong>Số điện thoại:</strong> <a href="tel:${order.receiverPhone}">${order.receiverPhone}</a></p>
                            <p><strong>Địa chỉ:</strong> ${order.receiverAddress}</p>
                        </div>
                        <h3>Đơn hàng</h3>
                        <div class="info-section">
                            <p><strong>Số lượng:</strong> ${order.quantity}</p>
                            <p><strong>Thu hộ:</strong> ${order.cod}</p>
                        </div>
                        <h3>Nhà xe</h3>
                        <div class="info-section">
                            <p><strong>Tên nhà xe:</strong> ${order.vehicle.name}</p>
                            <p><strong>Biển số xe:</strong> ${order.vehicle.licensePlate}</p>
                            <p><strong>Số điện thoại:</strong> <a href="tel:${order.vehicle.phone}">${order.vehicle.phone}</a></p>
                        </div>
                        <h3>Thông tin tuyến đường</h3>
                        <div class="info-section">
                            <p><strong>Vị trí xuất phát:</strong> ${order.route.startLocation} (Giờ: ${order.route.startTime})</p>
                            <p><strong>Điểm cuối:</strong> ${order.route.endLocation} (Giờ dự kiến: ${order.route.endTime})</p>
                        </div>
                    </div>
                `;
                orderSummaryDiv.appendChild(orderSummaryItem);
            });

            preloader.style.display = "none";
        } else {
            preloader.style.display = "none";
            orderSummaryDiv.innerHTML = "<p>Không tìm thấy đơn hàng với số điện thoại này.</p>";
        }
    }, 1000); // Giả lập thời gian chờ load dữ liệu
}

function toggleOrderDetail(index) {
    // Hiển thị preloader
    const preloader = document.getElementById("preloader");
    preloader.style.display = "flex";

    setTimeout(() => {
        const orderDetails = document.querySelectorAll('.order-detail');
        orderDetails.forEach((detail, idx) => {
            if (index === idx) {
                const isVisible = detail.style.display === 'block';
                detail.style.display = isVisible ? 'none' : 'block';
                const button = detail.previousElementSibling.querySelector('.toggle-button');
                button.innerHTML = isVisible ? '&#9662;' : '&#9652;';
            } else {
                detail.style.display = 'none';
                const button = detail.previousElementSibling.querySelector('.toggle-button');
                button.innerHTML = '&#9662;';
            }
        });

        // Ẩn preloader
        preloader.style.display = "none";
    }, 500); // Giả lập thời gian chờ load chi tiết đơn hàng
}
