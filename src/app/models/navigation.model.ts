export type NavigationItem = UserNavigationItem & {
  current: boolean;
  activeIfRoutes : string[]
};

export type UserNavigationItem = {
  name: string;
  route: string;
};
