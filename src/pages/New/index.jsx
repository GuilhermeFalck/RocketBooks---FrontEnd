import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { api } from "../../services/api";

import { Container, Form, CapaLivro } from "./styles";
import { LiaBookSolid } from "react-icons/lia";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(""); // Agora "rating" é usado no lugar de "rate"

  const [cover, setCover] = useState(null); // Para a pré-visualização da imagem
  const [coverFile, setCoverFile] = useState(null); // Para armazenar o arquivo da capa

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  // Função para capturar o arquivo de capa e exibir a pré-visualização
  function handleCoverChange(event) {
    const file = event.target.files[0];
    setCoverFile(file); // Armazena o arquivo da capa

    // Cria uma URL para a pré-visualização da imagem
    const imagePreview = URL.createObjectURL(file);
    setCover(imagePreview); // Atualiza a pré-visualização da capa
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título da nota!");
    }

    if (!cover) {
      return alert("Adicione uma imagem da capa!");
    }

    if (!rating) {
      return alert("Adicione uma nota para o livro!");
    }

    if (newTag) {
      return alert(
        "Você deixou uma tag no campo para adicionar mas não adicionou. Clique para adicionar ou deixe o campo vazio."
      );
    }
    // Verifica se o `rating` está em formato válido e converte para número
    const validatedRating =
      rating !== "" && rating !== undefined ? Number(rating) : 0;

    // Envia a nota para o backend com o valor `rating` já convertido para número
    console.log("Dados para enviar:", {
      title,
      description,
      rating: validatedRating, // Envia "rating"
      tags,
    }); // Verifique o que está sendo enviado

    const response = await api.post("/notes", {
      title,
      description,
      rating: validatedRating, // Envia "rating" ao invés de "rate"
      tags,
    });

    const { id: noteId } = response.data;

    // Upload da capa separadamente, se houver
    if (coverFile) {
      const formData = new FormData();
      formData.append("cover", coverFile);

      await api.post(`/notes/${noteId}/cover`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    alert("Nota criada com sucesso!");
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Exibe a pré-visualização da capa se houver */}
          <CapaLivro $imageUrl={cover}>
            {cover ? (
              <img src={cover} alt="Pré-visualização da capa" />
            ) : (
              <LiaBookSolid size={64} /> // Mostra o ícone quando não há imagem
            )}
            <label htmlFor="cover">
              <input
                id="cover"
                type="file"
                onChange={handleCoverChange} // Captura o arquivo de capa
              />
            </label>
          </CapaLivro>

          <Section title="Nota">
            <div className="nota">
              <Input
                placeholder="Nota"
                min="0"
                max="10"
                type="number"
                value={rating} // Vincular o valor de rating ao estado
                onChange={(e) => setRating(e.target.value)} // Atualiza o estado de rating
              />
            </div>
          </Section>

          <Section title="Gêneros">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem
                isNew
                placeholder="Novo Gênero"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
