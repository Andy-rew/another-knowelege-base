import { BaseTestClass } from '../BaseTest';
import { suite, test } from 'object-oriented-tests-jest';
import { UserBuilder } from '../builders/user.builder';
import { AuthService } from '@domain/auth/services/auth.service';
import * as dayjs from 'dayjs';
import * as timekeeper from 'timekeeper';
import { NotFoundException } from '@nestjs/common';

@suite()
export class AuthServiceTest extends BaseTestClass {
  async prepareUserForSignUp() {
    const user = await this.getBuilder(UserBuilder).build();

    return user;
  }

  async prepareUserForSignIn(dto: { password: string }) {
    const user = await this.prepareUserForSignUp();

    const signedUpUser = await this.getService(
      AuthService,
    ).signUpByEmailAndPassword({
      email: user.email,
      password: dto.password,
      samePassword: dto.password,
    });

    return signedUpUser;
  }

  async prepareForRefreshAndSignOut() {
    const pass = 'password1234';
    const user = await this.prepareUserForSignIn({ password: pass });
    const tokens = await this.getService(AuthService).signIn({
      email: user.email,
      password: pass,
    });

    return { tokens, user, pass };
  }

  @test()
  async signUpByEmailSuccess() {
    const user = await this.prepareUserForSignUp();
    const password = 'password';

    const res = await this.getService(AuthService).signUpByEmailAndPassword({
      email: user.email,
      password: password,
      samePassword: password,
    });

    expect(res).toBeDefined();
    expect(res.password).not.toBe(null);
  }

  @test()
  async signInSuccess() {
    const pass = 'password1234';
    const user = await this.prepareUserForSignIn({ password: pass });

    const res = await this.getService(AuthService).signIn({
      email: user.email,
      password: pass,
    });

    expect(res).toBeDefined();
    expect(res.accessToken).not.toBe(null);
    expect(res.refreshToken).not.toBe(null);
    expect(res.accessTokenExpiredAt).not.toBe(null);
    expect(res.refreshTokenExpiredAt).not.toBe(null);
  }

  @test()
  async refreshTokenSuccess() {
    const { tokens, user } = await this.prepareForRefreshAndSignOut();

    const time = dayjs().add(1, 'hours').toDate();
    timekeeper.freeze(time);

    const res = await this.getService(AuthService).refreshTokens({
      refreshToken: tokens.refreshToken,
      currentUser: user,
    });

    expect(res).toBeDefined();
    expect(res.id).toBe(tokens.id);
    expect(res.accessToken).not.toEqual(tokens.accessToken);
    expect(res.refreshToken).not.toEqual(tokens.refreshToken);
    expect(
      dayjs(res.refreshTokenExpiredAt).isAfter(tokens.refreshTokenExpiredAt),
    ).toBe(true);
    expect(
      dayjs(res.accessTokenExpiredAt).isAfter(tokens.accessTokenExpiredAt),
    ).toBe(true);

    timekeeper.reset();
  }

  @test()
  async signOutSuccess() {
    const { tokens, user } = await this.prepareForRefreshAndSignOut();

    await this.getService(AuthService).signOut({
      accessToken: tokens.accessToken,
      userId: user.id,
    });

    try {
      await this.getService(AuthService).refreshTokens({
        refreshToken: tokens.refreshToken,
        currentUser: user,
      });
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
    expect.assertions(1);
  }
}
describe('AuthServiceTest', () => {});
