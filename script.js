document.addEventListener('DOMContentLoaded', () => {
    const variablesSelect = document.getElementById('variables');
    const truthTable = document.getElementById('truth-table');
    const kmapContainer = document.getElementById('kmap-container');
    const solveButton = document.getElementById('solve');
    const solutionParagraph = document.getElementById('solution');
  
    variablesSelect.addEventListener('change', generateTruthTable);
    solveButton.addEventListener('click', solveKMap);
  
    function generateTruthTable() {
      const numVariables = parseInt(variablesSelect.value);
      truthTable.innerHTML = ''; 
      const numRows = Math.pow(2, numVariables);
  
      const table = document.createElement('table');
      const headerRow = document.createElement('tr');
  
      for (let i = 0; i < numVariables; i++) {
        const th = document.createElement('th');
        th.textContent = `X${i}`;
        headerRow.appendChild(th);
      }
      const outputHeader = document.createElement('th');
      outputHeader.textContent = 'Output';
      headerRow.appendChild(outputHeader);
      table.appendChild(headerRow);
  
      for (let i = 0; i < numRows; i++) {
        const row = document.createElement('tr');
        for (let j = numVariables - 1; j >= 0; j--) {
          const cell = document.createElement('td');
          cell.textContent = (i & (1 << j)) ? '1' : '0';
          row.appendChild(cell);
        }
        const outputCell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '1';
        input.value = '0';
        outputCell.appendChild(input);
        row.appendChild(outputCell);
  
        table.appendChild(row);
      }
      truthTable.appendChild(table);
    }
  
    function solveKMap() {
      const numVariables = parseInt(variablesSelect.value);
      const outputs = Array.from(truthTable.getElementsByTagName('input')).map(input => parseInt(input.value));
  
      // Example K-map solution logic for demonstration purposes
      const minterms = outputs.map((value, index) => value === 1 ? index : -1).filter(index => index !== -1);
  
      const solution = `Simplified Boolean expression for minterms: ${minterms.join(', ')}`;
      solutionParagraph.textContent = solution;
  
      generateKMap(numVariables, outputs);
    }
  
    function generateKMap(numVariables, outputs) {
      kmapContainer.innerHTML = '';
      const numCells = Math.pow(2, numVariables);
      
      for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.textContent = outputs[i];
        kmapContainer.appendChild(cell);
      }
    }
  
    generateTruthTable();
  });