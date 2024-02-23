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

export interface QuotesData {
  content: string;
  Id: number;
  language_code: string;
  originator: {
    description: string;
    id: number;
    language_code: string;
    master_id: number;
    name: string;
    url: string;
  };
  tags: string[];
  url: string;
}

