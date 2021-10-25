function doGet() {
//  SpreadsheetApp.getUi();
//  DriveApp.getRootFolder;
//  UrlFetchApp.fetch("");

  const html = HtmlService.createTemplateFromFile("index");

  return html.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


function traerDatos(){
  const id = '1RchrsZtUMoo1_SUII-ytyy3xpfzfxxGUMceIJsc8UUQ';
  const data = SpreadsheetApp.openById(id).getSheetByName('datos').getDataRange().getValues();
  const headings = data[0];
  const dataBody = data.slice(1);

  const arrayObj = [];

  //recorremos cada elemento de questions
  dataBody.forEach((el)=>{
    let obj = {};

    headings.forEach((header, index)=>{
      obj[header.toLowerCase()] = el[index];
    })
    arrayObj.push(obj);
  })

  return arrayObj;
}

function addSheet(vals){
  const id = '1RchrsZtUMoo1_SUII-ytyy3xpfzfxxGUMceIJsc8UUQ';
  const sheet = SpreadsheetApp.openById(id).getSheetByName('datos');
  const headings = sheet.getDataRange().getValues()[0];
  
  vals.forEach((vals)=>{
    let holder = [];
    for(x in headings){
      let output = (headings[x] in vals) ? vals[headings[x]]:'';
      holder.push(output);
    } 
    sheet.appendRow(holder);
  });

  return vals;
}

function deleteRow(rowid){
  const id = '1RchrsZtUMoo1_SUII-ytyy3xpfzfxxGUMceIJsc8UUQ';
  const sheet = SpreadsheetApp.openById(id).getSheetByName('datos');
  const data = SpreadsheetApp.openById(id).getSheetByName('datos').getDataRange().getValues();
  const headings = data[0];
  const dataBody = data.slice(1);

  const arrayObj = [];

  //recorremos cada elemento de questions
  dataBody.forEach((el)=>{
    let obj = {};

    headings.forEach((header, index)=>{
      obj[header.toLowerCase()] = el[index];
    })
    arrayObj.push(obj);
  })

  arrayObj.forEach((a,i)=>{
    if(a.aid === rowid){
      sheet.deleteRow(i+2)
    }
  })

  return arrayObj;
}