import { excludeSensitiveProperties } from '../utils/helpers';

describe('exclude Sensitive Properties  ', () => {
  /**___________________TEST______________________1 */
  it('should exclude password, phone', () => {
    const data = {
      username: 'test',
      password: 'pass',
      details: {
        email: 'test@test.test',
        phone: '333333'
      }
    };

    const propertiesToExclude = ['password', 'phone'];

    const sanitizedData = excludeSensitiveProperties(propertiesToExclude, data);

    expect(sanitizedData).toEqual({
      username: 'test',
      details: {
        email: 'test@test.test'
      }
    });
  });

  /**___________________TEST______________________2 */
  it('should exclude deep nested password', () => {
    const data = {
      username: 'john_doe',
      details: {
        email: 'test@test.test',
        phone: '123-456-7890',
        mail: {
          test: {
            password: 'password '
          }
        }
      }
    };

    const propertiesToExclude = ['password'];

    const sanitizedData = excludeSensitiveProperties(propertiesToExclude, data);

    expect(sanitizedData).toEqual({
      username: 'john_doe',
      details: {
        email: 'test@test.test',
        phone: '333333',
        mail: {
          test: {}
        }
      }
    });
  });
});
