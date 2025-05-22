-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 25 mars 2025 à 17:24
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestion_restaurant`
--
CREATE DATABASE IF NOT EXISTS `TchopShap-api-rust` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `TchopShap-api-rust`;

-- --------------------------------------------------------

--
-- Structure de la table `Administrateur`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 15:24
--

CREATE TABLE `Administrateur` (
  `id_administrateur` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Administrateur`:
--

--
-- Déchargement des données de la table `Administrateur`
--

INSERT INTO `Administrateur` (`id_administrateur`, `nom`, `prenom`, `email`) VALUES
(1, 'Okawe', 'Junior', 'lepacifiqueokawe@gmail.com'),
(12, 'lorena', 'raoube', 'lorenaraoumbe@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `Categorie`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 15:17
--

CREATE TABLE `Categorie` (
  `id_categorie` int(11) NOT NULL,
  `categorie` varchar(100) DEFAULT NULL
  `image` VARCHAR(255),          -- URL Cloudinary
  `cloudinary_id` VARCHAR(255)   -- Public ID de Cloudinary
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Categorie`:
--

--
-- Déchargement des données de la table `Categorie`
--

INSERT INTO `Categorie` (`id_categorie`, `categorie`) VALUES
(1, 'Africaine et européenne'),
(2, 'ivoirien ');

-- --------------------------------------------------------

--
-- Structure de la table `Client`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 15:13
--

CREATE TABLE `Client` (
  `id_client` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL
  `image` VARCHAR(255),          -- URL Cloudinary
  `cloudinary_id` VARCHAR(255)   -- Public ID de Cloudinary
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Client`:
--

--
-- Déchargement des données de la table `Client`
--

INSERT INTO `Client` (`id_client`, `nom`, `prenom`, `telephone`) VALUES
(1, 'Glen', 'Stevy', '066394199'),
(2, 'Alaric', 'le code', '062599193');

-- --------------------------------------------------------

--
-- Structure de la table `Commandes`
--
-- Création : mar. 25 mars 2025 à 16:04
-- Dernière modification : mar. 25 mars 2025 à 16:05
--

CREATE TABLE `Commandes` (
  `id_commande` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `id_plat` int(11) NOT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `date_commande` datetime NOT NULL DEFAULT current_timestamp(),
  `mode_paiement` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Commandes`:
--   `id_client`
--       `Client` -> `id_client`
--   `id_plat`
--       `Plat` -> `id_plat`
--

--
-- Déchargement des données de la table `Commandes`
--

INSERT INTO `Commandes` (`id_commande`, `id_client`, `id_plat`, `statut`, `date_commande`, `mode_paiement`) VALUES
(1, 1, 1, NULL, '2025-03-25 17:05:58', 'carte bancaire'),
(2, 2, 2, NULL, '2025-03-25 17:05:58', 'mobile money');

-- --------------------------------------------------------

--
-- Structure de la table `Livraisons`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 16:11
--

CREATE TABLE `Livraisons` (
  `id_livraison` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL,
  `id_livreur` int(11) NOT NULL,
  `adresse_livraison` varchar(100) DEFAULT NULL,
  `statut` varchar(50) DEFAULT 'En cours'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Livraisons`:
--   `id_commande`
--       `Commandes` -> `id_commande`
--   `id_livreur`
--       `Livreurs` -> `id_livreur`
--

--
-- Déchargement des données de la table `Livraisons`
--

INSERT INTO `Livraisons` (`id_livraison`, `id_commande`, `id_livreur`, `adresse_livraison`, `statut`) VALUES
(1, 2, 2, 'salsa', 'En cours'),
(2, 1, 1, 'derriere le lycee', 'en cours');

-- --------------------------------------------------------

--
-- Structure de la table `Livreurs`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 15:39
--

CREATE TABLE `Livreurs` (
  `id_livreur` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `type_de_vehicule` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Livreurs`:
--

--
-- Déchargement des données de la table `Livreurs`
--

INSERT INTO `Livreurs` (`id_livreur`, `nom`, `prenom`, `statut`, `type_de_vehicule`, `telephone`) VALUES
(1, 'bebou', 'bechocco', 'libre', 'moto', '077657635'),
(2, 'wolden ', 'dihiba', 'occupé', 'moto', '+241 066526170');

-- --------------------------------------------------------

--
-- Structure de la table `Plat`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 15:45
--

CREATE TABLE `Plat` (
  `id_plat` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `prix` decimal(8,2) NOT NULL,
  `image` VARCHAR(255),          -- URL Cloudinary
  `cloudinary_id` VARCHAR(255)   -- Public ID de Cloudinary
  `id_restaurant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Plat`:
--   `id_restaurant`
--       `Restaurant` -> `id_restaurant`
--

--
-- Déchargement des données de la table `Plat`
--

INSERT INTO `Plat` (`id_plat`, `nom`, `description`, `prix`, `id_restaurant`) VALUES
(1, 'Feuille de manioc', 'Feuille de manioc', 2000.00, 1),
(2, 'Pizza', 'Pizza fais a base de fromage', 7000.00, 2);

-- --------------------------------------------------------

--
-- Structure de la table `Restaurant`
--
-- Création : mar. 25 mars 2025 à 12:11
-- Dernière modification : mar. 25 mars 2025 à 15:35
--

CREATE TABLE `Restaurant` (
  `id_restaurant` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL
  `image` VARCHAR(255),          -- URL Cloudinary
  `cloudinary_id` VARCHAR(255)   -- Public ID de Cloudinary
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONS POUR LA TABLE `Restaurant`:
--

--
-- Déchargement des données de la table `Restaurant`
--

INSERT INTO `Restaurant` (`id_restaurant`, `nom`, `adresse`, `telephone`) VALUES
(1, 'Resto chez Vixenté', ' nouvelle route ODIMBA', '062599193'),
(2, 'Resto chez Brel', 'centre social', '074943477');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD PRIMARY KEY (`id_administrateur`);

--
-- Index pour la table `Categorie`
--
ALTER TABLE `Categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `Client`
--
ALTER TABLE `Client`
  ADD PRIMARY KEY (`id_client`);

--
-- Index pour la table `Commandes`
--
ALTER TABLE `Commandes`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_client` (`id_client`),
  ADD KEY `id_plat` (`id_plat`);

--
-- Index pour la table `Livraisons`
--
ALTER TABLE `Livraisons`
  ADD PRIMARY KEY (`id_livraison`),
  ADD KEY `id_commande` (`id_commande`),
  ADD KEY `id_livreur` (`id_livreur`);

--
-- Index pour la table `Livreurs`
--
ALTER TABLE `Livreurs`
  ADD PRIMARY KEY (`id_livreur`);

--
-- Index pour la table `Plat`
--
ALTER TABLE `Plat`
  ADD PRIMARY KEY (`id_plat`),
  ADD KEY `id_restaurant` (`id_restaurant`);

--
-- Index pour la table `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD PRIMARY KEY (`id_restaurant`),
  ADD UNIQUE KEY `unique_nom` (`nom`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Categorie`
--
ALTER TABLE `Categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Client`
--
ALTER TABLE `Client`
  MODIFY `id_client` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Commandes`
--
ALTER TABLE `Commandes`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Livraisons`
--
ALTER TABLE `Livraisons`
  MODIFY `id_livraison` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Livreurs`
--
ALTER TABLE `Livreurs`
  MODIFY `id_livreur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Plat`
--
ALTER TABLE `Plat`
  MODIFY `id_plat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Restaurant`
--
ALTER TABLE `Restaurant`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour la table `Commandes`
--
ALTER TABLE `Commandes`
  ADD CONSTRAINT `Commandes_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `Client` (`id_client`) ON DELETE CASCADE,
  ADD CONSTRAINT `Commandes_ibfk_2` FOREIGN KEY (`id_plat`) REFERENCES `Plat` (`id_plat`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Livraisons`
--
ALTER TABLE `Livraisons`
  ADD CONSTRAINT `Livraisons_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `Commandes` (`id_commande`) ON DELETE CASCADE,
  ADD CONSTRAINT `Livraisons_ibfk_2` FOREIGN KEY (`id_livreur`) REFERENCES `Livreurs` (`id_livreur`) ON DELETE CASCADE;

--
-- Contraintes pour la table `Plat`
--
ALTER TABLE `Plat`
  ADD CONSTRAINT `Plat_ibfk_1` FOREIGN KEY (`id_restaurant`) REFERENCES `Restaurant` (`id_restaurant`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
