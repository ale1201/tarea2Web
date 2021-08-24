const fs = require("fs");
// JSON data
const data = require("./clientes.json");
// Build paths
const { buildPathHtml } = require("./buildPaths");


const createRow = (item) => `
  <tr>
    <td>${item.idCliente}</td>
    <td>${item.NombreCompania}</td>
    <td>${item.NombreContacto}</td>
  </tr>
`;


const createTable = (rows) => `
  <div class="container">
        <center>
            <h2>Clientes</h2>
        </center>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre de la compañía</th>
                    <th>Nombre de contacto</th>
                </tr>
            </thead>
            <tbody>
             ${rows}   
            </tbody>
        </table>
    </div>
`;

/**
 * @description Generate an `html` page with a populated table
 * @param {String} table
 * @returns {String}
 */
const createHtml = (table) => `
  <!DOCTYPE html>
<html>

<head>
    <title>Clientes</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>
    <body>
      ${table}
    </body>
  </html>
`;

const doesFileExist = (filePath) => {
  try {
    fs.statSync(filePath); // get information of the specified file path.
    return true;
  } catch (error) {
    return false;
  }
};

try {
  /* Check if the file for `html` build exists in system or not */
  if (doesFileExist(buildPathHtml)) {
    console.log("Deleting old build file");
    /* If the file exists delete the file from system */
    fs.unlinkSync(buildPathHtml);
  }
  /* generate rows */
  const rows = data.map(createRow).join("");
  /* generate table */
  const table = createTable(rows);
  /* generate html */
  const html = createHtml(table);
  /* write the generated html to file */
  fs.writeFileSync(buildPathHtml, html);
  console.log("Succesfully created an HTML table");
} catch (error) {
  console.log("Error generating table", error);
}

