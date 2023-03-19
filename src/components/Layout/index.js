import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: grid;
  max-width: 75rem;
  height: calc(100vh - 2rem);
  overflow: hidden;
  margin: 0 auto;
  padding: 1rem;
  grid-template-columns: 12.5rem auto;
  column-gap: 2rem;
`;

const Loader = styled.div`
  max-width: 75rem;
  width: calc(100vw - 2rem);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Layout = ({ loading, children }) => {
  return (
    <LayoutWrapper>
      {loading ? (
        <Loader>Loading the dataset for the first time...</Loader>
      ) : (
        children
      )}
    </LayoutWrapper>
  );
};

export default Layout;
