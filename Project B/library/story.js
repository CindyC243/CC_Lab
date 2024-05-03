document.addEventListener("DOMContentLoaded", function() {
    // This code runs after the DOM is fully loaded
    var i = 0;
    var texts = [
        'In a world cloaked in mystery, an irresistible allure swept through the streets. It was the smoke\'s secret, luring humanity into its grasp with promises of pleasure. But hidden behind the haze lay a darker truth.',
        'With each puff, lungs turned darker, struggling to breathe under the weight of addiction. As the smoke spread, newborns suffered, their tiny lungs bearing the burden of their parents\' choices.',
        'Whispers of concern drifted through society, but many turned a blind eye. Yet we must heed the warning: unless we break free, our future is in jeopardy.'
    ];
    var speed = 50;
    var para = document.getElementById("demo"); // Get the paragraph element

    var typingSound = new Audio('assets/typing.mp3'); // Load the typing sound
    var warningSound = new Audio('assets/warning.mp3'); // Load the warning sound

    function typeWriter() {
        if (i < texts.length) {
            if (i > 0) {
                para.innerHTML += '<br><br>'; // Add line breaks between texts
            }
            typeText(texts[i], 0);
        } else if (i === texts.length) {
            setTimeout(function() {
                // Display "WE NEED TO STOP" with the warning sign after 5 seconds
                para.innerHTML += '<br><br><div style="text-align: center; color: red; font-size: 24px;"><span style="font-size: 48px;">⚠️</span><br><strong>WE NEED TO STOP</strong></div>';
                warningSound.play(); // Play the warning sound
            }, 3000);
        }
        i++;
    }

    function typeText(text, j) {
        if (j < text.length) {
            para.innerHTML += text.charAt(j); // Append each character to the paragraph
            typingSound.play(); // Play the typing sound
            setTimeout(function() {
                typeText(text, j + 1);
            }, speed);
        } else if (i === texts.length) {
            // If it's the last text, stop the typing sound after the "jeopardy." text is typed
            var lastText = texts[texts.length - 1];
            var jeopardyIndex = lastText.indexOf("jeopardy.");
            if (j >= jeopardyIndex) {
                typingSound.pause();
            }
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(typeWriter, speed);
        }
    }

    // Call typeWriter function to start typing
    typeWriter();
});
