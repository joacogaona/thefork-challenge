/**
 * DO NOT EDIT
 */

import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type City {
    id: ID!
    name: String!
    photo: String!
  }

  type RestaurantAddress {
    street: String!
    postalCode: String!
    locality: String!
    country: String!
  }

  type RestaurantAggregateRatings {
    ratingValue: Float!
    reviewCount: Int!
  }

  type RestaurantAveragePrice {
    amount: Int!
    currency: String!
  }

  type Restaurant {
    id: ID!
    slug: String!
    name: String!
    photo: String!
    address: RestaurantAddress!
    averagePrice: RestaurantAveragePrice!
    aggregateRatings: RestaurantAggregateRatings
    offer: String
  }

  type Query {
    getCities: [City!]!
    getRestaurants(cityID: ID!): [Restaurant!]!
  }
`;
