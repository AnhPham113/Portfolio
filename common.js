// ======🔥local time script======

function updateVietnamTime() {
    const now = new Date();
    document.getElementById("clock").textContent = now.toLocaleTimeString(
        "en-US",
        {
            timeZone: "Asia/Ho_Chi_Minh",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }
    );
}

updateVietnamTime();
setInterval(updateVietnamTime, 1000);

// ======🔥back to top script======

const btn = document.querySelector(".top-btn");

if (btn) {
    function toggleBtn() {
        if (window.scrollY > 600) {
            btn.classList.add("top-btn--show");
        } else {
            btn.classList.remove("top-btn--show");
        }
    }

    // 1 check khi DOM sẵn sàng
    document.addEventListener("DOMContentLoaded", () => {
        toggleBtn();

        // kiểm tra lại sau 1 frame để bù thay đổi layout do font/ảnh tải xong
        requestAnimationFrame(() => setTimeout(toggleBtn, 50));
    });

    // kiểm tra khi user scroll (passive để performance tốt hơn)
    window.addEventListener("scroll", toggleBtn, { passive: true });

    // hành động khi click
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

//======🔥subpage-active-navbar======
// Cấu hình: chiều cao header sticky để bù trừ
const HEADER_OFFSET = 200; //

// Lấy các link trong navbar và tạo danh sách section đúng thứ tự theo link
const navLinks = document.querySelectorAll(".nav-bar__link");
const sections = Array.from(navLinks)
    .map((link) => {
        const id = link.getAttribute("href");
        return document.querySelector(id);
    })
    .filter(Boolean); // chỉ lấy section có tồn tại

// Cuộn mượt khi click
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
    });
});

// Cập nhật active theo vị trí cuộn (giữ nguyên khi ở trong section)
function updateActive() {
    const pos = window.scrollY + HEADER_OFFSET;
    const firstTop = sections[0]?.offsetTop ?? 0;

    // Nếu còn ở trên section đầu tiên (tức là hero), không active gì cả
    if (pos < firstTop) {
        navLinks.forEach((link) =>
            link.parentElement.classList.remove("active")
        );
        return;
    }

    // Tìm section hiện tại: top <= pos < nextTop
    let currentIndex = sections.length - 1; // mặc định cuối cùng
    for (let i = 0; i < sections.length; i++) {
        const top = sections[i].offsetTop;
        const nextTop = sections[i + 1]?.offsetTop ?? Infinity;
        if (pos >= top && pos < nextTop) {
            currentIndex = i;
            break;
        }
    }

    // Nếu đã chạm footer thì clear
    const scrollBottom = window.innerHeight + window.scrollY;
    const docHeight = document.body.offsetHeight;
    if (scrollBottom >= docHeight - 50) {
        navLinks.forEach((link) =>
            link.parentElement.classList.remove("active")
        );
        return;
    }

    // Cập nhật active cho nav item tương ứng
    navLinks.forEach((link, i) => {
        link.parentElement.classList.toggle("active", i === currentIndex);
    });
}

// Lắng nghe scroll và chạy lúc load
window.addEventListener("scroll", updateActive);
window.addEventListener("load", updateActive);
