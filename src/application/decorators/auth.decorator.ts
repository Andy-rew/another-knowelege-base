import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@applications/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { accessTokenTitle } from '@infrastructure/types/configuration';

export function Auth() {
  const decorators = [UseGuards(AuthGuard), ApiBearerAuth(accessTokenTitle)];
  return applyDecorators(...decorators);
}
