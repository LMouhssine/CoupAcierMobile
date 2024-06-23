-- Create tables

-- Table: client
CREATE TABLE client (
    idClient     Int  Auto_increment  NOT NULL ,
    prenomClient Varchar (50) ,
    nomClient    Varchar (50) NOT NULL ,
    motDePasse   Varchar (200) NOT NULL ,
    codeGenere   Varchar (100) ,
    siret        Varchar (14) NOT NULL ,
    telephone    Varchar (13) NOT NULL ,
    statutCompte Bool NOT NULL ,
    profilClient Enum ("Particulier","Professionnel") NOT NULL ,
    dateCreation Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email        Varchar (200) NOT NULL ,
    CONSTRAINT client_AK UNIQUE (email),
    CONSTRAINT client_PK PRIMARY KEY (idClient)
) ENGINE=InnoDB;


-- Table: fournisseur
CREATE TABLE fournisseur (
    idFournisseur  Int  Auto_increment  NOT NULL ,
    nomFournisseur Varchar (200) NOT NULL ,
    telephone      Varchar (13) ,
    email          Varchar (200) NOT NULL ,
    CONSTRAINT fournisseur_AK UNIQUE (email),
    CONSTRAINT fournisseur_PK PRIMARY KEY (idFournisseur)
) ENGINE=InnoDB;


-- Table: entrepot
CREATE TABLE entrepot (
    idEntrepot          Int  Auto_increment  NOT NULL ,
    villeEntrepot       Varchar (50) NOT NULL ,
    codePostaleEntrepot Int NOT NULL ,
    voieEntrepot        Varchar (200) NOT NULL ,
    NumeroRueEntrepot   Int NOT NULL ,
    CONSTRAINT entrepot_PK PRIMARY KEY (idEntrepot)
) ENGINE=InnoDB;


-- Table: employe
CREATE TABLE employe (
    idEmploye     Int  Auto_increment  NOT NULL ,
    nomEmploye    Varchar (50) NOT NULL ,
    prenomEmploye Varchar (50) NOT NULL ,
    motDePasse    Varchar (200) NOT NULL ,
    nomRole       Enum ("Administrateur","Service Commercial","Préparateur de Commande","Automate") NOT NULL ,
    email         Varchar (200) NOT NULL ,
    CONSTRAINT employe_AK UNIQUE (email),
    CONSTRAINT employe_PK PRIMARY KEY (idEmploye)
) ENGINE=InnoDB;


-- Table: probleme
CREATE TABLE probleme (
    idProbleme   Int  Auto_increment  NOT NULL ,
    message      Text NOT NULL ,
    objet        Varchar (100) NOT NULL ,
    dateProbleme Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idClient     Int NOT NULL ,
    CONSTRAINT probleme_PK PRIMARY KEY (idProbleme),
    CONSTRAINT probleme_client_FK FOREIGN KEY (idClient) REFERENCES client(idClient)
) ENGINE=InnoDB;


-- Table: societeLivraison
CREATE TABLE societeLivraison (
    idLivraison         Int  Auto_increment  NOT NULL ,
    nomSocieteLivraison Varchar (200) NOT NULL ,
    siretLivraison      Varchar (14) ,
    telephone           Varchar (13) NOT NULL ,
    email               Varchar (200) NOT NULL ,
    CONSTRAINT societeLivraison_PK PRIMARY KEY (idLivraison)
) ENGINE=InnoDB;


-- Table: categorie
CREATE TABLE categorie (
    idCategorie  Int  Auto_increment  NOT NULL ,
    nomCategorie Varchar (100) NOT NULL ,
    CONSTRAINT categorie_PK PRIMARY KEY (idCategorie)
) ENGINE=InnoDB;


-- Table: produit
CREATE TABLE produit (
    idProduit        Int  Auto_increment  NOT NULL ,
    nomProduit       Varchar (100) NOT NULL ,
    prixMetre        Float NOT NULL ,
    description      Text NOT NULL ,
    imagePrincipale  Text NOT NULL ,
    image1           Text ,
    image2           Text ,
    hauteur          Float NOT NULL ,
    epaisseur        Float NOT NULL ,
    marge            Float NOT NULL ,
    masseLineaire    Float NOT NULL ,
    tva              Float NOT NULL ,
    referenceProduit Varchar (50) NOT NULL ,
    idCategorie      Int NOT NULL ,
    CONSTRAINT produit_AK UNIQUE (referenceProduit),
    CONSTRAINT produit_PK PRIMARY KEY (idProduit),
    CONSTRAINT produit_categorie_FK FOREIGN KEY (idCategorie) REFERENCES categorie(idCategorie)
) ENGINE=InnoDB;


-- Table: approvisionnement
CREATE TABLE approvisionnement (
    idApprovisionnement Int  Auto_increment  NOT NULL ,
    dateApprovisionnement Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    quantite Int NOT NULL ,
    idEmploye Int NOT NULL ,
    idEntrepot Int NOT NULL ,
    idProduit Int NOT NULL ,
    idFournisseur Int NOT NULL ,
    CONSTRAINT approvisionnement_PK PRIMARY KEY (idApprovisionnement),
    CONSTRAINT approvisionnement_employe_FK FOREIGN KEY (idEmploye) REFERENCES employe(idEmploye),
    CONSTRAINT approvisionnement_entrepot0_FK FOREIGN KEY (idEntrepot) REFERENCES entrepot(idEntrepot),
    CONSTRAINT approvisionnement_produit1_FK FOREIGN KEY (idProduit) REFERENCES produit(idProduit),
    CONSTRAINT approvisionnement_fournisseur2_FK FOREIGN KEY (idFournisseur) REFERENCES fournisseur(idFournisseur)
) ENGINE=InnoDB;


