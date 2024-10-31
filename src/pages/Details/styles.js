import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";

  > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 0;
  }
`;

export const Rate = styled.ul`
  list-style: none;

  > li {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Distribui o 0, a barra e o 10 */

    margin-top: 12px;
    font-size: 30px;
    color: ${({ theme }) => theme.COLORS.WHITE};

    > div {
      flex-grow: 1; /* Faz a barra de progresso crescer para ocupar o espaço */
      margin: 0 15px; /* Adiciona espaço entre o 0 e a barra, e entre a barra e o 10 */
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: center;

    > img {
      padding-top: 40px;
      width: 400px;
      height: 600px;
    }
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  margin-top: 16px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ value }) =>
      value * 10}%; // Multiplicando por 10 para obter a porcentagem

    /* Lógica para alterar a cor da barra */
    background-color: ${({ value }) =>
      value < 4 ? "red" : value >= 4 && value < 7 ? "yellow" : "green"};

    border-radius: 10px;
  }
`;
