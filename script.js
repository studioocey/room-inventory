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

  function displayItems(data) {
    const container = document.getElementById('item-list');
    container.innerHTML = '';

    if (data.length === 0) {
      container.innerHTML = `<p style="text-align:center; color:#ff82a9;">No items found!</p>`;
      return;
    }

    data.forEach(item => {
      container.innerHTML += `
        <div class="item-card">
          <img class="item-img" src="${item["Image URL"]}" alt="${item["Item Name"]}">
          <h3>${item["Item Name"]}</h3>
          <p><strong>Location:</strong><br>${item["Storage Unit"]} > ${item["Drawer/Section"]} > ${item["Container"]}</p>
          <p><strong>Quantity:</strong> ${item["Quantity"]}</p>
        </div>
      `;
    });
  }

  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      itemsData = data;
      displayItems(itemsData);
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
</script>
