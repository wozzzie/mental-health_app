export type ImageData = {
  image: string;
  isDefault?: boolean;
  _id?: string;
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
