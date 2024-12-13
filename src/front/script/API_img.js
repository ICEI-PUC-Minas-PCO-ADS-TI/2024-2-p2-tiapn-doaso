
export async function postImgAPI(inputId) {
    const inputElement = document.getElementById(inputId);
    
    if (!inputElement || !inputElement.files || inputElement.files.length === 0) {
        throw new Error("Nenhuma imagem selecionada");
    }

    const file = inputElement.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'DoaSoImgs');

    const response = await fetch('https://api.cloudinary.com/v1_1/dwqiqyf2m/image/upload', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error("Falha ao fazer upload da imagem");
    }

    const data = await response.json();
    return data.secure_url;
}

// TESTE FEITO COM O BOTÃO DE CADASTRAR PROPOSTA DO PERFIL CENTRO
// document.getElementById('btnCadastrarProposta').addEventListener('click', async (event) => {
//     event.preventDefault();

//     try {
//         const imageUrl = await postImgAPI('imagemProposta');
//         console.log('Imagem armazenada na URL:', imageUrl);

//     } catch (error) {
//         console.error('Erro:', error);
//     }
// });
