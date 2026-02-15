export interface Photo {
  id: number;
  src: string;
  caption: string;
  date?: string;
}

export const photos: Photo[] = [
{
  id: 1,
  src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  caption: 'Souvenir inoubliable de notre première aventure ensemble',
  date: '2020-06-15'
},
{
  id: 2,
  src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  caption: 'Moment magique sous les étoiles',
  date: '2021-08-22'
},
{
  id: 3,
  src: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?w=800&q=80',
  caption: "Célébration d'un moment spécial",
  date: '2021-12-31'
},
{
  id: 4,
  src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  caption: 'Rires et complicité entre amis',
  date: '2022-03-10'
},
{
  id: 5,
  src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
  caption: "Exploration d'un nouvel horizon",
  date: '2022-07-18'
},
{
  id: 6,
  src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
  caption: 'Coucher de soleil mémorable',
  date: '2023-01-05'
},
{
  id: 7,
  src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  caption: 'Aventure urbaine inoubliable',
  date: '2023-05-20'
},
{
  id: 8,
  src: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80',
  caption: 'Moments de joie partagés',
  date: '2023-09-12'
},
{
  id: 9,
  src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
  caption: "Découverte d'un lieu magique",
  date: '2024-02-14'
},
{
  id: 10,
  src: 'https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&q=80',
  caption: 'Évasion dans la nature',
  date: '2024-08-30'
}];