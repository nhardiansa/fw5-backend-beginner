-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2022 at 02:56 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'car', '2022-02-02 13:27:51', NULL),
(3, 'motorbike', '2022-02-02 13:27:51', NULL),
(4, 'bike', '2022-02-02 14:10:38', '2022-02-02 15:30:55');

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `payment_code` varchar(80) NOT NULL,
  `payment` enum('1','0') NOT NULL,
  `returned` enum('1','0') NOT NULL,
  `prepayment` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `start_rent` date DEFAULT NULL,
  `end_rent` date DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `payment_code`, `payment`, `returned`, `prepayment`, `qty`, `start_rent`, `end_rent`, `user_id`, `vehicle_id`, `created_at`, `updated_at`) VALUES
(27, 'hnd1643938054913', '1', '0', 0, 1, '2022-02-02', '2022-02-04', 14, 19, '2022-02-04 09:27:34', '2022-02-09 17:30:20'),
(28, 'tyt1643938196795', '1', '0', 0, 2, '2022-02-01', '2022-02-02', 1, 20, '2022-02-04 09:29:56', NULL),
(29, 'plygn1643938229752', '0', '0', 0, 2, '2022-02-01', '2022-02-02', 18, 31, '2022-02-04 09:30:29', '2022-02-05 17:31:56'),
(30, 'plygn1643938363311', '1', '1', 0, 2, '2022-02-01', '2022-02-02', 18, 31, '2022-02-04 09:32:43', NULL),
(31, 'plygn1643938380377', '1', '1', 0, 2, '2022-02-05', '2022-02-06', 18, 31, '2022-02-04 09:33:00', '2022-02-05 17:53:21'),
(32, 'plygn1643940393748', '1', '1', 0, 2, '2022-02-04', '2022-02-06', 18, 32, '2022-02-04 10:06:33', NULL),
(33, 'hnd1643940401489', '1', '1', 0, 2, '2022-02-04', '2022-02-06', 18, 33, '2022-02-04 10:06:41', NULL),
(34, 'hnd1643940404799', '1', '1', 0, 2, '2022-02-04', '2022-02-06', 18, 34, '2022-02-04 10:06:44', NULL),
(35, 'hnd1643940410475', '0', '1', 0, 2, '2022-02-04', '2022-02-06', 18, 34, '2022-02-04 10:06:50', '2022-02-09 18:03:33'),
(36, 'hnd1643940429772', '0', '0', 0, 2, '2022-02-04', '2022-02-06', 23, 34, '2022-02-04 10:07:09', '2022-02-09 17:36:40'),
(38, 'hnd1644414425944', '0', '0', 40000, 4, '2022-02-09', '2022-02-10', 28, 34, '2022-02-09 21:47:05', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `gender` enum('female','male') NOT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(80) NOT NULL,
  `image` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `gender`, `birthdate`, `address`, `image`, `created_at`, `updated_at`) VALUES
