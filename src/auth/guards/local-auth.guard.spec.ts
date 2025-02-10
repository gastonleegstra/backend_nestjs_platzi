import { LocalAuthGuard } from './local-auth.guard';

describe('LocalGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
