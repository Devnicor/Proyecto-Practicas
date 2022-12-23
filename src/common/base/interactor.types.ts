// eslint-disable-next-line hexagonal-architecture/enforce
export type ContextInteractor = {
  data: any;
  fail: ContextError;
};

type ContextError = {
  error: string;
};
