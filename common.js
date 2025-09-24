// local time script

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

// back to top script -->

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
