# 🎂 Birthday Website — Hướng dẫn sử dụng

## 📁 Cấu trúc thư mục

```
birthday-project/
├── index.html          ← File chính, mở file này trong trình duyệt
├── css/
│   └── style.css       ← Toàn bộ giao diện & animation
├── js/
│   ├── main.js         ← Intro phong bì + điều hướng
│   ├── particles.js    ← Hiệu ứng hạt bay nền
│   ├── gifts.js        ← Tương tác mở hộp quà
│   ├── cake.js         ← Thổi nến sinh nhật
│   ├── stickers.js     ← Bảng sticker kéo thả
│   └── confetti.js     ← Pháo hoa confetti
└── assets/             ← Để ảnh của bạn vào đây
    └── (ảnh của bạn)
```

---

## ✏️ Cách tuỳ chỉnh

### 1. Đổi tên người bạn
Mở `index.html`, tìm dòng:
```html
<h2 class="hero-name" id="heroName">[Tên Bạn] 🌟</h2>
```
và:
```html
<span class="finale-name">[Tên Bạn]</span>
```
→ Thay `[Tên Bạn]` bằng tên thật.

---

### 2. Thay ảnh đại diện (hero)
Tìm dòng:
```html
<img src="https://api.dicebear.com/..." ... id="heroPhoto" />
```
→ Thay `src` bằng đường dẫn ảnh, ví dụ:
```html
<img src="assets/avatar.jpg" ... id="heroPhoto" />
```
Để ảnh file vào thư mục `assets/`.

---

### 3. Thay ảnh kỷ niệm (polaroid)
Tìm các thẻ:
```html
<img src="https://api.dicebear.com/..." alt="memory" />
```
Có 4 ảnh, thay từng cái:
```html
<img src="assets/memory1.jpg" alt="memory" />
<img src="assets/memory2.jpg" alt="memory" />
...
```

---

### 4. Sửa lời chúc trong hộp quà
Tìm 4 thẻ `.gift-reveal-inner > p` trong `index.html` và sửa nội dung tuỳ ý.

---

### 5. Sửa lời chúc cuối trang
```html
<p class="finale-msg">...</p>
```

---

## 🚀 Chạy website

### Cách 1 — Live Server (khuyên dùng)
1. Mở VSCode
2. Cài extension **Live Server** (nếu chưa có)
3. Chuột phải vào `index.html` → **Open with Live Server**

### Cách 2 — Mở thẳng
Double-click vào `index.html` (hoặc kéo vào Chrome/Firefox)

> **Lưu ý:** Nếu dùng cách 2 và ảnh không hiện, hãy dùng Live Server.

---

## 🎮 Tính năng

| Tính năng | Mô tả |
|-----------|-------|
| 💌 Phong bì mở | Click vào phong bì để bắt đầu |
| ✨ Particles | Hiệu ứng hạt nền tự động |
| 🎁 Hộp quà × 4 | Click để mở, click lại để đóng |
| 🎂 Thổi nến | Button thổi nến có animation |
| 🎨 Sticker board | Thêm sticker, kéo thả tự do |
| 🎆 Pháo hoa | Nút bắn confetti cuối trang |
| 📸 Ảnh polaroid | Tường ảnh kỷ niệm tilted style |

---

Made with 💖 by Claude
