export interface Wish {
  id: string;
  name: string;
  type: 'text' | 'video';
  message: string;
  videoUrl?: string;
  approved: boolean;
  rejected: boolean;
  createdAt: string;
}

export const mockWishes: Wish[] = [
{
  id: '1',
  name: 'Sophie',
  type: 'text',
  message:
  "Joyeux anniversaire ! Tu es une personne incroyable et j'ai tellement de chance de t'avoir dans ma vie. Que cette année t'apporte tout le bonheur que tu mérites !",
  approved: true,
  rejected: false,
  createdAt: '2025-02-10T10:30:00Z'
},
{
  id: '2',
  name: 'Marc',
  type: 'video',
  message: 'Un petit message vidéo pour toi !',
  videoUrl:
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  approved: true,
  rejected: false,
  createdAt: '2025-02-11T14:20:00Z'
},
{
  id: '3',
  name: 'Julie',
  type: 'text',
  message:
  'Happy Birthday! Nos aventures ensemble sont parmi mes meilleurs souvenirs. Hâte de créer encore plein de moments magiques avec toi cette année !',
  approved: true,
  rejected: false,
  createdAt: '2025-02-12T09:15:00Z'
},
{
  id: '4',
  name: 'Thomas',
  type: 'text',
  message:
  "Bon anniversaire mon ami ! Tu illumines la vie de tous ceux qui t'entourent. Continue de briller comme tu le fais si bien !",
  approved: false,
  rejected: false,
  createdAt: '2025-02-13T16:45:00Z'
},
{
  id: '5',
  name: 'Emma',
  type: 'video',
  message: 'Joyeux anniversaire !',
  videoUrl:
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  approved: false,
  rejected: false,
  createdAt: '2025-02-14T11:00:00Z'
},
{
  id: '6',
  name: 'Lucas',
  type: 'text',
  message:
  "Joyeux anniversaire ! Merci d'être toujours là, dans les bons comme dans les mauvais moments. Tu es un vrai ami et je te souhaite le meilleur !",
  approved: false,
  rejected: true,
  createdAt: '2025-02-14T18:30:00Z'
}];