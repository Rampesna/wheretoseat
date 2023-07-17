import { RequestMethod } from '@nestjs/common';

export const excludedRoutes = [
  {
    path: 'user/auth/register',
    method: RequestMethod.POST,
  },
  {
    path: 'user/auth/login',
    method: RequestMethod.POST,
  },
  {
    path: 'customer/auth/register',
    method: RequestMethod.POST,
  },
  {
    path: 'customer/auth/login',
    method: RequestMethod.POST,
  },
];
