import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    width: 100dvw;
    height: 100svh;
    overflow: hidden;

    background: rgb(22, 119, 255);
    background: linear-gradient(331deg, rgba(22, 119, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
`;
