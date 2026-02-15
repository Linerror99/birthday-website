export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizQuestions: QuizQuestion[] = [
{
  id: 1,
  question: 'Quelle est ma couleur préférée ?',
  options: ['Bleu', 'Rouge', 'Vert', 'Violet'],
  correctAnswer: 0
},
{
  id: 2,
  question: 'Quel est mon plat favori ?',
  options: ['Pizza', 'Sushi', 'Pasta', 'Burger'],
  correctAnswer: 2
},
{
  id: 3,
  question: 'Où nous sommes-nous rencontrés ?',
  options: ["À l'école", 'Au travail', 'En voyage', 'Par des amis'],
  correctAnswer: 3
},
{
  id: 4,
  question: 'Quel est mon film préféré ?',
  options: ['Inception', 'Interstellar', 'The Matrix', 'Pulp Fiction'],
  correctAnswer: 1
},
{
  id: 5,
  question: 'Quelle est ma saison préférée ?',
  options: ['Printemps', 'Été', 'Automne', 'Hiver'],
  correctAnswer: 2
},
{
  id: 6,
  question: 'Quel sport est-ce que je préfère ?',
  options: ['Football', 'Basketball', 'Tennis', 'Natation'],
  correctAnswer: 0
},
{
  id: 7,
  question: 'Quelle est ma boisson préférée ?',
  options: ['Café', 'Thé', "Jus d'orange", 'Eau pétillante'],
  correctAnswer: 0
},
{
  id: 8,
  question: "Quel type de musique j'écoute le plus ?",
  options: ['Pop', 'Rock', 'Jazz', 'Électro'],
  correctAnswer: 3
},
{
  id: 9,
  question: 'Quelle est ma destination de rêve ?',
  options: ['Japon', 'Islande', 'Nouvelle-Zélande', 'Patagonie'],
  correctAnswer: 1
},
{
  id: 10,
  question: 'Quel est mon animal préféré ?',
  options: ['Chien', 'Chat', 'Dauphin', 'Panda'],
  correctAnswer: 2
}];