CREATE DATABASE IF NOT EXISTS desacare_db;
USE desacare_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pengajuan_surat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_tiket VARCHAR(50) NOT NULL UNIQUE,
  nama_lengkap VARCHAR(100) NOT NULL,
  nik VARCHAR(20) NOT NULL,
  alamat TEXT NOT NULL,
  jenis_surat VARCHAR(100) NOT NULL,
  keperluan TEXT NOT NULL,
  file_url TEXT,
  status ENUM('Menunggu','Diproses','Selesai','Ditolak') DEFAULT 'Menunggu',
  catatan_admin TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pengaduan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kode_tiket VARCHAR(50) NOT NULL UNIQUE,
  nama_pelapor VARCHAR(100) NOT NULL,
  nomor_hp VARCHAR(20) NOT NULL,
  kategori VARCHAR(100) NOT NULL,
  lokasi TEXT NOT NULL,
  isi_pengaduan TEXT NOT NULL,
  foto_url TEXT,
  status ENUM('Menunggu','Diproses','Selesai','Ditolak') DEFAULT 'Menunggu',
  catatan_admin TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role)
VALUES ('Admin DesaCare', 'admin@desacare.id', '$2y$12$9ZrPNRLxrq0skkaVENj37uQxc2hLjMqB9Ei7BMBNfA0hbETZNEVpS', 'admin')
ON DUPLICATE KEY UPDATE email = email;
