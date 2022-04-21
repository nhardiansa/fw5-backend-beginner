-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2022 at 04:17 AM
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
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `payment_code`, `payment`, `returned`, `prepayment`, `qty`, `start_rent`, `end_rent`, `user_id`, `vehicle_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(27, 'hnd1643938054913', '1', '1', 0, 1, '2022-02-02', '2022-02-04', NULL, 19, '2022-02-04 09:27:34', '2022-03-06 17:11:54', NULL),
(28, 'tyt1643938196795', '1', '1', 0, 2, '2022-02-01', '2022-02-02', NULL, 20, '2022-02-04 09:29:56', '2022-03-06 17:11:54', NULL),
(29, 'plygn1643938229752', '1', '1', 0, 2, '2022-02-01', '2022-02-02', NULL, 31, '2022-02-04 09:30:29', '2022-03-06 17:11:54', NULL),
(30, 'plygn1643938363311', '1', '1', 0, 2, '2022-02-01', '2022-02-02', NULL, 31, '2022-02-04 09:32:43', NULL, NULL),
(31, 'plygn1643938380377', '1', '1', 0, 2, '2022-02-05', '2022-02-06', NULL, 31, '2022-02-04 09:33:00', '2022-02-05 17:53:21', NULL),
(32, 'plygn1643940393748', '1', '1', 0, 2, '2022-02-04', '2022-02-06', NULL, 32, '2022-02-04 10:06:33', NULL, NULL),
(33, 'hnd1643940401489', '1', '1', 0, 2, '2022-02-04', '2022-02-06', NULL, 33, '2022-02-04 10:06:41', NULL, NULL),
(34, 'hnd1643940404799', '1', '1', 0, 2, '2022-02-04', '2022-02-06', NULL, 34, '2022-02-04 10:06:44', '2022-03-06 17:11:22', NULL),
(35, 'hnd1643940410475', '1', '1', 0, 2, '2022-02-04', '2022-02-06', NULL, 34, '2022-02-04 10:06:50', '2022-03-06 17:11:22', NULL),
(36, 'hnd1643940429772', '1', '1', 0, 2, '2022-02-04', '2022-02-06', NULL, 34, '2022-02-04 10:07:09', '2022-03-06 17:11:54', NULL),
(39, 'hnd1644505447641', '1', '1', 0, 1, '2022-02-10', '2022-02-11', NULL, 34, '2022-02-10 23:04:07', '2022-03-06 17:11:54', NULL),
(40, 'hnd1644505574397', '1', '1', 0, 1, '2022-02-10', '2022-02-11', NULL, 34, '2022-02-10 23:06:14', '2022-03-06 17:11:54', NULL),
(41, 'hnd1644505667608', '1', '1', 0, 1, '2022-02-10', '2022-02-11', NULL, 34, '2022-02-10 23:07:47', '2022-03-06 17:11:54', NULL),
(42, 'hnd1644800874532', '1', '1', 0, 2, '2022-02-14', '2022-02-15', 42, 3, '2022-02-14 09:07:54', '2022-02-14 09:10:56', '2022-02-14 09:10:56'),
(43, 'hnd1644800897112', '1', '1', 0, 2, '2022-02-14', '2022-02-15', 42, 19, '2022-02-14 09:08:17', '2022-03-08 08:57:26', '2022-03-08 08:57:26'),
(44, 'tyt1644800914846', '1', '1', 0, 1, '2022-02-14', '2022-02-15', 42, 20, '2022-02-14 09:08:34', '2022-03-08 09:02:06', '2022-03-08 09:02:06'),
(45, 'hnd1644811700314', '1', '1', 0, 1, '2022-02-14', '2022-02-15', 46, 19, '2022-02-14 12:08:20', '2022-03-06 17:11:54', NULL),
(46, 'hnd1644876722072', '1', '1', 0, 1, '2022-02-14', '2022-02-15', 45, 19, '2022-02-15 06:12:02', '2022-03-06 17:11:54', NULL),
(47, 'hnd1646530498045', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 39, 1, '2022-03-06 09:34:58', '2022-03-06 17:11:54', NULL),
(48, 'hnd1646538106780', '1', '1', 0, 1, '2022-03-06', '2022-03-31', 45, 1, '2022-03-06 11:41:46', '2022-03-06 17:11:54', NULL),
(49, 'hnd1646545202313', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 45, 3, '2022-03-06 13:40:02', '2022-03-06 17:11:54', NULL),
(50, 'hnd1646548945510', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 14:42:25', '2022-03-08 09:03:54', '2022-03-08 09:03:54'),
(51, 'hnd1646550161582', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 15:02:41', '2022-03-08 09:10:35', '2022-03-08 09:10:35'),
(52, 'hnd1646550402615', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 15:06:42', '2022-03-06 17:11:54', NULL),
(53, 'hnd1646550509974', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 15:08:29', '2022-03-06 17:11:54', NULL),
(54, 'hnd1646554945127', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 16:22:25', '2022-03-06 17:11:54', NULL),
(55, 'hnd1646555748977', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 16:35:48', '2022-03-07 11:16:29', '2022-03-07 11:16:29'),
(56, 'hnd1646558047310', '0', '0', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:14:07', NULL, NULL),
(57, 'hnd1646558283469', '1', '1', 0, 2, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:18:03', '2022-03-07 11:14:07', '2022-03-07 11:14:07'),
(58, 'hnd1646558393689', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:19:53', '2022-03-07 11:13:36', '2022-03-07 11:13:36'),
(59, 'hnd1646558879718', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:27:59', '2022-03-07 11:06:48', '2022-03-07 11:06:48'),
(60, 'hnd1646558936470', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:28:56', '2022-03-07 01:24:37', '2022-03-07 01:24:37'),
(61, 'hnd1646558987348', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:29:47', '2022-03-07 01:11:38', '2022-03-07 00:28:31'),
(62, 'hnd1646559281836', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:34:41', '2022-03-07 00:16:46', '2022-03-07 00:16:46'),
(63, 'hnd1646559365514', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:36:05', '2022-03-07 00:16:01', '2022-03-07 00:16:01'),
(64, 'hnd1646559516104', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:38:36', '2022-03-07 00:15:10', '2022-03-07 00:15:10'),
(65, 'hnd1646559733032', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:42:13', '2022-03-07 00:14:36', '2022-03-07 00:14:36'),
(66, 'hnd1646559813355', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:43:33', '2022-03-07 00:07:15', '2022-03-07 00:07:15'),
(67, 'hnd1646626025510', '1', '1', 0, 1, '2022-03-07', '2022-03-08', 42, 34, '2022-03-07 12:07:05', '2022-03-07 12:07:08', NULL),
(68, 'hnd1646626043479', '1', '1', 0, 1, '2022-03-07', '2022-03-08', 42, 19, '2022-03-07 12:07:23', '2022-03-07 12:07:26', NULL),
(69, 'hnd1646626054233', '1', '0', 0, 1, '2022-03-07', '2022-03-08', 42, 1, '2022-03-07 12:07:34', '2022-03-07 12:08:45', NULL),
(70, 'hnd1646626232896', '0', '0', 0, 1, '2022-03-07', '2022-03-08', 42, 1, '2022-03-07 12:10:32', NULL, NULL),
(71, 'hnd1646626240624', '0', '0', 0, 1, '2022-03-07', '2022-03-08', 42, 1, '2022-03-07 12:10:40', NULL, NULL),
(72, 'hnd1646638451355', '1', '1', 0, 1, '2022-03-08', '2022-03-10', 42, 34, '2022-03-07 15:34:11', '2022-03-08 09:09:48', '2022-03-08 09:09:48'),
(73, 'hnd1646709591506', '1', '1', 0, 2, '2022-03-09', '2022-03-12', 58, 19, '2022-03-08 11:19:51', '2022-03-08 11:20:48', '2022-03-08 11:20:48'),
(74, 'hnd1648998251397', '1', '0', 0, 1, '2022-04-06', '2022-04-07', 62, 3, '2022-04-03 23:04:11', '2022-04-05 10:46:38', NULL),
(75, 'hnd1648998985664', '0', '0', 0, 4, '2022-04-06', '2022-04-07', 62, 3, '2022-04-03 23:16:25', NULL, NULL),
(76, 'hnd1649118601676', '0', '0', 0, 4, '2022-04-07', '2022-04-08', 62, 19, '2022-04-05 08:30:01', NULL, NULL),
(77, 'hnd1649120736126', '1', '0', 0, 1, '2022-04-07', '2022-04-08', 62, 19, '2022-04-05 09:05:36', '2022-04-05 15:22:16', NULL),
(78, 'hnd1649122771050', '1', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 1, '2022-04-05 09:39:31', '2022-04-06 14:25:41', NULL),
(79, 'hnd1649125798046', '1', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 1, '2022-04-05 10:29:58', '2022-04-05 10:51:54', NULL),
(80, 'hnd1649141477938', '1', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 33, '2022-04-05 14:51:17', '2022-04-05 14:51:21', NULL),
(81, 'hnd1649145796694', '0', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 1, '2022-04-05 16:03:16', NULL, NULL),
(82, 'hnd1649146128707', '0', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 1, '2022-04-05 16:08:48', NULL, NULL),
(83, 'hnd1649146281053', '0', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 33, '2022-04-05 16:11:21', NULL, NULL),
(84, 'hnd1649149004027', '1', '1', 0, 1, '2022-04-05', '2022-04-06', 62, 33, '2022-04-05 16:56:44', '2022-04-12 07:56:05', '2022-04-12 07:56:05'),
(85, 'hnd1649149321717', '0', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 34, '2022-04-05 17:02:01', NULL, NULL),
(86, 'ymh1649149379167', '0', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 35, '2022-04-05 17:02:59', NULL, NULL),
(87, 'plygn1649149498364', '0', '0', 0, 1, '2022-04-05', '2022-04-06', 62, 31, '2022-04-05 17:04:58', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `otp_codes`
--

CREATE TABLE `otp_codes` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `type` enum('verify','reset') DEFAULT NULL,
  `is_expired` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `otp_codes`
--

INSERT INTO `otp_codes` (`id`, `code`, `type`, `is_expired`, `user_id`, `expired_at`, `created_at`, `updated_at`) VALUES
(123, 110334, 'verify', 0, NULL, NULL, '2022-02-16 09:47:22', NULL),
(124, 644702, 'verify', 1, 51, '2022-02-16 12:33:15', '2022-02-16 09:48:59', '2022-02-16 12:33:15'),
(125, 349493, 'reset', 1, 51, '2022-02-16 13:39:21', '2022-02-16 13:37:57', '2022-02-16 13:39:21'),
(126, 332809, 'verify', 1, 52, '2022-02-16 13:51:42', '2022-02-16 13:46:14', '2022-02-16 13:51:42'),
(128, 700813, 'verify', 1, 51, '2022-03-07 20:47:38', '2022-02-16 13:49:18', '2022-03-07 20:47:38'),
(129, 386886, 'verify', 1, 54, '2022-03-07 16:46:16', '2022-03-07 16:45:23', '2022-03-07 16:46:16'),
(131, 133682, 'verify', 1, 56, '2022-03-07 20:38:58', '2022-03-07 20:23:24', '2022-03-07 20:38:58'),
(136, 646950, 'reset', 1, 44, '2022-03-07 20:59:04', '2022-03-07 20:58:25', '2022-03-07 20:59:04'),
(137, 599196, 'reset', 1, 42, '2022-03-07 21:00:24', '2022-03-07 20:59:42', '2022-03-07 21:00:24'),
(138, 414316, 'verify', 1, 57, '2022-03-08 10:51:25', '2022-03-08 10:50:20', '2022-03-08 10:51:26'),
(139, 479130, 'reset', 1, 57, '2022-03-08 10:52:20', '2022-03-08 10:51:47', '2022-03-08 10:52:20'),
(140, 881305, 'verify', 1, 58, '2022-03-08 11:17:09', '2022-03-08 11:16:08', '2022-03-08 11:17:09'),
(143, 305386, 'verify', 1, 59, '2022-03-08 13:55:48', '2022-03-08 13:55:31', '2022-03-08 13:55:48'),
(144, 686367, 'verify', 1, 49, '2022-03-08 13:56:38', '2022-03-08 13:56:23', '2022-03-08 13:56:38'),
(157, 227183, 'verify', 1, 48, '2022-03-08 14:55:45', '2022-03-08 14:55:31', '2022-03-08 14:55:45'),
(158, 472892, 'reset', 1, 48, '2022-03-08 14:57:06', '2022-03-08 14:56:14', '2022-03-08 14:57:06'),
(159, 276137, 'reset', 1, 48, '2022-03-08 15:01:19', '2022-03-08 15:01:01', '2022-03-08 15:01:19'),
(160, 855827, 'verify', 0, 60, NULL, '2022-03-09 10:55:40', NULL),
(161, 100942, 'verify', 1, 61, '2022-03-12 14:41:35', '2022-03-12 14:40:39', '2022-03-12 14:41:35'),
(162, 145988, 'reset', 1, 61, '2022-03-12 14:42:31', '2022-03-12 14:41:51', '2022-03-12 14:42:31'),
(163, 510525, 'verify', 1, 62, '2022-03-28 19:12:26', '2022-03-28 19:11:47', '2022-03-28 19:12:26'),
(164, 126822, 'reset', 1, 62, '2022-03-28 19:14:01', '2022-03-28 19:13:15', '2022-03-28 19:14:01'),
(165, 306611, 'verify', 1, NULL, '2022-04-09 22:22:33', '2022-04-09 22:19:49', '2022-04-09 22:22:34'),
(166, 265253, 'verify', 1, NULL, '2022-04-09 22:24:34', '2022-04-09 22:24:01', '2022-04-09 22:24:34'),
(168, 365807, 'verify', 1, NULL, '2022-04-09 22:26:13', '2022-04-09 22:25:52', '2022-04-09 22:26:13'),
(169, 952111, 'verify', 0, NULL, NULL, '2022-04-09 22:37:19', NULL),
(170, 983750, 'verify', 0, NULL, NULL, '2022-04-09 22:38:16', NULL),
(171, 292852, 'verify', 1, 68, '2022-04-09 22:44:43', '2022-04-09 22:43:50', '2022-04-09 22:44:43'),
(174, 665276, 'reset', 1, 68, '2022-04-09 23:55:01', '2022-04-09 23:48:06', '2022-04-09 23:55:01'),
(175, 485911, 'reset', 1, 68, '2022-04-09 23:55:46', '2022-04-09 23:55:25', '2022-04-09 23:55:46'),
(176, 496217, 'reset', 1, 68, '2022-04-09 23:56:29', '2022-04-09 23:56:12', '2022-04-09 23:56:29'),
(187, 179824, 'verify', 1, 70, '2022-04-10 02:03:13', '2022-04-10 02:01:33', '2022-04-10 02:03:13'),
(189, 967400, 'verify', 1, 71, '2022-04-10 02:11:46', '2022-04-10 02:11:11', '2022-04-10 02:11:46'),
(191, 674222, 'verify', 1, 72, '2022-04-10 02:17:50', '2022-04-10 02:17:29', '2022-04-10 02:17:50'),
(193, 560012, 'reset', 1, 69, '2022-04-10 13:56:55', '2022-04-10 13:40:37', '2022-04-10 13:56:55'),
(198, 633450, 'verify', 1, 72, '2022-04-10 13:53:45', '2022-04-10 13:53:19', '2022-04-10 13:53:45'),
(200, 799882, 'reset', 1, 72, '2022-04-10 14:14:38', '2022-04-10 14:12:50', '2022-04-10 14:14:38'),
(201, 959353, 'reset', 1, 72, '2022-04-10 14:20:23', '2022-04-10 14:19:48', '2022-04-10 14:20:23'),
(202, 491922, 'reset', 1, 45, '2022-04-10 23:45:54', '2022-04-10 23:45:27', '2022-04-10 23:45:54'),
(204, 988977, 'verify', 1, 73, '2022-04-12 11:59:27', '2022-04-12 11:58:49', '2022-04-12 11:59:27'),
(205, 495162, 'reset', 1, 73, '2022-04-12 12:01:03', '2022-04-12 12:00:20', '2022-04-12 12:01:03');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'administrator', '2022-02-15 07:00:10', '2022-02-14 23:59:08'),
(2, 'member', '2022-02-15 07:00:10', '2022-02-14 23:59:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(80) NOT NULL,
  `confirmed` enum('1','0') NOT NULL DEFAULT '0',
  `phone` varchar(13) NOT NULL,
  `gender` enum('female','male') DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(80) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `image` text DEFAULT NULL,
  `role_id` int(11) DEFAULT 2,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `confirmed`, `phone`, `gender`, `birthdate`, `address`, `password`, `image`, `role_id`, `created_at`, `updated_at`) VALUES
(33, 'nabil', NULL, 'nabil@nmail.com', '1', '08213455653', NULL, '2002-03-08', NULL, '$2a$10$Cfg4uZr.xRZOdG/QnwWgx.JoKqUSFywi6h3lzkEvP826t1nZbFybG', NULL, 2, '2022-02-10 14:54:55', '2022-03-05 15:02:19'),
(34, 'aris', NULL, 'aris@nmail.com', '1', '08213455321', NULL, NULL, NULL, '$2a$10$hTVBWBouGb76Aahxc3VaPu1OIGkQXKtWa4uEXOHU7m2K/LX1yIUJS', NULL, 2, '2022-02-10 14:57:33', '2022-02-15 07:03:34'),
(35, 'aris', NULL, 'aris@vehicle.rent.mail.com', '1', '08213455342', NULL, NULL, NULL, '$2a$10$7TBZcxOeYGrxIoFmZrlR2OeIi021a1oEGOdZwW/UwsUWEDDpevnCS', NULL, 2, '2022-02-10 15:30:47', '2022-02-15 07:03:34'),
(39, 'ihsanul', NULL, 'ihsanul@nmail.com', '1', '08213455231', 'male', NULL, NULL, '$2a$10$Ivq5a6goV2t/wRLsSGn1t.ZHEVbF.LBlwbDoD.ApsW6GM4Lp3u2NW', 'uploads\\image-1646618868577-507612600.jpg', 2, '2022-02-10 18:23:28', '2022-03-07 10:09:01'),
(41, 'ahsan', NULL, 'ahsan@nmail.com', '1', '082134552453', NULL, NULL, NULL, '$2a$10$m1RjHZr3doc0hRD84DoYL.zX/VlkDXLJjptZrg.v8GQ6F0ClejPCy', NULL, 2, '2022-02-10 21:54:54', '2022-02-15 07:03:34'),
(42, 'ilyasa', NULL, 'ilyasana95@gmail.com', '1', '082134552323', 'male', '2005-02-08', 'btp blok af no.67', '$2a$10$qkYlG21SD09Habyt6fpC9eZPrSG7lsTAntI8dFIOdTvD1dEJPWvB2', 'uploads\\image-1646659793417-693841282.jpg', 2, '2022-02-12 13:53:40', '2022-03-07 21:29:53'),
(43, 'hardiansa', 'hardiansa8039', 'hardiansa8039@gmail.com', '0', '082134552325', NULL, NULL, NULL, '$2a$10$Fj6nloUWXxqmIvgQmNN4qOfH8ypsHXhVlNlESpqIgwKyHb4kQlxcm', NULL, 2, '2022-02-14 08:47:17', '2022-02-15 07:03:34'),
(44, 'dimas', 'dimas', 'dimas@mail.com', '1', '082134552234', NULL, NULL, NULL, '$2a$10$pTEXAu/dvZJmytiCCTX7O./Fj3cNaHKXhqkfDYM7h9DhzXAFu.aV.', NULL, 2, '2022-02-14 08:48:47', '2022-03-07 20:59:04'),
(45, 'admin', 'admin', 'admin@vehicle.rent.mail.com', '1', '082134552123', 'male', NULL, NULL, '$2a$10$hIh0WS3mV0H.09ARg/m.WOYJE6dVIUZqUri47cxK5HB2.h.KHykWq', 'https://res.cloudinary.com/ilyasana-95/image/upload/v1650253424/otorent/users/image-1650253423624-629904491.jpg', 1, '2022-02-14 08:49:32', '2022-04-18 11:43:46'),
(46, 'vosesif', 'vosesif312', 'vosesif312@balaket.com', '1', '082134552345', NULL, NULL, NULL, '$2a$10$TW7PxH3/sihDCdZQQ0rdzOmaSbe07GtcEwAV7ycjDENpKUlHrjJlC', NULL, 2, '2022-02-14 12:06:45', '2022-02-15 07:03:34'),
(47, 'vihoriv', 'vihoriv483', 'vihoriv483@balaket.com', '0', '082134552213', NULL, NULL, NULL, '$2a$10$sTAAB3StJXxr3S47mfo5muiOExnU4ynRGMm8IIdQz1UtNYJ5lQyey', NULL, 2, '2022-02-15 10:55:52', NULL),
(48, 'yudi', 'yudi', 'yudi@mail.com', '1', '082134552112', NULL, NULL, NULL, '$2a$10$SkKTbVNS.cn7IiZr96zX9upBc8lL6Jd1z3zJwrL4u/BahTWpXIDS.', NULL, 2, '2022-02-16 08:10:55', '2022-03-08 15:01:19'),
(49, 'ambo', 'ambo', 'ambo@mail.com', '1', '082134552999', NULL, NULL, NULL, '$2a$10$slKRJFBtVWHYVmdq3NJ33OKdDQoei0.QbG/3Y6N72vl7JOQfZ7EGC', NULL, 2, '2022-02-16 08:12:43', '2022-03-08 13:56:38'),
(51, 'seleri', 'seleri7379', 'seleri7379@diolang.com', '1', '082134552900', NULL, NULL, NULL, '$2a$10$vPzdeJ6PIs717Oz/Jrh98O1OnNux9SCZZ5xptoHE3TBNk1TYGJar6', NULL, 2, '2022-02-16 09:48:59', '2022-03-07 20:47:38'),
(52, 'yinivih', 'yinivih443', 'yinivih443@alfaceti.com', '1', '082134552989', NULL, NULL, NULL, '$2a$10$Q9UJp8s1zbvBG4eksC75WuKw8Kgb1ZwAlvJZIGhXUcbyVc7RGvmXi', NULL, 2, '2022-02-16 13:46:14', '2022-02-16 13:51:42'),
(54, 'posace', 'posace5831', 'posace5831@xindax.com', '1', '082134552984', NULL, NULL, NULL, '$2a$10$n6mPauNzOCPvH1E.VT7xROrBwXf/t3Jo7e31/5cRrfGvy27Jwdklm', NULL, 2, '2022-03-07 16:45:23', '2022-03-07 16:46:16'),
(56, 'kajame', 'kajame4046', 'kajame4046@votooe.com', '1', '082134552312', NULL, NULL, NULL, '$2a$10$8dUhK0u8iKmGk7MAZt8yNemJMN1PLLnv4wCgvR5OMfAhzHNfoOQZu', NULL, 2, '2022-03-07 20:23:24', '2022-03-07 20:38:58'),
(57, 'mirofi', 'mirofi8210', 'mirofi8210@vapaka.com', '1', '082134511323', NULL, NULL, NULL, '$2a$10$bP4ZkHcbR5gu7afk.mg20OpiQITLDyN5Y8oYHbUH/.lzJPdjKoj9W', NULL, 2, '2022-03-08 10:50:20', '2022-03-08 10:52:20'),
(58, 'bavit', 'bavit32186', 'bavit32186@votob.com', '1', '082131252323', 'female', '2006-05-14', NULL, '$2a$10$EPBn6WeW12aDiE8TiTmDtet8cWEisCZ1HLgCB2NpuFxcsePRxs3DW', 'uploads\\image-1646712619153-596132666.jpg', 2, '2022-03-08 11:16:08', '2022-03-08 12:10:19'),
(59, 'posace', 'posace02', 'posace02@xindax.com', '1', '082134552912', NULL, NULL, NULL, '$2a$10$hS1nXEmEo5ctNICooF4CruI1wujqYY2u2lsjtaiBgvS4SrU.ZAAOW', NULL, 2, '2022-03-08 13:54:23', '2022-03-08 13:55:48'),
(60, 'posace', 'posace04', 'posace04@xindax.com', '0', '082123552912', NULL, NULL, NULL, '$2a$10$1JKnMtgb22HFR7H.qVYOz.ae/pbCLqtDeqe5ka3vcq4bDSu4RjAam', NULL, 2, '2022-03-09 10:55:40', NULL),
(61, 'kajame', 'kajame46', 'kajame46@votooe.com', '1', '082134511123', NULL, NULL, NULL, '$2a$10$u9sRBargIfpV2Cx8n4J5TeoRN0IVGg5x7xfwwwRvhyVO8vYv6UZ86', NULL, 2, '2022-03-12 14:40:39', '2022-03-12 14:42:31'),
(62, 'nabil', 'lisibej833', 'lisibej833@minimeq.com', '1', '0821235522112', 'male', '2002-02-02', 'jl. cendana 2', '$2a$10$4wOW.g4GX3/dCztxFW14L.F2Fu7zKbe8abEQe46W3NViELIlvvCzW', 'uploads\\image-1649312344212-885911254.jpg', 2, '2022-03-28 19:11:47', '2022-04-07 14:37:18'),
(68, 'ngaji', 'yukngaji', 'yukngaji@mail.com', '1', '082123552231', NULL, NULL, NULL, '$2a$10$u5zVbOq1jSIfGoKXef79BO8ulSsz1NWw3ZvniczxH49/VhpiI0WKa', NULL, 2, '2022-04-09 22:43:50', '2022-04-09 23:56:30'),
(69, 'nabil', 'nabil', 'nabil@mail.com', '1', '081290945780', NULL, NULL, NULL, '$2a$10$UZ5CUmRVRdO.gQD/Z8do1Oufbt9PTyUgUzV47MDtQtf9q6L/8/SBK', NULL, 2, '2022-04-10 01:00:26', '2022-04-10 13:56:55'),
(70, 'debby', 'debby', 'debby@mail.com', '1', '081290945781', NULL, NULL, NULL, '$2a$10$0IeoePT08gIYJTkxXgCjn.IZuZxqix1PlzOWCl0ZqjGT9FWQq0l2G', NULL, 2, '2022-04-10 01:11:47', '2022-04-10 02:03:13'),
(71, 'anggi', 'anggi', 'anggi@mail.com', '1', '081290945782', NULL, NULL, NULL, '$2a$10$JdoyJddlD80JQyOOxR9kg.w93BHayEhuWqw5QhFZ28LezNMu5MUku', NULL, 2, '2022-04-10 02:09:37', '2022-04-10 02:11:46'),
(72, 'icha', 'icha', 'icha@mail.com', '1', '081290945783', NULL, NULL, NULL, '$2a$10$cEjptwR00E2JxTmG7rRvW.sw8pcXskXkWKkZBqTqyGxtMT6mndiAq', NULL, 2, '2022-04-10 02:15:06', '2022-04-10 14:20:23'),
(73, 'nosod', 'nosod', 'nosod21059@eosbuzz.com', '1', '0812909345332', NULL, NULL, NULL, '$2a$10$r43Xxq7vbSxHPcvbKeh42uL4Qr4VYD8nTA3uO1BZ1nQreOamkxQjO', NULL, 2, '2022-04-12 11:57:39', '2022-04-12 12:01:03');

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
(1, 'honda civic', 400000, '0', 4, 8, 'makassar', 'https://res.cloudinary.com/ilyasana-95/image/upload/v1650249815/otorent/vehicles/image-1650249787430-967985882.jpg', 2, '2022-01-26 18:16:32', '2022-04-18 10:43:38'),
(3, 'honda brio', 350000, '0', 4, 5, 'bandung', NULL, 2, '2022-01-26 22:06:09', '2022-02-03 23:04:47'),
(19, 'honda supra x', 100000, '0', 2, 5, 'makassar', 'uploads\\image-1645673185455-881725560.jpg', 3, '2022-01-30 13:05:11', '2022-02-24 11:26:25'),
(20, 'toyota yaris', 150000, '0', 4, 3, 'makassar', NULL, 2, '2022-01-30 13:05:48', '2022-02-03 23:04:47'),
(21, 'toyota alphard', 150000, '0', 6, 4, 'jakarta', NULL, 2, '2022-01-31 10:35:25', '2022-02-03 23:04:47'),
(31, 'polygon bromo', 50000, '0', 1, 3, 'makassar', NULL, 4, '2022-02-03 14:47:48', '2022-02-03 23:04:47'),
(32, 'polygon hijack', 60000, '0', 1, 3, 'makassar', NULL, 4, '2022-02-03 16:43:00', '2022-02-03 23:04:47'),
(33, 'honda revo', 70000, '0', 2, 4, 'palu', NULL, 3, '2022-02-03 16:43:35', '2022-02-03 23:04:47'),
(34, 'honda beat', 80000, '1', 2, 6, 'surabaya', 'uploads\\image-1645671191534-446268701.jpg', 3, '2022-02-03 16:43:54', '2022-02-24 10:53:11'),
(35, 'yamaha mio', 90000, '0', 2, 6, 'solo', NULL, 3, '2022-02-03 16:45:31', '2022-02-03 23:04:47'),
(36, 'honda br-v', 250000, '1', 6, 0, 'solo', NULL, 2, '2022-02-03 21:15:03', '2022-02-03 23:12:23'),
(37, 'honda cr-v', 150000, '0', 6, 2, 'bekasi', NULL, 2, '2022-02-03 22:34:40', '2022-02-03 23:04:47'),
(38, 'yamaha fazzio', 100000, '1', 2, 3, 'malang', NULL, 3, '2022-02-04 18:10:28', '2022-02-04 18:19:39'),
(39, 'yamaha nmax', 100000, '1', 2, 4, 'medan', 'uploads\\image-1645711178900-956927848.jpg', 3, '2022-02-04 18:11:42', '2022-02-24 21:59:38'),
(43, 'yamaha vixion', 200000, '1', 2, 4, 'makassar', 'uploads\\image-1645711193538-222468422.jpg', 3, '2022-02-09 10:19:12', '2022-02-24 21:59:53'),
(45, 'yamaha jupiter mx', 100000, '1', 2, 4, 'makassar', 'uploads\\image-1645711215751-428062157.jpg', 3, '2022-02-09 10:41:50', '2022-02-24 22:00:16'),
(46, 'yamaha jupiter xr', 150000, '1', 2, 4, 'pare-pare', 'uploads\\image-1645711233115-170690715.jpg', 3, '2022-02-09 11:04:14', '2022-02-24 22:00:33'),
(48, 'daihatsu ayla', 300000, '1', 4, 4, 'wajo', 'uploads\\image-1645710108131-261125238.jpg', 2, '2022-02-09 14:01:32', '2022-02-24 21:41:48'),
(51, 'daihatsu ayla', 355000, '1', 4, 4, 'wajo', 'uploads\\image-1645710128872-813202716.jpg', 2, '2022-02-10 10:19:28', '2022-02-24 21:42:08'),
(52, 'all new daihatsu ayla', 300000, '1', 2, 5, 'wajo', 'uploads\\image-1645710145832-751033225.jpg', 2, '2022-02-10 17:42:11', '2022-02-24 21:42:25'),
(53, 'toyota supra', 300000, '1', 2, 5, 'wajo', 'uploads\\image-1645710162903-683263271.jpg', 2, '2022-02-14 18:20:22', '2022-02-24 21:42:42'),
(54, 'toyota raize', 150000, '0', 4, 2, 'jakarta', 'uploads/image-1649616889471-742431711.jpg', 2, '2022-04-11 02:54:49', NULL),
(55, 'toyota astra', 400000, '0', 6, 3, 'bandung', 'uploads/image-1649617028326-789041239.jpg', 2, '2022-04-11 02:57:08', NULL),
(56, 'toyota mio', 400000, '0', 6, 3, 'bandung', 'uploads/image-1649617141428-264995856.jpg', 2, '2022-04-11 02:59:01', NULL),
(57, 'new honda jazz', 500000, '0', 4, 2, 'solo', 'uploads/image-1649617425826-396427385.jpg', 2, '2022-04-11 03:03:46', NULL),
(58, 'new honda mobilio', 500000, '0', 4, 2, 'solo', 'uploads/image-1649639322466-500781916.jpg', 2, '2022-04-11 09:08:42', NULL),
(59, 'new honda raize', 500000, '0', 4, 2, 'solo', 'uploads/image-1649639366887-586020856.jpg', 2, '2022-04-11 09:09:27', NULL),
(60, 'test', 50000, '0', 4, 1, 'makassar', 'uploads/image-1649735616135-952974162.jpg', 2, '2022-04-12 11:53:37', NULL),
(61, 'new honda avanza', 300000, '1', 2, 5, 'wajo', 'https://res.cloudinary.com/ilyasana-95/image/upload/v1650248956/otorent/vehicles/image-1650248955317-897159556.jpg', 2, '2022-04-18 10:29:19', NULL),
(62, 'new honda vario', 300000, '1', 2, 5, 'wajo', 'https://res.cloudinary.com/ilyasana-95/image/upload/v1650249107/otorent/vehicles/image-1650249105960-122961390.jpg', 3, '2022-04-18 10:31:50', NULL);

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
-- Indexes for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `otp_codes`
--
ALTER TABLE `otp_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

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
-- Constraints for table `otp_codes`
--
ALTER TABLE `otp_codes`
  ADD CONSTRAINT `otp_codes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
