import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const styleSet = {
  mainColor: "#6401ff",
};

export const breakPoint = {
  desktop: "(min-width: 1600px)",
  laptop: "(max-width: 1024px)",
  tablet: "(max-width: 768px)",
  mobile: "(max-width: 480px)",
};
