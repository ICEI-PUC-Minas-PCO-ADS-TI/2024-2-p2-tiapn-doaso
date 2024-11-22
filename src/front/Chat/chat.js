function proposta() {
    var propostaDiv = document.getElementById("proposta");
    if (propostaDiv) {
        propostaDiv.classList.add('hidden');
        setTimeout(() => {
            propostaDiv.style.display = "none"; 
        }, 500); 
    }
    
    var msgDiv = document.getElementById("msg");
    if (msgDiv) {
        msgDiv.classList.add('hidden'); 
        setTimeout(() => {
            msgDiv.style.display = "none"; 
        }, 500);
    }
}

function recusa() {
    window.location.href = "../Home/Home.html";
}