-- Table: livreur
CREATE TABLE livreur (
    idLivreur     Int  Auto_increment  NOT NULL ,
    nomLivreur    Varchar (100) NOT NULL ,
    prenomLivreur Varchar (100) NOT NULL ,
    motDePasse    Varchar (200) NOT NULL ,
    email         Varchar (200) NOT NULL ,
    idLivraison   Int NOT NULL ,
    CONSTRAINT livreur_AK UNIQUE (email),
    CONSTRAINT livreur_PK PRIMARY KEY (idLivreur),
    CONSTRAINT livreur_societeLivraison_FK FOREIGN KEY (idLivraison) REFERENCES societeLivraison(idLivraison)
) ENGINE=InnoDB;


-- Table: stock
CREATE TABLE stock (
    idStock    Int  Auto_increment  NOT NULL ,
    quantite   Int NOT NULL ,
    longueur   Float NOT NULL ,
    idProduit  Int NOT NULL ,
    idEntrepot Int NOT NULL ,
    CONSTRAINT stock_PK PRIMARY KEY (idStock),
    CONSTRAINT stock_produit_FK FOREIGN KEY (idProduit) REFERENCES produit(idProduit),
    CONSTRAINT stock_entrepot0_FK FOREIGN KEY (idEntrepot) REFERENCES entrepot(idEntrepot)
) ENGINE=InnoDB;


-- Table: adresse
CREATE TABLE adresse (
    idAdresse     Int  Auto_increment  NOT NULL ,
    numeroVoie    Int NOT NULL ,
    nomVoie       Varchar (200) NOT NULL ,
    codePostale   Varchar (5) NOT NULL ,
    ville         Varchar (100) NOT NULL ,
    idClient      Int ,
    idLivraison   Int ,
    idEmploye     Int ,
    idFournisseur Int ,
    CONSTRAINT adresse_PK PRIMARY KEY (idAdresse),
    CONSTRAINT adresse_client_FK FOREIGN KEY (idClient) REFERENCES client(idClient),
    CONSTRAINT adresse_societeLivraison0_FK FOREIGN KEY (idLivraison) REFERENCES societeLivraison(idLivraison),
    CONSTRAINT adresse_employe1_FK FOREIGN KEY (idEmploye) REFERENCES employe(idEmploye),
    CONSTRAINT adresse_fournisseur2_FK FOREIGN KEY (idFournisseur) REFERENCES fournisseur(idFournisseur)
) ENGINE=InnoDB;


-- Table: commande
CREATE TABLE commande (
    idCommande Int  Auto_increment  NOT NULL ,
    dateCommande Datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statusCommande Enum ("En attente","Validé","En Decoupage","Decoupé","En Cours de Livraison","Livré","Non livré") NOT NULL ,
    devis Bool NOT NULL ,
    type Enum ("Commande","Liste d'envie") NOT NULL ,
    dateLivraison Datetime NOT NULL ,
    referenceLivraison Varchar (50) NOT NULL ,
    ModeReception Enum ("A LIVRER","A RETIRER") NOT NULL ,
    reference Varchar (11) NOT NULL ,
    idClient Int NOT NULL ,
    idLivreur Int ,
    idAdresse Int  NULL ,
    CONSTRAINT commande_AK UNIQUE (reference),
    CONSTRAINT commande_PK PRIMARY KEY (idCommande),
    CONSTRAINT commande_client_FK FOREIGN KEY (idClient) REFERENCES client(idClient),
    CONSTRAINT commande_livreur0_FK FOREIGN KEY (idLivreur) REFERENCES livreur(idLivreur),
    CONSTRAINT commande_adresse1_FK FOREIGN KEY (idAdresse) REFERENCES adresse(idAdresse)
) ENGINE=InnoDB;


-- Table: ligneCommande
CREATE TABLE ligneCommande (
    idDecoupage Int  Auto_increment  NOT NULL ,
    dimensionCoupe Float NOT NULL ,
    quantite Int NOT NULL ,
    ristourne Float ,
    prixMetre Float NOT NULL ,
    idProduit Int NOT NULL ,
    idCommande Int NOT NULL ,
    CONSTRAINT ligneCommande_PK PRIMARY KEY (idDecoupage),
    CONSTRAINT ligneCommande_produit_FK FOREIGN KEY (idProduit) REFERENCES produit(idProduit),
    CONSTRAINT ligneCommande_commande0_FK FOREIGN KEY (idCommande) REFERENCES commande(idCommande)
) ENGINE=InnoDB;


-- Table: favoris
CREATE TABLE favoris (
    idProduit INT NOT NULL,
    idClient INT NOT NULL,
    CONSTRAINT favoris_PK PRIMARY KEY (idProduit, idClient)
);
