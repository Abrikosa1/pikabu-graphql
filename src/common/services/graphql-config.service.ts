import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLFormattedError } from 'graphql';

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions() {
    return {
      sortSchema: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: this._createContext.bind(this),
      formatError: this._formatError.bind(this),
      cors: false,
    };
  }

  private _createContext({ req, connection }: any) {
    return {
      req: connection ? connection.context : req,
    };
  }

  private _formatError(error: any) {
    if (error.message === 'VALIDATION_ERROR') {
      const extensions = {
        code: error.extensions.code,
        errors: [] as any,
      };

      Object.keys(error?.extensions?.invalidArgs).forEach((key) => {
        const constraints: any = [];
        Object.keys(error?.extensions?.invalidArgs?.[key].constraints).forEach(
          (_key) => {
            constraints.push(
              error?.extensions?.invalidArgs?.[key].constraints[_key],
            );
          },
        );

        extensions.errors.push({
          field: error?.extensions?.invalidArgs?.[key].property,
          errors: constraints,
        });
      });

      const graphQLFormattedError: GraphQLFormattedError = {
        message: 'VALIDATION_ERROR',
        extensions: extensions,
      };

      return graphQLFormattedError;
    } else {
      return error;
    }
  }
}
