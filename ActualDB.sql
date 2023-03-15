-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2023 at 06:30 PM
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
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `id` int(255) NOT NULL,
  `fan_status` varchar(255) NOT NULL,
  `light_status` varchar(255) NOT NULL,
  `pump_status` varchar(255) NOT NULL,
  `mist_status` varchar(255) NOT NULL,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sample`
--

INSERT INTO `sample` (`id`, `fan_status`, `light_status`, `pump_status`, `mist_status`, `temperature`, `humidity`) VALUES
(1, 'ON', 'OFF', 'OFF', 'ON', 25, 34);

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
(1, 45.3, 20.1, 16.3);

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
(1, 89, 26);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sensorreadings1`
--
ALTER TABLE `sensorreadings1`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sensorreadings2`
--
ALTER TABLE `sensorreadings2`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
