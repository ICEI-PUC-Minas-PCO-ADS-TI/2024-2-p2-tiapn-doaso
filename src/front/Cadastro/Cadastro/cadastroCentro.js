import React, { useState } from 'react';
import api from './api';

const CadastroCentro = () => {
    const [centro, setCentro] = useState({
        nome: '',
        descricao: '',
        ruaEnd: '',
        bairroEnd: '',
        numeroEnd: '',
        cidadeEnd: '',
        estadoEnd: '',
        cepEnd: '',
        numeroTel: '',
    });

    const handleChange = (e) => {
        setCentro({ ...centro, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/centro', centro);
            alert('Centro cadastrado com sucesso!');
            setCentro({
                nome: '',
                descricao: '',
                ruaEnd: '',
                bairroEnd: '',
                numeroEnd: '',
                cidadeEnd: '',
                estadoEnd: '',
                cepEnd: '',
                numeroTel: '',
            }); // Limpa os campos
        } catch (error) {
            console.error('Erro ao cadastrar o centro:', error);
            alert('Erro ao cadastrar o centro. Tente novamente.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Cadastro de Centro</h1>
            <input
                type="text"
                name="nome"
                placeholder="Nome do Centro"
                value={centro.nome}
                onChange={handleChange}
            />
            <textarea
                name="descricao"
                placeholder="Descrição"
                value={centro.descricao}
                onChange={handleChange}
            />
            <input
                type="text"
                name="ruaEnd"
                placeholder="Rua"
                value={centro.ruaEnd}
                onChange={handleChange}
            />
            <input
                type="text"
                name="bairroEnd"
                placeholder="Bairro"
                value={centro.bairroEnd}
                onChange={handleChange}
            />
            <input
                type="number"
                name="numeroEnd"
                placeholder="Número"
                value={centro.numeroEnd}
                onChange={handleChange}
            />
            <input
                type="text"
                name="cidadeEnd"
                placeholder="Cidade"
                value={centro.cidadeEnd}
                onChange={handleChange}
            />
            <input
                type="text"
                name="estadoEnd"
                placeholder="Estado"
                value={centro.estadoEnd}
                onChange={handleChange}
            />
            <input
                type="text"
                name="cepEnd"
                placeholder="CEP"
                value={centro.cepEnd}
                onChange={handleChange}
            />
            <input
                type="text"
                name="numeroTel"
                placeholder="Telefone"
                value={centro.numeroTel}
                onChange={handleChange}
            />
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default cadastroCentro;
