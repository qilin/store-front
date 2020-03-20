import {
  useQuery as _useQuery,
  useMutation as _useMutation,
  useSubscription as _useSubscription,
  QueryHookOptions,
  MutationHookOptions,
  MutationTuple,
  SubscriptionHookOptions,
} from '@apollo/react-hooks';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import { ApolloError } from 'apollo-client';
import { login } from 'auth';

export function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode, options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> {
  const { error, ...rest } = _useQuery<TData, TVariables>(query, options);

  if (error && error.message === 'Session Expired') {
    login(false);
  }

  return { ...rest, error };
}

export function useMutation<TData = any, TVariables = OperationVariables>(
  mutation: DocumentNode, options?: MutationHookOptions<TData, TVariables>,
): MutationTuple<TData, TVariables> {
    const [mutate, { error, ...rest }] = _useMutation<TData, TVariables>(mutation, options);

    if (error && error.message === 'Session Expired') {
      login(false);
    }

    return [mutate, { ...rest, error }];
  }

export  function useSubscription<TData = any, TVariables = OperationVariables>(
  subscription: DocumentNode, options?: SubscriptionHookOptions<TData, TVariables>,
): {
    variables?: TVariables;
    loading: boolean;
    data?: TData;
    error?: ApolloError;
} {
  const { error, ...rest } = _useSubscription<TData, TVariables>(subscription, options);

  if (error && error.message === 'Session Expired') {
    login(false);
  }

  return { ...rest, error };
}
