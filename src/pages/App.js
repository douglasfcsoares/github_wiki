import { Container } from "./style";
import { useState } from "react";
import api from "../services/api";
import gitLogo from "../assets/octocat-white.svg";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";

const App = () => {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const { data } = await api.get(`repos/${currentRepo}`);

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id);

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo("");
        return;
      } else {
        alert("Repositório não encontrado");
      }
    }
  };

  return (
    <Container>
      <img src={gitLogo} width={75} height={75} alt="Github Logo" />
      <Input
        value={currentRepo}
        onChange={e => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => (
        <ItemRepo repo={repo} />
      ))}
    </Container>
  );
};

export default App;
