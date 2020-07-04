import { IEnum } from './enum';

/**
 * Page enum
 * @author tree
 */
export class PageEnum implements IEnum<PageEnum> {
  private static _values = new Array<PageEnum>();

  public static SITE_NAME = 'Nx Front';

  public static readonly TOP = new PageEnum(
    1,
    'Top',
    'Top page',
    `Top page | ${PageEnum.SITE_NAME}`,
    'Nx + Angular example',
    '/',
    true,
    false
  );
  public static readonly LOGIN = new PageEnum(
    2,
    'Login',
    'Login page',
    `Login page | ${PageEnum.SITE_NAME}`,
    'Nx + Angular example',
    '/login',
    true,
    false
  );
  public static readonly TODO_LIST_FOR_RESTFUL_API = new PageEnum(
    10,
    'Todo List',
    'for RESTful API',
    `Todo list for RESTful API | ${PageEnum.SITE_NAME}`,
    'Todo list for RESTful API',
    '/restful/todo',
    true,
    true
  );
  public static readonly REGISTER_TODO_FOR_RESTFUL_API = new PageEnum(
    11,
    'Todo Registration',
    'for RESTful API',
    `Todo registration for RESTful API | ${PageEnum.SITE_NAME}`,
    'Todo registration for RESTful API',
    '/restful/todo/register',
    true,
    true
  );
  public static readonly EDIT_TODO_FOR_RESTFUL_API = new PageEnum(
    12,
    'Todo edit',
    'for RESTful API',
    `Todo edit for RESTful API | ${PageEnum.SITE_NAME}`,
    'Todo edit for RESTful API',
    '/restful/todo/edit/{0}',
    false,
    true
  );
  public static readonly TODO_LIST_FOR_GRAPHQL = new PageEnum(
    20,
    'Todo List',
    'for GraphQL',
    `Todo List for GraphQL | ${PageEnum.SITE_NAME}`,
    'Todo List for GraphQL',
    '/graphql/todo',
    true,
    true
  );
  public static readonly REGISTER_TODO_FOR_GRAPHQL = new PageEnum(
    21,
    'Todo Registration',
    'for GraphQL',
    `Todo Registration for GraphQL | ${PageEnum.SITE_NAME}`,
    'Todo Registration for GraphQL',
    '/graphql/todo/register',
    true,
    true
  );
  public static readonly EDIT_TODO_FOR_GRAPHQL = new PageEnum(
    22,
    'Todo edit',
    'for GraphQL',
    `Todo edit for GraphQL | ${PageEnum.SITE_NAME}`,
    'Todo edit for GraphQL',
    '/graphql/todo/edit/{0}',
    false,
    true
  );
  public static readonly REDUX = new PageEnum(
    30,
    'Redux',
    'Redux',
    `Redux | ${PageEnum.SITE_NAME}`,
    'Redux.',
    '/redux',
    true,
    false
  );

  /**
   * constructor
   * @param number page id
   * @param pageTitle page title
   * @param pageDescription page description
   * @param title seo title
   * @param metaDescription seo meta description
   * @param relativeUrl relative url
   * @param showMenu show menu
   * @param requireLogin require login
   */
  private constructor(
    public readonly id: number,
    public readonly pageTitle: string,
    public readonly pageDescription: string,
    public readonly title: string,
    public readonly metaDescription: string,
    public readonly relativeUrl: string,
    public readonly showMenu: boolean,
    public readonly requireLogin: boolean
  ) {
    PageEnum._values.push(this);
  }

  /**
   * Instance array
   */
  static get values(): PageEnum[] {
    return this._values;
  }

  /**
   * @inheritdoc
   */
  equals = (target: PageEnum): boolean => this.id === target.id;

  /**
   * @inheritdoc
   */
  toString = (): string =>
    `${this.id}, ${this.pageTitle}, ${this.pageDescription}`;

  /**
   * Create dynamic uri
   * @param pathParameters path parameters
   */
  getUri = (...pathParameters: any[]): string => {
    let result = this.relativeUrl;
    pathParameters.forEach((parameter: string, index: number) => {
      result = result.replace(`{${index}}`, parameter);
    });
    return result;
  };
}
