-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2022 at 03:17 AM
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
(43, 'hnd1644800897112', '1', '1', 0, 2, '2022-02-14', '2022-02-15', 42, 19, '2022-02-14 09:08:17', '2022-03-06 17:11:54', NULL),
(44, 'tyt1644800914846', '1', '1', 0, 1, '2022-02-14', '2022-02-15', 42, 20, '2022-02-14 09:08:34', '2022-03-06 17:11:54', NULL),
(45, 'hnd1644811700314', '1', '1', 0, 1, '2022-02-14', '2022-02-15', 46, 19, '2022-02-14 12:08:20', '2022-03-06 17:11:54', NULL),
(46, 'hnd1644876722072', '1', '1', 0, 1, '2022-02-14', '2022-02-15', 45, 19, '2022-02-15 06:12:02', '2022-03-06 17:11:54', NULL),
(47, 'hnd1646530498045', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 39, 1, '2022-03-06 09:34:58', '2022-03-06 17:11:54', NULL),
(48, 'hnd1646538106780', '1', '1', 0, 1, '2022-03-06', '2022-03-31', 45, 1, '2022-03-06 11:41:46', '2022-03-06 17:11:54', NULL),
(49, 'hnd1646545202313', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 45, 3, '2022-03-06 13:40:02', '2022-03-06 17:11:54', NULL),
(50, 'hnd1646548945510', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 14:42:25', '2022-03-06 17:11:54', NULL),
(51, 'hnd1646550161582', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 15:02:41', '2022-03-06 17:11:54', NULL),
(52, 'hnd1646550402615', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 15:06:42', '2022-03-06 17:11:54', NULL),
(53, 'hnd1646550509974', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 15:08:29', '2022-03-06 17:11:54', NULL),
(54, 'hnd1646554945127', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 16:22:25', '2022-03-06 17:11:54', NULL),
(55, 'hnd1646555748977', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 16:35:48', '2022-03-06 17:11:54', NULL),
(56, 'hnd1646558047310', '0', '0', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:14:07', NULL, NULL),
(57, 'hnd1646558283469', '1', '1', 0, 2, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:18:03', '2022-03-07 01:24:23', NULL),
(58, 'hnd1646558393689', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:19:53', '2022-03-07 01:22:57', NULL),
(59, 'hnd1646558879718', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:27:59', '2022-03-07 01:14:00', NULL),
(60, 'hnd1646558936470', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:28:56', '2022-03-07 01:24:37', '2022-03-07 01:24:37'),
(61, 'hnd1646558987348', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:29:47', '2022-03-07 01:11:38', '2022-03-07 00:28:31'),
(62, 'hnd1646559281836', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 1, '2022-03-06 17:34:41', '2022-03-07 00:16:46', '2022-03-07 00:16:46'),
(63, 'hnd1646559365514', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:36:05', '2022-03-07 00:16:01', '2022-03-07 00:16:01'),
(64, 'hnd1646559516104', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:38:36', '2022-03-07 00:15:10', '2022-03-07 00:15:10'),
(65, 'hnd1646559733032', '0', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:42:13', '2022-03-07 00:14:36', '2022-03-07 00:14:36'),
(66, 'hnd1646559813355', '1', '1', 0, 1, '2022-03-06', '2022-03-07', 42, 34, '2022-03-06 17:43:33', '2022-03-07 00:07:15', '2022-03-07 00:07:15');

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
(120, 707859, 'reset', 0, 44, NULL, '2022-02-16 08:07:48', NULL),
(121, 322378, 'verify', 0, 48, NULL, '2022-02-16 08:10:55', NULL),
(122, 273876, 'verify', 0, 49, NULL, '2022-02-16 08:12:43', NULL),
(123, 110334, 'verify', 0, NULL, NULL, '2022-02-16 09:47:22', NULL),
(124, 644702, 'verify', 1, 51, '2022-02-16 12:33:15', '2022-02-16 09:48:59', '2022-02-16 12:33:15'),
(125, 349493, 'reset', 1, 51, '2022-02-16 13:39:21', '2022-02-16 13:37:57', '2022-02-16 13:39:21'),
(126, 332809, 'verify', 1, 52, '2022-02-16 13:51:42', '2022-02-16 13:46:14', '2022-02-16 13:51:42'),
(128, 700813, 'reset', 0, 51, NULL, '2022-02-16 13:49:18', NULL);

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
(42, 'ilyas', NULL, 'ilyasana95@gmail.com', '1', '082134552324', 'male', '2005-02-07', 'btp blok af no.66', '$2a$10$iIC29fsghVjoA7fxHR7xLe22CXF/n0HZ0I5jekxuHzc5hwO1q8FnW', 'uploads\\image-1646618538086-327765713.jpg', 2, '2022-02-12 13:53:40', '2022-03-07 10:02:18'),
(43, 'hardiansa', 'hardiansa8039', 'hardiansa8039@gmail.com', '0', '082134552325', NULL, NULL, NULL, '$2a$10$Fj6nloUWXxqmIvgQmNN4qOfH8ypsHXhVlNlESpqIgwKyHb4kQlxcm', NULL, 2, '2022-02-14 08:47:17', '2022-02-15 07:03:34'),
(44, 'dimas', 'dimas', 'dimas@mail.com', '0', '082134552234', NULL, NULL, NULL, '$2a$10$DBKOTNF3/H3BRPA4RXmeGO9TtUqEys6xE7xhVR2IOtYHpuHMb8oBi', NULL, 2, '2022-02-14 08:48:47', '2022-02-15 07:03:34'),
(45, 'admin', 'admin', 'admin@vehicle.rent.mail.com', '1', '082134552123', NULL, NULL, NULL, '$2a$10$qpOXzPAFYkH53hcQ./pV5euBE/b23wPLX/SwonELpe9Z3IL2USByK', 'uploads\\image-1646406113231-700762147.png', 1, '2022-02-14 08:49:32', '2022-03-04 23:01:53'),
(46, 'vosesif', 'vosesif312', 'vosesif312@balaket.com', '1', '082134552345', NULL, NULL, NULL, '$2a$10$TW7PxH3/sihDCdZQQ0rdzOmaSbe07GtcEwAV7ycjDENpKUlHrjJlC', NULL, 2, '2022-02-14 12:06:45', '2022-02-15 07:03:34'),
(47, 'vihoriv', 'vihoriv483', 'vihoriv483@balaket.com', '0', '082134552213', NULL, NULL, NULL, '$2a$10$sTAAB3StJXxr3S47mfo5muiOExnU4ynRGMm8IIdQz1UtNYJ5lQyey', NULL, 2, '2022-02-15 10:55:52', NULL),
(48, 'yudi', 'yudi', 'yudi@mail.com', '0', '082134552112', NULL, NULL, NULL, '$2a$10$g2qwGgzzJJJfi4CQh4q9H.2.NX0bg7QP.HXFj2qn6xPpdjcOqKk2u', NULL, 2, '2022-02-16 08:10:55', NULL),
(49, 'ambo', 'ambo', 'ambo@mail.com', '0', '082134552999', NULL, NULL, NULL, '$2a$10$slKRJFBtVWHYVmdq3NJ33OKdDQoei0.QbG/3Y6N72vl7JOQfZ7EGC', NULL, 2, '2022-02-16 08:12:43', NULL),
(51, 'seleri', 'seleri7379', 'seleri7379@diolang.com', '1', '082134552900', NULL, NULL, NULL, '$2a$10$vPzdeJ6PIs717Oz/Jrh98O1OnNux9SCZZ5xptoHE3TBNk1TYGJar6', NULL, 2, '2022-02-16 09:48:59', '2022-02-16 13:39:21'),
(52, 'yinivih', 'yinivih443', 'yinivih443@alfaceti.com', '1', '082134552989', NULL, NULL, NULL, '$2a$10$Q9UJp8s1zbvBG4eksC75WuKw8Kgb1ZwAlvJZIGhXUcbyVc7RGvmXi', NULL, 2, '2022-02-16 13:46:14', '2022-02-16 13:51:42');

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
(1, 'honda civic', 400000, '0', 4, 8, 'makassar', 'uploads\\image-1646533984311-149996667.jpg', 2, '2022-01-26 18:16:32', '2022-03-06 10:33:04'),
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
(53, 'toyota supra', 300000, '1', 2, 5, 'wajo', 'uploads\\image-1645710162903-683263271.jpg', 2, '2022-02-14 18:20:22', '2022-02-24 21:42:42');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `otp_codes`
--
ALTER TABLE `otp_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
