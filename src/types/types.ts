export interface DatabaseEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  imgSrc: string;
  imgAltText: string;
  NSFW: boolean;
  description: string;
  links: string[];
  tags: string[];
  otd: string;
}
