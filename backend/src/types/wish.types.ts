export interface Wish {
  id: string;
  name: string;
  type: 'text' | 'video';
  message: string;
  videoStoragePath?: string;
  videoUrl?: string;
  approved: boolean;
  rejected: boolean;
  createdAt: Date;
}

export interface CreateWishDto {
  name: string;
  type: 'text' | 'video';
  message: string;
  videoFile?: Express.Multer.File;
}

export interface WishResponse {
  id: string;
  name: string;
  type: 'text' | 'video';
  message: string;
  videoUrl?: string;
  approved: boolean;
  rejected: boolean;
  createdAt: string;
}

export interface SubmitWishResponse {
  success: boolean;
  message: string;
  wishId?: string;
  error?: string;
}

export interface WishFilter {
  approved?: boolean;
  rejected?: boolean;
}
