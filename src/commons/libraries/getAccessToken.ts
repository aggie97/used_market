import { gql, GraphQLClient } from "graphql-request";

const RESTORE_ACCESS_TOKEN = gql`
  mutation restoreAccessToken {
    restoreAccessToken {
      accessToken
    }
  }
`;

const getAccessToken = async () => {
  try {
    const graphQLClient = new GraphQLClient(
      // "https://backend09.codebootcamp.co.kr/graphql01",
      "https://backend09.codebootcamp.co.kr/graphql01",
      {
        credentials: "include",
      }
    );
    const result = await graphQLClient.request(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export default getAccessToken;