(1, 'nabil', 'nabil@mail.com', '081290912312', 'male', '2002-01-01', 'Jl. Cendana 2', NULL, '2022-01-28 17:08:12', '2022-02-03 15:34:43'),
(7, 'Samantha', 'samanthadoe22@gmail.com', '081348287878', 'female', '2002-01-12', 'Iskandar Street 102', NULL, '2022-01-31 19:35:33', '2022-02-05 17:06:11'),
(14, 'Samantha Doe', 'samanthadoe1@gmail.com', '081328287878', 'female', '2002-01-12', 'Iskandar Street Block A Number 102', NULL, '2022-01-31 21:32:11', '2022-01-31 21:51:31'),
(18, 'aris', 'aris@gmail.com', '081348287878', 'male', '2002-01-12', 'Iskandar Street Block A Number 1123', NULL, '2022-02-01 13:30:37', '2022-02-04 15:05:17'),
(23, 'yudi', 'yudi@mail.com', '0891233243345', 'male', '2002-01-02', 'Sudiang', NULL, '2022-02-03 15:30:50', '2022-02-03 15:31:50'),
(24, 'dimas', 'dimas@mail.com', '0872343424344', 'male', '2002-01-03', 'BTP', NULL, '2022-02-03 15:33:30', '2022-02-03 15:34:31'),
(25, 'haisah', 'haisah@gmail.com', '081348287324', 'female', '2002-01-31', 'BTP', NULL, '2022-02-03 15:35:40', NULL),
(27, 'fadhil', 'fadhil@gmail.com', '081234287324', 'male', '2003-05-21', 'btp', 'uploads\\image-1644371324870-164961008.png', '2022-02-05 17:11:20', '2022-02-09 09:48:44'),
(28, 'aksa', 'aksa@mail.com', '08945323412', 'male', '2002-05-06', 'bandung', 'uploads\\image-1644328062793-569558847.png', '2022-02-08 21:47:42', NULL),
(29, 'aksal', 'aksal@mail.com', '08945323413', 'male', '2002-05-06', 'bandung', 'uploads\\image-1644329103982-183841109.png', '2022-02-08 22:05:03', NULL),
(30, 'ihsan', 'ihsan@mail.com', '08945323789', 'male', '2002-05-06', 'solo', 'uploads\\image-1644371396854-113505011.png', '2022-02-09 09:49:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `prepayment` enum('1','0') NOT NULL,
  `capacity` int(10) NOT NULL,
  `qty` int(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `image` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `price`, `prepayment`, `capacity`, `qty`, `location`, `image`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'honda civic', 400000, '0', 4, 8, 'makassar', NULL, 2, '2022-01-26 18:16:32', '2022-02-03 23:04:14'),
(3, 'honda brio', 350000, '0', 4, 5, 'bandung', NULL, 2, '2022-01-26 22:06:09', '2022-02-03 23:04:47'),
(19, 'honda supra x', 100000, '0', 2, 5, 'makassar', NULL, 3, '2022-01-30 13:05:11', '2022-02-03 23:04:47'),
(20, 'toyota yaris', 150000, '0', 4, 3, 'makassar', NULL, 2, '2022-01-30 13:05:48', '2022-02-03 23:04:47'),
(21, 'toyota alphard', 150000, '0', 6, 4, 'jakarta', NULL, 2, '2022-01-31 10:35:25', '2022-02-03 23:04:47'),
(31, 'polygon bromo', 50000, '0', 1, 3, 'makassar', NULL, 4, '2022-02-03 14:47:48', '2022-02-03 23:04:47'),
(32, 'polygon hijack', 60000, '0', 1, 3, 'makassar', NULL, 4, '2022-02-03 16:43:00', '2022-02-03 23:04:47'),
(33, 'honda revo', 70000, '0', 2, 4, 'palu', NULL, 3, '2022-02-03 16:43:35', '2022-02-03 23:04:47'),
(34, 'honda beat', 80000, '1', 2, 6, 'surabaya', NULL, 3, '2022-02-03 16:43:54', '2022-02-03 23:05:13'),
(35, 'yamaha mio', 90000, '0', 2, 6, 'solo', NULL, 3, '2022-02-03 16:45:31', '2022-02-03 23:04:47'),
(36, 'honda br-v', 250000, '1', 6, 0, 'solo', NULL, 2, '2022-02-03 21:15:03', '2022-02-03 23:12:23'),
(37, 'honda cr-v', 150000, '0', 6, 2, 'bekasi', NULL, 2, '2022-02-03 22:34:40', '2022-02-03 23:04:47'),
(38, 'yamaha fazzio', 100000, '1', 2, 3, 'malang', NULL, 3, '2022-02-04 18:10:28', '2022-02-04 18:19:39'),
(39, 'yamaha nmax', 100000, '1', 2, 4, 'medan', 'uploads\\image-1644386689150-884075644.png', 3, '2022-02-04 18:11:42', '2022-02-09 14:06:17'),
(43, 'yamaha vixion', 200000, '1', 2, 4, 'makassar', 'uploads\\image-1644373152549-179580467.png', 3, '2022-02-09 10:19:12', NULL),
(45, 'yamaha jupiter mx', 100000, '1', 2, 4, 'makassar', 'uploads\\image-1644374510519-190106682.png', 3, '2022-02-09 10:41:50', NULL),
(46, 'yamaha jupiter xr', 150000, '1', 2, 4, 'pare-pare', 'uploads\\image-1644375854837-206117284.png', 3, '2022-02-09 11:04:14', NULL),
(48, 'daihatsu ayla', 300000, '1', 4, 4, 'wajo', 'uploads\\image-1644386744966-266378402.png', 2, '2022-02-09 14:01:32', '2022-02-09 14:05:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`,`vehicle_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
