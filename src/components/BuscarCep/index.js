import '../BuscarCep/style.css';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../../utils/requests";

function BuscarCep(){

const [res,setRes] = useState("");
const [endereco,setEndereco] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: ""
});

function buscaInput(e) {
    if(e.keyCode === 13){
        const cep = e.target.value;
        handleSubmit(cep);
    }
}

async function handleSubmit(cep){
    setRes("");
    await axios.get(`https://viacep.com.br/ws/${cep}/json`)
    .then(response => {
        const data = response.data;
        setEndereco(data);
    });
}

async function salvar() {
    await axios.post(`${BASE_URL}/cep/salvar`,{
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf
    })
    .then(response => {
        const data = response.data;
        setRes(data);
        document.location.reload(true);
    });
}


useEffect(() => {
    console.log("recarregado")
},[res]);

    return(
        <div>
            <div className="container-cep">
                <div className="content">
                    <h2>Buscar Cep</h2>
                </div>

                <div className="form">
                    <div className="form-group">
                        <label className='label' htmlFor="cep">Informe seu CEP</label>
                        <input type="cep" className="form-control" id="cep"
                            onKeyDown={(e) => buscaInput(e)}
                        />
                        <p>Prescione enter para pesquisar!</p>
                        <h5>{res}</h5>
                    </div>

                    <div className='endereco'>
                        <div className='component'>
                            <h6>Logradouro</h6>
                            <p>{endereco.logradouro}</p>
                        </div>
                        <div className='component'>
                            <h6>Bairro/Distrito</h6>
                            <p>{endereco.bairro}</p>
                        </div>
                        <div className='component'>
                            <h6>Localidade/UF</h6>
                            <p>{endereco.localidade}/{endereco.uf}</p>
                        </div>
                        <div className='component'>
                            <h6>CEP</h6>
                            <p>{endereco.cep}</p>
                            {
                                (endereco.cep != "")?
                                        <div onClick={()=> salvar()} className='salvar'>Salvar</div>
                                    :
                                        <div></div>
                            }
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default BuscarCep;