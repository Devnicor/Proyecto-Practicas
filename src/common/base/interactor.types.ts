export type ContextInteractor = {
  data: any;
  fail: ContextError;
};

type ContextError = {
  error: string;
};
