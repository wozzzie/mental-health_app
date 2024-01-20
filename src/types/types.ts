export type ImageData = {
  image: string;
  isDefault?: boolean;
};

export interface ZodiacSignData {
  horoscope: {
    date: string;
    horoscope: string;
    icon: string;
    id: number;
    sign: string;
  };
  success: boolean;
}
