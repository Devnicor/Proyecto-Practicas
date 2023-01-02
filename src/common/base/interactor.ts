import { ContextInteractor } from './interactor.types';

export default abstract class Interactor {
  protected readonly context: ContextInteractor = {
    data: {},
    fail: {
      error: null,
    },
  };
  abstract run(context: object): Promise<ContextInteractor>;
}
