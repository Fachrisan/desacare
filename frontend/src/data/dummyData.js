export const statistik = [
  { label: 'Pengajuan Bulan Ini', value: '248', note: 'Naik 18% dari bulan lalu' },
  { label: 'Pengaduan Ditangani', value: '96%', note: 'Rata-rata selesai 2 hari' },
  { label: 'Warga Terlayani', value: '4.820', note: 'Dari 8 dusun aktif' },
  { label: 'Layanan Online', value: '12', note: 'Surat, aduan, dan status' },
];

export const pengajuanSurat = [
  {
    id: 'DSC-SRT-2401',
    nama: 'Rizky Pratama',
    nik: '3276021504980004',
    jenis: 'Surat Keterangan Domisili',
    tanggal: '05 Mei 2026',
    status: 'Diproses',
    keperluan: 'Pengurusan administrasi pekerjaan',
  },
  {
    id: 'DSC-SRT-2402',
    nama: 'Siti Aminah',
    nik: '3276024407890002',
    jenis: 'Surat Keterangan Usaha',
    tanggal: '04 Mei 2026',
    status: 'Menunggu',
    keperluan: 'Pendaftaran bantuan UMKM',
  },
  {
    id: 'DSC-SRT-2403',
    nama: 'Dimas Kurniawan',
    nik: '3276021203920008',
    jenis: 'Surat Pengantar SKCK',
    tanggal: '03 Mei 2026',
    status: 'Selesai',
    keperluan: 'Persyaratan melamar kerja',
  },
  {
    id: 'DSC-SRT-2404',
    nama: 'Nur Halimah',
    nik: '3276025201940001',
    jenis: 'Surat Keterangan Tidak Mampu',
    tanggal: '02 Mei 2026',
    status: 'Ditolak',
    keperluan: 'Kelengkapan data belum sesuai',
  },
];

export const pengaduanWarga = [
  {
    id: 'DSC-ADU-1801',
    nama: 'Andi Saputra',
    kategori: 'Infrastruktur',
    lokasi: 'Jl. Melati RT 03',
    tanggal: '05 Mei 2026',
    status: 'Diproses',
    isi: 'Lampu jalan mati selama tiga malam berturut-turut.',
  },
  {
    id: 'DSC-ADU-1802',
    nama: 'Maya Lestari',
    kategori: 'Kebersihan',
    lokasi: 'Pasar Desa Blok B',
    tanggal: '04 Mei 2026',
    status: 'Menunggu',
    isi: 'Tempat sampah umum penuh dan perlu penjadwalan angkut.',
  },
  {
    id: 'DSC-ADU-1803',
    nama: 'Hendra Wijaya',
    kategori: 'Keamanan',
    lokasi: 'Pos Ronda RW 02',
    tanggal: '01 Mei 2026',
    status: 'Selesai',
    isi: 'Permintaan penambahan jadwal patroli malam.',
  },
  {
    id: 'DSC-ADU-1804',
    nama: 'Lina Marlina',
    kategori: 'Administrasi',
    lokasi: 'Kantor Kelurahan',
    tanggal: '30 April 2026',
    status: 'Ditolak',
    isi: 'Aduan duplikat dengan tiket sebelumnya.',
  },
];

export const statusLayanan = [
  {
    kode: 'DSC-SRT-2401',
    tipe: 'Pengajuan Surat',
    pemohon: 'Rizky Pratama',
    layanan: 'Surat Keterangan Domisili',
    status: 'Diproses',
    estimasi: '07 Mei 2026',
    catatan: 'Berkas sedang diverifikasi oleh operator pelayanan.',
  },
  {
    kode: 'DSC-ADU-1803',
    tipe: 'Pengaduan Warga',
    pemohon: 'Hendra Wijaya',
    layanan: 'Permintaan Patroli Malam',
    status: 'Selesai',
    estimasi: 'Selesai pada 02 Mei 2026',
    catatan: 'Petugas keamanan telah menyesuaikan jadwal ronda.',
  },
  {
    kode: 'DSC-SRT-2404',
    tipe: 'Pengajuan Surat',
    pemohon: 'Nur Halimah',
    layanan: 'Surat Keterangan Tidak Mampu',
    status: 'Ditolak',
    estimasi: 'Perlu pengajuan ulang',
    catatan: 'Mohon unggah dokumen pendukung yang masih berlaku.',
  },
];
