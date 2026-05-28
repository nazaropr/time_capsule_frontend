export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface Recipient {
  email: string;
}

export interface Capsule {
  id: string;
  owner: string;
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

export interface CreateCapsule {
  title: string;
  content: string;
  unlockAt: string;
  isPublic?: boolean;
  recipients: Recipient[];
}

export type UpdateCapsule = Partial<CreateCapsule>;

export interface ActionState {
  error?: string;
  success?: boolean;
  message?: string;
}

export interface UpdateProfile {
  name?: string;
  email?: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
