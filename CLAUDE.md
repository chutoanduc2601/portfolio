# CLAUDE.md

Hướng dẫn cho Claude Code khi làm việc trong repo này.

## Tổng quan dự án

Website portfolio cá nhân của một **sinh viên mới tốt nghiệp ngành Công nghệ Thông tin, Trường Đại học Nông Lâm TP.HCM (NLU)**.

Mục tiêu:
- Giới thiệu bản thân, học vấn, kỹ năng, dự án, kinh nghiệm cho nhà tuyển dụng.
- Tạo ấn tượng **tối giản, hiện đại, chuyên nghiệp**. Nhà tuyển dụng nắm được "người này là ai, làm được gì" trong vòng 10 giây.
- Tải nhanh, responsive tốt, SEO cơ bản, dễ deploy miễn phí (Vercel).

Ảnh tham chiếu design: [resend.com_.png](resend.com_.png) (giao diện landing page của Resend). **Chỉ lấy cảm hứng phong cách**: không sao chép logo, nội dung, hình ảnh 3D hay văn bản của Resend.

## ⚠️ Quy tắc bắt buộc

Các quy tắc này luôn áp dụng, không được bỏ qua.

### 1. Chụp screenshot và so sánh với design gốc sau mỗi thay đổi lớn
"Thay đổi lớn" là: thêm hoặc sửa một section, đổi layout, đổi design token (màu, font, spacing), thêm animation mới.

Quy trình:
1. Chụp screenshot full-page ở **desktop (1440px)** và **mobile (375px)** bằng [scripts/screenshot.js](scripts/screenshot.js). Script dùng `playwright-core` với Chrome đã cài sẵn trên máy, cuộn hết trang để kích hoạt mọi animation, rồi báo nếu có phần tử tràn ngang:
   ```bash
   npm i -D playwright-core            # chỉ cần một lần
   node scripts/screenshot.js "file:///C:/Users/Administrator/Desktop/portfolio/index.html" screenshots
   ```
   Không dùng `chrome --headless --window-size=375,...` để chụp mobile vì Chrome giới hạn chiều rộng cửa sổ tối thiểu nên ảnh sẽ sai. Thư mục `screenshots/` nằm trong `.gitignore`.
2. Ảnh full-page rất dài, nên cắt thành từng đoạn khoảng 1400px (desktop) hoặc 1700px (mobile) trước khi mở bằng Read để xem rõ chi tiết.
3. Dùng Read tool mở screenshot, đặt cạnh [resend.com_.png](resend.com_.png) và so sánh theo checklist:
   - Nền tối, độ tương phản và màu chữ (trắng / muted / subtle) có giống tinh thần design gốc không.
   - Tỉ lệ cỡ chữ tiêu đề so với body, khoảng trắng giữa các section.
   - Layout căn giữa, độ rộng container, viền mảnh, card.
   - Điểm nhấn: glow, gradient text, code window, lưới logo.
   - Không có phần tử vỡ layout, tràn ngang, chữ chồng lên nhau.
4. Ghi ngắn gọn **điểm khác biệt** với design gốc và sửa trước khi chuyển sang việc khác. Báo kết quả so sánh cho người dùng.

### 2. Mobile-friendly
- Thiết kế **mobile-first**: viết class cho mobile trước, rồi thêm `sm:` `md:` `lg:`.
- Không được có cuộn ngang ở bất kỳ breakpoint nào (kiểm tra 320px, 375px, 768px, 1024px, 1440px).
- Navbar trên mobile: menu hamburger, mở ra dạng sheet/overlay, đóng lại khi bấm link.
- Vùng chạm (nút, link) tối thiểu **44×44px**. Chữ body tối thiểu 16px trên mobile.
- Grid dự án: 1 cột trên mobile, 2 cột từ `md`. Code window cho phép cuộn ngang **bên trong** khung, không làm tràn trang.
- Ảnh dùng `next/image` với `sizes` phù hợp. Hiệu ứng glow hoặc blur nặng phải giảm kích thước trên mobile.

### 3. Mọi section phải có animation khi scroll
- Mỗi section bọc trong component `<Reveal>` dùng chung (`src/components/ui/Reveal.tsx`, Framer Motion `whileInView`).
- Mặc định: `opacity 0 → 1`, `y 16px → 0`, `duration 0.5`, `ease "easeOut"`, `viewport={{ once: true, amount: 0.2 }}`.
- Danh sách (card dự án, skill, timeline) dùng **stagger** `0.06–0.1s` giữa các phần tử.
- Bắt buộc tôn trọng `prefers-reduced-motion` (dùng `useReducedMotion`, khi bật thì bỏ translate, chỉ giữ fade hoặc hiện ngay).
- Chỉ animate `opacity` và `transform` để giữ 60fps trên mobile. Không animate `width`, `height`, `top`, `filter` lớn.
- Khi review, kiểm tra **từng section** trong `page.tsx` đều có `Reveal`. Section mới không có animation thì chưa được coi là xong.

