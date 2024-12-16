
# Script de rendu de texte avec communication WebSocket

Ce projet est un script JavaScript/TypeScript qui se connecte à **[textboard](https://textboard.fr/)** via un protocole WebSocket (WS) et affiche le contenu d'une chaîne ASCII prédéfinie.

---

## Sans Docker

### Prérequis

- **[Node.js](https://nodejs.org/en)** : Assurez-vous d'avoir Node.js installé sur votre machine.

### Étapes d’installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/TonyKun7/textboard && cd textboard
   ```
2. Installez les dépendances nécessaires :
   ```bash
   npm install
   ```

### Personnalisation

1. Créez un fichier `.env` à la racine du projet contenant les informations de configuration nécessaires (trouvable dans le `.env.example`).
2. Modifiez le fichier `string.txt` pour définir le texte ASCII à afficher.

### Étapes de lancement

1. En mode production :
   ```bash
   npm run build && npm run start
   ```
2. En mode développement :
   ```bash
   npm run dev
   ```

---

## Avec Docker

### Prérequis

- **[Docker](https://www.docker.com/)** : Assurez-vous d'avoir Docker installé sur votre machine.
- **[Docker Compose](https://docs.docker.com/compose/)** : Assurez-vous d'avoir Docker Compose installé.

### Étapes d’installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/TonyKun7/textboard && cd textboard
   ```

### Personnalisation

1. Créez un fichier `.env` à la racine du projet contenant les informations de configuration nécessaires (trouvable dans le `.env.example`).
2. Modifiez le fichier `string.txt` pour définir le texte ASCII à afficher.

### Étapes de lancement

1. Construisez et démarrez les services définis dans `docker-compose.yml` :
   ```bash
   docker-compose up -d
   ```
   Cette commande :
   - Crée les images Docker nécessaires à partir du `Dockerfile`.
   - Lance les conteneurs définis dans `docker-compose.yml`.

2. Pour arrêter les services :
   ```bash
   docker-compose down
   ```
3. Vérifiez que les services fonctionnent correctement :
   ```bash
   docker-compose ps
   ```
4. Pour accéder aux logs (optionnel) :
   ```bash
   docker-compose logs -f
   ```

### Exemple de `docker-compose.yml` pour multi-compte

Si vous souhaitez exécuter plusieurs instances (non optimisé, mais fonctionnel), voici un exemple de configuration :

```yaml
version: '3.9'

services:
  textboard:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      - KEY=1
  textboard-1:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      - KEY=2
  textboard-2:
    build:
      context: .
      dockerfile: Dockerfile
    restart: unless-stopped
    environment:
      - KEY=3
```

---

## Comment trouver la clé d'authentification (`KEY`)

Pour que le script fonctionne correctement, récupérez la clé d'authentification sur **[textboard](https://textboard.fr/)** :

1. **Accéder au site Web** :
   - Rendez-vous sur [textboard](https://textboard.fr/).
   - Connectez-vous à votre compte si nécessaire.

2. **Ouvrir les outils de développement** :
   - Appuyez sur `F12` ou faites un clic droit sur la page, puis sélectionnez **Inspecter**.

3. **Naviguer vers l’onglet "Application"** :
   - Cliquez sur l’onglet **Application** (ou **Storage** selon le navigateur).
   - Sous **Storage**, cliquez sur **Cookies**.

4. **Rechercher la clé `refresh_token`** :
   - Trouvez l'entrée **`refresh_token`** et copiez sa valeur.

5. **Configurer `.env`** :
   - Collez la clé dans le fichier `.env` :
     ```env
     KEY=valeur_du_refresh_token
     ```

### Remarques :
- La clé `refresh_token` est sensible : ne la partagez pas et utilisez-la uniquement pour ce script.
- Si le cookie expire, reconnectez-vous et récupérez un nouveau `refresh_token`.

---

## Remarques supplémentaires

- Assurez-vous que le fichier `string.txt` contenant le texte ASCII est présent dans le répertoire du projet.
- Pour ajuster les paramètres comme les coordonnées, l’espacement ou le délai entre les envois, modifiez les variables correspondantes dans le fichier `.env`, puis redémarrez le programme.

## Disclaimer

Ce projet a été réalisé avant tout pour le fun et à des fins d'apprentissage. Il peut fonctionner correctement pour des usages simples, mais peu d'efforts ont été consacrés à l'optimisation ou à la prise en charge de cas complexes. Si vous souhaitez l'améliorer, n'hésitez pas à contribuer ou à l'adapter à vos besoins ! 😊