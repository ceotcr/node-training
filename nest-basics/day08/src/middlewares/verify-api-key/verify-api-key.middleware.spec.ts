import { VerifyApiKeyMiddleware } from './verify-api-key.middleware';

describe('VerifyApiKeyMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyApiKeyMiddleware()).toBeDefined();
  });
});
