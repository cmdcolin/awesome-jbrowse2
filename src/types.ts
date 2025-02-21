interface Pub {
  url?: string
  doi: string
  year?: number
  citations?: number
  title?: string
}

export interface Tool {
  name: string
  url?: string
  language?: string[]
  tags?: string[]
  img?: string
  width?: number
  height?: number
  github?: string
  twitter?: string
  platform?: string[]
  github_stars?: number
  pub?: Pub
  note?: string
  alt_url?: string
  interactive?: string[]
}
