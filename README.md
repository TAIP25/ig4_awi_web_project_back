# MCD

```mermaid
erDiagram

    Inscription_Benevole ||--|{ Creneau_Horaire : "A lieu pendant"
    Inscription_Benevole ||--|{ Espace_de_Jeu : "Est inscrit pour"
    Inscription_Benevole {
        int ID
        int BenevoleID "FK Benevole.ID"
        int PosteID "FK Poste.ID"
        int CreneauHoraireID "FK Creneau_Horaire.ID"
        int EspaceDeJeuID "FK Espace_de_Jeu.ID optionnel"
        string Statut "En attente/Valide/Refuse"
    }

    Association {
        int ID
        string Nom
    }

    Benevole ||--o{ Association : "Est affilie a"
    Benevole ||--o{ Inscription_Benevole : "Participe a"
    Benevole ||--o{ Jeu_Benevole : "Connait"
    Benevole {
        int ID "PK"
        string Nom "Confidentiel"
        string Prenom "Confidentiel"
        string Email "Confidentiel"
        string Pseudo "Defaut : Prenom N. + chiffre (unique)"
        string TailleTeeShirt "S, M, L, XL, XXL"
        bool Vegetarien "Oui/Non"
        string Hebergement "Recherche/Proposition"
        int JeuPrefere "Optionnel (FK Jeu.ID)"
        int Photo "Optionnel (A voir comment gerer)"
        int AssociationID "FK Association.ID optionnel"
    }

    Referent_de_Poste {
        int ID
        int BenevoleID "FK Benevole.ID"
        int PosteID "FK Poste.ID"
    }

    Poste ||--o{ Referent_de_Poste : "A pour referent"
    Poste ||--o{ Inscription_Benevole : "Besoin de benevoles"
    Poste {
        int ID
        string Nom
        string Description
    }

    Creneau_Horaire {
        int ID
        string Jour "Samedi ou Dimanche"
        date DateDebut
        date DateFin
    }

    Espace_de_Jeu ||--|{ Jeu : "Comprend"
    Espace_de_Jeu {
        int ID
        string Nom
        string Description
    }

    Jeu ||--o{ Jeu_Benevole : "Est connu par"
    Jeu {
        int ID 
        string Nom
        bool Recu "Oui/Non"
        string LienSite
        int EspaceDeJeu "FK Espace_de_Jeu.ID"
    }

    Jeu_Benevole {
        int ID
        int JeuID "FK Jeu.ID"
        int BenevoleID "FK Benevole.ID"
    }
    
```

L'attribut **EspacedeJeuID** de la table **Inscription_Benevole** est optionnel car il n'est pas obligatoire de s'inscrire pour un espace de jeu dans le cas où l'on s'inscrit pas dans animation jeux.