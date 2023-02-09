import { gql, useQuery } from "@apollo/client";
import { IQuery } from "../../../commons/types/generated/types";

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
    }
  }
`;

const useCheckLoggedInUser = () => {
  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  return data?.fetchUserLoggedIn._id;
};

export default useCheckLoggedInUser;
