
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://opac.psu.ac.th/PatronService.asmx?op=GetPatron', true );
    let test = 'RG6Z66ZRax' //encrypted 
    var sr = 
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<soap:Envelope ' +
                'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' + 
                'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> ' +
                '<soap:Body> ' +
                    '<GetPatron xmlns="http://opac.psu.ac.th/">' +
                        '<username>'+test+'</username> ' +
                        '<password>28KTKScS_ZF</password> ' +
                    '</GetPatron> ' +
                '</soap:Body> ' +
            '</soap:Envelope>' ;
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
           var resultxml = xmlhttp.responseText;
           var i = 0
          while(i < resultxml.length){
            if(resultxml.substring(i,i+17) == "<GetPatronResult>"){
                var resultFromXml = resultxml.substr(i+17,1)
                console.log(resultFromXml)
            }
            i++
          }
        }
    };
    



