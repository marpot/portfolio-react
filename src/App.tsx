import { type MouseEvent, useEffect, useMemo, useState } from 'react'
import { experience, projects, skillGroups } from './data'
import { copy } from './i18n'
import type { Language, ProjectCategory, Theme } from './types'

const email = 'marcin.potoczny@protonmail.com'
const sectionIds = ['about', 'projects', 'skills', 'experience', 'contact'] as const
type SectionId = typeof sectionIds[number]

const isSectionId = (value: string): value is SectionId => sectionIds.some(id => id === value)

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M10 5l5 5-5 5" /></svg>
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === 'dark'
    ? <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    : <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/></svg>
}

function SectionHeading({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return <div className="section-heading reveal">
    <p className="section-label">{label}</p>
    <div><h2>{title}</h2>{intro && <p>{intro}</p>}</div>
  </div>
}

function App() {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem('language') === 'en' ? 'en' : 'pl')
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' || saved === 'dark' ? saved : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(() => {
    const hash = window.location.hash.slice(1)
    return isSectionId(hash) ? hash : null
  })
  const t = copy[language]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = language === 'pl' ? 'Marcin Potoczny — Software Engineering & QA' : 'Marcin Potoczny — Software Engineering & QA'
    localStorage.setItem('language', language)
  }, [language])

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.1 })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [language, filter])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    let observer: IntersectionObserver | null = null

    const updateActiveSection = () => {
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const activationLine = headerHeight + 1
      let nextSection: SectionId | null = null

      sections.forEach(section => {
        if (section.getBoundingClientRect().top <= activationLine && isSectionId(section.id)) {
          nextSection = section.id
        }
      })

      setActiveSection(current => current === nextSection ? current : nextSection)

      const nextHash = nextSection ? `#${nextSection}` : ''
      if (window.location.hash !== nextHash) {
        const url = `${window.location.pathname}${window.location.search}${nextHash}`
        window.history.replaceState(window.history.state, '', url)
      }
    }

    const observeSections = () => {
      observer?.disconnect()
      const headerHeight = Math.round(header?.getBoundingClientRect().height ?? 0)
      const bottomMargin = Math.max(0, window.innerHeight - headerHeight - 1)

      observer = new IntersectionObserver(updateActiveSection, {
        rootMargin: `-${headerHeight}px 0px -${bottomMargin}px 0px`,
        threshold: 0,
      })
      sections.forEach(section => observer?.observe(section))
      updateActiveSection()
    }

    const handleHistoryNavigation = () => {
      const hash = window.location.hash.slice(1)
      if (isSectionId(hash)) setActiveSection(hash)
    }

    const initialHash = window.location.hash.slice(1)
    if (isSectionId(initialHash)) {
      const initialSection = document.getElementById(initialHash)
      if (initialSection) {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior
        document.documentElement.style.scrollBehavior = 'auto'
        initialSection.scrollIntoView({ behavior: 'auto', block: 'start' })
        document.documentElement.style.scrollBehavior = previousScrollBehavior
      }
    }

    const resizeObserver = new ResizeObserver(observeSections)
    if (header) resizeObserver.observe(header)
    window.addEventListener('resize', observeSections)
    window.addEventListener('hashchange', handleHistoryNavigation)
    window.addEventListener('popstate', handleHistoryNavigation)
    observeSections()

    return () => {
      observer?.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('resize', observeSections)
      window.removeEventListener('hashchange', handleHistoryNavigation)
      window.removeEventListener('popstate', handleHistoryNavigation)
    }
  }, [])

  const visibleProjects = useMemo(() => filter === 'all' ? projects : projects.filter(project => project.category.includes(filter)), [filter])
  const navItems = Object.entries(t.nav)

  const copyAddress = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    const section = document.getElementById(id)
    if (!section) return

    const nextHash = `#${id}`
    if (window.location.hash === nextHash) {
      window.history.replaceState(window.history.state, '', nextHash)
    } else {
      window.history.pushState(window.history.state, '', nextHash)
    }

    setActiveSection(id)
    setMenuOpen(false)
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Marcin Potoczny — home"><span>MP</span><b>Marcin Potoczny</b></a>
      <nav className={menuOpen ? 'nav is-open' : 'nav'} aria-label="Main navigation">
        {navItems.map(([id, label]) => {
          const sectionId = id as SectionId
          const isActive = activeSection === sectionId
          return <a
            key={id}
            href={`#${id}`}
            className={isActive ? 'active' : undefined}
            aria-current={isActive ? 'location' : undefined}
            onClick={event => navigateToSection(event, sectionId)}
          >{label}</a>
        })}
      </nav>
      <div className="header-actions">
        <button className="language-button" onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')} aria-label={t.lang}>{language === 'pl' ? 'EN' : 'PL'}</button>
        <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={t.theme}><ThemeIcon theme={theme} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? t.closeMenu : t.menu}><span></span><span></span></button>
      </div>
    </header>

    <main id="main">
      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-main reveal is-visible">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitleA}<br/><span>{t.heroTitleB}</span></h1>
            <p className="hero-copy">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">{t.seeWork}<ArrowIcon /></a>
              <a className="button button--secondary" href={`mailto:${email}`}>{t.emailMe}</a>
            </div>
          </div>
          <aside className="availability reveal is-visible" aria-label={t.available}>
            <div className="availability-top"><span className="status-dot"></span><strong>{t.available}</strong></div>
            <dl>
              <div><dt>01</dt><dd>{t.based}</dd></div>
              <div><dt>02</dt><dd>{t.mode}</dd></div>
              <div><dt>03</dt><dd>{t.language}</dd></div>
            </dl>
          </aside>
        </div>
        <div className="hero-marquee" aria-hidden="true"><span>PYTHON</span><i></i><span>FASTAPI</span><i></i><span>REACT</span><i></i><span>QUALITY</span><i></i><span>REMOTE</span></div>
      </section>

      <section className="section about" id="about">
        <SectionHeading label={t.aboutLabel} title={t.aboutTitle} />
        <div className="about-layout reveal">
          <div className="about-copy"><p>{t.aboutText1}</p><p>{t.aboutText2}</p></div>
          <div className="capability-map" aria-label="Core capabilities">
            {t.facts.map((fact, i) => <div key={fact}><span>0{i + 1}</span><strong>{fact}</strong></div>)}
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <SectionHeading label={t.projectsLabel} title={t.projectsTitle} intro={t.projectsIntro} />
        <div className="filters reveal" role="group" aria-label="Project filters">
          {(Object.keys(t.filters) as Array<keyof typeof t.filters>).map(key => <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)} aria-pressed={filter === key}>{t.filters[key]}</button>)}
        </div>
        <div className="project-grid">
          {visibleProjects.map(project => <article className={project.featured ? 'project-card project-card--featured reveal' : 'project-card reveal'} key={project.name}>
            <div className="project-card__top"><span className="project-number">/{project.number}</span><span className="project-arrow"><ArrowIcon /></span></div>
            <a className="project-card__image" href={project.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
              <img src={project.image} alt="" loading="lazy" />
            </a>
            <h3>{project.name}</h3>
            <p>{project.description[language]}</p>
            <ul aria-label="Technology stack">{project.stack.map(item => <li key={item}>{item}</li>)}</ul>
            <a href={project.url} target="_blank" rel="noreferrer" aria-label={`${t.openRepo}: ${project.name}`}>{t.openRepo}<ArrowIcon /></a>
          </article>)}
        </div>
      </section>

      <section className="section skills" id="skills">
        <SectionHeading label={t.skillsLabel} title={t.skillsTitle} intro={t.skillsIntro} />
        <div className="skills-grid">
          {skillGroups.map((group, index) => <article className={`skill-group skill-group--${group.key} reveal`} key={group.key}>
            <div className="skill-group__heading"><span>0{index + 1}</span><h3>{t.skillNames[group.key as keyof typeof t.skillNames]}</h3></div>
            <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
            {group.key === 'learning' && <p>{t.learningNote}</p>}
          </article>)}
        </div>
      </section>

      <section className="section experience" id="experience">
        <SectionHeading label={t.expLabel} title={t.expTitle} />
        <div className="timeline">
          {experience.map((item, index) => <article className="timeline-item reveal" key={item.company + index}>
            <div className="timeline-index">0{index + 1}</div>
            <div className="timeline-role"><h3>{item.role[language]}</h3><p>{item.company}{item.location ? ` · ${item.location}` : ''}</p></div>
            <div className="timeline-meta"><span>{item.duration[language]}</span><span>{item.type[language]}</span></div>
            <ul>{item.details[language].map(detail => <li key={detail}>{detail}</li>)}</ul>
          </article>)}
        </div>
      </section>

      <section className="section contribution">
        <SectionHeading label={t.contributionLabel} title={t.contributionTitle} />
        <div className="contribution-grid">
          {t.contributions.map((item, index) => <article className="contribution-card reveal" key={item[0]}><span>0{index + 1}</span><h3>{item[0]}</h3><p>{item[1]}</p></article>)}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner reveal">
          <p className="section-label">{t.contactLabel}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactText}</p>
          <div className="contact-actions">
            <a className="button button--primary" href={`mailto:${email}`}>{t.mail}<ArrowIcon /></a>
            <a className="button button--outline" href="https://github.com/marpot" target="_blank" rel="noreferrer">{t.github}<ArrowIcon /></a>
          </div>
          <button className="email-copy" onClick={copyAddress} aria-label={t.copyEmail}><span>{copied ? t.copied : email}</span><svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button>
        </div>
      </section>
    </main>
    <footer><a className="brand" href="#top"><span>MP</span><b>Marcin Potoczny</b></a><p>{t.footer}</p><p>© {new Date().getFullYear()}</p></footer>
  </>
}

export default App
