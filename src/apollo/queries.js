import { gql } from "@apollo/client";

export const GET_EPOCHES = gql`
  query Epoches(
    $skip: Int!
    $first: Int!
    $orderBy: String!
    $orderDirection: String!
    $startBlock: Int!
  ) {
    epoches(
      skip: $skip
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { startBlock_gte: $startBlock }
    ) {
      id
      startBlock
      endBlock
      signalledTokens
      stakeDeposited
      totalQueryFees
      taxedQueryFees
      queryFeesCollected
      curatorQueryFees
      queryFeeRebates
      totalRewards
      totalIndexerRewards
      totalDelegatorRewards
    }
  }
`;
