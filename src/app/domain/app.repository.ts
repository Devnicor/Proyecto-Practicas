export default interface AppRepository {
  getHealthCheckMessage(): string;

  getTrackingMessage(): object;
}
