function runMe() {

    var isInputValid = isJSON(document.getElementById("jsonInput").value);
    if (isInputValid) {
        var json = JSON.parse(document.getElementById("jsonInput").value);
        var fields = Object.keys(json[0])
        var replacer = function (key, value) {
            return value === null ? '' : value
        }
        var csv = json.map(function (row) {
            return fields.map(function (fieldName) {
                return JSON.stringify(row[fieldName], replacer)
            }).join(',')
        })
        csv.unshift(fields.join(',')) // add header column

        document.getElementById("csvResult").innerHTML = csv.join('\r\n');

        //console.log(csv.join('\r\n'))
    } else {
        alert("Input not a valid JSON");
    }
}

function isJSON(data) {
    var isJson = false
    try {
        // this works with JSON string and JSON object, not sure about others
        var json = JSON.parse(data);
        isJson = typeof json === 'object';
    } catch (ex) {
        console.error('data is not JSON');
    }
    return isJson;
}

function downloadCSV() {
    var elHtml = document.getElementById("csvResult").innerHTML;
    var link = document.createElement('a');
    var mimeType = 'text/plain';

    link.setAttribute('download', 'jsonToCSV.csv');
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}