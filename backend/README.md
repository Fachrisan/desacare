# DesaCare Backend

Backend API untuk aplikasi DesaCare menggunakan Node.js, Express, dan MySQL.

## Stack

- Node.js
- Express.js
- MySQL + mysql2
- dotenv
- cors
- multer
- bcryptjs
- jsonwebtoken
- @aws-sdk/client-s3

## Struktur Folder

backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── s3.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── pengajuanController.js
│   │   ├── pengaduanController.js
│   │   └── statusController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── pengajuanRoutes.js
│   │   ├── pengaduanRoutes.js
│   │   └── statusRoutes.js
│   ├── utils/
│   │   ├── fileStorage.js
│   │   └── generateTicket.js
│   └── server.js
├── schema.sql
├── package.json
├── .env.example
└── README.md

## Setup Lokal

1. Masuk ke folder backend:
   ```bash
   cd backend
   ```
2. Install dependency:
   ```bash
   npm install
   ```
3. Buat file `.env` dari contoh:
   ```bash
   copy .env.example .env
   ```
4. Import `schema.sql` ke MySQL lokal (XAMPP/PhpMyAdmin/MySQL CLI).
5. Jalankan server development:
   ```bash
   npm run dev
   ```

Server default berjalan di `http://localhost:5000`.

## Environment Variables

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=desacare_db
DB_PORT=3306
DB_CONNECT_TIMEOUT=10000
DB_SSL=false
DB_SSL_REJECT_UNAUTHORIZED=true
JWT_SECRET=desacare_secret_key
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET_NAME=desacare-upload-fachri
CLOUDFRONT_DOMAIN=d359gkva89ox7e.cloudfront.net
```

Untuk AWS ECS + RDS, isi `DB_HOST` dengan endpoint RDS, bukan `localhost` dan bukan nama service Docker lokal seperti `mysql`.
Pastikan security group RDS mengizinkan inbound MySQL port `3306` dari security group ECS service/task.
Endpoint `GET /api/health` akan mencoba query database dan menampilkan ringkasan konfigurasi tanpa password.

## Aturan Upload File

- File dari `multipart/form-data` disimpan ke Amazon S3 private menggunakan `@aws-sdk/client-s3`.
- Pengaduan memakai key `pengaduan/{timestamp}-{filename}`.
- Pengajuan surat memakai key `pengajuan/{timestamp}-{filename}`.
- URL yang disimpan ke database adalah URL CloudFront, bukan URL S3 langsung.

## Endpoint

### Auth
- `POST /api/auth/login`

### Pengajuan Surat
- `POST /api/pengajuan`
- `GET /api/pengajuan` (admin token)
- `GET /api/pengajuan/:id` (admin token)
- `PUT /api/pengajuan/:id/status` (admin token)

### Pengaduan
- `POST /api/pengaduan`
- `GET /api/pengaduan` (admin token)
- `GET /api/pengaduan/:id` (admin token)
- `PUT /api/pengaduan/:id/status` (admin token)

### Cek Status Tiket
- `GET /api/status/:kode_tiket`

## Akun Admin Default

- Email: `admin@desacare.id`
- Password: `admin123`
