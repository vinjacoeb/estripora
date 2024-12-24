-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 24, 2024 at 05:03 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `estripora`
--

-- --------------------------------------------------------

--
-- Table structure for table `datail_sarana`
--

CREATE TABLE `datail_sarana` (
  `id_detail` char(25) NOT NULL,
  `id_sarana` char(25) NOT NULL,
  `id_fasilitas` char(25) NOT NULL,
  `kelengkapan` varchar(200) NOT NULL,
  `status` enum('Tersedia','Tidak Tersedia') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fasilitas`
--

CREATE TABLE `fasilitas` (
  `id_fasilitas` char(25) NOT NULL,
  `id_sarana` char(25) NOT NULL,
  `nama_fasilitas` char(25) NOT NULL,
  `qty` int NOT NULL,
  `kondisi` enum('Baik','Rusak') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fasilitas`
--

INSERT INTO `fasilitas` (`id_fasilitas`, `id_sarana`, `nama_fasilitas`, `qty`, `kondisi`) VALUES
('FS-001', 'MJ-002', 'Lampu', 4, 'Baik');

-- --------------------------------------------------------

--
-- Table structure for table `jam_operasional`
--

CREATE TABLE `jam_operasional` (
  `id_jam` char(25) NOT NULL,
  `id_sarana` char(25) NOT NULL,
  `hari` varchar(200) NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_selesai` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` char(25) NOT NULL,
  `nama_kategori` varchar(200) NOT NULL,
  `alamat` varchar(200) NOT NULL,
  `kecamatan` varchar(200) NOT NULL,
  `lokasi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `alamat`, `kecamatan`, `lokasi`) VALUES
('MJ', 'Manunggal Jati', 'Jl. Taman Majapahit Selatan No.1, Pedurungan Lor, Kec. Pedurungan, Kota Semarang, Jawa Tengah 50192', 'Pedurungan', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9963417293966!2d110.48025937578062!3d-7.009712092991689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708da9d953b2fb%3A0x287b8514d9e07c42!2sGOR%20Manunggal%20Jati!5e0!3m2!1sid!2sid!4v1734782588844!5m2!1sid!2sid'),
('TLJ', 'Tri Lomba Juang', 'Jl. Tri Lomba Juang, Mugassari, Kec. Semarang Sel., Kota Semarang, Jawa Tengah 50249', 'Semarang Selatan', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1719338634266!2d110.41527717499714!3d-6.989019293011989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b5bb9e25435%3A0xf22600a63dbfccd2!2sJl.%20Tri%20Lomba%20Juang%2C%20Mugassari%2C%20Kec.%20Semarang%20Sel.%2C%20Kota%20Semarang%2C%20Jawa%20Tengah%2050249!5e0!3m2!1sid!2sid!4v1734779280086!5m2!1sid!2sid');

-- --------------------------------------------------------

--
-- Table structure for table `sarana`
--

CREATE TABLE `sarana` (
  `id_sarana` char(25) NOT NULL,
  `id_kategori` char(25) NOT NULL,
  `nama_sarana` varchar(200) NOT NULL,
  `gambar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `harga` int NOT NULL,
  `deskripsi` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sarana`
--

INSERT INTO `sarana` (`id_sarana`, `id_kategori`, `nama_sarana`, `gambar`, `harga`, `deskripsi`) VALUES
('MJ-001', 'MJ', 'Gedung Pertemuan Manunggal Jati', 'knight_templar_and_king_of_england_1.jpeg', 28000, 'gedung pertemuan di manunggal jatii'),
('MJ-002', 'MJ', 'Gelanggang Renang', '65f5022d8c1f5_ilustrasi_raja_baldwin_iv_.webp', 35000, 'Gelanggang Renang di Manunggal Jati'),
('TLJ-001', 'TLJ', 'Lapangan Tenis Gor Tri Lomba Juang', 'leonardo_kino_xl_image_of_lancelot_in_shining_armor_riding_a_w_3.jpg', 120000, 'Lapangan Tenis Gor Tri Lomba Juang di TLJ');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` char(25) NOT NULL,
  `id_sarana` char(25) NOT NULL,
  `id_user` char(25) NOT NULL,
  `id_jam` char(25) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `gross_amount` int NOT NULL,
  `tanggal` date NOT NULL,
  `hitung` int NOT NULL,
  `status` enum('Pending','Dibatalakan','Berhasil') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` char(25) NOT NULL,
  `user` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `role` enum('Admin','User') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'User',
  `nik` varchar(50) NOT NULL,
  `no_tlp` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `user`, `password`, `email`, `role`, `nik`, `no_tlp`) VALUES
('USR-001', 'Valentino Aldo', '$2a$10$0DH2kr.8PQ678PxM1rBEx.Wg6W9h.Jf4dtd51EWwSmmTZ2VEtPFO2', 'admin@admin.com', 'Admin', '1111111111', '1213425435'),
('USR-002', 'user', '$2a$10$.fvx7zzzcTGBisDl2ukZ.eTN5FnNaOlJoZY4TmOoFg/yGXVt9OcLy', 'user@user.com', 'User', '1897564', '0987667');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `datail_sarana`
--
ALTER TABLE `datail_sarana`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_sarana` (`id_sarana`),
  ADD KEY `id_fasilitas` (`id_fasilitas`);

--
-- Indexes for table `fasilitas`
--
ALTER TABLE `fasilitas`
  ADD PRIMARY KEY (`id_fasilitas`),
  ADD KEY `sarana` (`id_sarana`);

--
-- Indexes for table `jam_operasional`
--
ALTER TABLE `jam_operasional`
  ADD PRIMARY KEY (`id_jam`),
  ADD KEY `fk_sarana` (`id_sarana`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `sarana`
--
ALTER TABLE `sarana`
  ADD PRIMARY KEY (`id_sarana`),
  ADD KEY `id_kategori` (`id_kategori`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `fk2_sarana` (`id_sarana`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_jam` (`id_jam`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `nik` (`nik`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `datail_sarana`
--
ALTER TABLE `datail_sarana`
  ADD CONSTRAINT `id_fasilitas` FOREIGN KEY (`id_fasilitas`) REFERENCES `fasilitas` (`id_fasilitas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_sarana` FOREIGN KEY (`id_sarana`) REFERENCES `sarana` (`id_sarana`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fasilitas`
--
ALTER TABLE `fasilitas`
  ADD CONSTRAINT `sarana` FOREIGN KEY (`id_sarana`) REFERENCES `sarana` (`id_sarana`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `jam_operasional`
--
ALTER TABLE `jam_operasional`
  ADD CONSTRAINT `fk_sarana` FOREIGN KEY (`id_sarana`) REFERENCES `sarana` (`id_sarana`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sarana`
--
ALTER TABLE `sarana`
  ADD CONSTRAINT `id_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `fk2_sarana` FOREIGN KEY (`id_sarana`) REFERENCES `sarana` (`id_sarana`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_jam` FOREIGN KEY (`id_jam`) REFERENCES `jam_operasional` (`id_jam`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
