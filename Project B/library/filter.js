const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

async function setupCamera() {
    video.width = 640;
    video.height = 480;
    canvas.width = video.width;
    canvas.height = video.height;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    await new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });

    video.play();
}

async function renderEffects() {
    const model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { shouldLoadIrisModel: false }
    );

    function detect() {
        model.estimateFaces({input: video}).then(predictions => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            predictions.forEach(prediction => {
                const keypoints = prediction.scaledMesh;

                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                keypoints.forEach((point, index) => {
                    if (index === 130 || index === 359) {
                        ctx.beginPath();
                        ctx.arc(point[0], point[1], 20, 0, 2 * Math.PI);
                        ctx.fill();
                    }
                });
            });
            requestAnimationFrame(detect);
        });
    }

    detect();
}

window.onload = async () => {
    await setupCamera();
    renderEffects();
};
