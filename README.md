# Pio Learning - Ứng Dụng Trắc Nghiệm

Đây là một ứng dụng trắc nghiệm cho phép người dùng kiểm tra kiến thức của mình ở nhiều môn học khác nhau. Ứng dụng được xây dựng bằng HTML, CSS và JavaScript.

## Cấu Trúc Dự Án

### Thư Mục Gốc
- `index.html` - File HTML chính, là điểm khởi đầu của ứng dụng
- `README.md` - Tài liệu dự án (file này)

### Các File JavaScript (`/js`)
- `questions.js` (1057 dòng) - Chứa logic quản lý câu hỏi và cấu trúc dữ liệu cốt lõi
- `quiz.js` (297 dòng) - Xử lý chức năng trắc nghiệm, bao gồm hiển thị câu hỏi và tính điểm

### Các File Dữ Liệu Câu Hỏi (`/questions`)
- `questions_tienganh.json` - Câu hỏi môn Tiếng Anh
- `questions_toan_nc.json` - Câu hỏi Toán nâng cao
- `questions_toan_cb.json` - Câu hỏi Toán cơ bản
- `questions_tonghop.json` - Câu hỏi kiến thức tổng hợp
- `questions_daoduc.json` - Câu hỏi Đạo đức
- `questions_congnghe.json` - Câu hỏi Công nghệ
- `questions_tinhoc.json` - Câu hỏi Tin học

### Giao Diện (`/css`)
- `style.css` - Chứa toàn bộ CSS cho ứng dụng

## Tính Năng
- Nhiều môn học khác nhau
- Các cấp độ khó khác nhau
- Giao diện trắc nghiệm tương tác
- Theo dõi điểm số
- Giải thích chi tiết cho đáp án

## Cách Sử Dụng
1. Mở file `index.html` trong trình duyệt web
2. Chọn môn học
3. Bắt đầu làm bài trắc nghiệm
4. Trả lời câu hỏi và nhận phản hồi ngay lập tức
5. Xem điểm số cuối cùng và xem lại giải thích

## Phát Triển
Ứng dụng sử dụng JavaScript thuần và CSS cho giao diện. Không yêu cầu các framework hoặc thư viện bên ngoài. 