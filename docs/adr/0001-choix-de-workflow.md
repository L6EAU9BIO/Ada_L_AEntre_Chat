# Titre 
 Lovelave Factory : choix du workflow  Git , Github .

## Status + date
 status : en cours ,  13/10/2026

## Contexte
 Nous developons un site web dont la neccesité est de mise a jour de production est faible , nous sommes les seules dans la premieres periode de developement a acceder a la version finale (main)

## Desicions 
 Nous avons donc decider d'utiliser la methode Gitflow car nous avons un produit qui ne neccesite par un emise à jour frequante du main, 
 d'autent plus que cette methode me semble plus sur quand à la protection du main et de notre progressions , la structure de Gitflow convient donc 
 a nos besoins .
  <!-- dans le cadre de nos besoins de production , une branche dev sera crée depuis main
 avec une nouvelle branche par taches , une/des Pull Request par merge , main sera protégé . -->

## Conséquences 
Negatives :
 - La complexité de cette methodologie peut amener a des confusions/erreurs

Positives :
 - main sera protégé 
 - Création d'un environnement de test securisé 

