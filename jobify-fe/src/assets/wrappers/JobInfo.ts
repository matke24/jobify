import styled from "styled-components";
import { JustifyContent } from "./enum";

interface Props {
  justify?: JustifyContent;
}
const Wrapper = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: ${(p) => p.justify};
  .job-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--text-secondary-color);
    }
  }
  .job-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;
export default Wrapper;
