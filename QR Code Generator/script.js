// script.js
function generateQRCode() {
    const inputText = document.getElementById("inputText").value;
    const qrcodeContainer = document.getElementById("qrcode");

    // Clear previous QR code
    qrcodeContainer.innerHTML = "";

    if (inputText.trim()) {
        new QRCode(qrcodeContainer, {
            text: inputText,
            width: 150,
            height: 150,
            colorDark: "#333333",
            colorLight: "#ffffff",
        });

        // Show the share button once QR code is generated
        document.getElementById("shareButton").style.display = "inline-block";
    } else {
        alert("Please enter text, a number, or a URL.");
    }
}

async function shareQRCode() {
    const qrcodeContainer = document.getElementById("qrcode").querySelector("img");

    if (qrcodeContainer) {
        const blob = await fetch(qrcodeContainer.src).then(res => res.blob());

        const filesArray = [
            new File([blob], "QRCode.png", {
                type: blob.type,
                lastModified: new Date().getTime()
            })
        ];

        if (navigator.share) {
            try {
                await navigator.share({
                    files: filesArray,
                    title: "My QR Code",
                    text: "Check out this QR code I generated!",
                });
                alert("QR Code shared successfully!");
            } catch (error) {
                alert("Error sharing QR Code: " + error);
            }
        } else {
            alert("Sharing is not supported on this browser.");
        }
    } else {
        alert("Please generate a QR code first.");
    }
}
