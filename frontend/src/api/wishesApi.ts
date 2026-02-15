import { Wish, mockWishes } from '../data/wishes';

export interface SubmitWishData {
  name: string;
  type: 'text' | 'video';
  message: string;
  videoFile?: File;
}

export interface SubmitWishResponse {
  success: boolean;
  message: string;
  wishId?: string;
  error?: string;
}

// Mock API call to submit a wish
export async function submitWish(
data: SubmitWishData)
: Promise<SubmitWishResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulate validation
  if (!data.name || data.name.trim().length === 0) {
    return {
      success: false,
      message: 'Le prénom est requis',
      error: 'MISSING_NAME'
    };
  }

  if (
  data.type === 'text' && (
  !data.message || data.message.trim().length === 0))
  {
    return {
      success: false,
      message: 'Le message est requis',
      error: 'MISSING_MESSAGE'
    };
  }

  if (data.type === 'video' && !data.videoFile) {
    return {
      success: false,
      message: 'La vidéo est requise',
      error: 'MISSING_VIDEO'
    };
  }

  // Simulate random success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1;

  if (!isSuccess) {
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
      error: 'SERVER_ERROR'
    };
  }

  // Success response
  const wishId = `wish-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  return {
    success: true,
    message: 'Vœu enregistré avec succès',
    wishId
  };
}

// Mock API call to get approved wishes
export async function getApprovedWishes(): Promise<Wish[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Return only approved wishes
  return mockWishes.filter((wish) => wish.approved);
}

// Mock API call to get all wishes (for admin)
export async function getAllWishes(): Promise<Wish[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockWishes;
}

// Mock API call to get total contribution count (for public counter)
export async function getContributionCount(): Promise<number> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return total number of wishes (approved + pending + rejected)
  return mockWishes.length;
}

// Mock API call to approve a wish
export async function approveWish(
wishId: string)
: Promise<{success: boolean;}> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const wish = mockWishes.find((w) => w.id === wishId);
  if (wish) {
    wish.approved = true;
    wish.rejected = false;
  }

  return { success: true };
}

// Mock API call to reject a wish
export async function rejectWish(
wishId: string)
: Promise<{success: boolean;}> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const wish = mockWishes.find((w) => w.id === wishId);
  if (wish) {
    wish.approved = false;
    wish.rejected = true;
  }

  return { success: true };
}

// Mock API call to restore a wish (move back to pending)
export async function restoreWish(
wishId: string)
: Promise<{success: boolean;}> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const wish = mockWishes.find((w) => w.id === wishId);
  if (wish) {
    wish.approved = false;
    wish.rejected = false;
  }

  return { success: true };
}