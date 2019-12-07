let textFile = null

function makeTextFile () {
    let data = new Blob(['let trainingData = ' + JSON.stringify(trainingData)], {type: 'application/json'})

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile)
    }

    textFile = window.URL.createObjectURL(data)

    return textFile
}

function downloadTrainingData() {
    let link = document.createElement('a');
    
    link.setAttribute('download', 'trainingdata.js');
    link.href = makeTextFile();
    
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        let event = new MouseEvent('click');
        
        link.dispatchEvent(event);

        document.body.removeChild(link);
    });
}