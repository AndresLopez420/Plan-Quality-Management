const PDFDocument = require('pdfkit');
const fs = require('fs');


function buildPDF(dataCallback,content,endCallback){
    const doc = new PDFDocument();
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc.text('PLAN DE GESTION DE CALIDAD');
    doc.text(content);
    doc.end();

}

module.exports = { buildPDF};
