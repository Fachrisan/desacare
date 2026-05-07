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
├── uploads/
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
JWT_SECRET=desacare_secret_key
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

## Aturan Upload File

- Jika `AWS_S3_BUCKET` kosong, file disimpan ke `backend/uploads`.
- Jika `AWS_S3_BUCKET` terisi (dan credential AWS valid), file di-upload ke Amazon S3.
- URL file hasil upload disimpan ke database.

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
