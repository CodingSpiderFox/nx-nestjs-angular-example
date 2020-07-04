export const DRAWER_FEATURE_NAME = 'Drawer';

export const Drawer = {
  side: 'side',
  over: 'over',
  push: 'push'
} as const;

export type DrawerType = keyof typeof Drawer;

export type DrawerState = {
  opened: boolean;
  mode: DrawerType;
};

export const drawerInitialState: DrawerState = {
  opened: true,
  mode: Drawer.side
};
