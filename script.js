function searchOrder() {
    // Hiển thị preloader
    const preloader = document.getElementById("preloader");
    preloader.style.display = "flex";

    // Giả sử đây là dữ liệu từ cơ sở dữ liệu hoặc API
    const orders = [
        {
            phoneNumber: "0123456789",
            senderName: "Nguyễn Văn A",
            senderPhone: "0123456789",
            address: "123 Đường ABC, Quận 1, TP.HCM",
            vehicle: {
                name: "Xe tải A",
                licensePlate: "79A-12345",
                phone: "0987654321"
            },
            route: {
                startLocation: "TP.HCM",
                startTime: "08:00",
                endLocation: "Hà Nội",
                endTime: "20:00"
            },
            imageUrl: "https://i0.wp.com/baobiduykhanh.com/wp-content/uploads/2017/03/thung-carton-hang-dien-tu.jpg" // Hình ảnh thùng hàng
        }
        // Thêm dữ liệu khác nếu cần
    ];

    const phoneNumber = document.getElementById("phoneNumber").value;
    const order = orders.find(o => o.phoneNumber === phoneNumber);

    const orderInfoDiv = document.getElementById("orderInfo");
    orderInfoDiv.innerHTML = "";

    setTimeout(() => {
        // Ẩn preloader
        preloader.style.display = "none";

        if (order) {
            orderInfoDiv.innerHTML = `
                <h2>Thông tin đơn hàng</h2>
                <div class="info-section">
                    <p><strong>Tên người gửi:</strong> ${order.senderName}</p>
                    <p><strong>Số điện thoại:</strong> ${order.senderPhone}</p>
                    <p><strong>Địa chỉ:</strong> ${order.address}</p>
                </div>
                <h3>Nhà xe</h3>
                <div class="info-section">
                    <p><strong>Tên xe:</strong> ${order.vehicle.name}</p>
                    <p><strong>Biển số xe:</strong> ${order.vehicle.licensePlate}</p>
                    <p><strong>Số điện thoại:</strong> ${order.vehicle.phone}</p>
                </div>
                <h3>Thông tin tuyến đường</h3>
                <div class="info-section">
                    <p><strong>Vị trí xuất phát:</strong> ${order.route.startLocation} (Giờ: ${order.route.startTime})</p>
                    <p><strong>Điểm cuối:</strong> ${order.route.endLocation} (Giờ dự kiến: ${order.route.endTime})</p>
                </div>
                <h3>Hình ảnh bưu phẩm</h3>
                <img id="orderImage" src="${order.imageUrl}" alt="Hình ảnh bưu phẩm">
            `;

            // Hiển thị ảnh sau khi preload
            const orderImage = document.getElementById("orderImage");
            orderImage.onload = () => {
                orderImage.style.display = "block";
            };
        } else {
            orderInfoDiv.innerHTML = "<p>Không tìm thấy đơn hàng với số điện thoại này.</p>";
        }
    }, 1000); // Giả lập thời gian chờ load dữ liệu
}
