import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Para pegar o ID da URL
import api from './api';

const PerfilCentro = () => {
    const { id } = useParams(); // Captura o ID do centro na URL
    const [centro, setCentro] = useState(null);

    useEffect(() => {
        const fetchCentro = async () => {
            try {
                const response = await api.get(`/centro/${id}`);
                setCentro(response.data);
            } catch (error) {
                console.error('Erro ao carregar o centro:', error);
                alert('Erro ao carregar os detalhes do centro.');
            }
        };

        fetchCentro();
    }, [id]);

    if (!centro) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>{centro.nome}</h1>
            <p><strong>Descrição:</strong> {centro.descricao}</p>
            <p><strong>Endereço:</strong> {centro.ruaEnd}, {centro.numeroEnd}, {centro.bairroEnd}, {centro.cidadeEnd} - {centro.estadoEnd}</p>
            <p><strong>CEP:</strong> {centro.cepEnd}</p>
            <p><strong>Telefone:</strong> {centro.numeroTel}</p>
        </div>
    );
};

export default perfilCentro;
