document.addEventListener('DOMContentLoaded', () => {
    const welcomePopup = document.getElementById('welcomePopup');
    const closePopupButton = document.getElementById('closePopup');

    // Verifica se o pop-up já foi exibido
    if (!localStorage.getItem('popupShown')) {
        // Mostra o pop-up
        welcomePopup.style.display = 'flex';

        // Fecha o pop-up quando o botão é clicado
        closePopupButton.addEventListener('click', () => {
            welcomePopup.style.display = 'none';
            // Marca que o pop-up já foi exibido
            localStorage.setItem('popupShown', 'true');
        });
    }
});