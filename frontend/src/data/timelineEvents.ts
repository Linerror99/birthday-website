export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export const timelineEvents: TimelineEvent[] = [
{
  id: 1,
  date: '2015-09',
  title: 'Notre première rencontre',
  description:
  "Le début d'une belle amitié qui allait changer nos vies pour toujours.",
  image:
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80',
  icon: '✨'
},
{
  id: 2,
  date: '2017-07',
  title: 'Voyage mémorable à Paris',
  description:
  'Une semaine inoubliable à explorer la ville lumière ensemble, entre musées et cafés parisiens.',
  image:
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  icon: '🗼'
},
{
  id: 3,
  date: '2019-06',
  title: 'Diplôme obtenu !',
  description:
  "Célébration de la fin de nos études et du début d'une nouvelle aventure professionnelle.",
  image:
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
  icon: '🎓'
},
{
  id: 4,
  date: '2020-03',
  title: 'Projet fou réalisé',
  description:
  'Nous avons concrétisé cette idée folle dont nous parlions depuis des années.',
  image:
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  icon: '🚀'
},
{
  id: 5,
  date: '2021-12',
  title: 'Réveillon inoubliable',
  description:
  "Une soirée magique pour célébrer l'année écoulée et toutes nos réussites.",
  image:
  'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600&q=80',
  icon: '🎉'
},
{
  id: 6,
  date: '2022-08',
  title: 'Road trip épique',
  description:
  'Trois semaines sur les routes, des paysages à couper le souffle et des souvenirs impérissables.',
  image:
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
  icon: '🚗'
},
{
  id: 7,
  date: '2024-04',
  title: 'Nouveau chapitre',
  description:
  "Le début d'une nouvelle aventure professionnelle qui nous rapproche encore plus.",
  image:
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  icon: '💼'
},
{
  id: 8,
  date: '2025-11',
  title: 'Projet secret accompli',
  description:
  'Nous avons enfin réalisé ce projet dont nous rêvions depuis si longtemps.',
  image:
  'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600&q=80',
  icon: '🎯'
}];