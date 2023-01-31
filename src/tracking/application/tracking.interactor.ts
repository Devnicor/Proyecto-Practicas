import { Inject, Injectable } from '@nestjs/common';
import Interactor from '../../common/base/interactor';
import { ContextInteractor } from '../../common/base/interactor.types';
import TrackRepository from '../domain/tracking.repository';

@Injectable()
export class TrackingInteractor extends Interactor {
  constructor(@Inject('TrackRepository') private repository: TrackRepository) {
    super();
  }

  async run(): Promise<ContextInteractor> {
    try {
      this.context.data = {
        message: this.repository.getTrackingMessage(),
      };
    } catch (error) {
      this.context.fail.error = error;
    } finally {
      return this.context;
    }
  }
}
