const PATH = 'service-worker.js';
        let message = 'ALERT'
        let isServiceWorkersSupport = ('serviceWorker' in navigator);
        if (isServiceWorkersSupport) {
         console.log('Will service worker register?');
         navigator.serviceWorker.register(PATH).then(function () {
         console.log("Yes it did.");
         }).catch(function (err) {
         console.log("No it didn't. This happened: ", err)
         });
        }
        
        alert(message);

        window.addEventListener("load", (event) => {
                const statusDisplay = document.getElementById("status");
                statusDisplay.textContent = navigator.onLine ? "Online" : "OFFline";
              });

        window.addEventListener("offline", (event) => {
                const statusDisplay = document.getElementById("status");
                statusDisplay.textContent = "Offline";
              });
              
              window.addEventListener("online", (event) => {
                const statusDisplay = document.getElementById("status");
                statusDisplay.textContent = "Online";
              });