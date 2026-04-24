<div align="center">
  
  ![React 18](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=for-the-badge&logo=react&logoColor=white)

</div>

# TrustSphere - A Trust Organization Management System

## About the Project
TrustSphere is an advanced administration and logistics tracking application tailored for non-profit organizations and philanthropic trusts. It provides a highly intuitive, premium interface for systematically structuring incoming donations, organizing registered beneficiaries, scheduling community events, and maintaining organizational data securely. 

## Features
- **Dashboard** with dynamic charts and operational stats.
- **Donation Management** (CRUD operations for financial tracking).
- **Beneficiary Management** (CRUD operations for aid recipients).
- **Event Management** (CRUD operations for community and scheduled galas).
- **Search & Filter** mechanism crossing across all global data nodes.
- **Dark/Light Mode** system-wide toggling for accessibility.
- **LocalStorage Persistence** securing all platform data directly in the browser.
- **Fully responsive UI** engineered flawlessly for desktops, tablets, and phones.

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 |
| **Build Tooling** | Vite |
| **Styling** | Tailwind CSS & Bootstrap 5 |
| **Routing** | React Router DOM v6 |
| **Data Visualization**| Recharts |
| **State Management** | Context API & LocalStorage |

## Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.
- Node.js (v16.14 or newer recommended)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/Misbah-Islam/trustSphere.git
```

2. Navigate into the project folder:
```bash
cd trustsphere
```

3. Install all necessary dependencies:
```bash
npm install
```

4. Spin up the development server:
```bash
npm run dev
```

## Folder Structure

```text
src/
├── components/
│   └── Navbar.jsx               # Universal top navigation & routing hub
├── context/
│   └── AppContext.jsx           # Global state engine and LocalStorage bridge
├── pages/
│   ├── Dashboard.jsx            # Analytical charts and summaries
│   ├── DonationManagement.jsx   # Donation trackers
│   ├── BeneficiaryManagement.jsx# Aid recipient profiles
│   ├── EventManagement.jsx      # Future and past events logic
│   ├── SearchFilter.jsx         # Cross-entity normalized search index
│   ├── ProfileSettings.jsx      # Export data, nuke storage, toggle themes
│   ├── LandingPage.jsx          # Public facing promotional entry
│   └── index.js                 # Export barrels
├── App.jsx                      # Router & configuration wrapper
├── index.css                    # Tailwind imports
└── main.jsx                     # Root React DOM entry
```

## Screenshots
> Screenshots coming soon

## Live Demo
> Live link coming soon

---

**Developed by:** [Your Name] | Batch 4 - U Devs | Assigned by: Usama Aslam

**License:** MIT License
