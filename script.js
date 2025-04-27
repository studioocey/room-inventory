<script>
const sheetURL = 'https://opensheet.vercel.app/1j9lTOCZ3EaqZMTt00uMsmchipkGGIKTtcNPFTDGShvk/Sheet1';

let itemsData = [];

const locationAreas = {
  "Wardrobe > Upper Right Drawer > Small Container": { top: 50, left: 300, width: 60, height: 60 },
  "Desk > Top Left Drawer": { top: 200, left: 150, width: 80, height: 80 },
  // add more areas here
};

function highlightLocation(locationName) {
  const map = document.getElementById('room-map');
  document.querySelectorAll('.highlight').forEach(el => el.remove());

  const area = locationAreas[locationName];
  if (area) {
    const highlight = document.createElement('div');
    highlight.className = 'highlight';
    highlight.style.top = area.top + 'px';
    highlight.style.left = area.left + 'px';
    highlight.style.width = area.width + 'px';
    highlight.style.height = area.height + 'px';
    map.appendChild(highlight);
  }
}

function displayItems(items) {
  const container = document.getElementById('item-list');
  container.innerHTML = ''; // Clear previous items

  if (items.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:#ff82a9;">No items found!</p>`;
    return;
  }

  items.forEach(item => {
    container.innerHTML += `
      <div class="item-card">
        <img class="item-img" src="${item["Image URL"]}" alt="${item["Item Name"]}">
        <h3>${item["Item Name"]}</h3>
        <p><strong>Location:</strong><br>${item["Storage Unit"]} > ${item["Drawer/Section"]} > ${item["Container"]}</p>
        <p><strong>Quantity:</strong> ${item["Quantity"]}</p>
        <button class="locate-item-btn" data-location="${item["Storage Unit"]} > ${item["Drawer/Section"]} > ${item["Container"]}">Locate Item</button>
      </div>
    `;
  });

  // Add event listeners to "Locate Item" buttons
  document.querySelectorAll('.locate-item-btn').forEach(button => {
    button.addEventListener('click', function() {
      const location = this.getAttribute('data-location');
      highlightLocation(location);
    });
  });
}

fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    itemsData = data;
    displayItems(itemsData); // Initially display all items
  });

document.getElementById('search-box').addEventListener('input', function(e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = itemsData.filter(item => 
    item["Item Name"].toLowerCase().includes(keyword)
  );

  displayItems(filtered);

  if (filtered.length === 1) {
    const loc = `${filtered[0]["Storage Unit"]} > ${filtered[0]["Drawer/Section"]} > ${filtered[0]["Container"]}`;
    highlightLocation(loc);
  } else {
    highlightLocation(null);
  }
});

// Function to filter items based on selected type and category
function filterItems(items, type, category) {
  return items.filter(item => {
    const typeMatch = type ? item.Type === type : true;
    const categoryMatch = category ? item.Category === category : true;
    return typeMatch && categoryMatch;
  });
}

// Event listeners for filter changes
document.getElementById('type-filter').addEventListener('change', function() {
  const type = this.value;
  const category = document.getElementById('category-filter').value;
  const filteredItems = filterItems(itemsData, type, category);
  displayItems(filteredItems);
});

document.getElementById('category-filter').addEventListener('change', function() {
  const category = this.value;
  const type = document.getElementById('type-filter').value;
  const filteredItems = filterItems(itemsData, type, category);
  displayItems(filteredItems);
});

</script>
