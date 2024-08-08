export type Theme = 'spring' | 'summer' | 'autumn' | 'winter';

export interface ThemeProperties {
    primary: string;
    secondary: string;
    background: string;
    text: string;
}

export const themes: Record<Theme, ThemeProperties> = {
    spring: {
        primary: 'rgba(163, 255, 172,0.5)',
        secondary: '#cddc39',
        background: 'linear-gradient(90deg, rgba(186,209,120,1) 0%, rgba(182,255,214,1) 100%)',
        text: '#000000',
    },
    summer: {
        primary: 'rgba(227, 255, 163,0.5)',
        secondary: '#ff5722',
        background: 'linear-gradient(90deg, rgba(209,186,120,1) 0%, rgba(228,255,182,1) 100%)',
        text: '#000000',
    },
    autumn: {
        primary: 'rgba(255, 223, 163,0.5)',
        secondary: '#795548',
        background: 'linear-gradient(90deg, rgb(184 118 80) 0%, rgb(218 182 83) 100%)',
        text: '#000000',
    },
    winter: {
        primary: 'rgba(231, 250 ,255, 0.5)',
        secondary: '#03a9f4',
        background: 'linear-gradient(90deg, rgba(120,179,209,1) 0%, rgba(182,255,251,1) 100%)',
        text: '#ffffff',
    },
};
