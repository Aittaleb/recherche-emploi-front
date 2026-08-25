export type NavigationItem = UserNavigationItem & {
  current: boolean;
};

export type UserNavigationItem = {
  name: string;
  route: string;
};
