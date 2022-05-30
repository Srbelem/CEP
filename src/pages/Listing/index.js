import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/requests";
import { AiFillDelete } from "react-icons/ai";
import '../Listing/style.css';
import BuscarCep from "../../components/BuscarCep";
function Listing(){

const [countEnd, setCountEnd] = useState(0);
const [endereco,setEndereco] = useState({
    content:[],
    last: true,
    totalPages: 0,
    totalElements: 0,
    size: 12,
    number: 0,
    first: true,
    numberOfElements: 0,
    empty: true
});


function deletar(cep){
    setCountEnd(0);
    axios.delete(`${BASE_URL}/cep/endereco/${cep}`);
    console.log(countEnd);
}

useEffect(() => {
        axios.get(`${BASE_URL}/cep/lista`)
            .then(response => {
                const data = response.data;
                setEndereco(data);
                setCountEnd(data.content.length)
            });
},[countEnd]);


    return(
        <>
            <div className="container">
                    <BuscarCep/>
                
                    <h3>Lista de Busca por Endereço ou CEP</h3>
                    <div className="cabecalho">
                        <p>Logradouro/Nome</p>
                        <p>Bairro/Distrito</p>
                        <p>Localidade/UF</p>
                        <p>CEP</p>
                    </div>
                    {
                        endereco.content.map((end)=> {
                            return(
                                <div className="body">
                                    <div className="component1">
                                        <p>{end.logradouro}</p>
                                    </div>
                                    <div className="component2">
                                      <p>{end.bairro}</p>
                                    </div>
                                    <div className="component3">
                                      <p>{end.localidade}/{end.uf}</p>
                                    </div>
                                    <div className="component4">
                                      <p>{end.cep}</p>
                                    </div>
                                    <div className="deletar" onClick={()=> deletar(end.cep)}><AiFillDelete/></div>
                                </div>
                            )})
                    }
                </div>
        </>
    )
}

export default Listing;

