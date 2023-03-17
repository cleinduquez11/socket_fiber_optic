-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2023 at 11:29 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `try`
--

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `actuators` varchar(255) NOT NULL,
  `time_on` varchar(255) DEFAULT NULL,
  `time_off` varchar(255) DEFAULT NULL,
  `monday` tinyint(1) NOT NULL,
  `tuesday` tinyint(1) NOT NULL,
  `wednesday` tinyint(1) NOT NULL,
  `thursday` tinyint(1) NOT NULL,
  `friday` tinyint(1) NOT NULL,
  `saturday` tinyint(1) NOT NULL,
  `sunday` tinyint(1) NOT NULL,
  `everyday` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `actuators`, `time_on`, `time_off`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`, `everyday`) VALUES
(1, 'Grow Light', '', '17:59', 0, 0, 0, 0, 1, 0, 0, 0),
(2, 'Water Pump', '17:55', '18:07', 0, 1, 0, 0, 1, 0, 0, 0),
(3, 'Mist', '19:06', '18:06', 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'fan', '19:05', '17:55', 0, 0, 0, 0, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sensorreadings1`
--

CREATE TABLE `sensorreadings1` (
  `id` int(8) NOT NULL,
  `Water_Temperature` float NOT NULL,
  `Ph_Value` float NOT NULL,
  `Ec_Value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensorreadings1`
--

INSERT INTO `sensorreadings1` (`id`, `Water_Temperature`, `Ph_Value`, `Ec_Value`) VALUES
(1, 45.3, 20.1, 16.3),
(2, 34, 23, 56),
(3, 2102, 123, 34213),
(4, 2102, 123, 34213),
(5, 12, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `sensorreadings2`
--

CREATE TABLE `sensorreadings2` (
  `id` int(8) NOT NULL,
  `Humidity` float NOT NULL,
  `Room_Temp` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensorreadings2`
--

INSERT INTO `sensorreadings2` (`id`, `Humidity`, `Room_Temp`) VALUES
(1, 89, 26),
(2, 23, 43),
(3, 123, 57657),
(4, 19, 56),
(5, 23, 46),
(6, 95, 38),
(7, 56, 23),
(8, 96, 27),
(9, 96, 27),
(10, 96, 27),
(11, 45, 34),
(12, 45, 34),
(13, 45, 34),
(14, 42, 45),
(15, 56, 23),
(16, 64, 46),
(17, 64, 20),
(18, 64, 28),
(19, 64, 23),
(20, 89, 20),
(21, 89, 20),
(22, 89, 28),
(23, 90, 30),
(24, 90, 40),
(25, 90, 45),
(26, 90, 12),
(27, 90, 24),
(28, 90, 12),
(29, 90, 12),
(30, 86, 34);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(255) NOT NULL,
  `fan_status` varchar(255) NOT NULL,
  `light_status` varchar(255) NOT NULL,
  `pump_status` varchar(255) NOT NULL,
  `mist_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `fan_status`, `light_status`, `pump_status`, `mist_status`) VALUES
(1, 'OFF', 'ON', 'OFF', 'OFF');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sensorreadings1`
--
ALTER TABLE `sensorreadings1`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sensorreadings2`
--
ALTER TABLE `sensorreadings2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sensorreadings1`
--
ALTER TABLE `sensorreadings1`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sensorreadings2`
--
ALTER TABLE `sensorreadings2`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
