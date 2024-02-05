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

export type ImageType = {
  src: string;
  alt: string;
};

export type LoadingStatus = "pending" | "fetched" | "error" | "start";
