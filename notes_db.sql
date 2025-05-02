-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Maj 2025, 20:12
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `notes_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(40) NOT NULL,
  `note` varchar(200) NOT NULL,
  `date` date DEFAULT NULL,
  `editedDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `notes`
--

INSERT INTO `notes` (`id`, `user_id`, `title`, `note`, `date`, `editedDate`) VALUES
(162, 1, 'sdf', 'sdf', NULL, NULL),
(190, 1, 'df', 'dff', NULL, NULL),
(230, 1, 'fggRAZ DWA moje moje m', 'RAZ DWA to jest tekst próbny do aplikacji zarządzanie notatelk s', NULL, NULL),
(236, 1, 'ds', 'dsfsf ppd ', NULL, NULL),
(239, 1, 'f', 'dfg', NULL, NULL),
(240, 1, 'dfg', 'fg', NULL, NULL),
(246, 1, 'df', 'fdg', NULL, NULL),
(251, 1, 'vcb', 'vcbvbc', NULL, NULL),
(252, 1, 'XXXXXXXXXXXXXXXXXXdsfd', 'To jest tekst pRÓBNY ABY ZOBACZYĆ CZY APLIKACJA DZIAŁA POPRAWNIE dsfd s dsd s  s dsdfs sd dsfds sf s fsf f fs dsff  fsf s ', NULL, '2025-03-25'),
(258, 1, 'dfg', 'fdgrgfgfgd', NULL, NULL),
(259, 1, 'dfgdf', 'fg', NULL, '2025-03-24'),
(260, 1, 'fg', 'fgfg', NULL, NULL),
(261, 1, 'd', 'cxvcxv', NULL, NULL),
(262, 1, 'dfs', 'sdfsdfzx', NULL, NULL),
(263, 1, 'dsf', 'dsf', NULL, NULL),
(264, 1, 'zx', 'zxx', NULL, NULL),
(265, 1, 'teksrt X', 'XXX XX XXX XXX XXXX XX XXX XXX XXX XXX XXX  XXX X XXX XX XXXXX X X XXXX XXXXX XXX', NULL, NULL),
(266, 1, 'dfg', 'NatomiaST TEN TEKST JEST PRÓBNY KONSTANTY NOPOLITAŃ ddfdfd dfdfd', NULL, NULL),
(267, 1, 'dfg', 'fdgg', NULL, NULL),
(268, 1, 'dfg', 'fdg', NULL, NULL),
(269, 1, 'fdggfd', 'dfggfd', NULL, NULL),
(270, 1, 'fdg', 'dfg', NULL, NULL),
(271, 1, 'gfddfg', 'fdg', NULL, NULL),
(273, 1, 'fdg', 'fdggf', NULL, NULL),
(274, 1, 'fdgfdg', 'gfd', NULL, NULL),
(275, 1, 'dfg', 'fdggf', NULL, NULL),
(276, 1, 'dfggfd', 'dfdf', NULL, NULL),
(277, 1, 'df', 'gdffgd', NULL, NULL),
(278, 1, 'fdg', 'fdg', NULL, NULL),
(281, 1, 'sdf', 'fd', NULL, NULL),
(282, 1, 'sdfssf', 'a', NULL, NULL),
(283, 1, 'afa', 'afffff', NULL, NULL),
(284, 1, 'afaf', 'afaf', NULL, NULL),
(285, 1, 'ASDAS AS AS SASSSccxcx', 'afavgfhgfhfghf gf h gf hf gf gf fg gf   fgh g  gfhf fghgf fg gf  gf f', NULL, NULL),
(288, 1, 'Bartek XXXXX XXXX MSMC', 'Film nazywa się atak lorem ipsum dolor set amet lorem ipsum do d', NULL, NULL),
(289, 1, 'sdfdsfdsfdsf sdf dfs f', 'dfsf dssdf dsf s ds dsdss dfss ffssdfsds dsdsfssf dds dss ds ds ', NULL, NULL),
(290, 1, 'Witaj świecie todjest ', 'Witaj świecie to mój pierwszy program fdg fgdf dfdfdgdf d gdgfg', NULL, NULL),
(291, 1, 'XXXXXXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', NULL, NULL),
(292, 1, 'dsffdsf sdfdsfds dsfds', 'sdfdsdfsdsf sdfdsfsdfdsf sdfdsdsfdssd dsfdsdfdsfdsf   sddsdssdsddsfdsdsfsds sdssddsddsdd sdsddssd', NULL, NULL),
(293, 1, 'vxcvvcx', 'xc', NULL, NULL),
(294, 1, 'xcv', 'xcvvcx', NULL, NULL),
(295, 1, 'xcv', 'xcvcxv', NULL, NULL),
(296, 1, 'xcvxcv', 'xcvvxc', NULL, NULL),
(300, 1, 'mój 2 ', 'mój 2', NULL, NULL),
(301, 1, 'sd dsf', ' ddsf', NULL, NULL),
(302, 1, 'sdf', 'sdfdfsfd', NULL, NULL),
(303, 1, 'dsfsfd', 'fdfsdfdfs dfs d  dsf ds ds  dsdsddsf ds ', NULL, NULL),
(304, 1, 'rewds', 'dsfdsfdfs', NULL, NULL),
(305, 1, 'dsf', 'sdfdsf', NULL, NULL),
(314, 10, 'fc', 'cxvcxv', NULL, NULL),
(317, 1, 'HEY ssd HEJ HEJEH JEKJ', 'HEY HET HEJ', NULL, NULL),
(319, 10, 'Mój', 'moja, MOJA', '2024-03-12', NULL),
(323, 1, 'dsfsfd', 'dsfsd', '2025-03-22', '2025-03-25'),
(330, 8, 'df', 'dfdfdf', '2025-03-22', '2025-03-24'),
(335, 8, 'df', 'df', '2025-03-24', NULL),
(336, 8, 'fgds', 'sdgdsggsdsgds sd g dsg dssd sdg dgsgsd dsg dgsdgsdsg sdgsd ds dsdf f fd dffdggfddf dfg fd fdf dsfdsf dsdss ds sd mój mój  ', '2025-03-24', '2025-03-25'),
(337, 8, 'df', 'dfgf', '2025-03-24', '2025-03-24'),
(338, 1, 'xcvxc', 'vxv', '2025-03-24', '2025-03-24'),
(339, 1, 't', 'gfh', '2025-03-24', NULL),
(341, 1, 'sdf', 'sdffds', '2025-03-24', NULL),
(343, 1, 'cxdf', 'xbcbcsdf', '2025-03-24', '2025-03-24'),
(344, 1, 'sad', 'sdada', '2025-03-25', NULL),
(345, 1, 'Dysk m2', 'dysk m2 nvme', '2025-03-25', '2025-03-25'),
(346, 1, 'd', 'dsfd', '2025-03-25', NULL),
(347, 8, 'fdg', 'dfggf', '2025-03-25', NULL),
(348, 8, 'cxvcvx', 'cxvcxv', '2025-03-25', NULL),
(350, 8, 'cvb', 'cvbvc', '2025-03-25', NULL),
(351, 8, 'Wielkanoc dfsffds dsds', 'dfpkdkj lkmfkl mdf fdgfdgfd fdg  d gdfgfdg fdg f ddg fd fd fdgfddgdg fdfg fd fdfd fdfd ', '2025-04-21', '2025-04-21'),
(352, 8, 'dfg', 'dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', '2025-04-21', NULL),
(353, 8, '', 'hjgjhgjhjkhbkjhbkjkjbjkbkjkjjbkbjkbkjbkbkbkjjkkbkbkjbjbjjjjjjjjjjjjjjjjjjjkjbkbblllblkbklbkljhb', '2025-04-21', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Bartek1', 'bartek@o2.pl', 'bartek3'),
(8, 'Bartek2', 'bartek2@o2.pl', 'bartek3'),
(10, 'Bart', 'moj@o2.pl', 'bartek3'),
(12, 'Bartek4', 'bartek3@o2.pl', 'bartek3'),
(13, 'Bartek5', 'bartek5@o2.pl', 'bartek3');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=354;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
