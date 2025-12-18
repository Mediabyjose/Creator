// Basic drag-and-drop using HTML5 and SortableJS
const components = document.getElementById('components');
const layout = document.getElementById('layout');

// Allow dragging from palette to canvas by cloning
new Sortable(components, {
  group: { name: 'shared', pull: 'clone', put: false },
  sort: false,
  animation: 150
});

new Sortable(layout, {
  group: { name: 'shared', pull: false, put: true },
  animation: 150,
  onAdd: function (evt) {
    // When an item is dropped into layout, convert it to a persistent node
    const el = evt.item;
    const node = document.createElement('div');
    node.className = 'node';
    node.textContent = el.textContent;

    // Add a small remove button
    const btn = document.createElement('button');
    btn.textContent = 'Remove';
    btn.style.marginLeft = '8px';
    btn.addEventListener('click', () => node.remove());
    node.appendChild(btn);

    // Replace the temporary element with our node
    el.parentNode.replaceChild(node, el);
  }
});

// Make layout sortable (reorder)
new Sortable(layout, { animation: 150 });

// Export helpers: build a minimal graph from the canvas
function buildGraph() {
  const nodes = Array.from(document.querySelectorAll('#layout .node')).map((el, idx) => {
    return {
      id: `ui-${idx+1}`,
      type: 'ui',
      name: el.childNodes[0].textContent.trim ? el.childNodes[0].textContent.trim() : el.textContent.trim(),
      run: `echo "${el.childNodes[0].textContent.trim ? el.childNodes[0].textContent.trim() : el.textContent.trim()}"`
    };
  });

  return {
    graph: {
      metadata: { name: 'exported-from-creator' },
      nodes,
      edges: []
    }
  };
}

function toYaml(obj) {
  // Very small YAML emitter suitable for this minimal graph shape
  let out = '';
  function indent(level) { return '  '.repeat(level); }
  out += 'graph:\n';
  out += `${indent(1)}metadata:\n`;
  out += `${indent(2)}name: ${obj.graph.metadata.name}\n`;
  out += `${indent(1)}nodes:\n`;
  obj.graph.nodes.forEach(n => {
    out += `${indent(2)}- id: ${n.id}\n`;
    out += `${indent(3)}type: ${n.type}\n`;
    out += `${indent(3)}name: "${n.name.replace(/\"/g,'\\\"')}"\n`;
    out += `${indent(3)}run: "${n.run.replace(/\"/g,'\\\"')}"\n`;
  });
  out += `${indent(1)}edges: []\n`;
  return out;
}

// Wire up UI buttons
document.getElementById('exportYml').addEventListener('click', () => {
  const graph = buildGraph();
  const yaml = toYaml(graph);
  const blob = new Blob([yaml], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exported-graph-${Date.now()}.yml`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

document.getElementById('downloadJson').addEventListener('click', () => {
  const graph = buildGraph();
  const blob = new Blob([JSON.stringify(graph, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exported-graph-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
