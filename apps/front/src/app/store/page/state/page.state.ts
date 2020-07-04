import { PageEnum } from '../../../enum';

export const PAGE_FEATURE_NAME = 'Page';

export type PageState = {
  pageEnum: PageEnum;
};

export const pageInitialState: PageState = {
  pageEnum: PageEnum.TOP
};
