-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 08 juin 2022 à 15:35
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `syst_com`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(10) UNSIGNED NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `prenom`, `nom`, `email`, `ville`, `password`) VALUES
(1, 'Flavie', 'Da costa', 'f.da.costa@example.com', 'Pomoy', 'b444ac06613fc8d63795be9ad0beaf55011936ac'),
(2, 'Valentin', 'Vespasien', 'valentin@example.com', 'Buvilly', '109f4b3c50d7b0df729d299bc6f8e9ef9066971f'),
(3, 'Gustave', 'Collin', 'gust@example.com', 'Marseille', '3ebfa301dc59196f18593c45e519287a23297589'),
(4, 'Emilien', 'Camus', 'emilien@example.com', 'Toulouse', '1ff2b3704aede04eecb51e50ca698efd50a1379b'),
(5, 'Firmin', 'Marais', 'firmin.marais@example.com', 'Lyon', '911ddc3b8f9a13b5499b6bc4638a2b4f3f68bf23'),
(6, 'Olivier', 'Riou', 'olive.de.lugagnac@example.com', 'Lugagnac', 'a66df261120b6c2311c6ef0b1bab4e583afcbcc0'),
(7, 'Lucas', 'Jung', 'lucas.jung@example.com', 'Coulgens', 'ea3243132d653b39025a944e70f3ecdf70ee3994'),
(8, 'Maurice', 'Huet', 'maurice.villemareuil@example.com', 'Villemareuil', 'd03f9d34194393019e6d12d7c942827ebd694443'),
(9, 'Manon', 'Durand', 'm.durand.s.e@example.com', 'Saint-Etienne', '53d525836cc96d089a5a4218b464fda532f7debe'),
(10, 'Joachim', 'Leon', 'joachim@example.com', 'Longwy-sur-le-Doubs', '168f4029f416ee06565f12e697dfc1534ae69d32'),
(11, 'Muriel', 'Dupuis', 'muriel@example.com', 'Paris', '100c4e57374fc998e57164d4c0453bd3a4876a58'),
(12, 'Christiane', 'Riou', 'chritianelesabrets@example.com', 'Les Abrets', '4ff1a33e188b7b86123d6e3be2722a23514a83b4'),
(13, 'Jacinthe', 'Langlois', 'jacinthe.langlois@example.com', 'Lagney', 'd804cd9cc0c42b0652bab002f67858ab803c40c6'),
(14, 'Amaury', 'Payet', 'amaury@example.com', 'Avermes', 'd79336a97da7d284c0fe15497d2fa944d1f2abb1'),
(15, 'Maris', 'Buisson', 'maris@example.com', 'Le Havre', '61bb70fa60368f069e62d601c357d203700ab2d2'),
(16, 'Fabrice', 'Foucher', 'fab.montlouis@example.com', 'Montlouis', '1fbefee9cfb86926757519357e077fd6a21aef0f'),
(17, 'Patrick', 'Saunier', 'patrick.saunier@example.com', 'Saligney', '08a25c0f270b29aeba650e6b2d1a9947a778c5da'),
(18, 'Emile', 'Ramos', 'emile@example.com', 'Arzay', 'cfc996a3aaac95f0fb508f46499dcb72b6d0abee'),
(19, 'Armel', 'Vigneron', 'armel.delain@example.com', 'Delain', 'bba019890aec72f6dd6b4e98513055cae61df098'),
(20, 'Arnaude', 'Vallee', 'armaude.vallee@example.com', 'Hostias', '57e5a4df68387d1d97210cf40c41104ce9256cf6');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `date_achat` date NOT NULL,
  `reference` varchar(255) NOT NULL,
  `cache_prix_total` float NOT NULL,
  `category` tinyint(3) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id`, `client_id`, `date_achat`, `reference`, `cache_prix_total`, `category`) VALUES
(25, 9, '2019-02-01', '007879', 472.82, 2),
(26, 8, '2019-02-02', '007277', 784, 3),
(27, 11, '2019-02-02', '002745', 362.81, 2),
(28, 11, '2019-02-03', '001893', 673.65, 3),
(29, 20, '2019-02-04', '001230', 1255.08, 4),
(30, 10, '2019-02-05', '000469', 114.4, 1),
(31, 7, '2019-02-05', '008653', 751.64, 3),
(32, 3, '2019-02-06', '001858', 700.96, 3),
(33, 14, '2019-02-07', '003330', 441.85, 2),
(34, 2, '2019-02-08', '001074', 810.2, 3),
(35, 5, '2019-02-08', '005379', 93.68, 1),
(36, 16, '2019-02-09', '003672', 554.7, 3),
(37, 10, '2019-02-09', '002220', 185.28, 1),
(38, 19, '2019-02-10', '000086', 567.13, 3),
(39, 8, '2019-02-11', '003770', 1398.06, 4),
(40, 2, '2019-02-12', '008590', 856.14, 3),
(41, 2, '2019-02-12', '001639', 573.02, 3),
(42, 4, '2019-02-13', '002426', 719.54, 3),
(43, 13, '2019-02-14', '007209', 620.68, 3),
(44, 13, '2019-02-15', '008768', 1321.91, 4),
(45, 7, '2019-02-16', '002213', 592.32, 3),
(46, 12, '2019-02-17', '004759', 1518.11, 4),
(47, 19, '2019-02-18', '007155', 611.52, 3),
(48, 2, '2019-02-19', '001496', 2637.18, 4);

-- --------------------------------------------------------

--
-- Structure de la table `commande_category`
--

CREATE TABLE `commande_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commande_category`
--

INSERT INTO `commande_category` (`id`, `nom`) VALUES
(1, 'commandes de moins de 200€'),
(2, 'commandes entre 200€ et 500€'),
(3, 'commandes entre 500€ et 1.000€'),
(4, 'commandes supérieures à 1.000€');

-- --------------------------------------------------------

--
-- Structure de la table `commande_ligne`
--

CREATE TABLE `commande_ligne` (
  `id` int(10) UNSIGNED NOT NULL,
  `commande_id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `quantite` int(10) UNSIGNED NOT NULL,
  `prix_unitaire` float UNSIGNED NOT NULL,
  `prix_total` float UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commande_ligne`
--

INSERT INTO `commande_ligne` (`id`, `commande_id`, `nom`, `quantite`, `prix_unitaire`, `prix_total`) VALUES
(59, 25, 'Produit 0F', 1, 108.12, 108.12),
(60, 25, 'Produit DD', 10, 36.47, 364.7),
(61, 26, 'Produit 67', 8, 98, 784),
(62, 27, 'Produit 41', 1, 20.58, 20.58),
(63, 27, 'Produit 54', 7, 48.89, 342.23),
(64, 28, 'Produit 65', 4, 62.73, 250.92),
(65, 28, 'Produit 93', 9, 46.97, 422.73),
(66, 29, 'Produit 9A', 2, 46.68, 93.36),
(67, 29, 'Produit D2', 9, 92.48, 832.32),
(68, 29, 'Produit 6D', 4, 82.35, 329.4),
(69, 30, 'Produit 20', 8, 14.3, 114.4),
(70, 31, 'Produit 3C', 8, 64.45, 515.6),
(71, 31, 'Produit 60', 6, 39.34, 236.04),
(72, 32, 'Produit 63', 7, 3.38, 23.66),
(73, 32, 'Produit 95', 8, 18.86, 150.88),
(74, 32, 'Produit 62', 6, 84.17, 505.02),
(75, 32, 'Produit DE', 5, 4.28, 21.4),
(76, 33, 'Produit D0', 9, 8.88, 79.92),
(77, 33, 'Produit D6', 9, 31.55, 283.95),
(78, 33, 'Produit C3', 7, 11.14, 77.98),
(79, 34, 'Produit 5E', 10, 81.02, 810.2),
(80, 35, 'Produit B2', 8, 11.71, 93.68),
(81, 36, 'Produit 3C', 10, 55.47, 554.7),
(82, 37, 'Produit 6F', 7, 2.24, 15.68),
(83, 37, 'Produit 16', 2, 84.8, 169.6),
(84, 38, 'Produit 1A', 6, 57.27, 343.62),
(85, 38, 'Produit 24', 7, 31.93, 223.51),
(86, 39, 'Produit DF', 6, 107.85, 647.1),
(87, 39, 'Produit 7F', 9, 83.44, 750.96),
(88, 40, 'Produit 6D', 6, 93.67, 562.02),
(89, 40, 'Produit 6B', 3, 98.04, 294.12),
(90, 41, 'Produit 8A', 5, 89.18, 445.9),
(91, 41, 'Produit 6D', 4, 31.78, 127.12),
(92, 42, 'Produit 1C', 6, 11.35, 68.1),
(93, 42, 'Produit 52', 8, 81.43, 651.44),
(94, 43, 'Produit B4', 10, 13.1, 131),
(95, 43, 'Produit FD', 8, 61.21, 489.68),
(96, 44, 'Produit 4A', 10, 26.72, 267.2),
(97, 44, 'Produit D4', 5, 70.01, 350.05),
(98, 44, 'Produit 9B', 6, 29.86, 179.16),
(99, 44, 'Produit BE', 3, 59.3, 177.9),
(100, 44, 'Produit 86', 4, 86.9, 347.6),
(101, 45, 'Produit F0', 3, 16.59, 49.77),
(102, 45, 'Produit 6A', 2, 62.25, 124.5),
(103, 45, 'Produit 85', 10, 21.48, 214.8),
(104, 45, 'Produit EF', 5, 40.65, 203.25),
(105, 46, 'Produit C4', 3, 18.81, 56.43),
(106, 46, 'Produit F9', 6, 92.09, 552.54),
(107, 46, 'Produit 05', 6, 44.02, 264.12),
(108, 46, 'Produit 3A', 8, 63.84, 510.72),
(109, 46, 'Produit 2E', 2, 67.15, 134.3),
(110, 47, 'Produit 6E', 6, 24.24, 145.44),
(111, 47, 'Produit F8', 6, 39.74, 238.44),
(112, 47, 'Produit A9', 10, 5.97, 59.7),
(113, 47, 'Produit 21', 2, 30.63, 61.26),
(114, 47, 'Produit 93', 7, 15.24, 106.68),
(115, 48, 'Produit E4', 9, 104.3, 938.7),
(116, 48, 'Produit 72', 5, 115.8, 579),
(117, 48, 'Produit DB', 7, 26.1, 182.7),
(118, 48, 'Produit DE', 9, 23.12, 208.08),
(119, 48, 'Produit 3D', 7, 37.26, 260.82),
(120, 48, 'Produit C5', 4, 116.97, 467.88);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande_category`
--
ALTER TABLE `commande_category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande_ligne`
--
ALTER TABLE `commande_ligne`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `commande_category`
--
ALTER TABLE `commande_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `commande_ligne`
--
ALTER TABLE `commande_ligne`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
