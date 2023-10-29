import { gql } from "../../deps.ts";

export const build = gql`
  query Build($src: String!) {
    build(src: $src)
  }
`;

export const deploy = gql`
  query Deploy($src: String!, $token: String!) {
    deploy(src: $src, token: $token)
  }
`;
