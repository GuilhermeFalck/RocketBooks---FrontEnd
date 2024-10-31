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
    overflow-y: auto;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .nota {
    display: center;
    justify-content: center;
    align-items: center;

    padding: 0 235px;
  }
`;

export const Form = styled.form`
  max-width: 550px;
  margin: 38px auto;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 36px;

    button {
      font-size: 20px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }
  }
`;

export const CapaLivro = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  margin: 40px 0;
  width: 100%;
  height: 600px;
  padding: 20px;

  /* Borda tracejada para o contêiner */
  border: ${({ $imageUrl }) => ($imageUrl ? "none" : "1px dashed black")};
  border-radius: 10px;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; /* Faz a imagem se ajustar sem distorcer */
    display: block; /* Garante que a imagem seja exibida */
  }

  > label {
    width: 48px;
    height: 48px;

    display: ${({ $imageUrl }) => ($imageUrl ? "none" : "flex")};
    align-items: center;
    justify-content: center;

    position: absolute; /* Já estava, então vamos ajustar o conteúdo dentro */
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
      z-index: 1; /* Garante que o ícone fique acima do fundo */
    }
  }
`;
