import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface StackAPI {
  id: string;
  name: string;
  provider: string;
  cost: string;
  monthlyCost: number;
  category: string;
  uptime: string;
  latency: string;
  icon: string;
}

export interface SavedStack {
  id?: string;
  userId: string;
  name: string;
  description: string;
  useCase: string;
  apis: StackAPI[];
  totalMonthlyCost: number;
  isPublic: boolean;
  shareCode?: string;
  views: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Generate a unique share code
const generateShareCode = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Save a new stack
export const saveStack = async (
  userId: string,
  name: string,
  description: string,
  useCase: string,
  apis: StackAPI[],
  isPublic: boolean = false
): Promise<string> => {
  try {
    const totalMonthlyCost = apis.reduce((sum, api) => sum + api.monthlyCost, 0);
    const shareCode = generateShareCode();

    const stack: SavedStack = {
      userId,
      name,
      description,
      useCase,
      apis,
      totalMonthlyCost,
      isPublic,
      shareCode,
      views: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'stacks'), stack);
    return docRef.id;
  } catch (error) {
    console.error('Error saving stack:', error);
    throw error;
  }
};

// Get a stack by ID
export const getStack = async (stackId: string): Promise<SavedStack | null> => {
  try {
    const docRef = doc(db, 'stacks', stackId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SavedStack;
    }
    return null;
  } catch (error) {
    console.error('Error getting stack:', error);
    throw error;
  }
};

// Get a stack by share code
export const getStackByShareCode = async (shareCode: string): Promise<SavedStack | null> => {
  try {
    const q = query(collection(db, 'stacks'), where('shareCode', '==', shareCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as SavedStack;
  } catch (error) {
    console.error('Error getting stack by share code:', error);
    throw error;
  }
};

// Get all stacks for a user
export const getUserStacks = async (userId: string): Promise<SavedStack[]> => {
  try {
    const q = query(collection(db, 'stacks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SavedStack[];
  } catch (error) {
    console.error('Error getting user stacks:', error);
    throw error;
  }
};

// Update a stack
export const updateStack = async (
  stackId: string,
  updates: Partial<SavedStack>
): Promise<void> => {
  try {
    const docRef = doc(db, 'stacks', stackId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating stack:', error);
    throw error;
  }
};

// Delete a stack
export const deleteStack = async (stackId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'stacks', stackId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting stack:', error);
    throw error;
  }
};

// Increment view count
export const incrementStackViews = async (stackId: string): Promise<void> => {
  try {
    const stack = await getStack(stackId);
    if (stack) {
      await updateStack(stackId, {
        views: (stack.views || 0) + 1,
      });
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
};

// Toggle public/private
export const toggleStackPublic = async (stackId: string, isPublic: boolean): Promise<void> => {
  try {
    await updateStack(stackId, { isPublic });
  } catch (error) {
    console.error('Error toggling stack public:', error);
    throw error;
  }
};

// Get public stacks (community stacks)
export const getPublicStacks = async (limit: number = 20): Promise<SavedStack[]> => {
  try {
    const q = query(
      collection(db, 'stacks'),
      where('isPublic', '==', true)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit) as SavedStack[];
  } catch (error) {
    console.error('Error getting public stacks:', error);
    throw error;
  }
};

// Clone a stack
export const cloneStack = async (
  userId: string,
  sourceStackId: string,
  newName: string
): Promise<string> => {
  try {
    const sourceStack = await getStack(sourceStackId);
    if (!sourceStack) {
      throw new Error('Stack not found');
    }

    const stackId = await saveStack(
      userId,
      newName,
      sourceStack.description,
      sourceStack.useCase,
      sourceStack.apis,
      false // New cloned stacks are private by default
    );

    return stackId;
  } catch (error) {
    console.error('Error cloning stack:', error);
    throw error;
  }
};

