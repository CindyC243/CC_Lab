document.addEventListener("DOMContentLoaded", function() {
    var i = 0;
    var texts = [
        "In a world cloaked in mystery, an irresistible allure swept through the streets. It was the smoke's secret, luring humanity into its grasp with promises of pleasure. But hidden behind the haze lay a darker truth.",
        'With each puff, lungs turned darker, struggling to breathe under the weight of addiction. As the smoke spread, newborns suffered, their tiny lungs bearing the burden of their parents\' choices.',
        'Whispers of concern drifted through society, but many turned a blind eye. Yet we must heed the warning: unless we break free, our future is in jeopardy.'
    ];
    var speed = 50;
    var para = document.getElementById("demo"); 

    var typingSound = new Audio('assets/typing.mp3'); 
    var warningSound = new Audio('assets/warning.mp3'); 

    function typeWriter() {
        if (i < texts.length) {
            if (i > 0) {
                para.innerHTML += '<br><br>'; 
            }
            typeText(texts[i], 0);
        } else if (i === texts.length) {
            setTimeout(function() {
                para.innerHTML += '<br><br><div style="text-align: center; color: red; font-size: 24px;"><span style="font-size: 48px;">⚠️</span><br><strong>WE NEED TO STOP</strong></div>';
                warningSound.play(); 
            }, 3000);
        }
        i++;
    }

    function typeText(text, j) {
        if (j < text.length) {
            para.innerHTML += text.charAt(j); 
            typingSound.play(); 
            setTimeout(function() {
                typeText(text, j + 1);
            }, speed);
        } else if (i === texts.length) {
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

    typeWriter();
});
