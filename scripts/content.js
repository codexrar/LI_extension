// content.js

// Function to simulate a click event
function simulateClick(element) {
    const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    element.dispatchEvent(evt);
}

// Function to click on the 'Enviar' button
function clickEnviarButton(callback) {
    // Find all span elements containing 'Enviar'
    const enviarSpans = document.querySelectorAll('span.artdeco-button__text');

    // Filter out spans that exactly match 'Enviar'
    const enviarButtons = Array.from(enviarSpans).filter(span => span.textContent.trim() === 'Enviar');

    // Click on the first 'Enviar' button found
    if (enviarButtons.length > 0) {
        const enviarButton = enviarButtons[0].closest('button');
        if (enviarButton) {
            simulateClick(enviarButton);
            setTimeout(callback, 1000); // Wait a bit before moving to the next 'Conectar' button
        }
    } else {
        setTimeout(() => clickEnviarButton(callback), 500); // Retry after a short delay if 'Enviar' is not found yet
    }
}

// Function to process each 'Conectar' button
function processConnectButton(connectButtons, index) {
    if (index < connectButtons.length) {
        const connectButton = connectButtons[index].closest('button');
        if (connectButton) {
            simulateClick(connectButton);
            // After clicking 'Conectar', wait for 'Enviar' button and click it, then proceed to the next 'Conectar' button
            clickEnviarButton(() => processConnectButton(connectButtons, index + 1));
        }
    }
}

// Function to start the process
function startConnectingProcess() {
    // Find all span elements containing 'Conectar'
    const connectSpans = document.querySelectorAll('span.artdeco-button__text');

    // Filter out spans that exactly match 'Conectar'
    const connectButtons = Array.from(connectSpans).filter(span => span.textContent.trim() === 'Conectar');

    // Start processing each 'Conectar' button
    processConnectButton(connectButtons, 0);
}

// Run the function when the content script is injected
startConnectingProcess();