export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Recipient {
  email: string;
}

export interface Capsule {
  id: string;
  title: string;
  unlockAt: string;
  createdAt: string;
  isPublic: boolean;
  isUnlocked: boolean;
  slug: string;
  recipients: Recipient[];
}

export interface CapsuleWithContent extends Capsule {
  content: string | null;
}

export interface ActionState {
  error?: string;
  success?: boolean;
  message?: string;
}

export interface CreateCapsuleDto {
  title: string;
  content: string;
  unlockAt: string;
  isPublic?: boolean;
  recipients: Recipient[];
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
}

export interface UpdatePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
