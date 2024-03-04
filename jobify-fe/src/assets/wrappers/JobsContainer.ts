import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 2rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--grey-400);
  }
  .header-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem 4rem;
    font-size: 1.2rem;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;
