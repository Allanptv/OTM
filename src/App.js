import './App.css';
import { Input, Select} from 'antd'
import { useState, button } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
// import { solver } from 'javascript-lp-solver'
import * as solver from 'javascript-lp-solver'

/*https://github.com/JWally/jsLPSolver#readme */

// const solver = require("../../node_modules/javascript-lp-solver/src/solver");
function App() {

  const { Option } = Select;
  const [carbo, setCarbo] = useState(0);
  const [gordura, setGordura] = useState(0);
  const [prot, setProt] = useState(0);
  const [agua, setAgua] = useState(0);
  const [sais, setSM] = useState(0);
  const [vitA, setvitA] = useState(0);
  const [vitC, setvitC] = useState(0);
  const [vitE, setvitE] = useState(0);

  var teste = {}

  const alimentos = [
    {Alimento: 'Água', Nutrientes: [0,0,0,200,0,0,0,0], Preco: 2},
    {Alimento: 'Pão Francês', Nutrientes: [52, 6, 11, 0, 0.3, 0,0,0], Preco: 1.90},
    {Alimento: 'Macarrão', Nutrientes: [33, 1, 11, 0, 0.3, 0,0,0], Preco: 7},
    {Alimento: 'Batata', Nutrientes: [7, 0, 0, 0, 0, 0.,0.01,0], Preco: 5},
    {Alimento: 'Arroz Branco', Nutrientes: [28, 0.2, 2.5, 0, 0, 0,0,0], Preco: 23.5},
    {Alimento: 'Azeitona', Nutrientes: [3, 18, 1, 0, 1.5, 0,0, 0.03], Preco: 6},
    {Alimento: 'Ovos', Nutrientes : [1.1, 6, 8, 0, 0, 0.1,0,0.01], Preco: 8.89},
    {Alimento: 'Chocolate', Nutrientes : [14, 8, 2, 0, 0, 0,0,0], Preco: 5},
    {Alimento: 'Pizza', Nutrientes : [29, 6, 14, 0, 0.7, 0.05,0.02,0.007], Preco: 30},
    {Alimento: 'Feijão', Nutrientes : [15, 1, 6, 0, 4, 0,0,0.007], Preco: 7.45},
    {Alimento: 'Bife', Nutrientes : [0, 3, 30, 0, 0, 0,0,0.004], Preco: 27.50},
    {Alimento: 'Amendoim', Nutrientes : [13, 24, 25, 0, 8, 0,0,0.008], Preco: 2},
    {Alimento: 'Brócolis', Nutrientes : [7, 0.1, 2, 0, 3, 0.007,0.06,0.002], Preco: 5.19},
    {Alimento: 'Peixe', Nutrientes : [0, 0.3, 24, 0, 0, 0.001,0,0.006], Preco: 30},
    {Alimento: 'Maçã', Nutrientes : [13, 0.5, 0.2, 0, 2, 0.002,0.004,0.002], Preco: 3},
    {Alimento: 'Laranja', Nutrientes : [12, 0.1, 0.7, 0.7, 0, 0,0.05 ,0], Preco: 5},
    {Alimento: 'Leite', Nutrientes : [5 , 1, 3.4, 0.8, 0.044, 0,0,0], Preco: 3.29},
    {Alimento: 'Morango', Nutrientes : [8, 0.3, 0.7, 0, 0.001, 0,0.0385,0], Preco: 5.43},
    {Alimento: 'Avela', Nutrientes : [17, 61, 15, 0, 0, 0,0.0063,0], Preco: 10},
    {Alimento: 'Cereais', Nutrientes : [87, 1.1, 6, 0, 0.8, 100,38.5,0], Preco: 9.99}  
  ]
  const variables = {
    "Água": {
      "price": 2,
      "carbo": 0,
      "gordura": 0,
      "prot": 0,
      "agua": 200,
      "SM": 0,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0,
    },
    "Pão Francês": {
      "price": 1.90,
      "carbo": 52,
      "gordura": 6,
      "prot": 11,
      "agua": 0,
      "SM": 0.3,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0,
    },
    "Macarrão": {
      "price": 7,
      "carbo": 33,
      "gordura": 1,
      "prot": 11,
      "agua": 0,
      "SM": 0.3,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0,
    },
    "Batata": {
      "price": 5,
      "carbo": 7,
      "gordura": 0,
      "prot": 0,
      "agua": 0,
      "SM": 0,
      "vitA": 0,
      "vitC": 0.01,
      "vitE": 0,
    },
    "Arroz Branco": {
      "price": 23.3,
      "carbo": 28,
      "gordura": 0.2,
      "prot": 2.5,
      "agua": 0,
      "SM": 0,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0,
    },
    "Azeitona": {
      "price": 6,
      "carbo": 3,
      "gordura": 18,
      "prot": 1,
      "agua": 0,
      "SM": 1.5,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0.03,
    },
    "Ovos": {
      "price": 8.89,
      "carbo": 1.1,
      "gordura": 6,
      "prot": 8,
      "agua": 0,
      "SM": 0,
      "vitA": 0.1,
      "vitC": 0,
      "vitE": 0.01,
    },
    "Chocolate": {
      "price": 5,
      "carbo": 14,
      "gordura": 8,
      "prot": 2,
      "agua": 0,
      "SM": 0,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0,
    },
    "Pizza": {
      "price": 30,
      "carbo": 29,
      "gordura": 6,
      "prot": 14,
      "agua": 0,
      "SM": 0.7,
      "vitA": 0.05,
      "vitC": 0.02,
      "vitE": 0.007,
    },
    "Feijão": {
      "price": 7.45,
      "carbo": 15,
      "gordura": 1,
      "prot": 6,
      "agua": 0,
      "SM": 4,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0.007,
    },
    "Bife": {
      "price": 27.50,
      "carbo": 0,
      "gordura": 3,
      "prot": 30,
      "agua": 0,
      "SM": 0,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0.004,
    },
    "Amendoim": {
      "price": 2,
      "carbo": 13,
      "gordura": 24,
      "prot": 25,
      "agua": 0,
      "SM": 8,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0.008,
    },
    "Brócolis": {
      "price": 5.19,
      "carbo": 7,
      "gordura": 0.1,
      "prot": 2,
      "agua": 0,
      "SM": 3,
      "vitA": 0.007,
      "vitC": 0.06,
      "vitE": 0.002,
    },
    "Peixe": {
      "price": 30,
      "carbo": 0,
      "gordura": 0.3,
      "prot": 24,
      "agua": 0,
      "SM": 0,
      "vitA": 0.001,
      "vitC": 0,
      "vitE": 0.006,
    },
    "Maçã": {
      "price": 3,
      "carbo": 13,
      "gordura": 0.5,
      "prot": 0.2,
      "agua": 0,
      "SM": 2,
      "vitA": 0.002,
      "vitC": 0.004,
      "vitE": 0.002,
    },
    "Laranja": {
      "price": 5,
      "carbo": 12,
      "gordura": 0.1,
      "prot": 0.7,
      "agua": 0.7,
      "SM": 0,
      "vitA": 0,
      "vitC": 0.05,
      "vitE": 0,
    },
    "Leite": {
      "price": 3.29,
      "carbo": 5,
      "gordura": 1,
      "prot": 3.4,
      "agua": 0.8,
      "SM": 0.044,
      "vitA": 0,
      "vitC": 0,
      "vitE": 0,
    },
    "Morango": {
      "price": 5.43,
      "carbo": 8,
      "gordura": 0.3,
      "prot": 0.7,
      "agua": 0,
      "SM": 0.001,
      "vitA": 0,
      "vitC": 0.0385,
      "vitE": 0,
    },
    "Avela": {
      "price": 10,
      "carbo": 17,
      "gordura": 61,
      "prot": 15,
      "agua": 0,
      "SM": 0,
      "vitA": 0,
      "vitC": 0.0063,
      "vitE": 0,
    },
    "Cereais": {
      "price": 9.99,
      "carbo": 87,
      "gordura": 1.1,
      "prot": 6,
      "agua": 0,
      "SM": 0.8,
      "vitA": 100,
      "vitC": 38.5,
      "vitE": 0,
    }
  }
  const [options] = useState(alimentos)
  const SimpleSimplex = require('simple-simplex');
  
  const [selectedItems, setSelectedItems] = useState([])

  var results,
  model = {
    "optimize": "price",
    "opType": "min",
    "constraints": {
        "carbo": {"min": carbo},
        "gordura": {"min": gordura},
        "prot": {"min": prot},
        "agua": {"min": agua},
        "SM": {"min": sais},
        "vitA": {"min": vitA},
        "vitC": {"min": vitC},
        "vitE": {"min": vitE},
    },
    "variables": teste,
};

  const pegaCarbo = (e) => {
    setCarbo(e.target.value);
  }

  const pegaGordura = (e) => {
    setGordura(e.target.value);
  }

  const pegaProt = (e) => {
    setProt(e.target.value);
  }

  const pegaAgua = (e) => {
    setAgua(e.target.value);
  }

  const pegaSM = (e) => {
    setSM(e.target.value);
  }

  const pegaVitA = (e) => {
    setvitA(e.target.value);
  }

  const pegaVitC = (e) => {
    setvitC(e.target.value);
  }

  const pegaVitE = (e) => {
    setvitE(e.target.value);
  }
  
  const onFinish = (values) => {
    console.log('Success:', values)
    selectedItems.forEach(element =>{
      teste[element.Alimento] = variables[element.Alimento]
    })
    
    results = solver.Solve(model);
    console.log(results);
  };
  
  const onSelect = (selectedList) => {
    setSelectedItems(selectedList)
  }

  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={onFinish} >
          <div className="divForm">
          <h3>Insira quais alimentos você irá ingerir</h3>
          {/* <Form.Item  rules={[{required: true}]}> */}
            <Multiselect options={options} displayValue="Alimento" showArrow onSelect={onSelect}/>
          {/* </Form.Item> */}
          <h3>Insira a quantidade de cada nutriente (G/ML)</h3>
          <div>
          <label>
          Carboidratos
            <Input onChange={pegaCarbo}></Input>
          </label>
          </div>
          <div>
          <label >
          Gorduras
          <Input
              onChange={pegaGordura}></Input>
          </label>
          </div>
          <div>
          <label>
          Proteínas
          <Input
              onChange={pegaProt}></Input>
          </label>
          </div>
          <div>
          <label>
            Água
          <Input
              onChange={pegaAgua}></Input>
          </label>
          </div>
          <div>    
          <label>
            Sais Minerais 
          <Input
              onChange={pegaSM}></Input>
          </label>
          </div>
           <div>   
          <label> 
            Vitamina A
          <Input
              onChange={pegaVitA}></Input>
          </label>
          </div>
          <div>
              
           <label>
           Vitamina C
          <Input
              onChange={pegaVitC}></Input>
          </label>
          </div>
          <div>
           <label>
           Vitamina E
          <Input
              onChange={pegaVitE}></Input>
          </label>
          </div>
          <div>
            <button type="submit">
              Submit
            </button>
            </div>
            </div>
        </form>
      </header>
    </div>
  );
}

export default App;
