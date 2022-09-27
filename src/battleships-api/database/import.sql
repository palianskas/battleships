-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2022 at 07:19 PM
-- Server version: 10.9.3-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `battleships`
--

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `isPregame` tinyint(1) NOT NULL DEFAULT 0,
  `matchSettingsId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `matches`
--

INSERT INTO `matches` (`id`, `name`, `isPregame`, `matchSettingsId`) VALUES
(61, 'New match', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `matchsettings`
--

CREATE TABLE `matchsettings` (
  `id` int(11) NOT NULL,
  `gameMode` int(11) NOT NULL,
  `useDice` tinyint(1) NOT NULL,
  `matchId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `matchId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_match_matchSettingsId` (`matchSettingsId`);

--
-- Indexes for table `matchsettings`
--
ALTER TABLE `matchsettings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_matchSettings_matchId` (`matchId`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_matchId` (`matchId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `matchsettings`
--
ALTER TABLE `matchsettings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `fk_match_matchSettingsId` FOREIGN KEY (`matchSettingsId`) REFERENCES `matchsettings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `matchsettings`
--
ALTER TABLE `matchsettings`
  ADD CONSTRAINT `fk_matchSettings_matchId` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`);

--
-- Constraints for table `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `fk_matchId` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
