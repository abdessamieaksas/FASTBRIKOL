# FASTBRIKOL - Plateforme de Services à Domicile

**FASTBRIKOL** est une plateforme moderne et intuitive conçue pour connecter les propriétaires avec des artisans qualifiés. Que ce soit pour de la plomberie, de l'électricité, de la rénovation ou du bricolage, FASTBRIKOL simplifie le processus de recherche et de réservation de services à domicile.

## 🚀 Fonctionnalités Clés

- **Recherche Intelligente** : Trouvez rapidement l'artisan idéal grâce à un système de recherche par mot-clé et par catégorie.
- **Réservation Simplifiée** : Un flux de réservation fluide qui pré-remplit les catégories pour une expérience utilisateur rapide.
- **Catalogue de Services** : Explorez une large gamme de catégories (Artisans vérifiés, support 7j/7).
- **Interface Animée & Responsive** : Une expérience utilisateur premium avec des animations fluides (Framer Motion) et un design adaptatif.
- **Gestion des Profils** : Système d'authentification complet pour les clients et les prestataires.

## 🛠️ Stack Technique

- **Framework** : [Next.js](https://nextjs.org/) (App Router)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Base de Données** : PostgreSQL via [Prisma](https://www.prisma.io/)
- **Authentification** : [NextAuth.js](https://next-auth.js.org/)

## 📦 Installation et Lancement

1. **Cloner le dépôt** :
   ```bash
   git clone <repository-url>
   cd fixmate-landing
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` basé sur `.env.example` et renseignez les informations suivantes :
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

## 📂 Structure du Projet

- `/app` : Routes et pages de l'application (Next.js App Router).
- `/components` : Composants UI réutilisables et composants de mise en page.
- `/prisma` : Schéma de la base de données et scripts de migration.
- `/public` : Actifs statiques (images, logos).
- `/lib` : Utilitaires et configurations partagées (Prisma client, NextAuth).

---
Développé avec ❤️ pour **FASTBRIKOL**.
