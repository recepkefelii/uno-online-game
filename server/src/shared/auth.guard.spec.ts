import { AuthGuard } from './auth.guard';

describe('SharedGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
