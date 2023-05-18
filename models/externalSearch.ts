export interface Result {
  type: string
  title: string
  description: string | null
  og_type: string
  _links: Links
}

export interface Links {
  self: Self
  permalink: Permalink
  thumbnail: Thumbnail
}

export interface Self {
  href: string
}

export interface Permalink {
  href: string
}

export interface Thumbnail {
  href: string
}
