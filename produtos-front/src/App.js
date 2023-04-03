
import { useState, useEffect} from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  const [produtos, setProdutos] = useState([]);
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  //Obtendo dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  //Cadastrar Produto
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method:'POST',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type' : 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparForm();
      }
    })
  }

   //Remover Produto
   const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo, {
      method:'DELETE',
      headers:{
        'Content-type' : 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      // Mensagem
      alert(retorno_convertido.mensagem);

      // cópia do vetor de produtos
      let vetorTemp = [...produtos];

      //indice 
      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo;
      });

      //remover produto do vetor temp
      vetorTemp.splice(indice, 1);

      //atualizar o vetor de produtos
      setProdutos(vetorTemp);

      //limpar formulario
      limparForm();
    })
  }

  //alterar Produto
  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method:'PUT',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type' : 'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        alert('Produto alterado com sucesso!');

        // cópia do vetor de produtos
      let vetorTemp = [...produtos];

      //indice 
      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo;
      });

      //alterar produto do vetor temp
      vetorTemp[indice] = objProduto;

      //atualizar o vetor de produtos
      setProdutos(vetorTemp);

        limparForm();
      }
    })
  }


  //limpar formulario
  const limparForm = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado ={aoDigitar} cadastrar={cadastrar} 
        obj={objProduto} cancelar={limparForm} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/>
    </div>
  );
}

export default App;
