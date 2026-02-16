import { Wish } from '../data/wishes';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper to get admin secret from localStorage
const getAdminSecret = (): string => {
  return localStorage.getItem('adminSecret') || '';
};

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

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
  wishes?: Wish[];
  wish?: Wish;
  count?: number;
}

// Helper function to handle API errors
function handleApiError(error: any): never {
  if (error.response) {
    const message = error.response.data?.error || error.response.statusText;
    throw new Error(message);
  } else if (error.request) {
    throw new Error('Réseau indisponible. Vérifiez votre connexion.');
  } else {
    throw new Error(error.message || 'Une erreur est survenue');
  }
}

// Submit a new wish
export async function submitWish(data: SubmitWishData): Promise<SubmitWishResponse> {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('message', data.message);
    
    if (data.videoFile && data.type === 'video') {
      formData.append('video', data.videoFile);
    }

    const response = await fetch(`${API_URL}/wishes/submit`, {
      method: 'POST',
      body: formData,
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.error || 'Erreur lors de l\'envoi du vœu',
        error: result.error,
      };
    }

    return {
      success: true,
      message: result.message || 'Vœu enregistré avec succès',
      wishId: result.data?.wishId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Une erreur est survenue',
      error: 'NETWORK_ERROR',
    };
  }
}

// Get approved wishes (public)
export async function getApprovedWishes(): Promise<Wish[]> {
  try {
    const response = await fetch(`${API_URL}/wishes/approved`);
    
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des vœux');
    }

    const result: ApiResponse = await response.json();
    return result.wishes || [];
  } catch (error: any) {
    console.error('Error fetching approved wishes:', error);
    return [];
  }
}

// Get all wishes (admin only)
export async function getAllWishes(): Promise<Wish[]> {
  try {
    const response = await fetch(`${API_URL}/wishes`, {
      headers: {
        'X-Admin-Secret': getAdminSecret(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du chargement des vœux');
    }

    const result: ApiResponse = await response.json();
    return result.wishes || [];
  } catch (error: any) {
    console.error('Error fetching all wishes:', error);
    return [];
  }
}

// Get total contribution count (for public counter)
export async function getContributionCount(): Promise<number> {
  try {
    const wishes = await getApprovedWishes();
    return wishes.length;
  } catch (error: any) {
    console.error('Error getting contribution count:', error);
    return 0;
  }
}

// Approve a wish (admin only)
export async function approveWish(wishId: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/wishes/${wishId}/approve`, {
      method: 'PATCH',
      headers: {
        'X-Admin-Secret': getAdminSecret(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'approbation du vœu');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error approving wish:', error);
    return { success: false };
  }
}

// Reject a wish (admin only)
export async function rejectWish(wishId: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/wishes/${wishId}/reject`, {
      method: 'PATCH',
      headers: {
        'X-Admin-Secret': getAdminSecret(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du rejet du vœu');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error rejecting wish:', error);
    return { success: false };
  }
}

// Restore a wish to pending (admin only)
export async function restoreWish(wishId: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/wishes/${wishId}/restore`, {
      method: 'PATCH',
      headers: {
        'X-Admin-Secret': getAdminSecret(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la restauration du vœu');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error restoring wish:', error);
    return { success: false };
  }
}

// Set admin secret in localStorage
export function setAdminSecret(secret: string): void {
  localStorage.setItem('adminSecret', secret);
}

// Clear admin secret from localStorage
export function clearAdminSecret(): void {
  localStorage.removeItem('adminSecret');
}