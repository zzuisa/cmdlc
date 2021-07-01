import styled from 'styled-components';
import { Document, Page } from 'react-pdf';

export const Viewer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DocumentWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
