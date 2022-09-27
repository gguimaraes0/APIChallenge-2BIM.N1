exports.handler = async (event) => {
    var responseMessage = {};
    var statusCode;
    try {
        var body = JSON.parse(event.body)
        var max = parseInt(body.max);
        var min = parseInt(body.min);
        var isRecursivo = Boolean(body.isRecursivo);

        var result;

        if (isRecursivo === false) {
            result = await getIterativo(min, max);
            statusCode = '200';
            responseMessage.message = result;
        }
        else if (isRecursivo === true) {
            result = await getRecursivo(min, max, 1);
            statusCode = '200';
            responseMessage.message = result;
        }
        else {
            statusCode = '200';
            responseMessage.message = 'Ocorreu um problema na função, verifique se os valores são válidos';
        }
    }
    catch (ex) {
        statusCode = '500';
        responseMessage.message = 'Ocorreu um problema na função, verifique se os valores são válidos ' + ex;
    }
    finally {
        const response = {
            statusCode: statusCode,
            body: JSON.stringify(responseMessage)
        };
        return response;
    }
}

async function getIterativo(min, max) {
    var x = (1 / min) + min;
    var parcela = []
    var index = 0
    do {
        parcela[index] = x * (min + index);
        index++;
    } while ((min + index) <= max)

    var result = 1;
    parcela.forEach(element => {
        result = result * element;
    });
    return result;
}


async function getRecursivo(min, max, result) {
    result = result * (min + (1 / min));
    if (min != max)
        result = getRecursivo(min + 1, max, result)

    return result
}



