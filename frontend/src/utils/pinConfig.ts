// Configuration du code PIN pour accéder aux vœux
// Modifie cette valeur pour changer le code d'accès

export const SECRET_PIN = 'TONI'; // Peut être: 'TONI', '1234', '15022000', etc.

// Fonction pour valider le PIN (insensible à la casse)
export function validatePin(input: string): boolean {
  return input.toUpperCase().trim() === SECRET_PIN.toUpperCase().trim();
}