## Thông tin chủ portfolio

- Họ tên: **Chu Toàn Đức**
- MSSV: 22130047, Khoa Công nghệ Thông tin, Trường ĐH Nông Lâm TP.HCM
- GitHub: https://github.com/chutoanduc2601
- Khoá luận tốt nghiệp: *Nghiên cứu cải tiến TickNets bằng cơ chế attention CBAM cho bài toán phân loại ảnh*
- Tech stack chính (rút từ các repo): React, TypeScript, JavaScript, Tailwind CSS, Java, Spring Boot, PostgreSQL, Supabase, Python, PyTorch/YOLO, Docker.
- Email, LinkedIn, số điện thoại, GPA, kinh nghiệm thực tập: **chưa có**, dùng placeholder và hỏi người dùng. Không tự bịa.

## Dự án nổi bật

Dữ liệu dưới đây lấy từ GitHub. Đưa vào `src/data/profile.ts` theo đúng thứ tự ưu tiên này. Các dự án chưa có demo thì chỉ hiển thị link GitHub.

1. **Farmily: Web thương mại điện tử rau củ quả sạch** ([DoAnWeb_WebRauCuQua](https://github.com/chutoanduc2601/DoAnWeb_WebRauCuQua))
   - Đồ án Web. Nền tảng full-stack kết nối nông trại chuẩn VietGAP/GlobalGAP với người tiêu dùng (rất hợp với chất "Nông Lâm").
   - Người dùng: duyệt và tìm sản phẩm, giỏ hàng, thanh toán (tích hợp VNPay), lịch sử đơn, hoàn hàng, đánh giá, chat realtime, đăng nhập Email/Google OAuth.
   - Admin: dashboard doanh thu (Recharts), CRUD sản phẩm/danh mục, quản lý đơn, khuyến mãi, khách hàng, thông báo realtime, dark mode.
   - Tech: React 19, Vite, Tailwind CSS 4, Framer Motion, Spring Boot 3, Spring Security + JWT/OAuth2, JPA, PostgreSQL, Supabase (Auth, Realtime, Storage), Docker, Vercel.
2. **Ứng dụng mã hoá: An toàn & Bảo mật HTTT** ([AnToanBaoMatHTTT](https://github.com/chutoanduc2601/AnToanBaoMatHTTT))
   - Ứng dụng desktop Java Swing theo mô hình MVC, minh hoạ các thuật toán mã hoá.
   - Mã hoá cổ điển: Caesar, Affine, Vigenère, Hill, Substitution, Permutation. Mã hoá hiện đại: AES, DES, RSA. Thêm hàm băm (Hash).
   - Tech: Java, Java Swing, JCA, Bouncy Castle.
3. **Mùa Hè Xanh: Hệ thống đăng ký tình nguyện trực tuyến** ([MuaHeXanh_DoAnChuyenNganh_Scrum](https://github.com/chutoanduc2601/MuaHeXanh_DoAnChuyenNganh_Scrum))
   - Đồ án chuyên ngành, làm theo quy trình **Scrum**. Đăng ký tham gia dự án, admin duyệt/từ chối đơn, quản lý dự án, xác thực người dùng.
   - Tech: React 19, TypeScript, Vite, Bootstrap, Axios, Spring Boot, Spring Security.
4. **Nhận diện biển số xe** ([NhanDienBienSo_ML](https://github.com/chutoanduc2601/NhanDienBienSo_ML))
   - Phát hiện biển số bằng YOLOv8, đọc ký tự bằng CRNN/EasyOCR. Tự chuẩn bị dataset (chia 70/20/10, sửa nhãn).
   - Tech: Python, Ultralytics YOLOv8, PyTorch, OpenCV, EasyOCR.
5. **TickNets-CBAM: Khoá luận tốt nghiệp** ([TickNets-CBAM](https://github.com/chutoanduc2601/TickNets-CBAM))
   - Cải tiến mạng nhẹ TickNets bằng attention CBAM cho phân loại ảnh, thử nghiệm trên dataset PlantVillage (bệnh lá cây, đúng lĩnh vực nông nghiệp).
   - Tech: Python, PyTorch, Jupyter, LaTeX.
6. **Info Agent System** ([InfoAgentSystem](https://github.com/chutoanduc2601/InfoAgentSystem))
   - Hệ thống full-stack xây dựng agent xử lý thông tin, có AI service riêng (dự báo thời tiết bằng LSTM).
   - Tech: React, TypeScript, Spring Boot, Python, Supabase.

Hiển thị: card 1 (Farmily) và card 2 (An toàn bảo mật) là **featured**, card to, chiếm full width hoặc 2 cột. Các dự án còn lại dùng card nhỏ. Ảnh dự án đặt ở `public/images/projects/<slug>.webp`. Chưa có ảnh thì dùng khối gradient tối kèm icon, không dùng ảnh stock.

## Trạng thái hiện tại

Bản đầu tiên là **một file tĩnh [index.html](index.html)**, chứa HTML, CSS và JS thuần, không cần build. Mở trực tiếp bằng trình duyệt là chạy. Trong file này:
- Design token nằm trong `:root` ở đầu thẻ `<style>`.
- Animation khi scroll: thêm class `.reveal` vào phần tử, dùng `style="--d:.08s"` để tạo stagger. JS ở cuối file dùng IntersectionObserver để gắn class `.in`.
- Nội dung (dự án, kỹ năng) đang viết thẳng trong HTML. Khi chuyển sang Next.js theo stack bên dưới thì tách ra `profile.ts`.
- Chỗ cần dữ liệu thật được đánh dấu `TODO` hoặc class `.ph`: email, LinkedIn, GPA, ngoại ngữ, file `cv.pdf`.

## Tech stack (khi nâng cấp lên Next.js)

- **Next.js (App Router) + TypeScript**: xuất static (`output: 'export'`) nếu không cần backend.
- **Tailwind CSS**: toàn bộ styling; không viết CSS rời trừ `globals.css` (biến màu, font, base).
- **Framer Motion**: animation nhẹ (fade/slide khi scroll). Không lạm dụng.
- **next/font**: font chữ, không load font qua `<link>`.
- **lucide-react**: icon.
- **shiki** (tuỳ chọn): highlight code cho khối code trang trí.
- Package manager: `npm`.

Lệnh:
```bash
npm run dev      # chạy local tại http://localhost:3000
npm run build    # build production
npm run lint     # ESLint
```

## Cấu trúc thư mục

```
src/
  app/
    layout.tsx          # font, metadata, <html lang="vi">
    page.tsx            # ghép các section
    globals.css
  components/
    layout/             # Navbar, Footer
    sections/           # Hero, About, Skills, Projects, Experience, Education, Contact
    ui/                 # Button, Badge, Card, SectionHeading, CodeWindow, GlowIcon...
  data/
    profile.ts          # TẤT CẢ nội dung cá nhân ở đây
  lib/
    utils.ts            # cn() helper (clsx + tailwind-merge)
public/
  images/               # avatar, ảnh dự án (.webp)
  cv.pdf                # CV để tải về
```

**Quy tắc nội dung:** mọi text, link, danh sách dự án, kỹ năng... đặt trong `src/data/profile.ts` với type rõ ràng. Component chỉ nhận dữ liệu, không hard-code thông tin cá nhân. Khi chưa có dữ liệu thật, dùng placeholder dễ nhận biết (VD: `"Nguyễn Văn A"`, `"[Mô tả dự án]"`) và **không bịa** thành tích, công ty hay số liệu.

## Design system (theo phong cách Resend)

### Tinh thần
- **Dark mode là mặc định**: nền gần đen, chữ trắng, độ tương phản cao.
- Nhiều khoảng trắng, layout căn giữa, mỗi section một ý chính.
- Tiêu đề lớn, chữ ít. Để typography và khoảng trống làm điểm nhấn, không dùng trang trí rườm rà.
- Điểm nhấn thị giác: một vật thể/icon phát sáng (glow) phía trên tiêu đề section, khối code giả lập cửa sổ editor, viền mảnh mờ.

### Màu sắc (định nghĩa trong `tailwind.config` / CSS variables)
| Token | Giá trị | Dùng cho |
|---|---|---|
| `bg` | `#000000` | nền trang |
| `surface` | `#0A0A0A` | card, code window |
| `border` | `rgba(255,255,255,0.08)` | viền card, divider |
| `text` | `#EDEDED` | chữ chính |
| `muted` | `#A1A1A1` | mô tả, chữ phụ |
| `subtle` | `#6B6B6B` | label, metadata |
| `accent` | `#22C55E` (xanh lá, gợi màu NLU) | link, highlight, glow |

- Chỉ **một màu accent**. Có thể dùng gradient text nhẹ (trắng → xám, hoặc accent → trắng) cho 1–2 từ khoá trong tiêu đề, giống "Integrate **this afternoon**" của Resend.
- Glow: `radial-gradient` màu accent với opacity thấp (≤ 0.25), blur lớn, đặt sau icon/tiêu đề.

### Typography
- Heading: font serif/display mảnh, hiện đại (VD: `Instrument Serif` hoặc `Fraunces`) **hoặc** sans tracking chặt (`Inter Tight`). Chọn một và dùng nhất quán. **Phải hỗ trợ tiếng Việt** (subset `vietnamese`).
- Body: `Inter` (subset `latin`, `vietnamese`).
- Code: `JetBrains Mono` / `Geist Mono`.
- Cỡ chữ: Hero `text-5xl md:text-7xl`, tiêu đề section `text-4xl md:text-5xl`, body `text-base md:text-lg`, `leading-relaxed`.
- Heading dùng `tracking-tight`; label nhỏ dùng `uppercase tracking-widest text-xs text-subtle`.

### Layout & component
- Container: `max-w-5xl mx-auto px-6`; khoảng cách section `py-24 md:py-32`.
- Navbar: cố định trên cùng, trong suốt + `backdrop-blur`, viền dưới mảnh. Logo/tên bên trái, link ở giữa, nút "Liên hệ"/"Tải CV" bên phải.
- Button chính: nền trắng chữ đen, bo `rounded-lg`. Button phụ: viền mảnh, nền trong suốt.
- Card: `bg-surface border border-border rounded-xl`, hover chỉ đổi màu viền nhẹ, không đổ bóng nặng.
- Badge/pill nhỏ phía trên tiêu đề hero (VD: "Sinh viên CNTT · ĐH Nông Lâm TP.HCM · Sẵn sàng đi làm →").
- `CodeWindow`: khung giống editor (3 chấm, tab tên file) hiển thị một đoạn code giới thiệu bản thân, VD `const me = { name, school: "NLU", stack: [...] }`.
- Grid công nghệ: lưới logo/tên tech stack đơn sắc (xám), giống dải logo khách hàng của Resend.

### Animation
- Chi tiết bắt buộc xem mục **Quy tắc bắt buộc, phần 3** (component `Reveal`, stagger, reduced-motion).
- Không parallax nặng, không cursor custom, không hiệu ứng gõ chữ kéo dài.

## Các section của trang

1. **Hero**: badge, tên + một dòng định vị (VD: "Frontend Developer — xây sản phẩm web gọn, nhanh, dễ dùng"), mô tả 1–2 câu, 2 nút (Xem dự án / Tải CV), avatar hoặc vật thể glow.
2. **Tech stack**: lưới logo công nghệ đã dùng.
3. **Giới thiệu (About)**: đoạn ngắn + `CodeWindow`.
4. **Dự án (Projects)**: 3–6 dự án nổi bật (đồ án môn học, khoá luận tốt nghiệp, dự án cá nhân). Mỗi card: ảnh, tên, mô tả, vai trò, tech tags, link GitHub/demo.
5. **Kinh nghiệm (Experience)**: thực tập, part-time, CLB, hoạt động. Dạng timeline tối giản.
6. **Học vấn (Education)**: ĐH Nông Lâm TP.HCM, Khoa Công nghệ Thông tin, niên khoá, GPA (nếu muốn), khoá luận, chứng chỉ (TOEIC/IELTS, AWS...).
7. **Liên hệ (Contact)**: tiêu đề lớn kiểu "Sẵn sàng cho cơ hội tiếp theo.", email, GitHub, LinkedIn, nút tải CV.
8. **Footer**: tên, năm, link mạng xã hội, tối giản.

## Ngôn ngữ

- Nội dung mặc định **tiếng Việt**, `<html lang="vi">`. Thuật ngữ kỹ thuật giữ tiếng Anh (React, REST API...).
- Nếu sau này thêm tiếng Anh: tách nội dung thành `profile.vi.ts` / `profile.en.ts`, không nhân đôi component.

## Quy ước code

- Component dạng function + TypeScript, tên file `PascalCase.tsx`; mặc định Server Component, chỉ thêm `"use client"` khi cần (animation, state).
- Dùng `cn()` để gộp class; không dùng inline style trừ giá trị động.
- Ảnh dùng `next/image`, định dạng `.webp`, có `alt` mô tả.
- Không thêm thư viện UI nặng (MUI, Ant Design, Bootstrap).
- Giữ component nhỏ, tái sử dụng `SectionHeading` cho mọi tiêu đề section.

## Chất lượng & kiểm tra

- Responsive: kiểm tra 375px, 768px, 1280px. Mobile: navbar thành menu thu gọn.
- Accessibility: HTML ngữ nghĩa (`header`, `main`, `section`, `footer`), focus ring rõ ràng, tương phản chữ muted đạt WCAG AA trên nền đen.
- SEO: `metadata` (title, description, Open Graph image), `favicon`, `sitemap`/`robots` cơ bản.
- Mục tiêu Lighthouse ≥ 90 cho Performance, Accessibility, Best Practices, SEO.
- Chạy `npm run lint` và `npm run build` không lỗi trước khi coi là xong.

## Deploy

- Vercel (kết nối GitHub repo). Domain gợi ý: `ten-ban.vercel.app` hoặc domain riêng.
