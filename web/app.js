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
