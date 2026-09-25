export type Language = 'pl' | 'en'
export type Theme = 'light' | 'dark'
export type ProjectCategory = 'backend' | 'fullstack' | 'wordpress'

export interface Project {
  name: string
  number: string
  category: ProjectCategory[]
  url: string
  image: string
  imageAlt: Record<Language, string>
  description: Record<Language, string>
  stack: string[]
  featured?: boolean
}

export interface Experience {
  role: Record<Language, string>
  company: string
  duration: Record<Language, string>
  location?: string
  type: Record<Language, string>
  details: Record<Language, string[]>
}
