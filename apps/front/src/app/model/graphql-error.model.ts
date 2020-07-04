export type GraphqlErrorModel = {
  graphQLErrors: [
    {
      message: string;
      locations: [
        {
          line: number;
          column: number;
        }
      ];
      path: string[];
      extensions: {
        code: string;
      };
    }
  ];
  networkError: any;
  message: string;
};
