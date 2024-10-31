import { useState, useEffect } from "react";
import { Container, Rate, Content, ProgressBar } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { Tag } from "../../components/Tag";

import capaPlaceholder from "../../assets/placeholder.jpeg"; // Use uma imagem padrão caso não tenha uma capa

export function Details() {
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      navigate(-1);
    }
  }

  // Gerando a URL para a imagem da capa
  const capaUrl = data?.image
    ? `${api.defaults.baseURL}/files/${data.image}`
    : capaPlaceholder; // Se não houver imagem, usa o placeholder

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, [params.id]);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir Nota" onClick={handleRemove} />
            <h1>{data.title}</h1>
            <p>{data.description}</p>

            <div>
              {/* Usando a URL gerada para exibir a capa do livro */}
              <img src={capaUrl} alt="Capa do Livro" />
            </div>

            <Section title="Nota">
              <Rate>
                <li>
                  0 <ProgressBar value={data.rating} /> 10
                </li>
              </Rate>
            </Section>

            {data.tags && (
              <Section title="Gênero">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}
