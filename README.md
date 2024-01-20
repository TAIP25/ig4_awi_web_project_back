# MCD

```mermaid
erDiagram

    Inscription_Benevole }|--|| Creneau_Horaire : "A lieu pendant"
    Inscription_Benevole }|--|| Espace_de_Jeu : "Est inscrit pour"
    Inscription_Benevole }|--|| Festival : "A lieu pendant"
    Inscription_Benevole {
        int ID
        int BenevoleID "FK Benevole.ID"
        int PosteID "FK Poste.ID"
        int CreneauHoraireID "FK Creneau_Horaire.ID"
        int FestivalID "FK Festival.ID"
        int EspaceDeJeuID "FK Espace_de_Jeu.ID optionnel"
        bool Status "En attente=NULL / Valide=true / Refuse=false"
    }

    Association {
        int ID
        string Nom
    }

    Benevole ||--o{ Association : "Est affilie a"
    Benevole ||--o{ Inscription_Benevole : "Participe a"
    Benevole ||--o{ Jeu_Benevole : "Connait"
    Benevole ||--o{ Soiree_Decouverte_Inscription : "Participe a"
    Benevole ||--o{ Referent_de_Poste : "Est referent de"
    Benevole {
        int ID "PK"
        string Nom "Confidentiel"
        string Prenom "Confidentiel"
        string Email "Confidentiel"
        string Telephone "Confidentiel"
        string MotDePasse
        string Pseudo "Defaut : Prenom N. + chiffre (unique)"
        string TailleTShirt "S, M, L, XL, XXL"
        bool Vegetarien "Oui/Non"
        string Hebergement "Recherche/Proposition"
        int JeuPrefere "Optionnel (FK Jeu.ID)"
        int Photo "Optionnel (A voir comment gerer)"
        int AssociationID "FK Association.ID optionnel"
        string Statut "Benevole/Responsable/Admin (A FINIR)"
        string Adresse "Confidentiel"
    }

    Referent_de_Poste {
        int ID
        int BenevoleID "FK Benevole.ID"
        int PosteID "FK Poste.ID"
        int FestivalID "FK Festival.ID"
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

    Espace_de_Jeu ||--|{ Sous_Espace_de_Jeu : "Comprend"
    Espace_de_Jeu {
        int ID
        string Nom
        string Description
        int FestivalID "FK Festival.ID"
    }

    Sous_Espace_de_Jeu ||--|{ Jeu : "Comprend"
    Sous_Espace_de_Jeu {
        int ID
        char Lettre "A, B, C, D ou Optionnel"
        int EspaceDeJeuID "FK Espace_de_Jeu.ID"
    }

    Jeu ||--o{ Jeu_Benevole : "Est connu par"
    Jeu {
        int ID 
        string Nom
        string Auteur "Optionnel"
        string Editeur "Optionnel"
        string NbJoueurs "Optionnel"
        string AgeMin "Optionnel"
        string Duree "Optionnel"
        string Type "Optionnel"
        string Notice "Optionnel"
        int SousEspaceDeJeuID "FK Sous_Espace_de_Jeu.ID"
        int IdZone
        bool Animer "Oui/Non"
        bool Recu "Oui/Non"
        string Mecanique "Optionnel"
        string Theme "Optionnel"
        string Tag "Optionnel"
        string Description "Optionnel"
        string logo "Optionnel"
        string video "Optionnel"
    }

    Jeu_Benevole {
        int ID
        int JeuID "FK Jeu.ID"
        int BenevoleID "FK Benevole.ID"
    }

    Festival ||--|{ Espace_de_Jeu : "Comprend"
    Festival ||--|{ Referent_de_Poste : "Comprend"
    Festival {
        int ID
        string Edition
        date DateDebut
    }

    Soiree_Decouverte ||--|{ Jeu : "Comprend"
    Soiree_Decouverte ||--|{ Soiree_Decouverte_Inscription : "Est inscrit pour"
    Soiree_Decouverte {
        int ID
        date Date
        string Lieu
        string Description
    }

    Soiree_Decouverte_Inscription {
        int ID
        int BenevoleID "FK Benevole.ID"
        int SoireeDecouverteID "FK Soiree_Decouverte.ID"
    }

    Festival_Benevole ||--|{ Benevole : "Est affilie a"
    Festival_Benevole ||--|{ Festival : "Est affilie a"
    Festival_Benevole {
        int ID
        int BenevoleID "FK Benevole.ID"
        int FestivalID "FK Festival.ID"
        bool presenceSamedi "Oui/Non"
        bool presenceDimanche "Oui/Non"
        bool repasSamediMidi "Oui/Non"
        bool repasSamediSoir "Oui/Non"
        bool repasDimanche "Oui/Non"
        bool teeShirtPris "Oui/Non"
    }

    
```

L'attribut **EspacedeJeuID** de la table **Inscription_Benevole** est optionnel car il n'est pas obligatoire de s'inscrire pour un espace de jeu dans le cas où l'on s'inscrit pas dans animation jeux.
