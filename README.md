<div align="center">
    <h1>HOLLYCONNECT</h1>
	<p align="center">
	<a>
<img src="Application/src/Capture%20d%E2%80%99e%CC%81cran%202023-11-17%20a%CC%80%2008.52.41.png" alt="Description de l'image">  </a>
</p>
	<H2>INTRODUCTION<H2>
	<h3>HollyConnect and an end-of-1st-year Holberton School portfolio project.The HollyConnect app enhances your vacation rental experience by providing you with immediate access to all the essential information about your accommodation. From details about your rental to local activities, we do everything to make your stay perfect and hassle-free. </h3>

---

## Landing Page
- [Landing Page](https://air-ks.github.io/Portfolio-Project_Landing-Page/#page-top/)

---

##                           Profils LinkedIn
- [Rogeret Kevin](https://www.linkedin.com/in/kevinrogeret/)
- [Lenne Sebastien](https://www.linkedin.com/in/sebastien-lenne-134a61277/)

---

##                        Final project blog Article

- [Rogeret Kevin](https://medium.com/@kevinrogeret/hollyconnect-logo-7ac5e4ed60d1)
- [Lenne Sebastien](https://medium.com/@sebastienlenne/holliconnect-portfolio-discoveries-and-learnings-c28fbed4142c)

    <h3>◦ Developed with the software and tools below.</h3>
</div>

<p align="center">
  <a href="https://skillicons.dev">
    <img src=https://skillicons.dev/icons?i=express,js,mysql,react,sequelize,git,github />
  </a>
</p>

---

## 📖 Table of Contents

- [Table of Contents](#Table-of-contents)
- [Repository Structure](#repository-structure)
- [Modules](#Modules)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running HolyConnect](#running-holyconnect)
    - [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---


### 📂 Repository Structure

```sh
└── HolyConnect/
    ├── Application/
    │   ├── .env
    │   ├── App.js
    │   ├── app.json
    │   ├── babel.config.js
    │   ├── Back-End/
    │   │   ├── api/
    │   │   ├── config/
    │   │   ├── migrations/
    │   │   ├── Models/
    │   │   ├── routes/
    │   │   └── utils/
    │   ├── package.json
    │   ├── serveur.js
    │   └── src/
    │       ├── components/
    │       ├── contexts/
    │       ├── navigation/
    │       ├── screens/
    │       ├── styles/
    │       ├── Tips.txt
    │       └── utils/
    ├── Conditions d'Utilisation
    ├── Page d'accueil
    └── Règle de Confidentialité

```

---
<a name="Modules"></a>
## ⚙️ Modules
<details closed><summary>Root</summary>

| File                                                                                                                                                           |
| ---
| [Conditions d'Utilisation](https://github.com/Air-KS/HolyConnect/blob/main/Conditions%20d'Utilisation)
| [Page d'accueil](https://github.com/Air-KS/HolyConnect/blob/main/Page d'accueil)
| [Règle de Confidentialité](https://github.com/Air-KS/HolyConnect/blob/main/Règle de Confidentialité)
| [.env](https://github.com/Air-KS/HolyConnect/blob/main/Application/.env)
| [App.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/App.js)
| [app.json](https://github.com/Air-KS/HolyConnect/blob/main/Application/app.json)
| [babel.config.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/babel.config.js)
| [package.json](https://github.com/Air-KS/HolyConnect/blob/main/Application/package.json)
| [serveur.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/serveur.js)
| [apirouter.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/api/apirouter.js)
| [authUtils.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-Endconfig/authUtils.js)
| [config.json](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/config/config.json)
| [db.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/config/db.js)
| [errorHandler.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/config/errorHandler.js)
| [20231019140651-create-user.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/migrations/20231019140651-create-user.js)
| [20231019141242-create-userinfo.js](https://github.com/Air-KS/HolyConnect/blob/main/ApplicationB/ack-End/migrations/20231019141242-create-userinfo.js)
| [20231019141505-create-homelocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/migrations/20231019141505-create-homelocation.js)
| [20231019141727-create-notelocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/migrations/20231019141727-create-notelocation.js)
| [20231019142018-create-location-id.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/migrations/20231019142018-create-location-id.js)
| [homelocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/Models/homelocation.js)
| [index.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/Models/index.js)
| [locationid.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/Models/locationid.js)
| [notelocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/Models/notelocation.js)
| [user.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/Models/user.js)
| [userinfo.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/Models/userinfo.js)
| [homelocationsctrl.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/routes/homelocationsctrl.js)
| [notelocationsctrl.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/routes/notelocationsctrl.js)
| [userinfosctrl.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/routes/userinfosctrl.js)
| [usersctrl.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/routes/usersctrl.js)
| [jwt.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/Back-End/utils/jwt.js)
| [Tips.txt](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/Tips.txt)
| [footer.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/components/footer.js)
| [menuProfil.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/components/menuProfil.js)
| [screenWrapper.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/components/screenWrapper.js)
| [AuthContext.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/contexts/AuthContext.js)
| [FacebookLogin.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/contexts/FacebookLogin.js)
| [GoogleLogin.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/context/GoogleLogin.js)
| [apLocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/apLocation.js)
| [createLocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigationc/reateLocation.js)
| [home.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/home.js)
| [location.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/location.js)
| [login.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/login.js)
| [maLocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/maLocation.js)
| [profil.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/profil.js)
| [signUp.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/signUp.js)
| [UiInterface.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/navigation/UiInterface.js)
| [scrollView.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/screens/scrollView.js)
| [baseStyle.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/baseStyle.js)
| [bulText.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/bulText.js)
| [createLocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/createLocation.js)
| [dimensions.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/dimensions.js)
| [footer.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/footer.js)
| [formStyle.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/formStyle.js)
| [infoLocation.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/infoLocation.js)
| [locationStyle.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/locationStyle.js)
| [menuProfil.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/menuProfil.js)=
| [searchBar.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/searchBar.js)
| [tabBar.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/styles/tabBar.js)
| [fileManager.js](https://github.com/Air-KS/HolyConnect/blob/main/Application/src/utils/fileManager.js)

</details>

---

## 🚀 Getting Started


### 🔧 Installation

1. Clone the HolyConnect repository:
```sh
git clone https://github.com/Air-KS/HolyConnect
```

2. Change to the project directory:
```sh
cd Application or cd HolyConnect/Application
```

3. Install the dependencies:
```sh
npm install
```

### 🤖 Running HolyConnect

```sh
npm run android
```

### 🧪 Tests
```sh
npm test
```

---


## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/Air-KS/HolyConnect/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/Air-KS/HolyConnect/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/Air-KS/HolyConnect/issues)**: Submit bugs found or log feature requests for AIR-KS.

*Contributing Guidelines*

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.


---

## 📄 License


Ce projet est protégé par la licence [MIT](https://choosealicense.com/licenses/mit/). Pour plus de détails, consultez le fichier [LICENSE](https://github.com/votre-utilisateur/votre-projet/blob/master/LICENSE).


---

## 👏 Acknowledgments


[**Return**](#Top)

---


###  Author
ROGERET Kevin - [Linkedin](https://www.linkedin.com/in/kevinrogeret/) <br>
LENNE Sebastien - [Linkedin](https://www.linkedin.com/in/sebastien-lenne-134a61277/) <br>
> Project carried out within the framework of the school **[Holberton School](https://www.holbertonschool.com/).**<br>
