export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}
