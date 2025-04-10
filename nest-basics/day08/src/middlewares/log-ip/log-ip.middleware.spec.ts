import { LogIpMiddleware } from './log-ip.middleware';

describe('LogIpMiddleware', () => {
  it('should be defined', () => {
    expect(new LogIpMiddleware()).toBeDefined();
  });
});
