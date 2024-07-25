import { ApolloClient, InMemoryCache, ApolloLink, HttpLink, split } from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { BatchHttpLink } from "apollo-link-batch-http";
import { getMainDefinition } from "apollo-utilities";

const httpUri = `http://192.168.7.1:8080/v1/graphql`;
const wsUri = `wss://192.168.7.1:8080/v1/graphql`;

const httpLink = new BatchHttpLink({
  uri: httpUri,
  headers: { 'x-hasura-admin-secret': 'mDOcYaXY7whVI9asf/+BOvIm0G7vsmFH5NB9tH57J/4=' },
});

const wsLink = new WebSocketLink({
  uri: wsUri,
  options: {
    reconnect: true,
    lazy: true, 
    connectionParams: {
      headers: { 'x-hasura-admin-secret': 'mDOcYaXY7whVI9asf/+BOvIm0G7vsmFH5NB9tH57J/4=' },
    },
  },
});

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([terminatingLink]);
// link.subscriptionClient.maxConnectTimeGenerator.duration = () => link.subscriptionClient.maxConnectTimeGenerator.max
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            // Specify how to merge incoming data with existing cached data
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      fetchPolicy: 'cache-first',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;