interface PendingState {
  [key: string]: boolean;
}

interface ErrorState {
  [key: string]: string | null;
}

export interface BaseState {
  isPending: PendingState;
  errors: ErrorState;
}
