### 5.3 Choix d'organisation et d'outillage

Nos choix d'organisation découlent de deux contraintes du projet : les mises en production seront rares, et nous développons à plusieurs sur le même dépôt. Il nous fallait donc une version de référence toujours fonctionnelle, et un moyen d'intégrer le travail de chacun sans le casser.

#### Le workflow Git

Nous avons comparé le GitHub Flow et le Gitflow. Le GitHub Flow fusionne directement chaque fonctionnalité dans `main`. Il est pensé pour des déploiements fréquents, ce qui n'est pas notre cas, et il expose la branche stable à chaque changement.

Nous avons retenu un Gitflow simplifié : une branche `dev` sert de zone d'intégration et de test entre les branches de tâche et `main`, qui ne reçoit que des versions validées. Nous avons écarté les branches `release/` et `hotfix/`, inutiles à notre échelle.

Ce choix a un coût : le workflow est plus complexe, et on peut se tromper de branche de départ ou de destination. Nous le limitons en protégeant `main` sur GitHub et en documentant nos conventions dans le README.

#### La relecture par Pull Request

Toute intégration passe par une Pull Request relue par un autre membre. L'objectif n'est pas seulement de repérer les erreurs : chacun connaît ainsi les parties du code qu'il n'a pas écrites. En contrepartie, l'intégration peut être ralentie quand un membre est indisponible.

#### Les conventions de nommage

Une branche par tâche multiplie les branches. Sans règle commune, on ne sait plus ce que contient `essai` ou `marin-v2`, et l'historique des commits devient illisible (`update`, `modif`).

Nous avons donc adopté les types de Conventional Commits, à la fois pour les branches (`type/description`) et pour les commits (`type(scope): description`). Ce choix répond à trois besoins :

- le même vocabulaire relie branches, commits et Pull Requests ;
- c'est une convention reconnue en entreprise ;
- elle permettrait plus tard de générer un changelog automatiquement.

Le scope obligatoire (`front`, `api`, `db`, `docker`…) reprend l'architecture de l'application, ce qui permet de filtrer l'historique par couche. Nous écrivons en anglais, langue standard du code et des outils, et nous avons fermé les listes de types et de scopes pour éviter qu'elles ne dérivent.

La principale limite de ces conventions est que rien ne les vérifie automatiquement pour l'instant : leur respect repose sur la rigueur de chacun et sur la relecture des Pull Requests.