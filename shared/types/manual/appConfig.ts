export interface AppConfig {
  id: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  seo: {
    id: number;
    metaTitle: string;
    metaDescription: string;
    imgSocial: string | null;
  };
  thumbnail: {
    id: number;
    logoSystem: Media;
    favicon: Media;
  };
  header: {
    id: number;
    textColor: string;
    textColorHover: string;
    bgHeader: BgHeader;
    bgHeaderScroll: BgHeader;
    bgHeaderWap: BgHeader;
  };
  footer: Footer;
  banners: Banner[];
  topKeywords: Keyword[];
  ThumbnailApp: {
    id: number;
    logo: MediaWithFormats;
    icon: Media;
  };
  bannersWrap: BannerWrap[];
  incomingEvents: IncomingEvent[];
}

export interface Media {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: object | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: object | null;
  created_at: string;
  updated_at: string;
}

export interface MediaWithFormats extends Media {
  formats: {
    thumbnail?: MediaSize;
    large?: MediaSize;
    medium?: MediaSize;
    small?: MediaSize;
  };
}

export interface MediaSize {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

export interface BgHeader {
  id: number;
  bgColor: string;
  bgLeft: Media | null;
  bgRight: Media | null;
}

export interface BgFooter {
  id: number;
  bgColor: string;
  bgTop: Media | null;
  bgBottom: Media | null;
}

export interface Footer {
  id: number;
  description: string;
  copyright: string;
  phone: string;
  email: string;
  textColor: string;
  textColorHover: string;
  address: string;
  information: string;
  bgFooter: BgFooter;
  bgFooterWap: BgFooter;
  link: FooterLink[];
  support: FooterLink[];
  Social: FooterSocial[];
}

export interface FooterLink {
  id: number;
  title: string;
  url: string;
  nofollow: boolean;
}

export interface FooterSocial extends FooterLink {
  icon: Media;
}

export interface Banner {
  id: number;
  position: number;
  isInternalLink: boolean;
  supportWeb: boolean;
  supportWap: boolean;
  nofollow: boolean;
  url: string;
  imgWeb: MediaWithFormats;
  imgWap: MediaWithFormats;
}

export interface Keyword {
  id: number;
  title: string;
  url: string;
  nofollow: boolean;
}

export interface BannerWrap {
  id: number;
  name: string;
  location: number;
  url: string | null;
  hasToken: boolean;
  image: MediaWithFormats;
}

export interface IncomingEvent {
  id: number;
  title: string;
  time: string;
  hidden: boolean;
}
