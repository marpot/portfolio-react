import type { Experience, Project } from './types'

export const projects: Project[] = [
  {
    name: 'corporation_simulation_project',
    number: '01',
    category: ['backend', 'fullstack'],
    url: 'https://github.com/marpot/corporation_simulation_project',
    image: '/projects/corporation.png',
    imageAlt: { pl: 'Panel główny projektu Corporation Simulation', en: 'Corporation Simulation main dashboard' },
    description: {
      pl: 'Symulacja korporacji z API w FastAPI, panelem React i trwałą warstwą danych. Projekt jest również praktycznym laboratorium wdrożeń i infrastruktury.',
      en: 'A corporation simulation with a FastAPI API, React interface and persistent data layer. It also serves as a hands-on deployment and infrastructure lab.',
    },
    stack: ['FastAPI', 'React + TS', 'PostgreSQL', 'Docker', 'Kubernetes', 'Terraform'],
    featured: true,
  },
  {
    name: 'django_react_fullstack_rpg_game',
    number: '02',
    category: ['backend', 'fullstack'],
    url: 'https://github.com/marpot/django_react_fullstack_rpg_game',
    image: '/projects/rpg.png',
    imageAlt: { pl: 'Okno gry projektu Django React RPG', en: 'Django React RPG game window' },
    description: {
      pl: 'Pełnostosowa gra RPG z komunikacją czasu rzeczywistego, WebSocketami i funkcjami związanymi z AI game masterem.',
      en: 'A full-stack RPG with real-time communication, WebSockets and features related to an AI game master.',
    },
    stack: ['Django', 'DRF', 'Channels', 'React + TS', 'WebSockets', 'Docker'],
  },
  {
    name: 'ai-cyber-store',
    number: '03',
    category: ['backend', 'fullstack', 'wordpress'],
    url: 'https://github.com/marpot/ai-cyber-store',
    image: '/projects/cyber-store.png',
    imageAlt: { pl: 'Strona główna AI Cyber Store', en: 'AI Cyber Store home page' },
    description: {
      pl: 'Sklep łączący frontend React, API FastAPI i WooCommerce z osobnym serwisem rekomendacji produktów.',
      en: 'A store combining a React frontend, FastAPI API and WooCommerce with a separate product recommendation service.',
    },
    stack: ['React', 'FastAPI', 'WooCommerce', 'WordPress', 'Docker'],
  },
  {
    name: 'Pupilovo',
    number: '04',
    category: ['fullstack', 'wordpress'],
    url: 'https://github.com/marpot/Pupilovo',
    image: '/projects/pupilovo.png',
    imageAlt: { pl: 'Strona główna sklepu Pupilovo', en: 'Pupilovo store home page' },
    description: {
      pl: 'Headless e-commerce dla branży zoologicznej — React i TypeScript po stronie klienta, WordPress i WooCommerce jako zaplecze.',
      en: 'Headless pet e-commerce — React and TypeScript on the client, with WordPress and WooCommerce as the back office.',
    },
    stack: ['React', 'TypeScript', 'WordPress', 'WooCommerce'],
  },
  {
    name: 'wordpress-portfolio-theme',
    number: '05',
    category: ['wordpress'],
    url: 'https://github.com/marpot/wordpress-portfolio-theme',
    image: '/projects/wordpress-theme.png',
    imageAlt: { pl: 'Sekcja hero motywu WordPress Portfolio', en: 'WordPress Portfolio theme hero section' },
    description: {
      pl: 'Autorski motyw portfolio dla WordPressa z dynamiczną treścią, modularnym SCSS i nowoczesnym procesem budowania w Vite.',
      en: 'A custom WordPress portfolio theme with dynamic content, modular SCSS and a modern Vite build workflow.',
    },
    stack: ['WordPress', 'PHP', 'ACF', 'SCSS', 'Vite'],
  },
]

export const experience: Experience[] = [
  {
    role: { pl: 'NLP Solutions Designer', en: 'NLP Solutions Designer' },
    company: 'Alfavox Sp. z o.o.',
    duration: { pl: '6 miesięcy', en: '6 months' },
    location: 'Poznań',
    type: { pl: 'praca zdalna', en: 'remote' },
    details: {
      pl: ['Projektowanie rozwiązań CIRF, chatbotów i voicebotów dla call center Alfa.', 'Testy manualne i API, scenariusze testowe oraz praca z SQL.', 'Analiza wymagań i dokumentowanie rozwiązań.'],
      en: ['Designed CIRF solutions, chatbots and voicebots for the Alfa call center.', 'Manual and API testing, test scenarios and SQL work.', 'Requirements analysis and solution documentation.'],
    },
  },
  {
    role: { pl: 'Stażysta — IT Specialist', en: 'IT Specialist Intern' },
    company: 'ASD Systems Sp. z o.o.',
    duration: { pl: '1 miesiąc', en: '1 month' },
    type: { pl: 'staż', en: 'internship' },
    details: {
      pl: ['Automatyczne testy w Pythonie i Pytest dla aplikacji webowej automatów vendingowych.', 'Testowanie endpointów API i prace utrzymaniowe.'],
      en: ['Python and Pytest automated tests for a vending machine web application.', 'API endpoint testing and maintenance work.'],
    },
  },
  {
    role: { pl: 'Konsultant infolinii NFZ', en: 'NFZ Helpline Consultant' },
    company: 'Arteria',
    duration: { pl: '6 miesięcy', en: '6 months' },
    type: { pl: 'praca zdalna', en: 'remote' },
    details: {
      pl: ['Obsługa infolinii Narodowego Funduszu Zdrowia i precyzyjne przekazywanie informacji.'],
      en: ['Handled National Health Fund helpline cases and communicated information accurately.'],
    },
  },
  {
    role: { pl: 'Specjalista ds. sprzedaży', en: 'Sales Specialist' },
    company: 'Selvoy',
    duration: { pl: '6 miesięcy', en: '6 months' },
    type: { pl: 'sprzedaż', en: 'sales' },
    details: {
      pl: ['Rozmowy z klientami, rozpoznawanie potrzeb i praca z celami.'],
      en: ['Customer conversations, needs discovery and goal-oriented work.'],
    },
  },
]

export const skillGroups = [
  { key: 'backend', items: ['Python', 'FastAPI', 'Django / DRF / Channels', 'REST', 'JWT', 'PostgreSQL', 'MySQL', 'Redis'] },
  { key: 'frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'] },
  { key: 'quality', items: ['Manual & regression testing', 'API testing', 'Postman', 'Swagger / OpenAPI', 'Pytest', 'Jest basics', 'Jira / Xray / Zephyr', 'Confluence'] },
  { key: 'platform', items: ['Docker / Compose', 'Linux', 'WordPress / WooCommerce', 'PHP basics', 'ACF'] },
  { key: 'learning', items: ['Kubernetes', 'Helm', 'CI/CD', 'Terraform', 'Azure'] },
]
