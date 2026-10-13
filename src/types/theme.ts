export interface ThemeColorPalette {
  ground: string;
  accentSun: string;
  accentVice: string;
  ink: string;
  muted: string;
  scrim: string;
}

export interface SiteTheme {
  id: string;
  name: string;
  image: string;
  mobileImage: string;
  colors: ThemeColorPalette;
}

export const SITE_THEMES: SiteTheme[] = [
  {
    id: 'vice-sunset',
    name: 'Vice Sunset',
    image: './assets/grand-theft-auto-vi-1920x1200-22305.jpg',
    mobileImage: './assets/grand-theft-auto-vi-1080x1920-22305.jpg',
    colors: {
      ground: '#100219',
      accentSun: '#ffd000',
      accentVice: '#f4327f',
      ink: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.75)',
      scrim: 'rgba(16, 2, 25, 0.78)',
    },
  },
  {
    id: 'vice-skyline',
    name: 'Vice Skyline',
    image: './assets/grand-theft-auto-vi-1920x1200-27379.jpg',
    mobileImage: './assets/grand-theft-auto-vi-1080x1920-27379.jpg',
    colors: {
      ground: '#0a1128',
      accentSun: '#ff9e00',
      accentVice: '#00e5ff',
      ink: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.75)',
      scrim: 'rgba(10, 17, 40, 0.78)',
    },
  },
  {
    id: 'neon-supercar',
    name: 'Neon Supercar',
    image: './assets/gta-6-supercar-1920x1200-26759.jpg',
    mobileImage: './assets/gta-6-supercar-1080x1920-26759.jpg',
    colors: {
      ground: '#08040d',
      accentSun: '#ff007f',
      accentVice: '#9d4edd',
      ink: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.75)',
      scrim: 'rgba(8, 4, 13, 0.8)',
    },
  },
  {
    id: 'leonida-keys',
    name: 'Leonida Keys',
    image: './assets/leonida-keys-gta-6-1920x1200-22317.jpg',
    mobileImage: './assets/leonida-keys-gta-6-1080x1920-22317.jpg',
    colors: {
      ground: '#031d28',
      accentSun: '#ffb703',
      accentVice: '#06d6a0',
      ink: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.75)',
      scrim: 'rgba(3, 29, 40, 0.78)',
    },
  },
  {
    id: 'lucia-caminos',
    name: 'Lucia Caminos',
    image: './assets/lucia-caminos-vice-1920x1200-26980.jpg',
    mobileImage: './assets/lucia-caminos-vice-1080x1920-26980.jpg',
    colors: {
      ground: '#14051e',
      accentSun: '#ffe066',
      accentVice: '#ff4365',
      ink: '#ffffff',
      muted: 'rgba(255, 255, 255, 0.75)',
      scrim: 'rgba(20, 5, 30, 0.78)',
    },
  },
];
